# Photo Games: case-study facts
Audited: `~/Projects/photo-games` (github.com/BradleyExton/photo-games) @ `340885276488b8aadeb508920e7ff7014a320c75` (main, clean apart from an untracked `.claude/`; HEAD commit 2026-09-30 13:52 -0400), audited 2026-10-19 by a read-only Claude subagent: reading docs, configs and code, running `git log`, `gh repo view` and `fly releases`, running `pnpm verify` and `CI=1 pnpm exec playwright test` locally, and capturing screenshots from a local server with the fake image editor. No repo files were changed.

## Identity
| ID | Claim | Source |
|----|-------|--------|
| G1 | Party games made from the group's own photos. A laptop or TV browser shows a room code and QR, players join on their phones and add a few camera-roll photos, and that shared pool feeds three games: Caption, Geo and Recreate. | `SPEC.md` "## Goal" (lines 11-21); `gh repo view` description: "Party games made out of your own photos: Caption, Geo and Recreate on one shared photo pool" |
| G2 | Bradley's role: product owner and spec author. He made the product calls in `/spec-app` sessions (Decisions entries tagged "asked: user ..."), then the code was written by Claude agents. Every commit is authored as Bradley Exton, and 61 of 70 carry a `Co-Authored-By: Claude` trailer. | `SPEC.md` "## Decisions" (e.g. line 401 "asked: user, 'build both for now...'", line 478 "asked: user, 2026-09-24, after first playtest"); `git log --format='%an' \| sort \| uniq -c` -> `70 Bradley Exton`; trailer count below (N3) |
| G3 | Stack actually used: pnpm monorepo on TypeScript and Node 24 (Docker base `node:24-slim`). The server is Express 5 + Socket.IO 4 + better-sqlite3 + Better Auth (magic link + passkey) + sharp + multer. The web app is React 19 + Vite 8 + react-router 7 + react-leaflet + qrcode.react, with exifr on the phone. Each game is its own workspace package. Email goes through Resend, images through Gemini via plain `fetch`, and the app is hosted on Fly.io. | `apps/server/package.json`, `apps/web/package.json`, `pnpm-workspace.yaml`, `Dockerfile` (`FROM node:24-slim`), `SPEC.md` "## Stack" (lines 168-181) |
| G4 | Active 2026-09-22 to 2026-09-30. Spec work started 2026-09-22, the first commit landed 2026-09-23 18:32 -0400 and the last on 2026-09-30 13:52 -0400. Commits fell on 5 days: Sep 23 (30), Sep 24 (23), Sep 28 (14), Sep 29 (2) and Sep 30 (1). | `SPEC.md` line 3 ("Started 2026-09-22"); `git log --reverse --format='%h %ci' \| head -1` -> `e3cc8b5 2026-09-23 18:32:11 -0400`; `git log --format=%ad --date=short \| sort \| uniq -c` |
| G5 | The repo is private: `https://github.com/BradleyExton/photo-games`, created 2026-09-24. | `gh repo view BradleyExton/photo-games --json visibility,url,createdAt` -> `"visibility":"PRIVATE"`, `"createdAt":"2026-09-24T19:49:48Z"` |
| G6 | The live URL was https://photo-games.fly.dev, first deployed 2026-09-24. **As of 2026-10-19 it is not reachable** (TLS connection reset), and the Fly CLI reports the account trial has ended. | `PROGRESS.md` deploy line (commit `77d52cb`/`e0259cc`); `fly releases -a photo-games` -> v1 Sep 24 22:35, v2 Sep 24 23:30, v3 Sep 29 14:31; `curl https://photo-games.fly.dev/health` -> `000` / "Connection reset by peer"; `fly status -a photo-games` -> "trial has ended, please add a credit card" |

## Problem
- Photos the group took themselves are "the one kind of 'your content' that has ever scaled in this genre", and nobody had built the games around them (`SPEC.md` "## Goal", lines 19-21).
- Successor to Bradley's "Wing Night" party app. That repo was used as read-only reference: some modules were ported as code, the rest re-written to the same shape, and Wing-Night-specific features were dropped (`SPEC.md` lines 375-390 "Port from Wing Night as CODE ... as PATTERN ... DROP"; `TASKS.md` lines 5-7).
- Target: a first-time host goes from zero to playing in under five minutes (`SPEC.md` line 59).

