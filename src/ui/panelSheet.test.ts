// @vitest-environment jsdom
import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { attachPanelSheet } from "./panelSheet";

const STAGE_H = 800;
const GRIP_H = 56;

function fixHeight(el: HTMLElement, prop: "clientHeight" | "offsetHeight", value: () => number): void {
  Object.defineProperty(el, prop, { configurable: true, get: value });
}

function setup({ sheet = true }: { sheet?: boolean } = {}) {
  document.body.replaceChildren();
  document.documentElement.className = "";
  const app = document.createElement("div");
  const stage = document.createElement("div");
  const panel = document.createElement("aside");
  const scroll = document.createElement("div");
  panel.append(scroll);
  app.append(stage, panel);
  document.body.append(app);

  // CSS decides whether this screen is a sheet; jsdom has no media queries, so set it inline.
  app.style.setProperty("--sheet", sheet ? "1" : "0");
  panel.style.paddingBottom = "10px";
  fixHeight(stage, "clientHeight", () => STAGE_H);
  // The panel's rendered height follows the --sheet-h the sheet writes.
  fixHeight(panel, "offsetHeight", () => Number.parseFloat(app.style.getPropertyValue("--sheet-h")) || 0);

  const handle = attachPanelSheet({ app, stage, panel, scroll, lang: "ja" });
  const grip = panel.querySelector<HTMLButtonElement>(".panel-grip")!;
  fixHeight(grip, "offsetHeight", () => GRIP_H);
  // Re-measure now that the grip has a height (a rotation does the same in the app).
  window.dispatchEvent(new Event("resize"));
  const height = () => app.style.getPropertyValue("--sheet-h");
  return { app, stage, panel, scroll, handle, grip, height };
}

