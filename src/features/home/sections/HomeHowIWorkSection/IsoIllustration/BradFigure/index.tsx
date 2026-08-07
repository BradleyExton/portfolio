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

const head = (
  <g>
    <rect x="-6" y="52" width="12" height="10" fill={palette.skinShade} />
    <path d="M-21 22 q0 -20 21 -20 q21 0 21 20 l0 14 q0 18 -21 18 q-21 0 -21 -18 z" fill={palette.skin} />
    <circle cx="-21" cy="32" r="4.5" fill={palette.skin} />
    <circle cx="21" cy="32" r="4.5" fill={palette.skinShade} />
    <path d="M-19.5 38 q0 15 19.5 15 q19.5 0 19.5 -15 l0 6 q-2 14 -19.5 14 q-17.5 0 -19.5 -14 z" fill={palette.stubble} opacity="0.55" />
    <path d="M-21 24 q-1 -22 21 -22 q22 0 21 22 q-3 -10 -9 -12 q-2 4 -6 5 q1 -4 -1 -6 q-8 -3 -16 1 q-6 3 -8 10 q-1 1 -2 2 z" fill={palette.hair} />
    <circle cx="-8" cy="30" r="2.4" fill="#2f2a26" />
    <circle cx="8" cy="30" r="2.4" fill="#2f2a26" />
    <path d="M-12 24 q4 -2.5 8 -1 M4 23 q4 -1.5 8 1" stroke="#8a683f" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M-5 42.5 q5 4.5 10 0" stroke="#8f6844" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M0 32 q2 3 0 5" stroke="#dda87e" strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

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
  const fill = side === "left" ? palette.hoodie : palette.hoodieShade;
  return (
    <g transform={side === "left" ? "translate(-25,68) rotate(8)" : "translate(25,68) rotate(-8)"}>
      <circle cx="0" cy="1" r="5.5" fill={fill} />
      <rect x="-5.5" y="-2" width="11" height="38" rx="5.5" fill={fill} />
      <circle cx="0" cy="38" r="5.5" fill={palette.skin} />
    </g>
  );
}

function armsFor(pose: BradPose) {
  if (pose === "spec") {
    return (
      <>
        <RestArm side="left" />
        <g transform="translate(25,66) rotate(-135)">
          <circle cx="0" cy="1" r="5.5" fill={palette.hoodieShade} />
          <rect x="-5.5" y="-2" width="11" height="40" rx="5.5" fill={palette.hoodieShade} />
          <circle cx="0" cy="40" r="5.5" fill={palette.skin} />
          <g transform="translate(0,40)">
            <g className={styles.scribble}>
              <g transform="rotate(-45)">
                <rect x="-3.5" y="-30" width="7" height="34" rx="2" fill="#fbbf24" />
                <path d="M-3.5 4 L0 14 L3.5 4 z" fill={palette.skinShade} />
                <path d="M-1.2 9.5 L0 14 L1.2 9.5 z" fill="#2f2a26" />
                <rect x="-3.5" y="-34" width="7" height="5" rx="2" fill="#f59e0b" />
              </g>
            </g>
          </g>
        </g>
      </>
    );
  }

  if (pose === "context") {
    return (
      <>
        <g transform="translate(-25,66) rotate(-38)">
          <circle cx="0" cy="1" r="5.5" fill={palette.hoodie} />
          <rect x="-5.5" y="-2" width="11" height="32" rx="5.5" fill={palette.hoodie} />
          <circle cx="0" cy="32" r="5.5" fill={palette.skin} />
        </g>
        <g transform="translate(25,66) rotate(38)">
          <circle cx="0" cy="1" r="5.5" fill={palette.hoodieShade} />
          <rect x="-5.5" y="-2" width="11" height="32" rx="5.5" fill={palette.hoodieShade} />
          <circle cx="0" cy="32" r="5.5" fill={palette.skin} />
        </g>
        <g transform="translate(0,72)">
          <polygon points="0,-13 19,-2 0,9 -19,-2" fill="#6ee7b7" />
          <polygon points="-19,-2 0,9 0,24 -19,13" fill="#34d399" />
          <polygon points="19,-2 0,9 0,24 19,13" fill={palette.hoodie} />
          <polygon points="0,-6.5 9.5,-1 0,4.5 -9.5,-1" fill="#a7f3d0" />
        </g>
        <circle cx="-13" cy="88" r="5.5" fill={palette.skin} />
        <circle cx="13" cy="88" r="5.5" fill={palette.skin} />
      </>
    );
  }

  if (pose === "agents") {
    return (
      <>
        <g transform="translate(-26,70) rotate(50)">
          <circle cx="0" cy="1" r="5.5" fill={palette.hoodie} />
          <rect x="-5.5" y="-2" width="11" height="34" rx="5.5" fill={palette.hoodie} />
          <circle cx="0" cy="34" r="5.5" fill={palette.skin} />
        </g>
        <g transform="translate(24,66)">
          <g className={styles.sway}>
            <g transform="rotate(-100)">
              <circle cx="0" cy="1" r="5.5" fill={palette.hoodieShade} />
              <rect x="-5.5" y="-2" width="11" height="40" rx="5.5" fill={palette.hoodieShade} />
              <circle cx="0" cy="40" r="5.5" fill={palette.skin} />
              <rect x="-2.5" y="40" width="5" height="13" rx="2.5" fill={palette.skin} />
            </g>
          </g>
        </g>
      </>
    );
  }

  return (
    <>
      <RestArm side="left" />
      <g transform="translate(25,64) rotate(-140)">
        <circle cx="0" cy="1" r="5.5" fill={palette.hoodieShade} />
        <rect x="-5.5" y="-2" width="11" height="36" rx="5.5" fill={palette.hoodieShade} />
        <circle cx="0" cy="38" r="5.5" fill={palette.skin} />
        <g transform="translate(0,38) rotate(140)">
          <line x1="2" y1="-3" x2="11" y2="-15" stroke="#8a683f" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="16" cy="-22" r="11" fill="#ecfdf5" opacity="0.82" stroke="#047857" strokeWidth="3.5" />
          <path d="M11 -26 q3 -4 8 -3" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </>
  );
}

export function BradFigure({ pose, transform }: BradFigureProps) {
  return (
    <g transform={transform}>
      {base}
      {armsFor(pose)}
      {head}
    </g>
  );
}
