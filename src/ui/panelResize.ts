// 右パネルの幅ハンドル。iframe は触らない(付け外しすると配信が繋ぎ直される)。

import {
  PANEL_WIDTH_DEFAULT,
  PANEL_WIDTH_MAX,
  PANEL_WIDTH_MIN,
  clampPanelWidth,
  encodePanelWidth,
  parsePanelWidth,
} from "../domain/panelWidth";
import type { Lang } from "../domain/weather";
import { t } from "./i18n";

const STEP_PX = 16;

export interface PanelResizeOptions {
  app: HTMLElement;
  panel: HTMLElement;
  lang: Lang;
  stored: string | null;
  onChange: (encoded: string) => void;
  onLayout: () => void;
}

export interface PanelResizeHandle {
  setLang(lang: Lang): void;
}

export function attachPanelResize({
  app,
  panel,
  lang,
  stored,
  onChange,
  onLayout,
}: PanelResizeOptions): PanelResizeHandle {
  const parsed = parsePanelWidth(stored);
  let preferred = parsed ?? PANEL_WIDTH_DEFAULT;
  let currentLang = lang;
  let dragging: { pointerId: number; startX: number; startWidth: number } | null = null;
  let layoutFrame = 0;

  const handle = document.createElement("div");
  handle.className = "panel-resize";
  handle.tabIndex = 0;
  handle.setAttribute("role", "separator");
  handle.setAttribute("aria-orientation", "vertical");
  panel.append(handle);

  function bounds(viewportWidth = window.innerWidth): { min: number; max: number } {
    return {
      min: clampPanelWidth(PANEL_WIDTH_MIN, viewportWidth),
      max: clampPanelWidth(PANEL_WIDTH_MAX, viewportWidth),
    };
  }

  function appliedWidth(): number {
    return clampPanelWidth(preferred, window.innerWidth);
  }

  function paintLabels(): void {
    const label = t("resizePanel", currentLang);
    handle.title = label;
    handle.setAttribute("aria-label", label);
  }

  function apply(): number {
    const width = appliedWidth();
    const { min, max } = bounds();
    app.style.setProperty("--panel-w", `${width}px`);
    handle.setAttribute("aria-valuemin", String(min));
    handle.setAttribute("aria-valuemax", String(max));
    handle.setAttribute("aria-valuenow", String(width));
    return width;
  }

  function persist(): void {
    onChange(encodePanelWidth(preferred));
  }

  function requestLayout(): void {
    if (layoutFrame !== 0) return;
    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = 0;
      onLayout();
    });
  }

  function setPreferred(next: number): void {
    preferred = clampPanelWidth(next, window.innerWidth);
    apply();
    requestLayout();
  }

  function endDrag(): void {
    if (dragging === null) return;
    dragging = null;
    document.documentElement.classList.remove("resizing-panel");
    persist();
    onLayout();
  }

  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    handle.focus({ preventScroll: true });
    handle.setPointerCapture(event.pointerId);
    dragging = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startWidth: appliedWidth(),
    };
    document.documentElement.classList.add("resizing-panel");
  });

  handle.addEventListener("pointermove", (event) => {
    if (dragging === null || event.pointerId !== dragging.pointerId) return;
    // 左へ動かすとパネルが広がる(右サイドバーなので)。
    setPreferred(dragging.startWidth + (dragging.startX - event.clientX));
  });

  handle.addEventListener("pointerup", (event) => {
    if (dragging === null || event.pointerId !== dragging.pointerId) return;
    endDrag();
  });

  handle.addEventListener("pointercancel", (event) => {
    if (dragging === null || event.pointerId !== dragging.pointerId) return;
    endDrag();
  });

  handle.addEventListener("lostpointercapture", () => {
    endDrag();
  });

  handle.addEventListener("dblclick", () => {
    setPreferred(PANEL_WIDTH_DEFAULT);
    persist();
  });

  handle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPreferred(appliedWidth() + STEP_PX);
      persist();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPreferred(appliedWidth() - STEP_PX);
      persist();
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPreferred(PANEL_WIDTH_MIN);
      persist();
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setPreferred(PANEL_WIDTH_MAX);
      persist();
      return;
    }
  });

  addEventListener("resize", () => {
    apply();
  });

  paintLabels();
  apply();

  return {
    setLang(next) {
      currentLang = next;
      paintLabels();
    },
  };
}
