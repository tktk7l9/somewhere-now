// Cloudflare Worker entry.
//
//   fetch     ... returns the live liveness state in KV at /api/cams. Everything else is
//                 static assets.
//   scheduled ... calls the YouTube Data API from a Cron Trigger and updates KV.
//
// The API key exists only here (a Worker secret) and never reaches the browser.
// Quota used is accumulated per day in the quota ledger in KV, and calls stop once the
// budget is exceeded.

import { CAMS } from "../src/data/cams";
import { publicStates } from "../src/domain/cams";
import {
  ROLE_UNIT_BUDGET,
  ledgerForDay,
  pruneOrphans,
  rediscover,
  remainingUnits,
  sweepLiveness,
  type QuotaLedger,
} from "./refresh";
import {
  ledgerIn,
  roleForCron,
  withLedger,
  type Role,
  type StatePayload,
} from "./schedule";
import { createYouTubeClient } from "./youtube";

interface Env {
  ASSETS: Fetcher;
  CAM_STATE: KVNamespace;
  YOUTUBE_API_KEY?: string;
}

/** Source of truth. Includes title and checkedAt; the side the update algorithm reads. */
const STATE_KEY = "cam-state:v1";
/**
 * Public copy, reduced to the shape served to the browser. /api/cams returns this **as is**.
 *
 * The source of truth is 1.2MB, and doing parse -> projection -> stringify on every request
 * makes the response take 100-300ms (measured). If the string reduced to only the 3 fields
 * needed for display is built just once at update time, a read only has to fetch it from KV
 * and return it.
 */
const PUBLIC_KEY = "cam-state-public:v1";

/**
 * Keys where the quota ledger was kept from 2026-08-28 to 08-31. **Used only for the handover**.
 *
 * The ledger now lives inside the source of truth (STATE_KEY). Splitting it into a separate
 * key adds 1 write per run, and Cron 7 runs/hour x 24 hours = 504 writes/day was burning half
 * of the free tier (1,000/day) (discovered on 2026-08-31 through Cloudflare's 50% warning).
 *
 * This is read only when "the source of truth does not have a ledger yet" = just once per
 * role. Recounting from zero in the middle of the migration **removes the whole cap guard
 * for that day** (the kind of incident where the liveness sweep burned 7,300 units on
 * 2026-08-27 could no longer be stopped).
 * Once both roles have finished writing the new source of truth, these keys can be deleted.
 */
const LEGACY_LEDGER_KEY: Record<Role, string> = {
  sweep: "quota-ledger:sweep:v1",
  rediscover: "quota-ledger:rediscover:v1",
};

/**
 * **Upper limit** on the number of channels rediscovered per hour.
 *
 * What decides how many channels actually get covered is not this number but
 * MAX_CALLS_PER_REDISCOVER. 1 channel walks up to 3 pages of uploads and makes 6 calls, so
 * allowing 24 channels by count alone becomes 144 requests, and more than half fail at the
 * subrequest limit (50) (on 2026-08-28, 12 of 24 channels were actually dropped).
 *
 * This is the ceiling meaning "even if call capacity is left over, do not reach any further".
 * If the target is on page 1, 2 calls are enough, so the channel count grows by however much
 * capacity is free.
 */
const REDISCOVER_CHANNELS_PER_RUN = 24;
/** Of those, how many times falling back to the expensive search path (101 units) is allowed. */
const REDISCOVER_SEARCHES_PER_RUN = 1;
/**
 * Upper limit a single rediscovery run may use. The daily budget (4,000) divided by 24 runs.
 * If 1 run eats up the budget, all remaining rediscovery for that day stops.
 */
const REDISCOVER_UNITS_PER_RUN = Math.floor(ROLE_UNIT_BUDGET.rediscover / 24);

/** Marker attached to PUBLIC_KEY. Used to build the ETag without parsing the body. */
interface PublicMeta {
  updatedAt: string;
}

async function readState(env: Env): Promise<StatePayload> {
  const stored = await env.CAM_STATE.get<StatePayload>(STATE_KEY, "json");
  return stored ?? { updatedAt: new Date(0).toISOString(), cams: {} };
}

