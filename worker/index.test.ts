// Cron path of the Worker entry, run against an in-memory KV and a stubbed fetch.
// The entry is outside the coverage gate; these tests pin the two promises that matter in
// production: the quota ledger is written even when the refresh fails, and nothing escapes
// to ctx.waitUntil (where an exception would vanish without a log).

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "./index";
import { CRON, type StatePayload } from "./schedule";

const STATE_KEY = "cam-state:v1";
const PUBLIC_KEY = "cam-state-public:v1";

function memoryKv(initial: Record<string, string> = {}, opts: { failGet?: boolean } = {}) {
  const store = new Map(Object.entries(initial));
  const puts: string[] = [];
  const kv = {
    async get(key: string, type?: string) {
      if (opts.failGet === true) throw new Error("KV unavailable");
      const value = store.get(key) ?? null;
      return value !== null && type === "json" ? JSON.parse(value) : value;
    },
    async put(key: string, value: string) {
      puts.push(key);
      store.set(key, value);
    },
  };
  return { kv: kv as unknown as KVNamespace, store, puts };
}

/** The in-memory KV also needs getWithMetadata for the /api/cams path. */
function memoryKvWithMeta(initial: Record<string, string> = {}) {
  const base = memoryKv(initial);
  const kv = base.kv as unknown as Record<string, unknown>;
  kv.getWithMetadata = async (key: string) => ({
    value: base.store.get(key) ?? null,
    metadata: base.store.has(key) ? { updatedAt: "2026-10-06T00:00:00.000Z" } : null,
  });
  return base;
}

async function runFetch(request: Request, env: Record<string, unknown>): Promise<Response> {
  const pending: Promise<unknown>[] = [];
  const ctx = { waitUntil: (p: Promise<unknown>) => pending.push(p) } as unknown as ExecutionContext;
  const response = await worker.fetch!(request as never, env as never, ctx);
  await Promise.all(pending);
  return response;
}

async function runCron(cron: string, env: Record<string, unknown>): Promise<void> {
  const pending: Promise<unknown>[] = [];
  const ctx = { waitUntil: (p: Promise<unknown>) => pending.push(p) } as unknown as ExecutionContext;
  await worker.scheduled!({ cron } as ScheduledController, env as never, ctx);
  // Must resolve, never reject: a rejection here is the silent failure the entry guards against.
  await Promise.all(pending);
}

let logs: string[];

beforeEach(() => {
  logs = [];
  const record = (...args: unknown[]) => logs.push(args.map(String).join(" "));
  vi.spyOn(console, "log").mockImplementation(record);
  vi.spyOn(console, "warn").mockImplementation(record);
  vi.spyOn(console, "error").mockImplementation(record);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("scheduled", () => {
  it("writes the ledger but not the public copy when the YouTube API fails", async () => {
    vi.stubGlobal("fetch", async () => new Response("quotaExceeded", { status: 403 }));
    const { kv, store, puts } = memoryKv();

    await runCron(CRON.sweep, { CAM_STATE: kv, YOUTUBE_API_KEY: "k" });

    expect(logs[0]).toBe("[cron sweep] start");
    expect(logs.some((l) => l.startsWith("[cron sweep] refresh failed"))).toBe(true);
    expect(puts).toEqual([STATE_KEY]);
    const saved = JSON.parse(store.get(STATE_KEY)!) as StatePayload;
    expect(saved.ledgers?.sweep?.used).toBe(1);
    // The state itself is untouched (still the empty default)
    expect(saved.cams).toEqual({});
  });

  it("writes both the source of truth and the public copy when the refresh succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      async () => new Response(JSON.stringify({ items: [] }), { status: 200 }),
    );
    const { kv, store, puts } = memoryKv();

    await runCron(CRON.sweep, { CAM_STATE: kv, YOUTUBE_API_KEY: "k" });

    expect(puts).toEqual([STATE_KEY, PUBLIC_KEY]);
    const saved = JSON.parse(store.get(STATE_KEY)!) as StatePayload;
    expect(Object.keys(saved.cams).length).toBeGreaterThan(0);
    expect(saved.ledgers?.sweep?.used).toBeGreaterThan(0);
    expect(logs.at(-1)).toMatch(/^\[cron sweep\] used \d+ unit/);
  });

  it("drops the stream title that states written before 2026-10-04 still carry", async () => {
    vi.stubGlobal(
      "fetch",
      async () => new Response(JSON.stringify({ items: [] }), { status: 200 }),
    );
    const legacy = {
      updatedAt: new Date(0).toISOString(),
      cams: {
        "shibuya-crossing": {
          videoId: "8H3nRCFVR6Y",
          status: "live",
          viewers: 10,
          title: "an old stream title",
          // Checked just now, so the sweep leaves it alone and only the write-back touches it.
          checkedAt: new Date().toISOString(),
        },
      },
    };
    const { kv, store } = memoryKv({ [STATE_KEY]: JSON.stringify(legacy) });

    await runCron(CRON.sweep, { CAM_STATE: kv, YOUTUBE_API_KEY: "k" });

    const saved = JSON.parse(store.get(STATE_KEY)!) as StatePayload;
    expect(saved.cams["shibuya-crossing"]).toEqual({
      videoId: "8H3nRCFVR6Y",
      status: "live",
      viewers: 10,
      checkedAt: legacy.cams["shibuya-crossing"].checkedAt,
    });
  });

  it("logs and resolves when the KV read crashes before the refresh", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { kv, puts } = memoryKv({}, { failGet: true });

    await runCron(CRON.rediscover, { CAM_STATE: kv, YOUTUBE_API_KEY: "k" });

    expect(logs[0]).toBe("[cron rediscover] start");
    expect(logs[1]).toMatch(/^\[cron rediscover\] crashed before the refresh started .*KV get cam-state:v1 failed: KV unavailable/);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(puts).toEqual([]);
  });

  it("does nothing once the day's budget is used up", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const today = new Date().toISOString().slice(0, 10);
    const payload: StatePayload = {
      updatedAt: new Date(0).toISOString(),
      cams: {},
      ledgers: { sweep: { day: today, used: 4000 } },
    };
    const { kv, puts } = memoryKv({ [STATE_KEY]: JSON.stringify(payload) });

    await runCron(CRON.sweep, { CAM_STATE: kv, YOUTUBE_API_KEY: "k" });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(puts).toEqual([]);
    expect(logs[1]).toContain("budget (4000) is used up");
  });

  it("skips without a key and without touching KV", async () => {
    const { kv, puts } = memoryKv();
    await runCron(CRON.sweep, { CAM_STATE: kv });
    expect(logs[1]).toBe("[cron sweep] refresh skipped because YOUTUBE_API_KEY is not set");
    expect(puts).toEqual([]);
  });

  it("refuses an unknown Cron expression instead of guessing a role", async () => {
    const { kv, puts } = memoryKv();
    await runCron("0 0 * * *", { CAM_STATE: kv, YOUTUBE_API_KEY: "k" });
    expect(logs).toEqual(["[cron] an unknown Cron expression fired: 0 0 * * *"]);
    expect(puts).toEqual([]);
  });
});

