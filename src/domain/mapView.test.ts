import { readFileSync } from "node:fs";
import { INITIAL_VIEW, GLOBE_ZOOM, tileAt, tileUrl } from "./mapView";

describe("tileAt", () => {
  it("ズーム 0 では世界が 1 枚に収まる", () => {
    expect(tileAt(0, 0, 0)).toEqual({ x: 0, y: 0 });
    expect(tileAt(-70, 170, 0)).toEqual({ x: 0, y: 0 });
  });

  it("ズーム 1 では赤道と本初子午線で四分割される", () => {
    expect(tileAt(45, -90, 1)).toEqual({ x: 0, y: 0 });
    expect(tileAt(45, 90, 1)).toEqual({ x: 1, y: 0 });
    expect(tileAt(-45, -90, 1)).toEqual({ x: 0, y: 1 });
    expect(tileAt(-45, 90, 1)).toEqual({ x: 1, y: 1 });
  });

  it("東京はズーム 2 で右上の区画に入る", () => {
    expect(tileAt(35.68, 139.76, 2)).toEqual({ x: 3, y: 1 });
  });

  it("経度の東端でも範囲内に収める", () => {
    expect(tileAt(0, 180, 2)).toEqual({ x: 3, y: 2 });
  });

  it("極付近でも範囲内に収める", () => {
    expect(tileAt(89.9, 0, 2).y).toBe(0);
    expect(tileAt(-89.9, 0, 2).y).toBe(3);
  });
});

describe("tileUrl", () => {
  it("OpenStreetMap の URL を組み立てる", () => {
    expect(tileUrl(2, 1, 1)).toBe("https://tile.openstreetmap.org/2/1/1.png");
  });
});

describe("GLOBE_ZOOM", () => {
  it("大陸とピンが読める距離で、まだ球として見える", () => {
    expect(GLOBE_ZOOM).toBeGreaterThanOrEqual(INITIAL_VIEW.zoom);
    expect(GLOBE_ZOOM).toBeLessThan(5);
  });
});

describe("index.html の preload と初期表示の整合", () => {
  // 最初に見えるタイルは LCP 要素なので HTML から先に取りに行っている。
  // 初期表示を動かしたのに preload を直し忘れると、見当違いのタイルを
  // 取りにいって効果が消える(そして誰も気づかない)。ここで落とす。
  const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
  const preloaded = [...html.matchAll(/tile\.openstreetmap\.org\/(\d+)\/(\d+)\/(\d+)\.png/g)].map(
    ([, z, x, y]) => ({ zoom: Number(z), x: Number(x), y: Number(y) }),
  );

  it("preload が 1 つ以上ある", () => {
    expect(preloaded.length).toBeGreaterThan(0);
  });

  it("全て初期ズームのタイルである", () => {
    for (const tile of preloaded) expect(tile.zoom).toBe(INITIAL_VIEW.zoom);
  });

  it("初期中心を含むタイルが preload されている", () => {
    const center = tileAt(INITIAL_VIEW.center[0], INITIAL_VIEW.center[1], INITIAL_VIEW.zoom);
    expect(preloaded).toContainEqual({ ...center, zoom: INITIAL_VIEW.zoom });
  });

  it("中心から離れすぎたタイルを preload していない(無駄打ちを防ぐ)", () => {
    const center = tileAt(INITIAL_VIEW.center[0], INITIAL_VIEW.center[1], INITIAL_VIEW.zoom);
    for (const tile of preloaded) {
      expect(Math.abs(tile.x - center.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(tile.y - center.y)).toBeLessThanOrEqual(1);
    }
  });
});
