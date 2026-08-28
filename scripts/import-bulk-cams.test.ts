// ジオコーダに投げる問い合わせの組み立て。ネットワークには触らない。
//
// ここが壊れると「地図に出るピンの位置」が静かに壊れる。実際に壊れていて、
// 5,720 台のうち 3,394 台(59%)が同じ座標の束に積み上がっていた。
// 下のケースは全部、その実データから採った。

import { guessPlaceQueries, prioritizeGeocodeQueries } from "./import-bulk-cams.ts";

const top = (title: string, channel = "", cc: string | null = "US"): string =>
  prioritizeGeocodeQueries(guessPlaceQueries(title, channel, cc))[0]?.name ?? "";

const names = (title: string, channel = "", cc: string | null = "US"): string[] =>
  prioritizeGeocodeQueries(guessPlaceQueries(title, channel, cc)).map((q) => q.name);

describe("地名になり得ない断片は問い合わせない", () => {
  it("数字で始まるものを落とす(解像度・年・日付)", () => {
    const got = names("2026 Times Square 4K 2160p 8/26 360 24H");
    expect(got).not.toContain("2026");
    expect(got).not.toContain("2160p");
    expect(got).not.toContain("8/26");
    expect(got).not.toContain("360");
    expect(got).not.toContain("24H");
  });

  it("地震速報の断片や型番を落とす", () => {
    const got = names("M7.5 Earthquake I-35 2MP PTZ");
    for (const junk of ["M7.5", "I-35", "2MP"]) expect(got).not.toContain(junk);
  });

  it("括弧・句読点の残骸を落とす", () => {
    const got = names("[4K] Osaka (SP) Now: Park, .NL RE-");
    for (const junk of ["[4K]", "(SP)", "Now:", "Park,", ".NL", "RE-"]) {
      expect(got).not.toContain(junk);
    }
  });

  it("文字を含まないものは問い合わせない", () => {
    for (const q of names("--- 24/7 ///")) expect(q).toMatch(/[\p{L}]/u);
  });
});

describe("先頭に来る問い合わせ", () => {
  // 🔴 実データの回帰: この 2 件で 54 台がまったく違う土地に積み上がっていた。
  it("New York は New(ケンタッキー州)でなく地名の方で引く", () => {
    expect(top("New York City LIVE Manhattan")).not.toBe("New");
    expect(names("New York City LIVE Manhattan")).toContain("New York City Manhattan");
  });

  it("Beach Cam は Beach(ノースダコタ州)でなく地名の方で引く", () => {
    expect(top("Beach Cam (Solglimt B & B)", "Solglimt")).not.toBe("Beach");
  });

  it("語数の多い方を先に試す(場所を絞るのは語数)", () => {
    const got = names("Ocean City Maryland Boardwalk");
    const single = got.findIndex((n) => !n.includes(" "));
    const multi = got.findIndex((n) => n.includes(" "));
    expect(multi).toBeGreaterThanOrEqual(0);
    expect(multi).toBeLessThan(single === -1 ? Number.POSITIVE_INFINITY : single);
  });

  it("単語 1 つしか無いときは長い方が先(短い一般語に負けない)", () => {
    const got = names("Manhattan New");
    expect(got.indexOf("Manhattan")).toBeLessThan(got.indexOf("New"));
  });

  it("一般語は捨てずに最後尾へ回す(他が空振りしたときの最後の手段)", () => {
    const got = names("Beach");
    expect(got).toContain("Beach");
    expect(got[got.length - 1]).toBe("Beach");
  });

  it("都市別名は今までどおり効く", () => {
    expect(names("渋谷スクランブル交差点 ライブカメラ", "", "JP")).toContain("Tokyo");
  });
});
