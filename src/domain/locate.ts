// Moves the map to the current location. The UI passes in the browser's Geolocation;
// this only "clamps the obtained coordinates into the map box and decides a zoom that
// shows the vicinity". Never fetched automatically. Only when pressed. The location is
// not kept in the URL either.

import type { Cam, PublicCamState } from "./cams";
import type { MapViewport } from "./mapView";

/** Same as maxBounds of the flat map. Mercator breaks at the poles, so cut at 85°. */
export const MAP_LAT_LIMIT = 85;

/**
 * Do not wait for high-accuracy GPS. IP + Wi-Fi level is enough for a map of the
 * vicinity, and the time spent frozen after pressing the button costs more.
 */
export const LOCATE_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 10_000,
  maximumAge: 60_000,
} as const;

export type LocateFailure = "unsupported" | "denied" | "unavailable" | "timeout";

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

export type LocateOutcome =
  | { ok: true; position: GeoPosition }
  | { ok: false; reason: LocateFailure };

/** Same shape as navigator.geolocation. Tests pass this in. */
export interface Locator {
  getCurrentPosition(
    success: (position: { coords: { latitude: number; longitude: number; accuracy: number } }) => void,
    error?: (error: { code: number }) => void,
    options?: {
      enableHighAccuracy?: boolean;
      timeout?: number;
      maximumAge?: number;
    },
  ): void;
}

/** The code of GeolocationPositionError. Checked as numbers, without depending on DOM types. */
const PERMISSION_DENIED = 1;
const TIMEOUT = 3;

export function classifyLocateError(code: number): LocateFailure {
  if (code === PERMISSION_DENIED) return "denied";
  if (code === TIMEOUT) return "timeout";
  return "unavailable";
}

export function clampLat(lat: number): number {
  return Math.min(MAP_LAT_LIMIT, Math.max(-MAP_LAT_LIMIT, lat));
}

/**
 * Wraps the longitude into (-180, 180]. The map is a single world, so overflow goes to the other
 * side.
 */
export function wrapLng(lng: number): number {
  const wrapped = ((((lng + 180) % 360) + 360) % 360) - 180;
  return wrapped === -180 ? 180 : wrapped;
}

/**
 * Pulls back more as the accuracy gets coarser. A distance showing streets to a metro area.
 * Always closer than the initial view (zoom 2), and does not go up to the flat map limit (16).
 */
const ACCURACY_ZOOM: ReadonlyArray<readonly [limit: number, zoom: number]> = [
  [50, 15],
  [150, 14],
  [500, 13],
  [2000, 12],
  [5000, 11],
  [20_000, 10],
];
const DEFAULT_NEARBY_ZOOM = 12;
const COARSE_ZOOM = 9;

export function zoomForAccuracy(accuracyMeters: number): number {
  if (!Number.isFinite(accuracyMeters) || accuracyMeters < 0) return DEFAULT_NEARBY_ZOOM;
  for (const [limit, zoom] of ACCURACY_ZOOM) {
    if (accuracyMeters <= limit) return zoom;
  }
  return COARSE_ZOOM;
}

/** null when the coordinates are broken. Do not fly to a wrong place. */
export function viewportForLocation(
  lat: number,
  lng: number,
  accuracyMeters: number,
): MapViewport | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {
    center: [clampLat(lat), wrapLng(lng)],
    zoom: zoomForAccuracy(accuracyMeters),
  };
}

/** Earth radius used for the great-circle distance (km). */
const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/**
 * Great-circle distance between 2 points (km).
 *
 * Works across the date line too. The longitude difference goes through trigonometric
 * functions, so it is periodic: 179° E and 179° W come out 2° apart, not 358°.
 */
export function distanceKm(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
  const halfLat = toRadians(to.lat - from.lat) / 2;
  const halfLng = toRadians(to.lng - from.lng) / 2;
  const h =
    Math.sin(halfLat) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(halfLng) ** 2;
  // When rounding error pushes h slightly over 1, asin returns NaN.
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

function viewerCount(states: ReadonlyMap<string, PublicCamState>, cam: Cam): number {
  return states.get(cam.id)?.viewers ?? -1;
}

/**
 * The camera nearest to the current location.
 *
 * **Live ones come first.** A camera right next door being stopped is common, and
 * "slightly farther but showing" serves better than "near but showing nothing".
 * Only when none is live, pick by nearness regardless of state.
 *
 * **At the same distance, the one with more viewers.** 3,394 cameras (60%) of the master
 * data sit in bundles that share the same coordinates, and the largest bundle has 203
 * cameras on 1 point in the city center. Nearness makes no difference there, so instead of
 * the meaningless criterion of order, take the one actually being watched now.
 *
 * Cameras with broken coordinates are excluded. Do not take the user to a wrong place.
 */
export function nearestCam(
  cams: readonly Cam[],
  states: ReadonlyMap<string, PublicCamState>,
  from: { lat: number; lng: number },
): Cam | null {
  if (!Number.isFinite(from.lat) || !Number.isFinite(from.lng)) return null;

  const live = cams.filter((cam) => states.get(cam.id)?.status === "live");
  const pool = live.length > 0 ? live : cams;

  const measured = pool
    .map((cam) => ({ cam, km: distanceKm(from, cam) }))
    .filter(({ km }) => Number.isFinite(km));
  if (measured.length === 0) return null;

  measured.sort((a, b) => a.km - b.km || viewerCount(states, b.cam) - viewerCount(states, a.cam));
  return measured[0]!.cam;
}

export function requestLocation(locator: Locator | undefined | null): Promise<LocateOutcome> {
  if (locator == null) return Promise.resolve({ ok: false, reason: "unsupported" });

  return new Promise((resolve) => {
    try {
      locator.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = position.coords.accuracy;
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            resolve({ ok: false, reason: "unavailable" });
            return;
          }
          resolve({
            ok: true,
            position: {
              lat,
              lng,
              accuracy: Number.isFinite(accuracy) ? accuracy : Number.NaN,
            },
          });
        },
        (error) => resolve({ ok: false, reason: classifyLocateError(error.code) }),
        LOCATE_OPTIONS,
      );
    } catch {
      resolve({ ok: false, reason: "unavailable" });
    }
  });
}
