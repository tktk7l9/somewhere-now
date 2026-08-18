// カメラのある土地の現地時刻。マスタが IANA タイムゾーンを持っているので
// Intl だけで解決でき、追加のネットワークもタイムゾーン DB も要らない。
//
// オフセットは「longOffset の文字列を読む」のではなく、その地の壁時計を UTC
// として解釈し直して引き算で求める。longOffset の表記は ICU の版で揺れ、
// オフセット 0 が macOS では "GMT"、Linux では "GMT+00:00" になる(CI で判明)。
// 時刻の桁も hourCycle を明示しないと環境によって 24 時表記が混ざるので、
// どちらも実装側で固定する。

// hour12 を併記すると hourCycle が無視される(仕様)。0-23 を確実に得たいので
// hourCycle だけを渡す。
const FORMAT_OPTIONS = { hourCycle: "h23" } as const;

/** 現地時刻を 24 時間表記("21:00")で返す。 */
export function formatLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...FORMAT_OPTIONS,
  }).format(date);
}

/** 現地の「時」(0-23)。 */
export function localHour(date: Date, timeZone: string): number {
  return Number(formatLocalTime(date, timeZone).slice(0, 2));
}

/** UTC からのずれ(分)。東が正。 */
function offsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...FORMAT_OPTIONS,
  }).formatToParts(date);

  const at = (type: Intl.DateTimeFormatPartTypes): number =>
    Number(parts.find((p) => p.type === type)!.value);

  // その地の壁時計の読みを、そのまま UTC の時刻として組み直す。
  const wallClockAsUtc = Date.UTC(
    at("year"),
    at("month") - 1,
    at("day"),
    at("hour"),
    at("minute"),
    at("second"),
  );
  return Math.round((wallClockAsUtc - date.getTime()) / 60_000);
}

/** その時点の UTC オフセットを "UTC+9" / "UTC-4" / "UTC+5:45" の形で返す。 */
export function utcOffsetLabel(date: Date, timeZone: string): string {
  const total = offsetMinutes(date, timeZone);
  if (total === 0) return "UTC";

  const sign = total > 0 ? "+" : "-";
  const absolute = Math.abs(total);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;
  return minutes === 0
    ? `UTC${sign}${hours}`
    : `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}
