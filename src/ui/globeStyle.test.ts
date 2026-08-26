import { describe, expect, it } from "vitest";

import {
  BOUNDARY_LAYER_IDS,
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

  it("どちらも OSM の name に退ける", () => {
    expect(placeNameField("ja")).toContainEqual(["get", "name"]);
    expect(placeNameField("en")).toContainEqual(["get", "name"]);
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
      "boundary-country-disputed",
      "boundary-state",
      "boundary-city",
      "roads",
      "night-shade",
      "terminator",
      "label-country",
      "label-city",
      "label-city-more",
      "label-town",
      "label-sea",
      "cams-glow",
      "cams-point",
    ]);
    expect(ids.indexOf("label-country")).toBeGreaterThan(ids.indexOf("night-shade"));
    expect(ids.indexOf("label-country")).toBeLessThan(ids.indexOf("label-sea"));
    expect(ids.indexOf("cams-point")).toBeGreaterThan(ids.indexOf("label-city"));
    expect(LABEL_LAYER_IDS.every((id) => ids.includes(id))).toBe(true);
    expect(BOUNDARY_LAYER_IDS.every((id) => ids.includes(id))).toBe(true);
    const country = style.layers.find((layer) => layer.id === "label-country");
    expect(country?.["layout"]).toMatchObject({
      "text-field": placeNameField("ja"),
      "text-allow-overlap": true,
      "text-ignore-placement": true,
    });
    expect(country?.["layout"]).not.toHaveProperty("text-optional");
    expect(style.layers.find((layer) => layer.id === "natural_earth")?.paint?.["raster-fade-duration"]).toBe(
      0,
    );
  });

  it("英語図式は都市名のフィールドが name:en から始まる", () => {
    const style = globeStyle("en");
    const city = style.layers.find((layer) => layer.id === "label-city");
    expect(city?.["layout"]).toMatchObject({
      "text-field": placeNameField("en"),
      "text-allow-overlap": true,
    });
  });

  it("国境・州境・都市境を平面図と同様に載せる", () => {
    const style = globeStyle("ja");
    const country = style.layers.find((layer) => layer.id === "boundary-country");
    const state = style.layers.find((layer) => layer.id === "boundary-state");
    const city = style.layers.find((layer) => layer.id === "boundary-city");
    expect(country?.filter).toEqual([
      "all",
      ["==", ["get", "admin_level"], 2],
      ["!=", ["coalesce", ["get", "disputed"], 0], 1],
      ["!=", ["coalesce", ["get", "maritime"], 0], 1],
      ["!", ["has", "claimed_by"]],
    ]);
    expect(state?.filter).toEqual([
      "all",
      ["match", ["get", "admin_level"], [3, 4], true, false],
      ["!=", ["coalesce", ["get", "maritime"], 0], 1],
    ]);
    expect(city?.filter).toEqual([
      "all",
      ["match", ["get", "admin_level"], [5, 6, 7, 8, 9], true, false],
      ["!=", ["coalesce", ["get", "maritime"], 0], 1],
    ]);
    expect(state?.["minzoom"]).toBe(3);
    expect(city?.["minzoom"]).toBe(6);
    expect(country?.paint?.["line-opacity"]).toBe(0.78);
  });
});
