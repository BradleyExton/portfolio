export { pieces, svg } from "../styles";

export const packetA = "iso-loop-pulse [--iso-pulse-x:86.6px] [--iso-pulse-y:15px] [--iso-pulse-duration:3s]";
export const packetB = "iso-loop-pulse [--iso-pulse-x:-60.6px] [--iso-pulse-y:32.5px] [--iso-pulse-duration:3.4s] [--iso-pulse-delay:-1.1s]";
export const packetC = "iso-loop-pulse [--iso-pulse-x:5.2px] [--iso-pulse-y:33px] [--iso-pulse-duration:2.7s] [--iso-pulse-delay:-0.6s]";
export const bobDiamond = "iso-loop-bob";

// One bar per crate, shared by the belt, the arms that empty it, the body and
// the store's slot flare, so pickup, carry and landing can never drift apart.
// The travel offsets live in the keyframes rather than here: they are the gaps
// between four fixed scene points (line head, his chest, the store's top face,
// and the sink below it) and mean nothing on their own.
export const liftCrate = "iso-loop-lift-crate";
export const loadPulse = "iso-loop-load-pulse";

// He turns toward the line to take a crate and toward the store to place it, so
// the lean has a sign at each end rather than one push off vertical.
export const lean = "iso-loop-lean [--iso-lean-deg:7deg] [--iso-reach-deg:-5deg]";
export const dip = "iso-loop-dip";
