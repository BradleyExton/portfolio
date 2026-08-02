# VOICE.frontend.md

The voice contract for all user-facing copy on this site. `COPY.frontend.md` owns where copy lives
and how it is structured; this file owns how it sounds. Written copy is checked against this file
before it ships, and `npm run lint:copy` enforces the mechanical rules (wired into `npm run verify`).

Calibrated with Bradley in a taste session on 2026-08-02 (see the feedback log at the bottom).
This file changes only when a human edits it; repeated feedback-log entries are the trigger.

---

## 1) Audiences and register

Two audiences, one register: **warm professional**. First person, contractions, composed. The tone
of a good cover letter from someone you'd want to work with. Not a casual chat, not a landing-page
hard sell.

| Surface | Audience | Reference standard |
| --- | --- | --- |
| Home, About, Experience | Hiring managers and engineering peers | Josh Comeau (joshwcomeau.com): technical, personable, first person, zero corporate speak |
| Services pages | Local business owners (non-technical) | Basecamp/37signals plain talk: concrete outcomes, plain words, real prices |

Employer-facing copy may use practitioner vocabulary (specs, MCP servers, context engineering)
because the reader is technical. Services copy must not; a business owner should understand every
sentence on first read.

## 2) Hard rules (lint errors, build-failing)

1. **Zero em dashes (—) and en dashes (–)** in copy modules. Replace with a period, comma, colon,
   or parentheses, or restructure the sentence. Date ranges use a hyphen ("2022 - Present").
2. **No banned vocabulary** (the AI-puffery tier): delve, tapestry, synergy, paradigm,
   unprecedented, game-changer/game-changing, cutting-edge, groundbreaking, transformative,
   testament, pivotal, evolving landscape, in the heart of, nestled, boasts, seamless(ly).
3. **Negative parallelism capped at one per file.** "not just X", "isn't X, it's Y" is a strong
   device Bradley genuinely uses, so it is capped, not banned. Two or more in one copy module fails.

## 3) Watchlist (lint warnings, reviewed not banned)

leverage, utilize, streamline(d), harness, unlock, unleash, elevate, empower, robust, vibrant,
meticulous, underscore, foster, garner, showcase/showcasing, highlighting, "serves as",
"functions as". Each occurrence should be a deliberate choice. Nouns used concretely are fine
("the same leverage"); verb-of-hype usage is not ("leverage AI to unlock value").

## 4) Style rules a linter cannot check

- **Specific beats polished.** Real numbers, named companies, named tools, honest claims. "Built a
  walk-in pricing feature that protected revenue from underbilling" over "delivered impactful
  features." If a sentence would survive on any other engineer's portfolio unchanged, sharpen it.
- **Claims must be true and verifiable by Bradley.** Never invent metrics, quotes, or outcomes.
  Missing specifics are a question for Bradley, not a blank to fill.
- **Say it out loud test.** If Bradley wouldn't say the sentence to someone at a meetup, rewrite it.
- **Vary sentence length.** Short sentence for the point, longer for context. Never three
  same-shaped sentences in a row.
- **Prefer is/are/has** over "serves as", "boasts", "features".
- **No trailing participle padding** ("..., improving productivity", "..., ensuring quality") unless
  the clause carries a real, specific fact.
- **Functional triads are fine; decorative ones are not.** "Feels premium, loads fast, easy to
  manage" earns its three slots (each is a distinct claim). Triads invented to sound comprehensive
  get cut to the one or two items that are actually true and distinct.
- **Action-oriented labels** stay per COPY.frontend.md §5 ("Book a Call", "Send Me an Email").

## 5) Exemplars (the target; picked by Bradley, 2026-08-02)

On-voice lines. New copy should sound like these:

- "I'm Bradley, an engineer in Barrie, Ontario. I've shipped production web apps for 10 years.
  These days most of my code is written by AI agents I design and direct, and it lets me deliver
  like a full team." (hero)
