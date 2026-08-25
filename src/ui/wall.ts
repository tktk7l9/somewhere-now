// 並べて見るモード。地図とパネルを畳んで、最大 4 枚を格子に敷き詰める。
//
// 気をつけている点が 2 つある:
//   1. iframe は DOM から外して入れ直すとリロードされるので、既にあるセルには
//      触れない(再描画のたびに全部が繋ぎ直しになる)。
//   2. プレイヤーは 1 枚ずつ間を空けて立ち上げる。同じフレームで 4 枚を初期化
//      すると重い。待っている間もセルは登録済みにしておかないと、その間の
//      再描画で同じカメラの枠が二重にできる。

import type { Cam, CamState } from "../domain/cams";
import { camName } from "./i18n";
import { mountPlayer, type PlayerHandle } from "./player";
import type { Lang } from "../domain/weather";

const STAGGER_MS = 1500;

interface Cell {
  root: HTMLElement;
  caption: HTMLElement;
  /** 立ち上げ待ちの間は null。 */
  player: PlayerHandle | null;
  timer: number | null;
}

export function createWall(container: HTMLElement, onUnplayable: (camId: string) => void) {
  const cells = new Map<string, Cell>();

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
      states: ReadonlyMap<string, CamState>,
      lang: Lang,
      soundOn: boolean,
    ): void {
      const keep = new Set(selected.map((cam) => cam.id));
      for (const camId of [...cells.keys()]) {
        if (!keep.has(camId)) drop(camId);
      }
      container.dataset["count"] = String(selected.length);

      let newcomers = 0;
      selected.forEach((cam, index) => {
        const existing = cells.get(cam.id);
        if (existing !== undefined) {
          existing.caption.textContent = camName(cam.name, lang);
          existing.player?.setMuted(!(soundOn && index === 0));
          return;
        }

        // 枠と見出しは即座に置き、映像だけを順番に立ち上げる。
        const root = document.createElement("div");
        root.className = "wall__cell";
        const caption = document.createElement("span");
        caption.className = "wall__caption";
        caption.textContent = camName(cam.name, lang);
        root.append(caption);
        container.append(root);

        const cell: Cell = { root, caption, player: null, timer: null };
        // 待っている間の再描画で二重に作らないよう、先に登録しておく。
        cells.set(cam.id, cell);

        cell.timer = window.setTimeout(() => {
          cell.timer = null;
          if (!root.isConnected) return;
          cell.player = mountPlayer(root, cam, states.get(cam.id), {
            // 音が出るのは先頭の 1 枚だけ。しかも本人が音を許したときだけ。
            muted: !(soundOn && index === 0),
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
