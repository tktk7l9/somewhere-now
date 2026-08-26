// 地球儀の地図スタイル。平面図は OSM ラスタに地名と国境が焼き付いている。
// 地球儀はベクトルの place / boundary で国・都市名と国境・州境・都市境を出す。
// 図式 JSON をネットから取ると球が出る前に待ちができるので、ここで組む。

import type { ExpressionSpecification } from "maplibre-gl";

import type { Lang } from "../domain/weather";

const LIT = "#ffb94a";
const INK = "#0b1620";
const INK_2 = "#132532";
const NIGHT = "#050c14";
const SPACE = "#02080c";
const BONE = "#e8e2d4";
const DIM = "#7e9099";
const BORDER = "#c5d0d4";
const PIN_RING = "#d8e0e4";
const HALO = "rgba(11, 22, 32, 0.92)";

export const GLOBE_GLYPHS = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";
export const GLOBE_TILES_ORIGIN = "https://tiles.openfreemap.org";
export const LABEL_LAYER_IDS = [
  "label-country",
  "label-city",
  "label-city-more",
  "label-town",
  "label-sea",
] as const;

export const BOUNDARY_LAYER_IDS = [
  "boundary-country",
  "boundary-country-disputed",
  "boundary-state",
  "boundary-city",
] as const;

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

/** 日本語 UI では name:ja、英語 UI では name:en。無いときは OSM の name に退く。 */
export function placeNameField(lang: Lang): ExpressionSpecification {
  if (lang === "ja") {
    return [
      "coalesce",
      ["get", "name:ja"],
      ["get", "name:nonlatin"],
      ["get", "name"],
      ["get", "name:en"],
      ["get", "name_en"],
      ["get", "name:latin"],
    ];
  }
  return [
    "coalesce",
    ["get", "name:en"],
    ["get", "name_en"],
    ["get", "name:latin"],
    ["get", "name"],
    ["get", "name:ja"],
    ["get", "name:nonlatin"],
  ];
}

function labelLayout(
  field: ExpressionSpecification,
  size: unknown,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    "text-field": field,
    "text-font": ["Noto Sans Regular"],
    "text-size": size,
    "text-padding": 2,
    "text-max-width": 8,
    "text-line-height": 1.1,
    "text-anchor": "center",
    "text-pitch-alignment": "viewport",
    "symbol-z-order": "auto",
    ...extra,
  };
}

const labelPaint = {
  "text-color": BONE,
  "text-halo-color": HALO,
  "text-halo-width": 1.6,
  "text-halo-blur": 0.2,
};

