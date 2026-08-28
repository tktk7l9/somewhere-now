// 地図。主役であり、同時に唯一の案内でもある。
//
// 素の OSM は明るすぎて夜の影が乗らないので、タイルは CSS で海図の色に寄せて
// いる(styles.css の .leaflet-tile-pane)。その上に太陽高度 0° の線で切った
// 夜側のポリゴンを重ねる ＝ このアプリの署名。

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";

import type { Cam, PublicCamState } from "../domain/cams";
import { coalesced } from "../domain/coalesce";
import { INITIAL_VIEW, type MapViewport } from "../domain/mapView";
import { nightPolygon, terminatorLine } from "../domain/terminator";
import { camName } from "./i18n";
import { pinHtml } from "./pin";
import type { Lang } from "../domain/weather";

/** 導入で夜が流れ込んでくる長さと、その巻き戻し幅。 */
const INTRO_MS = 1100;
const INTRO_LOOKBACK_HOURS = 6;

export interface MapView {
  setStates(states: ReadonlyMap<string, PublicCamState>): void;
  setVisible(cams: readonly Cam[]): void;
  setSelected(camIds: readonly string[]): void;
  setLang(lang: Lang): void;
  focus(cam: Cam): void;
  goTo(view: MapViewport): void;
  drawTerminator(at: Date): void;
  playIntro(now: Date): void;
  invalidate(): void;
}

export function createMapView(
  container: HTMLElement,
  cams: readonly Cam[],
  lang: Lang,
  onSelect: (camId: string) => void,
): MapView {
  const map = L.map(container, {
    // index.html がこの初期表示のタイルを preload している(domain/mapView.ts)。
    center: INITIAL_VIEW.center,
    zoom: INITIAL_VIEW.zoom,
    minZoom: 2,
    maxZoom: 16,
    // 左上は署名(夜の割合)の場所なので、操作は右上へ逃がす。
    zoomControl: false,
    worldCopyJump: false,
    // 夜のポリゴンは世界 1 枚ぶんしか無いので、地図も 1 枚に留める。
    maxBounds: L.latLngBounds([-85, -180], [85, 180]),
    maxBoundsViscosity: 1,
  });

  L.control.zoom({ position: "topright" }).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    // 世界 1 枚に留める。bounds を切らないと端で存在しないタイルを取りにいって
    // 400 が並ぶ。
    noWrap: true,
    bounds: L.latLngBounds([-85.06, -180], [85.06, 180]),
  }).addTo(map);

  const shade = L.polygon([], {
    className: "night-shade",
    stroke: false,
    fillColor: "#050c14",
    fillOpacity: 0.6,
    interactive: false,
  }).addTo(map);

  // 影だけだと境界がぼやけるので、日の出・日の入りの線そのものを細く引く。
  const line = L.polyline([], {
    className: "terminator",
    color: "#ffb94a",
    weight: 1,
    opacity: 0.42,
    interactive: false,
  }).addTo(map);

  const cluster = L.markerClusterGroup({
    maxClusterRadius: 44,
    showCoverageOnHover: false,
    iconCreateFunction: (group) => {
      const children = group.getAllChildMarkers();
      const live = children.some((m) => m.options.icon?.options.className === "is-live");
      return L.divIcon({
        html: `<span class="cluster${live ? " cluster--live" : ""}">${children.length}</span>`,
        className: "",
        iconSize: [30, 30],
      });
    },
  });
  map.addLayer(cluster);

  const markers = new Map<string, L.Marker>();
  let states: ReadonlyMap<string, PublicCamState> = new Map();
  let selected: ReadonlySet<string> = new Set();
  let currentLang = lang;
  let visible: readonly Cam[] = cams;

  function iconFor(cam: Cam): L.DivIcon {
    const status = states.get(cam.id)?.status;
    return L.divIcon({
      html: pinHtml(status, selected.has(cam.id)),
      // クラスタの見た目をライブ有無で変えるため、状態をアイコンに載せておく。
      className: status === "live" ? "is-live" : "",
      iconSize: [13, 13],
      iconAnchor: [6.5, 6.5],
    });
  }

  // 4 つの setter が続けて呼ばれても描き直しは 1 回。5,720 台ぶんのマーカーを
  // 毎回作り直すと、1 度の更新で 2 万個以上を捨てて作ることになる。
  const requestRender = coalesced(() => render());

  function render(): void {
    cluster.clearLayers();
    markers.clear();
    for (const cam of visible) {
      const marker = L.marker([cam.lat, cam.lng], {
        icon: iconFor(cam),
        title: camName(cam.name, currentLang),
        alt: camName(cam.name, currentLang),
        keyboard: true,
      });
      marker.on("click", () => onSelect(cam.id));
      markers.set(cam.id, marker);
      cluster.addLayer(marker);
    }
  }

  render();

  let here: L.Marker | null = null;

  function paintHere(lat: number, lng: number): void {
    if (here !== null) {
      here.setLatLng([lat, lng]);
      return;
    }
    here = L.marker([lat, lng], {
      icon: L.divIcon({
        html: '<span class="here"></span>',
        className: "here-wrap",
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5],
      }),
      interactive: false,
      keyboard: false,
      zIndexOffset: 400,
    }).addTo(map);
  }

  function fly(lat: number, lng: number, zoom: number): void {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) map.setView([lat, lng], zoom);
    else map.flyTo([lat, lng], zoom, { duration: 0.8 });
  }

  return {
    setStates(next) {
      states = next;
      requestRender();
    },
    setVisible(next) {
      visible = next;
      requestRender();
    },
    setSelected(camIds) {
      selected = new Set(camIds);
      requestRender();
    },
    setLang(next) {
      currentLang = next;
      requestRender();
    },
    focus(cam) {
      map.flyTo([cam.lat, cam.lng], Math.max(map.getZoom(), 6), { duration: 0.8 });
    },
    goTo(view) {
      const [lat, lng] = view.center;
      paintHere(lat, lng);
      fly(lat, lng, view.zoom);
    },
    drawTerminator(at) {
      shade.setLatLngs(nightPolygon(at, 1));
      line.setLatLngs(terminatorLine(at, 1));
    },
    playIntro(now) {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        this.drawTerminator(now);
        return;
      }
      // 夜が east から流れ込んでくるところを見せてから、いまの位置に落ち着く。
      const from = now.getTime() - INTRO_LOOKBACK_HOURS * 3_600_000;
      const start = performance.now();
      const step = (frame: number): void => {
        const progress = Math.min(1, (frame - start) / INTRO_MS);
        // 終盤ほど減速させて、現在時刻にすっと収める。
        const eased = 1 - (1 - progress) ** 3;
        this.drawTerminator(new Date(from + (now.getTime() - from) * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    invalidate() {
      map.invalidateSize();
    },
  };
}
