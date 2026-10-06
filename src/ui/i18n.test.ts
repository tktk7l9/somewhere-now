import { closedNotice, countryName, liveDialCaption, t, viewersText } from "./i18n";

describe("liveDialCaption", () => {
  it("puts the live count and the full catalog side by side when not filtered", () => {
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

  it("adds the full catalog next to the shown count when filtered", () => {
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

  it("shows numerator and denominator even when all are live", () => {
    expect(liveDialCaption(5, 5, 5, "ja")).toEqual({
      count: "5",
      total: "/ 5",
      label: t("liveHeadline", "ja"),
      aria: "5 地点中 5 地点が配信中",
    });
  });

  it("keeps the denominator even at 0", () => {
    expect(liveDialCaption(0, 40, 40, "ja").count).toBe("0");
    expect(liveDialCaption(0, 40, 40, "ja").total).toBe("/ 40");
    expect(liveDialCaption(0, 40, 40, "en").aria).toBe("0 of 40 places are live");
  });

  it("adds the full catalog even with 0 shown", () => {
    expect(liveDialCaption(0, 0, 176, "ja")).toEqual({
      count: "0",
      total: "/ 0",
      label: "地点が配信中 · 全 176 地点",
      aria: "全 176 地点のうち 0 地点を表示、うち 0 地点が配信中",
    });
  });
});

describe("wording of the most-watched order", () => {
  it("writes the meaning of the order plainly on the chip", () => {
    expect(t("watching", "ja")).toBe("視聴が多い順");
    expect(t("watching", "en")).toBe("Most watching");
  });

  it("makes it clear the list guidance is ordered by viewer count", () => {
    expect(t("watchingLead", "ja")).toContain("人数の多い順");
    expect(t("watchingLead", "en")).toContain("how many people are watching");
    expect(t("watchingHint", "ja")).toContain("一覧");
  });

  it("keeps each jump target in two lengths: a short name (button) and what happens (screen reader)", () => {
    expect(t("flatMap", "ja")).toBe("平面図");
    expect(t("globe", "ja")).toBe("地球儀");
    expect(t("showOnFlatMap", "ja")).toBe("平面図で見る");
    expect(t("showOnGlobe", "ja")).toBe("地球儀で見る");
    expect(t("showOnFlatMap", "en")).toBe("Show on the map");
    expect(t("showOnGlobe", "en")).toBe("Show on the globe");
  });
});

describe("closedNotice", () => {
  it("names the camera that was closed", () => {
    expect(closedNotice("渋谷", "ja")).toBe("「渋谷」を閉じました");
    expect(closedNotice("Shibuya", "en")).toBe("Closed Shibuya");
  });
});

describe("viewersText", () => {
  it("groups the count for the UI language", () => {
    expect(viewersText(12_345, "ja")).toBe("12,345 人が視聴中");
    expect(viewersText(12_345, "en")).toBe("12,345 watching");
    expect(viewersText(0, "en")).toBe("0 watching");
  });
});

describe("countryName", () => {
  it("says the country in the UI language instead of the ISO code (SHIG 11)", () => {
    expect(countryName("JP", "ja")).toBe("日本");
    expect(countryName("JP", "en")).toBe("Japan");
    expect(countryName("IS", "ja")).toBe("アイスランド");
  });

  it("falls back to the code when the runtime cannot name it", () => {
    const original = Intl.DisplayNames;
    vi.stubGlobal("Intl", { ...Intl, DisplayNames: undefined });
    expect(countryName("FR", "ja")).toBe("FR");
    vi.stubGlobal("Intl", { ...Intl, DisplayNames: original });
    vi.unstubAllGlobals();
  });
});
