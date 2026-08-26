// YouTube の検索結果ページからライブ配信を集め、API キー無しで候補を増やす。
// 429 対策で間隔を空け、途中結果を都度保存して再開できる。
//
//   npm run cams:scrape-search
//   → scripts/out/search-scrape.json

import { mkdir, readFile, writeFile } from "node:fs/promises";

const DELAY_MS = 3500;
const RETRY_WAIT_MS = 45000;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const LIVE_SP = "EgJAAQ%253D%253D";
const OUT = "scripts/out/search-scrape.json";

interface Query {
  q: string;
  countryCode: string;
  note: string;
}

interface ScrapeHit {
  videoId: string;
  title: string;
  channelId: string;
  channelTitle: string;
  countryCode: string;
  query: string;
}

const CITY_QUERIES: Query[] = [
  { q: "札幌 ライブカメラ", countryCode: "JP", note: "札幌" },
  { q: "東京 交差点 ライブカメラ", countryCode: "JP", note: "東京" },
  { q: "大阪 ライブカメラ", countryCode: "JP", note: "大阪" },
  { q: "京都 ライブカメラ", countryCode: "JP", note: "京都" },
  { q: "横浜 ライブカメラ", countryCode: "JP", note: "横浜" },
  { q: "名古屋 ライブカメラ", countryCode: "JP", note: "名古屋" },
  { q: "福岡 ライブカメラ", countryCode: "JP", note: "福岡" },
  { q: "沖縄 ライブカメラ", countryCode: "JP", note: "沖縄" },
  { q: "仙台 ライブカメラ", countryCode: "JP", note: "仙台" },
  { q: "金沢 ライブカメラ", countryCode: "JP", note: "金沢" },
  { q: "広島 ライブカメラ", countryCode: "JP", note: "広島" },
  { q: "神戸 ライブカメラ", countryCode: "JP", note: "神戸" },
  { q: "長崎 ライブカメラ", countryCode: "JP", note: "長崎" },
  { q: "鹿児島 ライブカメラ", countryCode: "JP", note: "鹿児島" },
  { q: "函館 ライブカメラ", countryCode: "JP", note: "函館" },
  { q: "富士山 ライブカメラ", countryCode: "JP", note: "富士山" },
  { q: "서울 라이브 카메라", countryCode: "KR", note: "ソウル" },
  { q: "부산 라이브 카메라", countryCode: "KR", note: "釜山" },
  { q: "제주 라이브 카메라", countryCode: "KR", note: "済州" },
  { q: "台北 直播 攝影機", countryCode: "TW", note: "台北" },
  { q: "高雄 直播", countryCode: "TW", note: "高雄" },
  { q: "香港 live camera", countryCode: "HK", note: "香港" },
  { q: "上海 直播 摄像头", countryCode: "CN", note: "上海" },
  { q: "北京 直播 摄像头", countryCode: "CN", note: "北京" },
  { q: "广州 直播", countryCode: "CN", note: "広州" },
  { q: "Bangkok live camera", countryCode: "TH", note: "バンコク" },
  { q: "Phuket live cam", countryCode: "TH", note: "プーケット" },
  { q: "Chiang Mai live cam", countryCode: "TH", note: "チェンマイ" },
  { q: "Singapore live camera", countryCode: "SG", note: "シンガポール" },
  { q: "Kuala Lumpur live cam", countryCode: "MY", note: "KL" },
  { q: "Jakarta live cam", countryCode: "ID", note: "ジャカルタ" },
  { q: "Bali live camera", countryCode: "ID", note: "バリ" },
  { q: "Manila live camera", countryCode: "PH", note: "マニラ" },
  { q: "Cebu live cam", countryCode: "PH", note: "セブ" },
  { q: "Ho Chi Minh live cam", countryCode: "VN", note: "ホーチミン" },
  { q: "Hanoi live camera", countryCode: "VN", note: "ハノイ" },
  { q: "Mumbai live camera", countryCode: "IN", note: "ムンバイ" },
  { q: "Delhi live cam", countryCode: "IN", note: "デリー" },
  { q: "Kathmandu live cam", countryCode: "NP", note: "カトマンズ" },
  { q: "Dubai live camera", countryCode: "AE", note: "ドバイ" },
  { q: "Istanbul live camera", countryCode: "TR", note: "イスタンブール" },
  { q: "Antalya live cam", countryCode: "TR", note: "アンタルヤ" },
  { q: "Tel Aviv live camera", countryCode: "IL", note: "テルアビブ" },
  { q: "London live camera", countryCode: "GB", note: "ロンドン" },
  { q: "Edinburgh live cam", countryCode: "GB", note: "エディンバラ" },
  { q: "Paris live camera", countryCode: "FR", note: "パリ" },
  { q: "Nice live cam", countryCode: "FR", note: "ニース" },
  { q: "Berlin live camera", countryCode: "DE", note: "ベルリン" },
  { q: "Munich live cam", countryCode: "DE", note: "ミュンヘン" },
  { q: "Hamburg live cam", countryCode: "DE", note: "ハンブルク" },
  { q: "Amsterdam live camera", countryCode: "NL", note: "アムステルダム" },
  { q: "Barcelona live camera", countryCode: "ES", note: "バルセロナ" },
  { q: "Madrid live cam", countryCode: "ES", note: "マドリード" },
  { q: "Malaga live cam", countryCode: "ES", note: "マラガ" },
  { q: "Rome live camera", countryCode: "IT", note: "ローマ" },
  { q: "Venice live cam", countryCode: "IT", note: "ベネチア" },
  { q: "Milan live cam", countryCode: "IT", note: "ミラノ" },
  { q: "Vienna live camera", countryCode: "AT", note: "ウィーン" },
  { q: "Zurich live camera", countryCode: "CH", note: "チューリッヒ" },
  { q: "Prague live camera", countryCode: "CZ", note: "プラハ" },
  { q: "Budapest live cam", countryCode: "HU", note: "ブダペスト" },
  { q: "Warsaw live camera", countryCode: "PL", note: "ワルシャワ" },
  { q: "Athens live camera", countryCode: "GR", note: "アテネ" },
  { q: "Santorini live cam", countryCode: "GR", note: "サントリーニ" },
  { q: "Lisbon live camera", countryCode: "PT", note: "リスボン" },
  { q: "Reykjavik live camera", countryCode: "IS", note: "レイキャビク" },
  { q: "Oslo live camera", countryCode: "NO", note: "オスロ" },
  { q: "Stockholm live camera", countryCode: "SE", note: "ストックホルム" },
  { q: "Copenhagen live camera", countryCode: "DK", note: "コペンハーゲン" },
  { q: "Helsinki live camera", countryCode: "FI", note: "ヘルシンキ" },
  { q: "Dublin live camera", countryCode: "IE", note: "ダブリン" },
  { q: "New York live camera Times Square", countryCode: "US", note: "NY" },
  { q: "Los Angeles live camera", countryCode: "US", note: "LA" },
  { q: "San Francisco live cam", countryCode: "US", note: "SF" },
  { q: "Chicago live camera", countryCode: "US", note: "シカゴ" },
  { q: "Miami beach live cam", countryCode: "US", note: "マイアミ" },
  { q: "Las Vegas live camera", countryCode: "US", note: "ラスベガス" },
  { q: "Seattle live cam", countryCode: "US", note: "シアトル" },
  { q: "Honolulu live camera", countryCode: "US", note: "ホノルル" },
  { q: "Maui live cam", countryCode: "US", note: "マウイ" },
  { q: "Toronto live camera", countryCode: "CA", note: "トロント" },
  { q: "Vancouver live cam", countryCode: "CA", note: "バンクーバー" },
  { q: "Cancun live cam", countryCode: "MX", note: "カンクン" },
  { q: "Rio de Janeiro live camera", countryCode: "BR", note: "リオ" },
  { q: "Sao Paulo live cam", countryCode: "BR", note: "サンパウロ" },
  { q: "Buenos Aires live camera", countryCode: "AR", note: "ブエノスアイレス" },
  { q: "Cape Town live camera", countryCode: "ZA", note: "ケープタウン" },
  { q: "Sydney harbour live camera", countryCode: "AU", note: "シドニー" },
  { q: "Melbourne live cam", countryCode: "AU", note: "メルボルン" },
  { q: "Gold Coast live cam", countryCode: "AU", note: "ゴールドコースト" },
  { q: "Auckland live camera", countryCode: "NZ", note: "オークランド" },
  { q: "Queenstown live cam", countryCode: "NZ", note: "クイーンズタウン" },
  { q: "beach live webcam 24/7", countryCode: "US", note: "ビーチ一般" },
  { q: "railway live camera train", countryCode: "US", note: "鉄道" },
  { q: "airport live camera runway", countryCode: "US", note: "空港" },
  { q: "wildlife live camera africa", countryCode: "ZA", note: "野生動物" },
  { q: "ski resort live cam alps", countryCode: "CH", note: "スキー" },
  { q: "harbor live webcam", countryCode: "US", note: "港" },
  { q: "câmera ao vivo praia Brasil", countryCode: "BR", note: "ブラジルビーチ" },
  { q: "cámara en vivo playa España", countryCode: "ES", note: "スペインビーチ" },
  { q: "webcam en direct plage France", countryCode: "FR", note: "フランスビーチ" },
  { q: "Webcam Strand Deutschland", countryCode: "DE", note: "ドイツビーチ" },
  { q: "live cam Hawaii beach", countryCode: "US", note: "ハワイビーチ" },
  { q: "live cam Florida beach", countryCode: "US", note: "フロリダ" },
  { q: "live cam California coast", countryCode: "US", note: "カリフォルニア" },
  { q: "live cam Norway fjord", countryCode: "NO", note: "フィヨルド" },
  { q: "live cam Italy piazza", countryCode: "IT", note: "イタリア広場" },
  { q: "live cam Switzerland alps", countryCode: "CH", note: "スイス" },
  { q: "volcano live camera hawaii", countryCode: "US", note: "火山" },
  { q: "live cam Poland city square", countryCode: "PL", note: "ポーランド" },
  { q: "live cam Texas downtown", countryCode: "US", note: "テキサス" },
  { q: "live cam Japan street crossing", countryCode: "JP", note: "日本街" },
  // ── wave 2: 追加都市 ──────────────────────────────────
  { q: "Nagoya live camera Japan", countryCode: "JP", note: "名古屋EN" },
  { q: "Shibuya live camera", countryCode: "JP", note: "渋谷" },
  { q: "Shinjuku live camera", countryCode: "JP", note: "新宿" },
  { q: "Osaka Dotonbori live cam", countryCode: "JP", note: "道頓堀" },
  { q: "Busan live camera", countryCode: "KR", note: "釜山EN" },
  { q: "Incheon live cam", countryCode: "KR", note: "仁川" },
  { q: "Daegu live camera", countryCode: "KR", note: "大邱EN" },
  { q: "Kaohsiung live camera", countryCode: "TW", note: "高雄EN" },
  { q: "Taichung live cam", countryCode: "TW", note: "台中" },
  { q: "Shenzhen live camera", countryCode: "CN", note: "深圳" },
  { q: "Chengdu live cam", countryCode: "CN", note: "成都" },
  { q: "Pattaya live camera", countryCode: "TH", note: "パタヤ" },
  { q: "Krabi live cam", countryCode: "TH", note: "クラビ" },
  { q: "Penang live camera", countryCode: "MY", note: "ペナン" },
  { q: "Yogyakarta live cam", countryCode: "ID", note: "ジョグジャ" },
  { q: "Surabaya live camera", countryCode: "ID", note: "スラバヤ" },
  { q: "Da Nang live cam", countryCode: "VN", note: "ダナン" },
  { q: "Bangalore live camera", countryCode: "IN", note: "バンガロール" },
  { q: "Chennai live cam", countryCode: "IN", note: "チェンナイ" },
  { q: "Jaipur live camera", countryCode: "IN", note: "ジャイプル" },
  { q: "Pokhara live cam", countryCode: "NP", note: "ポカラ" },
  { q: "Doha live camera", countryCode: "QA", note: "ドーハ" },
  { q: "Riyadh live cam", countryCode: "SA", note: "リヤド" },
  { q: "Cappadocia live camera", countryCode: "TR", note: "カッパドキア" },
  { q: "Izmir live cam", countryCode: "TR", note: "イズミル" },
  { q: "Manchester live camera", countryCode: "GB", note: "マンチェスター" },
  { q: "Liverpool live cam", countryCode: "GB", note: "リバプール" },
  { q: "Brighton live camera", countryCode: "GB", note: "ブライトン" },
  { q: "Marseille live cam", countryCode: "FR", note: "マルセイユ" },
  { q: "Bordeaux live camera", countryCode: "FR", note: "ボルドー" },
  { q: "Cologne live cam", countryCode: "DE", note: "ケルン" },
  { q: "Frankfurt live camera", countryCode: "DE", note: "フランクフルト" },
  { q: "Valencia live cam", countryCode: "ES", note: "バレンシア" },
  { q: "Seville live camera", countryCode: "ES", note: "セビリア" },
  { q: "Ibiza live cam", countryCode: "ES", note: "イビサ" },
  { q: "Naples live camera", countryCode: "IT", note: "ナポリEN" },
  { q: "Amalfi live cam", countryCode: "IT", note: "アマルフィ" },
  { q: "Lake Como live camera", countryCode: "IT", note: "コモ湖" },
  { q: "Innsbruck live cam", countryCode: "AT", note: "インスブルック" },
  { q: "Interlaken live camera", countryCode: "CH", note: "インターラーケン" },
  { q: "Zermatt live cam", countryCode: "CH", note: "ツェルマット" },
  { q: "Krakow live camera", countryCode: "PL", note: "クラクフEN" },
  { q: "Gdansk live cam", countryCode: "PL", note: "グダニスク" },
  { q: "Mykonos live camera", countryCode: "GR", note: "ミコノス" },
  { q: "Rhodes live cam", countryCode: "GR", note: "ロードス" },
  { q: "Porto live camera", countryCode: "PT", note: "ポルトEN" },
  { q: "Madeira live cam", countryCode: "PT", note: "マデイラ" },
  { q: "Bergen live camera", countryCode: "NO", note: "ベルゲンEN" },
  { q: "Tromso live cam", countryCode: "NO", note: "トロムソ" },
  { q: "Gothenburg live camera", countryCode: "SE", note: "ヨーテボリ" },
  { q: "Levi Finland live cam", countryCode: "FI", note: "レヴィ" },
  { q: "Bruges live camera", countryCode: "BE", note: "ブルージュ" },
  { q: "Dubrovnik live camera", countryCode: "HR", note: "ドゥブロヴニクEN" },
  { q: "Split Croatia live cam", countryCode: "HR", note: "スプリットEN" },
  { q: "San Diego live camera", countryCode: "US", note: "サンディエゴ" },
  { q: "Phoenix live cam", countryCode: "US", note: "フェニックス" },
  { q: "Nashville live camera", countryCode: "US", note: "ナッシュビル" },
  { q: "Atlanta live cam", countryCode: "US", note: "アトランタ" },
  { q: "Key West live camera", countryCode: "US", note: "キーウェスト" },
  { q: "Myrtle Beach live cam", countryCode: "US", note: "マートルビーチ" },
  { q: "Virginia Beach live camera", countryCode: "US", note: "バージニアビーチ" },
  { q: "Niagara Falls live cam", countryCode: "CA", note: "ナイアガラ" },
  { q: "Calgary live camera", countryCode: "CA", note: "カルガリー" },
  { q: "Quebec City live cam", countryCode: "CA", note: "ケベック" },
  { q: "Cabo San Lucas live camera", countryCode: "MX", note: "カボ" },
  { q: "Puerto Vallarta live cam", countryCode: "MX", note: "バリャルタ" },
  { q: "Florianopolis live camera", countryCode: "BR", note: "フロリアノポリスEN" },
  { q: "Salvador Bahia live cam", countryCode: "BR", note: "サルバドール" },
  { q: "Ushuaia live camera", countryCode: "AR", note: "ウシュアイア" },
  { q: "Valparaiso live cam", countryCode: "CL", note: "バルパライソ" },
  { q: "Cusco live camera", countryCode: "PE", note: "クスコ" },
  { q: "Cartagena Colombia live cam", countryCode: "CO", note: "カルタヘナEN" },
  { q: "Durban live camera", countryCode: "ZA", note: "ダーバン" },
  { q: "Victoria Falls live cam", countryCode: "ZW", note: "ビクトリアフォールズ" },
  { q: "Cairo Nile live camera", countryCode: "EG", note: "カイロナイル" },
  { q: "Brisbane live camera", countryCode: "AU", note: "ブリスベンEN" },
  { q: "Cairns live cam", countryCode: "AU", note: "ケアンズ" },
  { q: "Perth Australia live camera", countryCode: "AU", note: "パースEN" },
  { q: "Hobart live cam", countryCode: "AU", note: "ホバート" },
  { q: "Wellington live camera", countryCode: "NZ", note: "ウェリントン" },
  { q: "Christchurch live cam", countryCode: "NZ", note: "クライストチャーチ" },
  { q: "live cam marina yacht", countryCode: "US", note: "マリーナ2" },
  { q: "live cam pier boardwalk", countryCode: "US", note: "桟橋" },
  { q: "live cam ferry port", countryCode: "US", note: "フェリー港" },
  { q: "live cam mountain summit", countryCode: "US", note: "山頂" },
  { q: "live cam waterfall", countryCode: "US", note: "滝" },
  { q: "live cam lighthouse", countryCode: "US", note: "灯台" },
  { q: "live cam zoo animal", countryCode: "US", note: "動物園" },
  { q: "live cam aquarium fish", countryCode: "US", note: "水族館" },
  { q: "ao vivo praia Rio", countryCode: "BR", note: "リオビーチPT" },
  { q: "webcam live spiaggia Italia", countryCode: "IT", note: "イタリア浜" },
  { q: "webcam live plaza Mexico", countryCode: "MX", note: "メキシコ広場" },
  { q: "canlı yayın kamera Türkiye", countryCode: "TR", note: "トルコTR" },
  { q: "live cam Russia Moscow square", countryCode: "RU", note: "モスクワ" },
  { q: "live cam St Petersburg Russia", countryCode: "RU", note: "ペテルブルク" },
  { q: "live cam Ukraine Kyiv", countryCode: "UA", note: "キーウ" },
  { q: "live cam Romania Bucharest", countryCode: "RO", note: "ブカレストEN" },
  { q: "live cam Bulgaria Sofia", countryCode: "BG", note: "ソフィア" },
  { q: "live cam Serbia Belgrade", countryCode: "RS", note: "ベオグラード" },
  // wave 3
  { q: "Asheville live cam", countryCode: "US", note: "アッシュビル" },
  { q: "Charleston live camera", countryCode: "US", note: "チャールストン" },
  { q: "Savannah live cam", countryCode: "US", note: "サバンナ" },
  { q: "Newport Rhode Island live cam", countryCode: "US", note: "ニューポート" },
  { q: "Bar Harbor live camera", countryCode: "US", note: "バーハーバー" },
  { q: "Jackson Hole live cam", countryCode: "US", note: "JH" },
  { q: "Aspen live camera", countryCode: "US", note: "アスペン" },
  { q: "Park City live cam", countryCode: "US", note: "パークシティ" },
  { q: "Lake Tahoe live camera", countryCode: "US", note: "タホ" },
  { q: "Monterey Bay live cam", countryCode: "US", note: "モントレー" },
  { q: "Santa Barbara live camera", countryCode: "US", note: "サンタバーバラ" },
  { q: "Santa Monica live cam", countryCode: "US", note: "サンタモニカ" },
  { q: "Huntington Beach live camera", countryCode: "US", note: "ハンティントン" },
  { q: "Galveston live cam", countryCode: "US", note: "ガルベストン" },
  { q: "Clearwater Beach live camera", countryCode: "US", note: "クリアウォーター" },
  { q: "Panama City Beach live cam", countryCode: "US", note: "パナマシティビーチ" },
  { q: "Outer Banks live camera", countryCode: "US", note: "アウターバンクス" },
  { q: "Cape Cod live cam", countryCode: "US", note: "ケープコッド" },
  { q: "Mackinac live camera", countryCode: "US", note: "マキナック" },
  { q: "Duluth live cam", countryCode: "US", note: "ダルース" },
  { q: "Juneau live camera", countryCode: "US", note: "ジュノー" },
  { q: "Anchorage live cam", countryCode: "US", note: "アンカレッジ" },
  { q: "Fairbanks live camera", countryCode: "US", note: "フェアバンクス" },
  { q: "Whistler live cam", countryCode: "CA", note: "ウィスラー" },
  { q: "Tofino live camera", countryCode: "CA", note: "トフィーノ" },
  { q: "Halifax live cam", countryCode: "CA", note: "ハリファックス" },
  { q: "St Johns Newfoundland live camera", countryCode: "CA", note: "セントジョンズ" },
  { q: "Acapulco live cam", countryCode: "MX", note: "アカプルコ" },
  { q: "Tulum live camera", countryCode: "MX", note: "トゥルム" },
  { q: "Cozumel live cam", countryCode: "MX", note: "コスメル" },
  { q: "Recife live camera", countryCode: "BR", note: "レシフェ" },
  { q: "Fortaleza live cam", countryCode: "BR", note: "フォルタレザ" },
  { q: "Natal Brazil live camera", countryCode: "BR", note: "ナタル" },
  { q: "Mendoza live cam", countryCode: "AR", note: "メンドーサ" },
  { q: "Bariloche live camera", countryCode: "AR", note: "バリローチェ" },
  { q: "Patagonia live cam", countryCode: "AR", note: "パタゴニア" },
  { q: "Sapporo Odori live camera", countryCode: "JP", note: "大通" },
  { q: "Niseko live cam", countryCode: "JP", note: "ニセコ" },
  { q: "Hakuba live camera", countryCode: "JP", note: "白馬" },
  { q: "Kamakura live cam", countryCode: "JP", note: "鎌倉" },
  { q: "Nikko live camera", countryCode: "JP", note: "日光" },
  { q: "Kanazawa live cam Japan", countryCode: "JP", note: "金沢EN" },
  { q: "Matsumoto live camera", countryCode: "JP", note: "松本" },
  { q: "Takayama live cam", countryCode: "JP", note: "高山" },
  { q: "Beppu live camera", countryCode: "JP", note: "別府" },
  { q: "Ishigaki live cam", countryCode: "JP", note: "石垣" },
  { q: "Jeju live camera Korea", countryCode: "KR", note: "済州EN" },
  { q: "Gangneung live cam", countryCode: "KR", note: "江陵" },
  { q: "Hualien live camera", countryCode: "TW", note: "花蓮" },
  { q: "Kenting live cam", countryCode: "TW", note: "墾丁" },
  { q: "Macau live camera", countryCode: "MO", note: "マカオ" },
  { q: "Chiang Rai live cam", countryCode: "TH", note: "チェンライ" },
  { q: "Hua Hin live camera", countryCode: "TH", note: "フアヒン" },
  { q: "Koh Samui live cam", countryCode: "TH", note: "サムイ" },
  { q: "Langkawi live camera", countryCode: "MY", note: "ランカウイ" },
  { q: "Boracay live cam", countryCode: "PH", note: "ボラカイ" },
  { q: "Palawan live camera", countryCode: "PH", note: "パラワン" },
  { q: "Lombok live cam", countryCode: "ID", note: "ロンボク" },
  { q: "Nha Trang live camera", countryCode: "VN", note: "ニャチャン" },
  { q: "Siem Reap live cam", countryCode: "KH", note: "シェムリアップ" },
  { q: "Vientiane live camera", countryCode: "LA", note: "ビエンチャン" },
  { q: "Yangon live cam", countryCode: "MM", note: "ヤンゴン" },
  { q: "Kandy live camera", countryCode: "LK", note: "キャンディ" },
  { q: "Chitwan live cam", countryCode: "NP", note: "チトワン" },
  { q: "Varanasi live camera", countryCode: "IN", note: "バラナシ" },
  { q: "Udaipur live cam", countryCode: "IN", note: "ウダイプル" },
  { q: "Amritsar live camera", countryCode: "IN", note: "アムリトサル" },
  { q: "Bodrum live cam", countryCode: "TR", note: "ボドルム" },
  { q: "Fes Morocco live camera", countryCode: "MA", note: "フェズ" },
  { q: "Essaouira live cam", countryCode: "MA", note: "エッサウィラ" },
  { q: "Zanzibar live camera", countryCode: "TZ", note: "ザンジバル" },
  { q: "Stone Town live cam", countryCode: "TZ", note: "ストーンタウン" },
  { q: "Kruger live camera", countryCode: "ZA", note: "クルーガー" },
  { q: "Table Mountain live cam", countryCode: "ZA", note: "テーブルマウンテン" },
  { q: "Uluru live camera", countryCode: "AU", note: "ウルル" },
  { q: "Byron Bay live cam", countryCode: "AU", note: "バイロンベイ" },
  { q: "Noosa live camera", countryCode: "AU", note: "ヌーサ" },
  { q: "Bondi Beach live cam", countryCode: "AU", note: "ボンダイ" },
  { q: "Rotorua live camera", countryCode: "NZ", note: "ロトルア" },
  { q: "Milford Sound live cam", countryCode: "NZ", note: "ミルフォード" },
  { q: "live cam fishing pier", countryCode: "US", note: "釣り桟橋" },
  { q: "live cam cruise port", countryCode: "US", note: "クルーズ港" },
  { q: "live cam ski slope", countryCode: "US", note: "ゲレンデ" },
  { q: "live cam cable car", countryCode: "CH", note: "ケーブルカー" },
  { q: "live cam castle europe", countryCode: "DE", note: "城" },
  { q: "live cam cathedral square", countryCode: "IT", note: "大聖堂" },
  { q: "live cam market square", countryCode: "PL", note: "市場広場" },
  { q: "live cam old town europe", countryCode: "CZ", note: "旧市街" },
  { q: "webcam spiaggia Sardegna", countryCode: "IT", note: "サルデーニャ" },
  { q: "webcam costa Brava", countryCode: "ES", note: "コスタブラバ" },
  { q: "webcam Algarve", countryCode: "PT", note: "アルガルヴェ" },
  { q: "webcam Côte d'Azur", countryCode: "FR", note: "コートダジュール" },
  { q: "webcam Nordsee", countryCode: "DE", note: "北海" },
  { q: "webcam Ostsee", countryCode: "DE", note: "バルト海DE" },
  { q: "live cam Arctic", countryCode: "NO", note: "北極圏" },
  { q: "live cam aurora", countryCode: "NO", note: "オーロラ" },
  // wave 4 — 件数稼ぎ
  { q: "live webcam beach florida 24/7", countryCode: "US", note: "FLビーチ2" },
  { q: "live webcam beach california 24/7", countryCode: "US", note: "CAビーチ2" },
  { q: "live webcam beach hawaii 24/7", countryCode: "US", note: "HIビーチ2" },
  { q: "live webcam beach texas", countryCode: "US", note: "TXビーチ" },
  { q: "live webcam beach carolina", countryCode: "US", note: "カロライナビーチ" },
  { q: "live webcam downtown street USA", countryCode: "US", note: "US街" },
  { q: "live webcam traffic cam USA", countryCode: "US", note: "US交通" },
  { q: "live webcam park city USA", countryCode: "US", note: "US公園" },
  { q: "live webcam river bridge", countryCode: "US", note: "川橋" },
  { q: "live webcam lake marina", countryCode: "US", note: "湖マリーナ" },
  { q: "live webcam train station", countryCode: "US", note: "駅" },
  { q: "live webcam airport terminal", countryCode: "US", note: "空港ターミナル" },
  { q: "live webcam seaport", countryCode: "US", note: "海港" },
  { q: "ライブカメラ 交差点 日本", countryCode: "JP", note: "交差点JP" },
  { q: "ライブカメラ 海岸 日本", countryCode: "JP", note: "海岸JP" },
  { q: "ライブカメラ 温泉 日本", countryCode: "JP", note: "温泉JP" },
  { q: "ライブカメラ スキー場 日本", countryCode: "JP", note: "スキーJP" },
  { q: "ライブカメラ 駅前 日本", countryCode: "JP", note: "駅前JP" },
  { q: "ライブカメラ 港 日本", countryCode: "JP", note: "港JP" },
  { q: "ライブカメラ 空港 日本", countryCode: "JP", note: "空港JP" },
  { q: "ライブカメラ 祭り 日本", countryCode: "JP", note: "祭り" },
  { q: "live cam spa japan", countryCode: "JP", note: "スパJP" },
  { q: "live cam shrine temple japan", countryCode: "JP", note: "寺社" },
  { q: "live cam onsen outdoor", countryCode: "JP", note: "露天" },
  { q: "webcam playa México", countryCode: "MX", note: "MX浜" },
  { q: "webcam centro histórico", countryCode: "MX", note: "歴史地区" },
  { q: "câmera ao vivo orla Brasil", countryCode: "BR", note: "BR海岸" },
  { q: "câmera ao vivo centro Brasil", countryCode: "BR", note: "BRセンター" },
  { q: "webcam spiaggia Italia 24h", countryCode: "IT", note: "IT浜2" },
  { q: "webcam piazza Italia live", countryCode: "IT", note: "IT広場2" },
  { q: "webcam plage France 24h", countryCode: "FR", note: "FR浜2" },
  { q: "webcam village France", countryCode: "FR", note: "FR村2" },
  { q: "Webcam Strand Ostsee live", countryCode: "DE", note: "DE浜2" },
  { q: "Webcam Stadt Deutschland", countryCode: "DE", note: "DE街" },
  { q: "webcam playa España 24h", countryCode: "ES", note: "ES浜2" },
  { q: "webcam pueblo España", countryCode: "ES", note: "ES村" },
  { q: "live cam beach Greece", countryCode: "GR", note: "GR浜" },
  { q: "live cam island Greece", countryCode: "GR", note: "GR島" },
  { q: "live cam beach Turkey", countryCode: "TR", note: "TR浜" },
  { q: "live cam beach Thailand", countryCode: "TH", note: "TH浜2" },
  { q: "live cam beach Bali", countryCode: "ID", note: "バリ浜2" },
  { q: "live cam beach Philippines", countryCode: "PH", note: "PH浜" },
  { q: "live cam beach Australia", countryCode: "AU", note: "AU浜2" },
  { q: "live cam beach Portugal", countryCode: "PT", note: "PT浜" },
  { q: "live cam beach Croatia", countryCode: "HR", note: "HR浜" },
  { q: "live cam mountain Switzerland", countryCode: "CH", note: "CH山2" },
  { q: "live cam mountain Austria", countryCode: "AT", note: "AT山" },
  { q: "live cam fjord Norway 24/7", countryCode: "NO", note: "NOフィヨルド2" },
  { q: "live cam canal Amsterdam", countryCode: "NL", note: "運河" },
  { q: "live cam square Prague", countryCode: "CZ", note: "プラハ広場2" },
  { q: "live cam square Krakow", countryCode: "PL", note: "クラクフ広場2" },
  { q: "live cam harbour Sydney", countryCode: "AU", note: "シドニー港2" },
  { q: "live cam harbour Auckland", countryCode: "NZ", note: "オークランド港2" },
  { q: "live cam harbour Vancouver", countryCode: "CA", note: "バンクーバー港2" },
  { q: "live cam harbour Hong Kong", countryCode: "HK", note: "香港港" },
  { q: "live cam harbour Singapore", countryCode: "SG", note: "SG港" },
];



