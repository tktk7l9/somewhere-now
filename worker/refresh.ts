// Update algorithm for the liveness state, and quota accounting.
//
// Two stages:
//   sweepLiveness ... checks known videoIds in bulk. It is cheap at 1 unit per 50 items, so
//                     it runs at high frequency (every 10 minutes).
//   rediscover    ... searches again in the channel of a camera whose videoId died. It is
//                     expensive at 100 units per item, so it is always held down by both
//                     count and budget.
//
// Unlimited polling took the hosting down in the past, so the caps are not "be careful in
// operation" but built into the code.

import { resolvedVideoId, type Cam, type CamState, type CamStatus } from "../src/domain/cams";
import { matchStream } from "../src/domain/streamMatch";
import {
  CHANNEL_LOOKUP_COST,
  MAX_CALLS_PER_CHANNEL,
  MAX_VIDEO_IDS_PER_CALL,
  UNIT_COST,
  type YouTubeClient,
  type YouTubeVideo,
} from "./youtube";

/**
 * Daily budget per role.
 *
 * If a single wallet is used first come first served, the liveness sweep that runs every
 * 10 minutes eats up the whole day's share, and rediscovery, which comes only once per hour,
 * is starved out (measured: the liveness sweep took 70% of all consumption, and one round of
 * the 806 channels holding 1,686 non-live cameras took 4.2 days).
 * With the budgets split, one side can use its share up and the other still runs.
 *
 * The quota ledger is also split per role (worker/index.ts). Both Crons fire together on
 * the hour, so reading and writing a single ledger loses one side's consumption through
 * last write wins.
 */
export const ROLE_UNIT_BUDGET = {
  /** Liveness sweep. At the RECHECK_INTERVAL_MS intervals it fits in about 3,500 units a day. */
  sweep: 4000,
  /** Rediscovery. It includes searches at 100 units each, so do not thin this one out. */
  rediscover: 4000,
} as const;

/**
 * Upper limit that may be used per day. Leaves headroom against the free tier of 10,000.
 * The gap is wide enough to absorb manual runs and debugging.
 */
export const DAILY_UNIT_BUDGET = ROLE_UNIT_BUDGET.sweep + ROLE_UNIT_BUDGET.rediscover;

/**
 * Recheck interval per status.
 *
 * Most live cameras stream around the clock for 24 hours, and a stream once known to be
 * live rarely changes. offline / blocked, on the other hand, is the side that goes to see
 * "has a new stream started", and changes happen here. Checking everything at the same
 * frequency spends most of the budget on rechecking 4,000 items that do not move.
 *
 * In exchange, noticing that a stream has ended is delayed by up to the live interval.
 * A browser that got hold of an unplayable stream drops it to blocked by itself
 * (markUnplayable in src/app.ts), so the viewer's screen is not kept waiting that long.
 */
export const RECHECK_INTERVAL_MS: Record<CamStatus, number> = {
  live: 2 * 60 * 60 * 1000,
  offline: 20 * 60 * 1000,
  blocked: 20 * 60 * 1000,
  unknown: 20 * 60 * 1000,
};

/** Whether the per-status interval has passed. A camera never checked yet is always a target. */
export function isDue(state: CamState | undefined, now: Date): boolean {
  if (state === undefined) return true;
  const last = Date.parse(state.checkedAt);
  // An unreadable checkedAt falls to "check it". Safer than leaving it and never looking again.
  if (Number.isNaN(last)) return true;
  return now.getTime() - last >= RECHECK_INTERVAL_MS[state.status];
}

/**
 * Drops the state of ids removed from the master.
 *
 * Both the liveness sweep and rediscovery run starting from the master, so the state of a
 * camera whose id was renumbered stays in KV without either of them seeing it, and is
 * served to the browser at /api/cams (measured: 6 items were frozen in their state from
 * 2 days earlier). They are swept out here on every write-back.
 */
export function pruneOrphans(
  states: ReadonlyMap<string, CamState>,
  cams: readonly Cam[],
): { kept: Map<string, CamState>; removed: string[] } {
  const known = new Set(cams.map((cam) => cam.id));
  const kept = new Map<string, CamState>();
  const removed: string[] = [];
  for (const [camId, state] of states) {
    if (known.has(camId)) kept.set(camId, state);
    else removed.push(camId);
  }
  return { kept, removed };
}

