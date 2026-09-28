// The map. It is the lead, and at the same time the only guide.
//
// Plain OSM is too bright for the shadow of night to show, so the tiles are moved toward chart
// colors with CSS (.leaflet-tile-pane in styles.css). On top of that goes the night-side polygon
// cut along the line of solar altitude 0° = the signature of this app.

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

/** The duration over which night flows in during the intro, and how far it rewinds. */
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
  /**
   * The height (px) by which the panel rising from the bottom covers the lower edge of the map. 0
   * on screens laid out side by side.
   */
  obscuredBottom: () => number = () => 0,
): MapView {
  const map = L.map(container, {
    // index.html preloads the tiles of this initial view (domain/mapView.ts).
    center: INITIAL_VIEW.center,
    zoom: INITIAL_VIEW.zoom,
    minZoom: 2,
    maxZoom: 16,
    // The top left is the place of the signature (share of night), so the controls move to the top
    // right.
    zoomControl: false,
    worldCopyJump: false,
    // The night polygon covers only a single world, so the map stays at a single world too.
    maxBounds: L.latLngBounds([-85, -180], [85, 180]),
    maxBoundsViscosity: 1,
  });

  L.control.zoom({ position: "topright" }).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    // Stay at a single world. Without cutting bounds it fetches nonexistent tiles at the edges and
    // 400s line up.
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

  // The shadow alone blurs the boundary, so the sunrise/sunset line itself is drawn thin.
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
      // To change the cluster look by whether it has live cameras, carry the state on the icon.
      className: status === "live" ? "is-live" : "",
      iconSize: [13, 13],
      iconAnchor: [6.5, 6.5],
    });
  }

  // Even when the 4 setters are called in a row, there is 1 redraw. Rebuilding the markers for
  // 5,720 cameras every time means discarding and creating over 20,000 in a single update.
  const requestRender = coalesced(() => render());

  function render(): void {
    cluster.clearLayers();
    markers.clear();
    // Calling addLayer one camera at a time rebuilds the clusters each time, which at 5,720 cameras
    // becomes a freeze of several hundred ms. Passing them together lets it build in one batch
    // internally.
    const batch: L.Marker[] = [];
    for (const cam of visible) {
      const marker = L.marker([cam.lat, cam.lng], {
        icon: iconFor(cam),
        title: camName(cam.name, currentLang),
        alt: camName(cam.name, currentLang),
        keyboard: true,
      });
      marker.on("click", () => onSelect(cam.id));
      markers.set(cam.id, marker);
      batch.push(marker);
    }
    cluster.addLayers(batch);
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

  /**
   * Shift the map center south by only half the covered height = the aim comes to the middle of the
   * visible side. Adding in latitude drifts at high latitudes, so convert to pixels first and add
   * there.
   */
  function aimAt(lat: number, lng: number, zoom: number): L.LatLng {
    const hidden = obscuredBottom();
    if (hidden < 8) return L.latLng(lat, lng);
    const point = map.project([lat, lng], zoom).add(new L.Point(0, hidden / 2));
    return map.unproject(point, zoom);
  }

  function fly(lat: number, lng: number, zoom: number): void {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = aimAt(lat, lng, zoom);
    if (reduced) map.setView(target, zoom);
    else map.flyTo(target, zoom, { duration: 0.8 });
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
      const zoom = Math.max(map.getZoom(), 6);
      map.flyTo(aimAt(cam.lat, cam.lng, zoom), zoom, { duration: 0.8 });
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
      // Show night flowing in from the east, then settle at the current position.
      const from = now.getTime() - INTRO_LOOKBACK_HOURS * 3_600_000;
      const start = performance.now();
      const step = (frame: number): void => {
        const progress = Math.min(1, (frame - start) / INTRO_MS);
        // Decelerate more toward the end so it eases into the current time.
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
