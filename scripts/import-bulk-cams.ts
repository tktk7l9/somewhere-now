// camlisted と Live-Environment-Streams の YouTube エントリから、
// cam-places-bulk.ts を生成する。人手キュレーション(cam-places.ts)とは別ファイルに
// 出して、座標は Open-Meteo で解決する(記憶で書かない)。
//
//   curl -sL -o scripts/out/camlisted-streams.json \
//     https://raw.githubusercontent.com/zenith605-2/camlisted/main/data/streams.json
//   curl -sL -o scripts/out/streams.geojson \
//     https://raw.githubusercontent.com/willytop8/Live-Environment-Streams/main/streams.geojson
//   npm run cams:import-bulk
//
// 生成物: scripts/cam-places-bulk.ts

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { CAM_PLACES_CURATED, type CamPlace, type PlaceQuery } from "./cam-places.ts";
import { CAM_PLACES_BULK as EXISTING_BULK } from "./cam-places-bulk.ts";

const TARGET_TOTAL = 5000;
const GEOCODE_DELAY_MS = 100;
const FETCH_RETRIES = 4;
const CAMLISTED_PATH = "scripts/out/camlisted-streams.json";
const GEOJSON_PATH = "scripts/out/streams.geojson";
const SCRAPE_PATH = "scripts/out/search-scrape.json";
const OUTPUT_PATH = "scripts/cam-places-bulk.ts";
const NOMINATIM_UA = "somewhere-now-cam-import/1.0 (local data curation)";

/** camlisted の category → このアプリの CamCategory */
const CATEGORY_MAP: Record<string, CamPlace["category"]> = {
  traffic: "city",
  downtown: "city",
  skyline: "city",
  avenue: "city",
  plaza: "city",
  alley: "city",
  walk: "city",
  parking: "city",
  construction: "city",
  resort: "city",
  indoor: "city",
  dashcam: "city",
  other: "city",
  beach: "nature",
  coast: "nature",
  mountain: "nature",
  river: "nature",
  park: "nature",
  space: "nature",
  harbor: "harbor",
  airport: "airport",
  train: "railway",
  wildlife: "animal",
};

/** 米国の州略称 → Open-Meteo admin1 */
const US_STATE: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
};

interface CamlistedStream {
  video_id: string;
  title: string;
  channel_title: string;
  channel_id: string;
  country: string | null;
  category: string;
  embeddable: boolean;
  visibility: string;
}

interface GeocodeHit {
  latitude: number;
  longitude: number;
  timezone: string;
  country_code: string;
  admin1?: string;
  name: string;
}

interface GeoFeature {
  geometry?: { coordinates?: [number, number] };
  properties?: {
    url?: string;
    name?: string;
    display_name?: string;
    country_code?: string;
    scene_type?: string;
  };
}

const geocodeCache = new Map<string, GeocodeHit | null>();
const timezoneCache = new Map<string, string | null>();
const ytMetaCache = new Map<
  string,
  { channelId: string; title: string; channelTitle: string } | null
>();