function extractLive(data: unknown): Omit<ScrapeHit, "countryCode" | "query">[] {
  const out: Omit<ScrapeHit, "countryCode" | "query">[] = [];
  const seen = new Set<string>();

  function walk(node: unknown): void {
    if (node === null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    const rec = node as Record<string, unknown>;
    const renderer = rec["videoRenderer"] as Record<string, unknown> | undefined;
    if (renderer !== undefined && typeof renderer["videoId"] === "string") {
      const videoId = renderer["videoId"] as string;
      const blob = JSON.stringify(renderer);
      if (
        blob.includes("LIVE") ||
        blob.includes("BADGE_STYLE_TYPE_LIVE_NOW") ||
        blob.includes("THUMBNAIL_OVERLAY_STYLE_LIVE")
      ) {
        if (!seen.has(videoId)) {
          seen.add(videoId);
          const titleRuns = (renderer["title"] as { runs?: { text?: string }[] } | undefined)?.runs;
          const ownerRuns = (
            renderer["ownerText"] as {
              runs?: {
                text?: string;
                navigationEndpoint?: { browseEndpoint?: { browseId?: string } };
              }[];
            } | undefined
          )?.runs;
          const title = titleRuns?.[0]?.["text"] ?? "";
          const channelTitle = ownerRuns?.[0]?.["text"] ?? "";
          const channelId = ownerRuns?.[0]?.navigationEndpoint?.browseEndpoint?.browseId ?? "";
          if (title !== "" && channelId.startsWith("UC")) {
            out.push({ videoId, title, channelId, channelTitle });
          }
        }
      }
    }
    for (const value of Object.values(rec)) walk(value);
  }

  walk(data);
  return out;
}

async function search(query: Query): Promise<ScrapeHit[]> {
  const url =
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query.q)}` +
    `&hl=en&gl=US&sp=${LIVE_SP}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      headers: { "user-agent": UA, "accept-language": "en-US,en" },
    });
    if (res.status === 429) {
      console.log(`  429 → ${RETRY_WAIT_MS / 1000}s 待機 (attempt ${attempt + 1})`);
      await new Promise((r) => setTimeout(r, RETRY_WAIT_MS * (attempt + 1)));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const match = /var ytInitialData = (\{.*?\});<\/script>/s.exec(html);
    if (match === null) return [];
    return extractLive(JSON.parse(match[1]!)).map((hit) => ({
      ...hit,
      countryCode: query.countryCode,
      query: query.q,
    }));
  }
  throw new Error("HTTP 429 (retries exhausted)");
}

