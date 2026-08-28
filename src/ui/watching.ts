// 配信中を視聴者数の多い順に並べた一覧。地図の代わりに地点を拾うための面。
//
// iframe は置かない。数百件を並べても再描画で配信が繋ぎ直されないように、
// 並びが同じなら行を使い回し、時刻と視聴者数と選択だけを書き換える。

import type { Cam, PublicCamState } from "../domain/cams";
import { formatLocalTime } from "../domain/localTime";
import type { Lang } from "../domain/weather";
import { camName, categoryLabel, t } from "./i18n";

export type WatchingReady = "loading" | "unavailable" | "ready";

export interface WatchingContext {
  lang: Lang;
  now: Date;
  states: ReadonlyMap<string, PublicCamState>;
  ready: WatchingReady;
  /** カテゴリ・夜・お気に入り・検索のいずれかが掛かっているか。 */
  filtered: boolean;
}

interface Row {
  camId: string;
  root: HTMLButtonElement;
  rank: HTMLElement;
  name: HTMLElement;
  meta: HTMLElement;
  viewers: HTMLElement;
}

function emptyMessage(ctx: WatchingContext): string {
  if (ctx.ready === "loading") return t("statusUnknown", ctx.lang);
  if (ctx.ready === "unavailable") return t("stateUnavailable", ctx.lang);
  return ctx.filtered ? t("noMatch", ctx.lang) : t("noLive", ctx.lang);
}

function viewersLabel(viewers: number | null | undefined, lang: Lang): string {
  if (viewers === null || viewers === undefined) return "—";
  const locale = lang === "ja" ? "ja-JP" : "en-US";
  return `${viewers.toLocaleString(locale)} ${t("viewers", lang)}`;
}

function metaLabel(cam: Cam, ctx: WatchingContext): string {
  return `${categoryLabel(cam.category, ctx.lang)} · ${cam.country} · ${formatLocalTime(ctx.now, cam.timeZone)}`;
}

function rankedKey(ranked: readonly Cam[], lang: Lang): string {
  return `${lang}:${ranked.map((cam) => cam.id).join(",")}`;
}

export function createWatchingList(container: HTMLElement, onPick: (camId: string) => void) {
  const header = document.createElement("header");
  header.className = "watching__header";
  const title = document.createElement("h2");
  title.className = "watching__title";
  const lead = document.createElement("p");
  lead.className = "watching__lead";
  const count = document.createElement("p");
  count.className = "watching__count";
  header.append(title, lead, count);

  const empty = document.createElement("p");
  empty.className = "watching__empty";

  const list = document.createElement("ol");
  list.className = "watching__list";

  const rows: Row[] = [];
  let paintedKey = "";

  function paintRow(row: Row, cam: Cam, rank: number, current: boolean, ctx: WatchingContext): void {
    const state = ctx.states.get(cam.id);
    row.rank.textContent = String(rank);
    row.name.textContent = camName(cam.name, ctx.lang);
    row.meta.textContent = metaLabel(cam, ctx);
    row.viewers.textContent = viewersLabel(state?.viewers, ctx.lang);
    if (current) row.root.setAttribute("aria-current", "true");
    else row.root.removeAttribute("aria-current");
  }

  function buildRow(cam: Cam, rank: number, current: boolean, ctx: WatchingContext): Row {
    const root = document.createElement("button");
    root.type = "button";
    root.className = "watching__row";
    root.addEventListener("click", () => onPick(cam.id));

    const rankEl = document.createElement("span");
    rankEl.className = "watching__rank";
    const body = document.createElement("span");
    body.className = "watching__body";
    const name = document.createElement("span");
    name.className = "watching__name";
    const meta = document.createElement("span");
    meta.className = "watching__meta";
    body.append(name, meta);
    const viewers = document.createElement("span");
    viewers.className = "watching__viewers";

    root.append(rankEl, body, viewers);
    const row: Row = { camId: cam.id, root, rank: rankEl, name, meta, viewers };
    paintRow(row, cam, rank, current, ctx);
    return row;
  }

  return {
    update(ranked: readonly Cam[], selected: readonly string[], ctx: WatchingContext): void {
      const scrollTop = container.scrollTop;
      container.setAttribute("aria-label", t("watching", ctx.lang));
      title.textContent = t("watchingTitle", ctx.lang);
      lead.textContent = t("watchingLead", ctx.lang);
      count.textContent = `${ranked.length} ${t("places", ctx.lang)}`;

      if (ranked.length === 0) {
        empty.textContent = emptyMessage(ctx);
        container.replaceChildren(header, empty);
        rows.length = 0;
        paintedKey = "";
        list.replaceChildren();
        return;
      }

      const key = rankedKey(ranked, ctx.lang);
      const currentId = selected[0];

      if (key === paintedKey && rows.length === ranked.length) {
        ranked.forEach((cam, index) => {
          const row = rows[index];
          if (row === undefined) return;
          paintRow(row, cam, index + 1, cam.id === currentId, ctx);
        });
        container.scrollTop = scrollTop;
        return;
      }

      rows.length = 0;
      list.replaceChildren();
      ranked.forEach((cam, index) => {
        const row = buildRow(cam, index + 1, cam.id === currentId, ctx);
        rows.push(row);
        const item = document.createElement("li");
        item.className = "watching__item";
        item.append(row.root);
        list.append(item);
      });
      paintedKey = key;
      container.replaceChildren(header, list);
      container.scrollTop = scrollTop;
    },

    teardown(): void {
      rows.length = 0;
      paintedKey = "";
      list.replaceChildren();
      container.replaceChildren();
    },
  };
}
