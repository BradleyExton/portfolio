export type HowIWorkStageId = "spec" | "context" | "agents" | "gates";

export type HowIWorkStage = {
  id: HowIWorkStageId;
  name: string;
  body: string;
  chips: readonly string[];
};
