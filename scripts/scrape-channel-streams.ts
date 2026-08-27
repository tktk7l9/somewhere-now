// 既知チャンネルの /streams からライブ配信を浚い、search-scrape.json にマージする。
// API キー不要。探索用の手回し道具。
//
//   npm run cams:scrape-channels
//   → scripts/out/search-scrape.json に追記

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { CAM_PLACES_CURATED } from "./cam-places.ts";
import { CAM_PLACES_BULK } from "./cam-places-bulk.ts";
import { SEED_HANDLES } from "./seed-handles.ts";

const DELAY_MS = 1200;
const OUT = "scripts/out/search-scrape.json";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

interface ScrapeHit {
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  countryCode: string;
  query: string;
}

function extractLives(data: unknown): { videoId: string; title: string }[] {
  const out = new Map<string, string>();

  function walk(node: unknown): void {
    if (node === null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    const rec = node as Record<string, unknown>;
    const blob = JSON.stringify(rec);
    if (typeof rec["contentId"] === "string" && blob.includes("LIVE")) {
      const titleMatch = /"title":\{"content":"((?:[^"\\]|\\.)*)"/.exec(blob);
      const title = titleMatch !== null ? (JSON.parse(`"${titleMatch[1]}"`) as string) : "";
      if (title.length > 0) out.set(rec["contentId"] as string, title);
    }
    const renderer = rec["videoRenderer"] as Record<string, unknown> | undefined;
    if (
      renderer !== undefined &&
      typeof renderer["videoId"] === "string" &&
      (blob.includes("BADGE_STYLE_TYPE_LIVE") || blob.includes("LIVE_NOW"))
    ) {
      const titleRuns = (renderer["title"] as { runs?: { text?: string }[] } | undefined)?.runs;
      const title = titleRuns?.[0]?.["text"] ?? "";
      if (title.length > 0) out.set(renderer["videoId"] as string, title);
    }
    for (const value of Object.values(rec)) walk(value);
  }

  walk(data);
  return [...out.entries()].map(([videoId, title]) => ({ videoId, title }));
}

async function scrapeChannelUrl(
  url: string,
): Promise<{ channelId: string | null; channelTitle: string; lives: { videoId: string; title: string }[] }> {
  const html = await fetch(url, {
    headers: { "user-agent": UA, "accept-language": "en-US,en" },
  }).then((r) => r.text());
  const channelId = /"externalId":"(UC[\w-]{22})"/.exec(html)?.[1] ?? null;
  const channelTitleMatch =
    /"ownerChannelName":"((?:[^"\\]|\\.)*)"/.exec(html) ??
    /"channelMetadataRenderer":\{"title":"((?:[^"\\]|\\.)*)"/.exec(html);
  const channelTitle =
    channelTitleMatch !== null
      ? (JSON.parse(`"${channelTitleMatch[1]}"`) as string)
      : "";
  const match = /var ytInitialData = (\{.*?\});<\/script>/s.exec(html);
  if (match === null) return { channelId, channelTitle, lives: [] };
  return { channelId, channelTitle, lives: extractLives(JSON.parse(match[1]!)) };
}

function majorityCountry(channelId: string): string {
  const counts = new Map<string, number>();
  for (const place of [...CAM_PLACES_CURATED, ...CAM_PLACES_BULK]) {
    if (place.channelId !== channelId || place.at === undefined) continue;
    counts.set(place.at.country, (counts.get(place.at.country) ?? 0) + 1);
  }
  let best = "US";
  let bestN = 0;
  for (const [cc, n] of counts) {
    if (n > bestN) {
      best = cc;
      bestN = n;
    }
  }
  return best;
}

async function main(): Promise<void> {
  await mkdir("scripts/out", { recursive: true });

  const byVideo = new Map<string, ScrapeHit>();
  try {
    const existing = JSON.parse(await readFile(OUT, "utf8")) as ScrapeHit[];
    for (const hit of existing) byVideo.set(hit.videoId, hit);
    console.log(`既存 scrape ${byVideo.size} 件`);
  } catch {
    // first run
  }

  // 既知 bulk の多配信チャンネル + seed ハンドル
  const channelCounts = new Map<string, { handle: string; n: number }>();
  for (const place of [...CAM_PLACES_CURATED, ...CAM_PLACES_BULK]) {
    const prev = channelCounts.get(place.channelId) ?? { handle: place.handle, n: 0 };
    prev.n += 1;
    if (place.handle.length > 0) prev.handle = place.handle;
    channelCounts.set(place.channelId, prev);
  }
  const topChannels = [...channelCounts.entries()]
    .sort((a, b) => b[1].n - a[1].n)
    .slice(0, 60);

  const targets: { url: string; label: string; channelIdHint?: string }[] = [];
  for (const [channelId, meta] of topChannels) {
    targets.push({
      url: `https://www.youtube.com/channel/${channelId}/streams`,
      label: `${meta.handle} (${meta.n})`,
      channelIdHint: channelId,
    });
  }
  for (const seed of SEED_HANDLES) {
    targets.push({
      url: `https://www.youtube.com/@${seed.handle}/streams`,
      label: `@${seed.handle}`,
    });
  }

  let added = 0;
  for (const [i, target] of targets.entries()) {
    try {
      const result = await scrapeChannelUrl(target.url);
      const channelId = result.channelId ?? target.channelIdHint;
      if (channelId === undefined || channelId.length === 0) {
        console.log(`✗ ${target.label} — channelId なし`);
      } else {
        const countryCode = majorityCountry(channelId);
        const channelTitle = result.channelTitle || target.label;
        let newForChannel = 0;
        for (const live of result.lives) {
          if (byVideo.has(live.videoId)) continue;
          byVideo.set(live.videoId, {
            videoId: live.videoId,
            title: live.title,
            channelId,
            channelTitle,
            countryCode,
            query: `channel:${channelId}`,
          });
          newForChannel++;
          added++;
        }
        console.log(
          `✓ ${target.label} — live ${result.lives.length} / 新規 ${newForChannel} (${channelId})`,
        );
      }
    } catch (error) {
      console.log(`✗ ${target.label} — ${String(error)}`);
    }
    if (i < targets.length - 1) await new Promise((r) => setTimeout(r, DELAY_MS));
    if ((i + 1) % 5 === 0) {
      await writeFile(OUT, JSON.stringify([...byVideo.values()], null, 2) + "\n");
    }
  }

  await writeFile(OUT, JSON.stringify([...byVideo.values()], null, 2) + "\n");
  console.log(`\n合計 ${byVideo.size} 件 (+${added}) → ${OUT}`);
}

await main();
