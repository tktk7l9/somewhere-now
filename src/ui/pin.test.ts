import { pinHtml } from "./pin";
import { t } from "./i18n";

describe("pinHtml", () => {
  it("adds the amber class while live", () => {
    expect(pinHtml("live", false)).toBe('<span class="pin pin--live"></span>');
  });

  it("uses the same black class for stopped and non-embeddable", () => {
    expect(pinHtml("offline", false)).toBe('<span class="pin pin--offline"></span>');
    expect(pinHtml("blocked", false)).toBe('<span class="pin pin--offline"></span>');
  });

  it("keeps the base black when unchecked", () => {
    expect(pinHtml("unknown", false)).toBe('<span class="pin"></span>');
    expect(pinHtml(undefined, false)).toBe('<span class="pin"></span>');
  });

  it("adds the enlarging class while selected", () => {
    expect(pinHtml("live", true)).toContain("pin--selected");
  });
});

describe("pin legend wording", () => {
  it("shows live and stopped as a pair", () => {
    expect(t("statusLive", "ja")).toBe("配信中");
    expect(t("pinOff", "ja")).toBe("止まっている");
    expect(t("pinLegendAria", "ja")).toContain("琥珀");
    expect(t("pinLegendAria", "en")).toContain("Amber");
  });
});
