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
 * 偽クライアント。
 *   videos      … listVideos が返す動画
 *   uploads     … uploads プレイリスト経由で見えるライブ(チャンネル別)
 *   search      … 検索経由で見えるライブ(省略時は uploads と同じ)
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
      // 打ち切り判定が呼ばれることを、テスト側でも確かめられるようにする。
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
  it("UTC の日付を返す", () => {
    expect(utcDay(new Date("2026-08-18T23:30:00Z"))).toBe("2026-08-18");
    expect(utcDay(new Date("2026-08-19T00:30:00Z"))).toBe("2026-08-19");
  });
});

describe("ledgerForDay", () => {
  it("記録が無ければ当日ゼロから始める", () => {
    expect(ledgerForDay(null, NOW)).toEqual({ day: "2026-08-18", used: 0 });
  });

  it("同じ日の記録はそのまま使う", () => {
    const stored = { day: "2026-08-18", used: 500 };
    expect(ledgerForDay(stored, NOW)).toEqual(stored);
  });

  it("日が変わったらリセットする", () => {
    expect(ledgerForDay({ day: "2026-08-17", used: 9999 }, NOW)).toEqual({
      day: "2026-08-18",
      used: 0,
    });
  });
});

describe("remainingUnits", () => {
  it("予算から使用済みを引く", () => {
    expect(remainingUnits({ day: "d", used: 1000 })).toBe(DAILY_UNIT_BUDGET - 1000);
  });

  it("使い切ったら負にせず 0 を返す", () => {
    expect(remainingUnits({ day: "d", used: DAILY_UNIT_BUDGET + 500 })).toBe(0);
  });
});

