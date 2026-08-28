// カメラのマスタデータ(リポジトリ同梱)と生存状態(KV 由来)の型、および
// 両者を突き合わせる純粋な操作。Worker とフロントの両方から参照される。

export const CAM_CATEGORIES = [
  "city",
  "nature",
  "animal",
  "airport",
  "harbor",
  "volcano",
  "railway",
  "space",
] as const;

export type CamCategory = (typeof CAM_CATEGORIES)[number];

export interface CamSource {
  /** 既知の配信 videoId。チャンネルしか分かっていない場合は null。 */
  videoId: string | null;
  /** 配信元チャンネル。videoId が死んだときの再探索に使う。 */
  channelId: string;
  /**
   * 配信タイトル。1 つのチャンネルが何十本もライブを出しているので、
   * 再探索のときに「どれがこのカメラか」を見分ける鍵になる
   * (これが無いと、チャンネルの別のカメラの映像を割り当ててしまう)。
   */
  titleKey: string;
}

/** リポジトリにコミットされる不変のカメラ定義。 */
export interface Cam {
  id: string;
  name: { ja: string; en: string };
  lat: number;
  lng: number;
  /** IANA タイムゾーン。現地時刻の表示に使う。 */
  timeZone: string;
  category: CamCategory;
  /** ISO 3166-1 alpha-2。 */
  country: string;
  source: CamSource;
}

/**
 * ブラウザへ送る生存状態。表示に使う 3 つだけに絞る。
 *
 * title と checkedAt は KV には残す(再探索の手がかりと、確認の古い順に
 * 並べるため)が、画面はどちらも読まない。5,720 台ぶんを毎回配ると
 * 応答が 1MB を超え、その半分以上がこの 2 つで占められる。
 */
export type PublicCamState = Pick<CamState, "videoId" | "status" | "viewers">;

/** KV の生存状態を、ブラウザへ送る形に絞る。 */
export function publicStates(cams: Record<string, CamState>): Record<string, PublicCamState> {
  return Object.fromEntries(
    Object.entries(cams).map(([id, s]) => [
      id,
      { videoId: s.videoId, status: s.status, viewers: s.viewers },
    ]),
  );
}

export type CamStatus =
  /** 現在ライブ中かつ埋め込み可能。 */
  | "live"
  /** 配信が見つからない、または終了している。 */
  | "offline"
  /** 存在するが埋め込みが禁止されている。 */
  | "blocked"
  /** まだ確認できていない(状態 API が落ちている等)。 */
  | "unknown";

/** Cron が更新し KV に載る可変の状態。 */
export interface CamState {
  videoId: string | null;
  status: CamStatus;
  viewers: number | null;
  title: string | null;
  /** ISO 8601。 */
  checkedAt: string;
}

const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CHANNEL_ID_RE = /^UC[A-Za-z0-9_-]{22}$/;
const VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;
const COUNTRY_RE = /^[A-Z]{2}$/;

function isResolvableTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function isFiniteInRange(value: number, limit: number): boolean {
  return Number.isFinite(value) && Math.abs(value) <= limit;
}

/**
 * マスタデータの不整合を人間が読める日本語で列挙する。空配列なら健全。
 * 生成スクリプトの出力を CI のテストで検証するために使う。
 */
