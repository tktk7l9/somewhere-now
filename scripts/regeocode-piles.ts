// Re-geocodes the coordinates of cameras piled up on the same coordinates.
//
// Why it is needed: the ordering of queries sent to the geocoder was "short ASCII first",
// so generic words ("New" "Beach" "City") were chosen instead of place names. As a result,
// 3,394 of 5,720 cameras (59%) sat on piles sharing the same coordinates. The largest pile
// was 203 cameras on 1 point in central Tokyo. The 29 cameras of "New York City" were at
// New in Kentucky.
//
// The ordering was fixed in import-bulk-cams.ts. This script re-geocodes
// **only the existing piles** with that rule.
//
// 🔴 Whether to adopt a re-geocoding is decided by **agreement of 2 geocoders**. The
// gatekeeper that looks only at the title string (corroborate.ts) had a limit — same-name
// places within the same state (the town called Kilauea on Kauai vs Kilauea volcano)
// cannot be detected because the state matches and there is no contradiction. Open-Meteo
// is a dictionary of "populated places" and does not know facilities, while Photon (OSM)
// knows facilities. Move **only when 2 independent sources point to the same place**.
// Even if only one of them is correct, it is not adopted.
//
//   node --experimental-strip-types scripts/regeocode-piles.ts [minimum pile size]
//
// Output: scripts/cam-places-bulk.ts (only the coordinates are rewritten)

import { readFile, writeFile } from "node:fs/promises";
import { argv } from "node:process";
import { CAM_PLACES_BULK } from "./cam-places-bulk.ts";
import { resolveWithEvidence } from "./import-bulk-cams.ts";
import { photonLookup } from "./photon.ts";

const OUTPUT_PATH = "scripts/cam-places-bulk.ts";
const MIN_PILE = Number(argv[2] ?? 10);
/** If the re-geocoded destination is farther than this, it counts as "moved" (km). */
const MOVED_KM = 1;
/** If the 2 geocoders fall within this distance, they are regarded as "pointing to the same place". */
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

  // Open-Meteo first. If no move is proposed, Photon is not called (queries to the
  // public instance are limited to what is needed).
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
    // A re-geocoding that crosses countries is not trusted. The country code comes from
    // the stream source and is more reliable than fragments of the title.
    kept++;
  } else {
    const other = await photonLookup(title);
    if (other === null) {
      unverified++;
    } else if (other.countryCode !== "" && other.countryCode !== before.country.toUpperCase()) {
      unverified++;
    } else if (distanceKm(next, other) > AGREE_KM) {
      // The 2 pointed to different places. Which is correct cannot be decided, so do not move.
      disagreed++;
    } else if (distanceKm(before, other) < MOVED_KM) {
      kept++;
    } else {
      // They agreed. Take Photon's coordinates, which are finer, at feature level.
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
