// 画面全体の組み立て。
//
// 状態は 3 つだけ:
//   ViewState  … URL に載る(開いているカメラ・絞り込み・言語)
//   states     … Worker から来る生存状態
//   favorites  … localStorage
// それ以外(いま夜かどうか、現地時刻)は now から毎分導出する。

import { CAMS } from "./data/cams";
import { filterCams, pickRandom, type Cam, type CamState } from "./domain/cams";
import { decodeFavorites, encodeFavorites, toggleFavorite } from "./domain/favorites";
import { isNightAt } from "./domain/terminator";
import { MAX_VIEW, parseUrlState, toSearchString, type ViewState } from "./domain/urlState";
import { fetchCamStates } from "./api/client";
import { createControls } from "./ui/controls";
import { t } from "./ui/i18n";
import { createMapView } from "./ui/map";
import { createPanel } from "./ui/panel";
import { createWall } from "./ui/wall";

const FAVORITES_KEY = "somewhere-now:favorites";
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

export function startApp(root: HTMLElement): void {
  const mapEl = root.querySelector<HTMLElement>("#map")!;
  const panelEl = root.querySelector<HTMLElement>("#panel")!;
  const controlsEl = root.querySelector<HTMLElement>("#controls")!;
  const wallEl = root.querySelector<HTMLElement>("#wall")!;
  const dialEl = root.querySelector<HTMLElement>("#dial")!;

  let view: ViewState = parseUrlState(location.search);
  let states: ReadonlyMap<string, CamState> = new Map();
  let favorites = readFavorites();
  let wallOpen = false;
  let now = new Date();
  let nightIds = new Set<string>();

  function recomputeNight(): void {
    nightIds = new Set(CAMS.filter((cam) => isNightAt(now, cam)).map((cam) => cam.id));
  }
  recomputeNight();

  const visibleCams = (): Cam[] =>
    filterCams(CAMS, { states, nightIds, favoriteIds: new Set(favorites) }, view);

  const openCams = (): Cam[] =>
    view.view.map((id) => byId.get(id)).filter((cam): cam is Cam => cam !== undefined);

  const mapView = createMapView(mapEl, CAMS, view.lang, (camId) => {
    // マーカーは開閉のトグル。新しく開いたものが先頭(音の出る側)に来る。
    const isOpen = view.view.includes(camId);
    const next = isOpen
      ? view.view.filter((id) => id !== camId)
      : [camId, ...view.view].slice(0, MAX_VIEW);
    update({ view: next });
    if (!isOpen) mapView.focus(byId.get(camId)!);
  });

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
      mapView.focus(byId.get(camId)!);
    },
    onUnplayable: markUnplayable,
  });

  const wall = createWall(wallEl, markUnplayable);

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
      mapView.focus(cam);
    },
    onToggleWall() {
      wallOpen = !wallOpen;
      if (!wallOpen) wall.teardown();
      render();
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

  const panelCtx = () => ({
    lang: view.lang,
    now,
    states,
    favoriteIds: new Set(favorites),
  });

  function render(): void {
    const visible = visibleCams();
    const open = openCams();

    document.documentElement.lang = view.lang;
    root.dataset["mode"] = wallOpen ? "wall" : "map";
    wallEl.hidden = !wallOpen;

    controls.update(view, wallOpen);
    mapView.setStates(states);
    mapView.setVisible(visible);
    mapView.setSelected(view.view);
    mapView.setLang(view.lang);
    paintDial();

    if (wallOpen) {
      // パネルは畳まれる(CSS)。同じ配信を二重に流さないよう中身も空にする。
      panel.update([], panelCtx());
      wall.update(open, states, view.lang);
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
  mapView.playIntro(now);
  void pullStates();

  setInterval(() => {
    now = new Date();
    recomputeNight();
    mapView.drawTerminator(now);
    render();
  }, TICK_MS);

  setInterval(() => void pullStates(), STATE_POLL_MS);

  addEventListener("resize", () => mapView.invalidate());
}
