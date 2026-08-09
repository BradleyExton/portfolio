export { pieces, svg } from "../styles";

export const cursor = "iso-loop-blink";
export const bobDiamond = "iso-loop-bob [--iso-bob-duration:3.4s] [--iso-bob-y:-7px]";
export const twinkleA = "iso-loop-tw [--iso-tw-duration:2.6s]";
export const twinkleB = "iso-loop-tw [--iso-tw-duration:2.6s] [--iso-tw-delay:-1.3s]";

// The spec beat is three bars: he writes for two, then looks round for one. The
// line on the doc rides the same clock as the head and the pen, so it finishes
// just as he looks up.
export const typeLine = "iso-loop-type";

// The page itself, moving a notch per flick of the hand he keeps on it. The
// rows carry on past the foot of the sheet so there is something below the fold
// for the scroll to bring up.
export const docScroll = "iso-loop-doc-scroll [--iso-doc-scroll-y:-5px]";