describe("fetch", () => {
  beforeEach(() => {
    // Workers' edge cache; miss on every lookup so the handler builds the response itself.
    vi.stubGlobal("caches", { default: { match: async () => undefined, put: async () => undefined } });
  });

  it("serves /api/cams as JSON with the browser-hardening headers the static _headers cannot add", async () => {
    const { kv } = memoryKvWithMeta({ [PUBLIC_KEY]: '{"updatedAt":"2026-10-06T00:00:00.000Z","cams":{}}' });
    const res = await runFetch(new Request("https://example.test/api/cams"), { CAM_STATE: kv });

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/json; charset=utf-8");
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("strict-transport-security")).toBe("max-age=63072000; includeSubDomains; preload");
    expect(res.headers.get("etag")).toBe('"2026-10-06T00:00:00.000Z"');
  });

  it("answers 304 to a matching If-None-Match without a body", async () => {
    const { kv } = memoryKvWithMeta({ [PUBLIC_KEY]: '{"updatedAt":"2026-10-06T00:00:00.000Z","cams":{}}' });
    const req = new Request("https://example.test/api/cams", {
      headers: { "if-none-match": '"2026-10-06T00:00:00.000Z"' },
    });
    const res = await runFetch(req, { CAM_STATE: kv });
    expect(res.status).toBe(304);
    expect(await res.text()).toBe("");
  });

  it("rejects every method but GET on /api/cams without touching KV", async () => {
    const { kv, puts } = memoryKvWithMeta();
    for (const method of ["POST", "PUT", "DELETE", "PATCH"]) {
      const res = await runFetch(new Request("https://example.test/api/cams", { method }), { CAM_STATE: kv });
      expect(res.status).toBe(405);
      expect(res.headers.get("allow")).toBe("GET");
    }
    expect(puts).toEqual([]);
  });

  it("has no HTTP route that triggers the refresh; everything else goes to the static assets", async () => {
    const assets = { fetch: vi.fn(async () => new Response("asset")) };
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { kv, puts } = memoryKvWithMeta();
    for (const path of ["/__scheduled", "/api/refresh", "/cdn-cgi/handler/scheduled", "/api/cams/../refresh"]) {
      const res = await runFetch(new Request(`https://example.test${path}`), { CAM_STATE: kv, ASSETS: assets });
      expect(await res.text()).toBe("asset");
    }
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(puts).toEqual([]);
  });
});
