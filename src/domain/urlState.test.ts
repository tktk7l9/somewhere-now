import { MAX_VIEW, parseUrlState, toSearchString, type ViewState } from "./urlState";

const DEFAULTS: ViewState = {
  view: [],
  categories: [],
  liveOnly: false,
  nightOnly: false,
  favoritesOnly: false,
  globe: false,
  watching: false,
  query: "",
  lang: "ja",
};

describe("parseUrlState", () => {
  it("空のクエリでは既定値を返す", () => {
    expect(parseUrlState("")).toEqual(DEFAULTS);
    expect(parseUrlState("?")).toEqual(DEFAULTS);
  });

  it("?cam= を 1 枚のビューとして読む", () => {
    expect(parseUrlState("?cam=shibuya").view).toEqual(["shibuya"]);
  });

  it("?view= をマルチビューとして読む", () => {
    expect(parseUrlState("?view=a,b,c").view).toEqual(["a", "b", "c"]);
  });

  it("ビューの枚数を上限で切る", () => {
    expect(parseUrlState("?view=a,b,c,d,e,f").view).toHaveLength(MAX_VIEW);
  });

  it("ビューの重複と空文字を落とす", () => {
    expect(parseUrlState("?view=a,,a,b").view).toEqual(["a", "b"]);
  });

  it("?cam= と ?view= が両方あれば view を優先する", () => {
    expect(parseUrlState("?cam=x&view=a,b").view).toEqual(["a", "b"]);
  });

  it("既知のカテゴリだけを採る", () => {
    expect(parseUrlState("?cat=city,bogus,animal").categories).toEqual(["city", "animal"]);
  });

  it("真偽フラグを読む", () => {
    const s = parseUrlState("?live=1&night=1&fav=1&globe=1&watching=1");
    expect([s.liveOnly, s.nightOnly, s.favoritesOnly, s.globe, s.watching]).toEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });

  it("1 以外の値はフラグを立てない", () => {
    expect(parseUrlState("?live=0").liveOnly).toBe(false);
    expect(parseUrlState("?live=true").liveOnly).toBe(false);
  });

  it("検索語を読み、前後の空白を落とす", () => {
    expect(parseUrlState("?q=%20venice%20").query).toBe("venice");
  });

  it("既知の言語だけを採る", () => {
    expect(parseUrlState("?lang=en").lang).toBe("en");
    expect(parseUrlState("?lang=fr").lang).toBe("ja");
  });
});

describe("toSearchString", () => {
  it("既定値だけなら空文字を返す(URL を汚さない)", () => {
    expect(toSearchString(DEFAULTS)).toBe("");
  });

  it("1 枚だけなら共有しやすい ?cam= を使う", () => {
    expect(toSearchString({ ...DEFAULTS, view: ["shibuya"] })).toBe("?cam=shibuya");
  });

  it("複数枚なら ?view= を使う", () => {
    expect(toSearchString({ ...DEFAULTS, view: ["a", "b"] })).toBe("?view=a%2Cb");
  });

  it("立っているフラグと絞り込みだけを載せる", () => {
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

  it("night と fav と globe と watching も載る", () => {
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

  it("往復しても状態が保たれる", () => {
    const state: ViewState = {
      view: ["a", "b"],
      categories: ["harbor"],
      liveOnly: true,
      nightOnly: true,
      favoritesOnly: true,
      globe: true,
      watching: true,
      query: "porto",
      lang: "en",
    };
    expect(parseUrlState(toSearchString(state))).toEqual(state);
  });
});
