// Building the queries sent to the geocoder. Does not touch the network.
//
// If this breaks, "the position of the pins on the map" breaks quietly. It actually was
// broken, and 3,394 of 5,720 cameras (59%) were piled up on piles sharing the same coordinates.
// All cases below were taken from that real data.

import { guessPlaceQueries, hitNamesTheQuery, prioritizeGeocodeQueries } from "./import-bulk-cams.ts";

const top = (title: string, channel = "", cc: string | null = "US"): string =>
  prioritizeGeocodeQueries(guessPlaceQueries(title, channel, cc))[0]?.name ?? "";

const names = (title: string, channel = "", cc: string | null = "US"): string[] =>
  prioritizeGeocodeQueries(guessPlaceQueries(title, channel, cc)).map((q) => q.name);

describe("does not query fragments that cannot be a place name", () => {
  it("drops anything starting with a digit (resolution, year, date)", () => {
    const got = names("2026 Times Square 4K 2160p 8/26 360 24H");
    expect(got).not.toContain("2026");
    expect(got).not.toContain("2160p");
    expect(got).not.toContain("8/26");
    expect(got).not.toContain("360");
    expect(got).not.toContain("24H");
  });

  it("drops earthquake alert fragments and model numbers", () => {
    const got = names("M7.5 Earthquake I-35 2MP PTZ");
    for (const junk of ["M7.5", "I-35", "2MP"]) expect(got).not.toContain(junk);
  });

  it("drops leftovers of brackets and punctuation", () => {
    const got = names("[4K] Osaka (SP) Now: Park, .NL RE-");
    for (const junk of ["[4K]", "(SP)", "Now:", "Park,", ".NL", "RE-"]) {
      expect(got).not.toContain(junk);
    }
  });

  it("does not query anything that contains no letter", () => {
    for (const q of names("--- 24/7 ///")) expect(q).toMatch(/[\p{L}]/u);
  });
});

describe("the query that comes first", () => {
  // 🔴 Regression from real data: with these 2 cases, 54 cameras were piled up in
  // entirely different places.
  it("New York is looked up by the place name, not New (Kentucky)", () => {
    expect(top("New York City LIVE Manhattan")).not.toBe("New");
    expect(names("New York City LIVE Manhattan")).toContain("New York City Manhattan");
  });

  it("Beach Cam is looked up by the place name, not Beach (North Dakota)", () => {
    expect(top("Beach Cam (Solglimt B & B)", "Solglimt")).not.toBe("Beach");
  });

  it("tries the one with more words first (word count is what narrows the place)", () => {
    const got = names("Ocean City Maryland Boardwalk");
    const single = got.findIndex((n) => !n.includes(" "));
    const multi = got.findIndex((n) => n.includes(" "));
    expect(multi).toBeGreaterThanOrEqual(0);
    expect(multi).toBeLessThan(single === -1 ? Number.POSITIVE_INFINITY : single);
  });

  it("with only 1 word the longer comes first (does not lose to a short generic word)", () => {
    const got = names("Manhattan New");
    expect(got.indexOf("Manhattan")).toBeLessThan(got.indexOf("New"));
  });

  it("generic words are not discarded but moved to the very end (last resort when the others miss)", () => {
    const got = names("Beach");
    expect(got).toContain("Beach");
    expect(got[got.length - 1]).toBe("Beach");
  });

  it("city aliases still work as before", () => {
    expect(names("渋谷スクランブル交差点 ライブカメラ", "", "JP")).toContain("Tokyo");
  });
});

describe("a prefix hit from the geocoder is not a resolution", () => {
  // 🔴 Regression from real data: Open-Meteo answers "Big Delta, Alaska" for the query
  // `Big`. Every specific query of these titles misses (state parks, airports and
  // volcanoes are not populated places), the generic last-resort word is sent, and all
  // of them ended up on the same pin in Alaska.
  const piledInBigDelta: [string, string][] = [
    ["Big Bog State Recreation Area Web Cam", "Minnesota Department of Natural Resources"],
    [
      "🔴LIVE CHASING BIG PLANES at CHICAGO O'HARE AIRPORT | SIGHTS & SOUNDS of PURE AVIATION |AVGEEK PLANES",
      "CHICAGO FLIGHTS",
    ],
    [
      "🔴 LIVE: Big Island Hawaiʻi Webcam Tour 🌋 Kīlauea Volcano, Kohala Coast, Kona & Mauna Kea | NOW!",
      "AlohaLiveCam",
    ],
    ["🔴4K - 24/7 BIG Waves - Tahiti And Hawaii -  ASMR With Relaxing Music☑️🔴", "Waves of the World"],
  ];

  it.each(piledInBigDelta)("rejects Big Delta for the query Big (%s)", (title, channel) => {
    const big = names(title, channel).find((n) => n.toLowerCase() === "big");
    expect(big).toBeDefined();
    expect(hitNamesTheQuery("Big Delta", big!, title, channel)).toBe(false);
  });

  it("rejects any other prefix match (Web → Webster, Area → Arcadia)", () => {
    const title = "Big Bog State Recreation Area Web Cam";
    expect(hitNamesTheQuery("Webster", "Web", title)).toBe(false);
    expect(hitNamesTheQuery("Arcadia", "Area", title)).toBe(false);
  });

  it("accepts the full name of the query, ignoring case", () => {
    expect(hitNamesTheQuery("Chicago", "CHICAGO", "LIVE CHASING BIG PLANES at CHICAGO O'HARE")).toBe(true);
    expect(hitNamesTheQuery("Manhattan", "Manhattan", "New York City LIVE Manhattan")).toBe(true);
  });

  it("accepts a name that appears in the title or channel as whole words", () => {
    expect(hitNamesTheQuery("Chicago", "CHICAGO O'HARE AIRPORT", "Big planes at Chicago O'Hare")).toBe(true);
    expect(hitNamesTheQuery("Big Bear Lake", "Big Bear Bald Eagle Nest", "Nest cam", "Big Bear Lake FOBBV")).toBe(true);
    // "Delta" is a whole word of the hit, not of the title
    expect(hitNamesTheQuery("Big Delta", "Big Bear Bald Eagle Nest", "Big Bear Bald Eagle Nest")).toBe(false);
  });

  it("compares without diacritics and the ʻokina", () => {
    expect(hitNamesTheQuery("Hawaii", "Hawaiʻi", "Big Island Hawaiʻi Webcam Tour")).toBe(true);
    expect(hitNamesTheQuery("Kilauea", "Kīlauea", "Kīlauea Volcano")).toBe(true);
  });

  it("lets a city alias through even when the title is not in English", () => {
    expect(hitNamesTheQuery("Tokyo", "Tokyo", "渋谷スクランブル交差点 ライブカメラ")).toBe(true);
    expect(hitNamesTheQuery("心斎橋", "心斎橋", "大阪・心斎橋 ライブカメラ")).toBe(true);
    expect(hitNamesTheQuery("大阪市", "心斎橋", "大阪・心斎橋 ライブカメラ")).toBe(false);
  });

  it("rejects an empty name", () => {
    expect(hitNamesTheQuery("", "Big", "Big Bog")).toBe(false);
  });
});
