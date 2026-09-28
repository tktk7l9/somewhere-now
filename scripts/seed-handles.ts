// Handles of the YouTube channels that serve as starting points for exploration.
//
// Only "things a human can verify by eye" are written here (the handle and a note on what
// kind of camera it is). channelId and videoId are not guessed; discover-cams.ts actually
// fetches and confirms them.

export interface SeedHandle {
  handle: string;
  note: string;
}

export const SEED_HANDLES: SeedHandle[] = [
  // Operators streaming many locations at once (dozens of streams from 1 channel)
  { handle: "SkylineWebcams", note: "世界各地の観光地・街・自然" },
  { handle: "explore", note: "explore.org - 動物・自然" },
  { handle: "earthTV", note: "世界の都市" },
  { handle: "EarthCam", note: "都市・ランドマーク" },
  { handle: "africam", note: "アフリカのサファリ" },
  { handle: "VirtualRailfan", note: "鉄道" },
  { handle: "SeeJH", note: "ジャクソンホール(米ワイオミング)" },
  { handle: "LiveBeaches", note: "ビーチ" },
  { handle: "IslandCam", note: "ハワイ・カリブ" },
  { handle: "webcamsdemexico", note: "メキシコ各地" },
  { handle: "CamerasDeMexico", note: "メキシコ各地(別系統)" },

  // Single location but famous
  { handle: "NASA", note: "ISS からの地球" },
  { handle: "MontereyBayAquarium", note: "水族館" },
  { handle: "sandiegozoo", note: "動物園" },
  { handle: "houstonzoo", note: "動物園" },
  { handle: "SmithsonianNationalZoo", note: "動物園" },
  { handle: "abbeyroadstudios", note: "アビイ・ロードの横断歩道" },
  { handle: "LivefromIceland", note: "アイスランド(火山・オーロラ)" },
  { handle: "YellowstoneNPS", note: "イエローストーン国立公園" },
  { handle: "Rakuten", note: "(存在確認用のダミー: ライブカメラではない)" },

  // Japan
  { handle: "weathernews", note: "ウェザーニュース(各地のカメラ)" },
  { handle: "ANNnewsCH", note: "ANN(24 時間ライブ)" },
  { handle: "tbsnewsdig", note: "TBS NEWS DIG" },
  { handle: "kanaloco", note: "神奈川新聞" },
  { handle: "TokyoStreetView", note: "東京の街歩き・定点" },
  // ── Below are the candidates of round 2. Cameras were concentrated in 8 channels and
  //    skewed to the US, so these were added to strengthen Europe, Asia and the southern
  //    hemisphere. Existence and live status are confirmed by discover-cams.ts
  //    (a handle that does not exist is reported as a failure).

  // Europe
  { handle: "BalticLiveCam", note: "バルト三国・欧州各地" },
  { handle: "LiveFromIceland", note: "アイスランド(火山・オーロラ)" },
  { handle: "RailCamUK", note: "英国の鉄道" },
  { handle: "roundshot", note: "スイス各地のパノラマ" },
  { handle: "NRK", note: "ノルウェー公共放送(スローTV)" },
  { handle: "beleefdelente", note: "オランダの野鳥" },
  { handle: "PortofRotterdam", note: "ロッテルダム港" },
  { handle: "HeathrowAirport", note: "ヒースロー空港" },
  { handle: "visitfinland", note: "フィンランド" },
  { handle: "Kamerycz", note: "チェコ各地" },
  { handle: "camaraslive", note: "スペイン各地" },
  { handle: "PolskaKamera", note: "ポーランド各地" },

  // Asia
  { handle: "FNNnewsCH", note: "FNN(24 時間ライブ)" },
  { handle: "nhk", note: "NHK" },
  { handle: "ntv", note: "日テレ" },
  { handle: "KyotoLiveCam", note: "京都" },
  { handle: "OkinawaLive", note: "沖縄" },
  { handle: "MtFujiLive", note: "富士山" },
  { handle: "KBSNews", note: "韓国 KBS" },
  { handle: "setnews", note: "台湾 三立" },
  { handle: "CNAInsider", note: "シンガポール" },
  { handle: "IndiaToday", note: "インド" },

  // Africa, southern hemisphere, others
  { handle: "WildEarth", note: "アフリカのサファリ(実況付きライブ)" },
  { handle: "AfricamLive", note: "アフリカの水場" },
  { handle: "DjumaGameReserve", note: "南アフリカ ジュマ" },
  { handle: "SydneyHarbourLive", note: "シドニー港" },
  { handle: "NewZealandLive", note: "ニュージーランド" },
  { handle: "CornellLabofOrnithology", note: "コーネル大 野鳥カメラ" },
  { handle: "georgiaaquarium", note: "ジョージア水族館" },
  { handle: "nationalaquarium", note: "米国立水族館" },
  { handle: "exploreorg", note: "explore.org(別ハンドルの可能性)" },
  { handle: "SmithsonianZoo", note: "スミソニアン動物園(別ハンドル)" },
  { handle: "usgs", note: "USGS(火山)" },
  { handle: "AlohaLiveCams", note: "ハワイ" },
];