describe("attachPanelSheet", () => {
  beforeAll(() => {
    HTMLElement.prototype.setPointerCapture ??= () => {};
  });

  it("starts collapsed with the content out of reach", () => {
    const { app, scroll, grip } = setup();
    expect(app.dataset["sheet"]).toBe("peek");
    expect(scroll.inert).toBe(true);
    expect(grip.getAttribute("aria-expanded")).toBe("false");
    expect(grip.title).toBe("パネルを広げる");
    expect(panel(grip).firstElementChild).toBe(grip);
  });

  it("keeps the content reachable when the screen is laid out side by side", () => {
    const { scroll, handle } = setup({ sheet: false });
    expect(scroll.inert).toBe(false);
    expect(handle.obscuredBottom()).toBe(0);
  });

  it("names the lead camera on the grip", () => {
    const { handle } = setup();
    handle.setLabel("東京の交差点");
    expect(screen.getByRole("button", { name: "パネルを広げる — 東京の交差点" })).toBeTruthy();
    // Same text again is a no-op.
    handle.setLabel("東京の交差点");
    expect(screen.getAllByText("東京の交差点")).toHaveLength(1);
  });

  it("opens to half on a tap and closes again on the next", async () => {
    const user = userEvent.setup();
    const { app, scroll, grip, height } = setup();

    await user.click(grip);
    expect(app.dataset["sheet"]).toBe("half");
    expect(height()).toBe(`${Math.round(STAGE_H * 0.56)}px`);
    expect(scroll.inert).toBe(false);
    expect(grip.getAttribute("aria-expanded")).toBe("true");
    expect(grip.title).toBe("パネルを畳む");

    await user.click(grip);
    expect(app.dataset["sheet"]).toBe("peek");
    // Collapsed height = grip + the resolved bottom safe area.
    expect(height()).toBe(`${GRIP_H + 10}px`);
  });

  it("steps through the perches with the arrow keys", () => {
    const { app, grip, height } = setup();
    fireEvent.keyDown(grip, { key: "ArrowUp" });
    expect(app.dataset["sheet"]).toBe("half");
    fireEvent.keyDown(grip, { key: "ArrowUp" });
    expect(app.dataset["sheet"]).toBe("full");
    expect(height()).toBe(`${STAGE_H}px`);
    fireEvent.keyDown(grip, { key: "ArrowUp" });
    expect(app.dataset["sheet"]).toBe("full");

    fireEvent.keyDown(grip, { key: "ArrowDown" });
    fireEvent.keyDown(grip, { key: "ArrowDown" });
    fireEvent.keyDown(grip, { key: "ArrowDown" });
    expect(app.dataset["sheet"]).toBe("peek");
    fireEvent.keyDown(grip, { key: "Enter" });
    expect(app.dataset["sheet"]).toBe("peek");
  });

  it("raises only from collapsed and lowers only when raised", () => {
    const { app, grip, handle } = setup();
    handle.raise();
    expect(app.dataset["sheet"]).toBe("half");
    fireEvent.keyDown(grip, { key: "ArrowUp" });
    handle.raise();
    expect(app.dataset["sheet"]).toBe("full");
    handle.lower();
    expect(app.dataset["sheet"]).toBe("peek");
    handle.lower();
    expect(app.dataset["sheet"]).toBe("peek");
  });

  it("reports how much of the map it covers", () => {
    const { handle } = setup();
    expect(handle.obscuredBottom()).toBe(GRIP_H + 10);
    handle.raise();
    expect(handle.obscuredBottom()).toBe(Math.round(STAGE_H * 0.56));
  });

  it("follows the finger and snaps to the nearest perch on release", () => {
    const { app, grip, height } = setup();
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    // Within the tap slop nothing moves.
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 697 });
    expect(document.documentElement.classList.contains("dragging-sheet")).toBe(false);

    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 100 });
    expect(document.documentElement.classList.contains("dragging-sheet")).toBe(true);
    expect(height()).toBe(`${66 + 600}px`);
    // Another finger does not steer it.
    fireEvent.pointerMove(grip, { pointerId: 2, clientY: 700 });
    expect(height()).toBe("666px");

    fireEvent.pointerUp(grip, { pointerId: 1 });
    expect(app.dataset["sheet"]).toBe("full");
    expect(document.documentElement.classList.contains("dragging-sheet")).toBe(false);

    // The click that follows a drag is swallowed, so the sheet stays where it snapped.
    fireEvent.click(grip);
    expect(app.dataset["sheet"]).toBe("full");
    // The next tap works again.
    fireEvent.click(grip);
    expect(app.dataset["sheet"]).toBe("peek");
  });

  it("never drags taller than the stage or shorter than the grip", () => {
    const { grip, height } = setup();
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: -5_000 });
    expect(height()).toBe(`${STAGE_H}px`);
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 5_000 });
    expect(height()).toBe(`${GRIP_H}px`);
  });

  it("snaps a short drag back to collapsed and a middle one to half", () => {
    const { app, grip } = setup();
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 650 });
    fireEvent.pointerCancel(grip, { pointerId: 1 });
    expect(app.dataset["sheet"]).toBe("peek");

    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 400 });
    fireEvent(grip, new Event("lostpointercapture"));
    expect(app.dataset["sheet"]).toBe("half");
  });

  it("treats a press without movement as a tap", () => {
    const { app, grip } = setup();
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerUp(grip, { pointerId: 1 });
    fireEvent.click(grip);
    expect(app.dataset["sheet"]).toBe("half");
  });

  it("does not lose the next tap when a drag ended outside the grip", () => {
    const { app, grip } = setup();
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 300 });
    fireEvent.pointerUp(grip, { pointerId: 1 });
    expect(app.dataset["sheet"]).toBe("half");
    // No click arrived for that drag. The next grab must reset the discard flag.
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 400 });
    fireEvent.pointerUp(grip, { pointerId: 1 });
    fireEvent.click(grip);
    expect(app.dataset["sheet"]).toBe("peek");
  });

  it("does not drag when the screen is not a sheet or with a secondary button", () => {
    const side = setup({ sheet: false });
    fireEvent.pointerDown(side.grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(side.grip, { pointerId: 1, clientY: 100 });
    expect(document.documentElement.classList.contains("dragging-sheet")).toBe(false);

    const { grip } = setup();
    fireEvent.pointerDown(grip, { button: 2, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 100 });
    expect(document.documentElement.classList.contains("dragging-sheet")).toBe(false);
  });

  it("recomputes heights on resize, but not in the middle of a drag", () => {
    const { grip, handle, height } = setup();
    handle.raise();
    fireEvent.pointerDown(grip, { button: 0, pointerId: 1, clientY: 700 });
    fireEvent.pointerMove(grip, { pointerId: 1, clientY: 600 });
    const during = height();
    window.dispatchEvent(new Event("resize"));
    expect(height()).toBe(during);
    fireEvent.pointerUp(grip, { pointerId: 1 });
    window.dispatchEvent(new Event("resize"));
    expect(height()).not.toBe("");
  });

  it("relabels the grip when the language changes", () => {
    const { grip, handle } = setup();
    handle.setLabel("Tokyo");
    handle.setLang("en");
    expect(grip.getAttribute("aria-label")).toBe("Open the panel — Tokyo");
  });
});

function panel(grip: HTMLElement): HTMLElement {
  return grip.parentElement!;
}
