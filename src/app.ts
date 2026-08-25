// 画面全体の組み立て。
//
// 状態は 3 つだけ:
//   ViewState  … URL に載る(開いているカメラ・絞り込み・言語)
//   states     … Worker から来る生存状態
//   favorites  … localStorage
// それ以外(いま夜かどうか、現地時刻)は now から毎分導出する。

import { CAMS } from "./data/cams";
import {
  breakProgress,
  decodeRecent,
  encodeRecent,
  isNightHour,
  pickDestination,
  rememberRecent,
  type BreakDuration,
} from "./domain/breakMode";
import { filterCams, pickRandom, type Cam, type CamState } from "./domain/cams";
import { decodeFavorites, encodeFavorites, toggleFavorite } from "./domain/favorites";
import { isNightAt } from "./domain/terminator";
import { MAX_VIEW, parseUrlState, toSearchString, type ViewState } from "./domain/urlState";
import { fetchCamStates } from "./api/client";
import { createControls } from "./ui/controls";
import { catalogCaption, t } from "./ui/i18n";
import { createBreakView } from "./ui/breakView";
import type { GlobeView } from "./ui/globe";
import { createMapView } from "./ui/map";
import { createPanel } from "./ui/panel";
import { createWall } from "./ui/wall";

const FAVORITES_KEY = "somewhere-now:favorites";
const RECENT_KEY = "somewhere-now:recent";
const SOUND_KEY = "somewhere-now:sound";
/** 休憩中の残り時間を描き替える間隔。 */
const BREAK_TICK_MS = 1000;
/** 生存状態の取り込み間隔。Worker 側の更新が 10 分毎なので 2 分で十分に追いつく。 */
const STATE_POLL_MS = 120_000;
/** 現地時刻と昼夜の再計算。 */
const TICK_MS = 60_000;

const byId = new Map(CAMS.map((cam) => [cam.id, cam]));

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
    // プライベートブラウジング等で書けなくても、その回だけ諦めれば済む。
  }
}

/** localStorage は使えないことがあるので、読み書きとも失敗を飲み込む。 */
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
    // 保存できなくても、その回の体験は壊れない。
  }
}

