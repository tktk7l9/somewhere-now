import {
  isNightAt,
  nightPolygon,
  nightPolygonGeoJSON,
  subsolarPoint,
  terminatorLatitude,
  terminatorLine,
  terminatorLineGeoJSON,
} from "./terminator";

// Solstices and equinox of 2026 (approximate times. Only the sign and magnitude of the
// declination matter here, so being off by a few minutes is not a problem).
const JUNE_SOLSTICE = new Date("2026-06-21T09:00:00Z");
const DEC_SOLSTICE = new Date("2026-12-21T15:00:00Z");
const MARCH_EQUINOX = new Date("2026-03-20T14:46:00Z");

describe("subsolarPoint", () => {
  it("puts the sun near the Tropic of Cancer (+23.4°) at the June solstice", () => {
    expect(subsolarPoint(JUNE_SOLSTICE).lat).toBeCloseTo(23.44, 1);
  });

  it("puts the sun near the Tropic of Capricorn (-23.4°) at the December solstice", () => {
    expect(subsolarPoint(DEC_SOLSTICE).lat).toBeCloseTo(-23.44, 1);
  });

  it("puts the sun over the equator at the March equinox", () => {
    expect(Math.abs(subsolarPoint(MARCH_EQUINOX).lat)).toBeLessThan(0.1);
  });

  it("puts the subsolar point near the Greenwich meridian at 12:00 UTC", () => {
    // It is off by up to about ±4° because of the equation of time.
    const { lng } = subsolarPoint(new Date("2026-06-21T12:00:00Z"));
    expect(Math.abs(lng)).toBeLessThan(5);
  });

  it("always normalizes the longitude to -180..180", () => {
    for (let h = 0; h < 24; h += 1) {
      const { lng } = subsolarPoint(new Date(Date.UTC(2026, 5, 21, h)));
      expect(lng).toBeGreaterThanOrEqual(-180);
      expect(lng).toBeLessThanOrEqual(180);
    }
  });

  it("moves the subsolar point about 15° west in 1 hour", () => {
    const a = subsolarPoint(new Date("2026-06-21T00:00:00Z")).lng;
    const b = subsolarPoint(new Date("2026-06-21T01:00:00Z")).lng;
    let delta = a - b;
    if (delta < -180) delta += 360;
    expect(delta).toBeCloseTo(15, 0);
  });
});

describe("terminatorLatitude", () => {
  it("passes through the polar circle on the opposite pole side at the subsolar meridian", () => {
    // At declination +23.44°, the terminator passes through 66.56° S at the subsolar longitude.
    expect(terminatorLatitude(0, 23.44, 0)).toBeCloseTo(-66.56, 1);
  });

  it("passes through the polar circle on the same pole side at the meridian behind the subsolar point", () => {
    expect(terminatorLatitude(180, 23.44, 0)).toBeCloseTo(66.56, 1);
  });

  it("passes through the equator at the meridian 90° from the subsolar point", () => {
    expect(terminatorLatitude(90, 23.44, 0)).toBeCloseTo(0, 6);
  });

  it("passes the terminator through the poles at declination 0 (equinox)", () => {
    expect(Math.abs(terminatorLatitude(0, 0, 0))).toBeCloseTo(90, 3);
  });

  it("does not return NaN at the singular point of declination 0 and 90° from the subsolar point", () => {
    expect(Number.isNaN(terminatorLatitude(90, 0, 0))).toBe(false);
  });

  it("flips the sign in the southern hemisphere summer (negative declination)", () => {
    expect(terminatorLatitude(0, -23.44, 0)).toBeCloseTo(66.56, 1);
  });
});

