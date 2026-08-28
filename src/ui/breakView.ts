// 休憩中の画面。地図もパネルも畳んで、映像と「あと何分か」だけにする。
//
// ここでの原則は「見る人に何も決めさせない」。行き先は breakMode が選び、
// この画面は流すことと、静かに終わることだけを受け持つ。

import type { Cam, PublicCamState } from "../domain/cams";
import { formatLocalTime, utcOffsetLabel } from "../domain/localTime";
import { weatherIcon, weatherLabel, type Lang } from "../domain/weather";
import type { BreakProgress } from "../domain/breakMode";
import { formatRemaining } from "../domain/breakMode";
import { fetchWeather } from "../api/client";
import { camName, t } from "./i18n";
import { mountPlayer, type PlayerHandle } from "./player";

export interface BreakHandlers {
  onToggleSound(): void;
  onNext(): void;
  onStop(): void;
  onAgain(): void;
  onBackToMap(): void;
}

export interface BreakContext {
  lang: Lang;
  now: Date;
  soundOn: boolean;
}

function chip(label: string, onClick: () => void, pressed?: boolean): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  if (pressed !== undefined) button.setAttribute("aria-pressed", String(pressed));
  button.addEventListener("click", onClick);
  return button;
}

export function createBreakView(container: HTMLElement, handlers: BreakHandlers) {
  const stage = document.createElement("div");
  stage.className = "break__stage";

  const bar = document.createElement("div");
  bar.className = "break__bar";
  const barFill = document.createElement("span");
  bar.append(barFill);

  const meta = document.createElement("p");
  meta.className = "break__meta";

  const remaining = document.createElement("span");
  remaining.className = "break__remaining";

  const actions = document.createElement("div");
  actions.className = "break__actions";

  const overlay = document.createElement("div");
  overlay.className = "break__overlay";
  overlay.append(meta, remaining, actions);

  const done = document.createElement("div");
  done.className = "break__done";
  done.hidden = true;

  container.append(stage, bar, overlay, done);

  let player: PlayerHandle | null = null;
  let showing: string | null = null;

  function paintActions(ctx: BreakContext): void {
    actions.replaceChildren(
      chip(t(ctx.soundOn ? "breakMute" : "breakUnmute", ctx.lang), handlers.onToggleSound, ctx.soundOn),
      chip(t("breakNext", ctx.lang), handlers.onNext),
      chip(t("breakStop", ctx.lang), handlers.onStop),
    );
  }

  return {
    /** 行き先を映す。同じ場所のままなら iframe に触れない(触ると繋ぎ直しになる)。 */
    show(cam: Cam, state: PublicCamState | undefined, ctx: BreakContext): void {
      done.hidden = true;
      overlay.hidden = false;
      bar.hidden = false;

      if (showing !== cam.id) {
        player?.destroy();
        stage.replaceChildren();
        player = mountPlayer(stage, cam, state, { muted: !ctx.soundOn });
        showing = cam.id;
      } else {
        player?.setMuted(!ctx.soundOn);
      }

      const clock = `${formatLocalTime(ctx.now, cam.timeZone)} ${utcOffsetLabel(ctx.now, cam.timeZone)}`;
      meta.textContent = `${camName(cam.name, ctx.lang)} · ${clock}`;
      paintActions(ctx);

      void fetchWeather(cam.lat, cam.lng).then((weather) => {
        if (weather === null || showing !== cam.id) return;
        const icon = weatherIcon(weather.code, weather.isDay);
        const label = weatherLabel(weather.code, ctx.lang);
        meta.textContent = `${camName(cam.name, ctx.lang)} · ${clock} · ${icon} ${label} ${Math.round(weather.temperatureC)}°C`;
      });
    },

    /** 残り時間だけを反映する。毎秒呼ばれるので、映像には一切触らない。 */
    tick(progress: BreakProgress): void {
      barFill.style.width = `${progress.ratio * 100}%`;
      remaining.textContent = formatRemaining(progress.remainingSeconds);
    },

    /** 静かに終わる。音は鳴らさない。 */
    finish(cam: Cam, lang: Lang): void {
      player?.destroy();
      player = null;
      showing = null;
      stage.replaceChildren();
      overlay.hidden = true;
      bar.hidden = true;

      const title = document.createElement("h2");
      title.textContent = t("breakDoneTitle", lang);
      const where = document.createElement("p");
      where.textContent = `${t("breakDoneBody", lang)}: ${camName(cam.name, lang)}`;
      const buttons = document.createElement("div");
      buttons.className = "break__actions";
      buttons.append(
        chip(t("breakAgain", lang), handlers.onAgain),
        chip(t("breakBackToMap", lang), handlers.onBackToMap),
      );

      done.replaceChildren(title, where, buttons);
      done.hidden = false;
    },

    /** 連れて行ける場所が無いときの断り。責めずに、次にどうすればよいかを言う。 */
    notice(message: string, lang: Lang): void {
      player?.destroy();
      player = null;
      showing = null;
      stage.replaceChildren();
      overlay.hidden = true;
      bar.hidden = true;

      const text = document.createElement("p");
      text.textContent = message;
      const buttons = document.createElement("div");
      buttons.className = "break__actions";
      buttons.append(chip(t("breakBackToMap", lang), handlers.onBackToMap));

      done.replaceChildren(text, buttons);
      done.hidden = false;
    },

    teardown(): void {
      player?.destroy();
      player = null;
      showing = null;
      stage.replaceChildren();
      done.hidden = true;
    },
  };
}
