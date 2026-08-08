export { pieces, svg } from "../styles";

export const bobDiamond = "iso-loop-bob [--iso-bob-duration:3.2s]";
export const packet = "iso-loop-pulse [--iso-pulse-x:34.6px] [--iso-pulse-y:20px] [--iso-pulse-duration:2.6s]";

// Three bars per pass. The delays are when the lens arrives over each post on
// its left-to-right sweep, so the caps light under the glass rather than on
// some unrelated stagger; the ticks follow the same schedule. Spelled out
// rather than generated, because Tailwind only emits arbitrary properties it
// can find as literal text in a source file.
export const gates = [
  "iso-loop-gate [--iso-gate-delay:0.7s]",
  "iso-loop-gate [--iso-gate-delay:1.4s]",
  "iso-loop-gate [--iso-gate-delay:2s]",
  "iso-loop-gate [--iso-gate-delay:2.7s]",
] as const;

export const checks = [
  "iso-loop-check [--iso-gate-delay:0.7s]",
  "iso-loop-check [--iso-gate-delay:1.4s]",
  "iso-loop-check [--iso-gate-delay:2s]",
  "iso-loop-check [--iso-gate-delay:2.7s]",
] as const;
