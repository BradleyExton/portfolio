import type { AiToolLevel, CapabilityEmphasis } from "./types";

export const joinClassNames = (...classes: Array<string | false | undefined>): string => {
  return classes.filter(Boolean).join(" ");
};

export const getCapabilityCardVariant = (emphasis?: CapabilityEmphasis): string => {
  if (emphasis === "ai") {
    return "border-brand-tint bg-brand-weak/80";
  }

  return "border-border-default bg-surface/95";
};

export const getToolLevelBadgeVariant = (level: AiToolLevel): string => {
  if (level === "core") {
    return "border-brand-tint bg-brand-soft text-brand-strong";
  }

  return "border-border-default bg-surface-muted text-content-muted";
};

export const getToolLevelLabel = (level: AiToolLevel): string => {
  if (level === "core") {
    return "Core";
  }

  return "Exploring";
};
