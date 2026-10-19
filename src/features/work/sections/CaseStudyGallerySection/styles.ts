import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface`;
export const container = spacing.container6;
export const intro = "mb-7 max-w-3xl md:mb-10";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;

export const screenGrid = "grid gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10";
export const leadScreen = "md:col-span-2";
// Phones sit on a muted plinth so three dark bezels in a row read as a set
// rather than three holes in a white page.
// Flex rather than a grid so two phones centre as a pair instead of leaving
// an empty third column.
export const phoneRow =
  "mt-10 flex flex-wrap justify-center gap-8 rounded-2xl bg-surface-muted px-6 py-8 sm:px-8 md:mt-12 lg:gap-12 lg:px-12 lg:py-10";
export const phoneItem = "w-full max-w-60 sm:w-60";