## Constraints
- **Free, not a business in v1.** The entitlement check is hardcoded to "allowed" (`SPEC.md` line 24; `apps/server/src/entitlement/index.ts`).
- **Humans write every prompt, caption and joke.** AI only renders images in Recreate, and the word "AI" stays out of the name and the pitch (`SPEC.md` line 31).
- **Players stay anonymous and are never asked to sign up.** Only the host has an account (`SPEC.md` "## Non-goals" "No player accounts"; Decisions line 417).
- **Privacy of other people's photos.** One consent tap per upload batch. Player photos are deleted when the room ends, and a sweeper removes any room directory older than 24 h. Every served photo is a re-encoded, metadata-stripped copy (`SPEC.md` lines 391, 423-430; `apps/server/src/photos/sweeper.ts`, `stripJpegMetadata.ts`).
- **No TV code.** The display is just a browser URL, reached by HDMI, Chrome "Cast tab" or a TV browser (`SPEC.md` Non-goals "No TV code"; `docs/runbook.md` "## TV display").
- **Budget.** $1.50-2.50 per 12-player night for Recreate, and the host must check the Gemini rate-limit tier before a night (`SPEC.md` Decisions 2026-09-22 "Recreate guardrails"; `docs/runbook.md` "## Gemini tier check").
- **Canadian legal surface.** Terms and Privacy drafts, a report button, a notice-and-notice mailbox and a CSAM report procedure, since the Mandatory Reporting Act applies (`SPEC.md` Decisions "Minimum trust surface in v1"; `docs/trust/csam-report-procedure.md`, `docs/trust/notice-and-notice.md`).

## Architecture
| Piece | What it is | Source |
|-------|-----------|--------|
| Room server | One Node process (Express + Socket.IO). It serves the built web app as static files and holds every live room in memory (`RoomStore`). | `SPEC.md` "## Architecture" (lines 98-112); `apps/server/src/server.ts:53,329` (`express.static(WEB_DIST_DIR)`); `apps/server/src/engine/roomStore.ts` |
| Persistence | Every mutation writes the room snapshot through to SQLite. On restart a room is lazily rehydrated, and timers are absolute deadlines. | `apps/server/src/engine/snapshotStore.ts`, `rehydrate.test.ts`, `timers.ts`; bot-night "T15 OK (server restarted mid-round ... absolute deadline all survived)" |
| Mutation path | Socket events (`room:startNight`, `room:gameAction`, `room:chooseGame`, ...) go through a payload guard, then role/token auth, then dispatch. The ceremony is a fatal guard, a phase guard, the run, then `didMutate`. | `SPEC.md` lines 114-117, 128-129; `apps/server/src/sockets/defineRoomEvent.ts`, `apps/server/src/engine/defineRoomMutation.ts`; event names via `grep -rhoE '"room:[a-zA-Z]+"' apps/server/src/sockets` |
| Role-scoped views | Socket rooms are named `${roomId}:${role}` for host, player and display. Each game plugin exposes `selectHostView`, `selectPlayerView(playerId)` and `selectDisplayView`. The display view carries no secrets by construction, and leak tests serialize the views. | `SPEC.md` lines 119-129; `packages/games/core/src/types.ts`; `packages/shared/src/snapshots.test.ts`, `packages/games/{caption,geo,recreate}/src/plugin.test.ts` |
| Game plugins | `packages/games/{caption,geo,recreate}`, each with a manifest, `initialize`, a pure `reduceAction`, view selectors and three React surfaces. The roster is built from the package list. | `SPEC.md` lines 119-125; `packages/games/roster/src/index.ts` |
| Photos | Upload path: the phone reads EXIF with exifr, canvas-resizes to 1600 px and POSTs. The server re-encodes with sharp and makes a 320 px thumbnail. Caps are ask 3, max 6 per player, 5 MB per file and 8 MB per request. Files live in per-room directories on the volume. | `SPEC.md` line 423; `packages/shared/src/photoCaps.ts:10-25`; `apps/server/src/photos/processUpload.ts` |
| Recreate generation | `GenerationQueue` (FIFO, concurrency cap default 2, 90 s timeout, one in-flight run per job id, settled results cached) calls `ImageEditor`, which is either `GeminiImageEditor` (`gemini-3.1-flash-image`, plain `fetch` to `generativelanguage.googleapis.com/v1beta`) or `FakeImageEditor`. | `apps/server/src/generation/generationQueue.ts:49,62,85-89`; `apps/server/src/imageGeneration/geminiImageEditor/index.ts:15-17`; `createImageEditor.ts` |
| Auth | Hosts log in with a Better Auth magic link sent by Resend, with an optional passkey and 90-day sessions. The host phone claims the host seat by scanning a one-time signed QR token shown on the display. | `SPEC.md` Decisions line 432ff; `apps/server/src/auth/betterAuth.ts`, `magicLinkTransport.ts`; `TASKS.md` T5/T6 |
| Hosting | A single Fly machine in `yyz` (Toronto) with 512 MB, a 1 GB volume at `/data` for SQLite and photos, auto-stop off (because sockets are long-lived), and a `/health` check. | `fly.toml` (`primary_region = "yyz"`, `auto_stop_machines = false`, `memory = "512mb"`, `[[mounts]] destination = "/data"`) |

