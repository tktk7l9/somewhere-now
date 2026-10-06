import type { PlaceOverview } from "../domain/placeOverview";

type Client = typeof import("./client");

const fetchMock = vi.fn<(url: string) => Promise<Response>>();

function json(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), { status: 200, ...init });
}

/** A Wikipedia search/extract answer with a single page. */
function wiki(title: string, extract: string, extra: Record<string, unknown> = {}): Response {
  return json({
    query: { pages: { "1": { title, extract, fullurl: `https://wiki.example/${title}`, index: 1, ...extra } } },
  });
}

const EMPTY_WIKI = json({ query: {} });

function translation(text: string): Response {
  return json({ responseStatus: 200, responseData: { translatedText: text } });
}

/** Routes by host so each test states only the answers it cares about. */
function route(handlers: Partial<Record<"jaWiki" | "enWiki" | "memory" | "meteo" | "other", () => Response>>) {
  fetchMock.mockImplementation(async (url: string) => {
    const host = url.startsWith("/") ? "other" : new URL(url).host;
    const key =
      host === "ja.wikipedia.org"
        ? "jaWiki"
        : host === "en.wikipedia.org"
          ? "enWiki"
          : host === "api.mymemory.translated.net"
            ? "memory"
            : host === "api.open-meteo.com"
              ? "meteo"
              : "other";
    const handler = handlers[key];
    if (handler === undefined) throw new Error(`unexpected fetch ${url}`);
    return handler();
  });
}

const NAME = { ja: "東京の交差点", en: "Tokyo Crossing" };

