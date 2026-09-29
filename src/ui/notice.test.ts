// @vitest-environment jsdom
import { fireEvent, screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { createNotice } from "./notice";

function setup() {
  document.body.replaceChildren();
  const host = document.createElement("div");
  document.body.append(host);
  const notice = createNotice(host);
  const root = host.querySelector<HTMLElement>(".notice")!;
  return { host, notice, root };
}

describe("createNotice", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts hidden and shows the message in a polite live region", () => {
    const { notice, root } = setup();
    expect(root.hidden).toBe(true);

    notice.show("カメラを閉じました", "ja");

    expect(root.hidden).toBe(false);
    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.textContent).toBe("カメラを閉じました");
    expect(screen.getByRole("button", { name: "通知を閉じる" })).toBeTruthy();
  });

  it("labels the dismiss button in the chosen language", () => {
    const { notice } = setup();
    notice.show("Closed", "en");
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeTruthy();
  });

  it("fades out by itself after 8 seconds", () => {
    const { notice, root } = setup();
    notice.show("hello", "ja");
    vi.advanceTimersByTime(7_999);
    expect(root.hidden).toBe(false);
    vi.advanceTimersByTime(1);
    expect(root.hidden).toBe(true);
    expect(screen.getByRole("status", { hidden: true }).textContent).toBe("");
  });

  it("runs the action once and hides when the action button is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { notice, root } = setup();
    const run = vi.fn();
    notice.show("「東京」を閉じました", "ja", { label: "元に戻す", run });

    await user.click(screen.getByRole("button", { name: "元に戻す" }));

    expect(run).toHaveBeenCalledTimes(1);
    expect(root.hidden).toBe(true);
    expect(screen.queryByRole("button", { name: "元に戻す" })).toBeNull();
  });

  it("hides on the dismiss button without running the action", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { notice, root } = setup();
    const run = vi.fn();
    notice.show("msg", "ja", { label: "元に戻す", run });

    await user.click(screen.getByRole("button", { name: "通知を閉じる" }));

    expect(run).not.toHaveBeenCalled();
    expect(root.hidden).toBe(true);
  });

  it("hides on Escape", () => {
    const { notice, root } = setup();
    notice.show("msg", "ja");
    fireEvent.keyDown(within(root).getByRole("button", { name: "通知を閉じる" }), { key: "Escape" });
    expect(root.hidden).toBe(true);
  });

  it("ignores other keys", () => {
    const { notice, root } = setup();
    notice.show("msg", "ja");
    fireEvent.keyDown(root, { key: "Enter" });
    expect(root.hidden).toBe(false);
  });

  it("stays while the pointer rests on it and fades after the pointer leaves", () => {
    const { notice, root } = setup();
    notice.show("msg", "ja");
    fireEvent.pointerEnter(root);
    vi.advanceTimersByTime(20_000);
    expect(root.hidden).toBe(false);

    fireEvent.pointerLeave(root);
    vi.advanceTimersByTime(8_000);
    expect(root.hidden).toBe(true);
  });

  it("keeps a held notice up when it is replaced by a new message", () => {
    const { notice, root } = setup();
    notice.show("first", "ja");
    fireEvent.pointerEnter(root);
    notice.show("second", "ja");
    vi.advanceTimersByTime(20_000);
    expect(root.hidden).toBe(false);
    expect(screen.getByRole("status").textContent).toBe("second");
  });

  it("stays while focus is inside and fades once focus leaves the notice", () => {
    const { notice, root } = setup();
    const outside = document.createElement("button");
    document.body.append(outside);
    notice.show("msg", "ja", { label: "元に戻す", run: () => {} });
    const undo = screen.getByRole("button", { name: "元に戻す" });
    const dismiss = screen.getByRole("button", { name: "通知を閉じる" });

    fireEvent.focusIn(undo);
    // Moving between its own buttons does not release it.
    fireEvent.focusOut(undo, { relatedTarget: dismiss });
    vi.advanceTimersByTime(20_000);
    expect(root.hidden).toBe(false);

    fireEvent.focusOut(dismiss, { relatedTarget: outside });
    vi.advanceTimersByTime(8_000);
    expect(root.hidden).toBe(true);
  });

  it("does not restart the timer when released after it was already hidden", () => {
    const { notice, root } = setup();
    notice.show("msg", "ja");
    fireEvent.pointerEnter(root);
    notice.hide();
    fireEvent.pointerLeave(root);
    notice.show("again", "ja");
    vi.advanceTimersByTime(8_000);
    expect(root.hidden).toBe(true);
  });

  it("moves focus to the action only when the pressed control vanished", () => {
    const { notice } = setup();
    // Focus is on <body>: the button that was pressed is gone.
    (document.activeElement as HTMLElement | null)?.blur();
    notice.show("msg", "ja", { label: "元に戻す", run: () => {} });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "元に戻す" }));
  });

  it("never pulls focus away from a control that is still there", () => {
    const { notice } = setup();
    const still = document.createElement("button");
    still.textContent = "still here";
    document.body.append(still);
    still.focus();
    notice.show("msg", "ja", { label: "元に戻す", run: () => {} });
    expect(document.activeElement).toBe(still);
  });

  it("does not take focus when there is no action", () => {
    const { notice } = setup();
    (document.activeElement as HTMLElement | null)?.blur();
    notice.show("msg", "ja");
    expect(document.activeElement).toBe(document.body);
  });
});
