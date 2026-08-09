// Body motion hooks. Each class pairs with a keyframe in globals.css and
// stays paused until its scene reports data-inview, so nothing animates
// off-screen. Durations are multiples of the shared 2.4s beat.
// The head has its own set, in BradHead/styles.ts.

// Writing arm: fast wrist scribble inside a slow lift that pulls the pen off
// the board for the beat he spends looking round.
export const penLift = "iso-loop-pen";
export const scribble = "iso-loop-sway [--iso-sway-duration:0.9s] [--iso-sway-deg:-9deg]";

// The other hand stays on the page and flicks it up three notches while the pen
// is off the board, then walks it back down. One notch per step, as a delta off
// the arm's resting angle — the reach itself stays an attribute on the group
// above this one. The step is small because the arm is out at full stretch: at
// that radius ten degrees at the shoulder carries the hand most of a line.
export const scrollArm = "iso-loop-scroll-hand [--iso-scroll-deg:10deg]";

// Conducting, near hand: the one beating time. A slow shoulder sweep with a
// wrist flick at twice the rate, so the nested pair traces a figure eight.
export const batonSweep = "iso-loop-baton";
export const batonFlick = "iso-loop-baton-flick";

// Conducting, far hand: the shaping hand, which in real conducting does not
// beat time with the other. Same rig on double the bar and an inverted arc, so
// the two batons never fall into mirror image — a symmetric pair reads as one
// bar being worked by a puppeteer rather than as two hands doing two jobs. The
// flick sits inside the sweep, so it inherits the doubled --iso-beat and lands
// back on the scene's 2.4s; only its phase has to be set here.
// A narrower arc than the beating hand's, on top of the extra lift its resting
// angle already carries, so the shaping hand stays the higher of the two.
export const cueSweep =
  "iso-loop-baton [--iso-beat:4.8s] [--iso-baton-from:-8deg] [--iso-baton-to:20deg]";
export const cueFlick = "iso-loop-baton-flick [--iso-flick-delay:-1.2s]";

// Magnifier arm sweeps across the gate posts and back; the lens counter-turns
// so it stays upright through the pass.
export const inspectArm = "iso-loop-inspect [--iso-inspect-deg:52deg]";
export const inspectCounter = "iso-loop-inspect-counter [--iso-inspect-deg:52deg]";
