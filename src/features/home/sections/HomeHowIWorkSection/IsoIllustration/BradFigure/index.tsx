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
  hoodie: "#10b981",
  hoodieShade: "#059669",
  pants: "#2f423a",
  shoes: "#1c2b25",
} as const;

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

  return (
    <g>
      <circle cx="0" cy="1" r="5.5" fill={fill} />
      <rect x="-5.5" y="-2" width="11" height={length} rx="5.5" fill={fill} />
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

const frontFace = (
  <>
    <rect x="-6" y="52" width="12" height="10" fill={palette.skinShade} />
    <path
      d="M-21 22 q0 -20 21 -20 q21 0 21 20 l0 14 q0 18 -21 18 q-21 0 -21 -18 z"
      fill={palette.skin}
    />
    <circle cx="-21" cy="32" r="4.5" fill={palette.skin} />
    <circle cx="21" cy="32" r="4.5" fill={palette.skinShade} />
    <path
      d="M-19.5 38 q0 15 19.5 15 q19.5 0 19.5 -15 l0 6 q-2 14 -19.5 14 q-17.5 0 -19.5 -14 z"
      fill={palette.stubble}
      opacity="0.55"
    />
    <path
      d="M-21 24 q-1 -22 21 -22 q22 0 21 22 q-3 -10 -9 -12 q-2 4 -6 5 q1 -4 -1 -6 q-8 -3 -16 1 q-6 3 -8 10 q-1 1 -2 2 z"
      fill={palette.hair}
    />
    <circle cx="-8" cy="30" r="2.4" fill="#2f2a26" />
    <circle cx="8" cy="30" r="2.4" fill="#2f2a26" />
    <path
      d="M-12 24 q4 -2.5 8 -1 M4 23 q4 -1.5 8 1"
      stroke="#8a683f"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M0 32 q2 3 0 5" stroke="#dda87e" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path
      d="M-5 42.5 q5 4.5 10 0"
      stroke="#8f6844"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </>
);

/* Skull pushed toward the turn, nose breaking the leading silhouette, hair
   capping the trailing side, single eye, ear back on the cheek where the hair
   meets it. Two things this drawing must not do, both learned the hard way:
   the trailing hair has to stop at the jaw or it reads as a bob rather than
   the back of a head, and the hairline has to be one clean sweep — the front
   view's notched fringe is a frontal cue and looks like a gash in profile. */
const turnedFace = (
  <>
    <rect x="-1" y="52" width="12" height="10" fill={palette.skinShade} />
    <path
      d="M-12 26 q0 -24 18 -24 q16 0 16 21 l0 10 q0 19 -16 19 q-18 0 -18 -19 z"
      fill={palette.skin}
    />
    <path d="M21 26 q6 5 5 9 q-1 3 -5 2 z" fill={palette.skin} />
    <path
      d="M-10 38 q0 15 16 15 q16 0 16 -15 l0 5 q-2 13 -16 13 q-14 0 -16 -13 z"
      fill={palette.stubble}
      opacity="0.55"
    />
    <path
      d="M-12 26 q0 -24 18 -24 q16 0 16 21 q-2 -10 -8 -12 q-4 5 -10 5 q-9 0 -13 5 q-3 4 -3 5 z"
      fill={palette.hair}
    />
    <path
      d="M-18 30 q0 -28 22 -28 l0 8 q-11 2 -11 16 l0 6 q0 6 4 9 q-7 3 -11 -1 q-4 -5 -4 -14 z"
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

const base = (
  <g>
    <ellipse cx="0" cy="159" rx="36" ry="9" fill="#0f766e" opacity="0.14" />
    <rect x="-16" y="112" width="13" height="38" rx="6" fill={palette.pants} />
    <rect x="3" y="112" width="13" height="38" rx="6" fill={palette.pants} />
    <path d="M-18 148 h16 v6 a3 3 0 01-3 3 h-11 a3 3 0 01-2 -6 z" fill={palette.shoes} />
    <path d="M2 148 h16 a3 3 0 012 6 a3 3 0 01-3 3 h-11 a3 3 0 01-4 -3 z" fill={palette.shoes} />
    <path d="M-22 70 q0 -8 8 -10 l28 0 q8 2 8 10 l0 38 q0 8 -8 8 l-28 0 q-8 0 -8 -8 z" fill={palette.hoodie} />
    <path d="M10 60 l4 0 q8 2 8 10 l0 38 q0 8 -8 8 l-4 0 z" fill={palette.hoodieShade} />
    <path d="M-10 100 h20 v10 q0 4 -4 4 h-12 q-4 0 -4 -4 z" fill={palette.hoodieShade} opacity="0.45" />
    <path d="M-5 62 l-1 12 M5 62 l1 12" stroke="#ecfdf5" strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

function RestArm({ side }: { side: "left" | "right" }) {
  return (
    <g transform={side === "left" ? "translate(-25,68) rotate(8)" : "translate(25,68) rotate(-8)"}>
      <Limb fill={side === "left" ? palette.hoodie : palette.hoodieShade} length={38} />
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
              <Limb fill={palette.hoodieShade} length={40} grip>
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
          <Limb fill={palette.hoodie} length={24} />
        </g>
        <g transform="translate(25,66) rotate(16)">
          <Limb fill={palette.hoodieShade} length={24} />
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
              <Limb fill={palette.hoodie} length={34} />
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
              <circle cx="0" cy="1" r="5.5" fill={palette.hoodieShade} />
              <rect x="-5.5" y="-2" width="11" height="22" rx="5.5" fill={palette.hoodieShade} />
              <g transform="translate(0,19)">
                <g className={styles.batonFlick}>
                  <rect x="-5" y="-5" width="10" height="24" rx="5" fill={palette.hoodieShade} />
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
          <Limb fill={palette.hoodieShade} length={38} grip>
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
