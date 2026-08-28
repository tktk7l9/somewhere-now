import {
  CHANNEL_LOOKUP_COST,
  UPLOADS_MAX_PAGES,
  nextPageToken,
  MAX_VIDEO_IDS_PER_CALL,
  UNIT_COST,
  createYouTubeClient,
  parsePlaylistItems,
  parseSearchIds,
  parseVideosList,
  playlistItemsUrl,
  searchLiveUrl,
  uploadsPlaylistId,
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
  it("チャンネルのライブ配信をまとめて探す", () => {
    const url = new URL(searchLiveUrl(KEY, "UC123"));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/search");
    expect(url.searchParams.get("channelId")).toBe("UC123");
    expect(url.searchParams.get("eventType")).toBe("live");
    expect(url.searchParams.get("type")).toBe("video");
    // 1 件だけ取ると、同じチャンネルの別のカメラを掴んでしまう。
    expect(url.searchParams.get("maxResults")).toBe("50");
  });
});

describe("uploadsPlaylistId", () => {
  it("チャンネル id の UC を UU に置き換える", () => {
    expect(uploadsPlaylistId("UC6qrG3W8SMK0jior2olka3g")).toBe("UU6qrG3W8SMK0jior2olka3g");
  });
});

describe("playlistItemsUrl", () => {
  it("プレイリストの直近をまとめて要求する", () => {
    const url = new URL(playlistItemsUrl(KEY, "UU123"));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/playlistItems");
    expect(url.searchParams.get("playlistId")).toBe("UU123");
    expect(url.searchParams.get("maxResults")).toBe("50");
    expect(url.searchParams.get("pageToken")).toBeNull();
  });

  it("次ページを指定できる", () => {
    const url = new URL(playlistItemsUrl(KEY, "UU123", "TOKEN"));
    expect(url.searchParams.get("pageToken")).toBe("TOKEN");
  });
});

describe("CHANNEL_LOOKUP_COST", () => {
  it("uploads 経由はページ送りしても検索経由よりずっと安い", () => {
    expect(CHANNEL_LOOKUP_COST.viaUploads).toBe(UPLOADS_MAX_PAGES * 2);
    expect(CHANNEL_LOOKUP_COST.viaSearch).toBe(101);
    expect(CHANNEL_LOOKUP_COST.viaUploads).toBeLessThan(CHANNEL_LOOKUP_COST.viaSearch);
  });
});

describe("nextPageToken", () => {
  it("次ページの目印を取り出す", () => {
    expect(nextPageToken({ nextPageToken: "abc" })).toBe("abc");
  });

  it("無ければ undefined", () => {
    expect(nextPageToken({})).toBeUndefined();
    expect(nextPageToken(null)).toBeUndefined();
    expect(nextPageToken({ nextPageToken: 1 })).toBeUndefined();
  });
});

describe("parsePlaylistItems", () => {
  it("動画 id を順に取り出す", () => {
    expect(
      parsePlaylistItems({
        items: [{ contentDetails: { videoId: "a" } }, { contentDetails: { videoId: "b" } }],
      }),
    ).toEqual(["a", "b"]);
  });

  it("形の違う項目は捨てる", () => {
    expect(parsePlaylistItems({ items: [{}, { contentDetails: {} }, null] })).toEqual([]);
    expect(parsePlaylistItems(null)).toEqual([]);
  });
});

