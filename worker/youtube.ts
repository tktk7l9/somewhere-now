// YouTube Data API v3 の最小クライアント。
//
// URL の組み立てと応答の解釈を純関数に切り出し、ネットワークを触る部分だけを
// createYouTubeClient に閉じ込めている(fetch を注入するので単体テストできる)。
//
// クォータ: 無料枠は 10,000 units/日。videos.list は 1 件でも 50 件でも 1 unit
// なので生存確認はまとめて投げる。search.list は 100 unit と高いので、videoId
// が死んだカメラの再探索にだけ、予算を見ながら使う。

const API_BASE = "https://www.googleapis.com/youtube/v3";

/** videos.list が 1 回で受け取れる id の上限(API 仕様)。 */
export const MAX_VIDEO_IDS_PER_CALL = 50;

export const UNIT_COST = {
  videosList: 1,
  playlistItems: 1,
  searchLive: 100,
} as const;

/**
 * uploads プレイリストを何ページまで遡るか。
 *
 * 深く遡っても意味は薄い。再探索が要るのは「配信が終わって**新しい配信**が
 * 始まった」ときで、新しい配信は投稿履歴の先頭に来るから。奥に沈んでいるのは
 * 何ヶ月も続いている配信で、それは videoId が変わらないので生存確認の側で拾える
 * (VirtualRailfan は 400 本遡っても目当てに届かない配信があったが、それは
 *  ずっとライブのままのもので、再探索の出番が無いものだった)。
 *
 * 一方で上限を上げると、二度と戻らないカメラを毎時ずっと高く探し続けることに
 * なる。浅くしておく。目当てが揃えばさらに手前で打ち切る。
 */
export const UPLOADS_MAX_PAGES = 3;

/** チャンネルの現在のライブを引く 2 つの経路の上限額。 */
export const CHANNEL_LOOKUP_COST = {
  /** uploads プレイリスト経由(ページ送り込み)。 */
  viaUploads: UPLOADS_MAX_PAGES * (UNIT_COST.playlistItems + UNIT_COST.videosList),
  /**
   * 検索経由。**網羅は保証されない** — eventType=live の検索が、実際にライブ中の
   * 配信を返さないことを実測で確認している(42 件返しつつ、ライブ中の 1 本が
   * 欠けていた。次ページも無し)。uploads で見つからなかったときの当てにすぎない。
   */
  viaSearch: UNIT_COST.searchLive + UNIT_COST.videosList,
} as const;

export interface YouTubeVideo {
  id: string;
  title: string;
  /** いま配信中か(snippet.liveBroadcastContent === "live")。 */
  isLive: boolean;
  /** 外部サイトへの埋め込みが許可されているか。 */
  embeddable: boolean;
  viewers: number | null;
}

export function videosListUrl(apiKey: string, ids: readonly string[]): string {
  const params = new URLSearchParams({
    part: "snippet,liveStreamingDetails,status",
    id: ids.join(","),
    key: apiKey,
  });
  return `${API_BASE}/videos?${params.toString()}`;
}

export function searchLiveUrl(apiKey: string, channelId: string): string {
  const params = new URLSearchParams({
    part: "id",
    channelId,
    eventType: "live",
    type: "video",
    // 1 チャンネルが何十本もライブを出しているので、1 本だけ取ると
    // 別のカメラを掴む。全部取ってタイトルで見分ける。
    maxResults: String(MAX_VIDEO_IDS_PER_CALL),
    key: apiKey,
  });
  return `${API_BASE}/search?${params.toString()}`;
}

/**
 * チャンネルの「アップロード」プレイリスト id。チャンネル id の接頭辞を
 * UC → UU に変えたものになる(YouTube の仕様)。
 */
export function uploadsPlaylistId(channelId: string): string {
  return `UU${channelId.slice(2)}`;
}

export function playlistItemsUrl(
  apiKey: string,
  playlistId: string,
  pageToken?: string,
): string {
  const params = new URLSearchParams({
    part: "contentDetails",
    playlistId,
    maxResults: String(MAX_VIDEO_IDS_PER_CALL),
    key: apiKey,
  });
  if (pageToken !== undefined) params.set("pageToken", pageToken);
  return `${API_BASE}/playlistItems?${params.toString()}`;
}

export function parsePlaylistItems(json: unknown): string[] {
  const ids: string[] = [];
  for (const raw of itemsOf(json)) {
    const videoId = asRecord(asRecord(raw)?.["contentDetails"])?.["videoId"];
    if (typeof videoId === "string") ids.push(videoId);
  }
  return ids;
}

export function nextPageToken(json: unknown): string | undefined {
  const token = asRecord(json)?.["nextPageToken"];
  return typeof token === "string" ? token : undefined;
}

