// Display strings. The app shows cameras of the world, so English is in from the start.
// Strings say plainly "what that action does" (Save changes, not Submit).

import type { CamCategory } from "../domain/cams";
import type { Lang } from "../domain/weather";

type Dict = Record<Lang, string>;

const STRINGS = {
  tagline: {
    ja: "地球のライブカメラを、地図から覗く",
    en: "Peek at Earth's live cameras from the map",
  },
  places: { ja: "地点", en: "places" },
  liveHeadline: {
    ja: "地点が配信中",
    en: "places are live",
  },
  search: { ja: "地名で絞り込む", en: "Filter by name" },
  filters: { ja: "絞り込み", en: "Filters" },
  liveOnly: { ja: "配信中だけ", en: "Live only" },
  nightOnly: { ja: "夜の場所だけ", en: "Night only" },
  favoritesOnly: { ja: "お気に入りだけ", en: "Favorites" },
  showBroadcasts: { ja: "番組も出す", en: "Include broadcasts" },
  showBroadcastsHint: {
    ja: "テレビ・ラジオ・アニメ・環境音など、カメラでない配信も一覧と地図に出します。",
    en: "Also show TV, radio, cartoons and ambience streams — the ones that aren't cameras.",
  },
  takeMeSomewhere: { ja: "どこかへ連れてって", en: "Take me somewhere" },
  locate: { ja: "いまいる場所へ", en: "Where I am" },
  locatePending: { ja: "場所を探しています…", en: "Finding you…" },
  locateDenied: {
    ja: "位置情報の利用が許可されていません",
    en: "Location permission was denied",
  },
  locateUnavailable: {
    ja: "いまいる場所を取得できませんでした",
    en: "Couldn't find where you are",
  },
  locateTimeout: {
    ja: "いまいる場所の取得が時間切れになりました",
    en: "Finding where you are took too long",
  },
  locateUnsupported: {
    ja: "このブラウザではいまいる場所を使えません",
    en: "This browser can't use your location",
  },
  flatMap: { ja: "平面図", en: "Map" },
  globe: { ja: "地球儀", en: "Globe" },
  globeLoading: { ja: "地球儀を読み込み中…", en: "Loading globe…" },
  globeUnsupported: {
    ja: "このブラウザでは地球儀を表示できません。平面図に戻ってください。",
    en: "This browser can't show the globe. Switch back to the map.",
  },
  wall: { ja: "並べて見る", en: "Video wall" },
  watching: { ja: "視聴が多い順", en: "Most watching" },
  watchingTitle: { ja: "いま視聴されている配信", en: "Most watched right now" },
  watchingLead: {
    ja: "配信中の地点を、いま見ている人数の多い順に並べています。",
    en: "Live places, ordered by how many people are watching now.",
  },
  watchingHint: {
    ja: "一覧から地点を選ぶと、その場所の今が流れます。",
    en: "Pick a place from the list to see what it looks like there now.",
  },
  showOnFlatMap: { ja: "平面図で見る", en: "Show on the map" },
  showOnGlobe: { ja: "地球儀で見る", en: "Show on the globe" },
  backToMap: { ja: "地図に戻る", en: "Back to map" },
  focusThis: { ja: "これを見る", en: "Watch this" },
  alsoOpen: { ja: "開いているカメラ", en: "Also open" },
  removeFromView: { ja: "閉じる", en: "Close" },
  // Toggles keep one label and show their state through aria-pressed, so the lit chip is never
  // read as "the action to take next" (SHIG 49).
  favorite: { ja: "お気に入り", en: "Favorite" },
  watchOnYouTube: { ja: "YouTube で見る", en: "Watch on YouTube" },
  emptyTitle: { ja: "まだ何も選んでいません", en: "Nothing selected yet" },
  emptyBody: {
    ja: "地図のマーカーを選ぶと、その場所の今が流れます。",
    en: "Pick a marker on the map to see what it looks like there now.",
  },
  pinOff: { ja: "止まっている", en: "Off air" },
  pinLegendAria: {
    ja: "ピンの色。琥珀は配信中、黒は止まっています。",
    en: "Pin colors. Amber is live, black is off air.",
  },
  resizePanel: { ja: "パネルの幅を変える", en: "Resize panel" },
  // Landmark names. The two asides (dial + legend, selected camera) must be told apart by name.
  notesAria: { ja: "配信数とピンの色", en: "Live count and pin colors" },
  panelAria: { ja: "選んだカメラ", en: "Selected camera" },
  sheetExpand: { ja: "パネルを広げる", en: "Open the panel" },
  sheetCollapse: { ja: "パネルを畳む", en: "Close the panel" },
  sheetIdle: { ja: "地図から地点を選ぶ", en: "Pick a place on the map" },
  soundOn: { ja: "音を出す", en: "Sound on" },
  /** The language chip names its destination, in that language (SHIG 49, 71). */
  switchLang: { ja: "English", en: "日本語" },
  /** The same, as the code a narrow screen has room for. */
  switchLangShort: { ja: "EN", en: "JA" },
  noLive: {
    ja: "いま配信しているカメラがありません。少し時間をおいてください。",
    en: "No cameras are live right now. Try again in a little while.",
  },
  noMatch: {
    ja: "条件に合うカメラがありません。絞り込みを緩めてください。",
    en: "No cameras match. Try loosening the filters.",
  },
  statusLive: { ja: "配信中", en: "Live" },
  statusOffline: { ja: "配信していません", en: "Off air" },
  statusBlocked: { ja: "埋め込み不可", en: "Embedding blocked" },
  statusUnknown: { ja: "状態を確認中", en: "Checking" },
  offlineBody: {
    ja: "この配信は今止まっています。次の確認で新しい配信が見つかれば戻ります。",
    en: "This stream is down. It returns when the next check finds a new one.",
  },
  blockedBody: {
    ja: "この配信は外部サイトでの再生が許可されていません。",
    en: "This stream cannot be played outside YouTube.",
  },
  viewers: { ja: "人が視聴中", en: "watching" },
  placeSource: { ja: "出典: Wikipedia", en: "Source: Wikipedia" },
  updatedAt: { ja: "状態の更新", en: "State updated" },
  stateUnavailable: {
    ja: "生存状態を取得できませんでした。地図と再生は使えます。",
    en: "Could not load live state. The map and player still work.",
  },
  camsNotLoaded: {
    ja: "カメラの一覧をまだ読み込めていません。少し待ってからもう一度押してください。",
    en: "The camera list has not loaded yet. Wait a moment and try again.",
  },
  noMatchShort: { ja: "条件に合うカメラがありません", en: "No cameras match" },
  clearFilters: { ja: "絞り込みを解除", en: "Clear filters" },
  /** Shown beside "絞り込み N" on narrow screens, where the full label would wrap the row. */
  clearFiltersShort: { ja: "解除", en: "Clear" },
  sheetIdleWatching: { ja: "一覧から地点を選ぶ", en: "Pick a place from the list" },
  undo: { ja: "元に戻す", en: "Undo" },
  dismiss: { ja: "通知を閉じる", en: "Dismiss" },
  wallEmptyTitle: { ja: "並べるカメラがまだありません", en: "Nothing to show side by side yet" },
  wallEmptyBody: {
    ja: "地図でマーカーを選ぶと、最大4か所までここに並びます。",
    en: "Pick markers on the map, and up to 4 places line up here.",
  },
  night: { ja: "夜", en: "Night" },
  day: { ja: "昼", en: "Day" },
} satisfies Record<string, Dict>;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, lang: Lang): string {
  return STRINGS[key][lang];
}

