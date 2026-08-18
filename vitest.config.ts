import { defineConfig } from "vitest/config";

// 純ロジック層(天体計算・ドメイン・Worker の API クライアントと更新アルゴリズム)は
// 100% を維持する。UI(Leaflet / iframe / DOM)と Worker のエントリは対象外。
const PURE_GLOBS = [
  "src/astro/**/*.ts",
  "src/domain/**/*.ts",
  "worker/youtube.ts",
  "worker/refresh.ts",
];

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "worker/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: PURE_GLOBS,
      exclude: ["src/**/*.test.ts", "worker/**/*.test.ts", "src/**/__fixtures__/**"],
      reporter: ["text", "json-summary", "html"],
      thresholds: Object.fromEntries(
        PURE_GLOBS.map((glob) => [
          glob,
          { statements: 100, branches: 100, functions: 100, lines: 100 },
        ]),
      ),
    },
  },
});
