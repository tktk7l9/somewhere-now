// YouTube のチャンネルページから「いまライブ配信中のもの」を集めてくる。
//
// API キーは使わない(キーは Worker の実行時専用にして、探索でクォータを
// 減らさない)。ページ構造に依存するので本番では絶対に使わず、私が
// マスタデータを作るときに手で走らせるだけの道具として扱う。
//
//   npm run cams:discover
//   → scripts/out/candidates.json
//
// 出力を人が読んで緯度経度・タイムゾーン・表示名を付け、src/data/cams.ts に
// 落とすところまでが一連の作業。

import { mkdir, writeFile } from "node:fs/promises";
import { SEED_HANDLES } from "./seed-handles.ts";

/** 1 回の実行で叩くページ数の上限。無制限のループを作らないための保険。 */
const MAX_HANDLES = 40;
/** 連続アクセスの間隔(ms)。 */
const DELAY_MS = 1200;

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

/** サムネイルの LIVE バッジが付いている lockup だけを拾う。 */
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
