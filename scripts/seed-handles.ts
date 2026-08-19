// 探索の出発点になる YouTube チャンネルのハンドル。
//
// ここに書くのは「人間が目で検証できるもの」だけ(ハンドルと、どんなカメラかのメモ)。
// channelId と videoId は推測せず、discover-cams.ts が実際に取得して確かめる。

export interface SeedHandle {
  handle: string;
  note: string;
}

export const SEED_HANDLES: SeedHandle[] = [
  // 多地点を同時配信している運営(1 チャンネルから何十本も取れる)
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

  // 単一地点だが有名なもの
  { handle: "NASA", note: "ISS からの地球" },
  { handle: "MontereyBayAquarium", note: "水族館" },
  { handle: "sandiegozoo", note: "動物園" },
  { handle: "houstonzoo", note: "動物園" },
  { handle: "SmithsonianNationalZoo", note: "動物園" },
  { handle: "abbeyroadstudios", note: "アビイ・ロードの横断歩道" },
  { handle: "LivefromIceland", note: "アイスランド(火山・オーロラ)" },
  { handle: "YellowstoneNPS", note: "イエローストーン国立公園" },
  { handle: "Rakuten", note: "(存在確認用のダミー: ライブカメラではない)" },

  // 日本
  { handle: "weathernews", note: "ウェザーニュース(各地のカメラ)" },
  { handle: "ANNnewsCH", note: "ANN(24 時間ライブ)" },
  { handle: "tbsnewsdig", note: "TBS NEWS DIG" },
  { handle: "kanaloco", note: "神奈川新聞" },
  { handle: "TokyoStreetView", note: "東京の街歩き・定点" },
  // ── 以下は 2 巡目の候補。カメラが 8 チャンネルに集中し米国に偏っていたので、
  //    ヨーロッパ・アジア・南半球を厚くするために足した。実在とライブ状況は
  //    discover-cams.ts が確かめる(存在しないハンドルは失敗として報告される)。

  // ヨーロッパ
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

  // アジア
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

  // アフリカ・南半球・その他
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
