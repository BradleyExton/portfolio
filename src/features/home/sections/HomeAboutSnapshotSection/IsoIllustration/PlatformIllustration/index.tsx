import { IsoBox, IsoShadow, PAPER_EDGE, PLANE_RIGHT, project, ring, shades } from "../isoKit";
import * as styles from "./styles";

/* One dark core carrying three services, rather than six pale objects spread
   evenly across a slab. This scene stays abstract where the delivery card went
   literal, and deliberately: the literal version of this brief is a wiring
   diagram, and drawing one at card size produces documentation rather than an
   illustration. What it takes from the delivery card is the discipline — the
   subject fills the frame, and one mass is clearly darker than everything else. */

/* All three services used to sit forward of the core (every one of them landed
   at screen y >= 66), which left the top corners of the frame empty and made
   the card read as a heavy block with three chips fallen off the bottom of it.
   They now sit on one ground circle around the core at equal ground radius, so
   two land level with it and one comes forward — the 1.73:1 ellipse a circle
   projects to in this basis is what makes the arrangement read as a plane
   rather than a row.

   The values are a ladder rather than a pair. Two of these were `paper`, which
   on the old tinted panel read as cool grey blanks next to one green one, and
   on the bare card would have been near-invisible. Only the node with the dark
   core beside it keeps paper, because that is the one place a near-white face
   has something to hold contrast against.

   The three radii and footprints are deliberately unequal. Equal ones put the
   two side nodes at mirrored screen positions, and a hub with a perfect axis of
   symmetry stops reading as a drawing and starts reading as a logo — the other
   two cards in the set are both asymmetric. */
const SERVICES = [
  { u: 142, v: -142, w: 70, d: 70, h: 30, shade: shades.mint, pill: "#047857", outline: undefined },
  { u: -134, v: 134, w: 66, d: 66, h: 30, shade: shades.paper, pill: "#10b981", outline: PAPER_EDGE },
  { u: 140, v: 140, w: 72, d: 72, h: 30, shade: shades.pale, pill: "#059669", outline: undefined },
] as const;

/* Core footprint and height. Everything else is measured off these: the sockets
   are fractions of the footprint, the status strip has to stay inside the right
   face, and the marker has to clear the back corner at -(CORE/2 + CORE_H).

   Both came down a step. The nodes had to move outward to make their links
   legible — at the old spacing the core's own silhouette covered all but ~30px
   of each wire, so three services read as three loose blocks — and once they
   moved, the frame set the ceiling on how much room was left for the core. */
const CORE = 136;
const CORE_H = 58;
const MARKER_H = 158;

/* Three lit units and a rail, raked onto the core's right face. The old strip
   ran from -58 to 94 in face coordinates on a face that only spans +/-85, so
   its last unit and the rail both hung off the edge of the box they were meant
   to be printed on. These are centred and sized against the face. */
const STATUS_SPAN = 86;
const STATUS_PITCH = 32;

const PACKET_CLASS = [styles.packet, styles.packetLate, styles.packetLater];

export function PlatformIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      {/* Centred on the composition's own bounding box (marker top at -158, the
          near service's bottom corner at +176), not on the core. */}
      <g transform="translate(320,171)">
        <g className={styles.pieces[0]}>
          <IsoShadow u={0} v={0} w={CORE} d={CORE} opacity={0.16} />
          {SERVICES.map((service) => (
            <IsoShadow key={`shadow-${service.u}-${service.v}`} u={service.u} v={service.v} w={service.w} d={service.d} opacity={0.11} />
          ))}
        </g>

        {/* Links run under everything, so a service sits on its wire. They end
            at the node centres rather than short of them: a wire that stops in
            open floor reads as a broken connection. Stepped up from #a7f3d0 to
            #6ee7b7 now that they cross bare card instead of a tinted panel. */}
        <g className={styles.pieces[1]}>
          {SERVICES.map((service) => (
            <polyline
              key={`edge-${service.u}-${service.v}`}
              points={ring([
                [service.u * 0.3, service.v * 0.3, 6],
                [service.u, service.v, 6],
              ])}
              stroke="#6ee7b7"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </g>

        {/* The core. Deep enough to be the darkest thing on the card, with a
            pale socket cut into the top so it reads as a housing, not a brick. */}
        <g className={styles.pieces[2]}>
          <IsoBox u={0} v={0} w={CORE} d={CORE} h={CORE_H} shade={shades.ink} />
          <IsoBox u={0} v={0} w={84} d={84} h={0} base={CORE_H} shade={shades.deep} />
          <IsoBox u={0} v={0} w={50} d={50} h={0} base={CORE_H} shade={shades.brand} />
        </g>

        <g className={styles.pieces[3]}>
          <g transform={`translate(${project(CORE / 2, 0, 0)}) ${PLANE_RIGHT}`}>
            {[0, 1, 2].map((row) => (
              <rect
                key={row}
                x={-STATUS_SPAN / 2 + row * STATUS_PITCH}
                y={-46}
                width="22"
                height="7"
                rx="3.5"
                fill="#34d399"
                opacity={0.85}
              />
            ))}
            <rect x={-STATUS_SPAN / 2} y={-28} width={STATUS_SPAN} height="5" rx="2.5" fill="#065f46" />
          </g>
        </g>

        {/* Each node carries one chip and one lamp on its top face, so a service
            reads as a thing that is running rather than as a bare block. Every
            other object in the set is printed with something; these were the
            only blank tiles left in the three scenes. */}
        {SERVICES.map(({ pill, ...service }, index) => (
          <g key={`service-${service.u}-${service.v}`} className={styles.pieces[index + 4]}>
            <IsoBox {...service}>
              <rect x="-17" y="-9" width="22" height="6" rx="3" fill={pill} />
              <rect x="-17" y="1" width="14" height="5" rx="2.5" fill={pill} opacity={0.45} />
              <circle cx="15" cy="4" r="4" fill="#ffffff" opacity={0.9} />
            </IsoBox>
          </g>
        ))}

        <g className={styles.pieces[7]}>
          {SERVICES.map((service, index) => (
            <g key={`packet-${service.u}-${service.v}`} transform={`translate(${project(service.u * 0.66, service.v * 0.66, 16)})`}>
              <polygon points="0,0 9,5.2 0,10.4 -9,5.2" fill="#34d399" className={PACKET_CLASS[index]} />
            </g>
          ))}
        </g>

        {/* Amber marker over the core: the one non-green note, and the only
            thing above the skyline, so the eye starts here. It now clears the
            core's back corner instead of sitting on the top face like an inlay,
            and a dashed riser ties it back down — same vocabulary as the
            incoming component on card 02, and it fills the column of empty
            frame the raised marker would otherwise leave. */}
        <g className={styles.pieces[8]}>
          <polyline
            points={ring([
              [0, 0, CORE_H],
              [0, 0, MARKER_H],
            ])}
            stroke="#a7f3d0"
            strokeWidth="2.5"
            strokeDasharray="6 7"
            fill="none"
          />
          <g transform={`translate(${project(0, 0, MARKER_H)})`}>
            <g className={styles.bob}>
              <polygon points="0,0 15,8.7 0,17.3 -15,8.7" fill="#fbbf24" />
              <polygon points="-15,8.7 0,17.3 0,24 -15,15.4" fill="#d97706" />
              <polygon points="15,8.7 0,17.3 0,24 15,15.4" fill="#f59e0b" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
