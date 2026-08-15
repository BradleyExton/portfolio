// The assemble/piece classes are shared across the three scenes; the dlv set
// is this scene's own 9.6s journey timeline, defined in globals.css because
// inline SVG <style> is document-global.
export * from "../styles";

export const dlv = {
  cardA: "iso-dlv-card-a",
  shadowA: "iso-dlv-shadow-a",
  faceSpec: "iso-dlv-face-spec",
  faceBuild: "iso-dlv-face-build",
  faceShip: "iso-dlv-face-ship",
  progressA: "iso-dlv-progress-a",
  checkA: "iso-dlv-check-a",
  ringA: "iso-dlv-ring-a",
  prodRing: "iso-dlv-prod-ring",
  users: ["iso-dlv-user-a", "iso-dlv-user-b", "iso-dlv-user-c"],
  nextA: "iso-dlv-next-a",
  cardB: "iso-dlv-card-b",
  shadowB: "iso-dlv-shadow-b",
  wiggle: "iso-dlv-wiggle",
  badge: "iso-dlv-badge",
  progressB: "iso-dlv-progress-b",
  checkB: "iso-dlv-check-b",
  nextB: "iso-dlv-next-b",
  ghostB: "iso-dlv-ghost-b",
  counts: ["iso-dlv-count-0", "iso-dlv-count-1", "iso-dlv-count-2"],
} as const;
