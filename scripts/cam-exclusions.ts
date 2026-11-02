// Streams kept out of src/data/cams.ts on evidence from the source itself. build-cams.ts
// applies this after both place tables, so a rerun of the bulk importer cannot bring one back.
//
// Only record what the stream's own YouTube watch page states, and name the check date.

export interface CamExclusion {
  videoId: string;
  reason: string;
}

export const CAM_EXCLUSIONS: CamExclusion[] = [
  {
    // nagoya-station (curated). Absent from the master since 9bc06df; a private stream reads as
    // "unknown", which build-cams.ts keeps, so without this entry a rebuild would restore it.
    videoId: "pI_u966ixNk",
    reason: "Private video: playabilityStatus LOGIN_REQUIRED on the watch page, 2026-11-02",
  },
  {
    // us-security-camera-footage-of-beavis-and
    videoId: "WhxBDer5-Lw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // us-raw-video-robbery-in-hospital-parking
    videoId: "NaMNxMUwZUE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // us-north-american-car-crash-compilat-2
    videoId: "UQbsMwGOHEo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // gb-cctv-footage-shows-farmer-jailed-for
    videoId: "cOG4OYIKdRA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // ug-cctv-footage-of-boda-boda-criminal-ga
    videoId: "lTWjOB9cy0g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // us-robbery-by-force-in-a-parking-lot-cct
    videoId: "CKmw7_h9R-Y",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // us-debbie-collier-raw-surveillance-foota
    videoId: "q9311L8X2KM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // us-driver-s-blind-lane-change-leads-to-a
    videoId: "N6pInUU4fO4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // lk-pettah-bus-stand-40-army-cctv-footage
    videoId: "3sIngyPnsa4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // us-3-children-caught-shoplifting-on-cctv
    videoId: "Mt_5uUjgjx0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (crime or victim footage)",
  },
  {
    // np-m7-8-earthquake-collapses-buildings-i
    videoId: "xiMmF99u4Y0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-m7-8-earthquake-damages-buildings-in
    videoId: "D8IcF4LsPB0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-west-mobile-tornado-captured-on-home
    videoId: "_qx9Ssm5TDc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-trashin
    videoId: "DJ8VPTD3s7g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-m7-5-earthquake-shakes-a-house-in-car
    videoId: "dHAFWKPfHwM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-shaking
    videoId: "1HUa9WBUpe0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-sha-2
    videoId: "L2EvRFGLvhE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-5-earthquake-in-a
    videoId: "mus2Y_uwd7s",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-5-earthquake-damag
    videoId: "KNzXkV26Stk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-in-a-ta
    videoId: "E6FB080Siww",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-5-earthquake-hitti
    videoId: "hTf3xrrYNas",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-5-earthquake-in-lo
    videoId: "WyQAKGHCMzQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-traffic-camera-captures-m7-5-earthqua
    videoId: "NxqxqR41fxk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // jp-cctv-cameras-capture-devastating-mome
    videoId: "6Unx8BW-GpU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-m7-8-earthquake-shakes-gorkha-nepal
    videoId: "UWgJgS689dk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-m7-8-earthquake-collapses-tudikhel-ga
    videoId: "IWU8SPX1YBQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-m7-8-earthquake-slides-office-kathman
    videoId: "VPyXMD5VmS8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-m7-8-earthquake-strikes-market-and-sw
    videoId: "9UBhXvnOVso",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-m7-8-earthquake-shakes-roundabout-kat
    videoId: "KQ_iT1Dy-js",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // np-traffic-camera-captures-visible-later
    videoId: "97TBkOyc6jk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-terrifying-dash-cam-tornado-footage-f
    videoId: "dw2RB9WhIq4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-m7-5-earthquake-street-in-caracas-zsc
    videoId: "8GXKx2OtSdA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-5-earthquake-in-an
    videoId: "Wablx1rZLVo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-5-earthquake-shaki
    videoId: "gGlsCpW2ye8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-security-cameras-capture-moment-torna
    videoId: "hQmbN51_Pog",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // jp-2026
    videoId: "BiZAXXOgRGk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // jp-169
    videoId: "ncyCiv8f4rY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // jp-2026-7-28
    videoId: "-1okSPg-WZE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-inside-of-ef3-tornado-in-st-louis-mis
    videoId: "14j7Ns052WY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ng-cctv-footage-of-m7-5-earthquake-from
    videoId: "RlnZegmkZJk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-footage-of-m7-2-and-m7-5-earthqu
    videoId: "oQ-z9yeVdII",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ee-cctv-captures-m7-5-earthquake-shaking
    videoId: "Nf_w82ToDVw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // br-m7-5-earthquake-trashes-apartment-in
    videoId: "-j_OgBvpec0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // br-cctv-footage-of-m7-5-earthquake-in-el
    videoId: "xio8U81JFcU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ee-cctv-footage-of-m7-5-earthquake-in-a
    videoId: "EJRRuKBCLy8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-watch-seismic-waves-from-twin-venezue
    videoId: "OX2P-J8BDtM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-sha-3
    videoId: "Z6-RdVc4dIc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-sha-4
    videoId: "zuzeie_GfqE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-cctv-captures-m7-5-earthquake-shakes
    videoId: "OLslI4kQkAA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-m7-5-earthquake-destroys-apartment-in
    videoId: "z6O45Q99_p0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-cctv-footage-of-m7-5-earthquake-from
    videoId: "2_X9wKwhgGs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // be-m7-5-earthquake-and-aftermath-at-a-sh
    videoId: "n3yISJbOTrs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ee-cctv-footage-of-m7-5-earthquake-damag
    videoId: "ZG8fX7wlKkM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // si-m7-5-earthquake-damages-liquor-store
    videoId: "TqjIeqmGYwY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // si-m7-5-earthquake-shakes-electronics-st
    videoId: "HX399hDUs28",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-m7-5-earthquake-violently-destroys-ca
    videoId: "MVEOPjGWFws",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-m7-5-earthquake-strikes-and-collapses
    videoId: "OVDbp9_5_A4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-cctv-footage-of-m7-5-earthquake-f-2
    videoId: "KuKCwMyWZGY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // pk-extreme-pulse-like-ground-motion-caus
    videoId: "jCZgv7fLJmY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ve-cctv-captures-m7-5-earthquake-tra-2
    videoId: "7SV6CLEW52o",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // au-m7-5-earthquake-trashes-office-in-mac
    videoId: "KDtKtr6e9PU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-cctv-footage-of-m4-8-aftershock-jolti
    videoId: "DOU8OSPa7iU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // mp-cctv-captures-m7-5-earthquake-damagin
    videoId: "15c4XgRLbnM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // ge-cctv-footage-of-m7-5-earthquake-from
    videoId: "f7BQzE0AKKY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  {
    // us-family-enters-cellar-just-before-torn
    videoId: "l-SFUzTBgkA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02 (disaster footage)",
  },
  // ── Uploads that were never live streams. Checked one watch page at a time on 2026-11-02, after
  // the live-state sweep had them offline.
  {
    // gb-ehukai-beach-surf-highlights
    videoId: "xHeLgPzOyfk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gy-aerial-tour-of-georgetown-sc
    videoId: "JaaOQfpqV_I",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-aerial-tour-of-venice-beach-ca-italy
    videoId: "ummT6MWaAwI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // at-hallstatt-rainy-walk-in-europe-s-most
    videoId: "AQB6dVt-t64",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-walking-tour-huawei-experience-sto
    videoId: "3j_UD7iIYBA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-hiking-chongqing-banshanyaxian-4k
    videoId: "RIJ4WExW6IQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-vollbremsung-wegen-uberholer-roadrage
    videoId: "LtKTOcLBJq4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-taxi-fahrt-komplett-im-gegenverkehr-w
    videoId: "01xb_l1K_KE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-extreme-thunderstorm-port-andratx-lig
    videoId: "E1O9C7nNz0w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-massive-thunderstorm-in-paguera-heavy
    videoId: "7kAYyr0HVuo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-soi-buakhao-intersection-with-soi-dia
    videoId: "wCVFIKnii2s",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-bangkok-thailand-15-may-26
    videoId: "2sIbwK8tMMk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-patong-now-rivers-instead-of-streets
    videoId: "2n6LX4GSnP4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-miami-florida-usa-by-drone-dji-mavic
    videoId: "Dmhws_sBEic",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-high-speed-police-chases-over-150mph
    videoId: "8id5q_mwtWA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-one-week-construction-time-lapse-with
    videoId: "cOc3dapbhkI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ae-dubai-4k-amazing-dubai-city-downtown
    videoId: "TcL5iVlFwUk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // am-yerevan-walking-tour-summer-evening-v
    videoId: "9KOgGqGdHEc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-huntington-apartments-time-lapse
    videoId: "KV3wcnMOs30",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-dash-cam-owners-australia-weekly-subm
    videoId: "tAdl83PE36w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-dash-cam-owners-australia-crash-compi
    videoId: "vPtNlbJc9ZY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-dash-cam-owners-australia-crash-c-2
    videoId: "_E4jvaos-sM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-best-of-2025-dash-cam-owners-australi
    videoId: "PUTFLoobJkk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // br-sao-paulo-from-above-stunning-4k-dron
    videoId: "phPgZC9_QhQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-raw-video-benson-street-security-came
    videoId: "gdVuVrAk4ss",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-montreal-canada-by-drone-4k
    videoId: "zkGwMz2Dfos",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-vancouver-4k-walking-tour-canada-capt
    videoId: "SYzzp-khjiQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ch-lauterbrunnen-switzerland-walking-tou
    videoId: "Bq4rmeIvJbs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ch-zurich-switzerland-walking-tour-4k-po
    videoId: "zOiomgB5x2E",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ch-can-you-believe-this-place-is-real-sc
    videoId: "-sM_WxDpdqQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ch-the-most-beautiful-city-in-switzerlan
    videoId: "3nYnfYJAkao",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-china-walk-chinese-countryside-sma
    videoId: "EoO8ybnC3Mw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cz-prague-christmas-markets-full-city-ce
    videoId: "fXdsgWUxHaU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cz-prague-walking-tour-2025-for-big-tvs
    videoId: "VZrcZLJ0HUM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-the-construction-of-300-metre-aidapri
    videoId: "lavm7CausyA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-hamburg-germany-germany-s-wealthiest
    videoId: "3xcsMhr1bag",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-best-of-unfalle-2023-schwerer-unfall
    videoId: "Efz-o-nrydo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-the-best-of-montreal-in-summer-old-to
    videoId: "ILx5FXoAphQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-walking-vancouver-fifa-host-city-in-4
    videoId: "oqb6bgNytLo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-relaxing-wildlife-one-hour-of-peacefu
    videoId: "_NrVo1ougNg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-hiking-expedition-to-abandoned-vil
    videoId: "aFagmua4Pog",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // dk-4k-copenhagen-denmark-city-walking-to
    videoId: "AQqPG14QjJM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-barcelona-spain-evening-city-walk-4k
    videoId: "4OQ9_NPdr7Q",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-barcelona-spain-4k-drone-footage-with
    videoId: "FGRvP8eoPdw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-que-camara-de-vigilancia-comprar-en-2
    videoId: "EZIFS8eDeOU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-barcelona-spain-2026-full-city-walk-4
    videoId: "b5M8SwMgqDk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-madrid-4k-walking-tour-spain-3h-tour
    videoId: "AsuDyA2GZFc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-santander-espana-paseo-por-la-ciudad
    videoId: "pS0UHkHlAx8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fi-helsinki-finland-walking-tour-4k-beau
    videoId: "MlnbvRXfJjE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-paris-summer-walk-2026-ile-de-la-cite
    videoId: "bjpEnda6mcA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-paris-france-4k-drone-footage-with-su
    videoId: "_iZ-vMCeH9U",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-paris-france-4k-hdr-walking-tour-summ
    videoId: "JZ_OmPj5AFs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-nice-france-walking-tour-4k-the-heart
    videoId: "l_yImWYGWZY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-paris-walking-tour-france-evening-tou
    videoId: "6BPuGeS6O4w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-walworth-road-london-england-21-apr-2
    videoId: "OyXjkaLF7g8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-crowd-of-people-walking-in-london-4k
    videoId: "1XIOmKGjgho",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-england-london-s-richmond-during-30-c
    videoId: "vBJ0e1u5d-w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-england-central-london-sunset-walk-re
    videoId: "yI8vbOusf4g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-isle-of-sky-glasgow-edinburgh-scotlan
    videoId: "p-Wv1LfMV74",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-how-london-looks-during-a-32-c-heatwa
    videoId: "GDgBP7EpDpw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-summer-london-city-tour-4k-hdr-virtua
    videoId: "CuJwT75cR9E",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-the-most-beautiful-nature-walk-in-sco
    videoId: "FQkekOTMFPg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-england-london-city-street-tour-2026
    videoId: "5KcBEgTtAVk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-uk-bad-drivers-driving-fails-compilat
    videoId: "EO6IEbiszCc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gr-santorini-greece-in-4k-ultra-hd-60fps
    videoId: "4zAEDLwl9HI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gr-mykonos-greece-4k-hdr-walking-tour
    videoId: "k9PXUqYVpMU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-hyderabad-city-amazing-drone-visual-n
    videoId: "EPXFc2Dr9mQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-new-delhi-busy-streets-evening-crowd
    videoId: "GnshWG_3Lcg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-best-cctv-camera-hikvision-2mp-bullet
    videoId: "H4gbVsnQD6w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-new-delhi-paharganj-walking-extremly
    videoId: "-Xlzej8RTTU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-rome-italy-walking-tour-4k60fps-with
    videoId: "uOJkVLwnCNI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-positano-walking-tour-4k-italy-2024-w
    videoId: "9CAysj6RvGg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-4k-amalfi-italy-4k-walking-tour-amalf
    videoId: "_ofEQYA2V58",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-capri-walking-tour-discover-capri-in
    videoId: "Tovxu_sm9BA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-venice-italy-ultimate-walking-tour-ri
    videoId: "2BfHMnDOteA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-walk-in-tokyo-dji-pocket-2-japan-2
    videoId: "gV-Z3IKZOwM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-evening-walk-in-shinjuku-4k-hdr
    videoId: "3FUIYAwQ7Xs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-shibuya-night-walk-tokyo-s-neon-wonde
    videoId: "e8f7NnyO4PA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-japan-by-drone-4k
    videoId: "X2aY-HgWjzg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-walking-shibuya-crossing-at-night-bin
    videoId: "_dWyKj7I9JM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-japan-4k-hdr-walking-tour-day-n
    videoId: "28ZjrtD_iL0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-walking-tour-odaiba
    videoId: "vYyl6absDUk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-walking-tour-higashi-nihomba
    videoId: "s0ZLTOBHwr8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-shibuya-198
    videoId: "o4BykL4ogsQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-ezoyamazakura-cherry-blossoms-in-full
    videoId: "p8bejt4B-dg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-japan-4k-walking-tour-captions
    videoId: "Ze42hH2GzHc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-heavy-snow-in-sapporo-reaching-a-snow
    videoId: "GZPR3UB9dU0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-harajuku-112
    videoId: "4x28DlqAqX8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-harajuku-106
    videoId: "3OK1Q7ZYvfI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-harajuku-113
    videoId: "LB0FXGM_2EA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-ikebukuro-37
    videoId: "Vcj8Ygm7ljo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-ikebukuro-23
    videoId: "spinJYvpo78",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-shibuya-235
    videoId: "x4ziqlgIFoc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-yokohama-night-walk-4k
    videoId: "ZjuaHfJNjq0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-seoul-walking-tour-4k-summer-in-seong
    videoId: "Hh6IDdNYNGs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-seoul-summer-streets-exploring-crowde
    videoId: "nXTQnl__OLM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-heavy-rain-street-walk-in-seoul-4k-hd
    videoId: "wmkAd6KMR9Y",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-walk-seoul-korea-hannam-dong-cafe
    videoId: "wZgeqLaDjWA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mc-monte-carlo-monaco-walking-tour-4k60
    videoId: "oS-rwVafano",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mc-monaco-walking-tour-supercars-yachts
    videoId: "XIrLrs8vhGg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mx-cancun-4k-walking-tour-103-min-tour-w
    videoId: "_SVv-YROSXI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // no-oslo-norway-the-most-underrated-capit
    videoId: "lNOjxsgsWjs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // nz-waikato-river-bridge-2022-constructio
    videoId: "TnfuGEKpPCI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // pk-mir-raza-case-i-who-deleted-the-july
    videoId: "uIh1_zrowdY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-moscow-russia-aerial-drone-4k-timelab
    videoId: "S_dfq9rFWAE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // pt-lisbon-portugal-a-portogalian-4k-walk
    videoId: "GCw8mmvErO4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // pt-lisbon-4k-walking-tour-portugal-walk
    videoId: "aqevs6jLdJI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-best-of-2025-car-crash-compilation-id
    videoId: "mSKUPeGeSOM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // se-4k-sunset-in-lund-sweden-from-axis-q1
    videoId: "pbye8lM3yZQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // se-first-visible-sunset-2025-in-lund-swe
    videoId: "T23ThEeG4r4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-pattaya-beach-road-thailand-26-apr-26
    videoId: "-haLD3f4HyM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-pattaya-beach-road-thailand-19-feb-25
    videoId: "6_Op-UQlz2g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-calm-and-greeny-evening-in-bangkok-th
    videoId: "DYaPbiXobgg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-soi-buakhao-pattaya-thailand-14-apr-2
    videoId: "-05YqspbSJ4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-nanai-road-patong-phuket-thailand-03
    videoId: "9Go2g9TfJTs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-chao-phraya-river-bangkok-thailand-30
    videoId: "OD3DfIEI-rA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-heavy-rain-in-patong-phuket-thailand
    videoId: "jFvPL8JRhLw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // tr-best-of-istanbul-turkey-2026-4k-walki
    videoId: "kYT_VuUL8oE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // tr-istanbul-turkey-2026-4k-walking-tour
    videoId: "KAEU4MMrCCo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // tr-istanbul-turkey-4k-walking-tour-capti
    videoId: "npTBK0VmhxI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-space-invader-spectacular-fireball-ca
    videoId: "709-Y1QiybA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-8-most-terrifying-real-life-paranorma
    videoId: "GeExTFed6Qo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-4k-drone-video-manhatta
    videoId: "ZxurMK4g1TA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-traffic-camera-structures-threatened
    videoId: "TjB-FyO9KRM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-lake-property-surveillance
    videoId: "j7CL7S3MBfI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-elbo-room-sunrise-timelapse-jul-12-20
    videoId: "VldadSwQum0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-car-wash-surveillance-video-sample
    videoId: "llk_jzFaws4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-security-camera-fails-funny-moments-c
    videoId: "vBnciRcBd_8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-night-vision-vs-night-color-recording
    videoId: "emKaIVNXwtM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-e43a-inside-the-retail-store-in-usa-2
    videoId: "-1bRhYjw1qE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-security-cam-saw-everything-fails-cau
    videoId: "roxf7uEun74",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-mailbox-massacre-viralhog
    videoId: "KAOT4hKLB-s",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-trail-cam-videos-12-months-in-the-wil
    videoId: "dmndvCBJe5k",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-father-s-day-flop-viralhog
    videoId: "yp8BJQd28W0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-family-finds-bear-cubs-inside-suv-vir
    videoId: "uLyiCgEjr_E",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-stock-footage-security-camera-surveil
    videoId: "sVhbMvx7qcs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-axis-q3517-lve-overlooking-chicago-ri
    videoId: "ih-cbdNlxg8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-times-square-crowd-people-2-hd-video
    videoId: "P0wNIsAjht8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-trail-cam-caught-unexpected-visitors
    videoId: "9k68-W1T_mA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-the-one-that-got-away-crashes-capture
    videoId: "_yA0Tx8Oz58",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-walking-in-new-york-city-4k-5th-avenu
    videoId: "yhkbg8p2Gts",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4-seattle-police-crashes-captured-on
    videoId: "2JLxl8GGukw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-happy-holidays-from-seattle-traffic-c
    videoId: "x9sOB0CYiQU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-bandit-park-a-palooza
    videoId: "7rJBDm1Am_I",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-parking-garage-security-camera
    videoId: "UStyxcLIqsE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-traffic-intersection-security-surveil
    videoId: "z8EwY3Slsws",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-traffic-camera-captures-the-ground-cr
    videoId: "S_1j1vbzI38",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-driving-downtown-new-york-city-4k-usa
    videoId: "7HaJArMDKgI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-norfolk-southern-freight-train-crossi
    videoId: "a7rx1l1vPC8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-cars-trucks-highway-sounds-by-walking
    videoId: "wSMQEMiLWR4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-traffic-camera-captures-car-flipped-i
    videoId: "VnYxaJvgnxQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-the-best-trail-camera-video-you-ll-ev
    videoId: "K2FtVnoVozo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-fake-cctv-camera-video-for-prank-shop
    videoId: "1cBjmb0rDoU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-the-day-nyc-suffocated-a-surreal-walk
    videoId: "YHbjs-lmmiA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-time-lapse-of-home-constructed-start
    videoId: "C3iI6S7TuCA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-snowstorm-4k-walk-midto
    videoId: "50LU9-4JwMg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-walking-tour-4k-soho-is
    videoId: "dXyTpYLvfqE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-relaxing-night-walk-in-chicago-downto
    videoId: "Fm-SPFm7MoE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-flying-over-oahu-4k-hawaii-ambient-ae
    videoId: "4AtJV7U3DlU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-sample-1080p-hi-definition-cctv-foota
    videoId: "dKveAYTAyJM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-security-camera-video-of-fire-at-wlne
    videoId: "BJ9ng9L1CA0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-water-truck-delivery-surveillance-foo
    videoId: "sUR5Dp81DoQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-security-video-shows-tornado-rip-up-s
    videoId: "W3hCvTGx36s",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-school-surveillance-video-from-april
    videoId: "T2Qu7cgwJmw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hardin-county-kentucky-flooding-disas
    videoId: "_GqQHYUUPQQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-highway-sounds-cars-trucks-passing-by
    videoId: "TW3EH4cnFZo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-urban-coyote-on-the-street-encounteri
    videoId: "8_OQ5KIU3j8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-seattle-fire-full-traffic-camera-foot
    videoId: "unHlhAYfNmU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-elbo-room-sunrise-timelapse-jul-11-20
    videoId: "3YJpPI17iVI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-security-cameras-for-homes-in-fr
    videoId: "g7KzO1dSWf0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-fresno-siren-strobe-light-colorvu-cam
    videoId: "jJhLwNpsqe4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-fresno-video-surveillance-systems-hik
    videoId: "em_jXiTqRLM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-high-definition-hikview-8-megapixel-w
    videoId: "-fqQgks-9RE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-a-day-in-the-life-of-an-american-truc
    videoId: "ox22Ut5RaU8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-walking-tour-part-1-mid
    videoId: "-IpXdtWfneI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-7-hour-4k-drone-film-earth-from-above
    videoId: "lM02vNMRRB0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-1-hour-drone-nyc-night
    videoId: "s8ctjBfWHBk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-north-american-car-crash-compilation
    videoId: "hBD5IFieEiQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-convenient-cop-of-2026-so-far
    videoId: "NLhwVbl_QNk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-california-drivers-20-minutes
    videoId: "4t_hIBP_2WE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-sleepy-dump-truck-driver-smashes-into
    videoId: "9uGkVY_P5k8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-manhattan-evening-5th-avenue-walking
    videoId: "_-yYi7Cp4uQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-most-dangerous-high-speed-police-chas
    videoId: "QpiZ3PM8BRk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-new-york-full-city-walk-8-hours-of-ex
    videoId: "27Pv4Cg4EV4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-semi-truck-crashes-compilatio
    videoId: "3DwSPq0JSqk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-2025
    videoId: "BlqIfbNrqEs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-usa-c
    videoId: "2IG706P2z2o",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-miami-florida-4k-walking-tour-caption
    videoId: "7qz13Chz_84",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-texas-drivers-20-minutes-of-r
    videoId: "dxG6PCcxiVw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-u-2
    videoId: "xdEbQZQJ_jA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-u-3
    videoId: "zcoVtZrWNwM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-2024
    videoId: "0zdj1w9cR30",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-u-4
    videoId: "E-bxeD3umXU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-u-5
    videoId: "hTfMBVA8CsM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-car-crashes-compilation-2022
    videoId: "LLUbhzcjv_c",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-this-porsche-driver-messed-up-bad-956
    videoId: "llWLh5cgAr4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-elbo-room-sunrise-timelapse-jul-10-20
    videoId: "cnkAwW5rm2Y",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-manhattan-evening-walk-new-york-walki
    videoId: "1aedKShR1rA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-complete-house-construction-time-laps
    videoId: "TEARy5Vk4vY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ve-m7-5-damages-shop-in-el-junquito-la-g
    videoId: "vMPMskE2T5o",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // vn-nha-co-ma
    videoId: "6bsJV3aYHM4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-night-vision-6mp-dahua-3641emp-camera
    videoId: "Ndw5JHgQrPw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-solar-cctv-security-camera-time-lapse
    videoId: "1p_mn7C89A0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // br-nao-tem-camera-video-de-seguranca-que
    videoId: "e3pFGay-GME",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-8mp-4k-dahua-cctv-system-sample-video
    videoId: "ms-Q3t5IqNM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // br-15-scariest-videos-of-the-year-that-w
    videoId: "_C0jugEBSEs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-relaxing-wildlife-one-hour-of-trail-c
    videoId: "hv-NOW9PSBQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-halifax-waterfront-walking-tour-explo
    videoId: "91BeCFEr0pI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-2-hrs-virtual-walk-around-emerald-lak
    videoId: "U1j-eO3-aR8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-beautiful-old-quebec-city-walking-tou
    videoId: "OqYUd8OuI5Q",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-anlelin-rd-in-beijing-china-walkin
    videoId: "qUuiz7ysD-c",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ch-walking-tour-of-lauterbrunnen-switzer
    videoId: "Qj0TbRiRjFE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-yiheyuan-road-in-beijing-china-wal
    videoId: "86-4q8uEBCY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-mentougou-old-city-district-in-bei
    videoId: "Qc1hyG9oyuU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-hiking-adventure-abandoned-factory
    videoId: "ELOXTBVBGcg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-yuquan-road-in-beijing-china-walki
    videoId: "SwOyxRbmaTw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-fuchengmennei-dajie-in-beijing-chi
    videoId: "pf40uGjMrhE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-wusi-street-in-beijing-china-walki
    videoId: "3cZjFdEx3LY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-nanluogu-lane-in-beijing-china-wal
    videoId: "HtXUFck-cxE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-beiluogu-alley-in-beijing-china-wa
    videoId: "w5NtIgb_u3A",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-wanping-town-in-beijing-china-walk
    videoId: "8h76VRxMZls",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-dongjiaomin-xiang-in-beijing-china
    videoId: "5_kaW-rp_co",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-hiking-in-qingyun-market-guiyang-g
    videoId: "Wi18Qxgp95c",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-no-rules-on-the-streets-shenzhen-c
    videoId: "D5qDfQ51Gic",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-hdr-walking-tour
    videoId: "M7RHCyyJ1ls",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-einsatzfahrten-auf-dashcam-werttransp
    videoId: "sf5xDcVplIk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-einsatzfahrten-auf-dashcam-werttr-2
    videoId: "CpEzOgtc7AU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-construction-site-time-lapse-shopping
    videoId: "SvApoH3n9FE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-heftige-unfalle-best-of-2024-dashcam
    videoId: "Xkra8l2EFXM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-einsatzfahrten-auf-dashcam
    videoId: "T_53DRAvFWY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-polizei-bricht-kontrolle-ab-schwein-g
    videoId: "K9Er0NLXS_I",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-time-lapse-construction-officehome-so
    videoId: "wDmNBXfd7K8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-time-lapse-recording-of-the-construct
    videoId: "VhuZS9e8hLM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-secret-corners-of-malaga-spain-beauti
    videoId: "SDrqloSJDCo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-4k-4-1-from-4th-district-to-1st-distr
    videoId: "g9S5DMmnIUM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-8k-video-test-people-walking-in-the-s
    videoId: "NtKYoB7gif8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gr-4k-walking-tour-of-fira-santorini-gre
    videoId: "2zjpU97z3YY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // hk-sysvideo-4k-8-megapixel-ip-camera-dem
    videoId: "eO19UTm93GQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // id-solusi-cctv-yang-tidak-bisa-menyimpan
    videoId: "SHwvX_f6fec",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-hikvision-6mp-4k-dual-lens-panoramic
    videoId: "8scn_iyasFk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-live-crash-bike-total-loss-viral-cras
    videoId: "Ndw_Q_mcILk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-sy-2m-bhdc-syrotech-2mp-night-vision
    videoId: "dC8gk0sKk-g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-2022-florence-in-italy-walking-in-cen
    videoId: "2r9DVfRow60",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-lake-como-italy-spectacular-cloudy-mo
    videoId: "KRUtzHibboI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-7-hour-walking-tour-of-rome-italy-4k
    videoId: "--v8TDp92Q0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-exploring-amalfi-discovering-a-secret
    videoId: "3aGiTYIuGzM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-a-nighttime-stroll-through-nihonba
    videoId: "Je-wc3NaRfE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-midnight-to-dawn-walk-from-tokyo-stat
    videoId: "ZcvW0AplmV8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-4k-osaka-night-walking-tour
    videoId: "pRhT--6bV5A",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-countryside-walk-4k
    videoId: "8tdU1IjncGc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-uguisudani-walk-2022-10-11
    videoId: "qEkelYI7oFo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-walking-tour-relaxing-moss-c
    videoId: "UsVsQaV7z5k",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-blizzard-and-whiteout-in-sapporo-in-t
    videoId: "G6sibWr2-aA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-tokyo-4k-walking-tour-kappab
    videoId: "Q144893TVec",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-tokyo-4k-walking-tour-gotoku
    videoId: "3PpvIjdtQ-w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-osaka-night-walk-dotonbori-stroll
    videoId: "9-dOVxyaHSw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-walking-tokyo-disneyland-let-s-go
    videoId: "GWlU43hXjko",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-hdr-azabudai-hills-to-roppongi-hil
    videoId: "7vhvGUH2rC4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k60-shibuya-jul-2026-1-walk-tokyo
    videoId: "xmN76Iwoix8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-tokyo-4k-night-walking-tour
    videoId: "WO7QzuZS5sY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-tokyo-4k-walking-tour-asagay
    videoId: "BYqCey1VTkw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-tokyo-4k-night-walking-t-2
    videoId: "kZ9Qzv3TBQg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-japan-tokyo-4k-night-walking-t-3
    videoId: "yvCeIr-oi38",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-shibuya-miyashita-park-may-2026-1
    videoId: "KoDM_rm8dc8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-walk-2-shinjuku-shibuya-strolling
    videoId: "-ym8bR3prns",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-snow-in-sapporo-in-the-morning-reachi
    videoId: "H3PKSvDTCRg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-night-walking-around-osaka-umeda-s
    videoId: "3p-0hx7ryRg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-snowfall-in-sapporo-on-new-year-s-eve
    videoId: "D0Uku89oQkg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-city-walk-from-cheonggyecheo
    videoId: "qkLfxNmAF50",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-korea-travel-walk
    videoId: "ejyV2uxwYeU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-winter-walk-from-myeongdong-fashion-s
    videoId: "CcfTi24aRIY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-heavy-snow-myeongdong-seoul-4k-hdr-ma
    videoId: "SxpEvrAFstg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-virtual-walk-tour-4k-seoul-korea
    videoId: "rgncgcn03K8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-nightlife-walking-tour-best
    videoId: "ca9uN3QyDmQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-autumn-walk-from-gyeongbokgung-to
    videoId: "ElOAfA82bfs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-walking-in-yeouido-park-2021-08
    videoId: "2fTU0wPoK10",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-hdr-4k-4k-walk-4k-seoul-4k-korea-w
    videoId: "tLJeqUnpAbc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-walk-from-coex-to-yeoksam-alley-4k
    videoId: "g--nQTDblss",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-seogwipo-culture-art-street-4k
    videoId: "yrhcrfVYTUU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-namsan-tower-to-myeongdong-walking
    videoId: "UI4s0BKIHl4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-gangnam-3
    videoId: "Fd_iHE887jw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-walk-in-yeonnam-dong-hongdae
    videoId: "Y5zy10wLUKI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-full-version-seoul-walking-tour-4k-ga
    videoId: "GyighJc3tls",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-walk-11-samsungdong-coex-seoul-gan
    videoId: "uEQy-Fn9UBE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // lu-luxembourg-city-walking-tour-4k-60fps
    videoId: "2GP7gDmy_Qc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-rainy-walk-in-jongno-euljiro-seoul-4k
    videoId: "udrZR3-7xcs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // pl-4k-road-traffic-video-for-object-dete
    videoId: "MNn9qKG2UFI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-26-04-2026-2026
    videoId: "1NN0PcYUim8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-20-04-2026-2026
    videoId: "eOYZciKRiEI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-09-04-2026-2026
    videoId: "WwnMgYv1YvI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-15-04-2026-2026
    videoId: "LtstNeDRyEk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-monsoon-rain-in-phuket-turns-the-stre
    videoId: "BLxyK1lpViU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-heavy-rain-in-patong-today-phuket-tha
    videoId: "XvNVjwHKljg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-rainy-bangkok-thailand-24-may-26
    videoId: "fZD_6R5tuZE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-sunny-bangkok-thailand-24-may-26
    videoId: "CMmfzvECUag",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-closed-for-traffic-only-people-pattay
    videoId: "-oWks4bXk34",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-4k-best-quality-how-is-pattaya-now-be
    videoId: "5hFgAs0IQzw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-live-bout-from-bangla-boxing-stadium
    videoId: "SWdLKGiVMVA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-rainy-patong-phuket-thailand-16-may-2
    videoId: "60rxjqtCcW4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-4k-pattaya-soi-6-walking-street-patta
    videoId: "gv1TrkfHVvE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-crossing-the-street-in-buakhao-and-di
    videoId: "JTWxFSSsIyc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // tr-pubs-street-kad-koy-istanbul-walking
    videoId: "o0xQ0u8eD4k",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-sainamyen-road-patong-phuket-thai-2
    videoId: "DZ7fbO9RnjQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ua-road-traffic-video-for-object-recogni
    videoId: "wqctLW0Hb_0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-sapd-releases-security-camera-video-o
    videoId: "EplrPy5MgEo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-security-hikvisi
    videoId: "PoVEjMmndzc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-hikvision-panoramic-warehouse
    videoId: "qaKfEJgXvrc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-budget-series-2-megapixel-hi
    videoId: "uIkLoImlhy0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-caught-in-4k-best-of-the-year-top-sec
    videoId: "NOZSFFfGHUk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-8-megapixel-lowlight-color-to
    videoId: "uXGdoeUX9eg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-budget-camera-2-megapixel-hi
    videoId: "_ulPZt2g22c",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-3mp-hikvision-closeup-parkin
    videoId: "b75u-fNFYcc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-insane-car-crashes-compilation-best-o
    videoId: "MKPkT2TuZhs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-hikvision-front
    videoId: "YP3dqviWCj8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-with-zoom-lens-i
    videoId: "l6fI3XU8rws",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-caught-in-4k-funniest-security-camera
    videoId: "8Q6HFIfVF-o",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-licence-plate-camera-illustration-vid
    videoId: "dP1UQ59d0Vw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4-in-1-license-plate-recognition-hd-c
    videoId: "2dhOcCEyOcY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-crashes-caught-on-seattle-traffic-cam
    videoId: "oPf3sBExNLE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-crashes-caught-on-seattle-traffic-2
    videoId: "owY0Fg-1Yhk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-i-695-n-of-md-151-traffic-camera-8-20
    videoId: "zWW1DoLfyvk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-40-vehicle-pileup-caught-on-camera-du
    videoId: "9kj6f2iSkrI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikvision-8-megapixel-with-zoom-lens
    videoId: "ZJVVmofnf6E",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-license-plate-hikvision-came
    videoId: "H10ynOb9BCg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-4-megapixel-wide-view-hikvis
    videoId: "QtC_9HWbWf8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-2-megapixel-discontinued-hik
    videoId: "SBlIteauqLM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-color-indoor-security-camera
    videoId: "c1QW589t378",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-hikvision-proces
    videoId: "odyoqNhaRTY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-obsolete-analog-coax-camera-640x480-l
    videoId: "XozOS13Z4W4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-hikvision-viewstar-4k-deliver
    videoId: "eKqQoinMCPg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-hikvision-loadin
    videoId: "ndlZWfIo3cI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-insane-car-crashes-compilation-be-2
    videoId: "khby8M3i3Lw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-2-hours-best-of-car-crashes-compilati
    videoId: "L9OhULYZ8Rg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-watch-american-flag-still-standing-af
    videoId: "pDS_y9GQ-kE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-license-plate-camera-on-night-time
    videoId: "1FkSVGTmj6Q",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-example-of-hi-definition-video-survei
    videoId: "8DJi4PrdFCg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-b-w-people-walking-on-crowded-sidewal
    videoId: "NLGrD3aCelk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikvision-viewstar-increible-panorami
    videoId: "0LvcJ78lFnM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-hikvision-with-wide-dynamic-o
    videoId: "QmE3_qRDO44",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-07312024-coyote-with-a-cat-in-its-mou
    videoId: "1zbIUknc4uU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-4-megapixel-hikvision-securi
    videoId: "5ySraL-siFc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-colorvu-security-camera-with
    videoId: "QsSfHoJ7YaU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-092425-coyote-pair-final
    videoId: "M64S36sebzg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikvision-panovu-viewstar-dual-lens-l
    videoId: "JAnHQiSfjJI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-hikvision-school
    videoId: "Id6q5HsFt-M",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-nothing-bundt-ca
    videoId: "MhadylhyGBE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikview-hikvision-oem-2-8mm-wide-lens
    videoId: "nDq1XOEup4I",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-hikvision-home-v
    videoId: "cDT3muEZip8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikvision-viewstar-8-megapixel-wareho
    videoId: "0piTQw83NBE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-viewstar-8-megapixel-hikvision-motori
    videoId: "MzJEqaCPhFc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4-megapixel-zoom-lens-inside-storage
    videoId: "18KgJKYCYC8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-hikvision-viewstar-low-light-bar-came
    videoId: "Bmb291lWlyE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-2-hours-best-of-car-crashes-compi-2
    videoId: "J8LZrDGjoNo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-walking-tour-4k-billion
    videoId: "vkAtlt6-zcs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4k-wall-street-new-york-city-walking
    videoId: "HCuN1YIcKIU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-2-hours-best-of-car-crashes-compi-3
    videoId: "VFdG7sQ0RCc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-treating-roads-as-personal-playground
    videoId: "qQ4SAoaFoI0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4k-new-york-times-square-4k
    videoId: "83kAx6pCk-A",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-always-the-dodge-drivers-best-of-cali
    videoId: "ETTDR5uXkqM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4k-seattle-2026-2-hour-drone-aerial-r
    videoId: "HY_OxIITp78",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-8mp-dahua-cctv-sample-video-day-time
    videoId: "T0Ba_37F99g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-uniview-unv-5mp-night-sample-video-ip
    videoId: "yYJgWL1ATQk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-4k-swanston-st-pt-02
    videoId: "46J9sLC84hY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-4k-2021-07-08-4k
    videoId: "honGnidD5AM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-4k-pt-01
    videoId: "YCJkFpI0k30",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k
    videoId: "gTi2E5Ug4I8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-4k
    videoId: "qHlpfCtnyuo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-4k-2
    videoId: "HUDAJpeOCLo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-australian-car-crash-dash-cam-compila
    videoId: "X_yoLHwNSRU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-australian-car-crash-dash-cam-com-2
    videoId: "PXdkVl9jD1w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-australian-car-crash-dash-cam-com-3
    videoId: "tAOyScTBFZE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // fr-4k-paris-2025-1-hour-aerial-drone-rel
    videoId: "WHNNHAoaZD4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-shin-okubo-70
    videoId: "Sj8yNISzSu0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-heavy-rain-today-in-bangkok-thailand
    videoId: "bmCfdy6oZDs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-unknown-creatures-caught-on-camera-th
    videoId: "DvWw-f2VU8E",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-esta-es-la-camara-que-nadie-esperaba
    videoId: "Urem1nBU51Q",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-when-people-record-terrifying-things
    videoId: "A_M7yap9t70",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k
    videoId: "_OFIxfjoyjI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-uniview-unv-5mp-sample-video-ipc3615l
    videoId: "JUtNUjednIY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mx-mexico-city-4k-walking-tour-190-min-t
    videoId: "fVh9YNTzhak",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mx-mexico-city-walking-tour-night-4k-cam
    videoId: "KgJmJA2ZU4U",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-l-l-4k-hdr
    videoId: "i-k-tAGUpc4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-n-4k-hdr
    videoId: "DJ-s0Dnqyv4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-tokyo-walk-shin-okubo-40
    videoId: "Pr9Hfdz8fYA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-40-cctv
    videoId: "Yi7igE4_yWA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-34
    videoId: "MbHjjUi6dBk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-35
    videoId: "WbX_pSBHq-I",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-07-06-2026-2026
    videoId: "z9HkEd8FshM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-03-02-2026-2026
    videoId: "pS2MNr_tOOw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // th-ascctv-ahd-5906wr-video
    videoId: "LhjJ7oin01M",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-dr-aarambhi-on-location-cctv-footage
    videoId: "nfynu8P5csg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-hikvision-4k-camera-video-sample
    videoId: "bVjKxbKBRVE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-2026-8-4-cctv
    videoId: "6omvNJlx8Tg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cz-15
    videoId: "Gk4Ze-W2xuo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-ktx-cctv
    videoId: "5sFZix8DRlY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ma-10-scary-videos-caught-on-security-ca
    videoId: "uq4GYjvWbIg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k
    videoId: "tUQPWUoCMhQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-4
    videoId: "j2Hyxgs2WGs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-4k-sentosa-tour
    videoId: "8mgFUYdsxGQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-china-automobile-park-street-trave
    videoId: "D4JJBjilgys",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // vn-gd-morning
    videoId: "5VxaBjY4zdQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-2
    videoId: "icbTFe8T_XM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-hdr-citywalk
    videoId: "0z3VzCiUQU8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-2
    videoId: "jaiPSefCGcE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-cctv-mp4
    videoId: "bnqdyHinfKE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-11-02-2026-2026
    videoId: "yJWJFRpXSJQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-3-3
    videoId: "FNXlU_mQcZ8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-ezviz-h8c-4mp-alarm-sirene-warning
    videoId: "V3QMrftx3cQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-hd-2mp-bullet-ip-camera-day-vision-re
    videoId: "VPG82dnXfWY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-ip-cctv-camera-day-vision-revlight-se
    videoId: "pm9MaJf75_s",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-hd-2mp-bullet-ip-camera-night-vision
    videoId: "iKoQe0zN2hI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-ip-bullet-cctv-camera-day-vision-revl
    videoId: "oMchM0qHUJk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-best-2mp-ip-dome-cctv-camera-day-visi
    videoId: "TOPpWuYz_OU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-ip-dome-cctv-camera-restaurant-view-r
    videoId: "DBl7MmHlQK0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // sg-2mp-best-ip-dome-cctv-camera-night-vi
    videoId: "mJXSMk8q7Ww",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-3
    videoId: "wxOHp37jIsE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // eg-4k-egypt-walking-tour-cairo-s-hidden
    videoId: "2mGAKmK2zTk",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // es-spain-landscape-barcelona-landscape-4
    videoId: "taJCVtmmpIA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-2
    videoId: "Xr3TcCa4d_M",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-3
    videoId: "aQRXa92SMes",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4
    videoId: "3FarHu9YKdM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-1
    videoId: "JprYwCOlgT4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-quick-thinking-driver-races-burning-t
    videoId: "cfDb7iLTqdw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-ip
    videoId: "BSdzRKbAf28",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mx-4k-mexico-city-2026-1-hour-aerial-dro
    videoId: "4KBjBvxgwSU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mx-mexico-city-4k-walking-tour-cdmx
    videoId: "xjR0q-yUsYY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-4
    videoId: "69KvN3Sp8lE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // mx-mexico-city-walking-tour-mexico-walk
    videoId: "LddoNrTyJA4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ro-modern-bridge-construction-time-lapse
    videoId: "_KnoLCXwums",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-74
    videoId: "9JZiv49yw78",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-fair-construction-site-time-lapse-lon
    videoId: "PnDv_iij5Po",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ru-02-06-2026-2026
    videoId: "_3RIaDyMR5g",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-hdr-walking-tour
    videoId: "PhLl642RpjA",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // kr-4k-hdr-walking-tour-2
    videoId: "OSwyX2xAEXY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-t-4k
    videoId: "yYcUJafdGso",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-shocking-dashcam-footage-used-as-evid
    videoId: "Ks6haGi1AaU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k60fps
    videoId: "UQe8hrdN1io",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-3
    videoId: "AFzrjqD_aH4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-trieste-4k
    videoId: "XgiSTIbkCxg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-33-car-crash-idiot-drivers-caught-on
    videoId: "pq854OBlu-Y",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-4k-60fps-20250301
    videoId: "DUK0FWyv0jY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-7
    videoId: "LPNFargEH8c",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // cn-8
    videoId: "JT-Ne2kjcC8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-2-5-2
    videoId: "5PyexUfV2QY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-aerial-tour-of-houston-tx-usa
    videoId: "Ns22eN1VbAc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-aerial-tour-of-new-orleans-la-usa
    videoId: "p3Z__f5pDrU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-aerial-tour-of-san-francisco-ca-usa
    videoId: "FSqjgJGMww0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-chicago-aerial-tour-in-4k-usa
    videoId: "gdD6BC4Yt74",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-space-needle-3-year-timelapse-usa
    videoId: "-2MTiUGvqyE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // vn-hanoi-skyline-red-river-view-hanoi-vi
    videoId: "JXQUeX0Dpb0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-the-cctv-people-demo-3
    videoId: "iSeMVR42thE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-parking-lot-surveillance
    videoId: "h4p6_PCwS-4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4k-uhd-cctv-kit-sample-video
    videoId: "eRxXki-CL-o",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gb-4k-camera-example-for-traffic-monitor
    videoId: "cJatWBDNabE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // id-license-plate-detection-test
    videoId: "FsGPxhidwGg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ca-weird
    videoId: "Vexipd6lemg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-reolink-4k-811a-cameras-viewing-a-lic
    videoId: "hcAsIiM3bHw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // br-traffic-ip-camera-video
    videoId: "Gr0HpDM8Ki8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // in-3-megapixel-cctv-camera-night-vision
    videoId: "zZjKRRkHHTw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ph-3-megapixel-bikal-camera
    videoId: "8XW176ST3is",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // ph-bikal-12mp-cctv-surveillance-bkl-cn11
    videoId: "GbAkk8ECTRU",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // tz-4k-hd-camera-image
    videoId: "QBhzRMTusMs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // no-night-time-traffic-camera-video
    videoId: "G-ie5hQbG2s",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // br-4k-video-of-highway-traffic
    videoId: "KBsqQez-O4w",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // de-rain-storm-in-4k
    videoId: "gnU1kieEiK4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-vehicle-dataset-sample-4
    videoId: "4wfMOECRlgw",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-vehicle-dataset-sample-1
    videoId: "V-mhujsgGYs",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // si-store-aisle-dataset-sample-1
    videoId: "QOC3JiGGJl4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // be-shopping-people-commerce-mall-many-cr
    videoId: "WvhYuDvH17I",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-the-cctv-people-demo-1
    videoId: "jEbv-gc0ezM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-the-cctv-people-demo-4
    videoId: "qgxcw0Wv9SM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-the-cctv-people-demo-2
    videoId: "GJNjaRJWVP8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // it-the-cctv-people-demo-9
    videoId: "Qju0w2dzwO0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-hd-sdi-retail-takeaway-checkout
    videoId: "7MfH-XzJLaM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // au-hd-sdi-25-f-s-retail-2
    videoId: "ZjRNX2GiO0M",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gh-iprox-cctv-4megapixel-hd-ip-network-d
    videoId: "PQWTF2M1Y5A",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // br-hd-cctv-camera-video-3mp-4mp-iprox-cc
    videoId: "KMJS66jBtVQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // gh-iprox-4mp-hd-cctv-ip-dome-night-visio
    videoId: "e7oVsU6y76E",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // bz-iprox-cctv-ip-hd-4megapixel-ip-camera
    videoId: "2BhG_z_qhU0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // no-time-lapse-of-traffic-surveillance-ca
    videoId: "me8VFwsmKWI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // et-timelapse-of-spider-building-web-in-f
    videoId: "SKKWkanaeSE",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // at-truck-breaking-in-ring-camera
    videoId: "tJLo8oq_EV8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // so-witson-cms-cctv-live-6-remote-sites-3
    videoId: "lffpBLDQqqc",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-thermal-camera-video-in-day-sct-320
    videoId: "w9nPJDpcez4",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-vehicle-dataset-sample-2
    videoId: "JqhdBCCUVyQ",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-vehicle-dataset-sample-3
    videoId: "dRFK-nvV9XM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-top-view-pedestrian-dataset-sample-1
    videoId: "Obzq2YJ8uB8",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-best-of-convenient-cop-2025-drivers-b
    videoId: "5OZ2MXY1-GY",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-2026-6-4-1
    videoId: "CEgbWpi2oI0",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // us-4k60p-a7s3
    videoId: "HKF4x8yONdI",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-5
    videoId: "sFhD4HsHysM",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // si-maribor-4k
    videoId: "y4KLvwl7Uoo",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  {
    // jp-2-9
    videoId: "aK1LPDoo-dg",
    reason: "Upload, never a live stream: isLiveContent false on the watch page, 2026-11-02",
  },
  // ── Streams whose owners forbid playback on other sites. The live-state sweep had each one blocked
  // (or offline with embedding refused), and the watch page states playableInEmbed false.
  {
    // br-porto-belo-beach-waterfront-brazil
    videoId: "TF-47MpIutI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // bz-ambergris-cay-beach
    videoId: "02I8oggFCOQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-peggys-cove-lighthouse
    videoId: "SFoS6nBL138",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // gb-swanage-beach-uk-live-webcam-swanage
    videoId: "TYaIfGFCEtk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page of its current stream uUsx1DdBOvs, 2026-11-02",
  },
  {
    // ie-dublin-airport-live-plane-spotting-du
    videoId: "6KEEAwCYRKs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // is-live-now-iceland-volcano-watch-cam-e
    videoId: "a_FK2mDP4W8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page of its current stream 6dJqoF57zJE, 2026-11-02",
  },
  {
    // jp-83
    videoId: "GhLuH2rRAb8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-live-jr-ch2-train-kyoto-station-live
    videoId: "gcWty8bA7Dc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-live-kiyomizu-dera-temple-kyoto-live
    videoId: "-nSBtuB98FM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-84
    videoId: "9bLj7lRLIrs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-85
    videoId: "fiUjR-MhIQE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-86
    videoId: "Ka8VKf0AYdo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-88
    videoId: "38h0Hi7CbRk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-89
    videoId: "hpkFTc_r3xE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-live-hakata-nakasu-livecamera
    videoId: "iy8A4LMT_TU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-90
    videoId: "UGIHWTEGxaU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-91
    videoId: "339TQqPkdew",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-92
    videoId: "7FcWRxbN7-s",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-93
    videoId: "-u1wfp8DbtI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-94
    videoId: "uO_tG5ThCFA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-96
    videoId: "ipj9KovmH8k",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-yawatahama-port-ferry-terminal-liv
    videoId: "XJ-o3WNR6Fk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-4k-yawatahama-port-ferry-terminal-2
    videoId: "sm-Zo-FmN9E",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // kr-1200-top-live-webcams-around-the-worl
    videoId: "EFum1rGUdkk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // kr-welcome-to-gwanak-rolling-cam
    videoId: "9Tk248Er7pk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tw-live-cam-relax-music-sleep-peacef-2
    videoId: "IBK9A6Qberw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tw-live-cam-taiwan-taipei-city-taiwan-ko
    videoId: "6aY9R7iJa4s",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // cn-live-cam-zagorodny-avenue-st-petersbu
    videoId: "h1wly909BYw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-live-port-miami-webcam-with-vhf-marin
    videoId: "DxZziUUr6CY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-200-top-live-cams-from-greece-with-re
    videoId: "5p-s-1453Us",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ph-moalboal-live-cam-4k-moalboalsup
    videoId: "hiU1w7NEhbg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-from-annapurna-base
    videoId: "6erj7ooA6CM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-lukla-airport-live
    videoId: "am9KDRSZQ-0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-mount-everest-panor
    videoId: "AD4-Z-ONsIc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-buddha-lodge-lukla
    videoId: "kaRVui_uXa8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-thame-village
    videoId: "_9-drv-6Hjw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-main-entrance-hotel
    videoId: "BndXHwLByjw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-from-hotel-milan-re
    videoId: "DfcvfF_qoDU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-from
    videoId: "uQsntMlx8ZY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-stream-from-ka
    videoId: "tyomcR9vQDI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-2
    videoId: "lHUky64A16Y",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-3
    videoId: "AFUTlak8wcA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-4
    videoId: "MOP1v1zd408",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-stream-hotel-e
    videoId: "udxNsIGv-sg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tr-600-top-live-cams-from-italy-with-dol
    videoId: "wMT2aNcP4Wg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tr-cam-nomad
    videoId: "YUe13IPFvRI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // gb-united-kingdom-seaside-webcams-tour-s
    videoId: "K2gBg7jjhIc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // fr-live-webcam-vue-de-paris-depuis-boulo
    videoId: "j3dS_UHnwy4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-live-berlin-alexanderplatz-panorama-w
    videoId: "IRqboacDNFg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-hafen-livestream-live-hamburg-kieler
    videoId: "mIpgUIeFJbk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-cuxhaven-altenbruch-live-webcam-mit-b
    videoId: "FYN4N1pfzjA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // es-live-benidorm-webcam-playa-de-levante
    videoId: "7i5qu1dotFY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // es-live-webcam-fuengirola-beach-port-sea
    videoId: "Eqj5Lb0csUw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // es-live-malaga-alameda-principal-calle-m
    videoId: "4CaHlfpGlAI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // es-live-weather-webcam-malaga-port-cruis
    videoId: "sxgx5ZqAAxo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // es-live-torremolinos-el-bajondillo-beach
    videoId: "qVpEwuoIUzc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-venice-live-24-7-with-piano-music-sky
    videoId: "x4AlaibltlA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-norcia-live-webcam
    videoId: "482CzL5nYa0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-famous-usa-cities-webcam-tour-las-veg
    videoId: "pisk_b_LjBU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-pacific-cams-west-coasta-tourcaliforn
    videoId: "KJNbhGO-OjM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-live-24-7-4k-maui-live-cam-whale-watc
    videoId: "sdgEUQQ4SzQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-live-departure-bay-weather-cam-bc-fer
    videoId: "VF2WmFgrtGg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-rio-sands-beachcam
    videoId: "hXtYKDio1rQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // za-table-mountain-cape-town-webcam-live
    videoId: "z1PJqpgZccg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // za-strand-beach-webcam-live-stream-cape
    videoId: "nK3l-mKYCwc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // au-webcamsydney-2-live-panning-view-of-h
    videoId: "jshwkG1ZpP8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // au-old-sloop-webcam-live-stream
    videoId: "Xf5XbAyb6w4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-camera-ao-vivo-florianopolis-praia-do
    videoId: "DZuO-fgkhYI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-camera-ao-vivo-florianopolis-campeche
    videoId: "m1wtZJ2aBFs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-ostsee-live-kustenpanorama-von-rugen
    videoId: "d8payS6zCgs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-jacksonville-beach-pier-live-cam-sout
    videoId: "c400PBf6adI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-jacksonville-beach-pier-live-cam-nort
    videoId: "JLvCEDGJr-s",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-schleswig-holstein-live-24-7-wetter-k
    videoId: "UMc2bf2lOiM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-mix-de-cameras-de-florianopolis
    videoId: "ipYEBKDDFTc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-live-now-24-7-kilauea-volcano-liv-2
    videoId: "iws3rh5vLAQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-houston-texas-live-city-camera
    videoId: "msKUiija4jo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-houston-texas-live-downtown-skyline-c
    videoId: "1-Je0zLBUxY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-houston-texas-live-hobby-airport-came
    videoId: "hboDcda_M7s",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // fr-plouescat-en-direct-webcam-live-plage
    videoId: "uzsmd6qxT_4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-tucson-downtown-live-stream-1-2024
    videoId: "vyQp0uUDqcY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-ycv-live-ic
    videoId: "lo-jjyNuSYg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-107
    videoId: "1BOi9LexBdc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-109
    videoId: "_B84q1nefd0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-now-live-24-7-live-cams-traffic
    videoId: "pzyA9gFHlJg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-nol-km-utara
    videoId: "T-kzxf03Phw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-nol-km-timur
    videoId: "n7FLPsRLboI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-nol-km-gedung-agung
    videoId: "y3_Ch1mbTvI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-jl-mas-suharto-v-selatan
    videoId: "nkmTk_0DjYM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tr-ali-ozutemiz-k-v-rc-k-ali-park-yenima
    videoId: "jJlZiD3hZ80",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-from-hotel-mil
    videoId: "ugx5QvcCgL0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page of its current stream DfcvfF_qoDU, 2026-11-02",
  },
  {
    // es-webcam-en-directo-fallas2026-live-24h
    videoId: "dVAtjVi7bUQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-san-diego-shelter-island-live-web-cam
    videoId: "OUB8NDFSmFI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-shelter-island-pier-san-diego-web-cam
    videoId: "UnTDO-7BV1k",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-san-diego-webcam-glorietta-bay
    videoId: "ED5fI1ZFHvo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-city-of-murfreesboro-traffic-cameras
    videoId: "lFB8Rh-6rFQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-bird-feeder-cam-24-7-non-stop-action
    videoId: "3uEi1fE7mCY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-cardinal-bird-feeder-cam-24-7-blue-ja
    videoId: "pUb0PFpElkc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-bird-feeder-cam-24-7-non-stop-act-2
    videoId: "ZmniSmZfcR4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-cherry-grove
    videoId: "90Dq7oxyE6A",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-crescent-beach
    videoId: "YeXmNmJlEhU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-myrtle-beach-outfall-project-construc
    videoId: "DT7v5BdD8aA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-va-beach-embassy-construction
    videoId: "tgMHjf1Gynw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-sctv-beach-cam
    videoId: "HCGmwso1Afs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-52nd-ave-north-in-myrtle-beach
    videoId: "ssK_R9pa4yA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-camera-ao-vivo-florianopolis-barra-da
    videoId: "d4KShpjWoSQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-transito-ao-vivo-sao-jose-palhoca-sc
    videoId: "8_0jhVhVHGE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-camera-ao-vivo-ponte-hercilio-luz-flo
    videoId: "qlgxM5bSuEo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-praia-da-lagoinha-do-norte-florianopo
    videoId: "FCWoQ0z-2no",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // cl-vina-del-mar-en-vivo-camara-urbana-ch
    videoId: "bbZS2axaAY4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-barefoot-marina-live-camera
    videoId: "O-eSEvygfmI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-live-shinjuku-kabukicho-live-camera
    videoId: "EHkMjfMw7oU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // fr-cornwall-coast-webcams-tourharbour-be
    videoId: "9RuV9Cc-LSA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tr-european-webcam-journeya-panoramic-to
    videoId: "zmv6NPLg91U",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // au-armdale-roundabout-live
    videoId: "pPJKse_k50s",
    reason: "Embedding forbidden: playableInEmbed false on the watch page of its current stream LvttceVKhx0, 2026-11-02",
  },
  {
    // gb-4k-live-liverpoool-waterfront-ships-s
    videoId: "RoGOVLQyNak",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // be-st-marys-brewood
    videoId: "BorjZEkeoMM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // se-webbkamera-gothia-towers
    videoId: "0Ym70PbloLw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-le-saline-beach-sardinia-italy-li-2
    videoId: "zLVEP6BnkLM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ru-whole-st-petersburg-neva-palace-bridg
    videoId: "vYKyT7cA1eo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-salt-lake-sunset
    videoId: "ymaZB3c3DT4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-galveston-texas-live-beach-camera
    videoId: "PMVJd8xOUkE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-palazzo-beach-cam
    videoId: "is-84YizUMI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-lockeport-crescent-beach-centre-nova
    videoId: "Pwt0tZlt9eE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-baccaro-point-lighthouse-nova-scotia
    videoId: "5mYXkctDMsA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-burntcoat-head-nova-scotia
    videoId: "RdQ-e-iCkVI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-tangier-nova-scotia
    videoId: "LDcLOaAzu7U",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // mx-siberia-spring-edition-webcam-tour50
    videoId: "tHf8xbUNlTU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // br-porto-de-galinhas-ao-vivo-restaurante
    videoId: "Kr34rd9VWHE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-niseko-live-cam-24-7-weather-snow-win
    videoId: "NUjJ6TW2bf8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-live-tobu-nikko-station-live-camera
    videoId: "lJl2ANNVldA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-live-nikko-mountain-live-camera
    videoId: "oj855RN9Lmc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-116
    videoId: "DxaFMHEHjcI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-117
    videoId: "Xwsir4Mxgl8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // za-milnerton-aquatic-club-live-stream-li
    videoId: "7d1LqrPOrEo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-jacksonville-beach-fishing-pier-overv
    videoId: "EOTLy91Ycew",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-live-daily-camera-bratislava-slovakia
    videoId: "5bpb3hDNDFk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-poetto-beach-sardinia-italy-live-cam
    videoId: "Bbkpy6iBkdw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-cuxhaven-duhnen-live-webcam-an-der-re
    videoId: "lgsG6hnI0vc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // no-live-24-7-nature-cam-oulu-finland-sky
    videoId: "KFHWjpb_pM4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-live-kyoto-parking-in-front-of-kiyomi
    videoId: "jXBohrqXwvM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-live-lanildut
    videoId: "ygl-DeuTw2w",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // fr-live-sangatte-front-de-mer-vue-sur-la
    videoId: "tWJUgV37w2A",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // ca-oak-bay-marina-live-webcam
    videoId: "GZBQrB7u148",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-132
    videoId: "eHrqIefbe9Q",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-134
    videoId: "GdMXJRs5W7s",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-135
    videoId: "QcFZEmIvlF4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-137
    videoId: "Y7TJdO9bCgk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-139
    videoId: "eakQLJIHGLY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-140
    videoId: "N4fwnINSILY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-142
    videoId: "Id_8xmaiaJg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-143
    videoId: "YBmU_ZPhGzI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-145
    videoId: "5EYfLx6ts-Y",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-teton-view-buffalo-valley-in-moran-wy
    videoId: "Jqo7Z9QiOEQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-bendung-klegen
    videoId: "RAts0-cZgcM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-timur-stadion-sultan-agung-view
    videoId: "bx89acw8hIM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-klodran-view-barat
    videoId: "rMi2Hdwdizg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-paseban-view-barat-bantu
    videoId: "YWBY0AT6PW4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-korpri-view-selatan-bant
    videoId: "gBrkPr1NrOI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-korpri-view-barat-bantul
    videoId: "zUSvqFTPJt0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-jejeran-view-utara
    videoId: "-EtZZ4CxPdI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-jejeran-view-selatan
    videoId: "eXpr3T3-l28",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-bendung-merdika-niten
    videoId: "T4sn6U0fl9M",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // id-cctv-lapangan-paseban-bantul
    videoId: "qxdAW4zeO70",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-147
    videoId: "DV83dEKZ9Xk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-148
    videoId: "laCnzkkvNKM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-149
    videoId: "1FNmJClKTgY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-150
    videoId: "SfC1s4VzxSo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-151
    videoId: "UwQSYoCTMd0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-152
    videoId: "Blh-OB2JDR4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // es-benidorm-webcam-en-directo-camara-2-e
    videoId: "xTcpJvnaPK0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page of its current stream 6ot1RLTVfXU, 2026-11-02",
  },
  {
    // es-benidorm-live-webcam-live-levante-bea
    videoId: "GJHX8LAyJgc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // cn-worldwide-webcam-tourwatch-500-random
    videoId: "xeQJBMx2abw",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-5
    videoId: "vdw9G6r3fRg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-6
    videoId: "m32Gvjg-z78",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-from-refuge-mera-lo
    videoId: "2RyZEcnfMt4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-from-refuge-mer-2
    videoId: "8Odk1U-5Mcc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-live-streaming-7
    videoId: "1trXdt114Qc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-volcano-etna-live-eruption-skylineweb
    videoId: "VlLBc4RGjDQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-live-from-niscemi-sicily-landslide-mo
    videoId: "MFCLTWUiAYE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-siena-woke-up-snowy-live-from-piazza
    videoId: "cKJAYC13uQ8",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-today-for-al-jazeera-arabic-televisio
    videoId: "txPWQyhst5Q",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // us-live-pier-cam
    videoId: "pusmyjnxHhQ",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-176
    videoId: "UVAXYFi8EBs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-177
    videoId: "0AdHcmVg7lg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // gb-live-scottish-wildlife-cam-l-red-squi
    videoId: "9VKEDqEQaoI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // tr-24-7-live-cat-tv-no-ads-squirrel-and
    videoId: "UEyEs8AE1ss",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // de-24-7-live-cat-tv-no-ads-midsummer-nut
    videoId: "dJVVcv9-ndg",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // nz-titahi-bay-surf-cam-live
    videoId: "SCazwWP6e-I",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-179
    videoId: "WV9DtVXgwqE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-himeji-castle-live-camera
    videoId: "76M1BK8_chY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-1-26-08-26-19-10
    videoId: "jRKpe2jDC7c",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-185
    videoId: "JYui9tCoKcU",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-186
    videoId: "CD9efHFLFG0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-254
    videoId: "p9pzUJXx_LI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-254-2
    videoId: "518vEnzY5Zk",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-187
    videoId: "kkZNwqS5rtM",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-4-3
    videoId: "LWdZlPBMd3c",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-188
    videoId: "a83OzgE9IlI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-189
    videoId: "s_Xu_yqUlHA",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-190
    videoId: "_969tVoAygE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-191
    videoId: "VDVS0THX4DI",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-192
    videoId: "e4znEtkpDys",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-193
    videoId: "Q5AAi9KOjG0",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-194
    videoId: "b4hL6tDm-BE",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-195
    videoId: "7jbM9hSGVpc",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-354
    videoId: "eYfwoUOzL64",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-462
    videoId: "sg3EmgoHx9I",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-354-2
    videoId: "jyaRzGcZjc4",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // np-webcam-nepal-live-streaming-from-hote
    videoId: "pD00R1lKhIs",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // it-the-2025-conclave-live-skylinewebcams
    videoId: "RAocMGa06Bo",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // jp-rcn
    videoId: "OypZ7021k74",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // se-itconnect-uddevallakameran-live-web-c
    videoId: "Hv0WdxvG05k",
    reason: "Embedding forbidden: playableInEmbed false on the watch page, 2026-11-02",
  },
  {
    // no-sykkylvsfjorden-live
    videoId: "lineB9KXXPY",
    reason: "Embedding forbidden: playableInEmbed false on the watch page of its current stream 4lRe_Dg4sqU, 2026-11-02",
  },
  // ── Lottery-draw gambling streams that reuse a railcam feed. Not cameras: the stream title on the
  // watch page says what they are.
  {
    // id-live-draw-kentucky-oregon-railcam-ash
    videoId: "L5xWuXzN6Kg",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // id-live-draw-kentucky-oregon-railcam-2
    videoId: "kMC1FemT6NU",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // id-live-draw-kentucky-oregon-railcam-3
    videoId: "ML5q_cAj2sE",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // cn-live-draw-kentucky-oregon-railcam-ash
    videoId: "zHNblzTQVag",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // id-live-draw-kentucky-kingkong-railcam-a
    videoId: "gap0bnwpim0",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // id-live-draw-kentucky-kingkong-railc-2
    videoId: "200K1SOdiu8",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // nz-live-drawing-oregon-poipet-china-pano
    videoId: "9xWvhdanwNY",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // kr-live-draw-kentucky-poipet-orailcam-as
    videoId: "E-ak2WHmK0E",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // mo-live-draw-kentucky-kingkong-railcam-a
    videoId: "HYipY9TkUNE",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // mo-live-draw-kentucky-oregon-railcam-ash
    videoId: "hoRvlJ2e0CU",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // th-live-draw-oregon-california-cameras-a
    videoId: "eKVut3dp1_s",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  {
    // hk-live-draw-kentucky-kingkong-railcam-a
    videoId: "5ANdi_pay8w",
    reason: "Lottery-draw gambling stream, not a camera: title on the watch page, 2026-11-02",
  },
  // ── Finished live streams that cannot be played, not even as a recording (the recording was
  //    removed, or it is members-only). The live-state sweep had each one offline; the owner decided
  //    on 2026-11-02 to drop what cannot be played. rio-christ-redeemer and yosemite are here too: their
  //    stream is gone and their channels carry no replacement.
  {
    // times-square
    videoId: "JQ_jwk_7OVE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // wrigley-field
    videoId: "m38n8jVPUJ8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // wildwood
    videoId: "cK71xhMRtds",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // spirit-lake
    videoId: "XIe9vQkAd7Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream zv67_HAFTOA, 2026-11-02",
  },
  {
    // chobe-waterhole
    videoId: "iqdRLSdSjWI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 6VMVEWTJHh4, 2026-11-02",
  },
  {
    // popocatepetl
    videoId: "z1DIktum4zo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // basilica-guadalupe
    videoId: "NmHkMgNwawg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sydney-harbour
    videoId: "VukSUsIGPGQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream YCuN0j_cIJk, 2026-11-02",
  },
  {
    // buenos-aires-uade
    videoId: "NfsyRx50gAI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // busan-haeundae
    videoId: "LGuktGeHQxI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream x5paecMrjA8, 2026-11-02",
  },
  {
    // jeju-seongsan
    videoId: "NCzm0l_ZqzU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream pz7rF65cJOA, 2026-11-02",
  },
  {
    // mount-etna
    videoId: "t4vlFU-ypIw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sagvar-stork
    videoId: "AO5I5nNbbnE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // rio-christ-redeemer
    videoId: "PhYE9txaPlo",
    reason: "No playable stream: playabilityStatus ERROR \"This video is unavailable\" on the watch page, and no stream on its channel, 2026-11-02",
  },
  {
    // gujo-hachiman
    videoId: "L0C80aVxJaU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // itaura-village
    videoId: "ss7rSdSTrwc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream jNJxQw8FwYw, 2026-11-02",
  },
  {
    // beppu-bay
    videoId: "hdVgObFgBV8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // yosemite
    videoId: "AvJl1Vbsg38",
    reason: "No playable stream: playabilityStatus LOGIN_REQUIRED \"Private video\" on the watch page, and no stream on its channel, 2026-11-02",
  },
  {
    // akureyri
    videoId: "GXTycxKz_FQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-victoria-australia-3
    videoId: "DbLMSFvB2Og",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // bl-col-de-la-tourmente-saint-barth-sceni
    videoId: "15pVqwQb7A0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-cabo-frio-beach-cameras-brazil
    videoId: "HsfII35xV4g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-florianopolis-canto-da-lagoa-brazil
    videoId: "1ffJojfUyRA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-florianopolis-lagoa-da-conceicao-mira
    videoId: "egXyN_SwY-E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ilha-porchat
    videoId: "RT4JhqVP8AY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-pereque-acu-brazil
    videoId: "5mV2qwFTdzA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-santos-surf-conditions-beach-brazil
    videoId: "jychMSrX9w0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream PvpVD2ntBU8, 2026-11-02",
  },
  {
    // ca-banff-canada
    videoId: "m1F2ggd0hxA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-banff-sunshine-village-canada
    videoId: "OJzDoKXXoGw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-kelowna-canada
    videoId: "zkTaY9OQM2A",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-downtown-canada
    videoId: "fDpNeUvss30",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-tofino-canada
    videoId: "ABI1FZmrwbQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-trimburg-medieval-castle-ruins
    videoId: "M1TS9GEIGoI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fi-patoniva-river-oulanka-national-park
    videoId: "L7F3XGPA6vo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream aKjX6v-vFMg, 2026-11-02",
  },
  {
    // fr-gambetta-square-france
    videoId: "4i7ioN8wS20",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-machynlleth-uk
    videoId: "GMJzMSOk-V0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream AVot1AJoL8c, 2026-11-02",
  },
  {
    // gr-gulf-of-ixia
    videoId: "h8ZGGzCcL5g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ie-dublin-city-centre-ireland
    videoId: "AdUw5RdyZxI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-ashdod-israel
    videoId: "mSONhnPsSzE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-ashdod-hakshatot-beach-israel
    videoId: "GYdEdmjWTBA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-community-center-israel
    videoId: "hWwLAaO0Vyo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 7vjpHM3uYHs, 2026-11-02",
  },
  {
    // il-jordan-river
    videoId: "NLTRWDL7yfM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // is-north-reykjanes
    videoId: "yUZTszmpAJE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-assabu
    videoId: "kJLL6uXWVaI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-chiba
    videoId: "vaifJWjqu0k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-fuefuki-japan
    videoId: "_9SONpu3HFQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream xcnuSHi18jY, 2026-11-02",
  },
  {
    // jp-hiroshima-japan
    videoId: "we2FaU_VOQI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream zjvrfeVODFY, 2026-11-02",
  },
  {
    // jp-ishigaki
    videoId: "H6pbOinBue8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream b6tb6fT3M-s, 2026-11-02",
  },
  {
    // jp-kagoshima-sakurajima-landmark-kts-jap
    videoId: "w0U4AJozxek",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-kamakura-japan
    videoId: "ZeI0dnHjX6w",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-lake-biwa-japan
    videoId: "bZHusX-v7NI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream sM2IjSRBwnY, 2026-11-02",
  },
  {
    // jp-mitoyo
    videoId: "u6e_v5ntnyw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-3
    videoId: "nU41kpfKLJM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-nantan
    videoId: "RC4GOX88dxo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-nikko-japan
    videoId: "7oRZg_BHPXg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-ochanomizu-station-tokyo
    videoId: "2AFMu3Yiw68",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream rx9veGIWmMc, 2026-11-02",
  },
  {
    // jp-okinawa-japan
    videoId: "fPKygdd-p2Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream Pv1nB-zgoKs, 2026-11-02",
  },
  {
    // jp-panorama-of-yubatake
    videoId: "B_Sc1v1qR-g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-sapporo-japan
    videoId: "yM6M8J-BZ1U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream b2Ve2fudoHM, 2026-11-02",
  },
  {
    // jp-sumida-river-in-tokyo
    videoId: "QotB60C4FYc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-livecamera-2
    videoId: "GrEEoEmmrKs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ke-laikipia
    videoId: "KyQAB-TKOVA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-constitution-square-in-amealco-de-bon
    videoId: "TDWnJ3dXkMY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 8wEVZYgzEh4, 2026-11-02",
  },
  {
    // mx-don-vasco-square-mexico
    videoId: "oh3DAj61Tlk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-plaza-garibaldi-mexico
    videoId: "o-qwlPxee2I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream KBU8GXi-XMI, 2026-11-02",
  },
  {
    // ph-maria-s-cam-9-rosemary-street-agdao-d
    videoId: "lsLkrwlimbE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-gatlinburg-skypark-live-webcam
    videoId: "teGLziUvDkI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-hermosa-beach-good-stuff-strand-cam-l
    videoId: "Jwna-J3L0NM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-miami-live-webcam-biscayne-bay-north
    videoId: "5YCajRjvWCg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-sbkp-live-aeroporto-internacional-de
    videoId: "XEuLZHhSv_0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // ca-pab-live-harbour-cam-24-7-tilley-cam
    videoId: "WaLlhxa9vj4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream K2V_xSCvdLg, 2026-11-02",
  },
  {
    // de-berlin-live-webcam-24-7-germany-berli
    videoId: "_pJAwwlzM7I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-live-lanzarote-airport-webcam-24-7
    videoId: "hEpaqvnButc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-saint-germain-sur-ay-en-direct-webcam
    videoId: "ZlMwj15RHnU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-le-lavandou-plage-de-la-fosset
    videoId: "ddusGpSgUfY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-merquel
    videoId: "wpTiVBUlAXw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-villelaure
    videoId: "RvqT-vEwNd4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-fort-mahon-plage-webcam-en-direct-4k
    videoId: "dLLHgCHpY6E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-weston-super-mare-beach-live-the-gran
    videoId: "VXnzFUwJtYM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 927bUBTR7v0, 2026-11-02",
  },
  {
    // gb-ventnor-camera-ventnor-esplanade-isle
    videoId: "CmsVx-EJU5A",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-itchen-cam-by-southampton-sailing-clu
    videoId: "6Qqvy20iH7w",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream hKkNY1L0Qq4, 2026-11-02",
  },
  {
    // hk-live-hong-kong-live-4k
    videoId: "VAK8DkBgjMs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-trento-live-cam-centro-citta-piazza-d
    videoId: "PzJVpZ9lp7Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-livecam
    videoId: "mAyyCUiz48g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream g_WNkDJmwM0, 2026-11-02",
  },
  {
    // no-hafjell-live
    videoId: "BADzwd9b0RU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-sogndal-live
    videoId: "6Usok3aloeU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-troms-live
    videoId: "jpCcV1-Sfnw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-siechnice-kamera-online-siechnice-ryn
    videoId: "SyQ4eNx0kOQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sa-makkah-live-hd-mecca-live-makkah-live
    videoId: "bNY8a2BB5Gc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sa-madina-live-madinah-live-tv-online-ma
    videoId: "rHWSRMcGGBQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sa-madina-live-24-7-masjid-al-nabawi-liv
    videoId: "9rmHzOb5ECs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-watch-live-from-the-internationa
    videoId: "nczOMPJGGAQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-boston-ma-live-cam-boston-common-at-b
    videoId: "2lRbwu4TVtA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-2026-08-16-ober-gatlinburg-sky-villag
    videoId: "xXoZGQcbkFg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-range-sundance-wy-downtown
    videoId: "Iv19IkyodjQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-rail-cam-fullerton-california-bn
    videoId: "DgGeCeD_HBU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kansas-city-missouri-usa-live-tra-2
    videoId: "xR3kxBG_v7Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-bryant-park-webcam
    videoId: "Zmmskdpi4QE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-rail-cam-berea-ohio-csx-ns
    videoId: "NKLtXovsWnc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-2026-08-11-ober-gatlinburg-sky-villag
    videoId: "a0a9pmFL4B4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-campus-point-surf-cam
    videoId: "JE3EvN55hfE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-rail-cam-waldwick-nj-njt-ns-rail
    videoId: "a_IsaWR8fBE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-rail-cam-northwood-ohio-vickers
    videoId: "VxijdxNKA9M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream YZ7brXsIFqs, 2026-11-02",
  },
  {
    // us-virginia-beach-fishing-pier-live-cam
    videoId: "Zx_7xF2Sbxo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-maui-beach-cam-napili-kai-beach
    videoId: "gX7c8hzR17Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-destin-beach-cam-pompano-joe-s-m
    videoId: "4mFybDorWPk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-june-patrol
    videoId: "UAYN7lVvVfE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-moody-gardens-pyramid-cam-live-galves
    videoId: "yfI8jKgOnsY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-hellgate-ospreys-nest-cam-cornell-lab
    videoId: "-qvYCbvbeN8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-marine-city-hometown-cam-marine-city
    videoId: "GFzyA9BkHW4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-24-7-msp-webcam-minneapolis-st-paul-a
    videoId: "wWm-kbryDDQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-rail-cam-shenandoah-junction-wes
    videoId: "QhT13bsgL-U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // al-vlore-bay-albania-live-4k-lungomare-b
    videoId: "jLun451s8-g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-buenos-aires-argentina-en-vivo
    videoId: "AksMJTfw-vk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-buenos-aires-argentina-en-vivo-24-7-l
    videoId: "urwuIKd8eEo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-praca-central-de-serra-branca-pb-ao-v
    videoId: "_cmlw35vbfQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-aeroporto-internacional-de-ponta-pora
    videoId: "pqEwczD6xlc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-balneario-camboriu-ao-vivo
    videoId: "TC_nOU7xAjw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-trem-ao-vivo-boa-vista-velha-campinas
    videoId: "5iPdHvpnydQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream hhrvXTCUvW8, 2026-11-02",
  },
  {
    // br-praia-de-candeias-pe-camera-ao-vivo-l
    videoId: "W_MfFb3qKN4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-vitoria-de-santo-antao-pe-camera-ao-v
    videoId: "GQDmb_qTrAM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream Z5UagggcYpo, 2026-11-02",
  },
  {
    // br-balneario-camboriu-ao-vivo-camera-do
    videoId: "UPh63IjFEp0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream GW-WBInJWJw, 2026-11-02",
  },
  {
    // br-gramado-ao-vivo
    videoId: "qoAd9U-8Cic",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-9-vista-da-ers-130
    videoId: "HXOlbMCjXHw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-sbsp-live-3-aeroporto-de-sao-paulo-co
    videoId: "b8g-NPuIZI0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // br-praca-santa-teresinha-em-cristais-mac
    videoId: "iUTBdNIqLjQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream BdQ3nEYq3LY, 2026-11-02",
  },
  {
    // br-travessia-ferrea-km-415-em-tres-front
    videoId: "hE4zt3W7EhY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-trem-ao-vivo-hortolandia-sp-brasil
    videoId: "MrExaCVDuOA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-trem-ao-vivo-japeri-rj-brasil
    videoId: "2Olg8sll0VU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-praia-de-porto-de-galinhas-ao-vivo-we
    videoId: "zKsgtmgGHt4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-sbsp-live-2-aeroporto-de-sao-paulo-co
    videoId: "ZJH-a0CD0CQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // br-sbgr-10l-live-aeroporto-internacional
    videoId: "lnD4BOFpBss",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // br-sbsp-live-1-aeroporto-de-sao-paulo-co
    videoId: "npWPVCz8dHk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // br-sbgr-10r-live-aeroporto-internacional
    videoId: "R6rzU6xTP74",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // br-sbgr-28-live-aeroporto-internacional
    videoId: "yXrjdS-Pmkk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // ca-river-otter-cam
    videoId: "C2iP-oVYQV4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-kicking-horse-base-plaza-live-cam
    videoId: "qW1FFVhFFi0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-sundial-hotel-live-stream
    videoId: "VsRD_BG_7us",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // cn-live-inside-china-s-mega-wholesale-ma
    videoId: "_B7aqTDfPC4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // cu-cuba-today-walking-tours-24-7-real-st
    videoId: "Sp_lVhhGPUY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 2TxBUZ6oG1U, 2026-11-02",
  },
  {
    // de-dicker-turm-turmstra-e-von-der-evgl-s
    videoId: "xPtzJdHTO3Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-live-rhein-rees
    videoId: "8XOrJj1hV40",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-live-fahre-frisia-iii-webcam-norddeic
    videoId: "mn5GITwfwfE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-solar-eclipse-on-valencia-beach-2026
    videoId: "7k3bAy4fmIY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-live-webcam-playa-cala-agulla-capdepe
    videoId: "bu-e1EuoxMs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream t0wN-5gU2vs, 2026-11-02",
  },
  {
    // es-aguas-de-cadiz-fuente-de-la-plaza-de
    videoId: "0dKNLFFcHFU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-valencia-walking-tour-4k-live-city-of
    videoId: "ldfVQzM6TJo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-platja-d-aro-center-live
    videoId: "LSPN10FbR3U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-salinas-de-torrevieja-webcam-en-direc
    videoId: "p3m2po8KcAg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-live-europe-in-4k-24-7-scenic-views-o
    videoId: "ckq-AO8PMjg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-live-les-sables-d-olonne
    videoId: "xjlaExcaEt0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-port-de-morlaix
    videoId: "SZxkRLHwoYU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-poole-harbour-osprey-nest-camera-land
    videoId: "pLOUQ0xFgyw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-eastbourne-sea-camera
    videoId: "B-GyM-_i-tw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-lulworth-cove-live-webcam-4k-jurassic
    videoId: "mGlsYdJk5r8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-live-cam-kidderminster-station-concou
    videoId: "I0o6HK6wV_Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-willow-lawn-station-ruislip-lido-rail
    videoId: "RrzGCllm11Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-24-7-live-cam-stornoway-harbour-ferry
    videoId: "kxOHob7q8Vg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-lynton-barnstaple-railway-woody-bay-c
    videoId: "KOuepc4oYNU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-lynton-barnstaple-railway-woody-b-2
    videoId: "yukUL8ceX60",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-lynton-barnstaple-railway-killington
    videoId: "pKChf62uwIQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-loch-doon-ospreys
    videoId: "a7Aocq3fybM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-poole-harbour-osprey-nest-camera-aeri
    videoId: "_e2Uu-qCM2E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-epping-signal-cabin-epping-essex-uk-l
    videoId: "CCgTynddlJw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-blenheim-webcam-dawlish-live-cam-spon
    videoId: "8g_AgbaTkmw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-blenheim-webcam-2-dawlish-4k-webcam-s
    videoId: "0e-SOUXkie8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-live-cam-kidderminster-platform-on-th
    videoId: "SvehpS_lf9k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-seaton-beach-live-webcam-spot-on-kios
    videoId: "JHcdPeDozGI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-weymouth-mainline-railcam-24-7-train
    videoId: "VcrN2Z4peDk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-cheddar-reservoir-uk-live-webcam-ched
    videoId: "qPm8lYRCKWk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ie-live-webcam-cabra-dublin-ireland-faci
    videoId: "48dTF22m3eE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ie-live-webcam-cabra-road-dublin-ireland
    videoId: "JQub4c40doo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ie-rathmines-dublin-live-webcam-live-str
    videoId: "cF2wcAUmWRg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-24-7-multiple-cameras-in-israel-iran
    videoId: "Tu6hjlUq2Bs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-pardes-institute-of-jewish-studies-ne
    videoId: "VxOpjO2zIPM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-punta-secca-live-chiesa-s-g-battista
    videoId: "lPXl-URlTb8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-webcam-piazza-europa
    videoId: "_aNnOHJMsME",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-gemona-del-friuli-live-webcam
    videoId: "pRvHI1KcfYs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream WP8SIjbsxwg, 2026-11-02",
  },
  {
    // jm-santa-cruz-st-elizabeth-jamaica-live
    videoId: "TYL1W5Gfvjg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream wJsOXySDNos, 2026-11-02",
  },
  {
    // jm-barbican-st-andrew-live-24-7-kingston
    videoId: "Pb7vAzXbAlY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-sukiyabashi-crossing-in-ginza-to
    videoId: "1Xm5bjdI5hU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-night-drive
    videoId: "o-ZcIJVlSM4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream pQaz70OJHBc, 2026-11-02",
  },
  {
    // jp-tokyo-bay-ptz-live-cam-24-7-chat-cont
    videoId: "DLsYMox4rCY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-odaiba-live-camera
    videoId: "n3B8fp-Henc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-tokyo-international-airport-hane
    videoId: "3w4zEyFamuA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // lv-streets-in-riga-live-stream
    videoId: "eMd2VeeJ8SI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-aguila-calzada-hieraaetus-pennatus-di
    videoId: "LssZis7XjEA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-acapulco-guerrero-en-vivo-vista-panor
    videoId: "6X_1iSXU-lc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 8o1j9vIW7tc, 2026-11-02",
  },
  {
    // mx-tequisquiapan-queretaro-pueblo-magico
    videoId: "LS099g1c8o0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-vista-panoramica-del-bosque-de-chapul
    videoId: "Uu6ICUhgeU0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream ciBL0DYBYpU, 2026-11-02",
  },
  {
    // mx-acapulco-guerrero-en-vivo-vista-playa
    videoId: "sFVDzXOpx0o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-puerto-vallarta-en-vivo-desde-grand-p
    videoId: "V6Co4YdL25Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-hermosillo-sonora-en-vivo-vista-plaza
    videoId: "2T8A7ic2rTs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream csSJXjfRXmM, 2026-11-02",
  },
  {
    // mx-vista-en-vivo-de-plaza-cuitlahuac-izt
    videoId: "wLHIxbdhgI0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 40W2Q6Hf0xY, 2026-11-02",
  },
  {
    // mx-bernal-queretaro-en-vivo-vista-plaza
    videoId: "5RjUirCphhY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-puerto-vallarta-jalisco-en-vivo-visto
    videoId: "5boZ1Vw95OU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-vista-de-la-laguna-de-nichupte-desde
    videoId: "albRLCpp2b8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-vista-de-cancun-en-vivo-desde-breathl
    videoId: "QhiFymyJG5c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream Kp9gH_N7wdE, 2026-11-02",
  },
  {
    // mx-pachuca-hidalgo-en-vivo-vista-de-plaz
    videoId: "Nqy5YyxpUFI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-live-cam-live-music-puente-internacio
    videoId: "j0sTBU2vk-Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream IcSuaDl-Nyc, 2026-11-02",
  },
  {
    // nl-amsterdamse-poort-live-stream-klein-b
    videoId: "DvsbMHSbGyU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-fyr-til-fyr-live
    videoId: "TPBIHbObzC0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-oppdal-skisenter-live
    videoId: "QTMXSlNd5k4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-the-best-of-norway-s-railway-spring-a
    videoId: "tAWFO8_O_7M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-olongapo-city-cctv-live-stream-three
    videoId: "r88YptGTjq8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-olongapo-city-cctv-live-stream-one
    videoId: "W6Ugwcu3A00",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pe-en-vivo-plaza-de-armas-de-huaraz-audi
    videoId: "WCpy039qQiE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-olongapo-city-cctv-live-stream-two
    videoId: "qGJHpJKuUqs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-park-muzyczny-kudowa-zdroj
    videoId: "70QjeKRWTz0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-kamera-uam-tv-collegium-minus-uam-poz
    videoId: "WuEAKQYvyKM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pr-puerto-rico-sky-cam-com
    videoId: "cigX_HsA3to",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sa-madina-live-tv-masjid-nabawi-la-madin
    videoId: "yGKvqx3Nikc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sg-live-woodlands-cam
    videoId: "yx6OuNZa2xk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // th-pattaya-beach-road-cam-links-to-air-q
    videoId: "qH4rM7SIPvQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tr-bozdogan-canl-yay-n-genel-gorunum
    videoId: "NEa9teeeMBk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-du-chuan-tou-tamsui
    videoId: "8rFVhLx8ORE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-skid-row-cam-1-los-angeles-ca
    videoId: "FLIMx-V714k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kensington-cam4-phila-pa
    videoId: "Ja-aqt-rNjQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-miami-skyline-live-macarthur-causeway
    videoId: "dv9wlK0f9XE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-mori-point-pacifica-ca-4k-live
    videoId: "q0Z7tv_7n-0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lutheran-church-of-hope-construction
    videoId: "F9m-uOAx5RI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-hawaii-24-7-ambient-music-drone-film
    videoId: "u6wVXT7XTPU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-bora-bora-4k-drone-video-blue-lagoon
    videoId: "bVr_e3mqpt8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-24-7-st-louis-lambert-internatio
    videoId: "N38KxWHm2T0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-georgia-aquarium-cam-ocean-voyag
    videoId: "8WTFWvePutc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-times-square-1540-broadway-view-live
    videoId: "o3Zy7MxvXE4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-bald-eagle-live-cam-2-traverse-city-m
    videoId: "Va7LIyQkOBI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-traverse-city-mi-bald-eagle-nest-live
    videoId: "OkzYFlOrZEo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-okaloosa-island-pier-camera
    videoId: "f56BJHhGkUI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-gebhardt-insurance-traffic-cam-round
    videoId: "_XBMMTQVj68",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-his-place-resort-live-river-cam
    videoId: "jw1Er6LyqT0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-napili-kai-beach-resort-live-cam-maui
    videoId: "mmzT-lCSpHg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-hawaii-live-stream-4k-ala-moana-magic
    videoId: "1V9nWQHwIwQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-24-7-londonderry-nh-traffic-cam
    videoId: "Vi0JiFqB5dc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-nashville-live-cam-lower-broadwa
    videoId: "7lD-OKqUuIA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-royal-sonesta-kauai-live-stream-poipu
    videoId: "M6kN1wlNSk4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-4k-south-beach-miami-beach-24-7
    videoId: "jwpfPq8TU8c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-western-harbor-cam
    videoId: "mpMdJJjw59E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-wailea-beach-resort-live-maui-hawaii
    videoId: "cWRSJ3EGuuo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-friends-of-felines-rescue-center-ffrc
    videoId: "KFLUFVUIGsM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-great-western-building-systems-beam-f
    videoId: "HckYnpokxXU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kensington-cam-6-philadelphia-pa
    videoId: "1Clsrhhl944",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-cedar-corner-roundabout-cam-at-cedar
    videoId: "IeXtMySCZkI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-miami-skyline-live-cam-macarthur-caus
    videoId: "M_JmSFLdJUE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-detroit-river-live-cam-from-the-dossi
    videoId: "VA5zde5zPGk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-view-of-lazelle-st-in-sturgis-sd
    videoId: "iY8G7URAbgI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-pacifica-pier-closeup-pacifica-ca-4k
    videoId: "16hHfZzf8-I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-24-7-trains-at-union-station-rai
    videoId: "lZesBuitv9s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-doubletree-by-hilton-grand-hotel
    videoId: "4UzQd1dVPlo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-city-of-southfield-live-cam
    videoId: "mdmLYHK6meA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-aster-construction
    videoId: "lbLNH2gKXDE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-miami-traffic
    videoId: "wq9x1ZMqdEA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-buffalo-bills-stadium-weather-cam
    videoId: "4aONiVQLttc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kensington-cam2-philadelphia-pa
    videoId: "EVIhbrLvUO4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-tiger-cam-of-animal-adventure-bao-min
    videoId: "AtIzdc3un5s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-ponce-inlet-boat-ramp-parking-lot-cam
    videoId: "r5Y9tlij_TQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-downtown-woodward-oklahoma-live-camer
    videoId: "6oCfzMLvmMI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 7lwUN1E_uYk, 2026-11-02",
  },
  {
    // us-live-view-of-main-street-from-tower-i
    videoId: "B7TPT-LSeAQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-cat-dog-tv-bird-feeder-cardinals
    videoId: "c2F2Q5MukAw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-sfo-plane-spotting-real-time-air
    videoId: "wdFQvKAlyA4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-port-miami-cruise-ship-terminals-bisc
    videoId: "WpBTavYa7Fc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-dune-allen-beach-florida-vue-on-30a
    videoId: "xNZBPxx8ykg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-right-now-global-webcams-24-7-se
    videoId: "UVVGop6GGv8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-okaloosa-island-beach-cam-crab-t
    videoId: "n1k9iDluHHA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-hubble-shocking-new-discovery-in-spac
    videoId: "6wg4fd8FjVQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-planet-earth-view-from-space
    videoId: "kSGWs_I7mMI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-trinidad-harbor-webcam-live-stream
    videoId: "oAqv6M0JESY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lawai-beach-resort-live-cam
    videoId: "3ATYHKN2hIg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-oceanside-ca-harbor-live
    videoId: "isQSAV9rJvQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-beautiful-destin-beach-cam-emera
    videoId: "heFvIjq0O-Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-ac-boardwalk-live
    videoId: "xdR31xv7il0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-pineapple-willy-s-beach-cam
    videoId: "-rSXsJuGQ3M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-worcester-ma-railcam-railside-li
    videoId: "b70NCE21Yws",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-east-greenwich-ri-railcam-railsi
    videoId: "sFCofJMI4ew",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-port-huron-live-cam-showing-shipping
    videoId: "dqrwY6i-Zz4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kensington-cam3-philadelphia-pa
    videoId: "cWd_niy8Rz8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-24-7-sharky-s-waterfront-live-cam-at
    videoId: "Dizx0Z2eDv8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-vision-2025-construction
    videoId: "Ngy39bGXjqs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-islander-resort
    videoId: "xmRR7LMDoXg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-anacapa-ocean-channel-islands-nationa
    videoId: "OAJF1Ie1m_Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-snow-king-mountain-lifts-seejh-com
    videoId: "g4NgJXbRrBk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-tobacco-river-dam-michigan-24-7-hd-li
    videoId: "Pc-4Pk-wbeM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-walking-live-4k
    videoId: "Le_-gbv_R18",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-mallory-square-4k-key-west
    videoId: "f9pMVLoJfyE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-tehachapi-live-train-cams-at-west-cab
    videoId: "Bzd0z0YqTEw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-tehachapi-live-train-cams-at-the-teha
    videoId: "pQHaVrBeZGc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-tehachapi-live-train-cams-at-giumarra
    videoId: "K0dU05muXdE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-seaside-heights-beach-cam-and-surf-re
    videoId: "LJ5dbOYQw5A",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lga-airport-live-24-7-laguardia-new-y
    videoId: "OUBslrCqREs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-big-boy-in-fostoria-ohio-live-from-ou
    videoId: "Jil1EgWZndY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-from-the-howell-wye-bi-tower-atl
    videoId: "QRj1aojRv7o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-tehachapi-live-train-cams-at-the-2
    videoId: "yVfFVNmE0LE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-miami-river-camera
    videoId: "7wHgYc_kN98",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-pacifica-pier-and-beach-pacifica-ca-4
    videoId: "yLJCR5TlHoI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-stream-public-square-watertown-n
    videoId: "vaDjY-5Ymxc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream P5yjzzNBbhU, 2026-11-02",
  },
  {
    // us-ih-35-wonder-world-drive
    videoId: "4Uwmss-8J5I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-village-of-tilton-5th-street
    videoId: "czcqVgHG3y0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-new-york-city-axis-q1808-le
    videoId: "YBC4Hjhhs8k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-crane-point-museum-nature-center
    videoId: "b1wN6Ea49oc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-crane-point-museum-nature-ce-2
    videoId: "PhJxYJ9c0-s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-live-cat-tien-biodiversity-monitor-24
    videoId: "rxfhYLouk3I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-truong-ly-tu-trong-huong-ks-song-han
    videoId: "NeJGBQAY-bE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-truong-tieu-hoc-ly-tu-trong-ptz
    videoId: "1EamsYw_Xyo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-camaras-ushuaia
    videoId: "M21hM0Epa6M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-camaras-tolhuin
    videoId: "9nAmQgXzC2Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-camaras-rio-grande
    videoId: "gRDLM93KZUE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ae-4k-dubai-travel-in-4k-burj-khalifa-lu
    videoId: "WZsL0Gx3-Go",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-live-ao-vivo-porto-alegre-poa-guaiba
    videoId: "yCeQueusZxs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-campo-grande-sbcg-tapio-2026
    videoId: "FwbmvZ6vzrQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-da-praia-de-xangri-la-litoral
    videoId: "D5VLbXaqZfg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-camera-ao-vivo-maracana-caicara-praia
    videoId: "FL_YG6UBLdQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream BTalF3ZGU6A, 2026-11-02",
  },
  {
    // br-ao-vivo-reconstrucao-da-ponte-baixa-p
    videoId: "P3OWz_BML4M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-avenida-pedro-zapelini-tubara
    videoId: "mZlT_81Gs7c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ch-surveillancemap-live-matterhorn-zerma
    videoId: "JcHYcrO4PRE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // cl-ledrium-tobalaba-mut-av-providencia-s
    videoId: "g_yDUL2GjSI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // cn-live-giant-panda-cam-wolong-grove-exp
    videoId: "UKkc40WQm0c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-livecam-gedeonseck-boppard-filsen-und
    videoId: "zLlwPU3Xtrk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-live-abbruch-und-einhub-der-eisenbahn
    videoId: "UG0hj4STDCI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-live-ruckbau-haltestellendach-ehinger
    videoId: "n4fZV5Gwws0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-solebad-werne
    videoId: "NK98sgeJiXE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-spotlight-baltic-sea-24-7-live-webcam
    videoId: "BnLcCs_NYUM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-webcam-naturaleza-en-vivo-en-la-l-2
    videoId: "3tvoOi1_uPk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-aves-del-humedal-directo-camara-6-pal
    videoId: "ErmR39LAt14",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-directo-parque-nacional-de-donana-mar
    videoId: "RHeNpnJBeHI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-directo-laguna-dulce-campillos-camara
    videoId: "zY085rJhZsM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-nido-de-aguila-pescadora-p-n-archipie
    videoId: "y2ahRNojjGw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fi-super-snow-storm-city-walk-24-7-winte
    videoId: "9h42Y9gHqnI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fo-surveillancemap-live-vagur-south-west
    videoId: "otu_D2_TiLM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fo-surveillancemap-live-vagur-south-east
    videoId: "EHaOI3U5M_s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-24-08-26-stornoway-harbour-ferry-crui
    videoId: "jEkkDmG7NGo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-wsr-crowcombe-stn-cam-1-west-somerset
    videoId: "ptn6Fnc5u08",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-domar-cctv-4k-camera-live-stream-with
    videoId: "7Nwi6hcL2qM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-wsr-crowcombe-cam2
    videoId: "x-OipExeKQM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-ssen-alyth-substation-osprey-nest-cam
    videoId: "6IJOKv3flwc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-dorset-live-hobby-nest-camera-2026-07
    videoId: "CUZpNsuflzQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-wsr-bishops-lydeard-west-somerset-rai
    videoId: "hEa16bHxHMM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-otc-watersports-portland-harbour-uk-l
    videoId: "YIo_pnH0LzY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-ncd-new-car-park-webcam
    videoId: "G3tppzAMmh4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-11-minutes-ago-the-heart-of-a-ukraini
    videoId: "XpwMfiT3OYM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-view-kamera-cctv-perempatan-jemb
    videoId: "U4XrKZJq428",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-view-kamera-cctv-pertigaan-barat
    videoId: "LhKIazR69xQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-view-kamera-cctv-perempatan-masj
    videoId: "UkKx7xXT2l4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-simpang-tugu-teratai-kabupa
    videoId: "AkzsS0CNk5A",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-simpang-samsat-kabupaten-ke
    videoId: "fIaykbCTcCE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-lalu-lintas-baranangsiang-b
    videoId: "9GoI5vd8eGo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-cctv-blabak
    videoId: "8zi8Y1lUmrQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream Lu_Vl_SUxcw, 2026-11-02",
  },
  {
    // id-cctv-blondo
    videoId: "Xz8-7IiJF7U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-cctv-depan-pasar-bantul
    videoId: "w466KdN0Uy8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-cctv-simpang-paseban-view-selatan-ban
    videoId: "yLVnvT3hWAk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-cctv-bundaran-srandakan-bantul
    videoId: "2M5pleBbOnk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-jalur-puncak-agrowisata-gun
    videoId: "IZsy24Kp1Is",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-insane-railway-crossing-traffic-train
    videoId: "mXEL2hZuCZ0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-gapura-desa-sidomulyo-kec-w
    videoId: "MaZG_yNimw8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-jalur-puncak-agrowisata-2
    videoId: "YSmclVZTkAs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-cctv-kujon
    videoId: "_nwNaAz22J4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-now-24-7-semeru-volcano-watch-mu
    videoId: "EYYgrzyqgZM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream Hch0OAJKcjQ, 2026-11-02",
  },
  {
    // id-cctv-sayangan
    videoId: "eBH6o7E417k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-2-minutes-ago-a-us-aircraft-carrier-c
    videoId: "EvhuOI0UkF8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-simpang-gadog-pantauan-lalu
    videoId: "JJ3MWNYVCU4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-cctv-salaman
    videoId: "yEZ1YS6EhS4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-simpang-borobudur-plaza-v-u
    videoId: "FCuHGm6VMHs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-live-middle-east-real-time-cameras-fr
    videoId: "AkqGOcpDvZU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // is-surveillancemap-live-djupivogur-harbo
    videoId: "eAm6iAB1pQQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-morning-coffee-italian-music-scenic-c
    videoId: "hOqrLWcs0iA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-morning-coffee-in-italy-scenic-coasta
    videoId: "DqTZSC0IonU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-iis-leonardo-da-vinci-civitanova-marc
    videoId: "hFzbr0a4uq0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-24-tokyo-skytree-live
    videoId: "HNpKxfWv0pk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-zuishinin-temple-kyoto-live-came
    videoId: "5Ica9fIP_Ng",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-tokyo-japan-train-live-camera
    videoId: "ACcyj4wp7lk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-mt-fuji-japan-sbs-news6
    videoId: "e5fTf-gywY0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-4k-sunset-live-cam-sea-of-japan-nishi
    videoId: "WWkM7VPsWOQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-kagoshima-airport-by-kyt-live
    videoId: "pJC3BThpdio",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-osaka-nipponbashi-livecamera
    videoId: "Ttbg4hvcXec",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-jr-nakajo-station-live-camera-live-fh
    videoId: "-Sqr6ZAJWZE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-ir-expo2025-osaka-kansai-osaka-b
    videoId: "fufhSmDdbxA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream GgE4oRYDo4Q, 2026-11-02",
  },
  {
    // jp-beach-and-waves-2026
    videoId: "FMf4XEP2ZY4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-mount-hakusan-live-camera-10-13-mro
    videoId: "Getnw5E1ue8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-osaka-dotonbori
    videoId: "czJhGgFsp38",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-the-sea-of-japan-live-camera
    videoId: "HoeuEIpyfNU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-camera-at-aomori-station
    videoId: "qMs_uynkM54",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-itm-sky-cam-osaka-airport-live-cam
    videoId: "cRkzDz47vns",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-yubara-onsen-town-live-camera-ja
    videoId: "SbFUGSSujeM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-live-camera-in-enoshima-island
    videoId: "CZvqU0OqYro",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-stv-livecamera-hokkaido-japan
    videoId: "c6Gqe6L_xZg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-livecam-healing-nowon-seoul-korea-4k
    videoId: "m1bDiKrTrAc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-ddp-live-camera-citypop
    videoId: "jj5wczH-Jag",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-4k-live-cam-hongdae-seoul-korea
    videoId: "DnqX7X6Pefg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-cctv-1100-jeju-halla-mt-cctv
    videoId: "UTHiHLuHsA0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream xkuhskIE-hQ, 2026-11-02",
  },
  {
    // kr-4k-live-korea-seoul-international-fir
    videoId: "_1qU0DWP-Gk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-live-4k-busan-live-cam-korea
    videoId: "AzzpSKt9Bw4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-plaza
    videoId: "9t2w3iryJ1U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-zona-de-obra-s-n
    videoId: "ICe_DXght4o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-obsid
    videoId: "oSuwerF_QJY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-o-2
    videoId: "v9KIo-7RDMo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-centr
    videoId: "kvt2WBA1pcQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-holid
    videoId: "2fNUsH6Ajqs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-cales
    videoId: "a7UV4LCyTs4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-en-vivo-blvd-b-quintana-c-2
    videoId: "nqoaNhb0t5U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-trafico-blvd-b-quintana-holiday-inn-s
    videoId: "4z3KGP4HvII",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // nl-24-7-dutch-train-cab-rides-on-europe
    videoId: "k5YxiCqDX4c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-solheisen-hemsedal-live
    videoId: "wFJzXxHqKVU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-maria-s-cam-10-rosemary-street-agdao
    videoId: "HozfwlxzwnU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-timawa-iloilo-city
    videoId: "sVD5eAGTzsQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-maria-s-cam-10a-rosemary-street-agdao
    videoId: "GCoBhf_Hd-o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-bakunina-33-bakunina-33
    videoId: "Y4OUI_T-rwI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-respect
    videoId: "kAMoUTefkpw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-2
    videoId: "ahCtXBkqI6M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-friends
    videoId: "4LNIhmRvAf4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-3
    videoId: "7yXtHrJvkiM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-online-camera-vladivostok-center
    videoId: "nBGguzu8aTc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-amera-solikamsk-russia-with-ai-chatbo
    videoId: "9ZyKdBaRQrs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sk-live-kamera-martin-slovakia-panoramat
    videoId: "fdHkWHdnJd0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-4k-heping-island-park-live-camera
    videoId: "g-T8NbF9xlQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ua-vencedor-do-premio-nobel-disse-este-n
    videoId: "ljePvTogU7Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ua-combat-cam-real-war-footage-from-pokr
    videoId: "5bp3k4X7dCo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ua-o-telescopio-espacial-james-webb-dete
    videoId: "OGU3I60zd6I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-ultimate-maui-webcam-tour-ka-ana
    videoId: "quk14OsTyAI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-now-ohio-backyard-wildlife-frenz
    videoId: "ACT8r8r9b78",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-giraffe-deck-cam-animal-adventure-par
    videoId: "sSBswg_K0SE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-ultimate-kauai-webcam-tour-poipu
    videoId: "kqX0J3QGKn0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lujiigarden-bird-feeder-cam
    videoId: "i59UQijZ4-Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-sharx-security-demo-live-cam-rotary-t
    videoId: "dRVmzj3K2pw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-southernmost-beach-resorts-pineapple
    videoId: "nrlgx7A-MNs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-perseid-meteors-from-dark-sky-ma
    videoId: "Lz3UkI1RSzA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-beachhouse-webcam-miramar-beach-fl
    videoId: "K1PkxWM6QB4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-surveillancemap-live-above-the-sky-lo
    videoId: "KuzVYn1Ucbg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-southernmost-beach-resort-pool-cam
    videoId: "sFeiuRohRwc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-southernmost-beach-resort-shores-cam
    videoId: "fRpwtzd3-H4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-nongame-wildlife-eagle-cam-habitat-ca
    videoId: "uGVXnrdPp80",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-pixcams-com-pa-bird-feeder-1-live-str
    videoId: "6--SErd7u4o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-pixcams-com-wildlife-webcam-1-live-st
    videoId: "pgMuZvyFw4k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-pixcams-com-field-cam-live-stream
    videoId: "JQWvjG5arhQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-academic-building-new-construction
    videoId: "ID-yWIleGAM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-colonnade-falcon-cam
    videoId: "hA6DNAC7tNM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-sdrc-mission-bay-camera
    videoId: "2JxAeBCFLJ8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-hopkins-charles-austin
    videoId: "qRYILPnsOns",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-camera-nut-giao-thong-tay-cau-rong-a
    videoId: "oC8ttZHG50I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-live-cam005-cat-tien-national-park-vi
    videoId: "Y5devoifJTI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-7
    videoId: "0OBK4I7aRcE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-jr
    videoId: "Ki93KKUVySA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-5
    videoId: "OEssseLG4TI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-14
    videoId: "cscuZ9wbpO0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-15
    videoId: "7IygrRRgXYQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-20
    videoId: "6UMh7x2RSdE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-21
    videoId: "2v_bBrtolUM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-jr-2
    videoId: "RJxnX65VDVo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-camera-4-tanukikoji-shopping-str
    videoId: "Bl_PyBh1L50",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream b2Ve2fudoHM, 2026-11-02",
  },
  {
    // us-alexandria-bay-chamber-of-commerce-ri
    videoId: "XfiHdsxawCY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-daegu-gyeongbuk-live
    videoId: "GwUjCIxgDNQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-cctv-simpang-kel-tengah-cam-2-ka
    videoId: "te1poxeR53Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-como-es-el-universo-de-las-estrellas
    videoId: "sQo0hMynH3s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lincolnville-maine-harbor-cam
    videoId: "BBayXL-zPC4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-live-cam-i-seoul-seokchon-lake-seoul
    videoId: "_bQ-zPlmfx4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-8-25
    videoId: "yoQqGE8Zhkw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-amusement-park-24-7-live-cam-stream-c
    videoId: "_73ygpjQIDQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-4k-live-wildlife-safari-wild-animals
    videoId: "I8NtH7-zMAQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-paris-live-walking-tour-4k-eiffel-tow
    videoId: "nrulaI6I4jI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-sfo-night-action-archive-plane-spotti
    videoId: "9EmmTigiEzs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-iit-b2-ankit-awasthi-sir
    videoId: "jwyTAxFvIBM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-big-island-hawai-i-webcam-tour-k
    videoId: "PO04G-ukSZg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-8-26
    videoId: "2Ofn0yNBWV4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // kr-live-cam-l-gwangandaegyo-bridge-busan
    videoId: "TBOXgW5VV8s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-live
    videoId: "M6lq50Ptp1g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-einbecker-morgenpost-webcam
    videoId: "1KRAt-gjz0w",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // th-live-interactive-camera-control-reoli
    videoId: "y368ae2_Y6U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-3d-4k-24
    videoId: "a58oJZrrtYM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-11
    videoId: "NKox7HbFQGI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-4
    videoId: "KvgGT_NuM_I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ua-telescopul-james-webb-a-atins-margine
    videoId: "TQkIHd_eqrA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-sandcastles-2
    videoId: "2GDRzKPSwK8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-sandcastles-1
    videoId: "M6lPntwR1F4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-korea-live-24-7-cam
    videoId: "90OGQnofN8s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-38
    videoId: "4KKjVhACVAY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-live-cozy-squirrel-bird-sanctuary-car
    videoId: "n9ZcUp3ySos",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-inside-maria-s-living-room-24-7-phili
    videoId: "eCe08tVSy3I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-camera-of-mt-fuji
    videoId: "-m7Q2ee7BEA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-camera-of-fujisanparking
    videoId: "XpB-RZd3_4E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // se-live-camera-axis-p3827-pve-panoramic
    videoId: "IaOCYP4q5jw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-vol2-livecam-live-cam
    videoId: "WP3eWB4YxYY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-jr-live
    videoId: "UXEA0kHRazU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-12
    videoId: "dvqM0l2C8dA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-7
    videoId: "rzX1emU7UFE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream d6UFp8yON_8, 2026-11-02",
  },
  {
    // jp-42
    videoId: "KBwgvcdA7Qo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-43
    videoId: "4R2Pjfldd04",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-44
    videoId: "82uCs10qJCo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream eUn5xFXMVsI, 2026-11-02",
  },
  {
    // jp-45
    videoId: "sPbNtqR1BcU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream Prnejd5fJ9Q, 2026-11-02",
  },
  {
    // kr-live-cam-i-gangmoon-beach-gangwondo-k
    videoId: "n8mJCRXGoXc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sk-salamandra-resort-sportoviska
    videoId: "75wJG5rUmv8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-a260807
    videoId: "LWbvYMFroVM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-andare-residences-live-stream
    videoId: "I-Frs8VjSzM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-a260821-1355
    videoId: "tt4KpMZWC-Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-8
    videoId: "SR_LgY-yBFk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-jr-2-8
    videoId: "9YpQONYzX_A",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-live-3
    videoId: "ge-dlQ0V2kA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream e6TmYaqgVes, 2026-11-02",
  },
  {
    // kr-cctv
    videoId: "129k_gjGDhU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream vA-ZlH9FHsQ, 2026-11-02",
  },
  {
    // ru-live-chat-controlled-camera-perm-russ
    videoId: "E4M-zK4r7ZY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-24h-robo-house
    videoId: "KeKN3VWK40g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // th-live-reolink-e560p-e1-outdoor-poe-4k
    videoId: "taD-29zfTK0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-16
    videoId: "L6KE12PAKYA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-60
    videoId: "z3sngsY_u4Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-1
    videoId: "KKwavDUMlsQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-guinea-pig-live-stream
    videoId: "KW7wtpsvdKI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream -nGL7_rpNv0, 2026-11-02",
  },
  {
    // jp-71
    videoId: "Arw1omQUnr4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-18-3
    videoId: "YiUnKdAq424",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-75
    videoId: "Yj4CHgedlVw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-360-4k-live-360-4k-360-formosa360-rog
    videoId: "yvKEPw53CTs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-livecamera-292-2
    videoId: "WB4jllqVRCc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-79
    videoId: "5LvLwe6cqtY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-80
    videoId: "AD2S75lTwkc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-81
    videoId: "lK0pXrdkwK8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-tokyo-kanda
    videoId: "ftkM0BVLhtg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-tokyo-live-camera
    videoId: "jIBl1-avIc0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-sapporo-japan-traffic-cam-cityscape-l
    videoId: "zBaPnBEWQeg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-kix-1-kansai-international-airpo
    videoId: "tusny7uGPS8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-osaka-japan-24-7-livestreaming-w
    videoId: "KpAr98JS_aE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-yokohama-port-live-camera
    videoId: "AEhdDHMR_vc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-fukuoka-airport
    videoId: "uuMhOREzUYA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-97
    videoId: "QzFmToex1Aw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-8-26-live-ishigakijima-okinawa-japan
    videoId: "0EeGabC__4E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-hatoma-island-okinawa-japan-live
    videoId: "Uh_od38Qtf4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-58-42x-ptz
    videoId: "qcXFhfNRe5g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-98
    videoId: "MsUviESYH8s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-rifu-japan-earthquake-live-stream
    videoId: "gNmLky6Tc7Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-ukb-kobe-airport-hyogo-japan-new
    videoId: "mHK35PWO7DE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-mount-fuji-live-from-fumotoppara-shiz
    videoId: "hBaHx5WdnbQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-seoul-live-cam-24-7-han-river-real-ti
    videoId: "HDblGb_WV5Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-live-camera-taipei-neihu
    videoId: "6zE8oh0OODY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-4k-seoul-ddp-live-camera-lofi
    videoId: "t5WpxyF8q5g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // hk-live-hong-kong-s-only-24-7-live-camer
    videoId: "KQMp39IV56Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // hk-live-cam-hong-kong-live-stream-lofi-h
    videoId: "dCT-JPC9Ug4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sg-singapore-port-4k-livestream-disney-c
    videoId: "JKqqosMYcDI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sg-singapore-cbd-live-stream-4k-with-lof
    videoId: "Wmjfjc8QxkI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-bali-tropical-beach-live-24-7-ocean-s
    videoId: "1avu7zP4dnU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-live-ptz-camera-agdao-bus-stop-flyove
    videoId: "15weHVdoNFs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-hanoi-live-camera-24-7-vinh-tuy-bridg
    videoId: "DbOPyeg50bk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-mumbai-sky-view-live-monsoon-skies
    videoId: "0C-tW2uCrGs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-news-24-live-tv-sugar-price-hike-genz
    videoId: "hu20-r1oe2g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-middle-east-poland-baltic-states-live
    videoId: "FNccF1s7Wrw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tr-4k-istanbul-hagia-sophia-bosphorus-st
    videoId: "bbVe5h7X3uw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // il-live-hd-multi-cams-from-middle-east-r
    videoId: "r5m_wedm-9E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-london-rush-hour-live-real-time-traff
    videoId: "0VV3JZhnlIo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-london-bridge-river-thames-live-webca
    videoId: "H3vVUBQYGHo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream AoWlXqIXNZ8, 2026-11-02",
  },
  {
    // gb-aberdour-live-streaming-weathercam-fi
    videoId: "9eKzgA3Af7k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-palais-d-iena-conseil-economiq
    videoId: "OzYp4NRZlwQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-hamburg-hafen-live-24-poller-hocken-s
    videoId: "M66yEt1TZwY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // es-live-360o-sky-camera-from-malaga-anda
    videoId: "7QEMp9ozXFA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-roma-five-suites-piazza-venezia-live
    videoId: "yRTTjMYVCXY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // hu-allatkert-budapest-sziveben-szavanna
    videoId: "sBg8TC11i6k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gr-live-24-7-skiathos-bay-port-real-time
    videoId: "k9_uTRCJy7Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pt-i-love-lx-live-stream
    videoId: "MTczfN3ANUM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pt-livecam-costa-da-caparica-2-panoramic
    videoId: "qhU5x83fUt8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // is-live-aurora-from-reykjavik-iceland
    videoId: "iqkZCpPVeJ0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // is-live-24-7-iceland-earthquake-map-volc
    videoId: "2qj5fiaShzY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fi-helsinki-night-walk-24-7-finland-nigh
    videoId: "jOZ3zmgbWyk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fi-helsinki-summer-day-4k-walking-tour-2
    videoId: "0BQf5sJcDUI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-castro-street-cam-1-live-stream
    videoId: "-Cln1w-PSnA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fi-helsinki-finland-summer-walk-24-7-4k
    videoId: "JQAuqeI3ES4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-port-miami-cruise-ship-terminals-live
    videoId: "xsqwSMuz1oA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-las-vegas-city-hall-roof-cam-live
    videoId: "KtCweD6zjfA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-ultimate-oahu-webcam-tour-waikik
    videoId: "mLYWolyZxuM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-north-central-washington-tower-c
    videoId: "uoELtsHI6Xg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-bee-camera-livestream
    videoId: "JLpRcd7OYsY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-live-english-bay-vancouver-includes-e
    videoId: "s0aC_c2qftk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-camara-en-vivo-cancun-vista-desde-hot
    videoId: "ELgxvY636bo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-live-english-bay-vancouver-20-views
    videoId: "WDRtnRQE1Mc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-cbc-news-live-toronto
    videoId: "mM3kOpgjm98",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-cancun-playa-hotel-presidente-en-vivo
    videoId: "OS5Vpxp1zRM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream igG6mYJhA0I, 2026-11-02",
  },
  {
    // ca-bc-place-vancouver-live-cam-0822-2026
    videoId: "_ktdAH0_RmM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-live-aeroporto-santos-dumont-rio-de-j
    videoId: "rAUdch_GyXs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-angra-dos-reis-agora
    videoId: "CsQ1RRjk3qU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-arraial-do-cabo-agora-praia-e
    videoId: "9uccePeQQK4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-trem-ao-vivo-embu-guacu-sp-brasil
    videoId: "VahCvcV-9rk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-trem-ao-vivo-barra-funda-sao-paulo-br
    videoId: "6HF6sqHk_Fg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-pinamar-playa-en-vivo-camaras-pinamar
    videoId: "sQfqxlZvVDQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-cape-town-weather-cam-live-relaxing-m
    videoId: "I8oZ9FII2vA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-live-south-africa-bird-feeder-wildlif
    videoId: "MrLVxFR1IbI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-melbourne-australia-weather-night-sky
    videoId: "5n8odconoKU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-box-camera-falconcam-project-live
    videoId: "yv2RtoIMNzA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-superbank-snapper-rocks-gold-coast-au
    videoId: "VRyJri2iQVc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-south-east-queensland-tmr-camera-netw
    videoId: "I2mJLN0ATLo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // nz-24-7-live-beach-haven-in-auckland-new
    videoId: "FOuXD98JpK4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-live-africa-wildlife-magnificent-bird
    videoId: "BVbFRP_vIIc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-santa-catarina-em-tempo-real
    videoId: "4EEjIOeaL9c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 18QuN87r-fw, 2026-11-02",
  },
  {
    // br-arroio-do-silva-camera-ao-vivo-monito
    videoId: "VmySlU1qj4M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-fort-myers-beach-live-webcam
    videoId: "ocoHYjmUt1s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ch-switzerland-in-full-bloom-4k-a-dreaml
    videoId: "slsrciqocjw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kilauea-volcano-is-erupting-lava-eart
    videoId: "Dfbj7tC29Cs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-kilauea-volcano-eruption-live-24-7-li
    videoId: "d93MlUgmk4s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ch-livecam-berghotel-bischofalp-1650-m-u
    videoId: "vSCViBmfQxE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-kilauea-volcano-erupting-now
    videoId: "Wy1SB8bbjmM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-kilauea-episode-54-watch-next-er
    videoId: "z1eaEX2Sk7o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-99
    videoId: "SiNdj5dEq_8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-103
    videoId: "UvSPftyU30U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-24-7-soft-lofi-jazz-bgm
    videoId: "xCpBwLhOvwQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-104
    videoId: "e1UJO_F4CJ8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-106
    videoId: "0EzsqHx2AhU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-110
    videoId: "TsHfxgJI4FU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-111
    videoId: "32Azf9yJmRI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-mt-sakurajima-volcano-by-kyt-live
    videoId: "c4o2HemaM68",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-live-camera-4k
    videoId: "Dq5VHiCebZg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-tokyo-live-webcam-24-7-shinjuku-stree
    videoId: "t2ppIAKnQNE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-live-24-7-planes-atc-cams-chill-music
    videoId: "spcz9pIVCtQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-now-24-7-merapi-volcano-erupting
    videoId: "SeyldmYkfDI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-live-darshan-shree-somnath-temple-jun
    videoId: "J4z7CIrvsuw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-aaj-tak-live-tv-nepal-flood-delhi-lax
    videoId: "dEJ6H_DIhEg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tr-yalan-dunya-canl-izle
    videoId: "Efh06uzzORM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-peregrine-networks-live-peregrine-fal
    videoId: "BEHwTBqq3vM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-houat
    videoId: "u4z18aLOA3k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-live-cruise-ship-cams-around-the-worl
    videoId: "8j3l1GfBLg0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-marseille-calanque-samena
    videoId: "xsUGUMAFc-I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // it-menaggio-piazza-garibaldi
    videoId: "vyGnbPNlpsU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // at-bergblick-live-aus-den-alpen
    videoId: "0l_c9ANWCj8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ch-webcam-adelboden-sonnen-panorama-7-24
    videoId: "UbGnB3IQanA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pt-webcam-live-porto-di-vernazza-cinque
    videoId: "bQ9VS-hM1D8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-gdansk-live-4k-wrzeszcz-city-webcam-2
    videoId: "OIEIRS-5iO0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-live-bigtrains-tv-cp10-csx-river-line
    videoId: "GoFaRKaO4hM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // hr-webcam-bol-2-live-monitored-with-live
    videoId: "6LbpnmSY_dg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-abc15-arizona-latest-news-weathe
    videoId: "AsHhodqzm7k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-now-arizona-bird-feeder-cam-acor
    videoId: "jaGPSAZ_uow",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-csx-chattanooga-sub-nashville-to-chat
    videoId: "3bPatpTDUFI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-atlanta-history-center-live-goat-cam
    videoId: "O25Ni73LtLE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-dolphin-live-webcam-key-largo-florida
    videoId: "ghg9lhFDouM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-niagara-falls-live-cam
    videoId: "UBTpYGj4cik",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-live-sky-cam-niagara-falls
    videoId: "3KhQK5KG7VU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-live-quebec-chateau-frontenac-harbor
    videoId: "nJ1ChbhimjQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-diffusion-en-direct-de-saguenay
    videoId: "ZGk4fkhBTvU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-cbc-news-live-quebec
    videoId: "WIgNWfoZQ4g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-lime-out-floating-taco-boat-live-webc
    videoId: "zNvNY9xf9T4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-zihuatanejo-en-vivo-playa-la-ropa
    videoId: "e756N1tufY8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-live-hora-certa-24-7-relogio-ao-vivo
    videoId: "3wOHItqP_zU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-southbroom-beach-webcam-from-riptide
    videoId: "ZZeg7y7ET80",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-brisbane-weather-live
    videoId: "o1LRcS28T2M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // au-south-east-queensland-dashboard
    videoId: "43beGFdRmW4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // nz-wellington-waterfront-webcam-geeks-on
    videoId: "tnXoyr_hh7g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-24-7-lake-powell-marina-cam-boat
    videoId: "NEK2iTuyOX4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-ramsgate-royal-harbour-live-webcam-24
    videoId: "6R_H9Ljp-Qs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-ocean-city-boardwalk-pan-cam
    videoId: "kBvlAcTHVlE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-east-summit-live-webcam
    videoId: "CDeGOHHwsDg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-socalmountains-com-goldmine-mountain
    videoId: "GgQXgMJeHiA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream wMD8OnO7nr4, 2026-11-02",
  },
  {
    // us-upper-chisolm-live-webcam
    videoId: "dyjqN3NezH0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-ultimate-montana-webcam-tour-gla
    videoId: "yiZ6nFZ8NRw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-soothing-headache-migraine-pain-and-a
    videoId: "kYissYTEjww",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-alum-bay-camera-scenic-the-needles-li
    videoId: "EyMkSCRrTRI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-saint-louis-zoo-live-stream
    videoId: "b8RCVeXUYMY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-penguin-webcam-at-saint-louis-zoo
    videoId: "hHLlZhianIQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-weather-webcams-from-poland-pogoda-w
    videoId: "B9oTl2vWU64",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-white-storks-at-knepp
    videoId: "s0liN8AzykQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-4k-live-cam-lishan-sakuraen-hill
    videoId: "nZr0Qymeol4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-forest-live-stream-look-around-and-en
    videoId: "YtnJ_CE8AGY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-olcott-ny-harborcam
    videoId: "iJ5bRlGMyeY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-kolner-dom-live-webcam-im-testbetrieb
    videoId: "kodtgRure8Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-cabo-frio-rj-praia-do-pero-po
    videoId: "Zi8dZLSuw54",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // zw-en-vivo-episodios-completos-de-bluey
    videoId: "4bbPfVFaSx8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-vista-panoramica-en-vivo-de-la-ciudad
    videoId: "X2_e8oHny2s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 8JL0IyVP1vk, 2026-11-02",
  },
  {
    // tr-kapikule-canli-ipsala-canli-hamzabeyl
    videoId: "MQ_cvCiw3jQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tr-2-p-narbeyli-koyu-canl-yay-n-7-24-tok
    videoId: "jluROz4AC14",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ro-bran-vila-panorama-bucegi-mountain-vi
    videoId: "ynUpKpsvtJw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-north-carolina-bird-feeder-daily-live
    videoId: "0zT458PYuB8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-newport-harbor-hotel-marina-live-stre
    videoId: "TpfJFjZyy0c",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-snow-stake-winter-park-resort
    videoId: "_wOIgFEMypY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-palisades-tahoe-ski-resort-alpine-lod
    videoId: "xJjrP9DmA1k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-aviary-cam-monterey-bay-aquarium
    videoId: "cUoet3dmRU4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-emerald-cam-live-from-the-galveston-s
    videoId: "gAdtr9_mBTk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-panama-city-beach-live-cam-gulf-views
    videoId: "a7_QEdjsgtE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-ldv-carillon-beach-live-webcam-panama
    videoId: "7129nXp5fRo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-sea-eaglecam4-live-stream
    videoId: "nw4pdgy3-U0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-bald-eagle-cam-glacier-gardens-j
    videoId: "lUUcakg0YTA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-enjoy-a-view-of-the-st-john-s-harbour
    videoId: "y7FKz_y86Bo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-lime-out-stt-floating-taco-boat-live
    videoId: "nSJxrl07Gyg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-buccanos-beach-club-cozumel-mexico-li
    videoId: "JX1O3DKjY-k",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-zihuatanejo-en-vivo-playa-la-madera
    videoId: "btSfGGIn_Eo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-playa-del-carmen-en-vivo-vista-panora
    videoId: "nNEaRNxZ0Lg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-camera-de-rua-city-live-cam-o
    videoId: "ZFjD0uxntWU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-bariloche-en-vivo-ruta-40-lago-nahuel
    videoId: "tfi0NRWIYoU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ar-24-7-2-cd-acuna-mexico-live-cam-live
    videoId: "09EPp9I-hIw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-4k-niseko-annupuri-international-ski
    videoId: "iCetfeKzJFs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-hakuba-goryu-snow-resort-from-li
    videoId: "TEC-hUC08oM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-camera-hakuba47-2026-03-09-09-44
    videoId: "B6xMPiF22Vo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-sapporo-in-summer-lofi-radio-24-hours
    videoId: "X-vzOfg0yPk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-shonan-beach-fm-78-9-sagami-bay-enosh
    videoId: "fzQPDcFbzaA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream IGIpSJcfRiQ, 2026-11-02",
  },
  {
    // jp-shinhotakaropeway-livecamera
    videoId: "qmqsvWrFfww",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-ishigaki-island-okinawa-japan-rb
    videoId: "5jHCxMEGor0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-beppu-bay-camera-hov
    videoId: "0PEeZq9KE2o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-25
    videoId: "0UrgmAFFBEY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-4k-taitung-fushan-area-live-camera
    videoId: "Rsq95SQ26bY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-vandana-monastery-live-camera-hualien
    videoId: "q-39iN_S7-E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-live-taiwan-hualien-ji-an-live-camera
    videoId: "EsQOvbpEOPI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-cctv-jeju-island-in-south-korea-live
    videoId: "I4a3moh62aM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream XfGo4w9yZgM, 2026-11-02",
  },
  {
    // tw-live-24-hengchun-guanshan-live-camera
    videoId: "POk4BTN3q3I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-kiet-tac-vi-cam-baroque-solo-nhac-co
    videoId: "M2HhBFel6JU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-table-mountain-cape-town-live
    videoId: "myOiD4m3yAs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-punjab-punjab-govt-election-update-cm
    videoId: "2O42OtdYBc0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-port-miami-cruise-ship-terminals
    videoId: "ptyuseSJQCY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-nakiska-ski-resort-mid-mountain-live
    videoId: "MRl0nW5Gekk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-saint-tropez-live-french-riviera-cote
    videoId: "fUMSP-HLWOY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-la-croix-valmer-lily-of-the-va
    videoId: "-k63O5mK63w",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-webcam-la-chalp-saint-veran
    videoId: "e8u1GUObSJo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // de-schluttsiel-harbour-webcam-live-north
    videoId: "OVeePNGAbMQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-cold-lake-marina
    videoId: "IvbrO52Gp-g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-webcam-weston-super-mare-marine
    videoId: "_Fmb_RsiwTU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-schooner-wharf-bar-webcam-key-west-we
    videoId: "Q2yLOnODXWo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-aizu-higashiyama-spa-mukaitaki-l
    videoId: "ISAqpsDLxy8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-naha-airport-iata-oka-icao-roah-news
    videoId: "a0ob2ey-zPg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-24-3d-atc-hnd-rjtt
    videoId: "qQoBmgDKZiI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-lake-tazawa-live-camera-semboku-city
    videoId: "XkFBxz86Eoc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-monitoramento-clima-em-boa-viagem-rec
    videoId: "RjC3mz-qJII",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-trevou-treguignec-en-direct-webcam-li
    videoId: "XIU6nXVSHq4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // br-ao-vivo-laguna-sc-imagens-ao-vivo-24h
    videoId: "qrWwvPrIxpM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // fr-saint-jouin-bruneval-en-direct-webcam
    videoId: "yGrB7oCQ1TM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gr-skiathos-island-live-camera-sporades
    videoId: "_J1amHD_PvM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // hr-suncana-uvala-borik-mali-losinj-live
    videoId: "BG9JTb-qLLg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gr-skiathos-live-camera-24-7-real-time-i
    videoId: "gmb2JhecOEY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-vancouver-rowing-club-live-stream
    videoId: "Q4BuAWCHiao",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ca-chek-news-nanaimo-harbour-cam-24-7-li
    videoId: "2iB-pHJQcak",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-by-hviewcam
    videoId: "hxKBnoLH0uk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-146
    videoId: "R1Du85BPMpA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-snow-king-mountain-base-seejh-ai
    videoId: "SB45P6fZs9E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-teton-village-wy-seejh-ai
    videoId: "VCxmDnsK6yA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-vista-de-virtus-bodega-en-valladolid
    videoId: "QPmBjjrUAZ8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-popocatepetl-noche-de-incandescencia
    videoId: "9_c1L1KDJ9Y",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-en-vivo-pluma-volcanica-del-popocatep
    videoId: "BUvS0mDoXuQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-24-earthquake-alert-japan-live
    videoId: "TVSCwRnsxy8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream JdZSo4VdFAE, 2026-11-02",
  },
  {
    // us-live-fort-lauderdale-beach-cam-elbo-r
    videoId: "VzhdbBwCAK4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream hAYfk7YeAxU, 2026-11-02",
  },
  {
    // us-day-drinkers-ad-free-24-7-elbo-room-s
    videoId: "MhRM4fRz9Ow",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // us-watch-whale-sharks-live-georgia-aquar
    videoId: "DtKB7dLOBk8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-davao-philippines
    videoId: "XHUaMlOwVsc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-edge-babor-ph-edge-2-bbq-area-agdao-p
    videoId: "R_xMH1DjpjU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-edge-babor-ph-edge-4-jane-eatery-agda
    videoId: "yhNqqnSW8pw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-edge-babor-ph-edge-5-d-family-barbers
    videoId: "nepz9aZkCcE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ph-jazbaz-philippines-5-soliman-street
    videoId: "ui5S0ld_0po",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ru-lakhta-center-russia
    videoId: "69VRD2HGheM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // th-house-of-sanskara-beach
    videoId: "FBYUkqutqzE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tr-istanbul-miniaturk
    videoId: "pjdLnIXJf2g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-neihu-road
    videoId: "SfPJLSMuCQE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-big-moose-mountain-usa
    videoId: "McUEIgZLHxI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-eagle-nest-usa
    videoId: "2jf6zs5oRLg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lee-vining-usa
    videoId: "7AzazJDBnQU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lincoln-city-usa
    videoId: "A7ib2rokOHg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream ZKMeR94NHcI, 2026-11-02",
  },
  {
    // us-pipeline-usa
    videoId: "DY5RYp4sxYc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-virginia-tech-burruss-hall-usa
    videoId: "7TE5vU_ndPE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-miobydots-jr-minamoa-3f
    videoId: "LRszS7dj6f0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-tss-live-camera
    videoId: "lf-RntqEthQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-167
    videoId: "4C65kqdVmhI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-no-4-cc112
    videoId: "hzJMyFceuGY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-no-1-cc112
    videoId: "zWORRn1aRRw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // kr-cctv-2
    videoId: "x08xIIawl1o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream 1dvP0S_o9Dw, 2026-11-02",
  },
  {
    // kr-live-cam-i-seongsan-ilchulbong-jejudo
    videoId: "pMaqsb26eSE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-keelung-live-cam-4k-keelung-maritime
    videoId: "colNBGSM1g8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tw-7
    videoId: "L4hCgK8KG5M",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // cn-24h
    videoId: "T53-fmKqm_0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Video unavailable\" on the watch page, 2026-11-02",
  },
  {
    // kr-2-lineage2-2-pvp-pk
    videoId: "XWnLUSb6pgg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // jp-jr-3-8
    videoId: "G3_58aWKi_Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // tc-villa-renaissance-grace-bay-turks-and
    videoId: "shNgEojhTK4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lavallette-usa
    videoId: "amB3Sbxqff0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ro-fountain-of-manole-curtea-de-arges
    videoId: "YJULVN8Otl0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-da-nang-vietnam
    videoId: "L_eizGlcM9Q",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // vn-nha-trang-coastal-city-vietnam
    videoId: "SCpZOgLKVfY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-cape-town-south-africa
    videoId: "khhdEM2Q_68",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sn-live-cctv-simpang-kantor-bupati-kabup
    videoId: "wQxdSWKumzc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // sn-live-cctv-simpang-kantor-bupati-cam-3
    videoId: "uHsGDVaV_sg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // aq-construction-live-cam
    videoId: "qcb0HiE0afM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-winlock-washington-live-railcam-winlo
    videoId: "S3YTiO4jQtI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-members-only-santa-maria-santiag
    videoId: "FwOhjdc6IGI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // us-live-members-only-popocatepetl-volcan
    videoId: "a5VnMDnzGmQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // id-live-pemantauan-cctv-lalulintas-area
    videoId: "bcjSWZBmakE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-pemantauan-cctv-lalulintas-a-2
    videoId: "UzsJMEqmDAg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // id-live-pemantauan-cctv-pintu-masuk-utam
    videoId: "B96LfyFCk64",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-live-from-jack-s-camp-kalahari-waterh
    videoId: "jG0uYl5S44E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-moosehead-lake-maine-live-cam
    videoId: "EGh3HIea6v4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-moela-safari-lodge-live-zebra-migrati
    videoId: "54Y7xlLrkuo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-trains-ad-free-st-louis-missouri
    videoId: "83zOF_E687I",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // mx-cdmx-lluvias-rayos-y-granizo-esta-tar
    videoId: "3Y8_Xtz_92E",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream -VtOUUT1abs, 2026-11-02",
  },
  {
    // in-live-flash-flood-wreaks-havoc-in-nepa
    videoId: "aQ2VKJUaKW0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-india-today-tv-live-nepal-flash-f-2
    videoId: "eh_dalcjpfY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-india-today-tv-live-nepal-flash-f-3
    videoId: "26-N7obe23o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-india-today-tv-live-indians-missing-i
    videoId: "9z1FUkDriQY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-live-at-the-waterhole-26-august-2-2
    videoId: "3SMnfCsONaI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-live-at-the-waterhole-24-august-2-2
    videoId: "S8U7c_EQUsA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // za-elephant-sundowners-safarilive-su-2
    videoId: "Od_-89eQGRE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-live-at-the-waterhole-23-august-2026
    videoId: "c7uRF1cxbrA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // za-breakfast-with-the-boys-safarilive-su
    videoId: "E3iI7tKIwKk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-rosetted-reunion-safarilive-sunset-22
    videoId: "hniyzTUiHU0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-live-at-the-waterhole-22-august-2026
    videoId: "7liuUIRccls",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // za-giants-meet-the-clan-safarilive-sunse
    videoId: "awggIeRQpEE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-live-at-the-waterhole-25-august-2-2
    videoId: "i3w4d9g1JV4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"Join this channel to get access to members-only content like…\" on the watch page, 2026-11-02",
  },
  {
    // za-wild-intentions-safarilive-sunrise-25
    videoId: "EkWWfi4Rpa4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-live-at-the-waterhole-21-august-2026
    videoId: "cTJv-MXhpT8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-all-hail-the-leopard-queen-tlalamba-s
    videoId: "ra1jIeqcLiM",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-little-lions-big-curiosity-safari-2
    videoId: "b7IU4UnPFqY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // za-a-day-of-little-ones-safarilive-sunse
    videoId: "VZpqgJRI25s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This video is available to this channel's members on level:…\" on the watch page, 2026-11-02",
  },
  {
    // us-live-walrus-cam-first-beach-view-roun
    videoId: "zVsCxyi47Kk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-anacapa-island-cove-lookout-cam
    videoId: "fAS2TFePbQk",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-mount-washington-observatory-tow
    videoId: "JuJVUhj9JBo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-lake-fairlee-looncam
    videoId: "mFSGKt0sV60",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-birds-squirrels-webcam-in-hokkaido-ja
    videoId: "jl3e24fTbnY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream dLfMXA4EOZU, 2026-11-02",
  },
  {
    // us-live-key-largo-marina-live-webcam-key
    videoId: "T7nRMTfWsIs",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-gasparilla-marina-live-stream-englewo
    videoId: "6KJag1a8U3U",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-live-34
    videoId: "GSO-cLay-x4",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-ujjain-mahakal-live-24x7-shreemahakal
    videoId: "HEnbwbMfsZI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream lcbuqeTaiJM, 2026-11-02",
  },
  {
    // pe-new-years-2027-countdown-all-timezone
    videoId: "CaV0eBsikhc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-loch-arkaig-osprey-camera-2
    videoId: "iFzGp7mT_PY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-tenby-south-beach-live-webcam-pembrok
    videoId: "LUNS990R450",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-llandudno-north-parade-from-min-y-don
    videoId: "P0jRqh_82uE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-tullochwood-lodges-live-stream-across
    videoId: "st6Z0xFYsQI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // gb-north-wales-live-weather-hd-webcam
    videoId: "aUw3mS_PW9g",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ie-portrush-live-surf-cam
    videoId: "edrTjkN8UOA",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // co-columbia-sc-traffic-cam-police-scanne
    videoId: "F14aJZOBLPg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // se-risk-riksgransen-snowboard-och-skidkl
    videoId: "Fx5ZDS0jKtU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // nl-egmond-aan-zee-live-webcam-strand-zee
    videoId: "9xa5IvsIMoE",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream JK4S4DzKiuM, 2026-11-02",
  },
  {
    // nz-lyall-bay-surf-cam-by-lbslsc
    videoId: "Wqkr-o1P9OQ",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // us-live-puffin-loafing-ledge-maine-seabi
    videoId: "daFe_ygulPY",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // bg-live-bulgaria-webcams
    videoId: "LKYcD-VAUjc",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // np-4k-live-wildlife-safari-animals-live
    videoId: "7X-FPA3QuYU",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ch-live-penang-webcam-weather-georgetown
    videoId: "JJ4pSHaYB5s",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // pl-philippines-live-camera-bankerohan-ma
    videoId: "JklHtgXkQ2o",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-live-santa-claus-village
    videoId: "e90mfzdBBb8",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-live-northern-lights-camera-from-utsj
    videoId: "3HXRJ-4tOCw",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // no-nelson-tasman-live-camera-weather-and
    videoId: "MPwMmEvl6F0",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // za-live-wildlife-camera-at-the-hide-hwan
    videoId: "nXI-kWu6BLo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-live
    videoId: "Lb7tv3KNzlg",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // jp-livecamera-8
    videoId: "yMm2Q3zLXKI",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // in-falcon-cam-hibbard-2
    videoId: "IIBH_Zva4ms",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page, 2026-11-02",
  },
  {
    // ua-24-7-live-cams-ukraine-russia-conflic
    videoId: "CH8JsNKY3xo",
    reason: "Finished live stream that cannot be played: playabilityStatus UNPLAYABLE \"This live stream recording is not available.\" on the watch page of its current stream awqoL8ZxbDI, 2026-11-02",
  },
];

export const EXCLUDED_VIDEO_IDS: ReadonlySet<string> = new Set(
  CAM_EXCLUSIONS.map((e) => e.videoId),
);
