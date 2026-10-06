// Minimal client for the YouTube Data API v3.
//
// URL building and response parsing are split out into pure functions, and only the part
// that touches the network is confined to createYouTubeClient (fetch is injected, so it
// can be unit tested).
//
// Quota: the free tier is 10,000 units/day. videos.list is 1 unit whether for 1 item or
// 50 items, so the liveness sweep sends them in bulk. search.list is expensive at 100 units,
// so it is used only for rediscovery of cameras whose videoId died, while watching the
// budget.
//
// The client is written with Effect: a failed call is a typed YouTubeError rather than a
// thrown Error, so callers (refresh.ts) decide per call whether a failure ends the run.

import { Data, Effect } from "effect";

const API_BASE = "https://www.googleapis.com/youtube/v3";

/** Upper limit of ids that videos.list accepts in 1 call (API spec). */
export const MAX_VIDEO_IDS_PER_CALL = 50;

export const UNIT_COST = {
  videosList: 1,
  playlistItems: 1,
  searchLive: 100,
} as const;

/**
 * How many pages back to walk the uploads playlist.
 *
 * Walking deep has little value. Rediscovery is needed when "a stream ended and a **new
 * stream** started", and a new stream comes at the head of the upload history. What has
 * sunk deep are streams that have run for months, and since their videoId does not change
 * the liveness sweep picks them up
 * (VirtualRailfan had streams that were not reached even after walking back 400 videos,
 *  but those had stayed live the whole time, so rediscovery had no part to play).
 *
 * Raising the limit, on the other hand, means searching every hour, forever and at a high
 * price, for cameras that will never come back. Keep it shallow. If the targets are all
 * found, it stops even earlier.
 */
export const UPLOADS_MAX_PAGES = 3;

/**
 * Maximum number of HTTP calls made when looking at 1 channel via uploads.
 *
 * 2 calls per page, playlistItems and videosList. This has to be counted separately from
 * the unit amount - a search is 100 units in 1 go but only 1 call, so the two are not
 * proportional. What counts against the subrequest limit (50) is this, not units.
 */
export const MAX_CALLS_PER_CHANNEL = UPLOADS_MAX_PAGES * 2;

/** Maximum cost of the 2 paths for looking up a channel's current live streams. */
export const CHANNEL_LOOKUP_COST = {
  /** Via the uploads playlist (including paging). */
  viaUploads: UPLOADS_MAX_PAGES * (UNIT_COST.playlistItems + UNIT_COST.videosList),
  /**
   * Via search. **Exhaustiveness is not guaranteed** - it has been confirmed by measurement
   * that a search with eventType=live does not return a stream that is actually live
   * (it returned 42 items while 1 live stream was missing. No next page either). It is no
   * more than a fallback for when uploads did not find it.
   */
  viaSearch: UNIT_COST.searchLive + UNIT_COST.videosList,
} as const;

export interface YouTubeVideo {
  id: string;
  title: string;
  /** Whether it is live now (snippet.liveBroadcastContent === "live"). */
  isLive: boolean;
  /** Whether embedding on external sites is allowed. */
  embeddable: boolean;
  viewers: number | null;
}

/**
 * Response filters (the API's `fields` parameter). Quota is the same with or without them.
 *
 * The response is parsed with the Cron's CPU time, which the free plan caps at 10ms. A full
 * snippet carries the description, thumbnails, tags and localized copies, so a 50-item
 * videos.list response is mostly text nobody reads. Asking only for what the parsers below
 * read keeps that parse small.
 */
export const RESPONSE_FIELDS = {
  videosList:
    "items(id,snippet(title,liveBroadcastContent),liveStreamingDetails(concurrentViewers),status(embeddable))",
  searchLive: "items(id(videoId))",
  playlistItems: "nextPageToken,items(contentDetails(videoId))",
} as const;

export function videosListUrl(apiKey: string, ids: readonly string[]): string {
  const params = new URLSearchParams({
    part: "snippet,liveStreamingDetails,status",
    fields: RESPONSE_FIELDS.videosList,
    id: ids.join(","),
    key: apiKey,
  });
  return `${API_BASE}/videos?${params.toString()}`;
}

