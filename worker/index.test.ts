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
