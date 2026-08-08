import * as styles from "./styles";
import type { BradFigureProps, BradPose } from "./types";

/* Cartoon Bradley for the how-i-work iso scenes: flat chibi figure drawn in
   scene-local units (~160 tall, feet on y=157) and placed by the caller's
   transform. Poses only swap the arm/prop groups; head, torso, and legs are
   shared so the character stays consistent across all four stages.
   Hex literals rather than theme tokens: the figure lives inside the iso
   scenes, which are hex-authored so the artwork stays identical across
   themes (matching the what-i-do illustration tier). */
const palette = {
  skin: "#f2c29c",
  skinShade: "#eab88f",
  hair: "#a37e54",
  stubble: "#c49a6c",
  shirt: "#10b981",
  shirtShade: "#059669",
  // Collar, placket and cuff bands.
  trim: "#d1fae5",
  pants: "#2f423a",
  belt: "#1c2b25",
  // Warm against the cool trim: the buckle sits directly below the placket,
  // and in the same family the two merged into one pale line down the centre.
  buckle: "#caa14f",
  // The shoe upper has to stay clearly lighter than the pants. Matched to
  // them, the upper vanished and only the midsole read.
  shoe: "#7b8f85",
  sole: "#f3f6f4",
} as const;

/* Sleeve length on a 38-unit limb; the rest of the arm is skin. */
const SLEEVE = 13;

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

/* Two head drawings, hard-cut between: a front view and a 3/4 view. Sliding
   the front face's features sideways was the first attempt and is a dead end —
   the fringe, the ear, the nose and the chin all keep reading frontally no
   matter where the eyes go. Both drawings share the same 42x52 head box and
   the same tilt wrapper, so only the face changes at the cut.
   The 3/4 view faces +x. Placement decides what that means on screen: the spec
   figure is mirrored, so +x turns him toward the board he is writing on; the
   gates figure is not, so +x turns him toward the magnifier.
   `look` picks the clock — "back" holds the turn for two bars of the writing
   loop, "track" swings out and back with the lens sweep, "nod" is a plain
   on-beat bob with no turn at all. */
const turnMotion = {
  back: { tilt: styles.headTilt, front: styles.faceFront, turned: styles.faceTurned },
  track: { tilt: styles.headTrack, front: styles.trackFront, turned: styles.trackTurned },
} as const;

/* No fringe: the hairline is a wide arch sitting high on the skull with both
   temples receded past the brow, and a short taper in front of each ear. The
   outer edge of the hair reuses the skull's own top curve, so the hair can
   never bulge past the silhouette the way a drawn-on cap does. */
