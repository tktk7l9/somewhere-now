import {
  CHANNEL_LOOKUP_COST,
  UPLOADS_MAX_PAGES,
  nextPageToken,
  MAX_VIDEO_IDS_PER_CALL,
  RESPONSE_FIELDS,
  UNIT_COST,
  createYouTubeClient as createEffectClient,
  parsePlaylistItems,
  parseSearchIds,
  parseVideosList,
  playlistItemsUrl,
  searchLiveUrl,
  uploadsPlaylistId,
  videosListUrl,
} from "./youtube";
import { Effect } from "effect";

const KEY = "test-key";

/**
 * The client returns Effects. These tests are about URLs, paging and unit accounting, so
 * they run each call to a Promise and keep the original assertions. The typed errors
 * themselves are checked in "fails with a typed error" below.
 */
function createYouTubeClient(apiKey: string, fetchImpl: typeof fetch) {
  const client = createEffectClient(apiKey, fetchImpl);
  return {
    get unitsUsed() {
      return client.unitsUsed;
    },
    get callsMade() {
      return client.callsMade;
    },
    listVideos: (ids: readonly string[]) => Effect.runPromise(client.listVideos(ids)),
    listChannelLiveStreamsViaUploads: (
      channelId: string,
      shouldStop?: Parameters<typeof client.listChannelLiveStreamsViaUploads>[1],
    ) => Effect.runPromise(client.listChannelLiveStreamsViaUploads(channelId, shouldStop)),
    listChannelLiveStreamsViaSearch: (channelId: string) =>
      Effect.runPromise(client.listChannelLiveStreamsViaSearch(channelId)),
  };
}

describe("videosListUrl", () => {
  it("requests the needed parts and ids together", () => {
    const url = new URL(videosListUrl(KEY, ["a", "b"]));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/videos");
    expect(url.searchParams.get("part")).toBe("snippet,liveStreamingDetails,status");
    expect(url.searchParams.get("id")).toBe("a,b");
    expect(url.searchParams.get("key")).toBe(KEY);
  });

  it("asks only for the fields parseVideosList reads", () => {
    const url = new URL(videosListUrl(KEY, ["a"]));
    expect(url.searchParams.get("fields")).toBe(RESPONSE_FIELDS.videosList);
  });

  it("parses a response cut down by the field filter without losing anything", () => {
    // Exactly the shape the filter leaves: no description, thumbnails or channel info.
    const filtered = {
      items: [
        {
          id: "v1",
          snippet: { title: "Live A", liveBroadcastContent: "live" },
          liveStreamingDetails: { concurrentViewers: "12" },
          status: { embeddable: false },
        },
      ],
    };
    expect(parseVideosList(filtered)).toEqual([
      { id: "v1", title: "Live A", isLive: true, embeddable: false, viewers: 12 },
    ]);
  });
});

describe("searchLiveUrl", () => {
  it("searches for a channel's live streams in bulk", () => {
    const url = new URL(searchLiveUrl(KEY, "UC123"));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/search");
    expect(url.searchParams.get("channelId")).toBe("UC123");
    expect(url.searchParams.get("eventType")).toBe("live");
    expect(url.searchParams.get("type")).toBe("video");
    // Taking only 1 item grabs a different camera on the same channel.
    expect(url.searchParams.get("maxResults")).toBe("50");
    expect(url.searchParams.get("fields")).toBe(RESPONSE_FIELDS.searchLive);
  });
});

describe("uploadsPlaylistId", () => {
  it("replaces UC in the channel id with UU", () => {
    expect(uploadsPlaylistId("UC6qrG3W8SMK0jior2olka3g")).toBe("UU6qrG3W8SMK0jior2olka3g");
  });
});

describe("playlistItemsUrl", () => {
  it("requests the latest of the playlist in bulk", () => {
    const url = new URL(playlistItemsUrl(KEY, "UU123"));
    expect(url.origin + url.pathname).toBe("https://www.googleapis.com/youtube/v3/playlistItems");
    expect(url.searchParams.get("playlistId")).toBe("UU123");
    expect(url.searchParams.get("maxResults")).toBe("50");
    expect(url.searchParams.get("pageToken")).toBeNull();
    // nextPageToken has to survive the filter, or paging stops after page 1.
    expect(url.searchParams.get("fields")).toBe(RESPONSE_FIELDS.playlistItems);
    expect(RESPONSE_FIELDS.playlistItems).toContain("nextPageToken");
  });

  it("can specify the next page", () => {
    const url = new URL(playlistItemsUrl(KEY, "UU123", "TOKEN"));
    expect(url.searchParams.get("pageToken")).toBe("TOKEN");
  });
});