**Diagram spec** (6 nodes):
1. **TV / laptop display**: browser at `/display/:code`.
2. **Phones**: players at `/play/:code`; the host seat at `/host/:code`.
3. **Room server** on Fly (Node: Express + Socket.IO, in-memory `RoomStore`, game plugins).
4. **SQLite + photo dirs** on the Fly volume `/data`.
5. **Gemini** `gemini-3.1-flash-image` (behind `GenerationQueue`, cap 2).
6. **Resend** (magic-link email).

Edges:
- Phones -> Room server: "join, upload photos (HTTP multipart), `room:gameAction` (Socket.IO)"
- Room server -> Phones: "role-scoped snapshot (only that player's secrets)"
- Room server -> Display: "display snapshot (no secrets)"
- Room server <-> SQLite/volume: "write-through snapshot per mutation; rehydrate on restart"
- Room server -> Gemini: "Recreate image edits, max 2 in flight, 90 s timeout"
- Room server -> Resend: "host magic-link login"

## Hard decisions
1. **Recreate cost model: teams first, then individuals after a playtest.**
   - Decision on 2026-09-23: one shared prompt and one render per team of 3-4. Per-player renders would cost about $0.80 per target and blow the $1.50-2.50 night budget, while teams kept a 4-target game near $1.10.
   - Reversed on 2026-09-24: after the first playtest the host said the product he envisioned was each player writing their own prompt and getting their own render. Individuals became the default and teams became a mode, with "teams of one" running through the same reducer.
   - Trade-off accepted: a 12-player round now queues 12 renders behind the cap of 2.
   - Sources: `SPEC.md` line 461 and line 478; `PROGRESS.md` T23 line; commits `7664543` (SPEC change) and `82293da` (T23).
2. **One Fly machine + SQLite + local volume, behind swappable seams.**
   - Alternatives considered: an object store, managed Postgres, and Cloudflare Durable Objects ($0 when idle, but it would mean rewriting the socket layer).
   - Chosen: one machine at about $3.50/month, with `RoomStore`/`SnapshotStore`/`PhotoStore` as interfaces so Postgres or R2 can come later.
   - Trade-off accepted: a single point of failure, backed up only by Fly's daily volume snapshots.
   - Sources: `SPEC.md` line 406 and "## Architecture" Seams (lines 104-112); `fly.toml`; `docs/runbook.md` "### Backups".
3. **The main test gate is a scripted "bot night" through the real protocol, not browsers.**
   - Choice: pure Vitest game tests with secret-leak serialization tests, two-room isolation tests, real in-process Socket.IO tests, and a bot night that plays whole games across several rooms in seconds. Playwright is held to four surface specs as a separate gate.
   - Rationale: "browsers only prove rendering".
   - Trade-off accepted: real-browser UI coverage is thin (4 specs).
   - Sources: `SPEC.md` line 451; `package.json` `verify` script; `playwright.config.ts` header comment.

