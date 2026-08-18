// カメラのある土地の現地時刻。マスタが IANA タイムゾーンを持っているので
// Intl だけで解決でき、追加のネットワークもタイムゾーン DB も要らない。

/** 現地時刻を 24 時間表記("21:00")で返す。 */
export function formatLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/** 現地の「時」(0-23)。 */
export function localHour(date: Date, timeZone: string): number {
  return Number(formatLocalTime(date, timeZone).slice(0, 2));
}

/**
 * その時点の UTC オフセットを "UTC+9" / "UTC-4" / "UTC+5:45" の形で返す。
 *
 * Intl の longOffset は "GMT+05:45" 形式だが、オフセット 0 の地域は
 * "GMT+00:00" ではなく素の "GMT" になる(UTC / Europe/London の冬 /
 * Atlantic/Reykjavik で実測)。なので正規表現に当たらない = UTC ちょうど。
 */
export function utcOffsetLabel(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date);
  // longOffset を指定した formatToParts は必ず timeZoneName を含む。
  const raw = parts.find((p) => p.type === "timeZoneName")!.value;

  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(raw);
  if (match === null) return "UTC";

  const [, sign, hh, mm] = match;
  const hours = Number(hh);
  const minutes = Number(mm);
  return minutes === 0
    ? `UTC${sign}${hours}`
    : `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}