describe("sweepLiveness", () => {
  it("ライブ中の配信を live として記録する", async () => {
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

  it("配信が終わっていれば offline", async () => {
    const client = fakeClient({ videos: [video({ id: "vid-a", isLive: false })] });
    const { states } = await sweepLiveness([cam("a")], new Map(), client, NOW);
    expect(states.get("a")!.status).toBe("offline");
  });

  it("動画ごと消えていれば offline", async () => {
    const client = fakeClient({ videos: [] });
    const { states } = await sweepLiveness([cam("a")], new Map(), client, NOW);
    expect(states.get("a")!.status).toBe("offline");
    expect(states.get("a")!.viewers).toBeNull();
  });

  it("埋め込み禁止は blocked として区別する", async () => {
    const client = fakeClient({ videos: [video({ id: "vid-a", embeddable: false })] });
    const { states } = await sweepLiveness([cam("a")], new Map(), client, NOW);
    expect(states.get("a")!.status).toBe("blocked");
  });

  it("既存状態の videoId をマスタより優先する", async () => {
    const prior = new Map<string, CamState>([
      ["a", { videoId: "vid-new", status: "live", viewers: null, title: null, checkedAt: "old" }],
    ]);
    const client = fakeClient({ videos: [video({ id: "vid-new" })] });
    const { states } = await sweepLiveness([cam("a")], prior, client, NOW);
    expect(states.get("a")!.videoId).toBe("vid-new");
    expect(client.listCalls[0]).toEqual(["vid-new"]);
  });

  it("videoId を持たないカメラには触れない(再探索の仕事)", async () => {
    const noVideo = cam("a", { source: { videoId: null, channelId: "UC1", titleKey: "t" } });
    const client = fakeClient({ videos: [] });
    const { states, unitsUsed } = await sweepLiveness([noVideo], new Map(), client, NOW);
    expect(states.size).toBe(0);
    expect(unitsUsed).toBe(0);
  });

  it("50 件ごとに分割して投げる", async () => {
    const cams = Array.from({ length: 51 }, (_, i) => cam(`c${i}`));
    const client = fakeClient({ videos: [] });
    const { unitsUsed } = await sweepLiveness(cams, new Map(), client, NOW);
    expect(client.listCalls.map((c) => c.length)).toEqual([50, 1]);
    expect(unitsUsed).toBe(2);
  });

  it("同じ videoId を共有するカメラをまとめて 1 件として問い合わせる", async () => {
    const shared = { videoId: "vid-same", channelId: "UC1", titleKey: "shared" };
    const cams = [cam("a", { source: shared }), cam("b", { source: shared })];
    const client = fakeClient({ videos: [video({ id: "vid-same" })] });
    const { states } = await sweepLiveness(cams, new Map(), client, NOW);
    expect(client.listCalls[0]).toEqual(["vid-same"]);
    expect(states.get("a")!.status).toBe("live");
    expect(states.get("b")!.status).toBe("live");
  });

  it("予算が足りなければ途中で止め、理由を残す", async () => {
    const cams = Array.from({ length: 51 }, (_, i) => cam(`c${i}`));
    const client = fakeClient({ videos: [] });
    const { unitsUsed, notes } = await sweepLiveness(cams, new Map(), client, NOW, 1);
    expect(unitsUsed).toBe(1);
    expect(notes.join(" ")).toContain("予算");
  });

  it("予算が 0 なら 1 度も叩かない", async () => {
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

  it("配信タイトルで、そのカメラの配信を選び直す", async () => {
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

  it("生存確認がまだ触っていないカメラには手を出さない", async () => {
    // 状態が無い = 一度も生存確認していない。記録した videoId が生きている
    // 可能性が高いので、当てにならない再探索で offline にしてはいけない。
    const fresh = cam("fresh", { source: { videoId: "vid-fresh", channelId: CH, titleKey: "F" } });
    const client = fakeClient({});
    const { states, unitsUsed } = await rediscover([fresh], new Map(), client, NOW, {
      maxChannels: 1,
    });
    expect(unitsUsed).toBe(0);
    expect(states.size).toBe(0);
  });

  it("videoId を持たないカメラは、状態が無くても探しにいく", async () => {
    // 生存確認は videoId が無いカメラを飛ばすので、こちらが動かないと永久に
    // 解決しない。
    const c = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({ uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] } });
    const { states } = await rediscover([c], new Map(), client, NOW, { maxChannels: 1 });
    expect(states.get("a")!.videoId).toBe("va");
  });

  it("見分けがつかなくても、記録済みの videoId は消さない", async () => {
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
    // KV に残っている回転後の id を、マスタより優先して次の生存確認に渡す。
    expect(states.get("a")).toMatchObject({ status: "offline", videoId: "vid-rotated" });
  });

  it("状態の videoId が空なら、マスタの videoId を残す", async () => {
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

  it("見分けがつかないときに、同じチャンネルの別の配信を掴まない", async () => {
    // これが最悪の失敗。タイムズスクエアのピンに別の街を映してはいけない。
    const times = onChannel("times-square", "EarthCam Live: Times Square North 4K");
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "vid-seaside", title: "EarthCam Live: Seaside Heights, NJ" })] },
    });
    const { states, notes } = await rediscover([times], new Map(), client, NOW, { maxChannels: 1 });

    expect(states.get("times-square")).toMatchObject({ status: "offline", videoId: null });
    expect(notes.join(" ")).toContain("見分けがつかず");
  });

  it("同じチャンネルのカメラを 1 回の問い合わせでまとめて片付ける", async () => {
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
    // 3 台でも 1 チャンネルぶんの 2 unit で済む。
    expect(unitsUsed).toBe(2);
  });

  it("uploads で取りこぼしたら、網羅できる検索に落とす", async () => {
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

  it("uploads で全部見つかれば、高い検索は使わない", async () => {
    const cam1 = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({ uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] } });
    await rediscover([cam1], new Map(), client, NOW, { maxChannels: 1 });
    expect(client.searchCalls).toEqual([]);
    // 目当てが揃っているので、その先のページは要らないと伝わる。
    expect(client.stopChecks).toEqual([true]);
  });

  it("目当てが揃っていなければ、ページ送りを続けるよう伝える", async () => {
    const cams = [onChannel("a", "EarthCam Live: A"), onChannel("b", "EarthCam Live: B")];
    const client = fakeClient({ uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A" })] } });
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 1 });
    expect(client.stopChecks).toEqual([false]);
  });

  it("検索に落とす余裕が無ければ uploads の結果で確定する", async () => {
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

  it("高い検索経路は 1 回の実行で配給される回数までしか使わない", async () => {
    const chA = "UCaaaa00000000000000000";
    const chB = "UCbbbb00000000000000000";
    const cams = [
      cam("a", { source: { videoId: null, channelId: chA, titleKey: "A" } }),
      cam("b", { source: { videoId: null, channelId: chB, titleKey: "B" } }),
    ];
    // どちらのチャンネルも uploads では取りこぼす。
    const client = fakeClient({
      uploads: { [chA]: [video({ id: "vz", title: "Z" })], [chB]: [video({ id: "vy", title: "Y" })] },
      search: { [chA]: [video({ id: "va", title: "A" })], [chB]: [video({ id: "vb", title: "B" })] },
    });
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 2, maxSearches: 1 });

    expect(client.uploadCalls).toHaveLength(2);
    expect(client.searchCalls).toHaveLength(1);
  });

  it("埋め込み禁止の配信は blocked にする", async () => {
    const cam1 = onChannel("a", "EarthCam Live: A");
    const client = fakeClient({
      uploads: { [CH]: [video({ id: "va", title: "EarthCam Live: A", embeddable: false })] },
    });
    const { states } = await rediscover([cam1], new Map(), client, NOW, { maxChannels: 1 });
    expect(states.get("a")!.status).toBe("blocked");
  });

  it("ライブ中のカメラは対象にしない", async () => {
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

  it("最も長く放っておかれたカメラを抱えるチャンネルから片付ける", async () => {
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

  it("状態が無いチャンネルを最優先で拾う", async () => {
    const known = cam("known", { source: { videoId: null, channelId: "UCknown0000000000000000", titleKey: "K" } });
    const never = cam("never", { source: { videoId: null, channelId: "UCnever0000000000000000", titleKey: "N" } });
    const prior = new Map([["known", offline("2026-08-17T00:00:00Z")]]);
    const client = fakeClient({});
    await rediscover([known, never], prior, client, NOW, { maxChannels: 1 });
    expect(client.uploadCalls).toEqual([never.source.channelId]);
  });

  it("同じ古さのチャンネルが並んでも壊れない", async () => {
    const a = cam("a", { source: { videoId: null, channelId: "UCaaaa00000000000000000", titleKey: "A" } });
    const b = cam("b", { source: { videoId: null, channelId: "UCbbbb00000000000000000", titleKey: "B" } });
    const same = "2026-08-17T00:00:00Z";
    const prior = new Map([["a", offline(same)], ["b", offline(same)]]);
    const client = fakeClient({});
    await rediscover([a, b], prior, client, NOW, { maxChannels: 2 });
    expect(client.uploadCalls).toHaveLength(2);
  });

  it("同じチャンネル内で最も古いカメラを、そのチャンネルの古さとして扱う", async () => {
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
    // 並び順に依らず、そのチャンネルで最も古いカメラが基準になる。
    for (const order of [[recent, old, other], [old, recent, other]]) {
      const client = fakeClient({});
      await rediscover(order, prior, client, NOW, { maxChannels: 1 });
      // recent(08-18) ではなく old(08-01) を抱える CH が先に選ばれる。
      expect(client.uploadCalls).toEqual([CH]);
    }
  });

  it("maxChannels で件数を抑える", async () => {
    const cams = ["x", "y", "z"].map((k) =>
      cam(k, { source: { videoId: null, channelId: `UC${k.repeat(22)}`, titleKey: k } }),
    );
    const client = fakeClient({});
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 2 });
    expect(client.uploadCalls).toHaveLength(2);
  });

  it("予算が足りなければ 1 件も探さず、理由を残す", async () => {
    const client = fakeClient({});
    const { unitsUsed, notes } = await rediscover([onChannel("a", "A")], new Map(), client, NOW, {
      maxChannels: 3,
      unitBudget: 1,
    });
    expect(unitsUsed).toBe(0);
    expect(notes.join(" ")).toContain("予算");
  });

  it("1 チャンネルの失敗で全体を落とさず、そのカメラを unknown にする", async () => {
    const client = fakeClient({ failUploads: true });
    const { states, notes } = await rediscover([onChannel("a", "A")], new Map(), client, NOW, {
      maxChannels: 1,
    });
    expect(states.get("a")!.status).toBe("unknown");
    expect(notes.join(" ")).toContain("失敗");
  });

  it("再探索が失敗しても、記録済みの videoId は消さない", async () => {
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

  it("検索での再探索が失敗しても、uploads の結果で確定する", async () => {
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

  it("対象が無ければ何も問い合わせない", async () => {
    const client = fakeClient({});
    const { unitsUsed } = await rediscover([], new Map(), client, NOW, { maxChannels: 3 });
    expect(unitsUsed).toBe(0);
    expect(client.uploadCalls).toEqual([]);
  });
});

describe("sweepLiveness のサブリクエスト上限", () => {
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

  it("1 回の実行で listVideos を呼ぶ回数が上限を超えない", async () => {
    // Workers は 1 呼び出しあたりのサブリクエストが 50 で頭打ちになる。
    // 5,720 台を 50 件ずつ割ると 115 回になり、途中で必ず落ちる。
    const client = fakeClient({ videos: [] });
    await sweepLiveness(many(5720), new Map(), client, NOW);

    expect(client.listCalls.length).toBeLessThanOrEqual(MAX_LIST_CALLS_PER_SWEEP);
  });

  it("上限で見送ったカメラは結果に含めない(offline と誤判定しない)", async () => {
    const client = fakeClient({ videos: [] });
    const { states } = await sweepLiveness(many(5720), new Map(), client, NOW);

    expect(states.size).toBe(perSweep);
  });

  it("確認がいちばん古いカメラから先に見る", async () => {
    // 先頭 perSweep 台はさっき確認したばかり、末尾 50 台は一度も見ていない。
    // 素直に先頭から舐めると末尾は永遠に確認されない。
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

  it("確認が古い順に投げ、同着なら台帳の順序を崩さない", async () => {
    // 並び順そのものを見たいので、全台とも再確認の間隔は過ぎている状態にする。
    const cams = [cam("a"), cam("b"), cam("c"), cam("d")];
    const states = new Map<string, CamState>([
      checkedAt("a", "2026-08-18T11:00:00Z", "offline"),
      checkedAt("b", "2026-08-18T09:00:00Z", "offline"),
      // c は一度も確認していない → 最優先
      checkedAt("d", "2026-08-18T11:00:00Z", "offline"), // a と同着
    ]);
    const client = fakeClient({ videos: [] });

    await sweepLiveness(cams, states, client, NOW);

    expect(client.listCalls[0]).toEqual(["vid-c", "vid-b", "vid-a", "vid-d"]);
  });

  it("全部を見終わったら打ち切りのメモは残さない", async () => {
    const client = fakeClient({ videos: [] });
    const { notes } = await sweepLiveness(many(10), new Map(), client, NOW);

    expect(notes).toEqual([]);
  });

  it("上限で打ち切ったことをメモに残す", async () => {
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

  it("状態がまだ無いカメラは必ず確かめる", () => {
    expect(isDue(undefined, NOW)).toBe(true);
  });

  it("ライブは 2 時間経つまで見送る", () => {
    expect(isDue(at("live", "2026-08-18T11:30:00Z"), NOW)).toBe(false);
  });

  it("ライブでも間隔を過ぎたら確かめ直す", () => {
    expect(isDue(at("live", "2026-08-18T09:00:00Z"), NOW)).toBe(true);
  });

  it("offline は 20 分で確かめ直す", () => {
    expect(isDue(at("offline", "2026-08-18T11:30:00Z"), NOW)).toBe(true);
  });

  it("blocked も offline と同じ間隔で回す", () => {
    expect(isDue(at("blocked", "2026-08-18T11:30:00Z"), NOW)).toBe(true);
  });

  it("直前に見た offline は見送る", () => {
    expect(isDue(at("offline", "2026-08-18T11:55:00Z"), NOW)).toBe(false);
  });

  it("checkedAt が読めない状態は確かめる側に倒す", () => {
    expect(isDue(at("live", "not-a-date"), NOW)).toBe(true);
  });

  it("ライブの間隔は offline より長い", () => {
    expect(RECHECK_INTERVAL_MS.live).toBeGreaterThan(RECHECK_INTERVAL_MS.offline);
  });
});

describe("sweepLiveness の間隔しぼり", () => {
  const at = (id: string, status: CamState["status"], checkedAt: string): [string, CamState] => [
    id,
    { videoId: `vid-${id}`, status, viewers: null, title: null, checkedAt },
  ];

  it("まだ間隔の来ていないライブは問い合わせない", async () => {
    const client = fakeClient({ videos: [] });
    const states = new Map([at("a", "live", "2026-08-18T11:30:00Z")]);

    const { states: updated, unitsUsed } = await sweepLiveness([cam("a")], states, client, NOW);

    expect(client.listCalls).toEqual([]);
    expect(updated.size).toBe(0);
    expect(unitsUsed).toBe(0);
  });

  it("見送ったライブのぶんの枠を offline に回す", async () => {
    // ライブ 60 台(直前に確認済み)と offline 10 台。素直に全件詰めると
    // 1 回の呼び出し(50 件)がライブで埋まり、offline が次回送りになる。
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

  it("誰も間隔が来ていなければ 1 度も叩かない", async () => {
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

  it("マスタに無い id の状態を落とす", () => {
    const states = new Map([
      ["a", state("vid-a")],
      ["gone", state("vid-gone")],
    ]);

    const { kept } = pruneOrphans(states, [cam("a")]);

    expect([...kept.keys()]).toEqual(["a"]);
  });

  it("落とした id を報告する", () => {
    const states = new Map([["gone", state("vid-gone")]]);

    const { removed } = pruneOrphans(states, [cam("a")]);

    expect(removed).toEqual(["gone"]);
  });

  it("孤児が無ければ何も報告しない", () => {
    const states = new Map([["a", state("vid-a")]]);

    const { kept, removed } = pruneOrphans(states, [cam("a")]);

    expect(removed).toEqual([]);
    expect(kept.size).toBe(1);
  });
});

describe("ROLE_UNIT_BUDGET", () => {
  it("役割ごとの予算の合計が日次上限に収まる", () => {
    expect(ROLE_UNIT_BUDGET.sweep + ROLE_UNIT_BUDGET.rediscover).toBe(DAILY_UNIT_BUDGET);
  });

  it("再探索にも生存確認と同等の枠を残す", () => {
    expect(ROLE_UNIT_BUDGET.rediscover).toBeGreaterThanOrEqual(ROLE_UNIT_BUDGET.sweep);
  });
});

describe("rediscover のサブリクエスト上限", () => {
  // Workers は 1 回の呼び出しで出せるサブリクエストが 50 で頭打ちになる。
  // チャンネル 1 本の再探索は uploads を最大 3 ページ辿り、1 ページにつき
  // playlistItems + videosList の 2 回を出すので、最悪 6 回かかる。
  // 件数だけで上限を切ると 24 本 × 6 = 144 回になって半分が落ちる(実際に落ちた)。
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

  /** 全カメラが offline = 全チャンネルが再探索の対象。 */
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

  it("1 回の実行で出す呼び出しがサブリクエストの枠を超えない", async () => {
    const cams = manyChannels(60);
    const client = fakeClient({});

    await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 60,
      maxSearches: 0,
    });

    expect(client.callsMade).toBeLessThanOrEqual(MAX_CALLS_PER_REDISCOVER);
  });

  it("最後の 1 本が最悪の回数を使っても超えないところで止める", async () => {
    const cams = manyChannels(60);
    const client = fakeClient({});

    await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 60,
      maxSearches: 0,
    });

    // 次の 1 本が最悪 MAX_CALLS_PER_CHANNEL 回使っても枠に収まる時点で止まる。
    expect(client.callsMade + MAX_CALLS_PER_CHANNEL).toBeGreaterThan(
      MAX_CALLS_PER_REDISCOVER,
    );
  });

  it("打ち切ったことをメモに残す", async () => {
    const cams = manyChannels(60);
    const client = fakeClient({});

    const { notes } = await rediscover(cams, allOffline(cams), client, NOW, {
      maxChannels: 60,
      maxSearches: 0,
    });

    expect(notes.join()).toContain("サブリクエスト");
  });

  it("枠に収まる本数なら打ち切らない", async () => {
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
