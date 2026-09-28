// Where keyboard focus stands after the element that held it went away.
//
// Closing a camera removes the very button that was pressed, so focus falls back to <body>.
// A keyboard user then starts over from the top of the page and cannot reach the undo in the
// notice before it fades (SHIG 54, 94). Only in that case may the notice take focus; it never
// pulls focus away from anything the user is still on.

/** The minimum of an Element this needs. */
interface Focusable {
  isConnected: boolean;
}

/** True when nothing meaningful holds focus: no element, the page body, or a detached node. */
export function focusWasLost(active: Focusable | null, body: Focusable | null): boolean {
  return active === null || active === body || !active.isConnected;
}
