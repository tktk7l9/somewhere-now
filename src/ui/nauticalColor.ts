/** 平面図 `.leaflet-tile-pane` と同じ CSS フィルタ。地球儀のラスタにも使う。 */
export const NAUTICAL_FILTER =
  "invert(1) hue-rotate(180deg) brightness(0.78) contrast(1.05) saturate(0.75)";

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

const HEX = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const RGB = /^rgba?\(\s*([^\)]+)\s*\)$/i;
const HSL = /^hsla?\(\s*([^\)]+)\s*\)$/i;

function clampByte(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function hexByte(text: string): number {
  return Number.parseInt(text, 16);
}

function parseChannel(token: string, scale: number): number | null {
  const trimmed = token.trim();
  if (trimmed.endsWith("%")) {
    const pct = Number.parseFloat(trimmed.slice(0, -1));
    if (!Number.isFinite(pct)) return null;
    return (pct / 100) * scale;
  }
  const n = Number.parseFloat(trimmed);
  return Number.isFinite(n) ? n : null;
}

function splitCssArgs(inner: string): string[] {
  return inner.split(/[, \/]+/).filter((part) => part.length > 0);
}

function hueToRgb(p: number, q: number, t: number): number {
  let wrapped = t;
  if (wrapped < 0) wrapped += 1;
  if (wrapped > 1) wrapped -= 1;
  if (wrapped < 1 / 6) return p + (q - p) * 6 * wrapped;
  if (wrapped < 1 / 2) return q;
  if (wrapped < 2 / 3) return p + (q - p) * (2 / 3 - wrapped) * 6;
  return p;
}

function hslToRgb(hDeg: number, sPct: number, lPct: number): { r: number; g: number; b: number } {
  const h = ((hDeg % 360) + 360) % 360 / 360;
  const s = Math.min(1, Math.max(0, sPct / 100));
  const l = Math.min(1, Math.max(0, lPct / 100));
  if (s === 0) {
    const gray = l * 255;
    return { r: gray, g: gray, b: gray };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: hueToRgb(p, q, h + 1 / 3) * 255,
    g: hueToRgb(p, q, h) * 255,
    b: hueToRgb(p, q, h - 1 / 3) * 255,
  };
}

export function parseCssColor(input: string): Rgba | null {
  const raw = input.trim();
  const lower = raw.toLowerCase();
  if (lower === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  if (lower === "black") return { r: 0, g: 0, b: 0, a: 1 };
  if (lower === "white") return { r: 255, g: 255, b: 255, a: 1 };

  const hex = HEX.exec(raw);
  if (hex) {
    const body = hex[1]!;
    if (body.length === 3 || body.length === 4) {
      const r = hexByte(body[0]! + body[0]!);
      const g = hexByte(body[1]! + body[1]!);
      const b = hexByte(body[2]! + body[2]!);
      const a = body.length === 4 ? hexByte(body[3]! + body[3]!) / 255 : 1;
      return { r, g, b, a };
    }
    const r = hexByte(body.slice(0, 2));
    const g = hexByte(body.slice(2, 4));
    const b = hexByte(body.slice(4, 6));
    const a = body.length === 8 ? hexByte(body.slice(6, 8)) / 255 : 1;
    return { r, g, b, a };
  }

  const rgb = RGB.exec(raw);
  if (rgb) {
    const parts = splitCssArgs(rgb[1]!);
    if (parts.length < 3) return null;
    const r = parseChannel(parts[0]!, 255);
    const g = parseChannel(parts[1]!, 255);
    const b = parseChannel(parts[2]!, 255);
    const a = parts[3] === undefined ? 1 : parseChannel(parts[3], 1);
    if (r === null || g === null || b === null || a === null) return null;
    return { r, g, b, a };
  }

  const hsl = HSL.exec(raw);
  if (hsl) {
    const parts = splitCssArgs(hsl[1]!.replace(/deg/gi, ""));
    if (parts.length < 3) return null;
    const h = Number.parseFloat(parts[0]!);
    const s = Number.parseFloat(parts[1]!);
    const l = Number.parseFloat(parts[2]!);
    const a = parts[3] === undefined ? 1 : parseChannel(parts[3], 1);
    if (![h, s, l].every(Number.isFinite) || a === null) return null;
    const rgbVal = hslToRgb(h, s, l);
    return { ...rgbVal, a };
  }

  return null;
}

function hueRotate(r: number, g: number, b: number, deg: number): [number, number, number] {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [
    (0.213 + cos * 0.787 - sin * 0.213) * r +
      (0.715 - cos * 0.715 - sin * 0.715) * g +
      (0.072 - cos * 0.072 + sin * 0.928) * b,
    (0.213 - cos * 0.213 + sin * 0.143) * r +
      (0.715 + cos * 0.285 + sin * 0.140) * g +
      (0.072 - cos * 0.072 - sin * 0.283) * b,
    (0.213 - cos * 0.213 - sin * 0.787) * r +
      (0.715 - cos * 0.715 + sin * 0.715) * g +
      (0.072 + cos * 0.928 + sin * 0.072) * b,
  ];
}

function saturate(r: number, g: number, b: number, amount: number): [number, number, number] {
  return [
    (0.213 + 0.787 * amount) * r + (0.715 - 0.715 * amount) * g + (0.072 - 0.072 * amount) * b,
    (0.213 - 0.213 * amount) * r + (0.715 + 0.285 * amount) * g + (0.072 - 0.072 * amount) * b,
    (0.213 - 0.213 * amount) * r + (0.715 - 0.715 * amount) * g + (0.072 + 0.928 * amount) * b,
  ];
}

/** 平面図と同じ invert → hue-rotate → brightness → contrast → saturate。 */
export function nauticalizeRgb(r: number, g: number, b: number): [number, number, number] {
  let nr = 255 - r;
  let ng = 255 - g;
  let nb = 255 - b;
  [nr, ng, nb] = hueRotate(nr, ng, nb, 180);
  nr *= 0.78;
  ng *= 0.78;
  nb *= 0.78;
  const intercept = 255 * (0.5 - 0.5 * 1.05);
  nr = nr * 1.05 + intercept;
  ng = ng * 1.05 + intercept;
  nb = nb * 1.05 + intercept;
  [nr, ng, nb] = saturate(nr, ng, nb, 0.75);
  return [clampByte(nr), clampByte(ng), clampByte(nb)];
}

export function formatCssColor(color: Rgba): string {
  const r = clampByte(color.r);
  const g = clampByte(color.g);
  const b = clampByte(color.b);
  if (color.a >= 1) return `rgb(${r}, ${g}, ${b})`;
  const a = Math.round(color.a * 1000) / 1000;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function nauticalizeCssColor(input: string): string {
  const parsed = parseCssColor(input);
  if (parsed === null) return input;
  if (parsed.a === 0) return formatCssColor({ r: 0, g: 0, b: 0, a: 0 });
  const [r, g, b] = nauticalizeRgb(parsed.r, parsed.g, parsed.b);
  return formatCssColor({ r, g, b, a: parsed.a });
}

export function walkCssColors(value: unknown): unknown {
  if (typeof value === "string") return nauticalizeCssColor(value);
  if (Array.isArray(value)) return value.map(walkCssColors);
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) out[key] = walkCssColors(child);
    return out;
  }
  return value;
}
