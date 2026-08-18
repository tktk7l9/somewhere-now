import {
  CAM_CATEGORIES,
  collectCamProblems,
  filterCams,
  pickRandom,
  resolveEmbedUrl,
  type Cam,
  type CamState,
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
  title: "Live",
  checkedAt: "2026-08-18T00:00:00.000Z",
  ...over,
});

describe("CAM_CATEGORIES", () => {
  it("重複が無く、全て小文字のスラッグである", () => {
    expect(new Set(CAM_CATEGORIES).size).toBe(CAM_CATEGORIES.length);
    for (const c of CAM_CATEGORIES) expect(c).toMatch(/^[a-z]+$/);
  });
});

describe("collectCamProblems", () => {
  it("正しいデータでは問題を返さない", () => {
    expect(collectCamProblems([cam()])).toEqual([]);
  });

  it("id の重複を検出する", () => {
    const problems = collectCamProblems([cam(), cam({ lat: 1 })]);
    expect(problems.join(" ")).toContain("id が重複");
  });

  it("id の書式違反を検出する", () => {
    expect(collectCamProblems([cam({ id: "Shibuya_Crossing" })]).join(" ")).toContain("id の書式");
  });

  it("範囲外の緯度・経度を検出する", () => {
    expect(collectCamProblems([cam({ lat: 91 })]).join(" ")).toContain("緯度");
    expect(collectCamProblems([cam({ lng: -181 })]).join(" ")).toContain("経度");
  });

  it("NaN の座標を検出する", () => {
    expect(collectCamProblems([cam({ lat: Number.NaN })]).join(" ")).toContain("緯度");
  });

  it("解決できない IANA タイムゾーンを検出する", () => {
    expect(collectCamProblems([cam({ timeZone: "Mars/Olympus" })]).join(" ")).toContain(
      "タイムゾーン",
    );
  });

  it("空の表示名を検出する", () => {
    expect(collectCamProblems([cam({ name: { ja: "", en: "X" } })]).join(" ")).toContain("表示名");
    expect(collectCamProblems([cam({ name: { ja: "X", en: " " } })]).join(" ")).toContain("表示名");
  });

  it("国コードの書式違反を検出する", () => {
    expect(collectCamProblems([cam({ country: "jpn" })]).join(" ")).toContain("国コード");
  });

  it("空の titleKey を検出する", () => {
    expect(
      collectCamProblems([
        cam({ source: { videoId: "abcdefghijk", channelId: "UC0000000000000000000000", titleKey: " " } }),
      ]).join(" "),
    ).toContain("titleKey");
  });

  it("channelId の書式違反を検出する", () => {
    expect(
      collectCamProblems([cam({ source: { videoId: null, channelId: "bogus", titleKey: "t" } })]).join(" "),
    ).toContain("channelId");
  });

  it("videoId の書式違反を検出する（null は許容）", () => {
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

  it("既定では全件返す", () => {
    expect(filterCams(cams, ctx, {})).toEqual(cams);
  });

  it("カテゴリで絞る", () => {
    expect(filterCams(cams, ctx, { categories: ["animal"] })).toEqual([zoo]);
  });

  it("カテゴリが空配列なら絞らない", () => {
    expect(filterCams(cams, ctx, { categories: [] })).toEqual(cams);
  });

  it("ライブのみで絞る", () => {
    expect(filterCams(cams, ctx, { liveOnly: true })).toEqual([tokyo]);
  });

  it("状態が未知のカメラはライブのみで除外される", () => {
    expect(filterCams([cam({ id: "unknown-cam" })], ctx, { liveOnly: true })).toEqual([]);
  });

  it("夜の場所だけで絞る", () => {
    expect(filterCams(cams, ctx, { nightOnly: true })).toEqual([zoo]);
  });

  it("お気に入りだけで絞る", () => {
    expect(filterCams(cams, ctx, { favoritesOnly: true })).toEqual([zoo]);
  });

  it("日英どちらの名前でも検索できる（大小同一視）", () => {
    expect(filterCams(cams, ctx, { query: "shibuya" })).toEqual([tokyo]);
    expect(filterCams(cams, ctx, { query: "動物" })).toEqual([zoo]);
    expect(filterCams(cams, ctx, { query: "  " })).toEqual(cams);
  });

  it("条件を重ねると積になる", () => {
    expect(filterCams(cams, ctx, { categories: ["animal"], liveOnly: true })).toEqual([]);
  });
});

describe("pickRandom", () => {
  it("乱数に応じた要素を返す", () => {
    expect(pickRandom(["a", "b", "c"], () => 0)).toBe("a");
    expect(pickRandom(["a", "b", "c"], () => 0.99)).toBe("c");
  });

  it("空配列では null を返す", () => {
    expect(pickRandom([], () => 0)).toBeNull();
  });
});

describe("resolveEmbedUrl", () => {
  it("状態の videoId を最優先で使う", () => {
    expect(resolveEmbedUrl(cam(), state({ videoId: "zzzzzzzzzzz" }))).toContain("/embed/zzzzzzzzzzz");
  });

  it("状態が無ければマスタの videoId を使う", () => {
    expect(resolveEmbedUrl(cam(), undefined)).toContain("/embed/abcdefghijk");
  });

  it("videoId が一切無ければチャンネルのライブ配信にフォールバックする", () => {
    const c = cam({ source: { videoId: null, channelId: "UC0000000000000000000000", titleKey: "t" } });
    const url = resolveEmbedUrl(c, undefined);
    expect(url).toContain("/embed/live_stream");
    expect(url).toContain("channel=UC0000000000000000000000");
  });

  it("nocookie ドメインを使い、関連動画を出さない", () => {
    const url = resolveEmbedUrl(cam(), undefined);
    expect(url.startsWith("https://www.youtube-nocookie.com/")).toBe(true);
    expect(url).toContain("rel=0");
  });
});
