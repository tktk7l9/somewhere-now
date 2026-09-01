// 狭い縦長の画面での、下から出るパネル。
//
// 横に並べる余地が無い画面では、パネルは地図の下半分を常に占める居候だった。
// 何も選んでいなくても「まだ何も選んでいません」が画面の半分を持っていき、
// 残った 46dvh の地図の上にさらに配信数の札が乗る ＝ 実際に地図が見えるのは
// 画面の 3 分の 1 だけ(実測 390×290)。
//
// そこで地図にはステージ全部を渡し、パネルは上に重ねて高さだけを変える。
// 3 つの止まり木を持つ:
//   peek … つまみと主役の名前だけ。地図がほぼ全画面
//   half … 映像と操作が収まる
//   full … 土地の説明まで読む
//
// 幅ハンドル(panelResize.ts)と同じく、iframe には触らない。付け外しすると
// 配信が繋ぎ直されるので、動かすのは高さだけ。

import type { Lang } from "../domain/weather";
import { t } from "./i18n";

export type SheetStop = "peek" | "half" | "full";

/** half の高さ。映像(16:9)と題と読みが収まり、地図もまだ半分近く残る。 */
const HALF_OF_STAGE = 0.56;
/** つまみを掴んで離したとき、どこに落ち着くか。ステージ高さに対する割合。 */
const SNAP_TO_HALF_ABOVE = 0.18;
const SNAP_TO_FULL_ABOVE = 0.82;
/** これ以下の動きは「掴んだ」ではなく「押した」と見なす。 */
const TAP_SLOP_PX = 6;

export interface PanelSheetOptions {
  app: HTMLElement;
  stage: HTMLElement;
  panel: HTMLElement;
  scroll: HTMLElement;
  lang: Lang;
}

export interface PanelSheetHandle {
  setLang(lang: Lang): void;
  /** つまみに出す一行。主役の名前か、まだ選んでいないときの誘い。 */
  setLabel(text: string): void;
  /** 畳んでいるときだけ half まで上げる。既に上がっていれば触らない。 */
  raise(): void;
  /** 主役がいなくなったら畳む。 */
  lower(): void;
  /** 地図の下端がパネルに覆われている高さ(px)。横に並んでいるときは 0。 */
  obscuredBottom(): number;
}

