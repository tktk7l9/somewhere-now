import {
  looksJapanese,
  myMemoryUrl,
  parsePlaceOverview,
  parseTranslation,
  sanitizeSearchName,
  TRANSLATE_MAX_CHARS,
  wikipediaExtractUrl,
  wikipediaSearchQuery,
  wikipediaSearchUrl,
} from "./placeOverview";

describe("sanitizeSearchName", () => {
  it("drops quotes and extra whitespace", () => {
    expect(sanitizeSearchName('  Times  "Square"  ')).toBe("Times Square");
    expect(sanitizeSearchName("Foo\\Bar'Baz")).toBe("Foo Bar Baz");
  });

  it("becomes an empty string when it is symbols only", () => {
    expect(sanitizeSearchName('  "\'\\  ')).toBe("");
  });
});

describe("wikipediaSearchQuery", () => {
  it("quotes the name and puts it next to the coordinates when there is a name", () => {
    expect(wikipediaSearchQuery(40.758, -73.9855, "Times Square")).toBe(
      '"Times Square" nearcoord:10km,40.758,-73.9855',
    );
  });

  it("searches by coordinates only when the name is empty", () => {
    expect(wikipediaSearchQuery(35.6595, 139.7005)).toBe("nearcoord:10km,35.6595,139.7005");
    expect(wikipediaSearchQuery(35.6595, 139.7005, "   ")).toBe("nearcoord:10km,35.6595,139.7005");
  });

  it("rounds coordinates to 4 decimal places", () => {
    expect(wikipediaSearchQuery(35.123456789, -0.000004, "X")).toBe(
      '"X" nearcoord:10km,35.1235,0',
    );
  });
});

describe("wikipediaSearchUrl", () => {
  it("hits ja.wikipedia.org for Japanese", () => {
    const url = new URL(wikipediaSearchUrl(35.6595, 139.7005, "ja", "渋谷スクランブル交差点"));
    expect(url.origin).toBe("https://ja.wikipedia.org");
    expect(url.pathname).toBe("/w/api.php");
    expect(url.searchParams.get("action")).toBe("query");
    expect(url.searchParams.get("generator")).toBe("search");
    expect(url.searchParams.get("gsrsearch")).toBe(
      '"渋谷スクランブル交差点" nearcoord:10km,35.6595,139.7005',
    );
    expect(url.searchParams.get("gsrlimit")).toBe("5");
    expect(url.searchParams.get("gsrnamespace")).toBe("0");
    expect(url.searchParams.get("prop")).toBe("extracts|info");
    expect(url.searchParams.get("exintro")).toBe("1");
    expect(url.searchParams.get("explaintext")).toBe("1");
    expect(url.searchParams.get("exchars")).toBe("360");
    expect(url.searchParams.get("inprop")).toBe("url");
    expect(url.searchParams.get("format")).toBe("json");
    expect(url.searchParams.get("origin")).toBe("*");
    expect(url.searchParams.get("lllang")).toBeNull();
  });

  it("hits en.wikipedia.org for English and also fetches langlinks to the Japanese edition", () => {
    const url = new URL(wikipediaSearchUrl(40.758, -73.9855, "en", "Times Square"));
    expect(url.origin).toBe("https://en.wikipedia.org");
    expect(url.searchParams.get("gsrsearch")).toContain("Times Square");
    expect(url.searchParams.get("prop")).toBe("extracts|info|langlinks");
    expect(url.searchParams.get("lllang")).toBe("ja");
    expect(url.searchParams.get("llprop")).toBe("url");
  });

  it("becomes nearcoord only when the name is omitted", () => {
    const url = new URL(wikipediaSearchUrl(7.0731, 125.6128, "en"));
    expect(url.searchParams.get("gsrsearch")).toBe("nearcoord:10km,7.0731,125.6128");
  });
});