describe("api client", () => {
  let client: Client;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    client = await import("./client");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("fetchCams", () => {
    it("returns the master list", async () => {
      route({ other: () => json([{ id: "a" }]) });
      expect(await client.fetchCams()).toEqual([{ id: "a" }]);
      expect(fetchMock).toHaveBeenCalledWith("/cams.json");
    });

    it("returns an empty list on an error status or a network failure", async () => {
      route({ other: () => json({}, { status: 500 }) });
      expect(await client.fetchCams()).toEqual([]);
      fetchMock.mockRejectedValueOnce(new TypeError("offline"));
      expect(await client.fetchCams()).toEqual([]);
    });
  });

  describe("fetchCamStates", () => {
    it("returns the payload", async () => {
      const payload = { updatedAt: "2026-06-01T00:00:00Z", cams: {} };
      route({ other: () => json(payload) });
      expect(await client.fetchCamStates()).toEqual(payload);
      expect(fetchMock).toHaveBeenCalledWith("/api/cams");
    });

    it("returns null instead of throwing", async () => {
      route({ other: () => json({}, { status: 503 }) });
      expect(await client.fetchCamStates()).toBeNull();
      fetchMock.mockRejectedValueOnce(new TypeError("offline"));
      expect(await client.fetchCamStates()).toBeNull();
    });
  });

  describe("fetchWeather", () => {
    it("parses and caches the current weather per rounded coordinate", async () => {
      route({ meteo: () => json({ current: { temperature_2m: 18.2, weather_code: 3, is_day: 0 } }) });
      const first = await client.fetchWeather(35.681236, 139.767125);
      const again = await client.fetchWeather(35.681236, 139.767125);
      expect(first).toEqual({ temperatureC: 18.2, code: 3, isDay: false });
      expect(again).toBe(first);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("returns null on an error status or network failure and does not retry it", async () => {
      route({ meteo: () => json({}, { status: 500 }) });
      expect(await client.fetchWeather(1, 2)).toBeNull();
      expect(await client.fetchWeather(1, 2)).toBeNull();
      expect(fetchMock).toHaveBeenCalledTimes(1);

      fetchMock.mockRejectedValueOnce(new TypeError("offline"));
      expect(await client.fetchWeather(3, 4)).toBeNull();
    });
  });

  describe("fetchPlaceOverview", () => {
    it("returns an English article as is for the English UI", async () => {
      route({ enWiki: () => wiki("Shibuya Crossing", "A famous scramble crossing.") });
      const place = await client.fetchPlaceOverview(35.6595, 139.7005, "en", NAME);
      expect(place).toMatchObject({ title: "Shibuya Crossing", extract: "A famous scramble crossing." });
      const url = new URL(fetchMock.mock.calls[0]![0]);
      expect(url.searchParams.get("gsrsearch")).toContain('"Tokyo Crossing"');
    });

    it("keeps a Japanese article from the Japanese edition", async () => {
      route({ jaWiki: () => wiki("渋谷", "渋谷は東京都の地名。") });
      const place = await client.fetchPlaceOverview(35.6595, 139.7005, "ja", NAME);
      expect(place).toMatchObject({ title: "渋谷", extract: "渋谷は東京都の地名。" });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("caches per language, coordinate and name", async () => {
      route({ enWiki: () => wiki("Place", "Body.") });
      await client.fetchPlaceOverview(1, 2, "en", NAME);
      await client.fetchPlaceOverview(1, 2, "en", NAME);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      await client.fetchPlaceOverview(1, 2, "en", { ja: "別", en: "Other" });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("falls back from the named search to coordinates only, then to English", async () => {
      const seen: string[] = [];
      fetchMock.mockImplementation(async (url: string) => {
        const u = new URL(url);
        seen.push(`${u.host}|${u.searchParams.get("gsrsearch")}`);
        if (u.host === "en.wikipedia.org" && !u.searchParams.get("gsrsearch")!.startsWith('"')) {
          return wiki("Tokyo", "東京は日本の首都。");
        }
        return EMPTY_WIKI.clone();
      });

      const place = await client.fetchPlaceOverview(35, 139, "ja", NAME);

      expect(place?.extract).toBe("東京は日本の首都。");
      expect(seen).toEqual([
        'ja.wikipedia.org|"東京の交差点" nearcoord:10km,35,139',
        "ja.wikipedia.org|nearcoord:10km,35,139",
        'en.wikipedia.org|"Tokyo Crossing" nearcoord:10km,35,139',
        "en.wikipedia.org|nearcoord:10km,35,139",
      ]);
    });

    it("searches by coordinates alone when the name cleans to nothing", async () => {
      route({ enWiki: () => EMPTY_WIKI.clone() });
      expect(await client.fetchPlaceOverview(1, 2, "en", { ja: "\"'", en: "\"'" })).toBeNull();
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(new URL(fetchMock.mock.calls[0]![0]).searchParams.get("gsrsearch")).toBe("nearcoord:10km,1,2");
    });

    it("tries every Japanese UI fallback, including a nameless English search, before giving up", async () => {
      route({ jaWiki: () => EMPTY_WIKI.clone(), enWiki: () => json({}, { status: 500 }) });
      expect(await client.fetchPlaceOverview(1, 2, "ja", { ja: "\"", en: "\"" })).toBeNull();
      // Named searches are skipped when the name is empty: one ja + one en.
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("survives a network failure during the search", async () => {
      fetchMock.mockRejectedValue(new TypeError("offline"));
      expect(await client.fetchPlaceOverview(1, 2, "en", NAME)).toBeNull();
    });

    it("prefers the Japanese edition linked from an English article", async () => {
      fetchMock.mockImplementation(async (url: string) => {
        const u = new URL(url);
        if (u.host === "ja.wikipedia.org" && u.searchParams.get("titles") === "渋谷スクランブル交差点") {
          return wiki("渋谷スクランブル交差点", "渋谷駅前の交差点。");
        }
        if (u.host === "en.wikipedia.org") {
          return wiki("Shibuya Crossing", "A crossing.", {
            langlinks: [{ "*": "渋谷スクランブル交差点", url: "https://ja.wiki.example/x" }],
          });
        }
        return EMPTY_WIKI.clone();
      });

      const place = await client.fetchPlaceOverview(35, 139, "ja", NAME);
      expect(place).toMatchObject({ title: "渋谷スクランブル交差点", extract: "渋谷駅前の交差点。" });
    });

    it("machine-translates the body and title when the Japanese edition is missing or English", async () => {
      fetchMock.mockImplementation(async (url: string) => {
        const u = new URL(url);
        if (u.host === "api.mymemory.translated.net") {
          const q = u.searchParams.get("q");
          return translation(q === "Shibuya Crossing" ? "渋谷交差点" : "有名な交差点。");
        }
        if (u.host === "ja.wikipedia.org" && u.searchParams.has("titles")) {
          return wiki("Shibuya", "Still English."); // not actually Japanese
        }
        if (u.host === "en.wikipedia.org") {
          return wiki("Shibuya Crossing", "A famous crossing.", {
            langlinks: [{ "*": "Shibuya", url: "https://ja.wiki.example/x" }],
          });
        }
        return EMPTY_WIKI.clone();
      });

      const place = await client.fetchPlaceOverview(35, 139, "ja", NAME);
      expect(place).toEqual<PlaceOverview>({
        title: "渋谷交差点",
        extract: "有名な交差点。",
        url: "https://wiki.example/Shibuya Crossing",
      });
    });

    it("keeps a Japanese title and translates only the body", async () => {
      route({
        jaWiki: () => EMPTY_WIKI.clone(),
        enWiki: () => wiki("東京 Tower", "A tower."),
        memory: () => translation("塔。"),
      });
      const place = await client.fetchPlaceOverview(35, 139, "ja", NAME);
      expect(place).toMatchObject({ title: "東京 Tower", extract: "塔。" });
      expect(fetchMock.mock.calls.filter(([u]) => u.includes("mymemory"))).toHaveLength(1);
    });

    it("keeps the English title when the title translation fails", async () => {
      let calls = 0;
      route({
        jaWiki: () => EMPTY_WIKI.clone(),
        enWiki: () => wiki("Big Tower", "A tower."),
        memory: () => (++calls === 1 ? translation("塔。") : json({ responseStatus: 403 })),
      });
      const place = await client.fetchPlaceOverview(35, 139, "ja", NAME);
      expect(place).toMatchObject({ title: "Big Tower", extract: "塔。" });
    });

    it("shows the English article when translation is unavailable", async () => {
      route({
        jaWiki: () => EMPTY_WIKI.clone(),
        enWiki: () => wiki("Big Tower", "A tower."),
        memory: () => json({}, { status: 429 }),
      });
      expect(await client.fetchPlaceOverview(35, 139, "ja", NAME)).toMatchObject({
        title: "Big Tower",
        extract: "A tower.",
      });

      fetchMock.mockReset();
      route({
        jaWiki: () => EMPTY_WIKI.clone(),
        enWiki: () => wiki("Big Tower", "A tower."),
        memory: () => {
          throw new TypeError("offline");
        },
      });
      expect(await client.fetchPlaceOverview(36, 139, "ja", NAME)).toMatchObject({ extract: "A tower." });
    });
  });
});
