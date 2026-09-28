import { defineConfig } from "vitest/config";

// The pure logic layer (astronomy calculations, domain, the Worker's API client and update
// algorithm) stays at 100%. The UI (Leaflet / iframe / DOM) and the Worker entry are excluded.
const PURE_GLOBS = [
  "src/astro/**/*.ts",
  "src/domain/**/*.ts",
  "worker/youtube.ts",
  "worker/refresh.ts",
  "worker/schedule.ts",
];

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "worker/**/*.test.ts", "scripts/**/*.test.ts"],
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
