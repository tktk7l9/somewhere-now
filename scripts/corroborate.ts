// 座標を引き直してよいかの判定。ネットワークには触らない純粋な関数。
//
// ジオコーダは「見つからない」とは滅多に言わない。何かしら返るので、「引けた」を
// 採用条件にすると、当てずっぽうを別の当てずっぽうに替えるだけになる。実測した
// 失敗の型は 4 つ:
//
//   1. 短い一般語が当たる     "New York City" → ケンタッキー州の New
//   2. 一般語が地名として実在  "Beach Camera" → ノースダコタ州の Beach
//   3. 同名の別の土地が当たる  "Alma, WI" → ジョージア州の Alma
//                             "Seoul Namsan" → 全羅北道の Namsan
//   4. 州・道そのものが返る    "札幌…Hokkaido" → 北海道の代表点(札幌から 130km)
//
// 最初は「州名もタイトルに出ていること」を求めたが、それでは
// "福岡空港"(admin1 = 福岡県) や "Cala Fornells"(admin1 = Balearic Islands) の
// ように**正しいのに州を書いていない**タイトルを軒並み落としてしまった。
// なので確認ではなく**矛盾**を見る — タイトルが別の州を名指ししていたら弾く。

/** 米国州。略称も見るのは "…, MI USA" のような書き方があるため。 */
const US_STATES: Record<string, string> = {
  alabama: "al", alaska: "ak", arizona: "az", arkansas: "ar", california: "ca",
  colorado: "co", connecticut: "ct", delaware: "de", florida: "fl", georgia: "ga",
  hawaii: "hi", idaho: "id", illinois: "il", indiana: "in", iowa: "ia",
  kansas: "ks", kentucky: "ky", louisiana: "la", maine: "me", maryland: "md",
  massachusetts: "ma", michigan: "mi", minnesota: "mn", mississippi: "ms",
  missouri: "mo", montana: "mt", nebraska: "ne", nevada: "nv",
  "new hampshire": "nh", "new jersey": "nj", "new mexico": "nm", "new york": "ny",
  "north carolina": "nc", "north dakota": "nd", ohio: "oh", oklahoma: "ok",
  oregon: "or", pennsylvania: "pa", "rhode island": "ri", "south carolina": "sc",
  "south dakota": "sd", tennessee: "tn", texas: "tx", utah: "ut", vermont: "vt",
  virginia: "va", washington: "wa", "west virginia": "wv", wisconsin: "wi",
  wyoming: "wy",
};

/** 韓国の広域自治体。ソウルのカメラが全羅北道へ飛ぶのを止める。 */
const KR_REGIONS = [
  "seoul", "busan", "incheon", "daegu", "daejeon", "gwangju", "ulsan", "sejong",
  "gyeonggi", "gangwon", "chungcheongbuk", "chungcheongnam", "jeollabuk",
  "jeollanam", "gyeongsangbuk", "gyeongsangnam", "jeju",
] as const;

/**
 * 地名として返ってきても場所を絞らない語(英語以外)。
 * "Kabupaten"(県)や "Kota"(市)は行政区分の一般名詞で、ジオコーダは
 * これに対して無関係な土地を返す。
 */
const FOREIGN_ADMIN_WORDS = new Set([
  "kabupaten", "kota", "provinsi", "kecamatan", "desa", "distrito", "ciudad",
  "cidade", "municipio", "município", "comuna", "prefecture", "province",
  "district", "region", "county", "borough", "township", "village", "commune",
]);

/** 日本の都道府県。漢字とローマ字の両方で書かれる。 */
const JP_PREFECTURES = [
  ["北海道", "hokkaido"], ["青森", "aomori"], ["岩手", "iwate"], ["宮城", "miyagi"],
  ["秋田", "akita"], ["山形", "yamagata"], ["福島", "fukushima"], ["茨城", "ibaraki"],
  ["栃木", "tochigi"], ["群馬", "gunma"], ["埼玉", "saitama"], ["千葉", "chiba"],
  ["東京", "tokyo"], ["神奈川", "kanagawa"], ["新潟", "niigata"], ["富山", "toyama"],
  ["石川", "ishikawa"], ["福井", "fukui"], ["山梨", "yamanashi"], ["長野", "nagano"],
  ["岐阜", "gifu"], ["静岡", "shizuoka"], ["愛知", "aichi"], ["三重", "mie"],
  ["滋賀", "shiga"], ["京都", "kyoto"], ["大阪", "osaka"], ["兵庫", "hyogo"],
  ["奈良", "nara"], ["和歌山", "wakayama"], ["鳥取", "tottori"], ["島根", "shimane"],
  ["岡山", "okayama"], ["広島", "hiroshima"], ["山口", "yamaguchi"], ["徳島", "tokushima"],
  ["香川", "kagawa"], ["愛媛", "ehime"], ["高知", "kochi"], ["福岡", "fukuoka"],
  ["佐賀", "saga"], ["長崎", "nagasaki"], ["熊本", "kumamoto"], ["大分", "oita"],
  ["宮崎", "miyazaki"], ["鹿児島", "kagoshima"], ["沖縄", "okinawa"],
] as const;

/**
 * 根拠として認める地名の最小の長さ。
 *
 * ラテン文字は 4 文字以下だと断片が当たってしまう("York" が "New York" に)。
 * 漢字は 1 文字あたりの情報量が違い、3 文字で充分に絞る(御岳山・銀閣寺・
 * 心斎橋)。同じ 5 文字を課すと、日本語のタイトルだけ軒並み落ちる。
 */
