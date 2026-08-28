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

describe("distanceKm", () => {
  it("同じ点は 0", () => {
    expect(distanceKm(TOKYO, TOKYO)).toBe(0);
  });

  it("実距離に合う(東京駅→大阪駅は約 400km)", () => {
    expect(distanceKm(TOKYO, { lat: 34.7025, lng: 135.4959 })).toBeCloseTo(403, 0);
  });

  it("赤道 1 度はおよそ 111km", () => {
    expect(distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 1 })).toBeCloseTo(111.2, 1);
  });

  it("日付変更線をまたいでも遠回りしない", () => {
    // 東経 179° と西経 179° は 2° 離れている(358° ではない)。
    const across = distanceKm({ lat: 0, lng: 179 }, { lat: 0, lng: -179 });
    expect(across).toBeCloseTo(222.4, 1);
  });

  it("対蹠点は地球半周", () => {
    expect(distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 180 })).toBeCloseTo(20015, 0);
  });

  it("向きを変えても同じ長さ", () => {
    const osaka = { lat: 34.7025, lng: 135.4959 };
    expect(distanceKm(TOKYO, osaka)).toBeCloseTo(distanceKm(osaka, TOKYO), 9);
  });
});

describe("nearestCam", () => {
  const near = cam("near", 35.69, 139.7);
  const far = cam("far", 34.7, 135.5);

  it("配信中のうち、いちばん近いものを返す", () => {
    const found = nearestCam([far, near], states({ near: "live", far: "live" }), TOKYO);
    expect(found?.id).toBe("near");
  });

  it("並び順に関わらず近い方を選ぶ", () => {
    const found = nearestCam([near, far], states({ near: "live", far: "live" }), TOKYO);
    expect(found?.id).toBe("near");
  });

  it("近くが止まっていれば、少し遠くても配信中を選ぶ", () => {
    const found = nearestCam([near, far], states({ near: "offline", far: "live" }), TOKYO);
    expect(found?.id).toBe("far");
  });

  it("状態が届いていないカメラは配信中と見なさない", () => {
    const found = nearestCam([near, far], states({ far: "live" }), TOKYO);
    expect(found?.id).toBe("far");
  });

  it("1 台も配信していないときは、状態を問わず近い方へ後退する", () => {
    const found = nearestCam([far, near], states({ near: "offline", far: "blocked" }), TOKYO);
    expect(found?.id).toBe("near");
  });

  it("候補が無ければ null", () => {
    expect(nearestCam([], states({}), TOKYO)).toBeNull();
  });

  it("現在地が壊れていたら選ばない", () => {
    expect(nearestCam([near], states({ near: "live" }), { lat: Number.NaN, lng: 139 })).toBeNull();
    expect(nearestCam([near], states({ near: "live" }), { lat: 35, lng: Number.NaN })).toBeNull();
  });

  it("座標が壊れているカメラは飛ばす", () => {
    const broken = cam("broken", Number.NaN, Number.NaN);
    const found = nearestCam([broken, far], states({ broken: "live", far: "live" }), TOKYO);
    expect(found?.id).toBe("far");
  });

  it("同じ座標に載っている束からは、いま視聴の多い方を選ぶ", () => {
    // マスタの 6 割は座標を共有している。近さで差が付かないので並び順で
    // 決めてはいけない。
    const quiet = cam("quiet", 35.6895, 139.6917);
    const busy = cam("busy", 35.6895, 139.6917);
    const found = nearestCam(
      [quiet, busy],
      states({ quiet: ["live", 12], busy: ["live", 9000] }),
      TOKYO,
    );
    expect(found?.id).toBe("busy");
  });

  it("視聴者数が分からない配信より、分かっている方を採る", () => {
    const unknown = cam("unknown", 35.6895, 139.6917);
    const counted = cam("counted", 35.6895, 139.6917);
    const found = nearestCam(
      [unknown, counted],
      states({ unknown: "live", counted: ["live", 0] }),
      TOKYO,
    );
    expect(found?.id).toBe("counted");
  });

  it("近さは視聴者数より優先する", () => {
    const nearQuiet = cam("near-quiet", 35.69, 139.7);
    const farBusy = cam("far-busy", 34.7, 135.5);
    const found = nearestCam(
      [farBusy, nearQuiet],
      states({ "near-quiet": ["live", 1], "far-busy": ["live", 99999] }),
      TOKYO,
    );
    expect(found?.id).toBe("near-quiet");
  });

  it("測れるカメラが 1 台も無ければ null", () => {
    const broken = cam("broken", Number.NaN, 0);
    expect(nearestCam([broken], states({ broken: "live" }), TOKYO)).toBeNull();
  });

  it("日付変更線の向こう側でも近い方を選ぶ", () => {
    const east = cam("east", 0, 179);
    const west = cam("west", 0, -179);
    const found = nearestCam([east, west], states({ east: "live", west: "live" }), {
      lat: 0,
      lng: -179.5,
    });
    expect(found?.id).toBe("west");
  });
});
