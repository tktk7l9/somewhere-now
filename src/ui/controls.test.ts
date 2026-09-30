// @vitest-environment jsdom
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { parseUrlState, type ViewState } from "../domain/urlState";
import { createControls, locateFailureMessage, type ControlHandlers, type LocateStatus } from "./controls";

function state(overrides: Partial<ViewState> = {}): ViewState {
  return { ...parseUrlState(""), ...overrides };
}

function setup() {
  document.body.replaceChildren();
  const container = document.createElement("div");
  document.body.append(container);
  const handlers: { [K in keyof ControlHandlers]: ReturnType<typeof vi.fn> } = {
    onChange: vi.fn(),
    onRandom: vi.fn(),
    onLocate: vi.fn(),
    onToggleWall: vi.fn(),
    onToggleWatching: vi.fn(),
    onToggleFilters: vi.fn(),
    onSetGlobe: vi.fn(),
    onClearFilters: vi.fn(),
  };
  const controls = createControls(container, handlers as unknown as ControlHandlers);
  const render = (
    view: ViewState = state(),
    wallOpen = false,
    locate: LocateStatus = "idle",
    filtersOpen = false,
  ) => controls.update(view, wallOpen, locate, filtersOpen);
  return { container, handlers, render };
}

const pressed = (name: string | RegExp) =>
  screen.getByRole("button", { name }).getAttribute("aria-pressed");

