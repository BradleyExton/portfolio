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

export function AgentBot({ kind, transform }: AgentBotProps) {
  return (
    <g transform={transform}>
      <ellipse cx="0" cy="0" rx="15" ry="5" fill={bot.chassisShade} opacity="0.3" />
      {/* Arms and vents go down before the body and head, so the silhouettes on
          top cut them off cleanly at the shoulder and the temple. */}
      <rect x="-19.4" y="-27" width="5.4" height="15" rx="2.7" fill={bot.chassisShade} transform="rotate(10 -16.7 -27)" />
      <rect x="14" y="-27" width="5.4" height="15" rx="2.7" fill={bot.chassisShade} transform="rotate(-10 16.7 -27)" />
      <rect x="-15.6" y="-49" width="3" height="8" rx="1.5" fill={bot.chassisShade} />
      <rect x="12.6" y="-49" width="3" height="8" rx="1.5" fill={bot.chassisShade} />
      <rect x="-4" y="-34" width="8" height="6" rx="1.6" fill={bot.chassisShade} />
      <rect x="-9.5" y="-7" width="19" height="7" rx="2.8" fill={bot.chassisShade} />
      <rect x="-14" y="-30" width="28" height="23" rx="8" fill={bot.chassis} />
      <path d="M5 -30 h1 q8 0 8 8 v7 q0 8 -8 8 h-1 z" fill={bot.chassisShade} />
      <g transform="translate(0,-19) scale(0.8)">{marks[kind]}</g>
      <rect x="-13" y="-55" width="26" height="22" rx="8" fill={bot.shell} />
      <rect x="-10" y="-50" width="20" height="11.5" rx="5.75" fill={bot.visor} />
      <circle cx="-4.4" cy="-44.3" r="2.3" fill={bot.eye} />
      <circle cx="4.4" cy="-44.3" r="2.3" fill={bot.eye} />
      <rect x="-1.2" y="-62" width="2.4" height="8" rx="1.2" fill={bot.chassisShade} />
      <circle cx="0" cy="-63.6" r="3" fill={bot.status} className={styles.statusByKind[kind]} />
    </g>
  );
}