describe("parsePlaceOverview", () => {
  const page = (over: Record<string, unknown> = {}) => ({
    title: "Times Square",
    extract: "Times Square is a busy pedestrian plaza in Manhattan.\n\nMore history.",
    fullurl: "https://en.wikipedia.org/wiki/Times_Square",
    index: 1,
    ...over,
  });

  it("takes only the first paragraph of the top search result", () => {
    expect(
      parsePlaceOverview({
        query: {
          pages: {
            "2": page({ title: "One Times Square", index: 2 }),
            "1": page({ index: 1 }),
          },
        },
      }),
    ).toEqual({
      title: "Times Square",
      extract: "Times Square is a busy pedestrian plaza in Manhattan.",
      url: "https://en.wikipedia.org/wiki/Times_Square",
    });
  });

  it("skips an incident article and takes the next place", () => {
    expect(
      parsePlaceOverview({
        query: {
          pages: {
            a: page({
              title: "2017 Times Square car attack",
              extract: "On May 18, 2017, a car was crashed in Times Square.",
              index: 1,
            }),
            b: page({
              title: "Times Square bombing plot",
              extract: "A bombing plot.",
              index: 2,
            }),
            c: page({ index: 3 }),
          },
        },
      }),
    ).toEqual({
      title: "Times Square",
      extract: "Times Square is a busy pedestrian plaza in Manhattan.",
      url: "https://en.wikipedia.org/wiki/Times_Square",
    });
  });

  it("skips disambiguation pages and empty bodies", () => {
    expect(
      parsePlaceOverview({
        query: {
          pages: {
            a: page({ extract: "Foo may refer to:", index: 1 }),
            b: page({ title: "渋谷", extract: "渋谷は曖昧さ回避ページです。", index: 2 }),
            c: page({ extract: "\n\n", index: 3 }),
            d: page({
              title: "渋谷スクランブル交差点",
              extract: "東京都渋谷区にある交差点。",
              fullurl: "https://ja.wikipedia.org/wiki/Shibuya",
              index: 4,
            }),
          },
        },
      }),
    ).toEqual({
      title: "渋谷スクランブル交差点",
      extract: "東京都渋谷区にある交差点。",
      url: "https://ja.wikipedia.org/wiki/Shibuya",
    });
  });

  it("puts pages without an index at the back", () => {
    expect(
      parsePlaceOverview({
        query: {
          pages: {
            late: {
              title: "Later",
              extract: "Later.",
              fullurl: "https://en.wikipedia.org/wiki/Later",
            },
            first: page({
              title: "First",
              extract: "First.",
              fullurl: "https://en.wikipedia.org/wiki/First",
              index: 1,
            }),
          },
        },
      }),
    ).toEqual({
      title: "First",
      extract: "First.",
      url: "https://en.wikipedia.org/wiki/First",
    });
  });

  it("returns null for a response of a different shape", () => {
    expect(parsePlaceOverview(null)).toBeNull();
    expect(parsePlaceOverview({})).toBeNull();
    expect(parsePlaceOverview({ query: null })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: null } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: "nope" } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: null } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: 1 } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: { title: "", extract: "x", fullurl: "u", index: 1 } } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: { title: "   ", extract: "x", fullurl: "u", index: 1 } } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: { title: "T", extract: 1, fullurl: "u", index: 1 } } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: { title: "T", extract: "x", index: 1 } } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: { title: "T", extract: "x", fullurl: "", index: 1 } } } })).toBeNull();
    expect(parsePlaceOverview({ query: { pages: { a: { title: "T", extract: "x", fullurl: "   ", index: 1 } } } })).toBeNull();
  });

  it("returns null when the candidates are incidents only", () => {
    expect(
      parsePlaceOverview({
        query: {
          pages: {
            a: page({ title: "2010 Times Square car bombing attempt", extract: "An incident." }),
          },
        },
      }),
    ).toBeNull();
  });

  it("picks up langlinks to the Japanese edition", () => {
    expect(
      parsePlaceOverview({
        query: {
          pages: {
            a: page({
              langlinks: [
                "nope",
                null,
                { "*": "", url: "https://ja.wikipedia.org/wiki/X" },
                { "*": "タイムズスクエア", url: "   " },
                { "*": "タイムズスクエア", url: 1 },
                { "*": "タイムズスクエア", url: "https://ja.wikipedia.org/wiki/タイムズスクエア" },
              ],
            }),
          },
        },
      }),
    ).toEqual({
      title: "Times Square",
      extract: "Times Square is a busy pedestrian plaza in Manhattan.",
      url: "https://en.wikipedia.org/wiki/Times_Square",
      jaTitle: "タイムズスクエア",
      jaUrl: "https://ja.wikipedia.org/wiki/タイムズスクエア",
    });
  });

  it("does not attach the Japanese edition when langlinks is empty", () => {
    expect(
      parsePlaceOverview({
        query: { pages: { a: page({ langlinks: [] }) } },
      }),
    ).toEqual({
      title: "Times Square",
      extract: "Times Square is a busy pedestrian plaza in Manhattan.",
      url: "https://en.wikipedia.org/wiki/Times_Square",
    });
  });
});

