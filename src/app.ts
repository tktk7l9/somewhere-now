// Assembly of the whole screen.
//
// There are only 3 pieces of state:
//   ViewState  … carried in the URL (open cameras, filters, language)
//   states     … liveness state coming from the Worker
//   favorites / panel-width … localStorage
// Everything else (whether it is night now, local time) is derived from now every minute.

import { filterCams, pickRandom, rankLiveByViewers, type Cam, type PublicCamState } from "./domain/cams";
import { decodeFavorites, encodeFavorites, toggleFavorite } from "./domain/favorites";
import { activeFilterCount, clearedFilters, emptyPickReason } from "./domain/filters";
import { nearestCam, requestLocation, viewportForLocation } from "./domain/locate";
import { isNightAt } from "./domain/terminator";
import { MAX_VIEW, parseUrlState, toSearchString, type ViewState } from "./domain/urlState";
import { closeCam, reopenCam } from "./domain/viewEdit";
import { fetchCamStates, fetchCams } from "./api/client";
import { createControls, locateFailureMessage, type LocateStatus } from "./ui/controls";
import { camName, closedNotice, liveDialCaption, t } from "./ui/i18n";
import { createNotice } from "./ui/notice";
import type { GlobeView } from "./ui/globe";
import { createMapView } from "./ui/map";
import { mountPinLegend } from "./ui/pin";
import { createPanel } from "./ui/panel";
import { attachPanelResize } from "./ui/panelResize";
import { attachPanelSheet, type PanelSheetHandle } from "./ui/panelSheet";
import { createWall } from "./ui/wall";
import { createWatchingList } from "./ui/watching";

const FAVORITES_KEY = "somewhere-now:favorites";
const SOUND_KEY = "somewhere-now:sound";
const PANEL_WIDTH_KEY = "somewhere-now:panel-width";
/**
 * Polling interval for the liveness state. The Worker updates every 10 minutes, so 2
 * minutes keeps up well enough. The response carries an ETag, so in the 4 out of 5 times
 * nothing changed, no body is sent (the browser adds If-None-Match and receives 304).
 */
const STATE_POLL_MS = 120_000;
/** Recalculation of local time and day/night. */
const TICK_MS = 60_000;

function readFavorites(): string[] {
  try {
    return decodeFavorites(localStorage.getItem(FAVORITES_KEY));
  } catch {
    return [];
  }
}

function writeFavorites(ids: readonly string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, encodeFavorites(ids));
  } catch {
    // Even if it cannot be written, e.g. in private browsing, giving up for that one time is enough.
  }
}

/** localStorage may be unavailable, so failures are swallowed for both reads and writes. */
function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Even if it cannot be saved, the experience of that session does not break.
  }
}

/**
 * A repetition that runs only while the tab is in the foreground.
 *
 * If a background tab left open keeps fetching the liveness state (144KB) every 2 minutes,
 * it becomes 700 requests and 100MB a day although nobody is watching. Redrawing an
 * invisible map is the same; neither is of any use. Unbounded polling has taken the
 * hosting down in the past, so whatever can be stopped is stopped.
 *
 * On returning to the foreground, run once without waiting for the interval to catch up.
 */
function everyWhileVisible(intervalMs: number, run: () => void): void {
  let timer: number | null = null;

  const start = (): void => {
    if (timer === null) timer = window.setInterval(run, intervalMs);
  };
  const stop = (): void => {
    if (timer === null) return;
    clearInterval(timer);
    timer = null;
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
      return;
    }
    run();
    start();
  });

  if (!document.hidden) start();
}

