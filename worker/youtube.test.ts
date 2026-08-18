import {
  MAX_VIDEO_IDS_PER_CALL,
  UNIT_COST,
  createYouTubeClient,
  parseSearchLive,
  parseVideosList,
  searchLiveUrl,
  videosListUrl,
} from "./youtube";

const KEY = "test-key";

describe("videosListUrl", () => {
  it("必要な part と id をまとめて要求する", () => {
    const url = new URL(videosListUrl(KEY, ["a", "b"]));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/videos");
    expect(url.searchParams.get("part")).toBe("snippet,liveStreamingDetails,status");
    expect(url.searchParams.get("id")).toBe("a,b");
    expect(url.searchParams.get("key")).toBe(KEY);
  });
});

describe("searchLiveUrl", () => {
  it("チャンネルのライブ配信だけを 1 件探す", () => {
    const url = new URL(searchLiveUrl(KEY, "UC123"));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/search");
    expect(url.searchParams.get("channelId")).toBe("UC123");
    expect(url.searchParams.get("eventType")).toBe("live");
    expect(url.searchParams.get("type")).toBe("video");
    expect(url.searchParams.get("maxResults")).toBe("1");
  });
});

describe("UNIT_COST", () => {
  it("公表されているクォータ単価と一致する", () => {
    expect(UNIT_COST.videosList).toBe(1);
    expect(UNIT_COST.searchLive).toBe(100);
  });
});

describe("parseVideosList", () => {
  const item = (over: Record<string, unknown> = {}) => ({
    id: "vid1",
    snippet: { title: "Live Cam", liveBroadcastContent: "live" },
    status: { embeddable: true },
    liveStreamingDetails: { concurrentViewers: "1234" },
    ...over,
  });

  it("ライブ中の動画を読む", () => {
    expect(parseVideosList({ items: [item()] })).toEqual([
      { id: "vid1", title: "Live Cam", isLive: true, embeddable: true, viewers: 1234 },
    ]);
  });

  it("配信が終わっているものは isLive=false", () => {
    const parsed = parseVideosList({
      items: [item({ snippet: { title: "T", liveBroadcastContent: "none" } })],
    });
    expect(parsed[0]!.isLive).toBe(false);
  });

  it("埋め込み禁止を読む", () => {
    const parsed = parseVideosList({ items: [item({ status: { embeddable: false } })] });
    expect(parsed[0]!.embeddable).toBe(false);
  });

  it("視聴者数が無ければ null", () => {
    expect(parseVideosList({ items: [item({ liveStreamingDetails: {} })] })[0]!.viewers).toBeNull();
    expect(parseVideosList({ items: [item({ liveStreamingDetails: undefined })] })[0]!.viewers).toBeNull();
  });

  it("数値にならない視聴者数は null として扱う", () => {
    const parsed = parseVideosList({
      items: [item({ liveStreamingDetails: { concurrentViewers: "many" } })],
    });
    expect(parsed[0]!.viewers).toBeNull();
  });

  it("id や snippet を欠く項目は捨てる", () => {
    expect(parseVideosList({ items: [{ snippet: {} }] })).toEqual([]);
    expect(parseVideosList({ items: [{ id: "x" }] })).toEqual([]);
    expect(parseVideosList({ items: [null] })).toEqual([]);
  });

  it("items が無い応答は空配列", () => {
    expect(parseVideosList({})).toEqual([]);
    expect(parseVideosList(null)).toEqual([]);
    expect(parseVideosList({ items: "nope" })).toEqual([]);
  });

  it("title が無ければ空文字にする", () => {
    const parsed = parseVideosList({
      items: [item({ snippet: { liveBroadcastContent: "live" } })],
    });
    expect(parsed[0]!.title).toBe("");
  });

  it("status が無ければ埋め込み可とみなす", () => {
    expect(parseVideosList({ items: [item({ status: undefined })] })[0]!.embeddable).toBe(true);
  });
});

describe("parseSearchLive", () => {
  it("最初のヒットの videoId を返す", () => {
    expect(parseSearchLive({ items: [{ id: { videoId: "abc" } }] })).toBe("abc");
  });

  it("ヒットが無ければ null", () => {
    expect(parseSearchLive({ items: [] })).toBeNull();
    expect(parseSearchLive({})).toBeNull();
    expect(parseSearchLive(null)).toBeNull();
    expect(parseSearchLive({ items: [{ id: {} }] })).toBeNull();
    expect(parseSearchLive({ items: [{}] })).toBeNull();
  });
});

describe("createYouTubeClient", () => {
  const jsonResponse = (body: unknown) =>
    new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

  it("消費ユニットを積算する", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);

    await client.listVideos(["a"]);
    expect(client.unitsUsed).toBe(1);

    await client.findLiveVideoId("UC1");
    expect(client.unitsUsed).toBe(101);
  });

  it("1 回で扱える id 数を超えたら投げる(呼び出し側の分割漏れを潰す)", async () => {
    const client = createYouTubeClient(KEY, (async () => jsonResponse({})) as unknown as typeof fetch);
    const tooMany = Array.from({ length: MAX_VIDEO_IDS_PER_CALL + 1 }, (_, i) => `v${i}`);
    await expect(client.listVideos(tooMany)).rejects.toThrow(/50/);
  });

  it("id が空なら API を叩かない", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    expect(await client.listVideos([])).toEqual([]);
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(client.unitsUsed).toBe(0);
  });

  it("API がエラーを返したら本文付きで投げる", async () => {
    const fetchImpl = async () => new Response("quotaExceeded", { status: 403 });
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await expect(client.listVideos(["a"])).rejects.toThrow(/403.*quotaExceeded/s);
  });

  it("エラーでも消費ユニットは積む(クォータは失敗しても減る)", async () => {
    const fetchImpl = async () => new Response("boom", { status: 500 });
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await expect(client.findLiveVideoId("UC1")).rejects.toThrow();
    expect(client.unitsUsed).toBe(100);
  });
});
