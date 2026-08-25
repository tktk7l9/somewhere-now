// このファイルは scripts/build-cams.ts が生成する。手で編集しない。
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
  {
    // 座標: 著名なランドマークとして明示指定
    id: "shibuya-crossing",
    name: { ja: "渋谷スクランブル交差点", en: "Shibuya Scramble Crossing" },
    lat: 35.6595,
    lng: 139.7005,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "8H3nRCFVR6Y",
      channelId: "UCGCZAYq5Xxojl_tSXcVJhiQ",
      titleKey: "【ライブ】渋谷スクランブル交差点 / Shibuya Scramble Crossing Live Camera【LIVE】ANN/テレ朝",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "shinjuku-station",
    name: { ja: "新宿駅前", en: "Shinjuku Station" },
    lat: 35.69,
    lng: 139.7004,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "BePkAsZnDjM",
      channelId: "UC6AG81pAkf6Lbi_1VC5NmPA",
      titleKey: "【LIVE】新宿駅前のライブカメラ 現在の様子は？ Shinjuku, Tokyo JAPAN | TBS NEWS DIG",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "haneda-terminal-2",
    name: { ja: "羽田空港 第2ターミナル", en: "Haneda Airport Terminal 2" },
    lat: 35.5494,
    lng: 139.7798,
    timeZone: "Asia/Tokyo",
    category: "airport",
    country: "JP",
    source: {
      videoId: "OyWPJhU-iI8",
      channelId: "UCGCZAYq5Xxojl_tSXcVJhiQ",
      titleKey: "【ライブ】羽田空港第2ターミナルを24時間配信中！  HANEDA,Tokyo International Airport Terminal2【LIVE】ANN/テレ朝",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "haneda-terminal-1",
    name: { ja: "羽田空港 第1ターミナル", en: "Haneda Airport Terminal 1" },
    lat: 35.549,
    lng: 139.7855,
    timeZone: "Asia/Tokyo",
    category: "airport",
    country: "JP",
    source: {
      videoId: "2f9NOSw-FqM",
      channelId: "UC6AG81pAkf6Lbi_1VC5NmPA",
      titleKey: "【ライブ】羽田空港 第1ターミナルのライブカメラ 現在の様子は？Haneda Airport's Terminal 1| TBS NEWS DIG",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "abbey-road-crossing",
    name: { ja: "アビイ・ロードの横断歩道", en: "Abbey Road Crossing" },
    lat: 51.532,
    lng: -0.1779,
    timeZone: "Europe/London",
    category: "city",
    country: "GB",
    source: {
      videoId: "zMCea32gpmg",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Abbey Road Crossing (London, England)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Palma", Balearic Islands
    id: "mallorca",
    name: { ja: "マヨルカ島", en: "Mallorca" },
    lat: 39.5694,
    lng: 2.6502,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "jtdyLykT_XY",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Mallorca, Spain",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "times-square",
    name: { ja: "タイムズスクエア", en: "Times Square" },
    lat: 40.758,
    lng: -73.9855,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "JQ_jwk_7OVE",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Times Square North 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "statue-of-liberty",
    name: { ja: "自由の女神(冠のカメラ)", en: "Statue of Liberty CrownCam" },
    lat: 40.6892,
    lng: -74.0445,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "YHRYOL03ydw",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Statue of Liberty CrownCam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "world-trade-center",
    name: { ja: "ワールドトレードセンター", en: "World Trade Center" },
    lat: 40.7127,
    lng: -74.0134,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "5C9oM7C2Q9k",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  World Trade Center - New York City, NY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "lincoln-harbor",
    name: { ja: "リンカーン・ハーバー(マンハッタン対岸)", en: "Lincoln Harbor" },
    lat: 40.769,
    lng: -74.017,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "f_pX8XheLbY",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Lincoln Harbor (New York City)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "white-house",
    name: { ja: "ホワイトハウス", en: "The White House" },
    lat: 38.8977,
    lng: -77.0365,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "5p_KGD4fJZs",
      channelId: "UCRuyAVeVd7oUwh0LWmxxBBQ",
      titleKey: "earthTV® White House Cam is back!",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "washington-monument",
    name: { ja: "ワシントン記念塔", en: "Washington Monument" },
    lat: 38.8895,
    lng: -77.0353,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "oDCAAfOSqvA",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Washington Monument (Washington, D.C.)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "independence-hall",
    name: { ja: "独立記念館とリバティ・ベル", en: "Liberty Bell & Independence Hall" },
    lat: 39.9489,
    lng: -75.15,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "F1EQEDL4ddU",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Liberty Bell - Independence Hall (Philadelphia, PA)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "wrigley-field",
    name: { ja: "リグレー・フィールド(シカゴ)", en: "Wrigley Field" },
    lat: 41.9484,
    lng: -87.6553,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "m38n8jVPUJ8",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Wrigley Field",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "New Orleans", Louisiana
    id: "new-orleans-balcony",
    name: { ja: "ニューオーリンズ(バルコニーからの眺め)", en: "New Orleans Balcony View" },
    lat: 29.9547,
    lng: -90.0751,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "6lFBKxt8kIo",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live: New Orleans Balcony View",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Shanksville", Pennsylvania
    id: "flight-93-memorial",
    name: { ja: "ユナイテッド93便記念碑", en: "Flight 93 Memorial" },
    lat: 40.0179,
    lng: -78.9073,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "mjzA1Yxh7ZY",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Flight 93 Memorial - Tower of Voices (Shanksville, PA)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Madison", Indiana
    id: "madison-indiana",
    name: { ja: "マディソン(インディアナ)", en: "Madison, Indiana" },
    lat: 38.7359,
    lng: -85.38,
    timeZone: "America/Indiana/Indianapolis",
    category: "city",
    country: "US",
    source: {
      videoId: "Ez6xC43MMTQ",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Madison, Indiana",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Council Bluffs", Iowa
    id: "council-bluffs",
    name: { ja: "カウンシルブラフス(アイオワ)", en: "Council Bluffs, Iowa" },
    lat: 41.2619,
    lng: -95.8608,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "qsrevo5Vdkw",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Council Bluffs, Iowa",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Jamestown", North Dakota
    id: "jamestown-buffalo",
    name: { ja: "世界最大のバッファロー像(ジェームズタウン)", en: "World's Largest Buffalo Monument" },
    lat: 46.9105,
    lng: -98.7084,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "VWDi2Po3ZsQ",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  World's Largest Buffalo Monument (Jamestown, North Dakota)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Roswell", New Mexico
    id: "roswell",
    name: { ja: "ロズウェル(ニューメキシコ)", en: "Roswell, New Mexico" },
    lat: 33.3944,
    lng: -104.5249,
    timeZone: "America/Denver",
    category: "city",
    country: "US",
    source: {
      videoId: "kLoFxVhRWtQ",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Roswell, New Mexico",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Ruidoso", New Mexico
    id: "ruidoso",
    name: { ja: "ルイドソ(ニューメキシコ)", en: "Ruidoso, New Mexico" },
    lat: 33.3317,
    lng: -105.673,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "XoANQufSSXY",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Ruidoso, New Mexico",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Sanibel", Florida
    id: "sanibel-island",
    name: { ja: "サニベル島", en: "Sanibel Island" },
    lat: 26.449,
    lng: -82.0223,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "4LTSTw4jnZc",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Sanibel Island",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Lauderdale by the sea", Florida
    id: "anglins-pier",
    name: { ja: "アングリンズ桟橋(フロリダ)", en: "Anglins Pier" },
    lat: 26.192,
    lng: -80.0964,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "aPo-gk0y9tg",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Anglins Pier (Lauderdale-By-The-Sea, FL)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Seaside Heights", New Jersey
    id: "seaside-heights",
    name: { ja: "シーサイドハイツ(ニュージャージー)", en: "Seaside Heights, NJ" },
    lat: 39.9443,
    lng: -74.0729,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "OBgCrw-IyhE",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Seaside Heights, NJ - North View",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Wildwood", New Jersey
    id: "wildwood",
    name: { ja: "ワイルドウッド(ニュージャージー)", en: "Wildwood, NJ" },
    lat: 38.9918,
    lng: -74.8149,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "cK71xhMRtds",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Wildwoods Cam (Wildwood, NJ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Spirit Lake", Iowa
    id: "spirit-lake",
    name: { ja: "スピリット湖(アイオワ)", en: "Spirit Lake, Iowa" },
    lat: 43.4222,
    lng: -95.1022,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "XIe9vQkAd7Q",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Spirit Lake, Iowa",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "monterey-sea-otter",
    name: { ja: "モントレー湾水族館 ラッコ", en: "Monterey Bay Aquarium — Sea Otters" },
    lat: 36.6182,
    lng: -121.9018,
    timeZone: "America/Los_Angeles",
    category: "animal",
    country: "US",
    source: {
      videoId: "abbR-Ttd-cA",
      channelId: "UCnM5iMGiKsZg-iOlIO2ZkdQ",
      titleKey: "Live Sea Otter Cam | Monterey Bay Aquarium",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "monterey-bay",
    name: { ja: "モントレー湾", en: "Monterey Bay" },
    lat: 36.6182,
    lng: -121.9018,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "fVa6-zCBR7A",
      channelId: "UCnM5iMGiKsZg-iOlIO2ZkdQ",
      titleKey: "Live Monterey Bay Cam | Monterey Bay Aquarium",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Baltimore", Maryland
    id: "baltimore-aquarium",
    name: { ja: "ボルチモア水族館", en: "National Aquarium, Baltimore" },
    lat: 39.2904,
    lng: -76.6122,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "KSxc-N67TU4",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Aquarium Cam (Baltimore, Maryland)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Greenville", South Carolina
    id: "greenville-giraffe",
    name: { ja: "グリーンビル動物園 キリン", en: "Greenville Zoo — Giraffes" },
    lat: 34.8526,
    lng: -82.394,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "sLRtUoPNH2k",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Giraffe Paddock  Cam - Greenville, SC",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Gaylord", Michigan
    id: "gaylord-wildlife",
    name: { ja: "ゲイロード(ミシガン)の野生動物", en: "Gaylord Wildlife Cam" },
    lat: 45.0275,
    lng: -84.6748,
    timeZone: "America/Detroit",
    category: "animal",
    country: "US",
    source: {
      videoId: "IU_-Pl9O5jQ",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live: Snowman Cam - Animals and Wildlife (Gaylord, Michigan)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Kasane", Chobe District
    id: "chobe-waterhole",
    name: { ja: "チョベ(ボツワナ)の水場", en: "Chobe Watering Hole, Botswana" },
    lat: -17.8016,
    lng: 25.1602,
    timeZone: "Africa/Gaborone",
    category: "animal",
    country: "BW",
    source: {
      videoId: "iqdRLSdSjWI",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Hideaways Camp Kuzuma, African Watering Hole (Chobe, Botswana)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Manaus", Amazonas
    id: "rio-negro-amazon",
    name: { ja: "アマゾン ネグロ川", en: "Rio Negro, Amazon" },
    lat: -3.1019,
    lng: -60.025,
    timeZone: "America/Manaus",
    category: "nature",
    country: "BR",
    source: {
      videoId: "zAZ6S9pv0jA",
      channelId: "UCGCZAYq5Xxojl_tSXcVJhiQ",
      titleKey: "【LIVE】癒しの熱帯 アマゾンのジャングルから配信　夜明けの空を横切るインコの群れ　夜の川に響くカエルと昆虫の声　#ネグロ川 #ブラジル【ライブ】ANN/テレ朝",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "popocatepetl",
    name: { ja: "ポポカテペトル山", en: "Popocatépetl Volcano" },
    lat: 19.0224,
    lng: -98.6279,
    timeZone: "America/Mexico_City",
    category: "volcano",
    country: "MX",
    source: {
      videoId: "z1DIktum4zo",
      channelId: "UColBcWm6ybTbQnNuQS8JaKg",
      titleKey: "🌋 #POPOCATÉPETL | 🛸 Los objetos salen de su garita esta noche. El #volcán #EnVivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cdmx-zocalo",
    name: { ja: "メキシコシティ ソカロ広場", en: "Zócalo, Mexico City" },
    lat: 19.4326,
    lng: -99.1332,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "qP-b5q9u018",
      channelId: "UColBcWm6ybTbQnNuQS8JaKg",
      titleKey: "En vivo Zócalo de la Ciudad de México",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cdmx-angel",
    name: { ja: "独立記念塔(メキシコシティ)", en: "Ángel de la Independencia" },
    lat: 19.427,
    lng: -99.1677,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "ZH3jB650mcI",
      channelId: "UColBcWm6ybTbQnNuQS8JaKg",
      titleKey: "Paseo de la Reforma en vivo. Monumento Ángel de la Independencia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "basilica-guadalupe",
    name: { ja: "グアダルーペ聖堂", en: "Basilica of Guadalupe" },
    lat: 19.4847,
    lng: -99.1177,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "NmHkMgNwawg",
      channelId: "UColBcWm6ybTbQnNuQS8JaKg",
      titleKey: "Basílica de Guadalupe, Ciudad de México, en vivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jackson-town-square",
    name: { ja: "ジャクソン タウンスクエア", en: "Jackson Town Square" },
    lat: 43.4799,
    lng: -110.7624,
    timeZone: "America/Denver",
    category: "city",
    country: "US",
    source: {
      videoId: "B_waF26In9o",
      channelId: "UCEpDjqeFIGTqHwk-uULx72Q",
      titleKey: "Jackson Town Square Live PTZ webcam - SeeJH.ai",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "grand-teton",
    name: { ja: "グランドティトン国立公園", en: "Grand Teton National Park" },
    lat: 43.7412,
    lng: -110.8025,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "j-0fhrHzEiM",
      channelId: "UCEpDjqeFIGTqHwk-uULx72Q",
      titleKey: "EGVB - Grand Teton Webcam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Gardiner", Montana
    id: "yellowstone-river-gardiner",
    name: { ja: "イエローストーン川(ガーディナー)", en: "Yellowstone River at Gardiner" },
    lat: 45.0319,
    lng: -110.7058,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "IvZ22jZgvOI",
      channelId: "UCEpDjqeFIGTqHwk-uULx72Q",
      titleKey: "Montana Whitewater - Yellowstone River in Gardiner",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Driggs", Idaho
    id: "grand-targhee",
    name: { ja: "グランドターギー(アイダホ)", en: "Grand Targhee Resort" },
    lat: 43.7233,
    lng: -111.1113,
    timeZone: "America/Boise",
    category: "nature",
    country: "US",
    source: {
      videoId: "fQiA_DZT0cE",
      channelId: "UCEpDjqeFIGTqHwk-uULx72Q",
      titleKey: "Grand Targhee Resort Dreamcatcher - SeeJH.com",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Plant City", Florida
    id: "rail-plant-city",
    name: { ja: "プラントシティ(フロリダ)の線路", en: "Plant City, Florida" },
    lat: 28.0189,
    lng: -82.1147,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "IVSoVgGXDoU",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Plant City, Florida, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Folkston", Georgia
    id: "rail-folkston",
    name: { ja: "フォルクストン(ジョージア)の線路", en: "Folkston, Georgia" },
    lat: 30.831,
    lng: -82.0113,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "7DmivRg6FfQ",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Folkston, Georgia, USA | LIVE Train Camera (Turnout PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "St Louis", Missouri
    id: "rail-saint-louis",
    name: { ja: "セントルイスの線路", en: "Saint Louis, Missouri" },
    lat: 38.6273,
    lng: -90.1979,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "9eqVB3JbJHc",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Saint Louis, Missouri, USA  |  LIVE Train Camera  (PTZ - West)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Cresson", Pennsylvania
    id: "rail-cresson",
    name: { ja: "クレッソン(ペンシルベニア)の線路", en: "Cresson, Pennsylvania" },
    lat: 40.4598,
    lng: -78.5917,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "9uPCPh8jWas",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Cresson, Pennsylvania  |  LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Salt Lake City", Utah
    id: "rail-salt-lake-city",
    name: { ja: "ソルトレイクシティの線路", en: "Salt Lake City, Utah" },
    lat: 40.7608,
    lng: -111.8911,
    timeZone: "America/Denver",
    category: "railway",
    country: "US",
    source: {
      videoId: "qJd7diix4eI",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Salt Lake City, Utah, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Cheyenne", Wyoming
    id: "rail-cheyenne",
    name: { ja: "シャイアン(ワイオミング)の線路", en: "Cheyenne, Wyoming" },
    lat: 41.14,
    lng: -104.8203,
    timeZone: "America/Denver",
    category: "railway",
    country: "US",
    source: {
      videoId: "hV30GxkdTAs",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Cheyenne, Wyoming, USA  |  LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Quanah", Texas
    id: "rail-quanah",
    name: { ja: "クアナ(テキサス)の線路", en: "Quanah, Texas" },
    lat: 34.2978,
    lng: -99.7404,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "LInPY_D1Ln4",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Quanah, Texas, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Jesup", Georgia
    id: "rail-jesup",
    name: { ja: "ジェサップ(ジョージア)の線路", en: "Jesup, Georgia" },
    lat: 31.6078,
    lng: -81.8863,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "1AOrlYblQR8",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Jesup, Georgia, USA | LIVE Train Camera | Virtual Railfan (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Seattle", Washington
    id: "rail-seattle",
    name: { ja: "シアトルの線路", en: "Seattle, Washington" },
    lat: 47.6062,
    lng: -122.3321,
    timeZone: "America/Los_Angeles",
    category: "railway",
    country: "US",
    source: {
      videoId: "pHqTDmH7H7c",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Seattle, Washington, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Deshler", Ohio
    id: "rail-deshler",
    name: { ja: "デシュラー(オハイオ)の線路", en: "Deshler, Ohio" },
    lat: 41.2075,
    lng: -83.8991,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "TjMwpB8JRw8",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Deshler, Ohio, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "La Grange", Kentucky
    id: "rail-la-grange",
    name: { ja: "ラグレンジ(ケンタッキー)の線路", en: "La Grange, Kentucky" },
    lat: 38.4076,
    lng: -85.3788,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "OtssjZ3hdX0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "La Grange, Kentucky, USA |  LIVE Railcam Camera (Observation Platform PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Tucson", Arizona
    id: "rail-tucson",
    name: { ja: "ツーソン(アリゾナ)の線路", en: "Tucson, Arizona" },
    lat: 32.2217,
    lng: -110.9265,
    timeZone: "America/Phoenix",
    category: "railway",
    country: "US",
    source: {
      videoId: "q5BQRwSh41Q",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Tucson, Arizona, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Cumberland", Maryland
    id: "rail-cumberland",
    name: { ja: "カンバーランド(メリーランド)の線路", en: "Cumberland, Maryland" },
    lat: 39.6529,
    lng: -78.7625,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "cR3kSHm7Ts0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "CSX Mainline in Cumberland, Maryland, USA | LIVE Train Camera (PTZ – South)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Battle Creek", Michigan
    id: "rail-battle-creek",
    name: { ja: "バトルクリーク(ミシガン)の線路", en: "Battle Creek, Michigan" },
    lat: 42.3173,
    lng: -85.1782,
    timeZone: "America/Detroit",
    category: "railway",
    country: "US",
    source: {
      videoId: "m3iasBkPAbo",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Battle Creek, Michigan, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Ashland", Virginia
    id: "rail-ashland",
    name: { ja: "アシュランド(バージニア)の線路", en: "Ashland, Virginia" },
    lat: 37.759,
    lng: -77.48,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "_eArnSLGhSo",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Ashland, Virginia, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Cordele", Georgia
    id: "rail-cordele",
    name: { ja: "コーデル(ジョージア)の線路", en: "Cordele, Georgia" },
    lat: 31.9635,
    lng: -83.7824,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "ll3X1mH_g9Q",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Cordele, Georgia, USA | LIVE Train Camera (Fixed View – Diamond)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sydney-harbour",
    name: { ja: "シドニー湾（ハーバーブリッジとオペラハウス）", en: "Sydney Harbour" },
    lat: -33.845,
    lng: 151.203,
    timeZone: "Australia/Sydney",
    category: "harbor",
    country: "AU",
    source: {
      videoId: "VukSUsIGPGQ",
      channelId: "UCS03bU2sY5_zu2j7LoSjAVA",
      titleKey: "Sydney Harbour LIVE 🇦🇺 Bridge & Opera House 24/7 — McMahons Point, Australia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "kilauea-volcano",
    name: { ja: "キラウエア火山（ハレマウマウ火口）", en: "Kīlauea Volcano" },
    lat: 19.4069,
    lng: -155.2834,
    timeZone: "Pacific/Honolulu",
    category: "volcano",
    country: "US",
    source: {
      videoId: "HggWKlZv9yk",
      channelId: "UCeXH8GZyV3sVqAr45AvupOA",
      titleKey: "[V1cam] Kīlauea volcano, Hawaii (west Halemaʻumaʻu crater)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "rainbow-bridge",
    name: { ja: "お台場・レインボーブリッジ", en: "Rainbow Bridge, Tokyo" },
    lat: 35.636,
    lng: 139.7635,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "kGG1CaeQ9oM",
      channelId: "UCoQBJMzcwmXrRSHBFAlTsIw",
      titleKey: "【ライブ】お台場・レインボーブリッジ - 首都高　ライブカメラ　Rainbow Bridge - Tokyo, Japan　 Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "wildearth-safari",
    name: { ja: "サビサンド動物保護区のサファリ中継", en: "WildEarth Safari, Sabi Sand" },
    lat: -24.79,
    lng: 31.45,
    timeZone: "Africa/Johannesburg",
    category: "animal",
    country: "ZA",
    source: {
      videoId: "HRO9PwoduE8",
      channelId: "UCV6HJBZD_hZcIX9JVJ3dCXQ",
      titleKey: "WildEarth Channel - AD FREE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "osaka-dotonbori",
    name: { ja: "大阪 道頓堀", en: "Dotonbori, Osaka" },
    lat: 34.6687,
    lng: 135.5013,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "i2PpmC1IeKk",
      channelId: "UCQ2mmGKtrBp6rL8tSMJCCwA",
      titleKey: "【LIVE】大阪 道頓堀 ライブカメラ　osaka Dotonbori LiveCamera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "aso-nakadake",
    name: { ja: "阿蘇中岳・草千里", en: "Mount Aso" },
    lat: 32.8845,
    lng: 131.104,
    timeZone: "Asia/Tokyo",
    category: "volcano",
    country: "JP",
    source: {
      videoId: "-DDn7lAxR-8",
      channelId: "UCey3hahtkbKG9VrXTSotZoQ",
      titleKey: "阿蘇中岳・草千里 4Kライブカメラ / Aso Nakadake and Kusasenri 4K Live Camera",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Hakodate", Hokkaido
    id: "hakodate-station",
    name: { ja: "函館駅前", en: "Hakodate Station" },
    lat: 41.7758,
    lng: 140.7367,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "rCgvMJGdhNo",
      channelId: "UCynX4LJTQ_H7_KPy7QiIS2A",
      titleKey: "【Live-Japan】函館駅前ライブカメラ② ※20秒ごとにアングルが変わります #JR函館駅 #函館 #路面電車 #HAKODATE",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Naha", Okinawa
    id: "naha-kokusai-dori",
    name: { ja: "那覇 国際通り", en: "Kokusai-dori, Naha" },
    lat: 26.213,
    lng: 127.6785,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "D0hiHTAbu2A",
      channelId: "UCVg0E1H6LZBhTt_2oSm2Hzg",
      titleKey: "【LIVE】沖縄ライブカメラ・那覇 国際通り /Okinawa Live Camera 24/7",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Nagoya", Aichi
    id: "nagoya-station",
    name: { ja: "名古屋駅", en: "Nagoya Station" },
    lat: 35.1815,
    lng: 136.9064,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "pI_u966ixNk",
      channelId: "UCjmqhsGQ9J1QK4r5mUrZb4A",
      titleKey: "名古屋駅 ライブカメラ 愛知 鉄道 新幹線 天気 夜景 【4K配信】 Japan Nagoya Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "harajuku-station",
    name: { ja: "原宿駅・表参道口", en: "Harajuku Station" },
    lat: 35.6702,
    lng: 139.7027,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "RUB0oL0SHl0",
      channelId: "UCpweG_uuLZhAH9B_Spwmmzg",
      titleKey: "【4KLIVE】原宿駅前ライブカメラ｜表参道口・明治神宮 / Harajuku Live Stream (Omotesando, Meiji Jingu)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "yokohama-kishamichi",
    name: { ja: "横浜 汽車道", en: "Kishamichi, Yokohama" },
    lat: 35.455,
    lng: 139.638,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "PEOE0ZpjdUg",
      channelId: "UCKtFn0R-NGm6cocqdoGAQTA",
      titleKey: "🔴Live Cam Yokohama Japan :横浜汽車道ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mount-fuji-kawaguchiko",
    name: { ja: "富士山（河口湖）", en: "Mount Fuji from Lake Kawaguchi" },
    lat: 35.517,
    lng: 138.758,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "Sv9hcJ3k5h4",
      channelId: "UCwzJctz6m-0wG_evkheecZA",
      titleKey: "【4K】富士山ライブカメラ / 4K Live Camera Mt.FUJI　～河口湖～富士山パノラマロープウェイ",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Chitose", Hokkaido
    id: "new-chitose-airport",
    name: { ja: "新千歳空港", en: "New Chitose Airport" },
    lat: 42.8194,
    lng: 141.6522,
    timeZone: "Asia/Tokyo",
    category: "airport",
    country: "JP",
    source: {
      videoId: "Azbdr5jbN6o",
      channelId: "UCuY1i-Tic2G2xmox2_0h-Fw",
      titleKey: "【LIVE】いまの新千歳空港／Live streaming from Hokkaido　 New Chitose Airport　北海道ｏｎ天気カメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "narita-airport",
    name: { ja: "成田空港", en: "Narita Airport" },
    lat: 35.7647,
    lng: 140.3864,
    timeZone: "Asia/Tokyo",
    category: "airport",
    country: "JP",
    source: {
      videoId: "OuCbntsMsWY",
      channelId: "UCaHr0a1x8zmQ1dxanCeuesA",
      titleKey: "【LIVE】成田空港ライブカメラ　A滑走路(南側）＠朝日新聞成田支局  LIVE at Narita International airport",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "itami-airport",
    name: { ja: "大阪 伊丹空港", en: "Itami Airport" },
    lat: 34.7855,
    lng: 135.4382,
    timeZone: "Asia/Tokyo",
    category: "airport",
    country: "JP",
    source: {
      videoId: "GwxeN9lQhnM",
      channelId: "UCkKJhKO73xF1pK5h9R82ZGQ",
      titleKey: "【LIVE】大阪・伊丹空港のライブカメラ 　飛行機の離着陸や空港の様子は？ OSAKA  Itami Airport【生配信】",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Ikeda", Osaka
    id: "satsukiyama-wombat",
    name: { ja: "五月山動物園のウォンバット", en: "Satsukiyama Zoo Wombats" },
    lat: 34.8221,
    lng: 135.4298,
    timeZone: "Asia/Tokyo",
    category: "animal",
    country: "JP",
    source: {
      videoId: "m0zx7vPJtC0",
      channelId: "UC3fDjbb2JVIX6rOLNNqctow",
      titleKey: "Satsukiyama DAYZOO　ウォンバットライブカメラ　～世界で唯一のウォンバットのライブ映像をお届け～",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "shonan-kugenuma",
    name: { ja: "湘南 鵠沼海岸", en: "Kugenuma Beach, Shonan" },
    lat: 35.313,
    lng: 139.477,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "DZWA9Xicaxg",
      channelId: "UCV3arNLjYmBubfETmAAzS4w",
      titleKey: "湘南 鵠沼〜新江ノ島水族館前　ライブ配信",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "venice-rolling",
    name: { ja: "ヴェネツィア", en: "Venice" },
    lat: 45.4341,
    lng: 12.3388,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "a1mcaV3Sf9U",
      channelId: "UCMpn1qLudF-zb4M4bqxLIbw",
      titleKey: "🔴 LIVE 24/7  Rolling Cam Venice - Live Cam in Venice Italy - Livecam en direct #venice",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Lourdes", Occitanie
    id: "lourdes-sanctuary",
    name: { ja: "ルルドの聖域", en: "Sanctuary of Lourdes" },
    lat: 43.0946,
    lng: -0.0461,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "ESNa1vdHcYY",
      channelId: "UC7zlbnNCnuAPiC3goKcFgUg",
      titleKey: "🔴Lourdes+ | Le Sanctuaire Notre-Dame de Lourdes en direct.",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Hamburg", Free and Hanseatic City of Hamburg
    id: "hamburg-harbour",
    name: { ja: "ハンブルク港", en: "Hamburg Harbour" },
    lat: 53.5507,
    lng: 9.993,
    timeZone: "Europe/Berlin",
    category: "harbor",
    country: "DE",
    source: {
      videoId: "OmyDLXvaus4",
      channelId: "UCzLB2h38nyHSIaALzwtPvfg",
      titleKey: "🔴 LIVE: Hamburg Michel – Webcam mit Panoramablick auf Hafen",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Göttingen", Lower Saxony
    id: "gottingen-market",
    name: { ja: "ゲッティンゲン 市庁舎前広場", en: "Göttingen Market Square" },
    lat: 51.5344,
    lng: 9.9323,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "cfCKCrOyHmw",
      channelId: "UCFu4lC8Wlq4fOLpW3zf_4wg",
      titleKey: "LIVE Webcam Germany: Göttingen - Historisches Rathaus und Gänseliesel-Brunnen",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Rees", North Rhine-Westphalia
    id: "rees-rhine",
    name: { ja: "ライン川（レース）", en: "River Rhine at Rees" },
    lat: 51.7626,
    lng: 6.3978,
    timeZone: "Europe/Berlin",
    category: "nature",
    country: "DE",
    source: {
      videoId: "SeN3fw3R6-E",
      channelId: "UCaLDNGnkbTjnpG7j00om-Qg",
      titleKey: "Live Rhein bei Rees, rheinabwärts Richtung Emmerich",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "St Ives", England
    id: "st-ives-harbour",
    name: { ja: "セント・アイヴス港", en: "St Ives Harbour" },
    lat: 50.2086,
    lng: -5.4875,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "T83mKGf_c3k",
      channelId: "UC683QcyNqiaLGAB3OidWtBw",
      titleKey: "Live webcam of St Ives Harbour in Cornwall, UK.",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Dublin", Leinster
    id: "dublin-port",
    name: { ja: "ダブリン港", en: "Dublin Port" },
    lat: 53.3331,
    lng: -6.2489,
    timeZone: "Europe/Dublin",
    category: "harbor",
    country: "IE",
    source: {
      videoId: "oxx7MqjhOpw",
      channelId: "UCeGyo_v1ppwH-e77CVqLSJg",
      titleKey: "Dublin Bay Live: Watch Ships Enter and Exit Dublin Port",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Helsinki", Uusimaa
    id: "helsinki-port",
    name: { ja: "ヘルシンキ港", en: "Port of Helsinki" },
    lat: 60.1695,
    lng: 24.9354,
    timeZone: "Europe/Helsinki",
    category: "harbor",
    country: "FI",
    source: {
      videoId: "JnJhFYhIjFs",
      channelId: "UCuaFFNhZkcEg2JjEPvzjzzw",
      titleKey: "Port of Helsinki - West harbour - north cam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Geiranger", Møre og Romsdal
    id: "geirangerfjord",
    name: { ja: "ガイランゲルフィヨルド", en: "Geirangerfjord" },
    lat: 62.1019,
    lng: 7.2072,
    timeZone: "Europe/Oslo",
    category: "nature",
    country: "NO",
    source: {
      videoId: "yMSc-qqW3To",
      channelId: "UCbYNIUYxdzeQTKdb9GfJl3w",
      titleKey: "Geirangerfjord cruise port, Geiranger",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Hvar", Split-Dalmatia County
    id: "hvar",
    name: { ja: "フヴァル島（クロアチア）", en: "Hvar, Croatia" },
    lat: 43.1725,
    lng: 16.4428,
    timeZone: "Europe/Zagreb",
    category: "city",
    country: "HR",
    source: {
      videoId: "0wHWHAFnNh0",
      channelId: "UCQmlVF-VRx75AflM-9gJytg",
      titleKey: "Hvar, Croatia ☀ LIVE 24/7 WebCam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Benidorm", Valencia
    id: "benidorm",
    name: { ja: "ベニドルム海岸", en: "Benidorm Beach" },
    lat: 38.5382,
    lng: -0.131,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "M-2LWrTyPnY",
      channelId: "UCVlxVWLL0C1U9HRe9Nt55Lw",
      titleKey: "BENIDORM LIVE WEBCAM 🇪🇸 🔴 LIVE: Spain Resort Beach Twilight Real-Time 🌅🌊🏖️",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Arrecife", Canary Islands
    id: "lanzarote-airport",
    name: { ja: "ランサローテ空港", en: "Lanzarote Airport" },
    lat: 28.963,
    lng: -13.5477,
    timeZone: "Atlantic/Canary",
    category: "airport",
    country: "ES",
    source: {
      videoId: "AAlo3eCPVbk",
      channelId: "UCUaLy1_4rsLo4HyCLCPlD4g",
      titleKey: "LIVE 🔴 WEBCAM from LANZAROTE AIRPORT - (Canary Islands, Spain)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Portsmouth", England
    id: "portsmouth-hms-warrior",
    name: { ja: "ポーツマス HMSウォーリア", en: "HMS Warrior, Portsmouth" },
    lat: 50.799,
    lng: -1.0913,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "N9KCrI_-Zv0",
      channelId: "UC3ppRbUdj-XrSIn-6YHGP3w",
      titleKey: "HMS Warrior Webcam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Oakham", England
    id: "rutland-osprey",
    name: { ja: "ラトランドのミサゴ", en: "Rutland Ospreys" },
    lat: 52.6667,
    lng: -0.7333,
    timeZone: "Europe/London",
    category: "animal",
    country: "GB",
    source: {
      videoId: "CKvLj6ZFNcA",
      channelId: "UCJ8DHJ5VCVLm-o_Wo65VBaA",
      titleKey: "LRWT - Manton Bay Ospreys Live Webcam (Close-up)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Bad Salzungen", Thuringia
    id: "bad-salzungen-stork",
    name: { ja: "バート・ザルツンゲンのコウノトリ", en: "Stork Nest, Bad Salzungen" },
    lat: 50.8134,
    lng: 10.2361,
    timeZone: "Europe/Berlin",
    category: "animal",
    country: "DE",
    source: {
      videoId: "Dr5zebXpO-M",
      channelId: "UCzAuBgdr5YC8ARNRMWgIAXg",
      titleKey: "Storchennest Live Webcam in Bad Salzungen, Thüringen",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Chengdu", Sichuan
    id: "chengdu-panda",
    name: { ja: "成都 ジャイアントパンダ基地", en: "Chengdu Panda Base" },
    lat: 30.6667,
    lng: 104.0667,
    timeZone: "Asia/Shanghai",
    category: "animal",
    country: "CN",
    source: {
      videoId: "SUXPnIEpbn4",
      channelId: "UCtEgLf0_j1vJLz0aNEdO2SQ",
      titleKey: "Panda 24/7 HD Live At Chengdu Panda Base",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Taoyuan", Taiwan
    id: "taoyuan-airport",
    name: { ja: "桃園国際空港", en: "Taoyuan International Airport" },
    lat: 24.9937,
    lng: 121.297,
    timeZone: "Asia/Taipei",
    category: "airport",
    country: "TW",
    source: {
      videoId: "wWEnxWA7nnY",
      channelId: "UC8nqJIBj9B4DimyFEtQ6RpA",
      titleKey: "🔴 TPE 4K桃園國際機場 北跑道觀景台即時影像｜Taoyuan International Airport North Runway Live plane spotting",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "alishan",
    name: { ja: "阿里山（奮起湖）", en: "Alishan, Taiwan" },
    lat: 23.5085,
    lng: 120.6975,
    timeZone: "Asia/Taipei",
    category: "nature",
    country: "TW",
    source: {
      videoId: "B6eki-0-w0g",
      channelId: "UCQqyZgPh9Lu0w_rmWWBvuNg",
      titleKey: "4K Live cam-Alishan【阿里山美景4K直播】-奮起湖 Fenqihu",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "hongkong-aberdeen",
    name: { ja: "香港 アバディーン港", en: "Aberdeen Harbour, Hong Kong" },
    lat: 22.247,
    lng: 114.155,
    timeZone: "Asia/Hong_Kong",
    category: "harbor",
    country: "HK",
    source: {
      videoId: "DkmX5xQer1c",
      channelId: "UCBDx32JFg9vk9VHtQppv5tg",
      titleKey: "24/7 HK Live - Hong Kong Aberdeen Harbour Live Camera - 香港市景即時影像 香港仔海峽",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Ko Samui", Surat Thani
    id: "koh-samui",
    name: { ja: "サムイ島 ラマイビーチ", en: "Lamai Beach, Koh Samui" },
    lat: 9.5357,
    lng: 99.9357,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "kkVrj2cr9Ko",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 LIVE Crystal Bay Yacht Club Lamai | Koh Samui Beach Webcam | Thailand 24/7 | 1080p HD",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "everest-view",
    name: { ja: "エベレスト・ビュー（ネパール）", en: "Hotel Everest View, Nepal" },
    lat: 27.8053,
    lng: 86.7106,
    timeZone: "Asia/Kathmandu",
    category: "nature",
    country: "NP",
    source: {
      videoId: "SXsPeIqGJMA",
      channelId: "UCCCVkU6r9ZTD8E4z7AtuOIw",
      titleKey: "WEBCAM NEPAL LIVE – PANORAMIC VIEWS FROM HOTEL EVEREST VIEW - NOW WITH LIVE AUDIO!",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Davao City", Davao Region
    id: "davao-market",
    name: { ja: "ダバオ アグダオ市場", en: "Agdao Market, Davao" },
    lat: 7.0731,
    lng: 125.6128,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "u8CbGedbI08",
      channelId: "UCa6T92S2NKwSdQw8rXLe2rQ",
      titleKey: "🔴 LIVE: Agdao Market, Davao City Philippines|Real-Time CCTV|EdgeBabor Philippines",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Auckland", Auckland
    id: "auckland-harbour",
    name: { ja: "オークランド港", en: "Auckland Harbour" },
    lat: -36.8485,
    lng: 174.7635,
    timeZone: "Pacific/Auckland",
    category: "harbor",
    country: "NZ",
    source: {
      videoId: "PaLDpyFxpXE",
      channelId: "UCnuF5fiEc6DdbhDHCQoCAfA",
      titleKey: "🔴 LIVE Auckland NOW 🌤️ Harbour, Skyline &amp; Cruise Ships | 4K 24/7 #livecam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Newcastle", New South Wales
    id: "newcastle-port",
    name: { ja: "ニューカッスル港（豪）", en: "Port of Newcastle" },
    lat: -32.9295,
    lng: 151.7801,
    timeZone: "Australia/Sydney",
    category: "harbor",
    country: "AU",
    source: {
      videoId: "dypAtzvl24s",
      channelId: "UCTGhjtFloAPlbLy4_yrkoWg",
      titleKey: "Port of Newcastle Harbour Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "rio-copacabana",
    name: { ja: "リオ コパカバーナ海岸", en: "Copacabana, Rio de Janeiro" },
    lat: -22.9711,
    lng: -43.1822,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "65lUphjTAro",
      channelId: "UChWGYkK0I8U83C0FxAxWy4w",
      titleKey: "Webcam Rio de Janeiro Copacabana Posto 6",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Buenos Aires", Buenos Aires F.D.
    id: "buenos-aires-uade",
    name: { ja: "ブエノスアイレス", en: "Buenos Aires" },
    lat: -34.6131,
    lng: -58.3772,
    timeZone: "America/Argentina/Buenos_Aires",
    category: "city",
    country: "AR",
    source: {
      videoId: "NfsyRx50gAI",
      channelId: "UCJbgNz5VfETvD_wd4KiF2yQ",
      titleKey: "Cámara en vivo | UADE Campus Buenos Aires",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Montreal", Quebec
    id: "montreal-airport",
    name: { ja: "モントリオール空港", en: "Montréal–Trudeau Airport" },
    lat: 45.5088,
    lng: -73.5878,
    timeZone: "America/Toronto",
    category: "airport",
    country: "CA",
    source: {
      videoId: "iJxeutc3QCI",
      channelId: "UCmM8fJ5uDl8pqu8nnd8Ixlg",
      titleKey: "LIVE Montreal Trudeau Airport CYUL 24/7 Webcam Runway 24L",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Vancouver", British Columbia
    id: "vancouver-harbour",
    name: { ja: "バンクーバー港", en: "Vancouver Harbour" },
    lat: 49.2497,
    lng: -123.1193,
    timeZone: "America/Vancouver",
    category: "harbor",
    country: "CA",
    source: {
      videoId: "rxyNjFKwzJA",
      channelId: "UCYky246qWfKe82NLQ9VXbgQ",
      titleKey: "🔴🚢 Vancouver LIVE Cam | Cruise Ship LiveStream 24/7 | City Views &amp; Canada Place | Alaska Season 2026",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Philipsburg"
    id: "maho-beach",
    name: { ja: "マホビーチ（着陸機が頭上を通る）", en: "Maho Beach, St Maarten" },
    lat: 18.026,
    lng: -63.0458,
    timeZone: "America/Lower_Princes",
    category: "airport",
    country: "SX",
    source: {
      videoId: "iSeH45R-8R0",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "✈️  Maho Beach Saint Martin | Princess Juliana Airport Beach 24/7 | LIVE Cam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Toutle", Washington
    id: "mount-st-helens",
    name: { ja: "セント・ヘレンズ山", en: "Mount St. Helens" },
    lat: 46.3248,
    lng: -122.7365,
    timeZone: "America/Los_Angeles",
    category: "volcano",
    country: "US",
    source: {
      videoId: "YTZe2eyO824",
      channelId: "UC21fnDewX_begL0xw8U3ljg",
      titleKey: "**LIVE** Mount St. Helens | Coldwater Lake Weather Cam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "King Salmon", Alaska
    id: "brooks-falls",
    name: { ja: "ブルックス滝のヒグマ", en: "Brooks Falls Bears, Katmai" },
    lat: 58.6883,
    lng: -156.6614,
    timeZone: "America/Anchorage",
    category: "animal",
    country: "US",
    source: {
      videoId: "J7ZrIDvqlic",
      channelId: "UC-2KSeUU5SMCX6XLRD-AEvw",
      titleKey: "LIVE Brooks Falls - Katmai National Park, Alaska 2026 | explore.org",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Big Bear Lake", California
    id: "big-bear-eagle",
    name: { ja: "ビッグベアのハクトウワシ", en: "Big Bear Bald Eagles" },
    lat: 34.2439,
    lng: -116.9114,
    timeZone: "America/Los_Angeles",
    category: "animal",
    country: "US",
    source: {
      videoId: "41eq4VzCYc4",
      channelId: "UCsFgbVuhRrPV5FqyN7kOD8g",
      titleKey: "Big Bear Bald Eagle Wide View - Cam 2",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Gorham", New Hampshire
    id: "mount-washington",
    name: { ja: "ワシントン山観測所", en: "Mount Washington Observatory" },
    lat: 44.3878,
    lng: -71.1731,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "Z27ghRYocJ4",
      channelId: "UCq-cqqXchflIRPLsf_n3wlg",
      titleKey: "LIVE: Mount Washington Observatory Deck Cam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Honolulu", Hawaii
    id: "waikiki-beach",
    name: { ja: "ワイキキビーチ", en: "Waikiki Beach" },
    lat: 21.3069,
    lng: -157.8583,
    timeZone: "Pacific/Honolulu",
    category: "nature",
    country: "US",
    source: {
      videoId: "U_Jsbq9kYE8",
      channelId: "UCspnu6n44ydqafj6nFIw5hw",
      titleKey: "Park Shore Waikiki Hotel Live Cam | Waikiki Beach, Honolulu",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Los Angeles", California
    id: "lax-airport",
    name: { ja: "ロサンゼルス国際空港", en: "Los Angeles International Airport" },
    lat: 34.0522,
    lng: -118.2437,
    timeZone: "America/Los_Angeles",
    category: "airport",
    country: "US",
    source: {
      videoId: "n4I0d44oBEs",
      channelId: "UCox5yCEEjk4iYbhLgyj90EQ",
      titleKey: "🔴LIVE 24/7 LAX Airport Action Runways 24L &amp; 24R | LIVE Plane Spotting with ATC!",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "maasai-mara",
    name: { ja: "マサイマラ国立保護区", en: "Maasai Mara, Kenya" },
    lat: -1.4833,
    lng: 35.15,
    timeZone: "Africa/Nairobi",
    category: "animal",
    country: "KE",
    source: {
      videoId: "gVNpA3WNMyc",
      channelId: "UCv7WvXfp-l07Z6IuComA36w",
      titleKey: "🔴 LIVE African Safari | 6 Maasai Mara Wildlife Cameras | Kenya 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "etosha-okaukuejo",
    name: { ja: "エトーシャ国立公園の水場", en: "Etosha Waterhole, Namibia" },
    lat: -19.1817,
    lng: 15.9128,
    timeZone: "Africa/Windhoek",
    category: "animal",
    country: "NA",
    source: {
      videoId: "JMMoRwYo5kE",
      channelId: "UCfn4vrrgKXCCg3rxxLRGOvg",
      titleKey: "Okaukuejo Resort, Wildlife Waterhole: Live camera stream in the Etosha National Park in Namibia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "stony-point-penguins",
    name: { ja: "ストーニーポイントのペンギン", en: "African Penguins, Stony Point" },
    lat: -34.3733,
    lng: 18.8925,
    timeZone: "Africa/Johannesburg",
    category: "animal",
    country: "ZA",
    source: {
      videoId: "NiwrvhQIHIo",
      channelId: "UCgWh6X0Yop6k7X6ShWIBVsg",
      titleKey: "Watch African Penguins LIVE | Stony Point Colony | South Africa",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Hoedspruit", Limpopo
    id: "hoedspruit-rhino",
    name: { ja: "ホードスプロイトのサイ", en: "Rhino Cam, Hoedspruit" },
    lat: -24.3512,
    lng: 30.9533,
    timeZone: "Africa/Johannesburg",
    category: "animal",
    country: "ZA",
    source: {
      videoId: "wtylzrJvCKU",
      channelId: "UCMfjW-9aZnsR-Rq-Ngo4CpQ",
      titleKey: "LIVE Africam Rhino Cam at the Hoedspruit Endangered Species Centre - South Africa | explore.org",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Busan", Busan
    id: "busan-haeundae",
    name: { ja: "釜山 海雲台ビーチ", en: "Haeundae Beach, Busan" },
    lat: 35.1017,
    lng: 129.03,
    timeZone: "Asia/Seoul",
    category: "nature",
    country: "KR",
    source: {
      videoId: "LGuktGeHQxI",
      channelId: "UCZsIhpfgnO7nNrDWu7dj89g",
      titleKey: "[실시간 해운대해수욕장] 4K Live Cam Haeundae Busan, Transmisión en vivo de la cámara de Haeundae",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Seogwipo", Jeju-do
    id: "jeju-seongsan",
    name: { ja: "済州島 城山", en: "Seongsan, Jeju Island" },
    lat: 33.2533,
    lng: 126.5618,
    timeZone: "Asia/Seoul",
    category: "nature",
    country: "KR",
    source: {
      videoId: "NCzm0l_ZqzU",
      channelId: "UC-cGXwzS7XwlVn6zaPa3CDw",
      titleKey: "펀제주 제주도 서귀포 성산읍 지금 날씨 실시간 제주 오늘 라이브 캠,   Jeju Island in South Korea Live CCTV Cam Sungsanilchulbong",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Seoul", Seoul
    id: "seoul-seongsu",
    name: { ja: "ソウル 聖水洞", en: "Seongsu, Seoul" },
    lat: 37.566,
    lng: 126.9784,
    timeZone: "Asia/Seoul",
    category: "city",
    country: "KR",
    source: {
      videoId: "vUd4w805yNU",
      channelId: "UCNdb9Zrjyn_6Ot_91JdRXlw",
      titleKey: "성수 핫플 라이브(Seoul Korea Seongsu Station Live Cam)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Daejeon", Daejeon
    id: "daejeon-expo",
    name: { ja: "大田 エキスポ科学公園", en: "Expo Science Park, Daejeon" },
    lat: 36.3491,
    lng: 127.3849,
    timeZone: "Asia/Seoul",
    category: "city",
    country: "KR",
    source: {
      videoId: "CQO1Ka7HqCg",
      channelId: "UCsy6UOjk8q7Ajq9yQ7iDAbA",
      titleKey: "대전실시간 대전라이브 대전엑스포과학공원 한빛광장 LiveCam I &quot;ExpoSciencePark,Hanbit Square&quot;,Daejeon,Korea I 대전관광공사 대전여행",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Jiufen", Taipei
    id: "jiufen",
    name: { ja: "九份", en: "Jiufen, Taiwan" },
    lat: 25.1096,
    lng: 121.8442,
    timeZone: "Asia/Taipei",
    category: "city",
    country: "TW",
    source: {
      videoId: "XSD5ptYisw8",
      channelId: "UCm8_3Nf9LFmPwuKSvYhhwLw",
      titleKey: "九份即時影像 Jiufen Live Camera 실시간 주펀 라이브캠  | 新北觀光即時影像 | ライブカメラ",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Taipei", Taiwan
    id: "taipei-xiangshan",
    name: { ja: "台北 象山からの眺め", en: "Taipei from Xiangshan" },
    lat: 25.0531,
    lng: 121.5264,
    timeZone: "Asia/Taipei",
    category: "city",
    country: "TW",
    source: {
      videoId: "z_fY1pj1VBw",
      channelId: "UCJLjpq7pTJRbP3vtx0LxB9Q",
      titleKey: "【Taipei Live Cam】象山看台北 - 4K即時影像 | Overlooking Taipei at the top of Xiangshan | 象山から望む台北 | Taipei 101",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "duoliang-station",
    name: { ja: "台東 多良駅", en: "Duoliang Station, Taitung" },
    lat: 22.423,
    lng: 120.888,
    timeZone: "Asia/Taipei",
    category: "railway",
    country: "TW",
    source: {
      videoId: "UCG1aXVO8H8",
      channelId: "UCT4jEYvUdpdN9oUALaypGfQ",
      titleKey: "【4K】台東多良車站即時影像 Taitung Duoliang Station Live Camera",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Assisi", Umbria
    id: "assisi-basilica",
    name: { ja: "アッシジ 聖フランチェスコ聖堂", en: "Basilica of San Francesco, Assisi" },
    lat: 43.0667,
    lng: 12.6211,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "5ka3YhVZgME",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Assisi Live Webcam Basilica di San Francesco",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mount-etna",
    name: { ja: "エトナ火山", en: "Mount Etna" },
    lat: 37.751,
    lng: 14.9934,
    timeZone: "Europe/Rome",
    category: "volcano",
    country: "IT",
    source: {
      videoId: "t4vlFU-ypIw",
      channelId: "UC_LnSAP1K6UmVEVT1mGy_AQ",
      titleKey: "🔴 Mount Etna Live Stream – Real-Time Volcano Webcam (Sicily, Italy) | 18 August 2026",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Dresden", Saxony
    id: "dresden-elbe",
    name: { ja: "ドレスデン エルベ川", en: "Elbe at Dresden" },
    lat: 51.0509,
    lng: 13.7383,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "vTJGeIvg8EY",
      channelId: "UCOl2i5KaGd2y_0CbSeS7TBA",
      titleKey: "Livecam Elbufer Dresden / Live from the river Elbe &amp; Panorama of Dresden",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Berlin", State of Berlin
    id: "berlin-webcam",
    name: { ja: "ベルリン", en: "Berlin" },
    lat: 52.5244,
    lng: 13.4105,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "4Xg-wkPazp4",
      channelId: "UCpR-vq358IEHwt-FgPsEBpA",
      titleKey: "BerlinWebcam1",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Hanover", Lower Saxony
    id: "hannover-railway",
    name: { ja: "ハノーファーの線路", en: "Hannover Railway" },
    lat: 52.3705,
    lng: 9.7332,
    timeZone: "Europe/Berlin",
    category: "railway",
    country: "DE",
    source: {
      videoId: "0i1ZP_oc86w",
      channelId: "UCKUb0TwifX_aQODQosDAfoA",
      titleKey: "LIVE: Train Traffic in Hannover Germany | ICEs, REs, Freight Trains | 24/7 Live Stream",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Częstochowa", Silesia
    id: "jasna-gora",
    name: { ja: "ヤスナ・グラ修道院", en: "Jasna Góra Monastery" },
    lat: 50.7965,
    lng: 19.1241,
    timeZone: "Europe/Warsaw",
    category: "city",
    country: "PL",
    source: {
      videoId: "yMxD3gdeXmk",
      channelId: "UCKAtPxfE2RAHSCwDABMMeAg",
      titleKey: "Jasna Góra Klasztor Ojców Paulinów – transmisja na żywo, ON-LINE, msza święta na żywo",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Scheveningen", South Holland
    id: "scheveningen",
    name: { ja: "スヘフェニンゲン海岸", en: "Scheveningen Beach" },
    lat: 52.1046,
    lng: 4.2756,
    timeZone: "Europe/Amsterdam",
    category: "nature",
    country: "NL",
    source: {
      videoId: "A5kXiKzbBFs",
      channelId: "UCgDKPUQWlxzaqPm6tOFrInw",
      titleKey: "Live Scheveningen Boulevard en Beach Camera",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Amsterdam", North Holland
    id: "amsterdam-bridges",
    name: { ja: "アムステルダム 五つの橋", en: "De Vijf Bruggen, Amsterdam" },
    lat: 52.374,
    lng: 4.8897,
    timeZone: "Europe/Amsterdam",
    category: "railway",
    country: "NL",
    source: {
      videoId: "2tgHBRFHMm8",
      channelId: "UCn4oQ60oxfvq7aesEPYqpKw",
      titleKey: "Amsterdam De Vijf Bruggen camera 1",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Hastings", England
    id: "hastings-pier",
    name: { ja: "ヘイスティングズ桟橋", en: "Hastings Pier" },
    lat: 50.8557,
    lng: 0.5801,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "5FBMg0K85Jg",
      channelId: "UCBHhwpHuJR4ZSH8gvxT0DdQ",
      titleKey: "Hastings Pier Webcam and English Channel LIVE HD",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "St Petersburg", St.-Petersburg
    id: "st-petersburg-nevsky",
    name: { ja: "サンクトペテルブルク ネフスキー大通り", en: "Nevsky Prospect, St Petersburg" },
    lat: 59.9386,
    lng: 30.3141,
    timeZone: "Europe/Moscow",
    category: "city",
    country: "RU",
    source: {
      videoId: "fUsJZTHeZn4",
      channelId: "UCz1GKiqSoG2DSesCQ3SoFYg",
      titleKey: "LIVE Nevskiy avenue St. Petersburg Russia Anichkov Palace Невский пр. Аничков дворец Санкт-Петербург",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Ságvár", Somogy County
    id: "sagvar-stork",
    name: { ja: "シャーグヴァールのコウノトリ", en: "Stork Nest, Ságvár" },
    lat: 46.8366,
    lng: 18.1014,
    timeZone: "Europe/Budapest",
    category: "animal",
    country: "HU",
    source: {
      videoId: "AO5I5nNbbnE",
      channelId: "UCU31-9qcY1RDuMad67dbuhw",
      titleKey: "LIVE White Stork Nest Cam (Ságvár, Hungary)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "rio-christ-redeemer",
    name: { ja: "リオ コルコバードのキリスト像", en: "Christ the Redeemer, Rio" },
    lat: -22.9519,
    lng: -43.2105,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "PhYE9txaPlo",
      channelId: "UCfMOswhx9NN_laZ8Ukcm4-Q",
      titleKey: "Cristo Redentor Ao Vivo En Vivo| Christ the Redeemer Live Cam — Rio de Janeiro Brazil",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Balneário Camboriú", Santa Catarina
    id: "balneario-camboriu",
    name: { ja: "バルネアリオ・カンボリウ", en: "Balneário Camboriú" },
    lat: -26.9906,
    lng: -48.6347,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "5Xl6pSgiy3A",
      channelId: "UCi1vQx48j_nfrMg6XH5PItQ",
      titleKey: "Balneário Camboriú ao vivo - Avenida Atlântica",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Natal", Rio Grande do Norte
    id: "natal-ponta-negra",
    name: { ja: "ナタール ポンタネグラ海岸", en: "Ponta Negra, Natal" },
    lat: -5.795,
    lng: -35.2094,
    timeZone: "America/Fortaleza",
    category: "nature",
    country: "BR",
    source: {
      videoId: "TxzuYLK_ZXo",
      channelId: "UC-dGHuK8OcC_WIWvNzxysag",
      titleKey: "PRAIA DE PONTA NEGRA AO VIVO! NATAL-RN / BRASIL - LIVE CAM NATAL",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Manaus", Amazonas
    id: "manaus-ponta-negra",
    name: { ja: "マナウス ポンタネグラ", en: "Ponta Negra, Manaus" },
    lat: -3.1019,
    lng: -60.025,
    timeZone: "America/Manaus",
    category: "nature",
    country: "BR",
    source: {
      videoId: "xt5k4nWXOEc",
      channelId: "UCH9JbKmqTI6gwhA4ghl32FQ",
      titleKey: "Ponta Negra ao Vivo 24h - Manaus - AmzLive.com.br",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Concepción", Biobio
    id: "concepcion-chile",
    name: { ja: "コンセプシオン（チリ）", en: "Concepción, Chile" },
    lat: -36.827,
    lng: -73.0498,
    timeZone: "America/Santiago",
    category: "city",
    country: "CL",
    source: {
      videoId: "RhdmP5017VM",
      channelId: "UCJizf5PzUJ88hro1m-cUcSA",
      titleKey: "CONCECAM - Concepción Centro, Chile - Cámara Ultra HD en vivo y en directo, live cam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Valparaíso", Valparaiso
    id: "valparaiso",
    name: { ja: "バルパライソ（チリ）", en: "Valparaíso, Chile" },
    lat: -33.036,
    lng: -71.6296,
    timeZone: "America/Santiago",
    category: "harbor",
    country: "CL",
    source: {
      videoId: "5jPpMkg5daM",
      channelId: "UCXaQjESu5cdF1CGH1aAA52Q",
      titleKey: "Valparaíso, Chile EN VIVO | LIVE CAM",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Porto Alegre", Rio Grande do Sul
    id: "porto-alegre-airport",
    name: { ja: "ポルトアレグレ空港", en: "Porto Alegre Airport" },
    lat: -30.0328,
    lng: -51.2302,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "IdAvz5TD6Wc",
      channelId: "UCFGIPvN1dMn4Bdo8B8WWPDw",
      titleKey: "SBPA / POA - LIVE CAM 1 Aeroporto Salgado Filho de Porto Alegre - RS - Brasil - Movimento ao Vivo",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Kingston", Kingston
    id: "kingston-jamaica",
    name: { ja: "キングストン（ジャマイカ）", en: "Kingston, Jamaica" },
    lat: 17.997,
    lng: -76.7936,
    timeZone: "America/Jamaica",
    category: "city",
    country: "JM",
    source: {
      videoId: "C71bNZ1coG4",
      channelId: "UCfS5_X4LiZJV5vq6z7itypA",
      titleKey: "🟢Half Way Tree Clock LIVE 24/7 – Kingston Jamaica Street Camera",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Pattaya", Chon Buri
    id: "pattaya-soi-buakhao",
    name: { ja: "パタヤ ソイ・ブアカオ", en: "Soi Buakhao, Pattaya" },
    lat: 12.9333,
    lng: 100.8833,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "8ieVWInyYKk",
      channelId: "UCd0Aa89g9hbSQC-APdXWNNg",
      titleKey: "Soi Buakhao, Pattaya Live, Thailand",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Panglao", Central Visayas
    id: "bohol-alona",
    name: { ja: "ボホール島 アロナビーチ", en: "Alona Beach, Bohol" },
    lat: 9.5781,
    lng: 123.7458,
    timeZone: "Asia/Manila",
    category: "nature",
    country: "PH",
    source: {
      videoId: "F4QxpMNKggI",
      channelId: "UCvcgdCvIPABMv-LOILqIHsw",
      titleKey: "LIVE !! 보홀 여행 필수 체크! 헤난 알로나 리조트 정문 실시간 날씨 &amp; 거리 분위기 라이브 캠 (어반스파이스)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sakurajima",
    name: { ja: "桜島", en: "Sakurajima Volcano" },
    lat: 31.5931,
    lng: 130.6572,
    timeZone: "Asia/Tokyo",
    category: "volcano",
    country: "JP",
    source: {
      videoId: "PeElJClXtzE",
      channelId: "UCpWU25qIleNLmUEF9VwBdMA",
      titleKey: "【2K LIVE】桜島 ライブカメラB【近景】鹿児島県 垂水市 / Sakurajima, an active volcano live cam (Close-up view) JAPAN&#39;",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Nagoya", Aichi
    id: "nagoya-hisaya",
    name: { ja: "名古屋 久屋大通公園", en: "Hisaya-odori Park, Nagoya" },
    lat: 35.1815,
    lng: 136.9064,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "XveD1yUUmsE",
      channelId: "UCHoJiBhfhNVyFcennfJr7Yg",
      titleKey: "【LIVE】久屋大通公園（名古屋市中区）ライブカメラ/Livecam HISAYA ODORI PARK in Nagoya Japan",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Gujō", Gifu
    id: "gujo-hachiman",
    name: { ja: "郡上八幡", en: "Gujo Hachiman" },
    lat: 35.7369,
    lng: 136.9585,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "L0C80aVxJaU",
      channelId: "UCyoue0T-ZZp8NVJ9fBAsygA",
      titleKey: "【岐阜県郡上市】郡上八幡 お天気カメラ LIVECAM",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Canmore", Alberta
    id: "canmore-alberta",
    name: { ja: "カンモア（カナダ・ロッキー）", en: "Canmore, Alberta" },
    lat: 51.0834,
    lng: -115.3521,
    timeZone: "America/Edmonton",
    category: "nature",
    country: "CA",
    source: {
      videoId: "_0wPODlF9wU",
      channelId: "UCSB3xOs0FgIW0uqKTqoXqhg",
      titleKey: "Main Street Livecam, Canmore, Alberta",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Singapore"
    id: "singapore-downtown",
    name: { ja: "シンガポール ダウンタウン", en: "Downtown Singapore" },
    lat: 1.2897,
    lng: 103.8501,
    timeZone: "Asia/Singapore",
    category: "city",
    country: "SG",
    source: {
      videoId: "9cfkyMzanbc",
      channelId: "UCD-Hv0aJkZz0isAwOtFErVg",
      titleKey: "【LIVE CAMERA】Downtown Singapore　シンガポール　ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "rhine-falls",
    name: { ja: "ラインの滝（スイス）", en: "Rhine Falls, Switzerland" },
    lat: 47.6779,
    lng: 8.6153,
    timeZone: "Europe/Zurich",
    category: "nature",
    country: "CH",
    source: {
      videoId: "UCgLr29bxO8",
      channelId: "UCuZhFhdPtslobdcZtGABKDA",
      titleKey: "Rhine Falls live | Rheinfall live - Webcam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Mamaia", Constanța County
    id: "mamaia-beach",
    name: { ja: "ママイア海岸（ルーマニア）", en: "Mamaia Beach, Romania" },
    lat: 44.2101,
    lng: 28.6436,
    timeZone: "Europe/Bucharest",
    category: "nature",
    country: "RO",
    source: {
      videoId: "1ImMAzHB2EI",
      channelId: "UCIN4PXb4H-G0Pi4R2A_ZEgA",
      titleKey: "Webcam Mamaia Hotel Malibu  –  LIVE de pe plajă",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Koksijde", Flanders
    id: "koksijde",
    name: { ja: "コクシャイデ（ベルギー）", en: "Koksijde, Belgium" },
    lat: 51.1164,
    lng: 2.6377,
    timeZone: "Europe/Brussels",
    category: "nature",
    country: "BE",
    source: {
      videoId: "5Uqw_G_IdjE",
      channelId: "UCPAgksFpFLJDVyMcIYsbz3A",
      titleKey: "Webcam Koksijde-Bad",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Havlíčkův Brod", Vysocina
    id: "havlickuv-brod",
    name: { ja: "ハヴリーチクーフ・ブロト広場", en: "Havlíčkův Brod Square" },
    lat: 49.6069,
    lng: 15.5794,
    timeZone: "Europe/Prague",
    category: "city",
    country: "CZ",
    source: {
      videoId: "-ITtIF0sxRs",
      channelId: "UC8eRoWTPlxALM729Vm854sA",
      titleKey: "Havlíčkovo náměstí živě",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Itaura", Uttar Pradesh
    id: "itaura-village",
    name: { ja: "イタウラ村（インド）", en: "Itaura Village, India" },
    lat: 25.5253,
    lng: 79.1628,
    timeZone: "Asia/Kolkata",
    category: "city",
    country: "IN",
    source: {
      videoId: "ss7rSdSTrwc",
      channelId: "UChswY0TkLMxfTMQRfBpHhMQ",
      titleKey: "🔴 24/7 Live: LS Jan Seva Kendra &amp; LIC Office | Itaura Village Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "alma-atacama",
    name: { ja: "アタカマ砂漠 ALMA望遠鏡群", en: "ALMA Observatory, Atacama" },
    lat: -23.0294,
    lng: -67.7548,
    timeZone: "America/Santiago",
    category: "nature",
    country: "CL",
    source: {
      videoId: "BVKRAzTSnB0",
      channelId: "UCiN7OwV8g8dMm_E0xphBVig",
      titleKey: "The Atacama Large Millimeter/submillimeter Array (ALMA) and Starry sky LIVE, Chile",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Porto", Porto District
    id: "porto-ribeira",
    name: { ja: "ポルト リベイラ地区", en: "Ribeira, Porto" },
    lat: 41.1485,
    lng: -8.611,
    timeZone: "Europe/Lisbon",
    category: "city",
    country: "PT",
    source: {
      videoId: "45wxTsNFPXw",
      channelId: "UC1tBnbs03VJ34oLD8cmJSVw",
      titleKey: "LIVE Porto Webcam Ribeira and Vila Nova de Gaia – Oporto, Portugal",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Funchal", Madeira
    id: "funchal-marina",
    name: { ja: "フンシャル港（マデイラ島）", en: "Funchal Marina, Madeira" },
    lat: 32.6657,
    lng: -16.9255,
    timeZone: "Atlantic/Madeira",
    category: "harbor",
    country: "PT",
    source: {
      videoId: "f6D3Zq6J5A8",
      channelId: "UCH_lKz2VXlfLPgYOE3biySg",
      titleKey: "LIVE: Funchal Marina Webcam 2 Madeira Island | Madeira-Web",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Kittilä", Lapland
    id: "levi-lapland",
    name: { ja: "レヴィ（フィンランド・ラップランド）", en: "Levi, Finnish Lapland" },
    lat: 67.6647,
    lng: 24.8936,
    timeZone: "Europe/Helsinki",
    category: "nature",
    country: "FI",
    source: {
      videoId: "LwihxyJ4V20",
      channelId: "UC1HDQ1Q5nVHYF8e7dL4E-pw",
      titleKey: "Zero Point Levi | Levi Ski Resort | Finland",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Fort William", Scotland
    id: "fort-william",
    name: { ja: "フォート・ウィリアム（スコットランド）", en: "Fort William, Scotland" },
    lat: 56.8165,
    lng: -5.1121,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "2occtpoOu_w",
      channelId: "UCAY-GlV3P5twjg7B9tjx_lg",
      titleKey: "🔴LIVE - Fort William Live Webcam - Scotland - Loch Linnhe &amp; West End Car Park",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Windermere", England
    id: "lake-windermere",
    name: { ja: "ウィンダミア湖（湖水地方）", en: "Lake Windermere" },
    lat: 54.3809,
    lng: -2.9071,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "MK6MjpRLPWs",
      channelId: "UCFaNfBC_D28ZtqBH3jfcasQ",
      titleKey: "Live Webcam from Low Wood Bay Resort &amp; Spa — Lake Windermere, UK",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Prague", Prague
    id: "prague-airport",
    name: { ja: "プラハ空港", en: "Prague Airport" },
    lat: 50.088,
    lng: 14.4208,
    timeZone: "Europe/Prague",
    category: "airport",
    country: "CZ",
    source: {
      videoId: "kuOmmVkOGN8",
      channelId: "UC3ewP9SczRIGGpDXDQvpPyQ",
      titleKey: "🔴 LIVE: Planespotting at Prague Vaclav Havel Airport, Prague | 24/7 LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "amsterdam-dam",
    name: { ja: "アムステルダム ダム広場", en: "Dam Square, Amsterdam" },
    lat: 52.3731,
    lng: 4.8926,
    timeZone: "Europe/Amsterdam",
    category: "city",
    country: "NL",
    source: {
      videoId: "Gd9d4q6WvUY",
      channelId: "UCWsoep0hJKhGbYosMeQIyXA",
      titleKey: "Now4Rent.NL | Amsterdam De Dam | Pan Tilt Zoom Camera | Ultra HD (4K)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Muizenberg", Western Cape
    id: "muizenberg-beach",
    name: { ja: "ムイゼンバーグ海岸（ケープタウン）", en: "Muizenberg Beach" },
    lat: -34.097,
    lng: 18.4797,
    timeZone: "Africa/Johannesburg",
    category: "nature",
    country: "ZA",
    source: {
      videoId: "-dGHAohQcSc",
      channelId: "UCef_Yfk6baScsTCcDxzXE5Q",
      titleKey: "Muizenberg Beach Live Webcam | REEF South Africa  @Reef-SA",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Cape Town", Western Cape
    id: "clifton-beach",
    name: { ja: "クリフトン海岸（ケープタウン）", en: "Clifton Beach, Cape Town" },
    lat: -33.9258,
    lng: 18.4232,
    timeZone: "Africa/Johannesburg",
    category: "nature",
    country: "ZA",
    source: {
      videoId: "IGu55JrxyHU",
      channelId: "UCLmKcWr9EjhgrlivvJQovOQ",
      titleKey: "Clifton 4th beach webcam Live Stream, Cape Town",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "zenkoji",
    name: { ja: "善光寺（長野）", en: "Zenkoji Temple, Nagano" },
    lat: 36.6617,
    lng: 138.1875,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "HvJdPF46kak",
      channelId: "UCy9ww22FuUlXd0c6B8INJVQ",
      titleKey: "善光寺LIVEカメラ（Zenkoji Temple Live Cam)　INC長野ケーブルテレビ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "kyoto-kiyomizuzaka",
    name: { ja: "京都 清水坂", en: "Kiyomizu-zaka, Kyoto" },
    lat: 34.9948,
    lng: 135.783,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "cUnYPpK7ENk",
      channelId: "UCyVf8FIJ-kFpzUadi7_tgZQ",
      titleKey: "【LIVE】京都 清水坂ライブ中継カメラ／Kiyomizu-zaka, Kyoto Live camera",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Kutchan", Hokkaido
    id: "niseko-hanazono",
    name: { ja: "ニセコ 花園", en: "Niseko Hanazono" },
    lat: 42.9011,
    lng: 140.7406,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "1ksmiy6EsDo",
      channelId: "UCrNyeY4kGLL0-Hs8wC98peg",
      titleKey: "[4K] Live Camera - Niseko Hanazono Resort",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Beppu", Oita
    id: "beppu-bay",
    name: { ja: "別府湾", en: "Beppu Bay" },
    lat: 33.2794,
    lng: 131.4975,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "hdVgObFgBV8",
      channelId: "UCd41Qao7-RbhcZeDywVfZ9w",
      titleKey: "【4K  LIVE】Beppu Bay Cam　国道10号・別府湾　災害時の波、道路渋滞、地震、台風などの情報にお役立てください。　＃災害＃別府湾＃別大＃夕焼け",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "niagara-falls",
    name: { ja: "ナイアガラの滝", en: "Niagara Falls" },
    lat: 43.0828,
    lng: -79.0742,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "7gBzLGlJnwk",
      channelId: "UC15QFO-cdISk-4Sn5CPd78g",
      titleKey: "Niagara Falls Live",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Miami", Florida
    id: "miami-coral-city",
    name: { ja: "マイアミ 水中のサンゴ礁", en: "Coral City Camera, Miami" },
    lat: 25.7743,
    lng: -80.1937,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "7i8ARjIeM2k",
      channelId: "UCtllXAWa3EcfcsL5tvpqGSw",
      titleKey: "Coral City Camera (Miami&#39;s Free-Range Aquarium Underwater Livestream)",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Yosemite Valley", California
    id: "yosemite",
    name: { ja: "ヨセミテ国立公園", en: "Yosemite National Park" },
    lat: 37.7407,
    lng: -119.5779,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "AvJl1Vbsg38",
      channelId: "UCScswbWVOicLBZwD_6zfXkA",
      titleKey: "🏔️ Yosemite National Park LIVE | El Capitan, Half Dome &amp; Yosemite Falls",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Calgary", Alberta
    id: "calgary",
    name: { ja: "カルガリー（カナダ）", en: "Calgary, Canada" },
    lat: 51.0501,
    lng: -114.0853,
    timeZone: "America/Edmonton",
    category: "city",
    country: "CA",
    source: {
      videoId: "MwcqP3ta6RI",
      channelId: "UCXab5AWv4FVoGCoVqDTq36w",
      titleKey: "Calgary Live Camera",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Reykjavik", Capital Region
    id: "reykjavik",
    name: { ja: "レイキャヴィク", en: "Reykjavík, Iceland" },
    lat: 64.1355,
    lng: -21.8954,
    timeZone: "Atlantic/Reykjavik",
    category: "city",
    country: "IS",
    source: {
      videoId: "tYgGEC-ESTw",
      channelId: "UCuVVqZu5AuRf3jaKHRy5-Sw",
      titleKey: "Reykjavik, Iceland LIVE",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Grindavik", Southern Peninsula
    id: "iceland-eruption",
    name: { ja: "アイスランドの噴火（ハガフェル）", en: "Iceland Volcano Eruption" },
    lat: 63.8385,
    lng: -22.4393,
    timeZone: "Atlantic/Reykjavik",
    category: "volcano",
    country: "IS",
    source: {
      videoId: "L8i9G8jhWao",
      channelId: "UCpkcJlssp52fP6xHFUYT9ag",
      titleKey: "LIVE from Hagafell - Close up - Iceland volcano eruption",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Akureyri", Northeast
    id: "akureyri",
    name: { ja: "アークレイリ（北アイスランド）", en: "Akureyri, Iceland" },
    lat: 65.6835,
    lng: -18.0878,
    timeZone: "Atlantic/Reykjavik",
    category: "city",
    country: "IS",
    source: {
      videoId: "GXTycxKz_FQ",
      channelId: "UC0aRUMUvwJ-7xx0mfNwhVZA",
      titleKey: "Rósenborg",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Ilulissat", Avannaata
    id: "ilulissat-icebergs",
    name: { ja: "イルリサットの氷山（グリーンランド）", en: "Ilulissat Icebergs, Greenland" },
    lat: 69.2198,
    lng: -51.0986,
    timeZone: "America/Nuuk",
    category: "nature",
    country: "GL",
    source: {
      videoId: "h8O0UXsL7uk",
      channelId: "UCaG0IHN1RMOZ4-U3wDXAkwA",
      titleKey: "🔴 Live Now: 24/7 Iceberg Cam of Ilulissat, Greenland in 4K Ultra HD",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Athens", Attica
    id: "athens",
    name: { ja: "アテネ", en: "Athens, Greece" },
    lat: 37.9838,
    lng: 23.7278,
    timeZone: "Europe/Athens",
    category: "city",
    country: "GR",
    source: {
      videoId: "gf_B5-ZNByA",
      channelId: "UCHM2Zp3HKkf2lQPItuIG6uA",
      titleKey: "🟢Live Παράθυρο στην Αθήνα / Window in Athens | 4K-UHD",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Tinos", South Aegean
    id: "tinos-port",
    name: { ja: "ティノス島の港", en: "Port of Tinos" },
    lat: 37.5375,
    lng: 25.1634,
    timeZone: "Europe/Athens",
    category: "harbor",
    country: "GR",
    source: {
      videoId: "PAK2GoHG7Hs",
      channelId: "UCGYQwxgH5Nac7xlQW6MHPAQ",
      titleKey: "Tinos live: Το λιμάνι της Τήνου - port of Tinos",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Rhodes", South Aegean
    id: "rhodes-beach",
    name: { ja: "ロードス島", en: "Rhodes, Greece" },
    lat: 36.4356,
    lng: 28.222,
    timeZone: "Europe/Athens",
    category: "nature",
    country: "GR",
    source: {
      videoId: "kpyEOpLmXUk",
      channelId: "UCVwale2XH1_In8HAlZIEfOA",
      titleKey: "Rodos Palladium Beach Live",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Kathmandu", Bagmati Province
    id: "kathmandu",
    name: { ja: "カトマンズ", en: "Kathmandu, Nepal" },
    lat: 27.7017,
    lng: 85.3206,
    timeZone: "Asia/Kathmandu",
    category: "city",
    country: "NP",
    source: {
      videoId: "6WWbTU6v3r0",
      channelId: "UCp8FhsgzNmYR6F1HxTDMTvw",
      titleKey: "KATHMANDU LIVE CAM 🇳🇵 | NEPAL&#39;S CAPITAL CITY LIVE | WEBCAM NEPAL",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Lete", Gandaki Pradesh
    id: "annapurna-lete",
    name: { ja: "アンナプルナ（レテ村）", en: "Annapurna, Lete" },
    lat: 28.635,
    lng: 83.6052,
    timeZone: "Asia/Kathmandu",
    category: "nature",
    country: "NP",
    source: {
      videoId: "HxUjr2fGO-M",
      channelId: "UCbv8BrmNooNIUu9QDmOp7Qw",
      titleKey: "WEBCAM NEPAL LIVE - STREAMING FROM KALOPANI GUEST HOUSE – LETE, MUSTANG, NEPAL",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Denpasar", Bali
    id: "bali",
    name: { ja: "バリ島", en: "Bali, Indonesia" },
    lat: -8.65,
    lng: 115.2167,
    timeZone: "Asia/Makassar",
    category: "nature",
    country: "ID",
    source: {
      videoId: "L1duJDAqbJY",
      channelId: "UCjc3XanPPTV1Ar1ec6ElXTg",
      titleKey: "Bali Weather Today Live Webcam | Bali Weather Now with Temperature and Humidity | Bali Weather Live",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Arvidsjaur", Norrbotten County
    id: "arvidsjaur",
    name: { ja: "アルヴィッツヤウル（スウェーデン）", en: "Arvidsjaur, Sweden" },
    lat: 65.5903,
    lng: 19.1668,
    timeZone: "Europe/Stockholm",
    category: "nature",
    country: "SE",
    source: {
      videoId: "Dnw_l8f9rUc",
      channelId: "UCo9Ppp8AjdfXqocqcNI_krA",
      titleKey: "Live Camera Arvidsjaur",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Rovaniemi", Lapland
    id: "rovaniemi-santa",
    name: { ja: "ロヴァニエミ サンタクロース村", en: "Santa Claus Village, Rovaniemi" },
    lat: 66.499,
    lng: 25.6887,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "Cp4RRAEgpeU",
      channelId: "UCuarPSgSklrmX2z0iA-Ua4Q",
      titleKey: "Live @ Santa Claus Village",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Groningen", Groningen
    id: "groningen",
    name: { ja: "フローニンゲン 大広場", en: "Grote Markt, Groningen" },
    lat: 53.2192,
    lng: 6.5667,
    timeZone: "Europe/Amsterdam",
    category: "city",
    country: "NL",
    source: {
      videoId: "ZjfFGJlkjmE",
      channelId: "UCoGAnM2Ek-KVDEQiyuN_XGg",
      titleKey: "Webcam Grote Markt - Groningen",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Málaga", Andalusia
    id: "malaga-airport",
    name: { ja: "マラガ空港", en: "Málaga Airport" },
    lat: 36.7202,
    lng: -4.4203,
    timeZone: "Europe/Madrid",
    category: "airport",
    country: "ES",
    source: {
      videoId: "A6R81wOlQqs",
      channelId: "UCKCw1qKElfcxE6A1KefdG5A",
      titleKey: "🔵 LIVE from Malaga Airport (AGP/LEMG) - Costa del Sol - Andalucía - Spain - 24/7",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Alghero", Sardinia
    id: "alghero-beach",
    name: { ja: "アルゲーロ（サルデーニャ島）", en: "Alghero, Sardinia" },
    lat: 40.5597,
    lng: 8.3195,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "kGO2F0KogFQ",
      channelId: "UC04KebJjRJz9Fo5-SF9VfeA",
      titleKey: "🔴Maia Pia Beach - Sardinia, Italy - Live Cam",
    },
  },
  {
    // 座標: Open-Meteo ジオコーディング "Victoria", British Columbia
    id: "victoria-bc",
    name: { ja: "ヴィクトリア（カナダ BC州）", en: "Victoria, British Columbia" },
    lat: 48.4359,
    lng: -123.3516,
    timeZone: "America/Vancouver",
    category: "harbor",
    country: "CA",
    source: {
      videoId: "sLixr8cThJo",
      channelId: "UCcoQfizLr4MYgiAkkYnQobA",
      titleKey: "Ross Bay, Victoria BC",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ar-argentina-coast",
    name: { ja: "Argentina Coast", en: "Argentina Coast" },
    lat: -37.3389,
    lng: -57.0391,
    timeZone: "America/Argentina/Buenos_Aires",
    category: "nature",
    country: "AR",
    source: {
      videoId: "2u4GnVNtlsY",
      channelId: "UCsXOwro8CHI2FWotcTw1U2w",
      titleKey: "ARGENTINA LIVE 24/7 🌊 Villa Gesell, Pinamar, Comodoro & Patagonia 🇦🇷",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "at-weissenbach-am-lech-austria",
    name: { ja: "Weissenbach am Lech, Austria", en: "Weissenbach am Lech, Austria" },
    lat: 47.4445,
    lng: 10.6431,
    timeZone: "Europe/Vienna",
    category: "city",
    country: "AT",
    source: {
      videoId: "gs8BrBIZylM",
      channelId: "UCyDSUNQDiniFgdKN3WaMc-Q",
      titleKey: "4",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-bass-coast-shire-australia",
    name: { ja: "Bass Coast Shire, Australia", en: "Bass Coast Shire, Australia" },
    lat: -38.4557,
    lng: 145.2388,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "yTxngt2eVDM",
      channelId: "UCCKSu4XoRcJ6vPF7CLsPJdw",
      titleKey: "930",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-victoria-australia",
    name: { ja: "Victoria, Australia", en: "Victoria, Australia" },
    lat: -37.1467,
    lng: 146.445,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "0OtVlfDj2w8",
      channelId: "UCWOITAxCnS0V8h7lNJkHpdQ",
      titleKey: "Bourke Street Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-victoria-australia-2",
    name: { ja: "Victoria, Australia", en: "Victoria, Australia" },
    lat: -37.9226,
    lng: 144.665,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "gTz_7tKUfYM",
      channelId: "UCS9UBqaUtoIXUhX0J1BnxwQ",
      titleKey: "1.2K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-victoria-australia-3",
    name: { ja: "Victoria, Australia", en: "Victoria, Australia" },
    lat: -38.4062,
    lng: 144.1687,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "DbLMSFvB2Og",
      channelId: "UCNbMdQzK0V0VGhAaBhsamMw",
      titleKey: "Live Web Cam Anglesea Golf Club",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-ben-lomond-alpine-resort-tasmania-aus",
    name: { ja: "Ben Lomond Alpine Resort — Tasmania, Australia", en: "Ben Lomond Alpine Resort — Tasmania, Australia" },
    lat: -41.546,
    lng: 147.658,
    timeZone: "Australia/Hobart",
    category: "nature",
    country: "AU",
    source: {
      videoId: "dK8GOSSifVc",
      channelId: "UCSCVKjWKamBEIgaHAcFcMYg",
      titleKey: "Summit / Front Valley",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "aw-eagle-beach-costa-linda-beach-resort",
    name: { ja: "Eagle Beach | Costa Linda Beach Resort | Aruba | LIVE Cam", en: "Eagle Beach | Costa Linda Beach Resort | Aruba | LIVE Cam" },
    lat: 12.5493,
    lng: -70.056,
    timeZone: "America/Aruba",
    category: "nature",
    country: "AW",
    source: {
      videoId: "_ZXMjk5K0_s",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🌴 Eagle Beach | Costa Linda Beach Resort | Aruba | LIVE Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "be-blankenberge-beach",
    name: { ja: "Blankenberge Beach", en: "Blankenberge Beach" },
    lat: 51.3131,
    lng: 3.1323,
    timeZone: "Europe/Brussels",
    category: "nature",
    country: "BE",
    source: {
      videoId: "-3SMlcFv7II",
      channelId: "UCdDu10MbdlkTZh6gJHw3kWg",
      titleKey: "279",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "bl-col-de-la-tourmente-saint-barth-sceni",
    name: { ja: "Col de la Tourmente Saint Barth Scenic View", en: "Col de la Tourmente Saint Barth Scenic View" },
    lat: 17.903,
    lng: -62.845,
    timeZone: "America/St_Barthelemy",
    category: "city",
    country: "BL",
    source: {
      videoId: "15pVqwQb7A0",
      channelId: "UC4nkl9OncDSVGZS9qdcRLxA",
      titleKey: "Live Webcam - SBH Col de la Tourmente",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "bq-sorobon-luxury-beach-resort-dunkerbec",
    name: { ja: "Sorobon Luxury Beach Resort | Dunkerbeck Pro Center | Bonaire | LIVE Cam", en: "Sorobon Luxury Beach Resort | Dunkerbeck Pro Center | Bonaire | LIVE Cam" },
    lat: 12.0919,
    lng: -68.2356,
    timeZone: "America/Kralendijk",
    category: "city",
    country: "BQ",
    source: {
      videoId: "EcumU_n6fTY",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🏄 Sorobon Luxury Beach Resort | Dunkerbeck Pro Center | Bonaire | LIVE Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sao-paulo-brazil",
    name: { ja: "São Paulo, Brazil", en: "São Paulo, Brazil" },
    lat: -22.8476,
    lng: -45.2311,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "X52LJG2z_UQ",
      channelId: "UCuSeVCzI21lPeKnIzZehFPQ",
      titleKey: "126",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-central-beach-braz",
    name: { ja: "Balneario Camboriu Central Beach, Brazil", en: "Balneario Camboriu Central Beach, Brazil" },
    lat: -26.9905,
    lng: -48.6328,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "7x-BbgRekC0",
      channelId: "UCi1vQx48j_nfrMg6XH5PItQ",
      titleKey: "Balneário Camboriú ao vivo - Central",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-rincao-beach-brazil",
    name: { ja: "Balneario Rincao Beach, Brazil", en: "Balneario Rincao Beach, Brazil" },
    lat: -28.831,
    lng: -49.236,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "mWsPnnbHKE0",
      channelId: "UCkeTESRiAY8OcsgvNTKQU0Q",
      titleKey: "Balneário Rincão | Câmera Ao Vivo - Monitoramento Vejaomar 24horas por dia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-cabo-frio-beach-cameras-brazil",
    name: { ja: "Cabo Frio Beach Cameras, Brazil", en: "Cabo Frio Beach Cameras, Brazil" },
    lat: -22.8807,
    lng: -42.0161,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "HsfII35xV4g",
      channelId: "UC37R9R29MAwvrOBafYoBtow",
      titleKey: "CABO FRIO AO VIVO AGORA | CÂMERAS",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-copacabana-beach-panorama-rio-de-jane",
    name: { ja: "Copacabana Beach Panorama — Rio de Janeiro, Brazil", en: "Copacabana Beach Panorama — Rio de Janeiro, Brazil" },
    lat: -22.968,
    lng: -43.175,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "MKptOzPxVV8",
      channelId: "UC2WMV4vCYurHdHPd9pCqYSg",
      titleKey: "562",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-encontro-das-aguas-brazil",
    name: { ja: "Encontro das Aguas, Brazil", en: "Encontro das Aguas, Brazil" },
    lat: -3.2002,
    lng: -59.4989,
    timeZone: "America/Manaus",
    category: "nature",
    country: "BR",
    source: {
      videoId: "XQR__cmu6As",
      channelId: "UCH9JbKmqTI6gwhA4ghl32FQ",
      titleKey: "Encontro das Águas - Manaus, Amazonas",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-florianopolis-canto-da-lagoa-brazil",
    name: { ja: "Florianopolis Canto da Lagoa, Brazil", en: "Florianopolis Canto da Lagoa, Brazil" },
    lat: -27.622,
    lng: -48.462,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "1ffJojfUyRA",
      channelId: "UCfzoppnA7KWE2C1cUUdOyxA",
      titleKey: "LAGOA DA CONCEIÇÃO AO VIVO | CANTO DA LAGOA EM TEMPO REAL – FLORIPA SC  INDAIÁ EVENTOS | CONEXÃODCTV",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-florianopolis-lagoa-da-conceicao-mira",
    name: { ja: "Florianopolis Lagoa da Conceicao Mirante, Brazil", en: "Florianopolis Lagoa da Conceicao Mirante, Brazil" },
    lat: -27.599,
    lng: -48.467,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "egXyN_SwY-E",
      channelId: "UCfzoppnA7KWE2C1cUUdOyxA",
      titleKey: "LAGOA DA CONCEIÇÃO AO VIVO | MIRANTE COM VISTA PANORÂMICA – FLORIPA SC  INDAIÁ EVENTOS | CONEXÃODCTV",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-guaruja-pitangueiras-beach-brazil",
    name: { ja: "Guaruja Pitangueiras Beach, Brazil", en: "Guaruja Pitangueiras Beach, Brazil" },
    lat: -23.998,
    lng: -46.256,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "geAj9DGl-Pw",
      channelId: "UC8YAup2viRbegzrqjAyEXYA",
      titleKey: "WebCam Guarujá ao vivo, Praia das Pitangueiras NATUREZA LINDA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-ilha-porchat",
    name: { ja: "Ilha Porchat", en: "Ilha Porchat" },
    lat: -23.5475,
    lng: -46.6361,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "RT4JhqVP8AY",
      channelId: "UCHhtdcqzwyPYY0qBlEPh0QQ",
      titleKey: "SANTOS  AO VIVO: Gonzaga Canal 2 Santos Agora | Câmera na Orla  – Olhar 013",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-itajai-port-waterfront-brazil",
    name: { ja: "Itajai Port Waterfront, Brazil", en: "Itajai Port Waterfront, Brazil" },
    lat: -26.9101,
    lng: -48.6567,
    timeZone: "America/Sao_Paulo",
    category: "harbor",
    country: "BR",
    source: {
      videoId: "ADOsuLQ_6iM",
      channelId: "UC37R9R29MAwvrOBafYoBtow",
      titleKey: "ITAJAÍ SC AO VIVO | PORTO DE ITAJAÍ – 2K – FASTSIGNAL | CONEXÃODCTV",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-marginal-pinheiros-sao-paulo-brazil",
    name: { ja: "Marginal Pinheiros — São Paulo, Brazil", en: "Marginal Pinheiros — São Paulo, Brazil" },
    lat: -23.5912,
    lng: -46.6897,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "GA4YMcRmHM0",
      channelId: "UCyLO6s35yhqrcRZW24MRCOA",
      titleKey: "20",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-ocian-praia-grande-beach-cameras-24h",
    name: { ja: "Ocian Praia Grande Beach Cameras 24H, Brazil", en: "Ocian Praia Grande Beach Cameras 24H, Brazil" },
    lat: -24.0167,
    lng: -46.467,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "owJHKExR8QM",
      channelId: "UC4roE4SbVIvcQGCYXlnijGQ",
      titleKey: "AO VIVO 24H OCIAN PRAIA GRANDE CÂMERAS",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-pereque-acu-brazil",
    name: { ja: "Pereque Acu, Brazil", en: "Pereque Acu, Brazil" },
    lat: -23.425,
    lng: -45.06,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "5mV2qwFTdzA",
      channelId: "UCVQG1pBkRM4xlRrBmV65kUw",
      titleKey: "PEREQUÊ AÇU - MEIO - UBATUBA - AO VIVO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-porto-belo-beach-waterfront-brazil",
    name: { ja: "Porto Belo Beach Waterfront, Brazil", en: "Porto Belo Beach Waterfront, Brazil" },
    lat: -27.158,
    lng: -48.553,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "TF-47MpIutI",
      channelId: "UC_eLi_VMuUz2lJElqj_H8zw",
      titleKey: "AO VIVO | PRAIA DE PORTO BELO SC | VISTA DO MAR EM TEMPO REAL | CONEXÃODCTV",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-porto-ao-vivo-brazil",
    name: { ja: "Porto ao Vivo, Brazil", en: "Porto ao Vivo, Brazil" },
    lat: -23.992,
    lng: -46.306,
    timeZone: "America/Sao_Paulo",
    category: "harbor",
    country: "BR",
    source: {
      videoId: "tMYtrEBNVAU",
      channelId: "UC-5CVLXN0tBhGsqv-DMcHuw",
      titleKey: "Porto ao Vivo - Entrada no Canal do Porto de Santos",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praia-grande-brazil",
    name: { ja: "Praia Grande, Brazil", en: "Praia Grande, Brazil" },
    lat: -23.467,
    lng: -45.067,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "v9OxAv7z-gQ",
      channelId: "UCVQG1pBkRM4xlRrBmV65kUw",
      titleKey: "PRAIA GRANDE - BAGUARI - UBATUBA - AO VIVO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praia-grande-tupi-24h-brazil",
    name: { ja: "Praia Grande Tupi 24H, Brazil", en: "Praia Grande Tupi 24H, Brazil" },
    lat: -24.026,
    lng: -46.491,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "66r3gqV15EI",
      channelId: "UC4roE4SbVIvcQGCYXlnijGQ",
      titleKey: "CÃMERA  24H TUPI AO VIVO PRAIA GRANDE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-rio-de-janeiro-brazil",
    name: { ja: "Rio de Janeiro, Brazil", en: "Rio de Janeiro, Brazil" },
    lat: -22.967,
    lng: -43.1836,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "WzpkxorAoO4",
      channelId: "UChWGYkK0I8U83C0FxAxWy4w",
      titleKey: "Rio de Janeiro Cam - Copacabana Posto 3",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-santos-port-panoramic-4k-brazil",
    name: { ja: "Santos Port Panoramic 4K, Brazil", en: "Santos Port Panoramic 4K, Brazil" },
    lat: -23.951,
    lng: -46.312,
    timeZone: "America/Sao_Paulo",
    category: "harbor",
    country: "BR",
    source: {
      videoId: "AX74XKJZdJM",
      channelId: "UC-5CVLXN0tBhGsqv-DMcHuw",
      titleKey: "Porto ao Vivo - Vista Panorâmica (4K)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-santos-surf-conditions-beach-brazil",
    name: { ja: "Santos Surf Conditions Beach, Brazil", en: "Santos Surf Conditions Beach, Brazil" },
    lat: -23.971,
    lng: -46.333,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "jychMSrX9w0",
      channelId: "UC8YAup2viRbegzrqjAyEXYA",
      titleKey: "WebCam Santos ao vivo, veja as ondas e condições de surfe em Santos.",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-tenorio-canto-direito-ubatuba-brazil",
    name: { ja: "Tenorio Canto Direito Ubatuba, Brazil", en: "Tenorio Canto Direito Ubatuba, Brazil" },
    lat: -23.456,
    lng: -45.069,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "0W4wB6QChUA",
      channelId: "UCVQG1pBkRM4xlRrBmV65kUw",
      titleKey: "TENÓRIO - CANTO DIREITO - UBATUBA - AO VIVO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "bz-ambergris-cay-beach",
    name: { ja: "Ambergris Cay Beach", en: "Ambergris Cay Beach" },
    lat: 17.92,
    lng: -87.97,
    timeZone: "America/Belize",
    category: "nature",
    country: "BZ",
    source: {
      videoId: "02I8oggFCOQ",
      channelId: "UC8d4tBNyoiHW5pAnaPwr36Q",
      titleKey: "364",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-banff-canada",
    name: { ja: "Banff, Canada", en: "Banff, Canada" },
    lat: 51.1762,
    lng: -115.5698,
    timeZone: "America/Edmonton",
    category: "city",
    country: "CA",
    source: {
      videoId: "m1F2ggd0hxA",
      channelId: "UC0muoxLiFjQJVPF36pxf-1A",
      titleKey: "Rock Isle Lake Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-banff-sunshine-village-canada",
    name: { ja: "Banff Sunshine Village, Canada", en: "Banff Sunshine Village, Canada" },
    lat: 51.0958,
    lng: -115.7722,
    timeZone: "America/Edmonton",
    category: "city",
    country: "CA",
    source: {
      videoId: "OJzDoKXXoGw",
      channelId: "UC0muoxLiFjQJVPF36pxf-1A",
      titleKey: "Goat’s Eye Base",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-kelowna-canada",
    name: { ja: "Kelowna, Canada", en: "Kelowna, Canada" },
    lat: 49.6014,
    lng: -119.6822,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "zkTaY9OQM2A",
      channelId: "UCjqDAH8vlPbt-J3DlLpJKuw",
      titleKey: "444",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-canmore-canada",
    name: { ja: "Canmore, Canada", en: "Canmore, Canada" },
    lat: 51.0834,
    lng: -115.3521,
    timeZone: "America/Edmonton",
    category: "city",
    country: "CA",
    source: {
      videoId: "-Fe7o0j58_s",
      channelId: "UCSB3xOs0FgIW0uqKTqoXqhg",
      titleKey: "311",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-downtown-canada",
    name: { ja: "Downtown, Canada", en: "Downtown, Canada" },
    lat: 53.92,
    lng: -122.75,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "fDpNeUvss30",
      channelId: "UCL8OSG6rGN8QrXlZx6vH-3g",
      titleKey: "Downtown Livestream - North",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-ha-ling-peak-view-canmore-canada",
    name: { ja: "Ha Ling Peak View — Canmore, Canada", en: "Ha Ling Peak View — Canmore, Canada" },
    lat: 51.088,
    lng: -115.348,
    timeZone: "America/Edmonton",
    category: "nature",
    country: "CA",
    source: {
      videoId: "RdRmXqnBZ-c",
      channelId: "UCSB3xOs0FgIW0uqKTqoXqhg",
      titleKey: "594",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-peggys-cove-lighthouse",
    name: { ja: "Peggys Cove Lighthouse", en: "Peggys Cove Lighthouse" },
    lat: 44.4929,
    lng: -63.9161,
    timeZone: "America/Halifax",
    category: "nature",
    country: "CA",
    source: {
      videoId: "SFoS6nBL138",
      channelId: "UCsghjvIsGFKH2cAjbRt7g6w",
      titleKey: "465",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-port-de-quebec",
    name: { ja: "Port de Québec", en: "Port de Québec" },
    lat: 46.8137,
    lng: -71.2084,
    timeZone: "America/Toronto",
    category: "harbor",
    country: "CA",
    source: {
      videoId: "I-7mv4-BJ7M",
      channelId: "UCZdjU2sWPeLjmh75zOxekUg",
      titleKey: "Port de Québec",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-royal-victoria-yacht-club-at-cadboro",
    name: { ja: "Royal Victoria Yacht Club at Cadboro Bay, Canada", en: "Royal Victoria Yacht Club at Cadboro Bay, Canada" },
    lat: 48.4514,
    lng: -123.2966,
    timeZone: "America/Vancouver",
    category: "nature",
    country: "CA",
    source: {
      videoId: "MaYMrtIXxvA",
      channelId: "UClL8n9u9ohdAfvPOmLL0U2g",
      titleKey: "140",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-tofino-canada",
    name: { ja: "Tofino, Canada", en: "Tofino, Canada" },
    lat: 49.1531,
    lng: -125.9074,
    timeZone: "America/Vancouver",
    category: "nature",
    country: "CA",
    source: {
      videoId: "ABI1FZmrwbQ",
      channelId: "UCW1DIPA5POQZ1Jh1x_vl_uQ",
      titleKey: "Wickaninnish Inn Live Stream [With Audio]",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-tsehum-harbour-in-sidney-canada",
    name: { ja: "Tsehum Harbour in Sidney, Canada", en: "Tsehum Harbour in Sidney, Canada" },
    lat: 48.6828,
    lng: -123.4185,
    timeZone: "America/Vancouver",
    category: "harbor",
    country: "CA",
    source: {
      videoId: "aUFnuTqMEcY",
      channelId: "UClL8n9u9ohdAfvPOmLL0U2g",
      titleKey: "38",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-vancouver-cruise-ships-skyline-h",
    name: { ja: "LIVE: Vancouver | Cruise Ships | Skyline | Harbour | 24/7", en: "LIVE: Vancouver | Cruise Ships | Skyline | Harbour | 24/7" },
    lat: 60.1087,
    lng: -113.6426,
    timeZone: "America/Edmonton",
    category: "harbor",
    country: "CA",
    source: {
      videoId: "GHEmhcWjiTE",
      channelId: "UCNOXlPIEg4nNvCqlInpKcXw",
      titleKey: "LIVE: Vancouver | Cruise Ships | Skyline | Harbour | 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-pier-camera",
    name: { ja: "Pier Camera", en: "Pier Camera" },
    lat: 60.1087,
    lng: -113.6426,
    timeZone: "America/Edmonton",
    category: "city",
    country: "CA",
    source: {
      videoId: "4MK3E9EWDSY",
      channelId: "UCTsHQhUTf0eE096IyjiVIwg",
      titleKey: "Pier Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cn",
    name: { ja: "南坑街道", en: "南坑街道" },
    lat: 24.519,
    lng: 117.6538,
    timeZone: "Asia/Shanghai",
    category: "city",
    country: "CN",
    source: {
      videoId: "_61oLL-8Gt0",
      channelId: "UCxFMuvI5BKx00zH8IxpaQ2g",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-handelskade-curacao-world-heritage-li",
    name: { ja: "Handelskade - Curacao World Heritage | LIVE Cam", en: "Handelskade - Curacao World Heritage | LIVE Cam" },
    lat: 12.1071,
    lng: -68.9364,
    timeZone: "America/Curacao",
    category: "harbor",
    country: "CW",
    source: {
      videoId: "28U-t3fA9ks",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🚢 Handelskade - Curacao World Heritage | LIVE Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-klein-curacao-mermaid-boat-trips",
    name: { ja: "Klein Curacao Mermaid Boat Trips", en: "Klein Curacao Mermaid Boat Trips" },
    lat: 11.989,
    lng: -68.643,
    timeZone: "America/Curacao",
    category: "nature",
    country: "CW",
    source: {
      videoId: "0ImA9IcyQwA",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "2.6K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cz-zlin-peace-square-czechia",
    name: { ja: "Zlin, Peace Square, Czechia", en: "Zlin, Peace Square, Czechia" },
    lat: 49.2266,
    lng: 17.6677,
    timeZone: "Europe/Prague",
    category: "city",
    country: "CZ",
    source: {
      videoId: "CSAcxQA2shE",
      channelId: "UC4XHkeozVrKRdkz319EzYDQ",
      titleKey: "364",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-blick-auf-den-marktplatz-rathaus-rola",
    name: { ja: "Blick auf den Marktplatz, Rathaus, Roland und die Liebfrauenkirche", en: "Blick auf den Marktplatz, Rathaus, Roland und die Liebfrauenkirche" },
    lat: 53.0749,
    lng: 8.8072,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "SsyiWrkUjy4",
      channelId: "UCwoFc3WD54Kz67h99GauhUA",
      titleKey: "Blick auf den Marktplatz, Rathaus, Roland und die Liebfrauenkirche",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-trimburg-medieval-castle-ruins",
    name: { ja: "Trimburg Medieval Castle Ruins", en: "Trimburg Medieval Castle Ruins" },
    lat: 50.1474,
    lng: 9.9615,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "M1TS9GEIGoI",
      channelId: "UCZVM1ShZYDLxnCkjEHmmHPQ",
      titleKey: "Saaletal - Panorama",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ec-sangay-volcano-4k-morona-santiago-ecu",
    name: { ja: "Sangay Volcano 4K — Morona Santiago, Ecuador", en: "Sangay Volcano 4K — Morona Santiago, Ecuador" },
    lat: -2.0053,
    lng: -78.3412,
    timeZone: "America/Guayaquil",
    category: "city",
    country: "EC",
    source: {
      videoId: "vK3RouzZoT4",
      channelId: "UCaG0IHN1RMOZ4-U3wDXAkwA",
      titleKey: "🔴 Live Now: 24/7 Amazon Rainforest and Sangay Volcano, Ecuador in 4K Ultra HD",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-l-ametlla-de-mar-platja-de-l-alguer-e",
    name: { ja: "L'Ametlla de Mar - Platja de l'Alguer en directe", en: "L'Ametlla de Mar - Platja de l'Alguer en directe" },
    lat: 40,
    lng: -4,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "W9DP0Je5rKU",
      channelId: "UC8SjIk6omRC3aFN4yb51ulw",
      titleKey: "L'Ametlla de Mar - Platja de l'Alguer en directe",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-barcelona-harbor-spain",
    name: { ja: "Barcelona Harbor, Spain", en: "Barcelona Harbor, Spain" },
    lat: 41.3826,
    lng: 2.1771,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "C7659Fbj3nw",
      channelId: "UC6G-n9iN-lXSOSVmYwC52dQ",
      titleKey: "Barcelona Harbor Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-live-mallorca-webcam-santa-ponsa-tram",
    name: { ja: "LIVE Mallorca Webcam Santa Ponsa & Tramuntana | 24/7 4K #urlaub #santaponsa #beach", en: "LIVE Mallorca Webcam Santa Ponsa & Tramuntana | 24/7 4K #urlaub #santaponsa #beach" },
    lat: 39.5383,
    lng: 2.4239,
    timeZone: "Europe/Madrid",
    category: "city",
    country: "ES",
    source: {
      videoId: "pQil5Xc372E",
      channelId: "UCe5o5VIs9avmljPs_pJCHtQ",
      titleKey: "🌞 LIVE Mallorca Webcam Santa Ponsa & Tramuntana | 24/7 4K #urlaub #santaponsa #beach",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-live-webcam-from-puerto-del-carmen-be",
    name: { ja: "LIVE WEBCAM from PUERTO del CARMEN BEACH - (Lanzarote, Canary Islands, Spain)", en: "LIVE WEBCAM from PUERTO del CARMEN BEACH - (Lanzarote, Canary Islands, Spain)" },
    lat: 29.0397,
    lng: -13.6363,
    timeZone: "Atlantic/Canary",
    category: "nature",
    country: "ES",
    source: {
      videoId: "AfD16cDYBbE",
      channelId: "UCUaLy1_4rsLo4HyCLCPlD4g",
      titleKey: "LIVE 🔴 WEBCAM from PUERTO del CARMEN BEACH - (Lanzarote, Canary Islands, Spain)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-the-seafront-of-salinas",
    name: { ja: "The Seafront of Salinas", en: "The Seafront of Salinas" },
    lat: 40,
    lng: -4,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "doNsXrJHErU",
      channelId: "UCNfSLmqoe1-kVs0aIsw13fg",
      titleKey: "Webcam Nautico Salinas Este",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-webcam-playa-de-altea",
    name: { ja: "Webcam Playa de Altea", en: "Webcam Playa de Altea" },
    lat: 38.6011,
    lng: -0.0458,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "hvsK8Fvz4rE",
      channelId: "UCwetXl0vCT9g233gloq-KRg",
      titleKey: "Webcam Playa de Altea",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-kuopio-market-square",
    name: { ja: "Kuopio Market Square", en: "Kuopio Market Square" },
    lat: 64,
    lng: 26,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "T7RdJdFMz-U",
      channelId: "UCkcMmGXHJUE9ftObAfBSoYA",
      titleKey: "3.8K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-patoniva-river-oulanka-national-park",
    name: { ja: "Patoniva River, Oulanka National Park", en: "Patoniva River, Oulanka National Park" },
    lat: 66.4,
    lng: 29.2,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "L7F3XGPA6vo",
      channelId: "UCxKw0Dmg6u8z00vbEFgjk0Q",
      titleKey: "Oulanka Live Webcam Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-yyteri-beach-pori",
    name: { ja: "Yyteri Beach, Pori", en: "Yyteri Beach, Pori" },
    lat: 61.4807,
    lng: 21.7852,
    timeZone: "Europe/Helsinki",
    category: "nature",
    country: "FI",
    source: {
      videoId: "n8i3AnhnPXc",
      channelId: "UC9UE5PYgoWAgDvIvTkD6dAg",
      titleKey: "335",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-gambetta-square-france",
    name: { ja: "Gambetta Square, France", en: "Gambetta Square, France" },
    lat: 49.8932,
    lng: 2.2976,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "4i7ioN8wS20",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Amiens - Gambetta",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-la-plagne-2184-m",
    name: { ja: "La Plagne 2184 m", en: "La Plagne 2184 m" },
    lat: 46,
    lng: 2,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "8aT69PVOFWY",
      channelId: "UCN3Qc70Zz7DADShUTPD6xiw",
      titleKey: "103",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-port-departemental",
    name: { ja: "Port Départemental", en: "Port Départemental" },
    lat: 43.7039,
    lng: 7.3109,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "RRrizxBud1A",
      channelId: "UCJCo3dzOelqDHCOkqesYagQ",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-port-mer-beach-cancale",
    name: { ja: "Port Mer Beach, Cancale", en: "Port Mer Beach, Cancale" },
    lat: 48.6766,
    lng: -1.8522,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "y1P2kxRTN3I",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "130",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-en-direct-du-port-de-vannes",
    name: { ja: "Webcam en direct du port de Vannes", en: "Webcam en direct du port de Vannes" },
    lat: 47.6569,
    lng: -2.762,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "dXckWr5B8f8",
      channelId: "UC8IidebYzkRnNWdw33fEvWg",
      titleKey: "Webcam en direct du port de Vannes",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-saint-malo-le-port-la-route-du",
    name: { ja: "Webcam Saint-Malo - Le Port - La Route du Rhum Live", en: "Webcam Saint-Malo - Le Port - La Route du Rhum Live" },
    lat: 48.6474,
    lng: -2.0088,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "p6nAlz4_bdI",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Saint-Malo - Le Port - La Route du Rhum Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-ehukai-beach-surf-highlights",
    name: { ja: "Ehukai Beach Surf Highlights", en: "Ehukai Beach Surf Highlights" },
    lat: 54.7,
    lng: -3.28,
    timeZone: "Europe/London",
    category: "city",
    country: "GB",
    source: {
      videoId: "xHeLgPzOyfk",
      channelId: "UC0ee_JvBGjn1Coyej0K-rfQ",
      titleKey: "57",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-linlithgow-union-canal-uk",
    name: { ja: "Linlithgow Union Canal, UK", en: "Linlithgow Union Canal, UK" },
    lat: 55.9764,
    lng: -3.6036,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "bNHCJhP6WCs",
      channelId: "UCfWp_3vSHtwPOqNYTmQp8Ow",
      titleKey: "979",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-machynlleth-uk",
    name: { ja: "Machynlleth, UK", en: "Machynlleth, UK" },
    lat: 52.5896,
    lng: -3.8531,
    timeZone: "Europe/London",
    category: "city",
    country: "GB",
    source: {
      videoId: "GMJzMSOk-V0",
      channelId: "UCk70QelhKG9mVuj7jN4I5Cg",
      titleKey: "🏴󠁧󠁢󠁷󠁬󠁳󠁿 DYFI OSPREY PROJECT 2026: Live Streaming in 4K 🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-new-quay-uk",
    name: { ja: "New Quay, UK", en: "New Quay, UK" },
    lat: 52.2152,
    lng: -4.3589,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "QX15Hwa2chY",
      channelId: "UCiOnG14iUHThkDOrM2d4fEQ",
      titleKey: "23",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-newport-uk",
    name: { ja: "Newport, UK", en: "Newport, UK" },
    lat: 51.5877,
    lng: -2.9983,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "Nw-3ukCSobw",
      channelId: "UCXN7rPhZK6Rp8lMhvpSri_Q",
      titleKey: "Oregon Coast Aquarium",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-saundersfoot-uk",
    name: { ja: "Saundersfoot, UK", en: "Saundersfoot, UK" },
    lat: 51.7094,
    lng: -4.7021,
    timeZone: "Europe/London",
    category: "city",
    country: "GB",
    source: {
      videoId: "W-ouHLSr3fc",
      channelId: "UCX1UA8V125i7_z9ZJS_UdEA",
      titleKey: "149",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gr-gulf-of-ixia",
    name: { ja: "Gulf of Ixia", en: "Gulf of Ixia" },
    lat: 36.4356,
    lng: 28.222,
    timeZone: "Europe/Athens",
    category: "nature",
    country: "GR",
    source: {
      videoId: "h8ZGGzCcL5g",
      channelId: "UColQKkohNGeNWYpw4d8xUBw",
      titleKey: "800",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gr-rhodes-mandraki-marina",
    name: { ja: "Rhodes Mandraki Marina", en: "Rhodes Mandraki Marina" },
    lat: 36.4356,
    lng: 28.222,
    timeZone: "Europe/Athens",
    category: "harbor",
    country: "GR",
    source: {
      videoId: "k8ZgLw6kBCA",
      channelId: "UColQKkohNGeNWYpw4d8xUBw",
      titleKey: "208",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gy-aerial-tour-of-georgetown-sc",
    name: { ja: "Aerial Tour of Georgetown, SC", en: "Aerial Tour of Georgetown, SC" },
    lat: 6.8013,
    lng: -58.1553,
    timeZone: "America/Guyana",
    category: "city",
    country: "GY",
    source: {
      videoId: "JaaOQfpqV_I",
      channelId: "UC6KOWQ10ITJN0hUcL8C-68w",
      titleKey: "17",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "id-pantai-kukup-beach-indonesia",
    name: { ja: "Pantai Kukup Beach, Indonesia", en: "Pantai Kukup Beach, Indonesia" },
    lat: -8.1331,
    lng: 110.555,
    timeZone: "Asia/Jakarta",
    category: "nature",
    country: "ID",
    source: {
      videoId: "_3fZrqefFt4",
      channelId: "UCkEiJMkX7n3rZpZ2PDVc3Ow",
      titleKey: "77",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "id-ubud-bali-outdoor-indonesia",
    name: { ja: "Ubud Bali Outdoor, Indonesia", en: "Ubud Bali Outdoor, Indonesia" },
    lat: -8.5069,
    lng: 115.2625,
    timeZone: "Asia/Makassar",
    category: "city",
    country: "ID",
    source: {
      videoId: "xuSvwBMhysw",
      channelId: "UC5I5yFBlDqZI3sZuKtRJfIg",
      titleKey: "248",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "id-live-pemantauan-cctv-pantai-wediombo",
    name: { ja: "LIVE PEMANTAUAN CCTV PANTAI WEDIOMBO", en: "LIVE PEMANTAUAN CCTV PANTAI WEDIOMBO" },
    lat: -8.1889,
    lng: 110.7104,
    timeZone: "Asia/Jakarta",
    category: "nature",
    country: "ID",
    source: {
      videoId: "gwUwOto2gJg",
      channelId: "UCkEiJMkX7n3rZpZ2PDVc3Ow",
      titleKey: "LIVE PEMANTAUAN CCTV PANTAI WEDIOMBO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ie-dublin-city-centre-ireland",
    name: { ja: "Dublin City Centre, Ireland", en: "Dublin City Centre, Ireland" },
    lat: 53.3498,
    lng: -6.2603,
    timeZone: "Europe/Dublin",
    category: "city",
    country: "IE",
    source: {
      videoId: "AdUw5RdyZxI",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam:  Times Square in 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ie-north-circular-road-dublin-ireland",
    name: { ja: "North Circular Road — Dublin, Ireland", en: "North Circular Road — Dublin, Ireland" },
    lat: 53.36,
    lng: -6.273,
    timeZone: "Europe/Dublin",
    category: "city",
    country: "IE",
    source: {
      videoId: "KpZ8vteYNOw",
      channelId: "UCXtzCdsTkuBWIrOSuMNvANQ",
      titleKey: "North Circular Road Live Webcam (Facing North West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "il-ashdod-israel",
    name: { ja: "Ashdod, Israel", en: "Ashdod, Israel" },
    lat: 31.7921,
    lng: 34.6497,
    timeZone: "Asia/Jerusalem",
    category: "nature",
    country: "IL",
    source: {
      videoId: "mSONhnPsSzE",
      channelId: "UClw5cvX6cyQqpn4FkoNO67Q",
      titleKey: "אשדוד - חוף גיל",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "il-ashdod-hakshatot-beach-israel",
    name: { ja: "Ashdod HaKshatot Beach, Israel", en: "Ashdod HaKshatot Beach, Israel" },
    lat: 31.7998,
    lng: 34.6323,
    timeZone: "Asia/Jerusalem",
    category: "nature",
    country: "IL",
    source: {
      videoId: "GYdEdmjWTBA",
      channelId: "UClw5cvX6cyQqpn4FkoNO67Q",
      titleKey: "אשדוד - חוף הקשתות",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "il-community-center-israel",
    name: { ja: "Community Center, Israel", en: "Community Center, Israel" },
    lat: 31.779,
    lng: 34.6494,
    timeZone: "Asia/Jerusalem",
    category: "city",
    country: "IL",
    source: {
      videoId: "hWwLAaO0Vyo",
      channelId: "UClw5cvX6cyQqpn4FkoNO67Q",
      titleKey: "אשדוד - חוף זבולון",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "il-jordan-river",
    name: { ja: "Jordan River", en: "Jordan River" },
    lat: 31.5,
    lng: 34.75,
    timeZone: "Asia/Jerusalem",
    category: "nature",
    country: "IL",
    source: {
      videoId: "NLTRWDL7yfM",
      channelId: "UCEuJE0FEa-cTwGdyTwL7gEA",
      titleKey: "שידור חי של Jordan River Baptism | Yardenit | Jardenit",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "is-north-reykjanes",
    name: { ja: "North Reykjanes", en: "North Reykjanes" },
    lat: 63.8385,
    lng: -22.4393,
    timeZone: "Atlantic/Reykjavik",
    category: "city",
    country: "IS",
    source: {
      videoId: "yUZTszmpAJE",
      channelId: "UCGgyr3-DI5pr5Cnnv2A8shg",
      titleKey: "Sylingarfell Norður",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "is-orbjorn-reykjanes-grindavik",
    name: { ja: "Þorbjörn Reykjanes — Grindavík", en: "Þorbjörn Reykjanes — Grindavík" },
    lat: 63.86,
    lng: -22.44,
    timeZone: "Atlantic/Reykjavik",
    category: "city",
    country: "IS",
    source: {
      videoId: "8VjPqa2go6o",
      channelId: "UCZBgDrvVtscJBMw3PsJZMcA",
      titleKey: "1.1K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-aerial-tour-of-venice-beach-ca-italy",
    name: { ja: "Aerial Tour of Venice Beach, CA, Italy", en: "Aerial Tour of Venice Beach, CA, Italy" },
    lat: 41.87,
    lng: 12.57,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "ummT6MWaAwI",
      channelId: "UCvAacWraGUulzcAyr-OlFLQ",
      titleKey: "372",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-lake-maggiore",
    name: { ja: "Lake Maggiore", en: "Lake Maggiore" },
    lat: 45.8816,
    lng: 8.5383,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "xcdlLzB6oys",
      channelId: "UCRSifKbl6mvqYI8EsR1GqVQ",
      titleKey: "39",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-st-peter-s-square-italy",
    name: { ja: "St. Peter’s Square, Italy", en: "St. Peter’s Square, Italy" },
    lat: 41.9023,
    lng: 12.4574,
    timeZone: "Europe/Vatican",
    category: "city",
    country: "IT",
    source: {
      videoId: "8ZHkzW1TeZ8",
      channelId: "UC4ndSG692MXx_zZlIKMYsdg",
      titleKey: "9.6K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jm-ocho-rios",
    name: { ja: "Ocho Rios", en: "Ocho Rios" },
    lat: 18.4081,
    lng: -77.1011,
    timeZone: "America/Jamaica",
    category: "city",
    country: "JM",
    source: {
      videoId: "4X9dtsZmSw8",
      channelId: "UCfS5_X4LiZJV5vq6z7itypA",
      titleKey: "🟢 Ocho Rios Live Camera 24/7, St Ann Jamaica, Town Centre View",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jm-rick-s-cafe-negril-jamaica-live-cam",
    name: { ja: "Rick's Cafe - Negril, Jamaica - Live Cam", en: "Rick's Cafe - Negril, Jamaica - Live Cam" },
    lat: 18.2543,
    lng: -78.3669,
    timeZone: "America/Jamaica",
    category: "city",
    country: "JM",
    source: {
      videoId: "LKymCnp4qf0",
      channelId: "UCWrV5sJgwc82daX_umUlV1A",
      titleKey: "🔴 Rick's Cafe - Negril, Jamaica - Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-akashi-kaikyo-bridge-japan",
    name: { ja: "Akashi Kaikyo Bridge, Japan", en: "Akashi Kaikyo Bridge, Japan" },
    lat: 34.6913,
    lng: 135.183,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "W5iKrSNyJhQ",
      channelId: "UCZHJanz8FfXZ0yWrN2uksJw",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-akihabara-japan",
    name: { ja: "Akihabara, Japan", en: "Akihabara, Japan" },
    lat: 35.6985,
    lng: 139.7725,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "68DhvzKCVOc",
      channelId: "UChRQpufaxclkezElsQ04VXw",
      titleKey: "オノデンch【秋葉原ライブカメラ　Akihabara live camera】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp",
    name: { ja: "熊本県天草市牛深町ライブカメラ", en: "熊本県天草市牛深町ライブカメラ" },
    lat: 32.4586,
    lng: 130.193,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "HfSrh4sZf1U",
      channelId: "UCG1ApxYbWaC9xUxgHCWyR5Q",
      titleKey: "熊本県天草市牛深町ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live",
    name: { ja: "【LIVE】能登鹿島駅周辺（能登さくら駅）石川県穴水町", en: "【LIVE】能登鹿島駅周辺（能登さくら駅）石川県穴水町" },
    lat: 37.2333,
    lng: 136.9,
    timeZone: "Asia/Tokyo",
    category: "railway",
    country: "JP",
    source: {
      videoId: "THy9p2xJSek",
      channelId: "UCVFk3LGs7qDSlb9Sy8woSTw",
      titleKey: "【LIVE】能登鹿島駅周辺（能登さくら駅）石川県穴水町",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-assabu",
    name: { ja: "Assabu", en: "Assabu" },
    lat: 41.9151,
    lng: 140.2876,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "kJLL6uXWVaI",
      channelId: "UCQPFueJNZut3Bk5fiViOt2Q",
      titleKey: "72",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-chiba",
    name: { ja: "【LIVE】千葉県ライブカメラ 千葉市内の現在の様子 Chiba 지바", en: "【LIVE】千葉県ライブカメラ 千葉市内の現在の様子 Chiba 지바" },
    lat: 35.6,
    lng: 140.1167,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "vaifJWjqu0k",
      channelId: "UCaHr0a1x8zmQ1dxanCeuesA",
      titleKey: "【LIVE】千葉県ライブカメラ　千葉市内の現在の様子　Chiba 지바",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-3-enoshima-livecamera-24hoursby-hview",
    name: { ja: "【江の島ライブカメラ3】腰越海岸：Enoshima LiveCamera 24Hoursby HviewCam", en: "【江の島ライブカメラ3】腰越海岸：Enoshima LiveCamera 24Hoursby HviewCam" },
    lat: 35.3012,
    lng: 139.4812,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "ESsZ9iB7tz0",
      channelId: "UCfoiWJgMmg4p9olz1WE0-9A",
      titleKey: "【🔴江の島ライブカメラ3】🐬腰越海岸：Enoshima LiveCamera 24Hours🎥by HviewCam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-fuefuki",
    name: { ja: "Fuefuki", en: "Fuefuki" },
    lat: 35.6353,
    lng: 138.6385,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "RlU6BRXBP9c",
      channelId: "UCZ974tQkAeV7_l_opPHCcdg",
      titleKey: "578",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-fuefuki-japan",
    name: { ja: "Fuefuki, Japan", en: "Fuefuki, Japan" },
    lat: 35.6353,
    lng: 138.6385,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "_9SONpu3HFQ",
      channelId: "UCZ974tQkAeV7_l_opPHCcdg",
      titleKey: "JR 中央本線ライブカメラ② （春日居町 ⇔ 石和温泉）下り甲府、松本方面【】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-mount-fuji-live-camera-from-lake",
    name: { ja: "【LIVE】精進湖からの「富士山ライブカメラ」 \"mount fuji live camera\" from Lake Shojiko (Yamanashi Japan)", en: "【LIVE】精進湖からの「富士山ライブカメラ」 \"mount fuji live camera\" from Lake Shojiko (Yamanashi Japan)" },
    lat: 35.4893,
    lng: 138.6883,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "so_3HK9HIdg",
      channelId: "UCK9eHUAiJeNA2i_1TcgZcfw",
      titleKey: "【LIVE】精進湖からの「富士山ライブカメラ」　\"mount fuji live camera\" from Lake Shojiko (Yamanashi Japan)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-fujiyoshida-japan",
    name: { ja: "Fujiyoshida, Japan", en: "Fujiyoshida, Japan" },
    lat: 35.4403,
    lng: 138.7959,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "WJZQsbSwuAs",
      channelId: "UCnqVpkMd8g9BvbePO-ZXTVA",
      titleKey: "【LIVE】新倉山浅間公園・忠霊塔 展望デッキ ライブカメラ (Mt.Fuji Live Camera from Arakurayama Sengen Park Chureito Pagoda)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-fukui-beach",
    name: { ja: "Fukui Beach", en: "Fukui Beach" },
    lat: 36.0644,
    lng: 136.2226,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "CIjhFpsN-3k",
      channelId: "UCLbDKpDAkM8O4QVvbdA9h0w",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-fukuoka-tenjin-city-center-japan",
    name: { ja: "Fukuoka Tenjin City Center, Japan", en: "Fukuoka Tenjin City Center, Japan" },
    lat: 33.5914,
    lng: 130.4018,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "4hekwFXDmQk",
      channelId: "UCDH5mMaQjT_4nYliCNxd47g",
      titleKey: "福岡天神１丁目ライブカメラ　Fukuoka Tenjin Intersection Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-hakodate",
    name: { ja: "Hakodate", en: "Hakodate" },
    lat: 41.7758,
    lng: 140.7367,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "FdwzsmuTRu4",
      channelId: "UCynX4LJTQ_H7_KPy7QiIS2A",
      titleKey: "【Live-Japan】函館駅前ライブカメラ① #函館 #HAKODATE #函館湾 #JR函館駅",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-sorakaze-live-camera-sorakaze-hakone",
    name: { ja: "「箱根遊船 SORAKAZE」ライブカメラ / Live camera ”SORAKAZE”(Hakone Cruise Ship)", en: "「箱根遊船 SORAKAZE」ライブカメラ / Live camera ”SORAKAZE”(Hakone Cruise Ship)" },
    lat: 35.1895,
    lng: 139.0265,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "YCtAXDnsyYY",
      channelId: "UCwzJctz6m-0wG_evkheecZA",
      titleKey: "「箱根遊船 SORAKAZE」ライブカメラ  / Live camera ”SORAKAZE”(Hakone Cruise Ship)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-ptz",
    name: { ja: "鍛冶町通りライブカメラ［ザザシティ浜松］PTZ（パン/チルト/ズーム）", en: "鍛冶町通りライブカメラ［ザザシティ浜松］PTZ（パン/チルト/ズーム）" },
    lat: 34.7,
    lng: 137.7333,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "rPNHFcaZSp8",
      channelId: "UCJKH8wYxFYeufDnvy1MPofA",
      titleKey: "鍛冶町通りライブカメラ［ザザシティ浜松］PTZ（パン/チルト/ズーム）",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-hiroshima-city-japan-the-2023-g7",
    name: { ja: "【LIVE】いまの広島本通交差点／Hiroshima City, Japan. The 2023 G7 Summit was held.", en: "【LIVE】いまの広島本通交差点／Hiroshima City, Japan. The 2023 G7 Summit was held." },
    lat: 34.4,
    lng: 132.45,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "oW2Gb8YoGAg",
      channelId: "UCRnFGOp_mjaCYEhMzsE2iHA",
      titleKey: "【LIVE】いまの広島本通交差点／Hiroshima City, Japan. The 2023 G7 Summit was held.",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-hiroshima-japan",
    name: { ja: "Hiroshima, Japan", en: "Hiroshima, Japan" },
    lat: 34.4,
    lng: 132.45,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "we2FaU_VOQI",
      channelId: "UCyHdFYJyt4Ihwuscuk5ALJA",
      titleKey: "【LIVE】世界遺産・宮島",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-hiroshima-japan-2",
    name: { ja: "Hiroshima, Japan", en: "Hiroshima, Japan" },
    lat: 34.4,
    lng: 132.45,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "tvorbekpucM",
      channelId: "UCpHT_66E7YVI33nvaVD5KPw",
      titleKey: "忠海港ライブカメラ【公式】by うさぎの島への玄関口／忠海港   The Gateway to Rabbit Island Official Port Live Cam 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-hiroshima-japan-3",
    name: { ja: "Hiroshima, Japan", en: "Hiroshima, Japan" },
    lat: 34.4,
    lng: 132.45,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "4IYYByR29A0",
      channelId: "UCyHdFYJyt4Ihwuscuk5ALJA",
      titleKey: "386",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-hiroshima-station",
    name: { ja: "Hiroshima Station", en: "Hiroshima Station" },
    lat: 34.4,
    lng: 132.45,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "cJUYRPEj_Gg",
      channelId: "UCg9YmSd9-AF2RRPNHsLjj2A",
      titleKey: "【LIVE】いまのJR広島駅／Hiroshima Station | Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-2",
    name: { ja: "人吉市内ライブカメラ", en: "人吉市内ライブカメラ" },
    lat: 32.2167,
    lng: 130.75,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "OYO_IZpUhOw",
      channelId: "UCG1ApxYbWaC9xUxgHCWyR5Q",
      titleKey: "人吉市内ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-jr-livecamera-livestream-webcam",
    name: { ja: "【LIVE】JR本八幡駅北口ライブカメラ 本八幡駅側 LIVECAMERA livestream webcam 電車 鉄道カメラ train station JAPAN 交通情報", en: "【LIVE】JR本八幡駅北口ライブカメラ 本八幡駅側 LIVECAMERA livestream webcam 電車 鉄道カメラ train station JAPAN 交通情報" },
    lat: 35.7341,
    lng: 139.9065,
    timeZone: "Asia/Tokyo",
    category: "railway",
    country: "JP",
    source: {
      videoId: "3NZQIHZziuw",
      channelId: "UCkE1JbngfWjKngmTSujg_wA",
      titleKey: "【LIVE】JR本八幡駅北口ライブカメラ　本八幡駅側 LIVECAMERA livestream webcam 電車 鉄道カメラ train station JAPAN 交通情報",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-ebc",
    name: { ja: "しまなみライブカメラ【EBC】", en: "しまなみライブカメラ【EBC】" },
    lat: 34.07,
    lng: 133.0002,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "OV0JEv6C2QQ",
      channelId: "UCSzVAEFIewUsDHFEkcdyw1w",
      titleKey: "しまなみライブカメラ【EBC】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-ishigaki",
    name: { ja: "Ishigaki", en: "Ishigaki" },
    lat: 24.3448,
    lng: 124.1572,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "H6pbOinBue8",
      channelId: "UCQJE3qm7Sjc5-JXAYjAfkrw",
      titleKey: "石垣島７３０交差点ＬＩＶＥカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-iwakuni-japan",
    name: { ja: "Iwakuni, Japan", en: "Iwakuni, Japan" },
    lat: 34.163,
    lng: 132.22,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "C3Ood13b4Sk",
      channelId: "UCCDCozZz1umL3bOH_WMa-4Q",
      titleKey: "1.7K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-3",
    name: { ja: "河津町ライブカメラ", en: "河津町ライブカメラ" },
    lat: 34.9716,
    lng: 138.9464,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "Xn7YQxxC5R0",
      channelId: "UCgJR4NiTcsb4h95YrsheNYw",
      titleKey: "河津町ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kagoshima-sakurajima-landmark-kts-jap",
    name: { ja: "Kagoshima Sakurajima Landmark KTS, Japan", en: "Kagoshima Sakurajima Landmark KTS, Japan" },
    lat: 31.5652,
    lng: 130.526,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "w0U4AJozxek",
      channelId: "UCG8ze26AvirHm4XpBVz7rdA",
      titleKey: "【ライブ映像】桜島 全景（垂水市海潟）",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-134-live-camera-japan-h-view-camera-t",
    name: { ja: "江ノ電・134号線ライブカメラ 湘南 鎌倉 波情報 渋滞情報 海岸駐車場 Live Camera Japan H.View camera 【The NOON 七里ケ浜 Studio ライブカメラ2 】", en: "江ノ電・134号線ライブカメラ 湘南 鎌倉 波情報 渋滞情報 海岸駐車場 Live Camera Japan H.View camera 【The NOON 七里ケ浜 Studio ライブカメラ2 】" },
    lat: 35.3109,
    lng: 139.547,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "DgIbfgFdGVI",
      channelId: "UC_9dgNP8GvfhUURELouR3Dg",
      titleKey: "江ノ電・134号線ライブカメラ 湘南 鎌倉 波情報 渋滞情報 海岸駐車場 Live Camera Japan H.View camera 【The NOON 七里ケ浜 Studio ライブカメラ2 】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kamakura-japan",
    name: { ja: "Kamakura, Japan", en: "Kamakura, Japan" },
    lat: 35.3109,
    lng: 139.547,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "ZeI0dnHjX6w",
      channelId: "UCTBW35nZWfilnHd28euduBw",
      titleKey: "((Live配信中))　鎌倉『小町通り』の現在の様子です♪　Komachi Street now, Kamakura.",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kamakura-japan-2",
    name: { ja: "Kamakura, Japan", en: "Kamakura, Japan" },
    lat: 35.3109,
    lng: 139.547,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "T2dB77dObao",
      channelId: "UC_9dgNP8GvfhUURELouR3Dg",
      titleKey: "1K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kamisu",
    name: { ja: "Kamisu", en: "Kamisu" },
    lat: 35.8969,
    lng: 140.6667,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "v9SDe9N8J68",
      channelId: "UCwnL1oawHTCb7xZw0GzNnmw",
      titleKey: "【LIVE】砂浜ライブカメラ：太平洋側 茨城県鹿島灘 Hasaki Beach Monitoring Webcam, Japan",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-hab-live-camera",
    name: { ja: "ライブカメラ 北陸朝日放送（金沢市）本社前 HAB LIVE camera", en: "ライブカメラ 北陸朝日放送（金沢市）本社前 HAB LIVE camera" },
    lat: 36.6,
    lng: 136.6167,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "e9y2rfhbR-Q",
      channelId: "UCt6LB-BvEmDm-oWbe_TO7mw",
      titleKey: "ライブカメラ　北陸朝日放送（金沢市）本社前 HAB LIVE camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kawane",
    name: { ja: "Kawane", en: "Kawane" },
    lat: 35,
    lng: 138.1,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "hgy6ct46BnI",
      channelId: "UCPTipVEcJF8-28st0kSVlqg",
      titleKey: "1.7K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2",
    name: { ja: "【LIVE】神戸ウォーターフロント ＃メリケンパーク＃神戸ポートタワー", en: "【LIVE】神戸ウォーターフロント ＃メリケンパーク＃神戸ポートタワー" },
    lat: 34.6913,
    lng: 135.183,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "AU_2zfM4m68",
      channelId: "UC1YsvhwhmQV5kfVMRpTVx-A",
      titleKey: "【LIVE】神戸ウォーターフロント  ＃メリケンパーク＃神戸ポートタワー",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kkt",
    name: { ja: "【熊本市内 ライブ映像】KKTニュース配信", en: "【熊本市内 ライブ映像】KKTニュース配信" },
    lat: 32.8059,
    lng: 130.6918,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "gtLrD-Xz6Go",
      channelId: "UCHVgNZeav4snXQs93TyNp8g",
      titleKey: "【熊本市内 ライブ映像】KKTニュース配信",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kurihama-skyline-over-yokosuka-japan",
    name: { ja: "Kurihama Skyline Over Yokosuka, Japan", en: "Kurihama Skyline Over Yokosuka, Japan" },
    lat: 35.2348,
    lng: 139.6748,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "hVGdqZAd1xA",
      channelId: "UCTTbcfIcioz1eGwlLIYmDIg",
      titleKey: "756",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-camera",
    name: { ja: "「LIVE CAMERA」草津温泉・温泉門", en: "「LIVE CAMERA」草津温泉・温泉門" },
    lat: 35.0167,
    lng: 135.9667,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "Xr781EeLdqs",
      channelId: "UCbn5eHDjwmPC2K9RG8P0i_A",
      titleKey: "「LIVE CAMERA」草津温泉・温泉門",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-bamboo-forest-path-kyoto-live-ca",
    name: { ja: "【LIVE】京都 嵯峨嵐山 竹林の小径ライブ中継カメラ（京都市観光協会公式）／Bamboo forest path, Kyoto Live camera", en: "【LIVE】京都 嵯峨嵐山 竹林の小径ライブ中継カメラ（京都市観光協会公式）／Bamboo forest path, Kyoto Live camera" },
    lat: 35.0211,
    lng: 135.7538,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "Op-lf2NRMzs",
      channelId: "UCFyohCp_Vx6WC82DiJ0l88w",
      titleKey: "【LIVE】京都 嵯峨嵐山  竹林の小径ライブ中継カメラ（京都市観光協会公式）／Bamboo forest path, Kyoto Live camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-kyoto-station-bus-terminal-kyoto",
    name: { ja: "【LIVE】京都駅前バス乗り場ライブカメラ（京都市観光協会公式）／Kyoto Station Bus Terminal, Kyoto Live camera", en: "【LIVE】京都駅前バス乗り場ライブカメラ（京都市観光協会公式）／Kyoto Station Bus Terminal, Kyoto Live camera" },
    lat: 35.0211,
    lng: 135.7538,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "v9rQqa_VTEY",
      channelId: "UCFyohCp_Vx6WC82DiJ0l88w",
      titleKey: "【LIVE】京都駅前バス乗り場ライブカメラ（京都市観光協会公式）／Kyoto Station Bus Terminal, Kyoto Live camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-lake-biwa-japan",
    name: { ja: "Lake Biwa, Japan", en: "Lake Biwa, Japan" },
    lat: 35,
    lng: 135.8667,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "bZHusX-v7NI",
      channelId: "UCjvpBcOLMBqktt0KJxjtJCg",
      titleKey: "現在の大津港の様子 ライブカメラ　【生配信】【裏】 滋賀県 琵琶湖 【LIVE CAMERA】【琵琶湖花噴水】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-camera-hotel-mt-fuji",
    name: { ja: "ホテルマウント富士ライブカメラ/Live Camera Hotel Mt.fuji", en: "ホテルマウント富士ライブカメラ/Live Camera Hotel Mt.fuji" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "Gn2CJjzY068",
      channelId: "UCwzJctz6m-0wG_evkheecZA",
      titleKey: "ホテルマウント富士ライブカメラ/Live Camera Hotel Mt.fuji",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-ocean-hotel-iwato",
    name: { ja: "【LIVE】鹿児島県枕崎市より Ocean Hotel Iwato（屋上カメラ)", en: "【LIVE】鹿児島県枕崎市より Ocean Hotel Iwato（屋上カメラ)" },
    lat: 31.2667,
    lng: 130.3167,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "kaCOs4QWBss",
      channelId: "UCXIen52JAy3pttIX60JO0YA",
      titleKey: "【LIVE】鹿児島県枕崎市より🌴 Ocean Hotel Iwato（屋上カメラ)🏨",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-marunuma-ski-resort",
    name: { ja: "Marunuma Ski Resort", en: "Marunuma Ski Resort" },
    lat: 36.839,
    lng: 139.2627,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "0Q2YZBnp7vk",
      channelId: "UCVh1-I9rKs7w7C7_LuUhwcg",
      titleKey: "3.2K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-marunuma-ski-terrace",
    name: { ja: "Marunuma Ski Terrace", en: "Marunuma Ski Terrace" },
    lat: 36.839,
    lng: 139.2627,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "6OFESNgbzMs",
      channelId: "UCVh1-I9rKs7w7C7_LuUhwcg",
      titleKey: "【ライブ配信】丸沼高原　標高2000ｍ　天空テラス",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-minakami-japan",
    name: { ja: "Minakami, Japan", en: "Minakami, Japan" },
    lat: 36.6882,
    lng: 138.9863,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "P3bq6nGkpnE",
      channelId: "UCfg8n0p5zxu4V9l2lnHgyyQ",
      titleKey: "1.1K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-mitoyo",
    name: { ja: "Mitoyo", en: "Mitoyo" },
    lat: 34.2105,
    lng: 133.6746,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "u6e_v5ntnyw",
      channelId: "UCcNpMZYWUnTNePHU0IO38pQ",
      titleKey: "【修理中】父母ヶ浜ライブカメラ 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-miyakojima",
    name: { ja: "Miyakojima", en: "Miyakojima" },
    lat: 24.7902,
    lng: 125.3111,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "4v5e4eKIT_E",
      channelId: "UCv89ldA5wRHQpPqPjy5NEJg",
      titleKey: "817",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-motobu",
    name: { ja: "Motobu", en: "Motobu" },
    lat: 26.659,
    lng: 127.9067,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "VyT694OcIHM",
      channelId: "UCa-m_22VEF-ehvxNmici1OQ",
      titleKey: "1.9K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-mt-fuji-and-lake-ashinoko-live-camera",
    name: { ja: "富士山・芦ノ湖ライブカメラ ～箱根大観山・アネスト岩田ターンパイク箱根より～ / Mt. Fuji and Lake Ashinoko Live Camera - from Hakone, Japan", en: "富士山・芦ノ湖ライブカメラ ～箱根大観山・アネスト岩田ターンパイク箱根より～ / Mt. Fuji and Lake Ashinoko Live Camera - from Hakone, Japan" },
    lat: 35.1895,
    lng: 139.0265,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "maMMEh-2Bsk",
      channelId: "UCEdkwjq31H4y3xfPST9ZFtg",
      titleKey: "富士山・芦ノ湖ライブカメラ　～箱根大観山・アネスト岩田ターンパイク箱根より～　/　Mt. Fuji and Lake Ashinoko Live Camera - from Hakone, Japan",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-mount-murodo",
    name: { ja: "Mount Murodo", en: "Mount Murodo" },
    lat: 34.9833,
    lng: 139.8667,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "rWO9PXZwahM",
      channelId: "UCk4bgav5X0rlbGefFnPcuoQ",
      titleKey: "3.6K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-4k-live-live",
    name: { ja: "【4K】武蔵御嶽神社LIVEカメラ（御岳山LIVEカメラ）", en: "【4K】武蔵御嶽神社LIVEカメラ（御岳山LIVEカメラ）" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "1vdmvnXnkQ4",
      channelId: "UC6avbfi8llm_IDkKqBP3Jjg",
      titleKey: "【4K】武蔵御嶽神社LIVEカメラ（御岳山LIVEカメラ）",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-3",
    name: { ja: "【LIVE】きょうの沖縄・那覇市役所前交差点ライブカメラ【琉球新報社から】", en: "【LIVE】きょうの沖縄・那覇市役所前交差点ライブカメラ【琉球新報社から】" },
    lat: 26.213,
    lng: 127.6785,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "nU41kpfKLJM",
      channelId: "UC-jBJkLN89AlQp6eeCNnnWg",
      titleKey: "【LIVE】きょうの沖縄・那覇市役所前交差点ライブカメラ【琉球新報社から】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-jr-nakajo-station-live-camera-fhd",
    name: { ja: "JR中条駅（胎内市）中条駅観光交流室 の情報ライブカメラ Nakajo Station Live Camera【FHDカメラ】鉄道ライブカメラ", en: "JR中条駅（胎内市）中条駅観光交流室 の情報ライブカメラ Nakajo Station Live Camera【FHDカメラ】鉄道ライブカメラ" },
    lat: 38.0496,
    lng: 139.3907,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "pufHCGNHZFg",
      channelId: "UCAaw-OnuKB5FTpBkM0xUZ4Q",
      titleKey: "JR中条駅（胎内市）中条駅観光交流室 の情報ライブカメラ Nakajo Station Live Camera【FHDカメラ】鉄道ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-nantan",
    name: { ja: "Nantan", en: "Nantan" },
    lat: 35.1098,
    lng: 135.4916,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "RC4GOX88dxo",
      channelId: "UCAqJUdintpCdd-Kqk-UxFTw",
      titleKey: "2026/06/18 【LIVE CAMERA】#南丹市 #美山かやぶきの里  #ライブカメラ #livecamera  #nantan #miyama #thatchedvillage #美山",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-live-camera-niigata",
    name: { ja: "【LIVE配信】新潟駅前ライブカメラ（新潟市中央区）Live Camera, Niigata, #新潟県 #新潟市 #新潟駅", en: "【LIVE配信】新潟駅前ライブカメラ（新潟市中央区）Live Camera, Niigata, #新潟県 #新潟市 #新潟駅" },
    lat: 37.9226,
    lng: 139.0412,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "TUjtOgs_fCM",
      channelId: "UC8iN-WKPu820ve-4t9NxHRw",
      titleKey: "【LIVE配信】新潟駅前ライブカメラ（新潟市中央区）Live Camera, Niigata,  #新潟県 #新潟市 #新潟駅",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-nikko-japan",
    name: { ja: "Nikkō, Japan", en: "Nikkō, Japan" },
    lat: 36.75,
    lng: 139.6167,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "7oRZg_BHPXg",
      channelId: "UCwYeh4cu-0z0hFd3wwYgzeA",
      titleKey: "400",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-camera-in-the-tokachi-obihiro-ai",
    name: { ja: "とかち帯広空港ライブカメラ Live Camera in The Tokachi-Obihiro Airport, Hokkaido in Japan", en: "とかち帯広空港ライブカメラ Live Camera in The Tokachi-Obihiro Airport, Hokkaido in Japan" },
    lat: 42.9172,
    lng: 143.2044,
    timeZone: "Asia/Tokyo",
    category: "airport",
    country: "JP",
    source: {
      videoId: "IDXRscHtp2s",
      channelId: "UCT-PZ211r3_9mFdF0zC1HHg",
      titleKey: "とかち帯広空港ライブカメラ Live Camera in The Tokachi-Obihiro Airport, Hokkaido in Japan",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-ochanomizu-station-tokyo",
    name: { ja: "Ochanomizu Station, Tokyo", en: "Ochanomizu Station, Tokyo" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "2AFMu3Yiw68",
      channelId: "UCu6EQS1mVamy0GWjXAM-Qsw",
      titleKey: "Japan City Pop | シティポップ  | Jpop / Japanese City Pop Playlist",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-odaiba-tokyo-bay-ships-and-planes-jap",
    name: { ja: "Odaiba Tokyo Bay Ships and Planes, Japan", en: "Odaiba Tokyo Bay Ships and Planes, Japan" },
    lat: 35.6346,
    lng: 139.7769,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "qMDxy_qbdtE",
      channelId: "UCaxxRyMskvvbpQMo-VJpNhw",
      titleKey: "4.5K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-okinawa-japan",
    name: { ja: "Okinawa, Japan", en: "Okinawa, Japan" },
    lat: 26.5069,
    lng: 127.9458,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "fPKygdd-p2Y",
      channelId: "UCo_JM-fsLQQLz8hovcKkK0A",
      titleKey: "#8131okichan　沖縄県　国際通り安里三叉路 マキシアルパビル　ライブ映像　Okinawa Kokusai Street Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-okinawa-japan-2",
    name: { ja: "Okinawa, Japan", en: "Okinawa, Japan" },
    lat: 26.5069,
    lng: 127.9458,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "QffFETOybpc",
      channelId: "UC8bU0LyP49R7pL49LFwsPsg",
      titleKey: "【沖縄NOW!!】恩納村マリブビーチからLIVE映像！マリンレジャーや台風の状況、沖縄からの癒し映像としても是非！！",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-24-fst-net",
    name: { ja: "大阪ライブカメラ 大阪・コリアタウン【LIVE】24時間ライブカメラ｜超高感度カラー｜街の様子・観光・防犯｜FST.NET", en: "大阪ライブカメラ 大阪・コリアタウン【LIVE】24時間ライブカメラ｜超高感度カラー｜街の様子・観光・防犯｜FST.NET" },
    lat: 34.6938,
    lng: 135.5011,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "ztXjQgNxi4o",
      channelId: "UCwNfkYp9gKIvQDN1kPhpCsQ",
      titleKey: "大阪ライブカメラ　大阪・コリアタウン【LIVE】24時間ライブカメラ｜超高感度カラー｜街の様子・観光・防犯｜FST.NET",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-f-s-t-net",
    name: { ja: "大阪ライブカメラ 【LIVE】大阪・心斎橋 （長堀通り交差）新橋交差点 F.S.T.NET提供 高感度・高画質ライブカメラ", en: "大阪ライブカメラ 【LIVE】大阪・心斎橋 （長堀通り交差）新橋交差点 F.S.T.NET提供 高感度・高画質ライブカメラ" },
    lat: 34.6938,
    lng: 135.5011,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "aVAO2wSUsPo",
      channelId: "UCwNfkYp9gKIvQDN1kPhpCsQ",
      titleKey: "大阪ライブカメラ　【LIVE】大阪・心斎橋　（長堀通り交差）新橋交差点　F.S.T.NET提供　高感度・高画質ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-osaka-airport",
    name: { ja: "Osaka Airport", en: "Osaka Airport" },
    lat: 34.6938,
    lng: 135.5011,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "T2TQocGHH5A",
      channelId: "UCVdRvQptqqoLJA9s4_QcpiQ",
      titleKey: "108",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-osaka-station",
    name: { ja: "Osaka Station", en: "Osaka Station" },
    lat: 34.6938,
    lng: 135.5011,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "Kt2gfHrbPfk",
      channelId: "UCd6GEK664CTEWRZda7Fu7Lg",
      titleKey: "JR大阪駅 いまの様子は【LIVE CAMERA】osaka station",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-oshidomari-ferry-terminal",
    name: { ja: "Oshidomari Ferry Terminal", en: "Oshidomari Ferry Terminal" },
    lat: 43.432,
    lng: 142.9347,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "iBwjkDhl9ys",
      channelId: "UCcx2yTKNrSvKGwvPpOzOVWA",
      titleKey: "1.7K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-camera-in-tokachi-big-bridge-ove",
    name: { ja: "十勝大橋ライブカメラ Live Camera in Tokachi Big Bridge over the Tokachi river, Hokkaido in Japan", en: "十勝大橋ライブカメラ Live Camera in Tokachi Big Bridge over the Tokachi river, Hokkaido in Japan" },
    lat: 42.9917,
    lng: 143.2003,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "G2pXkb7DdPE",
      channelId: "UCT-PZ211r3_9mFdF0zC1HHg",
      titleKey: "十勝大橋ライブカメラ Live Camera in Tokachi Big Bridge over the Tokachi river, Hokkaido in Japan",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-kanazawa-ishikawa-japan-live-camera",
    name: { ja: "金沢市（石川県） ライブカメラ #金沢 #石川 #kanazawa #Ishikawa #japan #ライブカメラ #カメラ - Live Camera", en: "金沢市（石川県） ライブカメラ #金沢 #石川 #kanazawa #Ishikawa #japan #ライブカメラ #カメラ - Live Camera" },
    lat: 36.6,
    lng: 136.6167,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "HmnLIvhyUZw",
      channelId: "UCF5te9Y8oBT7oVJNyQkhWWQ",
      titleKey: "金沢市（石川県） ライブカメラ #金沢 #石川 #kanazawa #Ishikawa #japan #ライブカメラ #カメラ   - Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-panorama-of-yubatake",
    name: { ja: "Panorama of Yubatake", en: "Panorama of Yubatake" },
    lat: 36.6228,
    lng: 138.5964,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "B_Sc1v1qR-g",
      channelId: "UCbn5eHDjwmPC2K9RG8P0i_A",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-park-in-kanazawa",
    name: { ja: "Park in Kanazawa", en: "Park in Kanazawa" },
    lat: 36.6,
    lng: 136.6167,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "ZpzNv_hNxPE",
      channelId: "UCzeRR8rMI8IkjqGx_MFlUjQ",
      titleKey: "3.6K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-rishirifuji",
    name: { ja: "Rishirifuji", en: "Rishirifuji" },
    lat: 43.432,
    lng: 142.9347,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "Lvlm2e83hqM",
      channelId: "UCcx2yTKNrSvKGwvPpOzOVWA",
      titleKey: "1.5K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-livecamera-live",
    name: { ja: "「LIVECAMERA」草津温泉 西の河原・湯川LIVE", en: "「LIVECAMERA」草津温泉 西の河原・湯川LIVE" },
    lat: 35.0167,
    lng: 135.9667,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "RT_yg_qsK_M",
      channelId: "UCbn5eHDjwmPC2K9RG8P0i_A",
      titleKey: "「LIVECAMERA」草津温泉 西の河原・湯川LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-sapporo-japan",
    name: { ja: "Sapporo, Japan", en: "Sapporo, Japan" },
    lat: 43.0667,
    lng: 141.35,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "yM6M8J-BZ1U",
      channelId: "UCRZplV8vE67bgCI6_3sm3mQ",
      titleKey: "［LIVE CAMERA］札幌 狸小路 ライブカメラ（４丁目） Tanukikoji Shopping Street in Sapporo, Hokkaido, Japan.",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-sekiya-beach",
    name: { ja: "Sekiya Beach", en: "Sekiya Beach" },
    lat: 37.9226,
    lng: 139.0412,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "lZ0Va0y_KxA",
      channelId: "UCFfurCxvxE0mFkFy1ZwSang",
      titleKey: "471",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-sendai",
    name: { ja: "Sendai", en: "Sendai" },
    lat: 38.2667,
    lng: 140.8667,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "rPAGOmumees",
      channelId: "UCp0vHbq1su20AqZoND_LH_Q",
      titleKey: "230",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shihoro",
    name: { ja: "Shihoro", en: "Shihoro" },
    lat: 43.1667,
    lng: 143.25,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "cElpVZpu1wI",
      channelId: "UCpp9pwi4t0rKWoGvKZaAESA",
      titleKey: "1.4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shimogo",
    name: { ja: "Shimogo", en: "Shimogo" },
    lat: 36.0003,
    lng: 139.1031,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "TR0ZBrVbDio",
      channelId: "UC18wakGTIO6r-3e44biki3g",
      titleKey: "3.8K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-yunokami-onsen-station-live-camera",
    name: { ja: "湯野上温泉駅 ライブカメラ | Yunokami Onsen Station Live Camera", en: "湯野上温泉駅 ライブカメラ | Yunokami Onsen Station Live Camera" },
    lat: 36.0003,
    lng: 139.1031,
    timeZone: "Asia/Tokyo",
    category: "railway",
    country: "JP",
    source: {
      videoId: "z1MErdsqsw8",
      channelId: "UC18wakGTIO6r-3e44biki3g",
      titleKey: "湯野上温泉駅 ライブカメラ | Yunokami Onsen Station Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shirahama-japan",
    name: { ja: "Shirahama, Japan", en: "Shirahama, Japan" },
    lat: 33.6833,
    lng: 135.35,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "i6luD8PP1Z0",
      channelId: "UCZBtrisIssVz8n0NbeHvlPA",
      titleKey: "白良浜ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shirahama-surfcam",
    name: { ja: "白浜カメラ 伊豆白浜海岸 shirahama surfcam", en: "白浜カメラ 伊豆白浜海岸 shirahama surfcam" },
    lat: 33.6833,
    lng: 135.35,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "RP-wuud0NMU",
      channelId: "UCnJUV9-pfhyWQdQbvTJ84QA",
      titleKey: "白浜カメラ 伊豆白浜海岸 shirahama surfcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shizouka-japan",
    name: { ja: "Shizouka, Japan", en: "Shizouka, Japan" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "pj8r6m24lh8",
      channelId: "UCQnSuJ_aYt4XRlvBnL4ak4Q",
      titleKey: "3.6K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shizuoka-japan",
    name: { ja: "Shizuoka, Japan", en: "Shizuoka, Japan" },
    lat: 34.9833,
    lng: 138.3833,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "6S4qvf97cbQ",
      channelId: "UCkUdb6wh-TE9MK7Q2VTE5-A",
      titleKey: "3K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-shibuya-scramble-crossing-tokyo-japan",
    name: { ja: "【ライブ】いまの渋谷・スクランブル交差点 ライブカメラ Shibuya Scramble Crossing - Tokyo, Japan Live Cam", en: "【ライブ】いまの渋谷・スクランブル交差点 ライブカメラ Shibuya Scramble Crossing - Tokyo, Japan Live Cam" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "dfVK7ld38Ys",
      channelId: "UCoQBJMzcwmXrRSHBFAlTsIw",
      titleKey: "【ライブ】いまの渋谷・スクランブル交差点　ライブカメラ　Shibuya Scramble Crossing - Tokyo, Japan　 Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-sumida-river-in-tokyo",
    name: { ja: "Sumida River in Tokyo", en: "Sumida River in Tokyo" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "QotB60C4FYc",
      channelId: "UCv5TCRTfSfVRlbTdiF0SAwg",
      titleKey: "406",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-4",
    name: { ja: "淡路島モンキーセンター", en: "淡路島モンキーセンター" },
    lat: 34.3432,
    lng: 134.8891,
    timeZone: "Asia/Tokyo",
    category: "animal",
    country: "JP",
    source: {
      videoId: "lsxYH2XQQCg",
      channelId: "UCujrqnm0oqm_cF3AV1128Sw",
      titleKey: "淡路島モンキーセンター",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-suzu-ishikawa-japan-live-camera",
    name: { ja: "ライブカメラ 珠洲市（石川県）Suzu , Ishikawa , Japan - Live Camera #珠洲市 #珠洲 #石川県", en: "ライブカメラ 珠洲市（石川県）Suzu , Ishikawa , Japan - Live Camera #珠洲市 #珠洲 #石川県" },
    lat: 37.4346,
    lng: 137.2601,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "CgmxirNHFgI",
      channelId: "UCF5te9Y8oBT7oVJNyQkhWWQ",
      titleKey: "ライブカメラ　珠洲市（石川県）Suzu , Ishikawa , Japan - Live Camera #珠洲市 #珠洲 #石川県",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-takayama-japan",
    name: { ja: "Takayama, Japan", en: "Takayama, Japan" },
    lat: 36.1333,
    lng: 137.25,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "UW6YxIlr7ak",
      channelId: "UC5MNHWRJRJ1buoVIg2sHmCw",
      titleKey: "飛騨高山ライブカメラ ライブストリーミング Live Streaming of \"Hida Takayama Live camera\"",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-japan-tokyo-livecamera-webcam-li",
    name: { ja: "【LIVE】JAPAN 東京都足立区交差点ライブカメラ＋温度計 tokyo livecamera webcam livestream", en: "【LIVE】JAPAN 東京都足立区交差点ライブカメラ＋温度計 tokyo livecamera webcam livestream" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "bMhaK0-DVMg",
      channelId: "UCPsjdwVy2etWVaz1m2mcyxQ",
      titleKey: "【LIVE】JAPAN 東京都足立区交差点ライブカメラ＋温度計 tokyo livecamera webcam livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-japan",
    name: { ja: "Tokyo, Japan", en: "Tokyo, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "fSm0LbN2y1Q",
      channelId: "UCcho8zY-dZvd6n26ETJSlKg",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-japan-2",
    name: { ja: "Tokyo, Japan", en: "Tokyo, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "MwcMURMzJ7A",
      channelId: "UCuS18SHV5Nhqi9OtreOBmnA",
      titleKey: "4.9K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-live-stream-of-hamamatsu-cho-rai",
    name: { ja: "[Live] 東京・浜松町駅 ライブカメラ Live Stream of Hamamatsu-cho railway tracks Tokyo", en: "[Live] 東京・浜松町駅 ライブカメラ Live Stream of Hamamatsu-cho railway tracks Tokyo" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "railway",
    country: "JP",
    source: {
      videoId: "W0V8-6WrgBY",
      channelId: "UCRZMs9s1P6o0b1nGibmtkJA",
      titleKey: "[Live] 東京・浜松町駅 ライブカメラ  Live Stream of Hamamatsu-cho  railway tracks Tokyo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-livecamera-tokyo-skytree-tsukiji-stad",
    name: { ja: "Livecamera Tokyo skytree & Tsukiji stadium 2030 - Live of Tokyo in 4K 東京ライブカメラ 24/7", en: "Livecamera Tokyo skytree & Tsukiji stadium 2030 - Live of Tokyo in 4K 東京ライブカメラ 24/7" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "vdj5kp3LLns",
      channelId: "UCB9a-hhlSFUJwGABnHbe8cQ",
      titleKey: "🔴 Livecamera Tokyo skytree & Tsukiji stadium 2030 - Live of Tokyo in 4K ✨ 東京ライブカメラ 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-japan-3",
    name: { ja: "Tokyo, Japan", en: "Tokyo, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "harbor",
    country: "JP",
    source: {
      videoId: "2PIdi3Xa7TY",
      channelId: "UCuTAXTexrhetbOe3zgskJBQ",
      titleKey: "4.9K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-2-2",
    name: { ja: "【西武線ライブカメラ２】 西武池袋線保谷駅付近の電留線ライブ映像", en: "【西武線ライブカメラ２】 西武池袋線保谷駅付近の電留線ライブ映像" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "railway",
    country: "JP",
    source: {
      videoId: "1XphVUBHHmk",
      channelId: "UCAPMlxH-TQVQNzKgD9V_JEw",
      titleKey: "【西武線ライブカメラ２】　西武池袋線保谷駅付近の電留線ライブ映像",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2-kabukicho-live-channel-ii",
    name: { ja: "【 LIVE 】 東京 新宿 歌舞伎町 ライブ ２ / 『 Kabukicho Live Channel II 』", en: "【 LIVE 】 東京 新宿 歌舞伎町 ライブ ２ / 『 Kabukicho Live Channel II 』" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "gFRtAAmiFbE",
      channelId: "UCBFDJXGCOdMjVtg2AnReoXA",
      titleKey: "【 LIVE 】 東京 新宿 歌舞伎町 ライブ ２ / 『 Kabukicho Live Channel II 』",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-japan-4",
    name: { ja: "Tokyo, Japan", en: "Tokyo, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "VqTF7RQfRTc",
      channelId: "UC7Et2H7QnWjaIY938jqrwKQ",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-cam",
    name: { ja: "【お台場ライブカメラ】お台場海浜公園 屋形船 お台場ビーチ フジテレビ / Live cam", en: "【お台場ライブカメラ】お台場海浜公園 屋形船 お台場ビーチ フジテレビ / Live cam" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "V1rDmWK4Dd8",
      channelId: "UCMaXtOvzgcCQt7MZwJmr7XA",
      titleKey: "【お台場ライブカメラ】お台場海浜公園 屋形船 お台場ビーチ フジテレビ / Live cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-japan-5",
    name: { ja: "Tokyo, Japan", en: "Tokyo, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "YUVih7O_yF4",
      channelId: "UCkAB51Lbgor6SW8aE4S3zuQ",
      titleKey: "東京ライブカメラ Tokyo live camera｜両国・相撲の街｜伝統ある下町風景｜24時間",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-japan-6",
    name: { ja: "Tokyo, Japan", en: "Tokyo, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "momoZP07S0o",
      channelId: "UCpeOSC88eDaWC-0bfuJJlhQ",
      titleKey: "【LIVE】MILE ZERO SHIMBASHI　新橋〇零哩　（新橋・汐留 ライブカメラ）20230106〜（20260709更新）",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-24-pepe-yunika-vision-tokyo-shin",
    name: { ja: "【 LIVE 】東京都 新宿 24時間 ライブカメラ / 西武新宿駅 pepe前広場 交差点 （YUNIKA VISION前） Tokyo Shinjuku Live camera", en: "【 LIVE 】東京都 新宿 24時間 ライブカメラ / 西武新宿駅 pepe前広場 交差点 （YUNIKA VISION前） Tokyo Shinjuku Live camera" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "lA6TaaMGgDo",
      channelId: "UC56apcbc2pLZ9xyBizbD1Dg",
      titleKey: "【 LIVE 】東京都 新宿 24時間 ライブカメラ / 西武新宿駅 pepe前広場 交差点 （YUNIKA VISION前） Tokyo Shinjuku Live camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-4",
    name: { ja: "【LIVE】新宿猫の目線（新宿駅東口） ライブカメラ", en: "【LIVE】新宿猫の目線（新宿駅東口） ライブカメラ" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "Zhmmh7l6KEw",
      channelId: "UC8cnCaq-MquhsebMer9A9rQ",
      titleKey: "【LIVE】新宿猫の目線（新宿駅東口） ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-5",
    name: { ja: "東京駅丸の内口ライブカメラ", en: "東京駅丸の内口ライブカメラ" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "ZN4gh5IOowM",
      channelId: "UCoS1S0V-QdSl_xe29G8mKcQ",
      titleKey: "東京駅丸の内口ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-tokyo-tower-japan",
    name: { ja: "Tokyo Tower, Japan", en: "Tokyo Tower, Japan" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "nu6NE55_X7A",
      channelId: "UCKyXyJMijwyBebgI9wmzFcw",
      titleKey: "6.7K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-4k-live-live-stream-of-shimbashi-toky",
    name: { ja: "[4K Live] 東京・汐留 ライブカメラ live stream of Shimbashi,Tokyo", en: "[4K Live] 東京・汐留 ライブカメラ live stream of Shimbashi,Tokyo" },
    lat: 35.6895,
    lng: 139.6917,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "VM18f-IIUTw",
      channelId: "UCRZMs9s1P6o0b1nGibmtkJA",
      titleKey: "[4K Live] 東京・汐留 ライブカメラ live stream of Shimbashi,Tokyo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-towada-lake",
    name: { ja: "Towada Lake", en: "Towada Lake" },
    lat: 40.6205,
    lng: 141.2107,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "trSGa-eTSrk",
      channelId: "UCusBqJK8c15Hq-D8IfKHQAg",
      titleKey: "Like",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-livecamera",
    name: { ja: "「LIVECAMERA」裏草津地蔵 源泉広場", en: "「LIVECAMERA」裏草津地蔵 源泉広場" },
    lat: 36.6228,
    lng: 138.5964,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "ybOa_LRzp_I",
      channelId: "UCbn5eHDjwmPC2K9RG8P0i_A",
      titleKey: "「LIVECAMERA」裏草津地蔵 源泉広場",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-wajima-ishikawa-japan-live-camera",
    name: { ja: "ライブカメラ 輪島市（石川県）Wajima , Ishikawa , Japan - Live Camera #輪島市 #輪島 #石川県 #石川", en: "ライブカメラ 輪島市（石川県）Wajima , Ishikawa , Japan - Live Camera #輪島市 #輪島 #石川県 #石川" },
    lat: 37.4046,
    lng: 136.8991,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "vjp_8TKQRhw",
      channelId: "UCF5te9Y8oBT7oVJNyQkhWWQ",
      titleKey: "ライブカメラ　輪島市（石川県）Wajima , Ishikawa , Japan - Live Camera #輪島市 #輪島 #石川県 #石川",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-yokosuka",
    name: { ja: "Yokosuka", en: "Yokosuka" },
    lat: 35.2836,
    lng: 139.6672,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "PrGQsGUAnk0",
      channelId: "UCwalBJrcoOVwid4wKfWkRiA",
      titleKey: "Miura Beach Live Cam 24/7 🌊 Ocean Waves for Sleep & Relax | Japan Beach View",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-livecamera-2",
    name: { ja: "「LIVECAMERA」 草津温泉「湯畑」湯滝前", en: "「LIVECAMERA」 草津温泉「湯畑」湯滝前" },
    lat: 36.6228,
    lng: 138.5964,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "GrEEoEmmrKs",
      channelId: "UCbn5eHDjwmPC2K9RG8P0i_A",
      titleKey: "「LIVECAMERA」　草津温泉「湯畑」湯滝前",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-yudanaka-onsen",
    name: { ja: "Yudanaka Onsen", en: "Yudanaka Onsen" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "lAWdqnXJ0w0",
      channelId: "UCPhpp0O43zs-6y7Z56N_obA",
      titleKey: "2K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-6",
    name: { ja: "上の台第一駐車場ライブカメラ", en: "上の台第一駐車場ライブカメラ" },
    lat: 38.0926,
    lng: 140.5532,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "DnrgCsF1nAM",
      channelId: "UC1xeTccsAQdz7-fF0eAa5HA",
      titleKey: "上の台第一駐車場ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ke-laikipia",
    name: { ja: "Laikipia", en: "Laikipia" },
    lat: 0.2923,
    lng: 36.863,
    timeZone: "Africa/Nairobi",
    category: "city",
    country: "KE",
    source: {
      videoId: "KyQAB-TKOVA",
      channelId: "UCiGOIXjFqy5_mUNxQNOMfHw",
      titleKey: "African Watering Hole powered by Explore.org",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ky-cayman-islands-earthcam-beach-view",
    name: { ja: "Cayman Islands EarthCam Beach View", en: "Cayman Islands EarthCam Beach View" },
    lat: 19.322,
    lng: -81.382,
    timeZone: "America/Cayman",
    category: "nature",
    country: "KY",
    source: {
      videoId: "nFWB7S5-er4",
      channelId: "UC6qrG3W8SMK0jior2olka3g",
      titleKey: "EarthCam Live:  Cayman Islands",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ky-seven-mile-beach-grand-cayman",
    name: { ja: "Seven Mile Beach Grand Cayman", en: "Seven Mile Beach Grand Cayman" },
    lat: 19.3303,
    lng: -81.3822,
    timeZone: "America/Cayman",
    category: "nature",
    country: "KY",
    source: {
      videoId: "PsRa6WGjbBo",
      channelId: "UCTCqQuacj0roI9MsUOZOBPw",
      titleKey: "Christopher Columbus Live Webcam Seven Mile Beach",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mq-les-anses-d-arlet-martinique-beach",
    name: { ja: "Les Anses d'Arlet Martinique Beach", en: "Les Anses d'Arlet Martinique Beach" },
    lat: 14.49,
    lng: -61.08,
    timeZone: "America/Martinique",
    category: "nature",
    country: "MQ",
    source: {
      videoId: "CC0gjFqH_u4",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "92",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-constitution-square-in-amealco-de-bon",
    name: { ja: "Constitution Square in Amealco de Bonfil, Mexico", en: "Constitution Square in Amealco de Bonfil, Mexico" },
    lat: 20.59,
    lng: -100.37,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "TDWnJ3dXkMY",
      channelId: "UCPOifgFqN0FuTrhc2Ja6n7w",
      titleKey: "Amealco, Querétaro Pueblo Mágico En Vivo | Vista de la Plaza Constitución",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-don-vasco-square-mexico",
    name: { ja: "Don Vasco Square, Mexico", en: "Don Vasco Square, Mexico" },
    lat: 19.59,
    lng: -101.97,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "oh3DAj61Tlk",
      channelId: "UC22kLkjatN1XJVC_9T9otRg",
      titleKey: "Pátzcuaro, Michoacán Pueblo Mágico En Vivo | Vista de la Plaza Don Vasco",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-founders-square-mexico",
    name: { ja: "Founders Square, Mexico", en: "Founders Square, Mexico" },
    lat: 20.59,
    lng: -100.37,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "ax57OP38Cv4",
      channelId: "UCTDVlsQwAvsxX-NG03I-SOw",
      titleKey: "Vista en vivo de la Plaza Fundadores en la Ciudad de Querétaro",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-loreto-baja-california-sur-en-vivo",
    name: { ja: "Loreto, Baja California Sur en vivo", en: "Loreto, Baja California Sur en vivo" },
    lat: 22.2719,
    lng: -101.986,
    timeZone: "America/Mexico_City",
    category: "nature",
    country: "MX",
    source: {
      videoId: "1cKGvTltZDE",
      channelId: "UCSb0o-ElVq6STwuYdAcizXQ",
      titleKey: "Loreto, Baja California Sur en vivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-los-muertos-pier",
    name: { ja: "Los Muertos Pier", en: "Los Muertos Pier" },
    lat: 20.5993,
    lng: -105.2388,
    timeZone: "America/Mexico_City",
    category: "harbor",
    country: "MX",
    source: {
      videoId: "FJDr8qokFT4",
      channelId: "UCF5PpfZcLSzdFaQY5LGcnAA",
      titleKey: "Los Muertos Pier Cam – El Dorado, Puerto Vallarta, México 🇲🇽",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-main-square-mexico",
    name: { ja: "Main Square, Mexico", en: "Main Square, Mexico" },
    lat: 20.6771,
    lng: -103.3458,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "AbXrbsrlbew",
      channelId: "UCSb0o-ElVq6STwuYdAcizXQ",
      titleKey: "Vista en vivo al Poniente de la Ciudad de Guadalajara, Jalisco",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-panorama-from-above-mexico",
    name: { ja: "Panorama from above, Mexico", en: "Panorama from above, Mexico" },
    lat: 25.6648,
    lng: -100.2984,
    timeZone: "America/Monterrey",
    category: "city",
    country: "MX",
    source: {
      videoId: "u_vBHLK0Ppc",
      channelId: "UCJ6qeF0wt_t-HleLuePBRSg",
      titleKey: "2.4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-cozumel-quintana-roo-en-vivo-vista-pa",
    name: { ja: "Cozumel, Quintana Roo En Vivo | Vista Panorámica desde Grand Park Royal Cozumel", en: "Cozumel, Quintana Roo En Vivo | Vista Panorámica desde Grand Park Royal Cozumel" },
    lat: 20.62,
    lng: -87.07,
    timeZone: "America/Cancun",
    category: "city",
    country: "MX",
    source: {
      videoId: "Cmzo6T9lz40",
      channelId: "UC1Lz8E2e08WqN6q7p2pgdAg",
      titleKey: "Cozumel, Quintana Roo En Vivo | Vista Panorámica desde Grand Park Royal Cozumel",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-plaza-garibaldi-mexico",
    name: { ja: "Plaza Garibaldi, Mexico", en: "Plaza Garibaldi, Mexico" },
    lat: 19.4409,
    lng: -99.1388,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "o-qwlPxee2I",
      channelId: "UCZ8JAbEUIAzuEg52lT6SmbA",
      titleKey: "Plaza Garibaldi, Ciudad de México, en vivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-popocatepetl-volcano-mexico",
    name: { ja: "Popocatepetl Volcano, Mexico", en: "Popocatepetl Volcano, Mexico" },
    lat: 19.0224,
    lng: -98.6277,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "NI4v1OlIlZM",
      channelId: "UColBcWm6ybTbQnNuQS8JaKg",
      titleKey: "Volcán #Popocatépetl En Vivo | Vista Tlamacas, Estado de México",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-puebla-of-zaragoza-panorama-from-abov",
    name: { ja: "Puebla of Zaragoza Panorama from above, Mexico", en: "Puebla of Zaragoza Panorama from above, Mexico" },
    lat: 19.042,
    lng: -98.2111,
    timeZone: "America/Mexico_City",
    category: "city",
    country: "MX",
    source: {
      videoId: "v4sxmC9BxJE",
      channelId: "UCCejV-BYa_kTNBlsgeLtNVA",
      titleKey: "Puebla. Vista de los volcanes Popocatépetl e Iztaccíhuatl desde Hotel Holiday Inn Puebla",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "my-kuala-lumpur-petronas-twin-towers-mal",
    name: { ja: "Kuala Lumpur Petronas Twin Towers, Malaysia", en: "Kuala Lumpur Petronas Twin Towers, Malaysia" },
    lat: 3.1579,
    lng: 101.7116,
    timeZone: "Asia/Kuala_Lumpur",
    category: "city",
    country: "MY",
    source: {
      videoId: "U2ZznZRAfcQ",
      channelId: "UCccRvlLTX5E-FPM5XqTtrNg",
      titleKey: "5",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "my-kuala-lumpur-skyline-malaysia",
    name: { ja: "Kuala Lumpur Skyline, Malaysia", en: "Kuala Lumpur Skyline, Malaysia" },
    lat: 3.1579,
    lng: 101.7116,
    timeZone: "Asia/Kuala_Lumpur",
    category: "city",
    country: "MY",
    source: {
      videoId: "v8JLOgMy0KU",
      channelId: "UCfVBWzBee1rnmR8AhT2Esng",
      titleKey: "17",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "na-namibia-live-stream-at-the-okaukuejo",
    name: { ja: "Namibia: Live stream at the Okaukuejo waterhole in Etosha National Park, Namibia", en: "Namibia: Live stream at the Okaukuejo waterhole in Etosha National Park, Namibia" },
    lat: -18.9913,
    lng: 15.7461,
    timeZone: "Africa/Windhoek",
    category: "animal",
    country: "NA",
    source: {
      videoId: "AeMUdOPFcXI",
      channelId: "UC9X6gGKDv2yhMoofoeS7-Gg",
      titleKey: "Namibia: Live stream at the Okaukuejo waterhole in Etosha National Park, Namibia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "nl",
    name: { ja: "沖縄かりゆしビーチリゾート・オーシャンスパ ライブカメラ", en: "沖縄かりゆしビーチリゾート・オーシャンスパ ライブカメラ" },
    lat: 52.775,
    lng: 6.1472,
    timeZone: "Europe/Amsterdam",
    category: "city",
    country: "NL",
    source: {
      videoId: "AhQErfreEOE",
      channelId: "UCiVxzgxfn4OhuDygv5o5-mg",
      titleKey: "沖縄かりゆしビーチリゾート・オーシャンスパ ライブカメラ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-live-camera-axis-m1125",
    name: { ja: "Live Camera Axis M1125", en: "Live Camera Axis M1125" },
    lat: 60.0018,
    lng: 10.9816,
    timeZone: "Europe/Oslo",
    category: "nature",
    country: "NO",
    source: {
      videoId: "wIoKWDNPVlQ",
      channelId: "UCJ0y2sG32CqI5P-YMt_FCXg",
      titleKey: "Live Camera Axis M1125",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "nz-surveillancemap-live-sky-tower-and-au",
    name: { ja: "SurveillanceMap LIVE · Sky Tower and Auckland Harbour · New Zealand", en: "SurveillanceMap LIVE · Sky Tower and Auckland Harbour · New Zealand" },
    lat: -36.8485,
    lng: 174.7635,
    timeZone: "Pacific/Auckland",
    category: "harbor",
    country: "NZ",
    source: {
      videoId: "Ql7graq0I9M",
      channelId: "UCCm-nbbUP0Tx3JzEzeEVFTA",
      titleKey: "SurveillanceMap LIVE · Sky Tower and Auckland Harbour · New Zealand",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "nz-camview-wellington-airport-webcam-liv",
    name: { ja: "Camview: Wellington Airport Webcam Live Stream (Secondary 1080p)", en: "Camview: Wellington Airport Webcam Live Stream (Secondary 1080p)" },
    lat: -41.327,
    lng: 174.807,
    timeZone: "Pacific/Auckland",
    category: "airport",
    country: "NZ",
    source: {
      videoId: "v7xySvhug0Y",
      channelId: "UCwfkaPTACGouSdFvFdFf5Tg",
      titleKey: "Camview: Wellington Airport Webcam Live Stream (Secondary 1080p)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-live-camera-bankerohan-ly",
    name: { ja: "PHILIPPINES Live Camera Bankerohan Lyn's Food Haus, Davao City #philippines", en: "PHILIPPINES Live Camera Bankerohan Lyn's Food Haus, Davao City #philippines" },
    lat: 7.0672,
    lng: 125.6115,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "6kX0K9u3NTQ",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴 PHILIPPINES Live Camera Bankerohan Lyn's Food Haus, Davao City #philippines",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-live-camera-basketball-ba",
    name: { ja: "PHILIPPINES Live camera Basketball Barangay Hall Kapitan Tomas Monteverde, Agdao, Davao City", en: "PHILIPPINES Live camera Basketball Barangay Hall Kapitan Tomas Monteverde, Agdao, Davao City" },
    lat: 7.0906,
    lng: 125.6171,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "2iENQ0dDmqI",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴 PHILIPPINES Live camera Basketball Barangay Hall Kapitan Tomas Monteverde, Agdao, Davao City",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-live-camera-balut-siomai",
    name: { ja: "PHILIPPINES Live camera, Balut & Siomai street food, Davao City #philippines", en: "PHILIPPINES Live camera, Balut & Siomai street food, Davao City #philippines" },
    lat: 7.0874,
    lng: 125.6136,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "Gy4_7mPsuWA",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴PHILIPPINES Live camera, Balut & Siomai street food, Davao City #philippines",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-live-traffic-camera-leon",
    name: { ja: "PHILIPPINES Live traffic camera, Leon Garcia Street, Agdao, Davao City #philippines", en: "PHILIPPINES Live traffic camera, Leon Garcia Street, Agdao, Davao City #philippines" },
    lat: 7.0892,
    lng: 125.6093,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "FWvIPfxK5Jo",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴 PHILIPPINES Live traffic camera, Leon Garcia Street, Agdao, Davao City #philippines",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-street-view-live-camera-1",
    name: { ja: "PHILIPPINES Street View Live camera (1), Soliman Street, Agdao, Davao City #philippines #livestream", en: "PHILIPPINES Street View Live camera (1), Soliman Street, Agdao, Davao City #philippines #livestream" },
    lat: 7.0881,
    lng: 125.614,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "Far_aDIwAyw",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴PHILIPPINES Street View Live camera (1), Soliman Street, Agdao, Davao City #philippines #livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-live-cam-street-view-soli",
    name: { ja: "PHILIPPINES live Cam Street View, Soliman Street, Agdao, Davao City #philippines #livestream", en: "PHILIPPINES live Cam Street View, Soliman Street, Agdao, Davao City #philippines #livestream" },
    lat: 7.0888,
    lng: 125.6136,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "8ALC939509U",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴 PHILIPPINES live Cam Street View, Soliman Street, Agdao, Davao City #philippines #livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-live-street-view-camera-d",
    name: { ja: "Philippines Live street view camera Davao City, F Bangoy Street & Soliman Crossing, Agdao", en: "Philippines Live street view camera Davao City, F Bangoy Street & Soliman Crossing, Agdao" },
    lat: 7.0854,
    lng: 125.614,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "yznpQlk0exE",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴Philippines Live street view camera Davao City,  F Bangoy Street & Soliman Crossing, Agdao",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-maria-s-cam-9-rosemary-street-agdao-d",
    name: { ja: "Maria's Cam 9 ROSEMARY STREET AGDAO DAVAO CITY, PHILLIPPINES #philippines #davaocity", en: "Maria's Cam 9 ROSEMARY STREET AGDAO DAVAO CITY, PHILLIPPINES #philippines #davaocity" },
    lat: 7.0858,
    lng: 125.6152,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "lsLkrwlimbE",
      channelId: "UCZ6ZuSqeKrjFP7w9lS0nx0Q",
      titleKey: "Maria's Cam 9 ROSEMARY STREET AGDAO DAVAO CITY, PHILLIPPINES  #philippines #davaocity",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-maria-s-store-cam6-agdao-davao-city-p",
    name: { ja: "Maria's Store Cam6, Agdao Davao City, Philippines #philippines #davaocity", en: "Maria's Store Cam6, Agdao Davao City, Philippines #philippines #davaocity" },
    lat: 7.0869,
    lng: 125.6162,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "CmtuOVxcKRo",
      channelId: "UCZ6ZuSqeKrjFP7w9lS0nx0Q",
      titleKey: "Maria's Store Cam6, Agdao Davao City, Philippines  #philippines #davaocity",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-live-mayon-volcano-24-7-monitoring-so",
    name: { ja: "LIVE: Mayon Volcano 24/7 Monitoring — South‑Southwest IP Camera (Albay, Philippines)", en: "LIVE: Mayon Volcano 24/7 Monitoring — South‑Southwest IP Camera (Albay, Philippines)" },
    lat: 13.2455,
    lng: 123.6817,
    timeZone: "Asia/Manila",
    category: "nature",
    country: "PH",
    source: {
      videoId: "wLf3IMoxEWA",
      channelId: "UC4EG2ImxHX52O8_rTwVNxlA",
      titleKey: "🔴 LIVE: Mayon Volcano 24/7 Monitoring — South‑Southwest IP Camera (Albay, Philippines)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ph-philippines-street-view-live-camera-2",
    name: { ja: "PHILIPPINES Street View Live camera (2), Soliman Street, Agdao, Davao City #philippines #livestream", en: "PHILIPPINES Street View Live camera (2), Soliman Street, Agdao, Davao City #philippines #livestream" },
    lat: 7.0875,
    lng: 125.629,
    timeZone: "Asia/Manila",
    category: "city",
    country: "PH",
    source: {
      videoId: "DSRm7V_bsm8",
      channelId: "UC0djAWwMXP22wzocdJR9dWw",
      titleKey: "🔴PHILIPPINES Street View Live camera (2), Soliman Street, Agdao, Davao City #philippines #livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-el-gaucho-fisherman-s-village-bo",
    name: { ja: "LIVE El Gaucho Fisherman's Village Bophut | Koh Samui Beach Webcam | Thailand 24/7 | 2160p 4K", en: "LIVE El Gaucho Fisherman's Village Bophut | Koh Samui Beach Webcam | Thailand 24/7 | 2160p 4K" },
    lat: 9.5624,
    lng: 100.0247,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "CSp55hSd_6A",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 LIVE El Gaucho Fisherman's Village Bophut | Koh Samui Beach Webcam | Thailand 24/7 | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-el-gaucho-soi-11-sukhumvit-road-bangk",
    name: { ja: "El Gaucho | Soi 11 | Sukhumvit Road | Bangkok | Thailand | Live Street Webcam | 2160p 4K", en: "El Gaucho | Soi 11 | Sukhumvit Road | Bangkok | Thailand | Live Street Webcam | 2160p 4K" },
    lat: 13.741,
    lng: 100.556,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "UemFRPrl1hk",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 El Gaucho | Soi 11 | Sukhumvit Road | Bangkok | Thailand | Live Street Webcam | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-el-gaucho-soi-19-sukhumvit-road-bangk",
    name: { ja: "El Gaucho | Soi 19 | Sukhumvit Road | Bangkok | Thailand | Live Street Webcam | 2160p 4K", en: "El Gaucho | Soi 19 | Sukhumvit Road | Bangkok | Thailand | Live Street Webcam | 2160p 4K" },
    lat: 13.7375,
    lng: 100.5604,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "Q71sLS8h9a4",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 El Gaucho | Soi 19 | Sukhumvit Road | Bangkok | Thailand | Live Street Webcam | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-hush-bar-soi-green-mango-chaweng-koh",
    name: { ja: "Hush Bar | Soi Green Mango | Chaweng | Koh Samui | Thailand | Live Street Webcam", en: "Hush Bar | Soi Green Mango | Chaweng | Koh Samui | Thailand | Live Street Webcam" },
    lat: 9.531,
    lng: 100.06,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "DwKCna1mumk",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Hush Bar | Soi Green Mango | Chaweng | Koh Samui | Thailand | Live Street Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-crystal-bay-beach-resort-lamai-koh-sa",
    name: { ja: "Crystal Bay Beach Resort | Lamai | Koh Samui | Thailand | Live Beach Webcam | 2160p 4K", en: "Crystal Bay Beach Resort | Lamai | Koh Samui | Thailand | Live Beach Webcam | 2160p 4K" },
    lat: 9.4679,
    lng: 100.0567,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "Fw9hgttWzIg",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Crystal Bay Beach Resort | Lamai | Koh Samui | Thailand | Live Beach Webcam | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "tw-4k-taitung-jinzun-live-camera",
    name: { ja: "【4K】台東金樽 即時影像 Taitung Jinzun Live Camera", en: "【4K】台東金樽 即時影像 Taitung Jinzun Live Camera" },
    lat: 22.9553,
    lng: 121.2929,
    timeZone: "Asia/Taipei",
    category: "nature",
    country: "TW",
    source: {
      videoId: "q3KJt-SZc2s",
      channelId: "UCT4jEYvUdpdN9oUALaypGfQ",
      titleKey: "【4K】台東金樽 即時影像 Taitung Jinzun Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "tw-live-cam-shitiping-2160p",
    name: { ja: "【Live Cam】東海岸即時影像 - 石梯坪｜Shitiping｜石梯坪 2160p", en: "【Live Cam】東海岸即時影像 - 石梯坪｜Shitiping｜石梯坪 2160p" },
    lat: 24,
    lng: 121,
    timeZone: "Asia/Taipei",
    category: "nature",
    country: "TW",
    source: {
      videoId: "mXnigLvIL0Q",
      channelId: "UC5FiBoG6GcB5QqsiOsGe22A",
      titleKey: "【Live Cam】東海岸即時影像 - 石梯坪｜Shitiping｜石梯坪 2160p",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "tw-4k-live-camera-4k-taichung-wang-gao-l",
    name: { ja: "【4K Live Camera】台中望高寮4K即時影像｜Taichung Wang Gao Liao 4K Live Camera", en: "【4K Live Camera】台中望高寮4K即時影像｜Taichung Wang Gao Liao 4K Live Camera" },
    lat: 24.1477,
    lng: 120.6736,
    timeZone: "Asia/Taipei",
    category: "city",
    country: "TW",
    source: {
      videoId: "lhXXhDyjFtI",
      channelId: "UCSV_89hkpo3y_J1INMueN6A",
      titleKey: "【4K Live Camera】台中望高寮4K即時影像｜Taichung Wang Gao Liao 4K Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "tw-live-cam-torik-visitor-center-2160p",
    name: { ja: "【Live Cam】東海岸即時影像 - 都歷遊客中心｜Torik Visitor Center｜都歷ビジターセンター 2160p", en: "【Live Cam】東海岸即時影像 - 都歷遊客中心｜Torik Visitor Center｜都歷ビジターセンター 2160p" },
    lat: 22.7599,
    lng: 121.1446,
    timeZone: "Asia/Taipei",
    category: "nature",
    country: "TW",
    source: {
      videoId: "JhQuR77AR7U",
      channelId: "UC5FiBoG6GcB5QqsiOsGe22A",
      titleKey: "【Live Cam】東海岸即時影像 - 都歷遊客中心｜Torik Visitor Center｜都歷ビジターセンター 2160p",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "tw-4k-yongan-fishing-harbor-live-cam",
    name: { ja: "【4K】Yongan Fishing Harbor Live Cam 永安漁港即時影像", en: "【4K】Yongan Fishing Harbor Live Cam 永安漁港即時影像" },
    lat: 24.9937,
    lng: 121.297,
    timeZone: "Asia/Taipei",
    category: "harbor",
    country: "TW",
    source: {
      videoId: "tD_a03trUvE",
      channelId: "UCARB8y6PuoOBjZXJKIG-LDw",
      titleKey: "【4K】Yongan Fishing Harbor Live Cam 永安漁港即時影像",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-resorts-casino-hotel-beach-camera",
    name: { ja: "Resorts Casino Hotel Beach Camera", en: "Resorts Casino Hotel Beach Camera" },
    lat: 39.3642,
    lng: -74.4231,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "vVyBOU9Huvo",
      channelId: "UCjBTdlFa28vCjI6m9kIM7gA",
      titleKey: "Resorts Casino Hotel Beach Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-chicago-north-western-power-house-liv",
    name: { ja: "Chicago & North Western Power House Live Webcam (North) - Chicago, IL #SteelHighway", en: "Chicago & North Western Power House Live Webcam (North) - Chicago, IL #SteelHighway" },
    lat: 41.85,
    lng: -87.65,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "InQ0-b4DkCw",
      channelId: "UCJId-kbfsO5K4kU9cKE_TqA",
      titleKey: "Chicago & North Western Power House Live Webcam (North) - Chicago, IL  #SteelHighway",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-camera-axis-q6075-e",
    name: { ja: "Live Camera Axis Q6075-E", en: "Live Camera Axis Q6075-E" },
    lat: 27.9772,
    lng: -82.8279,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "2jgXAQTOAlw",
      channelId: "UCO2GE8hSiTUd96q5ER17bMA",
      titleKey: "Live Camera Axis Q6075-E",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-surf-camera-deerfield-beach-florida-u",
    name: { ja: "Surf Camera - Deerfield Beach, Florida USA", en: "Surf Camera - Deerfield Beach, Florida USA" },
    lat: 26.3184,
    lng: -80.0998,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "hIeFPNHfuoY",
      channelId: "UCGOxU-8iNOeoG3a337shXoA",
      titleKey: "Surf Camera - Deerfield Beach, Florida USA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-axis-q6358-le-ptz-network-camera",
    name: { ja: "Live AXIS Q6358-LE PTZ Network Camera at the Milwaukee AEC", en: "Live AXIS Q6358-LE PTZ Network Camera at the Milwaukee AEC" },
    lat: 43.0389,
    lng: -87.9065,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "ctrwip5GIb0",
      channelId: "UCk27XZ4bnNTtZKz2urL1HmQ",
      titleKey: "Live AXIS Q6358-LE PTZ Network Camera at the Milwaukee AEC",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-surveillancemap-live-los-angeles-lax",
    name: { ja: "SurveillanceMap LIVE · Los Angeles LAX · California, USA", en: "SurveillanceMap LIVE · Los Angeles LAX · California, USA" },
    lat: 40.7484,
    lng: -73.9856,
    timeZone: "America/New_York",
    category: "airport",
    country: "US",
    source: {
      videoId: "TdGXlEOxuOw",
      channelId: "UCCm-nbbUP0Tx3JzEzeEVFTA",
      titleKey: "SurveillanceMap LIVE · Los Angeles LAX · California, USA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-leavenworth-washington-live-webcam-fr",
    name: { ja: "Leavenworth Washington Live Webcam from Kris Kringl!", en: "Leavenworth Washington Live Webcam from Kris Kringl!" },
    lat: 47.5964,
    lng: -120.6595,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "TmtVbezZaqg",
      channelId: "UCza48nR27_AEYbIbwMCOoFQ",
      titleKey: "Leavenworth Washington Live Webcam from Kris Kringl!",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-galveston-texas-24-7-live-beach-camer",
    name: { ja: "Galveston, Texas | 24/7 Live Beach Camera", en: "Galveston, Texas | 24/7 Live Beach Camera" },
    lat: 29.3872,
    lng: -94.9927,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "HkHhXsWci7Q",
      channelId: "UCDmNmxF3ZVMeGyvWE9tOqPQ",
      titleKey: "Galveston, Texas | 24/7 Live Beach Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-gatlinburg-skypark-live-webcam",
    name: { ja: "Gatlinburg SkyPark Live Webcam", en: "Gatlinburg SkyPark Live Webcam" },
    lat: 35.7157,
    lng: -83.5201,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "teGLziUvDkI",
      channelId: "UC5XztD8QaQwqkrBb-RyGvbQ",
      titleKey: "Gatlinburg SkyPark Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-hermosa-beach-good-stuff-strand-cam-l",
    name: { ja: "Hermosa Beach Good Stuff Strand Cam. Live Camera Stream from Southern California", en: "Hermosa Beach Good Stuff Strand Cam. Live Camera Stream from Southern California" },
    lat: 38.6275,
    lng: -92.5666,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "Jwna-J3L0NM",
      channelId: "UCgJGxm_Pj2RX7R9L9NpelIA",
      titleKey: "Hermosa Beach Good Stuff Strand Cam. Live Camera Stream from Southern California",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-the-edge-hotel-clearwater-beach",
    name: { ja: "The Edge Hotel Clearwater Beach", en: "The Edge Hotel Clearwater Beach" },
    lat: 43.2881,
    lng: -77.7933,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "V7sUbjD_e3I",
      channelId: "UCxvYxKbb_9mUNxuLpJQgu5A",
      titleKey: "The Edge Hotel Clearwater Beach",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-beach-cam-hollywood-beach-broadw",
    name: { ja: "Live Beach Cam Hollywood Beach Broadwalk, Florida", en: "Live Beach Cam Hollywood Beach Broadwalk, Florida" },
    lat: 26.0195,
    lng: -80.1151,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "cmkAbDUEoyA",
      channelId: "UCVtTjaaajzCaWsMxHBmTIsA",
      titleKey: "Live Beach Cam Hollywood Beach Broadwalk, Florida",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-pszczyna-widok-na-rynek",
    name: { ja: "Pszczyna - widok na rynek", en: "Pszczyna - widok na rynek" },
    lat: 32.0805,
    lng: -81.0937,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "GakUUW9Anpo",
      channelId: "UCzQdo4UCx-oWrJ8Gsi9ZHvQ",
      titleKey: "Pszczyna - widok na rynek",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-miami-live-webcam-biscayne-bay-north",
    name: { ja: "Miami Live Webcam | Biscayne Bay North Waterfront Views 24/7 | Florida Live Cams", en: "Miami Live Webcam | Biscayne Bay North Waterfront Views 24/7 | Florida Live Cams" },
    lat: 25.7911,
    lng: -80.1869,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "5YCajRjvWCg",
      channelId: "UC5lNakfSdpqXCW214H5sBgQ",
      titleKey: "Miami Live Webcam | Biscayne Bay North Waterfront Views 24/7 | Florida Live Cams",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-miami-rail-cam-metrorail-transfe",
    name: { ja: "LIVE Miami Rail Cam | Metrorail Transfer Station | Trains 24/7", en: "LIVE Miami Rail Cam | Metrorail Transfer Station | Trains 24/7" },
    lat: 25.7743,
    lng: -80.1937,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "3Jy3jR0-58Y",
      channelId: "UC-8U3VCeOEqdPJd2D77RqKw",
      titleKey: "🔴 LIVE Miami Rail Cam | Metrorail Transfer Station | Trains 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-san-francisco-oakland-bay-bridge-live",
    name: { ja: "San Francisco-Oakland Bay Bridge Live Camera | 24/7 Stream", en: "San Francisco-Oakland Bay Bridge Live Camera | 24/7 Stream" },
    lat: 38.6275,
    lng: -92.5666,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "CXYr04BWvmc",
      channelId: "UCYUbNjkuE4lsr2v1Id2O1oA",
      titleKey: "San Francisco-Oakland Bay Bridge Live Camera | 24/7 Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-grand-marais-minnesota-harbor-cam-liv",
    name: { ja: "Grand Marais, Minnesota Harbor Cam Live Stream", en: "Grand Marais, Minnesota Harbor Cam Live Stream" },
    lat: 47.7494,
    lng: -90.3361,
    timeZone: "America/Chicago",
    category: "harbor",
    country: "US",
    source: {
      videoId: "n0H5FkWkjjs",
      channelId: "UCLOLrH5D-s7SxemqXgtoAgw",
      titleKey: "Grand Marais, Minnesota Harbor Cam Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-glen-hazel-hays-bald-eagle-camera-liv",
    name: { ja: "Glen Hazel (Hays) Bald Eagle Camera LIVE - Home of Mom & HM2", en: "Glen Hazel (Hays) Bald Eagle Camera LIVE - Home of Mom & HM2" },
    lat: 40.4406,
    lng: -79.9959,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "yPq9aNukckQ",
      channelId: "UC5lMzpZvCLpwyvu348B8zYw",
      titleKey: "Glen Hazel (Hays) Bald Eagle Camera LIVE - Home of Mom & HM2",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-siesta-key-beach-live",
    name: { ja: "SIESTA KEY BEACH - LIVE", en: "SIESTA KEY BEACH - LIVE" },
    lat: 27.2464,
    lng: -82.5357,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "NLhxcyzXQxM",
      channelId: "UCgPDwePWls1uuZx0109bWzg",
      titleKey: "SIESTA KEY BEACH - LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-stream-mclear-s-cottage-colony-c",
    name: { ja: "Live Stream — McLear’s Cottage Colony & Campground, Black Lake, NY", en: "Live Stream — McLear’s Cottage Colony & Campground, Black Lake, NY" },
    lat: 43.9462,
    lng: -76.1191,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "pJFDQ_wP4mk",
      channelId: "UCr7fDhVsKZw-Gayfgdl0jfg",
      titleKey: "Live Stream — McLear’s Cottage Colony & Campground, Black Lake, NY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-sea-isle-city-beach-patrol-webcam",
    name: { ja: "Sea Isle City Beach Patrol Webcam", en: "Sea Isle City Beach Patrol Webcam" },
    lat: 39.1534,
    lng: -74.6929,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "FYOGiFH60uM",
      channelId: "UC0BaUi4Ob9uA1qKsF6N8D6Q",
      titleKey: "Sea Isle City Beach Patrol Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-silver-bay-marina",
    name: { ja: "Silver Bay Marina", en: "Silver Bay Marina" },
    lat: 46.7822,
    lng: -92.098,
    timeZone: "America/Chicago",
    category: "harbor",
    country: "US",
    source: {
      videoId: "zTVWJ3Mc0Ag",
      channelId: "UCzkaQrI9-nSv373EvK5p0SQ",
      titleKey: "Silver Bay Marina",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-south-beach-camera-city-of-south",
    name: { ja: "Live South Beach Camera - City of South Haven on Lake Michigan", en: "Live South Beach Camera - City of South Haven on Lake Michigan" },
    lat: 42.4031,
    lng: -86.2736,
    timeZone: "America/Detroit",
    category: "nature",
    country: "US",
    source: {
      videoId: "G-tlKF32_p4",
      channelId: "UCODo53NEfcGzaUkCJ_spvuA",
      titleKey: "Live South Beach Camera - City of South Haven on Lake Michigan",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-uw-continuum-college-cam",
    name: { ja: "UW Continuum College Cam", en: "UW Continuum College Cam" },
    lat: 47.661,
    lng: -122.314,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "4cgSE12k9Sc",
      channelId: "UCHZoP1Jy-g_h3sqzScrOEwQ",
      titleKey: "UW Continuum College Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "vi-the-beach-bar-panorama-180o-cruz-bay",
    name: { ja: "The Beach Bar Panorama 180º Cruz Bay Beach Cam", en: "The Beach Bar Panorama 180º Cruz Bay Beach Cam" },
    lat: 18.3307,
    lng: -64.7941,
    timeZone: "America/St_Thomas",
    category: "nature",
    country: "VI",
    source: {
      videoId: "ZQ5OqjssArE",
      channelId: "UCPSSgJVH-ppHUfmdHXm55rQ",
      titleKey: "The Beach Bar Panorama 180º Cruz Bay Beach Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "vn-camera-cong-truong-nguyen-hue-a-nang",
    name: { ja: "Camera cổng trường Nguyễn Huệ Đà Nẵng", en: "Camera cổng trường Nguyễn Huệ Đà Nẵng" },
    lat: 16.06,
    lng: 108.22,
    timeZone: "Asia/Ho_Chi_Minh",
    category: "city",
    country: "VN",
    source: {
      videoId: "sJvEFrG0wq0",
      channelId: "UCr5Z4Oi3UFwkM6sLPFDC6QA",
      titleKey: "Camera cổng trường Nguyễn Huệ Đà Nẵng",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "at-wetter-panorama-24-7-live-stream-webc",
    name: { ja: "Wetter-Panorama – 24/7 LIVE Stream Webcams Österreich", en: "Wetter-Panorama – 24/7 LIVE Stream Webcams Österreich" },
    lat: 46.5433,
    lng: 14.1822,
    timeZone: "Europe/Vienna",
    category: "nature",
    country: "AT",
    source: {
      videoId: "NIuO6hrFTrg",
      channelId: "UC9xLSF0SZDbVa70iTpghQBw",
      titleKey: "🔴 Wetter-Panorama – 24/7 LIVE Stream Webcams Österreich",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "at-hallstatt-rainy-walk-in-europe-s-most",
    name: { ja: "Hallstatt - Rainy Walk in Europe’s Most Beautiful Village - Thunderstorm & Rain Ambience", en: "Hallstatt - Rainy Walk in Europe’s Most Beautiful Village - Thunderstorm & Rain Ambience" },
    lat: 47.5623,
    lng: 13.6491,
    timeZone: "Europe/Vienna",
    category: "city",
    country: "AT",
    source: {
      videoId: "AQB6dVt-t64",
      channelId: "UCeldhl2LRQRMz0bLSvGMYNg",
      titleKey: "Hallstatt - Rainy Walk in Europe’s Most Beautiful Village - Thunderstorm & Rain Ambience",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-tower-cam-falconcam-project-live",
    name: { ja: "Tower Cam - FalconCam Project LIVE", en: "Tower Cam - FalconCam Project LIVE" },
    lat: -38.3333,
    lng: 142.35,
    timeZone: "Australia/Melbourne",
    category: "animal",
    country: "AU",
    source: {
      videoId: "rQxrTGgNu4M",
      channelId: "UCNMulUCdUibAMPnaR1e0kEw",
      titleKey: "Tower Cam - FalconCam Project LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praia-do-forte-cabo-frio-ao-vivo-24h",
    name: { ja: "Praia do Forte – Cabo Frio AO VIVO 24h", en: "Praia do Forte – Cabo Frio AO VIVO 24h" },
    lat: -12.5774,
    lng: -38.0072,
    timeZone: "America/Bahia",
    category: "nature",
    country: "BR",
    source: {
      videoId: "jrleSsjuNqw",
      channelId: "UCBLHvdpCPy8J1acuXWu82tA",
      titleKey: "🔴 Praia do Forte – Cabo Frio AO VIVO 24h 🌊",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-rio-cai-montenegro-rio-acima-ao-vivo",
    name: { ja: "Rio Caí - Montenegro / \"rio acima\" - AO VIVO 24H【2026】", en: "Rio Caí - Montenegro / \"rio acima\" - AO VIVO 24H【2026】" },
    lat: -27.7302,
    lng: -49.4247,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "aEcqkd4puUw",
      channelId: "UC0T38EzZthvvGk8cf98GaXA",
      titleKey: "🔴Rio Caí - Montenegro / \"rio acima\" - AO VIVO 24H【2026】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-rio-cai-montenegro-rio-abaixo-ao-vivo",
    name: { ja: "Rio Caí - Montenegro / \"rio abaixo\" - AO VIVO 24H【2026】", en: "Rio Caí - Montenegro / \"rio abaixo\" - AO VIVO 24H【2026】" },
    lat: -27.7302,
    lng: -49.4247,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "MPvf9sJtg7A",
      channelId: "UC0T38EzZthvvGk8cf98GaXA",
      titleKey: "🔴Rio Caí - Montenegro / \"rio abaixo\" - AO VIVO 24H【2026】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-barra-sul-parque-u",
    name: { ja: "Balneário Camboriú - Barra Sul Parque Unipraias Câmera 24 horas com som ambiente", en: "Balneário Camboriú - Barra Sul Parque Unipraias Câmera 24 horas com som ambiente" },
    lat: -26.9906,
    lng: -48.6347,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "0nJHcJ8ELrM",
      channelId: "UCQnRFONVlt96xf5lYVr4Tzg",
      titleKey: "Balneário Camboriú - Barra Sul Parque Unipraias Câmera 24 horas com som ambiente",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-aparecida-do-taboado-ms-petiscaria-ma",
    name: { ja: "APARECIDA DO TABOADO-MS, Petiscaria Mania do Peixe (+55 67 98114-4719).", en: "APARECIDA DO TABOADO-MS, Petiscaria Mania do Peixe (+55 67 98114-4719)." },
    lat: -20.0867,
    lng: -51.0936,
    timeZone: "America/Campo_Grande",
    category: "nature",
    country: "BR",
    source: {
      videoId: "wSVcjl0edvM",
      channelId: "UC6NZjHRZXyRKsTy7GRY-fxA",
      titleKey: "APARECIDA DO TABOADO-MS,  Petiscaria Mania do Peixe (+55 67 98114-4719).",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-goioere-ao-vivo-cam-2-centro-moviment",
    name: { ja: "GOIOERÊ AO VIVO| CAM 2| Centro | Movimento na Av. Francisco Scarpari , agora !", en: "GOIOERÊ AO VIVO| CAM 2| Centro | Movimento na Av. Francisco Scarpari , agora !" },
    lat: -4.4833,
    lng: -41.5,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "MT9GLat65PM",
      channelId: "UCak21Edmz9LDZ_3-bl3TNyA",
      titleKey: "🔴 GOIOERÊ AO VIVO| CAM 2| Centro | Movimento na Av. Francisco Scarpari , agora !",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbkp-live-aeroporto-internacional-de",
    name: { ja: "SBKP LIVE - Aeroporto Internacional de Viracopos - VCP Airport - 13/07 Noite", en: "SBKP LIVE - Aeroporto Internacional de Viracopos - VCP Airport - 13/07 Noite" },
    lat: -23.0074,
    lng: -47.1345,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "XEuLZHhSv_0",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBKP LIVE - Aeroporto Internacional de Viracopos - VCP Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-pab-live-harbour-cam-24-7-tilley-cam",
    name: { ja: "PAB LIVE – Harbour Cam (24/7) | Tilley Cam | Port aux Basques, NL", en: "PAB LIVE – Harbour Cam (24/7) | Tilley Cam | Port aux Basques, NL" },
    lat: 48.3613,
    lng: -64.6072,
    timeZone: "America/Toronto",
    category: "harbor",
    country: "CA",
    source: {
      videoId: "WaLlhxa9vj4",
      channelId: "UColsEXIDErNkCQ2ooDFUwig",
      titleKey: "PAB LIVE – Harbour Cam (24/7) | Tilley Cam | Port aux Basques, NL",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-vancouver-live-cam-false-creek-skylin",
    name: { ja: "Vancouver Live Cam | False Creek, Skyline & Construction | Featured Views | 24/7", en: "Vancouver Live Cam | False Creek, Skyline & Construction | Featured Views | 24/7" },
    lat: 49.2497,
    lng: -123.1193,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "Mm_KgjdmWUc",
      channelId: "UC2pcJEiCB6pOSC8UCmyEdBw",
      titleKey: "🔴 Vancouver Live Cam | False Creek, Skyline & Construction | Featured Views | 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-sea-otter-cam-vancouver-aquarium",
    name: { ja: "Sea Otter Cam | Vancouver Aquarium", en: "Sea Otter Cam | Vancouver Aquarium" },
    lat: 51.3329,
    lng: -128.1366,
    timeZone: "America/Vancouver",
    category: "animal",
    country: "CA",
    source: {
      videoId: "9mg9PoFEX2U",
      channelId: "UCbzl-qtfTKY9QNgtnqmuyBw",
      titleKey: "Sea Otter Cam | Vancouver Aquarium",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-river-view-city-hall-brockville",
    name: { ja: "River View (City Hall, Brockville)", en: "River View (City Hall, Brockville)" },
    lat: 45.7557,
    lng: -65.0837,
    timeZone: "America/Moncton",
    category: "city",
    country: "CA",
    source: {
      videoId: "k36fwVlkzBM",
      channelId: "UCAkJrfAJYzMUuj5yNayflgQ",
      titleKey: "River View (City Hall, Brockville)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-vancouver-live-cam-yaletown-multi-cam",
    name: { ja: "Vancouver Live Cam | Yaletown Multi-Cam, Seawall, Skyline & Construction", en: "Vancouver Live Cam | Yaletown Multi-Cam, Seawall, Skyline & Construction" },
    lat: 49.2497,
    lng: -123.1193,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "A-aYQjV2AJ4",
      channelId: "UC2pcJEiCB6pOSC8UCmyEdBw",
      titleKey: "🔴 Vancouver Live Cam | Yaletown Multi-Cam, Seawall, Skyline & Construction",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-algonquin-park-live-webcam-ontario-ca",
    name: { ja: "Algonquin Park Live Webcam | Ontario, Canada | www.algonquinpark.on.ca", en: "Algonquin Park Live Webcam | Ontario, Canada | www.algonquinpark.on.ca" },
    lat: 45.5501,
    lng: -78.5829,
    timeZone: "America/Toronto",
    category: "nature",
    country: "CA",
    source: {
      videoId: "QX9OfclWZuM",
      channelId: "UCWnud9RdFRc8VXmVkHQrFxg",
      titleKey: "Algonquin Park Live Webcam | Ontario, Canada | www.algonquinpark.on.ca",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-ottawa-ontario-canada-live-camera",
    name: { ja: "Ottawa, Ontario, Canada LIVE Camera", en: "Ottawa, Ontario, Canada LIVE Camera" },
    lat: 45.4112,
    lng: -75.6981,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "lLYosWv_AwQ",
      channelId: "UC1EGNeWGS1DuCTKi-0X3kLQ",
      titleKey: "Ottawa, Ontario, Canada LIVE Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-plaza-cam",
    name: { ja: "Plaza Cam", en: "Plaza Cam" },
    lat: 49.3303,
    lng: -122.8095,
    timeZone: "America/Vancouver",
    category: "nature",
    country: "CA",
    source: {
      videoId: "OSKgIDnBwwQ",
      channelId: "UC-uxDgQtxMdsFbq9ILuBpqg",
      titleKey: "Plaza Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-revelstoke-british-columbia-canada-li",
    name: { ja: "Revelstoke, British Columbia, Canada | LIVE Train Camera (PTZ)", en: "Revelstoke, British Columbia, Canada | LIVE Train Camera (PTZ)" },
    lat: 50.9971,
    lng: -118.1953,
    timeZone: "America/Vancouver",
    category: "railway",
    country: "CA",
    source: {
      videoId: "fIMbMz2P7Bs",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Revelstoke, British Columbia, Canada | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-ottawa-live-camera-canada",
    name: { ja: "Ottawa LIVE Camera | Canada", en: "Ottawa LIVE Camera | Canada" },
    lat: 45.4112,
    lng: -75.6981,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "ygedW8Q-pOc",
      channelId: "UCOfb9L-R8gwfmBgy9PO23CQ",
      titleKey: "Ottawa LIVE Camera | Canada",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-port-valais-webcam-live",
    name: { ja: "Port-Valais Webcam Live", en: "Port-Valais Webcam Live" },
    lat: 47.1145,
    lng: 7.2602,
    timeZone: "Europe/Zurich",
    category: "harbor",
    country: "CH",
    source: {
      videoId: "Du8kmgjsOew",
      channelId: "UCDOREphwc9P-ul7YEHiBWqw",
      titleKey: "Port-Valais Webcam Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cn-4k-walking-tour-huawei-experience-sto",
    name: { ja: "4K Walking tour | Huawei experience store | guangzhou | 华为体验店 | 徒步旅行", en: "4K Walking tour | Huawei experience store | guangzhou | 华为体验店 | 徒步旅行" },
    lat: 23.1167,
    lng: 113.25,
    timeZone: "Asia/Shanghai",
    category: "city",
    country: "CN",
    source: {
      videoId: "3j_UD7iIYBA",
      channelId: "UCpl7XKzoMxUa9noUrJw81Bw",
      titleKey: "4K Walking tour | Huawei experience store | guangzhou | 华为体验店 | 徒步旅行",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cn-hiking-chongqing-banshanyaxian-4k",
    name: { ja: "徒步重庆半山崖线｜Hiking ChongQing BanShanYaXian｜治愈｜城市｜4K", en: "徒步重庆半山崖线｜Hiking ChongQing BanShanYaXian｜治愈｜城市｜4K" },
    lat: 29.3,
    lng: 90,
    timeZone: "Asia/Shanghai",
    category: "city",
    country: "CN",
    source: {
      videoId: "RIJ4WExW6IQ",
      channelId: "UC2fE1SdTPSst253QGNhNtbQ",
      titleKey: "徒步重庆半山崖线｜Hiking ChongQing BanShanYaXian｜治愈｜城市｜4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-avila-beach-hotel-curacao-live-cam-2",
    name: { ja: "Avila Beach Hotel | Curacao ️ | LIVE Cam 2", en: "Avila Beach Hotel | Curacao ️ | LIVE Cam 2" },
    lat: 12.1819,
    lng: -68.9925,
    timeZone: "America/Curacao",
    category: "nature",
    country: "CW",
    source: {
      videoId: "47Ze6Cp3CWQ",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🏨 Avila Beach Hotel | Curacao 🌴☀️ | LIVE Cam 2",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-4k-live-cam-avila-beach-hotel-curacao",
    name: { ja: "4K LIVE Cam Avila Beach Hotel | Curacao ️", en: "4K LIVE Cam Avila Beach Hotel | Curacao ️" },
    lat: 12.1819,
    lng: -68.9925,
    timeZone: "America/Curacao",
    category: "nature",
    country: "CW",
    source: {
      videoId: "bHmaUXTOvqw",
      channelId: "UCSHwCNRilXecQxXHyXW4Pow",
      titleKey: "4K LIVE Cam Avila Beach Hotel | Curacao 🌴☀️",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-lionsdive-beach-resort-mambo-beach-cu",
    name: { ja: "LionsDive Beach Resort | Mambo Beach | Curaçao | LIVE Cam", en: "LionsDive Beach Resort | Mambo Beach | Curaçao | LIVE Cam" },
    lat: 12.1667,
    lng: -68.9667,
    timeZone: "America/Curacao",
    category: "city",
    country: "CW",
    source: {
      videoId: "loHbMM9JfCs",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🌴 LionsDive Beach Resort | Mambo Beach | Curaçao | LIVE Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-royal-sea-aquarium-resort-curacao-liv",
    name: { ja: "Royal Sea Aquarium Resort | Curacao | LIVE Cam", en: "Royal Sea Aquarium Resort | Curacao | LIVE Cam" },
    lat: 12.1667,
    lng: -68.9667,
    timeZone: "America/Curacao",
    category: "city",
    country: "CW",
    source: {
      videoId: "IAkRcsPDO8w",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🌴 Royal Sea Aquarium Resort | Curacao | LIVE Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cw-avila-beach-hotel-curacao-live-cam-1",
    name: { ja: "Avila Beach Hotel | Curacao ️ | LIVE Cam 1", en: "Avila Beach Hotel | Curacao ️ | LIVE Cam 1" },
    lat: 12.1819,
    lng: -68.9925,
    timeZone: "America/Curacao",
    category: "city",
    country: "CW",
    source: {
      videoId: "-oiR7FxcwYU",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🏨 Avila Beach Hotel | Curacao 🌴☀️ | LIVE Cam 1",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-berlin-live-webcam-24-7-germany-berli",
    name: { ja: "Berlin Live Webcam 24/7 - Germany, Berlin, Frankfurter Tor / Karl-Marx-Allee", en: "Berlin Live Webcam 24/7 - Germany, Berlin, Frankfurter Tor / Karl-Marx-Allee" },
    lat: 52.5244,
    lng: 13.4105,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "_pJAwwlzM7I",
      channelId: "UCCGO5Ox7t3Rnk1FfXghso-Q",
      titleKey: "🔴 Berlin Live Webcam 24/7 - Germany, Berlin, Frankfurter Tor / Karl-Marx-Allee",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-webcam-rathaus-bad-langensalza",
    name: { ja: "Webcam Rathaus Bad Langensalza", en: "Webcam Rathaus Bad Langensalza" },
    lat: 51.1077,
    lng: 10.646,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "huTfRXMDFTk",
      channelId: "UCl437nom9DaswoxrhxTRgSw",
      titleKey: "Webcam Rathaus Bad Langensalza",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-webcam-baden-baden",
    name: { ja: "Webcam Baden-Baden", en: "Webcam Baden-Baden" },
    lat: 48.7606,
    lng: 8.2398,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "JBKs0WYlbHQ",
      channelId: "UCK_2jzTMkgBMalwh49VFh1Q",
      titleKey: "Webcam Baden-Baden",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-vollbremsung-wegen-uberholer-roadrage",
    name: { ja: "Vollbremsung wegen Überholer! & #roadrage mit S Klasse | #131 Dashcam Compilation Berlin | Germany", en: "Vollbremsung wegen Überholer! & #roadrage mit S Klasse | #131 Dashcam Compilation Berlin | Germany" },
    lat: 51.5,
    lng: 10.5,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "LtKTOcLBJq4",
      channelId: "UC3SkxJol1i26lgGLvkdIs_Q",
      titleKey: "Vollbremsung wegen Überholer! & #roadrage mit S Klasse | #131 Dashcam Compilation Berlin | Germany",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-taxi-fahrt-komplett-im-gegenverkehr-w",
    name: { ja: "Taxi fährt komplett im Gegenverkehr & wilde Spurwechsel | #132 Dashcam Compilation Berlin | Germany", en: "Taxi fährt komplett im Gegenverkehr & wilde Spurwechsel | #132 Dashcam Compilation Berlin | Germany" },
    lat: 51.5,
    lng: 10.5,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "01xb_l1K_KE",
      channelId: "UC3SkxJol1i26lgGLvkdIs_Q",
      titleKey: "Taxi fährt komplett im Gegenverkehr & wilde Spurwechsel | #132 Dashcam Compilation Berlin | Germany",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-bauhaus-archiv-baustelle-construction",
    name: { ja: "Bauhaus-Archiv | Baustelle / Construction site | Live-Stream", en: "Bauhaus-Archiv | Baustelle / Construction site | Live-Stream" },
    lat: 50.9929,
    lng: 9.9434,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "swATp4lDNFs",
      channelId: "UCOITdkzFFp0icU9eV4_AOjA",
      titleKey: "Bauhaus-Archiv | Baustelle / Construction site | Live-Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-bremen-webcam-weserblick",
    name: { ja: "Bremen Webcam --- Weserblick", en: "Bremen Webcam --- Weserblick" },
    lat: 53.0758,
    lng: 8.8072,
    timeZone: "Europe/Berlin",
    category: "nature",
    country: "DE",
    source: {
      videoId: "H1Uk1LMkbQA",
      channelId: "UCwoFc3WD54Kz67h99GauhUA",
      titleKey: "Bremen Webcam --- Weserblick",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-storch-cam",
    name: { ja: "Storch-Cam", en: "Storch-Cam" },
    lat: 51.2231,
    lng: 14.3006,
    timeZone: "Europe/Berlin",
    category: "animal",
    country: "DE",
    source: {
      videoId: "IuTBwO8lSog",
      channelId: "UCxT83Znre5cjWYoK5MflBeg",
      titleKey: "Storch-Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-bremen-webcam-weser-stadion",
    name: { ja: "Bremen Webcam - Weser Stadion", en: "Bremen Webcam - Weser Stadion" },
    lat: 53.0758,
    lng: 8.8072,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "rlj8zl6dr48",
      channelId: "UCwoFc3WD54Kz67h99GauhUA",
      titleKey: "Bremen Webcam - Weser Stadion",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-kirchturm-cam",
    name: { ja: "Kirchturm-Cam", en: "Kirchturm-Cam" },
    lat: 47.4139,
    lng: 11.0314,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "sCTxVD51vzE",
      channelId: "UCxT83Znre5cjWYoK5MflBeg",
      titleKey: "Kirchturm-Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-live-cala-fornells-pt",
    name: { ja: "Mallorca Webcam LIVE – Cala Fornells | PTZ 24/7 | Beach & Sea Views ️#mallorca #livestream", en: "Mallorca Webcam LIVE – Cala Fornells | PTZ 24/7 | Beach & Sea Views ️#mallorca #livestream" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "H4wViam8ERA",
      channelId: "UCe5o5VIs9avmljPs_pJCHtQ",
      titleKey: "🌞 Mallorca Webcam LIVE – Cala Fornells | PTZ 24/7 | Beach & Sea Views 🌤️#mallorca  #livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-webcam-tossa-de-mar-girona",
    name: { ja: "Webcam Tossa de Mar (Girona)", en: "Webcam Tossa de Mar (Girona)" },
    lat: 41.7167,
    lng: 2.9333,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "nWFcWooDAxI",
      channelId: "UCYzsBi6s5pIWQO-DpLMWkFA",
      titleKey: "Webcam Tossa de Mar (Girona)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-live-cala-vinyes-sol",
    name: { ja: "Mallorca Webcam LIVE Cala Vinyes – Sol de Mallorca | Three Fingers Bay #mallorca #live #livestream", en: "Mallorca Webcam LIVE Cala Vinyes – Sol de Mallorca | Three Fingers Bay #mallorca #live #livestream" },
    lat: 39.4809,
    lng: 2.5251,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "zNyiX12NcrQ",
      channelId: "UCe5o5VIs9avmljPs_pJCHtQ",
      titleKey: "🌞 Mallorca Webcam LIVE Cala Vinyes – Sol de Mallorca | Three Fingers Bay #mallorca #live #livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-live-webcam-24-7-pacific-bay",
    name: { ja: "Mallorca Live Webcam 24/7 Pacific Bay Restaurant | Sea View #MallorcaLive #BeachCam #LiveCam", en: "Mallorca Live Webcam 24/7 Pacific Bay Restaurant | Sea View #MallorcaLive #BeachCam #LiveCam" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "jG5h0Lq8lwc",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞Mallorca Live Webcam 24/7 🌊 Pacific Bay Restaurant | Sea View #MallorcaLive #BeachCam #LiveCam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-live-mallorca-port-airport-city-beach",
    name: { ja: "LIVE MALLORCA – PORT | AIRPORT | CITY | BEACH", en: "LIVE MALLORCA – PORT | AIRPORT | CITY | BEACH" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "hRw1_JQMQoE",
      channelId: "UCnZLvSnB-MLeJBRlfGL54Hw",
      titleKey: "LIVE MALLORCA – PORT | AIRPORT | CITY | BEACH",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-extreme-thunderstorm-port-andratx-lig",
    name: { ja: "Extreme Thunderstorm Port Andratx ️ Lightning, Heavy Rain & Strong Winds in Mallorca", en: "Extreme Thunderstorm Port Andratx ️ Lightning, Heavy Rain & Strong Winds in Mallorca" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "E1O9C7nNz0w",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "Extreme Thunderstorm Port Andratx 🌩️ Lightning, Heavy Rain & Strong Winds in Mallorca",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-live-lanzarote-airport-webcam-24-7",
    name: { ja: "LIVE Lanzarote Airport – Webcam 24/7", en: "LIVE Lanzarote Airport – Webcam 24/7" },
    lat: 28.9503,
    lng: -13.6056,
    timeZone: "Atlantic/Canary",
    category: "airport",
    country: "ES",
    source: {
      videoId: "hEpaqvnButc",
      channelId: "UCnZLvSnB-MLeJBRlfGL54Hw",
      titleKey: "LIVE Lanzarote Airport – Webcam 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-live-webcam-las-palmas-port-canary-is",
    name: { ja: "LIVE WEBCAM LAS PALMAS PORT | CANARY ISLANDS", en: "LIVE WEBCAM LAS PALMAS PORT | CANARY ISLANDS" },
    lat: 28,
    lng: -15.5,
    timeZone: "Atlantic/Canary",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "HYAfFvdRvdA",
      channelId: "UCnZLvSnB-MLeJBRlfGL54Hw",
      titleKey: "LIVE WEBCAM LAS PALMAS PORT | CANARY ISLANDS",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-camp-de-mar-beach-liv",
    name: { ja: "Mallorca Webcam Camp de Mar Beach Live 24/7 4K UHD #balearicislands #Sunset #Travel #beachvibes", en: "Mallorca Webcam Camp de Mar Beach Live 24/7 4K UHD #balearicislands #Sunset #Travel #beachvibes" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "AtHeW1Eut7s",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞 Mallorca Webcam Camp de Mar Beach Live 24/7 4K UHD #balearicislands #Sunset #Travel #beachvibes",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-playa-5-peguera-beach",
    name: { ja: "Mallorca Webcam Playa 5, Peguera Beach & Restaurant Views 24/7 #Mallorca #Livestream #summer", en: "Mallorca Webcam Playa 5, Peguera Beach & Restaurant Views 24/7 #Mallorca #Livestream #summer" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "otI3wxSgXNc",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞Mallorca Webcam Playa 5, Peguera Beach & Restaurant Views 24/7 🌴 #Mallorca #Livestream #summer",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-playa-palmira-rendezv",
    name: { ja: "Mallorca Webcam Playa Palmira / Rendezvous Garden Paguera | 4K | #Balearics #Mallorca #Livestream", en: "Mallorca Webcam Playa Palmira / Rendezvous Garden Paguera | 4K | #Balearics #Mallorca #Livestream" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "Xlw0je0q-kk",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞🌊 Mallorca Webcam Playa Palmira / Rendezvous Garden Paguera | 4K | #Balearics #Mallorca #Livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-port-adriano-el-toro",
    name: { ja: "Mallorca Webcam Port Adriano El Toro | 4K UHD | #Mallorca #Livestream #Balearics #Weather #beach", en: "Mallorca Webcam Port Adriano El Toro | 4K UHD | #Mallorca #Livestream #Balearics #Weather #beach" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "AeFSWxScJ8c",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞 Mallorca Webcam Port Adriano El Toro | 4K UHD |  #Mallorca #Livestream #Balearics #Weather #beach",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-sant-elm-beach-live-4",
    name: { ja: "️ Mallorca Webcam Sant Elm Beach LIVE 4K – Sa Dragonera • 24/7 #livestream #beachlive #beach", en: "️ Mallorca Webcam Sant Elm Beach LIVE 4K – Sa Dragonera • 24/7 #livestream #beachlive #beach" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "9svQ7gvPGc0",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🏖️  Mallorca Webcam Sant Elm Beach LIVE 4K – Sa Dragonera • 24/7 #livestream  #beachlive #beach",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-port-d-andratx-house",
    name: { ja: "Mallorca Webcam Port d’Andratx – House of Sunset 24/7 4K UHD #PortAndratx #weather #livestream", en: "Mallorca Webcam Port d’Andratx – House of Sunset 24/7 4K UHD #PortAndratx #weather #livestream" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "harbor",
    country: "ES",
    source: {
      videoId: "MqVlAR3L2Q4",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌅 Mallorca Webcam Port d’Andratx – House of Sunset 24/7  4K UHD 🌊 #PortAndratx #weather  #livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-playa-palmira-ren-2",
    name: { ja: "Mallorca Webcam Playa Palmira Rendezvous Garden Paguera 4K 180° #Balearics #Mallorca #Livestream", en: "Mallorca Webcam Playa Palmira Rendezvous Garden Paguera 4K 180° #Balearics #Mallorca #Livestream" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "DM9VFnG7T1o",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞 🌊 Mallorca Webcam Playa Palmira Rendezvous Garden Paguera 4K 180° #Balearics #Mallorca #Livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-4k-uhd-tora-beach-pag",
    name: { ja: "Mallorca Webcam 4K UHD Tora Beach Paguera 24/7 Mar y Mar Restaurant #Livestream #mallorcawebcam", en: "Mallorca Webcam 4K UHD Tora Beach Paguera 24/7 Mar y Mar Restaurant #Livestream #mallorcawebcam" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "Pgjsoeq7iGM",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞 🌊 Mallorca Webcam 4K UHD Tora Beach Paguera 24/7 Mar y Mar Restaurant #Livestream #mallorcawebcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-mallorca-webcam-paguera-cala-fornells",
    name: { ja: "Mallorca Webcam Paguera Cala Fornells | 4K UHD | 24/7 Stream | #Mallorca #Calvia #Balearics", en: "Mallorca Webcam Paguera Cala Fornells | 4K UHD | 24/7 Stream | #Mallorca #Calvia #Balearics" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "4VAvvsBeV9Y",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "🌞 Mallorca Webcam Paguera Cala Fornells | 4K UHD | 24/7 Stream |  #Mallorca #Calvia #Balearics",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "es-massive-thunderstorm-in-paguera-heavy",
    name: { ja: "Massive Thunderstorm in Paguera ️ Heavy Rain, Strong Winds & Lightning Show", en: "Massive Thunderstorm in Paguera ️ Heavy Rain, Strong Winds & Lightning Show" },
    lat: 39.6078,
    lng: 3.012,
    timeZone: "Europe/Madrid",
    category: "nature",
    country: "ES",
    source: {
      videoId: "7kAYyr0HVuo",
      channelId: "UCH6yrzWLfdQUyA5wwYSVjHA",
      titleKey: "Massive Thunderstorm in Paguera 🌩️ Heavy Rain, Strong Winds & Lightning Show",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-kylanakyma-village-view-levi-ski-reso",
    name: { ja: "Kylänäkymä / Village view | Levi Ski Resort | Finland", en: "Kylänäkymä / Village view | Levi Ski Resort | Finland" },
    lat: 64,
    lng: 26,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "X7tdyNFpp1g",
      channelId: "UC1HDQ1Q5nVHYF8e7dL4E-pw",
      titleKey: "Kylänäkymä / Village view | Levi Ski Resort | Finland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-gondoli-ala-asema-lower-station-levi",
    name: { ja: "Gondoli ala-asema/Lower station | Levi Ski Resort | Finland", en: "Gondoli ala-asema/Lower station | Levi Ski Resort | Finland" },
    lat: 64,
    lng: 26,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "gehi4YiVYdY",
      channelId: "UC1HDQ1Q5nVHYF8e7dL4E-pw",
      titleKey: "Gondoli ala-asema/Lower station | Levi Ski Resort | Finland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-levin-seikkailupuisto-adventure-park",
    name: { ja: "Levin Seikkailupuisto / Adventure Park Levi | Levi Ski Resort | Finland", en: "Levin Seikkailupuisto / Adventure Park Levi | Levi Ski Resort | Finland" },
    lat: 64,
    lng: 26,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "ucfAqkh8c50",
      channelId: "UC1HDQ1Q5nVHYF8e7dL4E-pw",
      titleKey: "Levin Seikkailupuisto / Adventure Park Levi | Levi Ski Resort | Finland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-south-point-levi-levi-ski-resort-finl",
    name: { ja: "South Point Levi | Levi Ski Resort | Finland", en: "South Point Levi | Levi Ski Resort | Finland" },
    lat: 64,
    lng: 26,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "89vRm9bb9_c",
      channelId: "UC1HDQ1Q5nVHYF8e7dL4E-pw",
      titleKey: "South Point Levi | Levi Ski Resort | Finland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fi-levi-glacier-express-lift-and-slopes",
    name: { ja: "Levi Glacier Express lift and slopes | Levi Ski Resort | Finland", en: "Levi Glacier Express lift and slopes | Levi Ski Resort | Finland" },
    lat: 64,
    lng: 26,
    timeZone: "Europe/Helsinki",
    category: "city",
    country: "FI",
    source: {
      videoId: "Wr9b5aYA4mI",
      channelId: "UC1HDQ1Q5nVHYF8e7dL4E-pw",
      titleKey: "Levi Glacier Express lift and slopes | Levi Ski Resort | Finland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-le-havre-port-et-muma",
    name: { ja: "Webcam Le Havre - Port et MUMA", en: "Webcam Le Havre - Port et MUMA" },
    lat: 49.4935,
    lng: 0.1079,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "wHWL7lDnChY",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Le Havre - Port et MUMA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-noirmoutier-la-chaloupe",
    name: { ja: "Webcam Noirmoutier - La Chaloupe", en: "Webcam Noirmoutier - La Chaloupe" },
    lat: 46.9923,
    lng: -2.2583,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "Pj84-0bRazs",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Noirmoutier - La Chaloupe",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-trouville-sur-mer-le-port",
    name: { ja: "Webcam Trouville-sur-Mer - Le Port", en: "Webcam Trouville-sur-Mer - Le Port" },
    lat: 49.4193,
    lng: 0.5776,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "igv2OEZVtzo",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Trouville-sur-Mer - Le Port",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-luc-sur-mer",
    name: { ja: "Webcam Luc-sur-Mer", en: "Webcam Luc-sur-Mer" },
    lat: 49.3145,
    lng: -0.355,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "LZP48Tt9zeA",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Luc-sur-Mer",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-live-webcam-cannes-boulevard-du-midi",
    name: { ja: "LIVE WEBCAM CANNES - Boulevard du Midi", en: "LIVE WEBCAM CANNES - Boulevard du Midi" },
    lat: 43.5513,
    lng: 7.0127,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "z6BNMoj9Pyo",
      channelId: "UCZqr-kHlRzGyCgh7BHksSAw",
      titleKey: "🔴 LIVE WEBCAM CANNES - Boulevard du Midi",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-saint-malo-en-4k-les-thermes-m",
    name: { ja: "Webcam Saint-Malo en 4K - Les Thermes Marins", en: "Webcam Saint-Malo en 4K - Les Thermes Marins" },
    lat: 45.4339,
    lng: 4.39,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "VNOV8KgGR0c",
      channelId: "UC6wpfUpXKW13Uc1Yx8tFCcg",
      titleKey: "Webcam Saint-Malo en 4K - Les Thermes Marins",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-mornac-sur-seudre",
    name: { ja: "Webcam Mornac-sur-Seudre", en: "Webcam Mornac-sur-Seudre" },
    lat: 45.7097,
    lng: -1.0291,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "CeWhfDliulQ",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Mornac-sur-Seudre",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-saint-germain-sur-ay-en-direct-webcam",
    name: { ja: "SAINT-GERMAIN-SUR-AY EN DIRECT – Webcam LIVE plage, mer & météo en Normandie", en: "SAINT-GERMAIN-SUR-AY EN DIRECT – Webcam LIVE plage, mer & météo en Normandie" },
    lat: 45.4339,
    lng: 4.39,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "ZlMwj15RHnU",
      channelId: "UC7FuNS4x4F7ZKebegdKaVQg",
      titleKey: "🌊 SAINT-GERMAIN-SUR-AY EN DIRECT – Webcam LIVE plage, mer & météo en Normandie",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-brest-hotel-de-ville",
    name: { ja: "Webcam Brest - Hôtel de Ville", en: "Webcam Brest - Hôtel de Ville" },
    lat: 48.3903,
    lng: -4.4863,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "SZmbvyfbPbg",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Brest - Hôtel de Ville",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-le-lavandou-plage-de-la-fosset",
    name: { ja: "webcam Le Lavandou - Plage de La Fossette", en: "webcam Le Lavandou - Plage de La Fossette" },
    lat: 43.137,
    lng: 6.366,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "ddusGpSgUfY",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "webcam Le Lavandou - Plage de La Fossette",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-ajaccio",
    name: { ja: "Webcam Ajaccio", en: "Webcam Ajaccio" },
    lat: 41.9189,
    lng: 8.7381,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "effQzzJ6-1E",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Ajaccio",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-live-webcam-cannes-palm-beach",
    name: { ja: "LIVE WEBCAM CANNES - Palm Beach", en: "LIVE WEBCAM CANNES - Palm Beach" },
    lat: 43.5513,
    lng: 7.0127,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "8cff6yAO9bw",
      channelId: "UCy0okReXHfEcszSDHGyPcFg",
      titleKey: "🔴 LIVE WEBCAM CANNES - Palm Beach",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-saint-aubin",
    name: { ja: "Webcam Saint-Aubin", en: "Webcam Saint-Aubin" },
    lat: 49.3036,
    lng: 1.0106,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "nr0jFa7mKQE",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Saint-Aubin",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-4k-paris-2025-1-hour-aerial-drone-rel",
    name: { ja: "[4K] PARIS 2025 🇫🇷 1 Hour Aerial Drone Relaxation Film UHD | FRANCE", en: "[4K] PARIS 2025 🇫🇷 1 Hour Aerial Drone Relaxation Film UHD | FRANCE" },
    lat: 46,
    lng: 2,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "WHNNHAoaZD4",
      channelId: "UCqpzY0_0ucWZQ8_LPGDxFtQ",
      titleKey: "[4K] PARIS 2025 🇫🇷 1 Hour Aerial Drone Relaxation Film UHD | FRANCE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-cabourg-pavillon-charles-bertr",
    name: { ja: "Webcam Cabourg - Pavillon Charles Bertrand", en: "Webcam Cabourg - Pavillon Charles Bertrand" },
    lat: 49.2911,
    lng: -0.1133,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "RZTjHwmeni8",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Cabourg - Pavillon Charles Bertrand",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-saint-valery-en-caux-plage",
    name: { ja: "Webcam Saint-Valery-en-Caux - Plage", en: "Webcam Saint-Valery-en-Caux - Plage" },
    lat: 45.4339,
    lng: 4.39,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "FAXbLsgvMNg",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Saint-Valery-en-Caux - Plage",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-albi-la-mascrabiere",
    name: { ja: "Webcam Albi - La Mascrabière", en: "Webcam Albi - La Mascrabière" },
    lat: 43.9298,
    lng: 2.148,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "Zv2IO-E-2hc",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Albi - La Mascrabière",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-merquel",
    name: { ja: "Webcam Merquel", en: "Webcam Merquel" },
    lat: 47.9124,
    lng: -1.5054,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "wpTiVBUlAXw",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Merquel",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-arc-sous-cicon",
    name: { ja: "Webcam Arc-sous-Cicon", en: "Webcam Arc-sous-Cicon" },
    lat: 47.051,
    lng: 6.3799,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "oB7cQhDW2xs",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Arc-sous-Cicon",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-pornichet-la-baule-la-maison-r",
    name: { ja: "Webcam Pornichet - La Baule - La maison Régent, appartements hôteliers ****", en: "Webcam Pornichet - La Baule - La maison Régent, appartements hôteliers ****" },
    lat: 47.2668,
    lng: -2.3379,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "Rst3kvq9B8Y",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Pornichet - La Baule - La maison Régent, appartements hôteliers ****",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-villelaure",
    name: { ja: "Webcam Villelaure", en: "Webcam Villelaure" },
    lat: 43.7107,
    lng: 5.4342,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "RvqT-vEwNd4",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Villelaure",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-gourette-front-de-neige",
    name: { ja: "Webcam Gourette - Front de Neige", en: "Webcam Gourette - Front de Neige" },
    lat: 42.9667,
    lng: -0.3333,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "EjEmf1TLXVk",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Gourette - Front de Neige",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-saint-quay-portrieux",
    name: { ja: "Webcam Saint-Quay-Portrieux", en: "Webcam Saint-Quay-Portrieux" },
    lat: 48.6516,
    lng: -2.8318,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "lWPgeICToUk",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Saint-Quay-Portrieux",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-fecamp",
    name: { ja: "Webcam Fécamp", en: "Webcam Fécamp" },
    lat: 49.7579,
    lng: 0.3746,
    timeZone: "Europe/Paris",
    category: "harbor",
    country: "FR",
    source: {
      videoId: "30hMtF2swvE",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Fécamp",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-webcam-saint-veran-centre-village",
    name: { ja: "Webcam Saint-Véran - Centre Village", en: "Webcam Saint-Véran - Centre Village" },
    lat: 45.4339,
    lng: 4.39,
    timeZone: "Europe/Paris",
    category: "city",
    country: "FR",
    source: {
      videoId: "hoN9su9T-G4",
      channelId: "UCfkbmwi67lrETUqnOmf-Hqw",
      titleKey: "Webcam Saint-Véran - Centre Village",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "fr-fort-mahon-plage-webcam-en-direct-4k",
    name: { ja: "Fort-Mahon Plage - Webcam en direct 4K", en: "Fort-Mahon Plage - Webcam en direct 4K" },
    lat: 47.8444,
    lng: 0.9157,
    timeZone: "Europe/Paris",
    category: "nature",
    country: "FR",
    source: {
      videoId: "dLLHgCHpY6E",
      channelId: "UCDAHA3f1RMYenm_lFgqjDXQ",
      titleKey: "Fort-Mahon Plage - Webcam en direct 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-lyme-regis-uk-live-webcam-swim-cafe-b",
    name: { ja: "Lyme Regis (UK) Live Webcam @ Swim Cafe, Bar & Restaurant", en: "Lyme Regis (UK) Live Webcam @ Swim Cafe, Bar & Restaurant" },
    lat: 50.7265,
    lng: -2.9348,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "VvnPS2R3-zo",
      channelId: "UCG-Icsd_kbKnt9QraydFQPQ",
      titleKey: "Lyme Regis (UK) Live Webcam @ Swim Cafe, Bar & Restaurant",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-thursday-23rd-j",
    name: { ja: "Heathrow Airport Live - Thursday 23rd July 2026", en: "Heathrow Airport Live - Thursday 23rd July 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "-wnGvD1WTrw",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Thursday 23rd July 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-sunday-16th-aug",
    name: { ja: "Heathrow Airport Live - Sunday 16th August 2026", en: "Heathrow Airport Live - Sunday 16th August 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "nB4pAkrLBUo",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Sunday 16th August 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-live-liverpool-lpl-airport-plane-spot",
    name: { ja: "LIVE Liverpool (LPL) Airport Plane Spotting ️", en: "LIVE Liverpool (LPL) Airport Plane Spotting ️" },
    lat: 53.4106,
    lng: -2.9779,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "YozADtw1EyI",
      channelId: "UCZdMxYJkFzV5g_PZQcLmVHQ",
      titleKey: "🔴 LIVE Liverpool (LPL) Airport Plane Spotting ✈️",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-sunday-26th-jul",
    name: { ja: "Heathrow Airport Live - Sunday 26th July 2026", en: "Heathrow Airport Live - Sunday 26th July 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "T2-exO6Qtrk",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Sunday 26th July 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-friday-7th-augu",
    name: { ja: "Heathrow Airport Live - Friday 7th August 2026", en: "Heathrow Airport Live - Friday 7th August 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "csSXUH27hZw",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Friday 7th August 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-junction-cam-traffic-jams-and-queues",
    name: { ja: "Junction Cam - Traffic Jams and Queues at Town Quay Southampton (Travel News 4K)", en: "Junction Cam - Traffic Jams and Queues at Town Quay Southampton (Travel News 4K)" },
    lat: 51.5631,
    lng: -0.135,
    timeZone: "Europe/London",
    category: "city",
    country: "GB",
    source: {
      videoId: "93abbYHc3mA",
      channelId: "UCAupQASEG4kt6oXHe0Xwd9Q",
      titleKey: "Junction Cam - Traffic Jams and Queues at Town Quay Southampton (Travel News 4K)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-burrow-cam-skomer-island-livestream",
    name: { ja: "Burrow Cam - Skomer Island Livestream", en: "Burrow Cam - Skomer Island Livestream" },
    lat: 51.1677,
    lng: -3.5194,
    timeZone: "Europe/London",
    category: "animal",
    country: "GB",
    source: {
      videoId: "0g9hyq_z_Qw",
      channelId: "UCHIfbVqnILYIFvzVO7T-5SA",
      titleKey: "Burrow Cam - Skomer Island Livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-manchester-airport-live-watch-aircraf",
    name: { ja: "Manchester Airport LIVE | Watch Aircraft Departures & Arrivals", en: "Manchester Airport LIVE | Watch Aircraft Departures & Arrivals" },
    lat: 53.3537,
    lng: -2.275,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "B7SaLONZOFM",
      channelId: "UCn4gMfJQsYVhw7nxxqkkwJw",
      titleKey: "🔴 Manchester Airport LIVE | Watch Aircraft Departures & Arrivals",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-llangollen-live-steam-railway-river-d",
    name: { ja: "Llangollen Live | Steam Railway, River Dee Kayakers, Bridge | North Wales. Please Subscribe!", en: "Llangollen Live | Steam Railway, River Dee Kayakers, Bridge | North Wales. Please Subscribe!" },
    lat: 52.9683,
    lng: -3.1713,
    timeZone: "Europe/London",
    category: "railway",
    country: "GB",
    source: {
      videoId: "DKRRaBNMcCs",
      channelId: "UCkqg8-BU-M8HsoCADDZ4yzQ",
      titleKey: "Llangollen Live | Steam Railway, River Dee Kayakers, Bridge | North Wales. Please Subscribe!",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-friday-24th-jul",
    name: { ja: "Heathrow Airport Live - Friday 24th July 2026", en: "Heathrow Airport Live - Friday 24th July 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "NUrBevEUtQw",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Friday 24th July 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-port-isaac-webcam",
    name: { ja: "Port Isaac Webcam", en: "Port Isaac Webcam" },
    lat: 50.5931,
    lng: -4.8288,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "D38HQbFbMzs",
      channelId: "UCoCDMhln4bHUt5Md4C9DEEw",
      titleKey: "Port Isaac Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-tuesday-28th-ju",
    name: { ja: "Heathrow Airport Live - Tuesday 28th July 2026", en: "Heathrow Airport Live - Tuesday 28th July 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "gnNPTqz81Us",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Tuesday 28th July 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-live-london-city-airport-lcy-steep-ap",
    name: { ja: "LIVE London City Airport (LCY) 🇬🇧 | Steep Approaches & Short Runway Action ️", en: "LIVE London City Airport (LCY) 🇬🇧 | Steep Approaches & Short Runway Action ️" },
    lat: 51.5053,
    lng: 0.0553,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "NSQJuK4BWv4",
      channelId: "UC5MNHhxGDbLFL2HvZTx8yJA",
      titleKey: "👉 🔴 LIVE London City Airport (LCY) 🇬🇧 | Steep Approaches & Short Runway Action ✈️",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-live-honey-buzzard-nest-sussex-2026-2",
    name: { ja: "LIVE Honey-buzzard nest Sussex 2026 28.7.2026", en: "LIVE Honey-buzzard nest Sussex 2026 28.7.2026" },
    lat: 52.2165,
    lng: -0.3436,
    timeZone: "Europe/London",
    category: "animal",
    country: "GB",
    source: {
      videoId: "6Gd2B0x5kPw",
      channelId: "UChLoUbs2vi62h1Q0INlDdPQ",
      titleKey: "LIVE Honey-buzzard nest Sussex 2026 28.7.2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-weston-super-mare-beach-live-the-gran",
    name: { ja: "Weston-super-Mare Beach Live @ The Grand Pier", en: "Weston-super-Mare Beach Live @ The Grand Pier" },
    lat: 53.0667,
    lng: -2.4,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "VXnzFUwJtYM",
      channelId: "UCRPMo1b8Ki_5yx4SNfSi5tQ",
      titleKey: "Weston-super-Mare Beach Live @ The Grand Pier",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-tuesday-11th-au",
    name: { ja: "Heathrow Airport Live - Tuesday 11th August 2026", en: "Heathrow Airport Live - Tuesday 11th August 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "h6q4JEGESiU",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Tuesday 11th August 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-friday-21st-aug",
    name: { ja: "Heathrow Airport Live - Friday 21st August 2026", en: "Heathrow Airport Live - Friday 21st August 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "Thp35hChuhE",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Friday 21st August 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-lyme-regis-live-cam-jurassic-coast-do",
    name: { ja: "Lyme Regis Live Cam | Jurassic Coast, Dorset, England", en: "Lyme Regis Live Cam | Jurassic Coast, Dorset, England" },
    lat: 50.7265,
    lng: -2.9348,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "X1ez56Zf6OY",
      channelId: "UCspnu6n44ydqafj6nFIw5hw",
      titleKey: "Lyme Regis Live Cam | Jurassic Coast, Dorset, England",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-saturday-18th-j",
    name: { ja: "Heathrow Airport Live - Saturday 18th July 2026", en: "Heathrow Airport Live - Saturday 18th July 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "9HEwQVkNGBw",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Saturday 18th July 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-the-needles-lighthouse-camera-static",
    name: { ja: "The Needles Lighthouse Camera (Static) | Weather Watch | Isle of Wight Webcams UK LIVE", en: "The Needles Lighthouse Camera (Static) | Weather Watch | Isle of Wight Webcams UK LIVE" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "-MzTvvHfyoQ",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 The Needles Lighthouse Camera (Static) | Weather Watch | Isle of Wight Webcams UK LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-solent-view-4k-camera-ryde-portsmouth",
    name: { ja: "Solent View 4K Camera | Ryde, Portsmouth & Southsea | Isle of Wight Webcams UK LIVE | All Saints", en: "Solent View 4K Camera | Ryde, Portsmouth & Southsea | Isle of Wight Webcams UK LIVE | All Saints" },
    lat: 50.8082,
    lng: -2.9822,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "N6pEg-_P52g",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Solent View 4K Camera | Ryde, Portsmouth & Southsea | Isle of Wight Webcams UK LIVE | All Saints",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-cowes-4k-camera-yachting-ferry-cruise",
    name: { ja: "Cowes 4K Camera | Yachting, Ferry & Cruise Ships | Solent & Southampton | Isle of Wight Webcams UK", en: "Cowes 4K Camera | Yachting, Ferry & Cruise Ships | Solent & Southampton | Isle of Wight Webcams UK" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "avivSw3B3F0",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Cowes 4K Camera | Yachting, Ferry & Cruise Ships | Solent & Southampton | Isle of Wight Webcams UK",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-east-cowes-ferry-4k-camera-yachting-b",
    name: { ja: "East Cowes Ferry 4K Camera | Yachting, Boat & Red Funnel | River Medina | Isle of Wight Webcams UK", en: "East Cowes Ferry 4K Camera | Yachting, Boat & Red Funnel | River Medina | Isle of Wight Webcams UK" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "TclYzYP42Vw",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 East Cowes Ferry 4K Camera | Yachting, Boat & Red Funnel | River Medina | Isle of Wight Webcams UK",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-aspire-ryde-camera-solent-portsmouth",
    name: { ja: "Aspire Ryde Camera | Solent, Portsmouth & Southsea | Isle of Wight Webcams UK LIVE", en: "Aspire Ryde Camera | Solent, Portsmouth & Southsea | Isle of Wight Webcams UK LIVE" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "iSseyhD2eHE",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Aspire Ryde Camera | Solent, Portsmouth & Southsea | Isle of Wight Webcams UK LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-sandown-camera-beach-esplanade-isle-o",
    name: { ja: "Sandown Camera | Beach & Esplanade | Isle of Wight Webcams UK LIVE", en: "Sandown Camera | Beach & Esplanade | Isle of Wight Webcams UK LIVE" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "I0A2zRu1R0Q",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Sandown Camera | Beach & Esplanade | Isle of Wight Webcams UK LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-cowes-floating-bridge-4k-camera-yacht",
    name: { ja: "Cowes Floating Bridge 4K Camera | Yachting & Chain Ferry | River Medina | Isle of Wight Webcams UK", en: "Cowes Floating Bridge 4K Camera | Yachting & Chain Ferry | River Medina | Isle of Wight Webcams UK" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "8lbAbc2REyQ",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Cowes Floating Bridge 4K Camera | Yachting & Chain Ferry | River Medina | Isle of Wight Webcams UK",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-colwell-bay-camera-senic-totland-hurs",
    name: { ja: "Colwell Bay Camera (Senic) | Totland, Hurst Castle & Hurst Point Lighthouse | Isle of Wight Webcam", en: "Colwell Bay Camera (Senic) | Totland, Hurst Castle & Hurst Point Lighthouse | Isle of Wight Webcam" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "oq3bD7lLQzE",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Colwell Bay Camera (Senic) | Totland, Hurst Castle & Hurst Point Lighthouse | Isle of Wight Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-ventnor-camera-ventnor-esplanade-isle",
    name: { ja: "Ventnor Camera | Ventnor Esplanade Isle of Wight | LIVE UK Webcams", en: "Ventnor Camera | Ventnor Esplanade Isle of Wight | LIVE UK Webcams" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "CmsVx-EJU5A",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴 Ventnor Camera | Ventnor Esplanade Isle of Wight | LIVE UK Webcams",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-fawley-cam-live-views-of-the-exxonmob",
    name: { ja: "Fawley Cam - Live Views of the ExxonMobil Refinery (Flares, Steam & Southampton Water)", en: "Fawley Cam - Live Views of the ExxonMobil Refinery (Flares, Steam & Southampton Water)" },
    lat: 51.5764,
    lng: -0.9104,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "SkUhHlRmrQw",
      channelId: "UCAupQASEG4kt6oXHe0Xwd9Q",
      titleKey: "Fawley Cam - Live Views of the ExxonMobil Refinery (Flares, Steam & Southampton Water)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-teignmouth-webcam-salty-cottage-cam-b",
    name: { ja: "Teignmouth Webcam - Salty Cottage Cam - Back Beach Cam", en: "Teignmouth Webcam - Salty Cottage Cam - Back Beach Cam" },
    lat: 50.5458,
    lng: -3.4967,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "O5weUpesXfc",
      channelId: "UCs1hoU1QdHuxrmNltGAYjkg",
      titleKey: "Teignmouth Webcam - Salty Cottage Cam - Back Beach Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-dawlish-warren-webcam-brunel-holiday",
    name: { ja: "Dawlish Warren Webcam - Brunel Holiday Park Cam - Sponsored by Discover Dawlish and Dawlish Warren", en: "Dawlish Warren Webcam - Brunel Holiday Park Cam - Sponsored by Discover Dawlish and Dawlish Warren" },
    lat: 50.5977,
    lng: -3.445,
    timeZone: "Europe/London",
    category: "city",
    country: "GB",
    source: {
      videoId: "4Na__R9kWV0",
      channelId: "UCs1hoU1QdHuxrmNltGAYjkg",
      titleKey: "Dawlish Warren Webcam - Brunel Holiday Park Cam - Sponsored by Discover Dawlish and Dawlish Warren",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-heathrow-airport-live-wednesday-15th",
    name: { ja: "Heathrow Airport Live - Wednesday 15th July 2026", en: "Heathrow Airport Live - Wednesday 15th July 2026" },
    lat: 51.4704,
    lng: -0.4586,
    timeZone: "Europe/London",
    category: "airport",
    country: "GB",
    source: {
      videoId: "z1P_xh7Zo4A",
      channelId: "UC6q_hfBThkGdmQ5Vb4kWjWA",
      titleKey: "Heathrow Airport Live - Wednesday 15th July 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-box-cam-port-of-southampton-internati",
    name: { ja: "Box Cam - Port of Southampton International Boat Show (Container Ships and Cruise Ships) 4K", en: "Box Cam - Port of Southampton International Boat Show (Container Ships and Cruise Ships) 4K" },
    lat: 51.4147,
    lng: -2.2456,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "ec6xgmuW1dw",
      channelId: "UCAupQASEG4kt6oXHe0Xwd9Q",
      titleKey: "Box Cam - Port of Southampton International Boat Show (Container Ships and Cruise Ships) 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-itchen-cam-by-southampton-sailing-clu",
    name: { ja: "Itchen Cam - By Southampton Sailing Club Shipspotting on the Itchen River (Tug & RoRo) LIVE 24/7", en: "Itchen Cam - By Southampton Sailing Club Shipspotting on the Itchen River (Tug & RoRo) LIVE 24/7" },
    lat: 50.9045,
    lng: -1.3694,
    timeZone: "Europe/London",
    category: "nature",
    country: "GB",
    source: {
      videoId: "6Qqvy20iH7w",
      channelId: "UCAupQASEG4kt6oXHe0Xwd9Q",
      titleKey: "Itchen Cam - By Southampton Sailing Club Shipspotting on the Itchen River (Tug & RoRo) LIVE 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-ferry-cam-southampton-to-cowes-isle-o",
    name: { ja: "Ferry Cam - Southampton to Cowes Isle of Wight Red Funnel (Live Camera 24/7) IOW Festival 2026", en: "Ferry Cam - Southampton to Cowes Isle of Wight Red Funnel (Live Camera 24/7) IOW Festival 2026" },
    lat: 54.6833,
    lng: -1.55,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "QO-hO_kwwmY",
      channelId: "UCAupQASEG4kt6oXHe0Xwd9Q",
      titleKey: "Ferry Cam - Southampton to Cowes Isle of Wight Red Funnel (Live Camera 24/7) IOW Festival 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-port-cam-live-views-of-the-port-of-so",
    name: { ja: "Port Cam - LIVE views of the Port of Southampton (Cruise Ships, Ferries, Tugs and Containerships)", en: "Port Cam - LIVE views of the Port of Southampton (Cruise Ships, Ferries, Tugs and Containerships)" },
    lat: 50.799,
    lng: -1.0913,
    timeZone: "Europe/London",
    category: "harbor",
    country: "GB",
    source: {
      videoId: "wYlAi6QhNSA",
      channelId: "UCAupQASEG4kt6oXHe0Xwd9Q",
      titleKey: "Port Cam - LIVE views of the Port of Southampton (Cruise Ships, Ferries, Tugs and Containerships)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "gb-havenstreet-station-camera-isle-of-wi",
    name: { ja: "Havenstreet Station Camera | Isle of Wight Steam Railway | Isle of Wight Webcams UK LIVE | Train", en: "Havenstreet Station Camera | Isle of Wight Steam Railway | Isle of Wight Webcams UK LIVE | Train" },
    lat: 50.6795,
    lng: -1.2876,
    timeZone: "Europe/London",
    category: "railway",
    country: "GB",
    source: {
      videoId: "b7xdKcf6TRE",
      channelId: "UCijrngTzgjHdgeAQfJxNKqA",
      titleKey: "🔴🚂 Havenstreet Station Camera | Isle of Wight Steam Railway | Isle of Wight Webcams UK LIVE | Train",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "hk-live-hong-kong-live-4k",
    name: { ja: "LIVE HONG KONG | 陪您休閒上班看風景 LIVE | 減壓音樂 |香港實時|4K", en: "LIVE HONG KONG | 陪您休閒上班看風景 LIVE | 減壓音樂 |香港實時|4K" },
    lat: 22.2783,
    lng: 114.1747,
    timeZone: "Asia/Hong_Kong",
    category: "city",
    country: "HK",
    source: {
      videoId: "VAK8DkBgjMs",
      channelId: "UCWtgtd5245OHw4I2wL9K8jA",
      titleKey: "LIVE HONG KONG | 陪您休閒上班看風景 LIVE | 減壓音樂🎧 |香港實時|4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-trento-live-cam-centro-citta-piazza-d",
    name: { ja: "Trento live cam - centro città (Piazza Duomo)", en: "Trento live cam - centro città (Piazza Duomo)" },
    lat: 46.0679,
    lng: 11.1211,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "PzJVpZ9lp7Q",
      channelId: "UCrBd0lVRjlyT-uu0fcFihUw",
      titleKey: "Trento live cam - centro città (Piazza Duomo)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-assisi-live-webcam-citta",
    name: { ja: "Assisi Live Webcam Città", en: "Assisi Live Webcam Città" },
    lat: 39.3534,
    lng: 16.918,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "1Ho6SNEiOlk",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Assisi Live Webcam Città",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-fiumalbo-mo-vista-sul-bor",
    name: { ja: "Webcam Live Fiumalbo (MO) - Vista sul Borgo", en: "Webcam Live Fiumalbo (MO) - Vista sul Borgo" },
    lat: 44.1793,
    lng: 10.6472,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "1lRcxaW-DRo",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Fiumalbo (MO) - Vista sul Borgo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-corniglia-sp-cinque-terre",
    name: { ja: "Webcam Live Corniglia (SP) - Cinque Terre", en: "Webcam Live Corniglia (SP) - Cinque Terre" },
    lat: 44.1199,
    lng: 9.7081,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "BhPxgJ3w8Ag",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Corniglia (SP) - Cinque Terre",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-hotel-parco-smeraldo-terme-webcam-isc",
    name: { ja: "Hotel Parco Smeraldo Terme | Webcam Ischia", en: "Hotel Parco Smeraldo Terme | Webcam Ischia" },
    lat: 40.7379,
    lng: 13.9486,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "CBrvIRmTBTA",
      channelId: "UCBt7xuRhIZU_nAm2V2wuB8A",
      titleKey: "Hotel Parco Smeraldo Terme | Webcam Ischia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-pavullo-nel-frignano-live-cam-appenni",
    name: { ja: "Pavullo nel Frignano Live Cam - Appennino Emiliano", en: "Pavullo nel Frignano Live Cam - Appennino Emiliano" },
    lat: 44.3335,
    lng: 10.8354,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "7KD-aMIUZGM",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Pavullo nel Frignano Live Cam - Appennino Emiliano",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-sappada-ud-centro-paese-e",
    name: { ja: "Webcam Live Sappada (UD) - Centro paese e Monte Siera", en: "Webcam Live Sappada (UD) - Centro paese e Monte Siera" },
    lat: 46.5666,
    lng: 12.6842,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "Yf1j1VRBUI0",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Sappada (UD) - Centro paese e Monte Siera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-palermo-live-webcam",
    name: { ja: "Palermo Live Webcam", en: "Palermo Live Webcam" },
    lat: 38.1166,
    lng: 13.3636,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "8J80F86f114",
      channelId: "UCNlinmcGuYdoPgfR-aG8YSQ",
      titleKey: "Palermo Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-sestriere-live-cam-grangesises-sauze",
    name: { ja: "Sestriere Live Cam - Grangesises, Sauze di Cesana", en: "Sestriere Live Cam - Grangesises, Sauze di Cesana" },
    lat: 44.9586,
    lng: 6.8775,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "_QnRnQEKGnU",
      channelId: "UCML9AfJDtX0-p3lHCP92fAw",
      titleKey: "Sestriere Live Cam - Grangesises, Sauze di Cesana",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-gualdo-tadino-live-webcam",
    name: { ja: "Gualdo Tadino Live Webcam", en: "Gualdo Tadino Live Webcam" },
    lat: 43.2294,
    lng: 12.7786,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "Bc_bgHNApZ8",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Gualdo Tadino Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-lampedusa-webcam-live-porto-nuovo",
    name: { ja: "Lampedusa Webcam Live - Porto Nuovo", en: "Lampedusa Webcam Live - Porto Nuovo" },
    lat: 35.5014,
    lng: 12.6096,
    timeZone: "Europe/Rome",
    category: "harbor",
    country: "IT",
    source: {
      videoId: "NJ5hYg9Ii2I",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Lampedusa Webcam Live - Porto Nuovo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-perugia-live-webcam",
    name: { ja: "Perugia Live Webcam", en: "Perugia Live Webcam" },
    lat: 43.1122,
    lng: 12.3888,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "8TZ8YRt9nYc",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Perugia Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-orvieto-live-webcam",
    name: { ja: "Orvieto Live Webcam", en: "Orvieto Live Webcam" },
    lat: 42.7192,
    lng: 12.1125,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "y7QcpQwxHrA",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Orvieto Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-sarzana-sp-piazza-matteot",
    name: { ja: "Webcam Live Sarzana (SP) - Piazza Matteotti dal Comune di Sarzana", en: "Webcam Live Sarzana (SP) - Piazza Matteotti dal Comune di Sarzana" },
    lat: 44.1118,
    lng: 9.9622,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "0m4qDGzGN7k",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Sarzana (SP) - Piazza Matteotti dal Comune di Sarzana",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-ischia-live-webcam",
    name: { ja: "Ischia Live Webcam", en: "Ischia Live Webcam" },
    lat: 40.7379,
    lng: 13.9486,
    timeZone: "Europe/Rome",
    category: "harbor",
    country: "IT",
    source: {
      videoId: "6iWjqVt8jmE",
      channelId: "UCNlinmcGuYdoPgfR-aG8YSQ",
      titleKey: "Ischia Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-cingoli-live-webcam",
    name: { ja: "Cingoli Live Webcam", en: "Cingoli Live Webcam" },
    lat: 43.3757,
    lng: 13.2079,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "9njNf0KTNDk",
      channelId: "UCNlinmcGuYdoPgfR-aG8YSQ",
      titleKey: "Cingoli Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-genova-live-cam-nervi-sant-ilario",
    name: { ja: "Genova Live Cam - Nervi, Sant'Ilario", en: "Genova Live Cam - Nervi, Sant'Ilario" },
    lat: 45.216,
    lng: 11.8721,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "b66MhBy9J3o",
      channelId: "UCML9AfJDtX0-p3lHCP92fAw",
      titleKey: "Genova Live Cam - Nervi, Sant'Ilario",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-montalcino-live-cam-camigliano-aziend",
    name: { ja: "Montalcino Live Cam - Camigliano Azienda Vitivinicola", en: "Montalcino Live Cam - Camigliano Azienda Vitivinicola" },
    lat: 43.054,
    lng: 11.4885,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "t_kuiocBz0U",
      channelId: "UCML9AfJDtX0-p3lHCP92fAw",
      titleKey: "Montalcino Live Cam - Camigliano Azienda Vitivinicola",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-san-pellegrino-in-alpe-lu",
    name: { ja: "Webcam Live San Pellegrino in Alpe (LU) - Garfagnana", en: "Webcam Live San Pellegrino in Alpe (LU) - Garfagnana" },
    lat: 44.1917,
    lng: 10.4817,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "YuvgiDTzxhU",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live San Pellegrino in Alpe (LU) - Garfagnana",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-riomaggiore-sp-cinque-ter",
    name: { ja: "Webcam Live Riomaggiore (SP) - Cinque Terre", en: "Webcam Live Riomaggiore (SP) - Cinque Terre" },
    lat: 44.0998,
    lng: 9.7387,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "A7oGJdUmVkg",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Riomaggiore (SP) - Cinque Terre",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-monterosso-sp-cinque-terr",
    name: { ja: "Webcam Live Monterosso (SP) - Cinque Terre", en: "Webcam Live Monterosso (SP) - Cinque Terre" },
    lat: 44.1467,
    lng: 9.6549,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "Mjrd1nmlW5s",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Monterosso (SP) - Cinque Terre",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-cerreto-laghi-re-piste-da",
    name: { ja: "Webcam Live Cerreto Laghi (RE) - Piste da Sci e Piazzale del Lago", en: "Webcam Live Cerreto Laghi (RE) - Piste da Sci e Piazzale del Lago" },
    lat: 44.2982,
    lng: 10.2433,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "vdK4lu3fMes",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Cerreto Laghi (RE) - Piste da Sci e Piazzale del Lago",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-abetone-pt-piazza-europa",
    name: { ja: "Webcam Live Abetone (PT) - Piazza Europa", en: "Webcam Live Abetone (PT) - Piazza Europa" },
    lat: 44.1459,
    lng: 10.6641,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "fjnJ2fzlh4g",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Abetone (PT) - Piazza Europa",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-manarola-sp-cinque-terre",
    name: { ja: "Webcam Live Manarola (SP) - Cinque Terre", en: "Webcam Live Manarola (SP) - Cinque Terre" },
    lat: 44.1071,
    lng: 9.729,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "QpqsJKI0Wfk",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Manarola (SP) - Cinque Terre",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-ponte-di-legno-bs-adamell",
    name: { ja: "Webcam Live Ponte di Legno (BS) - Adamello", en: "Webcam Live Ponte di Legno (BS) - Adamello" },
    lat: 46.259,
    lng: 10.5105,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "tGnM7-4HsvQ",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Ponte di Legno (BS) - Adamello",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-parco-corno-alle-scale-webcam-live-pa",
    name: { ja: "Parco Corno alle Scale Webcam Live - Parapendio Monte Pizzo", en: "Parco Corno alle Scale Webcam Live - Parapendio Monte Pizzo" },
    lat: 42.8333,
    lng: 12.8333,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "t-OOXg7YV0o",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Parco Corno alle Scale Webcam Live - Parapendio Monte Pizzo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-carrara-ms",
    name: { ja: "Webcam Live Carrara (MS)", en: "Webcam Live Carrara (MS)" },
    lat: 44.0793,
    lng: 10.0979,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "y7HXA6MueKU",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Carrara (MS)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-pietra-di-bismantova-re",
    name: { ja: "Webcam Live Pietra di Bismantova (RE)", en: "Webcam Live Pietra di Bismantova (RE)" },
    lat: 44.4213,
    lng: 10.4132,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "8jhsMJ3Hm0w",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Pietra di Bismantova (RE)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-varazze-live-cam-riviera-delle-palme",
    name: { ja: "Varazze Live Cam - Riviera delle Palme", en: "Varazze Live Cam - Riviera delle Palme" },
    lat: 44.3641,
    lng: 8.5963,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "uqunnx0ZNdg",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Varazze Live Cam - Riviera delle Palme",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-tellaro-sp-panorama",
    name: { ja: "Webcam Live Tellaro (SP) - Panorama", en: "Webcam Live Tellaro (SP) - Panorama" },
    lat: 44.0619,
    lng: 9.9279,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "gU4VUZirLpY",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Tellaro (SP) - Panorama",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-osservatorio-astronomico-monteromano",
    name: { ja: "Osservatorio Astronomico Monteromano Live Cam - Brisighella", en: "Osservatorio Astronomico Monteromano Live Cam - Brisighella" },
    lat: 42.8333,
    lng: 12.8333,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "Olvu7Z6_7x0",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Osservatorio Astronomico Monteromano Live Cam - Brisighella",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-lido-adriano-webcam-live-aparthotel-c",
    name: { ja: "Lido Adriano Webcam Live - Aparthotel Costa Paradiso", en: "Lido Adriano Webcam Live - Aparthotel Costa Paradiso" },
    lat: 44.4167,
    lng: 12.3055,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "4zc8DUXcyZY",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Lido Adriano Webcam Live - Aparthotel Costa Paradiso",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-roma-webcam-live-monte-mario",
    name: { ja: "Roma Webcam Live - Monte Mario", en: "Roma Webcam Live - Monte Mario" },
    lat: 44.9936,
    lng: 11.1064,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "IZtH_58-jKI",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Roma Webcam Live - Monte Mario",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-assisi-live-webcam-piazza-del-comune",
    name: { ja: "Assisi Live Webcam Piazza del Comune", en: "Assisi Live Webcam Piazza del Comune" },
    lat: 39.3534,
    lng: 16.918,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "CkNeltsc5ps",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Assisi Live Webcam Piazza del Comune",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-gallipoli-live-cam-spiaggia-della-pur",
    name: { ja: "Gallipoli Live Cam - Spiaggia della Purità", en: "Gallipoli Live Cam - Spiaggia della Purità" },
    lat: 40.0559,
    lng: 17.9909,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "wWNriS9CSFE",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Gallipoli Live Cam - Spiaggia della Purità",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-rimini-live-cam-torre-pedrera",
    name: { ja: "Rimini Live Cam - Torre Pedrera", en: "Rimini Live Cam - Torre Pedrera" },
    lat: 44.0575,
    lng: 12.5653,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "ZZrEQ2Y5kec",
      channelId: "UCML9AfJDtX0-p3lHCP92fAw",
      titleKey: "Rimini Live Cam - Torre Pedrera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-brescia-live-cam-castello-colle-cidne",
    name: { ja: "Brescia Live Cam - Castello, Colle Cidneo", en: "Brescia Live Cam - Castello, Colle Cidneo" },
    lat: 45.5356,
    lng: 10.2147,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "3IgiNLzSS2w",
      channelId: "UCML9AfJDtX0-p3lHCP92fAw",
      titleKey: "Brescia Live Cam - Castello, Colle Cidneo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-venice-live-cam-san-marco-basin-in-li",
    name: { ja: "Venice Live Cam - San Marco Basin in Live Streaming - Webcam en direct ベネチア ライブ", en: "Venice Live Cam - San Marco Basin in Live Streaming - Webcam en direct ベネチア ライブ" },
    lat: 45.4371,
    lng: 12.3326,
    timeZone: "Europe/Rome",
    category: "harbor",
    country: "IT",
    source: {
      videoId: "ASqGNET31VY",
      channelId: "UCMpn1qLudF-zb4M4bqxLIbw",
      titleKey: "🔴 Venice Live Cam - San Marco Basin in Live Streaming - Webcam en direct ベネチア ライブ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-siena-si-piazza-del-campo",
    name: { ja: "Webcam Live Siena (SI) - Piazza del Campo", en: "Webcam Live Siena (SI) - Piazza del Campo" },
    lat: 43.3182,
    lng: 11.3306,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "d6IstgeKiiU",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Siena (SI) - Piazza del Campo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-roma-live-cam-rione-prati-cupola-di-s",
    name: { ja: "Roma Live Cam - Rione Prati, Cupola di San Pietro", en: "Roma Live Cam - Rione Prati, Cupola di San Pietro" },
    lat: 44.9936,
    lng: 11.1064,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "gXm3PGF4z0s",
      channelId: "UC39iVqUHfqp2_TS_NTnruag",
      titleKey: "Roma Live Cam - Rione Prati, Cupola di San Pietro",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-webcam-live-cattolica-rn",
    name: { ja: "Webcam Live Cattolica (RN)", en: "Webcam Live Cattolica (RN)" },
    lat: 43.9618,
    lng: 12.7363,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "5QVUohwo8ss",
      channelId: "UC12-jDuDnEJAhtmukCFBEGQ",
      titleKey: "Webcam Live Cattolica (RN)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-mondovi-live-webcam-alpi-del-mare-mon",
    name: { ja: "Mondovì Live Webcam - Alpi del Mare & Mondolé", en: "Mondovì Live Webcam - Alpi del Mare & Mondolé" },
    lat: 44.396,
    lng: 7.8176,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "h5chI0fu32w",
      channelId: "UCML9AfJDtX0-p3lHCP92fAw",
      titleKey: "Mondovì Live Webcam - Alpi del Mare & Mondolé",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-assisi-live-webcam-piazza-san-rufino",
    name: { ja: "Assisi Live Webcam Piazza San Rufino", en: "Assisi Live Webcam Piazza San Rufino" },
    lat: 39.3534,
    lng: 16.918,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "4cqPDoX6uws",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Assisi Live Webcam Piazza San Rufino",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-lago-di-piediluco-live-webcam",
    name: { ja: "Lago di Piediluco Live Webcam", en: "Lago di Piediluco Live Webcam" },
    lat: 39.3534,
    lng: 16.918,
    timeZone: "Europe/Rome",
    category: "nature",
    country: "IT",
    source: {
      videoId: "FeAZyuvghVY",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Lago di Piediluco Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-montefalco-live-webcam",
    name: { ja: "Montefalco Live Webcam", en: "Montefalco Live Webcam" },
    lat: 42.8908,
    lng: 12.6483,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "mBs2lOPdkMo",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Montefalco Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-todi-live-webcam",
    name: { ja: "Todi Live Webcam", en: "Todi Live Webcam" },
    lat: 42.7788,
    lng: 12.412,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "Nrbz5ZkFL6U",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Todi Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-bevagna-live-webcam",
    name: { ja: "Bevagna Live Webcam", en: "Bevagna Live Webcam" },
    lat: 42.9375,
    lng: 12.6149,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "PfBPe5Jfzxo",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Bevagna Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "it-gubbio-live-webcam",
    name: { ja: "Gubbio Live Webcam", en: "Gubbio Live Webcam" },
    lat: 43.35,
    lng: 12.5731,
    timeZone: "Europe/Rome",
    category: "city",
    country: "IT",
    source: {
      videoId: "tUPmbZqrC6I",
      channelId: "UC_FuR9GFVJE2A8H02sQmHWw",
      titleKey: "🔴Gubbio Live Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-07-26-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/26 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/26 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "cmGuzGi7tGI",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/26 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-07-30-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/30 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/30 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "K1usWglvhPk",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/30 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-livecam",
    name: { ja: "【内海LiveCam】今の波は？", en: "【内海LiveCam】今の波は？" },
    lat: 34.7395,
    lng: 136.8706,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "mAyyCUiz48g",
      channelId: "UC0B_ex2k5A93COYfer6gKLw",
      titleKey: "【内海LiveCam】今の波は？",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-08-09-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/09 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/09 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "jdzwnCVhCZA",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/09 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-kabukicho-live-camera-stream-2-2",
    name: { ja: "[LIVE] Kabukicho Live Camera Stream 2 2026/07/16 18:00", en: "[LIVE] Kabukicho Live Camera Stream 2 2026/07/16 18:00" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "4T6Fj5wuz48",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "[LIVE] Kabukicho Live Camera Stream 2 2026/07/16 18:00",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-1-jr-1-h-view",
    name: { ja: "【Live】 鉄道ライブカメラ1 横浜市 東神奈川駅近くJR＆京急線が一望できるライブ配信 車両基地 サンライズ 国道1号線 渋滞情報 お天気カメラ 夜景 みなとみらい H.view", en: "【Live】 鉄道ライブカメラ1 横浜市 東神奈川駅近くJR＆京急線が一望できるライブ配信 車両基地 サンライズ 国道1号線 渋滞情報 お天気カメラ 夜景 みなとみらい H.view" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "railway",
    country: "JP",
    source: {
      videoId: "QIismNv5DXI",
      channelId: "UCnpVhaYEaUYwiQaFdqoPK0g",
      titleKey: "【Live】 鉄道ライブカメラ1　横浜市　東神奈川駅近くJR＆京急線が一望できるライブ配信　車両基地　サンライズ　国道1号線　渋滞情報　お天気カメラ　夜景　みなとみらい　H.view",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-08-01-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/01 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/01 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "OXGOsVqIBMU",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/01 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-kabukicho-live-camera-stream-2",
    name: { ja: "[LIVE] Kabukicho Live Camera Stream 2 2026/07/13 06:00", en: "[LIVE] Kabukicho Live Camera Stream 2 2026/07/13 06:00" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "aN4gQwSLwcY",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "[LIVE] Kabukicho Live Camera Stream 2 2026/07/13 06:00",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-08-02-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/02 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/02 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "Ler5Pjss4hs",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/02 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-08-03-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/03 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/03 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "tXhhOqAq0Lo",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/08/03 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-4k-live-yokohama-city-skyline-live-st",
    name: { ja: "【4K LIVE】横浜みなとみらい全景 ライブカメラ Yokohama City Skyline Live Stream Japan H.View", en: "【4K LIVE】横浜みなとみらい全景 ライブカメラ Yokohama City Skyline Live Stream Japan H.View" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "nature",
    country: "JP",
    source: {
      videoId: "Uu37SpkYaEw",
      channelId: "UCnpVhaYEaUYwiQaFdqoPK0g",
      titleKey: "【4K LIVE】横浜みなとみらい全景 ライブカメラ Yokohama City Skyline Live Stream Japan H.View",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-07-13-00-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/13 00:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/13 00:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "oLz1p-GOk_s",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/13 00:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-live-inside-a-real-h-view-camera",
    name: { ja: "【Live】【ラーメン百人力ライブカメラ!】二郎系ラーメン屋の厨房から生中継！ Live: Inside a Real H.View Camera", en: "【Live】【ラーメン百人力ライブカメラ!】二郎系ラーメン屋の厨房から生中継！ Live: Inside a Real H.View Camera" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "-Su_87DGAyA",
      channelId: "UCnpVhaYEaUYwiQaFdqoPK0g",
      titleKey: "【Live】【ラーメン百人力ライブカメラ!】二郎系ラーメン屋の厨房から生中継！🍜 Live: Inside a Real  H.View Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-07-21-00-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/21 00:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/21 00:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "_i2uCK4iGX4",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/21 00:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-2026-07-19-12-00",
    name: { ja: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/19 12:00〜", en: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/19 12:00〜" },
    lat: 35.6946,
    lng: 139.7023,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "BfLIcsu-5YA",
      channelId: "UChKERpE7Um0Uq1btm_a9g5A",
      titleKey: "【LIVE】新宿・歌舞伎町 ライブカメラ 2026/07/19 12:00〜",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "jp-live-h-view",
    name: { ja: "【Live!】大船駅笠間口交差点ライブカメラ 交通情報カメラ お天気カメラ H.View", en: "【Live!】大船駅笠間口交差点ライブカメラ 交通情報カメラ お天気カメラ H.View" },
    lat: 35.6854,
    lng: 139.7531,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    source: {
      videoId: "OKCDmhQ4QGw",
      channelId: "UCnpVhaYEaUYwiQaFdqoPK0g",
      titleKey: "【Live!】大船駅笠間口交差点ライブカメラ　交通情報カメラ　お天気カメラ　H.View",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ke-ol-donyo-lodge-wildlife-live-stream-k",
    name: { ja: "ol Donyo Lodge | Wildlife Live Stream – Kenya", en: "ol Donyo Lodge | Wildlife Live Stream – Kenya" },
    lat: 1,
    lng: 38,
    timeZone: "Africa/Nairobi",
    category: "animal",
    country: "KE",
    source: {
      videoId: "XsOU8JnEpNM",
      channelId: "UCuoNAKa3P0QR1Lw9QdpmoVg",
      titleKey: "ol Donyo Lodge | Wildlife Live Stream – Kenya",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ke-finch-hattons-live-wildlife-camera-ts",
    name: { ja: "Finch Hattons Live Wildlife Camera | Tsavo National Park", en: "Finch Hattons Live Wildlife Camera | Tsavo National Park" },
    lat: -3,
    lng: 38.6667,
    timeZone: "Africa/Nairobi",
    category: "animal",
    country: "KE",
    source: {
      videoId: "Xe9CPAdyAro",
      channelId: "UCuoNAKa3P0QR1Lw9QdpmoVg",
      titleKey: "Finch Hattons Live Wildlife Camera | Tsavo National Park",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "mx-cancun-quintana-roo-vista-desde-grand",
    name: { ja: "Cancún, Quintana Roo | Vista desde Grand Park Royal Luxury Resorts", en: "Cancún, Quintana Roo | Vista desde Grand Park Royal Luxury Resorts" },
    lat: 21.1743,
    lng: -86.8466,
    timeZone: "America/Cancun",
    category: "city",
    country: "MX",
    source: {
      videoId: "HY_mkO3SzBs",
      channelId: "UC1Lz8E2e08WqN6q7p2pgdAg",
      titleKey: "Cancún, Quintana Roo | Vista desde Grand Park Royal Luxury Resorts",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "na-live-onguma-waterhole-elephants-giraf",
    name: { ja: "LIVE: Onguma Waterhole - Elephants, Giraffes & More | Namibia 24/7", en: "LIVE: Onguma Waterhole - Elephants, Giraffes & More | Namibia 24/7" },
    lat: -22,
    lng: 17,
    timeZone: "Africa/Windhoek",
    category: "animal",
    country: "NA",
    source: {
      videoId: "yuIm1V7Ne7I",
      channelId: "UCuoNAKa3P0QR1Lw9QdpmoVg",
      titleKey: "LIVE: Onguma Waterhole - Elephants, Giraffes & More | Namibia 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-geiranger-live",
    name: { ja: "Geiranger Live", en: "Geiranger Live" },
    lat: 62.1019,
    lng: 7.2072,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "wAdTV6Uc5eA",
      channelId: "UClqd_NklmF4AnW4MYiCeSEg",
      titleKey: "Geiranger Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-hafjell-live",
    name: { ja: "Hafjell LIVE", en: "Hafjell LIVE" },
    lat: 60.5936,
    lng: 6.6514,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "BADzwd9b0RU",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Hafjell LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-marka-live",
    name: { ja: "Marka LIVE", en: "Marka LIVE" },
    lat: 68.6,
    lng: 15.0333,
    timeZone: "Europe/Oslo",
    category: "nature",
    country: "NO",
    source: {
      videoId: "3xohetm5I7Y",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Marka LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-sogndal-live",
    name: { ja: "Sogndal LIVE", en: "Sogndal LIVE" },
    lat: 61.2291,
    lng: 7.0967,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "6Usok3aloeU",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Sogndal LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-myrkdalen-live",
    name: { ja: "Myrkdalen LIVE", en: "Myrkdalen LIVE" },
    lat: 60.8419,
    lng: 6.4665,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "ogH1z3eTi2Q",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Myrkdalen LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-skeikampen-live",
    name: { ja: "Skeikampen Live", en: "Skeikampen Live" },
    lat: 61.3381,
    lng: 10.0903,
    timeZone: "Europe/Oslo",
    category: "nature",
    country: "NO",
    source: {
      videoId: "dzvmJr3iOFg",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Skeikampen Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-beitost-len-live",
    name: { ja: "Beitostølen LIVE", en: "Beitostølen LIVE" },
    lat: 61.2487,
    lng: 8.9062,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "8EKxnxlagvI",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Beitostølen LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-troms-live",
    name: { ja: "Tromsø LIVE", en: "Tromsø LIVE" },
    lat: 69.6489,
    lng: 18.9551,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "jpCcV1-Sfnw",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Tromsø LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "no-norway-live",
    name: { ja: "Norway LIVE", en: "Norway LIVE" },
    lat: 62,
    lng: 10,
    timeZone: "Europe/Oslo",
    category: "city",
    country: "NO",
    source: {
      videoId: "z_5NCwXPSqM",
      channelId: "UCgAmmVZsZ4vfDH-vtWawaOg",
      titleKey: "Norway LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "pa-live-tropical-hummingbird-cam-canopy",
    name: { ja: "LIVE Tropical Hummingbird Cam: Canopy Tower – Soberanía National Park, Panama | explore.org", en: "LIVE Tropical Hummingbird Cam: Canopy Tower – Soberanía National Park, Panama | explore.org" },
    lat: 9.0752,
    lng: -79.66,
    timeZone: "America/Panama",
    category: "animal",
    country: "PA",
    source: {
      videoId: "JE2CGFclrRg",
      channelId: "UCpLLHFUEHb89Luv-Gj6ZMgA",
      titleKey: "LIVE Tropical Hummingbird Cam: Canopy Tower – Soberanía National Park, Panama | explore.org",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "pl-siechnice-kamera-online-siechnice-ryn",
    name: { ja: "Siechnice - kamera online Siechnice Rynek", en: "Siechnice - kamera online Siechnice Rynek" },
    lat: 51.0338,
    lng: 17.1474,
    timeZone: "Europe/Warsaw",
    category: "city",
    country: "PL",
    source: {
      videoId: "SyQ4eNx0kOQ",
      channelId: "UC-RGnR74pVb4s4QSDwkMbBA",
      titleKey: "Siechnice - kamera online Siechnice Rynek",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ru-24-7-3",
    name: { ja: "Живу. Постоянная живая трансляция 24/7 (камера 3)", en: "Живу. Постоянная живая трансляция 24/7 (камера 3)" },
    lat: 55.3345,
    lng: 62.1013,
    timeZone: "Asia/Yekaterinburg",
    category: "city",
    country: "RU",
    source: {
      videoId: "MpPn1vzKf84",
      channelId: "UCFXE9DpDuCqh0aRxpuB20nw",
      titleKey: "Живу. Постоянная живая трансляция 24/7 (камера 3)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ru-24-7-2",
    name: { ja: "Живу. Постоянная живая трансляция 24/7 (камера 2)", en: "Живу. Постоянная живая трансляция 24/7 (камера 2)" },
    lat: 55.3345,
    lng: 62.1013,
    timeZone: "Asia/Yekaterinburg",
    category: "city",
    country: "RU",
    source: {
      videoId: "k5pcFcJgJK8",
      channelId: "UCFXE9DpDuCqh0aRxpuB20nw",
      titleKey: "Живу. Постоянная живая трансляция 24/7 (камера 2)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ru-24-7-1",
    name: { ja: "Живу. Постоянная живая трансляция 24/7 (камера 1)", en: "Живу. Постоянная живая трансляция 24/7 (камера 1)" },
    lat: 55.3345,
    lng: 62.1013,
    timeZone: "Asia/Yekaterinburg",
    category: "city",
    country: "RU",
    source: {
      videoId: "fTGQTIdcPQY",
      channelId: "UCFXE9DpDuCqh0aRxpuB20nw",
      titleKey: "Живу. Постоянная живая трансляция 24/7 (камера 1)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sa-makkah-live-hd-mecca-live-makkah-live",
    name: { ja: "Makkah Live HD | Mecca Live | Makkah Live Today Now", en: "Makkah Live HD | Mecca Live | Makkah Live Today Now" },
    lat: 21.4266,
    lng: 39.8256,
    timeZone: "Asia/Riyadh",
    category: "city",
    country: "SA",
    source: {
      videoId: "bNY8a2BB5Gc",
      channelId: "UCSs5mehC-g9qDmIZWFe0a6Q",
      titleKey: "🕋 Makkah Live HD | Mecca Live | Makkah Live Today Now 🕋",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sa-madina-live-madinah-live-tv-online-ma",
    name: { ja: "Madina Live | Madinah Live TV Online | Masjid Al Nabawi Live HD | Madinah Live Today 24/7", en: "Madina Live | Madinah Live TV Online | Masjid Al Nabawi Live HD | Madinah Live Today 24/7" },
    lat: 24.4686,
    lng: 39.6142,
    timeZone: "Asia/Riyadh",
    category: "city",
    country: "SA",
    source: {
      videoId: "rHWSRMcGGBQ",
      channelId: "UCSs5mehC-g9qDmIZWFe0a6Q",
      titleKey: "Madina Live | Madinah Live TV Online | Masjid Al Nabawi Live HD | Madinah Live Today 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sa-madina-live-24-7-masjid-al-nabawi-liv",
    name: { ja: "Madina Live 24/7 | Masjid Al Nabawi Live HD | Madinah Live TV Online Today", en: "Madina Live 24/7 | Masjid Al Nabawi Live HD | Madinah Live TV Online Today" },
    lat: 24.4686,
    lng: 39.6142,
    timeZone: "Asia/Riyadh",
    category: "city",
    country: "SA",
    source: {
      videoId: "9rmHzOb5ECs",
      channelId: "UCSs5mehC-g9qDmIZWFe0a6Q",
      titleKey: "Madina Live 24/7 | Masjid Al Nabawi Live HD | Madinah Live TV Online Today",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sa-madina-live-24-7-madinah-live-tv-hd",
    name: { ja: "Madina Live 24/7 | بث مباشر من المدينة المنورة | قناة السنة النبوية | Madinah Live TV HD", en: "Madina Live 24/7 | بث مباشر من المدينة المنورة | قناة السنة النبوية | Madinah Live TV HD" },
    lat: 24.4686,
    lng: 39.6142,
    timeZone: "Asia/Riyadh",
    category: "city",
    country: "SA",
    source: {
      videoId: "BtMUUgApnPs",
      channelId: "UCFrVnrQF6kTrkDdFZoT9CTQ",
      titleKey: "🔴 Madina Live 24/7 | بث مباشر من المدينة المنورة | قناة السنة النبوية | Madinah Live TV HD",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sx-great-bay-beach-live-cam-seaview-beac",
    name: { ja: "Great Bay Beach LIVE Cam | Seaview Beach Hotel | Boardwalk & Cruise Port | Sint Maarten", en: "Great Bay Beach LIVE Cam | Seaview Beach Hotel | Boardwalk & Cruise Port | Sint Maarten" },
    lat: 18.0417,
    lng: -63.0667,
    timeZone: "America/Lower_Princes",
    category: "nature",
    country: "SX",
    source: {
      videoId: "s_UpggS3J9Y",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🚢 Great Bay Beach LIVE Cam | Seaview Beach Hotel | Boardwalk & Cruise Port | Sint Maarten",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "sx-boardwalk-great-bay-beach-philipsburg",
    name: { ja: "Boardwalk | Great Bay Beach | Philipsburg | Saint Martin | LIVE Cam", en: "Boardwalk | Great Bay Beach | Philipsburg | Saint Martin | LIVE Cam" },
    lat: 18.026,
    lng: -63.0458,
    timeZone: "America/Lower_Princes",
    category: "nature",
    country: "SX",
    source: {
      videoId: "N5Mb2bjYwZo",
      channelId: "UCRjMuOBDCfSsCNIe2p0_tdg",
      titleKey: "🚢  Boardwalk | Great Bay Beach | Philipsburg | Saint Martin | LIVE Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-4k-thailand-s-best-beach-kata-beach-s",
    name: { ja: "[4K] Thailand’s Best Beach 🇹🇭 — Kata Beach | Sunny Day & Turquoise Waters Walking Tour | Phuket", en: "[4K] Thailand’s Best Beach 🇹🇭 — Kata Beach | Sunny Day & Turquoise Waters Walking Tour | Phuket" },
    lat: 7.8906,
    lng: 98.3981,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "2qFg0VEArYQ",
      channelId: "UCbTcDX9g_EHASsbZ8L0-D1Q",
      titleKey: "[4K] Thailand’s Best Beach 🇹🇭 — Kata Beach | Sunny Day & Turquoise Waters Walking Tour | Phuket",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-soi-buakhao-intersection-with-soi-dia",
    name: { ja: "Soi Buakhao intersection with Soi Diana | Pattaya, Thailand | 20 Feb 25", en: "Soi Buakhao intersection with Soi Diana | Pattaya, Thailand | 20 Feb 25" },
    lat: 12.9333,
    lng: 100.8833,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "wCVFIKnii2s",
      channelId: "UCbXiHnFTVZmnp2IspH2OPTw",
      titleKey: "Soi Buakhao intersection with Soi Diana | Pattaya, Thailand | 20 Feb 25",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-crystal-bay-yacht-club-lamai-koh",
    name: { ja: "LIVE Crystal Bay Yacht Club Lamai | Koh Samui Beach Webcam | Thailand 24/7 | 2160p 4K", en: "LIVE Crystal Bay Yacht Club Lamai | Koh Samui Beach Webcam | Thailand 24/7 | 2160p 4K" },
    lat: 15.5,
    lng: 101,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "3N3ZwIB_X4Y",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 LIVE Crystal Bay Yacht Club Lamai | Koh Samui Beach Webcam | Thailand 24/7 | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-camera-stream-bondi-aussie-bar-g",
    name: { ja: "Live Camera Stream | Bondi Aussie Bar & Grill | Chaweng | Koh Samui | Thailand | 2160p 4K", en: "Live Camera Stream | Bondi Aussie Bar & Grill | Chaweng | Koh Samui | Thailand | 2160p 4K" },
    lat: 9.5237,
    lng: 100.0588,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "VR-x3HdhKLQ",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Live Camera Stream | Bondi Aussie Bar & Grill | Chaweng | Koh Samui | Thailand | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-the-shack-fisherman-s-village-bo",
    name: { ja: "LIVE The Shack Fisherman's Village Bophut | Koh Samui Street Webcam | Thailand 24/7 | 2160p 4K", en: "LIVE The Shack Fisherman's Village Bophut | Koh Samui Street Webcam | Thailand 24/7 | 2160p 4K" },
    lat: 15.5,
    lng: 101,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "bbBGNNPu0rg",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 LIVE The Shack Fisherman's Village Bophut | Koh Samui Street Webcam | Thailand 24/7 | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-4k-kata-beach-kata-noi-beach-walking",
    name: { ja: "[4K] Kata Beach & Kata Noi Beach🇹🇭 Walking Tour on a Hot & Sunny Day | Phuket, Thailand", en: "[4K] Kata Beach & Kata Noi Beach🇹🇭 Walking Tour on a Hot & Sunny Day | Phuket, Thailand" },
    lat: 7.8906,
    lng: 98.3981,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "_SWYJU609pM",
      channelId: "UCbTcDX9g_EHASsbZ8L0-D1Q",
      titleKey: "[4K] Kata Beach & Kata Noi Beach🇹🇭 Walking Tour on a Hot & Sunny Day | Phuket, Thailand",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-4k-karon-beach-phuket-summer-vibes-re",
    name: { ja: "[4K] Karon Beach, Phuket 🇹🇭 Summer Vibes Relaxing Walk | Thailand", en: "[4K] Karon Beach, Phuket 🇹🇭 Summer Vibes Relaxing Walk | Thailand" },
    lat: 15.5,
    lng: 101,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "tME8ztax5qY",
      channelId: "UCQ51Lf8tDJq7HMjhkuLT7uQ",
      titleKey: "[4K] Karon Beach, Phuket 🇹🇭 Summer Vibes 🔥 Relaxing Walk | Thailand",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-camera-stream-henry-africa-s-bar",
    name: { ja: "Live Camera Stream | Henry Africa's Bar & Café | Soi Green Mango | Koh Samui | Thailand | 2160p 4K", en: "Live Camera Stream | Henry Africa's Bar & Café | Soi Green Mango | Koh Samui | Thailand | 2160p 4K" },
    lat: 9.5467,
    lng: 100.0621,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "6MMXJrzT5c0",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Live Camera Stream | Henry Africa's Bar & Café | Soi Green Mango | Koh Samui | Thailand | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-bangkok-thailand-15-may-26",
    name: { ja: "Bangkok, Thailand | 15 May 26", en: "Bangkok, Thailand | 15 May 26" },
    lat: 13.754,
    lng: 100.5014,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "2sIbwK8tMMk",
      channelId: "UCbXiHnFTVZmnp2IspH2OPTw",
      titleKey: "Bangkok, Thailand | 15 May 26",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-patong-now-rivers-instead-of-streets",
    name: { ja: "Patong Now, Rivers Instead of Streets, Welcome to Rainy Season! | Phuket, Thailand | 01 July 26", en: "Patong Now, Rivers Instead of Streets, Welcome to Rainy Season! | Phuket, Thailand | 01 July 26" },
    lat: 7.8906,
    lng: 98.3981,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "2n6LX4GSnP4",
      channelId: "UCbXiHnFTVZmnp2IspH2OPTw",
      titleKey: "Patong Now, Rivers Instead of Streets, Welcome to Rainy Season! | Phuket, Thailand | 01 July 26",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-baobab-cam-lamai-koh-samui-thailand-l",
    name: { ja: "Baobab Cam | Lamai | Koh Samui | Thailand | Live Beach Webcam | 2160p 4K", en: "Baobab Cam | Lamai | Koh Samui | Thailand | Live Beach Webcam | 2160p 4K" },
    lat: 9.4659,
    lng: 100.045,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "Tpj0cmMVOd0",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Baobab Cam | Lamai | Koh Samui | Thailand | Live Beach Webcam | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-camera-stream-el-gaucho-fisherma",
    name: { ja: "Live Camera Stream | El Gaucho | Fisherman's Village | Bophut | Koh Samui | Thailand | 2160p 4K", en: "Live Camera Stream | El Gaucho | Fisherman's Village | Bophut | Koh Samui | Thailand | 2160p 4K" },
    lat: 9.5467,
    lng: 100.0621,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "FyFAqPHBKiQ",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Live Camera Stream | El Gaucho | Fisherman's Village | Bophut | Koh Samui | Thailand | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-live-camera-stream-floating-lotus-big",
    name: { ja: "Live Camera Stream | Floating Lotus | Big Buddha | Koh Samui | Thailand | 2160p 4K", en: "Live Camera Stream | Floating Lotus | Big Buddha | Koh Samui | Thailand | 2160p 4K" },
    lat: 9.5467,
    lng: 100.0621,
    timeZone: "Asia/Bangkok",
    category: "nature",
    country: "TH",
    source: {
      videoId: "x73IEW0fOo0",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Live Camera Stream | Floating Lotus | Big Buddha | Koh Samui | Thailand | 2160p 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-soi-green-mango-munchies-cam-chaweng",
    name: { ja: "Soi Green Mango / Munchies Cam | Chaweng | Koh Samui | Thailand | Live Street Webcam", en: "Soi Green Mango / Munchies Cam | Chaweng | Koh Samui | Thailand | Live Street Webcam" },
    lat: 9.5237,
    lng: 100.0588,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "yFgVmioYkys",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Soi Green Mango / Munchies Cam | Chaweng | Koh Samui | Thailand | Live Street Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-famous-the-best-pancake-man-chaweng-k",
    name: { ja: "Famous \"The Best Pancake Man\" | Chaweng | Koh Samui | Thailand | Live Street Webcam", en: "Famous \"The Best Pancake Man\" | Chaweng | Koh Samui | Thailand | Live Street Webcam" },
    lat: 9.5237,
    lng: 100.0588,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "e9T0L_POAOk",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 Famous \"The Best Pancake Man\" | Chaweng | Koh Samui | Thailand | Live Street Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "th-sin-punch-machine-soi-green-mango-cha",
    name: { ja: "SIN Punch Machine | Soi Green Mango | Chaweng | Koh Samui | Thailand | Live Street Webcam", en: "SIN Punch Machine | Soi Green Mango | Chaweng | Koh Samui | Thailand | Live Street Webcam" },
    lat: 9.5237,
    lng: 100.0588,
    timeZone: "Asia/Bangkok",
    category: "city",
    country: "TH",
    source: {
      videoId: "UNbOvsRAx9U",
      channelId: "UCmYyJaUxYiF5IbLx-0jFXHQ",
      titleKey: "🔴 SIN Punch Machine | Soi Green Mango | Chaweng | Koh Samui | Thailand | Live Street Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "tw-4k-taiwan-taoyuan-international-airpo",
    name: { ja: "【4K】Taiwan Taoyuan International Airport (TPE/RCTP) Live Camera 24/7 桃園國際機場即時影像｜桃園機場", en: "【4K】Taiwan Taoyuan International Airport (TPE/RCTP) Live Camera 24/7 桃園國際機場即時影像｜桃園機場" },
    lat: 25.0777,
    lng: 121.2328,
    timeZone: "Asia/Taipei",
    category: "airport",
    country: "TW",
    source: {
      videoId: "91PfFoqvuUk",
      channelId: "UCARB8y6PuoOBjZXJKIG-LDw",
      titleKey: "【4K】Taiwan Taoyuan International Airport (TPE/RCTP) Live Camera 24/7 桃園國際機場即時影像｜桃園機場",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-view-downtown-cary-park",
    name: { ja: "Live View — Downtown Cary Park", en: "Live View — Downtown Cary Park" },
    lat: 37.2634,
    lng: -88.1386,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "YVXZk3-kzcI",
      channelId: "UCFO7o7pWJ05YPZH6-T0hiyw",
      titleKey: "Live View — Downtown Cary Park",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-watch-live-from-the-internationa",
    name: { ja: "LIVE: Watch Live From The International Space Station | NASA Hosts Spectacular Viewing Event | APT", en: "LIVE: Watch Live From The International Space Station | NASA Hosts Spectacular Viewing Event | APT" },
    lat: 35.7742,
    lng: -90.6723,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "nczOMPJGGAQ",
      channelId: "UCpLEtz3H0jSfEneSdf1YKnw",
      titleKey: "LIVE: Watch Live From The International Space Station | NASA Hosts Spectacular Viewing Event | APT",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bridge-cam",
    name: { ja: "Bridge Cam", en: "Bridge Cam" },
    lat: 42.1294,
    lng: -113.3425,
    timeZone: "America/Boise",
    category: "harbor",
    country: "US",
    source: {
      videoId: "36MiI7NltHk",
      channelId: "UCzkaQrI9-nSv373EvK5p0SQ",
      titleKey: "Bridge Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-fairlawn-cam",
    name: { ja: "Fairlawn Cam", en: "Fairlawn Cam" },
    lat: 41.1278,
    lng: -81.6098,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "lXxV3gkhaBA",
      channelId: "UCzkaQrI9-nSv373EvK5p0SQ",
      titleKey: "Fairlawn Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-rochelle-illinois-usa-live-train-came",
    name: { ja: "Rochelle, Illinois, USA | LIVE Train Camera (PTZ)", en: "Rochelle, Illinois, USA | LIVE Train Camera (PTZ)" },
    lat: 41.9239,
    lng: -89.0687,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "LhNpn9L5ndM",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Rochelle, Illinois, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-new-york-city-its-beautiful-out",
    name: { ja: "LIVE New York City - Its Beautiful out here in Manhattan Thursday July 23 2026", en: "LIVE New York City - Its Beautiful out here in Manhattan Thursday July 23 2026" },
    lat: 40.7143,
    lng: -74.006,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "tQUBwbZ8fPU",
      channelId: "UC4qTVx622WLRRBWvGCecFGg",
      titleKey: "LIVE New York City - Its Beautiful out here in Manhattan Thursday July 23 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-lake-champlain-webcam-in-4k-port",
    name: { ja: "LIVE: Lake Champlain Webcam in 4K | Port Henry, NY | Bridgeview Harbour Marina", en: "LIVE: Lake Champlain Webcam in 4K | Port Henry, NY | Bridgeview Harbour Marina" },
    lat: 44.0484,
    lng: -73.4599,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "Bf7ewHyVP5I",
      channelId: "UCc8I291isx67uwolejV0lwA",
      titleKey: "LIVE: Lake Champlain Webcam in 4K | Port Henry, NY | Bridgeview Harbour Marina",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-marlborough-ma-live-stream",
    name: { ja: "Marlborough, MA- LIVE STREAM", en: "Marlborough, MA- LIVE STREAM" },
    lat: 42.3459,
    lng: -71.5523,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "-xH-9TxpRY8",
      channelId: "UC5CYAISsuVfTiKqYg3qilfw",
      titleKey: "Marlborough, MA- LIVE STREAM",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-st-paul-minnesota-usa-live-train-came",
    name: { ja: "St. Paul, Minnesota, USA | LIVE Train Camera (Fixed View – East)", en: "St. Paul, Minnesota, USA | LIVE Train Camera (Fixed View – East)" },
    lat: 44.9344,
    lng: -93.0599,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "u5dt2mHDuxQ",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "St. Paul, Minnesota, USA | LIVE Train Camera (Fixed View – East)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-la-plata-missouri-usa-live-train-came",
    name: { ja: "La Plata, Missouri, USA | LIVE Train Camera (PTZ – Lookout)", en: "La Plata, Missouri, USA | LIVE Train Camera (PTZ – Lookout)" },
    lat: 40.0234,
    lng: -92.4916,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "iz9IQhp_fu0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "La Plata, Missouri, USA | LIVE Train Camera (PTZ – Lookout)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-los-angeles-lax-airport-action-a",
    name: { ja: "LIVE LOS ANGELES (LAX) AIRPORT ACTION! (August 16th, 2026)", en: "LIVE LOS ANGELES (LAX) AIRPORT ACTION! (August 16th, 2026)" },
    lat: 34.0522,
    lng: -118.2437,
    timeZone: "America/Los_Angeles",
    category: "airport",
    country: "US",
    source: {
      videoId: "2uWwGaunibo",
      channelId: "UCZpB0MKAHs4k_TTpHllCLSQ",
      titleKey: "🔴LIVE LOS ANGELES (LAX) AIRPORT ACTION!  (August 16th, 2026)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-boston-ma-live-cam-boston-common-at-b",
    name: { ja: "Boston, MA Live Cam - Boston Common at Boylston St.", en: "Boston, MA Live Cam - Boston Common at Boylston St." },
    lat: 42.3584,
    lng: -71.0598,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "2lRbwu4TVtA",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "Boston, MA Live Cam - Boston Common at Boylston St.",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-brown-kopel-eng-student-achievement-c",
    name: { ja: "Brown-Kopel Eng Student Achievement Center - Analytical, Innovation and Manufacturing Laboratory", en: "Brown-Kopel Eng Student Achievement Center - Analytical, Innovation and Manufacturing Laboratory" },
    lat: 34.5229,
    lng: -82.4943,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "W_UF7ZGCeXY",
      channelId: "UCzmWqxLV9jVoxvmrbiuBUMw",
      titleKey: "Brown-Kopel Eng Student Achievement Center - Analytical, Innovation and Manufacturing Laboratory",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-dubois-wy-town-camera",
    name: { ja: "Range Dubois, WY Town Camera", en: "Range Dubois, WY Town Camera" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "cavcN9tRJzE",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Dubois, WY Town Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-camera",
    name: { ja: "Live Camera", en: "Live Camera" },
    lat: 41.0127,
    lng: -80.755,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "g3l3efxU7k0",
      channelId: "UCGeF_CUruI9K1im6ue4NBWg",
      titleKey: "Live Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-round-lake-cam-by-charlevoixcam",
    name: { ja: "Round Lake Cam | by CharlevoixCam", en: "Round Lake Cam | by CharlevoixCam" },
    lat: 42.3534,
    lng: -88.0934,
    timeZone: "America/Chicago",
    category: "harbor",
    country: "US",
    source: {
      videoId: "AvO984goDHQ",
      channelId: "UCVcXIDytvkhJibfTwqwwzNQ",
      titleKey: "Round Lake Cam | by CharlevoixCam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-bird-cam-24-7-missouri-ozarks-ca",
    name: { ja: "LIVE Bird Cam 24/7 - Missouri Ozarks Cardinals, Blue Jays & Woodpeckers | Real Sound, No Loops", en: "LIVE Bird Cam 24/7 - Missouri Ozarks Cardinals, Blue Jays & Woodpeckers | Real Sound, No Loops" },
    lat: 30.4744,
    lng: -91.1232,
    timeZone: "America/Chicago",
    category: "animal",
    country: "US",
    source: {
      videoId: "_wnjeiATFk4",
      channelId: "UC6ut-iMQD37vWRHzlqJKuEg",
      titleKey: "🔴LIVE Bird Cam 24/7 - Missouri Ozarks Cardinals, Blue Jays & Woodpeckers | Real Sound, No Loops",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-kansas-city-missouri-usa-live-train-c",
    name: { ja: "Kansas City, Missouri, USA | LIVE Train Camera (PTZ – Bottom)", en: "Kansas City, Missouri, USA | LIVE Train Camera (PTZ – Bottom)" },
    lat: 39.0997,
    lng: -94.5786,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "PyLw5HQKiYU",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Kansas City, Missouri, USA | LIVE Train Camera (PTZ – Bottom)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-horseshoe-curve-altoona-pennsylvania",
    name: { ja: "Horseshoe Curve – Altoona, Pennsylvania, USA | LIVE Train Camera (PTZ)", en: "Horseshoe Curve – Altoona, Pennsylvania, USA | LIVE Train Camera (PTZ)" },
    lat: 39.6379,
    lng: -78.8917,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "ssuM6NJQ2no",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Horseshoe Curve – Altoona, Pennsylvania, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-folkston-georgia-usa-live-train-camer",
    name: { ja: "Folkston, Georgia, USA | LIVE Train Camera (Depot PTZ)", en: "Folkston, Georgia, USA | LIVE Train Camera (Depot PTZ)" },
    lat: 30.831,
    lng: -82.0113,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "FHYqepozgiQ",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Folkston, Georgia, USA  |  LIVE Train Camera (Depot PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-north-conway-new-hampshire-live-cam",
    name: { ja: "North Conway, New Hampshire - LIVE CAM", en: "North Conway, New Hampshire - LIVE CAM" },
    lat: 44.0537,
    lng: -71.1284,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "H8bFFw-0ZQE",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "North Conway, New Hampshire - LIVE CAM",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-galesburg-illinois-usa-live-train-cam",
    name: { ja: "Galesburg, Illinois, USA | LIVE Train Camera (PTZ)", en: "Galesburg, Illinois, USA | LIVE Train Camera (PTZ)" },
    lat: 40.9478,
    lng: -90.3712,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "On1MRt0NqFs",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Galesburg, Illinois, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-baggs-wy-north",
    name: { ja: "Range Baggs, WY North", en: "Range Baggs, WY North" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "qzNgK27jXK0",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Baggs, WY North",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-hot-springs-state-park-lower-te",
    name: { ja: "Range Hot Springs State Park Lower Terrace Thermopolis, WY", en: "Range Hot Springs State Park Lower Terrace Thermopolis, WY" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "lrkKxtHV70E",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Hot Springs State Park Lower Terrace Thermopolis, WY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-broadus-mt",
    name: { ja: "Range Broadus, MT", en: "Range Broadus, MT" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "HbxRw7ED3dE",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Broadus, MT",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-sheridan-wy-grinnell-street",
    name: { ja: "Range Sheridan, WY Grinnell Street", en: "Range Sheridan, WY Grinnell Street" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "7HJ2ctibBeY",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Sheridan, WY Grinnell Street",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-baggs-wy-south",
    name: { ja: "Range Baggs, WY South", en: "Range Baggs, WY South" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "oY9HOqAU_Gc",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Baggs, WY South",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-forsyth-mt-downtown",
    name: { ja: "Range Forsyth, MT Downtown", en: "Range Forsyth, MT Downtown" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "MA5BTAmKdiY",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Forsyth, MT Downtown",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-2026-08-16-ober-gatlinburg-sky-villag",
    name: { ja: "2026-08-16 Ober Gatlinburg Sky Village Live Camera (3,455ft)", en: "2026-08-16 Ober Gatlinburg Sky Village Live Camera (3,455ft)" },
    lat: 38.8951,
    lng: -77.0364,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "xXoZGQcbkFg",
      channelId: "UC4JzbPHJtEyHjwIQeka3ivg",
      titleKey: "2026-08-16 Ober Gatlinburg Sky Village Live Camera (3,455ft)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-lava-mountain-wy",
    name: { ja: "Range Lava Mountain, WY", en: "Range Lava Mountain, WY" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "i5aqpgo31AE",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Lava Mountain, WY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-sundance-wy-downtown",
    name: { ja: "Range Sundance, WY Downtown", en: "Range Sundance, WY Downtown" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "Iv19IkyodjQ",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Sundance, WY Downtown",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-hot-springs-state-park-cooling",
    name: { ja: "Range Hot Springs State Park Cooling Ponds Thermopolis, WY", en: "Range Hot Springs State Park Cooling Ponds Thermopolis, WY" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "1x3-yuBWVv4",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range Hot Springs State Park Cooling Ponds Thermopolis, WY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-dunoir-pass-wy",
    name: { ja: "Range DuNoir Pass, WY", en: "Range DuNoir Pass, WY" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "JNVTH8R58Lk",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range DuNoir Pass, WY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-vla-today-karl-g-jansky-very-large-ar",
    name: { ja: "VLA Today — Karl G. Jansky Very Large Array | Live 24/7 Stream | Socorro, New Mexico", en: "VLA Today — Karl G. Jansky Very Large Array | Live 24/7 Stream | Socorro, New Mexico" },
    lat: 34.0584,
    lng: -106.8914,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "cIqrAg-p3Q0",
      channelId: "UCwvFovK5r2VYSi5gLp4od7g",
      titleKey: "VLA Today — Karl G. Jansky Very Large Array | Live 24/7 Stream | Socorro, New Mexico",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-pompano-beach-florida-live-cam",
    name: { ja: "Pompano Beach, Florida - Live Cam", en: "Pompano Beach, Florida - Live Cam" },
    lat: 26.2379,
    lng: -80.1248,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "zclpD3QKEK4",
      channelId: "UCDDd_7qKvp35LC_Pps6NQSg",
      titleKey: "🔴Pompano Beach, Florida - Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-range-snokater-union-pass-wy",
    name: { ja: "Range SnoKater Union Pass, WY", en: "Range SnoKater Union Pass, WY" },
    lat: 31.3127,
    lng: -87.2355,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "H8-s9i4iDHo",
      channelId: "UCZN_xkkEPhr15LSQoVVg9sA",
      titleKey: "Range SnoKater Union Pass, WY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-wichita-state-university-crossland-st",
    name: { ja: "Wichita State University - Crossland Stadium Construction Camera", en: "Wichita State University - Crossland Stadium Construction Camera" },
    lat: 37.7225,
    lng: -97.2959,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "tRXZ-T3nBj8",
      channelId: "UC71j6am53VXXteMIBsHpPbQ",
      titleKey: "Wichita State University - Crossland Stadium Construction Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-hampton-beach-webcam",
    name: { ja: "Hampton Beach Webcam", en: "Hampton Beach Webcam" },
    lat: 42.9073,
    lng: -70.812,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "jZEvrGZ_8y0",
      channelId: "UCztcSr39dluY_X0U7Nu2C7A",
      titleKey: "Hampton Beach Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-rail-cam-fullerton-california-bn",
    name: { ja: "LIVE Rail Cam – Fullerton, California | BNSF Mainline + Amtrak + Metrolink | RailStream", en: "LIVE Rail Cam – Fullerton, California | BNSF Mainline + Amtrak + Metrolink | RailStream" },
    lat: 37.2998,
    lng: -92.3049,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "DgGeCeD_HBU",
      channelId: "UC-bPJdfIq5zqIP_PQ7rUJaA",
      titleKey: "LIVE Rail Cam – Fullerton, California | BNSF Mainline + Amtrak + Metrolink | RailStream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-cnu-construction-webcam",
    name: { ja: "CNU Construction Webcam", en: "CNU Construction Webcam" },
    lat: 35.7201,
    lng: -88.8217,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "R__vCVR0zRw",
      channelId: "UCCX_-LRnGh1vq_doQ_NryPQ",
      titleKey: "CNU Construction Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-wichita-state-university-niar-hamr-co",
    name: { ja: "Wichita State University – NIAR HAMR Construction Camera", en: "Wichita State University – NIAR HAMR Construction Camera" },
    lat: 37.7225,
    lng: -97.2959,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "99l3LNKtnkI",
      channelId: "UC71j6am53VXXteMIBsHpPbQ",
      titleKey: "Wichita State University – NIAR HAMR Construction Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-street-cam-taxi-uber-driving-the",
    name: { ja: "LIVE | Street Cam | TAXI UBER Driving the Streets of NYC", en: "LIVE | Street Cam | TAXI UBER Driving the Streets of NYC" },
    lat: 39.669,
    lng: -76.3794,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "DaHHb4OfZpw",
      channelId: "UCbU_Mrz445b-XHACkT5x7bg",
      titleKey: "🔴 LIVE | Street Cam | TAXI UBER Driving the Streets of NYC 🚕",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-la-plata-missouri-usa-live-train-2",
    name: { ja: "La Plata, Missouri, USA | LIVE Train Camera (Fixed View – West)", en: "La Plata, Missouri, USA | LIVE Train Camera (Fixed View – West)" },
    lat: 40.0234,
    lng: -92.4916,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "flEBdsoP4o0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "La Plata, Missouri, USA | LIVE Train Camera (Fixed View – West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-quincy-illinois-usa-live-train-camera",
    name: { ja: "Quincy, Illinois, USA | LIVE Train Camera (Fixed View – East)", en: "Quincy, Illinois, USA | LIVE Train Camera (Fixed View – East)" },
    lat: 39.9356,
    lng: -91.4099,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "a__yfG4PnxY",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Quincy, Illinois, USA | LIVE Train Camera (Fixed View – East)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-turners-falls-massachusetts-municipal",
    name: { ja: "Turners Falls, Massachusetts - Municipal Airport Live Cam", en: "Turners Falls, Massachusetts - Municipal Airport Live Cam" },
    lat: 42.6043,
    lng: -72.5565,
    timeZone: "America/New_York",
    category: "airport",
    country: "US",
    source: {
      videoId: "f5D4lPET76s",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "Turners Falls, Massachusetts - Municipal Airport Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-kansas-city-missouri-usa-live-tra-2",
    name: { ja: "Kansas City, Missouri, USA | LIVE Train Camera (Doc’s Caboose – West)", en: "Kansas City, Missouri, USA | LIVE Train Camera (Doc’s Caboose – West)" },
    lat: 39.0997,
    lng: -94.5786,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "xR3kxBG_v7Y",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Kansas City, Missouri, USA | LIVE Train Camera (Doc’s Caboose – West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-owners-club-parking-lot-webcam",
    name: { ja: "Owners' Club Parking Lot Webcam", en: "Owners' Club Parking Lot Webcam" },
    lat: 42.3934,
    lng: -90.3258,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "Mkx0yNlsPrQ",
      channelId: "UCE9IcrWuQiFU4ylwH-0GEbg",
      titleKey: "Owners' Club Parking Lot Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-fort-madison-iowa-usa-live-train-came",
    name: { ja: "Fort Madison, Iowa, USA | LIVE Train Camera (PTZ)", en: "Fort Madison, Iowa, USA | LIVE Train Camera (PTZ)" },
    lat: 40.6298,
    lng: -91.3152,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "L6eG4ahJc_Q",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Fort Madison, Iowa, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-princeton-indiana-usa-live-train-came",
    name: { ja: "Princeton, Indiana, USA | LIVE Train Camera (Fixed View – South)", en: "Princeton, Indiana, USA | LIVE Train Camera (Fixed View – South)" },
    lat: 38.3553,
    lng: -87.5675,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "jRvnO7D-FpA",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Princeton, Indiana, USA | LIVE Train Camera (Fixed View – South)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-skykomish-washington-usa-live-train-c",
    name: { ja: "Skykomish, Washington, USA | LIVE Train Camera (PTZ)", en: "Skykomish, Washington, USA | LIVE Train Camera (PTZ)" },
    lat: 47.7093,
    lng: -121.3601,
    timeZone: "America/Los_Angeles",
    category: "railway",
    country: "US",
    source: {
      videoId: "jxvalaix3K0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Skykomish, Washington, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-cordele-georgia-usa-live-train-camera",
    name: { ja: "Cordele, Georgia, USA | LIVE Train Camera (PTZ)", en: "Cordele, Georgia, USA | LIVE Train Camera (PTZ)" },
    lat: 31.9635,
    lng: -83.7824,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "Sj-TMZX_4_s",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Cordele, Georgia, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-the-wedge-east-views",
    name: { ja: "The Wedge - East Views", en: "The Wedge - East Views" },
    lat: 38.7258,
    lng: -111.1113,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "zreXOQN2bDo",
      channelId: "UCaInTXiabNlYe1zreHafFvA",
      titleKey: "The Wedge - East Views",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-deshler-ohio-usa-live-train-camera-fi",
    name: { ja: "Deshler, Ohio, USA | LIVE Train Camera (Fixed View — Diamond)", en: "Deshler, Ohio, USA | LIVE Train Camera (Fixed View — Diamond)" },
    lat: 41.2075,
    lng: -83.8991,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "Y28qU7UsFko",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Deshler, Ohio, USA | LIVE Train Camera (Fixed View — Diamond)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-houston-texas-24-7-live-downtown-skyl",
    name: { ja: "Houston, Texas | 24/7 Live Downtown Skyline Camera", en: "Houston, Texas | 24/7 Live Downtown Skyline Camera" },
    lat: 29.7633,
    lng: -95.3633,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "wUQc3RoLAPs",
      channelId: "UCDmNmxF3ZVMeGyvWE9tOqPQ",
      titleKey: "Houston, Texas | 24/7 Live Downtown Skyline Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-official-las-vegas-airport-live-24-7",
    name: { ja: "Official - LAS Vegas Airport LIVE 24/7", en: "Official - LAS Vegas Airport LIVE 24/7" },
    lat: 41.8492,
    lng: -87.9334,
    timeZone: "America/Chicago",
    category: "airport",
    country: "US",
    source: {
      videoId: "iIUCaiiMmNs",
      channelId: "UCYDCnc3YBEqxfuhvQ4rxqSA",
      titleKey: "Official - LAS Vegas Airport LIVE 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-cornelia-ga-ns-greenville-district-mp",
    name: { ja: "Cornelia, GA | NS Greenville District MP 559.9 | SouthWest RailCams LIVE", en: "Cornelia, GA | NS Greenville District MP 559.9 | SouthWest RailCams LIVE" },
    lat: 34.5115,
    lng: -83.5271,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "QwbkUOoiTKs",
      channelId: "UCxaKME3e34j3aTESZZ3h7Sg",
      titleKey: "Cornelia, GA | NS Greenville District MP 559.9 | SouthWest RailCams LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-maymont-live-otter-cam-richmond-va-ba",
    name: { ja: "Maymont LIVE Otter Cam | Richmond, VA | Bastionpoint Technology", en: "Maymont LIVE Otter Cam | Richmond, VA | Bastionpoint Technology" },
    lat: 37.5538,
    lng: -77.4603,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "Or1Wz--cV2Y",
      channelId: "UCKKd7GDS5RoPBzX9y4lv5Qg",
      titleKey: "Maymont LIVE Otter Cam | Richmond, VA | Bastionpoint Technology",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-miami-international-airport-mia-live",
    name: { ja: "Miami International Airport (MIA) Live Cam | Embassy Suites by Hilton Miami International Airport", en: "Miami International Airport (MIA) Live Cam | Embassy Suites by Hilton Miami International Airport" },
    lat: 25.7934,
    lng: -80.29,
    timeZone: "America/New_York",
    category: "airport",
    country: "US",
    source: {
      videoId: "q2Dxx5704fQ",
      channelId: "UC5lNakfSdpqXCW214H5sBgQ",
      titleKey: "Miami International Airport (MIA) Live Cam | Embassy Suites by Hilton Miami International Airport",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-hd-stream-courtyard-by-marriott",
    name: { ja: "Live HD Stream - Courtyard by Marriott South Padre Island Live Beach Webcam", en: "Live HD Stream - Courtyard by Marriott South Padre Island Live Beach Webcam" },
    lat: 26.1037,
    lng: -97.1647,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "dzylsC0KcOE",
      channelId: "UC7KUFEpqlSDLWewaBjr6a8w",
      titleKey: "Live HD Stream - Courtyard by Marriott South Padre Island Live Beach Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-midway-airport-chicago-il-usa-streamt",
    name: { ja: "Midway Airport | Chicago, IL USA | StreamTime LIVE 4K", en: "Midway Airport | Chicago, IL USA | StreamTime LIVE 4K" },
    lat: 41.7868,
    lng: -87.7455,
    timeZone: "America/Chicago",
    category: "airport",
    country: "US",
    source: {
      videoId: "67BCsiW-1Io",
      channelId: "UCrtIIVfi-5tMlVXdMDzOMUA",
      titleKey: "Midway Airport | Chicago, IL USA | StreamTime LIVE  4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bay-shore-park-boat-launch",
    name: { ja: "Bay Shore Park - Boat Launch", en: "Bay Shore Park - Boat Launch" },
    lat: 39.9509,
    lng: -74.1132,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "wfGEsNQYAeE",
      channelId: "UCogZxGoCauBYc1AmDL3Vw8A",
      titleKey: "Bay Shore Park - Boat Launch",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-us-capitol-building-senate-floor-live",
    name: { ja: "️ US Capitol Building | Senate Floor LIVE | Washington D.C. 24/7", en: "️ US Capitol Building | Senate Floor LIVE | Washington D.C. 24/7" },
    lat: 38.8951,
    lng: -77.0364,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "2-glov2GinU",
      channelId: "UCScswbWVOicLBZwD_6zfXkA",
      titleKey: "🏛️ US Capitol Building | Senate Floor LIVE | Washington D.C. 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-traverse-city-mi-west-bay-camera",
    name: { ja: "LIVE | Traverse City, MI | West Bay Camera", en: "LIVE | Traverse City, MI | West Bay Camera" },
    lat: 44.7631,
    lng: -85.6206,
    timeZone: "America/Detroit",
    category: "nature",
    country: "US",
    source: {
      videoId: "2ETj1sUmEmU",
      channelId: "UCYWJbeYvOMDm6avN5GaRa3Q",
      titleKey: "LIVE | Traverse City, MI | West Bay Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-cheyenne-wyoming-usa-live-train-camer",
    name: { ja: "Cheyenne, Wyoming, USA | LIVE Train Camera (Fixed View - West)", en: "Cheyenne, Wyoming, USA | LIVE Train Camera (Fixed View - West)" },
    lat: 41.14,
    lng: -104.8203,
    timeZone: "America/Denver",
    category: "railway",
    country: "US",
    source: {
      videoId: "p9CJkmVgxp0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Cheyenne, Wyoming, USA | LIVE Train Camera (Fixed View - West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-view-at-ocean-creek-resort-myrtl",
    name: { ja: "Live View at Ocean Creek Resort | Myrtle Beach, SC", en: "Live View at Ocean Creek Resort | Myrtle Beach, SC" },
    lat: 33.6891,
    lng: -78.8867,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "lsD46RnvUiw",
      channelId: "UCUqP3f8JxvTVfAv-2L5NE6g",
      titleKey: "Live View at Ocean Creek Resort | Myrtle Beach, SC",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-los-angeles-lax-airport-acti-2",
    name: { ja: "LIVE LOS ANGELES (LAX) AIRPORT ACTION! (August 2nd, 2026)", en: "LIVE LOS ANGELES (LAX) AIRPORT ACTION! (August 2nd, 2026)" },
    lat: 34.0522,
    lng: -118.2437,
    timeZone: "America/Los_Angeles",
    category: "airport",
    country: "US",
    source: {
      videoId: "kCiMm5VjBp0",
      channelId: "UCZpB0MKAHs4k_TTpHllCLSQ",
      titleKey: "🔴LIVE LOS ANGELES (LAX) AIRPORT ACTION! (August 2nd, 2026)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-fairport-new-york-usa-live-train-came",
    name: { ja: "Fairport, New York, USA | LIVE Train Camera (Fixed View – West)", en: "Fairport, New York, USA | LIVE Train Camera (Fixed View – West)" },
    lat: 42.167,
    lng: -76.8205,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "XWxyuL9dctA",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Fairport, New York, USA | LIVE Train Camera (Fixed View – West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-salt-lake-city-utah-usa-live-train-ca",
    name: { ja: "Salt Lake City, Utah, USA | LIVE Train Camera (Fixed View - South)", en: "Salt Lake City, Utah, USA | LIVE Train Camera (Fixed View - South)" },
    lat: 40.7608,
    lng: -111.8911,
    timeZone: "America/Denver",
    category: "railway",
    country: "US",
    source: {
      videoId: "NP-bvAcswIM",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Salt Lake City, Utah, USA | LIVE Train Camera (Fixed View - South)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-sunny-isles-beach-miami-fl-live-cam",
    name: { ja: "Sunny Isles Beach - Miami, FL - Live Cam", en: "Sunny Isles Beach - Miami, FL - Live Cam" },
    lat: 25.9506,
    lng: -80.1228,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "bi7B4EmyHHs",
      channelId: "UCocW5nyYL6ygYqOGqu8z6Vg",
      titleKey: "🔴 Sunny Isles Beach - Miami, FL - Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-rotary-park",
    name: { ja: "Rotary Park", en: "Rotary Park" },
    lat: 36.0567,
    lng: -90.5073,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "yJefbf6d2Vk",
      channelId: "UCv9D0xATZ18lnDzhWVEtnIA",
      titleKey: "Rotary Park",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-the-cove-leland-fishtown-live",
    name: { ja: "The Cove Leland Fishtown Live", en: "The Cove Leland Fishtown Live" },
    lat: 26.3115,
    lng: -80.0848,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "s7sY1waeOf4",
      channelId: "UCWtwhsqQXogkkQEFBrFwwRA",
      titleKey: "The Cove Leland Fishtown Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-buck-hill-plaza",
    name: { ja: "Buck Hill Plaza", en: "Buck Hill Plaza" },
    lat: 43.7942,
    lng: -76.1733,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "2WzUGFz03v8",
      channelId: "UC-G-G7Z2pfUz9e5BBApHp9w",
      titleKey: "Buck Hill Plaza",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-strasburg-pennsylvania-usa-live-train",
    name: { ja: "Strasburg, Pennsylvania, USA | LIVE Train Camera (PTZ)", en: "Strasburg, Pennsylvania, USA | LIVE Train Camera (PTZ)" },
    lat: 39.9832,
    lng: -76.1841,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "RZpIX6cq7Os",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Strasburg, Pennsylvania, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-video-from-the-international-spa",
    name: { ja: "Live Video from the International Space Station (Official NASA Stream)", en: "Live Video from the International Space Station (Official NASA Stream)" },
    lat: 29.5324,
    lng: -95.2238,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "M3HKLzjvKPc",
      channelId: "UCLA_DiR1FfKNvjuUpBHmylQ",
      titleKey: "Live Video from the International Space Station (Official NASA Stream)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-decatur-alabama-usa-live-train-camera",
    name: { ja: "Decatur, Alabama, USA | LIVE Train Camera (Fixed View – West)", en: "Decatur, Alabama, USA | LIVE Train Camera (Fixed View – West)" },
    lat: 34.6059,
    lng: -86.9833,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "5YG01nZOygQ",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Decatur, Alabama, USA | LIVE Train Camera (Fixed View – West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-cnu-great-lawn-webcam",
    name: { ja: "CNU Great Lawn Webcam", en: "CNU Great Lawn Webcam" },
    lat: 43.2417,
    lng: -75.2568,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "1j-V9OAVQN0",
      channelId: "UCxovy5qTcwjsyl3ETKAOgdg",
      titleKey: "CNU Great Lawn Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-los-angeles-lax-airport-action-j",
    name: { ja: "LIVE LOS ANGELES (LAX) AIRPORT ACTION! (July 28th, 2026)", en: "LIVE LOS ANGELES (LAX) AIRPORT ACTION! (July 28th, 2026)" },
    lat: 34.0522,
    lng: -118.2437,
    timeZone: "America/Los_Angeles",
    category: "airport",
    country: "US",
    source: {
      videoId: "ZM93fJZkUxE",
      channelId: "UCZpB0MKAHs4k_TTpHllCLSQ",
      titleKey: "🔴LIVE LOS ANGELES (LAX) AIRPORT ACTION! (July 28th, 2026)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-canyon-lodge",
    name: { ja: "Canyon Lodge", en: "Canyon Lodge" },
    lat: 37.6308,
    lng: -119.0326,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "9--ZgYEZBhk",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Canyon Lodge",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bryant-park-webcam",
    name: { ja: "Bryant Park Webcam", en: "Bryant Park Webcam" },
    lat: 34.5026,
    lng: -91.5571,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "Zmmskdpi4QE",
      channelId: "UC6AlfoRUeH4B1an_R5YSSTw",
      titleKey: "Bryant Park Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-beach-cam-solglimt-b-b",
    name: { ja: "Beach Cam (Solglimt B & B)", en: "Beach Cam (Solglimt B & B)" },
    lat: 46.9181,
    lng: -104.0044,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "m2wWzo9GmwY",
      channelId: "UCzkaQrI9-nSv373EvK5p0SQ",
      titleKey: "Beach Cam (Solglimt B & B)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-rail-cam-berea-ohio-csx-ns",
    name: { ja: "LIVE Rail Cam – Berea, Ohio | CSX &NS", en: "LIVE Rail Cam – Berea, Ohio | CSX &NS" },
    lat: 37.2998,
    lng: -92.3049,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "NKLtXovsWnc",
      channelId: "UC-bPJdfIq5zqIP_PQ7rUJaA",
      titleKey: "LIVE Rail Cam – Berea, Ohio | CSX &NS",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-boston-harbor-massachusetts-live-hyat",
    name: { ja: "Boston Harbor, Massachusetts - Live - Hyatt Regency Boston Harbor", en: "Boston Harbor, Massachusetts - Live - Hyatt Regency Boston Harbor" },
    lat: 42.2622,
    lng: -70.8762,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "3I_cIS24AfY",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "Boston Harbor, Massachusetts - Live - Hyatt Regency Boston Harbor",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-anna-maria-island-florida-live-pool-c",
    name: { ja: "Anna Maria Island, Florida - Live Pool Camera", en: "Anna Maria Island, Florida - Live Pool Camera" },
    lat: 27.5142,
    lng: -82.719,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "EmHLP80PMU0",
      channelId: "UCtOEBEqkaQJWdgox91Cdzcg",
      titleKey: "Anna Maria Island, Florida - Live Pool Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-2026-08-11-ober-gatlinburg-sky-villag",
    name: { ja: "2026-08-11 Ober Gatlinburg Sky Village Live Camera (3,455ft)", en: "2026-08-11 Ober Gatlinburg Sky Village Live Camera (3,455ft)" },
    lat: 38.8951,
    lng: -77.0364,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "a0a9pmFL4B4",
      channelId: "UC4JzbPHJtEyHjwIQeka3ivg",
      titleKey: "2026-08-11 Ober Gatlinburg Sky Village Live Camera (3,455ft)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-big-sandy-texas-usa-live-train-camera",
    name: { ja: "Big Sandy, Texas, USA | LIVE Train Camera (PTZ)", en: "Big Sandy, Texas, USA | LIVE Train Camera (PTZ)" },
    lat: 32.5838,
    lng: -95.1088,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "WNSkLhEWbuY",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Big Sandy, Texas, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-spartanburg-south-carolina-usa-live-t",
    name: { ja: "Spartanburg, South Carolina, USA | LIVE Train Camera (Fixed View – North)", en: "Spartanburg, South Carolina, USA | LIVE Train Camera (Fixed View – North)" },
    lat: 34.9496,
    lng: -81.9321,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "xJMJegqnl8Y",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Spartanburg, South Carolina, USA | LIVE Train Camera (Fixed View – North)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-venice-beach-live-cam-24-7-sunset-sur",
    name: { ja: "Venice Beach LIVE CAM 24/7 | Sunset & Surf Vibes | Boardwalk, Plaza & Ocean View 4K", en: "Venice Beach LIVE CAM 24/7 | Sunset & Surf Vibes | Boardwalk, Plaza & Ocean View 4K" },
    lat: 27.1001,
    lng: -82.4576,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "Pl4SbEOUvIs",
      channelId: "UCqzKLAP6vM4t4zn2ZOtMPIw",
      titleKey: "Venice Beach LIVE CAM 24/7 | Sunset🌅 & Surf Vibes 🌊 | Boardwalk, Plaza & Ocean View 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-campus-point-surf-cam",
    name: { ja: "Campus Point Surf Cam", en: "Campus Point Surf Cam" },
    lat: 30.7832,
    lng: -99.3201,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "JE3EvN55hfE",
      channelId: "UCxd6_Ql2p4OoSXbKZGP0bmg",
      titleKey: "Campus Point Surf Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-greenville-maine-airport-cam-live",
    name: { ja: "Greenville, Maine - Airport Cam Live", en: "Greenville, Maine - Airport Cam Live" },
    lat: 45.4595,
    lng: -69.5906,
    timeZone: "America/New_York",
    category: "airport",
    country: "US",
    source: {
      videoId: "1o39CobYA7Y",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "Greenville, Maine - Airport Cam Live",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-rail-cam-waldwick-nj-njt-ns-rail",
    name: { ja: "LIVE Rail Cam – Waldwick,NJ | NJT & NS | RailStream", en: "LIVE Rail Cam – Waldwick,NJ | NJT & NS | RailStream" },
    lat: 37.2998,
    lng: -92.3049,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "a_IsaWR8fBE",
      channelId: "UC-bPJdfIq5zqIP_PQ7rUJaA",
      titleKey: "LIVE Rail Cam – Waldwick,NJ | NJT & NS | RailStream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-rail-cam-northwood-ohio-vickers",
    name: { ja: "LIVE Rail Cam – Northwood, Ohio | Vickers Crossing", en: "LIVE Rail Cam – Northwood, Ohio | Vickers Crossing" },
    lat: 37.2998,
    lng: -92.3049,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "VxijdxNKA9M",
      channelId: "UC-bPJdfIq5zqIP_PQ7rUJaA",
      titleKey: "LIVE Rail Cam – Northwood, Ohio | Vickers Crossing",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-virginia-beach-fishing-pier-live-cam",
    name: { ja: "Virginia Beach Fishing Pier Live Cam | Virginia Beach, VA", en: "Virginia Beach Fishing Pier Live Cam | Virginia Beach, VA" },
    lat: 36.8529,
    lng: -75.978,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "Zx_7xF2Sbxo",
      channelId: "UCFXlxbLuvqTKrLs1AknAfoQ",
      titleKey: "Virginia Beach Fishing Pier Live Cam | Virginia Beach, VA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-brown-county-reforestation-camp-ski-t",
    name: { ja: "Brown County - Reforestation Camp - Ski Trail Cam", en: "Brown County - Reforestation Camp - Ski Trail Cam" },
    lat: 39.0047,
    lng: -83.9256,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "7e907u5Bug8",
      channelId: "UCogZxGoCauBYc1AmDL3Vw8A",
      titleKey: "Brown County - Reforestation Camp - Ski Trail Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-24-7-nyc-live-cam-times-square-skylin",
    name: { ja: "24/7 NYC Live Cam | Times Square, skyline, streets, more", en: "24/7 NYC Live Cam | Times Square, skyline, streets, more" },
    lat: 40.7143,
    lng: -74.006,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "VGnFLdQW39A",
      channelId: "UCIjSUWHWp6KohfnR5OQTXnQ",
      titleKey: "🔴 24/7 NYC Live Cam | Times Square, skyline, streets, more",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-anchorage-alaska-usa-live-train-camer",
    name: { ja: "Anchorage, Alaska, USA | LIVE Train Camera (Fixed View – North)", en: "Anchorage, Alaska, USA | LIVE Train Camera (Fixed View – North)" },
    lat: 61.2181,
    lng: -149.9003,
    timeZone: "America/Anchorage",
    category: "railway",
    country: "US",
    source: {
      videoId: "WMSiw_Hyac8",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Anchorage, Alaska, USA | LIVE Train Camera (Fixed View – North)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-olympia-lacey-centennial-station-live",
    name: { ja: "Olympia-Lacey Centennial Station Live Railcam - Olympia-Lacey, Washington #steelhighway", en: "Olympia-Lacey Centennial Station Live Railcam - Olympia-Lacey, Washington #steelhighway" },
    lat: 47.0449,
    lng: -122.9017,
    timeZone: "America/Los_Angeles",
    category: "railway",
    country: "US",
    source: {
      videoId: "PftkGaoFl_0",
      channelId: "UCJId-kbfsO5K4kU9cKE_TqA",
      titleKey: "Olympia-Lacey Centennial Station Live Railcam - Olympia-Lacey, Washington #steelhighway",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-austell-georgia-usa-live-train-camera",
    name: { ja: "Austell, Georgia, USA | LIVE Train Camera (PTZ)", en: "Austell, Georgia, USA | LIVE Train Camera (PTZ)" },
    lat: 33.8126,
    lng: -84.6344,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "Ux0rtJXPPQ0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Austell, Georgia, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bedford-wyoming-see-cam",
    name: { ja: "Bedford, Wyoming - See.Cam", en: "Bedford, Wyoming - See.Cam" },
    lat: 42.8994,
    lng: -110.9333,
    timeZone: "America/Denver",
    category: "city",
    country: "US",
    source: {
      videoId: "umZkZ8IQUO4",
      channelId: "UCp_3rU-21SEZrCYFM0a1zbw",
      titleKey: "Bedford, Wyoming - See.Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-jordan-hare-stadium-north-end-zone-mu",
    name: { ja: "Jordan-Hare Stadium - North End Zone Multi-Use Facility", en: "Jordan-Hare Stadium - North End Zone Multi-Use Facility" },
    lat: 47.3208,
    lng: -106.9101,
    timeZone: "America/Denver",
    category: "city",
    country: "US",
    source: {
      videoId: "mVaiVrtHnNA",
      channelId: "UCzmWqxLV9jVoxvmrbiuBUMw",
      titleKey: "Jordan-Hare Stadium - North End Zone Multi-Use Facility",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-tph-johnson-meadow-seetahoe-live-webc",
    name: { ja: "TPH - Johnson Meadow - SeeTahoe Live Webcam", en: "TPH - Johnson Meadow - SeeTahoe Live Webcam" },
    lat: 38.0672,
    lng: -117.2301,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "0m_laVpVw0k",
      channelId: "UCHhmOa8h4O5V4VZPJSRuxJQ",
      titleKey: "TPH - Johnson Meadow - SeeTahoe Live Webcam🔴",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-parking-lot-brighton-ski-resort",
    name: { ja: "Parking Lot - Brighton Ski Resort", en: "Parking Lot - Brighton Ski Resort" },
    lat: 32.5939,
    lng: -117.0856,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "4a-3iEM7bHk",
      channelId: "UC3NvXJeIa_dBZ2ygCKrfCCQ",
      titleKey: "Parking Lot - Brighton Ski Resort",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-base-cam",
    name: { ja: "Base Cam", en: "Base Cam" },
    lat: 39.9622,
    lng: -95.9719,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "vyWAzJAWv4w",
      channelId: "UCfGg4QKTWmRGaV6iIUFofTA",
      titleKey: "Base Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-24-7-reno-tahoe-international-ai",
    name: { ja: "LIVE 24/7 Reno-Tahoe International Airport Plane Spotting - Grand Sierra Resort", en: "LIVE 24/7 Reno-Tahoe International Airport Plane Spotting - Grand Sierra Resort" },
    lat: 39.5296,
    lng: -119.8138,
    timeZone: "America/Los_Angeles",
    category: "airport",
    country: "US",
    source: {
      videoId: "VaDbfFG7RhI",
      channelId: "UCrGlxNlb5D93h3pguRhANtg",
      titleKey: "🔴 LIVE 24/7 Reno-Tahoe International Airport Plane Spotting - Grand Sierra Resort",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-moody-gardens-penguin-cam-live-pengui",
    name: { ja: "Moody Gardens Penguin Cam LIVE | Penguin Habitat Stream at the Aquarium in Galveston, Texas", en: "Moody Gardens Penguin Cam LIVE | Penguin Habitat Stream at the Aquarium in Galveston, Texas" },
    lat: 29.2733,
    lng: -94.8521,
    timeZone: "America/Chicago",
    category: "animal",
    country: "US",
    source: {
      videoId: "HHp4rjhJsWI",
      channelId: "UCKDM9GYy91kKpNOGZVS0ZFg",
      titleKey: "Moody Gardens Penguin Cam LIVE | Penguin Habitat Stream at the Aquarium in Galveston, Texas",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-maui-beach-cam-napili-kai-beach",
    name: { ja: "LIVE Maui Beach Cam | Napili Kai Beach Resort | Maui Live Cam", en: "LIVE Maui Beach Cam | Napili Kai Beach Resort | Maui Live Cam" },
    lat: 20.7702,
    lng: -156.2682,
    timeZone: "Pacific/Honolulu",
    category: "city",
    country: "US",
    source: {
      videoId: "gX7c8hzR17Y",
      channelId: "UC5lNakfSdpqXCW214H5sBgQ",
      titleKey: "LIVE Maui Beach Cam | Napili Kai Beach Resort | Maui Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bahia-honda-live-webcam-big-pine-key",
    name: { ja: "Bahia Honda Live WebCam - Big Pine Key, Florida Keys", en: "Bahia Honda Live WebCam - Big Pine Key, Florida Keys" },
    lat: 24.6682,
    lng: -81.2651,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "_RxQuhI8_TY",
      channelId: "UC_JkC_sNaRfTrbRw9_b2QoA",
      titleKey: "Bahia Honda Live WebCam - Big Pine Key, Florida Keys",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bayfront-cam",
    name: { ja: "Bayfront Cam", en: "Bayfront Cam" },
    lat: 32.7421,
    lng: -79.9634,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "EbVlhVeD3jA",
      channelId: "UCzkaQrI9-nSv373EvK5p0SQ",
      titleKey: "Bayfront Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-itasca-state-park-mississippi-river-h",
    name: { ja: "Itasca State Park - Mississippi River Headwaters", en: "Itasca State Park - Mississippi River Headwaters" },
    lat: 47.1975,
    lng: -95.202,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "F7S3OtWRdA0",
      channelId: "UC2B9wVYer0S_P8e2mAb3MXQ",
      titleKey: "Itasca State Park - Mississippi River Headwaters",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-tucson-live-stream",
    name: { ja: "Tucson Live Stream", en: "Tucson Live Stream" },
    lat: 32.2217,
    lng: -110.9265,
    timeZone: "America/Phoenix",
    category: "city",
    country: "US",
    source: {
      videoId: "T1xu3QXxlDY",
      channelId: "UCCG1RLmUI06JnYlt08bh7Mw",
      titleKey: "Tucson Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-klax-live-jul-22-2026-los-angeles-int",
    name: { ja: "KLAX LIVE | Jul 22, 2026 | LOS ANGELES INT AIRPORT LIVE STREAM WEBCAM IRL", en: "KLAX LIVE | Jul 22, 2026 | LOS ANGELES INT AIRPORT LIVE STREAM WEBCAM IRL" },
    lat: 33.9425,
    lng: -118.409,
    timeZone: "America/Los_Angeles",
    category: "airport",
    country: "US",
    source: {
      videoId: "gRyKW-vr0GY",
      channelId: "UC5PNUCvYkt6PxAmgvAV8x8g",
      titleKey: "KLAX LIVE |  Jul 22, 2026 | LOS ANGELES INT AIRPORT  LIVE STREAM WEBCAM IRL",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-glendale-ohio-usa-live-train-camera-f",
    name: { ja: "Glendale, Ohio, USA | LIVE Train Camera (Fixed View – North)", en: "Glendale, Ohio, USA | LIVE Train Camera (Fixed View – North)" },
    lat: 41.397,
    lng: -81.5423,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "vF4ZdG-_6FE",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Glendale, Ohio, USA | LIVE Train Camera (Fixed View – North)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-mke-live-cam-milwaukee-wisconsin-from",
    name: { ja: "MKE Live Cam - Milwaukee, Wisconsin from MKE.com", en: "MKE Live Cam - Milwaukee, Wisconsin from MKE.com" },
    lat: 43.0389,
    lng: -87.9065,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "7fZ2JLtv_c8",
      channelId: "UCgWmWt_zIBk-X4sCk8fgANA",
      titleKey: "MKE Live Cam - Milwaukee, Wisconsin from MKE.com",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-texarkana-arkansas-usa-live-train-cam",
    name: { ja: "Texarkana, Arkansas, USA | LIVE Train Camera (PTZ)", en: "Texarkana, Arkansas, USA | LIVE Train Camera (PTZ)" },
    lat: 33.4418,
    lng: -94.0377,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "6s1KTevqrNY",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Texarkana, Arkansas, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-chesterton-indiana-usa-live-train-cam",
    name: { ja: "Chesterton, Indiana, USA | LIVE Train Camera (Fixed View – East)", en: "Chesterton, Indiana, USA | LIVE Train Camera (Fixed View – East)" },
    lat: 41.6106,
    lng: -87.0642,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "BDb_sSL-K5k",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Chesterton, Indiana, USA | LIVE Train Camera (Fixed View – East)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-alpena-mi-live-thunder-bay-camer",
    name: { ja: "LIVE | Alpena, MI | Live Thunder Bay Camera |", en: "LIVE | Alpena, MI | Live Thunder Bay Camera |" },
    lat: 45.0617,
    lng: -83.4327,
    timeZone: "America/Detroit",
    category: "nature",
    country: "US",
    source: {
      videoId: "BluUW4pk2ek",
      channelId: "UCSish7YL1ERx13gJbYP3dqQ",
      titleKey: "LIVE | Alpena, MI | Live Thunder Bay Camera |",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-alpena-mi-thunder-bay-harbor-cam",
    name: { ja: "LIVE | Alpena, MI | Thunder Bay Harbor Camera |", en: "LIVE | Alpena, MI | Thunder Bay Harbor Camera |" },
    lat: 45.0617,
    lng: -83.4327,
    timeZone: "America/Detroit",
    category: "harbor",
    country: "US",
    source: {
      videoId: "cTL6RHF3WDs",
      channelId: "UCT3yyiyOkqwi55vKWF1q9Tg",
      titleKey: "LIVE | Alpena, MI | Thunder Bay Harbor Camera |",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-parkville-missouri-usa-live-train-cam",
    name: { ja: "Parkville, Missouri, USA | LIVE Train Camera (Fixed View – East)", en: "Parkville, Missouri, USA | LIVE Train Camera (Fixed View – East)" },
    lat: 39.195,
    lng: -94.6822,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "nO81bQFql7M",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Parkville, Missouri, USA | LIVE Train Camera (Fixed View – East)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-destin-beach-cam-pompano-joe-s-m",
    name: { ja: "LIVE Destin Beach Cam | Pompano Joe's | Miramar Beach, Florida", en: "LIVE Destin Beach Cam | Pompano Joe's | Miramar Beach, Florida" },
    lat: 30.3744,
    lng: -86.3586,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "4mFybDorWPk",
      channelId: "UC-G2YE1oV4v4Fk9Sr2odxaQ",
      titleKey: "LIVE Destin Beach Cam | Pompano Joe's | Miramar Beach, Florida",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-the-village",
    name: { ja: "The Village", en: "The Village" },
    lat: 33.3946,
    lng: -80.3473,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "MwHWDokyUhw",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "The Village",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-mccoy-station",
    name: { ja: "McCoy Station", en: "McCoy Station" },
    lat: 37.6308,
    lng: -119.0326,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "jFK8bVYad0M",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "McCoy Station",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-tamarack",
    name: { ja: "Tamarack", en: "Tamarack" },
    lat: 46.6444,
    lng: -93.1272,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "s_lziIKyUT4",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Tamarack",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-main-lodge-woolly-cam",
    name: { ja: "Main Lodge Woolly Cam", en: "Main Lodge Woolly Cam" },
    lat: 37.6308,
    lng: -119.0326,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "AXyxIFY3JaA",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Main Lodge Woolly Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-chair-14-outpost",
    name: { ja: "Chair 14 Outpost", en: "Chair 14 Outpost" },
    lat: 37.6308,
    lng: -119.0326,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "xaf6OzA-i6M",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Chair 14 Outpost",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-woolly-s-adventure-summit",
    name: { ja: "Woolly's Adventure Summit", en: "Woolly's Adventure Summit" },
    lat: 37.6308,
    lng: -119.0326,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "ELdPHcv-2vI",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Woolly's Adventure Summit",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-june-patrol",
    name: { ja: "June Patrol", en: "June Patrol" },
    lat: 37.6308,
    lng: -119.0326,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "UAYN7lVvVfE",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "June Patrol",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-summit",
    name: { ja: "Summit", en: "Summit" },
    lat: 40.7156,
    lng: -74.3647,
    timeZone: "America/New_York",
    category: "nature",
    country: "US",
    source: {
      videoId: "awxz_oIlJE0",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Summit",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-eagle-lodge",
    name: { ja: "Eagle Lodge", en: "Eagle Lodge" },
    lat: 39.5565,
    lng: -93.2424,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "BH-9QONvk1A",
      channelId: "UC1zpFX74WEG2b7xa7fD22kw",
      titleKey: "Eagle Lodge",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-new-york-midtown-manhattan-tour-4k-wa",
    name: { ja: "NEW YORK - Midtown Manhattan Tour 4K, Walks and the City", en: "NEW YORK - Midtown Manhattan Tour 4K, Walks and the City" },
    lat: 40.7143,
    lng: -74.006,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "gYkrONEcrIo",
      channelId: "UCnvLGayHxWh5YZjpJjZ6WRg",
      titleKey: "NEW YORK - Midtown Manhattan Tour 4K,  Walks and the City",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-thomasville-north-carolina-usa-live-t",
    name: { ja: "Thomasville, North Carolina, USA | LIVE Train Camera (Fixed View – South)", en: "Thomasville, North Carolina, USA | LIVE Train Camera (Fixed View – South)" },
    lat: 35.8826,
    lng: -80.082,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "JPdUQtZcuk8",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Thomasville, North Carolina, USA | LIVE Train Camera (Fixed View – South)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-bird-feeder-wildlife-cam-gettysb",
    name: { ja: "LIVE Bird Feeder & Wildlife Cam - Gettysburg, PA", en: "LIVE Bird Feeder & Wildlife Cam - Gettysburg, PA" },
    lat: 39.8309,
    lng: -77.2311,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "y9t1g8Ike6g",
      channelId: "UCx8KaDsE0B4HsQdNBCsvyaA",
      titleKey: "LIVE Bird Feeder & Wildlife Cam - Gettysburg, PA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-miami-florida-usa-by-drone-dji-mavic",
    name: { ja: "Miami, Florida - USA 🇺🇸 - by drone / DJI Mavic 3 [4K]", en: "Miami, Florida - USA 🇺🇸 - by drone / DJI Mavic 3 [4K]" },
    lat: 25.7743,
    lng: -80.1937,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "Dmhws_sBEic",
      channelId: "UCbDH6Ga-wuaam2IHqAxm3hg",
      titleKey: "Miami, Florida - USA 🇺🇸 - by drone / DJI Mavic 3 [4K]",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-new-york-live-webcam-manhattan-upper",
    name: { ja: "New York Live Webcam - Manhattan Upper East Side", en: "New York Live Webcam - Manhattan Upper East Side" },
    lat: 40.7143,
    lng: -74.006,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "R2jNOtYEwdI",
      channelId: "UCEJ3VXhzw2ykC34059F_-cw",
      titleKey: "New York Live Webcam - Manhattan Upper East Side",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-treasure-island-california-live-cam-2",
    name: { ja: "Treasure Island, California Live Cam | 24/7 Stream", en: "Treasure Island, California Live Cam | 24/7 Stream" },
    lat: 38.6527,
    lng: -120.1213,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "_VqvVJfmyfs",
      channelId: "UCYUbNjkuE4lsr2v1Id2O1oA",
      titleKey: "Treasure Island, California Live Cam | 24/7 Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-san-francisco-live-camera-24-7-stream",
    name: { ja: "San Francisco Live Camera | 24/7 Stream", en: "San Francisco Live Camera | 24/7 Stream" },
    lat: 37.7749,
    lng: -122.4194,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "G8RIAgPxaMc",
      channelId: "UCYUbNjkuE4lsr2v1Id2O1oA",
      titleKey: "San Francisco Live Camera | 24/7 Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-houston-texas-24-7-live-city-camera",
    name: { ja: "Houston, Texas | 24/7 Live City Camera", en: "Houston, Texas | 24/7 Live City Camera" },
    lat: 29.7633,
    lng: -95.3633,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "SDK_m1_BVJ4",
      channelId: "UCDmNmxF3ZVMeGyvWE9tOqPQ",
      titleKey: "Houston, Texas | 24/7 Live City Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-boulder-cam",
    name: { ja: "Boulder Cam", en: "Boulder Cam" },
    lat: 40.015,
    lng: -105.2706,
    timeZone: "America/Denver",
    category: "nature",
    country: "US",
    source: {
      videoId: "yImwm-Wc8NA",
      channelId: "UC5MAh4oaj-qaComesvK88QQ",
      titleKey: "Boulder Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-moody-gardens-pyramid-cam-live-galves",
    name: { ja: "Moody Gardens Pyramid Cam LIVE | Galveston, Texas", en: "Moody Gardens Pyramid Cam LIVE | Galveston, Texas" },
    lat: 29.3013,
    lng: -94.7977,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "yfI8jKgOnsY",
      channelId: "UCKDM9GYy91kKpNOGZVS0ZFg",
      titleKey: "Moody Gardens Pyramid Cam LIVE | Galveston, Texas",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-flagstaff-arizona-usa-live-train-came",
    name: { ja: "Flagstaff, Arizona, USA | LIVE Train Camera (PTZ)", en: "Flagstaff, Arizona, USA | LIVE Train Camera (PTZ)" },
    lat: 35.1981,
    lng: -111.6513,
    timeZone: "America/Phoenix",
    category: "railway",
    country: "US",
    source: {
      videoId: "7xdHH9KMSVk",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Flagstaff, Arizona, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-elkhart-indiana-usa-live-train-camera",
    name: { ja: "Elkhart, Indiana, USA | LIVE Train Camera (PTZ)", en: "Elkhart, Indiana, USA | LIVE Train Camera (PTZ)" },
    lat: 41.682,
    lng: -85.9767,
    timeZone: "America/Indiana/Indianapolis",
    category: "railway",
    country: "US",
    source: {
      videoId: "YR1PdWaSxgk",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Elkhart, Indiana, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-needles-ca-bnsf-needles-sub-mp-578-pt",
    name: { ja: "Needles, CA | BNSF Needles Sub, MP 578 - PTZ (Chat) | SouthWest RailCams LIVE", en: "Needles, CA | BNSF Needles Sub, MP 578 - PTZ (Chat) | SouthWest RailCams LIVE" },
    lat: 34.8481,
    lng: -114.6141,
    timeZone: "America/Los_Angeles",
    category: "railway",
    country: "US",
    source: {
      videoId: "sg3kp4pn9fU",
      channelId: "UCxaKME3e34j3aTESZZ3h7Sg",
      titleKey: "Needles, CA | BNSF Needles Sub, MP 578 - PTZ (Chat) | SouthWest RailCams LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-springfield-massachusetts-usa-live-tr",
    name: { ja: "Springfield, Massachusetts, USA | LIVE Train Camera (PTZ)", en: "Springfield, Massachusetts, USA | LIVE Train Camera (PTZ)" },
    lat: 42.1015,
    lng: -72.5898,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "8U0M_mionOs",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Springfield, Massachusetts, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-ashland-virginia-usa-live-train-camer",
    name: { ja: "Ashland, Virginia, USA | LIVE Train Camera (Fixed View — North)", en: "Ashland, Virginia, USA | LIVE Train Camera (Fixed View — North)" },
    lat: 37.759,
    lng: -77.48,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "D5kKdEBmrYU",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Ashland, Virginia, USA | LIVE Train Camera (Fixed View — North)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-hellgate-ospreys-nest-cam-cornell-lab",
    name: { ja: "Hellgate Ospreys Nest Cam | Cornell Lab | University of Montana", en: "Hellgate Ospreys Nest Cam | Cornell Lab | University of Montana" },
    lat: 46.8471,
    lng: -113.994,
    timeZone: "America/Denver",
    category: "animal",
    country: "US",
    source: {
      videoId: "-qvYCbvbeN8",
      channelId: "UCZXZQxS3d6NpR-eH_gdDwYA",
      titleKey: "Hellgate Ospreys Nest Cam | Cornell Lab | University of Montana",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-waycross-georgia-usa-live-train-camer",
    name: { ja: "Waycross, Georgia, USA | LIVE Train Camera (PTZ)", en: "Waycross, Georgia, USA | LIVE Train Camera (PTZ)" },
    lat: 31.2137,
    lng: -82.3557,
    timeZone: "America/New_York",
    category: "railway",
    country: "US",
    source: {
      videoId: "bCIIn4c5LrM",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Waycross, Georgia, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-kearney-nebraska-usa-live-train-camer",
    name: { ja: "Kearney, Nebraska, USA | LIVE Train Camera (Fixed View – West)", en: "Kearney, Nebraska, USA | LIVE Train Camera (Fixed View – West)" },
    lat: 40.6995,
    lng: -99.0815,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "23tmCNeFh7A",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Kearney, Nebraska, USA | LIVE Train Camera (Fixed View – West)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-la-plata-missouri-usa-live-train-3",
    name: { ja: "La Plata, Missouri, USA | LIVE Train Camera (Fixed View – East)", en: "La Plata, Missouri, USA | LIVE Train Camera (Fixed View – East)" },
    lat: 40.0234,
    lng: -92.4916,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "X-ir2KfXMX0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "La Plata, Missouri, USA | LIVE Train Camera (Fixed View – East)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-maui-live-cam-fairmont-kea-lani-resor",
    name: { ja: "Maui LIVE Cam | Fairmont Kea Lani Resort Cam | Hawaii Beach View", en: "Maui LIVE Cam | Fairmont Kea Lani Resort Cam | Hawaii Beach View" },
    lat: 20.7702,
    lng: -156.2682,
    timeZone: "Pacific/Honolulu",
    category: "city",
    country: "US",
    source: {
      videoId: "G1zgkkguCyc",
      channelId: "UC5lNakfSdpqXCW214H5sBgQ",
      titleKey: "Maui LIVE Cam | Fairmont Kea Lani Resort Cam | Hawaii Beach View",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-barstow-ca-bnsf-needles-sub-mp-744-5",
    name: { ja: "Barstow, CA | BNSF Needles Sub MP 744.5 - PTZ (Chat) | SouthWest RailCams LIVE", en: "Barstow, CA | BNSF Needles Sub MP 744.5 - PTZ (Chat) | SouthWest RailCams LIVE" },
    lat: 34.8986,
    lng: -117.0228,
    timeZone: "America/Los_Angeles",
    category: "railway",
    country: "US",
    source: {
      videoId: "Hsh-46qLpQE",
      channelId: "UCxaKME3e34j3aTESZZ3h7Sg",
      titleKey: "Barstow, CA | BNSF Needles Sub MP 744.5 - PTZ (Chat) | SouthWest RailCams LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-myrtle-beach-cam-grand-shores-re",
    name: { ja: "LIVE Myrtle Beach Cam | Grand Shores Resort Oceanfront | South Carolina Cam", en: "LIVE Myrtle Beach Cam | Grand Shores Resort Oceanfront | South Carolina Cam" },
    lat: 33.6891,
    lng: -78.8867,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "IaN4p1SpLZY",
      channelId: "UCspnu6n44ydqafj6nFIw5hw",
      titleKey: "LIVE Myrtle Beach Cam | Grand Shores Resort Oceanfront | South Carolina Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-kingman-az-bnsf-seligman-sub-mp-516-5",
    name: { ja: "Kingman, AZ | BNSF Seligman Sub, MP 516.5 - PTZ (Chat) | SouthWest RailCams LIVE", en: "Kingman, AZ | BNSF Seligman Sub, MP 516.5 - PTZ (Chat) | SouthWest RailCams LIVE" },
    lat: 35.1894,
    lng: -114.053,
    timeZone: "America/Phoenix",
    category: "railway",
    country: "US",
    source: {
      videoId: "h8-J3JGU7g4",
      channelId: "UCxaKME3e34j3aTESZZ3h7Sg",
      titleKey: "Kingman, AZ | BNSF Seligman Sub, MP 516.5 - PTZ (Chat) | SouthWest RailCams LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-battle-creek-michigan-usa-live-train",
    name: { ja: "Battle Creek, Michigan, USA | LIVE Train Camera (Fixed View — East)", en: "Battle Creek, Michigan, USA | LIVE Train Camera (Fixed View — East)" },
    lat: 42.3173,
    lng: -85.1782,
    timeZone: "America/Detroit",
    category: "railway",
    country: "US",
    source: {
      videoId: "fTkOmPbSXBg",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Battle Creek, Michigan, USA | LIVE Train Camera (Fixed View — East)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-marine-city-hometown-cam-marine-city",
    name: { ja: "Marine City HomeTown Cam | Marine City, MI | StreamTime LIVE", en: "Marine City HomeTown Cam | Marine City, MI | StreamTime LIVE" },
    lat: 42.7195,
    lng: -82.4921,
    timeZone: "America/Detroit",
    category: "city",
    country: "US",
    source: {
      videoId: "GFzyA9BkHW4",
      channelId: "UCrtIIVfi-5tMlVXdMDzOMUA",
      titleKey: "Marine City HomeTown Cam | Marine City, MI | StreamTime LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bandcam-live-elbo-room-dance-floor-ba",
    name: { ja: "BandCam LIVE Elbo Room Dance Floor & Bands | Fort Lauderdale", en: "BandCam LIVE Elbo Room Dance Floor & Bands | Fort Lauderdale" },
    lat: 26.1223,
    lng: -80.1434,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "YWs0HMRVCBY",
      channelId: "UCUkUjr4syovc3NbLWtuVfYw",
      titleKey: "🎸 BandCam LIVE 🔴 Elbo Room Dance Floor & Bands | Fort Lauderdale",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-laramie-wyoming-usa-live-train-camera",
    name: { ja: "Laramie, Wyoming, USA | LIVE Train Camera (PTZ)", en: "Laramie, Wyoming, USA | LIVE Train Camera (PTZ)" },
    lat: 41.3114,
    lng: -105.5911,
    timeZone: "America/Denver",
    category: "railway",
    country: "US",
    source: {
      videoId: "LRTTZdNTW_0",
      channelId: "UCOIkT9bq-1N2BvrsBjhNlag",
      titleKey: "Laramie, Wyoming, USA | LIVE Train Camera (PTZ)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bar-harbor-maine-west-view-bar-harbor",
    name: { ja: "Bar Harbor, Maine - West View - Bar Harbor Inn", en: "Bar Harbor, Maine - West View - Bar Harbor Inn" },
    lat: 44.3876,
    lng: -68.2039,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "OteVW3af3BU",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "Bar Harbor, Maine - West View - Bar Harbor Inn",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-24-7-msp-webcam-minneapolis-st-paul-a",
    name: { ja: "24/7 MSP Webcam - Minneapolis / St. Paul Airport - You Control The Cams!", en: "24/7 MSP Webcam - Minneapolis / St. Paul Airport - You Control The Cams!" },
    lat: 44.98,
    lng: -93.2638,
    timeZone: "America/Chicago",
    category: "airport",
    country: "US",
    source: {
      videoId: "wWm-kbryDDQ",
      channelId: "UCGMCIiOelr1UlVNxFXibrgQ",
      titleKey: "24/7 MSP Webcam - Minneapolis / St. Paul Airport - You Control The Cams!",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-traverse-city-mi-downtown-camera",
    name: { ja: "LIVE | Traverse City, MI | Downtown Camera |", en: "LIVE | Traverse City, MI | Downtown Camera |" },
    lat: 44.7631,
    lng: -85.6206,
    timeZone: "America/Detroit",
    category: "city",
    country: "US",
    source: {
      videoId: "8-V9uEqFLwE",
      channelId: "UCYWJbeYvOMDm6avN5GaRa3Q",
      titleKey: "LIVE | Traverse City, MI | Downtown Camera |",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-penguin-cam-live-pittsburgh-zoo-ppg-a",
    name: { ja: "Penguin Cam Live | Pittsburgh Zoo & PPG Aquarium Webcam", en: "Penguin Cam Live | Pittsburgh Zoo & PPG Aquarium Webcam" },
    lat: 48.7293,
    lng: -123.0146,
    timeZone: "America/Los_Angeles",
    category: "animal",
    country: "US",
    source: {
      videoId: "cTi5sCsUSfc",
      channelId: "UC5lNakfSdpqXCW214H5sBgQ",
      titleKey: "Penguin Cam Live | Pittsburgh Zoo & PPG Aquarium Webcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-port-lorain-lake-erie-live-cam-ohio-4",
    name: { ja: "PORT LORAIN | LAKE ERIE LIVE CAM | OHIO | 4K WITH AUDIO", en: "PORT LORAIN | LAKE ERIE LIVE CAM | OHIO | 4K WITH AUDIO" },
    lat: 42.6242,
    lng: -79.067,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "1MVB3fgg7kg",
      channelId: "UCMMBk7t5_yJ03OWwHdGTWOw",
      titleKey: "PORT LORAIN | LAKE ERIE LIVE CAM | OHIO | 4K WITH AUDIO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-alpena-mi-thunder-bay-marina-cam",
    name: { ja: "LIVE | Alpena, MI | Thunder Bay Marina Camera", en: "LIVE | Alpena, MI | Thunder Bay Marina Camera" },
    lat: 45.0617,
    lng: -83.4327,
    timeZone: "America/Detroit",
    category: "harbor",
    country: "US",
    source: {
      videoId: "FS9Iz-EJW5Y",
      channelId: "UCYWJbeYvOMDm6avN5GaRa3Q",
      titleKey: "LIVE | Alpena, MI | Thunder Bay Marina Camera",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-lithia-park-cam",
    name: { ja: "Lithia Park Cam", en: "Lithia Park Cam" },
    lat: 42.1893,
    lng: -122.7189,
    timeZone: "America/Los_Angeles",
    category: "nature",
    country: "US",
    source: {
      videoId: "FRPe2RJZfCo",
      channelId: "UC4AoiIN2ErfWcE5-YyjDDIg",
      titleKey: "Lithia Park Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-rail-cam-shenandoah-junction-wes",
    name: { ja: "LIVE Rail Cam – Shenandoah Junction, West Virginia", en: "LIVE Rail Cam – Shenandoah Junction, West Virginia" },
    lat: 37.2998,
    lng: -92.3049,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "QhT13bsgL-U",
      channelId: "UC-bPJdfIq5zqIP_PQ7rUJaA",
      titleKey: "LIVE Rail Cam – Shenandoah Junction, West Virginia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-rail-cam-fostoria-ohio-csx-ex-b",
    name: { ja: "LIVE Rail Cam – Fostoria, Ohio | CSX (ex-B&O) | RailStream", en: "LIVE Rail Cam – Fostoria, Ohio | CSX (ex-B&O) | RailStream" },
    lat: 37.2998,
    lng: -92.3049,
    timeZone: "America/Chicago",
    category: "railway",
    country: "US",
    source: {
      videoId: "3VJXqn2ZI7Y",
      channelId: "UC-bPJdfIq5zqIP_PQ7rUJaA",
      titleKey: "LIVE Rail Cam – Fostoria, Ohio | CSX (ex-B&O) | RailStream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-the-rooftop-bar-oceanside-ca-san-dieg",
    name: { ja: "The Rooftop Bar | Oceanside, CA | San Diego Web Cam", en: "The Rooftop Bar | Oceanside, CA | San Diego Web Cam" },
    lat: 33.1959,
    lng: -117.3795,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "cvP_F-c2Upw",
      channelId: "UC88QpAaX8sdqm1fWYSjzbSQ",
      titleKey: "The Rooftop Bar | Oceanside, CA | San Diego Web Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bar-harbor-maine-north-view-bar-harbo",
    name: { ja: "Bar Harbor, Maine - North View - Bar Harbor Inn", en: "Bar Harbor, Maine - North View - Bar Harbor Inn" },
    lat: 44.3876,
    lng: -68.2039,
    timeZone: "America/New_York",
    category: "harbor",
    country: "US",
    source: {
      videoId: "RH9wCBhxkxM",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "Bar Harbor, Maine - North View - Bar Harbor Inn",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-marine-city-michigan-usa-streamtime-l",
    name: { ja: "Marine City, Michigan, USA | StreamTime LIVE", en: "Marine City, Michigan, USA | StreamTime LIVE" },
    lat: 42.7195,
    lng: -82.4921,
    timeZone: "America/Detroit",
    category: "nature",
    country: "US",
    source: {
      videoId: "F_bENs4GV24",
      channelId: "UCrtIIVfi-5tMlVXdMDzOMUA",
      titleKey: "Marine City, Michigan, USA | StreamTime LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-mississippi-river-lock-19-keokuk-ia-u",
    name: { ja: "Mississippi River Lock 19 | Keokuk, IA, USA | StreamTime LIVE", en: "Mississippi River Lock 19 | Keokuk, IA, USA | StreamTime LIVE" },
    lat: 40.3973,
    lng: -91.3849,
    timeZone: "America/Chicago",
    category: "nature",
    country: "US",
    source: {
      videoId: "GXsEbZaj0bU",
      channelId: "UCrtIIVfi-5tMlVXdMDzOMUA",
      titleKey: "Mississippi River Lock 19 | Keokuk, IA, USA | StreamTime LIVE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-houston-zoo-giraffe-platform-cam-feed",
    name: { ja: "Houston Zoo Giraffe Platform Cam | Feeding Live Cam | Ozolio Webcam Services", en: "Houston Zoo Giraffe Platform Cam | Feeding Live Cam | Ozolio Webcam Services" },
    lat: 42.0682,
    lng: -72.6787,
    timeZone: "America/New_York",
    category: "animal",
    country: "US",
    source: {
      videoId: "jF8v3wScoBA",
      channelId: "UC5lNakfSdpqXCW214H5sBgQ",
      titleKey: "Houston Zoo Giraffe Platform Cam | Feeding Live Cam | Ozolio Webcam Services",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-bar-cam-live-elbo-room-beach-bar-fort",
    name: { ja: "BAR CAM LIVE | Elbo Room Beach Bar • Fort Lauderdale", en: "BAR CAM LIVE | Elbo Room Beach Bar • Fort Lauderdale" },
    lat: 32.7892,
    lng: -114.5561,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "wVNt3l657X0",
      channelId: "UCUkUjr4syovc3NbLWtuVfYw",
      titleKey: "🍹 BAR CAM 🔴 LIVE | Elbo Room Beach Bar • Fort Lauderdale",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-high-speed-police-chases-over-150mph",
    name: { ja: "High-Speed Police Chases Over 150MPH - Caught on Dashcam", en: "High-Speed Police Chases Over 150MPH - Caught on Dashcam" },
    lat: 33.6123,
    lng: -95.7472,
    timeZone: "America/Chicago",
    category: "city",
    country: "US",
    source: {
      videoId: "8id5q_mwtWA",
      channelId: "UCS67mNnpfnHsU3IQYNHLToA",
      titleKey: "High-Speed Police Chases Over 150MPH - Caught on Dashcam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-live-los-angeles-hollywood-boulevard",
    name: { ja: "LIVE LOS ANGELES | Hollywood Boulevard Monday Walk | LA Live Cam", en: "LIVE LOS ANGELES | Hollywood Boulevard Monday Walk | LA Live Cam" },
    lat: 34.0522,
    lng: -118.2437,
    timeZone: "America/Los_Angeles",
    category: "city",
    country: "US",
    source: {
      videoId: "PUDhfwoubcg",
      channelId: "UChj9oix5HdyeuGl2DftUiQQ",
      titleKey: "LIVE LOS ANGELES | Hollywood Boulevard Monday Walk | LA Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "us-one-week-construction-time-lapse-with",
    name: { ja: "One-week construction time-lapse with closeups: Week 2 of the Ⓢ-series", en: "One-week construction time-lapse with closeups: Week 2 of the Ⓢ-series" },
    lat: 27.4475,
    lng: -82.5462,
    timeZone: "America/New_York",
    category: "city",
    country: "US",
    source: {
      videoId: "cOc3dapbhkI",
      channelId: "UCEKwrM78pRv8WRcKvZNtE1w",
      titleKey: "One-week construction time-lapse with closeups: Week 2 of the Ⓢ-series",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "za-olifants-river-wildlife-live-stream-g",
    name: { ja: "Olifants River | Wildlife Live Stream – Greater Kruger National Park", en: "Olifants River | Wildlife Live Stream – Greater Kruger National Park" },
    lat: -24.2664,
    lng: 29.7844,
    timeZone: "Africa/Johannesburg",
    category: "animal",
    country: "ZA",
    source: {
      videoId: "NapztoCaKFY",
      channelId: "UCuoNAKa3P0QR1Lw9QdpmoVg",
      titleKey: "Olifants River | Wildlife Live Stream – Greater Kruger National Park",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ae-dubai-4k-amazing-dubai-city-downtown",
    name: { ja: "Dubai [4K] Amazing Dubai City, Downtown Dubai Walking Tour 🇦🇪", en: "Dubai [4K] Amazing Dubai City, Downtown Dubai Walking Tour 🇦🇪" },
    lat: 25.0772,
    lng: 55.3093,
    timeZone: "Asia/Dubai",
    category: "city",
    country: "AE",
    source: {
      videoId: "TcL5iVlFwUk",
      channelId: "UCZf-CjRiqYrxkYGpE8oPUuw",
      titleKey: "Dubai [4K] Amazing Dubai City, Downtown Dubai Walking Tour 🇦🇪 ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "al-vlore-bay-albania-live-4k-lungomare-b",
    name: { ja: "Vlore Bay Albania Live 4K | Lungomare, Beach & Sea View", en: "Vlore Bay Albania Live 4K | Lungomare, Beach & Sea View" },
    lat: 40.4696,
    lng: 19.4838,
    timeZone: "Europe/Tirane",
    category: "nature",
    country: "AL",
    source: {
      videoId: "jLun451s8-g",
      channelId: "UCKPyvPeJcrT8vAiifUbay1Q",
      titleKey: "🔴 Vlore Bay Albania Live 4K | Lungomare, Beach & Sea View",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "al-live-vlore-albania-4k-walking-tour-al",
    name: { ja: "LIVE Vlore Albania 4K 🇦🇱 | Walking Tour | Albanian Riviera City Ambience", en: "LIVE Vlore Albania 4K 🇦🇱 | Walking Tour | Albanian Riviera City Ambience" },
    lat: 40.4696,
    lng: 19.4838,
    timeZone: "Europe/Tirane",
    category: "city",
    country: "AL",
    source: {
      videoId: "HXcSy0SBsIk",
      channelId: "UCSvfSlnmi8-z_UBG_YLDOfw",
      titleKey: "🔴 LIVE Vlore Albania 4K 🇦🇱 | Walking Tour | Albanian Riviera City Ambience",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "am-live-yerevan-summer-hot-night-walk-in",
    name: { ja: "LIVE! Yerevan 🇦🇲 Summer Hot Night Walk in a city. Komitas street", en: "LIVE! Yerevan 🇦🇲 Summer Hot Night Walk in a city. Komitas street" },
    lat: 40.1776,
    lng: 44.5126,
    timeZone: "Asia/Yerevan",
    category: "city",
    country: "AM",
    source: {
      videoId: "CCPtK0N0MA4",
      channelId: "UCAPZdv5t1EpkwMLl0RETVHA",
      titleKey: "LIVE! Yerevan 🇦🇲 Summer Hot 🥵 Night Walk in a city. Komitas street",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "am-yerevan-walking-tour-summer-evening-v",
    name: { ja: "YEREVAN Walking Tour 🇦🇲 | Summer Evening Vibes in Armenia | 4K HDR | July 14, 2026", en: "YEREVAN Walking Tour 🇦🇲 | Summer Evening Vibes in Armenia | 4K HDR | July 14, 2026" },
    lat: 40.1776,
    lng: 44.5126,
    timeZone: "Asia/Yerevan",
    category: "city",
    country: "AM",
    source: {
      videoId: "9KOgGqGdHEc",
      channelId: "UC9LL1mCPTh5rSwZEpUUsTwQ",
      titleKey: "YEREVAN Walking Tour 🇦🇲 | Summer Evening Vibes in Armenia | 4K HDR | July 14, 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ar-buenos-aires-argentina-en-vivo",
    name: { ja: "Buenos Aires, Argentina en Vivo", en: "Buenos Aires, Argentina en Vivo" },
    lat: -34.6131,
    lng: -58.3772,
    timeZone: "America/Argentina/Buenos_Aires",
    category: "city",
    country: "AR",
    source: {
      videoId: "AksMJTfw-vk",
      channelId: "UCDpemLDxPZ9EB0dM83L3irw",
      titleKey: "Buenos Aires, Argentina en Vivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ar-buenos-aires-argentina-en-vivo-24-7-l",
    name: { ja: "BUENOS AIRES, Argentina en Vivo 🇦🇷 24/7 (Live Camera Argentina", en: "BUENOS AIRES, Argentina en Vivo 🇦🇷 24/7 (Live Camera Argentina" },
    lat: -34.6131,
    lng: -58.3772,
    timeZone: "America/Argentina/Buenos_Aires",
    category: "city",
    country: "AR",
    source: {
      videoId: "urwuIKd8eEo",
      channelId: "UCsXOwro8CHI2FWotcTw1U2w",
      titleKey: "BUENOS AIRES, Argentina en Vivo 🇦🇷  24/7 (Live Camera Argentina",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ar-mendoza-live-24-7-city-center-street",
    name: { ja: "MENDOZA LIVE 24/7 🇦🇷 City Center Street Cam & Weather - Argentina Live Stream", en: "MENDOZA LIVE 24/7 🇦🇷 City Center Street Cam & Weather - Argentina Live Stream" },
    lat: -32.8895,
    lng: -68.8458,
    timeZone: "America/Argentina/Mendoza",
    category: "city",
    country: "AR",
    source: {
      videoId: "iqX6f4hGLWA",
      channelId: "UCsXOwro8CHI2FWotcTw1U2w",
      titleKey: "MENDOZA LIVE 24/7 🇦🇷 City Center Street Cam & Weather - Argentina Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "at-summer-escape-24-7-live-stream-webcam",
    name: { ja: "Summer Escape – 24/7 LIVE Stream Webcams Europe", en: "Summer Escape – 24/7 LIVE Stream Webcams Europe" },
    lat: 48.5519,
    lng: 14.4408,
    timeZone: "Europe/Vienna",
    category: "city",
    country: "AT",
    source: {
      videoId: "2C7vrUAIfu4",
      channelId: "UC9xLSF0SZDbVa70iTpghQBw",
      titleKey: "🔴 Summer Escape – 24/7 LIVE Stream Webcams Europe",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-sydney-airport-live-7th-aug-2026-plan",
    name: { ja: "Sydney Airport LIVE | 7th AUG 2026 | Planespotting | SYD - YSSY", en: "Sydney Airport LIVE | 7th AUG 2026 | Planespotting | SYD - YSSY" },
    lat: -33.8678,
    lng: 151.2073,
    timeZone: "Australia/Sydney",
    category: "airport",
    country: "AU",
    source: {
      videoId: "y_e0PnNN1oc",
      channelId: "UCsG_EDkchZZMevcbHqXDe7A",
      titleKey: "Sydney Airport LIVE | 7th AUG 2026 | Planespotting | SYD - YSSY",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-live-kiwi-does-stuff-plane-spotting-m",
    name: { ja: "LIVE Kiwi Does Stuff | Plane spotting @ Melbourne Airport", en: "LIVE Kiwi Does Stuff | Plane spotting @ Melbourne Airport" },
    lat: -22.8167,
    lng: 127.765,
    timeZone: "Australia/Perth",
    category: "airport",
    country: "AU",
    source: {
      videoId: "SfoY__KYdu4",
      channelId: "UCkSjz6BLj9nGhpqFKDFEw4Q",
      titleKey: "🔴LIVE Kiwi Does Stuff | Plane spotting @ Melbourne Airport",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-huntington-apartments-time-lapse",
    name: { ja: "Huntington Apartments Time Lapse", en: "Huntington Apartments Time Lapse" },
    lat: -31.4639,
    lng: 152.6521,
    timeZone: "Australia/Sydney",
    category: "city",
    country: "AU",
    source: {
      videoId: "KV3wcnMOs30",
      channelId: "UCFjUB6oal0SwewZTB5SHXJA",
      titleKey: "Huntington Apartments Time Lapse",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-dash-cam-owners-australia-weekly-subm",
    name: { ja: "Dash Cam Owners Australia Weekly Submissions July Week 2", en: "Dash Cam Owners Australia Weekly Submissions July Week 2" },
    lat: -35.1667,
    lng: 138.7,
    timeZone: "Australia/Adelaide",
    category: "city",
    country: "AU",
    source: {
      videoId: "tAdl83PE36w",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Dash Cam Owners Australia Weekly Submissions July Week 2",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-melbourne-city-life-unfolded-live-24",
    name: { ja: "Melbourne City Life Unfolded: Live 24/7 Street Watch - Bustling Intersection Edition", en: "Melbourne City Life Unfolded: Live 24/7 Street Watch - Bustling Intersection Edition" },
    lat: -37.814,
    lng: 144.9633,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "gEbrHdFRgpQ",
      channelId: "UC6Au7oIglvHInniXAQSW7iQ",
      titleKey: "Melbourne City Life Unfolded: Live 24/7 Street Watch - Bustling Intersection Edition",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-dash-cam-owners-australia-crash-compi",
    name: { ja: "Dash Cam Owners Australia Crash Compilation 49", en: "Dash Cam Owners Australia Crash Compilation 49" },
    lat: -35.1667,
    lng: 138.7,
    timeZone: "Australia/Adelaide",
    category: "city",
    country: "AU",
    source: {
      videoId: "vPtNlbJc9ZY",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Dash Cam Owners Australia Crash Compilation 49",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-australian-car-crash-dash-cam-compila",
    name: { ja: "Australian Car Crash / Dash Cam Compilation 48", en: "Australian Car Crash / Dash Cam Compilation 48" },
    lat: -37,
    lng: 148,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "tAOyScTBFZE",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Australian Car Crash / Dash Cam Compilation 48",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-australian-car-crash-dash-cam-com-2",
    name: { ja: "Australian Car Crash / Dash Cam Compilation 41", en: "Australian Car Crash / Dash Cam Compilation 41" },
    lat: -37,
    lng: 148,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "X_yoLHwNSRU",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Australian Car Crash / Dash Cam Compilation 41",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-dash-cam-owners-australia-crash-c-2",
    name: { ja: "Dash Cam Owners Australia Crash Compilation 51", en: "Dash Cam Owners Australia Crash Compilation 51" },
    lat: -35.1667,
    lng: 138.7,
    timeZone: "Australia/Adelaide",
    category: "city",
    country: "AU",
    source: {
      videoId: "_E4jvaos-sM",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Dash Cam Owners Australia Crash Compilation 51",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-best-of-2025-dash-cam-owners-australi",
    name: { ja: "Best of 2025 - Dash Cam Owners Australia", en: "Best of 2025 - Dash Cam Owners Australia" },
    lat: -35.1202,
    lng: 147.3398,
    timeZone: "Australia/Sydney",
    category: "city",
    country: "AU",
    source: {
      videoId: "PUTFLoobJkk",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Best of 2025 - Dash Cam Owners Australia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "au-australian-car-crash-dash-cam-com-3",
    name: { ja: "Australian Car Crash / Dash Cam Compilation 32", en: "Australian Car Crash / Dash Cam Compilation 32" },
    lat: -37,
    lng: 148,
    timeZone: "Australia/Melbourne",
    category: "city",
    country: "AU",
    source: {
      videoId: "PXdkVl9jD1w",
      channelId: "UCvfqpaehdaqtkXPNhvJRyGA",
      titleKey: "Australian Car Crash / Dash Cam Compilation 32",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "az-canl-yay-m-bak-s-h-ri-ceyhun-s-limov",
    name: { ja: "Canlı yayım. Bakı şəhəri. Ceyhun Səlimov 7. Live stream camera Baku City", en: "Canlı yayım. Bakı şəhəri. Ceyhun Səlimov 7. Live stream camera Baku City" },
    lat: 40.4891,
    lng: 45.5293,
    timeZone: "Asia/Baku",
    category: "city",
    country: "AZ",
    source: {
      videoId: "nOCHBQN-Wao",
      channelId: "UC31Qm1T33OZioM_w8wWEaHQ",
      titleKey: "Canlı yayım. Bakı şəhəri. Ceyhun Səlimov 7. Live stream  camera  Baku City",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "bb-barbados-live-airport-stream-bgi-24-h",
    name: { ja: "Barbados Live Airport Stream (BGI) - 24 HR", en: "Barbados Live Airport Stream (BGI) - 24 HR" },
    lat: 13.1645,
    lng: -59.5517,
    timeZone: "America/Barbados",
    category: "airport",
    country: "BB",
    source: {
      videoId: "XLDtjtfqIYw",
      channelId: "UCJruZ-KPJM2oJgQgEyHOS_A",
      titleKey: "Barbados Live Airport Stream (BGI) - 24 HR",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praca-central-de-serra-branca-pb-ao-v",
    name: { ja: "PRAÇA CENTRAL de Serra Branca - PB | AO VIVO 24h", en: "PRAÇA CENTRAL de Serra Branca - PB | AO VIVO 24h" },
    lat: -9.9,
    lng: -39.4,
    timeZone: "America/Bahia",
    category: "city",
    country: "BR",
    source: {
      videoId: "_cmlw35vbfQ",
      channelId: "UCxdSxKcL9F0SBcUlfXe6yCg",
      titleKey: "PRAÇA CENTRAL de Serra Branca - PB | AO VIVO 24h",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-aeroporto-internacional-de-ponta-pora",
    name: { ja: "Aeroporto Internacional de Ponta Porã Com Fonia da Rádio e do Centro Curitiba S15", en: "Aeroporto Internacional de Ponta Porã Com Fonia da Rádio e do Centro Curitiba S15" },
    lat: -5.0616,
    lng: -42.8255,
    timeZone: "America/Fortaleza",
    category: "airport",
    country: "BR",
    source: {
      videoId: "pqEwczD6xlc",
      channelId: "UC1roNXMETQmZZKrsF2IZCjQ",
      titleKey: "Aeroporto Internacional de Ponta Porã Com Fonia da Rádio e do Centro Curitiba  S15",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-ao-vivo",
    name: { ja: "Balneário Camboriú ao vivo", en: "Balneário Camboriú ao vivo" },
    lat: -27.4239,
    lng: -51.7877,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "TC_nOU7xAjw",
      channelId: "UCi1vQx48j_nfrMg6XH5PItQ",
      titleKey: "Balneário Camboriú ao vivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-brazil-now",
    name: { ja: "Brazil Now", en: "Brazil Now" },
    lat: -15.7942,
    lng: -47.8822,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "-Xtz0Jo5Ln8",
      channelId: "UChnIgJ8_PDy0AwV84XP9HTA",
      titleKey: "Brazil Now",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-trem-ao-vivo-boa-vista-velha-campinas",
    name: { ja: "TREM AO VIVO BOA VISTA VELHA - CAMPINAS SP BRASIL", en: "TREM AO VIVO BOA VISTA VELHA - CAMPINAS SP BRASIL" },
    lat: -0.9932,
    lng: -46.6745,
    timeZone: "America/Belem",
    category: "railway",
    country: "BR",
    source: {
      videoId: "5iPdHvpnydQ",
      channelId: "UC2LL1Rrh9mXbaII5mT-nN0g",
      titleKey: "TREM AO VIVO BOA VISTA VELHA - CAMPINAS SP BRASIL",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-ao-vivo-mira-la-vi",
    name: { ja: "Balneário Camboriú AO VIVO - Mira la vista directamente desde el Hotel Marambaia.", en: "Balneário Camboriú AO VIVO - Mira la vista directamente desde el Hotel Marambaia." },
    lat: -27.4239,
    lng: -51.7877,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "j4Wne61IJ3I",
      channelId: "UCQnRFONVlt96xf5lYVr4Tzg",
      titleKey: "Balneário Camboriú AO VIVO - Mira la vista directamente desde el Hotel Marambaia.",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sao-paulo-from-above-stunning-4k-dron",
    name: { ja: "SÃO PAULO from Above 🇧🇷 | Stunning 4K Drone Footage of Brazil’s Mega City", en: "SÃO PAULO from Above 🇧🇷 | Stunning 4K Drone Footage of Brazil’s Mega City" },
    lat: -23.5475,
    lng: -46.6361,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "phPgZC9_QhQ",
      channelId: "UCbDH6Ga-wuaam2IHqAxm3hg",
      titleKey: "SÃO PAULO from Above 🇧🇷 | Stunning 4K Drone Footage of Brazil’s Mega City",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-morro-sao-joao-sentido-lajeado-oeste",
    name: { ja: "Morro São João / Sentido Lajeado Oeste - AO VIVO 24H【2026】", en: "Morro São João / Sentido Lajeado Oeste - AO VIVO 24H【2026】" },
    lat: -9.5167,
    lng: -44.9667,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "-22vN9H4T-k",
      channelId: "UC0T38EzZthvvGk8cf98GaXA",
      titleKey: "🔴Morro São João / Sentido Lajeado Oeste - AO VIVO 24H【2026】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-morro-sao-joao-sentido-porto-alegre-s",
    name: { ja: "Morro São João / Sentido Porto Alegre Sul - AO VIVO 24H 【2026】", en: "Morro São João / Sentido Porto Alegre Sul - AO VIVO 24H 【2026】" },
    lat: -9.5167,
    lng: -44.9667,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "slsKpIYENGg",
      channelId: "UC0T38EzZthvvGk8cf98GaXA",
      titleKey: "🔴Morro São João / Sentido Porto Alegre Sul - AO VIVO 24H 【2026】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-morro-sao-joao-sentido-novo-hamburgo",
    name: { ja: "Morro São João / Sentido Novo Hamburgo Leste - AO VIVO 24H【2026】", en: "Morro São João / Sentido Novo Hamburgo Leste - AO VIVO 24H【2026】" },
    lat: -9.5167,
    lng: -44.9667,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "J0LKIylHcjk",
      channelId: "UC0T38EzZthvvGk8cf98GaXA",
      titleKey: "🔴Morro São João / Sentido Novo Hamburgo Leste - AO VIVO 24H【2026】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-montenegro-panoramico-leste-ao-vivo-2",
    name: { ja: "Montenegro / Panorâmico Leste - AO VIVO 24H【2026】", en: "Montenegro / Panorâmico Leste - AO VIVO 24H【2026】" },
    lat: -29.6886,
    lng: -51.4611,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "MUWjOucOeUc",
      channelId: "UC0T38EzZthvvGk8cf98GaXA",
      titleKey: "🔴Montenegro / Panorâmico Leste - AO VIVO 24H【2026】",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-vale-do-catimbau-pe-vila-mara-do-sert",
    name: { ja: "VALE DO CATIMBAU PE - VILA MARA DO SERTÃO - CÂMERA AO VIVO - LIVE CAM", en: "VALE DO CATIMBAU PE - VILA MARA DO SERTÃO - CÂMERA AO VIVO - LIVE CAM" },
    lat: -13.3703,
    lng: -39.0731,
    timeZone: "America/Bahia",
    category: "nature",
    country: "BR",
    source: {
      videoId: "n3Sxm7m-378",
      channelId: "UCeo1c8wZUrwt4L7E1Q9yxdQ",
      titleKey: "VALE DO CATIMBAU PE - VILA MARA DO SERTÃO - CÂMERA AO VIVO - LIVE CAM",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-afogados-da-ingazeira-pe-camera-ao-vi",
    name: { ja: "AFOGADOS DA INGAZEIRA PE - CÂMERA AO VIVO - LIVE CAM - SERTÃO DO PAJEÚ", en: "AFOGADOS DA INGAZEIRA PE - CÂMERA AO VIVO - LIVE CAM - SERTÃO DO PAJEÚ" },
    lat: -8.0803,
    lng: -34.9114,
    timeZone: "America/Recife",
    category: "city",
    country: "BR",
    source: {
      videoId: "u_4fVFUYx_8",
      channelId: "UCeo1c8wZUrwt4L7E1Q9yxdQ",
      titleKey: "AFOGADOS DA INGAZEIRA PE - CÂMERA AO VIVO - LIVE CAM - SERTÃO DO PAJEÚ",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praia-de-candeias-pe-camera-ao-vivo-l",
    name: { ja: "PRAIA DE CANDEIAS PE - CÂMERA AO VIVO - LIVE CAM", en: "PRAIA DE CANDEIAS PE - CÂMERA AO VIVO - LIVE CAM" },
    lat: -6.7167,
    lng: -43.1167,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "W_MfFb3qKN4",
      channelId: "UCeo1c8wZUrwt4L7E1Q9yxdQ",
      titleKey: "PRAIA DE CANDEIAS PE - CÂMERA AO VIVO - LIVE CAM",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-vitoria-de-santo-antao-pe-camera-ao-v",
    name: { ja: "VITÓRIA DE SANTO ANTÃO PE - CÂMERA AO VIVO - LIVE CAM", en: "VITÓRIA DE SANTO ANTÃO PE - CÂMERA AO VIVO - LIVE CAM" },
    lat: -20.3194,
    lng: -40.3378,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "GQDmb_qTrAM",
      channelId: "UCeo1c8wZUrwt4L7E1Q9yxdQ",
      titleKey: "VITÓRIA DE SANTO ANTÃO PE - CÂMERA AO VIVO - LIVE CAM",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-ao-vivo-camera-do",
    name: { ja: "Balneário Camboriú ao vivo - CÂMERA do tempo", en: "Balneário Camboriú ao vivo - CÂMERA do tempo" },
    lat: -27.4239,
    lng: -51.7877,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "UPh63IjFEp0",
      channelId: "UCi1vQx48j_nfrMg6XH5PItQ",
      titleKey: "Balneário Camboriú ao vivo - CÂMERA do tempo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-gramado-ao-vivo",
    name: { ja: "Gramado ao vivo", en: "Gramado ao vivo" },
    lat: -29.3786,
    lng: -50.8739,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "qoAd9U-8Cic",
      channelId: "UClkczhHdkCogS9eXg2E5s0w",
      titleKey: "Gramado ao vivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-live-do-centro-da-cidade-de-chapeco-s",
    name: { ja: "Live do centro da cidade de Chapecó - SC - câmera ao vivo #chapeco #chapecoaovivo", en: "Live do centro da cidade de Chapecó - SC - câmera ao vivo #chapeco #chapecoaovivo" },
    lat: -4.4833,
    lng: -41.5,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "R1nXsBCG--s",
      channelId: "UCzwTW6vgC7RcmxssUrGZnwA",
      titleKey: "Live do centro da cidade de Chapecó - SC - câmera ao vivo #chapeco #chapecoaovivo",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-rio-de-janeiro-panoramic-view-live-vi",
    name: { ja: "Rio de Janeiro Panoramic View Live Vivo 24/7 —, Cristo Redentor Suggar Loaf Pão de Açucar", en: "Rio de Janeiro Panoramic View Live Vivo 24/7 —, Cristo Redentor Suggar Loaf Pão de Açucar" },
    lat: -22.9064,
    lng: -43.1822,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "5iy6o-Se6YE",
      channelId: "UCfMOswhx9NN_laZ8Ukcm4-Q",
      titleKey: "Rio de Janeiro Panoramic View Live Vivo 24/7 —, Cristo Redentor Suggar Loaf Pão de Açucar",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-9-vista-da-ers-130",
    name: { ja: "#9 VISTA DA ERS-130", en: "#9 VISTA DA ERS-130" },
    lat: -7.6333,
    lng: -48.1667,
    timeZone: "America/Araguaina",
    category: "city",
    country: "BR",
    source: {
      videoId: "HXOlbMCjXHw",
      channelId: "UCVT44GDQePOsKk-EZKeO1DQ",
      titleKey: "#9 VISTA DA ERS-130",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-vista-panoramica-de-tirol-centro-rio",
    name: { ja: "Vista Panorâmica de Tirol, Centro, Rio Potengi e Ponte Velha | Trânsito e Clima de Natal AO VIVO", en: "Vista Panorâmica de Tirol, Centro, Rio Potengi e Ponte Velha | Trânsito e Clima de Natal AO VIVO" },
    lat: -7.6333,
    lng: -48.1667,
    timeZone: "America/Araguaina",
    category: "city",
    country: "BR",
    source: {
      videoId: "JxN06DJgRaw",
      channelId: "UCNrkCeEzYg79oHO2_5VRDMw",
      titleKey: "Vista Panorâmica de Tirol, Centro, Rio Potengi e Ponte Velha | Trânsito e Clima de Natal AO VIVO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbsp-live-3-aeroporto-de-sao-paulo-co",
    name: { ja: "SBSP LIVE #3 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite", en: "SBSP LIVE #3 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite" },
    lat: -23.6275,
    lng: -46.656,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "b8g-NPuIZI0",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBSP LIVE #3 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praca-santa-teresinha-em-cristais-mac",
    name: { ja: "Praça Santa Teresinha em Cristais, Macaúbas - Bahia", en: "Praça Santa Teresinha em Cristais, Macaúbas - Bahia" },
    lat: -9.9,
    lng: -39.4,
    timeZone: "America/Bahia",
    category: "city",
    country: "BR",
    source: {
      videoId: "iUTBdNIqLjQ",
      channelId: "UCGbmoHn-a9huz8jnV8yVG6w",
      titleKey: "Praça Santa Teresinha em Cristais, Macaúbas - Bahia",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-estacao-ferroviaria-2-museu-da-cultur",
    name: { ja: "Estação Ferroviária 2 (Museu da Cultura) em Santa Fé do Sul - SP", en: "Estação Ferroviária 2 (Museu da Cultura) em Santa Fé do Sul - SP" },
    lat: -27.9108,
    lng: -52.26,
    timeZone: "America/Sao_Paulo",
    category: "railway",
    country: "BR",
    source: {
      videoId: "UtVz5Re8EcU",
      channelId: "UC6NZjHRZXyRKsTy7GRY-fxA",
      titleKey: "Estação Ferroviária 2 (Museu da Cultura) em Santa Fé do Sul - SP",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-museu-de-paleontologia-estacao-ferrov",
    name: { ja: "Museu de Paleontologia (Estação Ferroviária) em Fernandópolis - SP", en: "Museu de Paleontologia (Estação Ferroviária) em Fernandópolis - SP" },
    lat: -8.05,
    lng: -41.55,
    timeZone: "America/Fortaleza",
    category: "railway",
    country: "BR",
    source: {
      videoId: "b9YCgJ6NY1I",
      channelId: "UC6NZjHRZXyRKsTy7GRY-fxA",
      titleKey: "Museu de Paleontologia (Estação Ferroviária) em Fernandópolis - SP",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-travessia-ferrea-km-415-em-tres-front",
    name: { ja: "Travessia Férrea KM 415 em Três Fronteiras - SP", en: "Travessia Férrea KM 415 em Três Fronteiras - SP" },
    lat: -15.2356,
    lng: -56.4892,
    timeZone: "America/Cuiaba",
    category: "railway",
    country: "BR",
    source: {
      videoId: "hE4zt3W7EhY",
      channelId: "UC6NZjHRZXyRKsTy7GRY-fxA",
      titleKey: "Travessia Férrea KM 415 em Três  Fronteiras - SP",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-estacao-ferroviaria-3-em-santa-fe-do",
    name: { ja: "Estação Ferroviária 3 em Santa Fé do Sul - SP", en: "Estação Ferroviária 3 em Santa Fé do Sul - SP" },
    lat: -27.9108,
    lng: -52.26,
    timeZone: "America/Sao_Paulo",
    category: "railway",
    country: "BR",
    source: {
      videoId: "B4zkUHMP1Mw",
      channelId: "UC6NZjHRZXyRKsTy7GRY-fxA",
      titleKey: "Estação Ferroviária 3 em Santa Fé do Sul - SP",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-live-2-praia-do-forte-cabo-frio-ao-vi",
    name: { ja: "LIVE 2 - Praia do Forte – Cabo Frio AO VIVO 24h", en: "LIVE 2 - Praia do Forte – Cabo Frio AO VIVO 24h" },
    lat: -6.7167,
    lng: -43.1167,
    timeZone: "America/Fortaleza",
    category: "nature",
    country: "BR",
    source: {
      videoId: "l8o5Q55p_pg",
      channelId: "UCBLHvdpCPy8J1acuXWu82tA",
      titleKey: "LIVE 2 - 🔴 Praia do Forte – Cabo Frio AO VIVO 24h 🌊",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-estacao-ferroviaria-1-em-santa-fe-do",
    name: { ja: "Estação Ferroviária 1 em Santa Fé do Sul - SP", en: "Estação Ferroviária 1 em Santa Fé do Sul - SP" },
    lat: -27.9108,
    lng: -52.26,
    timeZone: "America/Sao_Paulo",
    category: "railway",
    country: "BR",
    source: {
      videoId: "MGIsnMzCR7w",
      channelId: "UC6NZjHRZXyRKsTy7GRY-fxA",
      titleKey: "Estação Ferroviária 1 em Santa Fé do Sul - SP",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-trem-ao-vivo-hortolandia-sp-brasil",
    name: { ja: "TREM AO VIVO HORTOLÂNDIA SP BRASIL", en: "TREM AO VIVO HORTOLÂNDIA SP BRASIL" },
    lat: -0.9932,
    lng: -46.6745,
    timeZone: "America/Belem",
    category: "railway",
    country: "BR",
    source: {
      videoId: "MrExaCVDuOA",
      channelId: "UC2LL1Rrh9mXbaII5mT-nN0g",
      titleKey: "TREM AO VIVO HORTOLÂNDIA SP BRASIL",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-trem-ao-vivo-japeri-rj-brasil",
    name: { ja: "TREM AO VIVO JAPERI RJ BRASIL", en: "TREM AO VIVO JAPERI RJ BRASIL" },
    lat: -0.9932,
    lng: -46.6745,
    timeZone: "America/Belem",
    category: "railway",
    country: "BR",
    source: {
      videoId: "2Olg8sll0VU",
      channelId: "UC2LL1Rrh9mXbaII5mT-nN0g",
      titleKey: "TREM AO VIVO JAPERI RJ BRASIL",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-cristo-redentor-parque-lage-trilha-li",
    name: { ja: "Cristo Redentor × Parque Lage Trilha Live En Vivo Camera — Trail Viewpoint", en: "Cristo Redentor × Parque Lage Trilha Live En Vivo Camera — Trail Viewpoint" },
    lat: -7.4654,
    lng: -64.2435,
    timeZone: "America/Manaus",
    category: "nature",
    country: "BR",
    source: {
      videoId: "ICqyoAgpbO8",
      channelId: "UCfMOswhx9NN_laZ8Ukcm4-Q",
      titleKey: "Cristo Redentor × Parque Lage  Trilha Live En Vivo Camera — Trail Viewpoint",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-ao-vivo-central",
    name: { ja: "Balneário Camboriú ao vivo - CENTRAL", en: "Balneário Camboriú ao vivo - CENTRAL" },
    lat: -27.4239,
    lng: -51.7877,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "iSoT_LJivIA",
      channelId: "UCi1vQx48j_nfrMg6XH5PItQ",
      titleKey: "Balneário Camboriú ao vivo - CENTRAL",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-vista-panoramica-da-praia-dos-artista",
    name: { ja: "Vista Panorâmica da Praia dos Artistas, Forte dos Reis Magos e Ponte Newton Navarro | Natal AO VIVO", en: "Vista Panorâmica da Praia dos Artistas, Forte dos Reis Magos e Ponte Newton Navarro | Natal AO VIVO" },
    lat: -7.6333,
    lng: -48.1667,
    timeZone: "America/Araguaina",
    category: "nature",
    country: "BR",
    source: {
      videoId: "8quWDK9i-v0",
      channelId: "UCNrkCeEzYg79oHO2_5VRDMw",
      titleKey: "Vista Panorâmica da Praia dos Artistas, Forte dos Reis Magos e Ponte Newton Navarro | Natal AO VIVO",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-aeroporto-de-chapeco-ao-vivo-sbch-xap",
    name: { ja: "Aeroporto de Chapecó AO VIVO - SBCH XAP Live - Tráfego aéreo em tempo real com fonia #chapeco", en: "Aeroporto de Chapecó AO VIVO - SBCH XAP Live - Tráfego aéreo em tempo real com fonia #chapeco" },
    lat: -5.0616,
    lng: -42.8255,
    timeZone: "America/Fortaleza",
    category: "airport",
    country: "BR",
    source: {
      videoId: "ae9hVV0ylHo",
      channelId: "UCzwTW6vgC7RcmxssUrGZnwA",
      titleKey: "Aeroporto de Chapecó AO VIVO - SBCH XAP Live - Tráfego aéreo em tempo real com fonia #chapeco",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-escuta-aerea-12-08-2026",
    name: { ja: "Escuta Aérea - 12/08/2026", en: "Escuta Aérea - 12/08/2026" },
    lat: -3.255,
    lng: -43.4242,
    timeZone: "America/Fortaleza",
    category: "airport",
    country: "BR",
    source: {
      videoId: "zQwnLH64oNg",
      channelId: "UC-c8SgEzcKZopeuYJntTEow",
      titleKey: "Escuta Aérea - 12/08/2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-ninho-das-aguias-nova-petropolis-rs-a",
    name: { ja: "NINHO DAS ÁGUIAS - NOVA PETRÓPOLIS/RS - AO VIVO - CÂMERAS DA SERRA", en: "NINHO DAS ÁGUIAS - NOVA PETRÓPOLIS/RS - AO VIVO - CÂMERAS DA SERRA" },
    lat: -7.1541,
    lng: -34.9063,
    timeZone: "America/Fortaleza",
    category: "nature",
    country: "BR",
    source: {
      videoId: "EfPrXO9HVdo",
      channelId: "UCwwJgE2ufqsgThI40PrRVCA",
      titleKey: "🔴 NINHO DAS ÁGUIAS - NOVA PETRÓPOLIS/RS - AO VIVO - CÂMERAS DA SERRA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-igreja-sao-pedro-gramado-rs-ao-vivo-c",
    name: { ja: "IGREJA SÃO PEDRO - GRAMADO/RS - AO VIVO - CÂMERAS DA SERRA", en: "IGREJA SÃO PEDRO - GRAMADO/RS - AO VIVO - CÂMERAS DA SERRA" },
    lat: -13,
    lng: -38.6667,
    timeZone: "America/Bahia",
    category: "city",
    country: "BR",
    source: {
      videoId: "TSvnN0xUJW4",
      channelId: "UCwwJgE2ufqsgThI40PrRVCA",
      titleKey: "🔴 IGREJA SÃO PEDRO - GRAMADO/RS - AO VIVO - CÂMERAS DA SERRA",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-goioere-ao-vivo-cam-3-bairro-agora-av",
    name: { ja: "GOIOERÊ AO VIVO| CAM 3| BAIRRO AGORA | AV. CURITIBA #cidadesdoparaná #centro", en: "GOIOERÊ AO VIVO| CAM 3| BAIRRO AGORA | AV. CURITIBA #cidadesdoparaná #centro" },
    lat: -24.1847,
    lng: -53.0275,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "5IEvI2t3tTw",
      channelId: "UCak21Edmz9LDZ_3-bl3TNyA",
      titleKey: "🔴 GOIOERÊ AO VIVO| CAM 3|  BAIRRO AGORA | AV. CURITIBA #cidadesdoparaná #centro",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-guaruja-ao-vivo-hotel-palmar-enseada",
    name: { ja: "Guarujá ao vivo - Hotel Palmar - Enseada, posto 11 2026", en: "Guarujá ao vivo - Hotel Palmar - Enseada, posto 11 2026" },
    lat: -23.9931,
    lng: -46.2564,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "v5Y6WsD577M",
      channelId: "UCGJaqUeVWMrxawXUhCK2wPw",
      titleKey: "Guarujá ao vivo  - Hotel Palmar  - Enseada, posto 11 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-praia-de-porto-de-galinhas-ao-vivo-we",
    name: { ja: "PRAIA DE PORTO DE GALINHAS AO VIVO | Webcam PTZ 24H | Pernambuco Brasil", en: "PRAIA DE PORTO DE GALINHAS AO VIVO | Webcam PTZ 24H | Pernambuco Brasil" },
    lat: -6.7167,
    lng: -43.1167,
    timeZone: "America/Fortaleza",
    category: "nature",
    country: "BR",
    source: {
      videoId: "zKsgtmgGHt4",
      channelId: "UCak21Edmz9LDZ_3-bl3TNyA",
      titleKey: "🔴 PRAIA DE PORTO DE GALINHAS AO VIVO 🌴 | Webcam PTZ 24H | Pernambuco Brasil",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-ao-vivo-avenida-br",
    name: { ja: "Balneário Camboriú ao vivo - Avenida Brasil", en: "Balneário Camboriú ao vivo - Avenida Brasil" },
    lat: -27.4239,
    lng: -51.7877,
    timeZone: "America/Sao_Paulo",
    category: "city",
    country: "BR",
    source: {
      videoId: "9aYIJ_lQ6Fw",
      channelId: "UCi1vQx48j_nfrMg6XH5PItQ",
      titleKey: "Balneário Camboriú ao vivo - Avenida Brasil",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-balneario-camboriu-sc-ao-vivo-praia-d",
    name: { ja: "BALNEÁRIO CAMBORIÚ SC AO VIVO | PRAIA DE LARANJEIRAS – CASA DO CAMARÃO | CONEXÃODCTV", en: "BALNEÁRIO CAMBORIÚ SC AO VIVO | PRAIA DE LARANJEIRAS – CASA DO CAMARÃO | CONEXÃODCTV" },
    lat: -27.4239,
    lng: -51.7877,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "lFlovxrE9Og",
      channelId: "UC37R9R29MAwvrOBafYoBtow",
      titleKey: "BALNEÁRIO CAMBORIÚ SC AO VIVO | PRAIA DE LARANJEIRAS – CASA DO CAMARÃO | CONEXÃODCTV",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-paraguai-ao-vivo-camera-ciudad-del-es",
    name: { ja: "PARAGUAI AO VIVO| CAMERA CIUDAD DEL ESTE | TRÂNSITO MOSTRA FRONTEIRA BRASIL E PONTE DA AMIZADE", en: "PARAGUAI AO VIVO| CAMERA CIUDAD DEL ESTE | TRÂNSITO MOSTRA FRONTEIRA BRASIL E PONTE DA AMIZADE" },
    lat: -8.0167,
    lng: -37.1167,
    timeZone: "America/Fortaleza",
    category: "city",
    country: "BR",
    source: {
      videoId: "Tldo8RNCT-0",
      channelId: "UCak21Edmz9LDZ_3-bl3TNyA",
      titleKey: "🔴  PARAGUAI AO VIVO| CAMERA CIUDAD DEL ESTE | TRÂNSITO MOSTRA FRONTEIRA BRASIL E PONTE  DA AMIZADE",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-santos-ao-vivo-canal-1-maranhao-silve",
    name: { ja: "Santos ao vivo!!! Canal 1/ Maranhão - Silversurfboards - 2026", en: "Santos ao vivo!!! Canal 1/ Maranhão - Silversurfboards - 2026" },
    lat: -23.9608,
    lng: -46.3336,
    timeZone: "America/Sao_Paulo",
    category: "nature",
    country: "BR",
    source: {
      videoId: "CkHrJQGVukI",
      channelId: "UCGJaqUeVWMrxawXUhCK2wPw",
      titleKey: "Santos ao vivo!!! Canal 1/ Maranhão - Silversurfboards - 2026",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbsp-live-2-aeroporto-de-sao-paulo-co",
    name: { ja: "SBSP LIVE #2 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite", en: "SBSP LIVE #2 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite" },
    lat: -23.6275,
    lng: -46.656,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "ZJH-a0CD0CQ",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBSP LIVE #2 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbgr-10l-live-aeroporto-internacional",
    name: { ja: "SBGR 10L LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite", en: "SBGR 10L LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite" },
    lat: -23.4306,
    lng: -46.481,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "lnD4BOFpBss",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBGR 10L LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbsp-live-1-aeroporto-de-sao-paulo-co",
    name: { ja: "SBSP LIVE #1 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite", en: "SBSP LIVE #1 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite" },
    lat: -23.6275,
    lng: -46.656,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "npWPVCz8dHk",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBSP LIVE #1 - Aeroporto de São Paulo Congonhas AO VIVO - CGH Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbgr-10r-live-aeroporto-internacional",
    name: { ja: "SBGR 10R LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite", en: "SBGR 10R LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite" },
    lat: -23.4306,
    lng: -46.481,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "R6rzU6xTP74",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBGR 10R LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "br-sbgr-28-live-aeroporto-internacional",
    name: { ja: "SBGR 28 LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite", en: "SBGR 28 LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite" },
    lat: -23.4306,
    lng: -46.481,
    timeZone: "America/Sao_Paulo",
    category: "airport",
    country: "BR",
    source: {
      videoId: "yXrjdS-Pmkk",
      channelId: "UCbpmfj2g2tYuBezI2kEDhsg",
      titleKey: "SBGR 28 LIVE - Aeroporto Internacional de São Paulo Guarulhos AO VIVO - GRU Airport - 13/07 Noite",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-24-7-alliston-ontario-traffic-we",
    name: { ja: "LIVE 24/7 | Alliston, Ontario Traffic & Weather Camera | King St S & Young St", en: "LIVE 24/7 | Alliston, Ontario Traffic & Weather Camera | King St S & Young St" },
    lat: 44.1501,
    lng: -79.8663,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "CBtjrr2k34A",
      channelId: "UC5LcnBmnvd1MS7Zx2KLcogQ",
      titleKey: "LIVE 24/7 | Alliston, Ontario Traffic & Weather Camera | King St S & Young St",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-24-7-live-cat-tv-no-ads-backyard-bird",
    name: { ja: "24/7 LIVE CAT TV NO ADS Backyard Bird Feeder & Squirrel Cam | Peaceful Nature Sounds in 4K", en: "24/7 LIVE CAT TV NO ADS Backyard Bird Feeder & Squirrel Cam | Peaceful Nature Sounds in 4K" },
    lat: 53.3669,
    lng: -108.0346,
    timeZone: "America/Regina",
    category: "animal",
    country: "CA",
    source: {
      videoId: "piMJecuC01U",
      channelId: "UCwCuU8g12LtWuXdL9MOEahg",
      titleKey: "🔴 24/7 LIVE CAT TV NO ADS 😺 Backyard Bird Feeder & Squirrel Cam | Peaceful Nature Sounds in 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-ocean-village-resort",
    name: { ja: "Ocean Village Resort", en: "Ocean Village Resort" },
    lat: 49.0333,
    lng: -122.8667,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "5WdsHkKVanA",
      channelId: "UC5sls141Xdq9tQdxCv4In7A",
      titleKey: "Ocean Village Resort",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-river-otter-cam",
    name: { ja: "River Otter Cam", en: "River Otter Cam" },
    lat: 50.0308,
    lng: -100.2403,
    timeZone: "America/Winnipeg",
    category: "animal",
    country: "CA",
    source: {
      videoId: "C2iP-oVYQV4",
      channelId: "UCjqDAH8vlPbt-J3DlLpJKuw",
      titleKey: "River Otter Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-sea-otter-cam-2-vancouver-aquarium",
    name: { ja: "Sea Otter Cam 2 | Vancouver Aquarium", en: "Sea Otter Cam 2 | Vancouver Aquarium" },
    lat: 45.7834,
    lng: -62.9781,
    timeZone: "America/Halifax",
    category: "animal",
    country: "CA",
    source: {
      videoId: "_KXHUb0wFRE",
      channelId: "UCbzl-qtfTKY9QNgtnqmuyBw",
      titleKey: "Sea Otter Cam 2 | Vancouver Aquarium",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-town-of-collingwood-live-stream",
    name: { ja: "Town of Collingwood Live Stream", en: "Town of Collingwood Live Stream" },
    lat: 42.8933,
    lng: -80.1411,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "EPKWu223XEg",
      channelId: "UCY8S0Pa6lQKzvlrY87ki6sQ",
      titleKey: "Town of Collingwood Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-whistler-olympic-plaza",
    name: { ja: "Whistler Olympic Plaza", en: "Whistler Olympic Plaza" },
    lat: 50.1182,
    lng: -122.954,
    timeZone: "America/Vancouver",
    category: "nature",
    country: "CA",
    source: {
      videoId: "IEhDUXECe_k",
      channelId: "UCtUyw9nTFtCCg-RPA4c8cDg",
      titleKey: "Whistler Olympic Plaza",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-kicking-horse-base-plaza-live-cam",
    name: { ja: "Kicking Horse Base Plaza - Live Cam", en: "Kicking Horse Base Plaza - Live Cam" },
    lat: 51.45,
    lng: -116.2855,
    timeZone: "America/Edmonton",
    category: "city",
    country: "CA",
    source: {
      videoId: "qW1FFVhFFi0",
      channelId: "UCz1YzleJz5wQC54lSKMh2TA",
      titleKey: "Kicking Horse Base Plaza - Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-raw-video-benson-street-security-came",
    name: { ja: "Raw video: Benson Street security camera footage", en: "Raw video: Benson Street security camera footage" },
    lat: 46.0501,
    lng: -73.7159,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "gdVuVrAk4ss",
      channelId: "UCYYSLCzDmmED5hnYcFmKimA",
      titleKey: "Raw video: Benson Street security camera footage",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-plane-spotting-at-toronto-pearso",
    name: { ja: "LIVE Plane Spotting at Toronto Pearson (YYZ) | Holiday Inn Express Exclusive View | July 28", en: "LIVE Plane Spotting at Toronto Pearson (YYZ) | Holiday Inn Express Exclusive View | July 28" },
    lat: 51.7448,
    lng: -128.0673,
    timeZone: "America/Vancouver",
    category: "airport",
    country: "CA",
    source: {
      videoId: "svNqGQ3dxAk",
      channelId: "UCmUoZewl3NCgUm8uJ7jqkiw",
      titleKey: "🔴 LIVE Plane Spotting at Toronto Pearson (YYZ) | Holiday Inn Express Exclusive View | July 28",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-montreal-trudeau-airport-cyul-24",
    name: { ja: "LIVE Montreal Trudeau Airport CYUL 24/7 Webcam Runway 24R", en: "LIVE Montreal Trudeau Airport CYUL 24/7 Webcam Runway 24R" },
    lat: 45.5088,
    lng: -73.5878,
    timeZone: "America/Toronto",
    category: "airport",
    country: "CA",
    source: {
      videoId: "M8Sd0-g8Mx4",
      channelId: "UCmM8fJ5uDl8pqu8nnd8Ixlg",
      titleKey: "LIVE Montreal Trudeau Airport CYUL 24/7 Webcam Runway 24R",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-delta-intelligent-building-technologi",
    name: { ja: "Delta Intelligent Building Technologies & Delta Controls New Building Construction LIVE!", en: "Delta Intelligent Building Technologies & Delta Controls New Building Construction LIVE!" },
    lat: 49.144,
    lng: -122.9068,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "XdF_MSlkYBs",
      channelId: "UChxvvh2NnFJtW5L8QHxVlBw",
      titleKey: "Delta Intelligent Building Technologies & Delta Controls New Building Construction LIVE!",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-sundial-hotel-live-stream",
    name: { ja: "Sundial Hotel Live Stream", en: "Sundial Hotel Live Stream" },
    lat: 51.183,
    lng: -124.5863,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "VsRD_BG_7us",
      channelId: "UCRSVYu3ANXrQuSnpw5bPUBw",
      titleKey: "Sundial Hotel Live Stream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-vancouver-cambie-bridge-live-cam-traf",
    name: { ja: "Vancouver Cambie Bridge Live Cam | Traffic, Boats & False Creek | 24/7", en: "Vancouver Cambie Bridge Live Cam | Traffic, Boats & False Creek | 24/7" },
    lat: 49.2497,
    lng: -123.1193,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "aByyCUuaI0Q",
      channelId: "UC2pcJEiCB6pOSC8UCmyEdBw",
      titleKey: "🔴 Vancouver Cambie Bridge Live Cam | Traffic, Boats & False Creek | 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-toronto-railcam-go-train-via-rai",
    name: { ja: "Live Toronto Railcam • GO Train, VIA Rail & Amtrak Tracker | Gardiner Expressway Traffic Hub (4K)", en: "Live Toronto Railcam • GO Train, VIA Rail & Amtrak Tracker | Gardiner Expressway Traffic Hub (4K)" },
    lat: 43.7064,
    lng: -79.3986,
    timeZone: "America/Toronto",
    category: "railway",
    country: "CA",
    source: {
      videoId: "HongS1sx4pY",
      channelId: "UC28IT4ghbKO988OzkIfRCbw",
      titleKey: "🔴 Live Toronto Railcam • GO Train, VIA Rail & Amtrak Tracker | Gardiner Expressway Traffic Hub (4K)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-view-of-downtown-toronto-as-wild",
    name: { ja: "LIVE: View of downtown Toronto as wildfire smoke blankets city", en: "LIVE: View of downtown Toronto as wildfire smoke blankets city" },
    lat: 44.2176,
    lng: -78.7661,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "4BeuX9wcI5I",
      channelId: "UCi7Zk9baY1tvdlgxIML8MXg",
      titleKey: "LIVE: View of downtown Toronto as wildfire smoke blankets city",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-view-of-downtown-toronto-as-2",
    name: { ja: "LIVE: View of downtown Toronto as wildfire smoke blankets city", en: "LIVE: View of downtown Toronto as wildfire smoke blankets city" },
    lat: 44.2176,
    lng: -78.7661,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "iUbDs97pV1U",
      channelId: "UCs3o4RhBiP2wcwqkZR2QVLw",
      titleKey: "LIVE: View of downtown Toronto as wildfire smoke blankets city",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-montreal-canada-by-drone-4k",
    name: { ja: "Montreal, Canada 🇨🇦 - by drone [4K]", en: "Montreal, Canada 🇨🇦 - by drone [4K]" },
    lat: 45.5088,
    lng: -73.5878,
    timeZone: "America/Toronto",
    category: "city",
    country: "CA",
    source: {
      videoId: "zkGwMz2Dfos",
      channelId: "UCbDH6Ga-wuaam2IHqAxm3hg",
      titleKey: "Montreal, Canada 🇨🇦 - by drone [4K]",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-mcadam-railway-station-nb-canada-live",
    name: { ja: "McAdam Railway Station, NB Canada - Live Cam", en: "McAdam Railway Station, NB Canada - Live Cam" },
    lat: 45.5923,
    lng: -67.307,
    timeZone: "America/Moncton",
    category: "railway",
    country: "CA",
    source: {
      videoId: "hZJLS6Fu1JE",
      channelId: "UC8gbWbcNNyb5-NIXvFklkOA",
      titleKey: "McAdam Railway Station, NB Canada - Live Cam",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-live-cam-central-memorial-park-calgar",
    name: { ja: "Live Cam, Central Memorial Park, Calgary, Alberta", en: "Live Cam, Central Memorial Park, Calgary, Alberta" },
    lat: 43.2644,
    lng: -79.8753,
    timeZone: "America/Toronto",
    category: "nature",
    country: "CA",
    source: {
      videoId: "xsRDTfuksyI",
      channelId: "UCXab5AWv4FVoGCoVqDTq36w",
      titleKey: "Live Cam, Central Memorial Park, Calgary, Alberta",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-block-house-island",
    name: { ja: "Block House Island", en: "Block House Island" },
    lat: 46.7517,
    lng: -65.3285,
    timeZone: "America/Moncton",
    category: "nature",
    country: "CA",
    source: {
      videoId: "wJTwuekiCr0",
      channelId: "UCAkJrfAJYzMUuj5yNayflgQ",
      titleKey: "Block House Island",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ca-vancouver-4k-walking-tour-canada-capt",
    name: { ja: "Vancouver 4K Walking Tour (Canada) - Captions & Immersive Sound [4K Ultra HD/60fps]", en: "Vancouver 4K Walking Tour (Canada) - Captions & Immersive Sound [4K Ultra HD/60fps]" },
    lat: 49.2497,
    lng: -123.1193,
    timeZone: "America/Vancouver",
    category: "city",
    country: "CA",
    source: {
      videoId: "SYzzp-khjiQ",
      channelId: "UCV2_l3k3JuZwIhiY1H0kSxA",
      titleKey: "Vancouver 4K Walking Tour (Canada) - Captions & Immersive Sound [4K Ultra HD/60fps]",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-live-webcam-from-hotel-suvretta-house",
    name: { ja: "Live WebCam from Hotel Suvretta House - St. Moritz, Switzerland", en: "Live WebCam from Hotel Suvretta House - St. Moritz, Switzerland" },
    lat: 47.3023,
    lng: 8.4619,
    timeZone: "Europe/Zurich",
    category: "city",
    country: "CH",
    source: {
      videoId: "ALZU0HGq-1c",
      channelId: "UCuC2O77qFl3UtcUN4KmKaeg",
      titleKey: "Live WebCam from Hotel Suvretta House - St. Moritz, Switzerland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-conny-land-lipperswil-der-freizeitpar",
    name: { ja: "Conny Land Lipperswil - DER Freizeitpark in der Schweiz - Wetter live im Thurgau", en: "Conny Land Lipperswil - DER Freizeitpark in der Schweiz - Wetter live im Thurgau" },
    lat: 47.6146,
    lng: 9.0574,
    timeZone: "Europe/Zurich",
    category: "nature",
    country: "CH",
    source: {
      videoId: "eSdr6BaBH9A",
      channelId: "UCgYVcdg2f9NLnhDby8YVCVg",
      titleKey: "Conny Land Lipperswil - DER Freizeitpark in der Schweiz - Wetter live im Thurgau",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-lauterbrunnen-switzerland-walking-tou",
    name: { ja: "Lauterbrunnen, Switzerland walking tour 4K 60fps - A paradise on Earth", en: "Lauterbrunnen, Switzerland walking tour 4K 60fps - A paradise on Earth" },
    lat: 46.5931,
    lng: 7.9094,
    timeZone: "Europe/Zurich",
    category: "city",
    country: "CH",
    source: {
      videoId: "Bq4rmeIvJbs",
      channelId: "UCeldhl2LRQRMz0bLSvGMYNg",
      titleKey: "Lauterbrunnen, Switzerland walking tour 4K 60fps - A paradise on Earth",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-hotel-east-west-basel",
    name: { ja: "Hotel East West Basel", en: "Hotel East West Basel" },
    lat: 46.5985,
    lng: 9.949,
    timeZone: "Europe/Zurich",
    category: "nature",
    country: "CH",
    source: {
      videoId: "jtLh8BdmHUU",
      channelId: "UC9SBZ5xzzCRj5HOTcP4z1iA",
      titleKey: "Hotel East West Basel",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-zurich-switzerland-walking-tour-4k-po",
    name: { ja: "Zurich Switzerland Walking Tour 4K 🇨🇭 | Polybahn, Old Town & Limmat River", en: "Zurich Switzerland Walking Tour 4K 🇨🇭 | Polybahn, Old Town & Limmat River" },
    lat: 47.3667,
    lng: 8.55,
    timeZone: "Europe/Zurich",
    category: "city",
    country: "CH",
    source: {
      videoId: "zOiomgB5x2E",
      channelId: "UCvZ0DV9PY-ywyr7fErlxElg",
      titleKey: "Zurich Switzerland Walking Tour 4K 🇨🇭 | Polybahn, Old Town & Limmat River",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-can-you-believe-this-place-is-real-sc",
    name: { ja: "Can You Believe This Place Is Real?🇨🇭Scenic Walk Through Grindelwald", en: "Can You Believe This Place Is Real?🇨🇭Scenic Walk Through Grindelwald" },
    lat: 46.3206,
    lng: 9.5322,
    timeZone: "Europe/Zurich",
    category: "city",
    country: "CH",
    source: {
      videoId: "-sM_WxDpdqQ",
      channelId: "UCOlx478DxwYAwkLnz9ELNIQ",
      titleKey: "Can You Believe This Place Is Real?🇨🇭Scenic Walk Through Grindelwald",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "ch-the-most-beautiful-city-in-switzerlan",
    name: { ja: "The Most Beautiful City in Switzerland? 🇨🇭Lucerne | Walking Tour with Stunning Views", en: "The Most Beautiful City in Switzerland? 🇨🇭Lucerne | Walking Tour with Stunning Views" },
    lat: 47.4994,
    lng: 7.5567,
    timeZone: "Europe/Zurich",
    category: "city",
    country: "CH",
    source: {
      videoId: "3nYnfYJAkao",
      channelId: "UCOlx478DxwYAwkLnz9ELNIQ",
      titleKey: "The Most Beautiful City in Switzerland? 🇨🇭Lucerne | Walking Tour with Stunning Views",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cl-valle-nevado-ski-resort-live-la-fourc",
    name: { ja: "Valle Nevado Ski Resort Live - La Fourchette", en: "Valle Nevado Ski Resort Live - La Fourchette" },
    lat: -28.5762,
    lng: -70.7594,
    timeZone: "America/Santiago",
    category: "nature",
    country: "CL",
    source: {
      videoId: "tWNxInShxZI",
      channelId: "UCeugwuttf3KGSyVuax_AzNw",
      titleKey: "Valle Nevado Ski Resort Live - La Fourchette",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cl-valle-nevado-ski-resort-live-hotel-pu",
    name: { ja: "Valle Nevado Ski Resort Live - Hotel Puerta del Sol", en: "Valle Nevado Ski Resort Live - Hotel Puerta del Sol" },
    lat: -28.5762,
    lng: -70.7594,
    timeZone: "America/Santiago",
    category: "nature",
    country: "CL",
    source: {
      videoId: "tmS73xQ4zVc",
      channelId: "UCeugwuttf3KGSyVuax_AzNw",
      titleKey: "Valle Nevado Ski Resort Live - Hotel Puerta del Sol",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cl-valle-nevado-ski-resort-live-piscina",
    name: { ja: "Valle Nevado Ski Resort Live - Piscina", en: "Valle Nevado Ski Resort Live - Piscina" },
    lat: -28.5762,
    lng: -70.7594,
    timeZone: "America/Santiago",
    category: "city",
    country: "CL",
    source: {
      videoId: "uyt8JsITTac",
      channelId: "UCeugwuttf3KGSyVuax_AzNw",
      titleKey: "Valle Nevado Ski Resort Live - Piscina",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cn-4k-china-walk-chinese-countryside-sma",
    name: { ja: "4K China Walk - Chinese Countryside Small Town | 傍晚徒步湖南省洞口县山门镇风雨桥", en: "4K China Walk - Chinese Countryside Small Town | 傍晚徒步湖南省洞口县山门镇风雨桥" },
    lat: 27.0606,
    lng: 110.9392,
    timeZone: "Asia/Shanghai",
    category: "city",
    country: "CN",
    source: {
      videoId: "EoO8ybnC3Mw",
      channelId: "UCbkaxMiF1otRLjLia_SF8Lg",
      titleKey: "4K China Walk - Chinese Countryside Small Town | 傍晚徒步湖南省洞口县山门镇风雨桥",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cn-live-inside-china-s-mega-wholesale-ma",
    name: { ja: "LIVE Inside China's Mega Wholesale Market 🇨🇳 | OneLink Plaza Guangzhou Walk", en: "LIVE Inside China's Mega Wholesale Market 🇨🇳 | OneLink Plaza Guangzhou Walk" },
    lat: 26.5562,
    lng: 119.9689,
    timeZone: "Asia/Shanghai",
    category: "city",
    country: "CN",
    source: {
      videoId: "_B7aqTDfPC4",
      channelId: "UCfC936icIlVjgqVDOFZKpQw",
      titleKey: "LIVE Inside China's Mega Wholesale Market 🇨🇳 | OneLink Plaza Guangzhou Walk",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cu-cuba-today-walking-tours-24-7-real-st",
    name: { ja: "Cuba Today | Walking Tours 24/7 🇨🇺 | REAL Street Life & City Walks", en: "Cuba Today | Walking Tours 24/7 🇨🇺 | REAL Street Life & City Walks" },
    lat: 22,
    lng: -79.5,
    timeZone: "America/Havana",
    category: "city",
    country: "CU",
    source: {
      videoId: "Sp_lVhhGPUY",
      channelId: "UCIZ52PWMdlcF7cLu_Z94r_Q",
      titleKey: "Cuba Today | Walking Tours 24/7 🇨🇺 | REAL Street Life & City Walks",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cz-prague-christmas-markets-full-city-ce",
    name: { ja: "Prague Christmas Markets: Full City Center Walking Tour (4K 60fps)", en: "Prague Christmas Markets: Full City Center Walking Tour (4K 60fps)" },
    lat: 50.088,
    lng: 14.4208,
    timeZone: "Europe/Prague",
    category: "city",
    country: "CZ",
    source: {
      videoId: "fXdsgWUxHaU",
      channelId: "UCNzul4dnciIlDg8BAcn5-cQ",
      titleKey: "Prague Christmas Markets: Full City Center Walking Tour (4K 60fps)",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "cz-prague-walking-tour-2025-for-big-tvs",
    name: { ja: "PRAGUE Walking Tour 2025 for Big TVs | 4K 60fps City Walk Through the Capital of the Czech Republic", en: "PRAGUE Walking Tour 2025 for Big TVs | 4K 60fps City Walk Through the Capital of the Czech Republic" },
    lat: 50.088,
    lng: 14.4208,
    timeZone: "Europe/Prague",
    category: "city",
    country: "CZ",
    source: {
      videoId: "VZrcZLJ0HUM",
      channelId: "UCV2_l3k3JuZwIhiY1H0kSxA",
      titleKey: "PRAGUE Walking Tour 2025 for Big TVs | 4K 60fps City Walk Through the Capital of the Czech Republic",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-hildesheim-marktplatz",
    name: { ja: "LIVE: Hildesheim Marktplatz", en: "LIVE: Hildesheim Marktplatz" },
    lat: 52.1508,
    lng: 9.9511,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "671yJ4jELFg",
      channelId: "UCaBnz71URU0bZ7nO2qsexfQ",
      titleKey: "LIVE: Hildesheim Marktplatz",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-hildesheim-platz-an-der-lilie",
    name: { ja: "LIVE: Hildesheim Platz An der Lilie", en: "LIVE: Hildesheim Platz An der Lilie" },
    lat: 52.1508,
    lng: 9.9511,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "BhW0jfuCb7w",
      channelId: "UCaBnz71URU0bZ7nO2qsexfQ",
      titleKey: "LIVE: Hildesheim Platz An der Lilie",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-dicker-turm-turmstra-e-von-der-evgl-s",
    name: { ja: "Dicker Turm Turmstraße / von der Evgl. Stadtkirche aus gesehen", en: "Dicker Turm Turmstraße / von der Evgl. Stadtkirche aus gesehen" },
    lat: 50.5301,
    lng: 9.7282,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "xPtzJdHTO3Y",
      channelId: "UCMUMwkw7X1_uoovtf5bLk-Q",
      titleKey: "Dicker Turm Turmstraße / von der Evgl. Stadtkirche aus gesehen",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-stadtmitte-von-der-sud-dakota-brucke",
    name: { ja: "Stadtmitte von der Süd-Dakota Brücke aus", en: "Stadtmitte von der Süd-Dakota Brücke aus" },
    lat: 54.0852,
    lng: 12.1415,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "oYF1yEIwQqo",
      channelId: "UCMUMwkw7X1_uoovtf5bLk-Q",
      titleKey: "Stadtmitte von der Süd-Dakota Brücke aus",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-blick-auf-st-peter-und-paul-oberstra",
    name: { ja: "Blick auf St. Peter und Paul / Oberstraße", en: "Blick auf St. Peter und Paul / Oberstraße" },
    lat: 54.6895,
    lng: 9.7911,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "AY__GkQN3WA",
      channelId: "UCMUMwkw7X1_uoovtf5bLk-Q",
      titleKey: "Blick auf St. Peter und Paul / Oberstraße",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-webcam-stadt-zeitz",
    name: { ja: "Webcam Stadt Zeitz", en: "Webcam Stadt Zeitz" },
    lat: 52.6981,
    lng: 8.768,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "-U1QfhrBff8",
      channelId: "UCtbBSkGz_KpcW-nxz9Gx8-w",
      titleKey: "Webcam Stadt Zeitz",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-flughafen-live-berlin-freitag-nachmit",
    name: { ja: "Flughafen LIVE Berlin: Freitag Nachmittag 7.8. 2026 - An- und Abflüge mit Thomas", en: "Flughafen LIVE Berlin: Freitag Nachmittag 7.8. 2026 - An- und Abflüge mit Thomas" },
    lat: 50.9818,
    lng: 12.5064,
    timeZone: "Europe/Berlin",
    category: "airport",
    country: "DE",
    source: {
      videoId: "xeMaz1S3w4Y",
      channelId: "UCrUOJmn796yPggp5OJNH3Dg",
      titleKey: "Flughafen LIVE 🐻 Berlin: Freitag Nachmittag 7.8. 2026 - An- und Abflüge mit Thomas",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-blick-vom-corbusierhaus-berlin-a",
    name: { ja: "Live - Blick vom Corbusierhaus Berlin auf das Olympiastadion", en: "Live - Blick vom Corbusierhaus Berlin auf das Olympiastadion" },
    lat: 54.6895,
    lng: 9.7911,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "61b3Jty73Zo",
      channelId: "UCR2CLso5tZOHwkFDXPuuKHw",
      titleKey: "Live - Blick vom Corbusierhaus Berlin auf das Olympiastadion",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-rhein-rees",
    name: { ja: "Live Rhein Rees", en: "Live Rhein Rees" },
    lat: 50.8546,
    lng: 7.7076,
    timeZone: "Europe/Berlin",
    category: "nature",
    country: "DE",
    source: {
      videoId: "8XOrJj1hV40",
      channelId: "UCaLDNGnkbTjnpG7j00om-Qg",
      titleKey: "Live Rhein Rees",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-blick-von-st-peter-paul-auf-den-markt",
    name: { ja: "Blick von St. Peter & Paul auf den Marktplatz, Kino, Rathaus", en: "Blick von St. Peter & Paul auf den Marktplatz, Kino, Rathaus" },
    lat: 54.6895,
    lng: 9.7911,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "Z_A7MI6gQzY",
      channelId: "UCWoSSpMoASiCNk35MlZ2WAw",
      titleKey: "Blick von St. Peter & Paul auf den Marktplatz, Kino, Rathaus",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-kissinger-hutte-2-0-feuerberg-rhon-4k",
    name: { ja: "Kissinger Hütte 2.0 - Feuerberg - Rhön - 4K Livestream", en: "Kissinger Hütte 2.0 - Feuerberg - Rhön - 4K Livestream" },
    lat: 51.6612,
    lng: 7.7709,
    timeZone: "Europe/Berlin",
    category: "nature",
    country: "DE",
    source: {
      videoId: "VQ6papRP8og",
      channelId: "UCZVM1ShZYDLxnCkjEHmmHPQ",
      titleKey: "Kissinger Hütte 2.0 - Feuerberg - Rhön - 4K Livestream",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-ulm-neubau-wallstra-enbrucke-umb",
    name: { ja: "LIVE: Ulm - Neubau Wallstraßenbrücke & Umbau Blaubeurer Tor", en: "LIVE: Ulm - Neubau Wallstraßenbrücke & Umbau Blaubeurer Tor" },
    lat: 48.3984,
    lng: 9.9916,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "ZONGv5KUOUE",
      channelId: "UC0wYpb4n5L5ttcyNcfEtuxg",
      titleKey: "LIVE: Ulm - Neubau Wallstraßenbrücke & Umbau Blaubeurer Tor",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-rhein-bei-rees-rheinaufwarts-ric",
    name: { ja: "Live Rhein bei Rees, rheinaufwärts Richtung Wesel", en: "Live Rhein bei Rees, rheinaufwärts Richtung Wesel" },
    lat: 50.8546,
    lng: 7.7076,
    timeZone: "Europe/Berlin",
    category: "nature",
    country: "DE",
    source: {
      videoId: "7yO8E_YFYAU",
      channelId: "UCaLDNGnkbTjnpG7j00om-Qg",
      titleKey: "Live Rhein bei Rees, rheinaufwärts Richtung Wesel",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-the-construction-of-300-metre-aidapri",
    name: { ja: "The Construction of 300 METRE AIDAprima - CRUISE SHIP - CINEMATIC TIMELAPSE 4K", en: "The Construction of 300 METRE AIDAprima - CRUISE SHIP - CINEMATIC TIMELAPSE 4K" },
    lat: 48.3972,
    lng: 11.9645,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "lavm7CausyA",
      channelId: "UCpYUVZjvmu2VcnGITISqczA",
      titleKey: "The Construction of 300 METRE AIDAprima - CRUISE SHIP - CINEMATIC TIMELAPSE 4K",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-st-peter-und-paul-glaspavillon-kirchp",
    name: { ja: "St. Peter und Paul - Glaspavillon - Kirchplatz - Ratingen", en: "St. Peter und Paul - Glaspavillon - Kirchplatz - Ratingen" },
    lat: 48.0164,
    lng: 8.0325,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "axkFz16ZPFQ",
      channelId: "UCWoSSpMoASiCNk35MlZ2WAw",
      titleKey: "St. Peter und Paul - Glaspavillon - Kirchplatz - Ratingen",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-st-peter-und-paul-richtung-ost",
    name: { ja: "St. Peter und Paul Richtung Ost", en: "St. Peter und Paul Richtung Ost" },
    lat: 48.0164,
    lng: 8.0325,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "ZiJFfLBgsXg",
      channelId: "UCWoSSpMoASiCNk35MlZ2WAw",
      titleKey: "St. Peter und Paul Richtung Ost",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-st-peter-und-paul-richtung-suden-bech",
    name: { ja: "St. Peter und Paul Richtung Süden - Bechemer Straße - Steinhausgasse - Untere Oberstraße", en: "St. Peter und Paul Richtung Süden - Bechemer Straße - Steinhausgasse - Untere Oberstraße" },
    lat: 48.0164,
    lng: 8.0325,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "exryljdXqhA",
      channelId: "UCWoSSpMoASiCNk35MlZ2WAw",
      titleKey: "St. Peter und Paul Richtung Süden - Bechemer Straße - Steinhausgasse - Untere Oberstraße",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-blick-von-den-drei-konigen-auf-den-bu",
    name: { ja: "Blick von den „Drei Königen\" auf den Bürgerhaus am Marktplatz in Ratingen", en: "Blick von den „Drei Königen\" auf den Bürgerhaus am Marktplatz in Ratingen" },
    lat: 54.6895,
    lng: 9.7911,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "UKZRlxbpomg",
      channelId: "UCWoSSpMoASiCNk35MlZ2WAw",
      titleKey: "Blick von den „Drei Königen\" auf den Bürgerhaus am Marktplatz in Ratingen",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-blick-von-der-ev-stadtkirche-nach-sud",
    name: { ja: "Blick von der Ev. Stadtkirche nach Süden am Horizont Knittkuhl, unten Kino und Standesamt", en: "Blick von der Ev. Stadtkirche nach Süden am Horizont Knittkuhl, unten Kino und Standesamt" },
    lat: 54.6895,
    lng: 9.7911,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "xD4vs6RWRXU",
      channelId: "UCWoSSpMoASiCNk35MlZ2WAw",
      titleKey: "Blick von der Ev. Stadtkirche nach Süden am Horizont Knittkuhl, unten Kino und Standesamt",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-blick-vom-kirchturm-st-martin-pfaffen",
    name: { ja: "Blick vom Kirchturm St. Martin Pfaffenhofen a.d. Roth - Blickrichtung Süd-Ost", en: "Blick vom Kirchturm St. Martin Pfaffenhofen a.d. Roth - Blickrichtung Süd-Ost" },
    lat: 54.6895,
    lng: 9.7911,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "WpOjXw7FN3E",
      channelId: "UCi_cOD1uGKaiffL7qMbyTVA",
      titleKey: "Blick vom Kirchturm St. Martin Pfaffenhofen a.d. Roth - Blickrichtung Süd-Ost",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-4k-live-cam-halle-neustadt-germany-24",
    name: { ja: "4K Live Cam Halle Neustadt - Germany 24/7 Livestream | Webcam | Live Blick auf Halle Saale", en: "4K Live Cam Halle Neustadt - Germany 24/7 Livestream | Webcam | Live Blick auf Halle Saale" },
    lat: 51.4816,
    lng: 11.9795,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "_oi1Bp8HmdM",
      channelId: "UCHCBS3f-Z3cztNYKxTUPVtQ",
      titleKey: "4K Live Cam Halle Neustadt - Germany 24/7 Livestream | Webcam | Live Blick auf Halle Saale",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-kiel-holtenau-schleuse-webcam-am",
    name: { ja: "LIVE: Kiel-Holtenau Schleuse – Webcam am Nord-Ostsee-Kanal & Kieler Förde", en: "LIVE: Kiel-Holtenau Schleuse – Webcam am Nord-Ostsee-Kanal & Kieler Förde" },
    lat: 54.3781,
    lng: 10.1645,
    timeZone: "Europe/Berlin",
    category: "harbor",
    country: "DE",
    source: {
      videoId: "7AWAGFNept8",
      channelId: "UCzLB2h38nyHSIaALzwtPvfg",
      titleKey: "🔴 LIVE: Kiel-Holtenau Schleuse – Webcam am Nord-Ostsee-Kanal & Kieler Förde",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-borkum-nordsee-dunen-wattenmeer",
    name: { ja: "LIVE: Borkum – Nordsee, Dünen & Wattenmeer | Webcam 24/7", en: "LIVE: Borkum – Nordsee, Dünen & Wattenmeer | Webcam 24/7" },
    lat: 53.5809,
    lng: 6.6915,
    timeZone: "Europe/Berlin",
    category: "nature",
    country: "DE",
    source: {
      videoId: "SoufqhTDYmc",
      channelId: "UCzLB2h38nyHSIaALzwtPvfg",
      titleKey: "🔴 LIVE: Borkum – Nordsee, Dünen & Wattenmeer | Webcam 24/7",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-brunsbuttel-schleuse-webcam-am-n",
    name: { ja: "LIVE: Brunsbüttel Schleuse – Webcam am Nord-Ostsee-Kanal & Elbmündung", en: "LIVE: Brunsbüttel Schleuse – Webcam am Nord-Ostsee-Kanal & Elbmündung" },
    lat: 53.8962,
    lng: 9.1046,
    timeZone: "Europe/Berlin",
    category: "harbor",
    country: "DE",
    source: {
      videoId: "zGXXy1hclkA",
      channelId: "UCzLB2h38nyHSIaALzwtPvfg",
      titleKey: "🔴 LIVE: Brunsbüttel Schleuse – Webcam am Nord-Ostsee-Kanal & Elbmündung",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-hamburg-germany-germany-s-wealthiest",
    name: { ja: "HAMBURG, Germany 🇩🇪 Germany’s Wealthiest Waterfront? | 4K Walking Tour", en: "HAMBURG, Germany 🇩🇪 Germany’s Wealthiest Waterfront? | 4K Walking Tour" },
    lat: 53.5507,
    lng: 9.993,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "3xcsMhr1bag",
      channelId: "UC20vyRWEaC2GIS8DkmeRQaA",
      titleKey: "HAMBURG, Germany 🇩🇪 Germany’s Wealthiest Waterfront? | 4K Walking Tour",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-best-of-unfalle-2023-schwerer-unfall",
    name: { ja: "Best Of Unfälle 2023 - Schwerer Unfall, Totalschaden und dreiste Fahrerflucht | Dashcam Deutschland", en: "Best Of Unfälle 2023 - Schwerer Unfall, Totalschaden und dreiste Fahrerflucht | Dashcam Deutschland" },
    lat: 51.3608,
    lng: 8.4008,
    timeZone: "Europe/Berlin",
    category: "city",
    country: "DE",
    source: {
      videoId: "Efz-o-nrydo",
      channelId: "UCzSaxPbPU1WDAmbMn8irC1g",
      titleKey: "Best Of Unfälle 2023 - Schwerer Unfall, Totalschaden und dreiste Fahrerflucht | Dashcam Deutschland",
    },
  },
  {
    // 座標: 著名なランドマークとして明示指定
    id: "de-live-fahre-frisia-iii-webcam-norddeic",
    name: { ja: "LIVE: Fähre Frisia III – Webcam Norddeich ⇄ Norderney | Blick auf Nordsee & Wattenmeer", en: "LIVE: Fähre Frisia III – Webcam Norddeich ⇄ Norderney | Blick auf Nordsee & Wattenmeer" },
    lat: 54.5692,
    lng: 13.2584,
    timeZone: "Europe/Berlin",
    category: "harbor",
    country: "DE",
    source: {
      videoId: "mn5GITwfwfE",
      channelId: "UCzLB2h38nyHSIaALzwtPvfg",
      titleKey: "🔴 LIVE: Fähre Frisia III – Webcam Norddeich ⇄ Norderney | Blick auf Nordsee & Wattenmeer",
    },
  },
];
