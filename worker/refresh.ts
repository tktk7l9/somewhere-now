// 生存状態の更新アルゴリズムとクォータ会計。
//
// 二段構え:
//   sweepLiveness … 既知の videoId をまとめて確認する。50 件で 1 unit と安いので
//                    高頻度(10 分毎)に回す。
//   rediscover    … videoId が死んだカメラのチャンネルを検索し直す。1 件 100 unit
//                    と高いので、件数と予算の両方で必ず抑える。
//
// 過去に無制限のポーリングでホスティングを落としているので、上限は「運用で
// 気をつける」ではなくコードに埋める。

import type { Cam, CamState } from "../src/domain/cams";
import { MAX_VIDEO_IDS_PER_CALL, UNIT_COST, type YouTubeClient } from "./youtube";

/**
 * 1 日に使ってよい上限。無料枠 10,000 に対して余裕を残す。
 * 手動実行やデバッグのぶんを飲み込めるだけの隙間を空けている。
 */
export const DAILY_UNIT_BUDGET = 8000;

export interface QuotaLedger {
  /** UTC の "YYYY-MM-DD"。Google のリセットは太平洋時間だが、安全側に倒す。 */
  day: string;
  used: number;
}

export interface RefreshResult {
  /** 更新のあったカメラだけを含む。呼び出し側が既存の状態にマージする。 */
  states: Map<string, CamState>;
  unitsUsed: number;
  /** ログに残す観測メモ。 */
  notes: string[];
}

export function utcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 日をまたいでいたらゼロから数え直す。 */
export function ledgerForDay(stored: QuotaLedger | null, now: Date): QuotaLedger {
  const day = utcDay(now);
  return stored !== null && stored.day === day ? stored : { day, used: 0 };
}

export function remainingUnits(ledger: QuotaLedger, budget = DAILY_UNIT_BUDGET): number {
  return Math.max(0, budget - ledger.used);
}

function chunk<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

/**
 * 既知の videoId を一括で確認し、live / offline / blocked を更新する。
 * videoId を持たないカメラは触らない(rediscover の担当)。
 */
export async function sweepLiveness(
  cams: readonly Cam[],
  states: ReadonlyMap<string, CamState>,
  client: YouTubeClient,
  now: Date,
  unitBudget = DAILY_UNIT_BUDGET,
): Promise<RefreshResult> {
  const notes: string[] = [];
  const checkedAt = now.toISOString();

  // カメラ → 確認すべき videoId。状態が持つ id をマスタより優先する。
  const targets = new Map<string, string>();
  for (const cam of cams) {
    const videoId = states.get(cam.id)?.videoId ?? cam.source.videoId;
    if (videoId !== null) targets.set(cam.id, videoId);
  }

  // 複数のカメラが同じ配信を指すことがあるので重複を潰してから投げる。
  const uniqueIds = [...new Set(targets.values())];
  const found = new Map<string, Awaited<ReturnType<YouTubeClient["listVideos"]>>[number]>();

  // 実際に問い合わせた id。打ち切った分を「配信が消えた」と誤判定しないため、
  // 見つかったかどうかではなく「確認したかどうか」で判定を分ける。
  const queried = new Set<string>();
  let unitsUsed = 0;
  for (const ids of chunk(uniqueIds, MAX_VIDEO_IDS_PER_CALL)) {
    if (unitsUsed + UNIT_COST.videosList > unitBudget) {
      notes.push("予算が尽きたため生存確認を途中で打ち切った");
      break;
    }
    for (const video of await client.listVideos(ids)) found.set(video.id, video);
    for (const id of ids) queried.add(id);
    unitsUsed += UNIT_COST.videosList;
  }

  const updated = new Map<string, CamState>();
  for (const [camId, videoId] of targets) {
    if (!queried.has(videoId)) continue;
    const video = found.get(videoId);
    const status: CamState["status"] =
      video === undefined ? "offline" : !video.embeddable ? "blocked" : video.isLive ? "live" : "offline";

    updated.set(camId, {
      videoId,
      status,
      viewers: video?.viewers ?? null,
      title: video?.title ?? states.get(camId)?.title ?? null,
      checkedAt,
    });
  }

  return { states: updated, unitsUsed, notes };
}

export interface RediscoverOptions {
  /** 1 回の実行で探し直すチャンネル数の上限。 */
  maxChannels: number;
  unitBudget?: number;
}

/** 状態が無いカメラを最優先にするための擬似的な確認時刻。 */
const NEVER_CHECKED = "";

/**
 * ライブでないカメラのチャンネルから現在の配信を探し直す。確認時刻の古い順に
 * 拾うので、実行を重ねれば全カメラを一巡する。
 */
export async function rediscover(
  cams: readonly Cam[],
  states: ReadonlyMap<string, CamState>,
  client: YouTubeClient,
  now: Date,
  { maxChannels, unitBudget = DAILY_UNIT_BUDGET }: RediscoverOptions,
): Promise<RefreshResult> {
  const notes: string[] = [];
  const checkedAt = now.toISOString();

  const affordable = Math.floor(unitBudget / UNIT_COST.searchLive);
  if (affordable === 0) {
    return { states: new Map(), unitsUsed: 0, notes: ["予算が足りず再探索を見送った"] };
  }

  const candidates = cams
    .filter((cam) => states.get(cam.id)?.status !== "live")
    .sort((a, b) => {
      const at = states.get(a.id)?.checkedAt ?? NEVER_CHECKED;
      const bt = states.get(b.id)?.checkedAt ?? NEVER_CHECKED;
      return at < bt ? -1 : at > bt ? 1 : 0;
    })
    .slice(0, Math.min(maxChannels, affordable));

  const updated = new Map<string, CamState>();
  const resolved = new Map<string, string>(); // camId -> 見つかった videoId
  let unitsUsed = 0;

  for (const cam of candidates) {
    let videoId: string | null;
    try {
      videoId = await client.findLiveVideoId(cam.source.channelId);
    } catch (error) {
      unitsUsed += UNIT_COST.searchLive;
      notes.push(`[${cam.id}] 再探索に失敗: ${String(error)}`);
      updated.set(cam.id, {
        videoId: null,
        status: "unknown",
        viewers: null,
        title: states.get(cam.id)?.title ?? null,
        checkedAt,
      });
      continue;
    }
    unitsUsed += UNIT_COST.searchLive;

    if (videoId === null) {
      updated.set(cam.id, {
        videoId: null,
        status: "offline",
        viewers: null,
        title: states.get(cam.id)?.title ?? null,
        checkedAt,
      });
      continue;
    }
    resolved.set(cam.id, videoId);
  }

  // search.list は埋め込み可否も視聴者数も返さないので、見つかった分だけ
  // まとめて 1 unit で確認する。
  if (resolved.size > 0) {
    const videos = await client.listVideos([...new Set(resolved.values())]);
    unitsUsed += UNIT_COST.videosList;
    const byId = new Map(videos.map((v) => [v.id, v]));

    for (const [camId, videoId] of resolved) {
      const video = byId.get(videoId);
      const status: CamState["status"] =
        video === undefined ? "offline" : !video.embeddable ? "blocked" : video.isLive ? "live" : "offline";
      updated.set(camId, {
        videoId,
        status,
        viewers: video?.viewers ?? null,
        title: video?.title ?? null,
        checkedAt,
      });
    }
  }

  return { states: updated, unitsUsed, notes };
}
