// Collects "what is live right now" from YouTube channel pages.
//
// No API key is used (the key is reserved for the Worker at runtime, so exploration does
// not reduce the quota). It depends on the page structure, so it is never used in
// production and is treated as a tool that I only run by hand when building the master data.
//
//   npm run cams:discover
//   → scripts/out/candidates.json
//
// The whole task runs up to a person reading the output, adding latitude/longitude,
// time zone and display name, and putting it into src/data/cams.ts.

import { mkdir, writeFile } from "node:fs/promises";
import { SEED_HANDLES } from "./seed-handles.ts";

/** Upper limit of pages hit in 1 run. Insurance against creating an unbounded loop. */
const MAX_HANDLES = 90;
/** Interval between consecutive accesses (ms). */
const DELAY_MS = 900;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36";

export interface LiveCandidate {
  videoId: string;
  title: string;
  viewersText: string | null;
}

export interface ChannelResult {
  handle: string;
  note: string;
  channelId: string | null;
  live: LiveCandidate[];
  error?: string;
}

function extractInitialData(html: string): unknown {
  const match = /var ytInitialData = (\{.*?\});<\/script>/s.exec(html);
  if (match === null) return null;
  try {
    return JSON.parse(match[1]!);
  } catch {
    return null;
  }
}

function collect(node: unknown, key: string, out: unknown[]): void {
  if (Array.isArray(node)) {
    for (const child of node) collect(child, key, out);
    return;
  }
  if (typeof node !== "object" || node === null) return;
  for (const [k, v] of Object.entries(node)) {
    if (k === key) out.push(v);
    collect(v, key, out);
  }
}

/** Picks up only lockups whose thumbnail has the LIVE badge. */
function extractLive(data: unknown): LiveCandidate[] {
  const lockups: unknown[] = [];
  collect(data, "lockupViewModel", lockups);

  const live: LiveCandidate[] = [];
  for (const lockup of lockups) {
    const serialized = JSON.stringify(lockup);
    if (!serialized.includes("THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE")) continue;

    const videoId = (lockup as { contentId?: unknown }).contentId;
    if (typeof videoId !== "string") continue;

    const title = /"title":\{"content":"((?:[^"\\]|\\.)*)"/.exec(serialized)?.[1] ?? "";
    const viewersText = /"content":"([^"]*watching[^"]*)"/i.exec(serialized)?.[1] ?? null;

    live.push({ videoId, title: JSON.parse(`"${title}"`) as string, viewersText });
  }
  return live;
}

async function fetchChannel(handle: string, note: string): Promise<ChannelResult> {
  const url = `https://www.youtube.com/@${handle}/streams?hl=en&gl=US`;
  const res = await fetch(url, { headers: { "user-agent": UA, "accept-language": "en-US,en" } });
  if (!res.ok) {
    return { handle, note, channelId: null, live: [], error: `HTTP ${res.status}` };
  }

  const html = await res.text();
  const channelId = /"externalId":"(UC[A-Za-z0-9_-]{22})"/.exec(html)?.[1] ?? null;
  const data = extractInitialData(html);
  if (data === null) {
    return { handle, note, channelId, live: [], error: "ytInitialData を読めなかった" };
  }
  return { handle, note, channelId, live: extractLive(data) };
}

async function main(): Promise<void> {
  const targets = SEED_HANDLES.slice(0, MAX_HANDLES);
  const results: ChannelResult[] = [];

  for (const [index, { handle, note }] of targets.entries()) {
    try {
      const result = await fetchChannel(handle, note);
      results.push(result);
      const mark = result.channelId === null ? "✗" : "✓";
      console.log(`${mark} @${handle} — ${result.live.length} live (${result.channelId ?? "未解決"})`);
    } catch (error) {
      results.push({ handle, note, channelId: null, live: [], error: String(error) });
      console.log(`✗ @${handle} — ${String(error)}`);
    }
    if (index < targets.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }

  await mkdir("scripts/out", { recursive: true });
  await writeFile("scripts/out/candidates.json", JSON.stringify(results, null, 2) + "\n");

  const totalLive = results.reduce((sum, r) => sum + r.live.length, 0);
  console.log(`\n${results.length} チャンネル / ライブ配信 ${totalLive} 本 → scripts/out/candidates.json`);
}

await main();
