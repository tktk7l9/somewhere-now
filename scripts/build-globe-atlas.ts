// Natural Earth 110m から地球儀用の国境線・国名点・都市点を摘む。
// ベクトルタイルの place / boundary に頼ると環境によって地名が消える。
// 使い方: node --experimental-strip-types scripts/build-globe-atlas.ts

const BORDERS =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_boundary_lines_land.geojson";
const COUNTRIES =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
const PLACES =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_populated_places.geojson";

type Geom = { type: string; coordinates: unknown };
type Feat = { type: "Feature"; properties: Record<string, unknown>; geometry: Geom };

function rank(value: unknown, fallback = 9): number {
  return value == null ? fallback : Number(value);
}

function point(lon: number, lat: number, properties: Record<string, unknown>): Feat {
  return {
    type: "Feature",
    properties,
    geometry: { type: "Point", coordinates: [Math.round(lon * 10000) / 10000, Math.round(lat * 10000) / 10000] },
  };
}

async function load(url: string): Promise<{ features: Feat[] }> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} ${response.status}`);
  return (await response.json()) as { features: Feat[] };
}

const borders = await load(BORDERS);
const countries = await load(COUNTRIES);
const places = await load(PLACES);

const countryFeats = countries.features.flatMap((feature) => {
  const p = feature.properties;
  const ja = String(p["NAME_JA"] ?? p["NAME"] ?? "");
  const en = String(p["NAME_EN"] ?? p["NAME"] ?? "");
  const x = p["LABEL_X"];
  const y = p["LABEL_Y"];
  if (!ja && !en) return [];
  if (typeof x !== "number" || typeof y !== "number") return [];
  return [point(x, y, { ja, en, rank: rank(p["LABELRANK"]) })];
});

const cityFeats = places.features.map((feature) => {
  const p = feature.properties;
  const ja = String(p["NAME_JA"] ?? p["NAME"] ?? "");
  const en = String(p["NAME_EN"] ?? p["NAMEASCII"] ?? p["NAME"] ?? "");
  const coords = feature.geometry.coordinates as [number, number];
  const capital = String(p["FEATURECLA"] ?? "").toLowerCase().includes("capital") ? 1 : 0;
  return point(coords[0]!, coords[1]!, { ja, en, rank: rank(p["SCALERANK"]), capital });
});

const atlas = {
  countries: { type: "FeatureCollection", features: countryFeats },
  cities: { type: "FeatureCollection", features: cityFeats },
  borders: {
    type: "FeatureCollection",
    features: borders.features.map((feature) => ({
      type: "Feature" as const,
      properties: {},
      geometry: feature.geometry,
    })),
  },
};

const { writeFileSync } = await import("node:fs");
const { dirname, join } = await import("node:path");
const { fileURLToPath } = await import("node:url");
const out = join(dirname(fileURLToPath(import.meta.url)), "../src/data/globeAtlas.json");
writeFileSync(out, JSON.stringify(atlas));
console.log(
  `wrote ${out} countries=${countryFeats.length} cities=${cityFeats.length} borders=${atlas.borders.features.length}`,
);
