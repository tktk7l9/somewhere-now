import { describe, expect, it } from "vitest";

import {
  GLOBE_GLYPHS,
  GLOBE_TILES_ORIGIN,
  globeStyle,
  LABEL_LAYER_IDS,
  placeNameField,
} from "./globeStyle";

describe("placeNameField", () => {
  it("日本語は name:ja を先に見る", () => {
    expect(placeNameField("ja")[1]).toEqual(["get", "name:ja"]);
  });

  it("英語は name:en を先に見る", () => {
    expect(placeNameField("en")[1]).toEqual(["get", "name:en"]);
  });
});

describe("globeStyle", () => {
  it("ネットの図式を待たず、国・都市ラベルを夜の影より手前に置く", () => {
    const style = globeStyle("ja");
    expect(style.projection).toEqual({ type: "globe" });
    expect(style.glyphs).toBe(GLOBE_GLYPHS);
    expect(style.sources["openmaptiles"]?.["url"]).toBe(`${GLOBE_TILES_ORIGIN}/planet`);
    const ids = style.layers.map((layer) => layer.id);
    expect(ids).toEqual([
      "background",
      "natural_earth",
      "water",
      "landcover-wood",
      "landcover-ice",
      "boundary-country",
      "roads",
      "night-shade",
      "terminator",
      "label-sea",
      "label-country",
      "label-city",
      "label-city-more",
      "label-town",
      "cams-glow",
      "cams-point",
    ]);
    expect(ids.indexOf("label-country")).toBeGreaterThan(ids.indexOf("night-shade"));
    expect(ids.indexOf("cams-point")).toBeGreaterThan(ids.indexOf("label-city"));
    expect(LABEL_LAYER_IDS.every((id) => ids.includes(id))).toBe(true);
    const country = style.layers.find((layer) => layer.id === "label-country");
    expect(country?.["layout"]).toMatchObject({ "text-field": placeNameField("ja") });
    expect(style.layers.find((layer) => layer.id === "natural_earth")?.paint?.["raster-fade-duration"]).toBe(
      0,
    );
  });

  it("英語図式は都市名のフィールドが name:en から始まる", () => {
    const style = globeStyle("en");
    const city = style.layers.find((layer) => layer.id === "label-city");
    expect(city?.["layout"]).toMatchObject({ "text-field": placeNameField("en") });
  });
});
