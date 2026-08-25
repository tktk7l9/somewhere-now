import type { Cam, CamState } from "./cams";
import {
  BREAK_DURATIONS_MIN,
  breakProgress,
  decodeRecent,
  encodeRecent,
  formatRemaining,
  isNightHour,
  pickDestination,
  rememberRecent,
} from "./breakMode";

const cam = (id: string): Cam => ({
  id,
  name: { ja: id, en: id },
  lat: 0,
  lng: 0,
  timeZone: "UTC",
  category: "city",
  country: "JP",
  source: { videoId: `v-${id}`, channelId: "UC0000000000000000000000", titleKey: id },
});

const live = (id: string): [string, CamState] => [
  id,
  { videoId: `v-${id}`, status: "live", viewers: 1, title: id, checkedAt: "x" },
];
const dead = (id: string): [string, CamState] => [
  id,
  { videoId: null, status: "offline", viewers: null, title: null, checkedAt: "x" },
];

describe("BREAK_DURATIONS_MIN", () => {
  it("短い順に並んでいる", () => {
    expect([...BREAK_DURATIONS_MIN]).toEqual([...BREAK_DURATIONS_MIN].sort((a, b) => a - b));
  });
});

describe("isNightHour", () => {
  it("夜と昼を分ける", () => {
    expect(isNightHour(23)).toBe(true);
    expect(isNightHour(3)).toBe(true);
    expect(isNightHour(5)).toBe(true);
    expect(isNightHour(6)).toBe(false);
    expect(isNightHour(12)).toBe(false);
    expect(isNightHour(18)).toBe(false);
    expect(isNightHour(19)).toBe(true);
  });
});

describe("pickDestination", () => {
  const ctx = (over: Partial<Parameters<typeof pickDestination>[1]> = {}) => ({
    states: new Map([live("day1"), live("day2"), live("night1"), live("night2")]),
    nightIds: new Set(["night1", "night2"]),
    recentIds: [] as string[],
    viewerIsNight: false,
    ...over,
  });
  const cams = [cam("day1"), cam("day2"), cam("night1"), cam("night2")];

  it("見る人が昼なら、夜の場所へ連れて行く", () => {
    const picked = pickDestination(cams, ctx({ viewerIsNight: false }), () => 0);
    expect(["night1", "night2"]).toContain(picked!.id);
  });

  it("見る人が夜なら、昼の場所へ連れて行く", () => {
    const picked = pickDestination(cams, ctx({ viewerIsNight: true }), () => 0);
    expect(["day1", "day2"]).toContain(picked!.id);
  });

  it("配信していない場所には連れて行かない", () => {
    const states = new Map([dead("night1"), dead("night2"), live("day1"), live("day2")]);
    const picked = pickDestination(cams, ctx({ states, viewerIsNight: false }), () => 0);
    // 夜が全滅しているので、生きている昼へ倒す。
    expect(["day1", "day2"]).toContain(picked!.id);
  });

  it("直近に見た場所は避ける", () => {
    const picked = pickDestination(cams, ctx({ recentIds: ["night1"] }), () => 0);
    expect(picked!.id).toBe("night2");
  });

  it("避けた結果ゼロになるなら、避けるのをやめる", () => {
    const picked = pickDestination(cams, ctx({ recentIds: ["night1", "night2"] }), () => 0);
    // 逆の時間帯がもう無いので、昼から選ぶ。
    expect(["day1", "day2"]).toContain(picked!.id);
  });

  it("全部を直近に見ていても、どこかへは連れて行く", () => {
    const picked = pickDestination(
      cams,
      ctx({ recentIds: ["day1", "day2", "night1", "night2"] }),
      () => 0,
    );
    expect(picked).not.toBeNull();
  });

  it("ライブが 1 つも無ければ null", () => {
    const states = new Map([dead("day1"), dead("day2"), dead("night1"), dead("night2")]);
    expect(pickDestination(cams, ctx({ states }), () => 0)).toBeNull();
  });

  it("候補が空なら null", () => {
    expect(pickDestination([], ctx(), () => 0)).toBeNull();
  });

  it("乱数で行き先が変わる", () => {
    const first = pickDestination(cams, ctx(), () => 0);
    const last = pickDestination(cams, ctx(), () => 0.99);
    expect(first!.id).not.toBe(last!.id);
  });
});

describe("breakProgress", () => {
  const start = new Date("2026-08-20T10:00:00Z");

  it("始めた直後は 0 で、残りは満額", () => {
    expect(breakProgress(start, start, 5)).toEqual({
      ratio: 0,
      remainingSeconds: 300,
      done: false,
    });
  });

  it("半分過ぎたら 0.5", () => {
    const now = new Date("2026-08-20T10:02:30Z");
    expect(breakProgress(start, now, 5)).toMatchObject({ ratio: 0.5, remainingSeconds: 150 });
  });

  it("時間が来たら done", () => {
    const now = new Date("2026-08-20T10:05:00Z");
    expect(breakProgress(start, now, 5)).toEqual({ ratio: 1, remainingSeconds: 0, done: true });
  });

  it("行き過ぎても 1 と 0 で止まる", () => {
    const now = new Date("2026-08-20T10:30:00Z");
    expect(breakProgress(start, now, 5)).toEqual({ ratio: 1, remainingSeconds: 0, done: true });
  });

  it("時計が巻き戻っても負にならない", () => {
    const now = new Date("2026-08-20T09:59:00Z");
    expect(breakProgress(start, now, 5)).toMatchObject({ ratio: 0, remainingSeconds: 300 });
  });
});

describe("formatRemaining", () => {
  it("分:秒 で表す", () => {
    expect(formatRemaining(300)).toBe("5:00");
    expect(formatRemaining(65)).toBe("1:05");
    expect(formatRemaining(9)).toBe("0:09");
    expect(formatRemaining(0)).toBe("0:00");
  });
});

describe("直近に見た場所の記憶", () => {
  it("スキーマ版を付けて往復する", () => {
    expect(decodeRecent(encodeRecent(["a", "b"]))).toEqual(["a", "b"]);
  });

  it("保存が無い・壊れている・版が違うものは空として扱う", () => {
    expect(decodeRecent(null)).toEqual([]);
    expect(decodeRecent("{{{")).toEqual([]);
    expect(decodeRecent('{"v":99,"ids":["a"]}')).toEqual([]);
    expect(decodeRecent('{"v":1,"ids":"a"}')).toEqual([]);
    expect(decodeRecent("[1,2]")).toEqual([]);
  });

  it("文字列でない要素を落とす", () => {
    expect(decodeRecent('{"v":1,"ids":["a",1,null,"b"]}')).toEqual(["a", "b"]);
  });

  it("新しいものを先頭に足し、上限で古いものを捨てる", () => {
    expect(rememberRecent(["b", "c"], "a", 3)).toEqual(["a", "b", "c"]);
    expect(rememberRecent(["b", "c", "d"], "a", 3)).toEqual(["a", "b", "c"]);
  });

  it("同じ場所を続けて見ても重複しない", () => {
    expect(rememberRecent(["a", "b"], "a", 3)).toEqual(["a", "b"]);
  });
});
