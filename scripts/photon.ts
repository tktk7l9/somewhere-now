// The second geocoder (Photon / OSM based).
//
// Why it is needed: Open-Meteo geocoding is a dictionary of **populated places** and does
// not know facilities or features. So for "Kilauea Volcano" it returns the town called
// Kilauea on Kauai, and for "Port Miami Cruise Ship Terminals" something in Kentucky.
// Photon looks up OSM, so facilities come out (measured: it returned the right answer for both).
//
// It is not trusted on its own; it is used as one half so that a result is
// **adopted only when the 2 point to the same place** (scripts/regeocode-piles.ts).
//
// Do not raise the load on the public instance. Do not exceed 1 request per second.

const ENDPOINT = "https://photon.komoot.io/api/";
const USER_AGENT =
  "somewhere-now-cam-curation/1.0 (github.com/tktk7l9/somewhere-now; one-off data curation)";
/** Etiquette for the public instance. Do not shorten it. */
const DELAY_MS = 1200;

export interface PhotonHit {
  lat: number;
  lng: number;
  /** Name on OSM. Used for matching against the title. */
  name: string;
  /** State / prefecture. May be absent. */
  state: string;
  /** ISO 3166-1 alpha-2 (uppercase). */
  countryCode: string;
}

const cache = new Map<string, PhotonHit | null>();

/** Builds the search term. Drops decoration and keeps only the place-like part. */
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
