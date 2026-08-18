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
  source: { videoId: `vid-${id}`, channelId: `UC${id.padEnd(22, "0")}` },
  ...over,
});

const video = (over: Partial<YouTubeVideo> & { id: string }): YouTubeVideo => ({
  title: "T",
  isLive: true,
  embeddable: true,
  viewers: 10,
  ...over,
});

/** listVideos が返す動画と、findLiveVideoId が返す id を固定した偽クライアント。 */
function fakeClient(opts: {
  videos?: YouTubeVideo[];
  liveByChannel?: Record<string, string | null>;
  failSearch?: boolean;
}): YouTubeClient & { listCalls: string[][]; searchCalls: string[] } {
  let unitsUsed = 0;
  const byId = new Map((opts.videos ?? []).map((v) => [v.id, v]));
  const listCalls: string[][] = [];
  const searchCalls: string[] = [];

  return {
    listCalls,
    searchCalls,
    get unitsUsed() {
      return unitsUsed;
    },
    async listVideos(ids) {
      listCalls.push([...ids]);
      if (ids.length === 0) return [];
      unitsUsed += 1;
      return ids.map((id) => byId.get(id)).filter((v): v is YouTubeVideo => v !== undefined);
    },
    async findLiveVideoId(channelId) {
      searchCalls.push(channelId);
      unitsUsed += 100;
      if (opts.failSearch === true) throw new Error("boom");
      return opts.liveByChannel?.[channelId] ?? null;
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
    const noVideo = cam("a", { source: { videoId: null, channelId: "UC1" } });
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
    const shared = { videoId: "vid-same", channelId: "UC1" };
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
  const offlineState = (checkedAt: string): CamState => ({
    videoId: "vid-dead",
    status: "offline",
    viewers: null,
    title: null,
    checkedAt,
  });

  it("死んでいるカメラのチャンネルから現在のライブを探し直す", async () => {
    const c = cam("a");
    const client = fakeClient({
      liveByChannel: { [c.source.channelId]: "vid-fresh" },
      videos: [video({ id: "vid-fresh", title: "Back" })],
    });
    const prior = new Map([["a", offlineState("2026-08-17T00:00:00Z")]]);
    const { states, unitsUsed } = await rediscover([c], prior, client, NOW, { maxChannels: 2 });

    expect(states.get("a")).toEqual({
      videoId: "vid-fresh",
      status: "live",
      viewers: 10,
      title: "Back",
      checkedAt: NOW.toISOString(),
    });
    // search.list 100 + 確認の videos.list 1
    expect(unitsUsed).toBe(101);
  });

  it("ライブが見つからなければ offline のまま確認時刻だけ進める", async () => {
    const c = cam("a");
    const client = fakeClient({ liveByChannel: { [c.source.channelId]: null } });
    const prior = new Map([["a", offlineState("2026-08-17T00:00:00Z")]]);
    const { states } = await rediscover([c], prior, client, NOW, { maxChannels: 2 });

    expect(states.get("a")!.status).toBe("offline");
    expect(states.get("a")!.videoId).toBeNull();
    expect(states.get("a")!.checkedAt).toBe(NOW.toISOString());
  });

  it("見つけた配信が埋め込み禁止なら blocked にする", async () => {
    const c = cam("a");
    const client = fakeClient({
      liveByChannel: { [c.source.channelId]: "vid-fresh" },
      videos: [video({ id: "vid-fresh", embeddable: false })],
    });
    const prior = new Map([["a", offlineState("2026-08-17T00:00:00Z")]]);
    const { states } = await rediscover([c], prior, client, NOW, { maxChannels: 1 });
    expect(states.get("a")!.status).toBe("blocked");
  });

  it("ライブ中のカメラは対象にしない", async () => {
    const live = new Map<string, CamState>([
      ["a", { videoId: "v", status: "live", viewers: 1, title: "t", checkedAt: "x" }],
    ]);
    const client = fakeClient({});
    const { unitsUsed } = await rediscover([cam("a")], live, client, NOW, { maxChannels: 3 });
    expect(unitsUsed).toBe(0);
    expect(client.searchCalls).toEqual([]);
  });

  it("状態が無いカメラを最優先で拾う", async () => {
    const cams = [cam("stale"), cam("never")];
    const prior = new Map([["stale", offlineState("2026-08-17T00:00:00Z")]]);
    const client = fakeClient({});
    await rediscover(cams, prior, client, NOW, { maxChannels: 1 });
    expect(client.searchCalls).toEqual([cams[1]!.source.channelId]);
  });

  it("確認時刻が古い順に拾う(全カメラを順に回す)", async () => {
    const cams = [cam("newer"), cam("older")];
    const prior = new Map([
      ["newer", offlineState("2026-08-18T00:00:00Z")],
      ["older", offlineState("2026-08-01T00:00:00Z")],
    ]);
    const client = fakeClient({});
    await rediscover(cams, prior, client, NOW, { maxChannels: 1 });
    expect(client.searchCalls).toEqual([cams[1]!.source.channelId]);
  });

  it("maxChannels で件数を抑える", async () => {
    const cams = [cam("a"), cam("b"), cam("c")];
    const client = fakeClient({});
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 2 });
    expect(client.searchCalls).toHaveLength(2);
  });

  it("予算で件数を抑える(maxChannels より予算が厳しい場合)", async () => {
    const cams = [cam("a"), cam("b"), cam("c")];
    const client = fakeClient({});
    await rediscover(cams, new Map(), client, NOW, { maxChannels: 3, unitBudget: 150 });
    expect(client.searchCalls).toHaveLength(1);
  });

  it("予算が足りなければ 1 件も探さない", async () => {
    const client = fakeClient({});
    const { unitsUsed, notes } = await rediscover([cam("a")], new Map(), client, NOW, {
      maxChannels: 3,
      unitBudget: 10,
    });
    expect(unitsUsed).toBe(0);
    expect(notes.join(" ")).toContain("予算");
  });

  it("1 チャンネルの失敗で全体を落とさず、そのカメラを unknown にする", async () => {
    const client = fakeClient({ failSearch: true });
    const { states, notes } = await rediscover([cam("a")], new Map(), client, NOW, {
      maxChannels: 1,
    });
    expect(states.get("a")!.status).toBe("unknown");
    expect(notes.join(" ")).toContain("失敗");
  });

  it("対象が無ければ確認の問い合わせもしない", async () => {
    const client = fakeClient({});
    const { unitsUsed } = await rediscover([], new Map(), client, NOW, { maxChannels: 3 });
    expect(unitsUsed).toBe(0);
    expect(client.listCalls).toEqual([]);
  });
});

