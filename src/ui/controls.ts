// The control row of the masthead. Labels say plainly "what happens when pressed".

import { CAM_CATEGORIES, type CamCategory } from "../domain/cams";
import { activeFilterCount } from "../domain/filters";
import { focusWasLost } from "../domain/focus";
import type { LocateFailure } from "../domain/locate";
import type { ViewState } from "../domain/urlState";
import { categoryLabel, t, type StringKey } from "./i18n";

export type LocateStatus = "idle" | "pending" | LocateFailure;

/**
 * The row that the "絞り込み" (Filters) chip opens and closes. The id is fixed so aria-controls can
 * link to it.
 */
const FILTERS_ID = "masthead-filters";

const LOCATE_ERROR_KEY: Record<LocateFailure, StringKey> = {
  denied: "locateDenied",
  unavailable: "locateUnavailable",
  timeout: "locateTimeout",
  unsupported: "locateUnsupported",
};

/** Why "Where I am" failed, in the user's words. */
export function locateFailureMessage(reason: LocateFailure, lang: ViewState["lang"]): string {
  return t(LOCATE_ERROR_KEY[reason], lang);
}

export interface ControlHandlers {
  onChange(patch: Partial<ViewState>): void;
  onRandom(): void;
  onLocate(): void;
  onToggleWall(): void;
  onToggleWatching(): void;
  onToggleFilters(): void;
  onSetGlobe(globe: boolean): void;
  /** Turns every filter off at once (SHIG 60, 22). */
  onClearFilters(): void;
}

const FOCUSABLE = "button, input";

/** A position whose control was disabled when focus should have returned to it. */
const parkedFocus = new WeakMap<HTMLElement, number>();

/**
 * Rebuilds a row of controls. The row is rebuilt on every press (the pressed state and labels
 * change), which used to drop keyboard focus to the top of the page after each chip. The
 * controls keep their order, so focus goes back to the control at the same position (SHIG 94).
 * "Where I am" is disabled while it waits; focus is parked and returns when it is enabled.
 */
function replaceKeepingFocus(row: HTMLElement, build: () => HTMLElement[]): void {
  const before = [...row.querySelectorAll<HTMLElement>(FOCUSABLE)];
  let at = before.indexOf(document.activeElement as HTMLElement);
  const parked = parkedFocus.get(row);
  parkedFocus.delete(row);
  if (at === -1 && parked !== undefined && focusWasLost(document.activeElement, document.body)) {
    at = parked;
  }
  // Built only now: building moves persistent controls (the search box) out of the row.
  row.replaceChildren(...build());
  if (at === -1) return;
  const after = [...row.querySelectorAll<HTMLElement>(FOCUSABLE)];
  // A control that vanished with its own press (clearing the filters hides the clear chip) hands
  // focus to the nearest one before it that is still shown (the filters chip is display: none on
  // wide screens), so keyboard focus stays in the row.
  const shown = (el: HTMLElement): boolean => !el.hidden && getComputedStyle(el).display !== "none";
  const target = after[at]?.hidden ? after.slice(0, at).reverse().find(shown) : after[at];
  if (target === undefined || document.activeElement === target) return;
  if (target.matches(":disabled")) parkedFocus.set(row, at);
  else target.focus({ preventScroll: true });
}

/**
 * A label in two lengths. The full one is the accessible name and shows on wide screens; narrow
 * screens show the short one so the primary row keeps its 3 lines and the map does not shrink
 * when a chip appears (SHIG 85). CSS picks which span is visible (.chip__long / .chip__short).
 */
function setTwoLengthLabel(button: HTMLButtonElement, long: string, short: string): void {
  let longEl = button.querySelector<HTMLElement>(".chip__long");
  let shortEl = button.querySelector<HTMLElement>(".chip__short");
  if (longEl === null || shortEl === null) {
    longEl = document.createElement("span");
    longEl.className = "chip__long";
    shortEl = document.createElement("span");
    shortEl.className = "chip__short";
    shortEl.setAttribute("aria-hidden", "true");
    button.replaceChildren(longEl, shortEl);
  }
  longEl.textContent = long;
  shortEl.textContent = short;
  button.setAttribute("aria-label", long);
}

