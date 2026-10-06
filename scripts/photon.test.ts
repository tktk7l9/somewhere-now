// Building the search term sent to Photon. Does not touch the network.

import { photonQuery } from "./photon.ts";

describe("photonQuery", () => {
  it("drops stream decoration and keeps only the place part", () => {
    expect(photonQuery("🔴 LIVE 24/7 Lisbon Airport 23.07.2026 • Plane Spotting")).toBe(
      "Lisbon Airport • Plane Spotting",
    );
  });

  it("drops the contents of 【】 and parentheses", () => {
    expect(photonQuery("【LIVEカメラ】大分空港（Oita Airport）")).toBe("大分空港");
  });

  it("normalizes separator symbols to spaces", () => {
    expect(photonQuery("Mallorca Webcam LIVE – Cala Fornells | PTZ 24/7")).toBe(
      "Mallorca – Cala Fornells",
    );
  });

  it("drops resolution notation", () => {
    expect(photonQuery("Seoul Namsan 4K LIVE | Namsan Tower")).toBe("Seoul Namsan Namsan Tower");
  });

  it("truncates a title that is too long", () => {
    expect(photonQuery("A".repeat(200)).length).toBeLessThanOrEqual(90);
  });

  it("is close to empty when there is no clue to the place", () => {
    expect(photonQuery("LIVE CAM 24/7").length).toBeLessThan(3);
  });
});
