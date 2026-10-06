/// <reference types="vite/client" />
// The Worker tsconfig has no node types (to check that the Worker itself does not grab
// node APIs), so the config is read with ?raw instead of fs.
import wranglerSource from "../wrangler.jsonc?raw";
import type { CamState } from "../src/domain/cams";
import {
  CRON,
  type StatePayload,
  firingMinutes,
  ledgerIn,
  roleForCron,
  withLedger,
} from "./schedule";

const NOW = new Date("2026-08-31T12:00:00Z");

const state = (over: Partial<StatePayload> = {}): StatePayload => ({
  updatedAt: "2026-08-31T11:50:00Z",
  cams: { a: { videoId: "v", status: "live", viewers: 1, title: null, checkedAt: "" } as CamState },
  ...over,
});

/** triggers.crons in wrangler.jsonc. Read after dropping comments and trailing commas. */
function configuredCrons(): string[] {
  const stripped = wranglerSource
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/,(\s*[}\]])/g, "$1");
  const config = JSON.parse(stripped) as { triggers: { crons: string[] } };
  return config.triggers.crons;
}

describe("CRON", () => {
  // Cron expressions are written twice, in wrangler.jsonc and in code. If they drift,
  // roleForCron mixes up the roles and rediscovery runs on the liveness sweep Cron
  // (the budget and the ledger are swapped too).
  it("matches triggers.crons in wrangler.jsonc", () => {
    expect([...configuredCrons()].sort()).toEqual(Object.values(CRON).sort());
  });

  // If the 2 Crons fire in the same minute, they read the same source of truth and write it
  // back separately, and with last write wins the consumption and state of one of them are
  // lost entirely (KV has no atomic).
  it("the 2 Crons never fire in the same minute", () => {
    const sweep = new Set(firingMinutes(CRON.sweep));
    const overlap = firingMinutes(CRON.rediscover).filter((m) => sweep.has(m));
    expect(overlap).toEqual([]);
  });
});

describe("firingMinutes", () => {
  it("lists every N minutes from 0 for */N", () => {
    expect(firingMinutes("*/10 * * * *")).toEqual([0, 10, 20, 30, 40, 50]);
  });

  it("fires just once for an expression with a fixed minute", () => {
    expect(firingMinutes("5 * * * *")).toEqual([5]);
  });

  it("does not silently accept an expression it cannot interpret", () => {
    expect(() => firingMinutes("0 */2 * * *")).toThrow(/Cron/);
  });
});

describe("roleForCron", () => {
  it("maps each configured expression to its role", () => {
    expect(roleForCron(CRON.sweep)).toBe("sweep");
    expect(roleForCron(CRON.rediscover)).toBe("rediscover");
  });

  // With rediscover as the default, the moment an expression changes every run becomes
  // rediscovery and nobody notices.
  it("gives no role to an unknown expression", () => {
    expect(roleForCron("*/7 * * * *")).toBeNull();
  });
});

describe("ledgerIn", () => {
  it("returns null for a source of truth that has no ledger yet", () => {
    expect(ledgerIn(state(), "sweep", NOW)).toBeNull();
  });

  it("returns null when only the other role is present", () => {
    const payload = state({ ledgers: { rediscover: { day: "2026-08-31", used: 400 } } });
    expect(ledgerIn(payload, "sweep", NOW)).toBeNull();
  });

  it("uses a ledger from the same day as is", () => {
    const stored = { day: "2026-08-31", used: 330 };
    expect(ledgerIn(state({ ledgers: { sweep: stored } }), "sweep", NOW)).toEqual(stored);
  });

  it("recounts from zero when the day has changed", () => {
    const payload = state({ ledgers: { sweep: { day: "2026-08-30", used: 3900 } } });
    expect(ledgerIn(payload, "sweep", NOW)).toEqual({ day: "2026-08-31", used: 0 });
  });
});

describe("withLedger", () => {
  it("does not drag the other role's ledger along", () => {
    const payload = state({ ledgers: { rediscover: { day: "2026-08-31", used: 411 } } });
    const next = withLedger(payload, "sweep", { day: "2026-08-31", used: 330 });
    expect(next.ledgers).toEqual({
      rediscover: { day: "2026-08-31", used: 411 },
      sweep: { day: "2026-08-31", used: 330 },
    });
  });

  it("carries over the camera states and the update time as is", () => {
    const payload = state();
    const next = withLedger(payload, "sweep", { day: "2026-08-31", used: 1 });
    expect(next.cams).toEqual(payload.cams);
    expect(next.updatedAt).toBe(payload.updatedAt);
  });

  it("does not mutate the source of truth passed in", () => {
    const payload = state({ ledgers: { sweep: { day: "2026-08-31", used: 330 } } });
    withLedger(payload, "sweep", { day: "2026-08-31", used: 999 });
    expect(payload.ledgers).toEqual({ sweep: { day: "2026-08-31", used: 330 } });
  });
});
