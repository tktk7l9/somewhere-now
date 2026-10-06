import { activeFilterCount, clearedFilters, emptyPickReason } from "./filters";
import { parseUrlState } from "./urlState";

describe("activeFilterCount", () => {
  it("is 0 in the plain state", () => {
    expect(activeFilterCount(parseUrlState(""))).toBe(0);
  });

  it("counts each category, each flag and the search", () => {
    expect(activeFilterCount(parseUrlState("?cat=city,nature&live=1&night=1&fav=1&q=tokyo"))).toBe(6);
  });

  it("does not count view, language or display mode", () => {
    expect(activeFilterCount(parseUrlState("?cam=a&lang=en&globe=1&watching=1"))).toBe(0);
  });
});

describe("clearedFilters", () => {
  it("turns every filter off and leaves the rest alone", () => {
    const state = parseUrlState("?cat=city&live=1&night=1&fav=1&q=x&cam=a&lang=en&globe=1");
    const cleared = { ...state, ...clearedFilters() };
    expect(activeFilterCount(cleared)).toBe(0);
    expect(cleared.view).toEqual(["a"]);
    expect(cleared.lang).toBe("en");
    expect(cleared.globe).toBe(true);
  });
});

describe("emptyPickReason", () => {
  it("says the list has not loaded while there are no cameras at all", () => {
    expect(emptyPickReason(0, parseUrlState("?q=tokyo"))).toBe("notLoaded");
  });

  it("blames the filters when any is on", () => {
    expect(emptyPickReason(5711, parseUrlState("?night=1"))).toBe("noMatch");
  });

  it("says nothing is live when no filter is on", () => {
    expect(emptyPickReason(5711, parseUrlState(""))).toBe("noLive");
  });
});
