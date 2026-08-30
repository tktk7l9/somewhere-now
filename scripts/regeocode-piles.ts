// 同じ座標に積み上がっているカメラの座標を引き直す。
//
// なぜ要るか: ジオコーダに投げる問い合わせの並べ替えが「短い ASCII を先」に
// なっていて、地名でなく一般語("New" "Beach" "City")が選ばれていた。結果、
// 5,720 台のうち 3,394 台(59%)が同じ座標の束に載っていた。最大の束は都心の
// 1 点に 203 台。"New York City" の 29 台はケンタッキー州の New にいた。
//
// 並べ替えは import-bulk-cams.ts で直した。このスクリプトは、その規則で
// **既存の束だけ**を引き直す。
//
// 🔴 引き直しの採否は**2 つのジオコーダの一致**で決める。タイトルの文字列
// だけを見る門番(corroborate.ts)には限界があった — 同じ州の中の同名地
// (カウアイ島の Kilauea という町 vs キラウエア火山)は、州も一致し矛盾も
// 無いので見抜けない。Open-Meteo は「人口のある土地」の辞書なので施設を
// 知らず、Photon(OSM)は施設を知っている。**独立した 2 つが同じ場所を
// 指したときだけ**動かす。片方だけが正しくても採らない。
//
//   node --experimental-strip-types scripts/regeocode-piles.ts [最小の束の大きさ]
//
// 生成物: scripts/cam-places-bulk.ts(座標だけを書き換える)

import { readFile, writeFile } from "node:fs/promises";
import { argv } from "node:process";
import { CAM_PLACES_BULK } from "./cam-places-bulk.ts";
import { resolveWithEvidence } from "./import-bulk-cams.ts";
import { photonLookup } from "./photon.ts";

const OUTPUT_PATH = "scripts/cam-places-bulk.ts";
const MIN_PILE = Number(argv[2] ?? 10);
/** 引き直した先がここより遠ければ「動かした」と数える(km)。 */
const MOVED_KM = 1;
/** 2 つのジオコーダがこの距離に収まっていれば「同じ場所を指した」と見なす。 */
const AGREE_KM = 25;

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
let disagreed = 0;

for (const [i, place] of targets.entries()) {
  const before = place.at!;
  const title = place.titleKey ?? place.nameEn;
  const channel = place.handle ?? "";

  // 先に Open-Meteo。動かす提案が出ないなら Photon は呼ばない(公開インスタンス
  // への問い合わせを、必要な分だけに絞る)。
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
  } else {
    const other = await photonLookup(title);
    if (other === null) {
      unverified++;
    } else if (other.countryCode !== "" && other.countryCode !== before.country.toUpperCase()) {
      unverified++;
    } else if (distanceKm(next, other) > AGREE_KM) {
      // 2 つが別の場所を指した。どちらが正しいかは決められないので動かさない。
      disagreed++;
    } else if (distanceKm(before, other) < MOVED_KM) {
      kept++;
    } else {
      // 一致した。地物単位で細かい Photon の座標を採る。
      updates.set(place.id, { lat: other.lat, lng: other.lng, timeZone: next.timeZone });
      moved++;
    }
  }

  if ((i + 1) % 50 === 0) {
    console.log(
      `  … ${i + 1}/${targets.length}  動かした ${moved} / 据え置き ${kept} / 不一致 ${disagreed} / 裏取れず ${unverified} / 引けず ${failed}`,
    );
  }
}

console.log(
  `\n動かした ${moved} / 据え置き ${kept} / 不一致(据え置き) ${disagreed} / 裏取れず(据え置き) ${unverified} / 引けず ${failed}`,
);
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
