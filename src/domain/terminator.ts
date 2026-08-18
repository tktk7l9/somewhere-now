// 昼夜の境界(ターミネータ)。地図に「いま夜の側」を描くための純関数群。
//
// 太陽高度は sin(alt) = sinφ·sinδ + cosφ·cosδ·cosH で表される(φ=緯度,
// δ=太陽赤緯, H=地方時角)。alt=0 と置くと tanφ = -cosH / tanδ となり、
// 経度ごとに終端線の緯度が一意に決まる。

import { normalizeDeg } from "../astro/angles";
import { toJulianDay, toJulianEphemerisDay } from "../astro/julian";
import { gmst } from "../astro/sidereal";
import { sunAltitude, sunEphemeris } from "../astro/solar";
import type { GeoLocation } from "../astro/types";

const DEG = Math.PI / 180;

/** -180..180 に折り返す。 */
function wrapLongitude(deg: number): number {
  const wrapped = normalizeDeg(deg);
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

export interface SubsolarPoint {
  /** 太陽赤緯。 */
  lat: number;
  /** 太陽が真上に来る経度。 */
  lng: number;
}

/** 太陽が天頂に来る地表の点。 */
export function subsolarPoint(date: Date): SubsolarPoint {
  const { ra, dec } = sunEphemeris(toJulianEphemerisDay(date));
  return { lat: dec, lng: wrapLongitude(ra - gmst(toJulianDay(date))) };
}

/**
 * ある経度で終端線が通る緯度。sunGhaDeg は太陽のグリニッジ時角(= -太陽直下経度)で、
 * これに経度を足したものがその地点の地方時角 H になる。
 *
 * 分点(δ≈0)では終端線が両極を通るため ±90 に漸近する。δ と cosH が同時に 0 に
 * なる特異点だけは 0/0 になるので、δ を微小量でクランプして NaN を避ける。
 */
export function terminatorLatitude(lngDeg: number, decDeg: number, sunGhaDeg: number): number {
  const hourAngle = (sunGhaDeg + lngDeg) * DEG;
  const tanDec = Math.tan(decDeg * DEG);
  const safeTanDec = Math.abs(tanDec) < 1e-12 ? 1e-12 : tanDec;
  return Math.atan(-Math.cos(hourAngle) / safeTanDec) / DEG;
}

/**
 * 昼と夜の境界そのもの([lat, lng] の配列)。極での閉じは含まない。
 * 地図には、この線を細く引いた上に nightPolygon の影を重ねる。
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
 * 夜の領域を覆う Leaflet 用のリング。境界線に、暗い側の極での閉じを足したもの。
 */
export function nightPolygon(date: Date, stepDeg = 1): [number, number][] {
  const line = terminatorLine(date, stepDeg);
  // 北半球が夏(δ>0)なら南極側が夜。
  const darkPole = subsolarPoint(date).lat >= 0 ? -90 : 90;
  return [...line, [darkPole, 180], [darkPole, -180]];
}

/** その地点がいま夜か(太陽の真の高度が地平線より下か)。 */
export function isNightAt(date: Date, loc: GeoLocation): boolean {
  return sunAltitude(date, loc) < 0;
}
