// The gatekeeper for whether coordinates may be moved. If it loosens, map pins quietly lie;
// if it is too strict, even correct re-geocodings are thrown away. All cases below were taken
// from real data that actually caused wrong re-geocodings or misses.

import { contradictsRegion, isCorroborated } from "./corroborate.ts";
import { isGenericPlaceWord } from "./import-bulk-cams.ts";

const ok = (place: string, admin1: string, title: string, channel = ""): boolean =>
  isCorroborated(place, admin1, title, channel, isGenericPlaceWord);

describe("adopts", () => {
  it("both the place name and the state appear in the title", () => {
    expect(ok("Greeley", "Colorado", "Greeley, Colorado, USA | LIVE Train Camera")).toBe(true);
  });

  it("a kanji place name is evidence even with 3 characters (Latin letters need 5)", () => {
    expect(ok("歌舞伎町", "東京都", "東京 新宿 歌舞伎町 ライブカメラ")).toBe(true);
  });

  it("it is enough that the first word of the place name appears in the title", () => {
    // The geocoder returns "Shibuya City", but the title only writes "Shibuya"
    expect(ok("Shibuya City", "Tokyo", "いまの渋谷・スクランブル交差点 Shibuya Scramble Crossing - Tokyo")).toBe(true);
  });

  it("passes for Japanese titles too", () => {
    expect(ok("Kabukicho", "Tokyo", "東京 新宿 歌舞伎町 Tokyo Shinjuku Kabukicho Live")).toBe(true);
  });
});

describe("does not adopt", () => {
  it("does not treat a fragment of 4 letters or fewer as evidence", () => {
    expect(ok("York", "Pennsylvania", "New York City LIVE Manhattan")).toBe(false);
  });

  it("does not adopt a generic word even if it exists as a place name", () => {
    expect(ok("Beach", "North Dakota", "Beach Camera")).toBe(false);
    expect(ok("City", "Michigan", "City of Alma Live Railcam")).toBe(false);
  });

  // 🔴 Measured: jumped 1,900km / 1,000km
  it("rejects when the title names a different state", () => {
    expect(ok("Michigan", "North Dakota", "Marysville, Michigan USA | StreamTime LIVE")).toBe(false);
    expect(ok("Bangor", "Maine", "City of Bangor MI - Downtown Live Stream")).toBe(false);
    expect(ok("Alma", "Georgia", "City of Alma Live Railcam - Alma, WI #steelhighway")).toBe(false);
    expect(ok("Nebo", "Pennsylvania", "New York City 4K Drone Video | Manhattan")).toBe(false);
    expect(ok("福岡", "埼玉県", "【LIVE】福岡・博多駅前ライブカメラ Hakata station in Fukuoka")).toBe(false);
  });

  // 🔴 Measured: a camera correctly in Sapporo moved 130km to the representative point of Hokkaido
  it("does not adopt when the state / prefecture itself is returned", () => {
    expect(ok("Hokkaido", "Hokkaido", "いまの札幌 ライブカメラ Sapporo, Hokkaido")).toBe(false);
    expect(ok("東京", "東京都", "夜の銀座を散歩 Japan Tokyo 4K walking tour/Ginza")).toBe(false);
  });

  it("does not adopt when the place name does not appear in the title", () => {
    expect(ok("Ness City", "Kansas", "City of Stuart, Iowa Live Railcam")).toBe(false);
  });

  // 🔴 Measured: relaxing the state check to "not contradicting" made 17 of 30 random
  // samples wrong. English titles are made of ordinary nouns, many of which exist as
  // towns of the same name.
  it("does not adopt when the state does not appear in the title", () => {
    expect(ok("Thermal", "California", "Thermal camera Video in Day - SCT 320")).toBe(false);
    expect(ok("Trail", "Oregon", "The BEST Trail Camera Video You'll Ever Watch")).toBe(false);
    expect(ok("Wedge", "Utah", "The Wedge – 24/7 Insane Surf Chaos Stream")).toBe(false);
  });
});

describe("what this gatekeeper cannot detect in principle", () => {
  /**
   * Same-name places within the same state cannot be distinguished. A town called Kilauea
   * really exists on Kauai and does not contradict "Hawaii" in the title, so the camera of
   * Kilauea volcano (Hawaii Island) moves 250km there. **The title string alone gives no
   * basis for judging.**
   *
   * Closing this gap needs external corroboration such as cross-checking with another geocoder.
   * For now it is recorded that "it can be moved but is not necessarily correct".
   */
  it("lets through a same-name place within the same state", () => {
    expect(ok("Kilauea", "Hawaii", "Live Now: 24/7 Kilauea Volcano Livestream in Hawaii")).toBe(true);
  });

  // 🔴 Measured: the country's centroid was returned and 3 cameras were nearly adopted
  it("does not adopt a result with an unknown state (a country representative point arrives)", () => {
    expect(ok("Philippines", "", "PHILIPPINES Live camera Restaurant Server")).toBe(false);
    expect(ok("Japan", "", "Japan City Pop | Jpop Playlist")).toBe(false);
  });

  // 🔴 Measured: Kabupaten (regency) is a generic noun for an administrative division.
  // A town in West Kalimantan went to West Java
  it("does not treat a generic noun for an administrative division as a place name", () => {
    expect(ok("Kabupaten", "West Java", "[LIVE CCTV] SIMPANG SAMSAT KABUPATEN KETAPANG")).toBe(false);
  });

  // 🔴 Measured: Namsan Tower in Seoul went to Jeollabuk-do
  it("also rejects a mismatch of Korean first-level regions", () => {
    expect(ok("Namsan", "Jeollabuk-do", "Seoul Namsan 4K LIVE | Namsan Tower | 서울")).toBe(false);
    expect(ok("Seongsu", "Jeollabuk-do", "Seoul Walking Tour 4K | Seongsu Cafe Street")).toBe(false);
  });
});

describe("contradictsRegion", () => {
  it("a title that writes no state does not contradict", () => {
    expect(contradictsRegion("Alaska", "Beach Exit")).toBe(false);
  });

  it("the same state does not contradict (absorbs kanji / romaji and suffix variations)", () => {
    expect(contradictsRegion("東京都", "東京 新宿 歌舞伎町 Tokyo Shinjuku")).toBe(false);
    expect(contradictsRegion("Tokyo", "東京 新宿 歌舞伎町")).toBe(false);
    expect(contradictsRegion("Wisconsin", "Prescott, WI, USA Train Cam")).toBe(false);
  });

  it("a different state written in the title is a contradiction", () => {
    expect(contradictsRegion("Georgia", "City of Alma Live Railcam - Alma, WI")).toBe(true);
    expect(contradictsRegion("新潟県", "【LIVE】京都 銀閣寺ライブ中継カメラ")).toBe(true);
  });

  it("abbreviations are checked as words (no accidental partial match)", () => {
    // The "me" of "Maine" buried inside "Camera" is not regarded as a mention of the state
    expect(contradictsRegion("Georgia", "Folkston Live Train Camera")).toBe(false);
  });
});
