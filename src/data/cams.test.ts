import { collectCamProblems } from "../domain/cams";
import { CAMS } from "./cams";

describe("カメラのマスタデータ", () => {
  it("検証を通る(id 重複・座標・タイムゾーン・ID 書式)", () => {
    expect(collectCamProblems(CAMS)).toEqual([]);
  });

  it("5700 件以上ある", () => {
    expect(CAMS.length).toBeGreaterThanOrEqual(5700);
  });
});
