import { collectCamProblems } from "../domain/cams";
import { CAMS } from "./cams";

describe("カメラのマスタデータ", () => {
  it("検証を通る(id 重複・座標・タイムゾーン・ID 書式)", () => {
    expect(collectCamProblems(CAMS)).toEqual([]);
  });

  it("5700 件以上ある", () => {
    expect(CAMS.length).toBeGreaterThanOrEqual(5700);
  });

  /**
   * 同じ座標に何台も載っているのは、ジオコーダが地名でなく一般語を引いた跡。
   * ここは**上限の見張り**であって目標値ではない — 減らすのはよいこと。
   * 増えたら、取り込みの問い合わせがまた壊れたということ
   * (`scripts/import-bulk-cams.ts` の `prioritizeGeocodeQueries`)。
   */
  it("同じ座標に積み上がったカメラが増えていない", () => {
    const byCoord = new Map<string, number>();
    for (const cam of CAMS) {
      const key = `${cam.lat},${cam.lng}`;
      byCoord.set(key, (byCoord.get(key) ?? 0) + 1);
    }
    const counts = [...byCoord.values()];
    const piled = counts.filter((n) => n > 1).reduce((sum, n) => sum + n, 0);

    // 2026-08-28 時点: 3,377 台 / 最大の束 188 台。
    expect(piled).toBeLessThanOrEqual(3377);
    expect(Math.max(...counts)).toBeLessThanOrEqual(188);
  });
});
