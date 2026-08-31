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
 * 地球儀の初期ズーム。球だと分かる距離を保ちつつ、大陸とカメラのピンが
 * 読めるところまで寄る。中心は INITIAL_VIEW と同じ(大西洋)で、UI 側で
 * [lng, lat] に組み替える。
 */
export const GLOBE_ZOOM = 2.8;

/** タイル 1 枚の辺(px)。世界 1 枚は 256 * 2^z px になる。 */
export const TILE_SIZE = 256;

/**
 * その大きさの器を世界 1 枚が覆いきる、最小のズーム。
 *
 * 地図は世界 1 枚に留めてある(夜のポリゴンが 1 枚ぶんしか無いので、繰り返すと
 * 影の無い世界が横に並ぶ)。1 枚は 256 * 2^z px しか無いから、器の方が大きいと
 * 必ず端に地の色が出る — 1,056px のステージに z2(1,024px)を置けば左右に
 * 16px ずつ余り、1,536px なら 256px も余る。埋める術は無いので、覆えるところ
 * まで寄せる。
 *
 * 器の寸法が取れないとき(まだ display:none の面)は floor をそのまま返す。
 * 1px 足しているのは、ぴったりに合わせると丸めで髪の毛ほどの隙間が残るため。
 */
export function coveringZoom(
  width: number,
  height: number,
  floor: number = INITIAL_VIEW.zoom,
): number {
  const span = Math.max(width, height);
  if (!Number.isFinite(span) || span <= 0) return floor;
  return Math.max(floor, Math.log2((span + 1) / TILE_SIZE));
}

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