const MIN_LATIN_LETTERS = 5;
const MIN_CJK_LETTERS = 2;

function longEnough(name: string): boolean {
  const letters = name.replace(/[^\p{L}]/gu, "");
  const cjk = /[぀-ヿ㐀-鿿가-힯]/.test(letters);
  return letters.length >= (cjk ? MIN_CJK_LETTERS : MIN_LATIN_LETTERS);
}

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** その州・都道府県を指す書き方をすべて挙げる。 */
function aliasesOf(region: string): string[] {
  const r = normalize(region);
  const stripped = r.replace(/\s*(state|prefecture|district|province)$/, "");
  const out = new Set([r, stripped]);

  const abbr = US_STATES[stripped];
  if (abbr !== undefined) out.add(abbr);

  for (const [kanji, romaji] of JP_PREFECTURES) {
    // admin1 は "東京都" "京都府" "福岡県" のように接尾辞つきで来る
    if (stripped.startsWith(kanji) || stripped === romaji) {
      out.add(kanji);
      out.add(romaji);
    }
  }
  return [...out].filter((x) => x.length > 0);
}

/** タイトルがその語を「単語として」含むか。CJK は語境界が無いので素の包含。 */
function mentions(haystack: string, term: string): boolean {
  if (/^[\x20-\x7E]+$/.test(term)) {
    return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(haystack);
  }
  return haystack.includes(term);
}

/**
 * タイトルが、返ってきた州とは**別の**州を名指ししているか。
 *
 * "Alma, WI" に対してジョージア州の Alma が返ったら矛盾。
 * "New York City" に対してペンシルベニア州の Nebo が返ったら矛盾。
 * "福岡・博多駅前" に対して埼玉県の福岡が返ったら矛盾。
 * 州を何も書いていないタイトルは矛盾なし — そこは弾かない。
 */
export function contradictsRegion(admin1: string, title: string, channel = ""): boolean {
  const raw = `${title} ${channel}`;
  const haystack = normalize(raw);
  const own = new Set(aliasesOf(admin1));

  for (const [kanji, romaji] of JP_PREFECTURES) {
    if (own.has(kanji)) continue;
    if (mentions(haystack, kanji) || mentions(haystack, romaji)) return true;
  }
  for (const name of Object.keys(US_STATES)) {
    if (own.has(name)) continue;
    if (mentions(haystack, name)) return true;
  }
  for (const region of KR_REGIONS) {
    if ([...own].some((a) => a.startsWith(region))) continue;
    if (mentions(haystack, region)) return true;
  }

  // 州の略称は「原文で大文字 2 文字の独立した語」のときだけ見る。
  // 小文字まで拾うと in / or / me / la が全部州になってしまう
  // ("Live Camera" の me で Maine が矛盾扱いされる)。
  const codes = new Set(Object.values(US_STATES));
  for (const token of raw.match(/\b[A-Z]{2}\b/g) ?? []) {
    const code = token.toLowerCase();
    if (codes.has(code) && !own.has(code)) return true;
  }
  return false;
}

/**
 * 引き直しを採用してよいか。**すべて満たすときだけ true。**
 *
 * 1. 返ってきた地名が 5 文字以上（断片で当てない）
 * 2. その地名がタイトルに出てくる（先頭の語だけでもよい: "Shibuya City" の Shibuya）
 * 3. その地名が一般語でない（Beach / City / Bay …）
 * 4. 返ってきたのが州・地域そのものではない
 * 5. タイトルが別の州を名指ししていない
 *
 * 判定できないものは false。粗いままの方が、誤った場所よりよい。
 */
export function isCorroborated(
  matchedName: string,
  admin1: string,
  title: string,
  channel = "",
  isGenericWord: (word: string) => boolean = () => false,
): boolean {
  const haystack = normalize(`${title} ${channel}`);
  const place = normalize(matchedName);
  const region = normalize(admin1);

  // 州が分からない結果は採用しない。国の代表点("Philippines" → 国の重心)や
  // 粗すぎる結果がここに来るうえ、州が無いと矛盾の確認そのものができない。
  if (region === "") return false;

  const head = place.split(" ")[0] ?? "";
  const candidate = haystack.includes(place) ? place : haystack.includes(head) ? head : "";
  if (candidate === "") return false;
  if (!longEnough(candidate)) return false;
  if (isGenericWord(candidate) || FOREIGN_ADMIN_WORDS.has(candidate)) return false;
  if (candidate === region) return false;
  if (aliasesOf(region).includes(candidate)) return false;

  // 🔴 州は「矛盾しないこと」では足りない。**タイトルに出ていること**を求める。
  //
  // 一度これを「矛盾が無ければ採用」に緩めたことがある。日本語の
  // "福岡空港"(admin1 = 福岡県)のように、正しいのに州を書いていないタイトルを
  // 拾えるようにするためだった。大きい束では狙いどおり効いたが、**無作為に
  // 30 件抜いて数えたら 17 件が誤り**だった。英語のタイトルは Thermal・Wedge・
  // Trail・Port のような普通の名詞でできていて、そのどれもが同名の町として
  // 実在する。"NYC Live Cam" がオーストラリアへ、"Port Miami" がケンタッキー
  // 州へ、"Jacksonville Beach Pier" がユタ州へ飛んだ。
  //
  // 州が書いてあるタイトルだけを相手にすると採用数は落ちるが、そこでの精度は
  // 実測で 48/48 だった。取りこぼしは粗いまま残るだけで、害は増えない。
  if (!aliasesOf(admin1).some((alias) => mentions(haystack, alias))) return false;

  return !contradictsRegion(admin1, title, channel);
}