const frontFace = (
  <>
    <rect x="-6" y="52" width="12" height="10" fill={palette.skinShade} />
    <path d="M-21 22 q0 -20 21 -20 q21 0 21 20 l0 14 q0 18 -21 18 q-21 0 -21 -18 z" fill={palette.skin} />
    <circle cx="-21" cy="32" r="4.5" fill={palette.skin} />
    <circle cx="21" cy="32" r="4.5" fill={palette.skinShade} />
    <path d="M-19.5 38 q0 15 19.5 15 q19.5 0 19.5 -15 l0 6 q-2 14 -19.5 14 q-17.5 0 -19.5 -14 z" fill={palette.stubble} opacity="0.55" />
    <path
      d="M-21 19 q0 -17 21 -17 q21 0 21 17 C18.6 13 16.4 8.6 13 8 C8.4 7 4 9 0 12 C-4 9 -8.4 7 -13 8 C-16.4 8.6 -18.6 13 -21 19 Z"
      fill={palette.hair}
    />
    <path d="M-20.4 19 q-1.4 8 -0.4 12 q2.6 -3 3 -8 q0 -3 -0.6 -4.6 z" fill={palette.hair} />
    <path d="M20.4 19 q1.4 8 0.4 12 q-2.6 -3 -3 -8 q0 -3 0.6 -4.6 z" fill={palette.hair} />
    <circle cx="-8" cy="30" r="2.4" fill="#2f2a26" />
    <circle cx="8" cy="30" r="2.4" fill="#2f2a26" />
    <path d="M-12 24 q4 -2.5 8 -1 M4 23 q4 -1.5 8 1" stroke="#8a683f" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M0 32 q2 3 0 5" stroke="#dda87e" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M-5 42.5 q5 4.5 10 0" stroke="#8f6844" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

/* The same recession read from the side, as one slicked-back cap: it starts
   back from the brow, sweeps over the crown and dies at the nape. Drawn as a
   single path rather than a front tuft plus a separate back mass — with the
   front receded, a back mass reads as a bob instead of the back of a head. */
const turnedFace = (
  <>
    <rect x="-1" y="52" width="12" height="10" fill={palette.skinShade} />
    <path d="M-12 26 q0 -24 18 -24 q16 0 16 21 l0 10 q0 19 -16 19 q-18 0 -18 -19 z" fill={palette.skin} />
    <path d="M21 26 q6 5 5 9 q-1 3 -5 2 z" fill={palette.skin} />
    <path d="M-10 38 q0 15 16 15 q16 0 16 -15 l0 5 q-2 13 -16 13 q-14 0 -16 -13 z" fill={palette.stubble} opacity="0.55" />
    <path
      d="M-10.5 37 C-13.6 30 -14 19.5 -10.8 11 C-7 1.8 0 -0.8 7 0.6 C11.5 1.7 14 3.4 15.4 5.6 C12.6 4 9.6 5.4 6.6 8.4 C2.6 12.4 -0.6 17.4 -2.4 22.6 C-3.6 26 -4.2 28.6 -4.2 30.6 C-5.4 34 -7.8 36.4 -10.5 37 Z"
      fill={palette.hair}
    />
    <ellipse cx="-2" cy="34" rx="4.4" ry="5.6" fill={palette.skinShade} />
    <path d="M-3 32 q3 2 1 5" stroke="#d8a077" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="30" r="2.4" fill="#2f2a26" />
    <path d="M8 23 q4 -2.5 8 0" stroke="#8a683f" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M12 43 q4 4 7 -1" stroke="#8f6844" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

function Head({ look }: { look?: "back" | "track" | "nod" }) {
  const motion = look === "back" || look === "track" ? turnMotion[look] : undefined;

  return (
    <g transform="translate(0,56)">
      <g className={look === "nod" ? styles.headNod : undefined}>
        <g className={motion?.tilt}>
          <g transform="translate(0,-56)">
            <g className={motion?.front}>{frontFace}</g>
            {motion ? <g className={motion.turned}>{turnedFace}</g> : null}
          </g>
        </g>
      </g>
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

/* Short-sleeve button-up tucked into chinos. Three details are load-bearing at
   the 0.62 scale the agents scene uses, and each replaced something that
   failed there:
   - the shirt tapers to the belt at y=103, so the figure keeps a waist;
   - the shade is a rim down the right edge, not a panel whose leading edge cut
     a diagonal across the chest;
   - the placket stops short of the waistband, so it and the buckle stay two
     shapes instead of one pale line down the middle. */
const base = (
  <g>
    <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />
    <path d="M-18 100 h36 v18 q0 6 -6 6 h-24 q-6 0 -6 -6 z" fill={palette.pants} />
    <rect x="-16" y="116" width="13" height="31" rx="6" fill={palette.pants} />
    <rect x="3" y="116" width="13" height="31" rx="6" fill={palette.pants} />
    <path d="M-22 70 q0 -8 8 -10 l28 0 q8 2 8 10 L17 98 q0 5 -5 5 l-24 0 q-5 0 -5 -5 z" fill={palette.shirt} />
    <path d="M14 60.4 q8 2 8 9.6 L17 98 q0 5 -5 5 l-3 0 z" fill={palette.shirtShade} />
    <path d="M-11 59 L-1.5 61 L-7 73 z" fill={palette.trim} />
    <path d="M11 59 L1.5 61 L7 73 z" fill={palette.trim} />
    <rect x="-2.4" y="60" width="4.8" height="37" fill={palette.trim} opacity="0.7" />
    {[71, 80, 89].map((y) => (
      <circle key={y} cx="0" cy={y} r="1.4" fill={palette.shirtShade} />
    ))}
    <rect x="-18" y="103" width="36" height="6.4" rx="1.5" fill={palette.belt} />
    <rect x="-4.4" y="102.4" width="8.8" height="7.6" rx="1.6" fill={palette.buckle} />
    <rect x="-2" y="104.8" width="4" height="2.8" rx="0.8" fill={palette.belt} />
    {shoe}
    <g transform="scale(-1,1)">{shoe}</g>
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

const headLookByPose: Record<BradPose, "back" | "track" | "nod" | undefined> = {
  spec: "back",
  context: undefined,
  agents: "nod",
  gates: "track",
};

export function BradFigure({ pose, transform }: BradFigureProps) {
  return (
    <g transform={transform}>
      {base}
      {armsFor(pose)}
      <Head look={headLookByPose[pose]} />
    </g>
  );
}
