import { readFileSync } from "node:fs";

// Guards for Cumulative Layout Shift on first load. Both regressions were invisible in unit
// tests and only showed up in Lighthouse on a phone (CLS 0.128, 2026-09-29).
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const app = readFileSync(new URL("../app.ts", import.meta.url), "utf8");

describe("the hidden attribute in styles.css", () => {
  // A component rule that sets display (e.g. `.wall { display: grid }`) beats the UA's
  // `[hidden] { display: none }`, so an element the app has "hidden" stays laid out.
  it("is forced to display: none with !important", () => {
    expect(css).toMatch(/\[hidden\]\s*\{\s*display:\s*none\s*!important;?\s*\}/);
  });

  it("is not reversed anywhere by a display rule that also uses !important", () => {
    const important = css.match(/display:\s*[a-z-]+\s*!important/g) ?? [];
    expect(important).toEqual(["display: none !important"]);
  });
});

describe("content below the masthead before the first render", () => {
  // The masthead chips are built by JS and make the masthead taller, so anything painted
  // under it before that moment gets pushed down.
  it("is kept invisible until the app is ready", () => {
    expect(css).toMatch(
      /\.app:not\(\[data-ready\]\)\s*>\s*:not\(\.masthead\)\s*\{\s*visibility:\s*hidden;?\s*\}/,
    );
  });

  it("is revealed right after the first render, in the same task", () => {
    expect(app).toMatch(/\n {2}render\(\);\n(?: {2}\/\/.*\n)* {2}root\.dataset\["ready"\] = "";\n/);
  });
});
