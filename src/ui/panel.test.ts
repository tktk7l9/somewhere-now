// @vitest-environment jsdom
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { PublicCamState } from "../domain/cams";
import type { PlaceOverview } from "../domain/placeOverview";
import type { Weather } from "../domain/weather";
import { KILAUEA, REYKJAVIK, TOKYO, blocked, live, offline } from "./__fixtures__/cams";
import { createPanel, type PanelContext, type PanelHandlers } from "./panel";

const api = vi.hoisted(() => ({
  fetchWeather: vi.fn<(lat: number, lng: number) => Promise<Weather | null>>(),
  fetchPlaceOverview: vi.fn<
    (lat: number, lng: number, lang: string, name: { ja: string; en: string }) => Promise<PlaceOverview | null>
  >(),
}));
vi.mock("../api/client", () => api);

const NOW = new Date("2026-06-01T03:00:00Z");

function ctx(overrides: Partial<PanelContext> = {}): PanelContext {
  return {
    lang: "ja",
    now: NOW,
    states: new Map<string, PublicCamState>(),
    favoriteIds: new Set(),
    soundOn: false,
    ...overrides,
  };
}

function setup() {
  document.body.replaceChildren();
  const container = document.createElement("aside");
  document.body.append(container);
  const handlers: { [K in keyof PanelHandlers]: ReturnType<typeof vi.fn> } = {
    onToggleSound: vi.fn(),
    onToggleFavorite: vi.fn(),
    onClose: vi.fn(),
    onFocus: vi.fn(),
    onUnplayable: vi.fn(),
    onClearFilters: vi.fn(),
  };
  const panel = createPanel(container, handlers as unknown as PanelHandlers);
  return { container, panel, handlers };
}

