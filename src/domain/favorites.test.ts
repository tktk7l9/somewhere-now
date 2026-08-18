import { decodeFavorites, encodeFavorites, toggleFavorite } from "./favorites";

describe("decodeFavorites", () => {
  it("保存が無ければ空", () => {
    expect(decodeFavorites(null)).toEqual([]);
  });

  it("現行スキーマを読む", () => {
    expect(decodeFavorites('{"v":1,"ids":["a","b"]}')).toEqual(["a", "b"]);
  });

  it("壊れた JSON を空として扱う", () => {
    expect(decodeFavorites("{{{")).toEqual([]);
  });

  it("知らないスキーマ版を空として扱う(古い形を誤読しない)", () => {
    expect(decodeFavorites('{"v":99,"ids":["a"]}')).toEqual([]);
  });

  it("配列でない ids を空として扱う", () => {
    expect(decodeFavorites('{"v":1,"ids":"a"}')).toEqual([]);
    expect(decodeFavorites('{"v":1}')).toEqual([]);
  });

  it("文字列でない要素を落とす", () => {
    expect(decodeFavorites('{"v":1,"ids":["a",1,null,"b"]}')).toEqual(["a", "b"]);
  });

  it("JSON がオブジェクトでない場合も空", () => {
    expect(decodeFavorites("[1,2]")).toEqual([]);
    expect(decodeFavorites("null")).toEqual([]);
  });
});

describe("encodeFavorites", () => {
  it("スキーマ版を付けて書く", () => {
    expect(encodeFavorites(["a"])).toBe('{"v":1,"ids":["a"]}');
  });

  it("往復する", () => {
    expect(decodeFavorites(encodeFavorites(["x", "y"]))).toEqual(["x", "y"]);
  });
});

describe("toggleFavorite", () => {
  it("無ければ足す", () => {
    expect(toggleFavorite(["a"], "b")).toEqual(["a", "b"]);
  });

  it("あれば外す", () => {
    expect(toggleFavorite(["a", "b"], "a")).toEqual(["b"]);
  });

  it("元の配列を書き換えない", () => {
    const original = ["a"];
    toggleFavorite(original, "b");
    expect(original).toEqual(["a"]);
  });
});
