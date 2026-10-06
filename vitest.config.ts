import { defineConfig } from "vitest/config";

// The pure logic layer (astronomy calculations, domain, the Worker's API client and update
// algorithm) stays at 100%.
const PURE_GLOBS = [
  "src/astro/**/*.ts",
  "src/domain/**/*.ts",
  "worker/youtube.ts",
  "worker/refresh.ts",
  "worker/schedule.ts",
];

// The DOM layer, tested in jsdom with Testing Library (files opt in with
// `// @vitest-environment jsdom`). Each threshold sits 2 points under what the suite reached
// (2026-09-30), so a real gap fails CI but a harmless refactor does not.
const UI_THRESHOLDS = {
  "src/app.ts": { statements: 95, branches: 86, functions: 96, lines: 96 },
  "src/api/**/*.ts": { statements: 98, branches: 98, functions: 98, lines: 98 },
  "src/ui/**/*.ts": { statements: 97, branches: 95, functions: 98, lines: 98 },
};

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "worker/**/*.test.ts", "scripts/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: [...PURE_GLOBS, ...Object.keys(UI_THRESHOLDS)],
      exclude: [
        "src/**/*.test.ts",
        "worker/**/*.test.ts",
        "src/**/__fixtures__/**",
        // Leaflet and MapLibre draw on canvas / WebGL, which jsdom cannot render. app.test.ts
        // replaces both with recording fakes; check these two in a real browser.
        "src/ui/map.ts",
        "src/ui/globe.ts",
      ],
      reporter: ["text", "json-summary", "html"],
      thresholds: Object.fromEntries([
        ...PURE_GLOBS.map((glob) => [
          glob,
          { statements: 100, branches: 100, functions: 100, lines: 100 },
        ]),
        ...Object.entries(UI_THRESHOLDS),
      ]),
    },
  },
});
