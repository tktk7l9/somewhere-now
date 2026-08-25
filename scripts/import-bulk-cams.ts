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

const TARGET_TOTAL = 1000;
const GEOCODE_DELAY_MS = 200;
const FETCH_RETRIES = 4;
const CAMLISTED_PATH = "scripts/out/camlisted-streams.json";
const GEOJSON_PATH = "scripts/out/streams.geojson";
const OUTPUT_PATH = "scripts/cam-places-bulk.ts";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36";

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
    `?name=${encodeURIComponent(query.name)}&count=10&language=en` +
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
      if (matched === undefined) {
        geocodeCache.set(key, null);
        return null;
      }
      hit = matched;
    }

    geocodeCache.set(key, hit);
    return hit;
  } catch {
    geocodeCache.set(key, null);
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
  const cleaned = title
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/【[^】]*】/g, " ")
    .replace(/\blive\s*cam(era)?\b/gi, " ")
    .replace(/\b24\s*\/\s*7\b/gi, " ")
    .replace(/\b(stream|live|webcam|cam)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tryPush = (name: string, cc: string, admin1?: string): void => {
    const n = name.replace(/[|–—]/g, " ").replace(/\s+/g, " ").trim();
    if (n.length < 2 || n.length > 80) return;
    queries.push({ name: n, countryCode: cc, admin1 });
  };

  const cityState = /^(.+?),\s*([A-Za-z .]{2,30})$/.exec(cleaned);
  if (cityState !== null && countryCode === "US") {
    const city = cityState[1]!.trim();
    const region = cityState[2]!.trim();
    const admin1 = US_STATE[region.toUpperCase()] ?? region;
    tryPush(city, "US", admin1.length > 2 ? admin1 : undefined);
  }

  for (const part of cleaned.split(/[|–—]/)) {
    const segment = part.trim();
    if (segment.length >= 2) tryPush(segment, countryCode);
  }

  const head = cleaned.split(/[-–—(]/)[0]?.trim();
  if (head !== undefined && head.length >= 2) tryPush(head, countryCode);

  const channelClean = channelTitle
    .replace(/\blive\s*cam(era)?\b/gi, " ")
    .replace(/\b(webcam|channel|official)\b/gi, " ")
    .trim();
  if (channelClean.length >= 2) tryPush(channelClean, countryCode);

  // 短い地名(先頭 1〜2 語)でも試す
  const words = cleaned.split(/\s+/).filter((w) => w.length > 2);
  if (words.length >= 1) tryPush(words[0]!, countryCode);
  if (words.length >= 2) tryPush(`${words[0]} ${words[1]}`, countryCode);

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
    [/\bbrazil\b|\bbrasil\b|\bsão paulo\b/, "BR"],
    [/\baustralia\b|\bsydney\b|\bmelbourne\b/, "AU"],
    [/\bcanada\b|\btoronto\b|\bvancouver\b/, "CA"],
    [/\bkorea\b|\bseoul\b|\bbusan\b|한국/, "KR"],
    [/\btaiwan\b|台灣|台湾/, "TW"],
    [/\bthailand\b|\bbangkok\b/, "TH"],
    [/\bindonesia\b|\bjakarta\b|\bbali\b/, "ID"],
    [/\bindia\b|\bmumbai\b|\bdelhi\b/, "IN"],
    [/\bnetherlands\b|\bamsterdam\b|\bholland\b/, "NL"],
    [/\bpoland\b|\bwarsaw\b|\bkrakow\b/, "PL"],
    [/\bswitzerland\b|\bbern\b|\bzürich\b/, "CH"],
    [/\baustria\b|\bvienna\b|\bwien\b/, "AT"],
    [/\bgreece\b|\bathens\b|\bcrete\b/, "GR"],
    [/\bturkey\b|\btürkiye\b|\bistanbul\b/, "TR"],
    [/\bmexico\b|\bcancún\b|\bcancun\b/, "MX"],
    [/\bphilippines\b|\bmanila\b/, "PH"],
    [/\bnew zealand\b|\bauckland\b/, "NZ"],
    [/\bsouth africa\b|\bcape town\b|\bjohannesburg\b/, "ZA"],
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

async function resolveFromGeocode(
  title: string,
  channelTitle: string,
  countryCode: string,
): Promise<NonNullable<CamPlace["at"]> | null> {
  for (const q of guessPlaceQueries(title, channelTitle, countryCode)) {
    const hit = await geocode(q);
    if (hit !== null) {
      return {
        lat: Number(hit.latitude.toFixed(4)),
        lng: Number(hit.longitude.toFixed(4)),
        timeZone: hit.timezone,
        country: hit.country_code,
      };
    }
  }
  return null;
}

async function fetchChannelMeta(videoId: string): Promise<{
  channelId: string;
  channelTitle: string;
  title: string;
} | null> {
  try {
    const res = await fetchWithRetry(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "user-agent": UA, "accept-language": "en-US,en" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const channelId = /"channelId":"(UC[A-Za-z0-9_-]{22})"/.exec(html)?.[1];
    const channelTitle = /"ownerChannelName":"((?:[^"\\]|\\.)*)"/.exec(html)?.[1];
    const title = /"title":"((?:[^"\\]|\\.)*)"/.exec(html)?.[1];
    if (channelId === undefined || title === undefined) return null;
    return {
      channelId,
      channelTitle:
        channelTitle === undefined ? channelId : (JSON.parse(`"${channelTitle}"`) as string),
      title: JSON.parse(`"${title}"`) as string,
    };
  } catch {
    return null;
  }
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

  if (bulk.length >= targetBulk) {
    await flush();
    return;
  }

  // Phase 1: geojson YouTube(座標あり) + camlisted 照合
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

    const listed = camlistedByVideo.get(videoId);
    if (listed !== undefined) {
      if (!listed.embeddable || listed.visibility !== "listed") continue;
    }

    const [lng, lat] = coords;
    const at = await resolveFromCoords(lat, lng, countryCode);
    if (at === null) continue;

    const label = displayName(
      listed?.title ?? feature.properties.display_name ?? feature.properties.name ?? videoId,
      listed?.channel_title ?? "Live Camera",
    );

    let channelId = listed?.channel_id;
    let handle = listed?.channel_title ?? "YouTube";
    let titleKey = listed?.title ?? label;
    const category = listed !== undefined
      ? (CATEGORY_MAP[listed.category] ?? sceneCategory(feature.properties.scene_type))
      : sceneCategory(feature.properties.scene_type);

    if (channelId === undefined) {
      const meta = await fetchChannelMeta(videoId);
      if (meta === null) {
        failures.push(`[${videoId}] channelId を取得できなかった`);
        continue;
      }
      channelId = meta.channelId;
      handle = meta.channelTitle;
      titleKey = meta.title;
    }

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

  // Phase 2: camlisted 残り(ジオコーディング)
  const camlistedCandidates = camlistedJson.streams
    .filter(
      (s) =>
        s.embeddable === true &&
        s.visibility === "listed" &&
        s.channel_id.length > 0 &&
        s.video_id.length > 0 &&
        s.title.trim().length > 0 &&
        !seenVideos.has(s.video_id),
    )
    .sort((a, b) => {
      const countryA = a.country ?? "Z";
      const countryB = b.country ?? "Z";
      return countryA.localeCompare(countryB);
    });

  for (const stream of camlistedCandidates) {
    if (bulk.length >= targetBulk) break;

    const countryCode = stream.country ?? inferCountry(stream.title, stream.channel_title);
    if (countryCode === null) continue;

    const at = await resolveFromGeocode(stream.title, stream.channel_title, countryCode);
    if (at == null) {
      failures.push(`[${stream.video_id}] 座標未解決: ${stream.title}`);
      continue;
    }

    const label = displayName(stream.title, stream.channel_title);
    const added = await addEntry(bulk, usedIds, seenKeys, {
      videoId: stream.video_id,
      titleKey: stream.title,
      channelId: stream.channel_id,
      handle: stream.channel_title,
      label,
      category: CATEGORY_MAP[stream.category] ?? "city",
      at,
    });
    if (added) {
      seenVideos.add(stream.video_id);
      if (bulk.length % 25 === 0) {
        await flush();
        console.log(`  … ${bulk.length} 件 (phase 2)`);
      }
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