describe("wikipediaExtractUrl", () => {
  it("fetches the body of Japanese Wikipedia by title", () => {
    const url = new URL(wikipediaExtractUrl("イルリサット", "ja"));
    expect(url.origin).toBe("https://ja.wikipedia.org");
    expect(url.searchParams.get("titles")).toBe("イルリサット");
    expect(url.searchParams.get("prop")).toBe("extracts|info");
    expect(url.searchParams.get("redirects")).toBe("1");
    expect(url.searchParams.get("inprop")).toBe("url");
  });

  it("can target the English host too", () => {
    const url = new URL(wikipediaExtractUrl("Ilulissat", "en"));
    expect(url.origin).toBe("https://en.wikipedia.org");
    expect(url.searchParams.get("titles")).toBe("Ilulissat");
  });
});

describe("looksJapanese", () => {
  it("treats hiragana, katakana and kanji as Japanese", () => {
    expect(looksJapanese("渋谷は交差点です")).toBe(true);
    expect(looksJapanese("イルリサット")).toBe(true);
    expect(looksJapanese("東京")).toBe(true);
  });

  it("is not Japanese when it is Latin letters only", () => {
    expect(looksJapanese("Times Square is a plaza.")).toBe(false);
    expect(looksJapanese("")).toBe(false);
  });
});

describe("myMemoryUrl", () => {
  it("requests an English-to-Japanese translation", () => {
    const url = new URL(myMemoryUrl("Ilulissat is a town."));
    expect(url.origin).toBe("https://api.mymemory.translated.net");
    expect(url.pathname).toBe("/get");
    expect(url.searchParams.get("q")).toBe("Ilulissat is a town.");
    expect(url.searchParams.get("langpair")).toBe("en|ja");
  });

  it("cuts long text at 450 characters", () => {
    const long = "a".repeat(TRANSLATE_MAX_CHARS + 20);
    const url = new URL(myMemoryUrl(long));
    expect(url.searchParams.get("q")).toBe("a".repeat(TRANSLATE_MAX_CHARS));
  });
});

describe("parseTranslation", () => {
  it("reads a normal response", () => {
    expect(
      parseTranslation({
        responseStatus: 200,
        responseData: { translatedText: "  イルリサットは町です。 \n" },
      }),
    ).toBe("イルリサットは町です。");
  });

  it("reads it even when status is the string 200", () => {
    expect(
      parseTranslation({
        responseStatus: "200",
        responseData: { translatedText: "交差点" },
      }),
    ).toBe("交差点");
  });

  it("returns null for a response of a different shape or a warning", () => {
    expect(parseTranslation(null)).toBeNull();
    expect(parseTranslation({})).toBeNull();
    expect(parseTranslation({ responseStatus: 429, responseData: { translatedText: "x" } })).toBeNull();
    expect(parseTranslation({ responseStatus: 200, responseData: null })).toBeNull();
    expect(parseTranslation({ responseStatus: 200, responseData: { translatedText: 1 } })).toBeNull();
    expect(parseTranslation({ responseStatus: 200, responseData: { translatedText: "  " } })).toBeNull();
    expect(
      parseTranslation({
        responseStatus: 200,
        responseData: { translatedText: "MYMEMORY WARNING: quota" },
      }),
    ).toBeNull();
    expect(
      parseTranslation({
        responseStatus: 200,
        responseData: { translatedText: "INVALID QUERY" },
      }),
    ).toBeNull();
  });
});
