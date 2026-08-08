export { pieces, svg } from "../styles";

export const packetA = "iso-loop-pulse [--iso-pulse-x:86.6px] [--iso-pulse-y:15px] [--iso-pulse-duration:3s]";
export const packetB = "iso-loop-pulse [--iso-pulse-x:-60.6px] [--iso-pulse-y:32.5px] [--iso-pulse-duration:3.4s] [--iso-pulse-delay:-1.1s]";
export const packetC = "iso-loop-pulse [--iso-pulse-x:5.2px] [--iso-pulse-y:33px] [--iso-pulse-duration:2.7s] [--iso-pulse-delay:-0.6s]";
export const bobDiamond = "iso-loop-bob";

// Two bars per handoff. The travel vector is the gap from the crate's resting
// spot in his hands at (-20,119.4) to the store's top face at (56.3,122.5);
// the arms, the lean, and the slot flare all share the duration so lift,
// carry, and landing stay in step.
export const crate = "iso-loop-carry [--iso-carry-x:76.3px] [--iso-carry-y:3.1px]";
export const loadPulse = "iso-loop-load-pulse";
export const lean = "iso-loop-lean [--iso-lean-deg:6deg]";
