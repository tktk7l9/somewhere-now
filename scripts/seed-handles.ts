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
];