(Also notable: both Caption deal modes, "dealt" and "shared", were built so real nights could settle the question. `SPEC.md` line 401; T10 is marked `kind: prototype` in `TASKS.md` line 78; `PROGRESS.md` lists it as "provisional pick: dealt (unreviewed)".)

## Verification
- **Build process.** `/spec-app` wrote `SPEC.md` + `TASKS.md` (commit `e3cc8b5`, "Initial commit: SPEC.md and TASKS.md from /spec-app"). `/build-app` then drained 23 tasks (T1-T22 planned, T23 added 2026-09-24).
  - Each task has a `Verify:` line. 22 tasks use `pnpm verify`; T17 uses `pnpm verify && CI=1 pnpm test:e2e` (`TASKS.md` lines 16-186).
  - Each green task got a separate orchestrator commit "Tn: green" touching only `PROGRESS.md` + `TASKS.md` (e.g. `git show --stat 92d44c9`). There are 23 such commits (`git log --oneline \| grep -c ': green'` -> 23), all co-authored by Claude Fable 5.1.
  - Builder work commits carry Claude Sonnet 5 (17) or no trailer (7) (`git log --format='%s\|%(trailers:key=Co-Authored-By,valueonly)' \| grep -E '^T[0-9]+:'`).
  - `PROGRESS.md` records each verdict. It includes one failed attempt: T19's attempt 1 (`ffdf1a3`) "failed verify on a load-sensitive T3 socket test timeout, attempt 2 fixed it". It also records one user interruption (T15), which was resumed.
- **`pnpm verify`** = lint + typecheck + Vitest + `pnpm test:night` (bot night) + `pnpm bots:smoke` (`package.json` scripts). Run 2026-10-19 at HEAD it **exited 0**:
  - Vitest: `Test Files 79 passed (79)`, `Tests 690 passed (690)`, Duration 5.23s.
  - Bot night: all checks OK, e.g. "caption ran 3 rounds through the shell with 12 bots"; "geo ... exact banded points 5/4/3/2/1/0"; "Recreate played 4 targets ... 3 teams; one attempt per team forced to fail every round and still scored correctly"; "server restarted mid-round ... absolute deadline all survived"; "16 bots and zero uploads, entirely from the house pack; fallback_used counts summed to 48".
  - Bots smoke: "bots:smoke: OK".
  - (Log in scratch: `.../scratchpad/photo-games/verify.log`.)
- **E2E.** `CI=1 pnpm exec playwright test --reporter=list` passed 4 of 4 in 22.9s: display, join-upload, host-claim, and a full Caption round across host + 3 players + display. It runs on pinned ports 4310/4311 (`playwright.config.ts`).
- **Deploy checks.**
  - `apps/server/src/deploy/dockerfile.test.ts` and `flyToml.test.ts` parse the Dockerfile and `fly.toml` inside `pnpm verify`. `envVarsDocumented.test.ts` fails the build if an env var is read but not documented (`docs/runbook.md` "## Deploy", "## Environment").
  - The Docker image also has a `HEALTHCHECK` on `/health`, and Fly has an http check on `/health` (`Dockerfile`, `fly.toml`).
  - The production startup guard refuses to boot with `TEST_LOGIN=1` or without `BETTER_AUTH_SECRET` (`apps/server/src/config/validateStartup.ts`).
- **A real deploy bug the gate missed.** The first Fly build would have crashed at boot because the runtime image didn't copy `content/prompt-bank.json`. Fixed in `77d52cb`, which added a Dockerfile test that derives every `content/` path from the server source. The runbook had warned: "this image has never been built on the machine that wrote this runbook" (`docs/runbook.md` line 9).
- **Open review (unmerged).** A review on branch `claude/review-and-soak-d338f8` reported, among others:
  - a critical crash: `room:gameAction` with `{action: null}` takes the process down;
  - unbounded upload decode memory on the 512 MB VM;
  - `GenerationQueue` retaining image buffers.

  This is not on main (source: `~/Library/Application Support/Claude/side-session-notes/local_e3858615-.../review-and-soak-2026-10-19.md`).

