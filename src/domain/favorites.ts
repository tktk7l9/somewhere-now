// お気に入りの localStorage 表現。読み書きの副作用は UI 側に置き、ここは
// 文字列 ⇄ id 配列の変換だけを持つ(だから node のテストで完全に検証できる)。

const SCHEMA_VERSION = 1;

export function decodeFavorites(raw: string | null): string[] {
  if (raw === null) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return [];
  const { v, ids } = parsed as { v?: unknown; ids?: unknown };
  // 版が違うものは読まない。古い形を新しい形として誤読するより空の方が安全。
  if (v !== SCHEMA_VERSION || !Array.isArray(ids)) return [];

  return ids.filter((id): id is string => typeof id === "string");
}

export function encodeFavorites(ids: readonly string[]): string {
  return JSON.stringify({ v: SCHEMA_VERSION, ids });
}

export function toggleFavorite(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}
