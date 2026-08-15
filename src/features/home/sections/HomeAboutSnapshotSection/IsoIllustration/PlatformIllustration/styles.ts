// The assemble/piece classes are shared across the three scenes; the plt set
// is this scene's own 9.6s journey timeline, defined in globals.css because
// inline SVG <style> is document-global.
export * from "../styles";

export const plt = {
  req: "iso-plt-req",
  fanCard: "iso-plt-fan-card",
  fanCloud: "iso-plt-fan-cloud",
  fanDb: "iso-plt-fan-db",
  resp: "iso-plt-resp",
  // Half-loop offset twin: with one of these on every travel class, a request
  // is always somewhere in the system.
  echo: "iso-plt-echo",
  gateLamp: "iso-plt-gate-lamp",
  socketPulse: "iso-plt-socket-pulse",
  lampCard: "iso-plt-lamp-card",
  lampCloud: "iso-plt-lamp-cloud",
  lampDb: "iso-plt-lamp-db",
  clientCheck: "iso-plt-client-check",
  alert: "iso-plt-alert",
  wiggle: "iso-plt-wiggle",
  resolve: "iso-plt-resolve",
  graph: "iso-plt-graph",
  chip: "iso-plt-chip",
} as const;
