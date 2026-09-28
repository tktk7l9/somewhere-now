import type { Cam, CamState } from "../src/domain/cams";
import type { YouTubeClient, YouTubeVideo } from "./youtube";
import { MAX_CALLS_PER_CHANNEL, MAX_VIDEO_IDS_PER_CALL } from "./youtube";
import {
  DAILY_UNIT_BUDGET,
  MAX_LIST_CALLS_PER_SWEEP,
  MAX_CALLS_PER_REDISCOVER,
  RECHECK_INTERVAL_MS,
  ROLE_UNIT_BUDGET,
  isDue,
  ledgerForDay,
  pruneOrphans,
  rediscover,
  remainingUnits,
  sweepLiveness,
  utcDay,
} from "./refresh";

const NOW = new Date("2026-08-18T12:00:00Z");

const cam = (id: string, over: Partial<Cam> = {}): Cam => ({
  id,
  name: { ja: id, en: id },
  lat: 0,
  lng: 0,
  timeZone: "UTC",
  category: "city",
  country: "JP",
  source: { videoId: `vid-${id}`, channelId: `UC${id.padEnd(22, "0")}`, titleKey: `title-${id}` },
  ...over,
});

const video = (over: Partial<YouTubeVideo> & { id: string }): YouTubeVideo => ({
  title: "T",
  isLive: true,
  embeddable: true,
  viewers: 10,
  ...over,
});

/**
 * Fake client.
 *   videos      ... videos that listVideos returns
 *   uploads     ... live streams visible via the uploads playlist (per channel)
 *   search      ... live streams visible via search (same as uploads when omitted)
 */
function fakeClient(opts: {
  videos?: YouTubeVideo[];
  uploads?: Record<string, YouTubeVideo[]>;
  search?: Record<string, YouTubeVideo[]>;
  failUploads?: boolean;
  failSearch?: boolean;
}): YouTubeClient & {
  listCalls: string[][];
  uploadCalls: string[];
  searchCalls: string[];
  stopChecks: (boolean | null)[];
} {
  let unitsUsed = 0;
  let callsMade = 0;
  const byId = new Map((opts.videos ?? []).map((v) => [v.id, v]));
  const listCalls: string[][] = [];
  const uploadCalls: string[] = [];
  const searchCalls: string[] = [];
  const stopChecks: (boolean | null)[] = [];

  return {
    listCalls,
    uploadCalls,
    searchCalls,
    stopChecks,
    get unitsUsed() {
      return unitsUsed;
    },
    get callsMade() {
      return callsMade;
    },
    async listVideos(ids) {
      listCalls.push([...ids]);
      if (ids.length === 0) return [];
      unitsUsed += 1;
      callsMade += 1;
      return ids.map((id) => byId.get(id)).filter((v): v is YouTubeVideo => v !== undefined);
    },
    async listChannelLiveStreamsViaUploads(channelId, shouldStop) {
      uploadCalls.push(channelId);
      unitsUsed += 2;
      callsMade += 2;
      if (opts.failUploads === true) throw new Error("boom");
      const live = opts.uploads?.[channelId] ?? [];
      // Lets the tests also confirm that the stop check gets called.
      stopChecks.push(shouldStop?.(live) ?? null);
      return live;
    },
    async listChannelLiveStreamsViaSearch(channelId) {
      searchCalls.push(channelId);
      unitsUsed += 101;
      callsMade += 2;
      if (opts.failSearch === true) throw new Error("boom");
      return opts.search?.[channelId] ?? opts.uploads?.[channelId] ?? [];
    },
  };
}

describe("utcDay", () => {
  it("returns the date in UTC", () => {
    expect(utcDay(new Date("2026-08-18T23:30:00Z"))).toBe("2026-08-18");
    expect(utcDay(new Date("2026-08-19T00:30:00Z"))).toBe("2026-08-19");
  });
});

describe("ledgerForDay", () => {
  it("starts from zero for the day when there is no record", () => {
    expect(ledgerForDay(null, NOW)).toEqual({ day: "2026-08-18", used: 0 });
  });

  it("uses a record from the same day as is", () => {
    const stored = { day: "2026-08-18", used: 500 };
    expect(ledgerForDay(stored, NOW)).toEqual(stored);
  });

  it("resets when the day has changed", () => {
    expect(ledgerForDay({ day: "2026-08-17", used: 9999 }, NOW)).toEqual({
      day: "2026-08-18",
      used: 0,
    });
  });
});

