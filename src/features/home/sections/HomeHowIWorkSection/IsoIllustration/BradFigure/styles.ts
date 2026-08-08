// Body motion hooks. Each class pairs with a keyframe in globals.css and
// stays paused until its scene reports data-inview, so nothing animates
// off-screen. Durations are multiples of the shared 2.4s beat.
// The head has its own set, in BradHead/styles.ts.

// Writing arm: fast wrist scribble inside a slow lift that pulls the pen off
// the board for the beat he spends glancing over his shoulder.
export const penLift = "iso-loop-pen";
export const scribble = "iso-loop-sway [--iso-sway-duration:0.9s] [--iso-sway-deg:-9deg]";

// Conducting: a slow shoulder sweep with a wrist flick at twice the rate, so
// the nested pair traces a figure eight.
export const batonSweep = "iso-loop-baton";
export const batonFlick = "iso-loop-baton-flick";
export const cueArm = "iso-loop-cue";

// Loading the context line: each joint sweeps reach -> carry -> release -> reach
// on the scene's carry bar. Values are deltas off the carry angles the arms are
// drawn in, so all four rest on the same pose and a still shows a man holding a
// crate. The forearms travel further than the shoulders, which is the part that
// reads as folding a box in rather than swinging a limb at it.
export const liftArmL = "iso-loop-lift-arm-l";
export const liftForeL = "iso-loop-lift-fore-l";
export const liftArmR = "iso-loop-lift-arm-r";
export const liftForeR = "iso-loop-lift-fore-r";

// Magnifier arm sweeps across the gate posts and back; the lens counter-turns
// so it stays upright through the pass.
export const inspectArm = "iso-loop-inspect [--iso-inspect-deg:52deg]";
export const inspectCounter = "iso-loop-inspect-counter [--iso-inspect-deg:52deg]";
