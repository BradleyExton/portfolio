# Design System: Spacing + Typography

Canonical implementation reference for portfolio spacing and typography.

## Scope

In scope:
- Section spacing rhythm
- Container width roles
- Typography roles for intros, heroes, and card content
- Shared intro composition component

Out of scope:
- Palette redesign
- Motion redesign
- Copy strategy changes

## Source of Truth

Implementation files:
- `src/features/shared/designSystem/classes.ts`
- `src/features/shared/designSystem/SectionIntro/index.tsx`
- `src/features/shared/designSystem/SectionIntro/styles.ts`
- `src/app/globals.css` (design-system reference CSS vars)

## Spacing Roles

Use these exported roles instead of ad hoc section padding classes.

- `spacing.section`: standard section rhythm
- `spacing.hero`: route hero rhythm
- `spacing.container6`: wide content container
- `spacing.container5`: medium-wide content container
- `spacing.container4`: narrow content container
- `spacing.introBlock`: default intro width + bottom spacing

Rules:
- Every exported `*section` style constant must compose `spacing.section` or `spacing.hero`.
- Do not add custom per-route section spacing without updating this document.

## Typography Roles

Use shared roles in `typeScale` for content hierarchy.

- `typeScale.eyebrow`
- `typeScale.heroTitle`
- `typeScale.pageHeroTitle`
- `typeScale.sectionTitle`
- `typeScale.sectionDescription`
- `typeScale.leadBody`
- `typeScale.cardTitle`
- `typeScale.metaLabel`

Rules:
- Prefer role classes over arbitrary typography utilities.
- Do not use `text-[...]`, `tracking-[...]`, or `leading-[...]` for content typography in `styles.ts` files.

## Reusable Intro Primitive

Use `SectionIntro` when a section has intro content of:
- optional eyebrow
- required title
- optional description

API:
- `eyebrow?: ReactNode`
- `title: ReactNode`
- `description?: ReactNode`
- `titleAs?: "h1" | "h2" | "h3"`
- `align?: "left" | "center"`
- `tone?: "default" | "inverse"`
- class override props: `className`, `eyebrowClassName`, `titleClassName`, `descriptionClassName`

## Enforcement

Current phase: strict
- Design-system lint rules are blocking errors in `eslint.config.mjs`.
- Spacing/typography violations must be fixed before merge.

## QA Baseline

For spacing/typography changes, validate at minimum:
- `390x844`
- `768x1024`
- `1440x900`

Routes:
- `/`
- `/about`
- `/services`
- `/contact`
