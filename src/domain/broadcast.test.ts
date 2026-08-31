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
  it("素の定点カメラは番組ではない", () => {
    expect(isBroadcast(cam())).toBe(false);
  });

  it("番組しか出していないチャンネルのものは番組", () => {
    // Al Jazeera English。タイトルには手掛かりが「Live」しか無いので、
    // チャンネルで見分けるしかない。
    expect(
      isBroadcast(
        cam({ source: { channelId: "UCNye-wNBqNL5ZzHSJj3l8Bg", titleKey: "🔴 Al Jazeera English | Live" } }),
      ),
    ).toBe(true);
  });

  it("タイトルの言い回しでも見分ける", () => {
    const titles = [
      "🔴 LIVE! Phineas and Ferb Full Episodes! | @disneychannelanimation",
      "🔴EN VIVO: Episodios completos de Bluey en HD",
      "Bizimkiler - Tüm Bölümler Canlı Yayın",
      "CNN TÜRK - 🔴 Canlı Yayın ᴴᴰ - Canlı TV izle | HABER",
      "Aşk-ı Memnu Canlı İzle",
      "RELACJA NA ŻYWO - OGLĄDAJ Telewizja Republika",
      "FRANCE 24 English – LIVE – International Breaking News & Top stories",
      "「殴られたようだ」相模原で高校生死亡【報道ステーション】",
      "【ライブ】日本の最新ニュースを24時間ライブ配信｜テレ朝NEWS24",
      "【地震ライブ】緊急地震速報 24時間リアルタイム配信中 ウェザーニュース",
      "Kral Akustik Radyo - Canlı Radyo Dinle",
      "Chillout 2026 24/7 Live Radio • Summer Tropical House",
      "Waterfall Gentle Stream Sound in forest 24/7. White Noise",
      "Calm Woodland Stream with Beautiful Birdsong | Relax, ASMR",
      "12 Hours of Calming Music for Dogs🐶",
      "MALDIVES 4K Aerial 🇲🇻 Overwater Villas",
      "MIAMI 8K Virtual Tour 🇺🇸 Brickell Skyline",
    ];
    for (const titleKey of titles) {
      expect(isBroadcast(cam({ source: { titleKey } })), titleKey).toBe(true);
    }
  });

  it("🔴 生中継や音楽を名乗る本物のカメラは巻き込まない", () => {
    // どれも実データから採った、緩い語で判定したときに誤って隠れた実例。
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
  it("番組の id だけを集める", () => {
    const ids = broadcastIds([
      cam({ id: "real" }),
      cam({ id: "tv", source: { titleKey: "FOO | Breaking News 24/7" } }),
    ]);
    expect([...ids]).toEqual(["tv"]);
  });

  it("空の一覧では空", () => {
    expect(broadcastIds([]).size).toBe(0);
  });
});

describe("マスタに当てたときの効き", () => {
  // 隠すのは「見えなくする」ことなので、母集団に対して広く当たりすぎていないか
  // を数で押さえる。緩い語で判定したときは 547 件に当たり、その大半が誤りだった。
  const hidden = CAMS.filter(isBroadcast);

  it("収録の 5% 未満にしか当たらない", () => {
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden.length / CAMS.length).toBeLessThan(0.05);
  });

  it("局のチャンネルは丸ごとは消さない(本物の定点カメラが同居している)", () => {
    // テレ朝(ANN)と TBS のチャンネルは、渋谷・羽田・新宿の定点カメラも出している。
    for (const channelId of ["UCGCZAYq5Xxojl_tSXcVJhiQ", "UC6AG81pAkf6Lbi_1VC5NmPA"]) {
      const own = CAMS.filter((c) => c.source.channelId === channelId);
      expect(own.length).toBeGreaterThan(0);
      expect(BROADCAST_CHANNELS.has(channelId)).toBe(false);
      expect(own.some((c) => !isBroadcast(c))).toBe(true);
    }
  });

  it("並べた語はどれも実際に何かを拾っている(腐った語を残さない)", () => {
    for (const re of BROADCAST_TITLE_PATTERNS) {
      expect(CAMS.some((c) => re.test(c.source.titleKey)), String(re)).toBe(true);
    }
  });

  it("並べたチャンネルはどれもマスタに残っている", () => {
    const known = new Set(CAMS.map((c) => c.source.channelId));
    for (const channelId of BROADCAST_CHANNELS) {
      expect(known.has(channelId), channelId).toBe(true);
    }
  });
});
