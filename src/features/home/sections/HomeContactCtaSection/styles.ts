import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-gradient-to-br from-brand to-brand-strong text-content-inverse`;
export const container = `${spacing.container4} text-center`;
export const heading = `${typeScale.sectionTitle} mb-6 text-content-inverse md:text-4xl`;
export const description = `mx-auto mb-8 max-w-2xl ${typeScale.leadBody} text-brand-muted`;
export const row = "flex flex-wrap justify-center gap-4";
export const link = "group inline-flex items-center gap-2 rounded-lg bg-surface px-6 py-3 font-medium text-brand transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-surface-muted hover:shadow-lg";
export const icon = "h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
export const ctaLink = "group inline-flex items-center gap-2 rounded-lg bg-brand-deep px-6 py-3 font-medium text-content-inverse transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-deeper hover:shadow-lg";
