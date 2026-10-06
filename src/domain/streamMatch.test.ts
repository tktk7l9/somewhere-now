import { matchStream, normalizeTitle, type StreamCandidate } from "./streamMatch";

const c = (id: string, title: string): StreamCandidate => ({ id, title });

describe("normalizeTitle", () => {
  it("collapses case and consecutive whitespace", () => {
    expect(normalizeTitle("EarthCam Live:  Times   Square")).toBe("earthcam live: times square");
  });

  it("normalizes different kinds of dashes to the same form", () => {
    expect(normalizeTitle("A — B")).toBe(normalizeTitle("A - B"));
    expect(normalizeTitle("A – B")).toBe(normalizeTitle("A - B"));
  });

  it("normalizes full-width and half-width", () => {
    expect(normalizeTitle("ＬＩＶＥ　カメラ")).toBe("live カメラ");
  });

  it("drops decorative symbols that indicate a live stream", () => {
    expect(normalizeTitle("🔴 LIVE cam")).toBe("live cam");
    expect(normalizeTitle("【ライブ】渋谷")).toBe("【ライブ】渋谷");
  });

  it("drops leading and trailing whitespace", () => {
    expect(normalizeTitle("  x  ")).toBe("x");
  });
});

describe("matchStream", () => {
  // In reality, streams that differ only inside the parentheses line up on the same channel.
  const FOLKSTON = [
    c("a", "Folkston, Georgia, USA | LIVE Train Camera (Turnout PTZ)"),
    c("b", "Folkston, Georgia, USA | LIVE Train Camera (Fixed View)"),
    c("d", "Folkston, Georgia, USA  |  LIVE Train Camera (Depot PTZ)"),
    c("e", "Folkston, Georgia, USA | LIVE Train Camera (Fixed View — Looking East)"),
  ];

  it("returns the one that matches after normalization", () => {
    expect(matchStream("Folkston, Georgia, USA | LIVE Train Camera (Depot PTZ)", FOLKSTON)).toBe("d");
  });

  it("absorbs whitespace variation", () => {
    expect(matchStream("Folkston, Georgia, USA  |  LIVE Train Camera (Fixed View)", FOLKSTON)).toBe("b");
  });

  it("does not mix up streams that differ only inside the parentheses", () => {
    // The case where the "Fixed View" stream is gone and only the similar "Fixed View — Looking
    // East" remains.
    const remaining = FOLKSTON.filter((x) => x.id !== "b");
    expect(matchStream("Folkston, Georgia, USA | LIVE Train Camera (Fixed View)", remaining)).toBeNull();
  });

  it("does not mix up different cameras with the same place name", () => {
    const squares = [
      c("n", "EarthCam Live:  Times Square North 4K"),
      c("x", "EarthCam Live: Times Square Crossroads (New York City, NY)"),
    ];
    expect(matchStream("EarthCam Live:  Times Square North 4K", squares)).toBe("n");
    expect(matchStream("EarthCam Live: Giraffe Cam Barn - Greenville, SC", squares)).toBeNull();
  });

  it("follows when only decorative symbols were added", () => {
    expect(matchStream("LIVE cam", [c("z", "🔴 LIVE cam")])).toBe("z");
  });

  it("is null when there are no candidates", () => {
    expect(matchStream("anything", [])).toBeNull();
  });

  it("does not jump at a candidate that only grazes", () => {
    expect(matchStream("EarthCam Live: Wrigley Field", FOLKSTON)).toBeNull();
  });

  it("does not treat titles with no content as a match", () => {
    expect(matchStream("🔴", [c("x", "—")])).toBeNull();
  });

  it("gives up when several have the same title, because it cannot decide between them", () => {
    const dup = [c("p", "Live Cam"), c("q", "Live  Cam")];
    expect(matchStream("Live Cam", dup)).toBeNull();
  });

  it("picks up a slight rewording only when it cannot be confused with others", () => {
    const one = [c("s", "Live Sea Otter Cam | Monterey Bay Aquarium (4K)")];
    expect(matchStream("Live Sea Otter Cam | Monterey Bay Aquarium", one)).toBe("s");
  });

  it("gives up even on a slight rewording when the runner-up is close", () => {
    const two = [
      c("s", "Live Sea Otter Cam | Monterey Bay Aquarium (4K)"),
      c("t", "Live Sea Otter Cam | Monterey Bay Aquarium (HD)"),
    ];
    expect(matchStream("Live Sea Otter Cam | Monterey Bay Aquarium", two)).toBeNull();
  });
});
