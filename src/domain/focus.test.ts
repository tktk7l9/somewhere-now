import { focusWasLost } from "./focus";

describe("focusWasLost", () => {
  const body = { isConnected: true };

  it("is true when nothing is focused", () => {
    expect(focusWasLost(null, body)).toBe(true);
  });

  it("is true when focus fell back to the body", () => {
    expect(focusWasLost(body, body)).toBe(true);
  });

  it("is true when the focused element was removed from the page", () => {
    expect(focusWasLost({ isConnected: false }, body)).toBe(true);
  });

  it("is false while the user is on a control that is still there", () => {
    expect(focusWasLost({ isConnected: true }, body)).toBe(false);
  });
});
