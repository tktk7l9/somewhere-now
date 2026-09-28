import {
  LOCATE_OPTIONS,
  MAP_LAT_LIMIT,
  classifyLocateError,
  clampLat,
  distanceKm,
  nearestCam,
  requestLocation,
  viewportForLocation,
  wrapLng,
  zoomForAccuracy,
  type Locator,
} from "./locate";
import type { Cam, PublicCamState } from "./cams";

const cam = (id: string, lat: number, lng: number): Cam => ({
  id,
  name: { ja: id, en: id },
  lat,
  lng,
  timeZone: "UTC",
  category: "city",
  country: "JP",
  source: { videoId: "abcdefghijk", channelId: "UC0000000000000000000000", titleKey: id },
});

const states = (
  entries: Record<string, PublicCamState["status"] | [PublicCamState["status"], number]>,
): ReadonlyMap<string, PublicCamState> =>
  new Map(
    Object.entries(entries).map(([id, entry]) => {
      const [status, viewers] = Array.isArray(entry) ? entry : ([entry, null] as const);
      return [id, { videoId: "abcdefghijk", status, viewers }];
    }),
  );

const TOKYO = { lat: 35.6812, lng: 139.7671 };

describe("classifyLocateError", () => {
  it("separates permission denial and timeout, and treats the rest as unavailable", () => {
    expect(classifyLocateError(1)).toBe("denied");
    expect(classifyLocateError(3)).toBe("timeout");
    expect(classifyLocateError(2)).toBe("unavailable");
    expect(classifyLocateError(0)).toBe("unavailable");
    expect(classifyLocateError(99)).toBe("unavailable");
  });
});

describe("clampLat", () => {
  it("clamps the poles, where Mercator breaks, into the map box", () => {
    expect(clampLat(0)).toBe(0);
    expect(clampLat(MAP_LAT_LIMIT)).toBe(MAP_LAT_LIMIT);
    expect(clampLat(-MAP_LAT_LIMIT)).toBe(-MAP_LAT_LIMIT);
    expect(clampLat(90)).toBe(MAP_LAT_LIMIT);
    expect(clampLat(-90)).toBe(-MAP_LAT_LIMIT);
  });
});

describe("wrapLng", () => {
  it("wraps to the longitude of a single world", () => {
    expect(wrapLng(0)).toBe(0);
    expect(wrapLng(139.76)).toBeCloseTo(139.76);
    expect(wrapLng(180)).toBe(180);
    expect(wrapLng(-180)).toBe(180);
    expect(wrapLng(190)).toBeCloseTo(-170);
    expect(wrapLng(-190)).toBeCloseTo(170);
    expect(wrapLng(360)).toBe(0);
    expect(wrapLng(-540)).toBe(180);
  });
});

describe("zoomForAccuracy", () => {
  it("uses a distance that shows the vicinity when the accuracy is known", () => {
    expect(zoomForAccuracy(0)).toBe(15);
    expect(zoomForAccuracy(50)).toBe(15);
    expect(zoomForAccuracy(51)).toBe(14);
    expect(zoomForAccuracy(150)).toBe(14);
    expect(zoomForAccuracy(151)).toBe(13);
    expect(zoomForAccuracy(500)).toBe(13);
    expect(zoomForAccuracy(501)).toBe(12);
    expect(zoomForAccuracy(2000)).toBe(12);
    expect(zoomForAccuracy(2001)).toBe(11);
    expect(zoomForAccuracy(5000)).toBe(11);
    expect(zoomForAccuracy(5001)).toBe(10);
    expect(zoomForAccuracy(20_000)).toBe(10);
    expect(zoomForAccuracy(20_001)).toBe(9);
  });

  it("falls back to a city-scale default when the accuracy is broken", () => {
    expect(zoomForAccuracy(Number.NaN)).toBe(12);
    expect(zoomForAccuracy(Number.POSITIVE_INFINITY)).toBe(12);
    expect(zoomForAccuracy(-1)).toBe(12);
  });
});