async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < FETCH_RETRIES; attempt++) {
    try {
      const res = await fetch(url, init);
      return res;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function geocode(query: PlaceQuery): Promise<GeocodeHit | null> {
  const key = JSON.stringify(query);
  if (geocodeCache.has(key)) return geocodeCache.get(key)!;

  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(query.name)}&count=10` +
    `&language=${/[^\x00-\x7F]/.test(query.name) ? "ja" : "en"}` +
    `&countryCode=${query.countryCode}`;

  await new Promise((r) => setTimeout(r, GEOCODE_DELAY_MS));
  try {
    const res = await fetchWithRetry(url);
    if (!res.ok) {
      geocodeCache.set(key, null);
      return null;
    }

    const results = ((await res.json()) as { results?: GeocodeHit[] }).results ?? [];
    if (results.length === 0) {
      geocodeCache.set(key, null);
      return null;
    }

    let hit: GeocodeHit;
    if (query.admin1 === undefined) {
      hit = results[0]!;
    } else {
      const matched = results.find((r) => r.admin1 === query.admin1);
      // admin1 が一致しなければ国コード一致の先頭を使う(州名の揺れで落とさない)
      hit = matched ?? results.find((r) => r.country_code === query.countryCode) ?? results[0]!;
    }

    geocodeCache.set(key, hit);
    return hit;
  } catch {
    // 一時的なネット障害はキャッシュしない
    return null;
  }
}

/** Open-Meteo が空振りしたときの Nominatim フォールバック。 */
async function geocodeNominatim(query: PlaceQuery): Promise<GeocodeHit | null> {
  const key = `nom:${JSON.stringify(query)}`;
  if (geocodeCache.has(key)) return geocodeCache.get(key)!;

  const url =
    "https://nominatim.openstreetmap.org/search" +
    `?q=${encodeURIComponent(query.name)}` +
    `&countrycodes=${query.countryCode.toLowerCase()}` +
    `&format=json&limit=5`;

  await new Promise((r) => setTimeout(r, 1100)); // Nominatim 1 req/s
  try {
    const res = await fetchWithRetry(url, {
      headers: { "user-agent": NOMINATIM_UA, accept: "application/json" },
    });
    if (!res.ok) {
      geocodeCache.set(key, null);
      return null;
    }
    const results = (await res.json()) as {
      lat?: string;
      lon?: string;
      display_name?: string;
    }[];
    if (results.length === 0) {
      geocodeCache.set(key, null);
      return null;
    }
    const top = results[0]!;
    const lat = Number(top.lat);
    const lng = Number(top.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      geocodeCache.set(key, null);
      return null;
    }
    if (Number.isInteger(lat) && Number.isInteger(lng)) {
      geocodeCache.set(key, null);
      return null;
    }
    const timeZone = await timezoneAt(lat, lng);
    if (timeZone === null) {
      geocodeCache.set(key, null);
      return null;
    }
    const hit: GeocodeHit = {
      latitude: lat,
      longitude: lng,
      timezone: timeZone,
      country_code: query.countryCode,
      name: top.display_name ?? query.name,
    };
    geocodeCache.set(key, hit);
    return hit;
  } catch {
    return null;
  }
}

async function timezoneAt(lat: number, lng: number): Promise<string | null> {
  const key = `${lat.toFixed(3)},${lng.toFixed(3)}`;
  if (timezoneCache.has(key)) return timezoneCache.get(key)!;

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${lat}&longitude=${lng}&current=temperature_2m&timezone=auto`;

  await new Promise((r) => setTimeout(r, 80));
  try {
    const res = await fetchWithRetry(url);
    if (!res.ok) {
      timezoneCache.set(key, null);
      return null;
    }
    const json = (await res.json()) as { timezone?: string };
    const tz = typeof json.timezone === "string" ? json.timezone : null;
    timezoneCache.set(key, tz);
    return tz;
  } catch {
    timezoneCache.set(key, null);
    return null;
  }
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function uniqueId(base: string, used: Set<string>): string {
  const id = base || "cam";
  if (!used.has(id)) {
    used.add(id);
    return id;
  }
  for (let n = 2; n < 1000; n++) {
    const candidate = `${base.slice(0, 36)}-${n}`;
    if (!used.has(candidate)) {
      used.add(candidate);
      return candidate;
    }
  }
  throw new Error(`id を確保できない: ${base}`);
}

function guessPlaceQueries(
  title: string,
  channelTitle: string,
  countryCode: string | null,
): PlaceQuery[] {
  if (countryCode === null || countryCode === "?") return [];

  const queries: PlaceQuery[] = [];
  const tryPush = (name: string, cc: string, admin1?: string): void => {
    const n = name.replace(/[|–—]/g, " ").replace(/\s+/g, " ").trim();
    if (n.length < 2 || n.length > 80) return;
    if (/^(live|camera|webcam|stream|ao|vivo|en|the|and|for|with|from|cctv)$/i.test(n)) {
      return;
    }
    queries.push({ name: n, countryCode: cc, admin1 });
  };

  // 都市別名を最優先(漢字断片で枠を使い切らない)。Open-Meteo は英語名の方が当たる。
  const aliases: [RegExp, string, string?][] = [
    [/札幌|sapporo/i, "Sapporo", "JP"],
    [/函館|hakodate/i, "Hakodate", "JP"],
    [/仙台|sendai/i, "Sendai", "JP"],
    [/東京|tokyo|新宿|渋谷|浅草|秋葉原/i, "Tokyo", "JP"],
    [/横浜|yokohama/i, "Yokohama", "JP"],
    [/名古屋|nagoya/i, "Nagoya", "JP"],
    [/金沢|kanazawa|兼六/i, "Kanazawa", "JP"],
    [/大阪|osaka|道頓堀|梅田|難波/i, "Osaka", "JP"],
    [/京都|kyoto/i, "Kyoto", "JP"],
    [/神戸|kobe/i, "Kobe", "JP"],
    [/広島|hiroshima|宮島|厳島|嚴島/i, "Hiroshima", "JP"],
    [/福岡|fukuoka|天神/i, "Fukuoka", "JP"],
    [/長崎|nagasaki|佐世保|軍艦島/i, "Nagasaki", "JP"],
    [/鹿児島|kagoshima/i, "Kagoshima", "JP"],
    [/沖縄|okinawa|那覇|naha|恩納|石垣|ishigaki/i, "Naha", "JP"],
    [/富士山|fujiyoshida|kawaguchiko|河口湖/i, "Fujiyoshida", "JP"],
    [/鎌倉|kamakura/i, "Kamakura", "JP"],
    [/松本|matsumoto/i, "Matsumoto", "JP"],
    [/白馬|hakuba/i, "Hakuba", "JP"],
    [/ニセコ|niseko/i, "Niseko", "JP"],
    [/墨尔本|melbourne/i, "Melbourne", "AU"],
    [/悉尼|sydney/i, "Sydney", "AU"],
    [/澳大利亚|australia/i, "Melbourne", "AU"],
    [/首尔|seoul|서울/i, "Seoul", "KR"],
    [/釜山|busan|부산/i, "Busan", "KR"],
    [/济州|제주|jeju/i, "Jeju City", "KR"],
    [/大邱|daegu|대구/i, "Daegu", "KR"],
    [/仁川|incheon|인천/i, "Incheon", "KR"],
    [/香港|hong kong/i, "Hong Kong", "HK"],
    [/台北|taipei/i, "Taipei", "TW"],
    [/高雄|kaohsiung/i, "Kaohsiung", "TW"],
    [/台中|taichung/i, "Taichung", "TW"],
    [/基隆|keelung/i, "Keelung", "TW"],
    [/花蓮|hualien/i, "Hualien City", "TW"],
    [/曼谷|bangkok/i, "Bangkok", "TH"],
    [/上海|shanghai/i, "Shanghai", "CN"],
    [/北京|beijing/i, "Beijing", "CN"],
    [/广州|guangzhou|廣東/i, "Guangzhou", "CN"],
    [/深圳|shenzhen/i, "Shenzhen", "CN"],
    [/muizenberg/i, "Muizenberg", "ZA"],
    [/alexandria bay/i, "Alexandria Bay", "US"],
  ];
  for (const [re, name, aliasCc] of aliases) {
    if (re.test(title) || re.test(channelTitle)) {
      tryPush(name, aliasCc ?? countryCode);
      tryPush(name, countryCode);
    }
  }

  const cleaned = title
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/【[^】]*】/g, " ")
    .replace(/［[^］]*］/g, " ")
    .replace(/\blive\s*cam(era)?\b/gi, " ")
    .replace(/\b24\s*\/\s*7\b/gi, " ")
    .replace(/\b(stream|live|webcam|cam)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const cityState = /^(.+?),\s*([A-Za-z .]{2,30})$/.exec(cleaned);
  if (cityState !== null && countryCode === "US") {
    const city = cityState[1]!.trim();
    const region = cityState[2]!.trim();
    const admin1 = US_STATE[region.toUpperCase()] ?? region;
    tryPush(city, "US", admin1.length > 2 ? admin1 : undefined);
  }

  for (const part of cleaned.split(/[|–—]/)) {
    const segment = part.trim();
    if (segment.length >= 2 && segment.length <= 40) tryPush(segment, countryCode);
  }

  const head = cleaned.split(/[-–—(]/)[0]?.trim();
  if (head !== undefined && head.length >= 2 && head.length <= 40) {
    tryPush(head, countryCode);
  }

  const channelClean = channelTitle
    .replace(/\blive\s*cam(era)?\b/gi, " ")
    .replace(/\b(webcam|channel|official)\b/gi, " ")
    .trim();
  if (channelClean.length >= 2 && channelClean.length <= 40) {
    tryPush(channelClean, countryCode);
  }

  const words = cleaned.split(/\s+/).filter((w) => w.length > 2 && w.length < 30);
  for (const w of words.slice(0, 6)) tryPush(w, countryCode);
  if (words.length >= 2) tryPush(words[words.length - 1]!, countryCode);

  const stripped = cleaned
    .replace(/^(cámaras?|cameras?|webcam|ao vivo|en vivo|canlı|ライブ)\s+/i, "")
    .trim();
  if (stripped !== cleaned && stripped.length >= 2 && stripped.length <= 40) {
    tryPush(stripped, countryCode);
  }

  for (const m of cleaned.matchAll(/\b(?:in|at|from|near)\s+([A-Z][A-Za-z .'-]{2,40})/g)) {
    tryPush(m[1]!.trim(), countryCode);
  }

  // 日本語: 県・市などで分割して短い地名を試す
  if (countryCode === "JP" || /[\u3040-\u30ff\u4e00-\u9fff]/.test(title)) {
    const jpText = title
      .replace(/【[^】]*】/g, " ")
      .replace(/［[^］]*］/g, " ")
      .replace(/ライブ|カメラ|配信|海況|防犯|交差点/g, " ");
    for (const part of jpText.split(/(?:都|道|府|県|市|区|町|村|[｜|／/\s])/)) {
      const p = part.replace(/[^\u3040-\u30ff\u4e00-\u9fff]/g, "").trim();
      if (p.length >= 2 && p.length <= 6) tryPush(p, countryCode === "?" ? "JP" : countryCode);
    }
  }

  const seen = new Set<string>();
  return queries.filter((q) => {
    const k = `${q.countryCode}\0${q.name}\0${q.admin1 ?? ""}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function displayName(title: string, fallback: string): string {
  const t = title
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length >= 3 && t.length <= 120) return t;
  return fallback.trim() || "Live Camera";
}

function sceneCategory(scene: string | undefined): CamPlace["category"] {
  if (scene === undefined) return "city";
  return CATEGORY_MAP[scene] ?? "city";
}

/** タイトルやチャンネル名に含まれる国名から ISO コードを推す。 */
function inferCountry(title: string, channelTitle: string): string | null {
  const text = `${title} ${channelTitle}`.toLowerCase();
  const rules: [RegExp, string][] = [
    [/\bjapan\b|\bjp\b|日本|東京|大阪|京都|沖縄|北海道/, "JP"],
    [/\bunited states\b|\busa\b|\bu\.s\.|\bcalifornia\b|\btexas\b|\bflorida\b/, "US"],
    [/\bunited kingdom\b|\buk\b|\bengland\b|\bscotland\b|\bwales\b/, "GB"],
    [/\bgermany\b|\bdeutschland\b|\bberlin\b/, "DE"],
    [/\bfrance\b|\bparis\b|\bfrançais\b/, "FR"],
    [/\bitaly\b|\bitalia\b|\brome\b|\bvenice\b|\bmilan\b/, "IT"],
    [/\bspain\b|\bespaña\b|\bbarcelona\b|\bmadrid\b/, "ES"],
    [/\bbrazil\b|\bbrasil\b|\bsão paulo\b|\bao vivo\b/, "BR"],
    [/\bargentina\b|\bushuaia\b|\bbuenos aires\b/, "AR"],
    [/\baustralia\b|\bsydney\b|\bmelbourne\b/, "AU"],
    [/\bcanada\b|\btoronto\b|\bvancouver\b/, "CA"],
    [/\bkorea\b|\bseoul\b|\bbusan\b|한국/, "KR"],
    [/\btaiwan\b|台灣|台湾/, "TW"],
    [/\bthailand\b|\bbangkok\b|\bphuket\b|\bpatong\b/, "TH"],
    [/\bindonesia\b|\bjakarta\b|\bbali\b/, "ID"],
    [/\bindia\b|\bmumbai\b|\bdelhi\b/, "IN"],
    [/\bnetherlands\b|\bamsterdam\b|\bholland\b/, "NL"],
    [/\bpoland\b|\bwarsaw\b|\bkrakow\b/, "PL"],
    [/\bswitzerland\b|\bbern\b|\bzürich\b/, "CH"],
    [/\baustria\b|\bvienna\b|\bwien\b/, "AT"],
    [/\bturkey\b|\btürkiye\b|\bistanbul\b/, "TR"],
    [/\bmexico\b|\bcancún\b|\bcancun\b/, "MX"],
    [/\bphilippines\b|\bmanila\b/, "PH"],
    [/\bnew zealand\b|\bauckland\b/, "NZ"],
    [/\bsouth africa\b|\bcape town\b|\bjohannesburg\b/, "ZA"],
    [/\bchile\b|\bsantiago\b/, "CL"],
    [/\bportugal\b|\blisboa\b|\bporto\b/, "PT"],
    [/\brussia\b|\bmoscow\b|\bмосква\b/, "RU"],
    [/\bchina\b|\bbeijing\b|\bshanghai\b|中国|上海|北京/, "CN"],
    [/\bvietnam\b|\bhanoi\b|\bho chi minh\b/, "VN"],
    [/\bmalaysia\b|\bkuala lumpur\b/, "MY"],
    [/\bsingapore\b/, "SG"],
    [/\bhawaii\b|\bhonolulu\b|\bmaui\b/, "US"],
    [/\biceland\b|\breykjavik\b/, "IS"],
    [/\bnorway\b|\boslo\b|\bbergen\b/, "NO"],
    [/\bsweden\b|\bstockholm\b/, "SE"],
    [/\bdenmark\b|\bcopenhagen\b/, "DK"],
    [/\bfinland\b|\bhelsinki\b|\blevi\b/, "FI"],
    [/\bczech\b|\bprague\b|\bpraha\b/, "CZ"],
    [/\bhungary\b|\bbudapest\b/, "HU"],
    [/\bromania\b|\bbucharest\b/, "RO"],
    [/\bcroatia\b|\bdubrovnik\b|\bsplit\b/, "HR"],
    [/\bperu\b|\blima\b|\bcusco\b/, "PE"],
    [/\bcolombia\b|\bbogot[aá]\b/, "CO"],
    [/\becuador\b|\bquito\b/, "EC"],
    [/\buruguay\b|\bmontevideo\b/, "UY"],
    [/\bparaguay\b|\basunci[oó]n\b/, "PY"],
    [/\begypt\b|\bcairo\b/, "EG"],
    [/\bmorocco\b|\bmarrakech\b|\bcasablanca\b/, "MA"],
    [/\bkenya\b|\bnairobi\b/, "KE"],
    [/\buae\b|\bdubai\b|\babu dhabi\b/, "AE"],
    [/\bisrael\b|\bjerusalem\b|\btel aviv\b/, "IL"],
    [/\bnepal\b|\bkathmandu\b/, "NP"],
    [/\bsri lanka\b|\bcolombo\b/, "LK"],
    [/\bpakistan\b|\bislamabad\b|\bkarachi\b/, "PK"],
    [/\bbangladesh\b|\bdhaka\b/, "BD"],
    [/\bhonduras\b|\btegucigalpa\b/, "HN"],
    [/\bcosta rica\b|\bsan jos[eé]\b/, "CR"],
    [/\bpanama\b/, "PA"],
    [/\bguatemala\b/, "GT"],
    [/\bdominican\b|\bpunta cana\b/, "DO"],
    [/\bpuerto rico\b|\bsan juan\b/, "PR"],
    [/\bjamaica\b|\bkingston\b/, "JM"],
    [/\bcuba\b|\bhavana\b/, "CU"],
    [/\bbarbados\b/, "BB"],
    [/\baruba\b/, "AW"],
    [/\bcuracao\b|\bcuraçao\b/, "CW"],
    [/\bbonaire\b/, "BQ"],
    [/\bst\.?\s*barthelemy\b|\bst bart\b/, "BL"],
    [/\bvirgin islands\b|\bst\.?\s*thomas\b|\bcruz bay\b/, "VI"],
    [/\bnambia\b|\bwindhoek\b/, "NA"],
    [/\bazerbaijan\b|\bbaku\b/, "AZ"],
    [/\bmalta\b|\bvalletta\b/, "MT"],
    [/\bcyprus\b|\bnicosia\b/, "CY"],
    [/\bireland\b|\bdublin\b/, "IE"],
    [/\bbelgium\b|\bbrussels\b|\bbrugge\b/, "BE"],
    [/\bluxembourg\b/, "LU"],
    [/\bslovenia\b|\bljubljana\b/, "SI"],
    [/\bslovakia\b|\bbratislava\b/, "SK"],
    [/\bukraine\b|\bkyiv\b|\bkiev\b/, "UA"],
    [/\bbelarus\b|\bminsk\b/, "BY"],
    [/\blithuania\b|\bvilnius\b/, "LT"],
    [/\blatvia\b|\briga\b/, "LV"],
    [/\bestonia\b|\btallinn\b/, "EE"],
    [/\bgeorgia\b|\btbilisi\b/, "GE"],
    [/\barmenia\b|\byerevan\b/, "AM"],
    [/\bkazakhstan\b|\balmaty\b/, "KZ"],
    [/\buzbekistan\b|\btashkent\b/, "UZ"],
    [/\bmongolia\b|\bulan bator\b/, "MN"],
    [/\bcambodia\b|\bphnom penh\b|\bsiem reap\b/, "KH"],
    [/\blaos\b|\bvientiane\b/, "LA"],
    [/\bmyanmar\b|\byangon\b/, "MM"],
    [/\bmacedonia\b|\bskopje\b/, "MK"],
    [/\bserbia\b|\bbelgrade\b/, "RS"],
    [/\bbosnia\b|\bsarajevo\b/, "BA"],
    [/\balbania\b|\btirana\b/, "AL"],
    [/\bbulgaria\b|\bsofia\b/, "BG"],
    [/\bgreece\b|\bathens\b|\bcrete\b|\bsantorini\b/, "GR"],
  ];
  for (const [re, code] of rules) {
    if (re.test(text)) return code;
  }
  return null;
}

function serializeEntry(entry: CamPlace): string {
  const lines = [
    "  {",
    `    id: ${JSON.stringify(entry.id)},`,
    `    nameJa: ${JSON.stringify(entry.nameJa)},`,
    `    nameEn: ${JSON.stringify(entry.nameEn)},`,
    `    category: ${JSON.stringify(entry.category)},`,
    `    handle: ${JSON.stringify(entry.handle)},`,
    `    channelId: ${JSON.stringify(entry.channelId)},`,
    `    videoId: ${JSON.stringify(entry.videoId)},`,
    `    titleKey: ${JSON.stringify(entry.titleKey)},`,
    `    at: { lat: ${entry.at!.lat}, lng: ${entry.at!.lng}, timeZone: ${JSON.stringify(entry.at!.timeZone)}, country: ${JSON.stringify(entry.at!.country)} },`,
    "  },",
  ];
  return lines.join("\n");
}

async function resolveChannelIdFromAuthorUrl(authorUrl: string): Promise<string | null> {
  const channelMatch = /youtube\.com\/channel\/(UC[\w-]{22})/.exec(authorUrl);
  if (channelMatch !== null) return channelMatch[1]!;
  const handleMatch = /youtube\.com\/@([\w.-]+)/.exec(authorUrl);
  if (handleMatch === null) return null;
  const handle = handleMatch[1]!;
  if (ytMetaCache.has(`handle:${handle}`)) {
    const cached = ytMetaCache.get(`handle:${handle}`);
    return cached?.channelId ?? null;
  }
  await new Promise((r) => setTimeout(r, 500));
  try {
    const html = await fetchWithRetry(`https://www.youtube.com/@${handle}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "accept-language": "en-US,en;q=0.9",
      },
    }).then((r) => r.text());
    const external = /"externalId":"(UC[\w-]{22})"/.exec(html);
    const channelId = external?.[1] ?? /"channelId":"(UC[\w-]{22})"/.exec(html)?.[1];
    if (channelId === undefined) {
      ytMetaCache.set(`handle:${handle}`, null);
      return null;
    }
    ytMetaCache.set(`handle:${handle}`, {
      channelId,
      title: handle,
      channelTitle: handle,
    });
    return channelId;
  } catch {
    return null;
  }
}

async function fetchYoutubeMeta(
  videoId: string,
): Promise<{ channelId: string; title: string; channelTitle: string } | null> {
  if (ytMetaCache.has(videoId)) return ytMetaCache.get(videoId)!;

  // 1) oembed (watch ページより bot 判定されにくい) → author_url から channelId
  try {
    const oembedUrl =
      "https://www.youtube.com/oembed?format=json&url=" +
      encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`);
    await new Promise((r) => setTimeout(r, 250));
    const oembedRes = await fetchWithRetry(oembedUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
    });
    if (oembedRes.ok) {
      const oembed = (await oembedRes.json()) as {
        title?: string;
        author_name?: string;
        author_url?: string;
      };
      if (
        typeof oembed.title === "string" &&
        oembed.title.length > 0 &&
        typeof oembed.author_url === "string"
      ) {
        const channelId = await resolveChannelIdFromAuthorUrl(oembed.author_url);
        if (channelId !== null) {
          const meta = {
            channelId,
            title: oembed.title,
            channelTitle: oembed.author_name ?? channelId,
          };
          ytMetaCache.set(videoId, meta);
          return meta;
        }
      }
    }
  } catch {
    // fall through
  }

  // 2) watch ページ (失敗しがちだが最後の手段)
  await new Promise((r) => setTimeout(r, 700));
  try {
    const html = await fetchWithRetry(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "accept-language": "en-US,en;q=0.9",
      },
    }).then((r) => r.text());
    const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\})\s*;/s);
    if (playerMatch === null) {
      ytMetaCache.set(videoId, null);
      return null;
    }
    const player = JSON.parse(playerMatch[1]!) as {
      videoDetails?: {
        channelId?: string;
        title?: string;
        author?: string;
      };
    };
    const channelId = player.videoDetails?.channelId;
    const title = player.videoDetails?.title;
    const channelTitle = player.videoDetails?.author;
    if (
      channelId === undefined ||
      channelId.length === 0 ||
      title === undefined ||
      title.length === 0
    ) {
      ytMetaCache.set(videoId, null);
      return null;
    }
    const meta = {
      channelId,
      title,
      channelTitle: channelTitle ?? channelId,
    };
    ytMetaCache.set(videoId, meta);
    return meta;
  } catch {
    return null;
  }
}

async function resolveFromCoords(
  lat: number,
  lng: number,
  countryCode: string,
): Promise<NonNullable<CamPlace["at"]> | null> {
  const timeZone = await timezoneAt(lat, lng);
  if (timeZone === null) return null;
  return {
    lat: Number(lat.toFixed(4)),
    lng: Number(lng.toFixed(4)),
    timeZone,
    country: countryCode,
  };
}

/** placeHint / 検索クエリを英語の都市名に寄せる(Open-Meteo は非ASCIIが空振りしやすい)。 */
function englishPlaceHint(hint: string, countryCode: string): PlaceQuery | null {
  const text = hint.trim();
  if (text.length < 2) return null;
  const mapped: [RegExp, string, string][] = [
    [/札幌|sapporo/i, "Sapporo", "JP"],
    [/函館|hakodate/i, "Hakodate", "JP"],
    [/仙台|sendai/i, "Sendai", "JP"],
    [/東京|tokyo|新宿|渋谷/i, "Tokyo", "JP"],
    [/横浜|yokohama/i, "Yokohama", "JP"],
    [/名古屋|nagoya/i, "Nagoya", "JP"],
    [/金沢|kanazawa/i, "Kanazawa", "JP"],
    [/大阪|osaka/i, "Osaka", "JP"],
    [/京都|kyoto/i, "Kyoto", "JP"],
    [/神戸|kobe/i, "Kobe", "JP"],
    [/広島|hiroshima/i, "Hiroshima", "JP"],
    [/福岡|fukuoka/i, "Fukuoka", "JP"],
    [/長崎|nagasaki/i, "Nagasaki", "JP"],
    [/鹿児島|kagoshima/i, "Kagoshima", "JP"],
    [/沖縄|okinawa|那覇/i, "Naha", "JP"],
    [/富士山|fuji/i, "Fujiyoshida", "JP"],
    [/부산|busan|釜山/i, "Busan", "KR"],
    [/서울|seoul|ソウル/i, "Seoul", "KR"],
    [/제주|jeju|済州/i, "Jeju City", "KR"],
    [/台北|taipei/i, "Taipei", "TW"],
    [/高雄|kaohsiung/i, "Kaohsiung", "TW"],
    [/香港|hong kong/i, "Hong Kong", "HK"],
    [/上海|shanghai/i, "Shanghai", "CN"],
    [/北京|beijing/i, "Beijing", "CN"],
    [/广州|guangzhou/i, "Guangzhou", "CN"],
  ];
  for (const [re, name, cc] of mapped) {
    if (re.test(text)) return { name, countryCode: cc };
  }
  // すでに ASCII ならそのまま(国コード付き)
  if (/^[\x20-\x7E]+$/.test(text) && text.length <= 40) {
    return { name: text.replace(/\s+/g, " ").trim(), countryCode };
  }
  return null;
}

function prioritizeGeocodeQueries(queries: PlaceQuery[]): PlaceQuery[] {
  // ASCII(英語都市名)を先に、その中でも短いものを優先。漢字断片は枠を食い潰すので後回し。
  const score = (q: PlaceQuery): number => {
    const ascii = /^[\x20-\x7E]+$/.test(q.name);
    const len = q.name.length;
    if (ascii && len >= 3 && len <= 24) return len; // 小さいほど先
    if (ascii) return 100 + len;
    return 1000 + len;
  };
  const seen = new Set<string>();
  return [...queries]
    .sort((a, b) => score(a) - score(b))
    .filter((q) => {
      const k = `${q.countryCode}\0${q.name}\0${q.admin1 ?? ""}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 12);
}

async function resolveFromGeocode(
  title: string,
  channelTitle: string,
  countryCode: string,
  placeHint?: string,
): Promise<NonNullable<CamPlace["at"]> | null> {
  const queries = guessPlaceQueries(title, channelTitle, countryCode);
  if (placeHint !== undefined && placeHint.trim().length >= 2) {
    const mapped = englishPlaceHint(placeHint, countryCode);
    if (mapped !== null) queries.unshift(mapped);
    // 生の非ASCII hint は Open-Meteo で空振りしやすいので先頭に載せない
    else if (/^[\x20-\x7E]+$/.test(placeHint.trim())) {
      queries.unshift({ name: placeHint.trim(), countryCode });
    }
  }
  const ordered = prioritizeGeocodeQueries(queries);
  for (const q of ordered) {
    const hit = await geocode(q);
    if (hit !== null && typeof hit.timezone === "string" && hit.timezone.length > 0) {
      const lat = Number(hit.latitude.toFixed(4));
      const lng = Number(hit.longitude.toFixed(4));
      // 国の重心っぽい粗い座標は近似なので落とす
      if (Number.isInteger(lat) && Number.isInteger(lng)) continue;
      return {
        lat,
        lng,
        timeZone: hit.timezone,
        country: hit.country_code,
      };
    }
  }
  return null;
}

function exportHeader(entries: CamPlace[]): string {
  const body = entries.map(serializeEntry).join("\n");
  return `// このファイルは scripts/import-bulk-cams.ts が生成する。手で編集しない。
// 元データ: camlisted (zenith605-2/camlisted) + Live-Environment-Streams (YouTube 部分)
// 生成: npm run cams:import-bulk

export const CAM_PLACES_BULK = [
${body}
];
`;
}

async function addEntry(
  bulk: CamPlace[],
  usedIds: Set<string>,
  seenKeys: Set<string>,
  params: {
    videoId: string;
    titleKey: string;
    channelId: string;
    handle: string;
    label: string;
    category: CamPlace["category"];
    at: NonNullable<CamPlace["at"]>;
  },
): Promise<boolean> {
  const key = `${params.channelId}\0${params.titleKey}`;
  if (seenKeys.has(key)) return false;
  seenKeys.add(key);

  const id = uniqueId(slugify(`${params.at.country}-${params.label}`), usedIds);
  bulk.push({
    id,
    nameJa: params.label,
    nameEn: params.label,
    category: params.category,
    handle: params.handle,
    channelId: params.channelId,
    videoId: params.videoId,
    titleKey: params.titleKey,
    at: params.at,
  });
  return true;
}

async function main(): Promise<void> {
  const camlistedJson = JSON.parse(await readFile(CAMLISTED_PATH, "utf8")) as {
    streams: CamlistedStream[];
  };
  const geojson = JSON.parse(await readFile(GEOJSON_PATH, "utf8")) as {
    features: GeoFeature[];
  };

  const camlistedByVideo = new Map(camlistedJson.streams.map((s) => [s.video_id, s]));

  const existingTitleKeys = new Set(
    [...CAM_PLACES_CURATED, ...EXISTING_BULK].map((p) => `${p.channelId}\0${p.titleKey}`),
  );
  const existingVideoIds = new Set(
    [...CAM_PLACES_CURATED, ...EXISTING_BULK].map((p) => p.videoId),
  );
  const usedIds = new Set([...CAM_PLACES_CURATED, ...EXISTING_BULK].map((p) => p.id));
  const seenKeys = new Set(existingTitleKeys);
  const seenVideos = new Set(existingVideoIds);

  const targetBulk = TARGET_TOTAL - CAM_PLACES_CURATED.length;
  const need = targetBulk - EXISTING_BULK.length;
  const bulk: CamPlace[] = [...(EXISTING_BULK as CamPlace[])];
  const failures: string[] = [];

  async function flush(): Promise<void> {
    await mkdir("scripts/out", { recursive: true });
    await writeFile(OUTPUT_PATH, exportHeader(bulk));
  }

  if (need <= 0) {
    console.log(`既に ${CAM_PLACES_CURATED.length + bulk.length} 件あるので追加不要`);
    await flush();
    return;
  }

  console.log(`既存 bulk ${EXISTING_BULK.length} 件 / あと ${need} 件追加`);

  // スクレイプ結果を追加候補として読む(無くても続行)
  let scrapeHits: {
    videoId: string;
    title: string;
    channelId: string;
    channelTitle: string;
    countryCode: string;
    query?: string;
  }[] = [];
  try {
    scrapeHits = JSON.parse(await readFile(SCRAPE_PATH, "utf8")) as typeof scrapeHits;
    console.log(`scrape 候補 ${scrapeHits.length} 件`);
  } catch {
    console.log("scrape 結果なし(scripts/out/search-scrape.json)");
  }

  // Phase 1: geojson YouTube(座標あり)。
  // camlisted にあればそれを使い、無ければ watch ページから channelId を取る。
  for (const feature of geojson.features) {
    if (bulk.length >= targetBulk) break;
    if (feature.properties?.url === undefined) continue;
    const videoMatch = /[?&]v=([^&]+)/.exec(feature.properties.url);
    if (videoMatch === null) continue;
    const videoId = videoMatch[1]!;
    if (seenVideos.has(videoId)) continue;

    const coords = feature.geometry?.coordinates;
    const countryCode = feature.properties.country_code;
    if (coords === undefined || countryCode === undefined) continue;

    const [lng, lat] = coords;
    // 国重心っぽい整数座標は近似なので落とす
    if (Number.isInteger(lat) && Number.isInteger(lng)) continue;

    const listed = camlistedByVideo.get(videoId);
    let channelId: string;
    let titleKey: string;
    let handle: string;
    let category: CamPlace["category"];
    let label: string;

    if (listed !== undefined) {
      if (!listed.embeddable || listed.visibility !== "listed") continue;
      if (listed.channel_id.length === 0) continue;
      channelId = listed.channel_id;
      titleKey = listed.title;
      handle = listed.channel_title;
      category = CATEGORY_MAP[listed.category] ?? sceneCategory(feature.properties.scene_type);
      label = displayName(listed.title, listed.channel_title);
    } else {
      const meta = await fetchYoutubeMeta(videoId);
      if (meta === null) continue;
      channelId = meta.channelId;
      titleKey = meta.title;
      handle = meta.channelTitle;
      category = sceneCategory(feature.properties.scene_type);
      label = displayName(
        feature.properties.display_name ?? feature.properties.name ?? meta.title,
        meta.channelTitle,
      );
    }

    const at = await resolveFromCoords(lat, lng, countryCode);
    if (at === null) continue;

    const added = await addEntry(bulk, usedIds, seenKeys, {
      videoId,
      titleKey,
      channelId,
      handle,
      label,
      category,
      at,
    });
    if (added) {
      seenVideos.add(videoId);
      if (bulk.length % 25 === 0) {
        await flush();
        console.log(`  … ${bulk.length} 件 (phase 1)`);
      }
    }
  }

  type Candidate = {
    videoId: string;
    title: string;
    channelId: string;
    channelTitle: string;
    country: string | null;
    category: string;
    placeHint?: string;
  };

  const candidates: Candidate[] = [];
  for (const s of camlistedJson.streams) {
    if (
      s.embeddable === true &&
      s.visibility === "listed" &&
      s.channel_id.length > 0 &&
      s.video_id.length > 0 &&
      s.title.trim().length > 0 &&
      !seenVideos.has(s.video_id)
    ) {
      candidates.push({
        videoId: s.video_id,
        title: s.title,
        channelId: s.channel_id,
        channelTitle: s.channel_title,
        country: s.country,
        category: s.category,
      });
    }
  }
  for (const s of scrapeHits) {
    if (seenVideos.has(s.videoId)) continue;
    if (s.channelId.length === 0 || s.title.trim().length === 0) continue;
    const hint = (s as { query?: string }).query
      ?.replace(/\blive\s*cam(era)?s?\b/gi, " ")
      .replace(/\bwebcam\b/gi, " ")
      .replace(/\b24\/7\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    candidates.push({
      videoId: s.videoId,
      title: s.title,
      channelId: s.channelId,
      channelTitle: s.channelTitle,
      country: s.countryCode,
      category: "city",
      placeHint: hint,
    });
  }

  console.log(`phase 2 候補 ${candidates.length} 件`);

  const PHASE2_CONCURRENCY = 8;
  let candidateIndex = 0;
  const unresolved: Candidate[] = [];

  async function phase2Worker(): Promise<void> {
    while (true) {
      if (bulk.length >= targetBulk) return;
      const i = candidateIndex++;
      if (i >= candidates.length) return;
      const stream = candidates[i]!;
      if (seenVideos.has(stream.videoId)) continue;
      seenVideos.add(stream.videoId);

      const countryCode = stream.country ?? inferCountry(stream.title, stream.channelTitle);
      if (countryCode === null) {
        unresolved.push(stream);
        continue;
      }

      const at = await resolveFromGeocode(
        stream.title,
        stream.channelTitle,
        countryCode,
        stream.placeHint,
      );
      if (at == null) {
        unresolved.push({ ...stream, country: countryCode });
        failures.push(`[${stream.videoId}] 座標未解決: ${stream.title}`);
        continue;
      }

      if (bulk.length >= targetBulk) return;

      const label = displayName(stream.title, stream.channelTitle);
      const added = await addEntry(bulk, usedIds, seenKeys, {
        videoId: stream.videoId,
        titleKey: stream.title,
        channelId: stream.channelId,
        handle: stream.channelTitle,
        label,
        category: CATEGORY_MAP[stream.category] ?? "city",
        at,
      });
      if (added && bulk.length % 50 === 0) {
        await flush();
        console.log(`  … ${bulk.length} 件 (phase 2)`);
      }
    }
  }

  await Promise.all(Array.from({ length: PHASE2_CONCURRENCY }, () => phase2Worker()));

  // Phase 3: Nominatim は残りが少ないときだけ
  const stillNeed = targetBulk - bulk.length;
  const skipNominatim = process.env["SKIP_NOMINATIM"] === "1" || stillNeed > 400;
  if (stillNeed <= 0 || unresolved.length === 0 || skipNominatim) {
    await flush();
    console.log(`✓ ${bulk.length} 件を ${OUTPUT_PATH} に書き出した (目標追加 ${need} 件)`);
    if (skipNominatim && stillNeed > 0) {
      console.log(`(Nominatim スキップ: 残り ${stillNeed} / 未解決 ${unresolved.length})`);
    }
    if (failures.length > 0) {
      console.log(`\n△ Open-Meteo 未解決 ${failures.length} 件`);
    }
    return;
  }
  const nominatimBudget = Math.min(unresolved.length, stillNeed + 30, 200);
  console.log(`phase 3 Nominatim 候補 ${nominatimBudget}/${unresolved.length} 件 / あと ${stillNeed}`);
  for (const stream of unresolved.slice(0, nominatimBudget)) {
    if (bulk.length >= targetBulk) break;
    const countryCode = stream.country;
    if (countryCode === null) continue;
    const queries = guessPlaceQueries(stream.title, stream.channelTitle, countryCode)
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 4);
    let at: NonNullable<CamPlace["at"]> | null = null;
    for (const q of queries) {
      const hit = await geocodeNominatim(q);
      if (hit !== null && hit.timezone.length > 0) {
        const lat = Number(hit.latitude.toFixed(4));
        const lng = Number(hit.longitude.toFixed(4));
        if (Number.isInteger(lat) && Number.isInteger(lng)) continue;
        at = { lat, lng, timeZone: hit.timezone, country: hit.country_code };
        break;
      }
    }
    if (at === null) continue;
    const label = displayName(stream.title, stream.channelTitle);
    const added = await addEntry(bulk, usedIds, seenKeys, {
      videoId: stream.videoId,
      titleKey: stream.title,
      channelId: stream.channelId,
      handle: stream.channelTitle,
      label,
      category: CATEGORY_MAP[stream.category] ?? "city",
      at,
    });
    if (added && bulk.length % 25 === 0) {
      await flush();
      console.log(`  … ${bulk.length} 件 (phase 3)`);
    }
  }

  await flush();
  console.log(`✓ ${bulk.length} 件を ${OUTPUT_PATH} に書き出した (目標追加 ${need} 件)`);
  if (failures.length > 0) {
    console.log(`\n△ スキップ ${failures.length} 件 (先頭 5 件):`);
    for (const f of failures.slice(0, 5)) console.log(`  ${f}`);
  }
}

await main();
