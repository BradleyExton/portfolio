# Bradley Exton Portfolio

Personal portfolio and services site built with Next.js App Router.

## Standards Docs

Use `STANDARDS.frontend.md` as the index and entrypoint. The standards set is:

- `AGENTS.frontend.md`
- `DESIGN.frontend.md`
- `COPY.frontend.md`
- `PR-CHECKLIST.frontend.md`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (semantic token classes)
- Vitest + Testing Library
- Playwright (smoke E2E)

## Project Structure

- `src/app`: route-level wrappers and metadata exports
- `src/features`: feature-first UI modules and section components
- `src/copy`: typed user-facing copy and metadata source modules
- `src/config`: typed env parsing and safety guards

Component folder contract (for feature UI modules):
- `index.tsx`
- `styles.ts`
- `types.ts`
- `utils.ts`
- `index.test.tsx` for behavior-bearing components

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
npm run test:watch
npm run test:e2e
npm run verify
```

`npm run verify` is the required local baseline (`lint + typecheck + build`).

## Environment Variables

- `NEXT_PUBLIC_FORMSPREE_ID`
- `NEXT_PUBLIC_CALCOM_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `UNDER_CONSTRUCTION`

Env access is centralized through `src/config/publicEnv.ts`.

## Contributor Workflow

1. Follow `STANDARDS.frontend.md` and linked docs before coding.
2. Keep route files thin; put UI/copy logic in `src/features` and `src/copy`.
3. Run `npm run verify`, `npm test`, and `npm run test:e2e` before opening a PR.
4. Use `.github/pull_request_template.md` and complete the checklist.
5. Include at least one screenshot in PR body when frontend files changed.

## CI Expectations

PRs to `main` run blocking checks in `.github/workflows/pr-checks.yml`:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run test:e2e`

PRs also run `.github/workflows/pr-screenshot-required.yml`, which fails when frontend changes are detected and no image is present in PR body.
