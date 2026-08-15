import { IsoShadow, project, ring, SCENE_ORIGIN_X, SCENE_VIEW_BOX } from "@/features/shared/isoKit";
import {
  AlertBadge,
  CARD,
  CheckBadge,
  ClientWindow,
  CLIENT,
  CLOUD,
  CORE,
  CoreStack,
  Dashboard,
  DB,
  GATE,
  MON,
  Packet,
  Satellites,
  SsoGate,
} from "./JourneyParts";
import * as styles from "./styles";

/* A request's journey, rather than a diagram of where services live. The old
   scene was an anonymous hub: one dark core, three blank blocks, packets
   drifting on wires — it said "connected system" and nothing else. This one
   says what the copy under it says. A client window fires a request through
   the SSO gate into the λ core; the core fans out to the payment card, the
   CRM cloud and the database; a response comes back and the client pops a
   check. The wide dashboard watches all of it, and once per loop it takes the
   amber alert — the same blocker vocabulary as the delivery board — and
   resolves it green while traffic keeps moving. Observability is the story
   beat, not a prop: the card's claim is that incidents get caught.

   Everything runs on the sitewide 9.6s clock (iso-plt keyframes in
   globals.css). Every travel class has an -4.8s echo twin, so a request is
   always somewhere in the system; both the 0% frame a paused card shows and
   the 50% frame a paused echo shows are empty-road states, and every base
   attribute value is the calm running system a reduced-motion visitor sees. */

const WIRE = { stroke: "#6ee7b7", strokeWidth: 5, strokeLinecap: "round", fill: "none" } as const;

export function PlatformIllustration() {
  return (
    <svg viewBox={SCENE_VIEW_BOX} xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      {/* 198 centres the composition: the cloud satellite's top corner and the
          dashboard's bottom edge leave near-equal air above and below. */}
      <g transform={`translate(${SCENE_ORIGIN_X},198)`}>
        <g className={styles.pieces[0]}>
          <IsoShadow u={CORE.u} v={CORE.v} w={176} d={176} opacity={0.12} />
          <IsoShadow u={CLIENT.u} v={CLIENT.v} w={92} d={92} opacity={0.1} />
          <IsoShadow u={CARD.u} v={CARD.v} w={64} d={64} opacity={0.1} />
          <IsoShadow u={CLOUD.u} v={CLOUD.v} w={68} d={68} opacity={0.1} />
          <IsoShadow u={DB.u} v={DB.v} w={68} d={68} opacity={0.1} />
          <IsoShadow u={MON.u} v={MON.v} w={126} d={126} opacity={0.1} />
        </g>

        {/* Wires run under everything; the dashboard's is dashed because it
            taps the system rather than serving traffic. */}
        <g className={styles.pieces[1]}>
          <polyline points={ring([[-204.3, 74.8, 4], [GATE.u, GATE.v, 4], [CORE.u, CORE.v, 4]])} {...WIRE} />
          <polyline points={ring([[CORE.u, CORE.v, 4], [CARD.u, CARD.v, 4]])} {...WIRE} />
          <polyline points={ring([[CORE.u, CORE.v, 4], [CLOUD.u, CLOUD.v, 4]])} {...WIRE} />
          <polyline points={ring([[CORE.u, CORE.v, 4], [DB.u, DB.v, 4]])} {...WIRE} />
          <polyline
            points={ring([[CORE.u, CORE.v, 4], [MON.u, MON.v, 4]])}
            stroke="#a7f3d0"
            strokeWidth="3.5"
            strokeDasharray="5 7"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        <g className={styles.pieces[2]}>
          <ClientWindow />
        </g>
        <g transform={`translate(${project(CLIENT.u + 5, CLIENT.v - 38, 66)})`}>
          <g className={styles.plt.clientCheck}>
            <CheckBadge r={9} />
          </g>
        </g>

        <g className={styles.pieces[3]}>
          <SsoGate />
        </g>
        <g className={styles.pieces[4]}>
          <CoreStack />
        </g>
        <g className={styles.pieces[5]}>
          <Satellites />
        </g>

        <g className={styles.pieces[6]}>
          <g className={styles.plt.wiggle}>
            <Dashboard />
          </g>
        </g>
        {/* Alert and its resolution share one anchor over the dashboard's top
            corner. Amber is spent here and nowhere else. */}
        <g transform={`translate(${project(MON.u + 5, MON.v - 55, 70)})`}>
          <g className={styles.plt.alert}>
            <AlertBadge />
          </g>
          <g className={styles.plt.resolve}>
            <CheckBadge r={10.5} />
          </g>
        </g>

        {/* Traffic. Base opacity 0 is the resting value the keyframes drive. */}
        <g className={styles.plt.req} opacity="0"><Packet /></g>
        <g className={`${styles.plt.req} ${styles.plt.echo}`} opacity="0"><Packet /></g>
        <g className={styles.plt.fanCard} opacity="0"><Packet /></g>
        <g className={`${styles.plt.fanCard} ${styles.plt.echo}`} opacity="0"><Packet /></g>
        <g className={styles.plt.fanCloud} opacity="0"><Packet /></g>
        <g className={`${styles.plt.fanCloud} ${styles.plt.echo}`} opacity="0"><Packet /></g>
        <g className={styles.plt.fanDb} opacity="0"><Packet /></g>
        <g className={`${styles.plt.fanDb} ${styles.plt.echo}`} opacity="0"><Packet /></g>
        <g className={styles.plt.resp} opacity="0"><Packet fill="#a7f3d0" /></g>
        <g className={`${styles.plt.resp} ${styles.plt.echo}`} opacity="0"><Packet fill="#a7f3d0" /></g>
      </g>
    </svg>
  );
}
