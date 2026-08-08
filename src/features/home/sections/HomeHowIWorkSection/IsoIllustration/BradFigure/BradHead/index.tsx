import type { BradHeadLook } from "../types";
import { palette } from "../utils";
import * as styles from "./styles";

/* Four head drawings, hard-cut between: front, 3/4, back, and a glance over the
   shoulder. Sliding one drawing's features sideways was the first attempt and is
   a dead end — the fringe, the ear, the nose and the chin all keep reading
   frontally no matter where the eyes go. All four share the same 42x52 head box
   and the same tilt wrapper, so only the drawing changes at the cut. */

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
   front receded, a back mass reads as a bob instead of the back of a head.
   Faces +x; placement decides what that means on screen. */
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

/* Straight up the back of his head. The recession is a front hairline, so from
   behind the crown is one unbroken slicked mass; what keeps it from reading as
   a brown egg is the strand fan over the crown, the nape arch cutting the hair
   short of the jaw, and both ears standing proud at the silhouette. */
const backFace = (
  <>
    <rect x="-6" y="52" width="12" height="10" fill={palette.skinShade} />
    <path d="M-21 22 q0 -20 21 -20 q21 0 21 20 l0 14 q0 18 -21 18 q-21 0 -21 -18 z" fill={palette.skin} />
    <path
      d="M-21 22 q0 -20 21 -20 q21 0 21 20 l0 11 Q20.5 38 13 40.5 Q6.5 42.5 0 42.5 Q-6.5 42.5 -13 40.5 Q-20.5 38 -21 33 z"
      fill={palette.hair}
    />
    <path
      d="M-9.5 9 Q-13 24 -12.5 36 M0 5.5 Q0 24 0 41 M9.5 9 Q13 24 12.5 36"
      stroke={palette.hairShade}
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="-21" cy="32" r="4.5" fill={palette.skin} />
    <circle cx="21" cy="32" r="4.5" fill={palette.skinShade} />
  </>
);

/* The look-up beat for a body that is facing away: a glance back over his
   shoulder, which is the 3/4 view turned the other way. A true three-quarter
   REAR was drawn first — hair owning the silhouette, a crescent of cheek and
   the nose tip breaking its far edge — and at the 0.78 scale this renders at it
   collapsed into a brown egg with a bump on it. The face has to actually come
   round for the beat to read as him looking up. */
const glanceFace = <g transform="scale(-1,1)">{turnedFace}</g>;

/* `look` picks the clock and the pair of drawings on it. "glance" holds the
   back of his head for two bars of the writing loop and beats on the shoulder
   glance; "track" swings out and back with the lens sweep; "nod" is a plain
   on-beat bob with no turn at all. `held` is always the drawing the pair rests
   on, so a still of the scene — or reduced motion — lands on the pose the loop
   spends most of its time in. */
const turnMotion = {
  glance: {
    tilt: styles.headTilt,
    held: { className: styles.faceHeld, face: backFace },
    beat: { className: styles.faceBeat, face: glanceFace },
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
