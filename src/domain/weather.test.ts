import { openMeteoUrl, parseWeather, weatherIcon, weatherLabel } from "./weather";

describe("openMeteoUrl", () => {
  it("必要な current フィールドを要求する", () => {
    const url = new URL(openMeteoUrl(35.68, 139.76));
    expect(url.origin + url.pathname).toBe("https://api.open-meteo.com/v1/forecast");
    expect(url.searchParams.get("latitude")).toBe("35.68");
    expect(url.searchParams.get("longitude")).toBe("139.76");
    expect(url.searchParams.get("current")).toBe("temperature_2m,weather_code,is_day");
  });

  it("座標を小数第 4 位で丸める(無用に細かいキャッシュキーを作らない)", () => {
    const url = new URL(openMeteoUrl(35.123456789, -0.000004));
    expect(url.searchParams.get("latitude")).toBe("35.1235");
    expect(url.searchParams.get("longitude")).toBe("0");
  });
});

describe("parseWeather", () => {
  const ok = { current: { temperature_2m: 21.4, weather_code: 3, is_day: 1 } };

  it("正常な応答を読み取る", () => {
    expect(parseWeather(ok)).toEqual({ temperatureC: 21.4, code: 3, isDay: true });
  });

  it("is_day=0 を夜として読む", () => {
    expect(parseWeather({ current: { ...ok.current, is_day: 0 } })?.isDay).toBe(false);
  });

  it("形の違う応答では null を返す", () => {
    expect(parseWeather(null)).toBeNull();
    expect(parseWeather({})).toBeNull();
    expect(parseWeather({ current: null })).toBeNull();
    expect(parseWeather({ current: { temperature_2m: "warm", weather_code: 3, is_day: 1 } })).toBeNull();
    expect(parseWeather({ current: { temperature_2m: 1, weather_code: null, is_day: 1 } })).toBeNull();
  });
});

describe("weatherLabel", () => {
  it("主要な天気コードを日英で言い分ける", () => {
    expect(weatherLabel(0, "ja")).toBe("快晴");
    expect(weatherLabel(0, "en")).toBe("Clear");
    expect(weatherLabel(95, "ja")).toBe("雷雨");
    expect(weatherLabel(95, "en")).toBe("Thunderstorm");
  });

  it("同じ系統のコードをまとめる", () => {
    expect(weatherLabel(61, "en")).toBe(weatherLabel(65, "en"));
    expect(weatherLabel(71, "ja")).toBe(weatherLabel(75, "ja"));
  });

  it("未知のコードは不明として返す", () => {
    expect(weatherLabel(999, "ja")).toBe("不明");
    expect(weatherLabel(999, "en")).toBe("Unknown");
  });
});

describe("weatherIcon", () => {
  it("快晴は昼と夜で絵柄を変える", () => {
    expect(weatherIcon(0, true)).toBe("☀️");
    expect(weatherIcon(0, false)).toBe("🌙");
  });

  it("天候そのものが見える種類は昼夜で変えない", () => {
    expect(weatherIcon(65, true)).toBe(weatherIcon(65, false));
  });

  it("未知のコードにも何か返す", () => {
    expect(weatherIcon(999, true)).toBe("❓");
  });
});
