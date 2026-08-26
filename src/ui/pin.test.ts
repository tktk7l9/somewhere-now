import { pinHtml } from "./pin";
import { t } from "./i18n";

describe("pinHtml", () => {
  it("配信中は琥珀のクラスを付ける", () => {
    expect(pinHtml("live", false)).toBe('<span class="pin pin--live"></span>');
  });

  it("止まっている・埋め込み不可は同じ黒のクラス", () => {
    expect(pinHtml("offline", false)).toBe('<span class="pin pin--offline"></span>');
    expect(pinHtml("blocked", false)).toBe('<span class="pin pin--offline"></span>');
  });

  it("未確認は地の黒のまま", () => {
    expect(pinHtml("unknown", false)).toBe('<span class="pin"></span>');
    expect(pinHtml(undefined, false)).toBe('<span class="pin"></span>');
  });

  it("選択中は大きくするクラスを足す", () => {
    expect(pinHtml("live", true)).toContain("pin--selected");
  });
});

describe("ピンの凡例の文言", () => {
  it("配信中と止まっているを対で出す", () => {
    expect(t("statusLive", "ja")).toBe("配信中");
    expect(t("pinOff", "ja")).toBe("止まっている");
    expect(t("pinLegendAria", "ja")).toContain("琥珀");
    expect(t("pinLegendAria", "en")).toContain("Amber");
  });
});
