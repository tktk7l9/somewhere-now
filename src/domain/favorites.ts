// The localStorage representation of favorites. The read/write side effects live on the UI side;
// this only holds the string <-> id array conversion (so node tests can verify it completely).

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
  // Do not read a different version. Empty is safer than misreading an old shape as the new one.
  if (v !== SCHEMA_VERSION || !Array.isArray(ids)) return [];

  return ids.filter((id): id is string => typeof id === "string");
}

export function encodeFavorites(ids: readonly string[]): string {
  return JSON.stringify({ v: SCHEMA_VERSION, ids });
}

export function toggleFavorite(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}
