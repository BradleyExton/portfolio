import {
  IsoBox,
  OnGround,
  PAPER_FACE,
  PLANE_LEFT,
  project,
  shades,
  type Shade,
} from "@/features/shared/isoKit";
import * as styles from "./styles";

/* The column slabs sit a step above the board so the gaps between them read as
   real cuts rather than painted lanes. */
export const SLAB: Shade = { top: "#eef4f1", right: "#d9e5df", left: "#c3d3cb" };

export const COLUMNS = [
  { u: -114, chip: "#047857" },
  { u: 0, chip: "#10b981" },
  { u: 114, chip: "#059669" },
] as const;

/* Rows across every column. The front row is card A's runway; the back row is
   where card B's blocker story plays out. */
export const ROW_BACK = -34;
export const ROW_MID = 28;
export const ROW_FRONT = 90;

const CARD_W = 88;
const CARD_D = 56;

export function ColumnSlab({ u, chip, count }: { u: number; chip: string; count: string }) {
  return (
    <>
      <IsoBox u={u} v={0} w={100} d={270} h={6} base={10} shade={SLAB} />
      <OnGround u={u} v={-120} h={16}>
        <rect x="-36" y="-5" width="8" height="8" rx="4" fill={chip} />
        <rect x="-24" y="-5" width="34" height="8" rx="4" fill="#7f938b" />
        <rect x="20" y="-6" width="16" height="10" rx="5" fill="#cddcd5" className={count} />
      </OnGround>
    </>
  );
}

/** A parent item: the scene's dark mass, anchoring the top-left. */
export function EpicTile({ u, v }: { u: number; v: number }) {
  return (
    <IsoBox u={u} v={v} w={CARD_W} d={CARD_D} h={11} base={16} shade={shades.deep}>
      <rect x="-34" y="-21" width="28" height="6" rx="3" fill="#6ee7b7" />
      <rect x="-34" y="-10" width="44" height="5" rx="2.5" fill="#0a6b52" />
      <rect x="-34" y="-1" width="34" height="5" rx="2.5" fill="#0a6b52" />
      <circle cx="18" cy="14" r="3" fill="#34d399" />
      <circle cx="26.5" cy="14" r="3" fill="#34d399" />
      <circle cx="35" cy="14" r="3" fill="#0a6b52" />
    </IsoBox>
  );
}

export function SpecFace() {
  return (
    <>
      <rect x="-34" y="-21" width="26" height="6" rx="3" fill="#047857" />
      <rect x="-34" y="-10" width="46" height="4.5" rx="2.25" fill="#c9d8d0" />
      <rect x="-34" y="-2" width="38" height="4.5" rx="2.25" fill="#c9d8d0" />
      <rect x="-34" y="6" width="42" height="4.5" rx="2.25" fill="#c9d8d0" />
      <circle cx="28" cy="15" r="5" fill="#a7f3d0" />
    </>
  );
}

export function PaperCard({ u, v, children }: { u: number; v: number; children: React.ReactNode }) {
  return (
    <IsoBox u={u} v={v} w={CARD_W} d={CARD_D} h={9} base={16} shade={shades.paper}>
      {children}
    </IsoBox>
  );
}

export function ShippedTile({ u, v, ghost = false }: { u: number; v: number; ghost?: boolean }) {
  return (
    <g className={ghost ? styles.dlv.ghostB : undefined}>
      <PaperCard u={u} v={v}>
        <rect x="-34" y="-21" width="26" height="6" rx="3" fill="#059669" />
        <rect x="-34" y="-10" width="40" height="4.5" rx="2.25" fill="#dde8e2" />
        <rect x="-34" y="-2" width="30" height="4.5" rx="2.25" fill="#dde8e2" />
        <g transform="translate(24,11)">
          <circle r="8" fill="#10b981" />
          <path
            d="M -3.5 0 L -0.9 2.8 L 4 -3"
            fill="none"
            stroke="#ecfdf5"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </PaperCard>
    </g>
  );
}

