export type BradPose = "spec" | "context" | "agents" | "gates";

/** Which clock the head runs on, and so which pair of drawings it cuts between. */
export type BradHeadLook = "glance" | "track" | "nod";

export type BradFigureProps = {
  pose: BradPose;
  /** Scene-local placement: translate(feetX,feetY) scale(s) translate(0,-159). */
  transform: string;
};