export function globeStyle(lang: Lang): GlobeStyleJson {
  const names = placeNameField(lang);
  return {
    version: 8,
    glyphs: GLOBE_GLYPHS,
    projection: { type: "globe" },
    sky: GLOBE_SKY,
    light: GLOBE_LIGHT,
    sources: {
      ne2_shaded: {
        type: "raster",
        tiles: [`${GLOBE_TILES_ORIGIN}/natural_earth/ne2sr/{z}/{x}/{y}.png`],
        tileSize: 256,
        maxzoom: 6,
        attribution:
          '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> <a href="https://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      },
      openmaptiles: {
        type: "vector",
        url: `${GLOBE_TILES_ORIGIN}/planet`,
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
        id: "natural_earth",
        type: "raster",
        source: "ne2_shaded",
        paint: {
          "raster-opacity": ["interpolate", ["exponential", 1.5], ["zoom"], 0, 0.78, 6, 0.22],
          "raster-saturation": -0.22,
          "raster-contrast": 0.22,
          "raster-brightness-min": 0,
          "raster-brightness-max": 0.58,
          "raster-fade-duration": 0,
        },
      },
      {
        id: "water",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        paint: { "fill-color": INK, "fill-antialias": false },
      },
      {
        id: "landcover-wood",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        minzoom: 3,
        filter: ["==", ["get", "class"], "wood"],
        paint: { "fill-color": "#163028", "fill-opacity": 0.35, "fill-antialias": false },
      },
      {
        id: "landcover-ice",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["match", ["get", "subclass"], ["ice_shelf", "glacier"], true, false],
        paint: { "fill-color": "#c5d0d4", "fill-opacity": 0.28, "fill-antialias": false },
      },
      {
        // claimed_by が付いている線は領有主張の二重描きなので、無印の国境だけ実線にする。
        id: "boundary-country",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: [
          "all",
          ["==", ["get", "admin_level"], 2],
          ["!=", ["coalesce", ["get", "disputed"], 0], 1],
          ["!=", ["coalesce", ["get", "maritime"], 0], 1],
          ["!", ["has", "claimed_by"]],
        ],
        paint: {
          "line-color": BORDER,
          "line-opacity": 0.78,
          "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.7, 3, 1.1, 6, 1.6, 10, 2.2],
        },
      },
      {
        id: "boundary-country-disputed",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: [
          "all",
          ["==", ["get", "admin_level"], 2],
          ["==", ["get", "disputed"], 1],
          ["!", ["has", "claimed_by"]],
        ],
        paint: {
          "line-color": BORDER,
          "line-opacity": 0.55,
          "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.6, 6, 1.2],
          "line-dasharray": [2, 2],
        },
      },
      {
        id: "boundary-state",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        minzoom: 3,
        filter: [
          "all",
          ["match", ["get", "admin_level"], [3, 4], true, false],
          ["!=", ["coalesce", ["get", "maritime"], 0], 1],
        ],
        paint: {
          "line-color": BORDER,
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 3, 0.28, 6, 0.5, 10, 0.62],
          "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.4, 6, 0.7, 10, 1.1],
          "line-dasharray": [3, 2],
        },
      },
      {
        id: "boundary-city",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        minzoom: 6,
        filter: [
          "all",
          ["match", ["get", "admin_level"], [5, 6, 7, 8, 9], true, false],
          ["!=", ["coalesce", ["get", "maritime"], 0], 1],
        ],
        paint: {
          "line-color": BORDER,
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.22, 9, 0.42, 12, 0.55],
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.3, 10, 0.6, 13, 0.9],
          "line-dasharray": [1.5, 2],
        },
      },
      {
        id: "roads",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 5,
        filter: ["match", ["get", "class"], ["motorway", "trunk", "primary"], true, false],
        paint: {
          "line-color": "#1e3a45",
          "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0.6, 10, 1.8, 14, 4],
        },
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
        id: "label-country",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        maxzoom: 8,
        filter: ["==", ["get", "class"], "country"],
        layout: labelLayout(names, ["interpolate", ["linear"], ["zoom"], 0, 13, 2.8, 16, 5, 20], {
          "text-max-width": 7,
          "symbol-sort-key": ["get", "rank"],
          "text-allow-overlap": true,
          "text-ignore-placement": true,
        }),
        paint: labelPaint,
      },
      {
        id: "label-city",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 2,
        maxzoom: 12,
        filter: [
          "all",
          ["==", ["get", "class"], "city"],
          ["any", ["<=", ["get", "rank"], 4], ["has", "capital"]],
        ],
        layout: labelLayout(names, ["interpolate", ["linear"], ["zoom"], 2, 12, 4, 14, 8, 17], {
          "symbol-sort-key": ["get", "rank"],
          "text-offset": [0, 0.15],
          "text-allow-overlap": true,
          "text-ignore-placement": true,
        }),
        paint: labelPaint,
      },
      {
        id: "label-city-more",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 5,
        maxzoom: 12,
        filter: [
          "all",
          ["==", ["get", "class"], "city"],
          [">", ["get", "rank"], 4],
          ["!", ["has", "capital"]],
        ],
        layout: labelLayout(names, ["interpolate", ["linear"], ["zoom"], 5, 11, 9, 14], {
          "symbol-sort-key": ["get", "rank"],
        }),
        paint: labelPaint,
      },
      {
        id: "label-town",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 6,
        maxzoom: 14,
        filter: ["==", ["get", "class"], "town"],
        layout: labelLayout(names, ["interpolate", ["linear"], ["zoom"], 6, 11, 10, 14], {
          "symbol-sort-key": ["get", "rank"],
        }),
        paint: { ...labelPaint, "text-color": DIM },
      },
      {
        id: "label-sea",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "water_name",
        maxzoom: 6,
        filter: ["match", ["get", "class"], ["ocean", "sea"], true, false],
        layout: labelLayout(names, ["interpolate", ["linear"], ["zoom"], 0, 11, 3, 13, 5, 15], {
          "text-letter-spacing": 0.08,
          "symbol-sort-key": ["get", "rank"],
        }),
        paint: { ...labelPaint, "text-color": DIM },
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
