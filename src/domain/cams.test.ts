import {
  CAM_CATEGORIES,
  collectCamProblems,
  filterCams,
  normalizeSearchText,
  pickRandom,
  rankLiveByViewers,
  resolveEmbedUrl,
  resolvedVideoId,
  type Cam,
  type CamState,
  publicStates,
  storedState,
} from "./cams";

const cam = (over: Partial<Cam> = {}): Cam => ({
  id: "shibuya-crossing",
  name: { ja: "渋谷スクランブル交差点", en: "Shibuya Crossing" },
  lat: 35.6595,
  lng: 139.7005,
  timeZone: "Asia/Tokyo",
  category: "city",
  country: "JP",
  source: { videoId: "abcdefghijk", channelId: "UC0000000000000000000000", titleKey: "Shibuya Live" },
  ...over,
});

const state = (over: Partial<CamState> = {}): CamState => ({
  videoId: "abcdefghijk",
  status: "live",
  viewers: 120,
  checkedAt: "2026-08-18T00:00:00.000Z",
  ...over,
});

describe("CAM_CATEGORIES", () => {
  it("has no duplicates and all are lowercase slugs", () => {
    expect(new Set(CAM_CATEGORIES).size).toBe(CAM_CATEGORIES.length);
    for (const c of CAM_CATEGORIES) expect(c).toMatch(/^[a-z]+$/);
  });
});

describe("collectCamProblems", () => {
  it("returns no problems for correct data", () => {
    expect(collectCamProblems([cam()])).toEqual([]);
  });

  it("detects duplicate ids", () => {
    const problems = collectCamProblems([cam(), cam({ lat: 1 })]);
    expect(problems.join(" ")).toContain("duplicate id");
  });

  it("detects an id format violation", () => {
    expect(collectCamProblems([cam({ id: "Shibuya_Crossing" })]).join(" ")).toContain("invalid id format");
  });

  it("detects out-of-range latitude and longitude", () => {
    expect(collectCamProblems([cam({ lat: 91 })]).join(" ")).toContain("latitude");
    expect(collectCamProblems([cam({ lng: -181 })]).join(" ")).toContain("longitude");
  });

  it("detects NaN coordinates", () => {
    expect(collectCamProblems([cam({ lat: Number.NaN })]).join(" ")).toContain("latitude");
  });

  it("detects an IANA time zone that cannot be resolved", () => {
    expect(collectCamProblems([cam({ timeZone: "Mars/Olympus" })]).join(" ")).toContain(
      "time zone",
    );
  });

  it("detects an empty display name", () => {
    expect(collectCamProblems([cam({ name: { ja: "", en: "X" } })]).join(" ")).toContain("display name");
    expect(collectCamProblems([cam({ name: { ja: "X", en: " " } })]).join(" ")).toContain("display name");
  });

  it("detects a country code format violation", () => {
    expect(collectCamProblems([cam({ country: "jpn" })]).join(" ")).toContain("country code");
  });

  it("detects an empty titleKey", () => {
    expect(
      collectCamProblems([
        cam({ source: { videoId: "abcdefghijk", channelId: "UC0000000000000000000000", titleKey: " " } }),
      ]).join(" "),
    ).toContain("titleKey");
  });

  it("detects a channelId format violation", () => {
    expect(
      collectCamProblems([cam({ source: { videoId: null, channelId: "bogus", titleKey: "t" } })]).join(" "),
    ).toContain("channelId");
  });

  it("detects a videoId format violation (null is allowed)", () => {
    expect(
      collectCamProblems([cam({ source: { videoId: "short", channelId: "UC0000000000000000000000", titleKey: "t" } })]).join(" "),
    ).toContain("videoId");
    expect(
      collectCamProblems([cam({ source: { videoId: null, channelId: "UC0000000000000000000000", titleKey: "t" } })]),
    ).toEqual([]);
  });
});

