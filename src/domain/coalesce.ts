// Coalesces consecutive update requests into a single run.
//
// The map and the globe receive "state, visible targets, selection, language" through
// separate methods, so written naively one screen update redraws 4 times. With 5,720 cameras
// that factor of 4 becomes 4 times the pin creation, which freezes mobile for several seconds.
//
// A pure mechanism that does not touch the DOM, so it lives here (the layer where tests are
// mandatory).

/**
 * Returns a function that coalesces requests to run `run`. `schedule` decides the unit of
 * coalescing (default is a microtask = all requests made in the same flow of execution become 1
 * run).
 */
export function coalesced(run: () => void, schedule: (cb: () => void) => void = queueMicrotask): () => void {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    schedule(() => {
      queued = false;
      run();
    });
  };
}
