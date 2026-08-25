// 地球儀。平面図(Leaflet)とは別に、同じ昼夜の境界を球の上に載せる。
//
// MapLibre の globe projection を使い、タイルは平面図と同じ OSM。
// MapLibre 本体は WebGL2 が使えると分かってから読む。先に読むと、非対応
// 環境ではモジュール評価の時点で落ちて、案内を出すコードに届かない。

import type { GeoJSONSource } from "maplibre-gl";

import type { Cam, CamState } from "../domain/cams";
import { GLOBE_ZOOM, INITIAL_VIEW } from "../domain/mapView";
import { nightPolygonGeoJSON, terminatorLineGeoJSON } from "../domain/terminator";
import type { Lang } from "../domain/weather";
import { camName, t } from "./i18n";

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
const INK_2 = "#132532";
const DIM = "#7e9099";
const NIGHT = "#050c14";

function emptyCollection(): { type: "FeatureCollection"; features: never[] } {
  return { type: "FeatureCollection", features: [] };
}

function isGpuFailure(error: unknown): boolean {
  return error instanceof Error && /WebGL2 is required|GPUNotInitialized|GPUInitialization/i.test(
    error.message,
  );
}

function webgl2Available(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return canvas.getContext("webgl2") !== null;
  } catch {
    return false;
  }
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
  if (!webgl2Available()) return createUnsupportedView(container, lang);

  try {
    container.replaceChildren();
    const maplibre = await import("maplibre-gl");
    await import("maplibre-gl/dist/maplibre-gl.css");
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
      sky: {
        "sky-color": "#07141c",
        "horizon-color": "#1a3845",
        "fog-color": INK,
        "atmosphere-blend": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.88,
          3,
          0.72,
          6,
          0.18,
          8,
          0,
        ],
      },
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
          paint: { "background-color": INK },
        },
        {
          id: "osm",
          type: "raster",
          source: "osm",
          paint: {
            // 素の OSM は明るいので、海図の藍に寄せる。CSS フィルタはキャンバス
            // 全体(夜の影とピンも含む)に掛かってしまうので、タイル層だけで暗くする。
            "raster-saturation": -0.62,
            "raster-contrast": 0.12,
            "raster-brightness-min": 0,
            "raster-brightness-max": 0.42,
          },
        },
        {
          id: "night-shade",
          type: "fill",
          source: "night",
          paint: {
            "fill-color": NIGHT,
            "fill-opacity": 0.58,
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
          id: "cams-point",
          type: "circle",
          source: "cams",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              ["case", ["get", "selected"], 5.5, 2.6],
              4,
              ["case", ["get", "selected"], 8, 4.5],
              8,
              ["case", ["get", "selected"], 10, 6],
            ],
            "circle-color": ["case", ["==", ["get", "status"], "live"], LIT, INK_2],
            "circle-stroke-width": ["case", ["==", ["get", "status"], "live"], 1.5, 1],
            "circle-stroke-color": ["case", ["==", ["get", "status"], "live"], LIT, DIM],
            "circle-opacity": ["case", ["==", ["get", "status"], "live"], 1, 0.55],
          },
        },
      ],
    },
    center: [lng, lat],
    zoom: GLOBE_ZOOM,
    minZoom: 0.8,
    maxZoom: 16,
    attributionControl: { compact: true },
    maplibreLogo: false,
    renderWorldCopies: false,
    canvasContextAttributes: { antialias: true },
  });

  map.addControl(new NavigationControl({ showCompass: true, visualizePitch: false }), "top-right");

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
        id: cam.id,
        properties: {
          id: cam.id,
          name: camName(cam.name, currentLang),
          status: states.get(cam.id)?.status ?? "unknown",
          selected: selected.has(cam.id),
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

  map.on("load", () => {
    ready = true;
    for (const fn of queued) fn();
    queued.length = 0;
  });

  map.on("click", "cams-point", (event) => {
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
      if (failed) return;
      map.resize();
    },
  };
}
