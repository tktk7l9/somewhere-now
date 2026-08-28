import { describe, expect, it } from "vitest";
import { coalesced } from "./coalesce";

/** 手で流せる偽スケジューラ。 */
function manualScheduler(): { schedule: (cb: () => void) => void; flush: () => void } {
  let pending: (() => void)[] = [];
  return {
    schedule: (cb) => void pending.push(cb),
    flush: () => {
      const queued = pending;
      pending = [];
      for (const cb of queued) cb();
    },
  };
}

describe("coalesced", () => {
  it("続けて何度呼んでも実行は 1 回にまとまる", () => {
    const { schedule, flush } = manualScheduler();
    let runs = 0;
    const request = coalesced(() => void (runs += 1), schedule);

    request();
    request();
    request();
    flush();

    expect(runs).toBe(1);
  });

  it("まとめる前は実行しない(予約するだけ)", () => {
    const { schedule } = manualScheduler();
    let runs = 0;
    const request = coalesced(() => void (runs += 1), schedule);

    request();

    expect(runs).toBe(0);
  });

  it("一度流したあとに頼めばまた実行する", () => {
    const { schedule, flush } = manualScheduler();
    let runs = 0;
    const request = coalesced(() => void (runs += 1), schedule);

    request();
    flush();
    request();
    flush();

    expect(runs).toBe(2);
  });

  it("一度も頼まなければ実行しない", () => {
    const { schedule, flush } = manualScheduler();
    let runs = 0;
    coalesced(() => void (runs += 1), schedule);

    flush();

    expect(runs).toBe(0);
  });
});
