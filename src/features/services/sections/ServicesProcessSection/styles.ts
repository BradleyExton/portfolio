import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface-muted`;
export const container = spacing.container5;
export const eyebrow = typeScale.eyebrow;
export const subheading = `${typeScale.sectionTitle} mb-3 leading-tight`;
export const intro = `mb-7 max-w-3xl ${typeScale.sectionDescription} sm:mb-10`;
export const block = "relative space-y-6 sm:space-y-7";
export const blockRail = "pointer-events-none absolute left-5 top-10 bottom-10 w-px overflow-hidden bg-border-default sm:left-7 sm:top-12 sm:bottom-12";
export const blockRailFlow = "absolute inset-0 block bg-gradient-to-b from-transparent via-brand/70 to-transparent motion-safe:animate-[process-flow_2.4s_ease-in-out_infinite]";
export const row = "group relative flex gap-4 rounded-xl p-0.5 sm:gap-5 sm:p-1";
export const stepColumn = "relative flex w-10 flex-shrink-0 flex-col items-center sm:w-12";
export const stepBadge = "relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-base font-bold text-content-inverse shadow-[0_14px_26px_-18px_rgba(5,150,105,0.95)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.04] sm:h-12 sm:w-12 sm:text-lg";
export const stepContent = "pt-0.5";
export const cardTitle = `${typeScale.cardTitle} mb-2`;
export const description = "mb-2 leading-relaxed text-content-muted";
export const output = "text-sm leading-relaxed text-content-subtle";
export const outputLabel = "font-semibold text-content";
