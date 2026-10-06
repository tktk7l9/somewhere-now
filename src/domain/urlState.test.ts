import { MAX_VIEW, parseUrlState, toSearchString, type ViewState } from "./urlState";

const DEFAULTS: ViewState = {
  view: [],
  categories: [],
  liveOnly: false,
  nightOnly: false,
  favoritesOnly: false,
  globe: false,
  watching: false,
  broadcasts: false,
  query: "",
  lang: "ja",
};

describe("parseUrlState", () => {
  it("returns the defaults for an empty query", () => {
    expect(parseUrlState("")).toEqual(DEFAULTS);
    expect(parseUrlState("?")).toEqual(DEFAULTS);
  });

  it("reads ?cam= as a single view", () => {
    expect(parseUrlState("?cam=shibuya").view).toEqual(["shibuya"]);
  });

  it("reads ?view= as a multi-view", () => {
    expect(parseUrlState("?view=a,b,c").view).toEqual(["a", "b", "c"]);
  });

  it("cuts the number of views at the limit", () => {
    expect(parseUrlState("?view=a,b,c,d,e,f").view).toHaveLength(MAX_VIEW);
  });

  it("drops duplicate and empty views", () => {
    expect(parseUrlState("?view=a,,a,b").view).toEqual(["a", "b"]);
  });

  it("prefers view when both ?cam= and ?view= exist", () => {
    expect(parseUrlState("?cam=x&view=a,b").view).toEqual(["a", "b"]);
  });

  it("takes known categories only", () => {
    expect(parseUrlState("?cat=city,bogus,animal").categories).toEqual(["city", "animal"]);
  });

  it("reads boolean flags", () => {
    const s = parseUrlState("?live=1&night=1&fav=1&globe=1&watching=1");
    expect([s.liveOnly, s.nightOnly, s.favoritesOnly, s.globe, s.watching]).toEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });

  it("does not set a flag for values other than 1", () => {
    expect(parseUrlState("?live=0").liveOnly).toBe(false);
    expect(parseUrlState("?live=true").liveOnly).toBe(false);
  });

  it("reads the search term and drops leading and trailing whitespace", () => {
    expect(parseUrlState("?q=%20venice%20").query).toBe("venice");
  });

  it("takes known languages only", () => {
    expect(parseUrlState("?lang=en").lang).toBe("en");
    expect(parseUrlState("?lang=fr").lang).toBe("ja");
  });
});

describe("toSearchString", () => {
  it("returns an empty string for defaults only (does not clutter the URL)", () => {
    expect(toSearchString(DEFAULTS)).toBe("");
  });

  it("uses the easy-to-share ?cam= for a single view", () => {
    expect(toSearchString({ ...DEFAULTS, view: ["shibuya"] })).toBe("?cam=shibuya");
  });

  it("uses ?view= for several views", () => {
    expect(toSearchString({ ...DEFAULTS, view: ["a", "b"] })).toBe("?view=a%2Cb");
  });

  it("carries only the set flags and filters", () => {
    const s = toSearchString({
      ...DEFAULTS,
      categories: ["city", "animal"],
      liveOnly: true,
      query: "venice",
      lang: "en",
    });
    const params = new URLSearchParams(s);
    expect(params.get("cat")).toBe("city,animal");
    expect(params.get("live")).toBe("1");
    expect(params.get("q")).toBe("venice");
    expect(params.get("lang")).toBe("en");
    expect(params.get("night")).toBeNull();
    expect(params.get("fav")).toBeNull();
    expect(params.get("watching")).toBeNull();
  });

  it("carries night, fav, globe and watching too", () => {
    const params = new URLSearchParams(
      toSearchString({
        ...DEFAULTS,
        nightOnly: true,
        favoritesOnly: true,
        globe: true,
        watching: true,
      }),
    );
    expect(params.get("night")).toBe("1");
    expect(params.get("fav")).toBe("1");
    expect(params.get("globe")).toBe("1");
    expect(params.get("watching")).toBe("1");
  });

  it("carries bc=1 only while broadcasts are shown", () => {
    expect(toSearchString({ ...DEFAULTS, broadcasts: true })).toBe("?bc=1");
    expect(toSearchString(DEFAULTS)).toBe("");
    expect(parseUrlState("?bc=1").broadcasts).toBe(true);
    expect(parseUrlState("").broadcasts).toBe(false);
  });

  it("keeps the state across a round trip", () => {
    const state: ViewState = {
      view: ["a", "b"],
      categories: ["harbor"],
      liveOnly: true,
      nightOnly: true,
      favoritesOnly: true,
      globe: true,
      watching: true,
      broadcasts: true,
      query: "porto",
      lang: "en",
    };
    expect(parseUrlState(toSearchString(state))).toEqual(state);
  });
});
