// 右のパネル。選んだカメラの映像と、その土地の「いま」を並べる。
//
// 再描画のたびに iframe を作り直すと配信が止まって繋ぎ直しになるので、
// カメラ id で差分を取り、残るカードには触らない。

import { BREAK_DURATIONS_MIN, type BreakDuration } from "../domain/breakMode";
import type { Cam, CamState } from "../domain/cams";
import { formatLocalTime, utcOffsetLabel } from "../domain/localTime";
import { weatherIcon, weatherLabel, type Lang } from "../domain/weather";
import { fetchPlaceOverview, fetchWeather } from "../api/client";
import { camName, categoryLabel, t } from "./i18n";
import { mountPlayer, type PlayerHandle } from "./player";

export interface PanelHandlers {
  onStartBreak(minutes: BreakDuration): void;
  onToggleSound(): void;
  onToggleFavorite(camId: string): void;
  onClose(camId: string): void;
  onFocus(camId: string): void;
  onUnplayable(camId: string): void;
}

export interface PanelContext {
  lang: Lang;
  now: Date;
  states: ReadonlyMap<string, CamState>;
  favoriteIds: ReadonlySet<string>;
  /** 音を出してよいか。既定は false(仕事の合間に開くので事故を避ける)。 */
  soundOn: boolean;
}

/** 何も出せないときに、その理由を伝え分けるための区別。 */
export type EmptyReason = "none" | "noMatch";

interface Card {
  root: HTMLElement;
  title: HTMLElement;
  sub: HTMLElement;
  readout: HTMLElement;
  overview: HTMLElement;
  actions: HTMLElement;
  player: PlayerHandle | null;
  overviewKey: string;
}

/**
 * 何も選んでいないときの面。ここは元々「まだ何も選んでいません」で終わって
 * いて何も起きなかった。休憩に来た人がいちばん最初に見る場所なので、
 * 「決めずに始められる入口」を置く。
 */
function emptyState(
  reason: EmptyReason,
  lang: Lang,
  onStartBreak: (minutes: BreakDuration) => void,
): HTMLElement {
  const el = document.createElement("div");
  el.className = "panel__empty";

  if (reason === "noMatch") {
    const p = document.createElement("p");
    p.textContent = t("noMatch", lang);
    el.append(p);
    return el;
  }

  const h = document.createElement("h2");
  h.textContent = t("breakInvite", lang);
  const body = document.createElement("p");
  body.textContent = t("breakInviteBody", lang);

  const durations = document.createElement("div");
  durations.className = "breakstart";
  for (const minutes of BREAK_DURATIONS_MIN) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "breakstart__button";
    const number = document.createElement("strong");
    number.textContent = String(minutes);
    const unit = document.createElement("span");
    unit.textContent = t("breakMinutes", lang);
    button.append(number, unit);
    button.addEventListener("click", () => onStartBreak(minutes));
    durations.append(button);
  }

  const hint = document.createElement("p");
  hint.className = "panel__hint";
  hint.textContent = t("emptyBody", lang);

  el.append(h, body, durations, hint);
  return el;
}

function chip(label: string, onClick: () => void, pressed?: boolean): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = "chip";
  button.type = "button";
  button.textContent = label;
  if (pressed !== undefined) button.setAttribute("aria-pressed", String(pressed));
  button.addEventListener("click", onClick);
  return button;
}

function statusLabel(status: CamState["status"] | undefined, lang: Lang): string {
  switch (status) {
    case "live":
      return t("statusLive", lang);
    case "offline":
      return t("statusOffline", lang);
    case "blocked":
      return t("statusBlocked", lang);
    default:
      return t("statusUnknown", lang);
  }
}

