// 表示文言。世界のカメラを見せるアプリなので英語も最初から入れる。
// 文言は「その操作で何が起きるか」をそのまま書く(Submit ではなく Save changes)。

import type { CamCategory } from "../domain/cams";
import type { Lang } from "../domain/weather";

type Dict = Record<Lang, string>;

const STRINGS = {
  tagline: {
    ja: "地球のライブカメラを、地図から覗く",
    en: "Peek at Earth's live cameras from the map",
  },
  places: { ja: "地点", en: "places" },
  darknessHeadline: {
    ja: "台が、いま夜の中にいます",
    en: "cameras are in darkness right now",
  },
  search: { ja: "地名で絞り込む", en: "Filter by name" },
  liveOnly: { ja: "配信中だけ", en: "Live only" },
  nightOnly: { ja: "夜の場所だけ", en: "Night only" },
  favoritesOnly: { ja: "お気に入りだけ", en: "Favorites" },
  takeMeSomewhere: { ja: "どこかへ連れてって", en: "Take me somewhere" },
  flatMap: { ja: "平面図", en: "Map" },
  globe: { ja: "地球儀", en: "Globe" },
  globeUnsupported: {
    ja: "このブラウザでは地球儀を表示できません。平面図に戻ってください。",
    en: "This browser can't show the globe. Switch back to the map.",
  },
  wall: { ja: "並べて見る", en: "Video wall" },
  backToMap: { ja: "地図に戻る", en: "Back to map" },
  focusThis: { ja: "これを見る", en: "Watch this" },
  alsoOpen: { ja: "開いているカメラ", en: "Also open" },
  removeFromView: { ja: "閉じる", en: "Close" },
  favorite: { ja: "お気に入りに入れる", en: "Add to favorites" },
  unfavorite: { ja: "お気に入りから外す", en: "Remove from favorites" },
  watchOnYouTube: { ja: "YouTube で見る", en: "Watch on YouTube" },
  emptyTitle: { ja: "まだ何も選んでいません", en: "Nothing selected yet" },
  emptyBody: {
    ja: "地図のマーカーを選ぶと、その場所の今が流れます。",
    en: "Pick a marker on the map to see what it looks like there now.",
  },

  // ── 休憩モード ──
  breakInvite: { ja: "少し休みませんか", en: "Take a break" },
  breakInviteBody: {
    ja: "行き先はこちらで選びます。いまのあなたと逆の時間帯へ連れて行きます。",
    en: "We'll pick the place — somewhere on the opposite side of day and night from you.",
  },
  breakStart: { ja: "休憩する", en: "Start" },
  breakMinutes: { ja: "分", en: "min" },
  breakUnmute: { ja: "音を出す", en: "Sound on" },
  breakMute: { ja: "音を消す", en: "Sound off" },
  breakNext: { ja: "別の場所へ", en: "Somewhere else" },
  breakStop: { ja: "やめる", en: "Stop" },
  breakDoneTitle: { ja: "おつかれさま", en: "Break over" },
  breakDoneBody: { ja: "行ってきた場所", en: "Where you went" },
  breakAgain: { ja: "もう5分", en: "Five more minutes" },
  breakBackToMap: { ja: "地図に戻る", en: "Back to the map" },
  breakNoLive: {
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
  updatedAt: { ja: "状態の更新", en: "State updated" },
  stateUnavailable: {
    ja: "生存状態を取得できませんでした。地図と再生は使えます。",
    en: "Could not load live state. The map and player still work.",
  },
  night: { ja: "夜", en: "Night" },
  day: { ja: "昼", en: "Day" },
} satisfies Record<string, Dict>;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, lang: Lang): string {
  return STRINGS[key][lang];
}

/** ヘッダーに出す収録件数。絞っていないときは全件だけ、絞っているときは分子も出す。 */
export function catalogCaption(
  visible: number,
  total: number,
  lang: Lang,
): { count: string; total: string | null; unit: string; aria: string } {
  const unit = t("places", lang);
  if (visible === total) {
    return {
      count: String(total),
      total: null,
      unit,
      aria: lang === "ja" ? `全 ${total} ${unit}` : `${total} ${unit}`,
    };
  }
  return {
    count: String(visible),
    total: `/ ${total}`,
    unit,
    aria: lang === "ja" ? `${total} ${unit}中 ${visible} ${unit}` : `${visible} of ${total} ${unit}`,
  };
}

const CATEGORY_LABELS: Record<CamCategory, Dict> = {
  city: { ja: "街", en: "City" },
  nature: { ja: "自然", en: "Nature" },
  animal: { ja: "動物", en: "Animals" },
  airport: { ja: "空港", en: "Airport" },
  harbor: { ja: "港・海", en: "Harbor" },
  volcano: { ja: "火山", en: "Volcano" },
  railway: { ja: "鉄道", en: "Railway" },
};

export function categoryLabel(category: CamCategory, lang: Lang): string {
  return CATEGORY_LABELS[category][lang];
}

export function camName(name: { ja: string; en: string }, lang: Lang): string {
  return name[lang];
}
