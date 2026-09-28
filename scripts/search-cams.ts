// Finds live camera channels not yet known, by keyword search.
//
// Starting from channels (discover-cams.ts) only finds operators whose names we already
// know. In reality many cameras are put out one at a time by small channels such as
// "a hotel in town" or "a harbour office", so they are picked up by search.
//
// search.list is expensive at 100 unit, so the number of queries is always capped.
// This is a tool run by hand when building data, and is not called from the production Worker.
//
//   keyway run -e development -- npm run cams:search

import { mkdir, writeFile } from "node:fs/promises";
import { CAM_PLACES_CURATED } from "./cam-places.ts";

/**
 * Search terms. Regions get skewed, so language and regionCode are varied to dig separate wells.
 * 1 term costs 100 unit, so check against MAX_QUERIES when adding more.
 */
interface Query {
  q: string;
  /** Biases search results toward this country. */
  regionCode?: string;
  note: string;
}

const QUERIES: Query[] = [
  // Digging by language only returns "streams that happen to be popular" in that language area.
  // Specifying a place name directly lets us search for that place's cameras by name.
  { q: "Istanbul live cam", note: "トルコ" },
  { q: "Dubai live cam", note: "UAE" },
  { q: "Cairo live cam", note: "エジプト" },
  { q: "Mumbai live cam", note: "インド" },
  { q: "Colombo Sri Lanka live cam", note: "スリランカ" },
  { q: "Kathmandu live cam", note: "ネパール" },
  { q: "Lagos Nigeria live cam", note: "ナイジェリア" },
  { q: "Marrakech Morocco live cam", note: "モロッコ" },
  { q: "Reykjavik Iceland live cam", note: "アイスランド" },
  { q: "Vienna live cam", note: "オーストリア" },
  { q: "Athens Greece live cam", note: "ギリシャ" },
  { q: "Jakarta live cam", note: "インドネシア" },
];
/** Upper limit of quota that may be used up. search.list costs 100 unit per call. */
const MAX_QUERIES = 12;

interface Hit {
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  query: string;
}

async function search(apiKey: string, query: Query): Promise<Hit[]> {
  const params = new URLSearchParams({
    part: "snippet",
    q: query.q,
    eventType: "live",
    type: "video",
    maxResults: "50",
    order: "viewCount",
    key: apiKey,
  });
  if (query.regionCode !== undefined) params.set("regionCode", query.regionCode);
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
      query: query.q,
    }));
}

async function main(): Promise<void> {
  const apiKey = process.env["YOUTUBE_API_KEY"];
  if (apiKey === undefined || apiKey === "") throw new Error("YOUTUBE_API_KEY が無い");

  const known = new Set(CAM_PLACES_CURATED.map((p) => p.channelId));
  const hits: Hit[] = [];
  let units = 0;

  for (const query of QUERIES.slice(0, MAX_QUERIES)) {
    const found = await search(apiKey, query);
    units += 100;
    hits.push(...found);
    console.log(`  [${query.note}] "${query.q}" → ${found.length} 件`);
  }

  // Exclude channels we already have.
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
