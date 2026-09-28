// Handles of the YouTube channels that serve as starting points for exploration.
//
// Only "things a human can verify by eye" are written here (the handle and a note on what
// kind of camera it is). channelId and videoId are not guessed; discover-cams.ts actually
// fetches and confirms them.

export interface SeedHandle {
  handle: string;
  note: string;
}

export const SEED_HANDLES: SeedHandle[] = [
  // Operators streaming many locations at once (dozens of streams from 1 channel)
  { handle: "SkylineWebcams", note: "Tourist spots, cities and nature worldwide" },
  { handle: "explore", note: "explore.org - animals and nature" },
  { handle: "earthTV", note: "World cities" },
  { handle: "EarthCam", note: "Cities and landmarks" },
  { handle: "africam", note: "African safari" },
  { handle: "VirtualRailfan", note: "Railways" },
  { handle: "SeeJH", note: "Jackson Hole (Wyoming, US)" },
  { handle: "LiveBeaches", note: "Beaches" },
  { handle: "IslandCam", note: "Hawaii and the Caribbean" },
  { handle: "webcamsdemexico", note: "Around Mexico" },
  { handle: "CamerasDeMexico", note: "Around Mexico (separate network)" },

  // Single location but famous
  { handle: "NASA", note: "Earth from the ISS" },
  { handle: "MontereyBayAquarium", note: "Aquarium" },
  { handle: "sandiegozoo", note: "Zoo" },
  { handle: "houstonzoo", note: "Zoo" },
  { handle: "SmithsonianNationalZoo", note: "Zoo" },
  { handle: "abbeyroadstudios", note: "Abbey Road crossing" },
  { handle: "LivefromIceland", note: "Iceland (volcanoes and aurora)" },
  { handle: "YellowstoneNPS", note: "Yellowstone National Park" },
  { handle: "Rakuten", note: "(dummy for existence check: not a live camera)" },

  // Japan
  { handle: "weathernews", note: "Weathernews (cameras across Japan)" },
  { handle: "ANNnewsCH", note: "ANN (24-hour live)" },
  { handle: "tbsnewsdig", note: "TBS NEWS DIG" },
  { handle: "kanaloco", note: "Kanagawa Shimbun" },
  { handle: "TokyoStreetView", note: "Tokyo street walks and fixed-point cameras" },
  // ── Below are the candidates of round 2. Cameras were concentrated in 8 channels and
  //    skewed to the US, so these were added to strengthen Europe, Asia and the southern
  //    hemisphere. Existence and live status are confirmed by discover-cams.ts
  //    (a handle that does not exist is reported as a failure).

  // Europe
  { handle: "BalticLiveCam", note: "Baltic states and around Europe" },
  { handle: "LiveFromIceland", note: "Iceland (volcanoes and aurora)" },
  { handle: "RailCamUK", note: "UK railways" },
  { handle: "roundshot", note: "Panoramas across Switzerland" },
  { handle: "NRK", note: "Norwegian public broadcaster (slow TV)" },
  { handle: "beleefdelente", note: "Dutch wild birds" },
  { handle: "PortofRotterdam", note: "Port of Rotterdam" },
  { handle: "HeathrowAirport", note: "Heathrow Airport" },
  { handle: "visitfinland", note: "Finland" },
  { handle: "Kamerycz", note: "Around Czechia" },
  { handle: "camaraslive", note: "Around Spain" },
  { handle: "PolskaKamera", note: "Around Poland" },

  // Asia
  { handle: "FNNnewsCH", note: "FNN (24-hour live)" },
  { handle: "nhk", note: "NHK" },
  { handle: "ntv", note: "Nippon TV" },
  { handle: "KyotoLiveCam", note: "Kyoto" },
  { handle: "OkinawaLive", note: "Okinawa" },
  { handle: "MtFujiLive", note: "Mount Fuji" },
  { handle: "KBSNews", note: "KBS (South Korea)" },
  { handle: "setnews", note: "SET News (Taiwan)" },
  { handle: "CNAInsider", note: "Singapore" },
  { handle: "IndiaToday", note: "India" },

  // Africa, southern hemisphere, others
  { handle: "WildEarth", note: "African safari (live with commentary)" },
  { handle: "AfricamLive", note: "African watering hole" },
  { handle: "DjumaGameReserve", note: "Djuma (South Africa)" },
  { handle: "SydneyHarbourLive", note: "Sydney Harbour" },
  { handle: "NewZealandLive", note: "New Zealand" },
  { handle: "CornellLabofOrnithology", note: "Cornell Lab bird cams" },
  { handle: "georgiaaquarium", note: "Georgia Aquarium" },
  { handle: "nationalaquarium", note: "National Aquarium (US)" },
  { handle: "exploreorg", note: "explore.org (possible alternate handle)" },
  { handle: "SmithsonianZoo", note: "Smithsonian Zoo (alternate handle)" },
  { handle: "usgs", note: "USGS (volcanoes)" },
  { handle: "AlohaLiveCams", note: "Hawaii" },
];
