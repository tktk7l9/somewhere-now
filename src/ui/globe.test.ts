// @vitest-environment jsdom
//
// Only the fallback is testable here: the globe itself needs WebGL, which jsdom does not have.
import { screen } from "@testing-library/dom";

import { createUnsupportedView } from "./globe";

describe("createUnsupportedView", () => {
  it("tells the user the globe cannot be shown and follows the language", () => {
    document.body.replaceChildren();
    const container = document.createElement("div");
    container.append(document.createElement("canvas"));
    document.body.append(container);

    const view = createUnsupportedView(container, "ja");
    expect(screen.getByText("このブラウザでは地球儀を表示できません。平面図に戻ってください。")).toBeTruthy();
    expect(container.querySelector("canvas")).toBeNull();

    view.setLang("en");
    expect(screen.getByText("This browser can't show the globe. Switch back to the map.")).toBeTruthy();
    expect(container.childElementCount).toBe(1);
  });

  it("accepts every view call without doing anything", () => {
    const container = document.createElement("div");
    const view = createUnsupportedView(container, "ja");
    const before = container.innerHTML;
    view.setStates(new Map());
    view.setVisible([]);
    view.setSelected([]);
    view.focus({} as never);
    view.goTo({ center: [0, 0], zoom: 2 });
    view.drawTerminator(new Date());
    view.invalidate();
    expect(container.innerHTML).toBe(before);
  });
});
