// The day/night boundary (terminator). Pure functions for drawing "the side that is night now" on
// the map.
//
// The solar altitude is given by sin(alt) = sinφ·sinδ + cosφ·cosδ·cosH (φ=latitude,
// δ=solar declination, H=local hour angle). Setting alt=0 gives tanφ = -cosH / tanδ,
// so the latitude of the terminator is uniquely determined for each longitude.

import { normalizeDeg } from "../astro/angles";
import { toJulianDay, toJulianEphemerisDay } from "../astro/julian";
import { gmst } from "../astro/sidereal";
import { sunAltitude, sunEphemeris } from "../astro/solar";
import type { GeoLocation } from "../astro/types";

const DEG = Math.PI / 180;

/** Wraps to -180..180. */
function wrapLongitude(deg: number): number {
  const wrapped = normalizeDeg(deg);
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

export interface SubsolarPoint {
  /** Solar declination. */
  lat: number;
  /** The longitude where the sun is directly overhead. */
  lng: number;
}

/** The point on the surface where the sun is at the zenith. */
export function subsolarPoint(date: Date): SubsolarPoint {
  const { ra, dec } = sunEphemeris(toJulianEphemerisDay(date));
  return { lat: dec, lng: wrapLongitude(ra - gmst(toJulianDay(date))) };
}

/**
 * The latitude where the terminator passes at a given longitude. sunGhaDeg is the Greenwich hour
 * angle of the sun (= -subsolar longitude); adding the longitude to it gives the local hour angle H
 * of that point.
 *
 * At an equinox (δ≈0) the terminator passes through both poles, so it approaches ±90. Only the
 * singular point where δ and cosH are 0 at the same time becomes 0/0, so δ is clamped with a tiny
 * amount to avoid NaN.
 */
export function terminatorLatitude(lngDeg: number, decDeg: number, sunGhaDeg: number): number {
  const hourAngle = (sunGhaDeg + lngDeg) * DEG;
  const tanDec = Math.tan(decDeg * DEG);
  const safeTanDec = Math.abs(tanDec) < 1e-12 ? 1e-12 : tanDec;
  return Math.atan(-Math.cos(hourAngle) / safeTanDec) / DEG;
}

/**
 * The day/night boundary itself (an array of [lat, lng]). Does not include the closure at the pole.
 * On the map, this line is drawn thin and the shadow of nightPolygon is laid over it.
 */
export function terminatorLine(date: Date, stepDeg = 1): [number, number][] {
  const { lat: dec, lng: subsolarLng } = subsolarPoint(date);
  const sunGha = -subsolarLng;

  const line: [number, number][] = [];
  for (let lng = -180; lng <= 180; lng += stepDeg) {
    line.push([terminatorLatitude(lng, dec, sunGha), lng]);
  }
  return line;
}

/**
 * A ring for Leaflet that covers the night region. The boundary line plus the closure at
 * the dark-side pole.
 */
export function nightPolygon(date: Date, stepDeg = 1): [number, number][] {
  const line = terminatorLine(date, stepDeg);
  // When the northern hemisphere is in summer (δ>0), the South Pole side is night.
  const darkPole = subsolarPoint(date).lat >= 0 ? -90 : 90;
  return [...line, [darkPole, 180], [darkPole, -180]];
}

/** A GeoJSON position. [longitude, latitude]. The axes are reversed from Leaflet's [lat, lng]. */
export type LngLat = [lng: number, lat: number];

function toLngLat([lat, lng]: [number, number]): LngLat {
  return [lng, lat];
}

function closeRing(ring: LngLat[]): LngLat[] {
  return [...ring, ring[0]!];
}

/**
 * Makes half of the terminator into a ring closed at the dark-side pole.
 * On the globe, filling 360° as 1 piece flips inside out, so it is split east and west.
 */
function nightCap(segment: readonly [number, number][], darkPole: number): LngLat[] {
  const first = segment[0]!;
  const last = segment[segment.length - 1]!;
  return closeRing([...segment.map(toLngLat), [last[1], darkPole], [first[1], darkPole]]);
}

/** The day/night boundary for the globe (GeoJSON). */
export function terminatorLineGeoJSON(
  date: Date,
  stepDeg = 1,
): { type: "LineString"; coordinates: LngLat[] } {
  return {
    type: "LineString",
    coordinates: terminatorLine(date, stepDeg).map(toLngLat),
  };
}

/**
 * The night side for the globe (GeoJSON). A MultiPolygon split into 2 pieces, east and
 * west, at the prime meridian.
 * Uses the same terminator and the same dark pole as nightPolygon for Leaflet.
 */
export function nightPolygonGeoJSON(
  date: Date,
  stepDeg = 1,
): { type: "MultiPolygon"; coordinates: LngLat[][][] } {
  const line = terminatorLine(date, stepDeg);
  const darkPole = subsolarPoint(date).lat >= 0 ? -90 : 90;
  const west = line.filter(([, lng]) => lng <= 0);
  const east = line.filter(([, lng]) => lng >= 0);
  return {
    type: "MultiPolygon",
    coordinates: [[nightCap(west, darkPole)], [nightCap(east, darkPole)]],
  };
}

/**
 * Whether that point is in night now (whether the true altitude of the sun is below the horizon).
 */
export function isNightAt(date: Date, loc: GeoLocation): boolean {
  return sunAltitude(date, loc) < 0;
}
