import { bradTorso } from "@/features/shared/character/bradArtwork";
import { BradHead } from "./BradHead";
import * as styles from "./styles";
import type {
  BatonArmProps,
  BodyProps,
  BradFigureProps,
  BradHeadLook,
  BradPose,
  HangingArmProps,
  LimbProps,
} from "./types";
import { palette, SLEEVE } from "./utils";

/* Cartoon Bradley for the how-i-work iso scenes: flat chibi figure drawn in
   scene-local units (~160 tall, feet on y=157) and placed by the caller's
   transform. Poses only swap the arm/prop groups and pick a front or back
   body; the head, torso block and legs are shared so the character stays
   consistent across all four stages. */

/* Shoulder ball, sleeve, and hand drawn straight down the +y axis, so a caller
   aims a whole limb with one rotate and hangs a prop off the hand.
   `grip` puts the hand above the prop instead of under it: a pencil or a
   magnifier handle drawn last covers the hand completely, and the arm ends up
   looking like it terminates in the tool. */
function Limb({ fill, length, grip, children }: LimbProps) {
  const hand = <circle cx="0" cy={length} r="5.5" fill={palette.skin} />;
  const sleeve = Math.min(SLEEVE, length);

  return (
    <g>
      {length > sleeve ? (
        <rect x="-5.5" y={sleeve - 2} width="11" height={length - sleeve + 2} rx="5.5" fill={palette.skin} />
      ) : null}
      <circle cx="0" cy="1" r="5.5" fill={fill} />
      <rect x="-5.5" y="-2" width="11" height={sleeve} rx="5.5" fill={fill} />
      <rect x="-5.6" y={sleeve - 4} width="11.2" height="4" fill={palette.trim} />
      {grip ? null : hand}
      {children ? <g transform={`translate(0,${length})`}>{children}</g> : null}
      {grip ? hand : null}
    </g>
  );
}

/* Left runner: toe splayed out past the leg, heel flush with the back of it,
   instep sloping up to the ankle, midsole under an emerald flash. Drawn once and
   mirrored, so the pair can never drift apart.
   The sole is two bands, not one: a thin pale midsole over a dark outsole. As a
   single pale bar it was the brightest shape on the whole figure and the eye
   went to his feet before his face. The heel also takes a shade wedge, which is
   what stops the upper reading as a flat cutout. */
const shoe = (
  <>
    <path d="M-3 145 L-3 157 L-19.4 157 Q-21.6 156.6 -21 153 Q-20.4 149.8 -17.6 148.8 Q-16 148.2 -16 145 Z" fill={palette.shoe} />
    <path d="M-6.4 145 L-3 145 L-3 152.8 L-6.4 152.8 z" fill={palette.outsole} opacity="0.28" />
    <path d="M-20.6 151.8 Q-19 149.6 -16.4 148.9 L-15.6 151 Q-18 151.7 -19 152.8 Z" fill={palette.shirt} />
    <path d="M-3 152.6 L-3 155.4 L-19.9 155.4 Q-21.4 155.2 -21 152.6 Z" fill={palette.sole} />
    <path d="M-3 155.4 L-3 157 L-19.4 157 Q-20.9 156.8 -20.8 155.4 Z" fill={palette.outsole} />
  </>
);

/* The figure's own drop shadow, which belongs to the floor rather than to him.
   Two ellipses: a broad soft one for the ambient occlusion and a tight dark one
   right under the soles. The broad one alone left him hovering a little — a
   figure only reads as standing on a floor once something touches it. */
const dropShadow = (
  <>
    <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />
    <ellipse cx="0" cy="158" rx="23" ry="5.6" fill="#0f766e" opacity="0.2" />
  </>
);

/* Shared from the waist out: the hips, the legs and the shirt block. Everything
   that says which way he is facing is layered on top of this by its caller.
   Three details are load-bearing at the 0.62 scale the agents scene uses, and
   each replaced something that failed there:
   - the shirt tapers to the belt at y=103, so the figure keeps a waist;
   - the shade is a rim down the right edge, not a panel whose leading edge cut
     a diagonal across the chest;
   - the belt band is drawn before its hardware, so the two never merge. */
