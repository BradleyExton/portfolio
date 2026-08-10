import { bradFrontFace } from "@/features/shared/character/bradArtwork";
import type { BradHeadLook } from "../types";
import { palette } from "../utils";
import * as styles from "./styles";

/* Two head drawings, hard-cut between: front and 3/4. Sliding one drawing's
   features sideways was the first attempt and is a dead end — the fringe, the
   ear, the nose and the chin all keep reading frontally no matter where the eyes
   go. Both share the same 42x52 head box and the same tilt wrapper, so only the
   drawing changes at the cut.
   A 3/4 rear drawing lived here too, for the stretch when the spec figure worked
   with his back to us. It is gone with that staging: he now stands at the
   board's corner rather than in front of it, so every scene shows his face. */

/* Shared with the nav mark, so the geometry lives in bradArtwork: the mark is
   this same drawing scaled down, not a redraw of it. */
const frontFace = (
  <>
    <rect {...bradFrontFace.neck} fill={palette.skinShade} />
    <path d={bradFrontFace.skull} fill={palette.skin} />
    <circle {...bradFrontFace.earLeft} fill={palette.skin} />
    <circle {...bradFrontFace.earRight} fill={palette.skinShade} />
    <path d={bradFrontFace.stubble} fill={palette.stubble} opacity="0.55" />
    <path d={bradFrontFace.hair} fill={palette.hair} />
    <path d={bradFrontFace.sideburnLeft} fill={palette.hair} />
    <path d={bradFrontFace.sideburnRight} fill={palette.hair} />
    <circle {...bradFrontFace.eyeLeft} fill={palette.eye} />
    <circle {...bradFrontFace.eyeRight} fill={palette.eye} />
    <path d={bradFrontFace.brows} stroke={palette.brow} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d={bradFrontFace.nose} stroke={palette.nose} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d={bradFrontFace.mouth} stroke={palette.mouth} strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

/* The same recession read from the side, as one slicked-back cap: it starts
   back from the brow, sweeps over the crown and dies at the nape. Drawn as a
   single path rather than a front tuft plus a separate back mass — with the
   front receded, a back mass reads as a bob instead of the back of a head.
   Faces +x; placement decides what that means on screen.
   The head is the one part of him a viewer reads as a solid, so it carries the
   shaded side the flat fills never gave it: the far cheek falls away behind the
   brow, and the slicked cap darkens where it leaves the skull. Both are drawn
   inside the skull silhouette, so neither can widen it. */
const turnedFace = (
  <>
    <rect x="-1" y="52" width="12" height="10" fill={palette.skinShade} />
    <path d="M-12 26 q0 -24 18 -24 q16 0 16 21 l0 10 q0 19 -16 19 q-18 0 -18 -19 z" fill={palette.skin} />
    <path d="M21 26 q6 5 5 9 q-1 3 -5 2 z" fill={palette.skin} />
    <path
      d="M-12 26 q0 -24 18 -24 q4 0 7 1.4 q-13 3 -13 24 l0 10 q0 15 10 18.4 q-2 0.6 -4 0.6 q-18 0 -18 -19 z"
      fill={palette.skinShade}
      opacity="0.55"
    />
    <path d="M-10 38 q0 15 16 15 q16 0 16 -15 l0 5 q-2 13 -16 13 q-14 0 -16 -13 z" fill={palette.stubble} opacity="0.55" />
    <path
      d="M-10.5 37 C-13.6 30 -14 19.5 -10.8 11 C-7 1.8 0 -0.8 7 0.6 C11.5 1.7 14 3.4 15.4 5.6 C12.6 4 9.6 5.4 6.6 8.4 C2.6 12.4 -0.6 17.4 -2.4 22.6 C-3.6 26 -4.2 28.6 -4.2 30.6 C-5.4 34 -7.8 36.4 -10.5 37 Z"
      fill={palette.hair}
    />
    <path
      d="M-10.5 37 C-13.6 30 -14 19.5 -10.8 11 C-9.4 7.6 -7.4 5.2 -5.2 3.6 C-7.4 8.4 -8.6 15.4 -8 22 C-7.6 27 -6.8 31.4 -5.6 34.2 C-7 35.8 -8.7 36.7 -10.5 37 Z"
      fill={palette.hairShade}
      opacity="0.75"
    />
    <ellipse cx="-2" cy="34" rx="4.4" ry="5.6" fill={palette.skinShade} />
    <path d="M-3 32 q3 2 1 5" stroke="#d8a077" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="12" cy="30" r="2.4" fill={palette.eye} />
    <path d="M8 23 q4 -2.5 8 0" stroke={palette.brow} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M12 43 q4 4 7 -1" stroke={palette.mouth} strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

/* `look` picks the clock and the pair of drawings on it. "glance" holds the 3/4
   on the board for two bars of the writing loop and beats on a look up at us;
   "track" swings out and back with the lens sweep; "nod" is a plain on-beat bob
   with no turn at all. `held` is always the drawing the pair rests on, so a
   still of the scene — or reduced motion — lands on the pose the loop spends
   most of its time in. */
const turnMotion = {
  glance: {
    tilt: styles.headTilt,
    held: { className: styles.faceHeld, face: turnedFace },
    beat: { className: styles.faceBeat, face: frontFace },
  },
  track: {
    tilt: styles.headTrack,
    held: { className: styles.trackFront, face: frontFace },
    beat: { className: styles.trackTurned, face: turnedFace },
  },
} as const;

export function BradHead({ look }: { look?: BradHeadLook }) {
  const motion = look === "glance" || look === "track" ? turnMotion[look] : undefined;

  return (
    <g transform="translate(0,56)">
      <g className={look === "nod" ? styles.headNod : undefined}>
        <g className={motion?.tilt}>
          <g transform="translate(0,-56)">
            <g className={motion?.held.className}>{motion ? motion.held.face : frontFace}</g>
            {motion ? <g className={motion.beat.className}>{motion.beat.face}</g> : null}
          </g>
        </g>
      </g>
    </g>
  );
}
