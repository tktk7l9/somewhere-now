// 画面全体の組み立て。
//
// 状態は 3 つだけ:
//   ViewState  … URL に載る(開いているカメラ・絞り込み・言語)
//   states     … Worker から来る生存状態
//   favorites / panel-width … localStorage
// それ以外(いま夜かどうか、現地時刻)は now から毎分導出する。

import { broadcastIds } from "./domain/broadcast";
import { filterCams, pickRandom, rankLiveByViewers, type Cam, type PublicCamState } from "./domain/cams";
import { decodeFavorites, encodeFavorites, toggleFavorite } from "./domain/favorites";
import { nearestCam, requestLocation, viewportForLocation } from "./domain/locate";
import { isNightAt } from "./domain/terminator";
import { MAX_VIEW, parseUrlState, toSearchString, type ViewState } from "./domain/urlState";
import { fetchCamStates, fetchCams } from "./api/client";
import { createControls, type LocateStatus } from "./ui/controls";
import { liveDialCaption, t } from "./ui/i18n";
import type { GlobeView } from "./ui/globe";
import { createMapView } from "./ui/map";
import { mountPinLegend } from "./ui/pin";
import { createPanel } from "./ui/panel";
import { attachPanelResize } from "./ui/panelResize";
import { createWall } from "./ui/wall";
import { createWatchingList, type JumpTarget } from "./ui/watching";

const FAVORITES_KEY = "somewhere-now:favorites";
const SOUND_KEY = "somewhere-now:sound";
const PANEL_WIDTH_KEY = "somewhere-now:panel-width";
/**
 * 生存状態の取り込み間隔。Worker 側の更新が 10 分毎なので 2 分で十分に追いつく。
 * 応答には ETag が付いているので、変わっていない 5 回中 4 回は本文が飛ばない
 * (ブラウザが If-None-Match を付けて 304 を受ける)。
 */
const STATE_POLL_MS = 120_000;
/** 現地時刻と昼夜の再計算。 */
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

