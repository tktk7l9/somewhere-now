// 座標を引き直してよいかの判定。ネットワークには触らない純粋な関数。
//
// なぜ厳しくするか: ジオコーダは「見つからない」とは滅多に言わない。何かしら
// 返ってくるので、「引けた」を採用の条件にすると、当てずっぽうを別の
// 当てずっぽうに 替えるだけになる。実測した失敗の型は 3 つ:
//
//   1. 短い一般語が当たる     "New York City" → ケンタッキー州の New
//   2. 同名の別の町が当たる   "Marysville, Michigan" → ノースダコタ州の Michigan 町
//   3. 州・道そのものが返る   "札幌…Hokkaido" → 北海道の代表点(札幌から 130km)
//
// だから「地名がタイトルに出ている」だけでは足りない。州まで一致して、かつ
// 返ってきたのが州そのものでないときだけ動かす。

/** 米国州の略称。タイトルの "…, MI USA" と admin1 "Michigan" を突き合わせる。 */
const US_STATE_ABBR: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY",
};

/** 4 文字以下の断片は根拠にしない("York" が "New York" に当たってしまう)。 */
const MIN_PLACE_LETTERS = 5;

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 引き直しを採用してよいか。**すべて満たすときだけ true。**
 *
 * 1. 返ってきた地名が 5 文字以上（断片で当てない）
 * 2. その地名がタイトルにそのまま出てくる
 * 3. その地名が属する州・地域(admin1)もタイトルに出てくる（略称も可）
 * 4. 返ってきたのが州・地域そのものではない
 *
 * 判定できないものは false。粗いままの方が、誤った場所よりよい。
 */
export function isCorroborated(
  matchedName: string,
  admin1: string,
  title: string,
  channel = "",
): boolean {
  const haystack = normalize(`${title} ${channel}`);
  const place = normalize(matchedName);
  const region = normalize(admin1);

  if (place.replace(/[^\p{L}]/gu, "").length < MIN_PLACE_LETTERS) return false;
  if (!haystack.includes(place)) return false;
  if (region === "") return false;
  // 州そのものが返ったときは、3 の確認が自分自身との照合になって意味を失う。
  if (place === region) return false;
  if (haystack.includes(region)) return true;

  const abbr = US_STATE_ABBR[region];
  return abbr !== undefined && new RegExp(`\\b${abbr.toLowerCase()}\\b`).test(haystack);
}