/**
 * Takes the quota ledger of that role out of the source of truth.
 * If the source of truth does not have one yet, takes it over from the legacy key
 * (just once per role).
 */
async function ledgerFor(
  payload: StatePayload,
  role: Role,
  env: Env,
  now: Date,
): Promise<QuotaLedger> {
  const carried = ledgerIn(payload, role, now);
  if (carried !== null) return carried;
  const legacy = await env.CAM_STATE.get<QuotaLedger>(LEGACY_LEDGER_KEY[role], "json");
  return ledgerForDay(legacy, now);
}

/** Body served to the browser. Reduced to only the 3 fields used for display. */
function publicBody(payload: StatePayload): string {
  return JSON.stringify({ updatedAt: payload.updatedAt, cams: publicStates(payload.cams) });
}

function camsHeaders(updatedAt: string): Headers {
  return new Headers({
    "content-type": "application/json; charset=utf-8",
    // The state is updated every 10 minutes, so a 1-minute cache follows it well enough.
    "cache-control": "public, max-age=60",
    // The update time serves directly as the version number. As long as the content does not
    // change, 304 can be returned.
    etag: `"${updatedAt}"`,
    // public/_headers for static assets does not apply here, so set these ourselves.
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
  });
}

/**
 * Builds the body of the liveness state. If the public copy does not exist yet, builds it
 * from the source of truth and writes it back so the copy is enough from the next time on
 * (a path taken only 1 time right after a deploy).
 */
async function buildCamsResponse(env: Env, ctx: ExecutionContext): Promise<Response> {
  const cached = await env.CAM_STATE.getWithMetadata<PublicMeta>(PUBLIC_KEY, "text");
  if (cached.value !== null && cached.metadata !== null) {
    return new Response(cached.value, { headers: camsHeaders(cached.metadata.updatedAt) });
  }

  const payload = await readState(env);
  const body = publicBody(payload);
  ctx.waitUntil(
    env.CAM_STATE.put(PUBLIC_KEY, body, { metadata: { updatedAt: payload.updatedAt } }),
  );
  return new Response(body, { headers: camsHeaders(payload.updatedAt) });
}

/**
 * /api/cams.
 *
 * 3 layers take effect, and the lower ones are more certain:
 *   1. Edge cache ... Worker responses are not put on the CDN automatically, so we place
 *      them ourselves. It works on workers.dev too (measured cf-cache-status: HIT in
 *      production). When a custom domain is attached, moving to Workers Caching (wrangler's
 *      cache.enabled) means this whole function is no longer called on a hit.
 *   2. ETag ... the browser fetches every 2 minutes but the content changes every 10 minutes,
 *      so 4 out of 5 times it is a 304 and the body (about 144KB) is not sent.
 *   3. Just return the public copy ... stops the parse and projection of the 1.2MB source of
 *      truth (this has the biggest effect).
 */
async function camsResponse(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const cache = caches.default;
  // The key is the URL only. Mixing in conditional request headers scatters the keys.
  const cacheKey = new Request(new URL("/api/cams", request.url).toString());

  let response = await cache.match(cacheKey);
  if (response === undefined) {
    response = await buildCamsResponse(env, ctx);
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  }

  const etag = response.headers.get("etag");
  if (etag !== null && request.headers.get("if-none-match") === etag) {
    // A 304 carries no body. Return only the headers needed to judge the version.
    return new Response(null, {
      status: 304,
      headers: {
        etag,
        "cache-control": "public, max-age=60",
      },
    });
  }
  return response;
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/cams") {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET" } });
      }
      return camsResponse(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(refresh(controller.cron, env));
  },
} satisfies ExportedHandler<Env>;

/**
 * Cron entry point. Its only responsibility is to **leave at least 1 log line no matter what**.
 *
 * When updates stopped for 3.6 hours on 2026-08-28, neither the quota ledger nor the state
 * moved and the logs were empty, so there was no clue at all to tell apart "Cron did not
 * fire" from "it fired but crashed". `scheduled` passes this to `ctx.waitUntil`, so an
 * exception thrown here disappears without anyone receiving it.
 */
