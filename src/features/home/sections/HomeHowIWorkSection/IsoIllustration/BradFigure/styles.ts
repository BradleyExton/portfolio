// Body motion hooks. Each class pairs with a keyframe in globals.css and
// stays paused until its scene reports data-inview, so nothing animates
// off-screen. Durations are multiples of the shared 2.4s beat.
// The head has its own set, in BradHead/styles.ts.

// Writing arm: fast wrist scribble inside a slow lift that pulls the pen off
// the board for the beat he spends looking round.
export const penLift = "iso-loop-pen";
export const scribble = "iso-loop-sway [--iso-sway-duration:0.9s] [--iso-sway-deg:-9deg]";

// Conducting, near hand: the one beating time. A slow shoulder sweep with a
// wrist flick at twice the rate, so the nested pair traces a figure eight.
// The sweep is narrower than the keyframe default: at -20deg the upper arm
// passed through horizontal and the bent rig straightened into a pointing
// rod for the outer beat of every bar.
export const batonSweep = "iso-loop-baton [--iso-baton-from:-12deg] [--iso-baton-to:16deg]";
export const batonFlick = "iso-loop-baton-flick";

// Conducting, far hand: the open shaping hand, which in real conducting does
// not beat time with the other. A drift, not a beat: a shallow arc on double
// the bar at the shoulder, and a smaller counter-breath at the elbow. The
// elbow sits inside the sweep, so it inherits the doubled --iso-beat and its
// half-rate flick lands back on the scene's 2.4s; only phase and amplitude
// are set here. Anything wider, or in phase with the baton, pulls the two
// arms back toward the symmetric semaphore this hand exists to break.
export const shapeSweep =
  "iso-loop-baton [--iso-beat:4.8s] [--iso-baton-from:-4deg] [--iso-baton-to:9deg]";
export const shapeFloat =
  "iso-loop-baton-flick [--iso-beat:4.8s] [--iso-flick-delay:-1.2s] [--iso-flick-deg:5deg]";

// Magnifier arm sweeps across the gate posts and back; the lens counter-turns
// so it stays upright through the pass.
export const inspectArm = "iso-loop-inspect [--iso-inspect-deg:52deg]";
export const inspectCounter = "iso-loop-inspect-counter [--iso-inspect-deg:52deg]";
