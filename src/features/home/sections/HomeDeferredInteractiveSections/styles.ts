import { spacing } from "@/features/shared/designSystem";

// Matches the inverted band the real section renders on, so the deferred swap
// does not flash a light block where a dark one is about to land.
export const placeholderHowIWorkSection = `${spacing.section} relative bg-[linear-gradient(165deg,var(--color-brand-deep),var(--color-brand-deeper)_58%,var(--color-brand-deep))]`;
export const placeholderExperienceSection = `${spacing.section} relative overflow-hidden bg-surface`;
export const placeholderContainer = `relative ${spacing.container6}`;
// The placeholders drive SectionIntro with the same tone/align props the real
// sections use, so eyebrow color, title size and description color all come
// from one place. They previously restated those tokens as appended
// classNames, which both duplicated SectionIntro's own utilities and left the
// color conflicts (brand vs brand-contrast) to generated CSS order.
// The title-to-content gaps are carried by the stand-in blocks below rather
// than by a second margin utility on SectionIntro's heading, so nothing
// depends on which of two competing mb-* utilities the cascade picks.
// Sized toward the illustrated track it stands in for, so the swap on
// approach shifts layout as little as possible.
// mt matched to the gap the real section opens above the same block (How I
// Work: description mb-10/md:mb-12; Experience: heading mb-10), so the swap
// lands the stand-in and its replacement on the same line.
export const placeholderCard = "mt-10 h-96 rounded-2xl border border-content-inverse/10 bg-content-inverse/[0.04] shadow-sm md:mt-12";
export const placeholderTimeline = "mt-10 h-72 rounded-2xl border border-border-subtle bg-surface/70 shadow-sm";
