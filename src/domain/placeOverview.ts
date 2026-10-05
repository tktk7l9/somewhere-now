// "What kind of place is this" for the selected camera. Wikipedia needs no key and allows
// CORS, so the browser hits it directly (same as weather; it does not go through the Worker).
//
// Taking the nearest article by distance puts "the 2017 vehicle-ramming incident" on the Times
// Square pin. So the name and coordinates are passed together and place articles come first. In the
// Japanese UI, an English body uses the Japanese Wikipedia edition if one exists, and is translated
// otherwise.

import type { Lang } from "./weather";

export interface PlaceOverview {
  title: string;
  extract: string;
  url: string;
  /**
   * Title of the Japanese edition when the English article has one. Preferred over machine
   * translation.
   */
  jaTitle?: string;
  jaUrl?: string;
}

/** Coordinates use 4 decimal places like weather. So the cache key does not get too fine. */
function roundCoord(n: number): string {
  return String(Number(n.toFixed(4)));
}

/**
 * Drops quotes and the like from the search term so Cirrus operators do not swallow it.
 * When it becomes empty, the caller falls back to a coordinates-only search.
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

/** When the title of the Japanese edition is known, fetches only that body. */
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

/** Treats text with hiragana, katakana or kanji as Japanese. Used to tell English from Japanese. */
export function looksJapanese(text: string): boolean {
  return /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text);
}

/** MyMemory has a 500-byte limit. Cutting the overview at 450 characters fits. */
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

/** Only https links are rendered as anchors; anything else (javascript:, data:) is dropped. */
function isHttpsUrl(url: string): boolean {
  return /^https:\/\//i.test(url.trim());
}

function readJaLink(value: unknown): { title: string; url: string } | null {
  if (!Array.isArray(value)) return null;
  for (const item of value) {
    if (typeof item !== "object" || item === null) continue;
    const row = item as Record<string, unknown>;
    const title = row["*"];
    const url = row.url;
    if (typeof title !== "string" || title.trim() === "") continue;
    if (typeof url !== "string" || !isHttpsUrl(url)) continue;
    return { title: title.trim(), url };
  }
  return null;
}

function readPage(value: unknown): PlacePage | null {
  if (typeof value !== "object" || value === null) return null;
  const rec = value as Record<string, unknown>;
  if (typeof rec.title !== "string" || rec.title.trim() === "") return null;
  if (typeof rec.extract !== "string") return null;
  if (typeof rec.fullurl !== "string" || !isHttpsUrl(rec.fullurl)) return null;
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
