import type { AgentKind } from "./types";

// Status light on the antenna, running the scene's shared twinkle. Staggered
// by a third of the bar per agent so the three never pulse in unison.
export const statusByKind = {
  claude: "iso-loop-tw",
  codex: "iso-loop-tw [--iso-tw-delay:-0.8s]",
  gemini: "iso-loop-tw [--iso-tw-delay:-1.6s]",
} as const;

/* Each station runs its own gesture rather than the shared vertical beat all
   three used to bob on. A tile on a translateY reads as a piece being moved;
   a humanoid on the same translateY reads as hopping, which is the one thing a
   working agent should not look like it is doing. So the vertical is gone and
   what is left is three different jobs being done: one scanning, one working
   its hands, one thinking it over.
   Every duration is a multiple of the scene's 2.4s bar, so the three are still
   on the conductor's tempo even though they never share a move. */
type BotMotion = {
  /** Whole body above the feet; pivots where a standing body pivots. */
  lean?: string;
  headTilt?: string;
  eyeScan?: string;
  armNear?: string;
  armFar?: string;
};

export const motionByKind: Record<AgentKind, BotMotion> = {
  // Reading: eyes tracking across the visor with the head panning after them on
  // the same clock. The eyes alone travel about four screen pixels at the size
  // this scene actually renders at, which is not a gesture — the head carries
  // the read and the eyes make it land.
  claude: {
    eyeScan: "iso-loop-slide [--iso-slide-duration:4.8s] [--iso-slide-x:3.2px] [--iso-slide-y:0px]",
    headTilt: "iso-loop-sway [--iso-sway-duration:4.8s] [--iso-sway-deg:-4.5deg]",
  },
  // Working its hands, on the same bar the near baton beats. The arms take
  // opposite signs and a half-bar of phase between them: matched signs swung
  // the pair the same way, which read as the whole bot rocking rather than as
  // two hands taking turns.
  codex: {
    armNear: "iso-loop-sway [--iso-sway-duration:2.4s] [--iso-sway-deg:-13deg]",
    armFar: "iso-loop-sway [--iso-sway-duration:2.4s] [--iso-sway-deg:13deg] [--iso-sway-delay:-1.2s]",
  },
  // Thinking it over: a slow lean with a wider, slower head tilt across it, so
  // the two never line up and the bot never looks like it is keeping time.
  gemini: {
    lean: "iso-loop-sway [--iso-sway-duration:4.8s] [--iso-sway-deg:2.5deg]",
    headTilt: "iso-loop-sway [--iso-sway-duration:7.2s] [--iso-sway-deg:6deg]",
  },
};
