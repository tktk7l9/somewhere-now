// 地球儀の地図スタイル。平面図は OSM ラスタを CSS で海図色に寄せている。
// MapLibre のキャンバスに同じフィルタは掛けられない(夜の影とピンまで反転する)
// ので、OpenFreeMap のベクトル図式を同じ変換式で塗り直し、低ズームの
// Natural Earth 陰影だけラスタとして同じフィルタを通す。

import type { AddProtocolAction } from "maplibre-gl";

import { NAUTICAL_FILTER, walkCssColors } from "./nauticalColor";

export { NAUTICAL_FILTER };

export const LIBERTY_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
export const NAUTICAL_PROTOCOL = "nautical";

const LIT = "#ffb94a";
const INK = "#0b1620";
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

const CARTO_TILES = [
  "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
  "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
  "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
  "https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
];

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

export function rewriteRasterSources(style: GlobeStyleJson): void {
  for (const source of Object.values(style.sources)) {
    if (source["type"] !== "raster") continue;
    const tiles = source["tiles"];
    if (!Array.isArray(tiles)) continue;
    source["tiles"] = tiles.map((tile) =>
      typeof tile === "string" ? rasterUrlToProtocol(tile) : tile,
    );
  }
}

const OVERLAY_SOURCES = {
  night: { type: "geojson", data: emptyCollection() },
  terminator: { type: "geojson", data: emptyCollection() },
  cams: { type: "geojson", data: emptyCollection() },
};

const OVERLAY_LAYERS: GlobeStyleJson["layers"] = [
  {
    id: "night-shade",
    type: "fill",
    source: "night",
    paint: {
      "fill-color": NIGHT,
      "fill-opacity": 0.55,
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
];

function withGlobeChrome(style: GlobeStyleJson): GlobeStyleJson {
  style.projection = { type: "globe" };
  style.sky = GLOBE_SKY;
  style.light = GLOBE_LIGHT;
  style.sources = { ...style.sources, ...OVERLAY_SOURCES };
  style.layers = [...style.layers, ...OVERLAY_LAYERS];
  const earth = style.layers.find((layer) => layer.id === "natural_earth");
  if (earth?.paint) {
    // 球の距離では大陸の起伏が主役。元図式より少し濃く残す。
    earth.paint["raster-opacity"] = [
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      0,
      0.84,
      6,
      0.2,
    ];
    earth.paint["raster-fade-duration"] = 0;
  }
  return style;
}

export function buildGlobeStyle(base: GlobeStyleJson): GlobeStyleJson {
  const style = walkCssColors(structuredClone(base)) as GlobeStyleJson;
  rewriteRasterSources(style);
  return withGlobeChrome(style);
}

export function fallbackGlobeStyle(): GlobeStyleJson {
  return withGlobeChrome({
    version: 8,
    sources: {
      earth: {
        type: "raster",
        tiles: CARTO_TILES.map(rasterUrlToProtocol),
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": SPACE },
      },
      {
        id: "earth",
        type: "raster",
        source: "earth",
        paint: { "raster-fade-duration": 0 },
      },
    ],
  });
}

export async function loadGlobeStyle(): Promise<GlobeStyleJson> {
  try {
    const response = await fetch(LIBERTY_STYLE_URL);
    if (!response.ok) throw new Error(String(response.status));
    return buildGlobeStyle((await response.json()) as GlobeStyleJson);
  } catch {
    return fallbackGlobeStyle();
  }
}

let protocolRegistered = false;

async function nauticalizeBitmap(bitmap: ImageBitmap): Promise<ImageBitmap> {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return bitmap;
  ctx.filter = NAUTICAL_FILTER;
  ctx.drawImage(bitmap, 0, 0);
  return createImageBitmap(canvas);
}

export function registerNauticalProtocol(addProtocol: (name: string, fn: AddProtocolAction) => void): void {
  if (protocolRegistered) return;
  protocolRegistered = true;
  addProtocol(NAUTICAL_PROTOCOL, async (params, abortController) => {
    const url = params.url.replace(`${NAUTICAL_PROTOCOL}://`, "https://");
    const response = await fetch(url, { signal: abortController.signal });
    if (!response.ok) throw new Error(`tile ${response.status}`);
    const bitmap = await createImageBitmap(await response.blob());
    return { data: await nauticalizeBitmap(bitmap) };
  });
}

export function resetNauticalProtocolForTests(): void {
  protocolRegistered = false;
}
