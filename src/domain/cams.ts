// Types for the camera master data (bundled in the repository) and the liveness state
// (from KV), and pure operations that match the two. Referenced from both the Worker and the front end.

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
  /** Known stream videoId. null when only the channel is known. */
  videoId: string | null;
  /** Source channel. Used for rediscovery when the videoId dies. */
  channelId: string;
  /**
   * Stream title. A single channel puts out dozens of live streams, so in
   * rediscovery this is the key for telling "which one is this camera"
   * (without it, the video of another camera on the channel gets assigned).
   */
  titleKey: string;
}

/** Immutable camera definition committed to the repository. */
export interface Cam {
  id: string;
  name: { ja: string; en: string };
  lat: number;
  lng: number;
  /** IANA time zone. Used to display local time. */
  timeZone: string;
  category: CamCategory;
  /** ISO 3166-1 alpha-2. */
  country: string;
  source: CamSource;
}

/**
 * The part of a camera the Worker's Cron reads: which stream, and where to look for the next
 * one. The Worker loads only this (src/data/camSources.ts), not the whole master.
 */
export type CamRef = Pick<Cam, "id" | "source">;

/**
 * Liveness state sent to the browser. Narrowed to only the 3 fields used for display.
 *
 * checkedAt is kept in KV (to sort by oldest check first), but the screen does not read
 * it. Serving it for 5,720 cameras every time doubles the response.
 */
export type PublicCamState = Pick<CamState, "videoId" | "status" | "viewers">;

/** Narrows the liveness state in KV to the shape sent to the browser. */
export function publicStates(cams: Record<string, CamState>): Record<string, PublicCamState> {
  return Object.fromEntries(
    Object.entries(cams).map(([id, s]) => [
      id,
      { videoId: s.videoId, status: s.status, viewers: s.viewers },
    ]),
  );
}

export type CamStatus =
  /** Currently live and embeddable. */
  | "live"
  /** The stream is not found, or has ended. */
  | "offline"
  /** Exists but embedding is prohibited. */
  | "blocked"
  /** Not confirmed yet (e.g. the state API is down). */
  | "unknown";

/** Mutable state updated by Cron and stored in KV. */
export interface CamState {
  videoId: string | null;
  status: CamStatus;
  viewers: number | null;
  /** ISO 8601. */
  checkedAt: string;
}

/**
 * Narrows a state read from KV to the stored shape.
 *
 * States written before 2026-10-04 also carry the stream title. Nothing read it, yet it was
 * half of the 1.2MB source of truth, and the Cron parses and rewrites that whole value on
 * every run under the free plan's 10ms CPU limit. Projecting on every write-back drops the
 * leftovers from cameras no run has touched since.
 */
