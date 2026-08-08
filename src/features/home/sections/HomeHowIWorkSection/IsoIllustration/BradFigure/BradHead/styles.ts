// Head motion hooks. Each class pairs with a keyframe in globals.css and stays
// paused until its scene reports data-inview, so nothing animates off-screen.

// Spec: he writes with the back of his head to camera and glances over one
// shoulder, then the other. The neck swings continuously while the back and
// 3/4 drawings hard-cut between each other; all four share one duration so a
// cut always lands inside a held part of the swing.
export const headGlance = "iso-loop-glance";
export const faceBack = "iso-loop-face-back";
export const glanceNear = "iso-loop-glance-near";
export const glanceFar = "iso-loop-glance-far";

// Gates: the same front/three-quarter pair on the magnifier sweep's clock, so
// he looks where the lens goes rather than holding a stare at camera.
export const headTrack = "iso-loop-track";
export const trackFront = "iso-loop-track-front";
export const trackTurned = "iso-loop-track-turned";

// Agents: a small on-the-beat nod while conducting, no turn at all.
export const headNod = "iso-loop-bob [--iso-bob-duration:2.4s] [--iso-bob-y:-2px]";
