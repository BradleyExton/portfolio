import { BOARD_EDGE, IsoBox, OnGround, PAPER_EDGE, shades } from "@/features/shared/isoKit";
import * as styles from "./styles";

/* An application is two things stacked: the screen someone works in, and the
   data underneath that makes it worth building instead of buying. So the scene
   is a sandwich rather than a scatter — a light app board riding a dark plinth
   — which also gives this card a silhouette none of the others have. The page
   card floats one plate above a flat page; the AI card stands a console at the
   back. This one is a single solid block, and reads as such at thumbnail size. */

const PLINTH_W = 330;
const PLINTH_D = 250;
const PLINTH_H = 40;

const BOARD_H = 8;
const BOARD_TOP = PLINTH_H + BOARD_H;

/* Records leaving the app. They have to step in u and v as they rise, not just
   in height: plates sharing a footprint occlude each other completely, so a
   stack drawn straight up shows exactly one top face however far apart the
   plates sit. */
const RECORDS = [
  { u: 100, v: -60, base: BOARD_TOP + 20, shade: shades.pale, outline: undefined },
  { u: 118, v: -76, base: BOARD_TOP + 54, shade: shades.mint, outline: undefined },
  { u: 136, v: -92, base: BOARD_TOP + 88, shade: shades.paper, outline: PAPER_EDGE },
] as const;

export function WebAppIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(320,192)">
        {/* The data tier. Deep enough to be the darkest mass on the card, and
            the only thing here that touches the floor. */}
        <IsoBox u={0} v={0} w={PLINTH_W} d={PLINTH_D} h={PLINTH_H} shade={shades.ink} />

        {/* The app tier, inset so the plinth reads as a base rather than a
            shadow: an inset edge is what tells the eye these are two objects. */}
        <IsoBox
          u={0}
          v={0}
          w={PLINTH_W - 20}
          d={PLINTH_D - 18}
          h={BOARD_H}
          base={PLINTH_H}
          shade={shades.board}
          outline={BOARD_EDGE}
        />

        {/* The app itself, raked onto the board. Sidebar down the left, working
            rows to the right of it, and the one amber row is the record being
            worked on right now. */}
        <OnGround u={0} v={0} h={BOARD_TOP}>
          <rect x={-146} y={-104} width={64} height={208} rx={8} fill="#e0eae5" />
          {[0, 1, 2, 3].map((row) => (
            <rect key={row} x={-132} y={-76 + row * 36} width={38} height={12} rx={6} fill="#a7f3d0" />
          ))}

          <rect x={-64} y={-104} width={210} height={58} rx={8} fill="#ffffff" />
          <rect x={-46} y={-86} width={80} height={13} rx={6.5} fill="#047857" />
          <rect x={-46} y={-66} width={126} height={9} rx={4.5} fill="#cddcd5" />

          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(0,${row * 46})`}>
              <rect x={-64} y={-34} width={210} height={38} rx={7} fill="#ffffff" />
              <rect x={-46} y={-20} width={56} height={10} rx={5} fill="#34d399" />
              <rect x={24} y={-20} width={80} height={10} rx={5} fill="#cddcd5" />
            </g>
          ))}
          <rect x={-64} y={66} width={210} height={38} rx={7} fill="#ffffff" />
          <rect x={-46} y={80} width={56} height={10} rx={5} fill="#34d399" />
          <rect x={72} y={74} width={62} height={22} rx={11} fill="#fbbf24" />
        </OnGround>

        {/* Records served out of the app, each printed so it reads as a row of
            real data rather than a blank chip. */}
        {RECORDS.map((record, index) => (
          <IsoBox
            key={record.base}
            u={record.u}
            v={record.v}
            w={92}
            d={68}
            h={7}
            base={record.base}
            shade={record.shade}
            outline={record.outline}
          >
            <rect x={-26} y={-10} width={34} height={8} rx={4} fill={index === 2 ? "#047857" : "#065f46"} />
            <rect x={-26} y={3} width={20} height={7} rx={3.5} fill="#047857" opacity={0.45} />
          </IsoBox>
        ))}
      </g>
    </svg>
  );
}
