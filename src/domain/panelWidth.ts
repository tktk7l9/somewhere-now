// Width of the right panel. Like favorites it is a personal layout, so it is not put in the URL.
// The minimum and the "map's share" are decided here so the map is not crushed and the lead role
// lost.

/** Default. Same as --panel-w in CSS. */
export const PANEL_WIDTH_DEFAULT = 384;
export const PANEL_WIDTH_MIN = 280;
export const PANEL_WIDTH_MAX = 640;
/** Width always left for the flat map / globe. Narrower than this and the map becomes unreadable. */
export const PANEL_MAP_MIN = 360;

/**
 * Reads the saved value. Accepts integers only; null when broken (the caller falls back to the
 * default).
 */
export function parsePanelWidth(raw: string | null): number | null {
  if (raw === null || raw === "") return null;
  if (!/^-?\d+$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function encodePanelWidth(width: number): string {
  return String(Math.round(width));
}

/**
 * Clamps the panel width to a range that leaves the map. When the window is extremely narrow, the
 * map's share wins and it fits the window even below the minimum.
 */
export function clampPanelWidth(width: number, viewportWidth: number): number {
  const vw = Number.isFinite(viewportWidth) ? Math.floor(viewportWidth) : 0;
  const maxByMap = Math.max(0, vw - PANEL_MAP_MIN);
  const hi = Math.min(PANEL_WIDTH_MAX, maxByMap);
  const lo = Math.min(PANEL_WIDTH_MIN, hi);
  const raw = Number.isFinite(width) ? Math.round(width) : PANEL_WIDTH_DEFAULT;
  return Math.min(hi, Math.max(lo, raw));
}

/** From the saved value (or its absence), gives the width that fits the current window. */
export function resolvePanelWidth(raw: string | null, viewportWidth: number): number {
  const parsed = parsePanelWidth(raw);
  return clampPanelWidth(parsed ?? PANEL_WIDTH_DEFAULT, viewportWidth);
}
