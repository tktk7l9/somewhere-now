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
  it("is null when nothing is saved", () => {
    expect(parsePanelWidth(null)).toBeNull();
    expect(parsePanelWidth("")).toBeNull();
  });

  it("reads integers only", () => {
    expect(parsePanelWidth("400")).toBe(400);
    expect(parsePanelWidth("0")).toBe(0);
    expect(parsePanelWidth("-12")).toBe(-12);
  });

  it("discards broken values", () => {
    expect(parsePanelWidth("384px")).toBeNull();
    expect(parsePanelWidth("384.5")).toBeNull();
    expect(parsePanelWidth("abc")).toBeNull();
    expect(parsePanelWidth("1e2")).toBeNull();
    expect(parsePanelWidth("9".repeat(400))).toBeNull();
  });
});

describe("encodePanelWidth", () => {
  it("makes it an integer", () => {
    expect(encodePanelWidth(400)).toBe("400");
    expect(encodePanelWidth(399.6)).toBe("400");
  });

  it("round-trips", () => {
    expect(parsePanelWidth(encodePanelWidth(512))).toBe(512);
  });
});

describe("clampPanelWidth", () => {
  it("clamps to the default range", () => {
    expect(clampPanelWidth(200, WIDE)).toBe(PANEL_WIDTH_MIN);
    expect(clampPanelWidth(900, WIDE)).toBe(PANEL_WIDTH_MAX);
    expect(clampPanelWidth(400, WIDE)).toBe(400);
  });

  it("leaves the map its share", () => {
    expect(clampPanelWidth(640, PANEL_MAP_MIN + 400)).toBe(400);
  });

  it("prioritizes the map when the window is narrower than the minimum", () => {
    expect(clampPanelWidth(384, PANEL_MAP_MIN + 100)).toBe(100);
    expect(clampPanelWidth(384, 100)).toBe(0);
  });

  it("rounds to an integer", () => {
    expect(clampPanelWidth(400.4, WIDE)).toBe(400);
    expect(clampPanelWidth(400.6, WIDE)).toBe(401);
  });

  it("resets a non-numeric width to the default", () => {
    expect(clampPanelWidth(Number.NaN, WIDE)).toBe(PANEL_WIDTH_DEFAULT);
    expect(clampPanelWidth(Number.POSITIVE_INFINITY, WIDE)).toBe(PANEL_WIDTH_DEFAULT);
  });

  it("collapses the panel when the window width is not a number", () => {
    expect(clampPanelWidth(384, Number.NaN)).toBe(0);
  });
});

describe("resolvePanelWidth", () => {
  it("uses the default when missing", () => {
    expect(resolvePanelWidth(null, WIDE)).toBe(PANEL_WIDTH_DEFAULT);
  });

  it("returns the saved value clamped to the window", () => {
    expect(resolvePanelWidth("500", WIDE)).toBe(500);
    expect(resolvePanelWidth("999", WIDE)).toBe(PANEL_WIDTH_MAX);
    expect(resolvePanelWidth("not-a-number", WIDE)).toBe(PANEL_WIDTH_DEFAULT);
  });
});
