// The filters that narrow the cameras on the map. Shared by the heading chip (how many are on)
// and the "clear filters" way out of an empty result (SHIG 55, 60).

import type { ViewState } from "./urlState";

type FilterFields = Pick<ViewState, "categories" | "liveOnly" | "nightOnly" | "favoritesOnly" | "query">;

/** The number of conditions in effect now. */
export function activeFilterCount(state: FilterFields): number {
  return (
    state.categories.length +
    (state.liveOnly ? 1 : 0) +
    (state.nightOnly ? 1 : 0) +
    (state.favoritesOnly ? 1 : 0) +
    (state.query === "" ? 0 : 1)
  );
}

/** A patch that turns every filter off. View, language and display mode stay as they are. */
export function clearedFilters(): FilterFields {
  return { categories: [], liveOnly: false, nightOnly: false, favoritesOnly: false, query: "" };
}

/** Why "Take me somewhere" found nothing to pick, so the notice can say it plainly (SHIG 55). */
export type EmptyPickReason = "notLoaded" | "noMatch" | "noLive";

export function emptyPickReason(total: number, state: FilterFields): EmptyPickReason {
  // Until the camera list arrives (or when it failed), "nothing is live" would be untrue.
  if (total === 0) return "notLoaded";
  return activeFilterCount(state) > 0 ? "noMatch" : "noLive";
}
