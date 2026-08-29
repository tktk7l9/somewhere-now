// 同じ座標に積み上がっているカメラの座標を引き直す。
//
// なぜ要るか: ジオコーダに投げる問い合わせの並べ替えが「短い ASCII を先」に
// なっていて、地名でなく一般語("New" "Beach" "City")が選ばれていた。結果、
// 5,720 台のうち 3,394 台(59%)が同じ座標の束に載っていた。最大の束は都心の
// 1 点に 203 台。"New York City" の 29 台はケンタッキー州の New にいた。
//
// 並べ替えは import-bulk-cams.ts で直した。このスクリプトは、その規則で
// **既存の束だけ**を引き直す。全件の引き直しは 1 万件超の問い合わせになり
// 無料枠(1 万/日)を超えるので、被害の集中しているところから手を付ける。
//
//   node --experimental-strip-types scripts/regeocode-piles.ts [最小の束の大きさ]
//
// 生成物: scripts/cam-places-bulk.ts(座標だけを書き換える)

import { readFile, writeFile } from "node:fs/promises";
import { argv } from "node:process";
import { CAM_PLACES_BULK } from "./cam-places-bulk.ts";
import { isCorroborated } from "./corroborate.ts";
import { isGenericPlaceWord, resolveWithEvidence } from "./import-bulk-cams.ts";

const OUTPUT_PATH = "scripts/cam-places-bulk.ts";
const MIN_PILE = Number(argv[2] ?? 10);
/** 引き直した先がここより遠ければ「動かした」と数える(km)。 */
const MOVED_KM = 1;

const toRad = (d: number): number => (d * Math.PI) / 180;
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const dLat = toRad(b.lat - a.lat) / 2;
  const dLng = toRad(b.lng - a.lng) / 2;
  const h =
    Math.sin(dLat) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(h)));
}

const piles = new Map<string, typeof CAM_PLACES_BULK>();
for (const place of CAM_PLACES_BULK) {
  if (place.at === undefined) continue;
  const key = `${place.at.lat},${place.at.lng}`;
  const bucket = piles.get(key) ?? [];
  bucket.push(place);
  piles.set(key, bucket);
}

const targets = [...piles.values()].filter((v) => v.length >= MIN_PILE).flat();
console.log(`束(${MIN_PILE}台以上)に載っているカメラ: ${targets.length} / ${CAM_PLACES_BULK.length}`);

const updates = new Map<string, { lat: number; lng: number; timeZone: string }>();
let moved = 0;
let kept = 0;
let failed = 0;
let unverified = 0;

for (const [i, place] of targets.entries()) {
  const before = place.at!;
  const title = place.titleKey ?? place.nameEn;
  const channel = place.handle ?? "";
  let next: Awaited<ReturnType<typeof resolveWithEvidence>> = null;
  try {
    next = await resolveWithEvidence(title, channel, before.country);
  } catch {
    next = null;
  }

  if (next === null) {
    failed++;
  } else if (distanceKm(before, next) < MOVED_KM) {
    kept++;
  } else if (next.country.toUpperCase() !== before.country.toUpperCase()) {
    // 国をまたぐ引き直しは信用しない。国コードは配信元由来で、
    // タイトルの断片より当てになる。
    kept++;
  } else if (!isCorroborated(next.matchedName, next.admin1, title, channel, isGenericPlaceWord)) {
    unverified++;
  } else {
    updates.set(place.id, { lat: next.lat, lng: next.lng, timeZone: next.timeZone });
    moved++;
  }

  if ((i + 1) % 50 === 0) {
    console.log(
      `  … ${i + 1}/${targets.length}  動かした ${moved} / 据え置き ${kept} / 根拠なし ${unverified} / 引けず ${failed}`,
    );
  }
}

console.log(`\n動かした ${moved} / 据え置き ${kept} / 根拠なし(据え置き) ${unverified} / 引けず ${failed}`);
if (updates.size === 0) {
  console.log("書き換えるものが無い。");
} else {
  const source = await readFile(OUTPUT_PATH, "utf8");
  let out = source;
  let rewritten = 0;
  for (const [id, at] of updates) {
    const re = new RegExp(
      `(id: "${id.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}",[\\s\\S]*?at: \\{ lat: )[-\\d.]+(, lng: )[-\\d.]+(, timeZone: ")[^"]+(")`,
    );
    const replaced = out.replace(re, `$1${at.lat}$2${at.lng}$3${at.timeZone}$4`);
    if (replaced !== out) rewritten++;
    out = replaced;
  }
  await writeFile(OUTPUT_PATH, out);
  console.log(`✓ ${rewritten} 件の座標を ${OUTPUT_PATH} に書き戻した`);
}