/**
 * Number of listVideos calls allowed in 1 run.
 *
 * Workers caps the subrequests that 1 invocation can make at 50
 * (beyond that it fails with "Too many subrequests by single Worker invocation").
 * KV reads and writes eat the same allowance. 1 run uses KV 5 times, for reading and
 * writing the ledger, reading the state, and writing the source of truth and the public
 * copy, so that much is subtracted and headroom is left.
 *
 * The steady state after narrowing by RECHECK_INTERVAL_MS is around 25 calls per run, so
 * this is hit only when intervals line up and pile into a peak.
 */
export const MAX_LIST_CALLS_PER_SWEEP = 38;

/**
 * Number of HTTP calls allowed in 1 rediscovery run. The same allowance of 50 as the
 * liveness sweep has to be respected here too.
 *
 * **Holding it down by count alone is not enough.** 1 channel walks up to 3 pages of
 * uploads and makes 6 calls, so allowing 24 channels becomes 144 calls, and more than half
 * fail with "Too many subrequests by single Worker invocation" (on 2026-08-28, 12 of 24
 * channels were dropped). The unit budget is no brake here -
 * a search is 100 units in 1 call, so the two are not proportional.
 *
 * Actual consumption is often just 2 calls per channel (it stops early if the target is on
 * page 1). By **packing by the measured call count** instead of cutting the channel count
 * at the worst case, more channels can be covered by however much capacity is free.
 */
export const MAX_CALLS_PER_REDISCOVER = 40;

export interface QuotaLedger {
  /** "YYYY-MM-DD" in UTC. Google resets on Pacific Time, but this errs on the safe side. */
  day: string;
  used: number;
}

export interface RefreshResult {
  /** Contains only the cameras that were updated. The caller merges it into the existing state. */
  states: Map<string, CamState>;
  unitsUsed: number;
  /** Observation notes to leave in the log. */
  notes: string[];
}

export function utcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Recounts from zero if the day has rolled over. */
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

/** Pseudo check time that gives cameras without a state the top priority. */
const NEVER_CHECKED = "";

