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
 */
export const BROADCAST_CHANNELS: ReadonlySet<string> = new Set([
  // News and TV stations
  "UCc282c_TN8xIba_Z6GaDnQw", // Telewizja Republika
  "UCR9120YBAqMfntqgRTKmkjQ", // A24 (AR)
  "UCNye-wNBqNL5ZzHSJj3l8Bg", // Al Jazeera English
  "UCV6zcRug6Hqp1UX_FdyUeBg", // CNN TÜRK
  "UCfYrK5JU5EznsnK3wQE7iIg", // TV Aparecida
  "UC9TDTjbOjFB9jADmPhSAPsw", // NTV (TR)
  "UCPXTXMecYqnRKNdqdVOGSFg", // TV9 Telugu News
  "UC2TuODJhC03pLgd6MpWP0iw", // 三立新聞 SET News
  "UC2dULJJ_G6TTNjsunSxP7ag", // SupremeMasterTV
  "UC5BMIWZe9isJXLZZWPWvBlg", // KOMPAS TV
  "UCXoJ8kY9zpLBEz-8saaT3ew", // ТСН / 1+1
  "UCVgO39Bk5sMo66-6o6Spn6Q", // ABC NEWS Australia
  "UCTHCOPwqNfZ0uiKOvFyhGwg", // 연합뉴스TV
  "UCt4t-jeY85JegMlZ-E5UWtA", // Aaj Tak
  "UCtc-a9ZUIg0_5HpsPxEO7Qg", // Haber Global
  "UCOutOIcn_oho8pyVN3Ng-Pg", // TV9 Bharatvarsh
  "UCumtYpCY26F6Jr3satUgMvA", // NTV Telugu News
  "UCzQZbOb86WvhOPoR7jgAfsA", // TVP INFO
  "UCp2f7tGJGN6R9Muxipem8Nw", // 寰宇新聞 GlobalNewsTV
  "UCDCMjD1XIAsCZsYHNMGVcog", // V6 Telugu News
  "UCQfwfsi5VrQ8yKZ-UWmAEFg", // FRANCE 24 English
  "UCKII0Ml9S5wneKbHswmUrIQ", // CNN Indonesia
  "UCnMBV5Iw4WqKILKue1nP6Hg", // Dunya News
  "UCAR3h_9fLV82N2FH4cE4RKw", // TV5 News Telugu
  "UC-crZTQNRzZgzyighTKF0nQ", // News18 Punjab
  "UCbf0XHULBkTfv2hBjaaDw9Q", // News18 Bangla
  "UCrcpw88HvKJ0skdsHniCJtQ", // News18 Marathi
  "UCef1-8eOpJgud7szVPlZQAQ", // CNN-News18
  "UCuzS3rPQAYqHcLWqOFuY0pw", // News 24 (IN)
  "UC83jt4dlz1Gjl58fzQrrKZg", // CNA
  "UCgp4A6I8LCWrhUzn-5SbKvA", // TVC News Nigeria
  "UC_OaSsAydgSIjUtjYn9qLog", // TV Novo Tempo
  "UC64ZNqX0FQHabP8iIkmnR3A", // Canal Siete
  "UCjElJyiXmQXnWmceQ1JyKrA", // Asianet Suvarna News
  "UC_2irx_BQR7RsBKmUV9fePQ", // ABN Telugu News
  "UCEXGDNclvmg6RW0vipJYsTQ", // Channels Television
  "UCZ9m4KOh8Ei60428xeGYDCQ", // Sakshi TV
  "UCYPvAwZP8pZhSMW8qs7cVCw", // India Today TV
  "UCSrZ3UV4jOidv8ppoVuvW9Q", // Euronews English
  "UCbATDExtWstHnwWELZnXNZA", // Euronews România
  "UCOqFkpNwNLPGOb8EC-mwZYg", // FREEДOM
  "UC1FbPiXx59_ltnFVx7IxWow", // FOX Weather Channel
  "UCnEvxaWfVL91XIYuyQRO5QA", // Kairali News
  "UC4LjkybVKXCDlneVXlKAbmw", // 鏡新聞 mnews
  "UC5dYmq91e5_g54krpO06NJw", // AWANI
  "UCWw6scNyopJ0yjMu1SyOEyw", // talkSPORT

  // Drama and cartoons
  "UCi-nK74pBX9Ou66z1j7KYPQ", // Yaprak Dökümü
  "UCIdiuKAg5xVZsvXDQbOG4cg", // Aşk-ı Memnu
  "UCw7SNYrYei7F5ttQO3o-rpA", // Disney Channel Animation
  "UCx7gLo8iS4ofgNfBENUxWDA", // Taşacak Bu Deniz
  "UCYvpkMpzo1S_rmcj2Axmbig", // Bluey
  "UCoBpC9J2EcbAMprw7YjC93A", // Cartoon Network
  "UCN2Q-lSzQa7RjrCxQZ8DzbA", // Yalan Dünya
  "UCpMth28h0W_ycDlZ5KxABDw", // Altı Üstü İstanbul

  // Radio and music
  "UCJozD5RVug7EZdTjqkGISYQ", // RADIO 10
  "UCEAW_kmPVjxTC50vuLyKOQA", // Kral Akustik Radyo
  "UCJhjE7wbdYAae1G25m0tHAA", // Relaxing Jazz Piano Radio
  "UCIYy_Et4Uee-LejWsUzWK5Q", // Luxury Hotel Lounge Music
  "UChpLVijUbbNs-Wmuri9yW3A", // Café Del Mar
  "UCFzn3ls-N6pg8bHhj0D8z8Q", // Psychedelic Anatolian Rock
  "UCrFFy9BMtlNsg2wsa4XbTPg", // Chillout 2026
  "UCIB228QNsdJDSX8bocYCZOA", // Soft Lofi Room
  "UCYoqxCpRzCvLNSvoXLxNmaw", // Tranquil Sunset Beach Jazz
  "UC7bX_RrH3zbdp5V4j5umGgw", // Night Paris Jazz
  "UCjCZYDvsIedScbetox2LBCA", // Tropical Summer Bossa Nova
  "UCwobzUc3z-0PrFpoRxNszXQ", // Relaxing Zen Music
  "UCQINXHZqCU5i06HzxRkujfg", // Hawaiian Cafe
  "UCB1qMxUghkMwLV1eKt7CQBg", // Deep Techno
  "UCd4TU-zpYIT3HQqjU4BCjyw", // Calming Music for Dogs
  "UCb_QGe9EWyCXBbKkY85nBfg", // Morning Coffee & Italian Music

  // Ambience and pre-recorded footage
  "UCkK0LVEYbscEptzBKFrgcrQ", // Waterfall / White Noise
  "UCDmvEp5Rtjw817rMw_Z-S1A", // Mountain River / White Noise
  "UC9X_obpHELF92vvFNtcdXFA", // Calm Woodland Stream (ASMR)
  "UCeDnpWZapyw4rwORykzLbFg", // Ocean Ambience
  "UCNjGqISO6V2WFpOFWPC8pIw", // Fall Asleep With The Universe's…
  "UCXbXfisDHV_gDjawCKTyTIw", // Rain sounds in rooms
  "UCkwi3H7xoYTJKycMI9YAn0w", // 4K Aquarium / documentary
  "UCg-jBMU2-9RErt1gn9a5jWg", // BORA BORA 8K Aerial
  "UC3Usv7r1W5Tdvsubec-v1AQ", // MALDIVES 4K Aerial
  "UCRMfq-zDxS_Qc7J8WX3xx_A", // Bora Bora 4K Aerial
  "UCrI8aOr8G4tGjGUk6hRPpAA", // MIAMI 8K Virtual Tour
  "UCpk3W9ZdKX83AakFh6j4uQw", // Switzerland 4K
  "UCdTff6CR1MXSZE_fd_qWREA", // 24/7 LIVE Tropical Paradise
  "UCj-Xm8j6WBgKY8OG7s9r2vQ", // Norway's Railway Cab Views

  // Clocks, alerts and monitoring boards (showing numbers, not a place)
  "UC7pYTpHuYsmaSiNnr-HfTfw", // Hora Certa
  "UC3ACLDxuy75577-GDItIgNA", // HORA CERTA
  "UCL2omxZpaK-k1j7UfuLQpVw", // Relógio / Hora Atual
  "UCSsrBhwy9RdzxX9Hnvps-Vw", // КАРТА ПОВІТРЯНИХ ТРИВОГ
  "UCvLCdNi-fitoRvWeHrzJp_A", // Карта повітряних тривог
  "UCUVWoy_rGPdZeUp7jjRHOaQ", // 緊急地震速報ライブ
  "UCZmcd4cQ2H_ELWAuUdOMgRQ", // GlobalQuake

  // Other programmes
  "UCpcv404DxfhGYhXgyB9Aoeg", // Triton Poker Series
]);

