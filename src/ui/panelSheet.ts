// The panel that comes up from the bottom on narrow portrait screens.
//
// On screens with no room to place things side by side, the panel was a lodger that always
// occupied the lower half of the map. Even with nothing selected, the empty message
// "まだ何も選んでいません" (Nothing selected yet) took half the screen, and the stream-count
// badge sat on top of the remaining 46dvh of map = the map actually visible was only
// one third of the screen (measured 390x290).
//
// So the map gets the whole stage, and the panel is laid over it and only changes its height.
// It has 3 perches:
//   peek ... only the grip and the name of the lead camera. The map is almost full screen
//   half ... the video and the controls fit
//   full ... read as far as the description of the place
//
// Like the width handle (panelResize.ts), it never touches the iframe. Detaching and
// re-attaching it makes the stream reconnect, so only the height moves.

import type { Lang } from "../domain/weather";
import { t } from "./i18n";

export type SheetStop = "peek" | "half" | "full";

/** Height of half. Video (16:9), title and reading fit, and nearly half the map remains. */
const HALF_OF_STAGE = 0.56;
/** Where the sheet settles when the grip is grabbed and released. Ratio of the stage height. */
const SNAP_TO_HALF_ABOVE = 0.18;
const SNAP_TO_FULL_ABOVE = 0.82;
/** Movement at or below this counts as a "press", not a "grab". */
const TAP_SLOP_PX = 6;

export interface PanelSheetOptions {
  app: HTMLElement;
  stage: HTMLElement;
  panel: HTMLElement;
  scroll: HTMLElement;
  lang: Lang;
}

export interface PanelSheetHandle {
  setLang(lang: Lang): void;
  /**
   * The one line shown on the grip. The lead camera's name, or an invitation when nothing is
   * selected yet.
   */
  setLabel(text: string): void;
  /** Raises to half only while collapsed. Does nothing if already raised. */
  raise(): void;
  /** Collapses when the lead camera is gone. */
  lower(): void;
  /** Height (px) of the map's bottom edge covered by the panel. 0 when laid out side by side. */
  obscuredBottom(): number;
}

export function attachPanelSheet({
  app,
  stage,
  panel,
  scroll,
  lang,
}: PanelSheetOptions): PanelSheetHandle {
  let currentLang = lang;
  let stop: SheetStop = "peek";
  let drag: { pointerId: number; startY: number; startHeight: number; moved: boolean } | null = null;
  let suppressClick = false;

  const grip = document.createElement("button");
  grip.type = "button";
  grip.className = "panel-grip";

  const bar = document.createElement("span");
  bar.className = "panel-grip__bar";
  bar.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "panel-grip__label";

  grip.append(bar, label);
  panel.prepend(grip);

  /** CSS decides whether this screen behaves as a sheet (--sheet). */
  function active(): boolean {
    return getComputedStyle(app).getPropertyValue("--sheet").trim() === "1";
  }

  function paintLabels(): void {
    const action = t(stop === "peek" ? "sheetExpand" : "sheetCollapse", currentLang);
    grip.title = action;
    grip.setAttribute("aria-label", `${action} — ${label.textContent ?? ""}`);
    grip.setAttribute("aria-expanded", String(stop !== "peek"));
  }

  /**
   * JS decides the perch heights and writes them in px.
   *
   * If CSS defines peek/half/full and the height is picked up by measuring, the raise/lower
   * transition is interpolated, so what comes back is "the height that has not moved yet",
   * not "the height it is heading to". The map is panned right after a selection, so
   * offsetting the target by that value sinks the pin behind the fully raised panel
   * (measured: 28px where the offset should have been 201px).
   */
  function heightFor(next: SheetStop): number {
    if (next === "peek") {
      // Collapsed height = grip + bottom safe area. The safe area is env(), so JS cannot
      // read it, but the px already resolved as the panel's bottom padding can be borrowed.
      const safe = Number.parseFloat(getComputedStyle(panel).paddingBottom) || 0;
      return grip.offsetHeight + safe;
    }
    const stageHeight = stage.clientHeight;
    return Math.round(next === "full" ? stageHeight : stageHeight * HALF_OF_STAGE);
  }

  function apply(): void {
    app.dataset["sheet"] = stop;
    // The grip shrinks to just the bar when raised. Settle the appearance before measuring height.
    app.style.setProperty("--sheet-h", `${heightFor(stop)}px`);
    // While collapsed, keep the content untouchable. If fingers and screen readers reach
    // content that is not visible, the user cannot tell what they are touching.
    scroll.inert = active() && stop === "peek";
    paintLabels();
  }

  function setStop(next: SheetStop): void {
    stop = next;
    apply();
  }

  function stopFor(height: number): SheetStop {
    const ratio = height / Math.max(1, stage.clientHeight);
    if (ratio < SNAP_TO_HALF_ABOVE) return "peek";
    if (ratio < SNAP_TO_FULL_ABOVE) return "half";
    return "full";
  }

  function endDrag(): void {
    if (drag === null) return;
    const height = panel.offsetHeight;
    const moved = drag.moved;
    drag = null;
    document.documentElement.classList.remove("dragging-sheet");
    suppressClick = moved;
    setStop(moved ? stopFor(height) : stop);
  }

  grip.addEventListener("pointerdown", (event) => {
    if (!active() || event.button !== 0) return;
    // The click from a grab-and-move is discarded, but that click may never arrive
    // (it does not fire when the finger is released outside the grip). Unless the discard
    // flag is always reset at the next grab, the following 1 click silently stops working.
    suppressClick = false;
    grip.setPointerCapture(event.pointerId);
    drag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startHeight: panel.offsetHeight,
      moved: false,
    };
  });

  grip.addEventListener("pointermove", (event) => {
    if (drag === null || event.pointerId !== drag.pointerId) return;
    const delta = drag.startY - event.clientY;
    if (!drag.moved) {
      if (Math.abs(delta) < TAP_SLOP_PX) return;
      drag.moved = true;
      document.documentElement.classList.add("dragging-sheet");
    }
    const height = Math.min(
      stage.clientHeight,
      Math.max(grip.offsetHeight, drag.startHeight + delta),
    );
    app.style.setProperty("--sheet-h", `${height}px`);
  });

  grip.addEventListener("pointerup", endDrag);
  grip.addEventListener("pointercancel", endDrag);
  grip.addEventListener("lostpointercapture", endDrag);

  grip.addEventListener("click", () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    setStop(stop === "peek" ? "half" : "peek");
  });

  grip.addEventListener("keydown", (event) => {
    const order: SheetStop[] = ["peek", "half", "full"];
    const at = order.indexOf(stop);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setStop(order[Math.min(order.length - 1, at + 1)] ?? stop);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setStop(order[Math.max(0, at - 1)] ?? stop);
    }
  });

  // When the screen rotates, the stage that half / full heights are based on changes.
  addEventListener("resize", () => {
    if (drag === null) apply();
  });

  apply();

  return {
    setLang(next) {
      currentLang = next;
      paintLabels();
    },
    setLabel(text) {
      if (label.textContent === text) return;
      label.textContent = text;
      paintLabels();
    },
    raise() {
      if (stop === "peek") setStop("half");
    },
    lower() {
      if (stop !== "peek") setStop("peek");
    },
    obscuredBottom() {
      return active() ? heightFor(stop) : 0;
    },
  };
}
