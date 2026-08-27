import { liveDialCaption, t } from "./i18n";

describe("liveDialCaption", () => {
  it("絞っていないときは配信中数と収録全件を並べる", () => {
    expect(liveDialCaption(12, 176, 176, "ja")).toEqual({
      count: "12",
      total: "/ 176",
      label: "地点が配信中",
      aria: "176 地点中 12 地点が配信中",
    });
    expect(liveDialCaption(12, 176, 176, "en")).toEqual({
      count: "12",
      total: "/ 176",
      label: "places are live",
      aria: "12 of 176 places are live",
    });
  });

  it("絞っているときは表示件数の横に収録全件を添える", () => {
    expect(liveDialCaption(12, 40, 176, "ja")).toEqual({
      count: "12",
      total: "/ 40",
      label: "地点が配信中 · 全 176 地点",
      aria: "全 176 地点のうち 40 地点を表示、うち 12 地点が配信中",
    });
    expect(liveDialCaption(12, 40, 176, "en")).toEqual({
      count: "12",
      total: "/ 40",
      label: "places are live · 176 total",
      aria: "12 of 40 shown places are live (176 total)",
    });
  });

  it("すべて配信中でも分子と分母を出す", () => {
    expect(liveDialCaption(5, 5, 5, "ja")).toEqual({
      count: "5",
      total: "/ 5",
      label: t("liveHeadline", "ja"),
      aria: "5 地点中 5 地点が配信中",
    });
  });

  it("0 件でも分母は残す", () => {
    expect(liveDialCaption(0, 40, 40, "ja").count).toBe("0");
    expect(liveDialCaption(0, 40, 40, "ja").total).toBe("/ 40");
    expect(liveDialCaption(0, 40, 40, "en").aria).toBe("0 of 40 places are live");
  });

  it("表示 0 件でも収録全件は添える", () => {
    expect(liveDialCaption(0, 0, 176, "ja")).toEqual({
      count: "0",
      total: "/ 0",
      label: "地点が配信中 · 全 176 地点",
      aria: "全 176 地点のうち 0 地点を表示、うち 0 地点が配信中",
    });
  });
});

describe("視聴が多い順の文言", () => {
  it("チップは並びの意味をそのまま書く", () => {
    expect(t("watching", "ja")).toBe("視聴が多い順");
    expect(t("watching", "en")).toBe("Most watching");
  });

  it("一覧の案内は人数順だと分かる", () => {
    expect(t("watchingLead", "ja")).toContain("人数の多い順");
    expect(t("watchingLead", "en")).toContain("how many people are watching");
    expect(t("watchingHint", "ja")).toContain("一覧");
  });
});
