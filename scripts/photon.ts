// 2 つめのジオコーダ(Photon / OSM ベース)。
//
// なぜ要るか: Open-Meteo のジオコーディングは**人口のある土地**の辞書で、
// 施設や地物を知らない。だから "Kilauea Volcano" にはカウアイ島の Kilauea
// という町を、"Port Miami Cruise Ship Terminals" にはケンタッキー州の何かを
// 返す。Photon は OSM を引くので施設が出る(実測でどちらも正解を返した)。
//
// これ単体で信じるのではなく、**2 つが同じ場所を指したときだけ採用する**
// ための片方として使う(scripts/regeocode-piles.ts)。
//
// 公開インスタンスへの負荷を上げないこと。1 秒 1 件を超えない。

const ENDPOINT = "https://photon.komoot.io/api/";
const USER_AGENT =
  "somewhere-now-cam-curation/1.0 (github.com/tktk7l9/somewhere-now; one-off data curation)";
/** 公開インスタンスの作法。詰めないこと。 */
const DELAY_MS = 1200;

export interface PhotonHit {
  lat: number;
  lng: number;
  /** OSM 上の名前。タイトルとの突き合わせに使う。 */
  name: string;
  /** 州・都道府県。無いことがある。 */
  state: string;
  /** ISO 3166-1 alpha-2(大文字)。 */
  countryCode: string;
}

const cache = new Map<string, PhotonHit | null>();

/** 検索語を組み立てる。装飾を落として、場所らしい部分だけ残す。 */
export function photonQuery(title: string): string {
  return title
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, " ")
    .replace(/【[^】]*】|［[^］]*］|\([^)]*\)|（[^）]*）/g, " ")
    .replace(/\b(live|livestream|webcam|web ?cam|cam|camera|stream|24\s*\/\s*7|4k|uhd|hd|ptz)\b/gi, " ")
    .replace(/\d{1,2}[./]\d{1,2}[./]\d{2,4}/g, " ")
    .replace(/[|｜/／・#]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 90);
}

export async function photonLookup(title: string): Promise<PhotonHit | null> {
  const q = photonQuery(title);
  if (q.length < 3) return null;
  if (cache.has(q)) return cache.get(q)!;

  await new Promise((r) => setTimeout(r, DELAY_MS));
  try {
    const url = `${ENDPOINT}?q=${encodeURIComponent(q)}&limit=1`;
    const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
    if (!res.ok) {
      cache.set(q, null);
      return null;
    }
    const json = (await res.json()) as {
      features?: {
        geometry?: { coordinates?: [number, number] };
        properties?: { name?: string; state?: string; countrycode?: string };
      }[];
    };
    const feature = json.features?.[0];
    const coords = feature?.geometry?.coordinates;
    if (feature === undefined || coords === undefined) {
      cache.set(q, null);
      return null;
    }
    const [lng, lat] = coords;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      cache.set(q, null);
      return null;
    }
    const hit: PhotonHit = {
      lat: Number(lat.toFixed(4)),
      lng: Number(lng.toFixed(4)),
      name: feature.properties?.name ?? "",
      state: feature.properties?.state ?? "",
      countryCode: (feature.properties?.countrycode ?? "").toUpperCase(),
    };
    cache.set(q, hit);
    return hit;
  } catch {
    return null;
  }
}
