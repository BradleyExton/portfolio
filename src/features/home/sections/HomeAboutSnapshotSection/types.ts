export type CapabilityEmphasis = "core" | "ai";

export type CapabilityId = "delivery" | "frontend" | "platform" | "ai";

export type WhatIDoCapability = {
  id: CapabilityId;
  title: string;
  outcome: string;
  proofPoints: readonly [string, string];
  techChips: readonly string[];
  emphasis?: CapabilityEmphasis;
};
