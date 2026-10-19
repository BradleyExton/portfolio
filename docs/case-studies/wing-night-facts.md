# Wing Night: case-study facts
Audited: /Users/bradleyexton/Projects/wing-night @ 4cf5872593fb3d7779d9043b04573986cbf7e7ab (committed 2026-10-18; audit run 2026-10-19), by reading the main checkout's docs, package.json files and git history, running `gh`, running the unit tests, and running the app locally against a scratch content pack with fake names to take the screenshots. Nothing in the repo was edited, and `git status` was clean before and after.

## Identity
| ID | Claim | Source |
|---|---|---|
| W1 | A host-led, in-person party game. Teams eat progressively hotter wings each round, then play a turn-based minigame while the spice kicks in. | README.md (opening paragraphs); SPEC.md §0 Purpose (lines 7-10) |
| W2 | Three kinds of device: a host tablet (`/host`), a TV display driven by a laptop over HDMI (`/display`), and guests' phones (`/play`). | SPEC.md §1, lines 29-32; README.md "Monorepo Structure" |
| W3 | It is a solo project. Every commit has the same human author email under two name spellings: 541 as "Bradley Exton" and 233 as "BradleyExton". | `git shortlog -sne HEAD` |
| W4 | It was built with AI coding agents. 411 of 774 commits carry a `Co-Authored-By: Claude` trailer, and 4 commits are tagged `[codex]`. AGENTS.md opens with a "Codex-First Workflow (Required)" section. | `git log --grep='Co-Authored-By: Claude' -i --oneline \| wc -l` → 411; `git log --grep='\[codex\]' --oneline \| wc -l` → 4; AGENTS.md lines 5, 11 |
| W5 | Stack: TypeScript, React 18, Vite, Tailwind, socket.io-client and Leaflet in the client. Node, Express, Socket.IO and tsx on the server. A pnpm 10 workspace targeting Node 25. Playwright for e2e. Cloudflare Workers, D1 and R2 (via wrangler) for the guest portal. | apps/client/package.json, apps/server/package.json, apps/teaser-worker/package.json; root package.json (`packageManager`, `engines`); apps/teaser-worker/wrangler.jsonc lines 32, 42 |
| W6 | Unit tests run on Node's built-in test runner through `tsx --test`, not on Vitest as the README's tech stack says. | `test` scripts in every package.json; README.md "Tech Stack" says "Vitest" |
| W7 | Active from the first commit on 2026-02-16 (a39db314, "docs: initial spec/design/agents/tasks") to the last on 2026-10-18 (4cf58725). That is 774 commits, 672 of them non-merge. | `git log --reverse`; `git rev-list --count HEAD`; `git log --no-merges --oneline \| wc -l` |
| W8 | The repo is public at https://github.com/BradleyExton/wing-night, with no homepage URL set. Its description is "A Hot Ones-inspired party game with real-time multiplayer". | `gh repo view BradleyExton/wing-night --json visibility,url,homepageUrl,description` → `"visibility":"PUBLIC"`, `"homepageUrl":""` |
| W9 | The live URL is https://wingnight.tv: the public teaser plus the pre-party guest portal. The party app itself is not deployed anywhere; it runs on the laptop. | apps/teaser-worker/wrangler.jsonc lines 23-24; SPEC.md line 89; `curl -sI https://wingnight.tv` → `HTTP/2 200`, title "Wing Night" |

## Problem
| ID | Claim | Source |
|---|---|---|
| W10 | It runs a game-show night in one living room: 12-20 players in 3-5 teams. | SPEC.md §2, lines 102-103 |
| W11 | The TV must be readable from across the room. It is designed for a 4K TV first, never scrolls, and fills the viewport. | SPEC.md §1, lines 33-38 |
| W12 | The host drives the pace. Phases never auto-advance, and escape hatches (skip, redo, manual scoring) are always available. | SPEC.md lines 41, 45; AGENTS.md §11 "Escape Hatch Rule" |
| W13 | Engine and content are kept apart. The repo ships only the engine and a sample pack. The real roster, photos and music live in a "night pack" at `~/wing-night-content`, outside the repo. | README.md opening and "Content Packs"; CLAUDE.md "The night pack" |

