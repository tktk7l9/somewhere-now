// 地球儀。平面図(Leaflet)とは別に、同じ昼夜の境界を球の上に載せる。
//
// MapLibre の globe projection を使う。タイルは OSM 公式サーバーにしない。
// Leaflet は <img> なので Referer が付き、平面図は映る。MapLibre は Worker 経由
// の fetch で Referer が落ち、OSM が x-blocked で空タイルを返す。球の色も
// 背景と同じ藍だと、タイルが来ても大気に塗られて消える。
// MapLibre 本体は動的 import。先に読むと、非対応環境ではモジュール評価の
// 時点で落ちて、案内を出すコードに届かない。

import type { GeoJSONSource } from "maplibre-gl";

import type { Cam, CamState } from "../domain/cams";
import { GLOBE_ZOOM, INITIAL_VIEW } from "../domain/mapView";
import { nightPolygonGeoJSON, terminatorLineGeoJSON } from "../domain/terminator";
import type { Lang } from "../domain/weather";
import { t } from "./i18n";

export interface GlobeView {
  setStates(states: ReadonlyMap<string, CamState>): void;
  setVisible(cams: readonly Cam[]): void;
  setSelected(camIds: readonly string[]): void;
  setLang(lang: Lang): void;
  focus(cam: Cam): void;
  drawTerminator(at: Date): void;
  invalidate(): void;
}

const LIT = "#ffb94a";
const INK = "#0b1620";
const NIGHT = "#050c14";
const SPACE = "#02080c";
/** 夜側でも輪郭が残る。平面図の --dim だと球に溶ける。 */
const PIN_RING = "#d8e0e4";

// OSM 由来。公式 tile.openstreetmap.org は Worker fetch を拒否するので使わない。
const GLOBE_TILES = [
  "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
  "https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
  "https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
  "https://d.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
];
const GLOBE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function emptyCollection(): { type: "FeatureCollection"; features: never[] } {
  return { type: "FeatureCollection", features: [] };
}

function isGpuFailure(error: unknown): boolean {
  return error instanceof Error && /WebGL2 is required|GPUNotInitialized|GPUInitialization/i.test(
    error.message,
  );
}

export function createUnsupportedView(container: HTMLElement, lang: Lang): GlobeView {
  let currentLang = lang;
  const paint = (): void => {
    const message = document.createElement("p");
    message.className = "globe__unsupported";
    message.textContent = t("globeUnsupported", currentLang);
    container.replaceChildren(message);
  };
  paint();
  return {
    setStates() {},
    setVisible() {},
    setSelected() {},
    setLang(next) {
      currentLang = next;
      paint();
    },
    focus() {},
    drawTerminator() {},
    invalidate() {},
  };
}

export async function createGlobeView(
  container: HTMLElement,
  cams: readonly Cam[],
  lang: Lang,
  onSelect: (camId: string) => void,
): Promise<GlobeView> {
  try {
    const maplibre = await import("maplibre-gl");
    await import("maplibre-gl/dist/maplibre-gl.css");
    container.replaceChildren();
    return mountGlobe(maplibre, container, cams, lang, onSelect);
  } catch {
    return createUnsupportedView(container, lang);
  }
}

