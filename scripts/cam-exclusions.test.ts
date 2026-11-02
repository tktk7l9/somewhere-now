import { CAMS } from "../src/data/cams";
import { CAM_EXCLUSIONS, EXCLUDED_VIDEO_IDS } from "./cam-exclusions.ts";

describe("camera exclusions", () => {
  it("records each stream once, with a reason", () => {
    expect(EXCLUDED_VIDEO_IDS.size).toBe(CAM_EXCLUSIONS.length);
    for (const { reason } of CAM_EXCLUSIONS) expect(reason.trim()).not.toBe("");
  });

  it("keeps every excluded stream out of the generated master", () => {
    expect(CAMS.filter((cam) => EXCLUDED_VIDEO_IDS.has(cam.source.videoId ?? ""))).toEqual([]);
  });
});