describe("remainingUnits", () => {
  it("subtracts the used amount from the budget", () => {
    expect(remainingUnits({ day: "d", used: 1000 })).toBe(DAILY_UNIT_BUDGET - 1000);
  });

  it("returns 0 instead of a negative when used up", () => {
    expect(remainingUnits({ day: "d", used: DAILY_UNIT_BUDGET + 500 })).toBe(0);
  });
});

describe("sweepLiveness", () => {
  it("records a stream that is live as live", async () => {
    const client = fakeClient({ videos: [video({ id: "vid-a", viewers: 42, title: "Venice" })] });
    const { states, unitsUsed } = await sweepLiveness([cam("a")], new Map(), client, NOW);

    expect(states.get("a")).toEqual({
      videoId: "vid-a",
      status: "live",
      viewers: 42,
      title: "Venice",
      checkedAt: NOW.toISOString(),
    });
    expect(unitsUsed).toBe(1);
  });

  it("is offline when the stream has ended", async () => {
    const client = fakeClient({ videos: [video({ id: "vid-a", isLive: false })] });
    const { states } = await sweepLiveness([cam("a")], new Map(), client, NOW);
    expect(states.get("a")!.status).toBe("offline");
  });

  it("is offline when the video itself is gone", async () => {
    const client = fakeClient({ videos: [] });
    const { states } = await sweepLiveness([cam("a")], new Map(), client, NOW);
    expect(states.get("a")!.status).toBe("offline");
    expect(states.get("a")!.viewers).toBeNull();
  });

  it("distinguishes an embedding ban as blocked", async () => {
    const client = fakeClient({ videos: [video({ id: "vid-a", embeddable: false })] });
    const { states } = await sweepLiveness([cam("a")], new Map(), client, NOW);
    expect(states.get("a")!.status).toBe("blocked");
  });

  it("prefers the videoId of the existing state over the master", async () => {
    const prior = new Map<string, CamState>([
      ["a", { videoId: "vid-new", status: "live", viewers: null, title: null, checkedAt: "old" }],
    ]);
    const client = fakeClient({ videos: [video({ id: "vid-new" })] });
    const { states } = await sweepLiveness([cam("a")], prior, client, NOW);
    expect(states.get("a")!.videoId).toBe("vid-new");
    expect(client.listCalls[0]).toEqual(["vid-new"]);
  });

  it("does not touch cameras without a videoId (the job of rediscovery)", async () => {
    const noVideo = cam("a", { source: { videoId: null, channelId: "UC1", titleKey: "t" } });
    const client = fakeClient({ videos: [] });
    const { states, unitsUsed } = await sweepLiveness([noVideo], new Map(), client, NOW);
    expect(states.size).toBe(0);
    expect(unitsUsed).toBe(0);
  });

  it("splits into groups of 50 items to send", async () => {
    const cams = Array.from({ length: 51 }, (_, i) => cam(`c${i}`));
    const client = fakeClient({ videos: [] });
    const { unitsUsed } = await sweepLiveness(cams, new Map(), client, NOW);
    expect(client.listCalls.map((c) => c.length)).toEqual([50, 1]);
    expect(unitsUsed).toBe(2);
  });

  it("queries cameras sharing the same videoId together as 1 item", async () => {
    const shared = { videoId: "vid-same", channelId: "UC1", titleKey: "shared" };
    const cams = [cam("a", { source: shared }), cam("b", { source: shared })];
    const client = fakeClient({ videos: [video({ id: "vid-same" })] });
    const { states } = await sweepLiveness(cams, new Map(), client, NOW);
    expect(client.listCalls[0]).toEqual(["vid-same"]);
    expect(states.get("a")!.status).toBe("live");
    expect(states.get("b")!.status).toBe("live");
  });

  it("stops midway and leaves the reason when the budget is short", async () => {
    const cams = Array.from({ length: 51 }, (_, i) => cam(`c${i}`));
    const client = fakeClient({ videos: [] });
    const { unitsUsed, notes } = await sweepLiveness(cams, new Map(), client, NOW, 1);
    expect(unitsUsed).toBe(1);
    expect(notes.join(" ")).toContain("予算");
  });

  it("never calls even once when the budget is 0", async () => {
    const client = fakeClient({ videos: [] });
    const { unitsUsed } = await sweepLiveness([cam("a")], new Map(), client, NOW, 0);
    expect(unitsUsed).toBe(0);
    expect(client.listCalls).toEqual([]);
  });
});