## Shipped
- **Built and passing at HEAD:**
  - Caption, in dealt and shared modes.
  - Geo: located photos only, per-player pins, banded scoring, Leaflet maps.
  - Recreate: individuals by default, teams as a mode, fake or Gemini editor.
  - Host accounts (magic link + passkey), host library with pins, Recreate target painting.
  - House pack: 48 placeholders + 8 targets, so a room with no uploads can still play.
  - Room lifecycle (host end, 12 h idle end, 30-day standings), report/flag flow, events instrumentation, `pnpm bots` CLI.
  - Sources: `TASKS.md` all `[x]`; `PROGRESS.md` "ALL DONE: 22 green" + T23 green; verify run above.
- **UI pass after the pipeline:** the "Fridge Door v2" redesign (paper, magnets, Polaroid look), 2026-09-28. Eight Fridge Door feature commits (`7cadb91` .. `cd3dfbd`) plus fixes, all co-authored by Claude Opus 5.5, plus fix merges and PR #1 (2026-09-30).
- **Was live** at photo-games.fly.dev from 2026-09-24, with 3 releases (`fly releases`). **Not reachable on 2026-10-19** (G6).
- **Honest gaps:**
  - The house pack is generated placeholder cards, not real photos (`content/fallback/SOURCES.md` "Every image currently committed here is generated, not photographed").
  - Terms and Privacy are marked drafts (`TASKS.md` T16).
  - The magic-link sender was still on Resend's test domain at first deploy (`PROGRESS.md` deploy line).
  - The B1/B2 gating tests, and so the join flow and fallback numbers, remain "provisional" (`SPEC.md` "## Open questions").
  - The Caption mode pick is still unreviewed (`PROGRESS.md` T10).

## Numbers worth quoting
| # | Number | Command / source |
|---|--------|------------------|
| N1 | 23 tasks specced and built, each verified by exit code, 23 "green" commits | `git log --oneline \| grep -c ': green'` -> 23; `TASKS.md` |
| N2 | T1 to T22 (v1 + first update) in about 16 hours of wall-clock time, overnight included: 2026-09-23 18:39 to 2026-09-24 10:50 -0400 | `git log -1 --format=%ci 25a805f` / `5962253` |
| N3 | 70 commits on main, 61 with a `Co-Authored-By: Claude` trailer: 29 Fable 5.1, 18 Sonnet 5, 14 Opus 5.5 | `git log --format=%B \| grep 'Co-Authored-By' \| sort \| uniq -c` |
| N4 | 690 Vitest tests in 79 files, about 5 s | `pnpm verify` (2026-10-19) |
| N5 | 4 Playwright specs, 4/4 passed, 22.9 s | `CI=1 pnpm exec playwright test` |
| N6 | About 23.2k lines of non-test TS/TSX and about 10.7k lines of tests (79 test files) across 452 tracked files | `git ls-files \| grep -E '\.(ts\|tsx)$' \| grep -v test \| xargs wc -l` -> 23199; `... grep -E '\.test\.(ts\|tsx)$' \| xargs wc -l` -> 10717; `git ls-files \| wc -l` -> 452 |
| N7 | Hosting cost estimate about $3.50/month (one machine, 512 MB, 1 GB volume) | `SPEC.md` line 406; `fly.toml` |
| N8 | Recreate costs about $0.045-0.067 per image; teams kept a 4-target game near $1.10 vs $2-3 for individual renders | `apps/server/src/imageGeneration/estimateCost.ts:15-17`; `SPEC.md` lines 461, 478 |
| N9 | 3 to 16 players per room; 12 bots per room in the bot night | `SPEC.md` "## Users and core flows"; verify log |

## Could not source / open questions
- **How AI cost and abuse are bounded: what exists vs what's missing.**
  - Exists: room creation requires a magic-link host account (`SPEC.md` line 132).
  - Exists: generation is capped at 2 concurrent jobs with a 90 s timeout. Each job id runs once and its result is cached. There is one attempt per player or team per round (`generationQueue.ts`; `SPEC.md` S17).
  - Exists: outside production, with no key, the server never calls Gemini (`createImageEditor.ts`).
  - Exists: the host phone shows a running cost *estimate* (`packages/games/recreate/src/client/HostSurface.tsx:41`).
  - **Not found:** a hard per-night spend cap, or any HTTP/socket rate limiting (`grep -rnE 'rateLimit|rate-limit' apps/server/src packages` matches only comments).
