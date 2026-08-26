import {
  formatCssColor,
  nauticalizeCssColor,
  nauticalizeImageData,
  nauticalizeReliefRgb,
  nauticalizeRgb,
  parseCssColor,
  walkCssColors,
} from "./nauticalColor";

describe("parseCssColor", () => {
  it("名前と transparent を読む", () => {
    expect(parseCssColor("black")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(parseCssColor(" White ")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseCssColor("transparent")).toEqual({ r: 0, g: 0, b: 0, a: 0 });
  });

  it("hex の桁数を全部読む", () => {
    expect(parseCssColor("#fc8")).toEqual({ r: 255, g: 204, b: 136, a: 1 });
    expect(parseCssColor("#fde8")).toEqual({ r: 255, g: 221, b: 238, a: 136 / 255 });
    expect(parseCssColor("#f8f4f0")).toEqual({ r: 248, g: 244, b: 240, a: 1 });
    expect(parseCssColor("#ffffff80")).toEqual({ r: 255, g: 255, b: 255, a: 128 / 255 });
  });

  it("rgb / rgba とパーセントを読む", () => {
    expect(parseCssColor("rgb(158,189,255)")).toEqual({ r: 158, g: 189, b: 255, a: 1 });
    expect(parseCssColor("rgba(176, 213, 154, 1)")).toEqual({ r: 176, g: 213, b: 154, a: 1 });
    expect(parseCssColor("rgb(50% 0% 100%)")).toEqual({ r: 127.5, g: 0, b: 255, a: 1 });
    expect(parseCssColor("rgba(0, 0, 0, 50%)")).toEqual({ r: 0, g: 0, b: 0, a: 0.5 });
  });

  it("hsl / hsla を読む", () => {
    expect(parseCssColor("hsl(0,0%,100%)")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseCssColor("hsl(0,0%,70%)")).toEqual({ r: 178.5, g: 178.5, b: 178.5, a: 1 });
    expect(parseCssColor("hsl(120deg, 100%, 50%)")?.a).toBe(1);
    expect(parseCssColor("hsl(-120, 100%, 50%)")?.b).toBeGreaterThan(0);
    expect(parseCssColor("hsla(0,3%,85%,0.84)")?.a).toBe(0.84);
    const orange = parseCssColor("hsl(26,87%,62%)");
    expect(orange?.r).toBeGreaterThan(orange?.b ?? 0);
  });

  it("壊れた指定は null", () => {
    expect(parseCssColor("nope")).toBeNull();
    expect(parseCssColor("rgb(1, 2)")).toBeNull();
    expect(parseCssColor("hsl(1, 2)")).toBeNull();
    expect(parseCssColor("rgb(foo, bar, baz)")).toBeNull();
    expect(parseCssColor("rgb(10%, x%, 10%)")).toBeNull();
    expect(parseCssColor("hsla(10, 10%, 10%, nope)")).toBeNull();
  });
});

describe("nauticalizeRgb", () => {
  it("白は暗く、黒は明るくなる(平面図の invert)", () => {
    expect(nauticalizeRgb(255, 255, 255)).toEqual([0, 0, 0]);
    const [r, g, b] = nauticalizeRgb(0, 0, 0);
    expect(r).toBeGreaterThan(180);
    expect(g).toBe(r);
    expect(b).toBe(r);
  });
});

describe("nauticalizeReliefRgb", () => {
  it("中間色の差が平面図用より残る", () => {
    const chart = Math.abs(nauticalizeRgb(160, 150, 120)[0]! - nauticalizeRgb(90, 100, 80)[0]!);
    const relief = Math.abs(
      nauticalizeReliefRgb(160, 150, 120)[0]! - nauticalizeReliefRgb(90, 100, 80)[0]!,
    );
    expect(relief).toBeGreaterThan(chart);
  });
});

describe("nauticalizeImageData", () => {
  it("RGB だけ変換し alpha は触らない", () => {
    const chart = { data: new Uint8ClampedArray([255, 255, 255, 200]) } as ImageData;
    nauticalizeImageData(chart, false);
    expect([...chart.data]).toEqual([0, 0, 0, 200]);
    const relief = { data: new Uint8ClampedArray([0, 0, 0, 90]) } as ImageData;
    nauticalizeImageData(relief, true);
    expect(relief.data[0]).toBeGreaterThan(180);
    expect(relief.data[3]).toBe(90);
  });
});

describe("nauticalizeCssColor / walkCssColors", () => {
  it("色でない文字列はそのまま", () => {
    expect(nauticalizeCssColor("Noto Sans Regular")).toBe("Noto Sans Regular");
  });

  it("不透明は rgb、透明は rgba で出す", () => {
    expect(formatCssColor({ r: 10, g: 20, b: 30, a: 1 })).toBe("rgb(10, 20, 30)");
    expect(formatCssColor({ r: 10, g: 20, b: 30, a: 0.49 })).toBe("rgba(10, 20, 30, 0.49)");
    expect(nauticalizeCssColor("transparent")).toBe("rgba(0, 0, 0, 0)");
  });

  it("入れ子の色だけ塗る", () => {
    expect(
      walkCssColors({
        paint: {
          "fill-color": "#ffffff",
          "fill-opacity": 0.4,
          stops: ["#000", 2, "keep"],
        },
      }),
    ).toEqual({
      paint: {
        "fill-color": "rgb(0, 0, 0)",
        "fill-opacity": 0.4,
        stops: [nauticalizeCssColor("#000"), 2, "keep"],
      },
    });
  });

  it("プリミティブはそのまま", () => {
    expect(walkCssColors(null)).toBeNull();
    expect(walkCssColors(3)).toBe(3);
    expect(walkCssColors(true)).toBe(true);
  });
});

const LIBERTY_COLORS = [
  "#000",
  "#2e5a80",
  "#333",
  "#495e91",
  "#666",
  "#74aee9",
  "#DEE3CD",
  "#a0c8f0",
  "#bbb",
  "#cfcdca",
  "#d8e8c8",
  "#e9ac77",
  "#f0ede9",
  "#f8f4f0",
  "#fc8",
  "#fde",
  "#fea",
  "#ffdaa6",
  "#fff",
  "#fff4c6",
  "#ffffff",
  "hsl(0,0%,100%)",
  "hsl(0,0%,70%)",
  "hsl(248,1%,41%)",
  "hsl(26,87%,62%)",
  "hsl(30,23%,62%)",
  "hsl(35,6%,79%)",
  "hsl(35,6%,80%)",
  "hsl(35,8%,85%)",
  "hsl(36,6%,74%)",
  "hsl(75,37%,81%)",
  "hsla(0,3%,85%,0.84)",
  "hsla(35,57%,88%,0.49)",
  "hsla(35,6%,79%,0.32)",
  "hsla(98,61%,72%,0.7)",
  "rgb(158,189,255)",
  "rgb(236,238,204)",
  "rgba(176, 213, 154, 1)",
  "rgba(224, 236, 236, 1)",
  "rgba(228, 241, 215, 1)",
  "rgba(229, 228, 224, 1)",
  "rgba(247, 239, 195, 1)",
  "rgba(255,255,255,0.7)",
  "rgba(95, 208, 100, 1)",
];

describe("OpenFreeMap liberty の色", () => {
  it("図式に出る指定をすべて変換できる", () => {
    for (const color of LIBERTY_COLORS) {
      expect(parseCssColor(color), color).not.toBeNull();
      expect(nauticalizeCssColor(color), color).not.toBe(color);
    }
  });
});
