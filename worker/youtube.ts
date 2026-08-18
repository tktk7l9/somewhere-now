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
  searchLive: 100,
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
    maxResults: "1",
    key: apiKey,
  });
  return `${API_BASE}/search?${params.toString()}`;
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

export function parseSearchLive(json: unknown): string | null {
  for (const raw of itemsOf(json)) {
    const id = asRecord(asRecord(raw)?.["id"]);
    if (id !== null && typeof id["videoId"] === "string") return id["videoId"];
  }
  return null;
}

export interface YouTubeClient {
  /** これまでに消費したクォータ(単位: unit)。 */
  readonly unitsUsed: number;
  /** ids は MAX_VIDEO_IDS_PER_CALL 件まで。 */
  listVideos(ids: readonly string[]): Promise<YouTubeVideo[]>;
  findLiveVideoId(channelId: string): Promise<string | null>;
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

    async findLiveVideoId(channelId) {
      return parseSearchLive(await call(searchLiveUrl(apiKey, channelId), UNIT_COST.searchLive));
    },
  };
}
