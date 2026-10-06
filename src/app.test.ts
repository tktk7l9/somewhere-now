// @vitest-environment jsdom
//
// The whole screen, driven the way a person uses it. Leaflet and MapLibre draw on a canvas that
// jsdom cannot render, so the flat map and the globe are replaced by recording fakes; everything
// else (masthead, panel, notice, list, wall, sheet) is the real DOM.

import { fireEvent, screen, waitFor, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Cam, PublicCamState } from "./domain/cams";
import type { MapViewport } from "./domain/mapView";
import type { StatePayload } from "./api/client";
import { ALL_CAMS, KILAUEA, NAIROBI, REYKJAVIK, TOKYO, live, offline } from "./ui/__fixtures__/cams";

interface FakeView {
  onSelect: (camId: string) => void;
  setStates: ReturnType<typeof vi.fn>;
  setVisible: ReturnType<typeof vi.fn>;
  setSelected: ReturnType<typeof vi.fn>;
  setLang: ReturnType<typeof vi.fn>;
  focus: ReturnType<typeof vi.fn>;
  goTo: ReturnType<typeof vi.fn>;
  drawTerminator: ReturnType<typeof vi.fn>;
  playIntro: ReturnType<typeof vi.fn>;
  invalidate: ReturnType<typeof vi.fn>;
}

const fakes = vi.hoisted(() => {
  const makeView = (onSelect: (camId: string) => void) => ({
    onSelect,
    setStates: vi.fn(),
    setVisible: vi.fn(),
    setSelected: vi.fn(),
    setLang: vi.fn(),
    focus: vi.fn(),
    goTo: vi.fn(),
    drawTerminator: vi.fn(),
    playIntro: vi.fn(),
    invalidate: vi.fn(),
  });
  return {
    makeView,
    map: null as ReturnType<typeof makeView> | null,
    globe: null as ReturnType<typeof makeView> | null,
    createGlobeView: vi.fn(),
    createUnsupportedView: vi.fn(),
    prefetchGlobeRuntime: vi.fn(),
    api: {
      fetchCams: vi.fn(),
      fetchCamStates: vi.fn(),
      fetchWeather: vi.fn(),
      fetchPlaceOverview: vi.fn(),
    },
  };
});

vi.mock("./ui/map", () => ({
  createMapView: (_el: HTMLElement, _cams: readonly Cam[], _lang: string, onSelect: (id: string) => void) => {
    fakes.map = fakes.makeView(onSelect);
    return fakes.map;
  },
}));

vi.mock("./ui/globe", () => ({
  createGlobeView: fakes.createGlobeView,
  createUnsupportedView: fakes.createUnsupportedView,
  prefetchGlobeRuntime: fakes.prefetchGlobeRuntime,
}));

vi.mock("./api/client", () => fakes.api);

const { startApp } = await import("./app");

// ---------------------------------------------------------------------------------------------
// Listener bookkeeping: every startApp adds window/document listeners. Remove them after each
// test so an earlier app does not answer events meant for the current one.

type Added = [EventTarget, string, EventListenerOrEventListenerObject, unknown];
const added: Added[] = [];
const realWindowAdd = window.addEventListener.bind(window);
const realDocumentAdd = document.addEventListener.bind(document);

function trackListeners(): void {
  vi.spyOn(window, "addEventListener").mockImplementation((type, listener, options) => {
    added.push([window, type, listener!, options]);
    realWindowAdd(type, listener!, options);
  });
  vi.spyOn(document, "addEventListener").mockImplementation((type, listener, options) => {
    added.push([document, type, listener!, options]);
    realDocumentAdd(type, listener!, options);
  });
}

function releaseListeners(): void {
  for (const [target, type, listener, options] of added.splice(0)) {
    target.removeEventListener(type, listener, options as EventListenerOptions);
  }
}

// ---------------------------------------------------------------------------------------------

const APP_HTML = `
  <div class="app" id="app" data-mode="map">
    <header class="masthead"><div class="masthead__controls" id="controls"></div></header>
    <main class="stage">
      <div class="map" id="map"></div>
      <div class="globe" id="globe"></div>
      <section class="wall" id="wall" hidden></section>
      <section class="watching" id="watching" hidden></section>
      <aside class="notes" id="notes"><div class="dial" id="dial"></div><div class="legend" id="legend"></div></aside>
    </main>
    <aside class="panel" id="panel"></aside>
  </div>`;

function statesPayload(entries: Record<string, PublicCamState>): StatePayload {
  return { updatedAt: "2026-06-01T00:00:00Z", cams: entries };
}

const DEFAULT_STATES = {
  tokyo: live(900),
  reykjavik: live(50),
  kilauea: offline(),
  nairobi: live(300),
};

