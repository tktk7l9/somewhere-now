import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // 生存状態は Worker が返すので、開発サーバー単体では存在しない。
    // 借りてこないと「配信中のカメラ」が 0 件になり、休憩モードが動かせない。
    proxy: {
      "/api": {
        target: "https://somewhere-now.saitotakuya0719.workers.dev",
        changeOrigin: true,
      },
    },
  },
});
