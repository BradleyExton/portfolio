import {
  IsoBox,
  OnGround,
  PLANE_LEFT,
  project,
  ring,
  SCENE_ORIGIN_X,
  SCENE_VIEW_BOX,
  shades,
} from "@/features/shared/isoKit";
import { PhonePanel, ScreenFace, SuitePanel } from "./ScreenParts";
import * as styles from "./styles";

/* A render pass that runs, rather than an interface that sits. The screen is
   the subject — card 02 is the one brief whose artifact really is a screen —
   and one 9.6s clock (the iso-fnt keyframes in globals.css, four bars of the
   sitewide 2.4s beat) takes it through the states a real interface earns:
   skeleton in, content resolves, the suite runs its three tiers against it,
   the e2e pointer click-drives the page and catches one region in a genuine
   error state, the fix ships in along the token rail, and the re-run goes
   green. The suite runs in lockstep, so testing reads as the thing that
   caught the error, not decoration beside the screen.

   The cast around the story makes the "Systems" claim without a symbol
   needing a legend: a token rail on the back flank feeds the screen, and the
   same interface runs on a phone — dark theme, cards reflowed vertically —
   so theming reads as architecture, not paint. The phone's dark body is also
   the scene's one dark mass, the anchor an abstract layer stack used to
   provide before it was cut for saying nothing. The cast is on the clock,
   not posed around it: the phone lights up a beat after the desktop
   resolves, a sync packet carries the landed fix across the screen->phone
   wire, and the phone re-renders its own copy of the broken card — one fix,
   both surfaces.

   Base (non-animated) values are the reduced-motion resting state: a loaded
   screen and a lit phone over an all-green suite — quality held, not
   mid-incident. Amber is spent on the error beat and the rail's one amber
   token.

   Two ordering rules carry over from the delivery board: every animated
   element sits inside a plain positioning group, because a CSS transform
   animation replaces an SVG transform attribute outright; and scale pops need
   fill-box centre origins.

   One construction rule carries over from the rest of the iso system:
   everything in the scene is an extruded object, and flat art only ever
   appears as the face of one. Screens rake onto slab bodies the way the
   delivery scene's production monitor does; the suite and the rail are tiles
   on the board, not prints on it. A raked face with no body behind it reads
   as a sticker standing in space. */

/* The screen stands where the board's centre line crosses zero: a standing
   body grows by half its own footprint on top of its height, so anywhere
   further back and it leaves the frame. The face is 176x118 on a 10-deep
   slab, which puts the body's top back corner 22px into the frame against
   the board's 29px at the bottom. */
const SCREEN = { u: -105, v: 105 } as const;
const PHONE = { u: 95, v: -60 } as const;
const SUITE = { u: 74, v: 106 } as const;
/* Back-left flank, which would otherwise be the largest bare region: screen,
   suite and phone all sit off the board's other quadrants. */
const RAIL = { u: -96, v: -100 } as const;
const BOARD = 336;

/* Emerald, ink, amber: the theme tokens the two surfaces draw from. The
   emerald one pops as the fix packet departs — the token the fix carries. */
const TOKEN_SWATCHES = [
  { x: -50, fill: "#10b981", pop: true },
  { x: -8, fill: "#065f46", pop: false },
  { x: 34, fill: "#fbbf24", pop: false },
] as const;

