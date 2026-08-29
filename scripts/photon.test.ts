// Photon に投げる検索語の組み立て。ネットワークには触らない。

import { photonQuery } from "./photon.ts";

describe("photonQuery", () => {
  it("配信の装飾を落として、場所の部分だけ残す", () => {
    expect(photonQuery("🔴 LIVE 24/7 Lisbon Airport 23.07.2026 • Plane Spotting")).toBe(
      "Lisbon Airport • Plane Spotting",
    );
  });

  it("【】や括弧の中は落とす", () => {
    expect(photonQuery("【LIVEカメラ】大分空港（Oita Airport）")).toBe("大分空港");
  });

  it("区切り記号を空白に均す", () => {
    expect(photonQuery("Mallorca Webcam LIVE – Cala Fornells | PTZ 24/7")).toBe(
      "Mallorca – Cala Fornells",
    );
  });

  it("解像度の表記を落とす", () => {
    expect(photonQuery("Seoul Namsan 4K LIVE | Namsan Tower")).toBe("Seoul Namsan Namsan Tower");
  });

  it("長すぎるタイトルは切り詰める", () => {
    expect(photonQuery("A".repeat(200)).length).toBeLessThanOrEqual(90);
  });

  it("場所の手がかりが無ければ空に近い", () => {
    expect(photonQuery("LIVE CAM 24/7").length).toBeLessThan(3);
  });
});
