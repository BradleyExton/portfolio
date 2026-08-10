import { IsoBox, IsoShadow, PAPER_EDGE, PLANE_RIGHT, project, ring, shades } from "../isoKit";
import * as styles from "./styles";

/* One dark core carrying three services, rather than six pale objects spread
   evenly across a slab. This scene stays abstract where the delivery card went
   literal, and deliberately: the literal version of this brief is a wiring
   diagram, and drawing one at card size produces documentation rather than an
   illustration. What it takes from the delivery card is the discipline — the
   subject fills the frame, and one mass is clearly darker than everything else. */

const SERVICES = [
  { u: 186, v: -54, w: 78, d: 78, h: 26, shade: shades.paper, outline: PAPER_EDGE },
  { u: -54, v: 186, w: 78, d: 78, h: 26, shade: shades.paper, outline: PAPER_EDGE },
  { u: 104, v: 104, w: 78, d: 78, h: 26, shade: shades.mint, outline: undefined },
] as const;

const PACKET_CLASS = [styles.packet, styles.packetLate, styles.packetLater];

export function PlatformIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(320,150)">
        <g className={styles.pieces[0]}>
          <IsoShadow u={0} v={0} w={170} d={170} opacity={0.16} />
          {SERVICES.map((service) => (
            <IsoShadow key={`shadow-${service.u}`} u={service.u} v={service.v} w={service.w} d={service.d} opacity={0.1} />
          ))}
        </g>

        {/* Links run under everything, so a service sits on its wire. They end
            at the node centres rather than short of them: a wire that stops in
            open floor reads as a broken connection. */}
        <g className={styles.pieces[1]}>
          {SERVICES.map((service) => (
            <polyline
              key={`edge-${service.u}-${service.v}`}
              points={ring([
                [service.u * 0.3, service.v * 0.3, 6],
                [service.u, service.v, 6],
              ])}
              stroke="#a7f3d0"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </g>

        {/* The core. Deep enough to be the darkest thing on the card, with a
            pale socket cut into the top so it reads as a housing, not a brick. */}
        <g className={styles.pieces[2]}>
          <IsoBox u={0} v={0} w={170} d={170} h={78} shade={shades.ink} />
          <IsoBox u={0} v={0} w={104} d={104} h={0} base={78} shade={shades.deep} />
          <IsoBox u={0} v={0} w={62} d={62} h={0} base={78} shade={shades.brand} />
        </g>

        {/* Status strip raked onto the core's right face: three lit units. */}
        <g className={styles.pieces[3]}>
          <g transform={`translate(${project(85, 0, 0)}) ${PLANE_RIGHT}`}>
            {[0, 1, 2].map((row) => (
              <rect key={row} x={-58 + row * 38} y={-54} width="26" height="7" rx="3.5" fill="#34d399" opacity={0.85} />
            ))}
            <rect x="-58" y="-34" width="102" height="5" rx="2.5" fill="#065f46" />
          </g>
        </g>

        {SERVICES.map((service, index) => (
          <g key={`service-${service.u}`} className={styles.pieces[index + 4]}>
            <IsoBox {...service} />
          </g>
        ))}

        <g className={styles.pieces[7]}>
          {SERVICES.map((service, index) => (
            <g key={`packet-${service.u}`} transform={`translate(${project(service.u * 0.64, service.v * 0.64, 16)})`}>
              <polygon points="0,0 9,5.2 0,10.4 -9,5.2" fill="#34d399" className={PACKET_CLASS[index]} />
            </g>
          ))}
        </g>

        {/* Amber marker hovering over the core: the one non-green note, and the
            only thing above the skyline, so the eye starts here. */}
        <g className={styles.pieces[8]}>
          <g transform={`translate(${project(0, 0, 126)})`}>
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
