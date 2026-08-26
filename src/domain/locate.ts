// 現在地へ地図を寄せる。ブラウザの Geolocation は UI から渡してもらい、
// ここでは「取れた座標を地図の箱に収めて、付近が見えるズームを決める」だけをする。
// 自動では取らない。押したときだけ。位置は URL にも残さない。

import type { MapViewport } from "./mapView";

/** 平面図の maxBounds と同じ。極はメルカトルが壊れるので 85° で切る。 */
export const MAP_LAT_LIMIT = 85;

/**
 * 高精度 GPS は待たない。付近の地図には IP+Wi‑Fi 程度で足りて、
 * ボタンを押してから固まる時間の方が高い。
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

/** navigator.geolocation と同じ形。テストではこれを渡す。 */
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

/** GeolocationPositionError の code。DOM 型に依存せず数字で見る。 */
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

/** 経度を (-180, 180] に畳む。地図は世界 1 枚なので、はみ出しは反対側へ。 */
export function wrapLng(lng: number): number {
  const wrapped = ((((lng + 180) % 360) + 360) % 360) - 180;
  return wrapped === -180 ? 180 : wrapped;
}

/**
 * 精度が粗いほど引く。街路〜都市圏が見える距離。
 * 初期表示(ズーム 2)よりは必ず寄り、平面図の上限(16)までは使わない。
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

/** 座標が壊れているときは null。誤った場所へ飛ばさない。 */
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