async function main(): Promise<void> {
  await mkdir("scripts/out", { recursive: true });
  const byVideo = new Map<string, ScrapeHit>();
  const doneQueries = new Set<string>();

  try {
    const existing = JSON.parse(await readFile(OUT, "utf8")) as ScrapeHit[];
    for (const hit of existing) {
      byVideo.set(hit.videoId, hit);
      doneQueries.add(hit.query);
    }
    console.log(`再開: 既存 ${byVideo.size} 件 / 済クエリ ${doneQueries.size}`);
  } catch {
    // first run
  }

  const flush = async (): Promise<void> => {
    await writeFile(OUT, JSON.stringify([...byVideo.values()], null, 2) + "\n");
  };

  let index = 0;
  for (const query of CITY_QUERIES) {
    index++;
    if (doneQueries.has(query.q)) {
      console.log(`[${index}/${CITY_QUERIES.length}] ${query.note}: skip (済)`);
      continue;
    }
    try {
      const hits = await search(query);
      let added = 0;
      for (const hit of hits) {
        if (!byVideo.has(hit.videoId)) {
          byVideo.set(hit.videoId, hit);
          added++;
        }
      }
      doneQueries.add(query.q);
      await flush();
      console.log(
        `[${index}/${CITY_QUERIES.length}] ${query.note}: ${hits.length} live / +${added} (total ${byVideo.size})`,
      );
    } catch (error) {
      console.log(`[${index}/${CITY_QUERIES.length}] ${query.note}: ✗ ${String(error)}`);
      await flush();
    }
    if (index < CITY_QUERIES.length) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  await flush();
  console.log(`\n✓ ${byVideo.size} 件 → ${OUT}`);
}

await main();
