export type BradPose = "spec" | "context" | "agents" | "gates";

/** Which clock the head runs on, and so which pair of drawings it cuts between. */
export type BradHeadLook = "glance" | "track" | "nod";

export type BradFigureProps = {
  pose: BradPose;
  /** Scene-local placement: translate(feetX,feetY) scale(s) translate(0,-159). */
  transform: string;
};

export type LimbProps = {
  fill: string;
  length: number;
  /** Draw the hand over the prop rather than under it, so the grip closes on it. */
  grip?: boolean;
  children?: React.ReactNode;
};

export type BodyProps = {
  legs?: React.ReactNode;
  children: React.ReactNode;
};

export type BatonArmProps = {
  /** 1 is his right, the hand nearer the viewer. */
  side: 1 | -1;
  /** Resting angle off straight-down, before the sweep. */
  base: number;
  fill: string;
  sweep: string;
  flick: string;
};
