import { defineConfig, type Plugin } from "vite";
import { CAMS } from "./src/data/cams";

/**
 * カメラのマスタを JS ではなく静的な JSON として配る。
 *
 * 5,720 台をバンドルに同梱すると、それだけでメインの JS が 2.6MB になる。
 * 地図はその JS を全部読んで実行し終わるまで作られないので、タイル(LCP の
 * 対象)が出るのが数秒遅れていた。JSON に切り出せば地図は即座に出て、
 * ピンだけが少し遅れて乗る。JSON は実行を伴わないぶん読むのも速い。
 *
 * 正本は src/data/cams.ts のままで、ここはその写しを出すだけ。
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
    // 生存状態は Worker が返すので、開発サーバー単体では存在しない。
    // 借りてこないと「配信中だけ」も「視聴が多い順」も常に 0 件になる。
    proxy: {
      "/api": {
        target: "https://somewhere-now.saitotakuya0719.workers.dev",
        changeOrigin: true,
      },
    },
  },
});
