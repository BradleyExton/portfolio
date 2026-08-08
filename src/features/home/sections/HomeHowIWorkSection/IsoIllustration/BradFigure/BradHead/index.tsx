import { palette } from "../palette";
import type { BradLook } from "../types";
import * as styles from "./styles";

/* Three head drawings, hard-cut between: front, 3/4, and back. Sliding the
   front face's features sideways was the first attempt and is a dead end —
   the fringe, the ear, the nose and the chin all keep reading frontally no
   matter where the eyes go. All three share the same 42x52 head box and the
   same turn wrapper, so only the face changes at the cut.
   The 3/4 view faces +x, and a caller mirrors it to glance the other way.
   `look` picks the clock — "over" holds the back of the head and glances over
   either shoulder through the writing loop, "track" swings out and back with
   the lens sweep, "nod" is a plain on-beat bob with no turn at all. */
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
      stroke={palette.hairShade}
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
    <path
      d="M8 23 q4 -2.5 8 0"
      stroke={palette.hairShade}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M12 43 q4 4 7 -1" stroke="#8f6844" strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </>
);

/* Back of the head: a single hair mass filling the whole skull silhouette, with
   only the ears breaking it at the sides. Every attempt at more detail made it
   worse — a nape hairline leaves a pale crescent that reads as a chin, and a
   crown parting reads as a scar at this size. The one shape that survives is a
   soft shade band low on the back, which gives the mass its roundness. */
const backHead = (
  <>
    <rect x="-6" y="52" width="12" height="10" fill={palette.skinShade} />
    <path
      d="M-21 22 q0 -20 21 -20 q21 0 21 20 l0 14 q0 18 -21 18 q-21 0 -21 -18 z"
      fill={palette.skin}
    />
    <path
      d="M-21 26 q0 -24 21 -24 q21 0 21 24 l0 12 q0 14 -21 14 q-21 0 -21 -14 z"
      fill={palette.hair}
    />
    <path
      d="M-20 38 q7 8 20 8 q13 0 20 -8 q0 14 -20 14 q-20 0 -20 -14 z"
      fill={palette.hairShade}
      opacity="0.28"
    />
    <circle cx="-21" cy="32" r="4.5" fill={palette.skin} />
    <circle cx="21" cy="32" r="4.5" fill={palette.skinShade} />
  </>
);

/* Wrapped so the turn pivots on the neck rather than the head box's own
   origin: outer translate puts (0,0) at the base of the neck, inner one puts
   the drawings back where they were authored. */
export function BradHead({ look }: { look?: BradLook }) {
  const faces =
    look === "over" ? (
      <>
        <g className={styles.faceBack}>{backHead}</g>
        <g className={styles.glanceNear}>{turnedFace}</g>
        <g className={styles.glanceFar} transform="scale(-1,1)">
          {turnedFace}
        </g>
      </>
    ) : look === "track" ? (
      <>
        <g className={styles.trackFront}>{frontFace}</g>
        <g className={styles.trackTurned}>{turnedFace}</g>
      </>
    ) : (
      frontFace
    );

  const turn = look === "over" ? styles.headGlance : look === "track" ? styles.headTrack : undefined;

  return (
    <g transform="translate(0,56)">
      <g className={look === "nod" ? styles.headNod : undefined}>
        <g className={turn}>
          <g transform="translate(0,-56)">{faces}</g>
        </g>
      </g>
    </g>
  );
}