describe("CHANNEL_LOOKUP_COST", () => {
  it("via uploads is far cheaper than via search even with paging", () => {
    expect(CHANNEL_LOOKUP_COST.viaUploads).toBe(UPLOADS_MAX_PAGES * 2);
    expect(CHANNEL_LOOKUP_COST.viaSearch).toBe(101);
    expect(CHANNEL_LOOKUP_COST.viaUploads).toBeLessThan(CHANNEL_LOOKUP_COST.viaSearch);
  });
});

describe("nextPageToken", () => {
  it("extracts the next page marker", () => {
    expect(nextPageToken({ nextPageToken: "abc" })).toBe("abc");
  });

  it("is undefined when absent", () => {
    expect(nextPageToken({})).toBeUndefined();
    expect(nextPageToken(null)).toBeUndefined();
    expect(nextPageToken({ nextPageToken: 1 })).toBeUndefined();
  });
});

describe("parsePlaylistItems", () => {
  it("extracts video ids in order", () => {
    expect(
      parsePlaylistItems({
        items: [{ contentDetails: { videoId: "a" } }, { contentDetails: { videoId: "b" } }],
      }),
    ).toEqual(["a", "b"]);
  });

  it("discards items of a different shape", () => {
    expect(parsePlaylistItems({ items: [{}, { contentDetails: {} }, null] })).toEqual([]);
    expect(parsePlaylistItems(null)).toEqual([]);
  });
});

describe("parseSearchIds", () => {
  it("extracts video ids in order", () => {
    expect(parseSearchIds({ items: [{ id: { videoId: "x" } }, { id: { videoId: "y" } }] })).toEqual([
      "x",
      "y",
    ]);
  });

  it("discards items of a different shape", () => {
    expect(parseSearchIds({ items: [{ id: {} }, {}, null] })).toEqual([]);
    expect(parseSearchIds(null)).toEqual([]);
  });
});

