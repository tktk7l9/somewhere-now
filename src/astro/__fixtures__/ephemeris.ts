// Reference ephemeris values for fixture tests. Fetched 2026-07-07.
//
// Only the solar position anchor is kept: this app ports the solar position (Meeus) from
// skydial, not its rise/set or moon engines, so their USNO / sunrise-sunset.org fixtures
// were dropped.

import type { GeoLocation } from "../types";

export const TOKYO: GeoLocation = { lat: 35.6762, lng: 139.6503 };

/**
 * JPL Horizons airless apparent az/el of the sun's center for Tokyo
 * (139.6503E, 35.6762N, 0 m), fetched 2026-07-07. Anchors raw position
 * accuracy at the ~0.01° level.
 */
export const HORIZONS_SUN_TOKYO = [
  { utc: "2026-06-20T19:24:00Z", azimuth: 59.724851, altitude: -1.153381 },
  { utc: "2026-06-20T19:25:00Z", azimuth: 59.872523, altitude: -0.977891 },
  { utc: "2026-06-20T19:26:00Z", azimuth: 60.019876, altitude: -0.802138 },
] as const;
