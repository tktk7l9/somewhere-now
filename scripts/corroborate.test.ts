// 座標を動かしてよいかの門番。ここが緩むと地図のピンが静かに嘘をつき、
// 厳しすぎると正しい引き直しまで捨てる。下のケースは全部、実際に
// 誤った引き直し・取りこぼしを起こした実データから採った。

import { contradictsRegion, isCorroborated } from "./corroborate.ts";
import { isGenericPlaceWord } from "./import-bulk-cams.ts";

const ok = (place: string, admin1: string, title: string, channel = ""): boolean =>
  isCorroborated(place, admin1, title, channel, isGenericPlaceWord);

describe("採用する", () => {
  it("地名も州もタイトルに出ている", () => {
    expect(ok("Greeley", "Colorado", "Greeley, Colorado, USA | LIVE Train Camera")).toBe(true);
  });

  it("漢字の地名は 3 文字でも根拠になる(ラテン文字は 5 文字必要)", () => {
    expect(ok("歌舞伎町", "東京都", "東京 新宿 歌舞伎町 ライブカメラ")).toBe(true);
  });

  it("地名の先頭の語がタイトルに出ていればよい", () => {
    // ジオコーダは "Shibuya City" と返すが、タイトルは "Shibuya" としか書かない
    expect(ok("Shibuya City", "Tokyo", "いまの渋谷・スクランブル交差点 Shibuya Scramble Crossing - Tokyo")).toBe(true);
  });

  it("日本語のタイトルでも通る", () => {
    expect(ok("Kabukicho", "Tokyo", "東京 新宿 歌舞伎町 Tokyo Shinjuku Kabukicho Live")).toBe(true);
  });
});

describe("採用しない", () => {
  it("4 文字以下の断片は根拠にしない", () => {
    expect(ok("York", "Pennsylvania", "New York City LIVE Manhattan")).toBe(false);
  });

  it("一般語が地名として実在しても採用しない", () => {
    expect(ok("Beach", "North Dakota", "Beach Camera")).toBe(false);
    expect(ok("City", "Michigan", "City of Alma Live Railcam")).toBe(false);
  });

  // 🔴 実測: 1,900km / 1,000km 飛んだ
  it("タイトルが別の州を名指ししていたら弾く", () => {
    expect(ok("Michigan", "North Dakota", "Marysville, Michigan USA | StreamTime LIVE")).toBe(false);
    expect(ok("Bangor", "Maine", "City of Bangor MI - Downtown Live Stream")).toBe(false);
    expect(ok("Alma", "Georgia", "City of Alma Live Railcam - Alma, WI #steelhighway")).toBe(false);
    expect(ok("Nebo", "Pennsylvania", "New York City 4K Drone Video | Manhattan")).toBe(false);
    expect(ok("福岡", "埼玉県", "【LIVE】福岡・博多駅前ライブカメラ Hakata station in Fukuoka")).toBe(false);
  });

  // 🔴 実測: 正しく札幌にいたカメラが北海道の代表点へ 130km 動いた
  it("州・道そのものが返ったときは採用しない", () => {
    expect(ok("Hokkaido", "Hokkaido", "いまの札幌 ライブカメラ Sapporo, Hokkaido")).toBe(false);
    expect(ok("東京", "東京都", "夜の銀座を散歩 Japan Tokyo 4K walking tour/Ginza")).toBe(false);
  });

  it("地名がタイトルに出てこなければ採用しない", () => {
    expect(ok("Ness City", "Kansas", "City of Stuart, Iowa Live Railcam")).toBe(false);
  });

  // 🔴 実測: 州の確認を「矛盾しないこと」に緩めたら、無作為 30 件中 17 件が誤りに
  // なった。英語のタイトルは普通の名詞でできていて、その多くが同名の町として実在する。
  it("州がタイトルに出ていなければ採用しない", () => {
    expect(ok("Thermal", "California", "Thermal camera Video in Day - SCT 320")).toBe(false);
    expect(ok("Trail", "Oregon", "The BEST Trail Camera Video You'll Ever Watch")).toBe(false);
    expect(ok("Wedge", "Utah", "The Wedge – 24/7 Insane Surf Chaos Stream")).toBe(false);
  });
});

describe("この門番が原理的に見抜けないもの", () => {
  /**
   * 同じ州の中の同名地は区別できない。カウアイ島には Kilauea という町が実在し、
   * タイトルの "Hawaii" とも矛盾しないので、キラウエア火山(ハワイ島)のカメラが
   * そちらへ 250km 動く。**タイトルの文字列だけでは判定材料が無い。**
   *
   * ここを塞ぐには別のジオコーダと突き合わせるなどの外部の裏取りが要る。
   * いまは「動かせるが正しいとは限らない」ことを記録しておく。
   */
  it("同じ州の中の同名地は通してしまう", () => {
    expect(ok("Kilauea", "Hawaii", "Live Now: 24/7 Kilauea Volcano Livestream in Hawaii")).toBe(true);
  });

  // 🔴 実測: 国の重心が返って 3 台が採用されかけた
  it("州が分からない結果は採用しない(国の代表点が来る)", () => {
    expect(ok("Philippines", "", "PHILIPPINES Live camera Restaurant Server")).toBe(false);
    expect(ok("Japan", "", "Japan City Pop | Jpop Playlist")).toBe(false);
  });

  // 🔴 実測: Kabupaten(県)は行政区分の一般名詞。西カリマンタンの町が西ジャワへ
  it("行政区分の一般名詞は地名として扱わない", () => {
    expect(ok("Kabupaten", "West Java", "[LIVE CCTV] SIMPANG SAMSAT KABUPATEN KETAPANG")).toBe(false);
  });

  // 🔴 実測: ソウルの南山タワーが全羅北道へ
  it("韓国の広域自治体の食い違いも弾く", () => {
    expect(ok("Namsan", "Jeollabuk-do", "Seoul Namsan 4K LIVE | Namsan Tower | 서울")).toBe(false);
    expect(ok("Seongsu", "Jeollabuk-do", "Seoul Walking Tour 4K | Seongsu Cafe Street")).toBe(false);
  });
});

describe("contradictsRegion", () => {
  it("州を書いていないタイトルは矛盾しない", () => {
    expect(contradictsRegion("Alaska", "Beach Exit")).toBe(false);
  });

  it("同じ州なら矛盾しない（漢字とローマ字・接尾辞の揺れを吸収）", () => {
    expect(contradictsRegion("東京都", "東京 新宿 歌舞伎町 Tokyo Shinjuku")).toBe(false);
    expect(contradictsRegion("Tokyo", "東京 新宿 歌舞伎町")).toBe(false);
    expect(contradictsRegion("Wisconsin", "Prescott, WI, USA Train Cam")).toBe(false);
  });

  it("違う州が書いてあれば矛盾", () => {
    expect(contradictsRegion("Georgia", "City of Alma Live Railcam - Alma, WI")).toBe(true);
    expect(contradictsRegion("新潟県", "【LIVE】京都 銀閣寺ライブ中継カメラ")).toBe(true);
  });

  it("略称は単語として見る(誤って部分一致しない)", () => {
    // "Maine" の "me" が "Camera" の中に埋もれていても州の言及とは見なさない
    expect(contradictsRegion("Georgia", "Folkston Live Train Camera")).toBe(false);
  });
});