describe("viewportForLocation", () => {
  it("returns the vicinity of Tokyo at city scale", () => {
    expect(viewportForLocation(35.68, 139.76, 80)).toEqual({
      center: [35.68, 139.76],
      zoom: 14,
    });
  });

  it("clamps the poles and the date line into the map box", () => {
    expect(viewportForLocation(89, 190, 100)).toEqual({
      center: [MAP_LAT_LIMIT, wrapLng(190)],
      zoom: 14,
    });
  });

  it("does not fly to broken coordinates", () => {
    expect(viewportForLocation(Number.NaN, 0, 10)).toBeNull();
    expect(viewportForLocation(0, Number.NaN, 10)).toBeNull();
    expect(viewportForLocation(Number.POSITIVE_INFINITY, 0, 10)).toBeNull();
  });
});

function fakeLocator(
  impl: Locator["getCurrentPosition"],
): Locator {
  return { getCurrentPosition: impl };
}

describe("requestLocation", () => {
  it("is unsupported when there is no locator", async () => {
    expect(await requestLocation(undefined)).toEqual({ ok: false, reason: "unsupported" });
    expect(await requestLocation(null)).toEqual({ ok: false, reason: "unsupported" });
  });

  it("returns the obtained coordinates as is", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: 35.68, longitude: 139.76, accuracy: 40 } });
    });
    expect(await requestLocation(locator)).toEqual({
      ok: true,
      position: { lat: 35.68, lng: 139.76, accuracy: 40 },
    });
  });

  it("succeeds as long as there is a position, even with broken accuracy", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: 1, longitude: 2, accuracy: Number.NaN } });
    });
    expect(await requestLocation(locator)).toEqual({
      ok: true,
      position: { lat: 1, lng: 2, accuracy: Number.NaN },
    });
  });

  it("treats broken coordinates as unavailable", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: Number.NaN, longitude: 0, accuracy: 10 } });
    });
    expect(await requestLocation(locator)).toEqual({ ok: false, reason: "unavailable" });
  });

  it("does not fly when only the longitude is broken", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: 0, longitude: Number.NaN, accuracy: 10 } });
    });
    expect(await requestLocation(locator)).toEqual({ ok: false, reason: "unavailable" });
  });

  it("sorts denial, timeout and other errors", async () => {
    expect(
      await requestLocation(
        fakeLocator((_s, error) => {
          error?.({ code: 1 });
        }),
      ),
    ).toEqual({ ok: false, reason: "denied" });
    expect(
      await requestLocation(
        fakeLocator((_s, error) => {
          error?.({ code: 3 });
        }),
      ),
    ).toEqual({ ok: false, reason: "timeout" });
    expect(
      await requestLocation(
        fakeLocator((_s, error) => {
          error?.({ code: 2 });
        }),
      ),
    ).toEqual({ ok: false, reason: "unavailable" });
  });

  it("does not crash when the API throws", async () => {
    const locator = fakeLocator(() => {
      throw new Error("nope");
    });
    expect(await requestLocation(locator)).toEqual({ ok: false, reason: "unavailable" });
  });

  it("pins the timeout and freshness passed to the browser", async () => {
    let seen: unknown;
    const locator = fakeLocator((_s, _e, options) => {
      seen = options;
      _s({ coords: { latitude: 0, longitude: 0, accuracy: 1 } });
    });
    await requestLocation(locator);
    expect(seen).toEqual(LOCATE_OPTIONS);
    expect(LOCATE_OPTIONS.enableHighAccuracy).toBe(false);
    expect(LOCATE_OPTIONS.timeout).toBe(10_000);
    expect(LOCATE_OPTIONS.maximumAge).toBe(60_000);
  });
});

describe("distanceKm", () => {
  it("is 0 for the same point", () => {
    expect(distanceKm(TOKYO, TOKYO)).toBe(0);
  });

  it("matches the real distance (Tokyo Station to Osaka Station is about 400km)", () => {
    expect(distanceKm(TOKYO, { lat: 34.7025, lng: 135.4959 })).toBeCloseTo(403, 0);
  });

  it("is roughly 111km for 1 degree at the equator", () => {
    expect(distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 1 })).toBeCloseTo(111.2, 1);
  });

  it("does not take the long way around across the date line", () => {
    // 179° E and 179° W are 2° apart (not 358°).
    const across = distanceKm({ lat: 0, lng: 179 }, { lat: 0, lng: -179 });
    expect(across).toBeCloseTo(222.4, 1);
  });

  it("is half the globe for the antipode", () => {
    expect(distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 180 })).toBeCloseTo(20015, 0);
  });

  it("is the same length in either direction", () => {
    const osaka = { lat: 34.7025, lng: 135.4959 };
    expect(distanceKm(TOKYO, osaka)).toBeCloseTo(distanceKm(osaka, TOKYO), 9);
  });
});

