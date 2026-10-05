// The right panel. It puts the video of the selected camera next to the "now" of that place.
//
// Rebuilding the iframe on every redraw stops the stream and reconnects it, so the diff is taken by
// camera id and cards that stay are not touched.

import type { Cam, PublicCamState } from "../domain/cams";
import { resolvedVideoId } from "../domain/cams";
import { formatLocalTime, utcOffsetLabel } from "../domain/localTime";
import { weatherIcon, weatherLabel, type Lang } from "../domain/weather";
import { fetchPlaceOverview, fetchWeather } from "../api/client";
import { camName, categoryLabel, countryName, t, viewersText } from "./i18n";
import { mountPinLegend } from "./pin";
import { mountPlayer, type PlayerHandle } from "./player";

export interface PanelHandlers {
  onToggleSound(): void;
  onToggleFavorite(camId: string): void;
  onClose(camId: string): void;
  onFocus(camId: string): void;
  onUnplayable(camId: string): void;
  /** The way out of an empty result: turns every filter off (SHIG 55, 60). */
  onClearFilters(): void;
}

export interface PanelContext {
  lang: Lang;
  now: Date;
  states: ReadonlyMap<string, PublicCamState>;
  favoriteIds: ReadonlySet<string>;
  /**
   * Whether sound may play. Default is false (it is opened between tasks at work, so avoid
   * accidents).
   */
  soundOn: boolean;
}

/** A distinction for telling the reason apart when nothing can be shown. */
export type EmptyReason = "none" | "noMatch" | "watching";

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

/** The surface when nothing is selected. Holds only what to do next and how to read the pins. */
function emptyState(reason: EmptyReason, lang: Lang, onClearFilters: () => void): HTMLElement {
  const el = document.createElement("div");
  el.className = "panel__empty";

  if (reason === "noMatch") {
    const p = document.createElement("p");
    p.textContent = t("noMatch", lang);
    el.append(p, chip(t("clearFilters", lang), onClearFilters));
    return el;
  }

  const h = document.createElement("h2");
  h.textContent = t("emptyTitle", lang);

  const body = document.createElement("p");
  body.textContent = t(reason === "watching" ? "watchingHint" : "emptyBody", lang);

  const legend = document.createElement("div");
  legend.className = "legend legend--panel";
  mountPinLegend(legend, lang);

  el.append(h, body, legend);
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

function statusLabel(status: PublicCamState["status"] | undefined, lang: Lang): string {
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
  // Only the 1 lead stream plays. Multi-screen is unified into "並べて見る" (Video wall).
  //
  // Important: an iframe reloads when it is removed from the DOM once and put back. Re-appending on
  // every redraw reconnects the stream, and also becomes an infinite loop of error -> redraw ->
  // reload -> error (measured: the tab crashed). So the position is fixed and it is swapped only
  // when the lead changes.
  const cardHost = document.createElement("div");
  const listHost = document.createElement("div");
  // The width handle should stay fixed to the panel itself, so only the content scrolls.
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
        lang: ctx.lang,
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
    sub.textContent = `${categoryLabel(cam.category, ctx.lang)} · ${countryName(cam.country, ctx.lang)}`;

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
      viewers.append(viewersText(state.viewers, ctx.lang));
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

  /**
   * Below the time and weather. Does not touch the iframe. Not refetched for the same camera and
   * language.
   */
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

  /**
   * An open camera that is not the lead. It does not play; it sits as a row that can be reselected.
   */
  function buildRow(cam: Cam, ctx: PanelContext): HTMLElement {
    const row = document.createElement("div");
    row.className = "openrow";

    const status = ctx.states.get(cam.id)?.status;
    const dot = document.createElement("span");
    dot.className = `openrow__dot${status === "live" ? " openrow__dot--live" : ""}`;
    dot.setAttribute("aria-hidden", "true");
    // The dot tells live from not live by fill alone; screen readers get it in words (SHIG 94).
    const statusText = document.createElement("span");
    statusText.className = "visually-hidden";
    statusText.textContent = statusLabel(status, ctx.lang);

    const name = document.createElement("span");
    name.className = "openrow__name";
    name.textContent = camName(cam.name, ctx.lang);

    const clock = document.createElement("span");
    clock.className = "openrow__time";
    clock.textContent = formatLocalTime(ctx.now, cam.timeZone);

    row.append(dot, name, statusText, clock);
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
    link.href = `https://www.youtube.com/watch?v=${resolvedVideoId(cam, ctx.states.get(cam.id)) ?? ""}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = t("watchOnYouTube", ctx.lang);

    // "閉じる" goes last and apart from the two toggles, so a finger aiming at sound or favorite
    // does not close the camera instead (SHIG 16, 13).
    const close = chip(t("removeFromView", ctx.lang), () => handlers.onClose(cam.id));
    close.classList.add("chip--close");
    card.actions.replaceChildren(
      chip(t("soundOn", ctx.lang), handlers.onToggleSound, ctx.soundOn),
      chip(t("favorite", ctx.lang), () => handlers.onToggleFavorite(cam.id), favorited),
      link,
      close,
    );
  }

  return {
    /** What the sheet rising from the bottom (panelSheet.ts) makes untouchable when collapsing. */
    scroll,
    update(selected: readonly Cam[], ctx: PanelContext, emptyReason: EmptyReason = "none"): void {
      const focused = selected[0];

      if (focused === undefined) {
        if (current !== null) {
          current.card.player?.destroy();
          current = null;
        }
        cardHost.replaceChildren(emptyState(emptyReason, ctx.lang, handlers.onClearFilters));
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
      // Does not touch the existing lead iframe; repaints only the display around it.
      current.card.player?.setMuted(!ctx.soundOn);
      current.card.player?.setTitle(camName(focused.name, ctx.lang));
      current.card.title.textContent = camName(focused.name, ctx.lang);
      current.card.sub.textContent = `${categoryLabel(focused.category, ctx.lang)} · ${countryName(focused.country, ctx.lang)}`;
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