function Body({ children }: BodyProps) {
  return (
    <>
      <path d="M-18 100 h36 v18 q0 6 -6 6 h-24 q-6 0 -6 -6 z" fill={palette.pants} />
      {/* Legs, with a shaded strip down the right of each. The strip is what
          turns two flat rectangles into two cylinders, and it can sit at a fixed
          side because a standing leg never rotates. */}
      <rect x="-16" y="116" width="13" height="31" rx="6" fill={palette.pants} />
      <rect x="3" y="116" width="13" height="31" rx="6" fill={palette.pants} />
      <rect x="-6.4" y="116" width="3.4" height="31" rx="1.7" fill={palette.pantsShade} />
      <rect x="12.6" y="116" width="3.4" height="31" rx="1.7" fill={palette.pantsShade} />
      <path d={bradTorso.body} fill={palette.shirt} />
      <path d={bradTorso.shade} fill={palette.shirtShade} />
      <rect x="-18" y="103" width="36" height="6.4" rx="1.5" fill={palette.belt} />
      {children}
    </>
  );
}

/* Short-sleeve button-up tucked into chinos: collar points, placket and
   buttons down the centre, buckle on the belt. The placket stops short of the
   waistband, so it and the buckle stay two shapes instead of one pale line
   down the middle. */
const frontBase = (
  <g>
    {dropShadow}
    <Body>
      <path d={bradTorso.lapelLeft} fill={palette.trim} />
      <path d={bradTorso.lapelRight} fill={palette.trim} />
      <rect {...bradTorso.placket} fill={palette.trim} opacity="0.7" />
      {bradTorso.buttonYs.map((y) => (
        <circle key={y} cx="0" cy={y} r="1.4" fill={palette.shirtShade} />
      ))}
      <rect x="-4.4" y="102.4" width="8.8" height="7.6" rx="1.6" fill={palette.buckle} />
      <rect x="-2" y="104.8" width="4" height="2.8" rx="0.8" fill={palette.belt} />
      {shoe}
      <g transform="scale(-1,1)">{shoe}</g>
    </Body>
  </g>
);

/* An arm that is not doing anything, which is most of them. Three things it
   needs that a plain Limb does not give it: a forearm narrower than the sleeve,
   an elbow at the sleeve hem so the forearm swings in toward the hip rather than
   dropping as one straight tube, and a loose fist wider than the wrist. Without
   the last two a resting arm ends in a circle the same width as the arm, which
   reads as the limb trailing off rather than as a hand.
   The shaded strips sit at a fixed side for the same reason the legs' do: these
   arms hang, so they are never rotated far enough for the light to move. */
function HangingArm({ fill, forearm }: HangingArmProps) {
  return (
    <g>
      <circle cx="0" cy="1" r="5.5" fill={fill} />
      <rect x="-5.5" y="-2" width="11" height={SLEEVE} rx="5.5" fill={fill} />
      <path d="M2.4 -1.6 h3.1 v13 h-3.1 z" fill={palette.shirtShade} opacity="0.5" />
      <rect x="-5.6" y={SLEEVE - 4} width="11.2" height="4" fill={palette.trim} />
      <g transform={`translate(0,${SLEEVE - 1}) rotate(-13)`}>
        <rect x="-4.6" y="-4" width="9.2" height={forearm} rx="4.6" fill={palette.skin} />
        <rect x="1.2" y="-2" width="3.4" height={forearm - 5} rx="1.7" fill={palette.skinShade} opacity="0.7" />
        <g transform={`translate(0,${forearm - 2})`}>
          <path d="M-5.8 -4.4 q0 -3 3.2 -3 h5.2 q3.2 0 3.2 3.2 v4.4 q0 3.4 -3.4 3.4 h-4.8 q-3.4 0 -3.4 -3.4 z" fill={palette.skin} />
          <path
            d="M-2.8 -3.6 v3.4 M0.4 -4 v3.6 M3.4 -3.4 v3.2"
            stroke={palette.skinShade}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
  );
}

