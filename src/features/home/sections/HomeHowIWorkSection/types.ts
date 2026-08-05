export type HowIWorkStageId = "spec" | "context" | "agents" | "gates";

export type HowIWorkStage = {
  id: HowIWorkStageId;
  station: string;
  name: string;
  body: string;
  chips: readonly string[];
};
