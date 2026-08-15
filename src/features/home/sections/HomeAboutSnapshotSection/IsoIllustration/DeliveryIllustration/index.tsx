import {
  IsoBox,
  IsoShadow,
  OnGround,
  project,
  SCENE_ORIGIN_X,
  SCENE_VIEW_BOX,
  shades,
} from "@/features/shared/isoKit";
import * as styles from "./styles";

/* A lane board with real tickets on it, rather than blocks that stand for
   planning. The previous scene was abstract in a way that left the card unable
   to say which capability it belonged to: its vocabulary — mint slab, floating
   tiles, green check puck — was shared with the front-end scene, so cards 01
   and 02 read as near-duplicates of each other.

   A flat surface is the only shape that fills a 16:9 frame in this projection
   (a square of floor projects to sqrt(3):1, within a few percent of 16:9),
   which is why the board stays on the floor and the slab is now carrying a
   board instead of nothing. */

/* Lane fills sit a step above the board rather than at near-white. At #f8faf9
   on a white board on a white card the lanes vanished and the tickets read as
   loose chips floating on the surface. */
const LANES = [
  { v: -96, chip: "#047857", fill: "#eaf2ee" },
  { v: 0, chip: "#10b981", fill: "#e4efe9" },
  { v: 96, chip: "#fbbf24", fill: "#eaf2ee" },
] as const;

/* Two tickets per lane, staggered along it so the board never reads as a grid
   of identical chips, and the last slot left open for the one in flight. */
const TICKETS = [
  { u: -38, v: -96, accent: "#047857", rows: [56, 38] },
  { u: 72, v: -96, accent: "#047857", rows: [48, 30] },
  { u: -38, v: 0, accent: "#10b981", rows: [52, 34] },
  { u: 72, v: 0, accent: "#10b981", rows: [44, 40] },
  { u: -38, v: 96, accent: "#059669", rows: [50, 32] },
] as const;

const SLOT_U = 72;
const SLOT_V = 96;

function TicketFace({ accent, rows }: { accent: string; rows: readonly number[] }) {
  return (
    <>
      <rect x="-42" y="-26" width="30" height="7" rx="3.5" fill={accent} />
      {rows.map((width, index) => (
        <rect key={width} x="-42" y={-12 + index * 12} width={width} height="6" rx="3" fill="#c9d8d0" />
      ))}
      <rect x="-42" y="16" width="22" height="8" rx="4" fill="#d1fae5" />
      <circle cx="34" cy="20" r="6" fill="#a7f3d0" />
    </>
  );
}

export function DeliveryIllustration() {
  return (
    <svg viewBox={SCENE_VIEW_BOX} xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      {/* Board back corner at -184, airborne ticket's front corner at +172. */}
      <g transform={`translate(${SCENE_ORIGIN_X},208)`}>
        <g className={styles.pieces[0]}>
          <IsoBox u={0} v={0} w={344} d={344} h={12} shade={shades.board} />
        </g>

        {/* Board toolbar along the back edge. It is the scene's dark mass as
            much as it is a toolbar: without it the whole card sat between
            #ffffff and #d1fae5 and had nowhere for the eye to land. */}
        <g className={styles.pieces[1]}>
          <OnGround u={0} v={-158} h={12}>
            <rect x="-152" y="-13" width="304" height="26" rx="8" fill="#064e3b" />
            <rect x="-140" y="-4" width="52" height="8" rx="4" fill="#6ee7b7" />
            <rect x="-76" y="-3" width="34" height="6" rx="3" fill="#0a6b52" />
            <circle cx="118" cy="0" r="6" fill="#0a6b52" />
            <circle cx="134" cy="0" r="6" fill="#0a6b52" />
          </OnGround>
        </g>

        {LANES.map((lane, index) => (
          <g key={`lane-${lane.v}`} className={styles.pieces[index + 2]}>
            <OnGround u={0} v={lane.v} h={12}>
              <rect x="-152" y="-44" width="304" height="88" rx="10" fill={lane.fill} />
              <rect x="-152" y="-44" width="304" height="88" rx="10" fill="none" stroke="#cddcd5" strokeWidth="2" />
              {/* Lane header: colour chip, name bar, WIP count. */}
              <rect x="-142" y="-36" width="8" height="8" rx="4" fill={lane.chip} />
              <rect x="-128" y="-36" width="44" height="8" rx="4" fill="#7f938b" />
              <rect x="126" y="-37" width="16" height="10" rx="5" fill="#cddcd5" />
            </OnGround>
          </g>
        ))}

        {TICKETS.map((ticket, index) => (
          <g key={`ticket-${ticket.u}-${ticket.v}`} className={styles.pieces[index + 5]}>
            <IsoBox u={ticket.u} v={ticket.v} w={104} d={66} h={9} base={12} shade={shades.paper}>
              <TicketFace accent={ticket.accent} rows={ticket.rows} />
            </IsoBox>
          </g>
        ))}

        {/* The slot the airborne ticket is heading for. */}
        <g className={styles.pieces[10]}>
          <OnGround u={SLOT_U} v={SLOT_V} h={13}>
            <rect
              x="-52"
              y="-33"
              width="104"
              height="66"
              rx="8"
              fill="#ecfdf5"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeDasharray="8 6"
            />
          </OnGround>
          {/* In flight, with its shadow left on the board underneath it. */}
          <IsoShadow u={SLOT_U} v={SLOT_V} w={104} d={66} opacity={0.12} />
          <g className={styles.bob}>
            <IsoBox u={SLOT_U} v={SLOT_V} w={104} d={66} h={9} base={54} shade={shades.amber}>
              <rect x="-42" y="-26" width="30" height="7" rx="3.5" fill="#ffffff" opacity="0.9" />
              <rect x="-42" y="-12" width="52" height="6" rx="3" fill="#ffffff" opacity="0.65" />
              <rect x="-42" y="0" width="34" height="6" rx="3" fill="#ffffff" opacity="0.65" />
              <circle cx="34" cy="20" r="6" fill="#ffffff" opacity="0.8" />
            </IsoBox>
          </g>
          <g transform={`translate(${project(SLOT_U, SLOT_V, 30)})`}>
            <polygon points="0,0 7,4 0,8.1 -7,4" fill="#34d399" className={styles.packet} />
          </g>
        </g>
      </g>
    </svg>
  );
}
