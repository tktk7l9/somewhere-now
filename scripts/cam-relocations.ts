// Bulk-imported cameras the importer placed in the wrong country or on a coarse pin. The stream's
// own title names the place, so the id stays (shared links and favourites keep working) and only
// the position changes. build-cams.ts applies this after the bulk table, so a rerun of the importer
// cannot undo it.
//
// `place` goes through Open-Meteo like a curated entry. `at` is for what Open-Meteo does not know
// (volcanoes, bays, lodges); those coordinates come from Photon (OSM), named in `from`. A title
// that names only a country is resolved from the stream description on the watch page when that
// names the place, and `from` says so. When neither the title nor the watch page names a place a
// geocoder knows, the camera stays out: see AGENTS.md, a place that cannot be resolved is not
// filled in with an approximation.

import type { CamCategory } from "../src/domain/cams";
import type { PlaceQuery } from "./cam-places.ts";

export interface CamRelocation {
  id: string;
  place?: PlaceQuery;
  at?: { lat: number; lng: number; timeZone: string; country: string };
  /**
   * The evidence for the move. With `at` it starts with the Photon hit behind the coordinates;
   * "watch page:" quotes the stream description, "channel:" the uploader.
   */
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
  // ── 2026-11-02: the importer's country contradicted the title, the channel or the watch page ──
  { id: "tz-camelthorn-waterhole-live-zebra-migra", at: { lat: -20.6496, lng: 24.4077, timeZone: "Africa/Gaborone", country: "BW" }, from: "Photon: Boteti; watch page: \"a vital waterhole on the Boteti River in Botswana's Makgadikgadi region\"", category: WILD },
  { id: "za-kalahari-salt-pan-conservation-live-c", at: { lat: -20.5108, lng: 24.8106, timeZone: "Africa/Gaborone", country: "BW" }, from: "Photon: Makgadikgadi Pans National Park; watch page: \"the vast Makgadikgadi Pans near Jack's Camp, Botswana\"", category: WILD },
  { id: "no-live-aurora-camera-northern-lights-yu", place: { name: "Whitehorse", countryCode: "CA", admin1: "Yukon" }, from: "watch page: \"Live from Kaleido Lodge in Whitehorse, Yukon, Canada\"", category: "nature" },
  { id: "us-live-sea-lion-beach-british-columbia", at: { lat: 50.5726, lng: -126.7459, timeZone: "America/Vancouver", country: "CA" }, from: "Photon: Hanson Island, British Columbia; watch page: \"The rocky beach of British Columbia's Hanson Island\"", category: WILD },
  { id: "no-live-arctic-tundra-cape-south-wapusk", at: { lat: 57.951, lng: -93.3349, timeZone: "America/Winnipeg", country: "CA" }, from: "Photon: Wapusk National Park, Manitoba; title", category: "nature" },
  { id: "pt-live-lisbon-falls-relaxing-waterfall", at: { lat: -24.8607, lng: 30.8355, timeZone: "Africa/Johannesburg", country: "ZA" }, from: "Photon: Lisbon Falls, Mpumalanga; watch page: \"the highest waterfalls in Mpumalanga, South Africa\"", category: "nature" },
  { id: "us-lisbon-falls-relaxing-live-stream-ful", at: { lat: -24.8607, lng: 30.8355, timeZone: "Africa/Johannesburg", country: "ZA" }, from: "Photon: Lisbon Falls, Mpumalanga; watch page: \"the heart of the waterfall area of Mpumalanga\"", category: "nature" },
  { id: "za-live-from-the-serengeti-wildlife-safa", at: { lat: -2.3713, lng: 34.6984, timeZone: "Africa/Dar_es_Salaam", country: "TZ" }, from: "Photon: Serengeti National Park; watch page: \"Streaming straight from the iconic Serengeti National Park\"", category: WILD },
  { id: "za-live-from-lentorre-kenya-live-wildlif", at: { lat: -1.8598, lng: 36.1505, timeZone: "Africa/Nairobi", country: "KE" }, from: "Photon: Olkirimatian, Kajiado County; watch page: \"Lentorre Lodge is located in the Kenyan Olkirimatian Conservancy\"", category: WILD },
  { id: "za-live-from-tortilis-camp-amboseli-wate", at: { lat: -2.6829, lng: 37.1822, timeZone: "Africa/Nairobi", country: "KE" }, from: "Photon: Elewana Tortilis Camp Amboseli; watch page: \"your window into the heart of Amboseli, Kenya\"", category: WILD },
  { id: "za-live-mara-river-main-crossing-masai-m", place: { name: "Maasai Mara Airport", countryCode: "KE" }, from: "title: Masai Mara", category: WILD },
  { id: "za-live-fig-tree-crossing-masai-mara-gre", place: { name: "Maasai Mara Airport", countryCode: "KE" }, from: "title: Masai Mara", category: WILD },
  { id: "za-wilderness-linkwasha-live-cam-hwange", place: { name: "Hwange National Park", countryCode: "ZW" }, from: "title: Hwange", category: WILD },
  { id: "id-seychelles-ocean-4k-live-24-7-wild-be", at: { lat: -4.3921, lng: 55.244, timeZone: "Indian/Mahe", country: "SC" }, from: "Photon: North Island, Seychelles; watch page: \"the peaceful beauty of North Island, Seychelles\"", category: "nature" },
  { id: "fr-ocean-ambience-4k-live-24-7-tropical", at: { lat: 5.3599, lng: 72.9194, timeZone: "Indian/Maldives", country: "MV" }, from: "Photon: InterContinental Maldives Resort; title", category: "nature" },
  { id: "us-ocean-ambience-live-24-7-tropical-bea", at: { lat: 5.8311, lng: 73.2094, timeZone: "Indian/Maldives", country: "MV" }, from: "Photon: Velaa Private Island; title", category: "nature" },
  { id: "it-bora-bora-8k-aerial-overwater-bungalo", place: { name: "Bora Bora", countryCode: "PF" }, from: "title", category: "nature" },
  { id: "za-france-24-english-live-international", place: { name: "Paris", countryCode: "FR", admin1: "Île-de-France Region" }, from: "watch page: \"broadcasted from Paris, France\"" },
  { id: "ar-earthcam-live-sitka-alaska", place: { name: "Sitka", countryCode: "US", admin1: "Alaska" }, from: "title" },
  { id: "au-fairbanks-aurora-camera-powered-by-ex", place: { name: "Fairbanks", countryCode: "US", admin1: "Alaska" }, from: "title", category: "nature" },
  { id: "it-sombrero-beach-live-webcam-marathon-f", place: { name: "Marathon", countryCode: "US", admin1: "Florida" }, from: "title: Marathon, Florida Keys", category: "nature" },
  { id: "tz-stock-island-waterfront-live-webcam-l", place: { name: "Stock Island", countryCode: "US", admin1: "Florida" }, from: "title: Lower Keys, Florida Keys", category: "harbor" },
  { id: "ca-4klive-cam-daytona-beach-live-cam-lif", place: { name: "Daytona Beach", countryCode: "US", admin1: "Florida" }, from: "title" },
  { id: "mo-live-earthquake-information-raspberry", place: { name: "Chino Hills", countryCode: "US", admin1: "California" }, from: "title" },
  { id: "au-nyc-live-cam-brooklyn-bridge-manhatta", place: { name: "New York City", countryCode: "US", admin1: "New York" }, from: "title" },
  { id: "de-re-live-new-york-planespotting-with-h", at: { lat: 40.6429, lng: -73.7794, timeZone: "America/New_York", country: "US" }, from: "Photon: John F. Kennedy International Airport; title: (JFK)", category: "airport" },
  { id: "ch-cog-railway-and-mount-washington-obse", at: { lat: 44.2704, lng: -71.3025, timeZone: "America/New_York", country: "US" }, from: "Photon: Mount Washington Cog Railway, New Hampshire; title", category: "railway" },
  { id: "za-mokan-railcams-springfield-missouri-b", place: { name: "Springfield", countryCode: "US", admin1: "Missouri" }, from: "title", category: "railway" },
  { id: "de-live-greater-nevada-field-camera", at: { lat: 39.5288, lng: -119.8091, timeZone: "America/Los_Angeles", country: "US" }, from: "Photon: Greater Nevada Field, Nevada; title" },
  { id: "au-jackson-hole-golf-tennis-live-cam-see", at: { lat: 43.5672, lng: -110.7484, timeZone: "America/Denver", country: "US" }, from: "Photon: Jackson Hole Golf & Tennis Club, Wyoming; title" },
  { id: "jp-denver-city-camera-sponsored-by-boese", place: { name: "Greenwood Village", countryCode: "US", admin1: "Colorado" }, from: "watch page: \"the live view of downtown Denver, CO from our office building in Greenwood Village\"" },
  { id: "ar-mendota-union-depot-railroad-museum-m", place: { name: "Mendota", countryCode: "US", admin1: "Illinois" }, from: "title: Mendota, IL", category: "railway" },
  { id: "pl-market-square-portsmouth-nh-us", place: { name: "Portsmouth", countryCode: "US", admin1: "New Hampshire" }, from: "title: Portsmouth, NH US" },
  { id: "gb-live-24-7-manchester-nh-cemetery-broo", place: { name: "Manchester", countryCode: "US", admin1: "New Hampshire" }, from: "title: Manchester NH" },
  { id: "pl-state-street-north-live-cam", place: { name: "Newburyport", countryCode: "US", admin1: "Massachusetts" }, from: "watch page: \"the Newburyport.com State Street North Live Cam\"" },
  { id: "gr-gomv-com-martha-s-vineyard-ocean-view", place: { name: "Vineyard Haven", countryCode: "US", admin1: "Massachusetts" }, from: "watch page: \"View of the Vineyard Haven harbor\"", category: "harbor" },
  { id: "nz-wcax-sky-watch-3-camera-echo-center-f", at: { lat: 44.4766, lng: -73.221, timeZone: "America/New_York", country: "US" }, from: "Photon: ECHO Leahy Center for Lake Champlain, Vermont; title" },
  { id: "gb-newport-uk", place: { name: "Newport", countryCode: "US", admin1: "Oregon" }, from: "watch page: \"Yaquina Bay at the Oregon Coast Aquarium in Newport, Oregon\"" },
  { id: "us-netley-cam-southampton-water-shipspot", place: { name: "Netley", countryCode: "GB", admin1: "England" }, from: "title", category: "harbor" },
  { id: "dk-port-of-helsinki-west-harbour-south-c", place: { name: "Helsinki", countryCode: "FI", admin1: "Uusimaa" }, from: "title", category: "harbor" },
  { id: "tr-live-scheveningen-noord-boulevard-en", place: { name: "Scheveningen", countryCode: "NL", admin1: "South Holland" }, from: "title" },
  { id: "mx-live-noordwijk-aan-zee-boulevard-en-b", place: { name: "Noordwijk aan Zee", countryCode: "NL", admin1: "South Holland" }, from: "title" },
  { id: "au-live-ter-heijde-beach-camera", place: { name: "Ter Heijde", countryCode: "NL", admin1: "South Holland" }, from: "title" },
  { id: "de-amsterdam-stationseiland-centraal-sta", place: { name: "Amsterdam", countryCode: "NL", admin1: "North Holland" }, from: "title" },
  { id: "ch-les-arcs-livecam-arc-2000", at: { lat: 45.5721, lng: 6.8323, timeZone: "Europe/Paris", country: "FR" }, from: "Photon: Arc 2000, Auvergne-Rhône-Alpes; title" },
  { id: "jp-4k-live-cam-of-ponte-delle-guglie-ven", place: { name: "Venice", countryCode: "IT", admin1: "Veneto" }, from: "title" },
  { id: "fr-4k-live-webcam-on-grand-canal-venice", place: { name: "Venice", countryCode: "IT", admin1: "Veneto" }, from: "title" },
  { id: "us-webcam-live-lerici-venere-azzurra-sp", place: { name: "Lerici", countryCode: "IT", admin1: "Liguria" }, from: "title" },
  { id: "it-town-square-piata-sfatului-brasov-piz", place: { name: "Brasov", countryCode: "RO", admin1: "Brașov County" }, from: "title" },
  { id: "ch-sacele-panoramic-webcam-metromat-bras", place: { name: "Săcele", countryCode: "RO", admin1: "Brașov County" }, from: "title: Sacele, Brasov" },
  { id: "it-live-jerusalem-now-western-wall-real", place: { name: "Jerusalem", countryCode: "IL" }, from: "title" },
  { id: "pl-maria-s-cam-12-felve-tuna-panga-and-e", place: { name: "Davao", countryCode: "PH", admin1: "Davao Region" }, from: "title: Davao City, Philippines" },
  { id: "jp-live-cam-chaikou-snorkeling-area-2160", at: { lat: 22.6742, lng: 121.4794, timeZone: "Asia/Taipei", country: "TW" }, from: "Photon: Chaikou; title: Green Island, Taitung", category: "nature" },
  { id: "jp-live-cam-fanchuanbi-grassland-in-gree", at: { lat: 22.6563, lng: 121.4908, timeZone: "Asia/Taipei", country: "TW" }, from: "Photon: Green Island; title", category: "nature" },
  { id: "jp-live-cam-sanxiantai-2160p", at: { lat: 23.1253, lng: 121.4189, timeZone: "Asia/Taipei", country: "TW" }, from: "Photon: Sanxiantai; title", category: "nature" },
  { id: "hu-live-port-of-machico-hd-webcam-madeir", place: { name: "Machico", countryCode: "PT", admin1: "Madeira" }, from: "title", category: "harbor" },
  { id: "hu-live-paul-do-mar-webcam-24-7-o-precip", place: { name: "Paul do Mar", countryCode: "PT", admin1: "Madeira" }, from: "title" },
  // Right country, but the importer's pin is Loreto in Zacatecas, 1,000 km from the one in the title.
  { id: "mx-loreto-baja-california-sur-en-vivo", place: { name: "Loreto", countryCode: "MX", admin1: "Baja California Sur" }, from: "title" },
];