export function searchLiveUrl(apiKey: string, channelId: string): string {
  const params = new URLSearchParams({
    part: "id",
    channelId,
    eventType: "live",
    type: "video",
    // 1 channel puts out dozens of live streams, so taking just 1 grabs a different
    // camera. Take them all and tell them apart by title.
    maxResults: String(MAX_VIDEO_IDS_PER_CALL),
    fields: RESPONSE_FIELDS.searchLive,
    key: apiKey,
  });
  return `${API_BASE}/search?${params.toString()}`;
}

/**
 * Id of the channel's "uploads" playlist. It is the channel id with its prefix changed
 * from UC to UU (YouTube spec).
 */
export function uploadsPlaylistId(channelId: string): string {
  return `UU${channelId.slice(2)}`;
}

export function playlistItemsUrl(
  apiKey: string,
  playlistId: string,
  pageToken?: string,
): string {
  const params = new URLSearchParams({
    part: "contentDetails",
    playlistId,
    maxResults: String(MAX_VIDEO_IDS_PER_CALL),
    fields: RESPONSE_FIELDS.playlistItems,
    key: apiKey,
  });
  if (pageToken !== undefined) params.set("pageToken", pageToken);
  return `${API_BASE}/playlistItems?${params.toString()}`;
}

export function parsePlaylistItems(json: unknown): string[] {
  const ids: string[] = [];
  for (const raw of itemsOf(json)) {
    const videoId = asRecord(asRecord(raw)?.["contentDetails"])?.["videoId"];
    if (typeof videoId === "string") ids.push(videoId);
  }
  return ids;
}

export function nextPageToken(json: unknown): string | undefined {
  const token = asRecord(json)?.["nextPageToken"];
  return typeof token === "string" ? token : undefined;
}

export function parseSearchIds(json: unknown): string[] {
  const ids: string[] = [];
  for (const raw of itemsOf(json)) {
    const videoId = asRecord(asRecord(raw)?.["id"])?.["videoId"];
    if (typeof videoId === "string") ids.push(videoId);
  }
  return ids;
}

function itemsOf(json: unknown): unknown[] {
  if (typeof json !== "object" || json === null) return [];
  const { items } = json as { items?: unknown };
  return Array.isArray(items) ? items : [];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

export function parseVideosList(json: unknown): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];

  for (const raw of itemsOf(json)) {
    const item = asRecord(raw);
    if (item === null) continue;

    const snippet = asRecord(item["snippet"]);
    if (typeof item["id"] !== "string" || snippet === null) continue;

    const status = asRecord(item["status"]);
    const details = asRecord(item["liveStreamingDetails"]);
    const viewersRaw = details === null ? undefined : details["concurrentViewers"];
    const viewers = Number(viewersRaw);

    videos.push({
      id: item["id"],
      title: typeof snippet["title"] === "string" ? snippet["title"] : "",
      isLive: snippet["liveBroadcastContent"] === "live",
      // A response lacking status is treated as unrestricted (falls to the embeddable default).
      embeddable: status === null ? true : status["embeddable"] !== false,
      viewers: Number.isFinite(viewers) && viewersRaw !== undefined ? viewers : null,
    });
  }
  return videos;
}

/** A non-2xx response. body is kept because quotaExceeded etc. is only told apart there. */
export class YouTubeApiError extends Data.TaggedError("YouTubeApiError")<{
  readonly status: number;
  readonly body: string;
}> {
  override get message(): string {
    return `YouTube API ${this.status}: ${this.body}`;
  }
}

/** fetch itself or reading the body failed (connection reset, subrequest limit, ...). */
export class YouTubeNetworkError extends Data.TaggedError("YouTubeNetworkError")<{
  readonly cause: unknown;
}> {
  override get message(): string {
    return this.cause instanceof Error ? this.cause.message : String(this.cause);
  }
}

export type YouTubeError = YouTubeApiError | YouTubeNetworkError;

