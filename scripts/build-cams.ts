// cam-places.ts(人手のキュレーション)と cam-places-bulk.ts(一括取り込み)から
// src/data/cams.ts を生成する。
//
//   npm run cams:discover   # 先にチャンネルと配信中の一覧を取る
//   npm run cams:build      # → src/data/cams.ts
//
// 座標とタイムゾーンは Open-Meteo のジオコーディング(キー不要)で解決する。
// 同名の町を取り違えないよう admin1 で絞り、合致しなければ失敗として報告して
// 黙って別の場所を採用しない。
//
// 埋め込み可否: 人手キュレーションは毎回確認する。一括取り込み分は取り込み時に
// camlisted の embeddable=true で既に絞っているので、ここではスキップする
// (3000 件規模で YouTube に逐次問い合わせると現実的な時間に収まらない)。

import { writeFile } from "node:fs/promises";
import { CAM_PLACES_CURATED, type CamPlace } from "./cam-places.ts";
import { CAM_PLACES_BULK } from "./cam-places-bulk.ts";

const CAM_PLACES: CamPlace[] = [
  ...(CAM_PLACES_CURATED as CamPlace[]),
  ...(CAM_PLACES_BULK as CamPlace[]),
];

const BULK_IDS = new Set(CAM_PLACES_BULK.map((p) => p.id));

const GEOCODE_DELAY_MS = 400;
const EMBED_CONCURRENCY = 12;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36";

/**
 * 外部サイトでの再生が許可されているか。
 *
 * 2 つの「否」を区別する必要がある:
 *   forbidden … 所有者が埋め込みを禁止している。恒久的な性質なので**外す**
 *               (SkylineWebcams がこれ。開いても「再生できません」しか出ない)。
 *   unknown   … 配信が消えていて判定できない。カメラ自体は生きているかも
 *               しれないので**残す**。Worker の再探索がタイトルを手がかりに
 *               次の配信を見つける。ここで落とすとカメラが永久に失われる。
 */
type Embeddability = "allowed" | "forbidden" | "unknown";

async function embeddabilityOf(videoId: string): Promise<Embeddability> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "user-agent": UA, "accept-language": "en-US,en" },
    });
    if (!res.ok) return "unknown";
    const match = /"playableInEmbed":(true|false)/.exec(await res.text());
    if (match === null) return "unknown";
    return match[1] === "true" ? "allowed" : "forbidden";
  } catch {
    return "unknown";
  }
}

interface GeocodeHit {
  latitude: number;
  longitude: number;
  timezone: string;
  country_code: string;
  admin1?: string;
  name: string;
}

interface Resolved {
  place: CamPlace;
  lat: number;
  lng: number;
  timeZone: string;
  country: string;
  /** 座標の出どころ。生成物のコメントに残す。 */
  origin: string;
}

async function geocode(query: NonNullable<CamPlace["place"]>): Promise<GeocodeHit> {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(query.name)}&count=10&language=en` +
    `&countryCode=${query.countryCode}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`ジオコーディング失敗 HTTP ${res.status}`);

  const results = ((await res.json()) as { results?: GeocodeHit[] }).results ?? [];
  if (results.length === 0) throw new Error(`該当なし: ${query.name}`);

  if (query.admin1 === undefined) return results[0]!;

  const hit = results.find((r) => r.admin1 === query.admin1);
  if (hit === undefined) {
    const seen = [...new Set(results.map((r) => r.admin1 ?? "?"))].join(", ");
    throw new Error(`admin1 が一致しない(期待: ${query.admin1} / 候補: ${seen})`);
  }
  return hit;
}

