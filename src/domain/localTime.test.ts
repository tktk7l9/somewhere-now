import { formatLocalTime, localHour, utcOffsetLabel } from "./localTime";

const T = new Date("2026-08-18T12:00:00Z");

describe("formatLocalTime", () => {
  it("returns the local time in 24-hour notation", () => {
    expect(formatLocalTime(T, "Asia/Tokyo")).toBe("21:00");
    expect(formatLocalTime(T, "UTC")).toBe("12:00");
  });

  it("is correct for a time zone across the date line too", () => {
    expect(formatLocalTime(T, "America/Los_Angeles")).toBe("05:00");
  });
});

describe("localHour", () => {
  it("returns the local hour (0-23)", () => {
    expect(localHour(T, "Asia/Tokyo")).toBe(21);
    expect(localHour(T, "UTC")).toBe(12);
  });

  it("returns midnight as 0 (not 24)", () => {
    expect(localHour(new Date("2026-08-18T15:00:00Z"), "Asia/Tokyo")).toBe(0);
  });
});

describe("utcOffsetLabel", () => {
  it("adds + to a positive offset", () => {
    expect(utcOffsetLabel(T, "Asia/Tokyo")).toBe("UTC+9");
  });

  it("adds - to a negative offset", () => {
    expect(utcOffsetLabel(T, "America/New_York")).toBe("UTC-4");
  });

  it("shows exactly UTC without a sign", () => {
    expect(utcOffsetLabel(T, "UTC")).toBe("UTC");
  });

  // The longOffset notation varies by environment (macOS gives "GMT", Linux gives "GMT+00:00").
  // The offset is computed as a number, not from the string, so both give the same answer.
  it("shows a region with offset 0 as UTC too", () => {
    expect(utcOffsetLabel(T, "Atlantic/Reykjavik")).toBe("UTC");
  });

  it("gives the correct offset on the side that crosses the date", () => {
    // 2026-08-18T12:00Z is 00:00 the next day in New Zealand.
    expect(utcOffsetLabel(T, "Pacific/Auckland")).toBe("UTC+12");
  });

  it("rounds a historical offset that is off by seconds to whole minutes", () => {
    expect(utcOffsetLabel(T, "Asia/Tehran")).toMatch(/^UTC\+3(:30)?$/);
  });

  it("shows a 30-minute-step offset down to the minutes", () => {
    expect(utcOffsetLabel(T, "Asia/Kolkata")).toBe("UTC+5:30");
  });

  it("can show a 45-minute-step offset too", () => {
    expect(utcOffsetLabel(T, "Asia/Kathmandu")).toBe("UTC+5:45");
  });
});
