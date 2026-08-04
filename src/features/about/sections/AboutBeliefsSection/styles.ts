import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface-muted`;
export const container = spacing.container6;
export const eyebrow = typeScale.eyebrow;
export const subheading = `${typeScale.sectionTitle} mb-7 max-w-3xl md:mb-8`;
export const block = "grid gap-4 sm:gap-5 md:grid-cols-2";
export const card = "group relative overflow-hidden rounded-2xl border border-border-default bg-surface p-5 shadow-[0_16px_34px_-28px_color-mix(in_srgb,var(--color-brand-tint)_82%,transparent)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-tint hover:shadow-[0_26px_56px_-32px_color-mix(in_srgb,var(--color-brand)_34%,transparent)] sm:p-6";
export const cardHeader = "mb-4 flex items-center gap-4";
export const cardIndex = "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-tint bg-brand-weak text-sm font-bold text-brand font-[family-name:var(--font-space-grotesk)]";
export const cardRule = "h-px flex-1 bg-border-default transition-colors duration-300 group-hover:bg-brand-tint";
export const cardTitle = `${typeScale.cardTitle} mb-2`;
export const description = "leading-relaxed text-content-muted";
