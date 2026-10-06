// @vitest-environment jsdom
import { EMBED_ORIGIN } from "../domain/cams";
import { KILAUEA, TOKYO, live } from "./__fixtures__/cams";
import { mountPlayer } from "./player";

function frameMessage(iframe: HTMLIFrameElement, data: unknown, origin = EMBED_ORIGIN): void {
  window.dispatchEvent(
    new MessageEvent("message", { data, source: iframe.contentWindow as Window, origin }),
  );
}

describe("mountPlayer", () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.replaceChildren();
    container = document.createElement("div");
    document.body.append(container);
  });

  it("embeds the known video muted by default with the JS API enabled", () => {
    const player = mountPlayer(container, TOKYO, live(10, "abc123"), { muted: true });
    const url = new URL(player.iframe.src);

    expect(container.querySelector("iframe")).toBe(player.iframe);
    expect(url.pathname).toBe("/embed/abc123");
    expect(url.searchParams.get("mute")).toBe("1");
    expect(url.searchParams.get("autoplay")).toBe("1");
    expect(url.searchParams.get("enablejsapi")).toBe("1");
    expect(url.searchParams.get("origin")).toBe(location.origin);
    expect(player.iframe.title).toBe("東京の交差点");
    // Without compute-pressure the player retries forever (AGENTS.md).
    expect(player.iframe.allow).toContain("compute-pressure");
  });

  it("names the frame in the UI language", () => {
    const player = mountPlayer(container, TOKYO, live(10, "abc123"), { muted: true, lang: "en" });
    expect(player.iframe.title).toBe(TOKYO.name.en);
    player.setTitle(TOKYO.name.ja);
    expect(player.iframe.title).toBe(TOKYO.name.ja);
  });

  it("falls back to the channel's live stream when no video id is known", () => {
    const cam = { ...KILAUEA, source: { ...KILAUEA.source, videoId: null } };
    const player = mountPlayer(container, cam, undefined, { muted: false });
    const url = new URL(player.iframe.src);
    expect(url.pathname).toBe("/embed/live_stream");
    expect(url.searchParams.get("channel")).toBe("ch-kilauea");
    expect(url.searchParams.get("mute")).toBe("0");
  });

  it("announces that it listens once the frame loads", () => {
    const player = mountPlayer(container, TOKYO, undefined, { muted: true });
    const post = vi.spyOn(player.iframe.contentWindow!, "postMessage").mockImplementation(() => {});
    player.iframe.dispatchEvent(new Event("load"));
    expect(post).toHaveBeenCalledWith(
      JSON.stringify({ event: "listening", id: "tokyo", channel: "widget" }),
      "https://www.youtube-nocookie.com",
    );
  });

  it("sends mute and unMute commands without reloading the frame", () => {
    const player = mountPlayer(container, TOKYO, undefined, { muted: true });
    const src = player.iframe.src;
    const post = vi.spyOn(player.iframe.contentWindow!, "postMessage").mockImplementation(() => {});

    player.setMuted(false);
    player.setMuted(true);

    expect(post.mock.calls.map(([msg]) => JSON.parse(msg as string).func)).toEqual([
      "unMute",
      "mute",
    ]);
    expect(player.iframe.src).toBe(src);
  });

  it("reports a fatal embed error from its own frame", () => {
    const onUnplayable = vi.fn();
    const player = mountPlayer(container, TOKYO, undefined, { muted: true, onUnplayable });

    frameMessage(player.iframe, JSON.stringify({ event: "onError", info: 150 }));
    expect(onUnplayable).toHaveBeenCalledTimes(1);
  });

  it("ignores non-fatal errors, other events, non-JSON and non-string data", () => {
    const onUnplayable = vi.fn();
    const player = mountPlayer(container, TOKYO, undefined, { muted: true, onUnplayable });

    frameMessage(player.iframe, JSON.stringify({ event: "onError", info: 2 }));
    frameMessage(player.iframe, JSON.stringify({ event: "onReady" }));
    frameMessage(player.iframe, "{not json");
    frameMessage(player.iframe, { event: "onError", info: 150 });
    expect(onUnplayable).not.toHaveBeenCalled();
  });

  it("ignores messages from its own frame once it has navigated to another origin", () => {
    const onUnplayable = vi.fn();
    const player = mountPlayer(container, TOKYO, undefined, { muted: true, onUnplayable });

    frameMessage(player.iframe, JSON.stringify({ event: "onError", info: 150 }), "https://evil.example");
    frameMessage(player.iframe, JSON.stringify({ event: "onError", info: 150 }), "");
    expect(onUnplayable).not.toHaveBeenCalled();
  });

  it("ignores messages from other windows", () => {
    const onUnplayable = vi.fn();
    mountPlayer(container, TOKYO, undefined, { muted: true, onUnplayable });
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ event: "onError", info: 150 }),
        source: window,
      }),
    );
    expect(onUnplayable).not.toHaveBeenCalled();
  });

  it("does not throw on a fatal error when nobody listens", () => {
    const player = mountPlayer(container, TOKYO, undefined, { muted: true });
    expect(() =>
      frameMessage(player.iframe, JSON.stringify({ event: "onError", info: 100 })),
    ).not.toThrow();
  });

  it("removes the frame and stops listening on destroy", () => {
    const onUnplayable = vi.fn();
    const player = mountPlayer(container, TOKYO, undefined, { muted: true, onUnplayable });
    const source = player.iframe.contentWindow as Window;

    player.destroy();

    expect(container.querySelector("iframe")).toBeNull();
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ event: "onError", info: 150 }),
        source,
      }),
    );
    expect(onUnplayable).not.toHaveBeenCalled();
    // After removal there is no content window, so commands are dropped silently.
    expect(() => player.setMuted(true)).not.toThrow();
  });
});
