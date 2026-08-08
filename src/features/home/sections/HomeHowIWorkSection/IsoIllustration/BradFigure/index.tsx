import { bradTorso } from "@/features/shared/character/bradArtwork";
import { BradHead } from "./BradHead";
import * as styles from "./styles";
import type { BradFigureProps, BradHeadLook, BradPose } from "./types";
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

/* Shared from the waist out: the drop shadow, the hips, the legs and the shirt
   block. Everything that says which way he is facing is layered on top of this
   by frontBase or backBase.
   Three details are load-bearing at the 0.62 scale the agents scene uses, and
   each replaced something that failed there:
   - the shirt tapers to the belt at y=103, so the figure keeps a waist;
   - the shade is a rim down the right edge, not a panel whose leading edge cut
     a diagonal across the chest;
   - the belt band is drawn before its hardware, so the two never merge. */
const torso = (
  <>
    <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />
    <path d="M-18 100 h36 v18 q0 6 -6 6 h-24 q-6 0 -6 -6 z" fill={palette.pants} />
    <rect x="-16" y="116" width="13" height="31" rx="6" fill={palette.pants} />
    <rect x="3" y="116" width="13" height="31" rx="6" fill={palette.pants} />
    <path d={bradTorso.body} fill={palette.shirt} />
    <path d={bradTorso.shade} fill={palette.shirtShade} />
    <rect x="-18" y="103" width="36" height="6.4" rx="1.5" fill={palette.belt} />
  </>
);

/* Short-sleeve button-up tucked into chinos: collar points, placket and
   buttons down the centre, buckle on the belt. The placket stops short of the
   waistband, so it and the buckle stay two shapes instead of one pale line
   down the middle. */
const frontBase = (
  <g>
    {torso}
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
  </g>
);

/* The same shirt and chinos from behind. Turning him round is mostly a matter
   of what comes off — no placket, no buttons, no buckle — so the read has to
   be carried by what only a back view has: the collar band standing behind the
   neck, the yoke seam across the shoulders, two hip pockets, and the belt loops
   notching the belt. Without them he is a green rectangle. */
const backBase = (
  <g>
    {torso}
    <path d="M-19 75 q19 5 38 0" stroke={palette.shirtShade} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M-11.5 66 q1.5 -9 11.5 -9 q10 0 11.5 9 q-11.5 -4 -23 0 z" fill={palette.trim} />
    <rect x="-12.4" y="101.6" width="3.6" height="9.2" rx="1.2" fill={palette.pants} />
    <rect x="8.8" y="101.6" width="3.6" height="9.2" rx="1.2" fill={palette.pants} />
    <rect x="-14" y="111.5" width="11" height="8.5" rx="2" fill={palette.pantsShade} />
    <rect x="3" y="111.5" width="11" height="8.5" rx="2" fill={palette.pantsShade} />
    {backShoe}
    <g transform="scale(-1,1)">{backShoe}</g>
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

function armsFor(pose: BradPose) {
  if (pose === "spec") {
    return (
      <>
        <RestArm side="left" />
        <g transform="translate(25,66)">
          <g className={styles.penLift}>
            <g transform="rotate(-135)">
              <Limb fill={palette.shirtShade} length={40} grip>
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
            instead of tracing the figure eight a conductor actually draws.
            Short sleeve, so the sleeve ends on the upper arm and the whole
            forearm below the elbow flick is bare. */}
        <g transform="translate(24,66)">
          <g className={styles.batonSweep}>
            <g transform="rotate(-118)">
              <rect x="-5.5" y="-2" width="11" height="22" rx="5.5" fill={palette.skin} />
              <circle cx="0" cy="1" r="5.5" fill={palette.shirtShade} />
              <rect x="-5.5" y="-2" width="11" height={SLEEVE} rx="5.5" fill={palette.shirtShade} />
              <rect x="-5.6" y={SLEEVE - 4} width="11.2" height="4" fill={palette.trim} />
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
