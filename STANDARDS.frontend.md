# Frontend Standards (Portfolio)

This project uses the following standards docs:

- `AGENTS.frontend.md`
- `DESIGN.frontend.md`
- `COPY.frontend.md`
- `PR-CHECKLIST.frontend.md`

## Suggested adoption order

1. Apply `AGENTS.frontend.md` workflow and verification commands on every task.
2. Follow `DESIGN.frontend.md` tokens and visual rules for all UI changes.
3. Move copy progressively into `copy.ts` modules per route/feature.
4. Use `PR-CHECKLIST.frontend.md` in every PR.

## Enforcement Matrix

Required for merge:
- Workflow + verification commands from `AGENTS.frontend.md`
- Design token and accessibility constraints from `DESIGN.frontend.md`
- Component folder contract (`index.tsx`, `styles.ts`, `types.ts`, `utils.ts`) from `AGENTS.frontend.md`
- PR checklist completion in `PR-CHECKLIST.frontend.md`

Recommended:
- Full copy modularization from `COPY.frontend.md`
- Additional E2E coverage for high-risk conversion flows

## Template Sync

These files were adapted from `../frontend-standards-templates`.
When template docs change, sync updates intentionally and record repo-specific deviations in PR notes.

## Future Organization

If standards expand, move these docs under `docs/standards/` and keep this file as the entrypoint index.
