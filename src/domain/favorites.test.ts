import { decodeFavorites, encodeFavorites, toggleFavorite } from "./favorites";

describe("decodeFavorites", () => {
  it("is empty when nothing is saved", () => {
    expect(decodeFavorites(null)).toEqual([]);
  });

  it("reads the current schema", () => {
    expect(decodeFavorites('{"v":1,"ids":["a","b"]}')).toEqual(["a", "b"]);
  });

  it("treats broken JSON as empty", () => {
    expect(decodeFavorites("{{{")).toEqual([]);
  });

  it("treats an unknown schema version as empty (does not misread an old shape)", () => {
    expect(decodeFavorites('{"v":99,"ids":["a"]}')).toEqual([]);
  });

  it("treats non-array ids as empty", () => {
    expect(decodeFavorites('{"v":1,"ids":"a"}')).toEqual([]);
    expect(decodeFavorites('{"v":1}')).toEqual([]);
  });

  it("drops non-string elements", () => {
    expect(decodeFavorites('{"v":1,"ids":["a",1,null,"b"]}')).toEqual(["a", "b"]);
  });

  it("is also empty when the JSON is not an object", () => {
    expect(decodeFavorites("[1,2]")).toEqual([]);
    expect(decodeFavorites("null")).toEqual([]);
  });
});

describe("encodeFavorites", () => {
  it("writes with the schema version", () => {
    expect(encodeFavorites(["a"])).toBe('{"v":1,"ids":["a"]}');
  });

  it("round-trips", () => {
    expect(decodeFavorites(encodeFavorites(["x", "y"]))).toEqual(["x", "y"]);
  });
});

describe("toggleFavorite", () => {
  it("adds it when absent", () => {
    expect(toggleFavorite(["a"], "b")).toEqual(["a", "b"]);
  });

  it("removes it when present", () => {
    expect(toggleFavorite(["a", "b"], "a")).toEqual(["b"]);
  });

  it("does not mutate the original array", () => {
    const original = ["a"];
    toggleFavorite(original, "b");
    expect(original).toEqual(["a"]);
  });
});
