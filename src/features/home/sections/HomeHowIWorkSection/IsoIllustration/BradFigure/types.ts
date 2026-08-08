export type BradPose = "spec" | "context" | "agents" | "gates";

/** Which head clock a pose runs: a back view glancing over either shoulder,
 *  the lens-tracking turn, a plain on-beat nod, or a static front view. */
export type BradLook = "over" | "track" | "nod";

export type BradFigureProps = {
  pose: BradPose;
  /** Scene-local placement: translate(feetX,feetY) scale(s) translate(0,-159). */
  transform: string;
};
