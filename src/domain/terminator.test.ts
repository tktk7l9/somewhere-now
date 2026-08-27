import {
  isNightAt,
  nightPolygon,
  nightPolygonGeoJSON,
  subsolarPoint,
  terminatorLatitude,
  terminatorLine,
  terminatorLineGeoJSON,
} from "./terminator";

// 2026 年の至点・分点(おおよその時刻。赤緯の符号と大きさが見たいだけなので
// 数分のずれは問題にならない)。
const JUNE_SOLSTICE = new Date("2026-06-21T09:00:00Z");
const DEC_SOLSTICE = new Date("2026-12-21T15:00:00Z");
const MARCH_EQUINOX = new Date("2026-03-20T14:46:00Z");

describe("subsolarPoint", () => {
  it("夏至には北回帰線(+23.4°)付近に太陽が来る", () => {
    expect(subsolarPoint(JUNE_SOLSTICE).lat).toBeCloseTo(23.44, 1);
  });

  it("冬至には南回帰線(-23.4°)付近に太陽が来る", () => {
    expect(subsolarPoint(DEC_SOLSTICE).lat).toBeCloseTo(-23.44, 1);
  });

  it("春分には赤道上に太陽が来る", () => {
    expect(Math.abs(subsolarPoint(MARCH_EQUINOX).lat)).toBeLessThan(0.1);
  });

  it("12:00 UTC には太陽直下点がグリニッジ子午線の近くに来る", () => {
    // 均時差のぶん最大 ±4° ほどずれる。
    const { lng } = subsolarPoint(new Date("2026-06-21T12:00:00Z"));
    expect(Math.abs(lng)).toBeLessThan(5);
  });

  it("経度は常に -180..180 に正規化される", () => {
    for (let h = 0; h < 24; h += 1) {
      const { lng } = subsolarPoint(new Date(Date.UTC(2026, 5, 21, h)));
      expect(lng).toBeGreaterThanOrEqual(-180);
      expect(lng).toBeLessThanOrEqual(180);
    }
  });

  it("1 時間で太陽直下点は約 15° 西へ動く", () => {
    const a = subsolarPoint(new Date("2026-06-21T00:00:00Z")).lng;
    const b = subsolarPoint(new Date("2026-06-21T01:00:00Z")).lng;
    let delta = a - b;
    if (delta < -180) delta += 360;
    expect(delta).toBeCloseTo(15, 0);
  });
});

describe("terminatorLatitude", () => {
  it("太陽直下点の子午線では、反対の極側の極圏を通る", () => {
    // 赤緯 +23.44° のとき、太陽直下の経度では終端線は南緯 66.56° を通る。
    expect(terminatorLatitude(0, 23.44, 0)).toBeCloseTo(-66.56, 1);
  });

  it("太陽直下点の裏側の子午線では、同じ極側の極圏を通る", () => {
    expect(terminatorLatitude(180, 23.44, 0)).toBeCloseTo(66.56, 1);
  });

  it("太陽直下点から 90° の子午線では赤道を通る", () => {
    expect(terminatorLatitude(90, 23.44, 0)).toBeCloseTo(0, 6);
  });

  it("赤緯 0(分点)では終端線が極を通る", () => {
    expect(Math.abs(terminatorLatitude(0, 0, 0))).toBeCloseTo(90, 3);
  });

  it("赤緯 0 かつ太陽直下点から 90° という特異点でも NaN を返さない", () => {
    expect(Number.isNaN(terminatorLatitude(90, 0, 0))).toBe(false);
  });

  it("南半球の夏(赤緯が負)では符号が反転する", () => {
    expect(terminatorLatitude(0, -23.44, 0)).toBeCloseTo(66.56, 1);
  });
});

