import { CAMS } from "./cams";
import { CAM_SOURCES } from "./camSources";

describe("Worker's slice of the camera master", () => {
  // camSources.ts is generated from cams.ts. Editing cams.ts without `npm run cams:sources`
  // would leave the Cron checking yesterday's cameras while the map shows today's.
  it("matches cams.ts (regenerate with npm run cams:sources)", () => {
    expect(CAM_SOURCES).toEqual(CAMS.map(({ id, source }) => ({ id, source })));
  });
});