## Constraints
| ID | Claim | Source |
|---|---|---|
| W14 | LAN-first: every device is on the same Wi-Fi and nothing on the night needs the internet. Phones join over plain HTTP with no tunnel. | SPEC.md lines 39, 49, 151-153; README.md line 20 |
| W15 | There is one implicit room, no room codes and no accounts on the LAN. A phone takes a seat with the TV's join token plus a per-face claim secret. | SPEC.md lines 27, 86 |
| W16 | State is held in memory only, with no database in the party app. | SPEC.md line 87; AGENTS.md §2 |
| W17 | Plain HTTP rules out a wake lock, so phones sleep and have to reconnect instantly. The tablet mic game "Scream Run" is blocked until there is HTTPS. | SPEC.md line 57; docs/minigames/README.md line 40 |
| W18 | Minigames are turn-based, one team per turn. Only the input can run in parallel, and the host still locks and reveals. | SPEC.md lines 42-44 |
| W19 | The portal Worker runs on Workers Free (10 ms CPU per request), so all image work happens in the browser. | AGENTS.md §3 (the paragraph on `apps/teaser-worker`) |

## Architecture
| ID | Claim | Source |
|---|---|---|
| W20 | The server is authoritative. Clients render state and request mutations, they derive no game logic, and they rehydrate from a full snapshot on connect. | AGENTS.md §2; README.md "Architecture Overview" |
| W21 | Snapshots are scoped by role through `toRoleScopedSnapshotEnvelope`: the host gets the full RoomState, the TV a display-safe one, and a phone the player allow-list. | SPEC.md §7 (lines on `server:stateSnapshot`); apps/server/src/socketServer/index.ts |
| W22 | Each minigame is a package under `packages/minigames/*`. The core contract has the server project `selectHostView` and `selectDisplayView`, and display views must never carry answers. | docs/adr/ADR-0001 Decision; packages/minigames/core/src/index.ts:171-172; AGENTS.md §3.1-3.2 |
| W23 | The `MINIGAME_DEFINITIONS` registry lists 11 shipped games: Trivia, Geo, Name That Cheese, Slingshlong, Fappy Bird, Dunlop Dash, Streets of Barrie, Mount Your Hens, Drawing, Forgery Studio and Emoji Charades. | packages/shared/src/content/gameConfig/minigameDefinitions/index.ts (11 `displayName:` entries, lines 23-112); docs/minigames/README.md line 43 |
| W24 | The workspace has 3 apps (client, server, teaser-worker) and 18 packages: shared, audio, avatar-head, cast, scenery, surface, minigames/core, plus 11 game packages. | `ls apps packages packages/minigames` |
| W25 | Host and display mutations carry a `hostSecret`. The host seat is granted only to a loopback connection (the laptop) or to a holder of the host control token, which the tablet gets by scanning a QR. | AGENTS.md §3.3; README.md "Host Authorization (MVP)" |
| W26 | The pre-party portal is a separate deployable (Worker + D1 + R2) and shares nothing with the party at runtime. Data flows one way into the night pack via `pnpm pack:pull` (names, kept heads, team picks; never emails). | SPEC.md lines 114-149; README.md "Guest Portal" |
| W27 | The app is about 118k lines of non-test TS/TSX across 1,774 tracked TS/TSX files. | `git ls-files \| grep -E '\.(ts\|tsx)$' \| grep -v '\.test\.' \| xargs wc -l \| tail -1` → 117911; `git ls-files \| grep -E '\.(ts\|tsx)$' \| wc -l` → 1774 |

Diagram spec (7 nodes):
- Nodes: **Host tablet** (`/host`), **TV display** (`/display`, laptop to HDMI), **Guest phones** (`/play`), **Party server** (Node + Express + Socket.IO, in-memory RoomState, on the laptop), **Minigame packages** (`packages/minigames/*`: reducers, `selectHostView`/`selectDisplayView`, React renderers), **Night pack** (`~/wing-night-content` JSON + assets), **wingnight.tv** (Cloudflare Worker + D1 + R2, pre-party only).
- Host tablet --socket.io: host-authorized mutations (hostSecret)--> Party server
- Party server --full RoomState snapshot--> Host tablet
- Party server --display-safe snapshot (no answers)--> TV display
- TV display --`music:trackEnded` report (its only event)--> Party server
- Guest phones --`player:minigameAction` (claim secret)--> Party server; Party server --player allow-list snapshot--> Guest phones
- Party server --dispatch actions / project views (in-process)--> Minigame packages
- Night pack --JSON read at boot, assets served--> Party server
- wingnight.tv --`pnpm pack:pull` (one-way: names, heads, team picks)--> Night pack

