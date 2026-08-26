import { afterEach, describe, expect, it, vi } from "vitest";

import type { AddProtocolAction } from "maplibre-gl";

import {
  globeStyle,
  NAUTICAL_PROTOCOL,
  OSM_TILE_PROTOCOL_URL,
  OSM_TILE_URL,
  protocolUrlToHttps,
  rasterUrlToProtocol,
  registerNauticalProtocol,
  resetNauticalProtocolForTests,
} from "./globeStyle";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  resetNauticalProtocolForTests();
});

describe("rasterUrlToProtocol", () => {
  it("https の OSM タイルを本体スレッド用プロトコルに差し替える", () => {
    expect(rasterUrlToProtocol(OSM_TILE_URL)).toBe(OSM_TILE_PROTOCOL_URL);
    expect(protocolUrlToHttps(OSM_TILE_PROTOCOL_URL)).toBe(OSM_TILE_URL);
    expect(OSM_TILE_PROTOCOL_URL.startsWith(`${NAUTICAL_PROTOCOL}://`)).toBe(true);
  });
});

describe("globeStyle", () => {
  it("平面図と同じ OSM ラスタを夜の影より下に置く", () => {
    const style = globeStyle();
    expect(style.projection).toEqual({ type: "globe" });
    expect(style.sources["osm"]?.["tiles"]).toEqual([OSM_TILE_PROTOCOL_URL]);
    expect(style.sources["osm"]?.["tileSize"]).toBe(256);
    const ids = style.layers.map((layer) => layer.id);
    expect(ids).toEqual(["background", "osm", "night-shade", "terminator", "cams-glow", "cams-point"]);
    expect(ids.indexOf("osm")).toBeLessThan(ids.indexOf("night-shade"));
    expect(style.layers.find((layer) => layer.id === "osm")?.paint?.["raster-fade-duration"]).toBe(0);
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

  it("タイルを海図色に直して返す", async () => {
    const pixels = new Uint8ClampedArray([255, 255, 255, 255]);
    const imageData = { data: pixels, width: 1, height: 1 } as ImageData;
    const ctx = {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => imageData),
      putImageData: vi.fn(),
    };
    const canvas = { width: 0, height: 0, getContext: vi.fn(() => ctx) };
    vi.stubGlobal("document", { createElement: vi.fn(() => canvas) });
    const bitmap = { width: 1, height: 1 };
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => bitmap),
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        blob: async () => new Blob(),
      })),
    );
    let action: AddProtocolAction | undefined;
    registerNauticalProtocol((_name, fn) => {
      action = fn;
    });
    const result = await action!(
      { url: `${NAUTICAL_PROTOCOL}://tile.openstreetmap.org/0/0/0.png` },
      new AbortController(),
    );
    expect(fetch).toHaveBeenCalledWith("https://tile.openstreetmap.org/0/0/0.png", expect.any(Object));
    expect(pixels[0]).toBe(0);
    expect(result.data).toBe(bitmap);
  });

  it("2d が取れないときは元の画像を返す", async () => {
    const canvas = { width: 0, height: 0, getContext: vi.fn(() => null) };
    vi.stubGlobal("document", { createElement: vi.fn(() => canvas) });
    const original = { width: 2, height: 2 };
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => original),
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        blob: async () => new Blob(),
      })),
    );
    let action: AddProtocolAction | undefined;
    registerNauticalProtocol((_name, fn) => {
      action = fn;
    });
    const result = await action!(
      { url: `${NAUTICAL_PROTOCOL}://tile.openstreetmap.org/1/0/0.png` },
      new AbortController(),
    );
    expect(result.data).toBe(original);
  });

  it("タイルが失敗したら投げる", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 403,
      })),
    );
    let action: AddProtocolAction | undefined;
    registerNauticalProtocol((_name, fn) => {
      action = fn;
    });
    await expect(
      action!(
        { url: `${NAUTICAL_PROTOCOL}://tile.openstreetmap.org/1/0/0.png` },
        new AbortController(),
      ),
    ).rejects.toThrow("tile 403");
  });
});
