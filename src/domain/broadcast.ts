// Telling "broadcasts" apart, so that what is not a camera is left out of the default view.
//
// This app is about fixed cameras, but since the catalogue was gathered from YouTube live
// search, 24-hour TV feeds, radio, cartoons, ambience and pre-recorded aerials come along with
// it. Worse, TV has viewer counts in a different league (measured median is 5 people, the top
// over 10,000), so the head of "most watching" fills up with news and cartoons.
//
// 🔴 Matching on words in the title misses. Classifying 5,711 entries with loose words and
// drawing 40 at random, 28 were wrong:
//   - `ao vivo` / `en vivo` / `canlı yayın` are "live" in each language and real cameras in
//     Brazil and Turkey use them as a matter of course
//   - `music` / `lofi` / `jazz` are used by real cameras that lay music over the picture
//     (Odaiba, Yokohama Minato Mirai, the Han river, Cape Town)
//   - `新聞` catches cameras mounted on newspaper buildings (Umeda, Haneda)
//   - `news` catches real street cameras run by broadcasters (Ishigaki, Naha airport, Shibuya)
//   - `house` catches Fish House and Beach House
// Hiding means making things invisible, so missing some is better than a loose match.
//
// Hence the decision is made in two ways. Both are in a form that can be checked one by one.
//
//   1. Channel … only channels whose every title was read and confirmed to air nothing but
//      programmes. Broadcaster channels that also host real fixed cameras (TV Asahi, TBS with
//      Shibuya, Haneda, Shinjuku) are NOT listed.
//   2. Title … for what 1 cannot catch, phrases that appear almost only in programmes. Given the
//      failure above, never a single word: two adjacent words or a proper programme name.
//
// When adding to either list, always print "every title of that channel" or "every entry that
// phrase matches" before deciding. Deciding from the top entries misreads the population.

import type { Cam } from "./cams";

/**
 * Channels confirmed to air nothing but programmes.
 * Chosen on 2026-08-31 by reading every title the channel has in the master list, for every
 * channel with a stream of 150 viewers or more.
 *
 * 2026-11-03: the news, TV, radio, music, clock and pre-recorded channels were taken out of the
 * catalogue altogether (`scripts/cam-exclusions.ts`, owner's decision), so their entries here went
 * stale and were removed. What is left is nature-sound ambience: it may be footage of a real place,
 * so it stays in the catalogue, hidden by default.
 */
export const BROADCAST_CHANNELS: ReadonlySet<string> = new Set([
  // Ambience
  "UCkK0LVEYbscEptzBKFrgcrQ", // Waterfall / White Noise
  "UCDmvEp5Rtjw817rMw_Z-S1A", // Mountain River / White Noise
  "UC9X_obpHELF92vvFNtcdXFA", // Calm Woodland Stream (ASMR)
  "UCeDnpWZapyw4rwORykzLbFg", // Ocean Ambience
  "UCNjGqISO6V2WFpOFWPC8pIw", // Fall Asleep With The Universe's…
  "UCXbXfisDHV_gDjawCKTyTIw", // Rain sounds in rooms
]);

/**
 * Phrases that appear only in programmes.
 *
 * Never a single word; two adjacent words or a proper name.
 *
 * 2026-11-03: the programme, news, radio-dinle, music-for and aerial phrases matched nothing once
 * those streams were excluded from the catalogue, and were removed (the staleness test below
 * requires every pattern to match something). If a new import brings such streams back, exclude
 * them in `scripts/cam-exclusions.ts` rather than reviving the patterns.
 */
export const BROADCAST_TITLE_PATTERNS: readonly RegExp[] = [
  // Radio. radio alone catches the background music of beach cameras, so two words only.
  // (Ibiza.fm shows webcams under its radio stream; it is not excluded, only hidden.)
  /\blive\s+radio\b/i,
  // Sound only.
  /\bwhite\s+noise\b/i,
  /\basmr\b/i,
];

/** Whether that camera is a "broadcast". Judged from the stream title kept for rediscovery. */
export function isBroadcast(cam: Cam): boolean {
  if (BROADCAST_CHANNELS.has(cam.source.channelId)) return true;
  return BROADCAST_TITLE_PATTERNS.some((re) => re.test(cam.source.titleKey));
}

/**
 * Collects the ids of broadcasts in one go.
 * Built once when the master list arrives and carried around (like nightIds), so the regular
 * expressions do not run over 5,711 entries on every render.
 */
export function broadcastIds(cams: readonly Cam[]): Set<string> {
  return new Set(cams.filter(isBroadcast).map((cam) => cam.id));
}
