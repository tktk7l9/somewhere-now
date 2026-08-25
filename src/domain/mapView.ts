// 地図の初期表示。index.html がこの値に依存している(最初に見えるタイルを
// preload していて、それが LCP 要素になる)ので、ここを唯一の出どころにする。
// 食い違いは mapView.test.ts が index.html を読んで落とす。

export interface MapViewport {
  center: [lat: number, lng: number];
  zoom: number;
}

export const INITIAL_VIEW: MapViewport = {
  // 大西洋の少し北。北米・ヨーロッパ・アフリカが一度に入り、
  // 昼夜の境界が画面のどこかを必ず横切る位置。
  center: [24, 8],
  zoom: 2,
};

/**
 * 地球儀の初期ズーム。平面図より引いて、球として見える余白を残す。
 * 中心は INITIAL_VIEW と同じ(大西洋)で、UI 側で [lng, lat] に組み替える。
 */
export const GLOBE_ZOOM = 1.45;

/** その緯度経度を含むタイルの座標(Web メルカトル・XYZ 方式)。 */
export function tileAt(lat: number, lng: number, zoom: number): { x: number; y: number } {
  const n = 2 ** zoom;
  const latRad = (lat * Math.PI) / 180;
  const x = Math.floor(((lng + 180) / 360) * n);
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  );
  // 端(経度 180 ちょうど等)で n に届かないよう丸める。
  return { x: Math.min(n - 1, Math.max(0, x)), y: Math.min(n - 1, Math.max(0, y)) };
}

/** OpenStreetMap のタイル URL。 */
export function tileUrl(zoom: number, x: number, y: number): string {
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}
