// ブラウザ側のデータ取得。
//   /api/cams        … Worker が KV から返すライブ生存状態(APIキーは通らない)
//   Open-Meteo       … 選択中のカメラの天気だけを直接取る

import type { CamState } from "../domain/cams";
import { openMeteoUrl, parseWeather, type Weather } from "../domain/weather";

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
