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
  // mb-5, not mb-6: the 72px line box carries ~12px of empty leading below the
  // descenders, so a 24px margin opened a larger optical gap to the lead
  // paragraph than the paragraph had to the CTA row, and the heading read as
  // detached from the sentence that explains it.
  heroTitle:
    "mb-5 text-5xl font-bold leading-tight tracking-tight text-content font-[family-name:var(--font-space-grotesk)] md:text-6xl lg:text-7xl",
  pageHeroTitle:
    "mb-5 text-balance text-3xl font-bold leading-tight tracking-tight text-content font-[family-name:var(--font-space-grotesk)] sm:text-4xl md:text-5xl",
  // Section titles sit one full step below the home hero (72px) and one full
  // step above cardTitle (20px), so the ladder reads 72 / 36 / 20 / 16 and a
  // section always outranks the cards inside it.
  sectionTitle:
    "mb-4 text-balance text-3xl font-bold tracking-tight text-content font-[family-name:var(--font-space-grotesk)] sm:text-4xl",
  sectionDescription: "max-w-[62ch] text-sm leading-relaxed text-content-muted sm:text-base",
  leadBody: "text-base leading-relaxed text-content-muted sm:text-lg",
  // Inverse variants for dark brand surfaces (CTA bands). These exist because
  // appending a color utility after a token that already sets one is an
  // unresolved conflict — the winner depends on generated CSS order, not
  // author order. Use these instead of overriding token colors.
  sectionTitleInverse:
    "mb-4 text-balance text-3xl font-bold tracking-tight text-content-inverse font-[family-name:var(--font-space-grotesk)] sm:text-4xl",
  sectionDescriptionInverse:
    "max-w-[62ch] text-sm leading-relaxed text-brand-muted sm:text-base",
  leadBodyInverse: "text-base leading-relaxed text-brand-muted sm:text-lg",
  cardTitle: "mb-2 text-lg font-semibold text-content sm:text-xl",
  // content-muted, not content-faint. Meta labels carry information (dates,
  // build windows, tag runs), and faint (#8fa99b) lands at 2.2:1 on brand-weak
  // and 2.3:1 on white — below AA at any size. Faint stays for placeholder
  // text and the dark-surface footer, where it has contrast to spare.
  metaLabel: "text-xs font-semibold uppercase tracking-wide text-content-muted",
  // Single treatment for topic-tag pills so adjacent sections don't rank the
  // same semantic element at different visual weights.
  tagPill: "rounded-full border border-border-default bg-surface-muted px-3 py-1 text-xs font-medium text-content-muted",
  // Same rank as tagPill, restated for dark brand surfaces. A light tagPill on
  // an inverted band reads as a bright chip and outranks the copy above it.
  tagPillInverse:
    "rounded-full border border-content-inverse/20 bg-content-inverse/10 px-3 py-1 text-xs font-medium text-content-inverse-muted",
} as const;

// Shared page-hero surface treatment so route heroes read as one family.
// Applied as an absolutely positioned backdrop layer inside a relative hero section.
export const surfaces = {
  heroAmbient:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(115%_120%_at_3%_0%,var(--color-brand-weak)_0%,transparent_58%),radial-gradient(95%_110%_at_95%_100%,var(--color-brand-soft)_0%,transparent_55%),linear-gradient(to_bottom_right,var(--color-surface),var(--color-surface-muted))]",
} as const;
