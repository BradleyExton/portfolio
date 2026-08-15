// The assemble/piece classes are shared across the three scenes; the fnt set
// is this scene's own 9.6s render-pass timeline, defined in globals.css
// because inline SVG <style> is document-global.
export * from "../styles";

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
} as const;