describe("rediscover", () => {
  const CH = "UCearthcam00000000000000";
  const offline = (checkedAt: string): CamState => ({
    videoId: "vid-dead",
    status: "offline",
    viewers: null,
    title: null,
    checkedAt,
  });
  const onChannel = (id: string, titleKey: string): Cam =>
    cam(id, { source: { videoId: null, channelId: CH, titleKey } });

  it("reselects the stream of that camera by the stream title", async () => {
    const times = onChannel("times-square", "EarthCam Live: Times Square North 4K");
    const client = fakeClient({
      uploads: {
        [CH]: [
          video({ id: "vid-wrigley", title: "EarthCam Live: Wrigley Field" }),
          video({ id: "vid-times", title: "EarthCam Live: Times Square North 4K", viewers: 88 }),
        ],
      },
    });
    const { states, unitsUsed } = await rediscover([times], new Map(), client, NOW, {
      maxChannels: 1,
    });

    expect(states.get("times-square")).toEqual({
      videoId: "vid-times",
      status: "live",
      viewers: 88,
      title: "EarthCam Live: Times Square North 4K",
      checkedAt: NOW.toISOString(),
    });
    expect(unitsUsed).toBe(2);
  });

  it("does not touch cameras the liveness sweep has not touched yet", async () => {
    // No state = never checked by the liveness sweep. The recorded videoId is likely
    // still alive, so the unreliable rediscovery must not mark it offline.
    const fresh = cam("fresh", { source: { videoId: "vid-fresh", channelId: CH, titleKey: "F" } });
    const client = fakeClient({});
    const { states, unitsUsed } = await rediscover([fresh], new Map(), client, NOW, {
      maxChannels: 1,
    });
    expect(unitsUsed).toBe(0);
    expect(states.size).toBe(0);
  });

  it("goes looking for cameras without a videoId even when there is no state", async () => {
    // The liveness sweep skips cameras without a videoId, so unless this side acts it
    // is never resolved.
    const c = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({ uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] } });
    const { states } = await rediscover([c], new Map(), client, NOW, { maxChannels: 1 });
    expect(states.get("a")!.videoId).toBe("va");
  });

  it("does not erase the recorded videoId even when it cannot be told apart", async () => {
    const c = cam("a", { source: { videoId: "vid-source", channelId: CH, titleKey: "A" } });
    const prior = new Map([
      [
        "a",
        {
          videoId: "vid-rotated",
          status: "offline" as const,
          viewers: null,
          title: null,
          checkedAt: "2026-08-17T00:00:00Z",
        },
      ],
    ]);
    const client = fakeClient({ uploads: { [CH]: [video({ id: "vz", title: "Z" })] } });
    const { states } = await rediscover([c], prior, client, NOW, { maxChannels: 1 });
    // The rotated id left in KV is handed to the next liveness sweep in preference to the master.
    expect(states.get("a")).toMatchObject({ status: "offline", videoId: "vid-rotated" });
  });

  it("keeps the master videoId when the state videoId is empty", async () => {
    const c = cam("a", { source: { videoId: "vid-source", channelId: CH, titleKey: "A" } });
    const prior = new Map([
      [
        "a",
        {
          videoId: null,
          status: "offline" as const,
          viewers: null,
          title: null,
          checkedAt: "2026-08-17T00:00:00Z",
        },
      ],
    ]);
    const client = fakeClient({ uploads: { [CH]: [video({ id: "vz", title: "Z" })] } });
    const { states } = await rediscover([c], prior, client, NOW, { maxChannels: 1 });
    expect(states.get("a")).toMatchObject({ status: "offline", videoId: "vid-source" });
  });

  it("does not grab another stream on the same channel when it cannot be told apart", async () => {
    // This is the worst failure. The Times Square pin must not show another city.
    const times = onChannel("times-square", "EarthCam Live: Times Square North 4K");
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "vid-seaside", title: "EarthCam Live: Seaside Heights, NJ" })] },
    });
    const { states, notes } = await rediscover([times], new Map(), client, NOW, { maxChannels: 1 });

    expect(states.get("times-square")).toMatchObject({ status: "offline", videoId: null });
    expect(notes.join(" ")).toContain("見分けがつかず");
  });

  it("handles cameras on the same channel together in 1 query", async () => {
    const cams = [
      onChannel("a", "EarthCam Live: A"),
      onChannel("b", "EarthCam Live: B"),
      onChannel("c", "EarthCam Live: C"),
    ];
    const client = fakeClient({
      uploads: {
        [CH]: [
          video({ id: "va", title: "EarthCam Live: A" }),
          video({ id: "vb", title: "EarthCam Live: B" }),
          video({ id: "vc", title: "EarthCam Live: C" }),
        ],
      },
    });
    const { states, unitsUsed } = await rediscover(cams, new Map(), client, NOW, { maxChannels: 1 });

    expect(client.uploadCalls).toEqual([CH]);
    expect([...states.values()].map((s) => s.videoId)).toEqual(["va", "vb", "vc"]);
    // Even with 3 cameras, the 2 units for 1 channel are enough.
    expect(unitsUsed).toBe(2);
  });

  it("falls back to the search that can be exhaustive when uploads misses", async () => {
    const cam1 = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "vz", title: "EarthCam Live: Z" })] },
      search: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] },
    });
    const { states, unitsUsed } = await rediscover([cam1], new Map(), client, NOW, {
      maxChannels: 1,
    });

    expect(client.searchCalls).toEqual([CH]);
    expect(states.get("a")!.videoId).toBe("va");
    expect(unitsUsed).toBe(2 + 101);
  });

  it("does not use the expensive search when uploads finds everything", async () => {
    const cam1 = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({ uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] } });
    await rediscover([cam1], new Map(), client, NOW, { maxChannels: 1 });
    expect(client.searchCalls).toEqual([]);
    // The targets are all found, so it signals that further pages are not needed.
    expect(client.stopChecks).toEqual([true]);
  });

  it("signals to keep paging when the targets are not all found", async () => {
    const cams = [onChannel("a", "EarthCam Live: A"), onChannel("b", "EarthCam Live: B")];
    const client = fakeClient({ uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] } });
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 1 });
    expect(client.stopChecks).toEqual([false]);
  });

  it("settles on the uploads result when there is no room to fall back to search", async () => {
    const cam1 = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "vz", title: "EarthCam Live: Z" })] },
      search: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] },
    });
    const { states, unitsUsed } = await rediscover([cam1], new Map(), client, NOW, {
      maxChannels: 1,
      unitBudget: 50,
    });

    expect(client.searchCalls).toEqual([]);
    expect(states.get("a")!.status).toBe("offline");
    expect(unitsUsed).toBe(2);
  });

  it("uses the expensive search path only up to the count rationed for 1 run", async () => {
    const chA = "UCaaaa00000000000000000";
    const chB = "UCbbbb00000000000000000";
    const cams = [
      cam("a", { source: { videoId: null, channelId: chA, titleKey: "A" } }),
      cam("b", { source: { videoId: null, channelId: chB, titleKey: "B" } }),
    ];
    // Both channels miss with uploads.
    const client = fakeClient({
      uploads: { [chA]: [video({ id: "vz", title: "Z" })], [chB]: [video({ id: "vy", title: "Y" })] },
      search: { [chA]: [video({ id: "va", title: "A" })], [chB]: [video({ id: "vb", title: "B" })] },
    });
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 2, maxSearches: 1 });

    expect(client.uploadCalls).toHaveLength(2);
    expect(client.searchCalls).toHaveLength(1);
  });

  it("marks a stream with an embedding ban as blocked", async () => {
    const cam1 = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A", embeddable: false })] },
    });
    const { states } = await rediscover([cam1], new Map(), client, NOW, { maxChannels: 1 });
    expect(states.get("a")!.status).toBe("blocked");
  });

  it("does not target cameras that are live", async () => {
    const live = new Map<string, CamState>([
      ["a", { videoId: "v", status: "live", viewers: 1, title: "t", checkedAt: "x" }],
    ]);
    const client = fakeClient({});
    const { unitsUsed } = await rediscover([onChannel("a", "A")], live, client, NOW, {
      maxChannels: 3,
    });
    expect(unitsUsed).toBe(0);
    expect(client.uploadCalls).toEqual([]);
  });

  it("starts with the channel holding the camera left alone the longest", async () => {
    const fresh = cam("fresh", { source: { videoId: null, channelId: "UCfresh0000000000000000", titleKey: "F" } });
    const stale = cam("stale", { source: { videoId: null, channelId: "UCstale0000000000000000", titleKey: "S" } });
    const prior = new Map([
      ["fresh", offline("2026-08-18T00:00:00Z")],
      ["stale", offline("2026-08-01T00:00:00Z")],
    ]);
    const client = fakeClient({});
    await rediscover([fresh, stale], prior, client, NOW, { maxChannels: 1 });
    expect(client.uploadCalls).toEqual([stale.source.channelId]);
  });

  it("picks up a channel without a state with top priority", async () => {
    const known = cam("known", { source: { videoId: null, channelId: "UCknown0000000000000000", titleKey: "K" } });
    const never = cam("never", { source: { videoId: null, channelId: "UCnever0000000000000000", titleKey: "N" } });
    const prior = new Map([["known", offline("2026-08-17T00:00:00Z")]]);
    const client = fakeClient({});
    await rediscover([known, never], prior, client, NOW, { maxChannels: 1 });
    expect(client.uploadCalls).toEqual([never.source.channelId]);
  });

  it("does not break when channels of the same staleness line up", async () => {
    const a = cam("a", { source: { videoId: null, channelId: "UCaaaa00000000000000000", titleKey: "A" } });
    const b = cam("b", { source: { videoId: null, channelId: "UCbbbb00000000000000000", titleKey: "B" } });
    const same = "2026-08-17T00:00:00Z";
    const prior = new Map([["a", offline(same)], ["b", offline(same)]]);
    const client = fakeClient({});
    await rediscover([a, b], prior, client, NOW, { maxChannels: 2 });
    expect(client.uploadCalls).toHaveLength(2);
  });

  it("treats the oldest camera within a channel as the staleness of that channel", async () => {
    const old = onChannel("old", "O");
    const recent = onChannel("recent", "R");
    const other = cam("other", {
      source: { videoId: null, channelId: "UCother0000000000000000", titleKey: "X" },
    });
    const prior = new Map([
      ["recent", offline("2026-08-18T00:00:00Z")],
      ["old", offline("2026-08-01T00:00:00Z")],
      ["other", offline("2026-08-10T00:00:00Z")],
    ]);
    // Regardless of order, the oldest camera on that channel is the reference.
    for (const order of [[recent, old, other], [old, recent, other]]) {
      const client = fakeClient({});
      await rediscover(order, prior, client, NOW, { maxChannels: 1 });
      // CH is chosen first as the channel holding old (08-01), not recent (08-18).
      expect(client.uploadCalls).toEqual([CH]);
    }
  });

  it("holds the count down with maxChannels", async () => {
    const cams = ["x", "y", "z"].map((k) =>
      cam(k, { source: { videoId: null, channelId: `UC${k.repeat(22)}`, titleKey: k } }),
    );
    const client = fakeClient({});
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 2 });
    expect(client.uploadCalls).toHaveLength(2);
  });

  it("searches for none and leaves the reason when the budget is short", async () => {
    const client = fakeClient({});
    const { unitsUsed, notes } = await rediscover([onChannel("a", "A")], new Map(), client, NOW, {
      maxChannels: 3,
      unitBudget: 1,
    });
    expect(unitsUsed).toBe(0);
    expect(notes.join(" ")).toContain("予算");
  });

  it("does not fail everything on 1 channel's failure, and marks that camera unknown", async () => {
    const client = fakeClient({ failUploads: true });
    const { states, notes } = await rediscover([onChannel("a", "A")], new Map(), client, NOW, {
      maxChannels: 1,
    });
    expect(states.get("a")!.status).toBe("unknown");
    expect(notes.join(" ")).toContain("失敗");
  });

  it("does not erase the recorded videoId even when rediscovery fails", async () => {
    const c = cam("a", { source: { videoId: "vid-source", channelId: CH, titleKey: "A" } });
    const prior = new Map([
      [
        "a",
        {
          videoId: "vid-rotated",
          status: "offline" as const,
          viewers: null,
          title: "was",
          checkedAt: "old",
        },
      ],
    ]);
    const client = fakeClient({ failUploads: true });
    const { states } = await rediscover([c], prior, client, NOW, { maxChannels: 1 });
    expect(states.get("a")).toMatchObject({
      status: "unknown",
      videoId: "vid-rotated",
      title: "was",
    });
  });

  it("settles on the uploads result even when rediscovery by search fails", async () => {
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "vz", title: "EarthCam Live: Z" })] },
      failSearch: true,
    });
    const { states, notes } = await rediscover([onChannel("a", "EarthCam Live: A")], new Map(), client, NOW, {
      maxChannels: 1,
    });
    expect(states.get("a")!.status).toBe("offline");
    expect(notes.join(" ")).toContain("検索での再探索に失敗");
  });

  it("queries nothing when there are no targets", async () => {
    const client = fakeClient({});
    const { unitsUsed } = await rediscover([], new Map(), client, NOW, { maxChannels: 3 });
    expect(unitsUsed).toBe(0);
    expect(client.uploadCalls).toEqual([]);
  });
});

