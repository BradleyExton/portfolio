import { bradTorso } from "@/features/shared/character/bradArtwork";
import { BradHead } from "./BradHead";
import * as styles from "./styles";
import type { BatonArmProps, BodyProps, BradFigureProps, BradHeadLook, BradPose, LimbProps } from "./types";
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
   instep sloping up to the ankle, white midsole under an emerald flash. Drawn
   once and mirrored, so the pair can never drift apart. */
const shoe = (
  <>
    <path d="M-3 145 L-3 157 L-19.4 157 Q-21.6 156.6 -21 153 Q-20.4 149.8 -17.6 148.8 Q-16 148.2 -16 145 Z" fill={palette.shoe} />
    <path d="M-20.6 151.8 Q-19 149.6 -16.4 148.9 L-15.6 151 Q-18 151.7 -19 152.8 Z" fill={palette.shirt} />
    <path d="M-3 152.8 L-3 157 L-19.4 157 Q-21.6 156.6 -21 152.8 Z" fill={palette.sole} />
  </>
);

/* Same runner from behind, where the toe splay is gone and all that is left is
   a heel: a squared-off counter, the midsole under it, and the emerald flash
   pulled round to the heel tab. */
const backShoe = (
  <>
    <path d="M-17.6 146 q0 -3 3 -3 h10 q2.6 0 2.6 3 v11 h-15.6 z" fill={palette.shoe} />
    <rect x="-12.6" y="145.4" width="4.6" height="5.6" rx="1.6" fill={palette.shirt} />
    <path d="M-17.6 153.2 h15.6 v3.8 h-15.6 z" fill={palette.sole} />
  </>
);

/* The figure's own drop shadow, which belongs to the floor rather than to him:
   it stays out of any transform that turns the body. */
const dropShadow = <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />;

/* Shared from the waist out: the hips, the legs and the shirt block. Everything
   that says which way he is facing is layered on top of this by its caller.
   Three details are load-bearing at the 0.62 scale the agents scene uses, and
   each replaced something that failed there:
   - the shirt tapers to the belt at y=103, so the figure keeps a waist;
   - the shade is a rim down the right edge, not a panel whose leading edge cut
     a diagonal across the chest;
   - the belt band is drawn before its hardware, so the two never merge. */
function Body({ legs, children }: BodyProps) {
  return (
    <>
      <path d="M-18 100 h36 v18 q0 6 -6 6 h-24 q-6 0 -6 -6 z" fill={palette.pants} />
      {legs}
      <path d={bradTorso.body} fill={palette.shirt} />
      <path d={bradTorso.shade} fill={palette.shirtShade} />
      <rect x="-18" y="103" width="36" height="6.4" rx="1.5" fill={palette.belt} />
      {children}
    </>
  );
}

const squareLegs = (
  <>
    <rect x="-16" y="116" width="13" height="31" rx="6" fill={palette.pants} />
    <rect x="3" y="116" width="13" height="31" rx="6" fill={palette.pants} />
  </>
);

/* Standing in the board's plane means standing in the board's matrix: widths
   run down the ground axis, verticals stay vertical. One transform turns him to
   face the thing he is writing on and hands back everything that follows from
   it — near shoulder dropped toward us, far shoulder ridden up, belt and yoke
   raked, feet a step apart along the floor. Faking those part by part was the
   first attempt and it stayed stubbornly flat-on, because the shoulder line was
   still level and the shoulder line is the whole tell.
   Only the body takes it. A head and a pair of arms are round in life and a
   shear turns them into leaning ellipses, so they hang off sheared anchor
   points and are drawn square — which is what a projection of a solid does
   anyway. */
const BOARD_PLANE = "matrix(0.866,0.5,0,1,0,0)";

/** Where a body-local point ends up once the board plane has been applied. */
const inBoardPlane = (x: number, y: number) => `translate(${(0.866 * x).toFixed(2)},${(0.5 * x + y).toFixed(2)})`;

/* Legs and shoes step along the ground axis instead of raking with the torso.
   A sheared leg leans and a sheared shoe reads as a floor tile, and neither is
   what a round limb standing on a floor does — the stance is what moves, not
   the shapes. Each side is drawn where it always was and shifted by the
   difference between its own axis raked and square. */
const legStep = (x: number) => `translate(${(0.866 * x - x).toFixed(2)},${(0.5 * x).toFixed(2)})`;
const STANCE = 9.5;

const steppedLegs = (
  <>
    <g transform={legStep(-STANCE)}>
      <rect x="-16" y="116" width="13" height="31" rx="6" fill={palette.pants} />
      {backShoe}
    </g>
    <g transform={legStep(STANCE)}>
      <rect x="3" y="116" width="13" height="31" rx="6" fill={palette.pants} />
      <g transform="scale(-1,1)">{backShoe}</g>
    </g>
  </>
);

/* Short-sleeve button-up tucked into chinos: collar points, placket and
   buttons down the centre, buckle on the belt. The placket stops short of the
   waistband, so it and the buckle stay two shapes instead of one pale line
   down the middle. */