- "When agents write the code, specs, standards, and review matter more, not less. The engineers
  who thrive won't be the ones who type fastest. They'll be the ones who can define quality
  precisely enough that an agent can hit it." (belief card)
- "Hiring, or have a project in mind? Send me a note. I answer everything." (contact close)
- "Conversion-focused marketing sites that feel premium, load fast, and are easy to manage."
  (services card; functional triad, compressed is fine here)

## 6) This, not that

| Not this | This | Why |
| --- | --- | --- |
| "I'm Bradley — an engineer... Today I build with AI agent teams: designing the skills, orchestration, and context engineering that let one engineer deliver like a full team." | "These days most of my code is written by AI agents I design and direct, and it lets me deliver like a full team." | Plain spoken beats the compressed jargon stack; and no em dash |
| "Whether you're hiring, have a project in mind, or just want to chat about tech — I'd love to hear from you." | "Hiring, or have a project in mind? Send me a note. I answer everything." | Short and direct; the "whether X, Y, or Z" triad reads templated |
| "Agents make average code cheap. That makes standards and review the whole job." | "When agents write the code, specs, standards, and review matter more, not less." | Punchy-aphorism register rejected; Bradley picked the warmer, fuller framing |
| "It'll look like you paid more than you did, and you can edit the content without calling me." | "Feel premium, load fast, and are easy to manage." | Too-candid jokey register rejected for services cards |

## 7) Process for writing or changing copy

1. Gather the raw material first: real facts, numbers, names. Never draft from vibes.
2. Draft against this file (register per surface, §4 style rules, exemplars as the target).
3. Self-critique pass: check for tell clusters (§2, §3, trailing participles, uniform sentence
   rhythm), verify every claim traces to real material.
4. `npm run lint:copy`.
5. Present 2 or 3 variants to Bradley for anything reader-facing and substantial; he picks. Picking
   beats reviewing: give him a choice, not a yes/no.
6. Log what he picked or corrected in the feedback log below. Repeated corrections get promoted
   into rules in this file (by a human edit).

## Feedback log

### 2026-08-02 — initial calibration session
- Hero intro: picked plain-spoken variant over current jargon-stack and over blunt/staccato variant.
  Implied rule: plain spoken, first person; avoid compressed noun stacks ("skills, orchestration,
  and context engineering").
- Belief card: kept current framing including its "not less / won't be, they'll be" construction.
  Implied rule: negative parallelism is part of his voice when load-bearing; cap, don't ban.
- Register: "warm professional" over colleague-casual and confident-punchy.
- Services card: kept current compressed triad over plainer and jokier variants. Implied rule:
  functional triads on cards are fine; don't over-casualize services copy.
- Contact close: picked "Hiring, or have a project in mind? Send me a note. I answer everything."
  Implied rule: closers should be short and direct, not "whether X, Y, or Z" lists.
- References chosen (by Claude, accepted by Bradley): Josh Comeau for employer surfaces,
  Basecamp plain talk for services surfaces.

### 2026-08-02 — plain-language pass (round 2)
- Home aboutSnapshot: picked "plainer, same facts" over the resume-speak original ("acting as a
  key technical owner across Product, Design, Data, Platform, and Support") and over the tightest
  variant. Implied rule: no resume-speak on marketing surfaces; but don't over-compress either.
- Services hero: picked "Senior help for your website, app, or AI project." over
  "Senior full-stack execution for teams that need momentum." Implied rule: no consultant
  vocabulary on services surfaces (execution, momentum).
- Services catalog: picked "Services / Three ways to work together." over
  "Service Pillars / Choose the engagement model that matches your stage." Same implied rule
  (pillars, engagement model).
- Belief card: picked "code the next developer can pick up without a tour guide" over the
  "Future you will thank you" cliché.
- Unprompted small fix, shown after the fact: "productized systems" became "custom software"
  in the web-applications outcome (same consultant-vocabulary rule).
- Pattern across all four picks: the plainest variant won every time. Promotion candidate:
  add consultant vocabulary (execution, momentum, engagement model, pillars, productized) to
  the §3 watchlist.