export function FrontendIllustration() {
  return (
    <svg viewBox={SCENE_VIEW_BOX} xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform={`translate(${SCENE_ORIGIN_X},208)`}>
        <g className={styles.pieces[0]}>
          <IsoBox u={0} v={0} w={BOARD} d={BOARD} h={11} shade={shades.board} />
        </g>

        {/* Wires under everything. Solid runs carry the system: rail to
            screen (the fix packet rides this one, leaving as the error is
            caught and arriving as card B re-renders) and screen to phone.
            The dashed run to the suite says the tests watch both surfaces. */}
        <g className={styles.pieces[1]}>
          <polyline
            points={ring([
              [RAIL.u, RAIL.v, 11],
              [SCREEN.u, SCREEN.v, 11],
            ])}
            stroke="#a7f3d0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polyline
            points={ring([
              [SCREEN.u, SCREEN.v, 11],
              [PHONE.u, PHONE.v, 11],
            ])}
            stroke="#a7f3d0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <polyline
            points={ring([
              [PHONE.u, PHONE.v, 11],
              [SUITE.u, SUITE.v, 11],
            ])}
            stroke="#d1fae5"
            strokeWidth="3"
            strokeDasharray="7 6"
            fill="none"
            className={styles.fnt.watch}
          />
          <g transform={`translate(${project(RAIL.u, RAIL.v, 14)})`}>
            <g className={styles.fnt.fixRail}>
              <polygon points="0,0 8,4.6 0,9.2 -8,4.6" fill="#34d399" />
            </g>
          </g>
          {/* The sync packet: once card B re-renders, the same fix rides the
              screen->phone wire, so theming-as-architecture is something the
              scene does, not just something it shows. */}
          <g transform={`translate(${project(SCREEN.u, SCREEN.v, 14)})`}>
            <g className={styles.fnt.sync}>
              <polygon points="0,0 8,4.6 0,9.2 -8,4.6" fill="#34d399" />
            </g>
          </g>
        </g>

        {/* Token rail on the back flank: the theme, as objects. A tile like
            the delivery board's tickets, with the swatches printed on top. */}
        <g className={styles.pieces[2]}>
          <IsoBox u={RAIL.u} v={RAIL.v} w={136} d={64} h={6} base={11} shade={shades.paper} />
          <OnGround u={RAIL.u} v={RAIL.v} h={17}>
            <rect x="-68" y="-32" width="136" height="64" rx="10" fill="#f7faf9" />
            <rect x="-56" y="-24" width="34" height="7" rx="3.5" fill="#7f938b" />
            {TOKEN_SWATCHES.map((swatch) => (
              <g key={swatch.x}>
                <g className={swatch.pop ? styles.fnt.swatch : undefined}>
                  <rect x={swatch.x} y="-6" width="24" height="24" rx="8" fill={swatch.fill} />
                </g>
                <rect x={swatch.x} y="22" width="24" height="5" rx="2.5" fill="#dbe7e1" />
              </g>
            ))}
          </OnGround>
        </g>

        {/* The suite, a tile on the board and wired to the scene's clock. */}
        <g className={styles.pieces[3]}>
          <IsoBox u={SUITE.u} v={SUITE.v} w={176} d={84} h={6} base={11} shade={shades.paper} />
          <OnGround u={SUITE.u} v={SUITE.v} h={17}>
            <SuitePanel />
          </OnGround>
        </g>

        {/* The second surface: a thin dark slab on its stand, with the panel
            raked onto the slab's +v face. The body's centre sits half its
            depth behind the face so the glass lands exactly where the box
            face is. Its ink left face is the same #032b22 as the panel's
            outer rect, so the rounded corners blend into the body. */}
        <g className={styles.pieces[4]}>
          <IsoBox u={PHONE.u} v={PHONE.v} w={44} d={44} h={8} base={11} shade={shades.paper} />
          <IsoBox u={PHONE.u} v={PHONE.v - 4} w={68} d={8} h={124} base={19} shade={shades.ink} />
          <g transform={`translate(${project(PHONE.u, PHONE.v, 19)}) ${PLANE_LEFT}`}>
            <PhonePanel />
          </g>
        </g>

        {/* The screen itself, last so nothing draws over the story. Same
            construction as the production monitor on the delivery board:
            stand, slab body, face raked onto the body's +v plane. */}
        <g className={styles.pieces[5]}>
          <IsoBox u={SCREEN.u} v={SCREEN.v} w={56} d={56} h={8} base={11} shade={shades.paper} />
          <IsoBox u={SCREEN.u} v={SCREEN.v - 5} w={176} d={10} h={118} base={19} shade={shades.paper} />
          <g transform={`translate(${project(SCREEN.u, SCREEN.v, 19)}) ${PLANE_LEFT}`}>
            <ScreenFace />
          </g>
        </g>
      </g>
    </svg>
  );
}