describe("createPanel", () => {
  beforeEach(() => {
    api.fetchWeather.mockReset().mockResolvedValue(null);
    api.fetchPlaceOverview.mockReset().mockResolvedValue(null);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows what to do next and how to read the pins when nothing is open", () => {
    const { panel } = setup();
    panel.update([], ctx());
    expect(screen.getByRole("heading", { name: "まだ何も選んでいません" })).toBeTruthy();
    expect(screen.getByText(/地図のマーカーを選ぶと/)).toBeTruthy();
    expect(screen.getByRole("note", { name: /琥珀は配信中/ })).toBeTruthy();
    expect(screen.getByText("配信中")).toBeTruthy();
    expect(screen.getByText("止まっている")).toBeTruthy();
  });

  it("points to the list while the list is open", () => {
    const { panel } = setup();
    panel.update([], ctx(), "watching");
    expect(screen.getByText(/一覧から地点を選ぶと/)).toBeTruthy();
  });

  it("offers to clear the filters when they hide everything", async () => {
    const user = userEvent.setup();
    const { panel, handlers } = setup();
    panel.update([], ctx(), "noMatch");
    expect(screen.queryByRole("heading")).toBeNull();
    await user.click(screen.getByRole("button", { name: "絞り込みを解除" }));
    expect(handlers.onClearFilters).toHaveBeenCalledTimes(1);
  });

  it("plays the lead camera muted and shows its place, time and viewers", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx({ states: new Map([["tokyo", live(4_321, "tok-live")]]) }));

    const frame = container.querySelector("iframe")!;
    expect(new URL(frame.src).pathname).toBe("/embed/tok-live");
    expect(new URL(frame.src).searchParams.get("mute")).toBe("1");
    expect(screen.getByRole("heading", { name: "東京の交差点" })).toBeTruthy();
    expect(screen.getByText("街 · 日本")).toBeTruthy();
    expect(screen.getByText("12:00")).toBeTruthy();
    expect(screen.getByText("UTC+9")).toBeTruthy();
    expect(screen.getByText(/4,321 人が視聴中/)).toBeTruthy();
    const link = screen.getByRole("link", { name: "YouTube で見る" }) as HTMLAnchorElement;
    expect(link.href).toBe("https://www.youtube.com/watch?v=tok-live");
    expect(link.rel).toBe("noopener noreferrer");
  });

  it("groups the viewer count in the UI language, not the browser's", () => {
    // Pretend the browser runs in German: the default locale groups with dots.
    const original = Number.prototype.toLocaleString;
    vi.spyOn(Number.prototype, "toLocaleString").mockImplementation(function (this: number, locale, options) {
      return original.call(this, locale ?? "de-DE", options);
    });
    const { panel } = setup();
    panel.update([TOKYO], ctx({ lang: "en", states: new Map([["tokyo", live(4_321)]]) }));
    expect(screen.getByText(/4,321 watching/)).toBeTruthy();
  });

  it("names the lead frame in the UI language and renames it on switch without remounting", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx({ lang: "en" }));
    const frame = container.querySelector("iframe")!;
    expect(frame.title).toBe("Tokyo Crossing");

    panel.update([TOKYO], ctx({ lang: "ja" }));
    expect(container.querySelector("iframe")).toBe(frame);
    expect(frame.title).toBe("東京の交差点");
  });

  it("starts with sound when the user has turned sound on", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx({ soundOn: true }));
    expect(new URL(container.querySelector("iframe")!.src).searchParams.get("mute")).toBe("0");
    expect(screen.getByRole("button", { name: "音を消す" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("shows why a stopped stream cannot play instead of a player", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx({ states: new Map([["tokyo", offline()]]) }));
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByText("配信していません")).toBeTruthy();
    expect(screen.getByText(/この配信は今止まっています/)).toBeTruthy();
  });

  it("explains a stream that refuses embedding", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx({ states: new Map([["tokyo", blocked()]]) }));
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByText("埋め込み不可")).toBeTruthy();
    expect(screen.getByText(/外部サイトでの再生が許可されていません/)).toBeTruthy();
    // The YouTube link still goes to the recorded video.
    expect((screen.getByRole("link") as HTMLAnchorElement).href).toContain("v=blocked-vid");
  });

  it("wires sound, favorite and close to the lead camera", async () => {
    const user = userEvent.setup();
    const { panel, handlers } = setup();
    panel.update([TOKYO], ctx({ favoriteIds: new Set(["tokyo"]) }));

    await user.click(screen.getByRole("button", { name: "音を出す" }));
    await user.click(screen.getByRole("button", { name: "お気に入りから外す" }));
    await user.click(screen.getByRole("button", { name: "閉じる" }));

    expect(handlers.onToggleSound).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleFavorite).toHaveBeenCalledWith("tokyo");
    expect(handlers.onClose).toHaveBeenCalledWith("tokyo");
    expect(screen.getByRole("button", { name: "お気に入りから外す" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("keeps the same player when only the surroundings change", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx());
    const frame = container.querySelector("iframe")!;
    const post = vi.spyOn(frame.contentWindow!, "postMessage").mockImplementation(() => {});

    panel.update([TOKYO, REYKJAVIK], ctx({ lang: "en", soundOn: true }));

    expect(container.querySelector("iframe")).toBe(frame);
    expect(JSON.parse(post.mock.calls.at(-1)![0] as string).func).toBe("unMute");
    expect(screen.getByRole("heading", { name: "Tokyo Crossing" })).toBeTruthy();
    expect(screen.getByText("City · Japan")).toBeTruthy();
  });

  it("swaps the player only when the lead changes", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx());
    const first = container.querySelector("iframe")!;
    panel.update([KILAUEA, TOKYO], ctx());
    expect(first.isConnected).toBe(false);
    expect(container.querySelectorAll("iframe")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "キラウエア火山" })).toBeTruthy();
  });

  it("stops the player when everything is closed", () => {
    const { container, panel } = setup();
    panel.update([TOKYO], ctx());
    panel.update([], ctx());
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("heading", { name: "まだ何も選んでいません" })).toBeTruthy();
  });

  it("lists the other open cameras with their status in words", async () => {
    const user = userEvent.setup();
    const { panel, handlers } = setup();
    panel.update(
      [TOKYO, REYKJAVIK, KILAUEA],
      ctx({ states: new Map([["reykjavik", live(3)], ["kilauea", offline()]]) }),
    );

    expect(screen.getByRole("heading", { name: "開いているカメラ" })).toBeTruthy();
    const row = screen.getByText("レイキャビクの港").closest<HTMLElement>(".openrow")!;
    expect(within(row).getByText("配信中")).toBeTruthy();
    const other = screen.getByText("キラウエア火山").closest<HTMLElement>(".openrow")!;
    expect(within(other).getByText("配信していません")).toBeTruthy();

    await user.click(within(row).getByRole("button", { name: "これを見る" }));
    await user.click(within(other).getByRole("button", { name: "閉じる" }));
    expect(handlers.onFocus).toHaveBeenCalledWith("reykjavik");
    expect(handlers.onClose).toHaveBeenCalledWith("kilauea");
  });

  it("clears the list of other cameras when only the lead remains", () => {
    const { panel } = setup();
    panel.update([TOKYO, REYKJAVIK], ctx());
    panel.update([TOKYO], ctx());
    expect(screen.queryByRole("heading", { name: "開いているカメラ" })).toBeNull();
  });

  it("fills in the weather when it arrives", async () => {
    api.fetchWeather.mockResolvedValue({ code: 0, isDay: true, temperatureC: 21.6 });
    const { panel } = setup();
    panel.update([TOKYO], ctx());
    expect(await screen.findByText(/快晴 22°C/)).toBeTruthy();
    expect(api.fetchWeather).toHaveBeenCalledWith(TOKYO.lat, TOKYO.lng);
  });

  it("drops weather that arrives after the camera was closed", async () => {
    let resolve: (w: Weather) => void = () => {};
    api.fetchWeather.mockReturnValue(new Promise((r) => (resolve = r)));
    const { container, panel } = setup();
    panel.update([TOKYO], ctx());
    panel.update([], ctx());
    resolve({ code: 0, isDay: true, temperatureC: 20 });
    await Promise.resolve();
    await Promise.resolve();
    expect(container.textContent).not.toContain("20°C");
  });

  it("shows the place overview with its title and source", async () => {
    api.fetchPlaceOverview.mockResolvedValue({
      title: "渋谷",
      extract: "渋谷は東京都の地名。",
      url: "https://ja.wikipedia.org/wiki/example",
    });
    const { panel } = setup();
    panel.update([TOKYO], ctx());

    expect(await screen.findByText("渋谷は東京都の地名。")).toBeTruthy();
    expect(screen.getByText("渋谷")).toBeTruthy();
    const source = screen.getByRole("link", { name: "出典: Wikipedia" }) as HTMLAnchorElement;
    expect(source.href).toBe("https://ja.wikipedia.org/wiki/example");
    expect(source.target).toBe("_blank");
  });

  it("does not repeat a heading that equals the camera name", async () => {
    api.fetchPlaceOverview.mockResolvedValue({
      title: "東京 の交差点",
      extract: "本文",
      url: "https://example.org",
    });
    const { container, panel } = setup();
    panel.update([TOKYO], ctx());
    await screen.findByText("本文");
    expect(container.querySelector(".card__overview-title")).toBeNull();
  });

  it("fetches the overview once per camera and language", async () => {
    api.fetchPlaceOverview.mockResolvedValue({ title: "x", extract: "body", url: "https://example.org" });
    const { panel } = setup();
    panel.update([TOKYO], ctx());
    panel.update([TOKYO], ctx());
    await screen.findByText("body");
    expect(api.fetchPlaceOverview).toHaveBeenCalledTimes(1);

    panel.update([TOKYO], ctx({ lang: "en" }));
    expect(api.fetchPlaceOverview).toHaveBeenCalledTimes(2);
    expect(api.fetchPlaceOverview).toHaveBeenLastCalledWith(TOKYO.lat, TOKYO.lng, "en", TOKYO.name);
  });

  it("ignores an overview that arrives after the language changed", async () => {
    let resolveJa: (p: PlaceOverview) => void = () => {};
    api.fetchPlaceOverview
      .mockReturnValueOnce(new Promise((r) => (resolveJa = r)))
      .mockResolvedValueOnce({ title: "Shibuya", extract: "English body", url: "https://example.org" });
    const { panel } = setup();
    panel.update([TOKYO], ctx());
    panel.update([TOKYO], ctx({ lang: "en" }));
    resolveJa({ title: "渋谷", extract: "日本語の本文", url: "https://example.org" });

    expect(await screen.findByText("English body")).toBeTruthy();
    expect(screen.queryByText("日本語の本文")).toBeNull();
  });

  it("forwards an unplayable report for the lead", () => {
    const { container, panel, handlers } = setup();
    panel.update([KILAUEA], ctx());
    const frame = container.querySelector("iframe")!;
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ event: "onError", info: 150 }),
        source: frame.contentWindow as Window,
      }),
    );
    expect(handlers.onUnplayable).toHaveBeenCalledWith("kilauea");
  });

  it("exposes the scroll area for the bottom sheet", () => {
    const { container, panel } = setup();
    expect(container.contains(panel.scroll)).toBe(true);
    expect(panel.scroll.className).toBe("panel__scroll");
  });
});
