import { defineConfig, type Plugin } from "vite";
import { CAMS } from "./src/data/cams";

/**
 * Serves the camera master as static JSON instead of JS.
 *
 * Bundling 5,720 cameras makes the main JS 2.6MB on its own.
 * The map is not created until all of that JS has been loaded and executed, so the tiles
 * (the LCP target) appeared several seconds late. Split out into JSON, the map appears
 * immediately and only the pins land a little later. JSON involves no execution, so it
 * is also faster to read.
 *
 * The source of truth stays src/data/cams.ts; this only emits a copy of it.
 */
function camsAsset(): Plugin {
  const json = JSON.stringify(CAMS);
  const FILE = "cams.json";
  return {
    name: "cams-json",
    configureServer(server) {
      server.middlewares.use(`/${FILE}`, (_req, res) => {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(json);
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: FILE, source: json });
    },
  };
}

export default defineConfig({
  plugins: [camsAsset()],
  server: {
    // The liveness state is returned by the Worker, so it does not exist on the dev server alone.
    // Unless it is borrowed, both "配信中だけ" (Live only) and "視聴が多い順" (Most watching)
    // always show 0 items.
    proxy: {
      "/api": {
        target: "https://somewhere-now.saitotakuya0719.workers.dev",
        changeOrigin: true,
      },
    },
  },
});
