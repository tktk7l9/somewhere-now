// チャンネルを共有する複数カメラの中から、そのカメラの配信を見分ける。
//
// 1 つのチャンネルが何十本もライブを出しているのが普通で(EarthCam は 42 本)、
// しかもタイトルは括弧の中だけが違う("... (Fixed View)" と "... (Fixed View —
// Looking East)")。チャンネルから適当に 1 本取ってくる実装だと、タイムズ
// スクエアのピンにニュージャージーの映像を出す。
//
// **間違った映像を出すくらいなら、映さない方がよい**。だから確信が持てない
// ときは null を返し、呼び出し側は offline として扱う。

export interface StreamCandidate {
  id: string;
  title: string;
}

/** タイトルの揺れ(全角・空白・ダッシュの種類・装飾記号)を吸収する。 */
export function normalizeTitle(title: string): string {
  return title
    .normalize("NFKC")
    .toLowerCase()
    // 配信であることを示す装飾。付いたり消えたりする。
    .replace(/[🔴🟢⚫️🎥📹▶️●]/gu, " ")
    // em/en ダッシュ・全角ハイフンを素のハイフンに揃える。
    .replace(/[—–―ー−]/gu, "-")
    .replace(/\s+/gu, " ")
    .trim();
}

function tokens(title: string): Set<string> {
  return new Set(normalizeTitle(title).split(/[^\p{L}\p{N}]+/u).filter((t) => t !== ""));
}

/**
 * Sørensen–Dice 係数。0..1。
 * どちらかが空なら 0 にする(0/0 を NaN にしないためでもあるが、
 * 「中身の無いもの同士が完全に一致した」と扱う方が危ういので)。
 */
function similarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  return (2 * shared) / (a.size + b.size);
}

/**
 * 言い換えを拾う下限。これを下回るものには飛びつかない。
 * Folkston の "(Fixed View)" と "(Fixed View - Looking East)" は 0.89 なので、
 * この線なら取り違えない(実データで確認済み)。
 */
const MIN_SIMILARITY = 0.9;
/** 2 位との差。僅差なら「どちらとも決められない」として諦める。 */
const MIN_MARGIN = 0.15;

/**
 * titleKey に対応する配信の id。見分けがつかなければ null。
 * 完全一致が最優先で、無い場合だけ、他と紛れないほど似ているものを拾う。
 */
export function matchStream(titleKey: string, candidates: readonly StreamCandidate[]): string | null {
  const target = normalizeTitle(titleKey);

  const exact = candidates.filter((c) => normalizeTitle(c.title) === target);
  // 同じタイトルが 2 本あるなら、どちらが目当てか決められない。
  if (exact.length === 1) return exact[0]!.id;
  if (exact.length > 1) return null;

  const targetTokens = tokens(titleKey);
  const scored = candidates
    .map((c) => ({ id: c.id, score: similarity(targetTokens, tokens(c.title)) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (best === undefined || best.score < MIN_SIMILARITY) return null;

  const runnerUp = scored[1];
  if (runnerUp !== undefined && best.score - runnerUp.score < MIN_MARGIN) return null;

  return best.id;
}
