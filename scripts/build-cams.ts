// cam-places.ts(人手のキュレーション)と candidates.json(実在の確認結果)から
// src/data/cams.ts を生成する。
//
//   npm run cams:discover   # 先にチャンネルと配信中の一覧を取る
//   npm run cams:build      # → src/data/cams.ts
//
// 座標とタイムゾーンは Open-Meteo のジオコーディング(キー不要)で解決する。
// 同名の町を取り違えないよう admin1 で絞り、合致しなければ失敗として報告して
// 黙って別の場所を採用しない。

import { readFile, writeFile } from "node:fs/promises";
import { CAM_PLACES, type CamPlace } from "./cam-places.ts";
import type { ChannelResult } from "./discover-cams.ts";

const GEOCODE_DELAY_MS = 400;
const EMBED_CHECK_DELAY_MS = 300;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36";

/**
 * 外部サイトでの再生が許可されているか。所有者が禁止している配信を地図に
 * 載せると、開いた人には「動画を再生できません」しか出ない(SkylineWebcams が
 * これに当たった)。Worker の生存確認でも blocked として拾えるが、公開初日から
 * 死んだピンを並べる理由はないので、データを作る時点で外す。
 */
async function isPlayableInEmbed(videoId: string): Promise<boolean> {
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { "user-agent": UA, "accept-language": "en-US,en" },
  });
  if (!res.ok) throw new Error(`視聴ページ取得に失敗 HTTP ${res.status}`);
  const html = await res.text();
  const match = /"playableInEmbed":(true|false)/.exec(html);
  if (match === null) throw new Error("playableInEmbed を読めなかった");
  return match[1] === "true";
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
  /** 再探索でカメラを見分けるための配信タイトル。 */
  titleKey: string;
  lat: number;
  lng: number;
  timeZone: string;
  country: string;
  channelId: string;
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
    .map(({ place, lat, lng, timeZone, country, channelId, titleKey, origin }) => {
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
      channelId: ${JSON.stringify(channelId)},
      titleKey: ${JSON.stringify(titleKey)},
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
  const channels = JSON.parse(
    await readFile("scripts/out/candidates.json", "utf8"),
  ) as ChannelResult[];
  // 配信タイトルは discover の結果から引く(1 チャンネルに何十台もぶら下がるので、
  // 再探索のときこれが無いと別のカメラを掴む)。
  const titleByVideoId = new Map(
    channels.flatMap((c) => c.live.map((v) => [v.videoId, v.title] as const)),
  );
  const channelIdByHandle = new Map(
    channels
      .filter((c): c is ChannelResult & { channelId: string } => c.channelId !== null)
      .map((c) => [c.handle, c.channelId]),
  );

  const resolved: Resolved[] = [];
  const failures: string[] = [];

  for (const place of CAM_PLACES) {
    const channelId = channelIdByHandle.get(place.handle);
    if (channelId === undefined) {
      failures.push(`[${place.id}] チャンネル @${place.handle} が未解決`);
      continue;
    }

    try {
      if (!(await isPlayableInEmbed(place.videoId))) {
        failures.push(`[${place.id}] 埋め込み再生が禁止されている(所有者の設定)`);
        continue;
      }
    } catch (error) {
      failures.push(`[${place.id}] 埋め込み可否を確認できなかった: ${String(error)}`);
      continue;
    }
    await new Promise((r) => setTimeout(r, EMBED_CHECK_DELAY_MS));

    const titleKey = titleByVideoId.get(place.videoId);
    if (titleKey === undefined) {
      failures.push(`[${place.id}] candidates.json に配信タイトルが無い(先に cams:discover を回すこと)`);
      continue;
    }

    if (place.at !== undefined) {
      resolved.push({
        place,
        ...place.at,
        channelId,
        titleKey,
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
        channelId,
        titleKey,
        origin: `座標: Open-Meteo ジオコーディング "${hit.name}"${hit.admin1 === undefined ? "" : `, ${hit.admin1}`}`,
      });
    } catch (error) {
      failures.push(`[${place.id}] ${String(error)}`);
    }
    await new Promise((r) => setTimeout(r, GEOCODE_DELAY_MS));
  }

  await writeFile("src/data/cams.ts", serialize(resolved));

  console.log(`✓ ${resolved.length} 件を src/data/cams.ts に書き出した`);
  if (failures.length > 0) {
    console.log(`\n✗ 取り込めなかった ${failures.length} 件:`);
    for (const f of failures) console.log(`  ${f}`);
  }
}

await main();
