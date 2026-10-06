// @vitest-environment jsdom
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { PublicCamState } from "../domain/cams";
import { NAIROBI, REYKJAVIK, TOKYO, live } from "./__fixtures__/cams";
import { createWatchingList, type WatchingContext } from "./watching";

const NOW = new Date("2026-06-01T03:00:00Z");

function ctx(overrides: Partial<WatchingContext> = {}): WatchingContext {
  return {
    lang: "ja",
    now: NOW,
    states: new Map<string, PublicCamState>([
      ["tokyo", live(12_345)],
      ["reykjavik", live(80)],
      ["nairobi", live(null)],
    ]),
    ready: "ready",
    filtered: false,
    ...overrides,
  };
}

function setup() {
  document.body.replaceChildren();
  const container = document.createElement("section");
  document.body.append(container);
  const onPick = vi.fn();
  const onJump = vi.fn();
  const onClear = vi.fn();
  const list = createWatchingList(container, { onPick, onJump, onClearFilters: onClear });
  return { container, list, onPick, onJump, onClear };
}

/** The row button (not the jump buttons next to it, whose labels also carry the place name). */
function rowButton(name: RegExp): HTMLElement {
  return screen.getByRole("button", {
    name: (accessibleName, element) =>
      element.classList.contains("watching__row") && name.test(accessibleName),
  });
}

function rowNames(): string[] {
  return screen
    .getAllByRole("listitem")
    .map((item) => item.querySelector(".watching__name")?.textContent ?? "");
}