describe("nearestCam", () => {
  const near = cam("near", 35.69, 139.7);
  const far = cam("far", 34.7, 135.5);

  it("returns the nearest one among those that are live", () => {
    const found = nearestCam([far, near], states({ near: "live", far: "live" }), TOKYO);
    expect(found?.id).toBe("near");
  });

  it("picks the nearer one regardless of order", () => {
    const found = nearestCam([near, far], states({ near: "live", far: "live" }), TOKYO);
    expect(found?.id).toBe("near");
  });

  it("picks a live one slightly farther away when the near one is stopped", () => {
    const found = nearestCam([near, far], states({ near: "offline", far: "live" }), TOKYO);
    expect(found?.id).toBe("far");
  });

  it("does not treat a camera whose state has not arrived as live", () => {
    const found = nearestCam([near, far], states({ far: "live" }), TOKYO);
    expect(found?.id).toBe("far");
  });

  it("falls back to the nearer one regardless of state when none is live", () => {
    const found = nearestCam([far, near], states({ near: "offline", far: "blocked" }), TOKYO);
    expect(found?.id).toBe("near");
  });

  it("is null when there are no candidates", () => {
    expect(nearestCam([], states({}), TOKYO)).toBeNull();
  });

  it("does not pick when the current location is broken", () => {
    expect(nearestCam([near], states({ near: "live" }), { lat: Number.NaN, lng: 139 })).toBeNull();
    expect(nearestCam([near], states({ near: "live" }), { lat: 35, lng: Number.NaN })).toBeNull();
  });

  it("skips cameras with broken coordinates", () => {
    const broken = cam("broken", Number.NaN, Number.NaN);
    const found = nearestCam([broken, far], states({ broken: "live", far: "live" }), TOKYO);
    expect(found?.id).toBe("far");
  });

  it("picks the one with more viewers now from a bundle at the same coordinates", () => {
    // 60% of the master data shares coordinates. Nearness makes no difference there,
    // so it must not be decided by order.
    const quiet = cam("quiet", 35.6895, 139.6917);
    const busy = cam("busy", 35.6895, 139.6917);
    const found = nearestCam(
      [quiet, busy],
      states({ quiet: ["live", 12], busy: ["live", 9000] }),
      TOKYO,
    );
    expect(found?.id).toBe("busy");
  });

  it("takes the stream with a known viewer count over one with an unknown count", () => {
    const unknown = cam("unknown", 35.6895, 139.6917);
    const counted = cam("counted", 35.6895, 139.6917);
    const found = nearestCam(
      [unknown, counted],
      states({ unknown: "live", counted: ["live", 0] }),
      TOKYO,
    );
    expect(found?.id).toBe("counted");
  });

  it("puts nearness ahead of viewer count", () => {
    const nearQuiet = cam("near-quiet", 35.69, 139.7);
    const farBusy = cam("far-busy", 34.7, 135.5);
    const found = nearestCam(
      [farBusy, nearQuiet],
      states({ "near-quiet": ["live", 1], "far-busy": ["live", 99999] }),
      TOKYO,
    );
    expect(found?.id).toBe("near-quiet");
  });

  it("is null when no camera can be measured", () => {
    const broken = cam("broken", Number.NaN, 0);
    expect(nearestCam([broken], states({ broken: "live" }), TOKYO)).toBeNull();
  });

  it("picks the nearer one on the other side of the date line too", () => {
    const east = cam("east", 0, 179);
    const west = cam("west", 0, -179);
    const found = nearestCam([east, west], states({ east: "live", west: "live" }), {
      lat: 0,
      lng: -179.5,
    });
    expect(found?.id).toBe("west");
  });
});
