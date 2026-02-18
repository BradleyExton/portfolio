# DESIGN.frontend.md

UI guidance for the portfolio site's design language and consistency.
If it is not defined here, treat it as out of scope by default.

---

## 0) Theme Direction

Theme name: `Emerald Builder`

Intent:
- Professional, confident developer portfolio
- Clean and modern without generic template feel
- Strong readability and clear conversion paths

Guardrail:
- Do not introduce ad hoc color systems, typography scales, or motion styles without updating this document.

---

## 1) Canonical Design Tokens

Use semantic tokens from `src/app/globals.css`.

Core palette:
- Primary: `--color-primary-50..900`
- Accent: `--color-accent-400..600`
- Neutrals: `--color-neutral-50..900`
- Semantic: `--color-success`, `--color-warning`, `--color-error`, `--color-info`

Rules:
- Primary (emerald) is default emphasis.
- Accent (amber) is secondary emphasis only.
- Keep error/warning/success usage functional (not decorative).
- Do not hardcode hex values in component files.

---

## 2) Surface Rules

### 2.1 Marketing Surface (All Routes)
- One dominant action per major section.
- Clear hierarchy and generous spacing.
- No hover-only critical interactions.

### 2.2 Conversion Surfaces (`/contact`, CTA blocks)
- Primary conversion action is visually dominant.
- Form fields and validation states are high clarity.
- Keep secondary actions available but lower emphasis.

---

## 3) Layout System

- Mobile-first responsive behavior.
- Keep section spacing consistent (`py-16`, `py-20` patterns).
- Use shared max-width containers (`max-w-4xl`, `max-w-6xl`).
- Avoid horizontal overflow and layout shift.

---

## 4) Typography

- Headings: Space Grotesk.
- Body: Inter.
- Preserve high contrast between text and surfaces.
- Keep paragraphs concise with readable line length.
- Use strong section headings and clear CTA labels.

---

## 5) Interaction and Motion

- Motion should be subtle and purposeful.
- Use motion to support hierarchy and state changes.
- Avoid constant looping animation except minimal signal indicators.
- Keep transitions short and consistent.
- Respect `prefers-reduced-motion` by disabling or minimizing non-essential motion.

---

## 6) Accessibility

- Maintain visible focus outlines; never remove focus indication for keyboard users.
- Keep interactive targets at least 44x44 px as project standard.
- WCAG minimum target rule is 24x24 px with spacing exceptions; do not go below that floor.
- Text contrast targets:
  - Normal text: at least 4.5:1
  - Large text: at least 3:1
- Do not rely on color alone for meaning.

---

## 7) Component Visual Patterns

Buttons:
- One primary CTA per section.
- Secondary buttons should never visually compete with primary.

Cards:
- Use neutral surfaces and subtle borders.
- Avoid inconsistent shadow intensity between sections.

Navigation:
- Ensure link behavior is predictable across routes.
- Current-page context should be obvious.

---

## 8) Non-Goals

- No per-section custom theme experiments.
- No uncontrolled typography changes.
- No decorative animation systems.

---

End goal: a coherent portfolio UI that reads as senior-level, trustworthy, and conversion-oriented.
