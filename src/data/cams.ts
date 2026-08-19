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
];