describe("sweepLiveness subrequest limit", () => {
  const many = (n: number): Cam[] => Array.from({ length: n }, (_, i) => cam(`c${i}`));
  const perSweep = MAX_LIST_CALLS_PER_SWEEP * MAX_VIDEO_IDS_PER_CALL;

  const checkedAt = (
    id: string,
    at: string,
    status: CamState["status"] = "live",
  ): [string, CamState] => [
    id,
    { videoId: `vid-${id}`, status, viewers: null, title: null, checkedAt: at },
  ];

  it("keeps the number of listVideos calls in 1 run within the limit", async () => {
    // Workers caps subrequests per invocation at 50.
    // Splitting 5,720 cameras into groups of 50 makes 115 calls, which always fails midway.
    const client = fakeClient({ videos: [] });
    await sweepLiveness(many(5720), new Map(), client, NOW);

    expect(client.listCalls.length).toBeLessThanOrEqual(MAX_LIST_CALLS_PER_SWEEP);
  });

  it("leaves cameras skipped at the limit out of the result (no misjudging as offline)", async () => {
    const client = fakeClient({ videos: [] });
    const { states } = await sweepLiveness(many(5720), new Map(), client, NOW);

    expect(states.size).toBe(perSweep);
  });

  it("looks at the cameras with the oldest check first", async () => {
    // The first perSweep cameras were checked just now, the last 50 were never looked at.
    // Going naively from the head, the tail is never checked.
    const cams = many(perSweep + 50);
    const stale = new Map<string, CamState>(
      cams.slice(0, perSweep).map((c) => checkedAt(c.id, "2026-08-18T11:59:00Z")),
    );
    const client = fakeClient({ videos: [] });

    const { states } = await sweepLiveness(cams, stale, client, NOW);

    for (const c of cams.slice(-50)) {
      expect(states.has(c.id), `${c.id} が確認されていない`).toBe(true);
    }
  });

  it("sends in order of oldest check, and keeps the ledger order on a tie", async () => {
    // The order itself is under test, so every camera is past its recheck interval.
    const cams = [cam("a"), cam("b"), cam("c"), cam("d")];
    const states = new Map<string, CamState>([
      checkedAt("a", "2026-08-18T11:00:00Z", "offline"),
      checkedAt("b", "2026-08-18T09:00:00Z", "offline"),
      // c has never been checked -> top priority
      checkedAt("d", "2026-08-18T11:00:00Z", "offline"), // ties with a
    ]);
    const client = fakeClient({ videos: [] });

    await sweepLiveness(cams, states, client, NOW);

    expect(client.listCalls[0]).toEqual(["vid-c", "vid-b", "vid-a", "vid-d"]);
  });

  it("leaves no cutoff note when everything has been looked at", async () => {
    const client = fakeClient({ videos: [] });
    const { notes } = await sweepLiveness(many(10), new Map(), client, NOW);

    expect(notes).toEqual([]);
  });

  it("leaves a note that it was cut off at the limit", async () => {
    const client = fakeClient({ videos: [] });
    const { notes } = await sweepLiveness(many(5720), new Map(), client, NOW);

    expect(notes.join()).toContain("サブリクエスト");
  });
});

