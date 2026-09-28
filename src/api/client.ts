// Data fetching on the browser side.
//   /api/cams        … live liveness state the Worker returns from KV (the API key does
//                      not pass through)
//   Open-Meteo       … fetches directly only the weather of the selected camera
//   Wikipedia        … overview of the selected camera's place (no key needed, CORS *)
//   MyMemory         … translates into Japanese an overview that has no Japanese version
//                      (no key needed, CORS *)

import type { Cam, PublicCamState } from "../domain/cams";
import {
  looksJapanese,
  myMemoryUrl,
  parsePlaceOverview,
  parseTranslation,
  sanitizeSearchName,
  wikipediaExtractUrl,
  wikipediaSearchUrl,
  type PlaceOverview,
} from "../domain/placeOverview";
import { openMeteoUrl, parseWeather, type Lang, type Weather } from "../domain/weather";

export interface StatePayload {
  updatedAt: string;
  cams: Record<string, PublicCamState>;
}

/**
 * The camera master. Served as static JSON, not in the bundle
 * (camsAsset in vite.config.ts). The map appears without waiting for it.
 */
export async function fetchCams(): Promise<readonly Cam[]> {
  try {
    const res = await fetch("/cams.json");
    if (!res.ok) return [];
    return (await res.json()) as Cam[];
  } catch {
    return [];
  }
}

/** The map should keep working even on failure, so return null instead of throwing. */
export async function fetchCamStates(): Promise<StatePayload | null> {
  try {
    const res = await fetch("/api/cams");
    if (!res.ok) return null;
    return (await res.json()) as StatePayload;
  } catch {
    return null;
  }
}

const weatherCache = new Map<string, Weather | null>();

export async function fetchWeather(lat: number, lng: number): Promise<Weather | null> {
  const url = openMeteoUrl(lat, lng);
  const cached = weatherCache.get(url);
  if (cached !== undefined) return cached;

  let weather: Weather | null = null;
  try {
    const res = await fetch(url);
    if (res.ok) weather = parseWeather(await res.json());
  } catch {
    weather = null;
  }
  weatherCache.set(url, weather);
  return weather;
}

const overviewCache = new Map<string, PlaceOverview | null>();

async function lookupOverview(url: string): Promise<PlaceOverview | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return parsePlaceOverview(await res.json());
  } catch {
    return null;
  }
}

async function translateToJapanese(text: string): Promise<string | null> {
  try {
    const res = await fetch(myMemoryUrl(text));
    if (!res.ok) return null;
    return parseTranslation(await res.json());
  } catch {
    return null;
  }
}

/** Show in Japanese. Take the Japanese version if there is one; otherwise machine-translate. */
async function localizeToJapanese(place: PlaceOverview): Promise<PlaceOverview> {
  if (looksJapanese(place.extract)) return place;

  if (place.jaTitle !== undefined) {
    const ja = await lookupOverview(wikipediaExtractUrl(place.jaTitle, "ja"));
    if (ja !== null && looksJapanese(ja.extract)) return ja;
  }

  const extract = await translateToJapanese(place.extract);
  if (extract === null) return place;
  const title = looksJapanese(place.title)
    ? place.title
    : ((await translateToJapanese(place.title)) ?? place.title);
  return { title, extract, url: place.url };
}

/**
 * Overview of the place. Even if the named search is empty it falls back to a
 * coordinates-only search, and to English if there is no Japanese Wikipedia. In the
 * Japanese UI the English body is translated. On failure the panel still works with just
 * the time and weather, so null.
 */
export async function fetchPlaceOverview(
  lat: number,
  lng: number,
  lang: Lang,
  name: { ja: string; en: string },
): Promise<PlaceOverview | null> {
  const key = `${lang}|${lat.toFixed(4)}|${lng.toFixed(4)}|${name.ja}|${name.en}`;
  const cached = overviewCache.get(key);
  if (cached !== undefined) return cached;

  const labeled = sanitizeSearchName(name[lang]);
  const attempts: string[] = [wikipediaSearchUrl(lat, lng, lang, labeled || undefined)];
  if (labeled !== "") attempts.push(wikipediaSearchUrl(lat, lng, lang));
  if (lang === "ja") {
    const labeledEn = sanitizeSearchName(name.en);
    attempts.push(wikipediaSearchUrl(lat, lng, "en", labeledEn || undefined));
    if (labeledEn !== "") attempts.push(wikipediaSearchUrl(lat, lng, "en"));
  }

  let overview: PlaceOverview | null = null;
  for (const url of attempts) {
    overview = await lookupOverview(url);
    if (overview !== null) break;
  }
  if (overview !== null && lang === "ja") overview = await localizeToJapanese(overview);
  overviewCache.set(key, overview);
  return overview;
}