/** Card B: stalls on a blocker, clears it, finishes, moves on. */
export function BlockedCard() {
  return (
    <g className={styles.dlv.wiggle}>
      <PaperCard u={0} v={ROW_BACK}>
        <rect x="-34" y="-21" width="26" height="6" rx="3" fill="#10b981" />
        <rect x="-34" y="-10" width="42" height="4.5" rx="2.25" fill="#c9d8d0" />
        <rect x="-34" y="4" width="54" height="5" rx="2.5" fill="#dde8e2" />
        <g transform="translate(-34,4)">
          <rect x="0" y="0" width="54" height="5" rx="2.5" fill="#34d399" className={styles.dlv.progressB} />
        </g>
        <g transform="translate(26,-14)">
          <g className={styles.dlv.badge}>
            <circle r="7.5" fill="#fbbf24" />
            <rect x="-1.4" y="-4.4" width="2.8" height="5.6" rx="1.4" fill="#78350f" />
            <circle cx="0" cy="3.4" r="1.5" fill="#78350f" />
          </g>
        </g>
        <g transform="translate(26,12)">
          <g className={styles.dlv.checkB}>
            <circle r="7" fill="#10b981" />
            <path
              d="M -3 0 L -0.8 2.4 L 3.4 -2.6"
              fill="none"
              stroke="#ecfdf5"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </PaperCard>
    </g>
  );
}

/* Production: the shipped work running as a real product, with people on it.
   Drawn after the travelling cards so a card shipping into it passes behind
   the window instead of over it. */
export function ProductionApp() {
  return (
    <>
      <IsoBox u={245} v={30} w={96} d={96} h={8} shade={SLAB} />
      <IsoBox u={245} v={8} w={88} d={10} h={64} base={8} shade={shades.paper} />
      <g transform={`translate(${project(201, 13, 72)}) ${PLANE_LEFT}`}>
        <rect x="0" y="0" width="88" height="64" fill={PAPER_FACE} />
        <rect x="0" y="0" width="88" height="14" fill="#065f46" />
        <circle cx="8" cy="7" r="2.2" fill="#6ee7b7" />
        <circle cx="15" cy="7" r="2.2" fill="#6ee7b7" opacity="0.6" />
        <circle cx="22" cy="7" r="2.2" fill="#6ee7b7" opacity="0.6" />
        <circle cx="79" cy="7" r="3" fill="#34d399" className={styles.twinkleA} />
        <rect x="8" y="22" width="46" height="6" rx="3" fill="#c9d8d0" />
        <rect x="8" y="33" width="34" height="5.5" rx="2.75" fill="#c9d8d0" />
        <rect x="8" y="48" width="9" height="8" rx="1.8" fill="#6ee7b7" />
        <rect x="20" y="43" width="9" height="13" rx="1.8" fill="#34d399" />
        <rect x="32" y="38" width="9" height="18" rx="1.8" fill="#10b981" />
        <circle cx="71" cy="44" r="8" fill="#d1fae5" />
        <circle cx="71" cy="41.5" r="2.6" fill="#047857" />
        <path d="M 67 47.5 A 4 4 0 0 1 75 47.5 Z" fill="#047857" />
      </g>

      {[
        { u: 216, v: 62 },
        { u: 245, v: 70 },
        { u: 272, v: 56 },
      ].map((user, index) => (
        <g key={styles.dlv.users[index]} transform={`translate(${project(user.u, user.v, 8)})`}>
          <g className={styles.dlv.users[index]}>
            <circle r="9" fill="#d1fae5" />
            <circle cx="0" cy="-2.2" r="2.9" fill="#047857" />
            <path d="M -4.3 4.6 A 4.3 4.3 0 0 1 4.3 4.6 Z" fill="#047857" />
          </g>
        </g>
      ))}

      <g transform={`translate(${project(245, 12, 82)})`}>
        <circle r="18" fill="none" stroke="#34d399" strokeWidth="2.5" className={styles.dlv.prodRing} />
      </g>
    </>
  );
}
