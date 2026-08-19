// キーワード検索で、まだ知らないライブカメラのチャンネルを探す。
//
// チャンネル起点(discover-cams.ts)だと、こちらが名前を知っている運営しか
// 見つからない。実際には「町のホテル」「港の事務所」のような小さなチャンネルが
// 1 台ずつ出しているものが多いので、検索で拾う。
//
// search.list は 100 unit と高いので、問い合わせ数を必ず上限で抑える。
// これはデータを作るときに手で回す道具で、本番の Worker からは呼ばない。
//
//   keyway run -e development -- npm run cams:search

import { mkdir, writeFile } from "node:fs/promises";
import { CAM_PLACES } from "./cam-places.ts";

const QUERIES = [
  "live cam 24/7",
  "ライブカメラ",
  "webcam en vivo",
  "live webcam beach",
  "live cam harbour port",
  "airport live cam",
  "live kamera stadt",
  "live cam mountain",
];
/** 使い切ってよいクォータの上限。search.list は 1 回 100 unit。 */
const MAX_QUERIES = 8;

interface Hit {
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  query: string;
}

async function search(apiKey: string, q: string): Promise<Hit[]> {
  const params = new URLSearchParams({
    part: "snippet",
    q,
    eventType: "live",
    type: "video",
    maxResults: "50",
    order: "viewCount",
    key: apiKey,
  });
  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);
  if (!res.ok) throw new Error(`検索に失敗 HTTP ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as {
    items?: { id?: { videoId?: string }; snippet?: Record<string, string> }[];
  };
  return (json.items ?? [])
    .filter((i) => typeof i.id?.videoId === "string")
    .map((i) => ({
      videoId: i.id!.videoId!,
      title: i.snippet?.["title"] ?? "",
      channelId: i.snippet?.["channelId"] ?? "",
      channelTitle: i.snippet?.["channelTitle"] ?? "",
      query: q,
    }));
}

async function main(): Promise<void> {
  const apiKey = process.env["YOUTUBE_API_KEY"];
  if (apiKey === undefined || apiKey === "") throw new Error("YOUTUBE_API_KEY が無い");

  const known = new Set(CAM_PLACES.map((p) => p.channelId));
  const hits: Hit[] = [];
  let units = 0;

  for (const q of QUERIES.slice(0, MAX_QUERIES)) {
    const found = await search(apiKey, q);
    units += 100;
    hits.push(...found);
    console.log(`  "${q}" → ${found.length} 件`);
  }

  // 既に持っているチャンネルは除く。
  const fresh = hits.filter((h) => !known.has(h.channelId));
  const byChannel = new Map<string, Hit[]>();
  for (const h of fresh) {
    const list = byChannel.get(h.channelId);
    if (list === undefined) byChannel.set(h.channelId, [h]);
    else list.push(h);
  }

  await mkdir("scripts/out", { recursive: true });
  await writeFile(
    "scripts/out/search-hits.json",
    JSON.stringify([...byChannel.entries()].map(([channelId, items]) => ({ channelId, items })), null, 2) + "\n",
  );
  console.log(
    `\n消費 ${units} unit / ヒット ${hits.length} 件 / 未知のチャンネル ${byChannel.size} 本` +
      ` → scripts/out/search-hits.json`,
  );
}

await main();
