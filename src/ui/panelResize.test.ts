// @vitest-environment jsdom
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { attachPanelResize } from "./panelResize";

function setViewportWidth(width: number): void {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
}

function setup(stored: string | null = null) {
  document.body.replaceChildren();
  document.documentElement.className = "";
  const app = document.createElement("div");
  const panel = document.createElement("aside");
  app.append(panel);
  document.body.append(app);
  const onChange = vi.fn();
  const onLayout = vi.fn();
  const handle = attachPanelResize({ app, panel, lang: "ja", stored, onChange, onLayout });
  const separator = screen.getByRole("separator");
  const width = () => app.style.getPropertyValue("--panel-w");
  return { app, panel, handle, separator, onChange, onLayout, width };
}

describe("attachPanelResize", () => {
  beforeAll(() => {
    // jsdom does not implement pointer capture.
    HTMLElement.prototype.setPointerCapture ??= () => {};
  });
  beforeEach(() => {
    setViewportWidth(1200);
  });

  it("adds a labelled vertical separator with the current range", () => {
    const { separator, width } = setup();
    expect(separator.getAttribute("aria-label")).toBe("パネルの幅を変える");
    expect(separator.title).toBe("パネルの幅を変える");
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator.getAttribute("aria-valuemin")).toBe("280");
    expect(separator.getAttribute("aria-valuemax")).toBe("640");
    expect(separator.getAttribute("aria-valuenow")).toBe("384");
    expect(width()).toBe("384px");
  });

  it("restores a saved width and ignores a broken one", () => {
    expect(setup("500").width()).toBe("500px");
    expect(setup("wide").width()).toBe("384px");
  });

  it("leaves room for the map on a narrow window", () => {
    setViewportWidth(700);
    const { separator, width } = setup("640");
    expect(width()).toBe("340px");
    expect(separator.getAttribute("aria-valuemax")).toBe("340");
  });

  it("widens with the left arrow and narrows with the right arrow, saving each step", async () => {
    const user = userEvent.setup();
    const { separator, onChange, width } = setup();
    separator.focus();

    await user.keyboard("{ArrowLeft}");
    expect(width()).toBe("400px");
    expect(onChange).toHaveBeenLastCalledWith("400");

    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(width()).toBe("368px");
    expect(onChange).toHaveBeenLastCalledWith("368");
    expect(separator.getAttribute("aria-valuenow")).toBe("368");
  });

  it("jumps to the minimum with Home and the maximum with End", async () => {
    const user = userEvent.setup();
    const { separator, width } = setup();
    separator.focus();
    await user.keyboard("{Home}");
    expect(width()).toBe("280px");
    await user.keyboard("{End}");
    expect(width()).toBe("640px");
  });

  it("ignores other keys", async () => {
    const user = userEvent.setup();
    const { separator, onChange, width } = setup();
    separator.focus();
    await user.keyboard("{ArrowUp}a");
    expect(width()).toBe("384px");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("asks for one layout per frame while the width changes", async () => {
    const user = userEvent.setup();
    const { separator, onLayout } = setup();
    separator.focus();
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    await waitFor(() => expect(onLayout).toHaveBeenCalled());
    expect(onLayout).toHaveBeenCalledTimes(1);
  });

  it("resets to the default on double click", async () => {
    const user = userEvent.setup();
    const { separator, onChange, width } = setup("600");
    await user.dblClick(separator);
    expect(width()).toBe("384px");
    expect(onChange).toHaveBeenLastCalledWith("384");
  });

  it("follows a drag to the left and saves once when released", () => {
    const { separator, onChange, onLayout, width } = setup();
    fireEvent.pointerDown(separator, { button: 0, pointerId: 1, clientX: 800 });
    expect(document.documentElement.classList.contains("resizing-panel")).toBe(true);
    expect(document.activeElement).toBe(separator);

    fireEvent.pointerMove(separator, { pointerId: 1, clientX: 700 });
    expect(width()).toBe("484px");
    // Another pointer does not steer the drag.
    fireEvent.pointerMove(separator, { pointerId: 2, clientX: 100 });
    expect(width()).toBe("484px");
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.pointerUp(separator, { pointerId: 2 });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.pointerUp(separator, { pointerId: 1 });
    expect(onChange).toHaveBeenCalledWith("484");
    expect(onLayout).toHaveBeenCalled();
    expect(document.documentElement.classList.contains("resizing-panel")).toBe(false);

    // After release, moving does nothing.
    fireEvent.pointerMove(separator, { pointerId: 1, clientX: 0 });
    expect(width()).toBe("484px");
  });

  it("ignores a drag with a secondary button", () => {
    const { separator, width } = setup();
    fireEvent.pointerDown(separator, { button: 2, pointerId: 1, clientX: 800 });
    fireEvent.pointerMove(separator, { pointerId: 1, clientX: 600 });
    expect(width()).toBe("384px");
  });

  it("ends the drag when the pointer is cancelled or capture is lost", () => {
    const { separator, onChange } = setup();
    fireEvent.pointerDown(separator, { button: 0, pointerId: 1, clientX: 800 });
    fireEvent.pointerCancel(separator, { pointerId: 3 });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.pointerCancel(separator, { pointerId: 1 });
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.pointerDown(separator, { button: 0, pointerId: 1, clientX: 800 });
    fireEvent(separator, new Event("lostpointercapture"));
    expect(onChange).toHaveBeenCalledTimes(2);
    // A second loss without a drag does not save again.
    fireEvent(separator, new Event("lostpointercapture"));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("refits when the window is resized", () => {
    const { separator, width } = setup("600");
    setViewportWidth(800);
    window.dispatchEvent(new Event("resize"));
    expect(width()).toBe("440px");
    expect(separator.getAttribute("aria-valuemax")).toBe("440");
  });

  it("relabels the handle when the language changes", () => {
    const { handle, separator } = setup();
    handle.setLang("en");
    expect(separator.getAttribute("aria-label")).toBe("Resize panel");
  });
});