describe("createControls", () => {
  it("builds the primary row with the map chip pressed by default", () => {
    const { render } = setup();
    render();

    for (const name of ["どこかへ連れてって", "いまいる場所へ", "並べて見る", "視聴が多い順", "English"]) {
      expect(screen.getByRole("button", { name })).toBeTruthy();
    }
    expect(pressed("平面図")).toBe("true");
    expect(pressed("地球儀")).toBe("false");
    expect(pressed("並べて見る")).toBe("false");
    expect(screen.getByRole("button", { name: "English" }).hasAttribute("aria-pressed")).toBe(false);
    expect(screen.getByRole("searchbox", { name: "地名で絞り込む" })).toBeTruthy();
  });

  it("presses the globe, wall and list chips for their modes", () => {
    const { render } = setup();
    render(state({ globe: true }));
    expect(pressed("地球儀")).toBe("true");
    expect(pressed("平面図")).toBe("false");

    render(state({ watching: true }));
    expect(pressed("視聴が多い順")).toBe("true");
    expect(pressed("地球儀")).toBe("false");

    render(state({ watching: true }), true);
    // In wall mode the wall chip becomes the way back.
    expect(pressed("地図に戻る")).toBe("true");
    expect(pressed("視聴が多い順")).toBe("false");
  });

  it("toggles a category on and off", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    render();
    await user.click(screen.getByRole("button", { name: "火山" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ categories: ["volcano"] });

    render(state({ categories: ["volcano", "city"] }));
    expect(pressed("火山")).toBe("true");
    await user.click(screen.getByRole("button", { name: "火山" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ categories: ["city"] });
  });

  it("flips the live, night and favorites flags", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    render(state({ nightOnly: true }));

    await user.click(screen.getByRole("button", { name: "配信中だけ" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ liveOnly: true });
    await user.click(screen.getByRole("button", { name: "夜の場所だけ" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ nightOnly: false });
    await user.click(screen.getByRole("button", { name: "お気に入りだけ" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ favoritesOnly: true });
  });

  it("routes the mode chips to their handlers", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    render();

    await user.click(screen.getByRole("button", { name: "どこかへ連れてって" }));
    await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
    await user.click(screen.getByRole("button", { name: "平面図" }));
    await user.click(screen.getByRole("button", { name: "地球儀" }));
    await user.click(screen.getByRole("button", { name: "並べて見る" }));
    await user.click(screen.getByRole("button", { name: "視聴が多い順" }));
    await user.click(screen.getByRole("button", { name: "絞り込み" }));

    expect(handlers.onRandom).toHaveBeenCalledTimes(1);
    expect(handlers.onLocate).toHaveBeenCalledTimes(1);
    expect(handlers.onSetGlobe.mock.calls).toEqual([[false], [true]]);
    expect(handlers.onToggleWall).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleWatching).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleFilters).toHaveBeenCalledTimes(1);
  });

  // The chip names the language it switches to, in that language, so it reads neither as the
  // current state nor as a two-way toggle whose direction is unclear (SHIG 49, 71).
  it("switches language both ways, naming the destination", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    render();
    expect(screen.getByRole("button", { name: "English" }).getAttribute("lang")).toBe("en");
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ lang: "en" });

    render(state({ lang: "en" }));
    expect(screen.getByRole("button", { name: "Take me somewhere" })).toBeTruthy();
    expect(screen.getByRole("searchbox", { name: "Filter by name" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "English" })).toBeNull();
    expect(screen.getByRole("button", { name: "日本語" }).getAttribute("lang")).toBe("ja");
    await user.click(screen.getByRole("button", { name: "日本語" }));
    expect(handlers.onChange).toHaveBeenLastCalledWith({ lang: "ja" });
  });

  it("shows the number of active filters on the filters chip and links it to the row", () => {
    const { container, render } = setup();
    render(state({ liveOnly: true, categories: ["city"] }), false, "idle", true);
    const toggle = screen.getByRole("button", { name: "絞り込み 2" });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const controlled = toggle.getAttribute("aria-controls")!;
    expect(container.querySelector(`#${controlled}`)?.contains(screen.getByRole("searchbox"))).toBe(true);
  });

  // The only way out of a filter used to be the empty state; with one result left, every chip
  // had to be turned off by hand (SHIG 60, 22).
  it("offers to clear every filter, only while one is on, without rebuilding the search box", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    render();
    expect(screen.queryByRole("button", { name: "絞り込みを解除" })).toBeNull();

    render(state({ categories: ["city"] }));
    const clear = screen.getByRole("button", { name: "絞り込みを解除" });
    await user.click(clear);
    expect(handlers.onClearFilters).toHaveBeenCalledTimes(1);

    // Typing alone counts as a filter, and the box the person types in stays the same element.
    const search = screen.getByRole("searchbox");
    render(state({ query: "tok" }));
    expect(screen.getByRole("button", { name: "絞り込みを解除" })).toBe(clear);
    expect(screen.getByRole("searchbox")).toBe(search);
    render(state());
    expect(screen.queryByRole("button", { name: "絞り込みを解除" })).toBeNull();

    render(state({ liveOnly: true, lang: "en" }));
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeTruthy();
  });

  it("disables the locate chip and says it is searching while pending", () => {
    const { render } = setup();
    render(state(), false, "pending");
    const locate = screen.getByRole("button", { name: "場所を探しています…" }) as HTMLButtonElement;
    expect(locate.disabled).toBe(true);
    expect(locate.getAttribute("aria-busy")).toBe("true");
  });

  it("keeps the failure reason on the locate chip", () => {
    const { render } = setup();
    render(state(), false, "denied");
    const locate = screen.getByRole("button", { name: /^いまいる場所へ\. / });
    expect(locate.title).toBe("位置情報の利用が許可されていません");
    expect((locate as HTMLButtonElement).disabled).toBe(false);
  });

  it("reports what is typed without replacing the search box", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    render();
    const box = screen.getByRole("searchbox");
    await user.type(box, "tok");

    expect(handlers.onChange).toHaveBeenLastCalledWith({ query: "tok" });
    // A redraw with a different filter row keeps the very same input connected and focused.
    render(state({ query: "tok", liveOnly: true }));
    expect(screen.getByRole("searchbox")).toBe(box);
    expect(box.isConnected).toBe(true);
    expect(document.activeElement).toBe(box);
  });

  it("writes an outside query change back into the box", () => {
    const { render } = setup();
    render(state({ query: "東京" }));
    expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe("東京");
    render(state({ query: "" }));
    expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe("");
  });

  it("does not rebuild rows whose content did not change", () => {
    const { render } = setup();
    render();
    const random = screen.getByRole("button", { name: "どこかへ連れてって" });
    const volcano = screen.getByRole("button", { name: "火山" });
    render();
    expect(screen.getByRole("button", { name: "どこかへ連れてって" })).toBe(random);
    expect(screen.getByRole("button", { name: "火山" })).toBe(volcano);

    // Only the primary row changes (mode): the filter row stays.
    render(state({ globe: true }));
    expect(screen.getByRole("button", { name: "どこかへ連れてって" })).not.toBe(random);
    expect(screen.getByRole("button", { name: "火山" })).toBe(volcano);
  });

  it("returns keyboard focus to the same position after a chip rebuilds its row", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    handlers.onSetGlobe.mockImplementation((globe: boolean) => render(state({ globe })));
    render();

    await user.click(screen.getByRole("button", { name: "地球儀" }));

    const globe = screen.getByRole("button", { name: "地球儀" });
    expect(globe.getAttribute("aria-pressed")).toBe("true");
    expect(document.activeElement).toBe(globe);
  });

  it("parks focus while the locate chip is disabled and returns it when enabled", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    handlers.onLocate.mockImplementation(() => render(state(), false, "pending"));
    render();

    await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
    const pending = screen.getByRole("button", { name: "場所を探しています…" });
    expect(document.activeElement).not.toBe(pending);

    render(state(), false, "idle");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "いまいる場所へ" }));
  });

  it("does not steal focus back from a control the user moved to meanwhile", async () => {
    const user = userEvent.setup();
    const { handlers, render } = setup();
    handlers.onLocate.mockImplementation(() => render(state(), false, "pending"));
    const elsewhere = document.createElement("button");
    elsewhere.textContent = "elsewhere";
    document.body.append(elsewhere);
    render();

    await user.click(screen.getByRole("button", { name: "いまいる場所へ" }));
    elsewhere.focus();
    render(state(), false, "idle");
    expect(document.activeElement).toBe(elsewhere);
  });
});

describe("locateFailureMessage", () => {
  it("words every failure in both languages", () => {
    expect(locateFailureMessage("denied", "ja")).toBe("位置情報の利用が許可されていません");
    expect(locateFailureMessage("unavailable", "en")).toBe("Couldn't find where you are");
    expect(locateFailureMessage("timeout", "ja")).toContain("時間切れ");
    expect(locateFailureMessage("unsupported", "en")).toContain("can't use your location");
  });
});