describe("filterCams", () => {
  const tokyo = cam();
  const zoo = cam({ id: "zoo", category: "animal", name: { ja: "動物園", en: "Zoo" } });
  const cams = [tokyo, zoo];
  const states = new Map<string, CamState>([
    ["shibuya-crossing", state()],
    ["zoo", state({ status: "offline" })],
  ]);
  const ctx = { states, nightIds: new Set(["zoo"]), favoriteIds: new Set(["zoo"]) };

  it("returns all entries by default", () => {
    expect(filterCams(cams, ctx, {})).toEqual(cams);
  });

  it("filters by category", () => {
    expect(filterCams(cams, ctx, { categories: ["animal"] })).toEqual([zoo]);
  });

  it("does not filter when categories is an empty array", () => {
    expect(filterCams(cams, ctx, { categories: [] })).toEqual(cams);
  });

  it("filters by live only", () => {
    expect(filterCams(cams, ctx, { liveOnly: true })).toEqual([tokyo]);
  });

  it("a camera with unknown state is excluded by live only", () => {
    expect(filterCams([cam({ id: "unknown-cam" })], ctx, { liveOnly: true })).toEqual([]);
  });

  it("filters by night places only", () => {
    expect(filterCams(cams, ctx, { nightOnly: true })).toEqual([zoo]);
  });

  it("filters by favorites only", () => {
    expect(filterCams(cams, ctx, { favoritesOnly: true })).toEqual([zoo]);
  });

  it("can search by either the Japanese or English name (case-insensitive)", () => {
    expect(filterCams(cams, ctx, { query: "shibuya" })).toEqual([tokyo]);
    expect(filterCams(cams, ctx, { query: "動物" })).toEqual([zoo]);
    expect(filterCams(cams, ctx, { query: "  " })).toEqual(cams);
  });

  it("stacking conditions gives their intersection", () => {
    expect(filterCams(cams, ctx, { categories: ["animal"], liveOnly: true })).toEqual([]);
  });

  // The search accepts what people type, not what the data happens to be (SHIG 50).
  describe("lenient search", () => {
    const zurich = cam({ id: "zurich", name: { ja: "チューリッヒ駅", en: "Zürich Station" } });
    const all = [tokyo, zoo, zurich];

    it("ignores full-width letters and full-width spaces", () => {
      expect(filterCams(all, ctx, { query: "ｓｈｉｂｕｙａ　ｃｒｏｓｓｉｎｇ" })).toEqual([tokyo]);
    });

    it("ignores diacritics", () => {
      expect(filterCams(all, ctx, { query: "zurich" })).toEqual([zurich]);
      expect(filterCams(all, ctx, { query: "ZÜRICH" })).toEqual([zurich]);
    });

    it("matches hiragana against a katakana name", () => {
      expect(filterCams(all, ctx, { query: "ちゅーりっひ" })).toEqual([zurich]);
    });

    it("matches every word in any order", () => {
      expect(filterCams(all, ctx, { query: "crossing shibuya" })).toEqual([tokyo]);
      expect(filterCams(all, ctx, { query: "shibuya station" })).toEqual([]);
    });
  });
});

describe("normalizeSearchText", () => {
  it("folds case, width, diacritics and kana, and collapses spaces", () => {
    expect(normalizeSearchText("  Ｚürich　ふじ  SAN ")).toBe("zurich フジ san");
  });
});

describe("rankLiveByViewers", () => {
  const tokyo = cam({ id: "tokyo" });
  const venice = cam({ id: "venice" });
  const zoo = cam({ id: "zoo" });
  const harbor = cam({ id: "harbor" });
  const cams = [tokyo, venice, zoo, harbor];

  it("orders only live cameras by viewer count, highest first", () => {
    const states = new Map<string, CamState>([
      ["tokyo", state({ viewers: 10 })],
      ["venice", state({ viewers: 50 })],
      ["zoo", state({ status: "offline", viewers: 999 })],
      ["harbor", state({ viewers: 20 })],
    ]);
    expect(rankLiveByViewers(cams, states).map((c) => c.id)).toEqual(["venice", "harbor", "tokyo"]);
  });

  it("puts streams with unknown viewer count at the end", () => {
    const states = new Map<string, CamState>([
      ["tokyo", state({ viewers: null })],
      ["venice", state({ viewers: 3 })],
      ["zoo", state({ viewers: 0 })],
    ]);
    expect(rankLiveByViewers([tokyo, venice, zoo], states).map((c) => c.id)).toEqual([
      "venice",
      "zoo",
      "tokyo",
    ]);
  });

  it("on a tie, stabilizes by ascending id", () => {
    const states = new Map<string, CamState>([
      ["zoo", state({ viewers: 7 })],
      ["tokyo", state({ viewers: 7 })],
      ["venice", state({ viewers: 7 })],
    ]);
    expect(rankLiveByViewers([zoo, tokyo, venice], states).map((c) => c.id)).toEqual([
      "tokyo",
      "venice",
      "zoo",
    ]);
  });

  it("does not change the order when the ids are the same", () => {
    const a = cam({ id: "same", name: { ja: "A", en: "A" } });
    const b = cam({ id: "same", name: { ja: "B", en: "B" } });
    const states = new Map<string, CamState>([["same", state({ viewers: 1 })]]);
    expect(rankLiveByViewers([a, b], states)).toEqual([a, b]);
  });

  it("drops non-live and unknown states", () => {
    const states = new Map<string, CamState>([
      ["tokyo", state({ status: "blocked", viewers: 80 })],
      ["venice", state({ status: "unknown", viewers: 80 })],
    ]);
    expect(rankLiveByViewers([tokyo, venice, zoo], states)).toEqual([]);
  });

  it("does not reorder the original array", () => {
    const input = [tokyo, venice];
    const snapshot = [...input];
    const states = new Map<string, CamState>([
      ["tokyo", state({ viewers: 1 })],
      ["venice", state({ viewers: 9 })],
    ]);
    rankLiveByViewers(input, states);
    expect(input).toEqual(snapshot);
  });

  it("returns empty for empty input", () => {
    expect(rankLiveByViewers([], new Map())).toEqual([]);
  });
});

