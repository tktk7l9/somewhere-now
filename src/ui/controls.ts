// 見出しの操作列。ラベルは「押すと何が起きるか」をそのまま書く。

import { CAM_CATEGORIES, type CamCategory } from "../domain/cams";
import type { LocateFailure } from "../domain/locate";
import type { ViewState } from "../domain/urlState";
import { categoryLabel, t, type StringKey } from "./i18n";

export type LocateStatus = "idle" | "pending" | LocateFailure;

const LOCATE_ERROR_KEY: Record<LocateFailure, StringKey> = {
  denied: "locateDenied",
  unavailable: "locateUnavailable",
  timeout: "locateTimeout",
  unsupported: "locateUnsupported",
};

export interface ControlHandlers {
  onChange(patch: Partial<ViewState>): void;
  onRandom(): void;
  onLocate(): void;
  onToggleWall(): void;
  onSetGlobe(globe: boolean): void;
}

function chip(label: string, pressed: boolean, onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  button.setAttribute("aria-pressed", String(pressed));
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
  return {
    update(state: ViewState, wallOpen: boolean, locateStatus: LocateStatus): void {
      const { lang } = state;

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
      ];

      const search = document.createElement("input");
      search.type = "search";
      search.className = "search";
      search.placeholder = t("search", lang);
      search.value = state.query;
      search.setAttribute("aria-label", t("search", lang));
      search.addEventListener("input", () => handlers.onChange({ query: search.value }));

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
      locate.setAttribute("aria-live", "polite");
      locate.setAttribute("aria-label", locateLabel);
      if (locateStatus === "pending") locate.setAttribute("aria-busy", "true");
      if (locateStatus !== "idle" && locateStatus !== "pending") {
        const detail = t(LOCATE_ERROR_KEY[locateStatus], lang);
        locate.title = detail;
        locate.setAttribute("aria-label", `${t("locate", lang)}. ${detail}`);
      }
      locate.addEventListener("click", handlers.onLocate);

      const flatMap = chip(
        t("flatMap", lang),
        !wallOpen && !state.globe,
        () => handlers.onSetGlobe(false),
      );
      const globe = chip(
        t("globe", lang),
        !wallOpen && state.globe,
        () => handlers.onSetGlobe(true),
      );
      const wall = chip(t(wallOpen ? "backToMap" : "wall", lang), wallOpen, handlers.onToggleWall);

      const langToggle = chip("JA / EN", false, () =>
        handlers.onChange({ lang: lang === "ja" ? "en" : "ja" }),
      );
      langToggle.removeAttribute("aria-pressed");

      container.replaceChildren(
        row(
          "masthead__primary",
          group(random, locate, flatMap, globe, wall),
          group(langToggle),
        ),
        row(
          "masthead__filters",
          group(search),
          group(...categories),
          group(...flags),
        ),
      );

      // 入力中に再描画が挟まってもカーソルが飛ばないようにする。
      if (document.activeElement === document.body && state.query !== "") {
        search.focus();
        search.setSelectionRange(state.query.length, state.query.length);
      }
    },
  };
}