interface StartOptions {
  url?: string;
  cams?: readonly Cam[];
  states?: StatePayload | null;
  storage?: Record<string, string>;
}

async function start({ url = "/", cams = ALL_CAMS, states = statesPayload(DEFAULT_STATES), storage = {} }: StartOptions = {}) {
  history.replaceState(null, "", url);
  localStorage.clear();
  for (const [key, value] of Object.entries(storage)) localStorage.setItem(key, value);
  fakes.api.fetchCams.mockResolvedValue(cams);
  fakes.api.fetchCamStates.mockResolvedValue(states);

  const template = document.createElement("template");
  template.innerHTML = APP_HTML;
  document.body.replaceChildren(template.content);
  const root = document.getElementById("app")!;
  startApp(root);
  const map = fakes.map as FakeView;
  // Let the camera list and the live state arrive.
  await waitFor(() => expect(fakes.api.fetchCamStates).toHaveBeenCalled());
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  return { root, map };
}

const panel = () => document.getElementById("panel")!;
const dial = () => document.getElementById("dial")!;
const params = () => new URLSearchParams(location.search);
const noticeBox = () => document.querySelector<HTMLElement>(".notice")!;

describe("startApp", () => {
  beforeEach(() => {
    trackListeners();
    fakes.api.fetchWeather.mockReset().mockResolvedValue(null);
    fakes.api.fetchPlaceOverview.mockReset().mockResolvedValue(null);
    fakes.api.fetchCams.mockReset();
    fakes.api.fetchCamStates.mockReset();
    fakes.createGlobeView.mockReset().mockImplementation(async (_el, _cams, _lang, onSelect) => {
      fakes.globe = fakes.makeView(onSelect);
      return fakes.globe;
    });
    fakes.createUnsupportedView.mockReset();
    fakes.prefetchGlobeRuntime.mockReset();
    fakes.globe = null;
  });
  afterEach(() => {
    releaseListeners();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    // Tests that stub these restore them too, but only when they reach the end.
    Object.defineProperty(navigator, "geolocation", { configurable: true, value: undefined });
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
  });

  it("reveals the screen after the first render and shows what is live", async () => {
    const { root, map } = await start();

    expect(root.dataset["ready"]).toBe("");
    expect(root.dataset["mode"]).toBe("map");
    expect(document.documentElement.lang).toBe("ja");
    expect(screen.getByRole("heading", { name: "まだ何も選んでいません" })).toBeTruthy();
    await waitFor(() => expect(within(dial()).getByText("3")).toBeTruthy());
    expect(within(dial()).getByText("/ 5")).toBeTruthy();
    expect(dial().getAttribute("aria-label")).toBe("5 地点中 3 地点が配信中");
    expect(within(document.getElementById("legend")!).getByText("止まっている")).toBeTruthy();
    expect(document.getElementById("legend")!.getAttribute("role")).toBe("note");
    expect(map.playIntro).toHaveBeenCalled();
    expect(map.setVisible).toHaveBeenLastCalledWith(ALL_CAMS);
    expect(map.setStates.mock.lastCall![0].get("tokyo")).toEqual(live(900));
  });

  it("opens a camera from its marker, puts it in the URL and closes it on a second press", async () => {
    const { map } = await start();

    map.onSelect("tokyo");

    expect(params().get("cam")).toBe("tokyo");
    expect(within(panel()).getByRole("heading", { name: "東京の交差点" })).toBeTruthy();
    expect(panel().querySelector("iframe")).not.toBeNull();
    expect(map.focus).toHaveBeenCalledWith(TOKYO);
    expect(map.setSelected).toHaveBeenLastCalledWith(["tokyo"]);

    map.onSelect("reykjavik");
    expect(params().get("view")).toBe("reykjavik,tokyo");
    expect(within(panel()).getByRole("heading", { name: "開いているカメラ" })).toBeTruthy();

    // Pressing an open pin closes it the same way the panel does: at once, with undo (SHIG 6, 54).
    map.onSelect("reykjavik");
    expect(params().get("cam")).toBe("tokyo");
    expect(map.focus).toHaveBeenCalledTimes(2);
    expect(within(noticeBox()).getByRole("status").textContent).toBe("「レイキャビクの港」を閉じました");
    await userEvent.setup().click(screen.getByRole("button", { name: "元に戻す" }));
    expect(params().get("view")).toBe("reykjavik,tokyo");
    map.onSelect("reykjavik");

    // Closing the last one lowers the bottom sheet and the grip invites a pick again.
    map.onSelect("tokyo");
    expect(location.search).toBe("");
    expect(document.querySelector(".app")!.getAttribute("data-sheet")).toBe("peek");
    expect(screen.getByRole("button", { name: /地図から地点を選ぶ/ })).toBeTruthy();
  });

  it("opens the cameras named in a shared URL once the list arrives", async () => {
    await start({ url: "/?view=nairobi,tokyo&lang=en" });
    expect(document.documentElement.lang).toBe("en");
    expect(within(panel()).getByRole("heading", { name: "Nairobi Waterhole" })).toBeTruthy();
    expect(within(panel()).getByText("Tokyo Crossing")).toBeTruthy();
  });

  // A shared link used to open the panel while the map stayed on its initial view, with the
  // camera's pin hidden inside a cluster on the other side of the world (SHIG 24, 59).
  it("brings the lead camera of a shared URL into view on the map", async () => {
    const { map } = await start({ url: "/?view=nairobi,tokyo" });
    expect(map.focus).toHaveBeenCalledTimes(1);
    expect(map.focus).toHaveBeenCalledWith(NAIROBI);
  });

  it("brings the lead camera of a shared URL into view on the globe", async () => {
    const { map } = await start({ url: "/?cam=tokyo&globe=1" });
    await waitFor(() => expect(fakes.globe?.focus).toHaveBeenCalledWith(TOKYO));
    expect(map.focus).not.toHaveBeenCalled();
  });

  it("does not move the map when the shared URL names no camera", async () => {
    const { map } = await start({ url: "/?cat=city" });
    expect(map.focus).not.toHaveBeenCalled();
  });

  // The list covers the map (display: none), and Leaflet cannot fly a map that has no size:
  // it threw "Invalid LatLng (NaN, NaN)" on every frame. The flight waits for the list to close.
  it("waits until the list closes before flying to the lead camera of a shared URL", async () => {
    const user = userEvent.setup();
    const { map } = await start({ url: "/?watching=1&cam=tokyo" });
    expect(map.focus).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "視聴が多い順" }));
    expect(map.focus).toHaveBeenCalledTimes(1);
    expect(map.focus).toHaveBeenCalledWith(TOKYO);
  });

  it("names the tab after the lead camera so open tabs can be told apart", async () => {
    document.title = "somewhere-now — 地球のライブカメラを地図から覗く";
    const user = userEvent.setup();
    const { map } = await start({ url: "/?cam=tokyo" });
    expect(document.title).toBe("東京の交差点 — Somewhere Now");

    map.onSelect("reykjavik");
    expect(document.title).toBe("レイキャビクの港 — Somewhere Now");

    await user.click(screen.getByRole("button", { name: "English" }));
    expect(document.title).toBe("Reykjavik Harbor — Somewhere Now");

    map.onSelect("reykjavik");
    map.onSelect("tokyo");
    expect(document.title).toBe("somewhere-now — 地球のライブカメラを地図から覗く");
  });

  it("closes a camera at once and brings it back with undo", async () => {
    const user = userEvent.setup();
    const { map } = await start({ url: "/?view=tokyo,reykjavik" });

    const card = panel().querySelector<HTMLElement>(".card")!;
    await user.click(within(card).getByRole("button", { name: "閉じる" }));

    expect(params().get("cam")).toBe("reykjavik");
    expect(within(noticeBox()).getByRole("status").textContent).toBe("「東京の交差点」を閉じました");
    // The pressed button vanished with the card, so focus lands on the undo.
    const undo = screen.getByRole("button", { name: "元に戻す" });
    expect(document.activeElement).toBe(undo);

    await user.click(undo);
    expect(params().get("view")).toBe("tokyo,reykjavik");
    expect(noticeBox().hidden).toBe(true);
    expect(map.setSelected).toHaveBeenLastCalledWith(["tokyo", "reykjavik"]);
  });

  it("switches the lead from the list of other open cameras", async () => {
    const user = userEvent.setup();
    const { map } = await start({ url: "/?view=tokyo,reykjavik" });
    const row = within(panel()).getByText("レイキャビクの港").closest<HTMLElement>(".openrow")!;
    await user.click(within(row).getByRole("button", { name: "これを見る" }));
    expect(params().get("view")).toBe("reykjavik,tokyo");
    expect(map.focus).toHaveBeenCalledWith(REYKJAVIK);
  });

  it("remembers favorites and sound in local storage", async () => {
    const user = userEvent.setup();
    await start({ url: "/?cam=tokyo" });

    // The labels stay put and only the pressed state moves, so "音を出す" lit amber cannot be
    // misread as the action to take next (SHIG 49).
    await user.click(screen.getByRole("button", { name: "お気に入り" }));
    expect(localStorage.getItem("somewhere-now:favorites")).toContain("tokyo");
    expect(screen.getByRole("button", { name: "お気に入り", pressed: true })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "音を出す", pressed: false }));
    expect(localStorage.getItem("somewhere-now:sound")).toBe("on");
    await user.click(screen.getByRole("button", { name: "音を出す", pressed: true }));
    expect(localStorage.getItem("somewhere-now:sound")).toBe("off");
    expect(screen.getByRole("button", { name: "音を出す", pressed: false })).toBeTruthy();
  });

  it("starts with sound when it was left on and restores favorites", async () => {
    const { map } = await start({
      url: "/?cam=tokyo&fav=1",
      storage: { "somewhere-now:sound": "on", "somewhere-now:favorites": JSON.stringify({ v: 1, ids: ["tokyo"] }) },
    });
    const frame = panel().querySelector("iframe")!;
    expect(new URL(frame.src).searchParams.get("mute")).toBe("0");
    expect(map.setVisible).toHaveBeenLastCalledWith([TOKYO]);
  });

  it("keeps working when local storage throws", async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    await start({ url: "/?cam=tokyo" });

    await user.click(screen.getByRole("button", { name: "お気に入り" }));
    await user.click(screen.getByRole("button", { name: "音を出す" }));
    expect(screen.getByRole("button", { name: "お気に入り", pressed: true })).toBeTruthy();
    expect(screen.getByRole("button", { name: "音を出す", pressed: true })).toBeTruthy();
  });

  it("filters by typing and by chips, updating the URL and the dial", async () => {
    const user = userEvent.setup();
    const { map } = await start();

    await user.type(screen.getByRole("searchbox"), "火山");
    expect(params().get("q")).toBe("火山");
    expect(map.setVisible).toHaveBeenLastCalledWith([KILAUEA]);
    expect(dial().getAttribute("aria-label")).toBe("全 5 地点のうち 1 地点を表示、うち 0 地点が配信中");
    expect(screen.getByRole("button", { name: "絞り込み 1" })).toBeTruthy();

    await user.clear(screen.getByRole("searchbox"));
    await user.click(screen.getByRole("button", { name: "動物" }));
    expect(params().get("cat")).toBe("animal");
    expect(map.setVisible).toHaveBeenLastCalledWith([NAIROBI]);

    // One press in the filter row turns everything off, even with results still showing (SHIG 60).
    await user.type(screen.getByRole("searchbox"), "ナイロビ");
    const controls = document.getElementById("controls")!;
    await user.click(within(controls).getByRole("button", { name: "絞り込みを解除" }));
    expect(location.search).toBe("");
    expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe("");
    expect(map.setVisible).toHaveBeenLastCalledWith(ALL_CAMS);
    expect(within(controls).queryByRole("button", { name: "絞り込みを解除" })).toBeNull();
  });

  it("offers to clear the filters when they hide every camera", async () => {
    const user = userEvent.setup();
    const { map } = await start({ url: "/?q=nowhere" });

    expect(within(panel()).getByText(/条件に合うカメラがありません。/)).toBeTruthy();
    expect(screen.getByRole("button", { name: /条件に合うカメラがありません$/ })).toBeTruthy();

    await user.click(within(panel()).getByRole("button", { name: "絞り込みを解除" }));
    expect(location.search).toBe("");
    expect(map.setVisible).toHaveBeenLastCalledWith(ALL_CAMS);
  });

  describe("take me somewhere", () => {
    it("opens a live camera", async () => {
      const user = userEvent.setup();
      vi.spyOn(Math, "random").mockReturnValue(0);
      const { map } = await start();
      await user.click(screen.getByRole("button", { name: "どこかへ連れてって" }));
      expect(params().get("cam")).toBe("tokyo");
      expect(map.focus).toHaveBeenCalledWith(TOKYO);
    });

    it("falls back to any visible camera when nothing is live", async () => {
      const user = userEvent.setup();
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      await start({ states: null });
      await user.click(screen.getByRole("button", { name: "どこかへ連れてって" }));
      expect(params().get("cam")).toBe("zurich");
    });

    it("says the list has not loaded yet", async () => {
      const user = userEvent.setup();
      await start({ cams: [] });
      await user.click(screen.getByRole("button", { name: "どこかへ連れてって" }));
      expect(within(noticeBox()).getByRole("status").textContent).toMatch(/まだ読み込めていません/);
      expect(location.search).toBe("");
    });

    it("offers to clear filters that match nothing", async () => {
      const user = userEvent.setup();
      await start({ url: "/?q=nowhere" });
      await user.click(screen.getByRole("button", { name: "どこかへ連れてって" }));
      expect(within(noticeBox()).getByRole("status").textContent).toBe("条件に合うカメラがありません");
      await user.click(within(noticeBox()).getByRole("button", { name: "絞り込みを解除" }));
      expect(location.search).toBe("");
    });
  });

  describe("where I am", () => {
    function stubGeolocation(impl: (ok: PositionCallback, fail: PositionErrorCallback) => void) {
      Object.defineProperty(navigator, "geolocation", {
        configurable: true,
        value: { getCurrentPosition: vi.fn(impl) },
      });
    }
    afterEach(() => {
      Object.defineProperty(navigator, "geolocation", { configurable: true, value: undefined });
    });

    it("says why when the browser has no location", async () => {
      const user = userEvent.setup();
      await start();
      await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
      await waitFor(() =>
        expect(within(noticeBox()).getByRole("status").textContent).toBe(
          "このブラウザではいまいる場所を使えません",
        ),
      );
      expect(screen.getByRole("button", { name: /^いまいる場所へ\. / }).title).toBe(
        "このブラウザではいまいる場所を使えません",
      );
    });

    it("waits while looking, then opens the nearest live camera and moves the map there", async () => {
      const user = userEvent.setup();
      let answer: PositionCallback = () => {};
      stubGeolocation((ok) => (answer = ok));
      const { map } = await start({ url: "/?cam=kilauea" });

      await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
      const pending = screen.getByRole("button", { name: "場所を探しています…" }) as HTMLButtonElement;
      expect(pending.disabled).toBe(true);

      answer({ coords: { latitude: 64.1, longitude: -21.5, accuracy: 100 } } as GeolocationPosition);
      await waitFor(() => expect(params().get("view")).toBe("reykjavik,kilauea"));
      expect(map.goTo).toHaveBeenCalledWith({ center: [64.1, -21.5], zoom: 14 });
      expect(screen.getByRole("button", { name: "いまいる場所へ" })).toBeTruthy();
    });

    it("reports a denied permission", async () => {
      const user = userEvent.setup();
      stubGeolocation((_ok, fail) => fail({ code: 1 } as GeolocationPositionError));
      await start();
      await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
      await waitFor(() =>
        expect(within(noticeBox()).getByRole("status").textContent).toBe(
          "位置情報の利用が許可されていません",
        ),
      );
    });

    it("just moves the map when no camera is visible, leaving the wall and the list", async () => {
      const user = userEvent.setup();
      stubGeolocation((ok) =>
        ok({ coords: { latitude: 10, longitude: 10, accuracy: 10 } } as GeolocationPosition),
      );
      const { root, map } = await start({ url: "/?q=nowhere&watching=1" });
      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      expect(root.dataset["mode"]).toBe("wall");

      await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
      await waitFor(() => expect(map.goTo).toHaveBeenCalled());
      expect(root.dataset["mode"]).toBe("map");
      expect(params().get("watching")).toBeNull();
      expect(params().get("cam")).toBeNull();
    });

    it("leaves the wall for the map when the list was not open", async () => {
      const user = userEvent.setup();
      stubGeolocation((ok) =>
        ok({ coords: { latitude: 35.6, longitude: 139.7, accuracy: 10 } } as GeolocationPosition),
      );
      const { root } = await start();
      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
      await waitFor(() => expect(root.dataset["mode"]).toBe("map"));
      expect(params().get("cam")).toBe("tokyo");
    });
  });

  describe("most watching list", () => {
    it("ranks live places, lets one be picked, and focuses it on the way back", async () => {
      const user = userEvent.setup();
      const { root, map } = await start({ url: "/?cam=kilauea" });

      await user.click(screen.getByRole("button", { name: "視聴が多い順" }));
      expect(root.dataset["mode"]).toBe("watching");
      expect(params().get("watching")).toBe("1");
      const list = document.getElementById("watching")!;
      expect(list.hidden).toBe(false);
      const names = within(list)
        .getAllByRole("listitem")
        .map((li) => li.querySelector(".watching__name")!.textContent);
      expect(names).toEqual(["東京の交差点", "ナイロビの水場", "レイキャビクの港"]);

      // The row itself (the jump buttons beside it carry the place name too).
      const row = within(list).getByRole("button", {
        name: (name, el) => el.classList.contains("watching__row") && name.includes("ナイロビの水場"),
      });
      await user.click(row);
      expect(params().get("view")).toBe("nairobi,kilauea");
      // Picking the lead again changes nothing.
      await user.click(row);
      expect(params().get("view")).toBe("nairobi,kilauea");

      await user.click(screen.getByRole("button", { name: "視聴が多い順" }));
      expect(root.dataset["mode"]).toBe("map");
      expect(map.focus).toHaveBeenLastCalledWith(NAIROBI);
    });

    it("hints at the list when nothing is open, and says when the state is unavailable", async () => {
      await start({ url: "/?watching=1", states: null });
      expect(within(panel()).getByText(/一覧から地点を選ぶと/)).toBeTruthy();
      expect(within(document.getElementById("watching")!).getByText(/生存状態を取得できませんでした/)).toBeTruthy();
      expect(screen.getByRole("button", { name: /一覧から地点を選ぶ/ })).toBeTruthy();
    });

    it("shows the empty-filter state in both the list and the panel", async () => {
      await start({ url: "/?watching=1&q=nowhere" });
      const list = document.getElementById("watching")!;
      expect(within(list).getByRole("button", { name: "絞り込みを解除" })).toBeTruthy();
      expect(within(panel()).getByRole("button", { name: "絞り込みを解除" })).toBeTruthy();
    });

    it("leaves the list for the globe with the globe chip", async () => {
      const user = userEvent.setup();
      const { root } = await start({ url: "/?watching=1&cam=tokyo" });
      await user.click(screen.getByRole("button", { name: "地球儀" }));
      expect(root.dataset["mode"]).toBe("globe");
      expect(params().get("watching")).toBeNull();
      await waitFor(() => expect(fakes.globe?.focus).toHaveBeenCalledWith(TOKYO));
    });

    it("jumps from a row to the flat map, bringing that place to the front", async () => {
      const user = userEvent.setup();
      const { root, map } = await start({ url: "/?watching=1&cam=kilauea" });
      const list = document.getElementById("watching")!;

      await user.click(within(list).getByRole("button", { name: "平面図で見る: ナイロビの水場" }));
      expect(root.dataset["mode"]).toBe("map");
      expect(list.hidden).toBe(true);
      expect(params().get("watching")).toBeNull();
      expect(params().get("globe")).toBeNull();
      expect(params().get("view")).toBe("nairobi,kilauea");
      expect(map.focus).toHaveBeenLastCalledWith(NAIROBI);
      expect(fakes.globe).toBeNull();
    });

    it("jumps from a row to the globe", async () => {
      const user = userEvent.setup();
      const { root, map } = await start({ url: "/?watching=1" });
      const list = document.getElementById("watching")!;

      await user.click(within(list).getByRole("button", { name: "地球儀で見る: レイキャビクの港" }));
      expect(root.dataset["mode"]).toBe("globe");
      expect(params().get("watching")).toBeNull();
      expect(params().get("globe")).toBe("1");
      expect(params().get("cam")).toBe("reykjavik");
      await waitFor(() => expect(fakes.globe?.focus).toHaveBeenCalledWith(REYKJAVIK));
      expect(map.focus).not.toHaveBeenCalled();
    });
  });

  describe("video wall", () => {
    it("tiles the open cameras, empties the panel, and goes back to the map", async () => {
      const user = userEvent.setup();
      const { root } = await start({ url: "/?view=tokyo,nairobi" });

      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      expect(root.dataset["mode"]).toBe("wall");
      const wall = document.getElementById("wall")!;
      expect(wall.hidden).toBe(false);
      expect(within(wall).getByText("東京の交差点")).toBeTruthy();
      expect(panel().querySelector("iframe")).toBeNull();

      await user.click(screen.getByRole("button", { name: "地図に戻る" }));
      expect(root.dataset["mode"]).toBe("map");
      expect(wall.hidden).toBe(true);
      expect(wall.childElementCount).toBe(0);
    });

    it("closes a camera from its wall cell with undo, and toggles sound from the lead cell", async () => {
      const user = userEvent.setup();
      const { root } = await start({ url: "/?view=tokyo,nairobi" });
      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      const wall = document.getElementById("wall")!;

      await user.click(within(wall).getByRole("button", { name: "音を出す" }));
      expect(localStorage.getItem("somewhere-now:sound")).toBe("on");
      expect(within(wall).getByRole("button", { name: "音を出す" }).getAttribute("aria-pressed")).toBe("true");

      const cell = within(wall).getByText("ナイロビの水場").closest<HTMLElement>(".wall__cell")!;
      await user.click(within(cell).getByRole("button", { name: "閉じる" }));
      expect(root.dataset["mode"]).toBe("wall");
      expect(params().get("cam")).toBe("tokyo");
      expect(within(wall).queryByText("ナイロビの水場")).toBeNull();
      const undo = screen.getByRole("button", { name: "元に戻す" });
      expect(document.activeElement).toBe(undo);
      await user.click(undo);
      expect(params().get("view")).toBe("tokyo,nairobi");
      expect(within(wall).getByText("ナイロビの水場")).toBeTruthy();
    });

    it("offers the way back from an empty wall", async () => {
      const user = userEvent.setup();
      const { root } = await start();
      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      const wall = document.getElementById("wall")!;
      await user.click(within(wall).getByRole("button", { name: "地図に戻る" }));
      expect(root.dataset["mode"]).toBe("map");
    });

    it("switches from the wall to the list, and from the list to the wall", async () => {
      const user = userEvent.setup();
      const { root } = await start();
      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      await user.click(screen.getByRole("button", { name: "視聴が多い順" }));
      expect(root.dataset["mode"]).toBe("watching");

      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      expect(root.dataset["mode"]).toBe("wall");
      expect(params().get("watching")).toBeNull();
    });

    it("returns to the flat map with the map chip", async () => {
      const user = userEvent.setup();
      const { root } = await start();
      await user.click(screen.getByRole("button", { name: "並べて見る" }));
      await user.click(screen.getByRole("button", { name: "平面図" }));
      expect(root.dataset["mode"]).toBe("map");
      // Pressing the map chip on the map changes nothing.
      await user.click(screen.getByRole("button", { name: "平面図" }));
      expect(root.dataset["mode"]).toBe("map");
    });
  });

  describe("globe", () => {
    it("loads the globe on demand and hands it the current picture", async () => {
      const user = userEvent.setup();
      const { root } = await start({ url: "/?cam=tokyo" });
      await user.click(screen.getByRole("button", { name: "地球儀" }));

      expect(root.dataset["mode"]).toBe("globe");
      expect(params().get("globe")).toBe("1");
      await waitFor(() => expect(fakes.globe).not.toBeNull());
      const globe = fakes.globe as FakeView;
      await waitFor(() => expect(globe.setSelected).toHaveBeenCalledWith(["tokyo"]));
      expect(globe.setVisible).toHaveBeenCalledWith(ALL_CAMS);

      // Selecting on the globe focuses there, not on the flat map.
      globe.onSelect("nairobi");
      await waitFor(() => expect(globe.focus).toHaveBeenCalledWith(NAIROBI));
      expect(fakes.createGlobeView).toHaveBeenCalledTimes(1);
    });

    it("starts on the globe from the URL and draws night on both views", async () => {
      const { map } = await start({ url: "/?globe=1" });
      expect(map.drawTerminator).toHaveBeenCalled();
      expect(map.playIntro).not.toHaveBeenCalled();
      await waitFor(() => expect(fakes.globe?.drawTerminator).toHaveBeenCalled());
    });

    it("says the globe is loading until it is ready", async () => {
      const user = userEvent.setup();
      fakes.createGlobeView.mockReturnValue(new Promise(() => {}));
      await start();
      await user.click(screen.getByRole("button", { name: "地球儀" }));
      expect(within(document.getElementById("globe")!).getByText("地球儀を読み込み中…")).toBeTruthy();
    });

    it("falls back to the unsupported view when the globe cannot start", async () => {
      const user = userEvent.setup();
      fakes.createGlobeView.mockRejectedValue(new Error("WebGL2 is required"));
      fakes.createUnsupportedView.mockImplementation((_el, _lang) => fakes.makeView(() => {}));
      await start();
      await user.click(screen.getByRole("button", { name: "地球儀" }));
      await waitFor(() => expect(fakes.createUnsupportedView).toHaveBeenCalled());
    });

    it("says the globe is unsupported when even the fallback fails", async () => {
      const user = userEvent.setup();
      fakes.createGlobeView.mockRejectedValue(new Error("boom"));
      fakes.createUnsupportedView.mockImplementation(() => {
        throw new Error("also boom");
      });
      await start();
      await user.click(screen.getByRole("button", { name: "地球儀" }));
      await waitFor(() =>
        expect(within(document.getElementById("globe")!).getByText(/地球儀を表示できません/)).toBeTruthy(),
      );
    });

    it("moves the globe too when locating while on the globe", async () => {
      const user = userEvent.setup();
      Object.defineProperty(navigator, "geolocation", {
        configurable: true,
        value: {
          getCurrentPosition: (ok: PositionCallback) =>
            ok({ coords: { latitude: 47.3, longitude: 8.5, accuracy: 3_000 } } as GeolocationPosition),
        },
      });
      await start({ url: "/?globe=1" });
      await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
      await waitFor(() =>
        expect(fakes.globe?.goTo).toHaveBeenCalledWith({ center: [47.3, 8.5], zoom: 11 } satisfies MapViewport),
      );
      // The nearest live camera opens, and the globe stays.
      expect(params().get("cam")).toBe("reykjavik");
      expect(params().get("globe")).toBe("1");
      Object.defineProperty(navigator, "geolocation", { configurable: true, value: undefined });
    });

    it("warms the globe runtime once the page has loaded", async () => {
      const idle = vi.fn((cb: () => void) => cb());
      vi.stubGlobal("requestIdleCallback", idle);
      await start();
      await waitFor(() => expect(fakes.prefetchGlobeRuntime).toHaveBeenCalled());
      vi.unstubAllGlobals();
    });
  });

  it("marks a camera the player cannot embed without waiting for the server", async () => {
    const { map } = await start({ url: "/?cam=nairobi" });
    const frame = panel().querySelector("iframe")!;
    const report = () =>
      window.dispatchEvent(
        new MessageEvent("message", {
          data: JSON.stringify({ event: "onError", info: 150 }),
          source: frame.contentWindow as Window,
          origin: "https://www.youtube-nocookie.com",
        }),
      );
    const before = map.setStates.mock.calls.length;
    report();
    expect(map.setStates.mock.lastCall![0].get("nairobi")).toEqual({
      videoId: "live-vid",
      status: "blocked",
      viewers: null,
    });
    // The same report again does not redraw.
    const after = map.setStates.mock.calls.length;
    expect(after).toBe(before + 1);
    report();
    expect(map.setStates.mock.calls.length).toBe(after);
  });

  it("collapses the filter row when the map is touched", async () => {
    const user = userEvent.setup();
    const { root } = await start();
    await user.click(screen.getByRole("button", { name: "絞り込み" }));
    expect(root.dataset["filters"]).toBe("open");

    fireEvent.pointerDown(root.querySelector(".stage")!);
    expect(root.dataset["filters"]).toBe("closed");
    // Touching again while closed changes nothing.
    fireEvent.pointerDown(root.querySelector(".stage")!);
    expect(root.dataset["filters"]).toBe("closed");
  });

  it("collapses the filter row once a camera is picked", async () => {
    const user = userEvent.setup();
    const { root, map } = await start();
    await user.click(screen.getByRole("button", { name: "絞り込み" }));
    map.onSelect("tokyo");
    map.onSelect("reykjavik");
    expect(root.dataset["filters"]).toBe("closed");
  });

  it("resizes the map when the window or the panel width changes", async () => {
    const user = userEvent.setup();
    const { map } = await start();
    map.invalidate.mockClear();
    window.dispatchEvent(new Event("resize"));
    expect(map.invalidate).toHaveBeenCalled();

    map.invalidate.mockClear();
    screen.getByRole("separator").focus();
    await user.keyboard("{Home}");
    await waitFor(() => expect(map.invalidate).toHaveBeenCalled());
    expect(localStorage.getItem("somewhere-now:panel-width")).toBe("280");
  });

  it("switches the whole screen to English", async () => {
    const user = userEvent.setup();
    await start({ url: "/?cam=tokyo" });
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(params().get("lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(within(panel()).getByRole("heading", { name: "Tokyo Crossing" })).toBeTruthy();
    expect(screen.getByRole("separator").getAttribute("aria-label")).toBe("Resize panel");
    // The two asides are landmarks and must stay distinguishable by name in either language.
    expect(screen.getByRole("complementary", { name: "Selected camera" })).toBe(panel());
    expect(screen.getByRole("complementary", { name: "Live count and pin colors" })).toBeTruthy();
    expect(within(panel()).getByTitle("Tokyo Crossing").tagName).toBe("IFRAME");
  });

  describe("polling", () => {
    it("refreshes the clock every minute and the live state every two minutes, only while visible", async () => {
      vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "Date"] });
      vi.setSystemTime(new Date("2026-06-01T03:00:00Z"));
      const { map } = await start({ url: "/?cam=tokyo" });
      expect(within(panel()).getByText("12:00")).toBeTruthy();
      const polls = fakes.api.fetchCamStates.mock.calls.length;

      vi.advanceTimersByTime(60_000);
      expect(within(panel()).getByText("12:01")).toBeTruthy();
      expect(map.drawTerminator).toHaveBeenCalled();
      vi.advanceTimersByTime(60_000);
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls + 1);

      // Hidden: nothing runs.
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
      vi.advanceTimersByTime(600_000);
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls + 1);
      // Hidden again while already stopped is harmless.
      document.dispatchEvent(new Event("visibilitychange"));

      // Back in front: catch up at once, then keep the rhythm.
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
      document.dispatchEvent(new Event("visibilitychange"));
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls + 2);
      vi.advanceTimersByTime(120_000);
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls + 3);
    });

    it("does not stack a second poll when the tab reports visible while already polling", async () => {
      vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
      await start();
      const polls = fakes.api.fetchCamStates.mock.calls.length;

      // Some browsers fire visibilitychange without a hidden phase (e.g. on window focus).
      document.dispatchEvent(new Event("visibilitychange"));
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls + 1);

      vi.advanceTimersByTime(120_000);
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls + 2);
    });

    it("keeps the last live state when a later poll fails", async () => {
      vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
      const { map } = await start();
      fakes.api.fetchCamStates.mockResolvedValue(null);
      vi.advanceTimersByTime(120_000);
      await Promise.resolve();
      await Promise.resolve();
      expect(map.setStates.mock.lastCall![0].get("tokyo")).toEqual(live(900));
    });
  });

  it("does not start polling in a tab that opens hidden", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    try {
      await start();
      const polls = fakes.api.fetchCamStates.mock.calls.length;
      vi.advanceTimersByTime(600_000);
      expect(fakes.api.fetchCamStates.mock.calls.length).toBe(polls);
    } finally {
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
    }
  });

});
