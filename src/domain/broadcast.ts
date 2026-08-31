// 「番組」の見分け。カメラでないものを既定の表示から外すため。
//
// このアプリが見せたいのは定点カメラだが、YouTube のライブ検索で集めた以上、
// テレビの 24 時間配信・ラジオ・アニメ・環境音・撮り溜めた空撮も一緒に入って
// くる。しかも視聴者数はテレビが桁違いに多い(実測の中央値は 5 人、上位は
// 1 万人超)ので、「視聴が多い順」の先頭はニュースとアニメで埋まる。
//
// 🔴 タイトルの語で当てにいくと外す。緩い語で 5,711 件を判定してみたところ、
// 無作為に抜いた 40 件のうち 28 件が誤りだった:
//   - `ao vivo` / `en vivo` / `canlı yayın` は各言語の「生中継」であって、
//     ブラジルやトルコの本物のカメラが普通に使う
//   - `music` / `lofi` / `jazz` は、映像に音楽を乗せている本物のカメラが使う
//     (お台場・横浜みなとみらい・漢江・ケープタウン)
//   - `新聞` は新聞社の社屋に付いたカメラ(梅田・羽田)を巻き込む
//   - `news` は放送局が出している本物の街カメラ(石垣島・那覇空港・渋谷)を巻き込む
//   - `house` は Fish House や Beach House を巻き込む
// 隠すのは「見えなくする」ことなので、粗く当てるより取りこぼす方がよい。
//
// そこで判定は 2 本立てにする。どちらも一件ずつ目で確かめられる形にしてある。
//
//   1. チャンネル … そのチャンネルが持つ全タイトルを読み、番組しか出していない
//      ことを確かめたものだけを載せる。局のチャンネルでも、テレ朝や TBS のように
//      本物の定点カメラ(渋谷・羽田・新宿)を同居させているものは**載せない**。
//   2. タイトル … 1 で拾えない同居分のための、ほぼ番組にしか出ない言い回し。
//      上の失敗を踏まえ、単語 1 つでは当てず、隣り合う 2 語や固有の番組名で見る。
//
// 増やすときは、必ず「そのチャンネルの全タイトル」か「その語で引っかかる全件」を
// 出してから決めること。上位だけを見て決めると、母集団の性質を読み違える。

import type { Cam } from "./cams";

/**
 * 番組しか出していないと確かめたチャンネル。
 * 2026-08-31 に、視聴者 150 人以上の配信を持つ全チャンネルについて、
 * そのチャンネルがマスタに持つ全タイトルを読んで選んだ。
 */
export const BROADCAST_CHANNELS: ReadonlySet<string> = new Set([
  // ニュース・テレビ局
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

  // ドラマ・アニメ
  "UCi-nK74pBX9Ou66z1j7KYPQ", // Yaprak Dökümü
  "UCIdiuKAg5xVZsvXDQbOG4cg", // Aşk-ı Memnu
  "UCw7SNYrYei7F5ttQO3o-rpA", // Disney Channel Animation
  "UCx7gLo8iS4ofgNfBENUxWDA", // Taşacak Bu Deniz
  "UCYvpkMpzo1S_rmcj2Axmbig", // Bluey
  "UCoBpC9J2EcbAMprw7YjC93A", // Cartoon Network
  "UCN2Q-lSzQa7RjrCxQZ8DzbA", // Yalan Dünya
  "UCpMth28h0W_ycDlZ5KxABDw", // Altı Üstü İstanbul

  // ラジオ・音楽
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

  // 環境音・撮り溜めた映像
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

  // 時計・警報・監視盤(場所ではなく数字を映しているもの)
  "UC7pYTpHuYsmaSiNnr-HfTfw", // Hora Certa
  "UC3ACLDxuy75577-GDItIgNA", // HORA CERTA
  "UCL2omxZpaK-k1j7UfuLQpVw", // Relógio / Hora Atual
  "UCSsrBhwy9RdzxX9Hnvps-Vw", // КАРТА ПОВІТРЯНИХ ТРИВОГ
  "UCvLCdNi-fitoRvWeHrzJp_A", // Карта повітряних тривог
  "UCUVWoy_rGPdZeUp7jjRHOaQ", // 緊急地震速報ライブ
  "UCZmcd4cQ2H_ELWAuUdOMgRQ", // GlobalQuake

  // その他の番組
  "UCpcv404DxfhGYhXgyB9Aoeg", // Triton Poker Series
]);

/**
 * 番組にしか出ない言い回し。
 *
 * 本物のカメラと同居しているチャンネル(テレ朝・TBS・日テレなど、局の
 * チャンネルは渋谷や羽田の定点カメラも出している)を、チャンネルごと消さずに
 * 番組だけ落とすためのもの。単語 1 つでは当てず、隣り合う 2 語か固有名で見る。
 */
export const BROADCAST_TITLE_PATTERNS: readonly RegExp[] = [
  // 映像作品。回数や「全話」が付くのは番組だけ。
  /\bfull\s+episodes?\b/i,
  /\bepisodios?\s+completos?\b/i,
  /\bt[üu]m\s+b[öo]l[üu]mler\b/i,
  // (`season \d` は入れない。当たるのは 1 件だけで、それが「Vancouver LIVE Cam …
  //  Alaska Season 2026」= 本物のクルーズ船カメラだった。アニメ側は full episodes で拾える)
  //
  // テレビを「見る」もの。canlı yayın(生中継)は本物のカメラも使うので採らない。
  /\bcanl[ıi]\s*tv\b/i,
  /\btv\s*izle\b/i,
  /\bcanl[ıi]\s*[iİ]zle\b/i,
  /\btelewizja\b/i,
  // 報道番組。news 単独は放送局の街カメラを巻き込むので、2 語でだけ見る。
  /\bbreaking\s+news\b/i,
  /報道ステーション|ニュースまとめ/,
  /ニュースを(?:24時間)?ライブ配信/,
  /最新ニュースをライブ配信/,
  /緊急地震速報/,
  // ラジオ。radio 単独はビーチカメラの BGM を巻き込むので 2 語でだけ見る。
  /\bradyo\s+dinle\b/i,
  /\blive\s+radio\b/i,
  // 音だけのもの。
  /\bwhite\s+noise\b/i,
  /\basmr\b/i,
  /\bmusic\s+for\s+(?:sleep|study|work|dogs|stressed)/i,
  // 撮り溜めた空撮。生きた景色ではないので場所として出さない。
  /\b\d+\s*K\s+(?:aerial|virtual\s+tour)\b/i,
];

/** そのカメラが「番組」か。判断の材料は再探索用に持っている配信タイトル。 */
export function isBroadcast(cam: Cam): boolean {
  if (BROADCAST_CHANNELS.has(cam.source.channelId)) return true;
  return BROADCAST_TITLE_PATTERNS.some((re) => re.test(cam.source.titleKey));
}

/**
 * 番組の id をまとめて拾う。
 * 描画のたびに 5,711 件へ正規表現を当てずに済むよう、マスタが届いた時点で
 * 1 度だけ作って持ち回る(nightIds と同じ扱い)。
 */
export function broadcastIds(cams: readonly Cam[]): Set<string> {
  return new Set(cams.filter(isBroadcast).map((cam) => cam.id));
}
