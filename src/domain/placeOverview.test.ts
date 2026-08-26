import {
  parsePlaceOverview,
  sanitizeSearchName,
  wikipediaSearchQuery,
  wikipediaSearchUrl,
} from "./placeOverview";

describe("sanitizeSearchName", () => {
  it("引用符と余分な空白を落とす", () => {
    expect(sanitizeSearchName('  Times  "Square"  ')).toBe("Times Square");
    expect(sanitizeSearchName("Foo\\Bar'Baz")).toBe("Foo Bar Baz");
  });

  it("記号だけなら空文字にする", () => {
    expect(sanitizeSearchName('  "\'\\  ')).toBe("");
  });
});

describe("wikipediaSearchQuery", () => {
  it("名前があるときは引用して座標と並べる", () => {
    expect(wikipediaSearchQuery(40.758, -73.9855, "Times Square")).toBe(
      '"Times Square" nearcoord:10km,40.758,-73.9855',
    );
  });

  it("名前が空なら座標だけの検索にする", () => {
    expect(wikipediaSearchQuery(35.6595, 139.7005)).toBe("nearcoord:10km,35.6595,139.7005");
    expect(wikipediaSearchQuery(35.6595, 139.7005, "   ")).toBe("nearcoord:10km,35.6595,139.7005");
  });

  it("座標を小数第 4 位で丸める", () => {
    expect(wikipediaSearchQuery(35.123456789, -0.000004, "X")).toBe(
      '"X" nearcoord:10km,35.1235,0',
    );
  });
});

describe("wikipediaSearchUrl", () => {
  it("日本語は ja.wikipedia.org を叩く", () => {
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
  });

  it("英語は en.wikipedia.org を叩く", () => {
    const url = new URL(wikipediaSearchUrl(40.758, -73.9855, "en", "Times Square"));
    expect(url.origin).toBe("https://en.wikipedia.org");
    expect(url.searchParams.get("gsrsearch")).toContain("Times Square");
  });

  it("名前を省略すると nearcoord だけになる", () => {
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

  it("検索順の先頭で、最初の段落だけを取る", () => {
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

  it("事件記事は飛ばして次の場所を取る", () => {
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

  it("曖昧さ回避と空の本文は飛ばす", () => {
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

  it("index が無いページは後ろに回す", () => {
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

  it("形の違う応答では null を返す", () => {
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

  it("候補が事件だけなら null を返す", () => {
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
});
