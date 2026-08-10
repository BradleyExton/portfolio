import { IsoBox, IsoShadow, OnGround, PAPER_EDGE, PLANE_LEFT, project, ring, shades } from "../isoKit";
import * as styles from "./styles";

/* The interface, the layers it is built from, and the suite that holds it
   together. The old scene shared its whole vocabulary with the delivery card —
   same slab, same floating tiles, same green check puck — so cards 01 and 02
   read as the same drawing twice; nothing here is repeated from either
   neighbour.

   Card 02 is the one brief where the artifact really is a screen, so the screen
   is the subject and gets the only standing panel in the set. It sits where the
   board's centre line crosses zero: a panel raked into a vertical plane grows
   by half its own width on top of its height, so anywhere further back and it
   leaves the frame. */

const SCREEN = { u: -105, v: 105 } as const;
const STACK = { u: 95, v: -60 } as const;
const SUITE = { u: 40, v: 120 } as const;
const INCOMING = { u: 152, v: -104 } as const;

/* Only the top plate carries printed interface. Plates that share a footprint
   occlude each other completely in this projection — a stack of equal tiles
   shows exactly one top face no matter how far apart they sit — so an earlier
   version that printed tokens and a list on the lower two was drawing artwork
   nobody could ever see. The layers below say what they are with their edge
   colour, and the component still in the air says the rest. */
const PLATES = [
  { base: 40, shade: shades.pale },
  { base: 80, shade: shades.mint },
  { base: 120, shade: shades.paper },
] as const;

const SUITE_ROWS = [
  { y: -20, width: 58, running: false },
  { y: 0, width: 74, running: false },
  { y: 20, width: 48, running: true },
] as const;

export function FrontendIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(320,186)">
        <g className={styles.pieces[0]}>
          <IsoBox u={0} v={0} w={304} d={304} h={11} shade={{ top: "#f8faf9", right: "#dfe9e4", left: "#c9d8d0" }} outline="#cfdfd8" />
        </g>

        {/* Wires under everything: screen to stack, stack to suite. */}
        <g className={styles.pieces[1]}>
          <polyline
            points={ring([
              [SCREEN.u, SCREEN.v, 11],
              [STACK.u, STACK.v, 11],
            ])}
            stroke="#a7f3d0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polyline
            points={ring([
              [STACK.u, STACK.v, 11],
              [SUITE.u, SUITE.v, 11],
            ])}
            stroke="#d1fae5"
            strokeWidth="3"
            strokeDasharray="7 6"
            fill="none"
          />
          <g transform={`translate(${project((SCREEN.u + STACK.u) / 2, (SCREEN.v + STACK.v) / 2, 17)})`}>
            <polygon points="0,0 8,4.6 0,9.2 -8,4.6" fill="#34d399" className={styles.packet} />
          </g>
        </g>

        {/* Suite, printed flat on the board: two green ticks and one still
            running. Light rather than dark, because a tick has to read at about
            eight pixels and green-on-deep-green does not. */}
        <g className={styles.pieces[2]}>
          <OnGround u={SUITE.u} v={SUITE.v} h={12}>
            <rect x="-88" y="-42" width="176" height="84" rx="10" fill="#ffffff" stroke={PAPER_EDGE} strokeWidth="2" />
            <rect x="-74" y="-34" width="46" height="8" rx="4" fill="#7f938b" />
            {SUITE_ROWS.map((row) => (
              <g key={row.y}>
                {row.running ? (
                  <circle cx="-68" cy={row.y} r="5" fill="#fbbf24" className={styles.twinkleA} />
                ) : (
                  <path
                    d={`M-73 ${row.y} l4 5 l9 -11`}
                    stroke="#10b981"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                )}
                <rect x="-54" y={row.y - 4} width={row.width} height="8" rx="4" fill="#dbe7e1" />
              </g>
            ))}
          </OnGround>
        </g>

        {/* Layer stack on a dark foundation: tokens, composition, interface. */}
        <g className={styles.pieces[3]}>
          <IsoShadow u={STACK.u} v={STACK.v} w={112} d={112} opacity={0.14} />
          <IsoBox u={STACK.u} v={STACK.v} w={112} d={112} h={22} base={11} shade={shades.ink} />
        </g>
        {PLATES.map((plate, index) => (
          <g key={plate.base} className={styles.pieces[index + 4]}>
            <IsoBox
              u={STACK.u}
              v={STACK.v}
              w={96}
              d={96}
              h={14}
              base={plate.base}
              shade={plate.shade}
              outline={plate.shade === shades.paper ? PAPER_EDGE : undefined}
            >
              {index === PLATES.length - 1 ? (
                <>
                  <rect x="-34" y="-25" width="40" height="10" rx="5" fill="#10b981" />
                  <rect x="-34" y="-8" width="68" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="-34" y="4" width="50" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="-34" y="17" width="36" height="12" rx="6" fill="#047857" />
                </>
              ) : null}
            </IsoBox>
          </g>
        ))}

        {/* One more component, still in the air. This is what carries
            "composed from parts" now that the lower plates cannot show their
            faces: a piece the same shape as the layers, on its way in. */}
        <g className={styles.pieces[7]}>
          <polyline
            points={ring([
              [INCOMING.u, INCOMING.v, 74],
              [STACK.u + 30, STACK.v - 30, 140],
            ])}
            stroke="#d1fae5"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            fill="none"
          />
          <g className={styles.bob}>
            <IsoBox u={INCOMING.u} v={INCOMING.v} w={62} d={62} h={11} base={68} shade={shades.amber}>
              <rect x="-19" y="-9" width="24" height="6" rx="3" fill="#ffffff" opacity="0.9" />
              <rect x="-19" y="2" width="34" height="5" rx="2.5" fill="#ffffff" opacity="0.7" />
            </IsoBox>
          </g>
        </g>

        {/* The screen itself. */}
        <g className={styles.pieces[8]}>
          <IsoBox u={SCREEN.u} v={SCREEN.v} w={56} d={56} h={8} base={11} shade={shades.paper} outline={PAPER_EDGE} />
          <g transform={`translate(${project(SCREEN.u, SCREEN.v, 19)}) ${PLANE_LEFT}`}>
            <rect x="-78" y="-104" width="156" height="104" rx="7" fill="#ffffff" stroke={PAPER_EDGE} strokeWidth="2" />
            <rect x="-78" y="-104" width="156" height="17" rx="7" fill="#e0eae5" />
            <circle cx="-68" cy="-95" r="3" fill="#7f938b" />
            <circle cx="-58" cy="-95" r="3" fill="#7f938b" />
            <circle cx="-48" cy="-95" r="3" fill="#7f938b" />
            <rect x="-66" y="-78" width="54" height="9" rx="4.5" fill="#10b981" />
            <rect x="-66" y="-62" width="90" height="6" rx="3" fill="#c9d8d0" />
            <rect x="-66" y="-50" width="72" height="6" rx="3" fill="#c9d8d0" />
            <rect x="-66" y="-34" width="60" height="24" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.6" />
            <rect x="2" y="-34" width="60" height="24" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.6" />
            <rect x="-58" y="-26" width="30" height="8" rx="4" fill="#6ee7b7" />
            <rect x="10" y="-26" width="30" height="8" rx="4" fill="#6ee7b7" />
          </g>
        </g>
      </g>
    </svg>
  );
}
