import {
  LOCATE_OPTIONS,
  MAP_LAT_LIMIT,
  classifyLocateError,
  clampLat,
  requestLocation,
  viewportForLocation,
  wrapLng,
  zoomForAccuracy,
  type Locator,
} from "./locate";

describe("classifyLocateError", () => {
  it("権限拒否と時間切れを分け、それ以外は取れなかったことにする", () => {
    expect(classifyLocateError(1)).toBe("denied");
    expect(classifyLocateError(3)).toBe("timeout");
    expect(classifyLocateError(2)).toBe("unavailable");
    expect(classifyLocateError(0)).toBe("unavailable");
    expect(classifyLocateError(99)).toBe("unavailable");
  });
});

describe("clampLat", () => {
  it("メルカトルが壊れる極を地図の箱に収める", () => {
    expect(clampLat(0)).toBe(0);
    expect(clampLat(MAP_LAT_LIMIT)).toBe(MAP_LAT_LIMIT);
    expect(clampLat(-MAP_LAT_LIMIT)).toBe(-MAP_LAT_LIMIT);
    expect(clampLat(90)).toBe(MAP_LAT_LIMIT);
    expect(clampLat(-90)).toBe(-MAP_LAT_LIMIT);
  });
});

describe("wrapLng", () => {
  it("世界 1 枚の経度へ畳む", () => {
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
  it("精度が分かるときは付近が見える距離にする", () => {
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

  it("精度が壊れているときは街くらいの既定に戻す", () => {
    expect(zoomForAccuracy(Number.NaN)).toBe(12);
    expect(zoomForAccuracy(Number.POSITIVE_INFINITY)).toBe(12);
    expect(zoomForAccuracy(-1)).toBe(12);
  });
});

describe("viewportForLocation", () => {
  it("東京の付近は街の縮尺で返す", () => {
    expect(viewportForLocation(35.68, 139.76, 80)).toEqual({
      center: [35.68, 139.76],
      zoom: 14,
    });
  });

  it("極と日付変更線を地図の箱に収める", () => {
    expect(viewportForLocation(89, 190, 100)).toEqual({
      center: [MAP_LAT_LIMIT, wrapLng(190)],
      zoom: 14,
    });
  });

  it("壊れた座標は飛ばさない", () => {
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
  it("locator が無ければ非対応", async () => {
    expect(await requestLocation(undefined)).toEqual({ ok: false, reason: "unsupported" });
    expect(await requestLocation(null)).toEqual({ ok: false, reason: "unsupported" });
  });

  it("取れた座標をそのまま返す", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: 35.68, longitude: 139.76, accuracy: 40 } });
    });
    expect(await requestLocation(locator)).toEqual({
      ok: true,
      position: { lat: 35.68, lng: 139.76, accuracy: 40 },
    });
  });

  it("精度が壊れていても位置さえあれば成功にする", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: 1, longitude: 2, accuracy: Number.NaN } });
    });
    expect(await requestLocation(locator)).toEqual({
      ok: true,
      position: { lat: 1, lng: 2, accuracy: Number.NaN },
    });
  });

  it("座標が壊れていれば取れなかったことにする", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: Number.NaN, longitude: 0, accuracy: 10 } });
    });
    expect(await requestLocation(locator)).toEqual({ ok: false, reason: "unavailable" });
  });

  it("経度だけ壊れても飛ばさない", async () => {
    const locator = fakeLocator((success) => {
      success({ coords: { latitude: 0, longitude: Number.NaN, accuracy: 10 } });
    });
    expect(await requestLocation(locator)).toEqual({ ok: false, reason: "unavailable" });
  });

  it("拒否・時間切れ・その他を振り分ける", async () => {
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

  it("API が例外を投げても落ちない", async () => {
    const locator = fakeLocator(() => {
      throw new Error("nope");
    });
    expect(await requestLocation(locator)).toEqual({ ok: false, reason: "unavailable" });
  });

  it("ブラウザへ渡す待ち時間と鮮度を固定する", async () => {
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
