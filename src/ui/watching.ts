// List of live streams sorted by viewer count, highest first. A surface for picking a place
// instead of using the map.
//
// No iframe is placed here. So that a re-render does not reconnect streams even with several
// hundred rows, rows are reused when the order is the same, and only the time, the viewer
// count and the selection are rewritten.

import type { Cam, PublicCamState } from "../domain/cams";
import { formatLocalTime } from "../domain/localTime";
import type { Lang } from "../domain/weather";
import { camName, categoryLabel, countryName, t, viewersText } from "./i18n";

export type WatchingReady = "loading" | "unavailable" | "ready";

export interface WatchingContext {
  lang: Lang;
  now: Date;
  states: ReadonlyMap<string, PublicCamState>;
  ready: WatchingReady;
  /** Whether any of category, night, favorites or search is applied. */
  filtered: boolean;
}

interface Row {
  camId: string;
  root: HTMLButtonElement;
  rank: HTMLElement;
  name: HTMLElement;
  meta: HTMLElement;
  viewers: HTMLElement;
}

function emptyMessage(ctx: WatchingContext): string {
  if (ctx.ready === "loading") return t("statusUnknown", ctx.lang);
  if (ctx.ready === "unavailable") return t("stateUnavailable", ctx.lang);
  return ctx.filtered ? t("noMatch", ctx.lang) : t("noLive", ctx.lang);
}

/** An unknown count leaves the slot empty: a dash is noise that says nothing (SHIG 1, 11). */
function viewersLabel(viewers: number | null | undefined, lang: Lang): string {
  if (viewers === null || viewers === undefined) return "";
  return viewersText(viewers, lang);
}

function metaLabel(cam: Cam, ctx: WatchingContext): string {
  return `${categoryLabel(cam.category, ctx.lang)} · ${countryName(cam.country, ctx.lang)} · ${formatLocalTime(ctx.now, cam.timeZone)}`;
}

function rankedKey(ranked: readonly Cam[], lang: Lang): string {
  return `${lang}:${ranked.map((cam) => cam.id).join(",")}`;
}

export function createWatchingList(
  container: HTMLElement,
  onPick: (camId: string) => void,
  onClearFilters: () => void,
) {
  const header = document.createElement("header");
  header.className = "watching__header";
  const title = document.createElement("h2");
  title.className = "watching__title";
  const lead = document.createElement("p");
  lead.className = "watching__lead";
  const count = document.createElement("p");
  count.className = "watching__count";
  header.append(title, lead, count);

  const empty = document.createElement("div");
  empty.className = "watching__empty";
  const emptyText = document.createElement("p");
  emptyText.className = "watching__empty-text";
  // An empty result caused by filters gets the way out right under the message (SHIG 55, 60).
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "chip watching__empty-action";
  clear.addEventListener("click", onClearFilters);

  const list = document.createElement("ol");
  list.className = "watching__list";

  const rows: Row[] = [];
  let paintedKey = "";

  function paintRow(row: Row, cam: Cam, rank: number, current: boolean, ctx: WatchingContext): void {
    const state = ctx.states.get(cam.id);
    row.rank.textContent = String(rank);
    row.name.textContent = camName(cam.name, ctx.lang);
    row.meta.textContent = metaLabel(cam, ctx);
    row.viewers.textContent = viewersLabel(state?.viewers, ctx.lang);
    if (current) row.root.setAttribute("aria-current", "true");
    else row.root.removeAttribute("aria-current");
  }

  function buildRow(cam: Cam, rank: number, current: boolean, ctx: WatchingContext): Row {
    const root = document.createElement("button");
    root.type = "button";
    root.className = "watching__row";
    root.addEventListener("click", () => onPick(cam.id));

    const rankEl = document.createElement("span");
    rankEl.className = "watching__rank";
    const body = document.createElement("span");
    body.className = "watching__body";
    const name = document.createElement("span");
    name.className = "watching__name";
    const meta = document.createElement("span");
    meta.className = "watching__meta";
    body.append(name, meta);
    const viewers = document.createElement("span");
    viewers.className = "watching__viewers";

    root.append(rankEl, body, viewers);
    const row: Row = { camId: cam.id, root, rank: rankEl, name, meta, viewers };
    paintRow(row, cam, rank, current, ctx);
    return row;
  }

  return {
    update(ranked: readonly Cam[], selected: readonly string[], ctx: WatchingContext): void {
      const scrollTop = container.scrollTop;
      container.setAttribute("aria-label", t("watching", ctx.lang));
      title.textContent = t("watchingTitle", ctx.lang);
      lead.textContent = t("watchingLead", ctx.lang);
      count.textContent = `${ranked.length} ${t("places", ctx.lang)}`;

      if (ranked.length === 0) {
        emptyText.textContent = emptyMessage(ctx);
        clear.textContent = t("clearFilters", ctx.lang);
        if (ctx.ready === "ready" && ctx.filtered) empty.replaceChildren(emptyText, clear);
        else empty.replaceChildren(emptyText);
        container.replaceChildren(header, empty);
        rows.length = 0;
        paintedKey = "";
        list.replaceChildren();
        return;
      }

      const key = rankedKey(ranked, ctx.lang);
      const currentId = selected[0];

      if (key === paintedKey && rows.length === ranked.length) {
        ranked.forEach((cam, index) => {
          const row = rows[index];
          if (row === undefined) return;
          paintRow(row, cam, index + 1, cam.id === currentId, ctx);
        });
        container.scrollTop = scrollTop;
        return;
      }

      rows.length = 0;
      list.replaceChildren();
      ranked.forEach((cam, index) => {
        const row = buildRow(cam, index + 1, cam.id === currentId, ctx);
        rows.push(row);
        const item = document.createElement("li");
        item.className = "watching__item";
        item.append(row.root);
        list.append(item);
      });
      paintedKey = key;
      container.replaceChildren(header, list);
      container.scrollTop = scrollTop;
    },

    teardown(): void {
      rows.length = 0;
      paintedKey = "";
      list.replaceChildren();
      container.replaceChildren();
    },
  };
}
