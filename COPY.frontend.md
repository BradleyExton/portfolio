# COPY.frontend.md

This file defines standards for user-facing copy in frontend code.
The goal is consistent tone, maintainable ownership, and i18n-ready structure.

---

## 1) Core Rules

- Do not add new user-facing strings directly in JSX unless documented as a temporary exception.
- Component-specific copy should live in colocated `copy.ts` files.
- Shared copy should live in typed modules under `src/copy/`.
- Components should consume copy imports and remain primarily presentational.

---

## 2) Recommended Copy Module Structure

- `src/copy/common.ts`
- `src/copy/navigation.ts`
- `src/copy/home.ts`
- `src/copy/about.ts`
- `src/copy/services.ts`
- `src/copy/contact.ts`
- `src/copy/errors.ts`
- `src/copy/metadata.ts`
- `src/copy/profile.ts`

Rules:
- Export typed constants/objects/functions.
- Keep key names semantic and stable.
- Group copy by user flow and page intent.

`profile.ts` should be the canonical source for repeated identity/contact strings:
- Name
- Title
- Email
- Location
- External profile URLs

---

## 3) Interpolation and Dynamic Values

- Prefer template functions over string concatenation.
- Use named parameters.
- Centralize formatting concerns (dates, counts, currency).

Example:

```ts
export const experienceLabel = (params: { years: number }) =>
  `${params.years}+ years of experience`;
```

---

## 4) Metadata Copy Ownership

- Route title/description/Open Graph/Twitter strings should come from shared metadata copy modules when practical.
- Keep SEO copy consistent with page on-screen messaging.
- Update metadata copy when a page's positioning or CTA language changes.

---

## 5) Tone and UX Writing

- Tone: confident, clear, and practical.
- Keep sentences concise and specific.
- Prefer action-oriented labels (`Book a Call`, `Send Message`).
- Error copy should state what happened and what to do next.
- Avoid vague filler text and internal jargon.

Examples:
- Prefer: `Book a free 30-minute call`
- Avoid: `Click here to proceed`

---

## 6) Localization Readiness

- Avoid assembling sentence fragments across multiple keys.
- Keep punctuation and grammar inside full phrases.
- Keep key naming compatible with future i18n tooling.

---

## 7) Review Checklist

- No unnecessary hardcoded user-facing strings in modified components.
- New/updated text lives in the correct copy module.
- Error/empty/success states are actionable.
- Dynamic copy uses typed interpolation.
- Metadata copy was reviewed for any page copy changes.