describe("nightPolygon", () => {
  it("adds 2 points that close at the dark-side pole to the points stepped along longitude", () => {
    const ring = nightPolygon(JUNE_SOLSTICE, 10);
    expect(ring.length).toBe(360 / 10 + 1 + 2);
  });

  it("keeps every point within the valid range of latitude and longitude", () => {
    for (const [lat, lng] of nightPolygon(JUNE_SOLSTICE, 30)) {
      expect(Number.isFinite(lat)).toBe(true);
      expect(Math.abs(lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(lng)).toBeLessThanOrEqual(180);
    }
  });

  it("closes on the South Pole side in the northern hemisphere summer", () => {
    const ring = nightPolygon(JUNE_SOLSTICE, 30);
    expect(ring[ring.length - 1]![0]).toBe(-90);
  });

  it("closes on the North Pole side in the northern hemisphere winter", () => {
    const ring = nightPolygon(DEC_SOLSTICE, 30);
    expect(ring[ring.length - 1]![0]).toBe(90);
  });

  it("returns points even when the step is omitted", () => {
    expect(nightPolygon(JUNE_SOLSTICE).length).toBeGreaterThan(300);
  });
});

describe("terminatorLine", () => {
  it("returns points stepped along longitude from edge to edge (without the closure at the pole)", () => {
    const line = terminatorLine(JUNE_SOLSTICE, 10);
    expect(line.length).toBe(360 / 10 + 1);
    expect(line[0]![1]).toBe(-180);
    expect(line[line.length - 1]![1]).toBe(180);
  });

  it("makes the night polygon this line plus the closure at the pole", () => {
    const line = terminatorLine(JUNE_SOLSTICE, 30);
    const ring = nightPolygon(JUNE_SOLSTICE, 30);
    expect(ring.slice(0, line.length)).toEqual(line);
    expect(ring.length).toBe(line.length + 2);
  });

  it("returns points even when the step is omitted", () => {
    expect(terminatorLine(JUNE_SOLSTICE).length).toBe(361);
  });
});

describe("terminatorLineGeoJSON / nightPolygonGeoJSON", () => {
  it("rearranges the axes to [lng, lat]", () => {
    const line = terminatorLineGeoJSON(JUNE_SOLSTICE, 30);
    expect(line.type).toBe("LineString");
    expect(line.coordinates[0]![0]).toBe(-180);
    expect(line.coordinates[line.coordinates.length - 1]![0]).toBe(180);
    expect(line.coordinates).toHaveLength(terminatorLine(JUNE_SOLSTICE, 30).length);
  });

  it("splits the night polygon into 2 pieces, east and west, each closed and containing the dark-side pole", () => {
    const poly = nightPolygonGeoJSON(JUNE_SOLSTICE, 30);
    expect(poly.type).toBe("MultiPolygon");
    expect(poly.coordinates).toHaveLength(2);
    for (const [ring] of poly.coordinates) {
      expect(ring![0]).toEqual(ring![ring!.length - 1]);
      expect(ring!.some(([, lat]) => lat === -90)).toBe(true);
    }
  });

  it("closes on the North Pole side at the December solstice", () => {
    const poly = nightPolygonGeoJSON(DEC_SOLSTICE, 30);
    for (const [ring] of poly.coordinates) {
      expect(ring!.some(([, lat]) => lat === 90)).toBe(true);
    }
  });

  it("returns points even when the step is omitted", () => {
    expect(terminatorLineGeoJSON(JUNE_SOLSTICE).coordinates.length).toBe(361);
    expect(nightPolygonGeoJSON(JUNE_SOLSTICE).coordinates[0]![0]!.length).toBeGreaterThan(100);
  });
});

describe("isNightAt", () => {
  const TOKYO = { lat: 35.68, lng: 139.76 };

  it("is day at noon in Tokyo (JST)", () => {
    expect(isNightAt(new Date("2026-06-21T03:00:00Z"), TOKYO)).toBe(false);
  });

  it("is night at midnight in Tokyo (JST)", () => {
    expect(isNightAt(new Date("2026-06-21T15:00:00Z"), TOKYO)).toBe(true);
  });

  it("is midnight sun at the North Pole at the June solstice", () => {
    expect(isNightAt(new Date("2026-06-21T15:00:00Z"), { lat: 85, lng: 0 })).toBe(false);
  });
});

describe("day and night do not disagree with the local clock", () => {
  // Pins 2026-08-18T15:49Z and checks it against local times around the world.
  // A regression test that guarantees the verdict from the solar altitude is not flipped east-west.
  const AT = new Date("2026-08-18T15:49:00Z");

  const CASES = [
    { name: "東京(00:49)", lat: 35.68, lng: 139.76, night: true },
    { name: "シドニー(01:49)", lat: -33.87, lng: 151.21, night: true },
    { name: "ニューヨーク(11:49)", lat: 40.76, lng: -73.99, night: false },
    { name: "メキシコシティ(09:49)", lat: 19.43, lng: -99.13, night: false },
    { name: "ヴェネツィア(17:49)", lat: 45.43, lng: 12.33, night: false },
    { name: "ロサンゼルス(08:49)", lat: 34.05, lng: -118.24, night: false },
  ];

  for (const { name, lat, lng, night } of CASES) {
    it(name, () => {
      expect(isNightAt(AT, { lat, lng })).toBe(night);
    });
  }
});
