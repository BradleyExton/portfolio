export type CapabilityEmphasis = "core" | "ai";

export type AiToolLevel = "core" | "exploring";

export type WhatIDoCapability = {
  title: string;
  outcome: string;
  proofPoints: readonly string[];
  techChips: readonly string[];
  emphasis?: CapabilityEmphasis;
};

export type WhatIDoAiTool = {
  name: string;
  usage: string;
  level: AiToolLevel;
};