export function storedState(state: CamState): CamState {
  return {
    videoId: state.videoId,
    status: state.status,
    viewers: state.viewers,
    checkedAt: state.checkedAt,
  };
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
 * Lists inconsistencies in the master data in human-readable English. An empty array means healthy.
 * Used to validate the output of the generation script in CI tests.
 */
export function collectCamProblems(cams: readonly Cam[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  for (const cam of cams) {
    const at = `[${cam.id}]`;
    if (seen.has(cam.id)) problems.push(`${at} duplicate id`);
    seen.add(cam.id);

    if (!ID_RE.test(cam.id)) problems.push(`${at} invalid id format (kebab-case only)`);
    if (!isFiniteInRange(cam.lat, 90)) problems.push(`${at} latitude out of range: ${cam.lat}`);
    if (!isFiniteInRange(cam.lng, 180)) problems.push(`${at} longitude out of range: ${cam.lng}`);
    if (!isResolvableTimeZone(cam.timeZone)) {
      problems.push(`${at} cannot resolve time zone: ${cam.timeZone}`);
    }
    if (cam.name.ja.trim() === "" || cam.name.en.trim() === "") {
      problems.push(`${at} empty display name`);
    }
    if (!COUNTRY_RE.test(cam.country)) problems.push(`${at} invalid country code: ${cam.country}`);
    if (!CHANNEL_ID_RE.test(cam.source.channelId)) {
      problems.push(`${at} invalid channelId: ${cam.source.channelId}`);
    }
    if (cam.source.videoId !== null && !VIDEO_ID_RE.test(cam.source.videoId)) {
      problems.push(`${at} invalid videoId: ${cam.source.videoId}`);
    }
    if (cam.source.titleKey.trim() === "") {
      problems.push(`${at} empty titleKey (the camera cannot be told apart on rediscovery)`);
    }
  }
  return problems;
}

export interface CamFilter {
  /** Does not filter when empty or unspecified. */
  categories?: readonly CamCategory[];
  liveOnly?: boolean;
  nightOnly?: boolean;
  favoritesOnly?: boolean;
  query?: string;
}

export interface FilterContext {
  states: ReadonlyMap<string, PublicCamState>;
  /** ids of cameras whose place is currently in night. */
  nightIds: ReadonlySet<string>;
  favoriteIds: ReadonlySet<string>;
}

/**
 * Folds what people type into the shape the names are compared in (SHIG 50): full-width letters
 * and spaces (NFKC), case, diacritics ("Zürich" for "zurich") and hiragana against the katakana
 * the names are written in. Runs of whitespace become one space.
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // NFD also pulls dakuten off kana; put the kana back together before comparing.
    .normalize("NFC")
    .replace(/[\u3041-\u3096]/g, (kana) => String.fromCharCode(kana.charCodeAt(0) + 0x60))
    .replace(/\s+/g, " ")
    .trim();
}

/** The folded names, kept per camera: the filter runs on every keystroke over 5,700 cameras. */
const searchKeys = new WeakMap<Cam, string>();

function searchKey(cam: Cam): string {
  let key = searchKeys.get(cam);
  if (key === undefined) {
    key = normalizeSearchText(`${cam.name.ja} ${cam.name.en}`);
    searchKeys.set(cam, key);
  }
  return key;
}

export function filterCams(
  cams: readonly Cam[],
  ctx: FilterContext,
  filter: CamFilter,
): Cam[] {
  const categories = filter.categories ?? [];
  // Every word must appear, in any order ("crossing shibuya" finds Shibuya Crossing).
  const words = normalizeSearchText(filter.query ?? "").split(" ").filter((word) => word !== "");

  return cams.filter((cam) => {
    if (categories.length > 0 && !categories.includes(cam.category)) return false;
    if (filter.liveOnly && ctx.states.get(cam.id)?.status !== "live") return false;
    if (filter.nightOnly && !ctx.nightIds.has(cam.id)) return false;
    if (filter.favoritesOnly && !ctx.favoriteIds.has(cam.id)) return false;
    if (words.length > 0) {
      const haystack = searchKey(cam);
      if (!words.every((word) => haystack.includes(word))) return false;
    }
    return true;
  });
}

/** rng must return [0,1). Injected to make it testable. */
export function pickRandom<T>(items: readonly T[], rng: () => number): T | null {
  if (items.length === 0) return null;
  return items[Math.min(items.length - 1, Math.floor(rng() * items.length))]!;
}

function viewerCount(states: ReadonlyMap<string, PublicCamState>, id: string): number {
  return states.get(id)?.viewers ?? -1;
}

/**
 * Orders live cameras by the number of people watching now, highest first.
 * Streams with unknown viewer count are put at the end (no wrong rank is given).
 * On a tie, stabilizes by ascending id.
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
// rel=0 suppresses related videos, and playsinline prevents the fullscreen takeover on mobile.
const EMBED_PARAMS = "rel=0&playsinline=1&modestbranding=1";

/**
 * The videoId shared by playback, the liveness sweep and rediscovery. The id resolved by
 * the state has top priority; if absent, the master's id. If neither exists, null.
 */
export function resolvedVideoId(cam: Pick<Cam, "source">, state: PublicCamState | undefined): string | null {
  return state?.videoId ?? cam.source.videoId;
}

/**
 * URL of the iframe used for playback. The videoId resolved by the state has top priority;
 * if absent, the master's videoId; if that is absent too, falls back to the channel's current live stream.
 */
export function resolveEmbedUrl(cam: Cam, state: PublicCamState | undefined): string {
  const videoId = resolvedVideoId(cam, state);
  if (videoId !== null) {
    return `${EMBED_ORIGIN}/embed/${videoId}?${EMBED_PARAMS}`;
  }
  return `${EMBED_ORIGIN}/embed/live_stream?channel=${cam.source.channelId}&${EMBED_PARAMS}`;
}
