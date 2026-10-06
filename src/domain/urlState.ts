// All screen state goes into query parameters. Reload or share, the same picture comes up.
// Defaults are not written out, so the URL stays clean in the plain state.

import { CAM_CATEGORIES, type CamCategory } from "./cams";
import type { Lang } from "./weather";

/** Upper limit of players open at the same time (2x2). */
export const MAX_VIEW = 4;

export interface ViewState {
  /** The camera ids on display. The first is the lead (the side that plays audio). */
  view: string[];
  categories: CamCategory[];
  liveOnly: boolean;
  nightOnly: boolean;
  favoritesOnly: boolean;
  /** Globe view. The default is the flat map. */
  globe: boolean;
  /** A list of live streams sorted by viewer count, highest first. The default is the map. */
  watching: boolean;
  /**
   * Also show "broadcasts" (TV, radio, cartoons, etc.). The default is false = hidden. The app is
   * about fixed cameras, so the default leans toward hiding them (domain/broadcast.ts).
   */
  broadcasts: boolean;
  query: string;
  lang: Lang;
}

function uniqueNonEmpty(values: readonly string[]): string[] {
  return [...new Set(values.map((v) => v.trim()).filter((v) => v !== ""))];
}

function isCategory(value: string): value is CamCategory {
  return (CAM_CATEGORIES as readonly string[]).includes(value);
}

export function parseUrlState(search: string): ViewState {
  const params = new URLSearchParams(search);

  // ?view= is primary. ?cam= is an alias for single-view share URLs.
  const rawView = params.get("view") ?? params.get("cam") ?? "";
  const view = uniqueNonEmpty(rawView.split(",")).slice(0, MAX_VIEW);

  const categories = uniqueNonEmpty((params.get("cat") ?? "").split(",")).filter(isCategory);
  const lang = params.get("lang") === "en" ? "en" : "ja";

  return {
    view,
    categories,
    liveOnly: params.get("live") === "1",
    nightOnly: params.get("night") === "1",
    favoritesOnly: params.get("fav") === "1",
    globe: params.get("globe") === "1",
    watching: params.get("watching") === "1",
    broadcasts: params.get("bc") === "1",
    query: (params.get("q") ?? "").trim(),
    lang,
  };
}

export function toSearchString(state: ViewState): string {
  const params = new URLSearchParams();

  if (state.view.length === 1) {
    params.set("cam", state.view[0]!);
  } else if (state.view.length > 1) {
    params.set("view", state.view.join(","));
  }
  if (state.categories.length > 0) params.set("cat", state.categories.join(","));
  if (state.liveOnly) params.set("live", "1");
  if (state.nightOnly) params.set("night", "1");
  if (state.favoritesOnly) params.set("fav", "1");
  if (state.globe) params.set("globe", "1");
  if (state.watching) params.set("watching", "1");
  if (state.broadcasts) params.set("bc", "1");
  if (state.query !== "") params.set("q", state.query);
  if (state.lang !== "ja") params.set("lang", state.lang);

  const query = params.toString();
  return query === "" ? "" : `?${query}`;
}