function serialize(resolved: readonly Resolved[]): string {
  const entries = resolved
    .map(({ place, lat, lng, timeZone, country, origin }) => {
      const p = place;
      return `  {
    // ${origin}
    id: ${JSON.stringify(p.id)},
    name: { ja: ${JSON.stringify(p.nameJa)}, en: ${JSON.stringify(p.nameEn)} },
    lat: ${lat},
    lng: ${lng},
    timeZone: ${JSON.stringify(timeZone)},
    category: ${JSON.stringify(p.category)},
    country: ${JSON.stringify(country)},
    source: {
      videoId: ${JSON.stringify(p.videoId)},
      channelId: ${JSON.stringify(p.channelId)},
      titleKey: ${JSON.stringify(p.titleKey)},
    },
  },`;
    })
    .join("\n");

  return `// このファイルは scripts/build-cams.ts が生成する。手で編集しない。
// 元データ: scripts/cam-places.ts(人手のキュレーション)
//           scripts/cam-places-bulk.ts(一括取り込み)
// 生成: npm run cams:import-bulk && npm run cams:build
//
// videoId は生成時点でライブだった配信。配信が変わっても Worker の再探索が
// titleKey を手がかりに現在の配信を解決するので、ここが古くなっても地図は死なない。
// titleKey は「そのカメラの配信タイトル」で、1 チャンネルに何十台もある中から
// 目当てのカメラを見分けるために要る。

import type { Cam } from "../domain/cams";

export const CAMS: Cam[] = [
${entries}
];
`;
}

async function resolvePlace(
  place: CamPlace,
  embeddability: Embeddability,
): Promise<{ resolved?: Resolved; failure?: string; warning?: string }> {
  if (embeddability === "forbidden") {
    return { failure: `[${place.id}] 埋め込み再生が禁止されている(所有者の設定)ので外した` };
  }
  const warning =
    embeddability === "unknown"
      ? `[${place.id}] 記録した配信が消えている。カメラは残すので、再探索が次の配信を探す`
      : undefined;

  if (place.at !== undefined) {
    return {
      resolved: {
        place,
        ...place.at,
        origin: "座標: 著名なランドマークとして明示指定",
      },
      warning,
    };
  }

  try {
    const hit = await geocode(place.place!);
    return {
      resolved: {
        place,
        lat: Number(hit.latitude.toFixed(4)),
        lng: Number(hit.longitude.toFixed(4)),
        timeZone: hit.timezone,
        country: hit.country_code,
        origin: `座標: Open-Meteo ジオコーディング "${hit.name}"${hit.admin1 === undefined ? "" : `, ${hit.admin1}`}`,
      },
      warning,
    };
  } catch (error) {
    return { failure: `[${place.id}] ${String(error)}`, warning };
  }
}

async function mapPool<T, R>(
  items: readonly T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker(): Promise<void> {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]!);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

async function main(): Promise<void> {
  const resolved: Resolved[] = [];
  const failures: string[] = [];
  const warnings: string[] = [];

  const curated = CAM_PLACES.filter((p) => !BULK_IDS.has(p.id));
  const bulk = CAM_PLACES.filter((p) => BULK_IDS.has(p.id));

  // 人手分だけ埋め込み確認(並列)。bulk は取り込み時に embeddable で絞済み。
  const curatedResults = await mapPool(curated, EMBED_CONCURRENCY, async (place) => {
    const embeddability = await embeddabilityOf(place.videoId);
    if (place.place !== undefined) {
      await new Promise((r) => setTimeout(r, GEOCODE_DELAY_MS));
    }
    return resolvePlace(place, embeddability);
  });

  for (const result of curatedResults) {
    if (result.warning !== undefined) warnings.push(result.warning);
    if (result.failure !== undefined) failures.push(result.failure);
    else if (result.resolved !== undefined) resolved.push(result.resolved);
  }

  for (const place of bulk) {
    const result = await resolvePlace(place, "allowed");
    if (result.failure !== undefined) failures.push(result.failure);
    else if (result.resolved !== undefined) resolved.push(result.resolved);
  }

  await writeFile("src/data/cams.ts", serialize(resolved));

  console.log(`✓ ${resolved.length} 件を src/data/cams.ts に書き出した`);
  if (warnings.length > 0) {
    console.log(`\n△ 残したが注意が要る ${warnings.length} 件:`);
    for (const w of warnings) console.log(`  ${w}`);
  }
  if (failures.length > 0) {
    console.log(`\n✗ 取り込めなかった ${failures.length} 件:`);
    for (const f of failures) console.log(`  ${f}`);
  }
}

await main();
