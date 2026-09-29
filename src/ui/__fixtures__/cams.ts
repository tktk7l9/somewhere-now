// Small, fictional camera set for the DOM tests. Coordinates are real places so the
// time zone and day/night maths behave, but ids, names and video ids are made up.

import type { Cam, CamCategory, PublicCamState } from "../../domain/cams";

export function makeCam(
  id: string,
  overrides: Partial<Omit<Cam, "name">> & { ja?: string; en?: string } = {},
): Cam {
  const { ja, en, ...rest } = overrides;
  return {
    id,
    name: { ja: ja ?? `${id} のカメラ`, en: en ?? `${id} camera` },
    lat: 35.68,
    lng: 139.76,
    timeZone: "Asia/Tokyo",
    category: "city" as CamCategory,
    country: "JP",
    source: { videoId: `vid-${id}`, channelId: `ch-${id}`, titleKey: `${id} live` },
    ...rest,
  };
}

export const TOKYO = makeCam("tokyo", { ja: "東京の交差点", en: "Tokyo Crossing" });
export const REYKJAVIK = makeCam("reykjavik", {
  ja: "レイキャビクの港",
  en: "Reykjavik Harbor",
  lat: 64.15,
  lng: -21.94,
  timeZone: "Atlantic/Reykjavik",
  category: "harbor",
  country: "IS",
});
export const KILAUEA = makeCam("kilauea", {
  ja: "キラウエア火山",
  en: "Kilauea Volcano",
  lat: 19.41,
  lng: -155.29,
  timeZone: "Pacific/Honolulu",
  category: "volcano",
  country: "US",
});
export const NAIROBI = makeCam("nairobi", {
  ja: "ナイロビの水場",
  en: "Nairobi Waterhole",
  lat: -1.29,
  lng: 36.82,
  timeZone: "Africa/Nairobi",
  category: "animal",
  country: "KE",
});
export const ZURICH = makeCam("zurich", {
  ja: "チューリッヒ駅",
  en: "Zurich Station",
  lat: 47.38,
  lng: 8.54,
  timeZone: "Europe/Zurich",
  category: "railway",
  country: "CH",
});

export const ALL_CAMS: readonly Cam[] = [TOKYO, REYKJAVIK, KILAUEA, NAIROBI, ZURICH];

export function live(viewers: number | null, videoId = "live-vid"): PublicCamState {
  return { videoId, status: "live", viewers };
}

export function offline(): PublicCamState {
  return { videoId: null, status: "offline", viewers: null };
}

export function blocked(): PublicCamState {
  return { videoId: "blocked-vid", status: "blocked", viewers: null };
}