export function startApp(root: HTMLElement): void {
  const mapEl = root.querySelector<HTMLElement>("#map")!;
  const globeEl = root.querySelector<HTMLElement>("#globe")!;
  const stageEl = root.querySelector<HTMLElement>(".stage")!;
  const panelEl = root.querySelector<HTMLElement>("#panel")!;
  const controlsEl = root.querySelector<HTMLElement>("#controls")!;
  const wallEl = root.querySelector<HTMLElement>("#wall")!;
  const watchingEl = root.querySelector<HTMLElement>("#watching")!;
  const dialEl = root.querySelector<HTMLElement>("#dial")!;
  const notesEl = root.querySelector<HTMLElement>("#notes")!;
  const legendEl = root.querySelector<HTMLElement>("#legend")!;
  const notice = createNotice(stageEl);
  // The tab is named after the lead camera; with nothing open it returns to this.
  const baseTitle = document.title;

  // The master arrives later as JSON. The map is built without waiting for it (waiting
  // delays LCP by that much). Pins are placed when it arrives.
  let cams: readonly Cam[] = [];
  let byId = new Map<string, Cam>();

  let view: ViewState = parseUrlState(location.search);
  let states: ReadonlyMap<string, PublicCamState> = new Map();
  let favorites = readFavorites();
  let wallOpen = false;
  let now = new Date();
  let nightIds = new Set<string>();
  // No sound by default. The app is opened between tasks at work, so sounding the moment
  // something is pressed is an accident.
  let soundOn = readStored(SOUND_KEY) === "on";
  let locateStatus: LocateStatus = "idle";
  let statesReady: "loading" | "unavailable" | "ready" = "loading";
  // Whether the filter row is open. Meaningful only on narrow screens (on wide screens CSS
  // always shows it open). Not carried in the URL — it is not state to share, but a local convenience.
  let filtersOpen = false;

  function recomputeNight(): void {
    nightIds = new Set(cams.filter((cam) => isNightAt(now, cam)).map((cam) => cam.id));
  }
  recomputeNight();

  const visibleCams = (): Cam[] =>
    filterCams(cams, { states, nightIds, favoriteIds: new Set(favorites) }, view);

  const openCams = (): Cam[] =>
    view.view.map((id) => byId.get(id)).filter((cam): cam is Cam => cam !== undefined);

  function selectCam(camId: string): void {
    // A marker toggles open/closed. The newly opened one comes first (the side that plays sound).
    // Closing goes the same way as the panel's "閉じる": at once, with undo (SHIG 6, 54).
    if (view.view.includes(camId)) {
      closeWithUndo(camId);
      return;
    }
    update({ view: [camId, ...view.view].slice(0, MAX_VIEW) });
    const cam = byId.get(camId);
    if (cam) focusCam(cam);
  }

  /** Pick from the list. If already open, raise it to the front; if closed, open it. Does not toggle. */
  function pickFromList(camId: string): void {
    if (view.view[0] === camId) return;
    update({ view: [camId, ...view.view.filter((id) => id !== camId)].slice(0, MAX_VIEW) });
  }

  function focusOpenCam(): void {
    const cam = openCams()[0];
    if (cam) focusCam(cam);
  }

  // The panel that rises from the bottom covers the bottom edge of the map. When focusing,
  // the target must be raised by that much, or the chosen pin stays hidden behind the panel.
  // The sheet is created after the panel, so the covered height is read at call time.
  let sheet: PanelSheetHandle | null = null;
  const obscuredBottom = (): number => sheet?.obscuredBottom() ?? 0;

  const mapView = createMapView(mapEl, cams, view.lang, selectCam, obscuredBottom);

  let globeView: GlobeView | null = null;
  let globeReady: Promise<void> | null = null;

  function applyGlobe(): void {
    if (globeView === null) return;
    globeView.setStates(states);
    globeView.setVisible(visibleCams());
    globeView.setSelected(view.view);
    globeView.setLang(view.lang);
    globeView.drawTerminator(now);
    globeView.invalidate();
  }

  function paintGlobeNotice(key: "globeLoading" | "globeUnsupported"): void {
    const message = document.createElement("p");
    message.className = "globe__unsupported";
    message.textContent = t(key, view.lang);
    globeEl.replaceChildren(message);
  }

  function ensureGlobe(): Promise<void> {
    if (globeView === null && globeEl.childElementCount === 0) {
      paintGlobeNotice("globeLoading");
    }
    globeReady ??= import("./ui/globe")
      .then(({ createGlobeView, createUnsupportedView }) =>
        createGlobeView(globeEl, cams, view.lang, selectCam, obscuredBottom).catch(() =>
          createUnsupportedView(globeEl, view.lang),
        ),
      )
      .then((view) => {
        globeView = view;
      })
      .catch(() => {
        paintGlobeNotice("globeUnsupported");
      });
    return globeReady.then(applyGlobe);
  }

  function focusCam(cam: Cam): void {
    if (view.globe) void ensureGlobe().then(() => globeView?.focus(cam));
    else mapView.focus(cam);
  }

  function goToViewport(lat: number, lng: number, zoom: number): void {
    const leavingWall = wallOpen;
    if (leavingWall) {
      wallOpen = false;
      wall.teardown();
    }
    if (view.watching) update({ watching: false });
    else if (leavingWall) render();
    const viewport = { center: [lat, lng] as [number, number], zoom };
    mapView.goTo(viewport);
    if (view.globe) void ensureGlobe().then(() => globeView?.goTo(viewport));
  }

  async function locateHere(): Promise<void> {
    if (locateStatus === "pending") return;
    locateStatus = "pending";
    render();
    const locator =
      typeof navigator === "undefined" ? undefined : navigator.geolocation;
    const result = await requestLocation(locator);
    if (!result.ok) {
      locateStatus = result.reason;
      // Before, the reason lived only in the button's title, so a failure looked like nothing
      // happened (SHIG 55, 66).
      notice.show(locateFailureMessage(result.reason, view.lang), view.lang);
      render();
      return;
    }
    const viewport = viewportForLocation(
      result.position.lat,
      result.position.lng,
      result.position.accuracy,
    );
    if (viewport === null) {
      locateStatus = "unavailable";
      notice.show(locateFailureMessage("unavailable", view.lang), view.lang);
      render();
      return;
    }
    locateStatus = "idle";
    // Just moving there shows nothing, so open one nearby that is actually streaming.
    // The map stays on the current location, as the name "いまいる場所へ" (Where I am) says
    // (flying to the camera would leave the person who pressed it unsure where they are).
    // Filters are respected — someone looking only at nature is not taken to the next town.
    const nearest = nearestCam(visibleCams(), states, result.position);
    if (nearest === null) render();
    else {
      const rest = view.view.filter((id) => id !== nearest.id);
      update({ view: [nearest.id, ...rest].slice(0, MAX_VIEW) });
    }
    goToViewport(viewport.center[0], viewport.center[1], viewport.zoom);
  }

  // When the player says "cannot be embedded", drop the mark without waiting for the next
  // server-side check. The same notice arrives many times, so redraw only when the state
  // changes (otherwise it becomes a cycle of error→redraw→reload→error).
  function markUnplayable(camId: string): void {
    if (states.get(camId)?.status === "blocked") return;
    const next = new Map(states);
    const prior = next.get(camId);
    next.set(camId, {
      videoId: prior?.videoId ?? null,
      status: "blocked",
      viewers: null,
    });
    states = next;
    render();
  }

  const panel = createPanel(panelEl, {
    onToggleSound: toggleSound,
    onToggleFavorite(camId) {
      favorites = toggleFavorite(favorites, camId);
      writeFavorites(favorites);
      render();
    },
    onClose: closeWithUndo,
    onFocus(camId) {
      update({ view: [camId, ...view.view.filter((id) => id !== camId)] });
      const cam = byId.get(camId);
      if (cam) focusCam(cam);
    },
    onUnplayable: markUnplayable,
    onClearFilters: clearFilters,
  });

  const panelResize = attachPanelResize({
    app: root,
    panel: panelEl,
    lang: view.lang,
    stored: readStored(PANEL_WIDTH_KEY),
    onChange(encoded) {
      writeStored(PANEL_WIDTH_KEY, encoded);
    },
    onLayout() {
      mapView.invalidate();
      globeView?.invalidate();
    },
  });

  sheet = attachPanelSheet({
    app: root,
    stage: stageEl,
    panel: panelEl,
    scroll: panel.scroll,
    lang: view.lang,
  });

  const wall = createWall(wallEl, {
    onUnplayable: markUnplayable,
    onBackToMap() {
      wallOpen = false;
      wall.teardown();
      render();
    },
    onClose: closeWithUndo,
    onToggleSound: toggleSound,
  });
  const watchingList = createWatchingList(watchingEl, pickFromList, clearFilters);

  /**
   * Closing happens at once (no confirm) and the notice offers to take it back: a mis-tap
   * otherwise costs the search that found the camera (SHIG 54, 57).
   */
  function closeWithUndo(camId: string): void {
    const { view: next, closed } = closeCam(view.view, camId);
    if (closed === null) return;
    update({ view: next });
    const cam = byId.get(camId);
    notice.show(closedNotice(cam ? camName(cam.name, view.lang) : camId, view.lang), view.lang, {
      label: t("undo", view.lang),
      run() {
        update({ view: reopenCam(view.view, closed, MAX_VIEW) });
      },
    });
  }

  function clearFilters(): void {
    notice.hide();
    update(clearedFilters());
  }

  function toggleSound(): void {
    soundOn = !soundOn;
    writeStored(SOUND_KEY, soundOn ? "on" : "off");
    render();
  }

  const controls = createControls(controlsEl, {
    onChange(patch) {
      update(patch);
    },
    onRandom() {
      const live = visibleCams().filter((cam) => states.get(cam.id)?.status === "live");
      const pool = live.length > 0 ? live : visibleCams();
      const cam = pickRandom(pool, Math.random);
      if (cam === null) {
        // Pressing it and seeing nothing happen reads as broken (SHIG 55, 58).
        const reason = emptyPickReason(cams.length, view);
        const key = reason === "notLoaded" ? "camsNotLoaded" : reason === "noMatch" ? "noMatchShort" : "noLive";
        notice.show(
          t(key, view.lang),
          view.lang,
          reason === "noMatch" ? { label: t("clearFilters", view.lang), run: clearFilters } : undefined,
        );
        return;
      }
      notice.hide();
      update({ view: [cam.id] });
      focusCam(cam);
    },
    onLocate() {
      void locateHere();
    },
    onToggleWall() {
      wallOpen = !wallOpen;
      if (!wallOpen) wall.teardown();
      if (view.watching) update({ watching: false });
      else render();
    },
    onToggleWatching() {
      const opening = !view.watching;
      if (wallOpen) {
        wallOpen = false;
        wall.teardown();
      }
      update({ watching: opening });
      if (!opening) focusOpenCam();
    },
    onToggleFilters() {
      filtersOpen = !filtersOpen;
      render();
    },
    onClearFilters: clearFilters,
    onSetGlobe(globe) {
      const leavingWall = wallOpen;
      if (leavingWall) {
        wallOpen = false;
        wall.teardown();
      }
      const leavingWatching = view.watching;
      if (view.globe !== globe || leavingWatching) update({ globe, watching: false });
      else if (leavingWall) render();
      if (leavingWatching) focusOpenCam();
    },
  });

  function update(patch: Partial<ViewState>): void {
    view = { ...view, ...patch };
    history.replaceState(null, "", toSearchString(view) || location.pathname);
    render();
  }

  function paintDial(): void {
    // "All locations" follows the filters other than the live filter.
    // Including liveOnly makes the denominator equal to the numerator, so it is always N / N.
    const scoped = filterCams(
      cams,
      { states, nightIds, favoriteIds: new Set(favorites) },
      { ...view, liveOnly: false },
    );
    const live = scoped.filter((cam) => states.get(cam.id)?.status === "live").length;
    const caption = liveDialCaption(live, scoped.length, cams.length, view.lang);
    const count = document.createElement("span");
    count.className = "dial__count";
    count.textContent = caption.count;
    const total = document.createElement("span");
    total.className = "dial__total";
    total.textContent = caption.total;
    const label = document.createElement("span");
    label.className = "dial__label";
    label.textContent = caption.label;
    dialEl.replaceChildren(count, total, label);
    dialEl.setAttribute("aria-label", caption.aria);
  }

  // The grip of the panel that rises from the bottom. Even when collapsed, which camera is
  // the lead can be read. Raising and lowering happens only "when the lead changes". Raising
  // on every redraw would push it back up on the clock update every 1 minute right after
  // the user collapsed it.
  let gripFocus: string | undefined;

  function paintSheetGrip(open: readonly Cam[], idle: "sheetIdle" | "sheetIdleWatching" | "noMatchShort"): void {
    const focused = open[0];
    sheet?.setLabel(focused ? camName(focused.name, view.lang) : t(idle, view.lang));
    const focusedId = focused?.id;
    if (focusedId === gripFocus) return;
    gripFocus = focusedId;
    if (focusedId === undefined) {
      sheet?.lower();
      return;
    }
    sheet?.raise();
    // With the filter row and the panel both shown, the map becomes a 74px band on a
    // narrow screen. A lead was chosen = the user moved on to watching, so collapse the row.
    filtersOpen = false;
  }

  const panelCtx = () => ({
    lang: view.lang,
    now,
    states,
    favoriteIds: new Set(favorites),
    soundOn,
  });

  function render(): void {
    const visible = visibleCams();
    const open = openCams();

    document.documentElement.lang = view.lang;
    // Several tabs of this app look alike in the tab strip unless each says what it shows (SHIG 59).
    const lead = open[0];
    document.title = lead ? `${camName(lead.name, view.lang)} — Somewhere Now` : baseTitle;
    panelResize.setLang(view.lang);
    sheet?.setLang(view.lang);
    const watchingOpen = view.watching && !wallOpen;
    // The collapsed grip is the only line visible on a narrow screen, so it says what is going
    // on: nothing matches, or the list (not the map) is the place to pick from (SHIG 55, 59).
    paintSheetGrip(
      open,
      cams.length > 0 && visible.length === 0
        ? "noMatchShort"
        : watchingOpen
          ? "sheetIdleWatching"
          : "sheetIdle",
    );
    const mode = wallOpen
      ? "wall"
      : watchingOpen
        ? "watching"
        : view.globe
          ? "globe"
          : "map";
    root.dataset["mode"] = mode;
    root.dataset["filters"] = filtersOpen ? "open" : "closed";
    wallEl.hidden = !wallOpen;
    watchingEl.hidden = !watchingOpen;
    globeEl.setAttribute("aria-label", t("globe", view.lang));
    // Both asides are landmarks; without distinct names a screen reader lists them as "complementary" twice.
    notesEl.setAttribute("aria-label", t("notesAria", view.lang));
    panelEl.setAttribute("aria-label", t("panelAria", view.lang));

    controls.update(view, wallOpen, locateStatus, filtersOpen);
    mapView.setStates(states);
    mapView.setVisible(visible);
    mapView.setSelected(view.view);
    mapView.setLang(view.lang);
    if (mode === "globe") {
      void ensureGlobe().then(() => {
        // Right after hidden is removed the layout may not be settled yet, so
        // fit the size once more on the next frame.
        requestAnimationFrame(() => globeView?.invalidate());
      });
    } else {
      mapView.invalidate();
    }
    paintDial();
    mountPinLegend(legendEl, view.lang);

    if (wallOpen) {
      // The panel is collapsed (CSS). Its content is emptied too so the same stream is not played twice.
      watchingList.teardown();
      panel.update([], panelCtx());
      wall.update(open, states, view.lang, soundOn);
      return;
    }

    if (watchingOpen) {
      const ranked = rankLiveByViewers(visible, states);
      watchingList.update(ranked, view.view, {
        lang: view.lang,
        now,
        states,
        ready: statesReady,
        // liveOnly is left out: the list holds only live places anyway.
        filtered: activeFilterCount({ ...view, liveOnly: false }) > 0,
      });
      panel.update(
        open,
        panelCtx(),
        open.length > 0 ? "none" : visible.length === 0 ? "noMatch" : "watching",
      );
      return;
    }

    watchingList.teardown();
    panel.update(open, panelCtx(), visible.length === 0 ? "noMatch" : "none");
  }

  async function pullStates(): Promise<void> {
    const payload = await fetchCamStates();
    if (payload === null) {
      if (statesReady === "loading") {
        statesReady = "unavailable";
        render();
      }
      return;
    }
    statesReady = "ready";
    states = new Map(Object.entries(payload.cams));
    render();
  }

  // Place the pins when the master arrives. Until then only the map is shown.
  async function loadCams(): Promise<void> {
    const loaded = await fetchCams();
    if (loaded.length === 0) return;
    cams = loaded;
    byId = new Map(loaded.map((cam) => [cam.id, cam]));
    recomputeNight();
    // Cameras selected in the URL from the start can only be opened here.
    render();
    // A shared link lands on the camera it names. Before, the panel opened while the map stayed
    // on the initial view, with the pin hidden in a cluster on the other side of the world (SHIG 24, 59).
    focusOpenCam();
  }

  render();
  // Reveal the stage and the panel only now that the masthead has its final height (see
  // `.app:not([data-ready])` in styles.css). Same task as render(), so no frame sits in between.
  root.dataset["ready"] = "";
  void loadCams();
  if (view.globe) {
    mapView.drawTerminator(now);
    void ensureGlobe();
  } else {
    mapView.playIntro(now);
    // Prefetching the globe happens "after the map is fully shown". Rushing it with
    // timeout 2500 makes a mobile with congested loading fetch 300KB (maplibre + globe)
    // right in the middle of the initial render, taking bandwidth from the map tiles (LCP).
    // Wait for load, then do it in idle time. Switching stays fast enough.
    const warm = (): void => {
      void import("./ui/globe").then((mod) => mod.prefetchGlobeRuntime());
    };
    const scheduleWarm = (): void => {
      if (typeof requestIdleCallback === "function") requestIdleCallback(warm, { timeout: 10_000 });
      else setTimeout(warm, 3_000);
    };
    if (document.readyState === "complete") scheduleWarm();
    else addEventListener("load", scheduleWarm, { once: true });
  }
  void pullStates();

  everyWhileVisible(TICK_MS, () => {
    now = new Date();
    recomputeNight();
    mapView.drawTerminator(now);
    globeView?.drawTerminator(now);
    render();
  });

  everyWhileVisible(STATE_POLL_MS, () => void pullStates());

  // The opened filters hang over the map, so collapse them when the map is touched.
  // On wide screens the row is always shown, so even when this fires nothing moves.
  stageEl.addEventListener("pointerdown", () => {
    if (!filtersOpen) return;
    filtersOpen = false;
    render();
  });

  addEventListener("resize", () => {
    mapView.invalidate();
    globeView?.invalidate();
  });
}
