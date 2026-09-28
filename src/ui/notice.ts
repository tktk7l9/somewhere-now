// One line of feedback laid over the top of the stage, with at most one action.
//
// Used where an action would otherwise end in silence: a camera closed (with undo), the
// location lookup failing, "Take me somewhere" with nothing to pick (SHIG 54, 55, 57, 58).
// It is a live region, so screen readers hear it too (SHIG 94). It never takes focus and
// never blocks the map; it fades out by itself, but not while the pointer or focus is on it.

import type { Lang } from "../domain/weather";
import { t } from "./i18n";

/** Long enough to read the line and reach the undo button. */
const VISIBLE_MS = 8_000;

export interface NoticeAction {
  label: string;
  run(): void;
}

export interface NoticeHandle {
  show(message: string, lang: Lang, action?: NoticeAction): void;
  hide(): void;
}

export function createNotice(host: HTMLElement): NoticeHandle {
  const root = document.createElement("div");
  root.className = "notice";
  root.hidden = true;

  // The live region itself stays in the DOM, so the text change is announced.
  const live = document.createElement("div");
  live.className = "notice__body";
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");

  const text = document.createElement("span");
  text.className = "notice__text";
  live.append(text);

  const actionSlot = document.createElement("span");
  actionSlot.className = "notice__actions";

  root.append(live, actionSlot);
  host.append(root);

  let timer: number | null = null;
  let held = false;

  const clear = (): void => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };

  const schedule = (): void => {
    clear();
    timer = window.setTimeout(() => {
      timer = null;
      if (!held) hide();
    }, VISIBLE_MS);
  };

  function hide(): void {
    clear();
    held = false;
    root.hidden = true;
    text.textContent = "";
    actionSlot.replaceChildren();
  }

  const hold = (): void => {
    held = true;
    clear();
  };
  const release = (): void => {
    held = false;
    if (!root.hidden) schedule();
  };
  root.addEventListener("pointerenter", hold);
  root.addEventListener("pointerleave", release);
  root.addEventListener("focusin", hold);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) release();
  });

  return {
    show(message, lang, action) {
      text.textContent = message;
      const buttons: HTMLButtonElement[] = [];
      if (action) {
        const run = document.createElement("button");
        run.type = "button";
        run.className = "chip notice__action";
        run.textContent = action.label;
        run.addEventListener("click", () => {
          hide();
          action.run();
        });
        buttons.push(run);
      }
      const dismiss = document.createElement("button");
      dismiss.type = "button";
      dismiss.className = "notice__dismiss";
      dismiss.textContent = "×";
      dismiss.setAttribute("aria-label", t("dismiss", lang));
      dismiss.addEventListener("click", hide);
      buttons.push(dismiss);
      actionSlot.replaceChildren(...buttons);
      root.hidden = false;
      if (!held) schedule();
    },
    hide,
  };
}