/** Order with the oldest check first. Cameras that have no state yet get the top priority. */
function byStaleness(states: ReadonlyMap<string, CamState>, cams: readonly Cam[]): Cam[] {
  const at = (cam: Cam): string => states.get(cam.id)?.checkedAt ?? NEVER_CHECKED;
  return [...cams].sort((a, b) => {
    const [x, y] = [at(a), at(b)];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

/**
 * Checks known videoIds in bulk and updates live / offline / blocked.
 * Cameras without a videoId are not touched (rediscover is in charge of them).
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

  // Camera -> videoId to check. The id held by the state takes priority over the master.
  // 1 run cannot look at everything (subrequest limit), so they are packed in order from
  // the oldest check. This way the targets rotate by themselves on every run, and the
  // master gets a full round without separately remembering how far the check got.
  const targets = new Map<string, string>();
  for (const cam of byStaleness(states, cams)) {
    const state = states.get(cam.id);
    // Skip cameras whose per-status interval has not come yet. The freed capacity goes to
    // the offline / blocked side, where changes happen.
    if (!isDue(state, now)) continue;
    const videoId = resolvedVideoId(cam, state);
    if (videoId !== null) targets.set(cam.id, videoId);
  }

  // Several cameras can point at the same stream, so duplicates are removed before sending.
  const uniqueIds = [...new Set(targets.values())];
  const found = new Map<string, Awaited<ReturnType<YouTubeClient["listVideos"]>>[number]>();

  // The ids actually queried. So that the part cut off is not misjudged as "the stream is
  // gone", the decision branches on "was it checked", not on whether it was found.
  const queried = new Set<string>();
  let unitsUsed = 0;
  let calls = 0;
  for (const ids of chunk(uniqueIds, MAX_VIDEO_IDS_PER_CALL)) {
    if (unitsUsed + UNIT_COST.videosList > unitBudget) {
      notes.push("liveness sweep cut short because the budget ran out");
      break;
    }
    if (calls >= MAX_LIST_CALLS_PER_SWEEP) {
      notes.push("liveness sweep cut short because the subrequest limit was reached (the rest waits for the next run)");
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
  /** Upper limit on the number of channels rediscovered in 1 run. */
  maxChannels: number;
  /**
   * Upper limit on how many times it may fall back to the expensive search path
   * (101 units). The cheap path may be applied to every channel, but unless this one is
   * rationed, on a day when every channel misses it burns a whole day's budget in a few
   * hours.
   */
  maxSearches?: number;
  unitBudget?: number;
  /** Number of HTTP calls allowed in 1 run (below the subrequest limit). */
  maxCalls?: number;
}

function statusOf(video: YouTubeVideo): CamState["status"] {
  return video.embeddable ? "live" : "blocked";
}

/**
 * State for when no stream could be assigned. The liveness conclusion is left to the
 * liveness sweep, and the recorded videoId is not erased.
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
 * Searches again for the current stream in the channels of cameras that are not live.
 *
 * A single channel puts out dozens of live streams, so 2 points are key:
 *   - queries are grouped **per channel** (EarthCam's 25 cameras take 1 query)
 *   - which stream is which camera is told apart by the **stream title**
 * Taking an arbitrary stream from the channel shows another city's video on the
 * Times Square pin.
 *
 * Paths are tried from the cheapest. If the uploads playlist (2 units) is not enough, it
 * falls back to the search that can be exhaustive (101 units). A camera that could not be
 * told apart is left offline rather than assigned a wrong stream.
 */
export async function rediscover(
  cams: readonly Cam[],
  states: ReadonlyMap<string, CamState>,
  client: YouTubeClient,
  now: Date,
  {
    maxChannels,
    maxSearches = 1,
    unitBudget = DAILY_UNIT_BUDGET,
    maxCalls = MAX_CALLS_PER_REDISCOVER,
  }: RediscoverOptions,
): Promise<RefreshResult> {
  const notes: string[] = [];
  const checkedAt = now.toISOString();
  const updated = new Map<string, CamState>();
  // Consumption is always taken from the client's measured value (counting it ourselves
  // drifts on failure).
  const startUnits = client.unitsUsed;
  const spent = (): number => client.unitsUsed - startUnits;
  // What counts against the subrequest limit is the number of calls, not units. Count it
  // separately.
  const startCalls = client.callsMade;
  const called = (): number => client.callsMade - startCalls;

  const staleness = (cam: Cam): string => states.get(cam.id)?.checkedAt ?? NEVER_CHECKED;
  let searchesUsed = 0;

  const byChannel = new Map<string, Cam[]>();
  for (const cam of cams) {
    const state = states.get(cam.id);
    if (state?.status === "live") continue;
    // Do not touch cameras the liveness sweep has never touched yet. Rediscovery is for
    // when "the recorded videoId died", and because it dredges a channel it always misses
    // some (long-running streams sink deep into the upload history).
    // Marking a living camera offline ahead of time defeats the purpose.
    if (state === undefined && resolvedVideoId(cam, undefined) !== null) continue;
    const list = byChannel.get(cam.source.channelId);
    if (list === undefined) byChannel.set(cam.source.channelId, [cam]);
    else list.push(cam);
  }

  // Start with the channels holding the camera that has been left alone the longest.
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
      notes.push("rediscovery cut short because the budget ran out");
      break;
    }
    // Take this channel on only when it fits the allowance even if walked to the worst case.
    if (called() + MAX_CALLS_PER_CHANNEL > maxCalls) {
      notes.push("rediscovery cut short because the subrequest limit was reached (the rest waits for the next run)");
      break;
    }

    // Once every camera being looked for in this channel is found, nothing further is needed.
    const foundAll = (live: readonly YouTubeVideo[]): boolean =>
      channelCams.every((cam) => matchStream(cam.source.titleKey, live) !== null);

    let streams: YouTubeVideo[];
    try {
      streams = await client.listChannelLiveStreamsViaUploads(channelId, foundAll);
    } catch (error) {
      notes.push(`[${channelId}] rediscovery failed: ${String(error)}`);
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
    // It may just not have been in the latest 50, so if there is room fall back to the
    // exhaustive search.
    if (
      missing.length > 0 &&
      searchesUsed < maxSearches &&
      spent() + CHANNEL_LOOKUP_COST.viaSearch <= unitBudget &&
      called() + 2 <= maxCalls
    ) {
      searchesUsed += 1;
      try {
        streams = await client.listChannelLiveStreamsViaSearch(channelId);
        missing = resolve();
      } catch (error) {
        notes.push(`[${channelId}] rediscovery via search failed: ${String(error)}`);
      }
    }
    if (missing.length > 0) {
      notes.push(`[${channelId}] could not tell the streams apart, left as is: ${missing.join(", ")}`);
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
