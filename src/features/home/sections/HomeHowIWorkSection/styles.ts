import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} relative overflow-hidden bg-surface-muted`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_10%_0%,var(--color-brand-weak)_0%,transparent_58%),radial-gradient(120%_120%_at_90%_100%,var(--color-brand-soft)_0%,transparent_62%)] opacity-70";
export const container = `relative ${spacing.container6}`;
export const eyebrow = typeScale.eyebrow;
export const heading = `${typeScale.sectionTitle} mb-5`;
export const description = `mb-8 ${typeScale.sectionDescription} md:mb-10`;

export const stageList = "grid grid-cols-1";
export const stageItem = "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:gap-x-6 md:pb-10";
export const stageMarkerColumn = "flex flex-col items-center";
export const stageIndex = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-tint bg-brand-weak text-sm font-bold text-brand font-[family-name:var(--font-space-grotesk)]";
export const stageRail = "mt-2 w-px flex-1 bg-border-default";

export const stageCard = "rounded-2xl border border-border-default bg-surface p-5 shadow-sm md:p-6 xl:p-7";
export const stageLayout = "grid gap-5 lg:grid-cols-[minmax(0,55%)_minmax(0,45%)] lg:items-center lg:gap-8";
export const stageContent = "min-w-0";
export const stageContentDesktopSwap = "lg:order-2";
export const stageName = typeScale.cardTitle;
export const stageBody = "mb-4 text-sm leading-relaxed text-content-muted sm:text-base";
export const chipList = "flex flex-wrap gap-2";
export const chip = typeScale.tagPill;

export const illustrationPanel = "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-brand-weak/60 via-surface to-surface-muted";
export const illustrationPanelDesktopSwap = "lg:order-1";
export const illustrationImage = "object-contain object-center p-3 lg:p-4";

export const closing = "mt-8 text-balance text-center text-lg font-semibold text-content font-[family-name:var(--font-space-grotesk)] sm:text-xl md:mt-10";
