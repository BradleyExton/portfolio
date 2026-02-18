# AGENTS.frontend.md

This document defines frontend engineering standards for the portfolio website.
Contributors and coding agents should follow these rules for all UI changes.

---

## 1) Workflow (Required)

### 1.1 Task Loop
For each task:
1. Read relevant sections of `bradleyexton-site-brief.md` and `DESIGN.frontend.md`.
2. Make the smallest change that satisfies the task.
3. Add or update tests where behavior changes.
4. Run required verification commands.
5. Confirm the result is modular and production-safe.

### 1.2 Checkpoints
- Before starting substantial work, create a clean checkpoint (`git commit` or `git stash`).
- After finishing, ensure repository state is working.

### 1.3 Verification Commands
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Full gate: `npm run verify`

Optional commands (when configured):
- Unit/component tests: `npm test`
- E2E tests: `npx playwright test`

Run guidance:
- Run `npm run verify` for any route/component/layout/styling changes.
- Run E2E when changes affect navigation, form submission, or key conversion paths.

---

## 2) Runtime and Tooling Policy

- Node version must be `>=20.9.0` (Next.js 16 baseline).
- Keep lockfile in sync with dependency updates.
- Do not disable TypeScript or ESLint build checks to bypass quality gates.

---

## 3) Frontend Architecture Principles

- Next.js App Router is the routing source of truth.
- Prefer Server Components by default; use Client Components only when interactivity requires it.
- Keep route metadata in `page.tsx` server files (`metadata` export or `generateMetadata`).
- Add `error.tsx` boundaries for major route surfaces as complexity grows.
- Avoid duplicating business/content rules across routes.

### 3.1 Environment Variable Rules

- Treat all `NEXT_PUBLIC_*` values as public and non-secret.
- Assume `NEXT_PUBLIC_*` values are build-time inlined in client bundles.
- Never place secrets in client code or public env vars.
- Env-dependent CTAs and forms must have safe fallbacks (no dead links or broken submissions).

---

## 4) Project Structure

- Route files live under `src/app/`.
- Feature UI lives under `src/features/`.
- Thin compatibility wrappers may exist under `src/components/`.
- Shared copy should live under `src/copy/` when introduced.
- Keep feature concerns grouped and avoid deep cross-feature imports.

---

## 5) Component and Utility Structure

- Components/utilities should be small and focused.
- Each component must live in a descriptive folder.
- Component entry file must be `index.tsx`.
- Component folder contract files:
  - `styles.ts` (required)
  - `types.ts` (required)
  - `utils.ts` (required; keep pure helper/business logic here)
- Tests should be colocated as `index.test.tsx` for behavior-bearing components.
- If files grow too large, extract subcomponents before adding more sections.
- Co-locate feature-only utilities near the component that uses them.

Guardrails:
- Keep `index.tsx` files around 220 lines when practical.
- Hard cap `index.tsx` files around 260 lines unless intentionally documented.
- Keep `styles.ts` files around 140 lines when practical.

---

## 6) Naming Conventions

- Components: `PascalCase`
- Hooks: `useSomething`
- Utilities/functions: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`

Prefer `type` over `interface` unless declaration merging is required.

---

## 7) State Rules

- Keep one clear source of truth per data concern.
- Keep component state UI-local and minimal.
- Derived values should be deterministic and close to usage.
- Avoid duplicated or hidden state.

---

## 8) Styling and Theme Rules

- Use semantic tokens defined in `src/app/globals.css` and `DESIGN.frontend.md`.
- Do not hardcode hex values in components.
- Keep style behavior consistent across pages.

---

## 9) Accessibility Standards

- Keyboard access for all interactive elements.
- Visible focus states.
- Minimum preferred target size of 44x44 CSS px for touch controls.
- Do not rely on color alone for status meaning.
- Use meaningful labels for form controls and landmarks.

---

## 10) Error Handling

- Show recoverable, actionable error messages to users.
- Never leave broken links, dead-end CTAs, or blank route surfaces.
- Preserve fallback behavior when external integrations are unavailable.

---

## 11) TypeScript Rules

- Keep `strict: true`.
- No `any`; prefer `unknown` with narrowing.
- Use `satisfies` for config objects where it improves safety.

---

## 12) Dependency Discipline

- Do not add dependencies without clear justification.
- Prefer built-in platform capabilities and existing stack first.
- Document new dependency rationale in PR notes.

---

## 13) PR Expectations

- Include tests/verification commands run.
- Include screenshots for visual changes.
- Record tradeoffs and follow-up items.

Reliability > novelty.
Clarity > cleverness.