/**
 * The live count / shown place count for the dial. When filtered, the full catalog count is added
 * too.
 */
export function liveDialCaption(
  live: number,
  scoped: number,
  catalog: number,
  lang: Lang,
): { count: string; total: string; label: string; aria: string } {
  const headline = t("liveHeadline", lang);
  const places = t("places", lang);
  const filtered = scoped !== catalog;
  const label = filtered
    ? lang === "ja"
      ? `${headline} · 全 ${catalog} ${places}`
      : `${headline} · ${catalog} total`
    : headline;
  const aria = filtered
    ? lang === "ja"
      ? `全 ${catalog} ${places}のうち ${scoped} ${places}を表示、うち ${live} ${places}が配信中`
      : `${live} of ${scoped} shown ${places} are live (${catalog} total)`
    : lang === "ja"
      ? `${scoped} ${places}中 ${live} ${places}が配信中`
      : `${live} of ${scoped} ${places} are live`;
  return {
    count: String(live),
    total: `/ ${scoped}`,
    label,
    aria,
  };
}

/**
 * "N watching", grouped in the UI language rather than the browser's. The panel and the list show
 * the same number, so they must not disagree (a German browser used to give "4.321" in one and
 * "4,321" in the other).
 */
export function viewersText(viewers: number, lang: Lang): string {
  const locale = lang === "ja" ? "ja-JP" : "en-US";
  return `${viewers.toLocaleString(locale)} ${t("viewers", lang)}`;
}

/** The notice after a camera is closed. Paired with an undo button. */
export function closedNotice(name: string, lang: Lang): string {
  return lang === "ja" ? `「${name}」を閉じました` : `Closed ${name}`;
}

const CATEGORY_LABELS: Record<CamCategory, Dict> = {
  city: { ja: "街", en: "City" },
  nature: { ja: "自然", en: "Nature" },
  animal: { ja: "動物", en: "Animals" },
  airport: { ja: "空港", en: "Airport" },
  harbor: { ja: "港・海", en: "Harbor" },
  volcano: { ja: "火山", en: "Volcano" },
  railway: { ja: "鉄道", en: "Railway" },
  space: { ja: "宇宙", en: "Space" },
};

export function categoryLabel(category: CamCategory, lang: Lang): string {
  return CATEGORY_LABELS[category][lang];
}

export function camName(name: { ja: string; en: string }, lang: Lang): string {
  return name[lang];
}

const countryNames = new Map<string, string>();

/**
 * "日本" / "Japan" for the ISO code the master carries. The screen speaks the user's words, not the
 * data's (SHIG 11, 28). When the runtime cannot name the code, the code itself is shown.
 */
export function countryName(code: string, lang: Lang): string {
  const key = `${lang}:${code}`;
  const cached = countryNames.get(key);
  if (cached !== undefined) return cached;
  let name = code;
  try {
    name = new Intl.DisplayNames([lang === "ja" ? "ja-JP" : "en-US"], { type: "region", fallback: "none" }).of(code) ?? code;
  } catch {
    name = code;
  }
  countryNames.set(key, name);
  return name;
}
