// Side-by-side viewing mode. Collapses the map and the panel and tiles up to 4 players in a grid.
//
// There are 2 points of care:
//   1. An iframe reloads when removed from the DOM and re-inserted, so existing cells are
//      not touched (otherwise every re-render reconnects all of them).
//   2. Players are started one at a time with a gap. Initialising 4 in the same frame is
//      heavy. Cells must stay registered while waiting, otherwise a re-render during that
//      time creates a duplicate frame for the same camera.

import type { Cam, PublicCamState } from "../domain/cams";
import { camName, t } from "./i18n";
import { mountPlayer, type PlayerHandle } from "./player";
import type { Lang } from "../domain/weather";

const STAGGER_MS = 1500;

interface Cell {
  root: HTMLElement;
  caption: HTMLElement;
  /** null while waiting to start. */
  player: PlayerHandle | null;
  timer: number | null;
}

export function createWall(
  container: HTMLElement,
  onUnplayable: (camId: string) => void,
  onBackToMap: () => void,
) {
  const cells = new Map<string, Cell>();

  // With nothing open, the wall used to be a blank dark stage. Say what fills it and give the
  // way back (SHIG 32, 55, 60).
  const empty = document.createElement("div");
  empty.className = "wall__empty";
  const emptyTitle = document.createElement("h2");
  const emptyBody = document.createElement("p");
  const back = document.createElement("button");
  back.type = "button";
  back.className = "chip";
  back.addEventListener("click", onBackToMap);
  empty.append(emptyTitle, emptyBody, back);

  function paintEmpty(lang: Lang): void {
    emptyTitle.textContent = t("wallEmptyTitle", lang);
    emptyBody.textContent = t("wallEmptyBody", lang);
    back.textContent = t("backToMap", lang);
    if (!empty.isConnected) container.append(empty);
  }

  function drop(camId: string): void {
    const cell = cells.get(camId);
    if (cell === undefined) return;
    if (cell.timer !== null) clearTimeout(cell.timer);
    cell.player?.destroy();
    cell.root.remove();
    cells.delete(camId);
  }

  return {
    update(
      selected: readonly Cam[],
      states: ReadonlyMap<string, PublicCamState>,
      lang: Lang,
      soundOn: boolean,
    ): void {
      const keep = new Set(selected.map((cam) => cam.id));
      for (const camId of [...cells.keys()]) {
        if (!keep.has(camId)) drop(camId);
      }
      container.dataset["count"] = String(selected.length);
      container.setAttribute("aria-label", t("wall", lang));
      if (selected.length === 0) paintEmpty(lang);
      else empty.remove();

      let newcomers = 0;
      selected.forEach((cam, index) => {
        const existing = cells.get(cam.id);
        if (existing !== undefined) {
          existing.caption.textContent = camName(cam.name, lang);
          existing.player?.setTitle(camName(cam.name, lang));
          existing.player?.setMuted(!(soundOn && index === 0));
          return;
        }

        // Place the frame and caption immediately, and start only the videos one after another.
        const root = document.createElement("div");
        root.className = "wall__cell";
        const caption = document.createElement("span");
        caption.className = "wall__caption";
        caption.textContent = camName(cam.name, lang);
        root.append(caption);
        container.append(root);

        const cell: Cell = { root, caption, player: null, timer: null };
        // Register first, so a re-render during the wait does not create a duplicate.
        cells.set(cam.id, cell);

        cell.timer = window.setTimeout(() => {
          cell.timer = null;
          if (!root.isConnected) return;
          cell.player = mountPlayer(root, cam, states.get(cam.id), {
            // Only the first 1 player makes sound, and only when the user has allowed sound.
            muted: !(soundOn && index === 0),
            lang,
            onUnplayable: () => onUnplayable(cam.id),
          });
        }, newcomers * STAGGER_MS);
        newcomers += 1;
      });
    },

    teardown(): void {
      for (const camId of [...cells.keys()]) drop(camId);
      container.replaceChildren();
      delete container.dataset["count"];
    },
  };
}
