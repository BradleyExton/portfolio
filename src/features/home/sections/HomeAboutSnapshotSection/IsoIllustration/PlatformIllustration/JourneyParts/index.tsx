import {
  IsoBox,
  OnGround,
  PLANE_RIGHT,
  project,
  shades,
} from "@/features/shared/isoKit";
import * as styles from "./styles";

/* The journey's cast. Third-party services are drawn shape-first with a
   letterform assist, in the site palette — the hero's tool glyphs set the
   precedent (a TS cube instead of the TypeScript blue). Real integration
   marks are all blue or purple, and the palette is blue-free, so recognition
   comes from category shapes: a payment card, a cloud, a database cylinder. */

export const CLIENT = { u: -215, v: 80 } as const;
export const GATE = { u: -108, v: 28 } as const;
export const CORE = { u: 15, v: -30, size: 110, h: 44, slab: 156 } as const;
export const CARD = { u: 180, v: -85, size: 58 } as const;
export const CLOUD = { u: 45, v: -190, size: 62 } as const;
export const DB = { u: 210, v: 10, r: 28, h: 40 } as const;
export const MON = { u: -55, v: 185, d: 118, h: 66 } as const;

/** Data packet diamond, centred on its own origin. */
export function Packet({ fill = "#34d399" }: { fill?: string }) {
  return <polygon points="0,-5.2 9,0 0,5.2 -9,0" fill={fill} />;
}

/** Payment card with a bold S. */
function SCardMark({ w }: { w: number }) {
  const h = w * 0.7;
  return (
    <g transform={`translate(${-w / 2}, ${-h / 2})`}>
      <rect width={w} height={h} rx={w * 0.08} fill="#ffffff" />
      <rect y={h * 0.12} width={w} height={h * 0.18} fill="#065f46" />
      <text x={w * 0.5} y={h * 0.92} fontSize={h * 0.62} fontWeight="800" textAnchor="middle" fill="#059669">
        S
      </text>
    </g>
  );
}

/** CRM cloud silhouette. */
function CloudMark({ w }: { w: number }) {
  return (
    <g transform={`scale(${w / 40}) translate(-20, -13)`}>
      <path
        d="M 11 26 A 7.5 7.5 0 0 1 11 11 A 9.5 9.5 0 0 1 28.5 8.5 A 7 7 0 0 1 33 21.5 A 6 6 0 0 1 29.5 26 Z"
        fill="#f7faf9"
      />
    </g>
  );
}

/** Amber alert diamond — the delivery card's blocker vocabulary. */
export function AlertBadge() {
  return (
    <g transform="scale(1.2)">
      <polygon points="0,-11 11,0 0,11 -11,0" fill="#fbbf24" />
      <rect x="-1.5" y="-6" width="3" height="7" rx="1.5" fill="#78350f" />
      <circle cy="4.5" r="1.8" fill="#78350f" />
    </g>
  );
}