/**
 * 表に出ているあいだだけ回る繰り返し。
 *
 * 開きっぱなしの裏タブが 2 分毎に生存状態(144KB)を取り続けると、誰も見ていない
 * のに 1 日 700 リクエスト・100MB になる。見えない地図の再描画も同じで、どちらも
 * 何の役にも立たない。過去に上限なしのポーリングでホスティングを落としている
 * ので、止められるものは止める。
 *
 * 表に戻ったときは間隔を待たずに 1 度走らせて追いつかせる。
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
  const panelEl = root.querySelector<HTMLElement>("#panel")!;
  const controlsEl = root.querySelector<HTMLElement>("#controls")!;
  const wallEl = root.querySelector<HTMLElement>("#wall")!;
  const watchingEl = root.querySelector<HTMLElement>("#watching")!;
  const dialEl = root.querySelector<HTMLElement>("#dial")!;
  const legendEl = root.querySelector<HTMLElement>("#legend")!;

  // マスタは JSON で後から届く。地図はこれを待たずに作る(待つと LCP が
  // そのぶん遅れる)。届いた時点でピンが乗る。
  let cams: readonly Cam[] = [];
  let byId = new Map<string, Cam>();

  let view: ViewState = parseUrlState(location.search);
  let states: ReadonlyMap<string, PublicCamState> = new Map();
  let favorites = readFavorites();
  let wallOpen = false;
  let now = new Date();
  let nightIds = new Set<string>();
  // 番組(テレビ・ラジオ・アニメ等)の id。マスタが届いた時点で 1 度だけ作る。
  let broadcasts = new Set<string>();
  // 音は既定で出さない。仕事の合間に開くので、押した瞬間に鳴るのは事故になる。
  let soundOn = readStored(SOUND_KEY) === "on";
  let locateStatus: LocateStatus = "idle";
  let statesReady: "loading" | "unavailable" | "ready" = "loading";

  function recomputeNight(): void {
    nightIds = new Set(cams.filter((cam) => isNightAt(now, cam)).map((cam) => cam.id));
  }
  recomputeNight();

  const visibleCams = (): Cam[] =>
    filterCams(
      cams,
      { states, nightIds, favoriteIds: new Set(favorites), broadcastIds: broadcasts },
      view,
    );

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

  /** 一覧から選ぶ。既に開いていれば先頭に上げ、閉じてあるものは開く。トグルはしない。 */
  function pickFromList(camId: string): void {
    if (view.view[0] === camId) return;
    update({ view: [camId, ...view.view.filter((id) => id !== camId)].slice(0, MAX_VIEW) });
  }

  /**
   * 一覧から地図へ飛ぶ。押した地点を先頭に上げ、一覧を畳んで、選ばれた面に寄せる。
   *
   * update は 1 回で済ませる(view と watching と globe を別々に流すと、その途中の
   * 状態で地図が描き直されて無駄に揺れる)。focusCam は view.globe を見て飛び先を
   * 決めるので、update のあとに呼ぶ。
   */
  function jumpFromList(camId: string, target: JumpTarget): void {
    update({
      view: [camId, ...view.view.filter((id) => id !== camId)].slice(0, MAX_VIEW),
      watching: false,
      globe: target === "globe",
    });
    const cam = byId.get(camId);
    if (cam) focusCam(cam);
  }

  function focusOpenCam(): void {
    const cam = openCams()[0];
    if (cam) focusCam(cam);
  }

  const mapView = createMapView(mapEl, cams, view.lang, selectCam);

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
        createGlobeView(globeEl, cams, view.lang, selectCam).catch(() =>
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
      render();
      return;
    }
    locateStatus = "idle";
    // 寄っただけでは何も映らないので、近くで実際に配信しているものを開く。
    // 地図は「いまいる場所へ」の名の通り現在地に寄せたままにする(カメラの方へ
    // 飛ばすと、押した本人がどこにいるのか分からなくなる)。
    // 絞り込みは尊重する — 自然だけを見ている人を、隣の街へ連れて行かない。
    const nearest = nearestCam(visibleCams(), states, result.position);
    if (nearest === null) render();
    else {
      const rest = view.view.filter((id) => id !== nearest.id);
      update({ view: [nearest.id, ...rest].slice(0, MAX_VIEW) });
    }
    goToViewport(viewport.center[0], viewport.center[1], viewport.zoom);
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

  const wall = createWall(wallEl, markUnplayable);
  const watchingList = createWatchingList(watchingEl, {
    onPick: pickFromList,
    onJump: jumpFromList,
  });

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
      if (cam === null) return;
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
    // 「全ての地点」は配信中フィルタ以外の絞り込みに従う。
    // liveOnly を含めると分母が分子と同じになり、常に N / N になる。
    const scoped = filterCams(
      cams,
      { states, nightIds, favoriteIds: new Set(favorites), broadcastIds: broadcasts },
      { ...view, liveOnly: false },
    );
    const live = scoped.filter((cam) => states.get(cam.id)?.status === "live").length;
    // 収録全件からも番組は差し引く。伏せているぶんを分母に混ぜると、
    // 何も絞っていないのに常に「全 N 地点」が出てしまう。
    const catalog = view.broadcasts ? cams.length : cams.length - broadcasts.size;
    const caption = liveDialCaption(live, scoped.length, catalog, view.lang);
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
    panelResize.setLang(view.lang);
    const watchingOpen = view.watching && !wallOpen;
    const mode = wallOpen
      ? "wall"
      : watchingOpen
        ? "watching"
        : view.globe
          ? "globe"
          : "map";
    root.dataset["mode"] = mode;
    wallEl.hidden = !wallOpen;
    watchingEl.hidden = !watchingOpen;
    globeEl.setAttribute("aria-label", t("globe", view.lang));

    controls.update(view, wallOpen, locateStatus);
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
    paintDial();
    mountPinLegend(legendEl, view.lang);

    if (wallOpen) {
      // パネルは畳まれる(CSS)。同じ配信を二重に流さないよう中身も空にする。
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
        filtered:
          view.categories.length > 0 ||
          view.nightOnly ||
          view.favoritesOnly ||
          view.query !== "",
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

  // マスタが届いたらピンを乗せる。届くまでは地図だけが出ている。
  async function loadCams(): Promise<void> {
    const loaded = await fetchCams();
    if (loaded.length === 0) return;
    cams = loaded;
    byId = new Map(loaded.map((cam) => [cam.id, cam]));
    broadcasts = broadcastIds(loaded);
    recomputeNight();
    // URL で最初から選ばれているカメラは、ここで初めて開ける。
    render();
  }

  render();
  void loadCams();
  if (view.globe) {
    mapView.drawTerminator(now);
    void ensureGlobe();
  } else {
    mapView.playIntro(now);
    // 地球儀の先読みは「地図が出そろってから」。timeout 2500 で急かすと、
    // 読み込みが混んでいるモバイルではまさに初期表示の最中に 300KB
    // (maplibre + globe)を取りにいき、地図タイル(LCP)の帯域を奪う。
    // load を待ってから暇な時間に回す。切り替えの速さは充分保てる。
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

  addEventListener("resize", () => {
    mapView.invalidate();
    globeView?.invalidate();
  });
}
