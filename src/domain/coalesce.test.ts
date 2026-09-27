import { describe, expect, it } from "vitest";
import { coalesced } from "./coalesce";

/** A fake scheduler that is flushed by hand. */
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
  it("runs only once no matter how many times it is called in a row", () => {
    const { schedule, flush } = manualScheduler();
    let runs = 0;
    const request = coalesced(() => void (runs += 1), schedule);

    request();
    request();
    request();
    flush();

    expect(runs).toBe(1);
  });

  it("does not run before the flush (it only schedules)", () => {
    const { schedule } = manualScheduler();
    let runs = 0;
    const request = coalesced(() => void (runs += 1), schedule);

    request();

    expect(runs).toBe(0);
  });

  it("runs again when requested after a flush", () => {
    const { schedule, flush } = manualScheduler();
    let runs = 0;
    const request = coalesced(() => void (runs += 1), schedule);

    request();
    flush();
    request();
    flush();

    expect(runs).toBe(2);
  });

  it("does not run if it was never requested", () => {
    const { schedule, flush } = manualScheduler();
    let runs = 0;
    coalesced(() => void (runs += 1), schedule);

    flush();

    expect(runs).toBe(0);
  });
});