/**
 * Phrases that appear only in programmes.
 *
 * For channels that mix in real cameras (TV Asahi, TBS, NTV and other broadcaster channels
 * also air fixed cameras in Shibuya and Haneda): drops the programmes without hiding the whole
 * channel. Never a single word; two adjacent words or a proper name.
 */
export const BROADCAST_TITLE_PATTERNS: readonly RegExp[] = [
  // Film and series. Only programmes carry episode counts or "all episodes".
  /\bfull\s+episodes?\b/i,
  /\bepisodios?\s+completos?\b/i,
  /\bt[üu]m\s+b[öo]l[üu]mler\b/i,
  // (`season \d` is left out: it matched one entry only, and that was "Vancouver LIVE Cam …
  //  Alaska Season 2026" = a real cruise ship camera. Cartoons are caught by full episodes.)
  //
  // "Watch TV". canlı yayın (live) is also used by real cameras, so it is not taken.
  /\bcanl[ıi]\s*tv\b/i,
  /\btv\s*izle\b/i,
  /\bcanl[ıi]\s*[iİ]zle\b/i,
  /\btelewizja\b/i,
  // News programmes. news alone catches broadcasters' street cameras, so two words only.
  /\bbreaking\s+news\b/i,
  /報道ステーション|ニュースまとめ/,
  /ニュースを(?:24時間)?ライブ配信/,
  /最新ニュースをライブ配信/,
  /緊急地震速報/,
  // Radio. radio alone catches the background music of beach cameras, so two words only.
  /\bradyo\s+dinle\b/i,
  /\blive\s+radio\b/i,
  // Sound only.
  /\bwhite\s+noise\b/i,
  /\basmr\b/i,
  /\bmusic\s+for\s+(?:sleep|study|work|dogs|stressed)/i,
  // Pre-recorded aerials. Not a live view, so not shown as a place.
  /\b\d+\s*K\s+(?:aerial|virtual\s+tour)\b/i,
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
