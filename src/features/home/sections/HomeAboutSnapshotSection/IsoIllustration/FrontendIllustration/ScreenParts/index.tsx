import { PAPER_FACE } from "@/features/shared/isoKit";
import * as styles from "./styles";

/* Everything here is drawn square in face-local px and raked into place by the
   parent, so y runs down the glass and x runs across it. The button centres
   double as the e2e cursor's waypoints — button A at (-57,-14), button B at
   (25,-14) — so moving a button means moving the iso-fnt-cursor keyframes in
   globals.css with it. */

const CARD = { y: -52, w: 74, h: 44 } as const;
const CARD_A_X = -78;
const CARD_B_X = 4;
const A_WIDTHS = [30, 58, 44] as const;
const B_WIDTHS = [26, 52, 40] as const;

type CardWidths = readonly [number, number, number];

/* Grey stand-ins share exact footprints with the real content, so the
   skeleton -> loaded swap reads as one layout resolving, not two drawings. */
function SkeletonCard({ x, widths }: { x: number; widths: CardWidths }) {
  return (
    <g>
      <rect x={x} y={CARD.y} width={CARD.w} height={CARD.h} rx="6" fill="#f3f7f5" stroke="#e0eae5" strokeWidth="1.6" />
      <rect x={x + 8} y="-44" width={widths[0]} height="7" rx="3.5" fill="#e0eae5" />
      <rect x={x + 8} y="-34" width={widths[1]} height="5" rx="2.5" fill="#e5ede9" />
      <rect x={x + 8} y="-26" width={widths[2]} height="5" rx="2.5" fill="#e5ede9" />
      <rect x={x + 8} y="-18" width="26" height="9" rx="4.5" fill="#e0eae5" />
    </g>
  );
}

function ContentCard({ x, widths, button }: { x: number; widths: CardWidths; button: string }) {
  return (
    <g>
      <rect x={x} y={CARD.y} width={CARD.w} height={CARD.h} rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.6" />
      <rect x={x + 8} y="-44" width={widths[0]} height="7" rx="3.5" fill="#6ee7b7" />
      <rect x={x + 8} y="-34" width={widths[1]} height="5" rx="2.5" fill="#c9d8d0" />
      <rect x={x + 8} y="-26" width={widths[2]} height="5" rx="2.5" fill="#c9d8d0" />
      <rect x={x + 8} y="-18" width="26" height="9" rx="4.5" fill={button} />
    </g>
  );
}

function ClickRing({ x, y, color, className }: { x: number; y: number; color: string; className: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="10" fill="none" stroke={color} strokeWidth="2.5" className={className} />
    </g>
  );
}

