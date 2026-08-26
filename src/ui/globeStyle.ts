// 地球儀の地図スタイル。平面図は OSM ラスタに地名と国境が焼き付いている。
// 地球儀でベクトルタイルの place に頼ると、衝突やグリフで名前が消える。
// 国境と国名・主要都市は Natural Earth を同梱した GeoJSON で必ず描く。

import type { ExpressionSpecification } from "maplibre-gl";

import atlas from "../data/globeAtlas.json";
import type { Lang } from "../domain/weather";

const LIT = "#ffb94a";
const INK = "#0b1620";
const INK_2 = "#132532";
const NIGHT = "#050c14";
const SPACE = "#02080c";
const BONE = "#e8e2d4";
const DIM = "#c5d0d4";
const PIN_RING = "#d8e0e4";
const HALO = "#0b1620";

export const GLOBE_TILES_ORIGIN = "https://tiles.openfreemap.org";
export const LABEL_LAYER_IDS = ["label-country", "label-city"] as const;

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

/** 同梱 GeoJSON は ja / en。無い方の言語に退く。 */
export function placeNameField(lang: Lang): ExpressionSpecification {
  if (lang === "ja") {
    return ["coalesce", ["get", "ja"], ["get", "en"]];
  }
  return ["coalesce", ["get", "en"], ["get", "ja"]];
}

const labelPaint = {
  "text-color": BONE,
  "text-halo-color": HALO,
  "text-halo-width": 2.2,
  "text-halo-blur": 0.2,
};

export function globeStyle(lang: Lang): GlobeStyleJson {
  const names = placeNameField(lang);
  return {
    version: 8,
    glyphs: `${GLOBE_TILES_ORIGIN}/fonts/{fontstack}/{range}.pbf`,
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
          '<a href="https://www.naturalearthdata.com/" target="_blank">Natural Earth</a> <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      },
      openmaptiles: {
        type: "vector",
        url: `${GLOBE_TILES_ORIGIN}/planet`,
      },
      atlasBorders: { type: "geojson", data: atlas.borders },
      atlasCountries: { type: "geojson", data: atlas.countries },
      atlasCities: { type: "geojson", data: atlas.cities },
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
        id: "boundary-state",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        minzoom: 3,
        filter: [
          "all",
          ["match", ["to-number", ["get", "admin_level"]], [3, 4], true, false],
          ["!=", ["coalesce", ["to-number", ["get", "maritime"]], 0], 1],
        ],
        paint: {
          "line-color": DIM,
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 3, 0.45, 6, 0.7],
          "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.7, 8, 1.3],
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
          ["match", ["to-number", ["get", "admin_level"]], [5, 6, 7, 8, 9], true, false],
          ["!=", ["coalesce", ["to-number", ["get", "maritime"]], 0], 1],
        ],
        paint: {
          "line-color": DIM,
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.4, 10, 0.65],
          "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.5, 11, 1],
          "line-dasharray": [1.5, 2],
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
        id: "boundary-country",
        type: "line",
        source: "atlasBorders",
        paint: {
          "line-color": BONE,
          "line-opacity": 0.92,
          "line-width": ["interpolate", ["linear"], ["zoom"], 0, 1.35, 3, 1.8, 6, 2.4],
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
      {
        id: "label-country",
        type: "symbol",
        source: "atlasCountries",
        maxzoom: 7,
        layout: {
          "text-field": names,
          "text-font": ["Noto Sans Bold"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 0, 14, 2.8, 20, 5, 26],
          "text-max-width": 8,
          "text-padding": 2,
          "text-anchor": "center",
          "text-pitch-alignment": "viewport",
          "text-allow-overlap": true,
          "text-ignore-placement": true,
          "symbol-sort-key": ["get", "rank"],
        },
        paint: labelPaint,
      },
      {
        id: "label-city",
        type: "symbol",
        source: "atlasCities",
        minzoom: 2,
        maxzoom: 12,
        filter: ["any", ["<=", ["get", "rank"], 3], ["==", ["get", "capital"], 1]],
        layout: {
          "text-field": names,
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 2, 12, 5, 15, 8, 18],
          "text-max-width": 8,
          "text-padding": 2,
          "text-offset": [0, 0.2],
          "text-anchor": "center",
          "text-pitch-alignment": "viewport",
          "text-allow-overlap": true,
          "text-ignore-placement": true,
          "symbol-sort-key": ["get", "rank"],
        },
        paint: labelPaint,
      },
    ],
  };
}