## Hard decisions
**D1. Minigames sit behind a module boundary, and the server projects separate host and display views.** (ADR-0001, Accepted 2026-02-17)
- Decision: each game is its own package under `packages/minigames/*`. The server keeps control of the lifecycle, timers, auth and when scores apply. Games return pending results. Host and TV consume separate `minigameHostView` and `minigameDisplayView` projections, and the display view must stay answer-free, with tests to prove it.
- Alternatives considered: keep game logic inside the shared room state and UI (the way the first trivia game worked); extract games as NPM packages; split each game into its own app and server. The last two are listed as non-goals (ADR-0001 lines 26-27).
- Trade-off: upfront interface and migration work, temporary complexity while trivia moved over, and extra boundary tests (ADR-0001 "Cost / Tradeoffs", lines 40-42). The payoff is that 11 games now plug into one contract (W23), and a pass-and-play tablet can't leak answers to the TV.
- Sources: docs/adr/ADR-0001-minigame-modular-boundary.md; AGENTS.md §3.1-3.2; packages/minigames/core/src/index.ts:171-172.

**D2. The party runs offline on the laptop, and only the pre-party portal is online.**
- Decision: the party app is LAN-only, in-memory and never deployed (SPEC.md lines 85-97, "Out of Scope"). Accounts, the database, image uploads and AI head-painting all live on a separate Cloudflare deployable (wingnight.tv) that the night never talks to. Data crosses over only through a one-way `pnpm pack:pull` (SPEC.md lines 116-153).
- Alternatives considered: cloud-hosting the party app, which is explicitly out of scope at SPEC.md line 89. A "hosted, paid, multi-title" v2 platform was explored in docs/grills/wing-night-v2-platform.md and is paused at Q12 (2026-09-07).
- Trade-off: the party can't fail because of venue internet (GEO map tiles fall back to a graticule, and RECREATE's live forgery fails in a readable way; SPEC.md lines 151-153). The costs are no persistence, plain-HTTP limits (no wake lock, no mic: W17), a second codebase and deploy to maintain, and a manual pull step before every party.
- Sources: SPEC.md §1 and §2 "Before the party"; README.md "Guest Portal"; apps/teaser-worker/wrangler.jsonc.

**D3. One shared surface package with two named layouts, instead of a configurable component.** (ADR-0005, Accepted 2026-09-23; ADR-0006 follows the same rule)
- Decision: move the host and display design system into `packages/surface` so minigame packages can reach it, and let the shell own the takeover chrome. It exports two named layouts, `<TakeoverStage>` and `<TakeoverCanvas>`, and never one component with a `fullBleed` flag. Layout props are slots only (ADR-0005 lines 41-52).
- Alternatives considered: a single layout with a behaviour-switch prop, rejected under ADR-0002 guardrail 2 ("no behavior-switch props"); leaving each game to invent its own anatomy, which was the status quo. In ADR-0006, a `<Marquee>` that games configure with class strings was refused in favour of a non-configurable `<NeonMarquee>`, picked from 8 prototype directions.
- Trade-off: a cross-package migration across nine game surfaces in exchange for consistency. Measured before the change at the real 1280x800 tablet size: canvas share ran 33-90% (median about 59%), and `resolveActiveTeamName` had been copy-pasted into all nine host entry files (ADR-0005 lines 24-27).
- Sources: docs/adr/ADR-0005-shared-host-display-surface.md; docs/adr/ADR-0006-neon-heat-line-marquee.md; docs/adr/ADR-0002-dry-readability-epic.md "Guardrails".

(Runner-up, if a fourth is wanted: the TV is strictly read-only except for one event, `music:trackEnded`. It is a report rather than a command, it is accepted only from a loopback display, and "It stays alone" (AGENTS.md §3.3, lines 78-106).)

