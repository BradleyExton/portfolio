
export type CapabilityId = "delivery" | "frontend" | "platform";

export type WhatIDoCapability = {
  id: CapabilityId;
  title: string;
  outcome: string;
  proofPoints: readonly [string, string];
  techChips: readonly string[];
};