describe("parseSearchIds", () => {
  it("動画 id を順に取り出す", () => {
    expect(parseSearchIds({ items: [{ id: { videoId: "x" } }, { id: { videoId: "y" } }] })).toEqual([
      "x",
      "y",
    ]);
  });

  it("形の違う項目は捨てる", () => {
    expect(parseSearchIds({ items: [{ id: {} }, {}, null] })).toEqual([]);
    expect(parseSearchIds(null)).toEqual([]);
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

describe("createYouTubeClient", () => {
  const jsonResponse = (body: unknown) =>
    new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

  it("消費ユニットを積算する", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);

    await client.listVideos(["a"]);
    expect(client.unitsUsed).toBe(1);

    // ヒットが無ければ videos.list は呼ばないので、プレイリスト分だけ。
    await client.listChannelLiveStreamsViaUploads("UC1");
    expect(client.unitsUsed).toBe(2);

    await client.listChannelLiveStreamsViaSearch("UC1");
    expect(client.unitsUsed).toBe(102);
  });

  it("呼び出し回数を unit とは別に数える", async () => {
    // サブリクエスト上限に効くのは unit ではなく呼び出しの回数で、
    // 両者は比例しない(検索は 1 回の呼び出しで 100 unit)。
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);

    await client.listVideos(["a"]);
    expect(client.callsMade).toBe(1);

    await client.listChannelLiveStreamsViaSearch("UC1");
    expect(client.callsMade).toBe(2);
    expect(client.unitsUsed).toBe(101);
  });

  it("uploads 経由でライブ中のものだけを返す", async () => {
    const fetchImpl = async (url: string) => {
      if (url.includes("/playlistItems")) {
        return jsonResponse({
          items: [{ contentDetails: { videoId: "live1" } }, { contentDetails: { videoId: "old1" } }],
        });
      }
      return jsonResponse({
        items: [
          { id: "live1", snippet: { title: "Live", liveBroadcastContent: "live" } },
          { id: "old1", snippet: { title: "Old", liveBroadcastContent: "none" } },
        ],
      });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    const streams = await client.listChannelLiveStreamsViaUploads("UC1");
    expect(streams.map((s) => s.id)).toEqual(["live1"]);
    // 次ページが無いので 1 ページで打ち切り = playlistItems 1 + videos 1。
    expect(client.unitsUsed).toBe(2);
  });

  it("長く続いている配信は後ろのページに沈むので、ページを送って拾う", async () => {
    let page = 0;
    const fetchImpl = async (url: string) => {
      if (url.includes("/playlistItems")) {
        page += 1;
        return jsonResponse({
          items: [{ contentDetails: { videoId: `v${page}` } }],
          ...(page < 2 ? { nextPageToken: `t${page}` } : {}),
        });
      }
      const ids = decodeURIComponent(/id=([^&]+)/.exec(url)![1]!).split(",");
      return jsonResponse({
        items: ids.map((v) => ({
          id: v,
          snippet: { title: v, liveBroadcastContent: v === "v2" ? "live" : "none" },
        })),
      });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    const streams = await client.listChannelLiveStreamsViaUploads("UC1");
    expect(streams.map((s) => s.id)).toEqual(["v2"]);
    expect(page).toBe(2);
  });

  it("目当てが揃ったらページ送りをやめる", async () => {
    let page = 0;
    const fetchImpl = async (url: string) => {
      if (url.includes("/playlistItems")) {
        page += 1;
        return jsonResponse({
          items: [{ contentDetails: { videoId: `v${page}` } }],
          nextPageToken: `t${page}`,
        });
      }
      const id = /id=([^&]+)/.exec(url)![1]!;
      return jsonResponse({
        items: [{ id, snippet: { title: id, liveBroadcastContent: "live" } }],
      });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    const streams = await client.listChannelLiveStreamsViaUploads("UC1", (live) => live.length >= 2);
    expect(page).toBe(2);
    expect(streams).toHaveLength(2);
  });

  it("ページ送りは上限で打ち切る(際限なく辿らない)", async () => {
    let page = 0;
    const fetchImpl = async (url: string) => {
      if (url.includes("/playlistItems")) {
        page += 1;
        // ずっと次ページがある状態。
        return jsonResponse({ items: [], nextPageToken: `t${page}` });
      }
      return jsonResponse({ items: [] });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await client.listChannelLiveStreamsViaUploads("UC1");
    expect(page).toBe(UPLOADS_MAX_PAGES);
  });

  it("検索経由でもライブ中のものだけを返す", async () => {
    const fetchImpl = async (url: string) => {
      if (url.includes("/search")) return jsonResponse({ items: [{ id: { videoId: "s1" } }] });
      return jsonResponse({
        items: [{ id: "s1", snippet: { title: "S", liveBroadcastContent: "live" } }],
      });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    const streams = await client.listChannelLiveStreamsViaSearch("UC1");
    expect(streams.map((s) => s.id)).toEqual(["s1"]);
    expect(client.unitsUsed).toBe(CHANNEL_LOOKUP_COST.viaSearch);
  });

  it("50 件を超える動画は分割して問い合わせる", async () => {
    const many = Array.from({ length: 60 }, (_, i) => `v${i}`);
    let videoCalls = 0;
    const fetchImpl = async (url: string) => {
      if (url.includes("/playlistItems")) {
        return jsonResponse({ items: many.map((v) => ({ contentDetails: { videoId: v } })) });
      }
      videoCalls += 1;
      return jsonResponse({ items: [] });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await client.listChannelLiveStreamsViaUploads("UC1");
    expect(videoCalls).toBe(2);
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
    await expect(client.listChannelLiveStreamsViaSearch("UC1")).rejects.toThrow();
    expect(client.unitsUsed).toBe(UNIT_COST.searchLive);
  });
});