describe("UNIT_COST", () => {
  it("matches the published quota unit costs", () => {
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

  it("reads a video that is live", () => {
    expect(parseVideosList({ items: [item()] })).toEqual([
      { id: "vid1", title: "Live Cam", isLive: true, embeddable: true, viewers: 1234 },
    ]);
  });

  it("has isLive=false for a stream that has ended", () => {
    const parsed = parseVideosList({
      items: [item({ snippet: { title: "T", liveBroadcastContent: "none" } })],
    });
    expect(parsed[0]!.isLive).toBe(false);
  });

  it("reads an embedding ban", () => {
    const parsed = parseVideosList({ items: [item({ status: { embeddable: false } })] });
    expect(parsed[0]!.embeddable).toBe(false);
  });

  it("is null when there is no viewer count", () => {
    expect(parseVideosList({ items: [item({ liveStreamingDetails: {} })] })[0]!.viewers).toBeNull();
    expect(parseVideosList({ items: [item({ liveStreamingDetails: undefined })] })[0]!.viewers).toBeNull();
  });

  it("treats a viewer count that is not a number as null", () => {
    const parsed = parseVideosList({
      items: [item({ liveStreamingDetails: { concurrentViewers: "many" } })],
    });
    expect(parsed[0]!.viewers).toBeNull();
  });

  it("discards items lacking id or snippet", () => {
    expect(parseVideosList({ items: [{ snippet: {} }] })).toEqual([]);
    expect(parseVideosList({ items: [{ id: "x" }] })).toEqual([]);
    expect(parseVideosList({ items: [null] })).toEqual([]);
  });

  it("is an empty array for a response without items", () => {
    expect(parseVideosList({})).toEqual([]);
    expect(parseVideosList(null)).toEqual([]);
    expect(parseVideosList({ items: "nope" })).toEqual([]);
  });

  it("uses an empty string when there is no title", () => {
    const parsed = parseVideosList({
      items: [item({ snippet: { liveBroadcastContent: "live" } })],
    });
    expect(parsed[0]!.title).toBe("");
  });

  it("treats it as embeddable when there is no status", () => {
    expect(parseVideosList({ items: [item({ status: undefined })] })[0]!.embeddable).toBe(true);
  });
});

describe("createYouTubeClient", () => {
  const jsonResponse = (body: unknown) =>
    new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

  it("accumulates the units consumed", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);

    await client.listVideos(["a"]);
    expect(client.unitsUsed).toBe(1);

    // With no hits videos.list is not called, so only the playlist share is counted.
    await client.listChannelLiveStreamsViaUploads("UC1");
    expect(client.unitsUsed).toBe(2);

    await client.listChannelLiveStreamsViaSearch("UC1");
    expect(client.unitsUsed).toBe(102);
  });

  it("counts the number of calls separately from units", async () => {
    // What counts against the subrequest limit is the number of calls, not units, and
    // the two are not proportional (a search is 100 units in 1 call).
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);

    await client.listVideos(["a"]);
    expect(client.callsMade).toBe(1);

    await client.listChannelLiveStreamsViaSearch("UC1");
    expect(client.callsMade).toBe(2);
    expect(client.unitsUsed).toBe(101);
  });

  it("returns only those that are live via uploads", async () => {
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
    // There is no next page, so it stops at 1 page = playlistItems 1 + videos 1.
    expect(client.unitsUsed).toBe(2);
  });

  it("pages forward to pick up long-running streams, which sink to later pages", async () => {
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

  it("stops paging once the targets are all found", async () => {
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

  it("cuts paging off at the limit (does not walk endlessly)", async () => {
    let page = 0;
    const fetchImpl = async (url: string) => {
      if (url.includes("/playlistItems")) {
        page += 1;
        // A state where there is always a next page.
        return jsonResponse({ items: [], nextPageToken: `t${page}` });
      }
      return jsonResponse({ items: [] });
    };
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await client.listChannelLiveStreamsViaUploads("UC1");
    expect(page).toBe(UPLOADS_MAX_PAGES);
  });

  it("returns only those that are live via search too", async () => {
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

  it("splits the query for more than 50 videos", async () => {
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

  it("throws when over the id count for 1 call (catches a caller that forgot to split)", async () => {
    const client = createYouTubeClient(KEY, (async () => jsonResponse({})) as unknown as typeof fetch);
    const tooMany = Array.from({ length: MAX_VIDEO_IDS_PER_CALL + 1 }, (_, i) => `v${i}`);
    await expect(client.listVideos(tooMany)).rejects.toThrow(/50/);
  });

  it("does not call the API when ids is empty", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ items: [] }));
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    expect(await client.listVideos([])).toEqual([]);
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(client.unitsUsed).toBe(0);
  });

  it("throws with the body when the API returns an error", async () => {
    const fetchImpl = async () => new Response("quotaExceeded", { status: 403 });
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await expect(client.listVideos(["a"])).rejects.toThrow(/403.*quotaExceeded/s);
  });

  it("fails with a typed error that keeps the status and body", async () => {
    const fetchImpl = async () => new Response("quotaExceeded", { status: 403 });
    const client = createEffectClient(KEY, fetchImpl as unknown as typeof fetch);
    const error = await Effect.runPromise(Effect.flip(client.listVideos(["a"])));
    expect(error).toMatchObject({ _tag: "YouTubeApiError", status: 403, body: "quotaExceeded" });
  });

  it("fails with a network error when fetch itself throws", async () => {
    const fetchImpl = async () => {
      throw new Error("Too many subrequests");
    };
    const client = createEffectClient(KEY, fetchImpl as unknown as typeof fetch);
    const error = await Effect.runPromise(Effect.flip(client.listChannelLiveStreamsViaSearch("UC1")));
    expect(error).toMatchObject({ _tag: "YouTubeNetworkError" });
    expect(error.message).toBe("Too many subrequests");
    expect(client.unitsUsed).toBe(UNIT_COST.searchLive);
  });

  it("describes a non-Error rejection from fetch as text", async () => {
    const fetchImpl = () => Promise.reject("offline");
    const client = createEffectClient(KEY, fetchImpl as unknown as typeof fetch);
    const error = await Effect.runPromise(Effect.flip(client.listVideos(["a"])));
    expect(error.message).toBe("offline");
  });

  it("fails with a network error when the body is not JSON", async () => {
    const fetchImpl = async () => new Response("<html>", { status: 200 });
    const client = createEffectClient(KEY, fetchImpl as unknown as typeof fetch);
    const error = await Effect.runPromise(Effect.flip(client.listVideos(["a"])));
    expect(error._tag).toBe("YouTubeNetworkError");
  });

  it("fails with a network error when the error body cannot be read", async () => {
    const res = new Response("x", { status: 500 });
    vi.spyOn(res, "text").mockRejectedValue(new Error("stream reset"));
    const client = createEffectClient(KEY, (async () => res) as unknown as typeof fetch);
    const error = await Effect.runPromise(Effect.flip(client.listVideos(["a"])));
    expect(error.message).toBe("stream reset");
  });

  it("adds up units consumed even on error (quota is consumed even on failure)", async () => {
    const fetchImpl = async () => new Response("boom", { status: 500 });
    const client = createYouTubeClient(KEY, fetchImpl as unknown as typeof fetch);
    await expect(client.listChannelLiveStreamsViaSearch("UC1")).rejects.toThrow();
    expect(client.unitsUsed).toBe(UNIT_COST.searchLive);
  });
});
