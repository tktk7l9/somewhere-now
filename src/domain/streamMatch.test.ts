import { matchStream, normalizeTitle, type StreamCandidate } from "./streamMatch";

const c = (id: string, title: string): StreamCandidate => ({ id, title });

describe("normalizeTitle", () => {
  it("大小と連続する空白を潰す", () => {
    expect(normalizeTitle("EarthCam Live:  Times   Square")).toBe("earthcam live: times square");
  });

  it("種類の違うダッシュを同じ形に揃える", () => {
    expect(normalizeTitle("A — B")).toBe(normalizeTitle("A - B"));
    expect(normalizeTitle("A – B")).toBe(normalizeTitle("A - B"));
  });

  it("全角と半角を揃える", () => {
    expect(normalizeTitle("ＬＩＶＥ　カメラ")).toBe("live カメラ");
  });

  it("配信を示す装飾記号を落とす", () => {
    expect(normalizeTitle("🔴 LIVE cam")).toBe("live cam");
    expect(normalizeTitle("【ライブ】渋谷")).toBe("【ライブ】渋谷");
  });

  it("前後の空白を落とす", () => {
    expect(normalizeTitle("  x  ")).toBe("x");
  });
});

describe("matchStream", () => {
  // 同じチャンネルに、括弧の中だけが違う配信が並ぶのが現実。
  const FOLKSTON = [
    c("a", "Folkston, Georgia, USA | LIVE Train Camera (Turnout PTZ)"),
    c("b", "Folkston, Georgia, USA | LIVE Train Camera (Fixed View)"),
    c("d", "Folkston, Georgia, USA  |  LIVE Train Camera (Depot PTZ)"),
    c("e", "Folkston, Georgia, USA | LIVE Train Camera (Fixed View — Looking East)"),
  ];

  it("正規化して一致するものを返す", () => {
    expect(matchStream("Folkston, Georgia, USA | LIVE Train Camera (Depot PTZ)", FOLKSTON)).toBe("d");
  });

  it("空白の揺れを吸収する", () => {
    expect(matchStream("Folkston, Georgia, USA  |  LIVE Train Camera (Fixed View)", FOLKSTON)).toBe("b");
  });

  it("括弧の中だけ違う配信を取り違えない", () => {
    // 「Fixed View」の配信が消え、似た「Fixed View — Looking East」だけが残った場合。
    const remaining = FOLKSTON.filter((x) => x.id !== "b");
    expect(matchStream("Folkston, Georgia, USA | LIVE Train Camera (Fixed View)", remaining)).toBeNull();
  });

  it("同じ地名の別カメラを取り違えない", () => {
    const squares = [
      c("n", "EarthCam Live:  Times Square North 4K"),
      c("x", "EarthCam Live: Times Square Crossroads (New York City, NY)"),
    ];
    expect(matchStream("EarthCam Live:  Times Square North 4K", squares)).toBe("n");
    expect(matchStream("EarthCam Live: Giraffe Cam Barn - Greenville, SC", squares)).toBeNull();
  });

  it("装飾記号が付け足されただけなら追随する", () => {
    expect(matchStream("LIVE cam", [c("z", "🔴 LIVE cam")])).toBe("z");
  });

  it("候補が無ければ null", () => {
    expect(matchStream("anything", [])).toBeNull();
  });

  it("かすっただけの候補には飛びつかない", () => {
    expect(matchStream("EarthCam Live: Wrigley Field", FOLKSTON)).toBeNull();
  });

  it("中身の無いタイトル同士を一致とみなさない", () => {
    expect(matchStream("🔴", [c("x", "—")])).toBeNull();
  });

  it("同じタイトルが複数あるときは、どちらとも決められないので諦める", () => {
    const dup = [c("p", "Live Cam"), c("q", "Live  Cam")];
    expect(matchStream("Live Cam", dup)).toBeNull();
  });

  it("僅かな言い換えは、他と紛れない場合にかぎり拾う", () => {
    const one = [c("s", "Live Sea Otter Cam | Monterey Bay Aquarium (4K)")];
    expect(matchStream("Live Sea Otter Cam | Monterey Bay Aquarium", one)).toBe("s");
  });

  it("僅かな言い換えでも、対抗馬が僅差なら諦める", () => {
    const two = [
      c("s", "Live Sea Otter Cam | Monterey Bay Aquarium (4K)"),
      c("t", "Live Sea Otter Cam | Monterey Bay Aquarium (HD)"),
    ];
    expect(matchStream("Live Sea Otter Cam | Monterey Bay Aquarium", two)).toBeNull();
  });
});
