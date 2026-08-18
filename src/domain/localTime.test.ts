import { formatLocalTime, localHour, utcOffsetLabel } from "./localTime";

const T = new Date("2026-08-18T12:00:00Z");

describe("formatLocalTime", () => {
  it("24 時間表記で現地時刻を返す", () => {
    expect(formatLocalTime(T, "Asia/Tokyo")).toBe("21:00");
    expect(formatLocalTime(T, "UTC")).toBe("12:00");
  });

  it("日付をまたぐタイムゾーンでも正しい", () => {
    expect(formatLocalTime(T, "America/Los_Angeles")).toBe("05:00");
  });
});

describe("localHour", () => {
  it("現地の時(0-23)を返す", () => {
    expect(localHour(T, "Asia/Tokyo")).toBe(21);
    expect(localHour(T, "UTC")).toBe(12);
  });

  it("深夜 0 時を 0 として返す(24 ではない)", () => {
    expect(localHour(new Date("2026-08-18T15:00:00Z"), "Asia/Tokyo")).toBe(0);
  });
});

describe("utcOffsetLabel", () => {
  it("正のオフセットに + を付ける", () => {
    expect(utcOffsetLabel(T, "Asia/Tokyo")).toBe("UTC+9");
  });

  it("負のオフセットに - を付ける", () => {
    expect(utcOffsetLabel(T, "America/New_York")).toBe("UTC-4");
  });

  it("UTC ちょうどは符号なしで表す", () => {
    expect(utcOffsetLabel(T, "UTC")).toBe("UTC");
  });

  it("オフセット 0 の地域も UTC と表す(Intl は素の GMT を返す)", () => {
    expect(utcOffsetLabel(T, "Atlantic/Reykjavik")).toBe("UTC");
  });

  it("30 分刻みのオフセットを分まで表す", () => {
    expect(utcOffsetLabel(T, "Asia/Kolkata")).toBe("UTC+5:30");
  });

  it("45 分刻みのオフセットも表せる", () => {
    expect(utcOffsetLabel(T, "Asia/Kathmandu")).toBe("UTC+5:45");
  });
});
