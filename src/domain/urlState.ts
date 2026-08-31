// 画面の状態は全てクエリパラメータに載せる。リロードでも共有でも同じ絵が出る。
// 既定値は書き出さないので、素の状態では URL が汚れない。

import { CAM_CATEGORIES, type CamCategory } from "./cams";
import type { Lang } from "./weather";

/** 同時に開けるプレイヤーの上限(2×2)。 */
export const MAX_VIEW = 4;

export interface ViewState {
  /** 表示中のカメラ id。先頭が主役(音声が出る側)。 */
  view: string[];
  categories: CamCategory[];
  liveOnly: boolean;
  nightOnly: boolean;
  favoritesOnly: boolean;
  /** 地球儀ビュー。既定は平面図。 */
  globe: boolean;
  /** 配信中を視聴者数の多い順に並べた一覧。既定は地図。 */
  watching: boolean;
  /**
   * テレビ・ラジオ・アニメ等の「番組」も出す。既定は false ＝ 出さない。
   * 見せたいのは定点カメラなので、既定は伏せる側に倒す(domain/broadcast.ts)。
   */
  broadcasts: boolean;
  query: string;
  lang: Lang;
}

function uniqueNonEmpty(values: readonly string[]): string[] {
  return [...new Set(values.map((v) => v.trim()).filter((v) => v !== ""))];
}

function isCategory(value: string): value is CamCategory {
  return (CAM_CATEGORIES as readonly string[]).includes(value);
}

export function parseUrlState(search: string): ViewState {
  const params = new URLSearchParams(search);

  // ?view= が主。?cam= は 1 枚だけの共有 URL 用の別名。
  const rawView = params.get("view") ?? params.get("cam") ?? "";
  const view = uniqueNonEmpty(rawView.split(",")).slice(0, MAX_VIEW);

  const categories = uniqueNonEmpty((params.get("cat") ?? "").split(",")).filter(isCategory);
  const lang = params.get("lang") === "en" ? "en" : "ja";

  return {
    view,
    categories,
    liveOnly: params.get("live") === "1",
    nightOnly: params.get("night") === "1",
    favoritesOnly: params.get("fav") === "1",
    globe: params.get("globe") === "1",
    watching: params.get("watching") === "1",
    broadcasts: params.get("bc") === "1",
    query: (params.get("q") ?? "").trim(),
    lang,
  };
}

export function toSearchString(state: ViewState): string {
  const params = new URLSearchParams();

  if (state.view.length === 1) {
    params.set("cam", state.view[0]!);
  } else if (state.view.length > 1) {
    params.set("view", state.view.join(","));
  }
  if (state.categories.length > 0) params.set("cat", state.categories.join(","));
  if (state.liveOnly) params.set("live", "1");
  if (state.nightOnly) params.set("night", "1");
  if (state.favoritesOnly) params.set("fav", "1");
  if (state.globe) params.set("globe", "1");
  if (state.watching) params.set("watching", "1");
  if (state.broadcasts) params.set("bc", "1");
  if (state.query !== "") params.set("q", state.query);
  if (state.lang !== "ja") params.set("lang", state.lang);

  const query = params.toString();
  return query === "" ? "" : `?${query}`;
}
