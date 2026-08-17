// The assemble/piece classes are shared across the three scenes; the fnt set
// is this scene's own 9.6s render-pass timeline, defined in globals.css
// because inline SVG <style> is document-global.
export * from "../styles";

// The token chips share one bob and stagger by phase, so the rail breathes
// as a group without the three ever moving in lockstep.
export const chipFloat = [
  "iso-loop-bob [--iso-bob-duration:4.8s] [--iso-bob-y:-4.5px]",
  "iso-loop-bob [--iso-bob-duration:4.8s] [--iso-bob-y:-4.5px] [--iso-bob-delay:-1.6s]",
  "iso-loop-bob [--iso-bob-duration:4.8s] [--iso-bob-y:-4.5px] [--iso-bob-delay:-3.2s]",
] as const;

// Ambient dev-server traffic on the two solid wires, echo-twinned a half
// period apart so a pulse is always mid-route and the system reads live
// between story beats. Deltas are the wires' screen-space runs; the two
// routes are phase-shifted against each other so they never sync up.
export const hmrRail = [
  "iso-loop-pulse [--iso-pulse-x:-185.3px] [--iso-pulse-y:98px] [--iso-pulse-duration:4.8s]",
  "iso-loop-pulse [--iso-pulse-x:-185.3px] [--iso-pulse-y:98px] [--iso-pulse-duration:4.8s] [--iso-pulse-delay:-2.4s]",
] as const;
export const hmrSync = [
  "iso-loop-pulse [--iso-pulse-x:316.1px] [--iso-pulse-y:17.5px] [--iso-pulse-duration:4.8s] [--iso-pulse-delay:-1.2s]",
  "iso-loop-pulse [--iso-pulse-x:316.1px] [--iso-pulse-y:17.5px] [--iso-pulse-duration:4.8s] [--iso-pulse-delay:-3.6s]",
] as const;

// Skeleton shimmer stagger, top of the page to the bottom.
export const shimmer = [
  "iso-fnt-shimmer",
  "iso-fnt-shimmer [--iso-shim-delay:0.18s]",
  "iso-fnt-shimmer [--iso-shim-delay:0.36s]",
  "iso-fnt-shimmer [--iso-shim-delay:0.54s]",
  "iso-fnt-shimmer [--iso-shim-delay:0.72s]",
] as const;

export const fnt = {
  skel: "iso-fnt-skel",
  contentA: "iso-fnt-content-a",
  contentB: "iso-fnt-content-b",
  bOk: "iso-fnt-b-ok",
  bErr: "iso-fnt-b-err",
  bSkel: "iso-fnt-b-skel",
  badge: "iso-fnt-badge",
  cursor: "iso-fnt-cursor",
  ringA: "iso-fnt-ring-a",
  ringErr: "iso-fnt-ring-err",
  ringOk: "iso-fnt-ring-ok",
  runU: "iso-fnt-run-u",
  fillU: "iso-fnt-fill-u",
  checkU: "iso-fnt-check-u",
  runC: "iso-fnt-run-c",
  fillC: "iso-fnt-fill-c",
  checkC: "iso-fnt-check-c",
  runE: "iso-fnt-run-e",
  failE: "iso-fnt-fail-e",
  fillE: "iso-fnt-fill-e",
  checkE: "iso-fnt-check-e",
  suiteRing: "iso-fnt-suite-ring",
  fixRail: "iso-fnt-fix-rail",
  errWiggle: "iso-fnt-err-wiggle",
  swatch: "iso-fnt-swatch",
  sync: "iso-fnt-sync",
  watch: "iso-fnt-watch",
  pLoad: "iso-fnt-p-load",
  pOk: "iso-fnt-p-ok",
  pSkel: "iso-fnt-p-skel",
  pRing: "iso-fnt-p-ring",
} as const;
