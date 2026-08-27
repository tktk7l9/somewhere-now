// 右パネルの幅。お気に入りと同じく個人のレイアウトなので URL には載せない。
// 地図が潰れて主役が消えないよう、下限と「地図の取り分」をここで決める。

/** 既定。CSS の --panel-w と同じ。 */
export const PANEL_WIDTH_DEFAULT = 384;
export const PANEL_WIDTH_MIN = 280;
export const PANEL_WIDTH_MAX = 640;
/** 平面図/地球儀に必ず残す幅。これより狭くすると地図が読めなくなる。 */
export const PANEL_MAP_MIN = 360;

/**
 * 保存値の読み取り。整数だけを受け、壊れていたら null(呼び出し側が既定に戻す)。
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
 * パネル幅を地図が残る範囲に収める。
 * 窓が極端に狭いときは地図の取り分を優先し、下限を下回っても窓に収める。
 */
export function clampPanelWidth(width: number, viewportWidth: number): number {
  const vw = Number.isFinite(viewportWidth) ? Math.floor(viewportWidth) : 0;
  const maxByMap = Math.max(0, vw - PANEL_MAP_MIN);
  const hi = Math.min(PANEL_WIDTH_MAX, maxByMap);
  const lo = Math.min(PANEL_WIDTH_MIN, hi);
  const raw = Number.isFinite(width) ? Math.round(width) : PANEL_WIDTH_DEFAULT;
  return Math.min(hi, Math.max(lo, raw));
}

/** 保存値(または欠落)から、いまの窓に収まる幅を出す。 */
export function resolvePanelWidth(raw: string | null, viewportWidth: number): number {
  const parsed = parsePanelWidth(raw);
  return clampPanelWidth(parsed ?? PANEL_WIDTH_DEFAULT, viewportWidth);
}
