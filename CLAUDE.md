# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Bradley Exton. The site is structured around App Router route wrappers plus feature modules, with standardized copy ownership and UI guardrails.

## Standards Entry Point

Start with `STANDARDS.frontend.md`, then follow:

- `AGENTS.frontend.md`
- `DESIGN.frontend.md`
- `COPY.frontend.md`
- `PR-CHECKLIST.frontend.md`

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run typecheck
npm run verify   # Required local gate: lint + typecheck + build
npm test         # Unit/component tests (Vitest)
npm run test:e2e # Smoke E2E (Playwright)
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest + Testing Library + Playwright

## Architecture

### Top-Level Structure

```
src/app/
src/features/
src/copy/
src/config/
```

### App Router Expectations

- Keep `src/app/*/page.tsx` files thin and declarative.
- Keep section/component logic under `src/features/**`.
- Keep user-facing copy in `src/copy/**`.
- Keep env parsing/validation in `src/config/publicEnv.ts`.
- Use component folders with `index.tsx`, `styles.ts`, `types.ts`, and `utils.ts`.

### Styling Expectations

- Use semantic token classes (`bg-surface`, `text-content`, `border-default`, etc.).
- Do not use raw Tailwind palette utility classes in component markup for refactored modules.
- Keep accessibility-visible focus states and non-color-only state signaling.

### Guardrails

- ESLint enforces entry-file naming and component contract files.
- ESLint enforces `max-lines` for `index.tsx` (260) and `styles.ts` (140), excluding blank/comments.
- Avoid oversized page/components; decompose into feature sections.

### CI/PR Requirements

- PR checks (`.github/workflows/pr-checks.yml`) run lint, typecheck, unit tests, build, and E2E.
- Screenshot enforcement (`.github/workflows/pr-screenshot-required.yml`) requires an image in PR body when frontend files change.
- Use `.github/pull_request_template.md` and complete `PR-CHECKLIST.frontend.md`.
