import { spacing, typeScale } from "@/features/shared/designSystem";

// Matches the inverted band the real section renders on, so the deferred swap
// does not flash a light block where a dark one is about to land.
export const placeholderHowIWorkSection = `${spacing.section} relative bg-[linear-gradient(165deg,var(--color-brand-deep),var(--color-brand-deeper)_58%,var(--color-brand-deep))]`;
export const placeholderExperienceSection = `${spacing.section} relative overflow-hidden bg-surface`;
export const placeholderContainer = `relative ${spacing.container6}`;
export const placeholderEyebrow = typeScale.eyebrow;
export const placeholderHeading = `${typeScale.sectionTitle} mb-5`;
export const placeholderText = `max-w-3xl ${typeScale.sectionDescription}`;
export const placeholderEyebrowInverse = "mb-3 text-sm font-semibold uppercase tracking-wider text-brand-contrast";
export const placeholderHeadingInverse = `${typeScale.sectionTitleInverse} mb-5`;
export const placeholderTextInverse = `max-w-3xl ${typeScale.sectionDescriptionInverse}`;
// Sized toward the illustrated track it stands in for, so the swap on
// approach shifts layout as little as possible.
export const placeholderCard = "mt-8 h-96 rounded-2xl border border-content-inverse/10 bg-content-inverse/[0.04] shadow-sm";
export const placeholderTimeline = "mt-8 h-72 rounded-2xl border border-border-subtle bg-surface/70 shadow-sm";