function mountGlobe(
  maplibre: typeof import("maplibre-gl"),
  container: HTMLElement,
  cams: readonly Cam[],
  lang: Lang,
  onSelect: (camId: string) => void,
): GlobeView {
  const [lat, lng] = INITIAL_VIEW.center;
  const MapLibreMap = maplibre.Map;
  const { NavigationControl } = maplibre;

  const map = new MapLibreMap({
    container,
    style: {
      version: 8,
      projection: { type: "globe" },
      // 大気は輪郭のリムだけ。blend を高くして sky-color を地と同じ藍にすると、
      // タイルが載っても球全体が背景に溶ける。
      sky: {
        "sky-color": "#6a93a8",
        "horizon-color": "#b7cdd4",
        "fog-color": SPACE,
        "atmosphere-blend": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.32,
          3,
          0.2,
          6,
          0,
        ],
      },
      light: {
        anchor: "viewport",
        color: "#e8e2d4",
        intensity: 0.35,
        position: [1.15, 210, 30],
      },
      sources: {
        earth: {
          type: "raster",
          tiles: GLOBE_TILES,
          tileSize: 256,
          attribution: GLOBE_ATTRIBUTION,
          maxzoom: 19,
        },
        night: { type: "geojson", data: emptyCollection() },
        terminator: { type: "geojson", data: emptyCollection() },
        cams: { type: "geojson", data: emptyCollection() },
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
          paint: {
            // 海図の藍に寄せるが、大陸が消えるところまでは落とさない。
            "raster-saturation": -0.28,
            "raster-contrast": 0.08,
            "raster-brightness-min": 0.08,
            "raster-brightness-max": 0.82,
            "raster-fade-duration": 0,
          },
        },
        {
          id: "night-shade",
          type: "fill",
          source: "night",
          paint: {
            "fill-color": NIGHT,
            "fill-opacity": 0.42,
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
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0.6,
              7,
              2.8,
              11,
              8,
              14,
            ],
            "circle-color": LIT,
            "circle-opacity": 0.22,
            "circle-stroke-width": 0,
          },
        },
        {
          // HTML Marker は 3000 台で毎フレーム DOM を動かし、ピンが載る前に固まる。
          // circle は球の上で描けるが、紺・数ピクセルだと夜側に溶ける。
          // 平面図の 13px 相当まで広げ、輪郭は夜でも残る色にする。
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
            "circle-stroke-color": [
              "case",
              ["==", ["get", "status"], "live"],
              LIT,
              PIN_RING,
            ],
            "circle-opacity": [
              "case",
              [
                "any",
                ["==", ["get", "status"], "offline"],
                ["==", ["get", "status"], "blocked"],
              ],
              0.42,
              1,
            ],
            "circle-stroke-opacity": [
              "case",
              [
                "any",
                ["==", ["get", "status"], "offline"],
                ["==", ["get", "status"], "blocked"],
              ],
              0.55,
              1,
            ],
          },
        },
      ],
    },
    center: [lng, lat],
    zoom: GLOBE_ZOOM,
    pitch: 18,
    minZoom: 0.6,
    maxZoom: 16,
    attributionControl: { compact: true },
    maplibreLogo: false,
    renderWorldCopies: false,
    canvasContextAttributes: {
      antialias: true,
      failIfMajorPerformanceCaveat: false,
    },
  });

  map.addControl(new NavigationControl({ showCompass: true, visualizePitch: false }), "top-right");

  map.on("style.load", () => {
    map.setProjection({ type: "globe" });
  });

  let states: ReadonlyMap<string, CamState> = new Map();
  let selected: ReadonlySet<string> = new Set();
  let currentLang = lang;
  let visible: readonly Cam[] = cams;
  let ready = false;
  let failed = false;
  const queued: Array<() => void> = [];

  function whenReady(fn: () => void): void {
    if (failed) return;
    if (ready) fn();
    else queued.push(fn);
  }

  function failGpu(): void {
    if (failed) return;
    failed = true;
    queued.length = 0;
    try {
      map.remove();
    } catch {
      // 既に死んでいるコンテキストなら、メッセージを出すだけでよい。
    }
    createUnsupportedView(container, currentLang);
  }

  map.on("error", (event) => {
    if (isGpuFailure(event.error)) failGpu();
  });

  function source(id: "night" | "terminator" | "cams"): GeoJSONSource {
    return map.getSource(id) as GeoJSONSource;
  }

  function paintCams(): void {
    source("cams").setData({
      type: "FeatureCollection",
      features: visible.map((cam) => ({
        type: "Feature" as const,
        properties: {
          id: cam.id,
          status: states.get(cam.id)?.status ?? "",
          selected: selected.has(cam.id) ? 1 : 0,
        },
        geometry: { type: "Point" as const, coordinates: [cam.lng, cam.lat] },
      })),
    });
  }

  function paintTerminator(at: Date): void {
    source("night").setData({
      type: "Feature",
      properties: {},
      geometry: nightPolygonGeoJSON(at, 1),
    });
    source("terminator").setData({
      type: "Feature",
      properties: {},
      geometry: terminatorLineGeoJSON(at, 1),
    });
  }

  function syncSize(): void {
    if (failed) return;
    map.resize();
    map.triggerRepaint();
  }

  map.on("load", () => {
    syncSize();
    ready = true;
    for (const fn of queued) fn();
    queued.length = 0;
    requestAnimationFrame(syncSize);
  });

  map.on("click", "cams-point", (event) => {
    const id = event.features?.[0]?.properties?.["id"];
    if (typeof id === "string") onSelect(id);
  });
  map.on("click", "cams-glow", (event) => {
    const id = event.features?.[0]?.properties?.["id"];
    if (typeof id === "string") onSelect(id);
  });
  map.on("mouseenter", "cams-point", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "cams-point", () => {
    map.getCanvas().style.cursor = "";
  });

  whenReady(() => {
    paintCams();
    paintTerminator(new Date());
  });

  return {
    setStates(next) {
      states = next;
      whenReady(paintCams);
    },
    setVisible(next) {
      visible = next;
      whenReady(paintCams);
    },
    setSelected(camIds) {
      selected = new Set(camIds);
      whenReady(paintCams);
    },
    setLang(next) {
      currentLang = next;
      if (failed) createUnsupportedView(container, currentLang);
      else whenReady(paintCams);
    },
    focus(cam) {
      whenReady(() => {
        map.flyTo({
          center: [cam.lng, cam.lat],
          zoom: Math.max(map.getZoom(), 4),
          duration: 800,
        });
      });
    },
    drawTerminator(at) {
      whenReady(() => paintTerminator(at));
    },
    invalidate() {
      syncSize();
    },
  };
}
