// Playback.
//
// The YouTube IFrame Player API (an external script) is not loaded. An iframe with
// enablejsapi=1 accepts commands sent directly via postMessage and also reports errors,
// so that is enough. Thanks to this, the CSP script-src stays at 'self'
// (allowing even 1 external host loosens the most effective defence in this app).
//
// Even if sending and receiving stopped working, sound is covered by the mute parameter in
// the URL and liveness by the Worker's liveness sweep, so the experience does not break;
// it only becomes one step less smart.

import type { Cam, PublicCamState } from "../domain/cams";
import { EMBED_ORIGIN, resolveEmbedUrl } from "../domain/cams";
import type { Lang } from "../domain/weather";
import { camName } from "./i18n";

/** Error codes YouTube returns for non-embeddable or deleted videos. */
const FATAL_ERROR_CODES = new Set([100, 101, 150]);

export interface PlayerHandle {
  readonly iframe: HTMLIFrameElement;
  setMuted(muted: boolean): void;
  /** Renames the frame (the language switched) without touching its src. */
  setTitle(title: string): void;
  destroy(): void;
}

interface MountOptions {
  /**
   * The default is always muted. This app is opened between tasks at work, so sound
   * coming out the moment something is pressed is an accident. Sound plays only when
   * the user explicitly turns it on.
   */
  muted: boolean;
  /** Language of the frame's accessible name (its title). Defaults to Japanese. */
  lang?: Lang;
  /**
   * Called when the stream cannot be embedded (changes the marker without waiting for the
   * server-side check).
   */
  onUnplayable?: () => void;
}

function embedSrc(cam: Cam, state: PublicCamState | undefined, muted: boolean): string {
  const base = resolveEmbedUrl(cam, state);
  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    enablejsapi: "1",
    origin: location.origin,
  });
  return `${base}&${params.toString()}`;
}

function post(iframe: HTMLIFrameElement, message: Record<string, unknown>): void {
  iframe.contentWindow?.postMessage(JSON.stringify(message), EMBED_ORIGIN);
}

export function mountPlayer(
  container: HTMLElement,
  cam: Cam,
  state: PublicCamState | undefined,
  { muted, lang = "ja", onUnplayable }: MountOptions,
): PlayerHandle {
  const iframe = document.createElement("iframe");
  iframe.src = embedSrc(cam, state, muted);
  // The frame's name is what a screen reader announces for the video; keep it in the UI language.
  iframe.title = camName(cam.name, lang);
  // Unless compute-pressure is granted, the player keeps retrying, and when several are
  // laid out the violation logs crash the tab.
  iframe.allow = "autoplay; encrypted-media; picture-in-picture; compute-pressure";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  container.append(iframe);

  // To start receiving, this side must announce that it is listening.
  const announce = (): void => post(iframe, { event: "listening", id: cam.id, channel: "widget" });
  iframe.addEventListener("load", announce);

  const onMessage = (event: MessageEvent): void => {
    if (event.source !== iframe.contentWindow) return;
    // The frame may navigate itself; only the playback origin may report errors.
    if (event.origin !== EMBED_ORIGIN) return;
    if (typeof event.data !== "string") return;

    let payload: { event?: unknown; info?: unknown };
    try {
      payload = JSON.parse(event.data) as typeof payload;
    } catch {
      return;
    }
    if (payload.event === "onError" && FATAL_ERROR_CODES.has(Number(payload.info))) {
      onUnplayable?.();
    }
  };
  window.addEventListener("message", onMessage);

  return {
    iframe,
    setMuted(next) {
      post(iframe, { event: "command", func: next ? "mute" : "unMute", args: [] });
    },
    setTitle(title) {
      iframe.title = title;
    },
    destroy() {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", announce);
      iframe.remove();
    },
  };
}
