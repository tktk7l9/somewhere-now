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
];

export const EXCLUDED_VIDEO_IDS: ReadonlySet<string> = new Set(
  CAM_EXCLUSIONS.map((e) => e.videoId),
);