export function attachPanelSheet({
  app,
  stage,
  panel,
  scroll,
  lang,
}: PanelSheetOptions): PanelSheetHandle {
  let currentLang = lang;
  let stop: SheetStop = "peek";
  let drag: { pointerId: number; startY: number; startHeight: number; moved: boolean } | null = null;
  let suppressClick = false;

  const grip = document.createElement("button");
  grip.type = "button";
  grip.className = "panel-grip";

  const bar = document.createElement("span");
  bar.className = "panel-grip__bar";
  bar.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "panel-grip__label";

  grip.append(bar, label);
  panel.prepend(grip);

  /** シートとして振る舞う画面かどうかは CSS が決める(--sheet)。 */
  function active(): boolean {
    return getComputedStyle(app).getPropertyValue("--sheet").trim() === "1";
  }

  function paintLabels(): void {
    const action = t(stop === "peek" ? "sheetExpand" : "sheetCollapse", currentLang);
    grip.title = action;
    grip.setAttribute("aria-label", `${action} — ${label.textContent ?? ""}`);
    grip.setAttribute("aria-expanded", String(stop !== "peek"));
  }

  /**
   * 止まり木の高さは JS が決めて px で書く。
   *
   * CSS 側で peek/half/full を書き分け、高さを実測で拾おうとすると、上げ下げに
   * 補間が掛かっているせいで「これから向かう高さ」ではなく「まだ動いていない
   * 高さ」が返る。地図を寄せるのは選んだ直後なので、その値で的をずらすと
   * 上げ切ったパネルの裏にピンが沈む(実測: 201px ずらすべきところを 28px)。
   */
  function heightFor(next: SheetStop): number {
    if (next === "peek") {
      // 畳んだときの高さ＝つまみ＋下端の安全域。安全域は env() なので JS からは
      // 読めないが、パネルの下 padding として解決済みの px を借りられる。
      const safe = Number.parseFloat(getComputedStyle(panel).paddingBottom) || 0;
      return grip.offsetHeight + safe;
    }
    const stageHeight = stage.clientHeight;
    return Math.round(next === "full" ? stageHeight : stageHeight * HALF_OF_STAGE);
  }

  function apply(): void {
    app.dataset["sheet"] = stop;
    // つまみは上げると棒だけに縮む。高さを測る前に見た目を確定させる。
    app.style.setProperty("--sheet-h", `${heightFor(stop)}px`);
    // 畳んでいる間は中身に触れないようにする。見えていないのに指も読み上げも
    // 届くと、どこを触っているのか分からなくなる。
    scroll.inert = active() && stop === "peek";
    paintLabels();
  }

  function setStop(next: SheetStop): void {
    stop = next;
    apply();
  }

  function stopFor(height: number): SheetStop {
    const ratio = height / Math.max(1, stage.clientHeight);
    if (ratio < SNAP_TO_HALF_ABOVE) return "peek";
    if (ratio < SNAP_TO_FULL_ABOVE) return "half";
    return "full";
  }

  function endDrag(): void {
    if (drag === null) return;
    const height = panel.offsetHeight;
    const moved = drag.moved;
    drag = null;
    document.documentElement.classList.remove("dragging-sheet");
    suppressClick = moved;
    setStop(moved ? stopFor(height) : stop);
  }

  grip.addEventListener("pointerdown", (event) => {
    if (!active() || event.button !== 0) return;
    // 掴んで動かした回の click は捨てるが、その click が来ないこともある
    // (掴んだ指を離した先がつまみの外だと発火しない)。捨てる印を次に掴んだ
    // ところで必ず戻さないと、そのあとの 1 回が黙って効かなくなる。
    suppressClick = false;
    grip.setPointerCapture(event.pointerId);
    drag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startHeight: panel.offsetHeight,
      moved: false,
    };
  });

  grip.addEventListener("pointermove", (event) => {
    if (drag === null || event.pointerId !== drag.pointerId) return;
    const delta = drag.startY - event.clientY;
    if (!drag.moved) {
      if (Math.abs(delta) < TAP_SLOP_PX) return;
      drag.moved = true;
      document.documentElement.classList.add("dragging-sheet");
    }
    const height = Math.min(
      stage.clientHeight,
      Math.max(grip.offsetHeight, drag.startHeight + delta),
    );
    app.style.setProperty("--sheet-h", `${height}px`);
  });

  grip.addEventListener("pointerup", endDrag);
  grip.addEventListener("pointercancel", endDrag);
  grip.addEventListener("lostpointercapture", endDrag);

  grip.addEventListener("click", () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    setStop(stop === "peek" ? "half" : "peek");
  });

  grip.addEventListener("keydown", (event) => {
    const order: SheetStop[] = ["peek", "half", "full"];
    const at = order.indexOf(stop);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setStop(order[Math.min(order.length - 1, at + 1)] ?? stop);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setStop(order[Math.max(0, at - 1)] ?? stop);
    }
  });

  // 画面が回ると half / full の高さの元になるステージが変わる。
  addEventListener("resize", () => {
    if (drag === null) apply();
  });

  apply();

  return {
    setLang(next) {
      currentLang = next;
      paintLabels();
    },
    setLabel(text) {
      if (label.textContent === text) return;
      label.textContent = text;
      paintLabels();
    },
    raise() {
      if (stop === "peek") setStop("half");
    },
    lower() {
      if (stop !== "peek") setStop("peek");
    },
    obscuredBottom() {
      return active() ? heightFor(stop) : 0;
    },
  };
}
