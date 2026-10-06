// The initial view of the map. index.html depends on these values (it preloads the first
// visible tiles, which become the LCP element), so this is the single source.
// mapView.test.ts reads index.html and fails on a mismatch.

export interface MapViewport {
  center: [lat: number, lng: number];
  zoom: number;
}

export const INITIAL_VIEW: MapViewport = {
  // Slightly north in the Atlantic. North America, Europe and Africa fit at once,
  // and the day/night boundary always crosses somewhere on the screen.
  center: [24, 8],
  zoom: 2,
};

/**
 * Initial zoom of the globe. Keeps a distance where it reads as a sphere, while moving in
 * until continents and camera pins are readable. The center is the same as INITIAL_VIEW
 * (the Atlantic); the UI side rearranges it to [lng, lat].
 *
 * This value was chosen for the short edge below. Zoom does not look at the screen size, so
 * passing it as is to a narrow screen makes the sphere overflow the screen and it does not
 * look like a globe (measured: on a 390px wide screen only Africa spreads out flat).
 */
export const GLOBE_ZOOM = 2.8;

/** Side of one tile (px). One copy of the world is 256 * 2^z px. */
export const TILE_SIZE = 256;

/**
 * The lowest zoom at which one copy of the world covers a box of that size.
 *
 * The map is kept to one copy of the world (the night polygon exists only once; repeating the
 * world would line up shadowless copies side by side). One copy is only 256 * 2^z px, so a box
 * larger than that always shows the background colour at the edges: z2 (1,024px) on a 1,056px
 * stage leaves 16px on each side, and 256px on a 1,536px stage. There is no way to fill it, so
 * zoom in until the world covers the box.
 *
 * Returns the floor as is while the box cannot be measured (a face still at display:none).
 * The extra 1px avoids a hairline gap that rounding leaves when the fit is exact.
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

/**
 * The short edge of the screen when GLOBE_ZOOM was chosen (the height the map takes in a 1440x900
 * browser).
 */
export const GLOBE_ZOOM_EDGE = 809;

/**
 * Pulling back further than this turns the sphere into a dot. Same value as minZoom on the globe
 * side.
 */
export const GLOBE_MIN_ZOOM = 0.6;

/**
 * Initial zoom of the globe on that screen. When the short edge halves, the zoom goes down
 * 1 step = the size of the sphere relative to the short edge is the same on every screen.
 */
export function globeZoomFor(width: number, height: number): number {
  const edge = Math.min(width, height);
  if (!(edge > 0)) return GLOBE_ZOOM;
  return Math.max(GLOBE_MIN_ZOOM, GLOBE_ZOOM + Math.log2(edge / GLOBE_ZOOM_EDGE));
}

/** Coordinates of the tile that contains that latitude/longitude (Web Mercator, XYZ scheme). */
export function tileAt(lat: number, lng: number, zoom: number): { x: number; y: number } {
  const n = 2 ** zoom;
  const latRad = (lat * Math.PI) / 180;
  const x = Math.floor(((lng + 180) / 360) * n);
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  );
  // Clamp so it does not reach n at the edge (exactly longitude 180, etc.).
  return { x: Math.min(n - 1, Math.max(0, x)), y: Math.min(n - 1, Math.max(0, y)) };
}

/** OpenStreetMap tile URL. */
export function tileUrl(zoom: number, x: number, y: number): string {
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}