export function createPanel(container: HTMLElement, handlers: PanelHandlers) {
  // 再生するのは主役の 1 本だけ。多画面は「並べて見る」に一本化してある。
  //
  // 重要: iframe は DOM から一度外して入れ直すとリロードされる。再描画のたびに
  // append し直すと配信が繋ぎ直しになり、エラー→再描画→リロード→エラーの
  // 無限ループにもなる(実測でタブが落ちた)。なので置き場所を固定し、主役が
  // 入れ替わったときだけ差し替える。
  const cardHost = document.createElement("div");
  const listHost = document.createElement("div");
  // 幅ハンドルは panel 本体に固定したいので、中身だけをスクロールさせる。
  const scroll = document.createElement("div");
  scroll.className = "panel__scroll";
  scroll.append(cardHost, listHost);
  container.append(scroll);

  let current: { camId: string; card: Card } | null = null;

  function buildCard(cam: Cam, ctx: PanelContext, focused: boolean): Card {
    const root = document.createElement("article");
    root.className = "card";

    const frame = document.createElement("div");
    frame.className = "card__frame";
    root.append(frame);

    const state = ctx.states.get(cam.id);
    const playable = state === undefined || state.status === "live" || state.status === "unknown";

    let player: PlayerHandle | null = null;
    if (playable) {
      player = mountPlayer(frame, cam, state, {
        muted: !(focused && ctx.soundOn),
        onUnplayable: () => handlers.onUnplayable(cam.id),
      });
    } else {
      const fallback = document.createElement("div");
      fallback.className = "card__fallback";
      fallback.innerHTML = `<strong>${statusLabel(state.status, ctx.lang)}</strong>`;
      const body = document.createElement("p");
      body.style.margin = "0";
      body.textContent = t(state.status === "blocked" ? "blockedBody" : "offlineBody", ctx.lang);
      fallback.append(body);
      frame.append(fallback);
    }

    const bodyEl = document.createElement("div");
    bodyEl.className = "card__body";

    const title = document.createElement("h2");
    title.className = "card__title";
    title.textContent = camName(cam.name, ctx.lang);

    const sub = document.createElement("p");
    sub.className = "card__sub";
    sub.textContent = `${categoryLabel(cam.category, ctx.lang)} · ${cam.country}`;

    const readout = document.createElement("div");
    readout.className = "readout";

    const overview = document.createElement("div");
    overview.className = "card__overview";

    const actions = document.createElement("div");
    actions.className = "card__actions";

    bodyEl.append(title, sub, readout, overview, actions);
    root.append(bodyEl);

    return { root, title, sub, readout, overview, actions, player, overviewKey: "" };
  }

  function paintReadout(card: Card, cam: Cam, ctx: PanelContext): void {
    const state = ctx.states.get(cam.id);
    card.readout.replaceChildren();

    const time = document.createElement("span");
    time.className = "readout__time";
    time.textContent = formatLocalTime(ctx.now, cam.timeZone);
    const offset = document.createElement("span");
    offset.textContent = utcOffsetLabel(ctx.now, cam.timeZone);
    card.readout.append(time, offset);

    if (state?.status === "live" && state.viewers !== null) {
      const viewers = document.createElement("span");
      viewers.className = "readout__live";
      viewers.innerHTML = '<span class="readout__dot"></span>';
      viewers.append(`${state.viewers.toLocaleString()} ${t("viewers", ctx.lang)}`);
      card.readout.append(viewers);
    }

    const weatherSlot = document.createElement("span");
    card.readout.append(weatherSlot);
    void fetchWeather(cam.lat, cam.lng).then((weather) => {
      if (weather === null || !weatherSlot.isConnected) return;
      weatherSlot.textContent =
        `${weatherIcon(weather.code, weather.isDay)} ` +
        `${weatherLabel(weather.code, ctx.lang)} ${Math.round(weather.temperatureC)}°C`;
    });
  }

  function titlesMatch(a: string, b: string): boolean {
    return a.replace(/\s+/g, "").toLowerCase() === b.replace(/\s+/g, "").toLowerCase();
  }

  /** 時刻・天気の下。iframe には触れない。同じカメラと言語なら取り直さない。 */
  function paintOverview(card: Card, cam: Cam, ctx: PanelContext): void {
    const key = `${cam.id}:${ctx.lang}`;
    if (card.overviewKey === key) return;
    card.overviewKey = key;
    card.overview.replaceChildren();

    void fetchPlaceOverview(cam.lat, cam.lng, ctx.lang, cam.name).then((place) => {
      if (place === null || card.overviewKey !== key) return;

      if (!titlesMatch(place.title, camName(cam.name, ctx.lang))) {
        const heading = document.createElement("p");
        heading.className = "card__overview-title";
        heading.textContent = place.title;
        card.overview.append(heading);
      }

      const body = document.createElement("p");
      body.className = "card__overview-body";
      body.textContent = place.extract;
      card.overview.append(body);

      const source = document.createElement("a");
      source.className = "card__overview-source";
      source.href = place.url;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      source.textContent = t("placeSource", ctx.lang);
      card.overview.append(source);
    });
  }

  /** 主役でない開いているカメラ。再生はせず、選び直せる行として置く。 */
  function buildRow(cam: Cam, ctx: PanelContext): HTMLElement {
    const row = document.createElement("div");
    row.className = "openrow";

    const status = ctx.states.get(cam.id)?.status;
    const dot = document.createElement("span");
    dot.className = `openrow__dot${status === "live" ? " openrow__dot--live" : ""}`;

    const name = document.createElement("span");
    name.className = "openrow__name";
    name.textContent = camName(cam.name, ctx.lang);

    const clock = document.createElement("span");
    clock.className = "openrow__time";
    clock.textContent = formatLocalTime(ctx.now, cam.timeZone);

    row.append(dot, name, clock);
    row.append(
      chip(t("focusThis", ctx.lang), () => handlers.onFocus(cam.id)),
      chip(t("removeFromView", ctx.lang), () => handlers.onClose(cam.id)),
    );
    return row;
  }

  function paintActions(card: Card, cam: Cam, ctx: PanelContext): void {
    const favorited = ctx.favoriteIds.has(cam.id);
    const link = document.createElement("a");
    link.className = "chip";
    link.href = `https://www.youtube.com/watch?v=${ctx.states.get(cam.id)?.videoId ?? cam.source.videoId ?? ""}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = t("watchOnYouTube", ctx.lang);

    card.actions.replaceChildren(
      chip(t(ctx.soundOn ? "breakMute" : "breakUnmute", ctx.lang), handlers.onToggleSound, ctx.soundOn),
      chip(t(favorited ? "unfavorite" : "favorite", ctx.lang), () => handlers.onToggleFavorite(cam.id), favorited),
      chip(t("removeFromView", ctx.lang), () => handlers.onClose(cam.id)),
      link,
    );
  }

  return {
    update(selected: readonly Cam[], ctx: PanelContext, emptyReason: EmptyReason = "none"): void {
      const focused = selected[0];

      if (focused === undefined) {
        if (current !== null) {
          current.card.player?.destroy();
          current = null;
        }
        cardHost.replaceChildren(emptyState(emptyReason, ctx.lang, handlers.onStartBreak));
        listHost.replaceChildren();
        return;
      }

      if (current !== null && current.camId !== focused.id) {
        current.card.player?.destroy();
        current = null;
      }
      if (current === null) {
        current = { camId: focused.id, card: buildCard(focused, ctx, true) };
        cardHost.replaceChildren(current.card.root);
      }
      // 既にある主役の iframe には触れず、周りの表示だけ描き替える。
      current.card.player?.setMuted(!ctx.soundOn);
      current.card.title.textContent = camName(focused.name, ctx.lang);
      current.card.sub.textContent = `${categoryLabel(focused.category, ctx.lang)} · ${focused.country}`;
      paintReadout(current.card, focused, ctx);
      paintOverview(current.card, focused, ctx);
      paintActions(current.card, focused, ctx);

      const rest = selected.slice(1);
      if (rest.length === 0) {
        listHost.replaceChildren();
        return;
      }
      const list = document.createElement("section");
      list.className = "openlist";
      const heading = document.createElement("h3");
      heading.className = "openlist__title";
      heading.textContent = t("alsoOpen", ctx.lang);
      list.append(heading);
      for (const cam of rest) list.append(buildRow(cam, ctx));
      listHost.replaceChildren(list);
    },
  };
}