export function startApp(root: HTMLElement): void {
  const mapEl = root.querySelector<HTMLElement>("#map")!;
  const globeEl = root.querySelector<HTMLElement>("#globe")!;
  const panelEl = root.querySelector<HTMLElement>("#panel")!;
  const controlsEl = root.querySelector<HTMLElement>("#controls")!;
  const catalogEl = root.querySelector<HTMLElement>("#catalog")!;
  const wallEl = root.querySelector<HTMLElement>("#wall")!;
  const dialEl = root.querySelector<HTMLElement>("#dial")!;
  const breakEl = root.querySelector<HTMLElement>("#break")!;

  let view: ViewState = parseUrlState(location.search);
  let states: ReadonlyMap<string, CamState> = new Map();
  let favorites = readFavorites();
  let wallOpen = false;
  let now = new Date();
  let nightIds = new Set<string>();
  let recentIds = decodeRecent(readStored(RECENT_KEY));
  // 音は既定で出さない。仕事の合間に開くので、押した瞬間に鳴るのは事故になる。
  let soundOn = readStored(SOUND_KEY) === "on";
  let breakSession: { cam: Cam; startedAt: Date; minutes: BreakDuration } | null = null;
  let breakFinished: Cam | null = null;
  let breakTimer: number | null = null;

  function recomputeNight(): void {
    nightIds = new Set(CAMS.filter((cam) => isNightAt(now, cam)).map((cam) => cam.id));
  }
  recomputeNight();

  const visibleCams = (): Cam[] =>
    filterCams(CAMS, { states, nightIds, favoriteIds: new Set(favorites) }, view);

  const openCams = (): Cam[] =>
    view.view.map((id) => byId.get(id)).filter((cam): cam is Cam => cam !== undefined);

  function selectCam(camId: string): void {
    // マーカーは開閉のトグル。新しく開いたものが先頭(音の出る側)に来る。
    const isOpen = view.view.includes(camId);
    const next = isOpen
      ? view.view.filter((id) => id !== camId)
      : [camId, ...view.view].slice(0, MAX_VIEW);
    update({ view: next });
    if (!isOpen) {
      const cam = byId.get(camId);
      if (cam) focusCam(cam);
    }
  }

  const mapView = createMapView(mapEl, CAMS, view.lang, selectCam);

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
        createGlobeView(globeEl, CAMS, view.lang, selectCam).catch(() =>
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

  // 再生側が「埋め込めない」と言ってきたら、サーバ側の次の確認を待たずに印を落とす。
  // 同じ報せは何度も来るので、状態が変わるときだけ描き直す(でないと
  // エラー→再描画→再読込→エラー の循環になる)。
  function markUnplayable(camId: string): void {
    if (states.get(camId)?.status === "blocked") return;
    const next = new Map(states);
    const prior = next.get(camId);
    next.set(camId, {
      videoId: prior?.videoId ?? null,
      status: "blocked",
      viewers: null,
      title: prior?.title ?? null,
      checkedAt: new Date().toISOString(),
    });
    states = next;
    render();
  }

  const panel = createPanel(panelEl, {
    onStartBreak: startBreak,
    onToggleSound: toggleSound,
    onToggleFavorite(camId) {
      favorites = toggleFavorite(favorites, camId);
      writeFavorites(favorites);
      render();
    },
    onClose(camId) {
      update({ view: view.view.filter((id) => id !== camId) });
    },
    onFocus(camId) {
      update({ view: [camId, ...view.view.filter((id) => id !== camId)] });
      const cam = byId.get(camId);
      if (cam) focusCam(cam);
    },
    onUnplayable: markUnplayable,
  });

  const wall = createWall(wallEl, markUnplayable);

  const breakView = createBreakView(breakEl, {
    onToggleSound: toggleSound,
    onNext() {
      travel();
    },
    onStop: endBreak,
    onAgain() {
      startBreak(breakSession?.minutes ?? 5);
    },
    onBackToMap: endBreak,
  });

  function toggleSound(): void {
    soundOn = !soundOn;
    writeStored(SOUND_KEY, soundOn ? "on" : "off");
    render();
  }

  /**
   * 次の行き先。決めるのはこちらの仕事なので、休憩に来た人には選ばせない。
   * いまの絞り込みは尊重する(自然だけを見たい人を街へ連れて行かない)。
   */
  function chooseDestination(): Cam | null {
    return pickDestination(
      visibleCams(),
      { states, nightIds, recentIds, viewerIsNight: isNightHour(now.getHours()) },
      Math.random,
    );
  }

  function recordVisit(cam: Cam): void {
    recentIds = rememberRecent(recentIds, cam.id);
    writeStored(RECENT_KEY, encodeRecent(recentIds));
  }

  function startBreak(minutes: BreakDuration): void {
    const cam = chooseDestination();
    if (cam === null) {
      breakView.notice(t("breakNoLive", view.lang), view.lang);
      breakFinished = null;
      breakSession = null;
      breakEl.hidden = false;
      root.dataset["mode"] = "break";
      return;
    }
    recordVisit(cam);
    breakFinished = null;
    breakSession = { cam, startedAt: new Date(), minutes };
    if (breakTimer === null) breakTimer = window.setInterval(tickBreak, BREAK_TICK_MS);
    render();
  }

  /** 休憩中に「別の場所へ」。残り時間は引き継ぐ。 */
  function travel(): void {
    if (breakSession === null) return;
    const cam = chooseDestination();
    if (cam === null) return;
    recordVisit(cam);
    breakSession = { ...breakSession, cam };
    render();
  }

  function stopTimer(): void {
    if (breakTimer === null) return;
    clearInterval(breakTimer);
    breakTimer = null;
  }

  function endBreak(): void {
    breakSession = null;
    breakFinished = null;
    stopTimer();
    breakView.teardown();
    render();
  }

  /** 残り時間だけを描き替える。時間が来たら静かに終わる(音は鳴らさない)。 */
  function tickBreak(): void {
    if (breakSession === null) return;
    const progress = breakProgress(breakSession.startedAt, new Date(), breakSession.minutes);
    if (!progress.done) {
      breakView.tick(progress);
      return;
    }
    breakFinished = breakSession.cam;
    breakSession = null;
    stopTimer();
    breakView.finish(breakFinished, view.lang);
  }

  const controls = createControls(controlsEl, {
    onChange(patch) {
      update(patch);
    },
    onRandom() {
      const live = visibleCams().filter((cam) => states.get(cam.id)?.status === "live");
      const pool = live.length > 0 ? live : visibleCams();
      const cam = pickRandom(pool, Math.random);
      if (cam === null) return;
      update({ view: [cam.id] });
      focusCam(cam);
    },
    onToggleWall() {
      wallOpen = !wallOpen;
      if (!wallOpen) wall.teardown();
      render();
    },
    onSetGlobe(globe) {
      const leavingWall = wallOpen;
      if (leavingWall) {
        wallOpen = false;
        wall.teardown();
      }
      if (view.globe !== globe) update({ globe });
      else if (leavingWall) render();
    },
  });

  function update(patch: Partial<ViewState>): void {
    view = { ...view, ...patch };
    history.replaceState(null, "", toSearchString(view) || location.pathname);
    render();
  }

  function paintDial(): void {
    const dark = CAMS.filter((cam) => nightIds.has(cam.id)).length;
    dialEl.innerHTML =
      `<span class="dial__count">${dark}</span>` +
      `<span class="dial__total">/ ${CAMS.length}</span>` +
      `<span class="dial__label">${t("darknessHeadline", view.lang)}</span>`;
  }

  function paintCatalog(visible: number): void {
    const caption = catalogCaption(visible, CAMS.length, view.lang);
    const count = document.createElement("span");
    count.className = "catalog__count";
    count.textContent = caption.count;
    const unit = document.createElement("span");
    unit.className = "catalog__unit";
    unit.textContent = caption.unit;
    if (caption.total === null) {
      catalogEl.replaceChildren(count, unit);
    } else {
      const total = document.createElement("span");
      total.className = "catalog__total";
      total.textContent = caption.total;
      catalogEl.replaceChildren(count, total, unit);
    }
    catalogEl.setAttribute("aria-label", caption.aria);
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
    const inBreak = breakSession !== null || breakFinished !== null;
    const mode = inBreak ? "break" : wallOpen ? "wall" : view.globe ? "globe" : "map";
    root.dataset["mode"] = mode;
    wallEl.hidden = !wallOpen || inBreak;
    breakEl.hidden = !inBreak;
    globeEl.setAttribute("aria-label", t("globe", view.lang));

    if (breakSession !== null) {
      breakView.show(breakSession.cam, states.get(breakSession.cam.id), {
        lang: view.lang,
        now,
        soundOn,
      });
      breakView.tick(breakProgress(breakSession.startedAt, new Date(), breakSession.minutes));
      return;
    }
    if (breakFinished !== null) return;

    controls.update(view, wallOpen);
    mapView.setStates(states);
    mapView.setVisible(visible);
    mapView.setSelected(view.view);
    mapView.setLang(view.lang);
    if (mode === "globe") {
      void ensureGlobe().then(() => {
        // hidden を外した直後はレイアウトが未確定なことがあるので、
        // 次フレームでもう一度サイズを合わせる。
        requestAnimationFrame(() => globeView?.invalidate());
      });
    } else {
      mapView.invalidate();
    }
    paintCatalog(visible.length);
    paintDial();

    if (wallOpen) {
      // パネルは畳まれる(CSS)。同じ配信を二重に流さないよう中身も空にする。
      panel.update([], panelCtx());
      wall.update(open, states, view.lang, soundOn);
      return;
    }

    panel.update(open, panelCtx(), visible.length === 0 ? "noMatch" : "none");
  }

  async function pullStates(): Promise<void> {
    const payload = await fetchCamStates();
    if (payload === null) return;
    states = new Map(Object.entries(payload.cams));
    render();
  }

  render();
  if (view.globe) {
    mapView.drawTerminator(now);
    void ensureGlobe();
  } else {
    mapView.playIntro(now);
  }
  void pullStates();

  setInterval(() => {
    now = new Date();
    recomputeNight();
    mapView.drawTerminator(now);
    globeView?.drawTerminator(now);
    render();
  }, TICK_MS);

  setInterval(() => void pullStates(), STATE_POLL_MS);

  addEventListener("resize", () => {
    mapView.invalidate();
    globeView?.invalidate();
  });
}
