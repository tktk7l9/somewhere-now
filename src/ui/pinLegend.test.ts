// @vitest-environment jsdom
import { screen, within } from "@testing-library/dom";

import { mountPinLegend } from "./pin";

describe("mountPinLegend", () => {
  it("lists live and off-air with the same pins as the map, replacing old content", () => {
    document.body.replaceChildren();
    const legend = document.createElement("div");
    legend.append(document.createElement("span"));
    document.body.append(legend);

    mountPinLegend(legend, "en");

    const note = screen.getByRole("note", { name: "Pin colors. Amber is live, black is off air." });
    const items = [...note.querySelectorAll(".legend__item")];
    expect(items.map((item) => item.textContent)).toEqual(["Live", "Off air"]);
    expect(items[0]!.querySelector(".pin--live")?.getAttribute("aria-hidden")).toBe("true");
    expect(items[1]!.querySelector(".pin")?.className).toBe("pin");

    mountPinLegend(legend, "ja");
    expect(within(legend).getByText("配信中")).toBeTruthy();
    expect(legend.querySelectorAll(".legend__item")).toHaveLength(2);
  });
});
