// @vitest-environment jsdom
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { KILAUEA, NAIROBI, REYKJAVIK, TOKYO } from "./__fixtures__/cams";
import { createWall } from "./wall";

const NO_STATES = new Map();

function setup() {
  document.body.replaceChildren();
  const container = document.createElement("section");
  document.body.append(container);
  const onUnplayable = vi.fn();
  const onBack = vi.fn();
  const wall = createWall(container, onUnplayable, onBack);
  return { container, wall, onUnplayable, onBack };
}

function mutedParams(container: HTMLElement): string[] {
  return [...container.querySelectorAll("iframe")].map(
    (frame) => new URL(frame.src).searchParams.get("mute") ?? "",
  );
}

describe("createWall", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("explains an empty wall and offers the way back to the map", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container, wall, onBack } = setup();

    wall.update([], NO_STATES, "ja", false);

    expect(container.dataset["count"]).toBe("0");
    expect(container.getAttribute("aria-label")).toBe("並べて見る");
    expect(screen.getByRole("heading", { name: "並べるカメラがまだありません" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "地図に戻る" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("repaints the empty message when the language changes", () => {
    const { wall } = setup();
    wall.update([], NO_STATES, "ja", false);
    wall.update([], NO_STATES, "en", false);
    expect(screen.getByRole("heading", { name: "Nothing to show side by side yet" })).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Back to map" })).toHaveLength(1);
  });

  it("places captions at once and starts the players one at a time", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK, KILAUEA], NO_STATES, "ja", false);

    expect(container.dataset["count"]).toBe("3");
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByText("東京の交差点")).toBeTruthy();
    expect(screen.getByText("レイキャビクの港")).toBeTruthy();
    expect(container.querySelectorAll("iframe")).toHaveLength(0);

    vi.advanceTimersByTime(0);
    expect(container.querySelectorAll("iframe")).toHaveLength(1);
    vi.advanceTimersByTime(1_500);
    expect(container.querySelectorAll("iframe")).toHaveLength(2);
    vi.advanceTimersByTime(1_500);
    expect(container.querySelectorAll("iframe")).toHaveLength(3);
  });

  it("lets only the first player make sound, and only when sound is on", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK], NO_STATES, "ja", true);
    vi.advanceTimersByTime(3_000);
    expect(mutedParams(container)).toEqual(["0", "1"]);
  });

  it("keeps every player muted while sound is off", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK], NO_STATES, "ja", false);
    vi.advanceTimersByTime(3_000);
    expect(mutedParams(container)).toEqual(["1", "1"]);
  });

  it("does not create a duplicate frame when re-rendered while a cell waits", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK], NO_STATES, "ja", false);
    wall.update([TOKYO, REYKJAVIK], NO_STATES, "en", false);
    vi.advanceTimersByTime(5_000);

    expect(container.querySelectorAll(".wall__cell")).toHaveLength(2);
    expect(container.querySelectorAll("iframe")).toHaveLength(2);
    // Captions follow the language without rebuilding the cell.
    expect(screen.getByText("Tokyo Crossing")).toBeTruthy();
  });

  it("leaves running players untouched and only toggles sound on re-render", () => {
    const { container, wall } = setup();
    wall.update([TOKYO], NO_STATES, "ja", false);
    vi.advanceTimersByTime(0);
    const frame = container.querySelector("iframe")!;
    const post = vi.spyOn(frame.contentWindow!, "postMessage").mockImplementation(() => {});

    wall.update([TOKYO], NO_STATES, "ja", true);

    expect(container.querySelector("iframe")).toBe(frame);
    expect(JSON.parse(post.mock.calls[0]![0] as string).func).toBe("unMute");
  });

  it("drops cameras that are no longer selected, including ones still waiting", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK, NAIROBI], NO_STATES, "ja", false);
    vi.advanceTimersByTime(0);

    wall.update([REYKJAVIK], NO_STATES, "ja", false);
    vi.advanceTimersByTime(10_000);

    expect(screen.queryByText("東京の交差点")).toBeNull();
    expect(screen.queryByText("ナイロビの水場")).toBeNull();
    expect(container.querySelectorAll(".wall__cell")).toHaveLength(1);
    expect(container.querySelectorAll("iframe")).toHaveLength(1);
  });

  it("forwards an unplayable report with the camera id", () => {
    const { container, wall, onUnplayable } = setup();
    wall.update([KILAUEA], NO_STATES, "ja", false);
    vi.advanceTimersByTime(0);
    const frame = container.querySelector("iframe")!;
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ event: "onError", info: 101 }),
        source: frame.contentWindow as Window,
      }),
    );
    expect(onUnplayable).toHaveBeenCalledWith("kilauea");
  });

  it("does not start a player for a cell that left the page while waiting", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK], NO_STATES, "ja", false);
    const detached = container.querySelectorAll(".wall__cell")[1]!;
    detached.remove();
    vi.advanceTimersByTime(5_000);
    expect(container.querySelectorAll("iframe")).toHaveLength(1);
    // Checked on the detached cell itself: the container would not show a frame mounted there.
    expect(detached.querySelector("iframe")).toBeNull();
  });

  it("empties the container on teardown", () => {
    const { container, wall } = setup();
    wall.update([TOKYO, REYKJAVIK], NO_STATES, "ja", false);
    vi.advanceTimersByTime(0);

    wall.teardown();
    vi.advanceTimersByTime(5_000);

    expect(container.childElementCount).toBe(0);
    expect(container.dataset["count"]).toBeUndefined();
  });
});
