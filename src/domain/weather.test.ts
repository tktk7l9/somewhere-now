import { openMeteoUrl, parseWeather, weatherIcon, weatherLabel } from "./weather";

describe("openMeteoUrl", () => {
  it("requests the needed current fields", () => {
    const url = new URL(openMeteoUrl(35.68, 139.76));
    expect(url.origin + url.pathname).toBe("https://api.open-meteo.com/v1/forecast");
    expect(url.searchParams.get("latitude")).toBe("35.68");
    expect(url.searchParams.get("longitude")).toBe("139.76");
    expect(url.searchParams.get("current")).toBe("temperature_2m,weather_code,is_day");
  });

  it("rounds coordinates to 4 decimal places (does not create needlessly fine cache keys)", () => {
    const url = new URL(openMeteoUrl(35.123456789, -0.000004));
    expect(url.searchParams.get("latitude")).toBe("35.1235");
    expect(url.searchParams.get("longitude")).toBe("0");
  });
});

describe("parseWeather", () => {
  const ok = { current: { temperature_2m: 21.4, weather_code: 3, is_day: 1 } };

  it("reads a normal response", () => {
    expect(parseWeather(ok)).toEqual({ temperatureC: 21.4, code: 3, isDay: true });
  });

  it("reads is_day=0 as night", () => {
    expect(parseWeather({ current: { ...ok.current, is_day: 0 } })?.isDay).toBe(false);
  });

  it("returns null for a response of a different shape", () => {
    expect(parseWeather(null)).toBeNull();
    expect(parseWeather({})).toBeNull();
    expect(parseWeather({ current: null })).toBeNull();
    expect(parseWeather({ current: { temperature_2m: "warm", weather_code: 3, is_day: 1 } })).toBeNull();
    expect(parseWeather({ current: { temperature_2m: 1, weather_code: null, is_day: 1 } })).toBeNull();
  });
});

describe("weatherLabel", () => {
  it("tells the main weather codes apart in Japanese and English", () => {
    expect(weatherLabel(0, "ja")).toBe("快晴");
    expect(weatherLabel(0, "en")).toBe("Clear");
    expect(weatherLabel(95, "ja")).toBe("雷雨");
    expect(weatherLabel(95, "en")).toBe("Thunderstorm");
  });

  it("groups codes of the same family", () => {
    expect(weatherLabel(61, "en")).toBe(weatherLabel(65, "en"));
    expect(weatherLabel(71, "ja")).toBe(weatherLabel(75, "ja"));
  });

  it("returns unknown for an unknown code", () => {
    expect(weatherLabel(999, "ja")).toBe("不明");
    expect(weatherLabel(999, "en")).toBe("Unknown");
  });
});

describe("weatherIcon", () => {
  it("changes the picture between day and night for clear sky", () => {
    expect(weatherIcon(0, true)).toBe("☀️");
    expect(weatherIcon(0, false)).toBe("🌙");
  });

  it("does not change between day and night for kinds where the weather itself is visible", () => {
    expect(weatherIcon(65, true)).toBe(weatherIcon(65, false));
  });

  it("returns something for an unknown code too", () => {
    expect(weatherIcon(999, true)).toBe("❓");
  });
});
