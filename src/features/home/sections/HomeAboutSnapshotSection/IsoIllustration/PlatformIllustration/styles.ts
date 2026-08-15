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
  // Telemetry sampling dots on the tap wire; delays spread four of them one
  // beat (2.4s) apart so the dashboard is never idle.
  tick: "iso-plt-tick",
  tickDelays: ["", "[--iso-tick-delay:-2.4s]", "[--iso-tick-delay:-4.8s]", "[--iso-tick-delay:-7.2s]"],
  fix: "iso-plt-fix",
  landCard: "iso-plt-land-card",
  landCloud: "iso-plt-land-cloud",
  landDb: "iso-plt-land-db",
  clientRing: "iso-plt-client-ring",
  alertRow: "iso-plt-alert-row",
  okRow: "iso-plt-ok-row",
  metric: "iso-plt-metric",
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
