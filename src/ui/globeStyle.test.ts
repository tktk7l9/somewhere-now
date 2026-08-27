import { describe, expect, it } from "vitest";

import atlas from "../data/globeAtlas.json";
import {
  GLOBE_TILES_ORIGIN,
  globeStyle,
  LABEL_LAYER_IDS,
  placeNameField,
} from "./globeStyle";

describe("placeNameField", () => {
  it("日本語は ja を先に見る", () => {
    expect(placeNameField("ja")[1]).toEqual(["get", "ja"]);
  });

  it("英語は en を先に見る", () => {
    expect(placeNameField("en")[1]).toEqual(["get", "en"]);
  });
});

describe("globeAtlas", () => {
  it("日本と東京を含み、国境線がある", () => {
    const countries = atlas.countries.features.map((f) => f.properties);
    const cities = atlas.cities.features.map((f) => f.properties);
    expect(countries.some((p) => p.ja === "日本" && p.en === "Japan")).toBe(true);
    expect(cities.some((p) => p.ja === "東京都" && p.en === "Tokyo" && p.rank === 0)).toBe(true);
    expect(atlas.borders.features.length).toBeGreaterThan(100);
  });
});

describe("globeStyle", () => {
  it("同梱の国境と国名を夜の影とピンより手前に置く", () => {
    const style = globeStyle("ja");
    expect(style.projection).toEqual({ type: "globe" });
    expect(style.glyphs).toBe(`${GLOBE_TILES_ORIGIN}/fonts/{fontstack}/{range}.pbf`);
    expect(style.sources["atlasBorders"]?.["data"]).toBe(atlas.borders);
    expect(style.sources["atlasCountries"]?.["data"]).toBe(atlas.countries);
    const ids = style.layers.map((layer) => layer.id);
    expect(ids).toEqual([
      "background",
      "natural_earth",
      "water",
      "boundary-state",
      "boundary-city",
      "night-shade",
      "terminator",
      "boundary-country",
      "label-country",
      "label-city",
      "cams-glow",
      "cams-point",
    ]);
    expect(ids.indexOf("boundary-country")).toBeGreaterThan(ids.indexOf("night-shade"));
    expect(ids.indexOf("cams-point")).toBeGreaterThan(ids.indexOf("label-country"));
    expect(LABEL_LAYER_IDS.every((id) => ids.includes(id))).toBe(true);
    const country = style.layers.find((layer) => layer.id === "label-country");
    expect(country?.["layout"]).toMatchObject({
      "text-field": placeNameField("ja"),
      "text-font": ["Noto Sans Regular"],
    });
    expect(country?.paint).toMatchObject({ "text-opacity": 0.62 });
    expect(style.layers.find((layer) => layer.id === "boundary-country")?.paint).toMatchObject({
      "line-opacity": 0.42,
    });
  });

  it("英語図式は en から始まる", () => {
    const style = globeStyle("en");
    const city = style.layers.find((layer) => layer.id === "label-city");
    expect(city?.["layout"]).toMatchObject({ "text-field": placeNameField("en") });
  });
});
