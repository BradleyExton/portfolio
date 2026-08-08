export { pieces, svg } from "../styles";

// One bar per cycle. The tiles are offset by a third of the bar so they enter
// in sequence under the baton rather than pumping in unison; the negative
// delays put all three mid-phrase from the first frame.
export const beatA = "iso-loop-beat [--iso-beat-y:-10px]";
export const beatB = "iso-loop-beat [--iso-beat-y:-10px] [--iso-beat-delay:-0.8s]";
export const beatC = "iso-loop-beat [--iso-beat-y:-10px] [--iso-beat-delay:-1.6s]";
export const noteA = "iso-loop-note";
export const noteB = "iso-loop-note [--iso-beat-delay:-0.8s]";
export const noteC = "iso-loop-note [--iso-beat-delay:-1.6s]";

export const twinkleA = "iso-loop-tw";
export const twinkleB = "iso-loop-tw [--iso-tw-delay:-1.2s]";
