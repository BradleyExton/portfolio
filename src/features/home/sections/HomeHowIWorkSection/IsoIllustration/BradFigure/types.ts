export type BradPose = "spec" | "context" | "agents" | "gates";

export type BradFigureProps = {
  pose: BradPose;
  /** Scene-local placement: translate(feetX,feetY) scale(s) translate(0,-159). */
  transform: string;
};
