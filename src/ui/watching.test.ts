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
  const onClear = vi.fn();
  const list = createWatchingList(container, onPick, onClear);
  return { container, list, onPick, onClear };
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

    const first = screen.getByRole("button", { name: /東京の交差点/ });
    expect(within(first).getByText("1")).toBeTruthy();
    expect(within(first).getByText("12,345 人が視聴中")).toBeTruthy();
    // 03:00 UTC is 12:00 in Tokyo.
    expect(within(first).getByText(/街 · 日本 · 12:00/)).toBeTruthy();

    const unknownViewers = screen.getByRole("button", { name: /ナイロビの水場/ });
    expect(within(unknownViewers).getByText("—")).toBeTruthy();
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
    expect(screen.getByRole("button", { name: /レイキャビク/ }).getAttribute("aria-current")).toBe("true");
    expect(screen.getByRole("button", { name: /東京/ }).hasAttribute("aria-current")).toBe(false);
  });

  it("reports the picked camera", async () => {
    const user = userEvent.setup();
    const { list, onPick } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    await user.click(screen.getByRole("button", { name: /レイキャビク/ }));
    expect(onPick).toHaveBeenCalledWith("reykjavik");
  });

  it("reuses the rows when the order is unchanged and only repaints them", () => {
    const { list } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    const before = screen.getByRole("button", { name: /東京/ });

    list.update(
      [TOKYO, REYKJAVIK],
      ["tokyo"],
      ctx({ states: new Map([["tokyo", live(99)], ["reykjavik", live(1)]]) }),
    );

    const after = screen.getByRole("button", { name: /東京/ });
    expect(after).toBe(before);
    expect(within(after).getByText("99 人が視聴中")).toBeTruthy();
    expect(after.getAttribute("aria-current")).toBe("true");
  });

  it("rebuilds the rows when the order changes", () => {
    const { list } = setup();
    list.update([TOKYO, REYKJAVIK], [], ctx());
    const before = screen.getByRole("button", { name: /東京/ });
    list.update([REYKJAVIK, TOKYO], [], ctx());
    expect(screen.getByRole("button", { name: /東京/ })).not.toBe(before);
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
