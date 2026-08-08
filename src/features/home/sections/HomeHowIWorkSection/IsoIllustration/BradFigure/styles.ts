// Character motion hooks. Each class pairs with a keyframe in globals.css and
// stays paused until its scene reports data-inview, so nothing animates
// off-screen. Durations are multiples of the shared 2.4s beat.

// Head turn (spec): the skull tilts continuously while the front and 3/4 face
// drawings hard-cut between each other. All three share one duration so the
// cut always lands inside the held part of the tilt, never mid-swing.
export const headTilt = "iso-loop-look-tilt [--iso-look-deg:-10deg]";
export const faceFront = "iso-loop-face-front";
export const faceTurned = "iso-loop-face-turned";

// Same pair on the magnifier sweep's clock (gates): he looks where the lens
// goes rather than holding a stare at camera while scanning.
export const headTrack = "iso-loop-track";
export const trackFront = "iso-loop-track-front";
export const trackTurned = "iso-loop-track-turned";

// Small on-the-beat nod while conducting (agents).
export const headNod = "iso-loop-bob [--iso-bob-duration:2.4s] [--iso-bob-y:-2px]";

// Writing arm: fast wrist scribble inside a slow lift that pulls the pen off
// the board for the beats he spends looking back at camera.
export const penLift = "iso-loop-pen";
export const scribble = "iso-loop-sway [--iso-sway-duration:0.9s] [--iso-sway-deg:-9deg]";

// Conducting: a slow shoulder sweep with a wrist flick at twice the rate, so
// the nested pair traces a figure eight.
export const batonSweep = "iso-loop-baton";
export const batonFlick = "iso-loop-baton-flick";
export const cueArm = "iso-loop-cue";

// Magnifier arm sweeps across the gate posts and back; the lens counter-turns
// so it stays upright through the pass.
export const inspectArm = "iso-loop-inspect [--iso-inspect-deg:52deg]";
export const inspectCounter = "iso-loop-inspect-counter [--iso-inspect-deg:52deg]";
