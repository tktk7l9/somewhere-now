/// <reference types="vite/client" />
// Worker の tsconfig は node の型を持たない(Worker 本体が node の API を
// 掴んでいないことを検査するため)ので、設定は fs でなく ?raw で読む。
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

/** wrangler.jsonc の triggers.crons。コメントと末尾カンマを落としてから読む。 */
function configuredCrons(): string[] {
  const stripped = wranglerSource
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/,(\s*[}\]])/g, "$1");
  const config = JSON.parse(stripped) as { triggers: { crons: string[] } };
  return config.triggers.crons;
}

describe("CRON", () => {
  // Cron 式は wrangler.jsonc とコードに二重に書かれる。ずれると roleForCron が
  // 役割を取り違え、生存確認の Cron で再探索が走る(枠も台帳も入れ替わる)。
  it("wrangler.jsonc の triggers.crons と一致する", () => {
    expect([...configuredCrons()].sort()).toEqual(Object.values(CRON).sort());
  });

  // 2 つの Cron が同じ分に起きると、同じ正本を読んで別々に書き戻し、
  // 後勝ちで一方の消費と状態が丸ごと消える(KV に atomic は無い)。
  it("2 つの Cron は同じ分に発火しない", () => {
    const sweep = new Set(firingMinutes(CRON.sweep));
    const overlap = firingMinutes(CRON.rediscover).filter((m) => sweep.has(m));
    expect(overlap).toEqual([]);
  });
});

describe("firingMinutes", () => {
  it("*/N は 0 から N 分ごとに並べる", () => {
    expect(firingMinutes("*/10 * * * *")).toEqual([0, 10, 20, 30, 40, 50]);
  });

  it("分を固定した式は 1 度だけ起きる", () => {
    expect(firingMinutes("5 * * * *")).toEqual([5]);
  });

  it("解釈できない式は黙って通さない", () => {
    expect(() => firingMinutes("0 */2 * * *")).toThrow(/Cron/);
  });
});

describe("roleForCron", () => {
  it("設定した式をそれぞれの役割に対応させる", () => {
    expect(roleForCron(CRON.sweep)).toBe("sweep");
    expect(roleForCron(CRON.rediscover)).toBe("rediscover");
  });

  // 既定を rediscover にすると、式を変えた瞬間に全実行が再探索になって気づけない。
  it("知らない式には役割を与えない", () => {
    expect(roleForCron("*/7 * * * *")).toBeNull();
  });
});

describe("ledgerIn", () => {
  it("台帳をまだ持たない正本には null を返す", () => {
    expect(ledgerIn(state(), "sweep", NOW)).toBeNull();
  });

  it("他方の役割しか無ければ null を返す", () => {
    const payload = state({ ledgers: { rediscover: { day: "2026-08-31", used: 400 } } });
    expect(ledgerIn(payload, "sweep", NOW)).toBeNull();
  });

  it("同じ日の台帳はそのまま使う", () => {
    const stored = { day: "2026-08-31", used: 330 };
    expect(ledgerIn(state({ ledgers: { sweep: stored } }), "sweep", NOW)).toEqual(stored);
  });

  it("日が変わっていればゼロから数え直す", () => {
    const payload = state({ ledgers: { sweep: { day: "2026-08-30", used: 3900 } } });
    expect(ledgerIn(payload, "sweep", NOW)).toEqual({ day: "2026-08-31", used: 0 });
  });
});

describe("withLedger", () => {
  it("他方の役割の台帳を巻き添えにしない", () => {
    const payload = state({ ledgers: { rediscover: { day: "2026-08-31", used: 411 } } });
    const next = withLedger(payload, "sweep", { day: "2026-08-31", used: 330 });
    expect(next.ledgers).toEqual({
      rediscover: { day: "2026-08-31", used: 411 },
      sweep: { day: "2026-08-31", used: 330 },
    });
  });

  it("カメラの状態と更新時刻はそのまま持ち越す", () => {
    const payload = state();
    const next = withLedger(payload, "sweep", { day: "2026-08-31", used: 1 });
    expect(next.cams).toEqual(payload.cams);
    expect(next.updatedAt).toBe(payload.updatedAt);
  });

  it("渡された正本を書き換えない", () => {
    const payload = state({ ledgers: { sweep: { day: "2026-08-31", used: 330 } } });
    withLedger(payload, "sweep", { day: "2026-08-31", used: 999 });
    expect(payload.ledgers).toEqual({ sweep: { day: "2026-08-31", used: 330 } });
  });
});
