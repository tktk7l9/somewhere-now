import {
  PANEL_MAP_MIN,
  PANEL_WIDTH_DEFAULT,
  PANEL_WIDTH_MAX,
  PANEL_WIDTH_MIN,
  clampPanelWidth,
  encodePanelWidth,
  parsePanelWidth,
  resolvePanelWidth,
} from "./panelWidth";

const WIDE = 1400;

describe("parsePanelWidth", () => {
  it("保存が無ければ null", () => {
    expect(parsePanelWidth(null)).toBeNull();
    expect(parsePanelWidth("")).toBeNull();
  });

  it("整数だけを読む", () => {
    expect(parsePanelWidth("400")).toBe(400);
    expect(parsePanelWidth("0")).toBe(0);
    expect(parsePanelWidth("-12")).toBe(-12);
  });

  it("壊れた値は捨てる", () => {
    expect(parsePanelWidth("384px")).toBeNull();
    expect(parsePanelWidth("384.5")).toBeNull();
    expect(parsePanelWidth("abc")).toBeNull();
    expect(parsePanelWidth("1e2")).toBeNull();
    expect(parsePanelWidth("9".repeat(400))).toBeNull();
  });
});

describe("encodePanelWidth", () => {
  it("整数にする", () => {
    expect(encodePanelWidth(400)).toBe("400");
    expect(encodePanelWidth(399.6)).toBe("400");
  });

  it("往復する", () => {
    expect(parsePanelWidth(encodePanelWidth(512))).toBe(512);
  });
});

describe("clampPanelWidth", () => {
  it("既定の範囲に収める", () => {
    expect(clampPanelWidth(200, WIDE)).toBe(PANEL_WIDTH_MIN);
    expect(clampPanelWidth(900, WIDE)).toBe(PANEL_WIDTH_MAX);
    expect(clampPanelWidth(400, WIDE)).toBe(400);
  });

  it("地図の取り分を残す", () => {
    expect(clampPanelWidth(640, PANEL_MAP_MIN + 400)).toBe(400);
  });

  it("窓が下限より狭いときは地図を優先する", () => {
    expect(clampPanelWidth(384, PANEL_MAP_MIN + 100)).toBe(100);
    expect(clampPanelWidth(384, 100)).toBe(0);
  });

  it("整数に丸める", () => {
    expect(clampPanelWidth(400.4, WIDE)).toBe(400);
    expect(clampPanelWidth(400.6, WIDE)).toBe(401);
  });

  it("数値でない幅は既定に戻す", () => {
    expect(clampPanelWidth(Number.NaN, WIDE)).toBe(PANEL_WIDTH_DEFAULT);
    expect(clampPanelWidth(Number.POSITIVE_INFINITY, WIDE)).toBe(PANEL_WIDTH_DEFAULT);
  });

  it("窓幅が数値でないときはパネルを畳む", () => {
    expect(clampPanelWidth(384, Number.NaN)).toBe(0);
  });
});

describe("resolvePanelWidth", () => {
  it("欠落は既定", () => {
    expect(resolvePanelWidth(null, WIDE)).toBe(PANEL_WIDTH_DEFAULT);
  });

  it("保存値を窓に収めて返す", () => {
    expect(resolvePanelWidth("500", WIDE)).toBe(500);
    expect(resolvePanelWidth("999", WIDE)).toBe(PANEL_WIDTH_MAX);
    expect(resolvePanelWidth("not-a-number", WIDE)).toBe(PANEL_WIDTH_DEFAULT);
  });
});
