import { IsoBox, OnGround, PAPER_FACE, project, ring, shades } from "@/features/shared/isoKit";
import * as styles from "./styles";

/* The page, drawn literally, with the one thing the brief is actually about
   lifted off it: a quote request leaving the site. The old scene put a pale
   browser frame and a pale slab on a pale panel and measured a contrast range
   of 77 out of 255 — at card size it read as a smudge. The subject here is the
   same, but the request card is the darkest mass on the card and floats clear
   of the page, so the eye lands on it before it reads anything else. */

/* Page footprint. The sum of the half-extents is what sets the drawing's screen
   width — (w + d) / 2 * 0.866 — so these are sized against the frame rather
   than against each other, the same way the what-i-do board is. */
const PAGE_W = 360;
const PAGE_D = 290;
const PAGE_H = 10;

/* The request card floats rather than rests. The gap is small on purpose: a
   long riser would push the card off the top of the frame, because a shape's
   top corner climbs by half its footprint on top of its own height. */
const CARD_U = 110;
const CARD_V = -70;
const CARD_W = 150;
const CARD_D = 120;
const CARD_LIFT = 82;

export function WebsiteIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(320,182)">
        <IsoBox u={0} v={0} w={PAGE_W} d={PAGE_D} h={PAGE_H} shade={shades.board} />

        {/* Page content, raked onto the page's top face. Art x runs along +u and
            art y along +v, so this lays out like a page seen from above: the
            hero down the left, the service sections stacked to the right of it. */}
        <OnGround u={0} v={0} h={PAGE_H}>
          <rect x={-172} y={-136} width={118} height={272} rx={8} fill="#d1fae5" />
          <rect x={-158} y={-104} width={86} height={18} rx={9} fill="#047857" />
          <rect x={-158} y={-74} width={94} height={11} rx={5.5} fill="#6ee7b7" />
          <rect x={-158} y={-54} width={66} height={11} rx={5.5} fill="#6ee7b7" />
          <rect x={-158} y={-16} width={68} height={26} rx={13} fill="#10b981" />

          {[
            { x: -38, y: -136 },
            { x: 60, y: -136 },
            { x: -38, y: 8 },
            { x: 60, y: 8 },
          ].map((tile) => (
            <g key={`${tile.x}-${tile.y}`} transform={`translate(${tile.x},${tile.y})`}>
              <rect x={0} y={0} width={88} height={128} rx={7} fill={PAPER_FACE} />
              <rect x={12} y={18} width={44} height={11} rx={5.5} fill="#34d399" />
              <rect x={12} y={40} width={58} height={9} rx={4.5} fill="#cddcd5" />
              <rect x={12} y={57} width={48} height={9} rx={4.5} fill="#cddcd5" />
              <rect x={12} y={74} width={34} height={9} rx={4.5} fill="#cddcd5" />
            </g>
          ))}
        </OnGround>

        {/* Contact shadow on the page, not the floor: the card floats over the
            page, so that is the surface its shadow belongs on. */}
        <polygon
          points={ring([
            [CARD_U - CARD_W / 2, CARD_V - CARD_D / 2, PAGE_H + 0.6],
            [CARD_U + CARD_W / 2, CARD_V - CARD_D / 2, PAGE_H + 0.6],
            [CARD_U + CARD_W / 2, CARD_V + CARD_D / 2, PAGE_H + 0.6],
            [CARD_U - CARD_W / 2, CARD_V + CARD_D / 2, PAGE_H + 0.6],
          ])}
          fill="#0f766e"
          opacity={0.16}
        />

        {/* Dashed rather than solid, so it reads as the path something took
            rather than a post the card is bolted to. */}
        <polyline
          points={ring([
            [CARD_U, CARD_V, PAGE_H],
            [CARD_U, CARD_V, CARD_LIFT],
          ])}
          stroke="#a7f3d0"
          strokeWidth={2.5}
          strokeDasharray="6 7"
          fill="none"
        />

        {/* The quote request itself: the darkest mass in the scene, printed with
            the fields a homeowner actually fills in, and carrying the only amber
            note on the button that sends it. */}
        <IsoBox
          u={CARD_U}
          v={CARD_V}
          w={CARD_W}
          d={CARD_D}
          h={16}
          base={CARD_LIFT}
          shade={shades.ink}
        />
        <OnGround u={CARD_U} v={CARD_V} h={CARD_LIFT + 16}>
          <rect x={-58} y={-44} width={74} height={12} rx={6} fill="#6ee7b7" />
          <rect x={-58} y={-20} width={104} height={10} rx={5} fill="#34d399" opacity={0.5} />
          <rect x={-58} y={-2} width={88} height={10} rx={5} fill="#34d399" opacity={0.5} />
          <rect x={-58} y={20} width={66} height={24} rx={12} fill="#fbbf24" />
        </OnGround>

        <g transform={`translate(${project(CARD_U, CARD_V, PAGE_H + (CARD_LIFT - PAGE_H) * 0.5)})`}>
          <polygon points="0,0 9,5.2 0,10.4 -9,5.2" fill="#34d399" />
        </g>
      </g>
    </svg>
  );
}