describe("isDue", () => {
  const at = (status: CamState["status"], checkedAt: string): CamState => ({
    videoId: "v",
    status,
    viewers: null,
    title: null,
    checkedAt,
  });

  it("always checks a camera that has no state yet", () => {
    expect(isDue(undefined, NOW)).toBe(true);
  });

  it("skips a live one until 2 hours have passed", () => {
    expect(isDue(at("live", "2026-08-18T11:30:00Z"), NOW)).toBe(false);
  });

  it("rechecks even a live one once the interval has passed", () => {
    expect(isDue(at("live", "2026-08-18T09:00:00Z"), NOW)).toBe(true);
  });

  it("rechecks offline after 20 minutes", () => {
    expect(isDue(at("offline", "2026-08-18T11:30:00Z"), NOW)).toBe(true);
  });

  it("runs blocked at the same interval as offline", () => {
    expect(isDue(at("blocked", "2026-08-18T11:30:00Z"), NOW)).toBe(true);
  });

  it("skips an offline one looked at just before", () => {
    expect(isDue(at("offline", "2026-08-18T11:55:00Z"), NOW)).toBe(false);
  });

  it("falls to the checking side for a state with an unreadable checkedAt", () => {
    expect(isDue(at("live", "not-a-date"), NOW)).toBe(true);
  });

  it("has a longer interval for live than for offline", () => {
    expect(RECHECK_INTERVAL_MS.live).toBeGreaterThan(RECHECK_INTERVAL_MS.offline);
  });
});

