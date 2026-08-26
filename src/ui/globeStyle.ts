// 地球儀の地図スタイル。平面図は OSM ラスタに国名・都市名・国境が焼き付いている。
// MapLibre は Worker から取るので OSM が Referer 無しで拒否する。プロトコルを
// 本体スレッドの fetch に載せると Referer が付き、平面図と同じタイルが使える。
// キャンバス全体への CSS フィルタは夜の影まで反転するので、タイル画素だけ
// 平面図と同じ式で塗り直す。

import type { AddProtocolAction } from "maplibre-gl";

import { nauticalizeImageData } from "./nauticalColor";

export const NAUTICAL_PROTOCOL = "nautical";
export const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const OSM_TILE_PROTOCOL_URL = OSM_TILE_URL.replace(/^https:\/\//, `${NAUTICAL_PROTOCOL}://`);

const LIT = "#ffb94a";
const INK = "#0b1620";
const INK_2 = "#132532";
const NIGHT = "#050c14";
const SPACE = "#02080c";
const PIN_RING = "#d8e0e4";

const GLOBE_SKY = {
  "sky-color": "#6a93a8",
  "horizon-color": "#b7cdd4",
  "fog-color": SPACE,
  "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 0.28, 3, 0.16, 6, 0],
};

const GLOBE_LIGHT = {
  anchor: "viewport",
  color: "#e8e2d4",
  intensity: 0.28,
  position: [1.15, 210, 30],
};

export type GlobeStyleJson = {
  version: 8;
  sources: Record<string, Record<string, unknown>>;
  layers: Array<Record<string, unknown> & { id: string; paint?: Record<string, unknown> }>;
  [key: string]: unknown;
};

function emptyCollection(): { type: "FeatureCollection"; features: never[] } {
  return { type: "FeatureCollection", features: [] };
}

export function rasterUrlToProtocol(url: string): string {
  return url.replace(/^https:\/\//, `${NAUTICAL_PROTOCOL}://`);
}

export function protocolUrlToHttps(url: string): string {
  return url.replace(`${NAUTICAL_PROTOCOL}://`, "https://");
}

export function globeStyle(): GlobeStyleJson {
  return {
    version: 8,
    projection: { type: "globe" },
    sky: GLOBE_SKY,
    light: GLOBE_LIGHT,
    sources: {
      osm: {
        type: "raster",
        tiles: [OSM_TILE_PROTOCOL_URL],
        tileSize: 256,
        maxzoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      },
      night: { type: "geojson", data: emptyCollection() },
      terminator: { type: "geojson", data: emptyCollection() },
      cams: { type: "geojson", data: emptyCollection() },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": INK_2 },
      },
      {
        id: "osm",
        type: "raster",
        source: "osm",
        paint: { "raster-fade-duration": 0 },
      },
      {
        id: "night-shade",
        type: "fill",
        source: "night",
        paint: {
          "fill-color": NIGHT,
          "fill-opacity": 0.5,
          "fill-antialias": false,
        },
      },
      {
        id: "terminator",
        type: "line",
        source: "terminator",
        paint: {
          "line-color": LIT,
          "line-width": 1.15,
          "line-opacity": 0.45,
        },
      },
      {
        id: "cams-glow",
        type: "circle",
        source: "cams",
        filter: ["==", ["get", "status"], "live"],
        paint: {
          "circle-pitch-alignment": "viewport",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 0.6, 7, 2.8, 11, 8, 14],
          "circle-color": LIT,
          "circle-opacity": 0.22,
          "circle-stroke-width": 0,
        },
      },
      {
        id: "cams-point",
        type: "circle",
        source: "cams",
        paint: {
          "circle-pitch-alignment": "viewport",
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0.6,
            ["case", [">", ["get", "selected"], 0], 5.5, 3.5],
            2.8,
            ["case", [">", ["get", "selected"], 0], 10, 6.5],
            8,
            ["case", [">", ["get", "selected"], 0], 12, 7],
          ],
          "circle-color": ["case", ["==", ["get", "status"], "live"], LIT, INK],
          "circle-stroke-width": 1.75,
          "circle-stroke-color": ["case", ["==", ["get", "status"], "live"], LIT, PIN_RING],
          "circle-opacity": [
            "case",
            ["any", ["==", ["get", "status"], "offline"], ["==", ["get", "status"], "blocked"]],
            0.42,
            1,
          ],
          "circle-stroke-opacity": [
            "case",
            ["any", ["==", ["get", "status"], "offline"], ["==", ["get", "status"], "blocked"]],
            0.55,
            1,
          ],
        },
      },
    ],
  };
}

async function nauticalizeBitmap(bitmap: ImageBitmap): Promise<ImageBitmap> {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (ctx === null) return bitmap;
  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  nauticalizeImageData(imageData, false);
  ctx.putImageData(imageData, 0, 0);
  return createImageBitmap(canvas);
}

let protocolRegistered = false;

export function registerNauticalProtocol(
  addProtocol: (name: string, fn: AddProtocolAction) => void,
): void {
  if (protocolRegistered) return;
  protocolRegistered = true;
  addProtocol(NAUTICAL_PROTOCOL, async (params, abortController) => {
    const url = protocolUrlToHttps(params.url);
    const response = await fetch(url, { signal: abortController.signal });
    if (!response.ok) throw new Error(`tile ${response.status}`);
    const bitmap = await createImageBitmap(await response.blob());
    return { data: await nauticalizeBitmap(bitmap) };
  });
}

export function resetNauticalProtocolForTests(): void {
  protocolRegistered = false;
}
