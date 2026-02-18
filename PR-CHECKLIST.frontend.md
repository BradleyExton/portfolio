# Frontend PR Checklist

Use this checklist for pull requests that modify frontend behavior or UI.

## Scope and Architecture
- [ ] Change is minimal and scoped to the task.
- [ ] No duplicated domain/business logic was introduced in UI layers.
- [ ] Existing contracts/types are reused where possible.

## Component Quality
- [ ] Components remain modular and focused.
- [ ] Oversized components were decomposed where needed.
- [ ] Component folders follow contract (`index.tsx`, `styles.ts`, `types.ts`, `utils.ts`).
- [ ] Styles use semantic tokens (no hardcoded hex values in components).
- [ ] User-facing copy is sourced from copy modules when practical.

## Accessibility and UX
- [ ] Keyboard and focus behavior works for interactive controls.
- [ ] Color is not the only state signal.
- [ ] Empty, loading, and error states are clear and actionable.
- [ ] Accessibility checks completed (automated checks if available + manual keyboard pass).

## SEO and Env Safety
- [ ] Route metadata updated when page messaging changed.
- [ ] Env-dependent links/forms have safe fallback behavior.
- [ ] No secrets were introduced via `NEXT_PUBLIC_*` variables.

## Testing and Verification
- [ ] Commands run:
  - [ ] `npm run verify`
  - [ ] `npm run lint`
  - [ ] `npm run typecheck`
  - [ ] `npm run build`
  - [ ] `npm test` (if configured)
  - [ ] `npm run test:e2e` (if applicable)
- [ ] If tests were not added for behavior changes, rationale is documented.

## Review Artifacts
- [ ] Included screenshots/recording for visual changes.
- [ ] Documented tradeoffs and follow-up items.
