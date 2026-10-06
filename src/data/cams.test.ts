import { collectCamProblems } from "../domain/cams";
import { CAMS } from "./cams";

describe("camera master data", () => {
  it("passes validation (duplicate id, coordinates, time zone, ID format)", () => {
    expect(collectCamProblems(CAMS)).toEqual([]);
  });

  it("has 5700 or more entries", () => {
    expect(CAMS.length).toBeGreaterThanOrEqual(5700);
  });

  /**
   * Many cameras on the same coordinates are mostly traces of geocoder guesses.
   * But **a pile itself is not bad** — like the 17 cameras in Kabukicho, cameras
   * really in the same place get the same coordinates. So this is not a measure of
   * accuracy, but **a watch that things have not got worse**.
   *
   * The numbers are the current measurement (high-water mark), not a target. Reducing
   * them is good. If they increase, the import queries have broken again
   * (`prioritizeGeocodeQueries` in `scripts/import-bulk-cams.ts`).
   * Raise these numbers only when the increase is intentional.
   */
  it("cameras piled up on the same coordinates have not increased", () => {
    const byCoord = new Map<string, number>();
    for (const cam of CAMS) {
      const key = `${cam.lat},${cam.lng}`;
      byCoord.set(key, (byCoord.get(key) ?? 0) + 1);
    }
    const counts = [...byCoord.values()];
    const piled = counts.filter((n) => n > 1).reduce((sum, n) => sum + n, 0);

    // As of 2026-08-29: 3,202 cameras / largest pile 175 cameras.
    // 2026-10-06: +1 on purpose. The Big Bear nest cam moved from the "Big Delta, Alaska"
    // pile onto the coordinates of its sibling cam (same channel, same lake) and formed a
    // real pile of 2.
    // 2026-10-06 (later the same day): −2. Big Bog SRA (Minnesota) and Chicago O'Hare left
    // the "Big Delta, Alaska" pile for their real coordinates. The pile still holds 2
    // (Big Island Hawaiʻi tour, Tahiti/Hawaii waves) whose channels state no single place.
    expect(piled).toBeLessThanOrEqual(3201);
    expect(Math.max(...counts)).toBeLessThanOrEqual(175);
  });
});
