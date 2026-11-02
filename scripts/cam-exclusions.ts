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
];

export const EXCLUDED_VIDEO_IDS: ReadonlySet<string> = new Set(
  CAM_EXCLUSIONS.map((e) => e.videoId),
);
