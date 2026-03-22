import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-gradient-to-br from-brand-strong via-brand-deep to-brand-deeper text-content-inverse`;
export const container = `${spacing.container6} text-center`;
export const heading = `${typeScale.sectionTitle} mb-5 text-content-inverse md:mb-6 md:text-4xl`;
export const description = `mx-auto mb-7 max-w-2xl ${typeScale.sectionDescription} text-content-inverse sm:text-lg md:mb-8`;
export const row = "flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4";
export const primaryLink = "w-full px-6 py-2.5 text-brand-strong hover:-translate-y-0.5 sm:w-auto";
export const secondaryLink = "w-full border-brand-tint bg-brand-deep px-6 py-2.5 hover:-translate-y-0.5 hover:border-surface hover:bg-brand-deeper focus-visible:outline-surface sm:w-auto";
export const tertiaryLink = "w-full border-brand-tint/85 px-6 py-2.5 text-content-inverse hover:-translate-y-0.5 hover:border-surface hover:bg-brand-deeper/45 focus-visible:outline-surface sm:w-auto";
export const icon = "h-4 w-4";