function chip(
  label: string,
  pressed: boolean,
  onClick: () => void,
  title?: string,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  button.setAttribute("aria-pressed", String(pressed));
  if (title !== undefined) {
    button.title = title;
    button.setAttribute("aria-label", `${label}. ${title}`);
  }
  button.addEventListener("click", onClick);
  return button;
}

function group(...children: readonly HTMLElement[]): HTMLElement {
  const el = document.createElement("div");
  el.className = "controls__group";
  el.append(...children);
  return el;
}

function row(className: string, ...children: readonly HTMLElement[]): HTMLElement {
  const el = document.createElement("div");
  el.className = className;
  el.append(...children);
  return el;
}

export function createControls(container: HTMLElement, handlers: ControlHandlers) {
  // Only the search field is not rebuilt; the first one keeps being used.
  //
  // Before, it was rebuilt on every redraw. Each typed character goes onChange -> redraw, so the
  // input field of the person typing disappeared from the DOM every time and was swapped for
  // another one (measured: after typing 3 characters the first element is isConnected: false). A
  // trick that re-focused it covered up Latin letters, but input that involves conversion gets
  // committed midway. This masthead is also redrawn by the clock every 1 minute and the liveness
  // state every 2 minutes, so being interrupted while typing is not the exception but the everyday
  // case.
  const search = document.createElement("input");
  search.type = "search";
  search.className = "search";
  search.addEventListener("input", () => handlers.onChange({ query: search.value }));

  // The way out of any filter (SHIG 60, 22). It sits in the primary row beside the "絞り込み N"
  // chip: on a narrow screen that row stays visible while the filter row is collapsed, and on a
  // wide screen the filter row is full and a chip appearing there wrapped it onto a third line,
  // pushing the map down on every toggle (SHIG 85). Built once, like the search box, and shown
  // with hidden: typing the first character makes it appear, and rebuilding the filter row at that
  // moment would detach the box mid-composition.
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "chip chip--clear chip--two-lengths";
  clear.addEventListener("click", handlers.onClearFilters);

  const primaryRow = row("masthead__primary");
  const filtersRow = row("masthead__filters");
  filtersRow.id = FILTERS_ID;
  container.append(primaryRow, filtersRow);

  // A row whose content has not changed is not rebuilt. Rebuilding makes focus jump.
  let primaryKey: string | null = null;
  let filtersKey: string | null = null;

  return {
    update(
      state: ViewState,
      wallOpen: boolean,
      locateStatus: LocateStatus,
      filtersOpen: boolean,
    ): void {
      const { lang } = state;

      const placeholder = t("search", lang);
      if (search.placeholder !== placeholder) {
        search.placeholder = placeholder;
        search.setAttribute("aria-label", placeholder);
      }
      // Writing back the same value while typing makes the cursor jump to the end.
      if (search.value !== state.query) search.value = state.query;

      const active = activeFilterCount(state);
      setTwoLengthLabel(clear, t("clearFilters", lang), t("clearFiltersShort", lang));

      const mapOpen = !wallOpen && !state.watching && !state.globe;
      const globeOpen = !wallOpen && !state.watching && state.globe;
      const watchingOpen = !wallOpen && state.watching;

      const nextPrimaryKey = [
        lang,
        locateStatus,
        mapOpen,
        globeOpen,
        wallOpen,
        watchingOpen,
        filtersOpen,
        active,
      ].join("\u0000");

      const nextFiltersKey = [
        lang,
        state.categories.join(","),
        state.liveOnly,
        state.nightOnly,
        state.favoritesOnly,
        state.broadcasts,
      ].join("\u0000");

      if (nextPrimaryKey === primaryKey && nextFiltersKey === filtersKey) return;

      const categories = CAM_CATEGORIES.map((category) =>
        chip(categoryLabel(category, lang), state.categories.includes(category), () => {
          const next = state.categories.includes(category)
            ? state.categories.filter((c) => c !== category)
            : [...state.categories, category];
          handlers.onChange({ categories: next as CamCategory[] });
        }),
      );

      const flags = [
        chip(t("liveOnly", lang), state.liveOnly, () =>
          handlers.onChange({ liveOnly: !state.liveOnly }),
        ),
        chip(t("nightOnly", lang), state.nightOnly, () =>
          handlers.onChange({ nightOnly: !state.nightOnly }),
        ),
        chip(t("favoritesOnly", lang), state.favoritesOnly, () =>
          handlers.onChange({ favoritesOnly: !state.favoritesOnly }),
        ),
        // Hidden by default, so the chip says what comes back when it is pressed.
        chip(
          t("showBroadcasts", lang),
          state.broadcasts,
          () => handlers.onChange({ broadcasts: !state.broadcasts }),
          t("showBroadcastsHint", lang),
        ),
      ];

      const random = document.createElement("button");
      random.type = "button";
      random.className = "chip";
      random.textContent = t("takeMeSomewhere", lang);
      random.addEventListener("click", handlers.onRandom);

      const locateLabel =
        locateStatus === "pending" ? t("locatePending", lang) : t("locate", lang);
      const locate = document.createElement("button");
      locate.type = "button";
      locate.className = "chip";
      locate.textContent = locateLabel;
      locate.disabled = locateStatus === "pending";
      locate.setAttribute("aria-label", locateLabel);
      if (locateStatus === "pending") locate.setAttribute("aria-busy", "true");
      // The failure itself is announced by the notice over the stage (app.ts). The label keeps
      // the reason for anyone who lands on the button later.
      if (locateStatus !== "idle" && locateStatus !== "pending") {
        const detail = locateFailureMessage(locateStatus, lang);
        locate.title = detail;
        locate.setAttribute("aria-label", `${t("locate", lang)}. ${detail}`);
      }
      locate.addEventListener("click", handlers.onLocate);

      const flatMap = chip(t("flatMap", lang), mapOpen, () => handlers.onSetGlobe(false));
      const globe = chip(t("globe", lang), globeOpen, () => handlers.onSetGlobe(true));
      const wall = chip(t(wallOpen ? "backToMap" : "wall", lang), wallOpen, handlers.onToggleWall);
      const watching = chip(t("watching", lang), watchingOpen, handlers.onToggleWatching);

      // Named after where it goes, in that language: "JA / EN" said neither which one is on
      // nor which one a press would give (SHIG 49, 71).
      const nextLang = lang === "ja" ? "en" : "ja";
      const langToggle = chip("", false, () => handlers.onChange({ lang: nextLang }));
      langToggle.classList.add("chip--two-lengths");
      setTwoLengthLabel(langToggle, t("switchLang", lang), t("switchLangShort", lang));
      langToggle.removeAttribute("aria-pressed");
      langToggle.lang = nextLang;

      // On narrow screens, let the row of search, categories and flags collapse (if always open,
      // both rows of the masthead become horizontal scrolls and nobody can see which features
      // exist). On wide screens CSS hides this chip and the row stays open.
      const filtersToggle = chip(
        active === 0 ? t("filters", lang) : `${t("filters", lang)} ${active}`,
        filtersOpen,
        handlers.onToggleFilters,
      );
      filtersToggle.classList.add("chip--filters");
      filtersToggle.removeAttribute("aria-pressed");
      filtersToggle.setAttribute("aria-expanded", String(filtersOpen));
      filtersToggle.setAttribute("aria-controls", FILTERS_ID);

      if (nextPrimaryKey !== primaryKey) {
        primaryKey = nextPrimaryKey;
        replaceKeepingFocus(primaryRow, () => {
          // Hidden only here, after the focus position was read: Chrome blurs a focused element
          // the moment it gets hidden (measured), and read afterwards the row would find nothing
          // to hand focus back from. The chip's state changes only with `active`, which is in the
          // key, so this build runs every time it needs to change.
          clear.hidden = active === 0;
          return [
            group(random, locate, flatMap, globe, wall, watching),
            group(filtersToggle, clear, langToggle),
          ];
        });
      }

      if (nextFiltersKey !== filtersKey) {
        filtersKey = nextFiltersKey;
        replaceKeepingFocus(filtersRow, () => [
          group(search),
          group(...categories),
          group(...flags),
        ]);
      }
    },
  };
}