- **Whether production ever made real Gemini calls.** `PROGRESS.md`'s deploy line lists staged secrets "incl. RESEND_API_KEY" but doesn't mention `GEMINI_API_KEY`. `fly secrets list` failed ("trial has ended").
- **Whether real friends played it.** The only evidence is the 2026-09-24 Decision: "After the first playtest the host said..." (`SPEC.md` line 478). There are no session counts. The events table lives on the (now unreachable) Fly volume.
- **Whether the site comes back.** The Fly trial has ended, and the site may stay down unless billing is added.
- **What happened to B1/B2** (the gating tests on the Wing Night engine). The spec still marks them pending.
- **The product name.** "Photo Games" is a working title (`SPEC.md` "## Open questions").

## Suggested narrative
- Bradley spent a planning session turning a vague "photo party game" idea into a 700-line spec with dated decisions, then let an autonomous pipeline build it.
- The pipeline was `/spec-app` -> `TASKS.md` -> `/build-app`: one fresh builder subagent per task, and an orchestrator that only trusted the exit code of `pnpm verify`.
- It drained 22 tasks in about 16 hours, including one honest failure (a flaky socket test) that it fixed on retry.
- The interesting engineering is in the seams: role-scoped snapshots so the TV can never leak a Geo answer or a caption author; absolute-deadline timers and write-through snapshots so a server restart mid-round is a non-event; and a bot night that plays whole multi-room games over real sockets in seconds.
- The best decision story is Recreate. Teams were chosen on cost math, then reversed the day after the first playtest because the product he actually wanted was "my prompt, my picture". The cost cap and the queue made that reversal cheap.
- Be honest about the limits: the deploy bug the test gate missed (`77d52cb`), the placeholder house pack, the site down since the Fly trial lapsed, and an open review that found a crash bug.
- Then a human-directed design pass ("Fridge Door") gave it its look.

## Screenshots
All captured locally on 2026-10-19 against `localhost` (server with `TEST_LOGIN=1 DEV_TOOLS=0 FAKE_IMAGE_EDITOR=1`, fresh temp `DATA_DIR`). Players are fake (Ava as host, Ben, Cleo, Dev), and **no photos were uploaded**: every card shown is a generated house-pack placeholder that ships in `content/fallback/`. The live site could not be captured because it was unreachable.

| File | What it shows | Viewport | Source |
|------|---------------|----------|--------|
| `public/case-studies/photo-games/display-lobby-1440.webp` (40.9 KB) | The TV display lobby: room code KVBR in big magnet letters, a "Scan to join" QR, a 2:56 add-photos countdown, and four "HELLO my name is" tags for Ava (host crown), Ben, Cleo and Dev. | 1440x900 @1x | local + fake editor |
| `public/case-studies/photo-games/contribute-390.webp` (42.0 KB) | Ben's phone right after joining, framed as round one: "Add 3 photos from tonight", three empty slots, the deletion promise, and the iPhone Location tip for Geo. | 390x844 @2x | local + fake editor |
| `public/case-studies/photo-games/caption-write-390.webp` (40.5 KB) | Ben's phone in Caption's write phase: a dealt house-pack card in a Polaroid frame with his caption previewed on it, a 20/80 character counter, a Report button and a 1:00 timer. | 390x844 @2x | local + fake editor |
| `public/case-studies/photo-games/caption-reveal-1440.webp` (29.4 KB) | The TV revealing pair 1 of 3: a taped Polaroid with the caption "Me explaining my weekend plans", labelled "from the house pack", with the author hidden until after the vote. | 1440x900 @1x | local + fake editor |
| `public/case-studies/photo-games/caption-vote-390.webp` (38.7 KB) | Ben's phone in the vote phase: "Vote for the best pair", listing two photo-and-caption pairs, with his own pair excluded. | 390x844 @2x | local + fake editor |
| `public/case-studies/photo-games/caption-results-1440.webp` (33.1 KB) | The TV after round 1: a "BEST pair" rosette on Dev's winning caption, with the other pairs ranked by votes and their authors (Ben, Cleo) now revealed. | 1440x900 @1x | local + fake editor |
