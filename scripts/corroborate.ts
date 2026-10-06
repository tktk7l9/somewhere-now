// Decides whether coordinates may be re-geocoded. Pure functions that do not touch the network.
//
// A geocoder rarely says "not found". Something always comes back, so making "it resolved"
// the acceptance condition only swaps one guess for another guess. There are 4 measured
// failure types:
//
//   1. A short generic word hits             "New York City" → New in Kentucky
//   2. A generic word exists as a place name "Beach Camera" → Beach in North Dakota
//   3. Another place of the same name hits   "Alma, WI" → Alma in Georgia
//                                            "Seoul Namsan" → Namsan in Jeollabuk-do
//   4. The state / prefecture itself returns "札幌…Hokkaido" (Sapporo) → the representative
//                                            point of Hokkaido (130km from Sapporo)
//
// At first "the state name must also appear in the title" was required, but that dropped
// title after title that was **correct but did not write the state**, such as
// "福岡空港" (Fukuoka Airport, admin1 = 福岡県) or "Cala Fornells" (admin1 = Balearic Islands).
// So it looks at **contradiction** rather than confirmation — reject when the title names
// a different state.

/** US states. Abbreviations are checked too because of notations like "…, MI USA". */
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

/** Korean first-level regions. Stops a Seoul camera from jumping to Jeollabuk-do. */
const KR_REGIONS = [
  "seoul", "busan", "incheon", "daegu", "daejeon", "gwangju", "ulsan", "sejong",
  "gyeonggi", "gangwon", "chungcheongbuk", "chungcheongnam", "jeollabuk",
  "jeollanam", "gyeongsangbuk", "gyeongsangnam", "jeju",
] as const;

/**
 * Words that do not narrow the place even when returned as a place name (non-English).
 * "Kabupaten" (regency) and "Kota" (city) are generic nouns for administrative divisions,
 * and the geocoder returns unrelated places for them.
 */
const FOREIGN_ADMIN_WORDS = new Set([
  "kabupaten", "kota", "provinsi", "kecamatan", "desa", "distrito", "ciudad",
  "cidade", "municipio", "município", "comuna", "prefecture", "province",
  "district", "region", "county", "borough", "township", "village", "commune",
]);

/** Japanese prefectures. Written in both kanji and romaji. */
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
 * Minimum length of a place name accepted as evidence.
 *
 * With Latin letters, 4 letters or fewer lets fragments hit ("York" against "New York").
 * Kanji carry a different amount of information per character, and 3 characters narrow
 * enough ("御岳山", "銀閣寺", "心斎橋"). Imposing the same 5 letters drops Japanese titles
 * across the board.
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

/** Lists every notation that refers to that state / prefecture. */
function aliasesOf(region: string): string[] {
  const r = normalize(region);
  const stripped = r.replace(/\s*(state|prefecture|district|province)$/, "");
  const out = new Set([r, stripped]);

  const abbr = US_STATES[stripped];
  if (abbr !== undefined) out.add(abbr);

  for (const [kanji, romaji] of JP_PREFECTURES) {
    // admin1 arrives with a suffix, like "東京都" "京都府" "福岡県"
    if (stripped.startsWith(kanji) || stripped === romaji) {
      out.add(kanji);
      out.add(romaji);
    }
  }
  return [...out].filter((x) => x.length > 0);
}

/** Whether the title contains the term "as a word". CJK has no word boundaries, so plain inclusion. */
function mentions(haystack: string, term: string): boolean {
  if (/^[\x20-\x7E]+$/.test(term)) {
    return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(haystack);
  }
  return haystack.includes(term);
}

/**
 * Whether the title names a state **different** from the returned one.
 *
 * Alma in Georgia returned for "Alma, WI" is a contradiction.
 * Nebo in Pennsylvania returned for "New York City" is a contradiction.
 * Fukuoka in Saitama Prefecture returned for "福岡・博多駅前" is a contradiction.
 * A title that writes no state has no contradiction — it is not rejected.
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

  // State abbreviations are checked only when they are "a standalone word of 2 uppercase
  // letters in the original text". Picking up lowercase too turns in / or / me / la all
  // into states (the me in "Live Camera" makes Maine count as a contradiction).
  const codes = new Set(Object.values(US_STATES));
  for (const token of raw.match(/\b[A-Z]{2}\b/g) ?? []) {
    const code = token.toLowerCase();
    if (codes.has(code) && !own.has(code)) return true;
  }
  return false;
}

/**
 * Whether the re-geocoding may be adopted. **true only when all are satisfied.**
 *
 * 1. The returned place name has 5 or more letters (do not match on fragments)
 * 2. That place name appears in the title (the first word alone is fine: Shibuya of "Shibuya City")
 * 3. That place name is not a generic word (Beach / City / Bay …)
 * 4. What was returned is not the state / region itself
 * 5. The title does not name a different state
 *
 * Anything that cannot be judged is false. Staying coarse is better than a wrong place.
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

  // Results with an unknown state are not adopted. Country representative points
  // ("Philippines" → the country's centroid) and overly coarse results arrive here, and
  // without a state the contradiction check itself is impossible.
  if (region === "") return false;

  const head = place.split(" ")[0] ?? "";
  const candidate = haystack.includes(place) ? place : haystack.includes(head) ? head : "";
  if (candidate === "") return false;
  if (!longEnough(candidate)) return false;
  if (isGenericWord(candidate) || FOREIGN_ADMIN_WORDS.has(candidate)) return false;
  if (candidate === region) return false;
  if (aliasesOf(region).includes(candidate)) return false;

  // 🔴 For the state, "not contradicting" is not enough. **Appearing in the title** is required.
  //
  // This was once relaxed to "adopt if there is no contradiction". The aim was to pick up
  // titles that are correct but do not write the state, like the Japanese
  // "福岡空港" (admin1 = 福岡県). It worked as intended on the large piles, but **when
  // 30 were drawn at random and counted, 17 were wrong**. English titles are made of
  // ordinary nouns like Thermal, Wedge, Trail and Port, and every one of them exists as a
  // town of the same name. "NYC Live Cam" jumped to Australia, "Port Miami" to Kentucky,
  // and "Jacksonville Beach Pier" to Utah.
  //
  // Dealing only with titles that write the state lowers the number adopted, but the
  // measured accuracy there was 48/48. What is missed just stays coarse; harm does not grow.
  if (!aliasesOf(admin1).some((alias) => mentions(haystack, alias))) return false;

  return !contradictsRegion(admin1, title, channel);
}
