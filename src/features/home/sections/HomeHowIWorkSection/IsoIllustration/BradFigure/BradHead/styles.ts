// Head motion hooks. Each class pairs with a keyframe in globals.css and stays
// paused until its scene reports data-inview, so nothing animates off-screen.
// Durations are multiples of the shared 2.4s beat.

// Head turn (spec): the skull tilts continuously while the held and beat
// drawings hard-cut between each other. All three share one duration so the cut
// always lands inside the held part of the tilt, never mid-swing. Sign is read
// in the figure's own frame, where the writing arm and the board are both up to
// his right: a clockwise tilt leans him into the board rather than away from it,
// and stays that way when the scene mirrors him.
export const headTilt = "iso-loop-look-tilt [--iso-look-deg:10deg]";
export const faceHeld = "iso-loop-face-held";
export const faceBeat = "iso-loop-face-beat";

// Same pair on the magnifier sweep's clock (gates): he looks where the lens
// goes rather than holding a stare at camera while scanning.
export const headTrack = "iso-loop-track";
export const trackFront = "iso-loop-track-front";
export const trackTurned = "iso-loop-track-turned";

// Small on-the-beat nod while conducting (agents).
export const headNod = "iso-loop-bob [--iso-bob-duration:2.4s] [--iso-bob-y:-2px]";