describe("sweepLiveness narrowing by interval", () => {
  const at = (id: string, status: CamState["status"], checkedAt: string): [string, CamState] => [
    id,
    { videoId: `vid-${id}`, status, viewers: null, title: null, checkedAt },
  ];

  it("does not query a live one whose interval has not come yet", async () => {
    const client = fakeClient({ videos: [] });
    const states = new Map([at("a", "live", "2026-08-18T11:30:00Z")]);

    const { states: updated, unitsUsed } = await sweepLiveness([cam("a")], states, client, NOW);

    expect(client.listCalls).toEqual([]);
    expect(updated.size).toBe(0);
    expect(unitsUsed).toBe(0);
  });

  it("gives the capacity of the skipped live ones to offline", async () => {
    // 60 live cameras (checked just before) and 10 offline. Packing everything naively
    // fills 1 call (50 items) with live ones, and offline is pushed to the next run.
    const cams = [
      ...Array.from({ length: 60 }, (_, i) => cam(`live${i}`)),
      ...Array.from({ length: 10 }, (_, i) => cam(`off${i}`)),
    ];
    const states = new Map([
      ...Array.from({ length: 60 }, (_, i) => at(`live${i}`, "live", "2026-08-18T11:59:00Z")),
      ...Array.from({ length: 10 }, (_, i) => at(`off${i}`, "offline", "2026-08-18T11:00:00Z")),
    ]);
    const client = fakeClient({ videos: [] });

    const { states: updated } = await sweepLiveness(cams, states, client, NOW);

    expect(client.listCalls.length).toBe(1);
    expect(updated.size).toBe(10);
  });

  it("never calls even once when no one's interval has come", async () => {
    const client = fakeClient({ videos: [] });
    const states = new Map([at("a", "live", "2026-08-18T11:59:00Z")]);

    const { notes } = await sweepLiveness([cam("a")], states, client, NOW);

    expect(client.listCalls).toEqual([]);
    expect(notes).toEqual([]);
  });
});

