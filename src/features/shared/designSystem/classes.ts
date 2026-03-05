export const spacing = {
  section: "px-4 py-12 sm:px-6 sm:py-16 md:py-20",
  hero: "px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32",
  container6: "mx-auto max-w-6xl",
  container5: "mx-auto max-w-5xl",
  container4: "mx-auto max-w-4xl",
  introBlock: "mx-auto mb-7 max-w-3xl md:mb-10",
} as const;

export const typeScale = {
  eyebrow: "mb-3 text-sm font-semibold uppercase tracking-wider text-brand",
  heroTitle:
    "mb-6 text-5xl font-bold leading-tight text-content font-[family-name:var(--font-space-grotesk)] md:text-6xl lg:text-7xl",
  pageHeroTitle:
    "mb-5 text-balance text-3xl font-bold leading-tight tracking-tight text-content font-[family-name:var(--font-space-grotesk)] sm:text-4xl md:text-5xl",
  sectionTitle:
    "mb-4 text-balance text-2xl font-bold text-content font-[family-name:var(--font-space-grotesk)] sm:text-3xl",
  sectionDescription: "max-w-[62ch] text-sm leading-relaxed text-content-muted sm:text-base",
  leadBody: "text-base leading-relaxed text-content-muted sm:text-lg",
  cardTitle: "mb-2 text-lg font-semibold text-content sm:text-xl",
  metaLabel: "text-xs font-semibold uppercase tracking-wide text-content-faint",
} as const;
