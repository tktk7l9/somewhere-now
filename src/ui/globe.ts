// 地球儀。平面図(Leaflet)とは別に、同じ昼夜の境界を球の上に載せる。
//
// MapLibre の globe projection を使う。平面図は OSM ラスタ + CSS フィルタで
// 海図色にしている。地球儀は Worker fetch のため OSM 公式タイルが空を返し、
// キャンバス全体への CSS フィルタは夜の影まで反転するので使えない。
// OpenFreeMap のベクトル図式をここで組む。図式 JSON を取りに行く待ちと、
// ラスタを画素単位で塗る待ちを捨てて、国・都市名は夜の影より手前に出す。
// MapLibre 本体は動的 import。先に読むと、非対応環境ではモジュール評価の
// 時点で落ちて、案内を出すコードに届かない。

import type { GeoJSONSource, StyleSpecification } from "maplibre-gl";

import type { Cam, CamState } from "../domain/cams";
import { GLOBE_ZOOM, INITIAL_VIEW, type MapViewport } from "../domain/mapView";
import { nightPolygonGeoJSON, terminatorLineGeoJSON } from "../domain/terminator";
import type { Lang } from "../domain/weather";
import { globeStyle, LABEL_LAYER_IDS, placeNameField, type GlobeStyleJson } from "./globeStyle";
import { t } from "./i18n";

export interface GlobeView {
  setStates(states: ReadonlyMap<string, CamState>): void;
  setVisible(cams: readonly Cam[]): void;
  setSelected(camIds: readonly string[]): void;
  setLang(lang: Lang): void;
  focus(cam: Cam): void;
  goTo(view: MapViewport): void;
  drawTerminator(at: Date): void;
  invalidate(): void;
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
    goTo() {},
    drawTerminator() {},
    invalidate() {},
  };
}

export function prefetchGlobeRuntime(): void {
  if (document.querySelector("link[data-globe-preconnect]") === null) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://tiles.openfreemap.org";
    link.crossOrigin = "anonymous";
    link.dataset["globePreconnect"] = "1";
    document.head.appendChild(link);
  }
  void import("maplibre-gl");
  void import("maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url");
  void import("maplibre-gl/dist/maplibre-gl.css");
}

export async function createGlobeView(
  container: HTMLElement,
  cams: readonly Cam[],
  lang: Lang,
  onSelect: (camId: string) => void,
): Promise<GlobeView> {
  try {
    const maplibre = await import("maplibre-gl");
    // Vite は import.meta.url から worker の隣ファイルを解けない。GeoJSON(ピン・夜)
    // が worker 待ちのままになり、球だけが空で残る。
    const { default: workerUrl } = await import("maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url");
    maplibre.setWorkerUrl(workerUrl);
    await import("maplibre-gl/dist/maplibre-gl.css");
    container.replaceChildren();
    return mountGlobe(maplibre, container, cams, lang, onSelect, globeStyle(lang));
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
  style: GlobeStyleJson,
): GlobeView {
  const [lat, lng] = INITIAL_VIEW.center;
  const MapLibreMap = maplibre.Map;
  const { NavigationControl } = maplibre;

  const map = new MapLibreMap({
    container,
    style: style as StyleSpecification,
    center: [lng, lat],
    zoom: GLOBE_ZOOM,
    pitch: 18,
    minZoom: 0.6,
    maxZoom: 16,
    fadeDuration: 0,
    // CJK はシステム書体を使い、グリフ PBF の往復を省略する。
    localIdeographFontFamily: '"Hiragino Sans", "Noto Sans JP", sans-serif',
    refreshExpiredTiles: false,
    attributionControl: { compact: true },
    maplibreLogo: false,
    renderWorldCopies: false,
    canvasContextAttributes: {
      antialias: true,
      failIfMajorPerformanceCaveat: false,
    },
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

  function markReady(): void {
    if (failed || ready) return;
    ready = true;
    for (const fn of queued) fn();
    queued.length = 0;
    syncSize();
    requestAnimationFrame(syncSize);
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

  map.on("style.load", () => {
    map.setProjection({ type: "globe" });
    // 地球儀では raster タイル待ちで `load` が来ないことがある。
    // style が載った時点でソースは使えるので、ピンはここで入れる。
    markReady();
  });
  map.on("load", markReady);
  if (map.isStyleLoaded()) markReady();

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
      else {
        whenReady(() => {
          const field = placeNameField(currentLang);
          for (const id of LABEL_LAYER_IDS) {
            if (map.getLayer(id)) map.setLayoutProperty(id, "text-field", field);
          }
          paintCams();
        });
      }
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
    goTo(view) {
      whenReady(() => {
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        map.flyTo({
          center: [view.center[1], view.center[0]],
          zoom: view.zoom,
          duration: reduced ? 0 : 800,
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