/** Green resolved check, matching the delivery card's check pop. */
export function CheckBadge({ r }: { r: number }) {
  return (
    <g>
      <circle r={r} fill="#10b981" />
      <path
        d={`M ${-r * 0.42} ${r * 0.04} L ${-r * 0.11} ${r * 0.36} L ${r * 0.49} ${-r * 0.36}`}
        fill="none"
        stroke="#ecfdf5"
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** The requesting product: a small standing browser window. */
export function ClientWindow() {
  return (
    <>
      <IsoBox u={CLIENT.u} v={CLIENT.v} w={84} d={84} h={8} shade={shades.board} />
      <IsoBox u={CLIENT.u} v={CLIENT.v} w={10} d={76} h={54} base={8} shade={shades.paper} />
      <g transform={`translate(${project(CLIENT.u + 5, CLIENT.v + 38, 62)}) ${PLANE_RIGHT}`}>
        <rect width="76" height="54" fill="#f7faf9" />
        <rect width="76" height="12" fill="#065f46" />
        <circle cx="7" cy="6" r="2" fill="#6ee7b7" />
        <circle cx="13" cy="6" r="2" fill="#6ee7b7" opacity="0.6" />
        <rect x="7" y="19" width="40" height="5" rx="2.5" fill="#c9d8d0" />
        <rect x="7" y="29" width="28" height="4.5" rx="2.25" fill="#c9d8d0" />
        <rect x="7" y="41" width="22" height="8" rx="2" fill="#34d399" opacity="0.55" className={styles.plt.chip} />
      </g>
    </>
  );
}

/** Enterprise SSO as an archway the request has to pass through. */
export function SsoGate() {
  return (
    <>
      <IsoBox u={GATE.u} v={GATE.v - 26} w={13} d={13} h={42} shade={shades.deep} />
      <IsoBox u={GATE.u} v={GATE.v + 26} w={13} d={13} h={42} shade={shades.deep} />
      <IsoBox u={GATE.u} v={GATE.v} w={15} d={66} h={9} base={42} shade={shades.brand} />
      <g transform={`translate(${project(GATE.u, GATE.v, 66)})`}>
        <g transform="scale(1.44) translate(-9, -10.5)">
          <path d="M 9 0 L 18 3.5 V 11 A 9.5 9.5 0 0 1 9 21 A 9.5 9.5 0 0 1 0 11 V 3.5 Z" fill="#6ee7b7" />
          <circle cx="9" cy="8.5" r="2.6" fill="#065f46" />
          <path d="M 7.8 9.5 h 2.4 l 1 5 h -4.4 Z" fill="#065f46" />
        </g>
      </g>
      <g transform={`translate(${project(GATE.u, GATE.v + 26, 46)})`}>
        <circle r="3.2" fill="#a7f3d0" opacity="0.7" className={styles.plt.gateLamp} />
      </g>
    </>
  );
}

/** The serverless core: dark housing, raised tier, live socket, λ nameplate. */
export function CoreStack() {
  return (
    <>
      <IsoBox u={CORE.u} v={CORE.v} w={CORE.slab} d={CORE.slab} h={10} shade={shades.board} />
      <IsoBox u={CORE.u} v={CORE.v} w={CORE.size} d={CORE.size} h={CORE.h} base={10} shade={shades.ink} />
      <IsoBox u={CORE.u} v={CORE.v} w={69} d={69} h={18} base={54} shade={shades.deep} />
      <IsoBox u={CORE.u} v={CORE.v} w={35} d={35} h={0} base={72} shade={shades.brand} />
      <g transform={`translate(${project(CORE.u + CORE.size / 2, CORE.v, 10)}) ${PLANE_RIGHT}`}>
        <text x="0" y="-12" fontSize="24" fontWeight="700" textAnchor="middle" fill="#6ee7b7">
          λ
        </text>
      </g>
      <g transform={`translate(${project(CORE.u, CORE.v, 72)})`}>
        <ellipse rx="24" ry="14" fill="none" stroke="#6ee7b7" strokeWidth="2.5" opacity="0" className={styles.plt.socketPulse} />
      </g>
    </>
  );
}

/** The three integrations, each with a lamp that pops when a packet lands. */
export function Satellites() {
  return (
    <>
      <IsoBox u={CLOUD.u} v={CLOUD.v} w={CLOUD.size} d={CLOUD.size} h={22} shade={shades.mint} />
      <OnGround u={CLOUD.u} v={CLOUD.v} h={22}>
        <CloudMark w={42} />
      </OnGround>
      <g transform={`translate(${project(CLOUD.u + 21, CLOUD.v - 21, 23)})`}>
        <circle r="3.5" fill="#047857" opacity="0.75" className={styles.plt.lampCloud} />
      </g>
      {/* Landing rings echo the core's socket pulse: an iso ellipse expanding
          on the top face as each fan packet docks. Base opacity 0 keeps the
          resting scene calm. */}
      <g transform={`translate(${project(CLOUD.u, CLOUD.v, 23)})`}>
        <ellipse rx="21" ry="12" fill="none" stroke="#059669" strokeWidth="2.5" opacity="0" className={styles.plt.landCloud} />
      </g>

      <IsoBox u={CARD.u} v={CARD.v} w={CARD.size} d={CARD.size} h={26} shade={shades.paper} />
      <OnGround u={CARD.u} v={CARD.v} h={26}>
        <SCardMark w={38} />
      </OnGround>
      <g transform={`translate(${project(CARD.u + 19, CARD.v - 19, 27)})`}>
        <circle r="3.5" fill="#10b981" opacity="0.75" className={styles.plt.lampCard} />
      </g>
      <g transform={`translate(${project(CARD.u, CARD.v, 27)})`}>
        <ellipse rx="20" ry="11.5" fill="none" stroke="#34d399" strokeWidth="2.5" opacity="0" className={styles.plt.landCard} />
      </g>

      <IsoBox u={DB.u} v={DB.v} w={64} d={64} h={6} shade={shades.board} />
      <g transform={`translate(${project(DB.u, DB.v, 6)})`}>
        <path d="M -34.2 -40 L -34.2 0 A 34.2 19.9 0 0 0 34.2 0 L 34.2 -40" fill="#059669" />
        <path d="M -34.2 -26.7 A 34.2 19.9 0 0 0 34.2 -26.7" fill="none" stroke="#03614a" strokeWidth="2" opacity="0.55" />
        <path d="M -34.2 -13.3 A 34.2 19.9 0 0 0 34.2 -13.3" fill="none" stroke="#03614a" strokeWidth="2" opacity="0.55" />
        <ellipse cy="-40" rx="34.2" ry="19.9" fill="#34d399" />
        <ellipse cy="-40" rx="18.8" ry="10.9" fill="none" stroke="#065f46" strokeWidth="2" opacity="0.35" />
      </g>
      <g transform={`translate(${project(DB.u + 22, DB.v - 22, 50)})`}>
        <circle r="3.5" fill="#a7f3d0" opacity="0.75" className={styles.plt.lampDb} />
      </g>
      <g transform={`translate(${project(DB.u, DB.v, 46)})`}>
        <ellipse rx="22" ry="12.8" fill="none" stroke="#047857" strokeWidth="2.5" opacity="0" className={styles.plt.landDb} />
      </g>
    </>
  );
}

/** The wide observability dashboard: graph, error feed, one metric tile. */
export function Dashboard() {
  return (
    <>
      <IsoBox u={MON.u} v={MON.v} w={10} d={MON.d} h={MON.h} shade={shades.deep} />
      <g transform={`translate(${project(MON.u + 5, MON.v + MON.d / 2, MON.h)}) ${PLANE_RIGHT}`}>
        <rect width={MON.d} height={MON.h - 4} fill="#032b22" />
        <rect width={MON.d} height="11" fill="#065f46" />
        <circle cx="7" cy="5.5" r="2" fill="#6ee7b7" />
        <circle cx="13" cy="5.5" r="2" fill="#6ee7b7" opacity="0.6" />
        <circle cx={MON.d - 8} cy="5.5" r="2.4" fill="#34d399" className={styles.twinkleA} />
        <polyline
          points="6,28 16,25 24,29 32,21 40,26 50,19 58,24 68,20 76,23 86,18 96,22 104,20 112,21"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="80 20"
          className={styles.plt.graph}
        />
        <rect x="6" y="38" width="3.5" height="3.5" rx="1" fill="#6ee7b7" />
        <rect x="12" y="38.8" width="34" height="2.4" rx="1.2" fill="#0d9488" opacity="0.7" />
        <rect x="6" y="46" width="3.5" height="3.5" rx="1" fill="#6ee7b7" />
        <rect x="12" y="46.8" width="46" height="2.4" rx="1.2" fill="#0d9488" opacity="0.7" />
        <rect x="6" y="54" width="3.5" height="3.5" rx="1" fill="#6ee7b7" />
        <rect x="12" y="54.8" width="26" height="2.4" rx="1.2" fill="#0d9488" opacity="0.7" />
        {/* Incident row: the top feed line goes amber while the alert badge is
            up, then swaps green with the resolve — same element-swap idiom as
            the delivery board's blocker. Opacity-only, so no transform fight
            with the sheared face group. */}
        <g className={styles.plt.alertRow} opacity="0">
          <rect x="6" y="38" width="3.5" height="3.5" rx="1" fill="#fbbf24" />
          <rect x="12" y="38.8" width="40" height="2.4" rx="1.2" fill="#f59e0b" />
        </g>
        <g className={styles.plt.okRow} opacity="0">
          <rect x="6" y="38" width="3.5" height="3.5" rx="1" fill="#34d399" />
          <rect x="12" y="38.8" width="40" height="2.4" rx="1.2" fill="#10b981" />
        </g>
        <rect x="70" y="40" width="42" height="19" rx="2" fill="#04382c" />
        <rect x="75" y="45" width="20" height="3.5" rx="1.75" fill="#6ee7b7" className={styles.plt.metric} />
        <rect x="75" y="52" width="30" height="2.5" rx="1.25" fill="#0d9488" />
      </g>
    </>
  );
}
