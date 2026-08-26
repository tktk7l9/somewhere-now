import { catalogCaption, liveDialCaption, t } from "./i18n";

describe("catalogCaption", () => {
  it("絞っていないときは全件だけ出す", () => {
    expect(catalogCaption(176, 176, "ja")).toEqual({
      count: "176",
      total: null,
      unit: "地点",
      aria: "全 176 地点",
    });
    expect(catalogCaption(176, 176, "en")).toEqual({
      count: "176",
      total: null,
      unit: "places",
      aria: "176 places",
    });
  });

  it("絞っているときは分子と全件を並べる", () => {
    expect(catalogCaption(12, 176, "ja")).toEqual({
      count: "12",
      total: "/ 176",
      unit: "地点",
      aria: "176 地点中 12 地点",
    });
    expect(catalogCaption(12, 176, "en")).toEqual({
      count: "12",
      total: "/ 176",
      unit: "places",
      aria: "12 of 176 places",
    });
  });

  it("0 件でも分母の全件は残す", () => {
    expect(catalogCaption(0, 176, "ja").count).toBe("0");
    expect(catalogCaption(0, 176, "ja").total).toBe("/ 176");
  });

  it("単位は文言表と揃える", () => {
    expect(catalogCaption(1, 1, "ja").unit).toBe(t("places", "ja"));
    expect(catalogCaption(1, 1, "en").unit).toBe(t("places", "en"));
  });
});

describe("liveDialCaption", () => {
  it("配信中数と地点数を常に並べる", () => {
    expect(liveDialCaption(12, 176, "ja")).toEqual({
      count: "12",
      total: "/ 176",
      label: "地点が配信中",
      aria: "176 地点中 12 地点が配信中",
    });
    expect(liveDialCaption(12, 176, "en")).toEqual({
      count: "12",
      total: "/ 176",
      label: "places are live",
      aria: "12 of 176 places are live",
    });
  });

  it("すべて配信中でも分子と分母を出す", () => {
    expect(liveDialCaption(5, 5, "ja")).toEqual({
      count: "5",
      total: "/ 5",
      label: t("liveHeadline", "ja"),
      aria: "5 地点中 5 地点が配信中",
    });
  });

  it("0 件でも分母は残す", () => {
    expect(liveDialCaption(0, 40, "ja").count).toBe("0");
    expect(liveDialCaption(0, 40, "ja").total).toBe("/ 40");
    expect(liveDialCaption(0, 40, "en").aria).toBe("0 of 40 places are live");
  });
});
