// 再生。
//
// YouTube の IFrame Player API(外部スクリプト)は読み込まない。enablejsapi=1 を
// 付けた iframe には postMessage で直接コマンドを送れるし、エラーも受け取れる
// ので、それで足りる。おかげで CSP の script-src を 'self' のまま保てる
// (外部ホストを 1 つ入れるだけでも、このアプリで一番効いている防御が緩む)。
//
// 送受信が仮に効かなくなっても、音は URL の mute パラメータで、生死は Worker の
// 生存確認で担保されるので、体験が壊れるのではなく賢さが一段落ちるだけになる。

import type { Cam, PublicCamState } from "../domain/cams";
import { resolveEmbedUrl } from "../domain/cams";

/** YouTube が返す埋め込み不可・削除済みのエラー番号。 */
const FATAL_ERROR_CODES = new Set([100, 101, 150]);

export interface PlayerHandle {
  readonly iframe: HTMLIFrameElement;
  setMuted(muted: boolean): void;
  destroy(): void;
}

interface MountOptions {
  /**
   * 既定は必ずミュート。仕事の合間に開くアプリなので、押した瞬間に音が出るのは
   * 事故になる。音は本人が明示的に出したときだけ鳴らす。
   */
  muted: boolean;
  /** 埋め込めない配信だったときに呼ばれる(サーバ側の確認を待たずに印を変える)。 */
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
  iframe.contentWindow?.postMessage(JSON.stringify(message), "https://www.youtube-nocookie.com");
}

export function mountPlayer(
  container: HTMLElement,
  cam: Cam,
  state: PublicCamState | undefined,
  { muted, onUnplayable }: MountOptions,
): PlayerHandle {
  const iframe = document.createElement("iframe");
  iframe.src = embedSrc(cam, state, muted);
  iframe.title = cam.name.ja;
  // compute-pressure を渡さないとプレイヤーが再試行を繰り返し、並べたときに
  // 違反ログでタブが落ちる。
  iframe.allow = "autoplay; encrypted-media; picture-in-picture; compute-pressure";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  container.append(iframe);

  // 受信を始めるには、こちらから聞いている旨を伝える必要がある。
  const announce = (): void => post(iframe, { event: "listening", id: cam.id, channel: "widget" });
  iframe.addEventListener("load", announce);

  const onMessage = (event: MessageEvent): void => {
    if (event.source !== iframe.contentWindow) return;
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
    destroy() {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", announce);
      iframe.remove();
    },
  };
}
