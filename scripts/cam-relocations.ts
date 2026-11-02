// Bulk-imported cameras the importer placed in the wrong country or on a coarse pin. The stream's
// own title names the place, so the id stays (shared links and favourites keep working) and only
// the position changes. build-cams.ts applies this after the bulk table, so a rerun of the importer
// cannot undo it.
//
// `place` goes through Open-Meteo like a curated entry. `at` is for what Open-Meteo does not know
// (volcanoes, bays, lodges); those coordinates come from Photon (OSM), named in `from`. A title
// that names only a country, or a place neither geocoder knows, stays out: see AGENTS.md, a place
// that cannot be resolved is not filled in with an approximation.

import type { CamCategory } from "../src/domain/cams";
import type { PlaceQuery } from "./cam-places.ts";

export interface CamRelocation {
  id: string;
  place?: PlaceQuery;
  at?: { lat: number; lng: number; timeZone: string; country: string };
  /** The geocoder hit behind `at`. */
  from?: string;
  /** The importer guessed "city" for a good many wildlife cameras. */
  category?: CamCategory;
}

const WILD: CamCategory = "animal";

export const CAM_RELOCATIONS: CamRelocation[] = [
  { id: "pl-minsk-belarus-online-camera-on-storoz", place: { name: "Minsk", countryCode: "BY", admin1: "Minsk City" } },
  { id: "ca-live-now-24-7-fuego-volcano-eruption", at: { lat: 14.4741, lng: -90.8807, timeZone: "America/Guatemala", country: "GT" }, from: "Photon: Volcán de Fuego", category: "volcano" },
  { id: "us-live-members-only-santa-maria-santiag", at: { lat: 14.7419, lng: -91.569, timeZone: "America/Guatemala", country: "GT" }, from: "Photon: Santiaguito", category: "volcano" },
  { id: "us-live-now-24-7-erupting-popocatepetl-v", place: { name: "San Pedro Benito Juárez", countryCode: "MX", admin1: "Puebla" }, category: "volcano" },
  { id: "us-live-members-only-popocatepetl-volcan", place: { name: "San Pedro Benito Juárez", countryCode: "MX", admin1: "Puebla" }, category: "volcano" },
  { id: "us-live-now-24-7-erupting-popocatepe-2", place: { name: "San Matías Tlalancaleca", countryCode: "MX", admin1: "Puebla" }, category: "volcano" },
  { id: "us-live-now-24-7-kanlaon-volcano-in-the", at: { lat: 10.4097, lng: 123.1306, timeZone: "Asia/Manila", country: "PH" }, from: "Photon: Kanlaon", category: "volcano" },
  { id: "us-live-members-only-sangay-volcano-and", at: { lat: -2.0049, lng: -78.3417, timeZone: "America/Guayaquil", country: "EC" }, from: "Photon: Sangay", category: "volcano" },
  { id: "vn-philippines-live-camera-bankerohan-da", place: { name: "Davao", countryCode: "PH", admin1: "Davao Region" } },
  { id: "kr-philippines-live-camera-lyn-s-samgyup", place: { name: "Davao", countryCode: "PH", admin1: "Davao Region" } },
  { id: "pl-maria-s-cam-12a-street-view-of-ubalde", place: { name: "Davao", countryCode: "PH", admin1: "Davao Region" } },
  { id: "pl-philippines-live-camera-bankerohan-ma", place: { name: "Davao", countryCode: "PH", admin1: "Davao Region" } },
  { id: "jp-24-nepal-katmandu-live-camera", place: { name: "Kathmandu", countryCode: "NP", admin1: "Bagmati Province" } },
  { id: "cn-live-taiwan-taoyuan-int-l-airport-rct", place: { name: "Taoyuan", countryCode: "TW" }, category: "airport" },
  { id: "kr-4k-live-eryanping-trail-in-alishan-ta", place: { name: "Alishan", countryCode: "TW" }, category: "nature" },
  { id: "hu-live-safari-webcam-maasai-mara-kenya", place: { name: "Maasai Mara Airport", countryCode: "KE" }, category: WILD },
  { id: "za-live-from-angama-mara-maasai-mara-ken", place: { name: "Maasai Mara Airport", countryCode: "KE" }, category: WILD },
  { id: "za-mahali-mzuri-landscape-live-cam-maasa", place: { name: "Maasai Mara Airport", countryCode: "KE" }, category: WILD },
  { id: "za-mahali-mzuri-lodge-live-cam-maasai-ma", place: { name: "Maasai Mara Airport", countryCode: "KE" }, category: WILD },
  { id: "za-live-from-porini-rhino-camp-ol-pejeta", at: { lat: 0.0046, lng: 36.8601, timeZone: "Africa/Nairobi", country: "KE" }, from: "Photon: Ol Pejeta Conservancy", category: WILD },
  { id: "za-victoria-falls-safari-lodge-live-wate", place: { name: "Victoria Falls", countryCode: "ZW" }, category: WILD },
  { id: "za-live-from-deteema-springs-hwange-nati", place: { name: "Hwange National Park", countryCode: "ZW" }, category: WILD },
  { id: "za-live-wildlife-camera-at-the-hide-hwan", place: { name: "Hwange National Park", countryCode: "ZW" }, category: WILD },
  { id: "za-the-basin-live-hide-cam-by-selinda-ca", place: { name: "Selinda", countryCode: "BW" }, category: WILD },
  { id: "us-twin-pan-live-hide-cam-zarafa-camp-se", place: { name: "Selinda", countryCode: "BW" }, category: WILD },
  { id: "za-moela-safari-lodge-live-zebra-migrati", at: { lat: -20.6496, lng: 24.4077, timeZone: "Africa/Gaborone", country: "BW" }, from: "Photon: Boteti", category: WILD },
  { id: "za-safarihoek-namibia-live-wildlife-came", at: { lat: -19.2364, lng: 15.3009, timeZone: "Africa/Windhoek", country: "NA" }, from: "Photon: Etosha Heights Safarihoek Airstrip", category: WILD },
  { id: "gb-peregrine-networks-live-peregrine-fal", place: { name: "Manchester", countryCode: "US", admin1: "New Hampshire" }, category: WILD },
  { id: "gb-peregrine-networks-live-peregrine-2", place: { name: "Manchester", countryCode: "US", admin1: "New Hampshire" }, category: WILD },
  { id: "us-ramsgate-royal-harbour-live-webcam-24", place: { name: "Ramsgate", countryCode: "GB", admin1: "England" }, category: "harbor" },
  { id: "us-alum-bay-camera-scenic-the-needles-li", at: { lat: 50.6665, lng: -1.5755, timeZone: "Europe/London", country: "GB" }, from: "Photon: Alum Bay", category: "nature" },
  { id: "no-northumberland-aurora-cam-live-stream", place: { name: "Cresswell", countryCode: "GB", admin1: "England" }, category: "nature" },
  { id: "no-northumberland-aurora-cam-live-st-2", place: { name: "Embleton", countryCode: "GB", admin1: "England" }, category: "nature" },
  { id: "se-northern-light-live-kilpisjarvi-finla", place: { name: "Kilpisjärvi", countryCode: "FI" }, category: "nature" },
  { id: "no-live-arctic-nest-box-cam-24-7-birds-o", place: { name: "Sodankylä", countryCode: "FI" }, category: WILD },
  { id: "no-northern-light-live-sodankyla-finland", place: { name: "Sodankylä", countryCode: "FI" }, category: "nature" },
  { id: "no-live-24-7-nature-cam-oulu-finland-sky", place: { name: "Oulu", countryCode: "FI" }, category: "nature" },
  { id: "us-curacao-sea-aquarium-underwater-live", place: { name: "Willemstad", countryCode: "CW" }, category: WILD },
  { id: "us-uninhabited-island-klein-curacao-miss", place: { name: "Klein Curaçao", countryCode: "CW" }, category: "nature" },
  { id: "nz-wichita-kansas-usa-live-train-camera", place: { name: "Wichita", countryCode: "US", admin1: "Kansas" }, category: "railway" },
  { id: "tz-johnstown-pennsylvania-usa-live-train", place: { name: "Johnstown", countryCode: "US", admin1: "Pennsylvania" }, category: "railway" },
  { id: "ar-live-punta-arenas-chile-estrecho-de-m", place: { name: "Punta Arenas", countryCode: "CL" }, category: "harbor" },
  { id: "de-live-daily-camera-bratislava-slovakia", place: { name: "Bratislava", countryCode: "SK" } },
  { id: "ch-live-penang-webcam-weather-georgetown", place: { name: "George Town", countryCode: "MY", admin1: "Penang" } },
  { id: "hu-live-forum-machico-webcam-madeira-por", place: { name: "Machico", countryCode: "PT", admin1: "Madeira" } },
  { id: "be-live-webcam-beach-and-boulevard-barna", place: { name: "Zandvoort", countryCode: "NL" }, category: "nature" },
  { id: "us-ocean-sunset-no-ads-live-24-7-tropica", place: { name: "Félicité Island", countryCode: "SC" }, category: "nature" },
];
