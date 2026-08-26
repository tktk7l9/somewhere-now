// ブラウザ側のデータ取得。
//   /api/cams        … Worker が KV から返すライブ生存状態(APIキーは通らない)
//   Open-Meteo       … 選択中のカメラの天気だけを直接取る
//   Wikipedia        … 選択中のカメラの土地の概要(キー不要・CORS *)

import type { CamState } from "../domain/cams";
import {
  parsePlaceOverview,
  sanitizeSearchName,
  wikipediaSearchUrl,
  type PlaceOverview,
} from "../domain/placeOverview";
import { openMeteoUrl, parseWeather, type Lang, type Weather } from "../domain/weather";

export interface StatePayload {
  updatedAt: string;
  cams: Record<string, CamState>;
}

/** 失敗しても地図は動かしたいので、投げずに null を返す。 */
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

/**
 * 土地の概要。名前付き検索が空でも座標だけの検索に落とし、日本語 Wikipedia が
 * 無ければ英語へ。失敗してもパネルは時刻と天気だけで成立するので null。
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
  overviewCache.set(key, overview);
  return overview;
}
