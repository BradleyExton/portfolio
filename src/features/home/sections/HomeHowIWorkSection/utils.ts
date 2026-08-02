import type { HowIWorkStageId } from "./types";

const STAGE_ILLUSTRATIONS: Record<HowIWorkStageId, string> = {
  spec: "/images/how-i-work/spec.svg",
  context: "/images/how-i-work/context.svg",
  agents: "/images/how-i-work/agents.svg",
  gates: "/images/how-i-work/gates.svg",
};

export const getStageIllustrationSrc = (stageId: HowIWorkStageId): string =>
  STAGE_ILLUSTRATIONS[stageId];

export const formatStageIndex = (index: number): string =>
  String(index + 1).padStart(2, "0");
