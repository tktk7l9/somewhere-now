// cam-places.ts(人手のキュレーション)と candidates.json(実在の確認結果)から
// src/data/cams.ts を生成する。
//
//   npm run cams:discover   # 先にチャンネルと配信中の一覧を取る
//   npm run cams:build      # → src/data/cams.ts
//
// 座標とタイムゾーンは Open-Meteo のジオコーディング(キー不要)で解決する。
// 同名の町を取り違えないよう admin1 で絞り、合致しなければ失敗として報告して
// 黙って別の場所を採用しない。

import { writeFile } from "node:fs/promises";
import { CAM_PLACES, type CamPlace } from "./cam-places.ts";

const GEOCODE_DELAY_MS = 400;
const EMBED_CHECK_DELAY_MS = 300;

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
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { "user-agent": UA, "accept-language": "en-US,en" },
  });
  if (!res.ok) return "unknown";
  const match = /"playableInEmbed":(true|false)/.exec(await res.text());
  if (match === null) return "unknown";
  return match[1] === "true" ? "allowed" : "forbidden";
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
//           scripts/out/candidates.json(実在の確認結果)
// 生成: npm run cams:discover && npm run cams:build
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

async function main(): Promise<void> {

  const resolved: Resolved[] = [];
  const failures: string[] = [];
  const warnings: string[] = [];

  for (const place of CAM_PLACES) {
    const embeddability = await embeddabilityOf(place.videoId);
    if (embeddability === "forbidden") {
      failures.push(`[${place.id}] 埋め込み再生が禁止されている(所有者の設定)ので外した`);
      continue;
    }
    if (embeddability === "unknown") {
      warnings.push(`[${place.id}] 記録した配信が消えている。カメラは残すので、再探索が次の配信を探す`);
    }
    await new Promise((r) => setTimeout(r, EMBED_CHECK_DELAY_MS));

    if (place.at !== undefined) {
      resolved.push({
        place,
        ...place.at,
        origin: "座標: 著名なランドマークとして明示指定",
      });
      continue;
    }

    try {
      const hit = await geocode(place.place!);
      resolved.push({
        place,
        lat: Number(hit.latitude.toFixed(4)),
        lng: Number(hit.longitude.toFixed(4)),
        timeZone: hit.timezone,
        country: hit.country_code,
        origin: `座標: Open-Meteo ジオコーディング "${hit.name}"${hit.admin1 === undefined ? "" : `, ${hit.admin1}`}`,
      });
    } catch (error) {
      failures.push(`[${place.id}] ${String(error)}`);
    }
    await new Promise((r) => setTimeout(r, GEOCODE_DELAY_MS));
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
