// The local time of the place where the camera is. The master data holds IANA time zones, so
// Intl alone resolves it; no extra network request and no time zone DB are needed.
//
// The offset is not "read from the longOffset string"; the wall clock of that place is
// reinterpreted as UTC and the offset comes from subtraction. The longOffset notation varies
// by ICU version: offset 0 is "GMT" on macOS and "GMT+00:00" on Linux (found in CI).
// The hour digits also mix in 24-hour notation depending on the environment unless hourCycle
// is explicit, so both are pinned on the implementation side.

// Specifying hour12 as well makes hourCycle ignored (per spec). To get 0-23 reliably,
// pass hourCycle only.
const FORMAT_OPTIONS = { hourCycle: "h23" } as const;

/** Returns the local time in 24-hour notation ("21:00"). */
export function formatLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...FORMAT_OPTIONS,
  }).format(date);
}

/** The local "hour" (0-23). */
export function localHour(date: Date, timeZone: string): number {
  return Number(formatLocalTime(date, timeZone).slice(0, 2));
}

/** Offset from UTC (minutes). East is positive. */
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

  // Rebuild the wall clock reading of that place as a UTC time, as is.
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

/** Returns the UTC offset at that moment in the form "UTC+9" / "UTC-4" / "UTC+5:45". */
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
