import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildGlobeStyle,
  fallbackGlobeStyle,
  isReliefTileUrl,
  LIBERTY_STYLE_URL,
  loadGlobeStyle,
  NAUTICAL_PROTOCOL,
  rasterUrlToProtocol,
  registerNauticalProtocol,
  resetNauticalProtocolForTests,
  rewriteRasterSources,
  type GlobeStyleJson,
} from "./globeStyle";
import { nauticalizeCssColor } from "./nauticalColor";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  resetNauticalProtocolForTests();
});

const BASE: GlobeStyleJson = {
  version: 8,
  sprite: "https://tiles.openfreemap.org/sprites/ofm_f384/ofm",
  sources: {
    ne2_shaded: {
      type: "raster",
      tiles: ["https://tiles.openfreemap.org/natural_earth/ne2sr/{z}/{x}/{y}.png"],
      maxzoom: 6,
    },
    openmaptiles: { type: "vector", url: "https://tiles.openfreemap.org/planet" },
    other: { type: "vector" },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#ffffff" },
    },
    {
      id: "natural_earth",
      type: "raster",
      source: "ne2_shaded",
      paint: { "raster-opacity": 0.6 },
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      paint: { "fill-color": "rgb(158,189,255)" },
    },
  ],
};

describe("rasterUrlToProtocol / rewriteRasterSources", () => {
  it("https のラスタだけプロトコルに差し替える", () => {
    expect(rasterUrlToProtocol("https://tiles.example/{z}/{x}/{y}.png")).toBe(
      `${NAUTICAL_PROTOCOL}://tiles.example/{z}/{x}/{y}.png`,
    );
    const style = structuredClone(BASE);
    rewriteRasterSources(style);
    expect(style.sources["ne2_shaded"]?.["tiles"]).toEqual([
      `${NAUTICAL_PROTOCOL}://tiles.openfreemap.org/natural_earth/ne2sr/{z}/{x}/{y}.png`,
    ]);
    expect(style.sources["openmaptiles"]?.["url"]).toBe("https://tiles.openfreemap.org/planet");
    const mixed: GlobeStyleJson = {
      version: 8,
      sources: { earth: { type: "raster", tiles: ["https://x/{z}/{x}/{y}.png", 1] } },
      layers: [],
    };
    rewriteRasterSources(mixed);
    expect(mixed.sources["earth"]?.["tiles"]).toEqual([`${NAUTICAL_PROTOCOL}://x/{z}/{x}/{y}.png`, 1]);
  });
});

describe("buildGlobeStyle", () => {
  it("海図色に直し、球・大気・ピンを載せる", () => {
    const style = buildGlobeStyle(BASE);
    expect(style.projection).toEqual({ type: "globe" });
    expect(style.sky).toBeDefined();
    expect(style.light).toBeDefined();
    expect(style.sources["night"]).toBeDefined();
    expect(style.sources["cams"]).toBeDefined();
    const ids = style.layers.map((layer) => layer.id);
    expect(ids).toEqual([
      "background",
      "natural_earth",
      "water",
      "night-shade",
      "terminator",
      "cams-glow",
      "cams-point",
    ]);
    expect(style.layers[0]?.paint?.["background-color"]).toBe(nauticalizeCssColor("#ffffff"));
    expect(style.layers[1]?.paint?.["raster-opacity"]).toEqual([
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      0,
      0.92,
      6,
      0.28,
    ]);
    expect(style.layers[1]?.paint?.["raster-fade-duration"]).toBe(0);
    const earthTiles = style.sources["ne2_shaded"]?.["tiles"];
    expect(earthTiles).toEqual([
      `${NAUTICAL_PROTOCOL}://tiles.openfreemap.org/natural_earth/ne2sr/{z}/{x}/{y}.png`,
    ]);
  });
});

describe("fallbackGlobeStyle", () => {
  it("CARTO のラベル付き Voyager を海図フィルタ経由で使う", () => {
    const style = fallbackGlobeStyle();
    const tiles = style.sources["earth"]?.["tiles"] as string[];
    expect(tiles.some((tile) => tile.includes("basemaps.cartocdn.com/rastertiles/voyager/"))).toBe(
      true,
    );
    expect(tiles.every((tile) => tile.startsWith(`${NAUTICAL_PROTOCOL}://`))).toBe(true);
    expect(style.layers.some((layer) => layer.id === "cams-point")).toBe(true);
  });
});

describe("loadGlobeStyle", () => {
  it("liberty が取れたら組み立てる", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => BASE,
      }),
    );
    const style = await loadGlobeStyle();
    expect(fetch).toHaveBeenCalledWith(LIBERTY_STYLE_URL);
    expect(style.layers.some((layer) => layer.id === "water")).toBe(true);
    expect(style.layers.some((layer) => layer.id === "cams-point")).toBe(true);
  });

  it("HTTP エラーなら CARTO に退く", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    const style = await loadGlobeStyle();
    expect(style.sources["earth"]).toBeDefined();
  });

  it("通信失敗なら CARTO に退く", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const style = await loadGlobeStyle();
    expect(style.sources["earth"]).toBeDefined();
  });
});

describe("isReliefTileUrl", () => {
  it("Natural Earth の陰影だけ起伏用とみなす", () => {
    expect(
      isReliefTileUrl("https://tiles.openfreemap.org/natural_earth/ne2sr/2/1/1.png"),
    ).toBe(true);
    expect(isReliefTileUrl("https://a.basemaps.cartocdn.com/rastertiles/voyager/2/1/1.png")).toBe(
      false,
    );
  });
});

describe("registerNauticalProtocol", () => {
  it("同じプロトコルを二度は登録しない", () => {
    const addProtocol = vi.fn();
    registerNauticalProtocol(addProtocol);
    registerNauticalProtocol(addProtocol);
    expect(addProtocol).toHaveBeenCalledTimes(1);
    expect(addProtocol.mock.calls[0]?.[0]).toBe(NAUTICAL_PROTOCOL);
  });
});
