// 選択中のカメラの「その土地はどういう場所か」。Wikipedia はキー不要・CORS
// 許可なのでブラウザから直接叩く(天気と同じ。Worker を経由しない)。
//
// いちばん近い記事を距離順で取ると、タイムズスクエアのピンに「2017 年の
// 車両突入事件」が載る。だから名前と座標を一緒に渡し、場所の記事を先に出す。

import type { Lang } from "./weather";

export interface PlaceOverview {
  title: string;
  extract: string;
  url: string;
}

/** 座標は天気と同じく小数第 4 位。キャッシュキーが細かくなりすぎないように。 */
function roundCoord(n: number): string {
  return String(Number(n.toFixed(4)));
}

/**
 * 検索語から引用符などを落として、Cirrus の演算子に食べられないようにする。
 * 空になったら呼び出し側は座標だけの検索に落とす。
 */
export function sanitizeSearchName(name: string): string {
  return name.replace(/["'\\]/g, " ").replace(/\s+/g, " ").trim();
}

export function wikipediaSearchQuery(lat: number, lng: number, name?: string): string {
  const near = `nearcoord:10km,${roundCoord(lat)},${roundCoord(lng)}`;
  const cleaned = name === undefined ? "" : sanitizeSearchName(name);
  if (cleaned === "") return near;
  return `"${cleaned}" ${near}`;
}

export function wikipediaSearchUrl(lat: number, lng: number, lang: Lang, name?: string): string {
  const host = lang === "ja" ? "ja.wikipedia.org" : "en.wikipedia.org";
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: wikipediaSearchQuery(lat, lng, name),
    gsrlimit: "5",
    gsrnamespace: "0",
    prop: "extracts|info",
    exintro: "1",
    explaintext: "1",
    exchars: "360",
    inprop: "url",
    format: "json",
    origin: "*",
  });
  return `https://${host}/w/api.php?${params}`;
}

const YEAR_PREFIX = /^\d{4}\b/;
const EVENT_WORD = /\b(bombing|attack|shooting|massacre|earthquake|incident)\b/i;
const DISAMBIGUATION = /may refer to/i;
const DISAMBIGUATION_JA = /曖昧さ回避/;

function isEventTitle(title: string): boolean {
  return YEAR_PREFIX.test(title) || EVENT_WORD.test(title);
}

function isDisambiguation(extract: string): boolean {
  return DISAMBIGUATION.test(extract) || DISAMBIGUATION_JA.test(extract);
}

function firstParagraph(extract: string): string {
  return extract.split(/\n+/)[0]!.replace(/\s+/g, " ").trim();
}

interface PlacePage {
  title: string;
  extract: string;
  url: string;
  index: number;
}

function readPage(value: unknown): PlacePage | null {
  if (typeof value !== "object" || value === null) return null;
  const rec = value as Record<string, unknown>;
  if (typeof rec.title !== "string" || rec.title.trim() === "") return null;
  if (typeof rec.extract !== "string") return null;
  if (typeof rec.fullurl !== "string" || rec.fullurl.trim() === "") return null;
  const index = typeof rec.index === "number" ? rec.index : Number.POSITIVE_INFINITY;
  return { title: rec.title, extract: rec.extract, url: rec.fullurl, index };
}

export function parsePlaceOverview(json: unknown): PlaceOverview | null {
  if (typeof json !== "object" || json === null) return null;
  const query = (json as { query?: unknown }).query;
  if (typeof query !== "object" || query === null) return null;
  const pages = (query as { pages?: unknown }).pages;
  if (typeof pages !== "object" || pages === null) return null;

  const candidates = Object.values(pages as Record<string, unknown>)
    .map(readPage)
    .filter((page): page is PlacePage => page !== null)
    .sort((a, b) => a.index - b.index);

  for (const page of candidates) {
    if (isEventTitle(page.title)) continue;
    if (isDisambiguation(page.extract)) continue;
    const extract = firstParagraph(page.extract);
    if (extract === "") continue;
    return { title: page.title, extract, url: page.url };
  }
  return null;
}