async function refresh(cron: string, env: Env): Promise<void> {
  const role = roleForCron(cron);
  if (role === null) {
    // Falling back to a default role would make every run take one role when only
    // wrangler.jsonc is edited, and the budget and the ledger would stay swapped unnoticed.
    console.error(`[cron] an unknown Cron expression fired: ${cron}`);
    return;
  }
  // Record the fact that it fired first. Without this the reason for silence cannot be traced.
  console.log(`[cron ${role}] start`);

  try {
    await update(role, env);
  } catch (error) {
    // Execution gets here when it crashed before calling YouTube, such as on the KV read
    // (beyond that, the try inside update catches it and still writes the ledger).
    console.error(`[cron ${role}] crashed before the refresh started`, error);
  }
}

async function update(role: Role, env: Env): Promise<void> {
  const apiKey = env.YOUTUBE_API_KEY;
  if (apiKey === undefined || apiKey === "") {
    console.error(`[cron ${role}] refresh skipped because YOUTUBE_API_KEY is not set`);
    return;
  }

  const now = new Date();
  const payload = await readState(env);
  const ledger = await ledgerFor(payload, role, env, now);
  const budget = remainingUnits(ledger, ROLE_UNIT_BUDGET[role]);
  if (budget === 0) {
    console.warn(`[cron ${role}] today's budget (${ROLE_UNIT_BUDGET[role]}) is used up, doing nothing`);
    return;
  }

  const states = new Map(Object.entries(payload.cams));
  const client = createYouTubeClient(apiKey, fetch);
  // The ledger must advance even if the update fails, so the source of truth to write back
  // is kept outside the try. Whether it was replaced (= next !== payload) also decides
  // whether the public copy is rebuilt.
  let next = payload;

  try {
    const result =
      role === "sweep"
        ? await sweepLiveness(CAMS, states, client, now, budget)
        : await rediscover(CAMS, states, client, now, {
            maxChannels: REDISCOVER_CHANNELS_PER_RUN,
            maxSearches: REDISCOVER_SEARCHES_PER_RUN,
            unitBudget: Math.min(budget, REDISCOVER_UNITS_PER_RUN),
          });

    for (const [camId, state] of result.states) states.set(camId, state);
    // Neither path touches the state of ids removed from the master, so sweep them out here.
    const { kept, removed } = pruneOrphans(states, CAMS);
    next = { ...payload, updatedAt: now.toISOString(), cams: Object.fromEntries(kept) };

    const live = [...kept.values()].filter((s) => s.status === "live").length;
    console.log(`[cron ${role}] refreshed ${result.states.size} / live ${live}`);
    if (removed.length > 0) {
      console.warn(`[cron ${role}] pruned states missing from the master: ${removed.join(", ")}`);
    }
    for (const note of result.notes) console.warn(`[cron ${role}] ${note}`);
  } catch (error) {
    // Give up on updating the state. The next run can redo it.
    console.error(`[cron ${role}] refresh failed`, error);
  } finally {
    // Even on failure the quota on Google's side has been consumed, so always write the ledger.
    // If this sat inside the try, then when Cron keeps running with an invalid key the cap
    // guard would not notice and a whole day's budget would be burned.
    const used = ledger.used + client.unitsUsed;
    // The source of truth is written **just once**, with the ledger riding along. Splitting
    // the ledger into a separate key makes it 3 writes per run and burns half of the KV
    // free tier.
    await env.CAM_STATE.put(
      STATE_KEY,
      JSON.stringify(withLedger(next, role, { day: ledger.day, used })),
    );
    // The public copy is written only when the content was replaced. On a run where the
    // update failed it is the same as the source of truth, so rewriting it would not change
    // the content (= it would only use up quota).
    if (next !== payload) {
      await env.CAM_STATE.put(PUBLIC_KEY, publicBody(next), {
        metadata: { updatedAt: next.updatedAt },
      });
    }
    console.log(
      `[cron ${role}] used ${client.unitsUsed} unit (today's total ${used}/${ROLE_UNIT_BUDGET[role]})`,
    );
  }
}
