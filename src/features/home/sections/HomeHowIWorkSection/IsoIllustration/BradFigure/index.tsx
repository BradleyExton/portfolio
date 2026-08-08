import { BradHead } from "./BradHead";
import { palette } from "./palette";
import * as styles from "./styles";
import type { BradFigureProps, BradLook, BradPose } from "./types";

/* Cartoon Bradley for the how-i-work iso scenes: flat chibi figure drawn in
   scene-local units (~160 tall, feet on y=157) and placed by the caller's
   transform. Poses swap the arm/prop groups and, for spec, the body drawing;
   everything else is shared so the character stays consistent across all four
   stages. Head drawings and their turn clocks live in BradHead. */

/* How far a short sleeve runs down the arm. Everything below it is bare, so
   this is also the number that decides how much skin the figure shows. */
const SLEEVE = 15;

/* Sleeve cap, drawn over the top of a bare arm: rounded at the shoulder,
   straight at the hem, and a touch wider than the arm so the fabric sits on
   it rather than replacing it. */
function Sleeve({ fill }: { fill: string }) {
  return <path d={`M-6.5 0 q0 -7 6.5 -7 q6.5 0 6.5 7 l0 ${SLEEVE} l-13 0 z`} fill={fill} />;
}

/* Bare arm, sleeve, and hand drawn straight down the +y axis, so a caller aims
   a whole limb with one rotate and hangs a prop off the hand.
   `grip` puts the hand above the prop instead of under it: a pencil or a
   magnifier handle drawn last covers the hand completely, and the arm ends up
   looking like it terminates in the tool. */
function Limb({
  fill,
  length,
  grip,
  children,
}: {
  fill: string;
  length: number;
  grip?: boolean;
  children?: React.ReactNode;
}) {
  const hand = <circle cx="0" cy={length} r="5.5" fill={palette.skin} />;

  return (
    <g>
      <rect x="-5.5" y="-2" width="11" height={length} rx="5.5" fill={palette.skin} />
      <Sleeve fill={fill} />
      {grip ? null : hand}
      {children ? <g transform={`translate(0,${length})`}>{children}</g> : null}
      {grip ? hand : null}
    </g>
  );
}

const torso = (
  <path
    d="M-22 70 q0 -8 8 -10 l28 0 q8 2 8 10 l0 38 q0 8 -8 8 l-28 0 q-8 0 -8 -8 z"
    fill={palette.shirt}
  />
);

/* Polo collar as one chevron band rather than two separate points: at the 0.62
   the agents scene renders him at, individual collar points turn to noise on
   the chest, while the band still reads. The placket and its two buttons are
   what stop the torso being a flat green slab. */
const frontNeck = (
  <>
    <path d="M-15 60 l15 14 l15 -14 l0 7 l-15 14 l-15 -14 z" fill={palette.shirtShade} />
    <path d="M0 74 l0 15" stroke={palette.shirtShade} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="0" cy="80" r="1.7" fill="#ecfdf5" />
    <circle cx="0" cy="88" r="1.7" fill="#ecfdf5" />
  </>
);

const backNeck = (
  <path d="M-11 58 q0 -8 11 -8 q11 0 11 8 l0 6 q-4 -5 -11 -5 q-7 0 -11 5 z" fill={palette.shirtShade} />
);

const base = (
  <g>
    <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />
    <rect x="-16" y="112" width="13" height="38" rx="6" fill={palette.pants} />
    <rect x="3" y="112" width="13" height="38" rx="6" fill={palette.pants} />
    <path d="M-18 148 h16 v6 a3 3 0 01-3 3 h-11 a3 3 0 01-2 -6 z" fill={palette.shoes} />
    <path d="M2 148 h16 a3 3 0 012 6 a3 3 0 01-3 3 h-11 a3 3 0 01-4 -3 z" fill={palette.shoes} />
    {torso}
    <path d="M10 60 l4 0 q8 2 8 10 l0 38 q0 8 -8 8 l-4 0 z" fill={palette.shirtShade} />
    {frontNeck}
  </g>
);

/* Same body seen from behind. Everything structural is shared with `base`; the
   cues that sell the turn are the ones the front view spends on its face — the
   neckline sits higher and flatter, a yoke seam crosses the shoulders, and the
   shade strip swaps sides so the light stays put while he doesn't. */
const backBase = (
  <g>
    <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />
    <rect x="-16" y="112" width="13" height="38" rx="6" fill={palette.pants} />
    <rect x="3" y="112" width="13" height="38" rx="6" fill={palette.pants} />
    {/* Heels rather than toes: from behind the shoe is a plain block. */}
    <rect x="-18" y="147" width="16" height="11" rx="4" fill={palette.shoes} />
    <rect x="2" y="147" width="16" height="11" rx="4" fill={palette.shoes} />
    {torso}
    <path d="M-10 60 l-4 0 q-8 2 -8 10 l0 38 q0 8 8 8 l4 0 z" fill={palette.shirtShade} />
    <path
      d="M-19 71 q19 9 38 0"
      stroke={palette.shirtShade}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    {backNeck}
  </g>
);

