import * as styles from "./styles";
import type { AgentBotProps, AgentKind } from "./types";

/* One agent in the pit. The three stations used to be bare tiles, which read as
   cargo being shuffled rather than as the things doing the work; giving each one
   a body, a visor and the mark of the tool it stands for is what turns the scene
   from blocks on a floor into a section of players under a conductor.

   Drawn flat and upright like the Bradley figure rather than projected into the
   scene's isometric. The characters are the one tier of this artwork that faces
   the viewer, and a properly projected bot standing next to a flat conductor
   reads as two illustrations pasted together. */

const bot = {
  chassis: "#10b981",
  chassisShade: "#059669",
  // One step lighter than the body so the head separates from it without a
  // stroke; at this scale an outline is heavier than the shape it describes.
  shell: "#34d399",
  // The figure's belt near-black. The visor has to be the darkest value in the
  // scene or the eyes inside it have nothing to glow against.
  visor: "#1c2b25",
  eye: "#6ee7b7",
  mark: "#d1fae5",
  status: "#fbbf24",
} as const;

/* The tool each bot stands for, drawn to a ±9.5 box and scaled onto the chest.
   Silhouettes only: at this size the marks are about 15px across on screen, so
   anything past the overall shape is noise. */
const marks: Record<AgentKind, React.ReactNode> = {
  // Claude's radial burst. Eight blades, each tapering to a point on the way
  // out. The first pass had ten blades alternating long and short, closer to the
  // real mark's count, and at 15px the extra blades filled the gaps until the
  // whole thing read as a flower — and as the same shape as Gemini's spark two
  // pads over. Fewer, chunkier blades hold the burst's silhouette at size.
  claude: (
    <g fill={bot.mark}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path key={deg} d="M0 -9.5 L1.75 -3.4 L0 0 L-1.75 -3.4 Z" transform={`rotate(${deg})`} />
      ))}
    </g>
  ),
  // The same pair of chevrons the hero toolchain glyph uses for Codex, so the
  // two places the tool appears on the page agree on what it looks like.
  codex: (
    <g fill="none" stroke={bot.mark} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M-2.4 -6.6 L-8.4 0 L-2.4 6.6" />
      <path d="M2.4 -6.6 L8.4 0 L2.4 6.6" />
    </g>
  ),
  // Gemini's four-point spark.
  gemini: (
    <path
      d="M0 -9.5 C0.75 -3.6 3.6 -0.75 9.5 0 C3.6 0.75 0.75 3.6 0 9.5 C-0.75 3.6 -3.6 0.75 -9.5 0 C-3.6 -0.75 -0.75 -3.6 0 -9.5 Z"
      fill={bot.mark}
    />
  ),
};

/* An arm hinged at the shoulder, so a gesture rotates where an arm actually
   rotates. side 1 is the arm on the right of the drawing. Drawn straight down
   from the hinge and given its resting splay inside the animated group, so the
   gesture composes with the splay instead of replacing it. */
function Arm({ side, motion }: { side: 1 | -1; motion?: string }) {
  return (
    <g transform={`translate(${16.7 * side},-27)`}>
      <g className={motion}>
        <g transform={`rotate(${-10 * side})`}>
          <rect x="-2.7" y="0" width="5.4" height="15" rx="2.7" fill={bot.chassisShade} />
        </g>
      </g>
    </g>
  );
}

export function AgentBot({ kind, transform }: AgentBotProps) {
  const motion = styles.motionByKind[kind];

  return (
    <g transform={transform}>
      {/* Outside the lean, because a shadow cast on the pad does not lean with
          the thing casting it. */}
      <ellipse cx="0" cy="0" rx="15" ry="5" fill={bot.chassisShade} opacity="0.3" />
      <g className={motion.lean}>
        {/* Arms and neck go down before the body, so the body silhouette cuts
            them off cleanly at the shoulder and the collar. */}
        <Arm side={-1} motion={motion.armFar} />
        <Arm side={1} motion={motion.armNear} />
        <rect x="-4" y="-34" width="8" height="6" rx="1.6" fill={bot.chassisShade} />
        <rect x="-9.5" y="-7" width="19" height="7" rx="2.8" fill={bot.chassisShade} />
        <rect x="-14" y="-30" width="28" height="23" rx="8" fill={bot.chassis} />
        <path d="M5 -30 h1 q8 0 8 8 v7 q0 8 -8 8 h-1 z" fill={bot.chassisShade} />
        <g transform="translate(0,-19) scale(0.8)">{marks[kind]}</g>
        {/* Head, hinged on the collar rather than on its own centre: a head that
            tilts about its middle slides off the neck it is sitting on. */}
        <g transform="translate(0,-30)">
          <g className={motion.headTilt}>
            <g transform="translate(0,30)">
              <rect x="-15.6" y="-49" width="3" height="8" rx="1.5" fill={bot.chassisShade} />
              <rect x="12.6" y="-49" width="3" height="8" rx="1.5" fill={bot.chassisShade} />
              <rect x="-13" y="-55" width="26" height="22" rx="8" fill={bot.shell} />
              <rect x="-10" y="-50" width="20" height="11.5" rx="5.75" fill={bot.visor} />
              {/* Parked a half-pan left of centre. The slide runs from zero to
                  its offset, so starting centred would pan the eyes to one side
                  of the visor and back rather than across it. */}
              <g className={motion.eyeScan}>
                <circle cx="-5.7" cy="-44.3" r="2.3" fill={bot.eye} />
                <circle cx="3.1" cy="-44.3" r="2.3" fill={bot.eye} />
              </g>
              <rect x="-1.2" y="-62" width="2.4" height="8" rx="1.2" fill={bot.chassisShade} />
              <circle cx="0" cy="-63.6" r="3" fill={bot.status} className={styles.statusByKind[kind]} />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}
