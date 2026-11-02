import { CAMS } from "../data/cams";
import {
  BROADCAST_CHANNELS,
  BROADCAST_TITLE_PATTERNS,
  broadcastIds,
  isBroadcast,
} from "./broadcast";
import type { Cam } from "./cams";

function cam(overrides: Omit<Partial<Cam>, "source"> & { source?: Partial<Cam["source"]> } = {}): Cam {
  const { source, ...rest } = overrides;
  return {
    id: "shibuya-crossing",
    name: { ja: "渋谷スクランブル交差点", en: "Shibuya Crossing" },
    lat: 35.66,
    lng: 139.7,
    timeZone: "Asia/Tokyo",
    category: "city",
    country: "JP",
    ...rest,
    source: {
      videoId: "abc",
      channelId: "UC-real-webcam-operator",
      titleKey: "【ライブ】渋谷スクランブル交差点 Shibuya Scramble Crossing Live Camera",
      ...source,
    },
  };
}

describe("isBroadcast", () => {
  it("a plain fixed camera is not a broadcast", () => {
    expect(isBroadcast(cam())).toBe(false);
  });

  it("anything from a channel that only airs programmes is a broadcast", () => {
    // Ocean Ambience. The title offers no clue the patterns know, so the channel is the only way
    // to tell. (News channels such as Al Jazeera are no longer hidden here: they were excluded
    // from the catalogue on 2026-11-03.)
    expect(
      isBroadcast(
        cam({
          source: {
            channelId: "UCeDnpWZapyw4rwORykzLbFg",
            titleKey: "Ocean Ambience 4K (LIVE 24/7). Tropical Beach & Ocean Waves Sounds.",
          },
        }),
      ),
    ).toBe(true);
  });

  it("also tells by the wording of the title", () => {
    const titles = [
      "Chillout 2026 24/7 Live Radio • Summer Tropical House",
      "Ibiza .fm | Live Radio & Webcams from Ibiza",
      "Waterfall Gentle Stream Sound in forest 24/7. White Noise",
      "Calm Woodland Stream with Beautiful Birdsong | Relax, ASMR",
    ];
    for (const titleKey of titles) {
      expect(isBroadcast(cam({ source: { titleKey } })), titleKey).toBe(true);
    }
  });

  it("does not catch real cameras that say live or music in their title", () => {
    // All taken from the real data: cameras that a loose word match wrongly hid.
    const titles = [
      "PRAIA DE CANDEIAS PE - CÂMERA 2 AO VIVO - LIVE CAM",
      "BUENOS AIRES, Argentina en Vivo 🇦🇷 24/7 (Live Camera Argentina)",
      "2 🔴 Yayla Hareketli - Kabahor Gölyayla Köyü Canlı Yayın",
      "【ライブ配信】大阪・梅田ライブカメラ Osaka Umeda LiveCam JAPAN @毎日新聞大阪本社から",
      "【ライブカメラ】那覇空港の現在の様子は ──Naha Airport（日テレNEWS LIVE）",
      "【LIVE】沖縄・石垣島（Ishigaki Island) Okinawa JAPAN｜RBC News",
      "Jimmy's Fish House - Sunset",
      "Cape Town Weather Cam LIVE | Relaxing Music, Sunrises & Mountain Views",
      "Tokyo Odaiba Live Camera お台場ライブカメラ 勉強・作業用Lofi BGM",
      "高雄流行音樂中心 4K即時影像 | Kaohsiung Music Center 4K Live Camera",
      "🔴🚢 Vancouver LIVE Cam | Cruise Ship LiveStream 24/7 | Alaska Season 2026",
      "🔴 LIVE 24/7 LAX Airport Action Runways 24L & 24R | LIVE Plane Spotting with ATC!",
    ];
    for (const titleKey of titles) {
      expect(isBroadcast(cam({ source: { titleKey } })), titleKey).toBe(false);
    }
  });
});

describe("broadcastIds", () => {
  it("collects only the ids of broadcasts", () => {
    const ids = broadcastIds([
      cam({ id: "real" }),
      cam({ id: "tv", source: { titleKey: "FOO | White Noise 24/7" } }),
    ]);
    expect([...ids]).toEqual(["tv"]);
  });

  it("is empty for an empty list", () => {
    expect(broadcastIds([]).size).toBe(0);
  });
});

describe("effect on the master list", () => {
  // Hiding means making things invisible, so pin down by numbers that the match is not too
  // wide against the population. A loose word match hit 547 entries, most of them wrong.
  const hidden = CAMS.filter(isBroadcast);

  it("matches less than 5% of the catalogue", () => {
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden.length / CAMS.length).toBeLessThan(0.05);
  });

  it("does not hide a broadcaster channel wholesale (real fixed cameras live there too)", () => {
    // The TV Asahi (ANN) and TBS channels also air fixed cameras in Shibuya, Haneda and Shinjuku.
    for (const channelId of ["UCGCZAYq5Xxojl_tSXcVJhiQ", "UC6AG81pAkf6Lbi_1VC5NmPA"]) {
      const own = CAMS.filter((c) => c.source.channelId === channelId);
      expect(own.length).toBeGreaterThan(0);
      expect(BROADCAST_CHANNELS.has(channelId)).toBe(false);
      expect(own.some((c) => !isBroadcast(c))).toBe(true);
    }
  });

  it("every listed pattern actually matches something (no stale patterns)", () => {
    for (const re of BROADCAST_TITLE_PATTERNS) {
      expect(CAMS.some((c) => re.test(c.source.titleKey)), String(re)).toBe(true);
    }
  });

  it("every listed channel is still in the master list", () => {
    const known = new Set(CAMS.map((c) => c.source.channelId));
    for (const channelId of BROADCAST_CHANNELS) {
      expect(known.has(channelId), channelId).toBe(true);
    }
  });
});
