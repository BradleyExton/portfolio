import { spacing, typeScale } from "@/features/shared/designSystem";

// brand-weak, like the homepage services band: the one tinted section on the
// page, saved for the evidence.
export const section = `${spacing.section} relative overflow-hidden bg-brand-weak`;
export const ambientBackdrop =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_2%_0%,var(--color-brand-soft)_0%,transparent_55%),radial-gradient(80%_80%_at_98%_100%,var(--color-brand-tint)_0%,transparent_58%)] opacity-30";
export const container = `relative ${spacing.container6}`;
export const intro = "mb-7 max-w-3xl md:mb-10";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;

export const stats = "scroll-view-stagger grid gap-3 sm:grid-cols-3 sm:gap-4";
export const stat = "flex flex-col-reverse gap-1 rounded-2xl border border-brand-tint bg-surface px-5 py-4";
export const statLabel = "text-sm leading-snug text-content-muted";
export const statValue = "text-3xl font-bold tracking-tight text-brand-strong font-[family-name:var(--font-space-grotesk)]";

export const checks = "mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2";
export const check = "flex gap-3 text-sm leading-relaxed text-content sm:text-base";
export const checkIcon = "mt-0.5 h-5 w-5 shrink-0 text-brand";
