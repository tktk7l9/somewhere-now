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

import { resolvedVideoId, type Cam, type CamState } from "../src/domain/cams";
import { matchStream } from "../src/domain/streamMatch";
import {
  CHANNEL_LOOKUP_COST,
  MAX_VIDEO_IDS_PER_CALL,
  UNIT_COST,
  type YouTubeClient,
  type YouTubeVideo,
} from "./youtube";

/**
 * 1 日に使ってよい上限。無料枠 10,000 に対して余裕を残す。
 * 手動実行やデバッグのぶんを飲み込めるだけの隙間を空けている。
 */
export const DAILY_UNIT_BUDGET = 8000;

/**
 * 1 回の実行で listVideos に投げてよい回数。
 *
 * Workers は 1 回の呼び出しで出せるサブリクエストが 50 で頭打ちになる
 * (超えると "Too many subrequests by single Worker invocation" で落ちる)。
 * KV の読み書きも同じ枠を食うので、上限そのものではなく余裕を残した数にする。
 */
export const MAX_LIST_CALLS_PER_SWEEP = 40;

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

/** 状態が無いカメラを最優先にするための擬似的な確認時刻。 */
const NEVER_CHECKED = "";

/** 確認がいちばん古いものが先に来る並び。状態がまだ無いカメラが最優先。 */
function byStaleness(states: ReadonlyMap<string, CamState>, cams: readonly Cam[]): Cam[] {
  const at = (cam: Cam): string => states.get(cam.id)?.checkedAt ?? NEVER_CHECKED;
  return [...cams].sort((a, b) => {
    const [x, y] = [at(a), at(b)];
    return x < y ? -1 : x > y ? 1 : 0;
  });
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
  // 1 回の実行では全件を見られない(サブリクエスト上限)ので、確認がいちばん
  // 古いものから順に詰める。こうしておけば実行のたびに対象がひとりでに
  // 入れ替わり、どこまで見たかを別途覚えておかなくてもマスタを一巡できる。
  const targets = new Map<string, string>();
  for (const cam of byStaleness(states, cams)) {
    const videoId = resolvedVideoId(cam, states.get(cam.id));
    if (videoId !== null) targets.set(cam.id, videoId);
  }

  // 複数のカメラが同じ配信を指すことがあるので重複を潰してから投げる。
  const uniqueIds = [...new Set(targets.values())];
  const found = new Map<string, Awaited<ReturnType<YouTubeClient["listVideos"]>>[number]>();

  // 実際に問い合わせた id。打ち切った分を「配信が消えた」と誤判定しないため、
  // 見つかったかどうかではなく「確認したかどうか」で判定を分ける。
  const queried = new Set<string>();
  let unitsUsed = 0;
  let calls = 0;
  for (const ids of chunk(uniqueIds, MAX_VIDEO_IDS_PER_CALL)) {
    if (unitsUsed + UNIT_COST.videosList > unitBudget) {
      notes.push("予算が尽きたため生存確認を途中で打ち切った");
      break;
    }
    if (calls >= MAX_LIST_CALLS_PER_SWEEP) {
      notes.push("サブリクエスト上限に達したため生存確認を打ち切った(残りは次回)");
      break;
    }
    for (const video of await client.listVideos(ids)) found.set(video.id, video);
    for (const id of ids) queried.add(id);
    unitsUsed += UNIT_COST.videosList;
    calls += 1;
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
  /**
   * 高い検索経路(101 unit)に落とせる回数の上限。安い経路は全チャンネルに
   * 掛けてよいが、こちらは配給制にしないと、全チャンネルが取りこぼした日に
   * 1 日ぶんの枠を数時間で焼く。
   */
  maxSearches?: number;
  unitBudget?: number;
}

function statusOf(video: YouTubeVideo): CamState["status"] {
  return video.embeddable ? "live" : "blocked";
}

/**
 * 配信を割り当てられなかったときの状態。liveness の結論は生存確認に残し、
 * 記録済みの videoId は消さない。
 */
function keepRecorded(
  cam: Cam,
  prior: CamState | undefined,
  status: Extract<CamState["status"], "offline" | "unknown">,
  checkedAt: string,
): CamState {
  return {
    videoId: resolvedVideoId(cam, prior),
    status,
    viewers: null,
    title: prior?.title ?? null,
    checkedAt,
  };
}

/**
 * ライブでないカメラのチャンネルから、現在の配信を探し直す。
 *
 * 1 つのチャンネルが何十本もライブを出しているので、
 *   - 問い合わせは**チャンネル単位**にまとめる(EarthCam の 25 台が 1 回で済む)
 *   - どれがどのカメラかは**配信タイトル**で見分ける
 * の 2 点が要になる。チャンネルから適当な 1 本を取ると、タイムズスクエアの
 * ピンに別の街の映像を出してしまう。
 *
 * 経路は安い順に試す。uploads プレイリスト(2 unit)で足りなければ、
 * 網羅できる検索(101 unit)に落とす。見分けがつかなかったカメラは、
 * 間違った配信を割り当てず offline のままにする。
 */
export async function rediscover(
  cams: readonly Cam[],
  states: ReadonlyMap<string, CamState>,
  client: YouTubeClient,
  now: Date,
  { maxChannels, maxSearches = 1, unitBudget = DAILY_UNIT_BUDGET }: RediscoverOptions,
): Promise<RefreshResult> {
  const notes: string[] = [];
  const checkedAt = now.toISOString();
  const updated = new Map<string, CamState>();
  // 消費は必ずクライアントの実測から取る(自前で数えると失敗時にずれる)。
  const startUnits = client.unitsUsed;
  const spent = (): number => client.unitsUsed - startUnits;

  const staleness = (cam: Cam): string => states.get(cam.id)?.checkedAt ?? NEVER_CHECKED;
  let searchesUsed = 0;

  const byChannel = new Map<string, Cam[]>();
  for (const cam of cams) {
    const state = states.get(cam.id);
    if (state?.status === "live") continue;
    // 生存確認がまだ一度も触っていないカメラには手を出さない。再探索は
    // 「記録した videoId が死んだ」ときのためのもので、チャンネルを浚う
    // 都合上いつも取りこぼす(長く続いている配信は投稿履歴の奥に沈む)。
    // 生きているカメラを先回りして offline にしてしまうのは本末転倒。
    if (state === undefined && resolvedVideoId(cam, undefined) !== null) continue;
    const list = byChannel.get(cam.source.channelId);
    if (list === undefined) byChannel.set(cam.source.channelId, [cam]);
    else list.push(cam);
  }

  // 最も長く放っておかれたカメラを抱えるチャンネルから片付ける。
  const oldest = (list: readonly Cam[]): string =>
    list.map(staleness).reduce((a, b) => (a < b ? a : b));
  const channels = [...byChannel.entries()]
    .sort(([, a], [, b]) => {
      const [x, y] = [oldest(a), oldest(b)];
      return x < y ? -1 : x > y ? 1 : 0;
    })
    .slice(0, maxChannels);

  for (const [channelId, channelCams] of channels) {
    if (spent() + CHANNEL_LOOKUP_COST.viaUploads > unitBudget) {
      notes.push("予算が尽きたため再探索を打ち切った");
      break;
    }

    // このチャンネルで探しているカメラが全部見つかったら、その先は要らない。
    const foundAll = (live: readonly YouTubeVideo[]): boolean =>
      channelCams.every((cam) => matchStream(cam.source.titleKey, live) !== null);

    let streams: YouTubeVideo[];
    try {
      streams = await client.listChannelLiveStreamsViaUploads(channelId, foundAll);
    } catch (error) {
      notes.push(`[${channelId}] 再探索に失敗: ${String(error)}`);
      for (const cam of channelCams) {
        updated.set(cam.id, keepRecorded(cam, states.get(cam.id), "unknown", checkedAt));
      }
      continue;
    }

    let matched = new Map<string, YouTubeVideo>();
    const resolve = (): string[] => {
      matched = new Map();
      const missing: string[] = [];
      for (const cam of channelCams) {
        const id = matchStream(cam.source.titleKey, streams);
        const video = id === null ? undefined : streams.find((s) => s.id === id);
        if (video === undefined) missing.push(cam.id);
        else matched.set(cam.id, video);
      }
      return missing;
    };

    let missing = resolve();
    // 直近 50 本に無かっただけかもしれないので、余裕があれば網羅する検索に落とす。
    if (
      missing.length > 0 &&
      searchesUsed < maxSearches &&
      spent() + CHANNEL_LOOKUP_COST.viaSearch <= unitBudget
    ) {
      searchesUsed += 1;
      try {
        streams = await client.listChannelLiveStreamsViaSearch(channelId);
        missing = resolve();
      } catch (error) {
        notes.push(`[${channelId}] 検索での再探索に失敗: ${String(error)}`);
      }
    }
    if (missing.length > 0) {
      notes.push(`[${channelId}] 見分けがつかず据え置き: ${missing.join(", ")}`);
    }

    for (const cam of channelCams) {
      const video = matched.get(cam.id);
      const prior = states.get(cam.id);
      if (video === undefined) {
        updated.set(cam.id, keepRecorded(cam, prior, "offline", checkedAt));
        continue;
      }
      updated.set(cam.id, {
        videoId: video.id,
        status: statusOf(video),
        viewers: video.viewers,
        title: video.title,
        checkedAt,
      });
    }
  }

  return { states: updated, unitsUsed: spent(), notes };
}