export interface YouTubeClient {
  /** Quota consumed so far (in units). */
  readonly unitsUsed: number;
  /**
   * Number of HTTP calls made so far. What counts against the Workers subrequest limit is
   * this, not units, so it is counted separately.
   */
  readonly callsMade: number;
  /** ids holds up to MAX_VIDEO_IDS_PER_CALL items (more is a programming error = defect). */
  listVideos(ids: readonly string[]): Effect.Effect<YouTubeVideo[], YouTubeError>;
  /**
   * Walks back the uploads playlist and returns those that are live now.
   * Stops paging as soon as shouldStop returns true (the target is normally on page 1, so
   * having this or not changes consumption by 8 times).
   */
  listChannelLiveStreamsViaUploads(
    channelId: string,
    shouldStop?: (live: readonly YouTubeVideo[]) => boolean,
  ): Effect.Effect<YouTubeVideo[], YouTubeError>;
  /** Covers the channel's live streams exhaustively by search. Reliable but costly (101 units). */
  listChannelLiveStreamsViaSearch(channelId: string): Effect.Effect<YouTubeVideo[], YouTubeError>;
}

export function createYouTubeClient(apiKey: string, fetchImpl: typeof fetch): YouTubeClient {
  let unitsUsed = 0;
  let callsMade = 0;

  // Quota on Google's side is consumed even on failure, so add it up first and then send.
  const call = (url: string, cost: number): Effect.Effect<unknown, YouTubeError> =>
    Effect.gen(function* () {
      unitsUsed += cost;
      callsMade += 1;
      const res = yield* Effect.tryPromise({
        try: () => fetchImpl(url),
        catch: (cause) => new YouTubeNetworkError({ cause }),
      });
      if (!res.ok) {
        const body = yield* Effect.tryPromise({
          try: () => res.text(),
          catch: (cause) => new YouTubeNetworkError({ cause }),
        });
        return yield* new YouTubeApiError({ status: res.status, body });
      }
      return yield* Effect.tryPromise({
        try: () => res.json(),
        catch: (cause) => new YouTubeNetworkError({ cause }),
      });
    });

  /** From a set of video ids, returns only those live now. Queries 50 items at a time. */
  const liveAmong = (ids: readonly string[]): Effect.Effect<YouTubeVideo[], YouTubeError> =>
    Effect.gen(function* () {
      const live: YouTubeVideo[] = [];
      for (let i = 0; i < ids.length; i += MAX_VIDEO_IDS_PER_CALL) {
        const chunk = ids.slice(i, i + MAX_VIDEO_IDS_PER_CALL);
        const videos = parseVideosList(yield* call(videosListUrl(apiKey, chunk), UNIT_COST.videosList));
        for (const video of videos) if (video.isLive) live.push(video);
      }
      return live;
    });

  return {
    get unitsUsed() {
      return unitsUsed;
    },

    get callsMade() {
      return callsMade;
    },

    listVideos(ids) {
      if (ids.length > MAX_VIDEO_IDS_PER_CALL) {
        return Effect.die(
          new Error(
            `videos.list takes at most ${MAX_VIDEO_IDS_PER_CALL} ids per call (${ids.length} were passed)`,
          ),
        );
      }
      if (ids.length === 0) return Effect.succeed([]);
      return Effect.map(call(videosListUrl(apiKey, ids), UNIT_COST.videosList), parseVideosList);
    },

    listChannelLiveStreamsViaUploads(channelId, shouldStop) {
      return Effect.gen(function* () {
        const playlistId = uploadsPlaylistId(channelId);
        const live: YouTubeVideo[] = [];
        let pageToken: string | undefined;

        for (let page = 0; page < UPLOADS_MAX_PAGES; page += 1) {
          const json = yield* call(
            playlistItemsUrl(apiKey, playlistId, pageToken),
            UNIT_COST.playlistItems,
          );
          live.push(...(yield* liveAmong(parsePlaylistItems(json))));

          pageToken = nextPageToken(json);
          if (pageToken === undefined) break;
          if (shouldStop?.(live) === true) break;
        }
        return live;
      });
    },

    listChannelLiveStreamsViaSearch(channelId) {
      return Effect.gen(function* () {
        const found = yield* call(searchLiveUrl(apiKey, channelId), UNIT_COST.searchLive);
        return yield* liveAmong(parseSearchIds(found));
      });
    },
  };
}