const frontBase = (
  <g>
    {dropShadow}
    <Body legs={squareLegs}>
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

/* The same shirt and chinos from behind, raked into the board's plane. Turning
   him round is mostly a matter of what comes off — no placket, no buttons, no
   buckle — so the read has to be carried by what only a back view has: the
   collar band standing behind the neck, the yoke seam across the shoulders, two
   hip pockets, and the belt loops notching the belt. Without them he is a green
   rectangle. All of them are drawn square and centred; the plane transform is
   what rakes them. */
const backBase = (
  <g>
    <g transform={BOARD_PLANE}>{dropShadow}</g>
    {steppedLegs}
    <g transform={BOARD_PLANE}>
      <Body>
        <path d="M-19 75 q19 5 38 0" stroke={palette.shirtShade} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M-11.5 66 q1.5 -9 11.5 -9 q10 0 11.5 9 q-11.5 -4 -23 0 z" fill={palette.trim} />
        <rect x="-12.4" y="101.6" width="3.6" height="9.2" rx="1.2" fill={palette.pants} />
        <rect x="8.8" y="101.6" width="3.6" height="9.2" rx="1.2" fill={palette.pants} />
        <rect x="-14" y="111.5" width="11" height="8.5" rx="2" fill={palette.pantsShade} />
        <rect x="3" y="111.5" width="11" height="8.5" rx="2" fill={palette.pantsShade} />
      </Body>
    </g>
  </g>
);

function RestArm({ side }: { side: "left" | "right" }) {
  return (
    <g transform={side === "left" ? "translate(-25,68) rotate(8)" : "translate(25,68) rotate(-8)"}>
      <Limb fill={side === "left" ? palette.shirt : palette.shirtShade} length={38} />
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
        {/* Both arms hang off shoulders that the board plane has already moved:
            the far one high and back, the near one dropped toward us. Far arm
            flat on the page, riding the doc up and back down while the pen is
            off it — the static angle stays on the outer group and only the delta
            is animated, so the shoulder never leaves the sleeve and reduced
            motion rests on the reaching pose rather than an arm hanging
            straight down. */}
        <g transform={inBoardPlane(-21, 64)}>
          <g className={styles.scrollArm}>
            {/* Arm out to the side at shoulder height with an easy bend at the
                elbow, hand flat on the page: someone leaning a hand on a wall.
                Three geometries got tried here — a straight limb read as a
                plank, a wide low elbow read as a zigzag, and a folded one hid
                the elbow behind his back so all that showed was a forearm
                poking out sideways. The bend has to be gentle, and it has to
                clear the torso to be a bend at all.
                The whole assembly pivots at the shoulder for the flick, so the
                hand rides up the page on an arc and drifts in toward him as it
                climbs, the way a real arm does. Rotating the forearm alone only
                slides it sideways. */}
            <g transform="rotate(82.5)">
              <rect x="-5.5" y="-2" width="11" height="17" rx="5.5" fill={palette.skin} />
              <circle cx="0" cy="1" r="5.5" fill={palette.shirtShade} />
              <rect x="-5.5" y="-2" width="11" height={SLEEVE} rx="5.5" fill={palette.shirtShade} />
              <rect x="-5.6" y={SLEEVE - 4} width="11.2" height="4" fill={palette.trim} />
              <g transform="translate(0,15) rotate(43.6)">
                <rect x="-5" y="-5" width="10" height="21" rx="5" fill={palette.skin} />
                <circle cx="0" cy="16" r="5.5" fill={palette.skin} />
              </g>
            </g>
          </g>
        </g>
        {/* Writing arm stays straight, and should: it is at full reach into the
            board, which is the one position an arm has no bend left in. Jointing
            it was tried and the elbow only fought the pencil for the silhouette.
            Lit side, so it takes the plain shirt tone while the far arm sits in
            the shade one — that tonal split is also the only thing separating
            the far sleeve from the torso it crosses. */}
        <g transform={inBoardPlane(25, 66)}>
          <g className={styles.penLift}>
            <g transform="rotate(-145)">
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

/* Spec is the one stage he works with his back to us. He is writing on a board
   that stands in the scene, and a figure who faces out while writing behind
   himself reads as posing for the camera rather than working; turning him round
   also puts the viewer over his shoulder, looking at the same doc he is. */
const facesAwayByPose: Record<BradPose, boolean> = {
  spec: true,
  context: false,
  agents: false,
  gates: false,
};

const headLookByPose: Record<BradPose, BradHeadLook | undefined> = {
  spec: "glance",
  context: undefined,
  agents: "nod",
  gates: "track",
};

export function BradFigure({ pose, transform }: BradFigureProps) {
  return (
    <g transform={transform}>
      {facesAwayByPose[pose] ? backBase : frontBase}
      {armsFor(pose)}
      <BradHead look={headLookByPose[pose]} />
    </g>
  );
}