export function collectCamProblems(cams: readonly Cam[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  for (const cam of cams) {
    const at = `[${cam.id}]`;
    if (seen.has(cam.id)) problems.push(`${at} id が重複しています`);
    seen.add(cam.id);

    if (!ID_RE.test(cam.id)) problems.push(`${at} id の書式が不正です(kebab-case のみ)`);
    if (!isFiniteInRange(cam.lat, 90)) problems.push(`${at} 緯度が範囲外です: ${cam.lat}`);
    if (!isFiniteInRange(cam.lng, 180)) problems.push(`${at} 経度が範囲外です: ${cam.lng}`);
    if (!isResolvableTimeZone(cam.timeZone)) {
      problems.push(`${at} タイムゾーンを解決できません: ${cam.timeZone}`);
    }
    if (cam.name.ja.trim() === "" || cam.name.en.trim() === "") {
      problems.push(`${at} 表示名が空です`);
    }
    if (!COUNTRY_RE.test(cam.country)) problems.push(`${at} 国コードが不正です: ${cam.country}`);
    if (!CHANNEL_ID_RE.test(cam.source.channelId)) {
      problems.push(`${at} channelId が不正です: ${cam.source.channelId}`);
    }
    if (cam.source.videoId !== null && !VIDEO_ID_RE.test(cam.source.videoId)) {
      problems.push(`${at} videoId が不正です: ${cam.source.videoId}`);
    }
    if (cam.source.titleKey.trim() === "") {
      problems.push(`${at} titleKey が空です(再探索でカメラを見分けられません)`);
    }
  }
  return problems;
}

export interface CamFilter {
  /** 空または未指定なら絞らない。 */
  categories?: readonly CamCategory[];
  liveOnly?: boolean;
  nightOnly?: boolean;
  favoritesOnly?: boolean;
  query?: string;
}

export interface FilterContext {
  states: ReadonlyMap<string, PublicCamState>;
  /** 現在その土地が夜であるカメラの id。 */
  nightIds: ReadonlySet<string>;
  favoriteIds: ReadonlySet<string>;
}

export function filterCams(
  cams: readonly Cam[],
  ctx: FilterContext,
  filter: CamFilter,
): Cam[] {
  const categories = filter.categories ?? [];
  const query = (filter.query ?? "").trim().toLowerCase();

  return cams.filter((cam) => {
    if (categories.length > 0 && !categories.includes(cam.category)) return false;
    if (filter.liveOnly && ctx.states.get(cam.id)?.status !== "live") return false;
    if (filter.nightOnly && !ctx.nightIds.has(cam.id)) return false;
    if (filter.favoritesOnly && !ctx.favoriteIds.has(cam.id)) return false;
    if (query !== "") {
      const haystack = `${cam.name.ja} ${cam.name.en}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

/** rng は [0,1) を返すこと。テスト可能にするため注入する。 */
export function pickRandom<T>(items: readonly T[], rng: () => number): T | null {
  if (items.length === 0) return null;
  return items[Math.min(items.length - 1, Math.floor(rng() * items.length))]!;
}

function viewerCount(states: ReadonlyMap<string, PublicCamState>, id: string): number {
  return states.get(id)?.viewers ?? -1;
}

/**
 * 配信中のカメラを、いま見ている人数の多い順に並べる。
 * 視聴者数が分からない配信は末尾に置く（誤った順位を付けない）。
 * 同数のときは id の昇順で安定させる。
 */
export function rankLiveByViewers(
  cams: readonly Cam[],
  states: ReadonlyMap<string, PublicCamState>,
): Cam[] {
  return cams
    .filter((cam) => states.get(cam.id)?.status === "live")
    .sort((a, b) => {
      const diff = viewerCount(states, b.id) - viewerCount(states, a.id);
      if (diff !== 0) return diff;
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
}

const EMBED_ORIGIN = "https://www.youtube-nocookie.com";
// rel=0 で関連動画を抑え、playsinline でモバイルの全画面奪取を防ぐ。
const EMBED_PARAMS = "rel=0&playsinline=1&modestbranding=1";

/**
 * 再生・生存確認・再探索が共有する videoId。状態が解決した id を最優先し、
 * 無ければマスタの id。どちらも無ければ null。
 */
export function resolvedVideoId(cam: Cam, state: PublicCamState | undefined): string | null {
  return state?.videoId ?? cam.source.videoId;
}

/**
 * 再生に使う iframe の URL。状態が解決した videoId を最優先し、無ければ
 * マスタの videoId、それも無ければチャンネルの現在のライブにフォールバックする。
 */
export function resolveEmbedUrl(cam: Cam, state: PublicCamState | undefined): string {
  const videoId = resolvedVideoId(cam, state);
  if (videoId !== null) {
    return `${EMBED_ORIGIN}/embed/${videoId}?${EMBED_PARAMS}`;
  }
  return `${EMBED_ORIGIN}/embed/live_stream?channel=${cam.source.channelId}&${EMBED_PARAMS}`;
}
