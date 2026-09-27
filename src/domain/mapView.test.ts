import { readFileSync } from "node:fs";
import {
  INITIAL_VIEW,
  GLOBE_MIN_ZOOM,
  GLOBE_ZOOM,
  GLOBE_ZOOM_EDGE,
  globeZoomFor,
  tileAt,
  tileUrl,
} from "./mapView";

describe("tileAt", () => {
  it("fits the world in 1 tile at zoom 0", () => {
    expect(tileAt(0, 0, 0)).toEqual({ x: 0, y: 0 });
    expect(tileAt(-70, 170, 0)).toEqual({ x: 0, y: 0 });
  });

  it("splits into four at the equator and the prime meridian at zoom 1", () => {
    expect(tileAt(45, -90, 1)).toEqual({ x: 0, y: 0 });
    expect(tileAt(45, 90, 1)).toEqual({ x: 1, y: 0 });
    expect(tileAt(-45, -90, 1)).toEqual({ x: 0, y: 1 });
    expect(tileAt(-45, 90, 1)).toEqual({ x: 1, y: 1 });
  });

  it("puts Tokyo in the upper-right section at zoom 2", () => {
    expect(tileAt(35.68, 139.76, 2)).toEqual({ x: 3, y: 1 });
  });

  it("stays in range at the eastern edge of longitude", () => {
    expect(tileAt(0, 180, 2)).toEqual({ x: 3, y: 2 });
  });

  it("stays in range near the poles", () => {
    expect(tileAt(89.9, 0, 2).y).toBe(0);
    expect(tileAt(-89.9, 0, 2).y).toBe(3);
  });
});

describe("tileUrl", () => {
  it("builds an OpenStreetMap URL", () => {
    expect(tileUrl(2, 1, 1)).toBe("https://tile.openstreetmap.org/2/1/1.png");
  });
});

describe("GLOBE_ZOOM", () => {
  it("is at a distance where continents and pins are readable and it still looks like a sphere", () => {
    expect(GLOBE_ZOOM).toBeGreaterThanOrEqual(INITIAL_VIEW.zoom);
    expect(GLOBE_ZOOM).toBeLessThan(5);
  });
});

describe("globeZoomFor", () => {
  it("stays as is for the same short edge as when it was chosen", () => {
    expect(globeZoomFor(1056, GLOBE_ZOOM_EDGE)).toBeCloseTo(GLOBE_ZOOM, 6);
  });

  it("lowers the zoom by 1 step when the short edge halves", () => {
    expect(globeZoomFor(GLOBE_ZOOM_EDGE / 2, 2000)).toBeCloseTo(GLOBE_ZOOM - 1, 6);
    expect(globeZoomFor(2000, GLOBE_ZOOM_EDGE * 2)).toBeCloseTo(GLOBE_ZOOM + 1, 6);
  });

  it("is decided by the short edge and is not pulled by the long one", () => {
    expect(globeZoomFor(390, 695)).toBeCloseTo(globeZoomFor(695, 390), 6);
  });

  it("pulls back until the sphere fits on a handheld screen", () => {
    expect(globeZoomFor(390, 695)).toBeLessThan(2);
  });

  it("does not pull back so far that the sphere becomes a dot", () => {
    expect(globeZoomFor(10, 10)).toBe(GLOBE_MIN_ZOOM);
  });

  it("stays at the default until it can be measured (width and height are 0 before display)", () => {
    expect(globeZoomFor(0, 0)).toBe(GLOBE_ZOOM);
    expect(globeZoomFor(Number.NaN, 400)).toBe(GLOBE_ZOOM);
  });
});

describe("consistency between the index.html preload and the initial view", () => {
  // The first visible tiles are the LCP element, so the HTML fetches them ahead.
  // If the initial view is moved and the preload is not fixed, it fetches irrelevant
  // tiles and the effect is lost (and nobody notices). Fail it here.
  const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
  const preloaded = [...html.matchAll(/tile\.openstreetmap\.org\/(\d+)\/(\d+)\/(\d+)\.png/g)].map(
    ([, z, x, y]) => ({ zoom: Number(z), x: Number(x), y: Number(y) }),
  );

  it("has 1 or more preloads", () => {
    expect(preloaded.length).toBeGreaterThan(0);
  });

  it("all are tiles at the initial zoom", () => {
    for (const tile of preloaded) expect(tile.zoom).toBe(INITIAL_VIEW.zoom);
  });

  it("preloads the tile that contains the initial center", () => {
    const center = tileAt(INITIAL_VIEW.center[0], INITIAL_VIEW.center[1], INITIAL_VIEW.zoom);
    expect(preloaded).toContainEqual({ ...center, zoom: INITIAL_VIEW.zoom });
  });

  it("does not preload tiles too far from the center (prevents wasted fetches)", () => {
    const center = tileAt(INITIAL_VIEW.center[0], INITIAL_VIEW.center[1], INITIAL_VIEW.zoom);
    for (const tile of preloaded) {
      expect(Math.abs(tile.x - center.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(tile.y - center.y)).toBeLessThanOrEqual(1);
    }
  });
});
