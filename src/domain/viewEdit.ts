// Closing an open camera, and taking that back.
//
// Closing stops the stream at once, and the camera was found by panning the map, so a mis-tap
// costs the whole search. Closing therefore happens without asking, and the app offers an undo
// that puts the camera back where it was (SHIG 54, 57).

export interface ClosedCam {
  camId: string;
  /** Position in the view it was closed from. 0 is the lead. */
  index: number;
}

export function closeCam(
  view: readonly string[],
  camId: string,
): { view: string[]; closed: ClosedCam | null } {
  const index = view.indexOf(camId);
  if (index === -1) return { view: [...view], closed: null };
  return { view: view.filter((id) => id !== camId), closed: { camId, index } };
}

/**
 * Puts a closed camera back at its old position. If it was opened again meanwhile it is moved
 * there; if the view shrank, it goes to the end. The upper limit drops the last one.
 */
export function reopenCam(view: readonly string[], closed: ClosedCam, max: number): string[] {
  const rest = view.filter((id) => id !== closed.camId);
  const at = Math.min(closed.index, rest.length);
  return [...rest.slice(0, at), closed.camId, ...rest.slice(at)].slice(0, max);
}