describe("nightPolygon", () => {
  it("経度を刻んだ点列に、暗い側の極で閉じる 2 点が付く", () => {
    const ring = nightPolygon(JUNE_SOLSTICE, 10);
    expect(ring.length).toBe(360 / 10 + 1 + 2);
  });

  it("全ての点が緯度・経度の有効範囲に収まる", () => {
    for (const [lat, lng] of nightPolygon(JUNE_SOLSTICE, 30)) {
      expect(Number.isFinite(lat)).toBe(true);
      expect(Math.abs(lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(lng)).toBeLessThanOrEqual(180);
    }
  });

  it("北半球の夏には南極側で閉じる", () => {
    const ring = nightPolygon(JUNE_SOLSTICE, 30);
    expect(ring[ring.length - 1]![0]).toBe(-90);
  });

  it("北半球の冬には北極側で閉じる", () => {
    const ring = nightPolygon(DEC_SOLSTICE, 30);
    expect(ring[ring.length - 1]![0]).toBe(90);
  });

  it("刻み幅を省略しても点列を返す", () => {
    expect(nightPolygon(JUNE_SOLSTICE).length).toBeGreaterThan(300);
  });
});

describe("terminatorLine", () => {
  it("経度を端から端まで刻んだ点列を返す(極での閉じは含まない)", () => {
    const line = terminatorLine(JUNE_SOLSTICE, 10);
    expect(line.length).toBe(360 / 10 + 1);
    expect(line[0]![1]).toBe(-180);
    expect(line[line.length - 1]![1]).toBe(180);
  });

  it("夜のポリゴンは、この線に極での閉じを足したものになっている", () => {
    const line = terminatorLine(JUNE_SOLSTICE, 30);
    const ring = nightPolygon(JUNE_SOLSTICE, 30);
    expect(ring.slice(0, line.length)).toEqual(line);
    expect(ring.length).toBe(line.length + 2);
  });

  it("刻み幅を省略しても点列を返す", () => {
    expect(terminatorLine(JUNE_SOLSTICE).length).toBe(361);
  });
});

describe("terminatorLineGeoJSON / nightPolygonGeoJSON", () => {
  it("軸を [lng, lat] に組み替える", () => {
    const line = terminatorLineGeoJSON(JUNE_SOLSTICE, 30);
    expect(line.type).toBe("LineString");
    expect(line.coordinates[0]![0]).toBe(-180);
    expect(line.coordinates[line.coordinates.length - 1]![0]).toBe(180);
    expect(line.coordinates).toHaveLength(terminatorLine(JUNE_SOLSTICE, 30).length);
  });

  it("夜のポリゴンは東西 2 枚に分かれ、それぞれ閉じて暗い側の極を含む", () => {
    const poly = nightPolygonGeoJSON(JUNE_SOLSTICE, 30);
    expect(poly.type).toBe("MultiPolygon");
    expect(poly.coordinates).toHaveLength(2);
    for (const [ring] of poly.coordinates) {
      expect(ring![0]).toEqual(ring![ring!.length - 1]);
      expect(ring!.some(([, lat]) => lat === -90)).toBe(true);
    }
  });

  it("冬至は北極側で閉じる", () => {
    const poly = nightPolygonGeoJSON(DEC_SOLSTICE, 30);
    for (const [ring] of poly.coordinates) {
      expect(ring!.some(([, lat]) => lat === 90)).toBe(true);
    }
  });

  it("刻み幅を省略しても点列を返す", () => {
    expect(terminatorLineGeoJSON(JUNE_SOLSTICE).coordinates.length).toBe(361);
    expect(nightPolygonGeoJSON(JUNE_SOLSTICE).coordinates[0]![0]!.length).toBeGreaterThan(100);
  });
});

describe("isNightAt", () => {
  const TOKYO = { lat: 35.68, lng: 139.76 };

  it("東京の正午(JST)は昼", () => {
    expect(isNightAt(new Date("2026-06-21T03:00:00Z"), TOKYO)).toBe(false);
  });

  it("東京の深夜(JST)は夜", () => {
    expect(isNightAt(new Date("2026-06-21T15:00:00Z"), TOKYO)).toBe(true);
  });

  it("夏至の北極は白夜", () => {
    expect(isNightAt(new Date("2026-06-21T15:00:00Z"), { lat: 85, lng: 0 })).toBe(false);
  });
});

describe("昼夜が現地の時計と食い違わない", () => {
  // 2026-08-18T15:49Z を固定して、世界各地の現地時刻と突き合わせる。
  // 太陽高度から出した判定が東西で反転していないことを担保する回帰テスト。
  const AT = new Date("2026-08-18T15:49:00Z");

  const CASES = [
    { name: "東京(00:49)", lat: 35.68, lng: 139.76, night: true },
    { name: "シドニー(01:49)", lat: -33.87, lng: 151.21, night: true },
    { name: "ニューヨーク(11:49)", lat: 40.76, lng: -73.99, night: false },
    { name: "メキシコシティ(09:49)", lat: 19.43, lng: -99.13, night: false },
    { name: "ヴェネツィア(17:49)", lat: 45.43, lng: 12.33, night: false },
    { name: "ロサンゼルス(08:49)", lat: 34.05, lng: -118.24, night: false },
  ];

  for (const { name, lat, lng, night } of CASES) {
    it(name, () => {
      expect(isNightAt(AT, { lat, lng })).toBe(night);
    });
  }
});