describe("pickRandom", () => {
  it("returns the element corresponding to the random number", () => {
    expect(pickRandom(["a", "b", "c"], () => 0)).toBe("a");
    expect(pickRandom(["a", "b", "c"], () => 0.99)).toBe("c");
  });

  it("returns null for an empty array", () => {
    expect(pickRandom([], () => 0)).toBeNull();
  });
});

describe("resolvedVideoId", () => {
  it("uses the state's videoId with top priority", () => {
    expect(resolvedVideoId(cam(), state({ videoId: "zzzzzzzzzzz" }))).toBe("zzzzzzzzzzz");
  });

  it("uses the master's videoId when there is no state", () => {
    expect(resolvedVideoId(cam(), undefined)).toBe("abcdefghijk");
  });

  it("falls back to the master when the state's videoId is empty", () => {
    expect(resolvedVideoId(cam(), state({ videoId: null }))).toBe("abcdefghijk");
  });

  it("null when neither exists", () => {
    const c = cam({ source: { videoId: null, channelId: "UC0000000000000000000000", titleKey: "t" } });
    expect(resolvedVideoId(c, undefined)).toBeNull();
    expect(resolvedVideoId(c, state({ videoId: null }))).toBeNull();
  });
});

describe("resolveEmbedUrl", () => {
  it("uses the state's videoId with top priority", () => {
    expect(resolveEmbedUrl(cam(), state({ videoId: "zzzzzzzzzzz" }))).toContain("/embed/zzzzzzzzzzz");
  });

  it("uses the master's videoId when there is no state", () => {
    expect(resolveEmbedUrl(cam(), undefined)).toContain("/embed/abcdefghijk");
  });

  it("falls back to the channel's live stream when there is no videoId at all", () => {
    const c = cam({ source: { videoId: null, channelId: "UC0000000000000000000000", titleKey: "t" } });
    const url = resolveEmbedUrl(c, undefined);
    expect(url).toContain("/embed/live_stream");
    expect(url).toContain("channel=UC0000000000000000000000");
  });

  it("uses the nocookie domain and does not show related videos", () => {
    const url = resolveEmbedUrl(cam(), undefined);
    expect(url.startsWith("https://www.youtube-nocookie.com/")).toBe(true);
    expect(url).toContain("rel=0");
  });
});

describe("storedState", () => {
  it("keeps the 4 fields the Cron reads", () => {
    const s = state();
    expect(storedState(s)).toEqual(s);
  });

  it("drops the stream title that states written before 2026-10-04 still carry", () => {
    const legacy = { ...state(), title: "とても長い配信タイトル" } as CamState;
    expect(Object.keys(storedState(legacy)).sort()).toEqual([
      "checkedAt",
      "status",
      "videoId",
      "viewers",
    ]);
  });
});

describe("publicStates", () => {
  const state = (over: Partial<CamState> = {}): CamState => ({
    videoId: "vid-a",
    status: "live",
    viewers: 42,
    checkedAt: "2026-08-28T00:50:56.730Z",
    ...over,
  });

  it("narrows to only the 3 fields the browser reads", () => {
    expect(publicStates({ a: state() })).toEqual({
      a: { videoId: "vid-a", status: "live", viewers: 42 },
    });
  });

  it("drops checkedAt (not used for display yet it doubles the payload)", () => {
    const [entry] = Object.values(publicStates({ a: state() }));
    expect(Object.keys(entry).sort()).toEqual(["status", "videoId", "viewers"]);
  });

  it("converts all cameras", () => {
    const out = publicStates({ a: state(), b: state({ status: "offline", viewers: null }) });
    expect(out.b).toEqual({ videoId: "vid-a", status: "offline", viewers: null });
    expect(Object.keys(out)).toHaveLength(2);
  });

  it("does not break when empty", () => {
    expect(publicStates({})).toEqual({});
  });
});
