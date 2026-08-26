// 選択中のカメラの「その土地はどういう場所か」。Wikipedia はキー不要・CORS
// 許可なのでブラウザから直接叩く(天気と同じ。Worker を経由しない)。
//
// いちばん近い記事を距離順で取ると、タイムズスクエアのピンに「2017 年の
// 車両突入事件」が載る。だから名前と座標を一緒に渡し、場所の記事を先に出す。
// 日本語 UI では、英語の本文は日本語版 Wikipedia があればそちら、無ければ訳す。

import type { Lang } from "./weather";

export interface PlaceOverview {
  title: string;
  extract: string;
  url: string;
  /** 英語記事に日本語版があるときの題名。機械翻訳よりこちらを優先する。 */
  jaTitle?: string;
  jaUrl?: string;
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

export function wikipediaHost(lang: Lang): string {
  return lang === "ja" ? "ja.wikipedia.org" : "en.wikipedia.org";
}

export function wikipediaSearchUrl(lat: number, lng: number, lang: Lang, name?: string): string {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: wikipediaSearchQuery(lat, lng, name),
    gsrlimit: "5",
    gsrnamespace: "0",
    prop: lang === "en" ? "extracts|info|langlinks" : "extracts|info",
    exintro: "1",
    explaintext: "1",
    exchars: "360",
    inprop: "url",
    format: "json",
    origin: "*",
  });
  if (lang === "en") {
    params.set("lllang", "ja");
    params.set("llprop", "url");
  }
  return `https://${wikipediaHost(lang)}/w/api.php?${params}`;
}

/** 日本語版の題名が分かっているときに、その本文だけを取りに行く。 */
export function wikipediaExtractUrl(title: string, lang: Lang): string {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "extracts|info",
    exintro: "1",
    explaintext: "1",
    exchars: "360",
    inprop: "url",
    redirects: "1",
    format: "json",
    origin: "*",
  });
  return `https://${wikipediaHost(lang)}/w/api.php?${params}`;
}

/** ひらがな・カタカナ・漢字があれば日本語とみなす。英日の切り分けに使う。 */
export function looksJapanese(text: string): boolean {
  return /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text);
}

/** MyMemory は 500 バイト制限。概要は 450 字で切れば収まる。 */
export const TRANSLATE_MAX_CHARS = 450;

export function myMemoryUrl(text: string): string {
  const clipped = text.length > TRANSLATE_MAX_CHARS ? text.slice(0, TRANSLATE_MAX_CHARS) : text;
  const params = new URLSearchParams({
    q: clipped,
    langpair: "en|ja",
  });
  return `https://api.mymemory.translated.net/get?${params}`;
}

export function parseTranslation(json: unknown): string | null {
  if (typeof json !== "object" || json === null) return null;
  const rec = json as Record<string, unknown>;
  if (rec.responseStatus !== 200 && rec.responseStatus !== "200") return null;
  const data = rec.responseData;
  if (typeof data !== "object" || data === null) return null;
  const text = (data as { translatedText?: unknown }).translatedText;
  if (typeof text !== "string") return null;
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed === "" || /^MYMEMORY WARNING/i.test(trimmed) || trimmed === "INVALID QUERY") {
    return null;
  }
  return trimmed;
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
  jaTitle?: string;
  jaUrl?: string;
}

function readJaLink(value: unknown): { title: string; url: string } | null {
  if (!Array.isArray(value)) return null;
  for (const item of value) {
    if (typeof item !== "object" || item === null) continue;
    const row = item as Record<string, unknown>;
    const title = row["*"];
    const url = row.url;
    if (typeof title !== "string" || title.trim() === "") continue;
    if (typeof url !== "string" || url.trim() === "") continue;
    return { title: title.trim(), url };
  }
  return null;
}

function readPage(value: unknown): PlacePage | null {
  if (typeof value !== "object" || value === null) return null;
  const rec = value as Record<string, unknown>;
  if (typeof rec.title !== "string" || rec.title.trim() === "") return null;
  if (typeof rec.extract !== "string") return null;
  if (typeof rec.fullurl !== "string" || rec.fullurl.trim() === "") return null;
  const index = typeof rec.index === "number" ? rec.index : Number.POSITIVE_INFINITY;
  const ja = readJaLink(rec.langlinks);
  const page: PlacePage = { title: rec.title, extract: rec.extract, url: rec.fullurl, index };
  if (ja !== null) {
    page.jaTitle = ja.title;
    page.jaUrl = ja.url;
  }
  return page;
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
    const overview: PlaceOverview = { title: page.title, extract, url: page.url };
    if (page.jaTitle !== undefined && page.jaUrl !== undefined) {
      overview.jaTitle = page.jaTitle;
      overview.jaUrl = page.jaUrl;
    }
    return overview;
  }
  return null;
}