describe("pruneOrphans", () => {
  const state = (videoId: string): CamState => ({
    videoId,
    status: "live",
    viewers: null,
    title: null,
    checkedAt: NOW.toISOString(),
  });

  it("drops the state of ids not in the master", () => {
    const states = new Map([
      ["a", state("vid-a")],
      ["gone", state("vid-gone")],
    ]);

    const { kept } = pruneOrphans(states, [cam("a")]);

    expect([...kept.keys()]).toEqual(["a"]);
  });

  it("reports the ids it dropped", () => {
    const states = new Map([["gone", state("vid-gone")]]);

    const { removed } = pruneOrphans(states, [cam("a")]);

    expect(removed).toEqual(["gone"]);
  });

  it("reports nothing when there are no orphans", () => {
    const states = new Map([["a", state("vid-a")]]);

    const { kept, removed } = pruneOrphans(states, [cam("a")]);

    expect(removed).toEqual([]);
    expect(kept.size).toBe(1);
  });
});

describe("ROLE_UNIT_BUDGET", () => {
  it("keeps the sum of the per-role budgets within the daily limit", () => {
    expect(ROLE_UNIT_BUDGET.sweep + ROLE_UNIT_BUDGET.rediscover).toBe(DAILY_UNIT_BUDGET);
  });

  it("leaves rediscovery a budget equal to the liveness sweep", () => {
    expect(ROLE_UNIT_BUDGET.rediscover).toBeGreaterThanOrEqual(ROLE_UNIT_BUDGET.sweep);
  });
});

