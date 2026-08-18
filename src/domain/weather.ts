// 選択中のカメラの「いまそこの天気」。Open-Meteo はキー不要・CORS 全許可なので
// ブラウザから直接叩く(Worker を経由しない)。

export interface Weather {
  temperatureC: number;
  /** WMO weather interpretation code。 */
  code: number;
  isDay: boolean;
}

export type Lang = "ja" | "en";

/** 座標は小数第 4 位(約 11m)で十分。CDN キャッシュが効きやすいよう丸める。 */
export function openMeteoUrl(lat: number, lng: number): string {
  const round = (n: number) => String(Number(n.toFixed(4)));
  return (
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${round(lat)}&longitude=${round(lng)}` +
    "&current=temperature_2m,weather_code,is_day"
  );
}

export function parseWeather(json: unknown): Weather | null {
  if (typeof json !== "object" || json === null) return null;
  const current = (json as { current?: unknown }).current;
  if (typeof current !== "object" || current === null) return null;

  const { temperature_2m: temp, weather_code: code, is_day: isDay } = current as Record<
    string,
    unknown
  >;
  if (typeof temp !== "number" || typeof code !== "number" || typeof isDay !== "number") {
    return null;
  }
  return { temperatureC: temp, code, isDay: isDay === 1 };
}

// WMO のコードを、地図の脇に一行で出せる粒度までまとめる。
type WeatherKind =
  | "clear"
  | "partly"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "showers"
  | "thunder";

const KIND_BY_CODE = new Map<number, WeatherKind>([
  [0, "clear"],
  [1, "clear"],
  [2, "partly"],
  [3, "cloudy"],
  [45, "fog"],
  [48, "fog"],
  [51, "drizzle"],
  [53, "drizzle"],
  [55, "drizzle"],
  [56, "drizzle"],
  [57, "drizzle"],
  [61, "rain"],
  [63, "rain"],
  [65, "rain"],
  [66, "rain"],
  [67, "rain"],
  [71, "snow"],
  [73, "snow"],
  [75, "snow"],
  [77, "snow"],
  [85, "snow"],
  [86, "snow"],
  [80, "showers"],
  [81, "showers"],
  [82, "showers"],
  [95, "thunder"],
  [96, "thunder"],
  [99, "thunder"],
]);

const LABELS: Record<WeatherKind, Record<Lang, string>> = {
  clear: { ja: "快晴", en: "Clear" },
  partly: { ja: "晴れ時々曇り", en: "Partly cloudy" },
  cloudy: { ja: "曇り", en: "Overcast" },
  fog: { ja: "霧", en: "Fog" },
  drizzle: { ja: "霧雨", en: "Drizzle" },
  rain: { ja: "雨", en: "Rain" },
  snow: { ja: "雪", en: "Snow" },
  showers: { ja: "にわか雨", en: "Showers" },
  thunder: { ja: "雷雨", en: "Thunderstorm" },
};

const UNKNOWN_LABEL: Record<Lang, string> = { ja: "不明", en: "Unknown" };

export function weatherLabel(code: number, lang: Lang): string {
  const kind = KIND_BY_CODE.get(code);
  return kind === undefined ? UNKNOWN_LABEL[lang] : LABELS[kind][lang];
}

// 空の状態しか分からない種類(快晴・晴れ時々曇り)だけ昼夜で絵柄を変える。
// 雨や雪は見た目そのものなので変えない。
const ICONS: Record<WeatherKind, { day: string; night: string }> = {
  clear: { day: "☀️", night: "🌙" },
  partly: { day: "⛅", night: "☁️" },
  cloudy: { day: "☁️", night: "☁️" },
  fog: { day: "🌫️", night: "🌫️" },
  drizzle: { day: "🌦️", night: "🌦️" },
  rain: { day: "🌧️", night: "🌧️" },
  snow: { day: "🌨️", night: "🌨️" },
  showers: { day: "🌦️", night: "🌦️" },
  thunder: { day: "⛈️", night: "⛈️" },
};

export function weatherIcon(code: number, isDay: boolean): string {
  const kind = KIND_BY_CODE.get(code);
  if (kind === undefined) return "❓";
  return isDay ? ICONS[kind].day : ICONS[kind].night;
}
