import { CAMS } from "../src/data/cams";
import { CAM_RELOCATIONS } from "./cam-relocations.ts";
import { EXCLUDED_VIDEO_IDS } from "./cam-exclusions.ts";
import { CAM_PLACES_BULK } from "./cam-places-bulk.ts";

describe("camera relocations", () => {
  const bulk = new Map(CAM_PLACES_BULK.map((place) => [place.id, place]));

  it("names each camera once, with exactly one position", () => {
    expect(new Set(CAM_RELOCATIONS.map((r) => r.id)).size).toBe(CAM_RELOCATIONS.length);
    for (const r of CAM_RELOCATIONS) expect(Number(r.place !== undefined) + Number(r.at !== undefined)).toBe(1);
  });

  it("targets bulk cameras, and states the geocoder hit behind explicit coordinates", () => {
    for (const r of CAM_RELOCATIONS) {
      expect(bulk.has(r.id), r.id).toBe(true);
      if (r.at !== undefined) expect(r.from, r.id).toMatch(/^Photon: /);
    }
  });

  it("lands in the generated master in the stated country", () => {
    for (const r of CAM_RELOCATIONS) {
      if (EXCLUDED_VIDEO_IDS.has(bulk.get(r.id)!.videoId)) continue;
      const cam = CAMS.find((c) => c.id === r.id);
      expect(cam?.country, r.id).toBe(r.at?.country ?? r.place?.countryCode);
      if (r.category !== undefined) expect(cam?.category, r.id).toBe(r.category);
    }
  });
});