## Verification
| ID | Claim | Source |
|---|---|---|
| W28 | There are 448 colocated unit test files and 27 Playwright spec files (party and portal suites). | `git ls-files \| grep -E '\.test\.(ts\|tsx\|mjs)$' \| wc -l` → 448; `git ls-files tests/e2e tests/e2e-portal \| grep -E '\.spec\.ts$' \| wc -l` → 27 |
| W29 | All 3,640 workspace unit tests passed with 0 failures across 21 packages (client 857, server 581, shared 546). This run used Node 24.16, while the repo targets 25. | `pnpm -r --if-present test` in this audit, exit 0; summed `ℹ tests`/`ℹ pass`/`ℹ fail` lines → tests 3640, pass 3640, fail 0 |
| W30 | The Playwright suites have 75 `test(` cases: 70 in the party suite and 5 in the portal suite. The project's last recorded green run was "e2e 70/70 + portal 5/5" on the perf landing. | grep count over tests/e2e and tests/e2e-portal; docs/HANDOFF-2026-10-14.md line 8 |
| W31 | The e2e suite drives several real browser contexts at once: tablet 1280x800, TV 1920x1080 and phones at 390x844 (for example, phones pinning GEO answers while the host locks). | tests/e2e/phone-answers.spec.ts; tests/e2e/contestant-phones.spec.ts |
| W32 | CI runs on PRs only: lint, test, typecheck, build, a non-blocking Playwright smoke run and a required "screenshot in PR body" check. Of 120 PRs, 99 were merged between 2026-02-16 and 2026-03-07. After that, work landed directly on main, where no CI runs. | README.md "CI (PR Checks)"; .github/workflows/*.yml; `gh pr list --state all` → MERGED 99, CLOSED 20, OPEN 1; merged range from `gh pr list --state merged --json mergedAt` |
| W33 | The documented project gate is `pnpm lint && pnpm typecheck && pnpm test`, plus e2e on pinned ports (`CI=1 WN_E2E_SERVER_PORT=3100 ...`) so a run can't silently test someone else's dev server. | CLAUDE.md "Verify before claiming done"; playwright.config.ts comments |
| W34 | Open bugs and untested games are written down: "Taps count after the clock ends", "Late-tap phantom crashes on TV", and Mount Your Hens and Streets of Barrie "Not yet table-tested". | docs/HANDOFF-2026-10-14.md, "Open bugs" (line 27) and line 37 |

## Shipped
| ID | Claim | Source |
|---|---|---|
| W35 | Done and usable: the full phase loop (SETUP → INTRO → MINIGAME_INTRO → EATING → MINIGAME_PLAY → TURN_RESULTS → ROUND_RESULTS → FINAL_RESULTS), Quick Play, phone join by QR, answers on phones for GEO and TRIVIA, spectator side bets, and 11 games. This audit exercised all of it locally (see Screenshots). | SPEC.md §4-5; this audit's run |
| W36 | Perf pass shipped 2026-10-14: the TV's first-load JS went from 1,224.2 kB to 389.7 kB (gzip 291.7 → 127.1 kB on the last step) through per-route and per-game chunks, plus WebSocket compression and `pnpm start` running a production build. | commits bf3b0691, 42b34aa2, d8f0a469 (messages give the kB numbers); docs/HANDOFF-2026-10-14.md line 8 |
| W37 | The guest portal is live on wingnight.tv (Worker version b41209ae deployed 2026-10-14). | docs/HANDOFF-2026-10-14.md line 6; `curl -sI https://wingnight.tv` → 200 |
| W38 | Not done: the announcer voice (decided as pre-rendered MP3s, not built), the shared photo library (ADR-0004 "Proposed"), PETMON and SEAR (spec only), the bird wardrobe (Gate 1 pending), and the tie-break rule (undecided). | BACKLOG.md "Announcer voice"; docs/adr/ADR-0004 line 3; docs/minigames/README.md; docs/HANDOFF-2026-10-16.md; docs/HANDOFF-2026-10-14.md line 18 |
| W39 | Fappy Bird, Emoji Charades, Streets of Barrie and Mount Your Hens are "not in the sample lineup", and Mount Your Hens is "not yet played at a table". | docs/minigames/README.md roadmap rows |

## Numbers worth quoting
- 774 commits over 8 months (2026-02-16 → 2026-10-18): `git rev-list --count HEAD`; `git log --reverse --format='%ci' | head -1`
- 411 commits co-authored with Claude: `git log --grep='Co-Authored-By: Claude' -i --oneline | wc -l`
- 11 shipped minigames: 11 `displayName:` entries in minigameDefinitions/index.ts; docs/minigames/README.md line 43
- 3,640 unit tests, 0 failures: `pnpm -r --if-present test`, summed
- 75 Playwright e2e tests (70 party + 5 portal): `grep -hcE "^\s*test(\.only|\.skip)?\(" tests/e2e*/**.spec.ts`
- About 118k lines of non-test TypeScript: `git ls-files ... | xargs wc -l` → 117911
- TV first load 1,224 kB → 390 kB: commits bf3b0691..d8f0a469
- 6 ADRs (5 Accepted, 1 Proposed): `grep -n "^Status" docs/adr/*.md`
- Commit bursts: 259 commits in Feb 2026, 127 in Aug, 239 in Sep: `git log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c`

## Could not source / open questions
- Whether a real party has been played on it. No doc records a party date or a playtest outcome. "Not yet table-tested" in HANDOFF-2026-10-14 implies some games were table-tested, but nothing says when or how.
- GitHub reports the repo was created 2025-11-27, but the first commit is 2026-02-16. Any earlier history isn't in this repo.
- Playwright was not re-run in this audit, because ports 3100 and 5273 were held by another session and the run writes into the repo's gitignored `.playwright/`. The e2e pass count comes from the handoff note, not from a fresh run.
- No metrics on live-portal usage (guest count, heads painted) are in the repo.
- The README's "Vitest" line is stale (W6). Ask Bradley whether to describe the tests as node:test.

## Suggested narrative
- Start with the room, not the tech: one living room, a TV across the room, a host tablet and a dozen phones, everyone eating hot wings, and nobody willing to wait for a loading spinner.
- The core move is that the server is the only source of truth and each screen gets only the view it's allowed to see. That's what lets the tablet hold the answer while the TV shows the question, and what lets a dropped phone come back as the same player.
- The minigame boundary (ADR-0001) turned "a trivia game" into a platform: 11 games through one contract, each with its own host and TV renderer.
- The honest constraint story: it deliberately stays offline on the laptop, and the one online piece (wingnight.tv, guest heads and team picks) is a separate Cloudflare deployable connected by a one-way pull. Plain HTTP on party Wi-Fi costs things (no wake lock, no mic).
- Design-system discipline shows up in the ADRs: measured canvas share, refusing configurable components, and a marquee picked from 8 prototypes. That's a nice "product engineer" angle.
- It's solo and heavily AI-assisted (about half the commits co-authored with Claude, early Codex PRs). The interesting part is the guardrails that made that work: AGENTS.md rules, the pinned-port e2e gate, and 3,640 tests.
- Be candid that it's a hobby project with open bugs and some games never played at a table, and that CI only gated the PR era.

## Screenshots
All captured on 2026-10-19 from this commit, running locally (server on :3140, Vite client on :5313) against a scratch content pack: the committed `content/sample` plus a 12-player roster of fake names (Ava…Lou). Driven by Playwright (chromium) with separate browser contexts for the tablet, TV and phones, using Quick Play to reach game states. The app is dark-only, so there are no light/dark variants.

| File | What it shows | Viewport | How captured |
|---|---|---|---|
| tv-lobby-1440.webp | The TV's pre-game lobby: a join QR showing "8 of 12 in", the six-round lineup of sauces and minigames, team birds and the four team score bars. | 1440x900 @1x | TV context on `/display` after 8 phone contexts claimed faces |
| tv-dunlop-dash-1440.webp | The TV mid-turn in the Dunlop Dash arcade minigame: a skateboarding bird runs down a street level collecting wings under a neon marquee and leg counter. | 1440x900 @1x | Quick Play "Dunlop Dash", about 2.5 s after Start Mini-Game |
| tablet-dunlop-dash-1280.webp | The host tablet at the same moment, handed to the player: a tighter camera on the same run, with Skip run / Reset turn escape hatches. | 1280x800 @1x | Host context on `/host`, same run as above |
| tablet-host-briefing-1280.webp | The host tablet's briefing screen, "Up next: Geo", with team-anthem music controls, a side-bets chip, overrides and the Start Mini-Game bar. | 1280x800 @1x | Host context after Start Quick Play (Geo) |
| tv-geo-reveal-1440.webp | The TV's GEO reveal after the host locks: each phone's pin plotted by player name on the map, with a "best pin, off by 91.1 km" plaque. | 1440x900 @1x | Quick Play "Geo"; the team's phones tapped their charts, then the host pressed "Lock it in" |
| phone-join-390.webp | A guest's phone after scanning the QR: "Tap your face." over a grid of the night's 12 players drawn as team-coloured birds. | 390x844 @2x | Phone context opening the TV's join URL |
| phone-geo-pin-390.webp | A playing-team phone during GEO: its own map chart with a dropped pin and "Your pin is in", waiting for the host to lock. | 390x844 @2x | Phone context in the GEO turn, after tapping the chart |

Tablet shots use 1280x800, the party's real tablet size (ADR-0005 line 23; e2e specs), rather than 1440x900. The GEO photo card shows the sample pack's placeholder ("Sample placeholder — add real photos"), because the real party photos are private and were deliberately not loaded.
