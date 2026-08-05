export { pieces, svg } from "../styles";

// The dashed "next tile" slot softly pulses while the card is active; the
// original static SVG had no loop here, this is an active-state addition.
export const slotPulse = "iso-loop-tw [--iso-tw-duration:2.6s]";
