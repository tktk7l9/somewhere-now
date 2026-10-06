// Tells apart the stream of a given camera among several cameras that share a channel.
//
// One channel running dozens of live streams is normal (EarthCam has 42), and the titles
// differ only inside the parentheses ("... (Fixed View)" and "... (Fixed View —
// Looking East)"). An implementation that grabs any 1 stream from the channel shows
// New Jersey footage on the Times Square pin.
//
// **Showing nothing is better than showing the wrong footage**. So when it cannot be
// sure it returns null, and the caller treats it as offline.

export interface StreamCandidate {
  id: string;
  title: string;
}

/** Absorbs title variation (full-width, whitespace, kinds of dashes, decorative symbols). */
export function normalizeTitle(title: string): string {
  return title
    .normalize("NFKC")
    .toLowerCase()
    // Decoration that indicates a live stream. It comes and goes.
    .replace(/[🔴🟢⚫️🎥📹▶️●]/gu, " ")
    // Normalize em/en dashes and full-width hyphens to a plain hyphen.
    .replace(/[—–―ー−]/gu, "-")
    .replace(/\s+/gu, " ")
    .trim();
}

function tokens(title: string): Set<string> {
  return new Set(normalizeTitle(title).split(/[^\p{L}\p{N}]+/u).filter((t) => t !== ""));
}

/**
 * Sørensen–Dice coefficient. 0..1.
 * 0 when either is empty (partly to keep 0/0 from becoming NaN, but also because
 * treating "two things with no content matched perfectly" is the more dangerous choice).
 */
function similarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  return (2 * shared) / (a.size + b.size);
}

/**
 * Lower bound for picking up a rewording. Do not jump at anything below it.
 * "(Fixed View)" and "(Fixed View - Looking East)" of Folkston score 0.89, so
 * this line does not mix them up (confirmed on real data).
 */
const MIN_SIMILARITY = 0.9;
/** Margin over 2nd place. When close, give up as "cannot decide between them". */
const MIN_MARGIN = 0.15;

/**
 * The id of the stream that corresponds to titleKey. null when it cannot be told apart.
 * An exact match comes first; only when there is none, pick one similar enough not to be
 * confused with others.
 */
export function matchStream(titleKey: string, candidates: readonly StreamCandidate[]): string | null {
  const target = normalizeTitle(titleKey);

  const exact = candidates.filter((c) => normalizeTitle(c.title) === target);
  // If 2 streams have the same title, it cannot decide which is the target.
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