/* Pencil, drawn tip-down so the hand group can aim it at the board. */
const pencil = (
  <g transform="rotate(-45)">
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

/* A conducting arm, drawn for whichever side `side` picks (1 = his right, the
   hand nearer the viewer). This is the one place the figure needs a real elbow:
   the shoulder sweeps the bar while the forearm flicks at twice the rate, and
   two rotations about the same joint would just add up instead of tracing the
   figure eight a conductor actually draws. Short sleeve, so the sleeve ends on
   the upper arm and the whole forearm below the elbow flick is bare.
   The two arms share this geometry but not their clocks — see cueSweep. */
function BatonArm({ side, base, fill, sweep, flick }: BatonArmProps) {
  return (
    <g transform={`translate(${24 * side},66)`}>
      <g className={sweep}>
        <g transform={`rotate(${-base * side})`}>
          <rect x="-5.5" y="-2" width="11" height="22" rx="5.5" fill={palette.skin} />
          <circle cx="0" cy="1" r="5.5" fill={fill} />
          <rect x="-5.5" y="-2" width="11" height={SLEEVE} rx="5.5" fill={fill} />
          <rect x="-5.6" y={SLEEVE - 4} width="11.2" height="4" fill={palette.trim} />
          <g transform="translate(0,19)">
            <g className={flick}>
              <rect x="-5" y="-5" width="10" height="24" rx="5" fill={palette.skin} />
              <circle cx="0" cy="20" r="5.5" fill={palette.skin} />
              {/* Cork grip and a pale shaft, so the baton still reads at the
                  0.62 scale this figure renders at. */}
              <rect x="-2.6" y="19" width="5.2" height="8" rx="2.6" fill="#8a683f" />
              <rect x="-1.7" y="26" width="3.4" height="21" rx="1.7" fill="#fbbf24" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

function armsFor(pose: BradPose) {
  if (pose === "spec") {
    return (
      <>
        {/* Far arm, so it takes the shade tone and is drawn first for the near
            one to cross. It does nothing but hang, which is the point: the
            version that reached up and put a hand on the page had to clear his
            own head to get there, and every angle that did read as a chevron of
            two equal tubes ending in a bare wrist. */}
        <g transform="translate(-24,66) rotate(16)">
          <HangingArm fill={palette.shirtShade} forearm={19} />
        </g>
        {/* Writing arm stays straight, and should: it is at full reach into the
            board, which is the one position an arm has no bend left in. Jointing
            it was tried and the elbow only fought the pencil for the
            silhouette. Aimed so the pencil lands on the row the type line grows
            along, not in the page margin. */}
        <g transform="translate(24,66)">
          <g className={styles.penLift}>
            <g transform="rotate(-138)">
              <Limb fill={palette.shirt} length={40} grip>
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
    // A baton in each hand. Far arm first, so the near one crosses over it. It
    // also carries 14 more degrees of lift, which keeps the shaping hand above
    // the beating one through the whole loop; at a shared resting angle the two
    // arms passed through horizontal together and squared into a T.
    return (
      <>
        <BatonArm side={-1} base={132} fill={palette.shirt} sweep={styles.cueSweep} flick={styles.cueFlick} />
        <BatonArm side={1} base={118} fill={palette.shirtShade} sweep={styles.batonSweep} flick={styles.batonFlick} />
      </>
    );
  }

  return (
    <>
      <g transform="translate(-25,66) rotate(-9)">
        <HangingArm fill={palette.shirt} forearm={19} />
      </g>
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

const headLookByPose: Record<BradPose, BradHeadLook | undefined> = {
  spec: "glance",
  context: undefined,
  agents: "nod",
  gates: "track",
};

export function BradFigure({ pose, transform }: BradFigureProps) {
  return (
    <g transform={transform}>
      {frontBase}
      {armsFor(pose)}
      <BradHead look={headLookByPose[pose]} />
    </g>
  );
}
