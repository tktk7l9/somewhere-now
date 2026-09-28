import { describe, expect, it } from "vitest";

import atlas from "../data/globeAtlas.json";
import {
  GLOBE_TILES_ORIGIN,
  globeStyle,
  LABEL_LAYER_IDS,
  placeNameField,
} from "./globeStyle";

describe("placeNameField", () => {
  it("looks at ja first for Japanese", () => {
    expect(placeNameField("ja")[1]).toEqual(["get", "ja"]);
  });

  it("looks at en first for English", () => {
    expect(placeNameField("en")[1]).toEqual(["get", "en"]);
  });
});

describe("globeAtlas", () => {
  it("contains Japan and Tokyo, and has borders", () => {
    const countries = atlas.countries.features.map((f) => f.properties);
    const cities = atlas.cities.features.map((f) => f.properties);
    expect(countries.some((p) => p.ja === "日本" && p.en === "Japan")).toBe(true);
    expect(cities.some((p) => p.ja === "東京都" && p.en === "Tokyo" && p.rank === 0)).toBe(true);
    expect(atlas.borders.features.length).toBeGreaterThan(100);
  });
});

describe("globeStyle", () => {
  it("puts the bundled borders and country names in front of the shadow of night and the pins", () => {
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

  it("starts from en for the English style", () => {
    const style = globeStyle("en");
    const city = style.layers.find((layer) => layer.id === "label-city");
    expect(city?.["layout"]).toMatchObject({ "text-field": placeNameField("en") });
  });
});
