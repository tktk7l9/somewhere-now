// 座標を動かしてよいかの門番。ここが緩むと、地図のピンが静かに嘘をつく。
// 下のケースは全部、実際に誤った引き直しをさせた実データから採った。

import { isCorroborated } from "./corroborate.ts";

describe("採用する", () => {
  it("地名も州もタイトルに出ている", () => {
    expect(isCorroborated("Greeley", "Colorado", "Greeley, Colorado, USA | LIVE Train Camera")).toBe(true);
  });

  it("州が略称で書かれていてもよい", () => {
    expect(isCorroborated("Prescott", "Wisconsin", "Prescott, WI, USA Train East Cam LIVE")).toBe(true);
  });

  it("日本語のタイトルでも、地名と都道府県が出ていれば通る", () => {
    expect(isCorroborated("Kabukicho", "Tokyo", "東京 新宿 歌舞伎町 Tokyo Shinjuku Kabukicho Live")).toBe(true);
  });
});

describe("採用しない", () => {
  // 🔴 実測: "New York City" が 3 文字の New でケンタッキー州へ飛んだ
  it("4 文字以下の断片は根拠にしない", () => {
    expect(isCorroborated("York", "Pennsylvania", "New York City LIVE Manhattan")).toBe(false);
  });

  // 🔴 実測: ノースダコタ州に Michigan という町があり、1,900km 動いた
  it("同名の別の町(州が食い違う)を弾く", () => {
    expect(isCorroborated("Michigan", "North Dakota", "Marysville, Michigan USA | StreamTime LIVE")).toBe(false);
  });

  it("Bangor MI がメイン州の Bangor になるのを弾く", () => {
    expect(isCorroborated("Bangor", "Maine", "City of Bangor MI - Downtown Live Stream")).toBe(false);
  });

  it("Redondo Beach がワシントン州の Redondo になるのを弾く", () => {
    expect(isCorroborated("Redondo", "Washington", "City of Redondo Beach Pier")).toBe(false);
  });

  // 🔴 実測: 正しく札幌にいたカメラが北海道の代表点へ 130km 動いた
  it("州・道そのものが返ったときは採用しない", () => {
    expect(isCorroborated("Hokkaido", "Hokkaido", "いまの札幌 ライブカメラ Sapporo, Hokkaido")).toBe(false);
    expect(isCorroborated("Tokyo", "Tokyo", "夜の銀座を散歩 Japan Tokyo 4K night walking tour/Ginza")).toBe(false);
  });

  it("地名がタイトルに出てこなければ採用しない", () => {
    expect(isCorroborated("Ness City", "Kansas", "City of Stuart, Iowa Live Railcam")).toBe(false);
  });

  it("州が分からないものは採用しない", () => {
    expect(isCorroborated("Clearwater", "", "Frenchy's Clearwater Beach Cam")).toBe(false);
  });
});