describe("createWatchingList", () => {
  it("lists ranked places with rank, local time and viewer count", () => {
    const { container, list } = setup();
    list.update([TOKYO, REYKJAVIK, NAIROBI], [], ctx());

    expect(container.getAttribute("aria-label")).toBe("視聴が多い順");
    expect(screen.getByRole("heading", { name: "いま視聴されている配信" })).toBeTruthy();
    expect(screen.getByText("3 地点")).toBeTruthy();
    expect(rowNames()).toEqual(["東京の交差点", "レイキャビクの港", "ナイロビの水場"]);

    const first = rowButton(/東京の交差点/);
    expect(within(first).getByText("1")).toBeTruthy();
    expect(within(first).getByText("12,345 人が視聴中")).toBeTruthy();
    // 03:00 UTC is 12:00 in Tokyo.
    expect(within(first).getByText(/街 · 日本 · 12:00/)).toBeTruthy();

    // An unknown count leaves the slot empty rather than showing a placeholder dash (SHIG 1, 11).
    const unknownViewers = rowButton(/ナイロビの水場/);
    expect(within(unknownViewers).queryByText("—")).toBeNull();
    expect(unknownViewers.querySelector(".watching__viewers")!.textContent).toBe("");
  });

  it("formats viewer counts for English", () => {
    const { list } = setup();
    list.update([TOKYO], [], ctx({ lang: "en" }));
    expect(screen.getByText("12,345 watching")).toBeTruthy();
    expect(screen.getByText("1 places")).toBeTruthy();
  });

  it("marks the lead camera as current", () => {
    const { list } = setup();
    list.update([TOKYO, REYKJAVIK], ["reykjavik", "tokyo"], ctx());
    expect(rowButton(/レイキャビク/).getAttribute("aria-current")).toBe("true");
    expect(rowButton(/東京/).hasAttribute("aria-current")).toBe(false);
  });

  it("reports the picked camera", async () => {
    const user = userEvent.setup();
    const { list, onPick } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    await user.click(rowButton(/レイキャビク/));
    expect(onPick).toHaveBeenCalledWith("reykjavik");
  });

  it("offers a jump to the flat map and to the globe next to every row", async () => {
    const user = userEvent.setup();
    const { list, onJump, onPick } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());

    const flat = screen.getByRole("button", { name: "平面図で見る: レイキャビクの港" });
    const globe = screen.getByRole("button", { name: "地球儀で見る: レイキャビクの港" });
    expect(flat.textContent).toBe("平面図");
    expect(globe.textContent).toBe("地球儀");
    expect(flat.title).toBe("平面図で見る");
    // The jump sits next to the row, not inside it (buttons cannot nest).
    expect(flat.closest(".watching__row")).toBeNull();
    expect(flat.closest(".watching__item")).toBe(rowButton(/レイキャビク/).closest(".watching__item"));

    await user.click(flat);
    expect(onJump).toHaveBeenCalledWith("reykjavik", "flat");
    await user.click(globe);
    expect(onJump).toHaveBeenCalledWith("reykjavik", "globe");
    expect(onPick).not.toHaveBeenCalled();
  });

  it("relabels the jump buttons with the language", () => {
    const { list } = setup();
    list.update([TOKYO], [], ctx());
    list.update([TOKYO], [], ctx({ lang: "en" }));
    const flat = screen.getByRole("button", { name: "Show on the map: Tokyo Crossing" });
    expect(flat.textContent).toBe("Map");
    expect(screen.getByRole("button", { name: "Show on the globe: Tokyo Crossing" })).toBeTruthy();
  });

  it("reuses the rows when the order is unchanged and only repaints them", () => {
    const { list } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    const before = rowButton(/東京/);

    list.update(
      [TOKYO, REYKJAVIK],
      ["tokyo"],
      ctx({ states: new Map([["tokyo", live(99)], ["reykjavik", live(1)]]) }),
    );

    const after = rowButton(/東京/);
    expect(after).toBe(before);
    expect(within(after).getByText("99 人が視聴中")).toBeTruthy();
    expect(after.getAttribute("aria-current")).toBe("true");
  });

  it("rebuilds the rows when the order changes", () => {
    const { list } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    const before = rowButton(/東京/);
    list.update([REYKJAVIK, TOKYO], [], ctx());
    expect(rowButton(/東京/)).not.toBe(before);
    expect(rowNames()).toEqual(["レイキャビクの港", "東京の交差点"]);
  });

  it("keeps the scroll position across a repaint", () => {
    const { container, list } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    container.scrollTop = 120;
    list.update([REYKJAVIK, TOKYO], [], ctx());
    expect(container.scrollTop).toBe(120);
  });

  it("says the state is still loading", () => {
    const { list } = setup();
    list.update([], [], ctx({ ready: "loading" }));
    expect(screen.getByText("状態を確認中")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("says the state could not be loaded", () => {
    const { list } = setup();
    list.update([], [], ctx({ ready: "unavailable", filtered: true }));
    expect(screen.getByText(/生存状態を取得できませんでした/)).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("says nothing is live when no filter is applied", () => {
    const { list } = setup();
    list.update([], [], ctx());
    expect(screen.getByText(/いま配信しているカメラがありません/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "絞り込みを解除" })).toBeNull();
  });

  it("offers to clear the filters when they caused the empty list", async () => {
    const user = userEvent.setup();
    const { list, onClear } = setup();
    list.update([TOKYO], [], ctx());
    list.update([], [], ctx({ filtered: true }));

    expect(screen.queryByRole("listitem")).toBeNull();
    expect(screen.getByText(/条件に合うカメラがありません/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "絞り込みを解除" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("rebuilds after an empty state even for the same ranking", () => {
    const { list } = setup();
    list.update([TOKYO], [], ctx());
    list.update([], [], ctx());
    list.update([TOKYO], [], ctx());
    expect(rowNames()).toEqual(["東京の交差点"]);
  });

  it("empties itself on teardown", () => {
    const { container, list } = setup();
    list.update([TOKYO], [], ctx());
    list.teardown();
    expect(container.childElementCount).toBe(0);
    list.update([TOKYO], [], ctx());
    expect(rowNames()).toEqual(["東京の交差点"]);
  });
});