describe("sweepLiveness の打ち切り", () => {
  it("問い合わせられなかったカメラは offline と誤判定せず、そのまま残す", async () => {
    const cams = Array.from({ length: 51 }, (_, i) => cam(`c${i}`));
    const client = fakeClient({ videos: [] });
    // 1 unit = 50 件ぶんしか確認できない。
    const { states } = await sweepLiveness(cams, new Map(), client, NOW, 1);

    expect(states.size).toBe(50);
    expect(states.has("c50")).toBe(false);
  });
});

describe("rediscover の取りこぼし", () => {
  const offline = (checkedAt: string): CamState => ({
    videoId: "vid-dead",
    status: "offline",
    viewers: null,
    title: null,
    checkedAt,
  });

  it("確認時刻が同じカメラ同士でも並びが壊れない", async () => {
    const cams = [cam("a"), cam("b")];
    const same = "2026-08-17T00:00:00Z";
    const prior = new Map([
      ["a", offline(same)],
      ["b", offline(same)],
    ]);
    const client = fakeClient({});
    await rediscover(cams, prior, client, NOW, { maxChannels: 2 });
    expect(client.searchCalls).toHaveLength(2);
  });

  it("既に古い順に並んでいる入力でも先頭から拾う", async () => {
    const cams = [cam("older"), cam("newer")];
    const prior = new Map([
      ["older", offline("2026-08-01T00:00:00Z")],
      ["newer", offline("2026-08-18T00:00:00Z")],
    ]);
    const client = fakeClient({});
    await rediscover(cams, prior, client, NOW, { maxChannels: 1 });
    expect(client.searchCalls).toEqual([cams[0]!.source.channelId]);
  });

  it("検索で見つかった配信が videos.list に現れなければ offline に倒す", async () => {
    const c = cam("a");
    const client = fakeClient({
      liveByChannel: { [c.source.channelId]: "vid-ghost" },
      videos: [],
    });
    const { states } = await rediscover([c], new Map(), client, NOW, { maxChannels: 1 });
    expect(states.get("a")).toMatchObject({ status: "offline", viewers: null, title: null });
  });

  it("見つかった配信が既に終わっていれば offline に倒す", async () => {
    const c = cam("a");
    const client = fakeClient({
      liveByChannel: { [c.source.channelId]: "vid-ended" },
      videos: [video({ id: "vid-ended", isLive: false })],
    });
    const { states } = await rediscover([c], new Map(), client, NOW, { maxChannels: 1 });
    expect(states.get("a")!.status).toBe("offline");
  });
});