export function ScreenFace() {
  return (
    <>
      <rect x="-88" y="-118" width="176" height="118" rx="7" fill={PAPER_FACE} />
      <rect x="-88" y="-118" width="176" height="18" rx="7" fill="#e0eae5" />
      <circle cx="-77" cy="-109" r="3" fill="#7f938b" />
      <circle cx="-68" cy="-109" r="3" fill="#7f938b" />
      <circle cx="-59" cy="-109" r="3" fill="#7f938b" />
      <rect x="-46" y="-113" width="94" height="8" rx="4" fill="#f4f8f6" />

      {/* Loading pass: grey stand-ins for every region below the chrome. */}
      <g className={styles.fnt.skel}>
        <rect x="-78" y="-96" width="64" height="10" rx="5" fill="#dde8e2" />
        <rect x="-78" y="-80" width="100" height="6.5" rx="3.25" fill="#e5ede9" />
        <rect x="-78" y="-69" width="80" height="6.5" rx="3.25" fill="#e5ede9" />
        <SkeletonCard x={CARD_A_X} widths={A_WIDTHS} />
        <SkeletonCard x={CARD_B_X} widths={B_WIDTHS} />
      </g>

      {/* Loaded pass, in two beats: page furniture first, then the cards. */}
      <g className={styles.fnt.contentA}>
        <rect x="-78" y="-96" width="56" height="10" rx="5" fill="#10b981" />
        <rect x="-78" y="-80" width="100" height="6.5" rx="3.25" fill="#c9d8d0" />
        <rect x="-78" y="-69" width="84" height="6.5" rx="3.25" fill="#c9d8d0" />
      </g>
      <g className={styles.fnt.contentB}>
        <ContentCard x={CARD_A_X} widths={A_WIDTHS} button="#10b981" />

        {/* Card B is the one region with a life of its own: healthy, then the
            caught error state, then a re-render flash, then healthy again.
            Exactly one face shows at a time; the steps(1) windows in
            globals.css are exclusive by construction. */}
        <g className={styles.fnt.bOk}>
          <ContentCard x={CARD_B_X} widths={B_WIDTHS} button="#059669" />
        </g>
        {/* The catch lands with the delivery board's blocker shudder: the
            wiggle group is separate from the steps(1) opacity group above it,
            so each animation keeps its own transform. */}
        <g className={styles.fnt.bErr}>
          <g className={styles.fnt.errWiggle}>
            <rect x={CARD_B_X} y={CARD.y} width={CARD.w} height={CARD.h} rx="6" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.6" />
            <rect x="12" y="-44" width="26" height="7" rx="3.5" fill="#fcd34d" />
            <g transform="translate(24,-29)">
              <circle r="8" fill="#fbbf24" />
              <rect x="-1.5" y="-4.6" width="3" height="5.8" rx="1.5" fill="#78350f" />
              <circle cx="0" cy="3.4" r="1.6" fill="#78350f" />
            </g>
            <rect x="38" y="-32" width="32" height="5" rx="2.5" fill="#fde68a" />
            <rect x="38" y="-24" width="24" height="5" rx="2.5" fill="#fde68a" />
            <rect x="12" y="-18" width="34" height="9" rx="4.5" fill="none" stroke="#f59e0b" strokeWidth="1.6" />
          </g>
        </g>
        <g className={styles.fnt.bSkel}>
          <SkeletonCard x={CARD_B_X} widths={B_WIDTHS} />
        </g>
        <g transform="translate(74,-48)">
          <g className={styles.fnt.badge}>
            <circle r="7.5" fill="#fbbf24" />
            <rect x="-1.4" y="-4.4" width="2.8" height="5.6" rx="1.4" fill="#78350f" />
            <circle cx="0" cy="3.4" r="1.5" fill="#78350f" />
          </g>
        </g>
      </g>

      {/* Click feedback, spent in scene order: probe, catch, confirm. */}
      <ClickRing x={-57} y={-14} color="#34d399" className={styles.fnt.ringA} />
      <ClickRing x={25} y={-14} color="#f59e0b" className={styles.fnt.ringErr} />
      <ClickRing x={25} y={-14} color="#10b981" className={styles.fnt.ringOk} />

      {/* The e2e run's pointer. It lives on the glass, so it travels in
          face-local px and picks up the plane's rake for free. */}
      <g className={styles.fnt.cursor}>
        <path
          d="M0 0 L0 12.5 L3.4 9.2 L5.9 14.6 L8.3 13.5 L5.7 8.2 L10 7.9 Z"
          fill="#065f46"
          stroke="#f7faf9"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

/* The same interface on a second surface: dark theme, cards reflowed to a
   vertical stack. Raked onto an ink slab like the desktop screen so the two
   read as devices on one desk; the slab is also the scene's only dark mass,
   the anchor the old layer stack used to provide. The outer rect here is
   #032b22 — ink's left face — so the panel's rounded corners dissolve into
   the body behind them.

   The phone is on the scene's clock too: the outer rect stays put (a body
   whose screen is off) while everything inside it lights up a beat after the
   desktop resolves, and once the sync packet lands, its own card B — the
   lower card, the one the desktop error hit — re-renders and pops a confirm
   ring. The re-render skeleton bars are the card tone nudged one step
   lighter, the dark theme's version of the desktop skeleton's grey. */
export function PhonePanel() {
  return (
    <>
      <rect x="-34" y="-124" width="68" height="124" rx="10" fill="#032b22" />
      <g className={styles.fnt.pLoad}>
        <rect x="-28" y="-116" width="56" height="108" rx="7" fill="#065f46" />
        <circle cx="0" cy="-120" r="2" fill="#0a6b52" />
        <rect x="-22" y="-108" width="28" height="7" rx="3.5" fill="#6ee7b7" />
        <rect x="-22" y="-96" width="40" height="4.5" rx="2.25" fill="#0a6b52" />
        <rect x="-22" y="-84" width="44" height="30" rx="5" fill="#0a6b52" />
        <rect x="-16" y="-78" width="18" height="5" rx="2.5" fill="#6ee7b7" />
        <rect x="-16" y="-69" width="28" height="4" rx="2" fill="#34d399" />
        <rect x="-22" y="-48" width="44" height="30" rx="5" fill="#0a6b52" />
        <g className={styles.fnt.pOk}>
          <rect x="-16" y="-42" width="16" height="5" rx="2.5" fill="#6ee7b7" />
          <rect x="-16" y="-33" width="24" height="4" rx="2" fill="#34d399" />
        </g>
        <g className={styles.fnt.pSkel}>
          <rect x="-16" y="-42" width="16" height="5" rx="2.5" fill="#0e8562" />
          <rect x="-16" y="-33" width="24" height="4" rx="2" fill="#0e8562" />
        </g>
        <rect x="-12" y="-13" width="24" height="3.5" rx="1.75" fill="#0a6b52" />
        <g transform="translate(0,-33)">
          <circle r="11" fill="none" stroke="#34d399" strokeWidth="2.5" className={styles.fnt.pRing} />
        </g>
      </g>
    </>
  );
}

/* The layered strategy, literally: three rows for unit, component, and e2e,
   each with a status slot and a progress track. Base values rest all-green so
   a reduced-motion still reads "tested", not "mid-incident". */
const SUITE_ROW_GEOMETRY = [
  { y: -14, label: 24 },
  { y: 6, label: 36 },
  { y: 26, label: 18 },
] as const;

export function SuitePanel() {
  const rows = [
    { ...SUITE_ROW_GEOMETRY[0], run: styles.fnt.runU, fill: styles.fnt.fillU, check: styles.fnt.checkU, fail: null },
    { ...SUITE_ROW_GEOMETRY[1], run: styles.fnt.runC, fill: styles.fnt.fillC, check: styles.fnt.checkC, fail: null },
    { ...SUITE_ROW_GEOMETRY[2], run: styles.fnt.runE, fill: styles.fnt.fillE, check: styles.fnt.checkE, fail: styles.fnt.failE },
  ] as const;

  return (
    <>
      <rect x="-88" y="-42" width="176" height="84" rx="10" fill={PAPER_FACE} />
      <rect x="-74" y="-34" width="46" height="8" rx="4" fill="#7f938b" />
      {rows.map((row) => (
        <g key={row.y}>
          <g transform={`translate(-66,${row.y})`}>
            <circle r="5" fill="#fbbf24" className={row.run} />
            <g className={row.check}>
              <path
                d="M -5 0.5 l 3.6 4 l 7.2 -8.8"
                stroke="#10b981"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
            {row.fail ? (
              <g className={row.fail}>
                <circle r="6.5" fill="#fbbf24" />
                <rect x="-1.3" y="-3.9" width="2.6" height="5" rx="1.3" fill="#78350f" />
                <circle cx="0" cy="3" r="1.3" fill="#78350f" />
              </g>
            ) : null}
          </g>
          <rect x="-56" y={row.y - 3.5} width={row.label} height="7" rx="3.5" fill="#8fa79c" />
          <rect x="-14" y={row.y - 3} width="88" height="6" rx="3" fill="#dbe7e1" />
          {/* Fill sits inside a plain positioning group: the scaleX animation
              would otherwise replace an SVG transform attribute outright. */}
          <g transform={`translate(-14,${row.y - 3})`}>
            <rect width="88" height="6" rx="3" fill="#34d399" className={row.fill} />
          </g>
        </g>
      ))}
      <g className={styles.fnt.suiteRing}>
        <circle r="22" fill="none" stroke="#34d399" strokeWidth="2.5" />
      </g>
    </>
  );
}
