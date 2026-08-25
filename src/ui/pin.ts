import type { CamState } from "../domain/cams";

/** 平面図と地球儀で同じピンを出す。 */
export function pinHtml(status: CamState["status"] | undefined, selected: boolean): string {
  const classes = ["pin"];
  if (status === "live") classes.push("pin--live");
  else if (status === "offline" || status === "blocked") classes.push("pin--offline");
  if (selected) classes.push("pin--selected");
  return `<span class="${classes.join(" ")}"></span>`;
}