export function parseSearchIds(json: unknown): string[] {
  const ids: string[] = [];
  for (const raw of itemsOf(json)) {
    const videoId = asRecord(asRecord(raw)?.["id"])?.["videoId"];
    if (typeof videoId === "string") ids.push(videoId);
  }
  return ids;
}

function itemsOf(json: unknown): unknown[] {
  if (typeof json !== "object" || json === null) return [];
  const { items } = json as { items?: unknown };
  return Array.isArray(items) ? items : [];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

export function parseVideosList(json: unknown): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];

  for (const raw of itemsOf(json)) {
    const item = asRecord(raw);
    if (item === null) continue;

    const snippet = asRecord(item["snippet"]);
    if (typeof item["id"] !== "string" || snippet === null) continue;

    const status = asRecord(item["status"]);
    const details = asRecord(item["liveStreamingDetails"]);
    const viewersRaw = details === null ? undefined : details["concurrentViewers"];
    const viewers = Number(viewersRaw);

    videos.push({
      id: item["id"],
      title: typeof snippet["title"] === "string" ? snippet["title"] : "",
      isLive: snippet["liveBroadcastContent"] === "live",
      // status を欠く応答は制限なしとみなす(埋め込み可の既定に倒す)。
      embeddable: status === null ? true : status["embeddable"] !== false,
      viewers: Number.isFinite(viewers) && viewersRaw !== undefined ? viewers : null,
    });
  }
  return videos;
}

export interface YouTubeClient {
  /** これまでに消費したクォータ(単位: unit)。 */
  readonly unitsUsed: number;
  /** ids は MAX_VIDEO_IDS_PER_CALL 件まで。 */
  listVideos(ids: readonly string[]): Promise<YouTubeVideo[]>;
  /**
   * uploads プレイリストを遡って、いまライブ中のものを返す。
   * shouldStop が true を返した時点でページ送りをやめる(目当てが 1 ページ目に
   * 居るのが普通なので、これがあるかどうかで消費が 8 倍変わる)。
   */
  listChannelLiveStreamsViaUploads(
    channelId: string,
    shouldStop?: (live: readonly YouTubeVideo[]) => boolean,
  ): Promise<YouTubeVideo[]>;
  /** 検索でチャンネルのライブを網羅する。確実だが高い(101 unit)。 */
  listChannelLiveStreamsViaSearch(channelId: string): Promise<YouTubeVideo[]>;
}

export function createYouTubeClient(apiKey: string, fetchImpl: typeof fetch): YouTubeClient {
  let unitsUsed = 0;

  // 失敗しても Google 側のクォータは消費されるので、先に積んでから投げる。
  async function call(url: string, cost: number): Promise<unknown> {
    unitsUsed += cost;
    const res = await fetchImpl(url);
    if (!res.ok) {
      throw new Error(`YouTube API ${res.status}: ${await res.text()}`);
    }
    return res.json();
  }

  return {
    get unitsUsed() {
      return unitsUsed;
    },

    async listVideos(ids) {
      if (ids.length > MAX_VIDEO_IDS_PER_CALL) {
        throw new Error(
          `videos.list は 1 回 ${MAX_VIDEO_IDS_PER_CALL} 件まで(${ids.length} 件渡された)`,
        );
      }
      if (ids.length === 0) return [];
      return parseVideosList(await call(videosListUrl(apiKey, ids), UNIT_COST.videosList));
    },

    async listChannelLiveStreamsViaUploads(channelId, shouldStop) {
      const playlistId = uploadsPlaylistId(channelId);
      const live: YouTubeVideo[] = [];
      let pageToken: string | undefined;

      for (let page = 0; page < UPLOADS_MAX_PAGES; page += 1) {
        const json = await call(
          playlistItemsUrl(apiKey, playlistId, pageToken),
          UNIT_COST.playlistItems,
        );
        live.push(...(await liveAmong(parsePlaylistItems(json))));

        pageToken = nextPageToken(json);
        if (pageToken === undefined) break;
        if (shouldStop?.(live) === true) break;
      }
      return live;
    },

    async listChannelLiveStreamsViaSearch(channelId) {
      const found = await call(searchLiveUrl(apiKey, channelId), UNIT_COST.searchLive);
      return liveAmong(parseSearchIds(found));
    },
  };

  /** 動画 id の集まりから、いまライブ中のものだけを返す。50 件ずつ問い合わせる。 */
  async function liveAmong(ids: readonly string[]): Promise<YouTubeVideo[]> {
    const live: YouTubeVideo[] = [];
    for (let i = 0; i < ids.length; i += MAX_VIDEO_IDS_PER_CALL) {
      const chunk = ids.slice(i, i + MAX_VIDEO_IDS_PER_CALL);
      const videos = parseVideosList(
        await call(videosListUrl(apiKey, chunk), UNIT_COST.videosList),
      );
      for (const video of videos) if (video.isLive) live.push(video);
    }
    return live;
  }
}