function RestArm({ side }: { side: "left" | "right" }) {
  return (
    <g transform={side === "left" ? "translate(-25,68) rotate(8)" : "translate(25,68) rotate(-8)"}>
      <Limb fill={side === "left" ? palette.shirt : palette.shirtShade} length={38} />
    </g>
  );
}

/* Pencil, drawn tip-down so the hand group can aim it at the board. The baked
   rotation is the difference between the writing arm's angle and the angle the
   tip has to leave the hand at to sit flat on the iso board face. */
const pencil = (
  <g transform="rotate(-21)">
    <rect x="-3.5" y="-30" width="7" height="34" rx="2" fill="#fbbf24" />
    <path d="M-3.5 4 L0 14 L3.5 4 z" fill={palette.skinShade} />
    <path d="M-1.2 9.5 L0 14 L1.2 9.5 z" fill="#2f2a26" />
    <rect x="-3.5" y="-34" width="7" height="5" rx="2" fill="#f59e0b" />
  </g>
);

/* Counter-rotates the sweep so the lens stays upright through the pass; the
   outer rotate cancels the arm's resting angle. */
const magnifier = (
  <g className={styles.inspectCounter}>
    <g transform="rotate(158)">
      <line x1="2" y1="-3" x2="11" y2="-15" stroke="#8a683f" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="16" cy="-22" r="11" fill="#ecfdf5" opacity="0.82" stroke="#047857" strokeWidth="3.5" />
      <path d="M11 -26 q3 -4 8 -3" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
  </g>
);

function armsFor(pose: BradPose) {
  if (pose === "spec") {
    // Back view: the far arm hangs, the near one reaches up and across into the
    // board face. The reach angle is what fixes where the pen tip lands, so the
    // doc's active line is laid out to meet it rather than the other way round.
    return (
      <>
        <g transform="translate(-25,68) rotate(8)">
          <Limb fill={palette.shirtShade} length={38} />
        </g>
        <g transform="translate(25,66)">
          <g className={styles.penLift}>
            <g transform="rotate(-122)">
              <Limb fill={palette.shirt} length={42} grip>
                <g className={styles.scribble}>{pencil}</g>
              </Limb>
            </g>
          </g>
        </g>
      </>
    );
  }

  if (pose === "context") {
    // Deliberately static. Three animated versions of this pose were tried and
    // all read badly at 0.72 scale: rotating both arms as one group folded them
    // into a single blob, translating the pair slid the near arm onto the torso
    // where matching emerald swallowed it, and opening the grip per shoulder
    // just looked like a shrug. The crate leaving his hands plus the whole-body
    // lean carry the handoff on their own; the arms only have to hold a
    // credible carry, which they do best by not moving.
    // Aimed so the hands land on the crate's two side corners — the older pose
    // put both hands within a circle's width of each other, which went unnoticed
    // only because the crate covered them.
    return (
      <>
        <g transform="translate(-25,66) rotate(-16)">
          <Limb fill={palette.shirt} length={24} />
        </g>
        <g transform="translate(25,66) rotate(16)">
          <Limb fill={palette.shirtShade} length={24} />
        </g>
      </>
    );
  }

  if (pose === "agents") {
    return (
      <>
        <g transform="translate(-26,70)">
          <g className={styles.cueArm}>
            <g transform="rotate(50)">
              <Limb fill={palette.shirt} length={34} />
            </g>
          </g>
        </g>
        {/* The conducting arm is the one place the figure needs a real elbow:
            the shoulder sweeps the bar while the forearm flicks at twice the
            rate, and two rotations about the same joint would just add up
            instead of tracing the figure eight a conductor actually draws. */}
        <g transform="translate(24,66)">
          <g className={styles.batonSweep}>
            <g transform="rotate(-118)">
              <rect x="-5.5" y="-2" width="11" height="22" rx="5.5" fill={palette.skin} />
              <Sleeve fill={palette.shirtShade} />
              <g transform="translate(0,19)">
                <g className={styles.batonFlick}>
                  <rect x="-5" y="-5" width="10" height="24" rx="5" fill={palette.skin} />
                  <circle cx="0" cy="20" r="5.5" fill={palette.skin} />
                  {/* Cork grip and a pale shaft, so the baton still reads at
                      the 0.62 scale this figure renders at. */}
                  <rect x="-2.6" y="19" width="5.2" height="8" rx="2.6" fill="#8a683f" />
                  <rect x="-1.7" y="26" width="3.4" height="21" rx="1.7" fill="#fbbf24" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </>
    );
  }

  return (
    <>
      <RestArm side="left" />
      <g transform="translate(25,64) rotate(-158)">
        <g className={styles.inspectArm}>
          <Limb fill={palette.shirtShade} length={38} grip>
            {magnifier}
          </Limb>
        </g>
      </g>
    </>
  );
}

const headLookByPose: Record<BradPose, BradLook | undefined> = {
  spec: "over",
  context: undefined,
  agents: "nod",
  gates: "track",
};

export function BradFigure({ pose, transform }: BradFigureProps) {
  return (
    <g transform={transform}>
      {pose === "spec" ? backBase : base}
      {armsFor(pose)}
      <BradHead look={headLookByPose[pose]} />
    </g>
  );
}