describe("rediscover subrequest limit", () => {
  // Workers caps the subrequests that 1 invocation can make at 50.
  // Rediscovery of 1 channel walks up to 3 pages of uploads and makes 2 calls per page,
  // playlistItems + videosList, so it takes 6 calls at worst.
  // Capping by count alone gives 24 channels x 6 = 144 calls and half fail (it actually failed).
  const manyChannels = (n: number): Cam[] =>
    Array.from({ length: n }, (_, i) =>
      cam(`c${i}`, {
        source: {
          videoId: `vid-c${i}`,
          channelId: `UC${String(i).padStart(22, "0")}`,
          titleKey: `title-c${i}`,
        },
      }),
    );

  /** Every camera is offline = every channel is a rediscovery target. */
  const allOffline = (cams: readonly Cam[]): Map<string, CamState> =>
    new Map(
      cams.map((c) => [
        c.id,
        {
          videoId: c.source.videoId,
          status: "offline" as const,
          viewers: null,
          title: null,
          checkedAt: "2026-08-18T00:00:00Z",
        },
      ]),
    );

  it("keeps the calls made in 1 run within the subrequest allowance", async () => {
    const cams = manyChannels(60);
    const client = fakeClient({});

    await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 60,
      maxSearches: 0,
    });

    expect(client.callsMade).toBeLessThanOrEqual(MAX_CALLS_PER_REDISCOVER);
  });

  it("stops where the last channel cannot exceed it even using the worst-case calls", async () => {
    const cams = manyChannels(60);
    const client = fakeClient({});

    await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 60,
      maxSearches: 0,
    });

    // Stops at the point where the next channel still fits the allowance even if it uses
    // the worst case of MAX_CALLS_PER_CHANNEL calls.
    expect(client.callsMade + MAX_CALLS_PER_CHANNEL).toBeGreaterThan(
      MAX_CALLS_PER_REDISCOVER,
    );
  });

  it("leaves a note that it was cut off", async () => {
    const cams = manyChannels(60);
    const client = fakeClient({});

    const { notes } = await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 60,
      maxSearches: 0,
    });

    expect(notes.join()).toContain("サブリクエスト");
  });

  it("does not cut off when the channel count fits the allowance", async () => {
    const cams = manyChannels(3);
    const client = fakeClient({});

    const { notes } = await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 3,
      maxSearches: 0,
    });

    expect(client.uploadCalls.length).toBe(3);
    expect(notes.join()).not.toContain("サブリクエスト");
  });
});
