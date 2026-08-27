import type { CamState } from "../domain/cams";
import type { Lang } from "../domain/weather";
import { t } from "./i18n";

/** 平面図と地球儀で同じピンを出す。 */
export function pinHtml(status: CamState["status"] | undefined, selected: boolean): string {
  const classes = ["pin"];
  if (status === "live") classes.push("pin--live");
  else if (status === "offline" || status === "blocked") classes.push("pin--offline");
  if (selected) classes.push("pin--selected");
  return `<span class="${classes.join(" ")}"></span>`;
}

const LEGEND: readonly {
  status: CamState["status"] | undefined;
  label: "statusLive" | "pinOff";
}[] = [
  { status: "live", label: "statusLive" },
  { status: undefined, label: "pinOff" },
];

/** 地図上のピンと同じ見た目で、色の意味を並べる。 */
export function mountPinLegend(container: HTMLElement, lang: Lang): void {
  container.replaceChildren();
  container.setAttribute("role", "note");
  container.setAttribute("aria-label", t("pinLegendAria", lang));
  for (const row of LEGEND) {
    const item = document.createElement("span");
    item.className = "legend__item";
    item.insertAdjacentHTML("afterbegin", pinHtml(row.status, false));
    item.querySelector(".pin")?.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = t(row.label, lang);
    item.append(label);
    container.append(item);
  }
}
