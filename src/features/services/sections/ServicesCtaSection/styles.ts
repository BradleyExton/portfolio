import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-gradient-to-br from-brand to-brand-strong text-content-inverse`;
export const container = `${spacing.container5} text-center`;
export const heading = `${typeScale.sectionTitle} mb-5 leading-tight text-content-inverse md:text-4xl`;
export const description = `mx-auto mb-7 max-w-2xl ${typeScale.sectionDescription} text-brand-muted md:text-lg`;
export const link = "group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface px-5 py-3.5 text-base font-medium text-brand transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-surface-muted hover:shadow-lg sm:w-auto sm:px-7";
export const icon = "h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
