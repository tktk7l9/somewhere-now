import type { Cam, CamState } from "../src/domain/cams";
import type { YouTubeClient, YouTubeVideo } from "./youtube";
import {
  DAILY_UNIT_BUDGET,
  ledgerForDay,
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
    async listVideos(ids) {
      listCalls.push([...ids]);
      if (ids.length === 0) return [];
      unitsUsed += 1;
      return ids.map((id) => byId.get(id)).filter((v): v is YouTubeVideo => v !== undefined);
    },
    async listChannelLiveStreamsViaUploads(channelId, shouldStop) {
      uploadCalls.push(channelId);
      unitsUsed += 2;
      if (opts.failUploads === true) throw new Error("boom");
      const live = opts.uploads?.[channelId] ?? [];
      // 打ち切り判定が呼ばれることを、テスト側でも確かめられるようにする。
      stopChecks.push(shouldStop?.(live) ?? null);
      return live;
    },
    async listChannelLiveStreamsViaSearch(channelId) {
      searchCalls.push(channelId);
      unitsUsed += 101;
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
