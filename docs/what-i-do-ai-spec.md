# What I Do Section Redesign Spec (AI-Forward, Premium Subtle)

**Date:** February 18, 2026  
**Owner:** Bradley Exton portfolio (`/Users/bradleyexton/projects/portfolio`)  
**Status:** Draft ready for execution

## 1) Summary
Redesign the current **What I Do** section into a clearer, higher-signal capability block that feels visually premium while staying professional.  
The section should communicate three things quickly:
1. Bradley ships reliable product work.
2. Bradley uses AI tools in practical, production-safe ways.
3. Bradley understands modern hiring expectations around AI-assisted engineering.

## 2) Goals
1. Make the section visually distinct from generic "skills grid" patterns.
2. Increase AI relevance without sounding hype-driven.
3. Show practical workflow value, not just tool name-dropping.
4. Keep motion subtle and performance-safe.
5. Preserve compatibility with current React + Tailwind + `ScrollReveal` stack.

## 3) Non-Goals
1. No new dependencies.
2. No inflated or unverifiable claims.
3. No heavy animation system or GPU-expensive effects.
4. No full homepage redesign in this pass.

## 4) Research Signals (As of February 18, 2026)
1. LinkedIn's Work Change report projects rapid skill churn and explicitly elevates AI literacy as core to hiring and advancement.
2. WEF Future of Jobs 2025 identifies AI and big data as the fastest-growing skill family and reports broad employer plans for upskilling.
3. Indeed trend reporting shows AI mention growth in job postings while role requirements remain uneven and often vague.
4. Stack Overflow 2025 shows developers use AI heavily but still report trust and quality concerns, reinforcing the need to emphasize verification discipline.

## 5) Strategic Positioning For This Section
1. Lead with **AI-accelerated product engineering**, not "AI enthusiast."
2. Emphasize employer-relevant skills:
   - AI-assisted software delivery workflows
   - Prompting and context management
   - Evaluation and verification of AI output
   - Automation of repetitive development tasks
   - Product judgment and communication with stakeholders
3. Show tools as implementation details that support outcomes.

## 6) Locked Decisions
1. Visual tone: **Premium subtle**.
2. Layout pattern: **Capability cards + AI toolbelt rail**.
3. Interaction: **Scroll reveal + active hover/focus spotlight**, no flashy parallax.
4. Content depth: **Medium-high** (outcome sentence + 2 proof bullets per card).
5. AI emphasis: **One dedicated AI capability card + AI tool chips across other cards**.
6. Copy style: **Outcome-first, concrete, concise**.
7. Truthfulness rule: tools shown as "Core" only if actively used now; others marked "Exploring."

## 7) Proposed Content Model
Use `src/copy/home.ts` as the source of truth and keep content-driven rendering.

```ts
type WhatIDoCapability = {
  title: string;
  outcome: string;
  proofPoints: readonly string[];
  techChips: readonly string[];
  emphasis?: "core" | "ai";
};

type WhatIDoAiTool = {
  name: string;
  usage: string; // one-line real usage context
  level: "core" | "exploring";
};
```

Proposed top-level copy keys:
1. `aboutSnapshot` (keep existing keys; refresh headline/description to AI-forward tone).
2. `whatIDoCapabilities: readonly WhatIDoCapability[]` (new).
3. `aiToolbelt: readonly WhatIDoAiTool[]` (new).

## 8) Proposed IA And UX
1. Left column:
   - Eyebrow, section heading, concise narrative paragraph.
   - CTA to `/about` remains.
2. Right column:
   - 3 to 4 capability cards with stronger hierarchy.
   - One card explicitly labeled AI-focused.
3. Bottom rail:
   - "AI Toolbelt" compact chip row with `Core` / `Exploring` badges.
4. Motion:
   - Staggered `ScrollReveal`.
   - Card border glow/intensity increases on hover/focus and active viewport entry.
   - Reduced motion users get static state with no pulsing.

## 9) Visual Direction
1. Keep current emerald/navy token system.
2. Add one restrained ambient gradient backdrop layer behind the section.
3. Use larger card padding and slightly taller cards than current state.
4. Use stronger typographic contrast for card titles vs proof text.
5. Avoid emoji and novelty iconography in this section.

## 10) Accessibility And Performance
1. Semantic structure:
   - section heading with proper hierarchy.
   - capability list rendered as `ul > li`.
2. Interaction:
   - hover effects mirrored with visible focus styles.
   - no interaction that depends on color alone.
3. Motion safety:
   - respect `prefers-reduced-motion: reduce`.
4. Performance:
   - animate only `opacity`/`transform` where possible.
   - no expensive continuous scroll listeners required for this section.

## 11) Implementation Plan (Execution-Ready)
1. Update copy contract in `src/copy/home.ts`:
   - revise `aboutSnapshot` heading/description for AI-forward positioning.
   - add `whatIDoCapabilities`.
   - add `aiToolbelt`.
2. Replace placeholder section types in `src/features/home/sections/HomeAboutSnapshotSection/types.ts`.
3. Replace placeholder utils in `src/features/home/sections/HomeAboutSnapshotSection/utils.ts`:
   - class/variant helpers and optional active-state helpers.
4. Rebuild `src/features/home/sections/HomeAboutSnapshotSection/index.tsx`:
   - render new capability cards and AI toolbelt rail.
   - keep CTA pattern consistent with other home sections.
5. Rewrite section styles in `src/features/home/sections/HomeAboutSnapshotSection/styles.ts`:
   - new grid, cards, badges, chips, backdrop.
6. Add tests:
   - `src/features/home/sections/HomeAboutSnapshotSection/index.test.tsx`
   - verify heading, capability cards, proof points, AI tool labels, CTA.
7. Run verification:
   - `npm run test`
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
   - `npm run verify`

## 12) Acceptance Criteria
1. Section no longer reads as a generic 4-card skills grid.
2. AI value proposition is explicit, practical, and professional.
3. Content highlights outcomes plus evidence, not tool buzzwords.
4. Motion feels polished but restrained.
5. Accessibility and reduced-motion behavior are intact.
6. No new dependencies; all verification commands pass.

## 13) Initial Tool Recommendations For Copy
Use only tools Bradley actively uses as `Core`.
1. OpenAI Codex
2. Claude Code (if "Cloud Code" in notes refers to this)
3. GitHub Copilot
4. Gemini Code Assist / Cloud Code (mark as `Exploring` unless regularly used)

## 14) Sources
1. LinkedIn Work Change Report (January 15, 2025): https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/global/LinkedIn-Work-Change-Report-AI-is-Coming-to-Work.pdf
2. WEF Future of Jobs Report 2025 (January 7, 2025): https://www.weforum.org/publications/the-future-of-jobs-report-2025/
3. Indeed trend article (January 6, 2026): https://www.indeed.com/career-advice/career-development/ai-skills-in-demand
4. Stack Overflow Developer Survey 2025 (May 28, 2025): https://survey.stackoverflow.co/2025/ai
5. OpenAI Codex docs: https://developers.openai.com/codex
6. Anthropic Claude Code docs: https://docs.anthropic.com/en/docs/claude-code/overview
7. GitHub Copilot docs: https://docs.github.com/en/copilot/get-started/what-is-github-copilot
8. Google Cloud Code docs: https://cloud.google.com/code/docs
