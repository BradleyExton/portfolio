# politicalrecord: case-study facts
Audited: /Users/bradleyexton/Projects/politicalrecord @ origin/main d193b5e59151076461ce07f7734dfde49906179c (2026-10-19 12:33 -0400), by read-only `git show origin/main:<path>` / `git log origin/main` / `git ls-tree` (no fetch, no checkout; dirty main checkout and `lab/` worktree copies ignored), `gh repo view`, `gh run list`, `curl` and Playwright screenshots of the live site. Live deploy confirmed to be this same SHA (P6).

## Identity
| ID | Claim | Source |
|---|---|---|
| P1 | One line: "a correct, current, citable record of Canadian federal politics, starting with every riding": the House of Commons played as a board-game table on the home page, plus a static record page for each of the 343 ridings. | README.md L3-5; `gh repo view` description |
| P2 | Solo project: all 397 commits on origin/main are authored by Bradley Exton. | `git log origin/main --format='%an <%ae>' \| sort \| uniq -c` -> `397 Bradley Exton <bradley@bradleyexton.ca>` |
| P3 | AI-paired: 371 of 397 commits carry a `Co-Authored-By: Claude` trailer (198 Opus 5.5, 150 Fable 5.1, 21 Opus 5, 2 Sonnet 5.5). | `git log origin/main --format='%B' \| grep -o 'Co-Authored-By: Claude[^<]*' \| sort \| uniq -c`; awk count of commits with trailer = 371 |
| P4 | Stack actually used: Astro 5 static output with React 19 islands; MapLibre GL 5 + PMTiles 4 for the riding maps; TypeScript throughout; Node 22 npm workspaces (site, lab, packages/*, pipeline); pipeline on DuckDB (`@duckdb/node-api`) + Parquet, cheerio/fast-xml-parser scrapers, mapshaper, tippecanoe tiles; Cloudflare Workers static assets (no Worker script) + R2 for tiles; GitHub Actions. | site/package.json; site/astro.config.mjs (`output: 'static'`); package.json L6 workspaces; pipeline/package.json deps; pipeline/README.md L39 (tippecanoe); site/wrangler.jsonc comments |
| P5 | Years active: first commit 2026-09-18 (cab8641, "Workbench skeleton", the canpoli pipeline repo), site lineage from 2026-09-23 (ff029b3), last audited commit 2026-10-19 (d193b5e). About one month; commits on 24 distinct days. | `git log origin/main --reverse`; `git rev-list --max-parents=0 origin/main` -> ff029b3, cab8641; `git log --format=%cd --date=short \| sort -u \| wc -l` -> 24 |
| P6 | Repo is PRIVATE: github.com/BradleyExton/politicalrecord. | `gh repo view BradleyExton/politicalrecord --json visibility` -> `"visibility":"PRIVATE"` |
| P7 | Live at https://politicalrecord.ca (Cloudflare custom domain); the latest Deploy run, for d193b5e, succeeded. | site/wrangler.jsonc `routes`; `curl -sI https://politicalrecord.ca/` -> HTTP/2 200, server cloudflare; `gh run list` -> Deploy success for headSha d193b5e (2026-10-19T16:34Z) |
| P8 | Two repos merged into one: the data pipeline was "canpoli", its own repo until 2026-10-08, and was merged in with its history kept (1b5c2d1; 34 canpoli commits + 196 site commits before the merge, 166 after). | README.md L7-9; docs/decisions.md L131-138; `git rev-list --count 181771f0` -> 34, `c9d02ce` -> 196, `origin/main ^1b5c2d1` -> 166 |

## Problem
| ID | Claim | Source |
|---|---|---|
| P9 | The question AI assistants get most wrong about Canadian politics is how the House stands today and how it got there; nobody keeps the House over time. | docs/spike-strategy.md L13, L32-34 |
| P10 | Tension named by the strategy pass: the board is played in JavaScript, but answer engines quote sentences from HTML, so the board was "the one part of the site a crawler can't read". | docs/spike-strategy.md L36, L64-68 |
| P11 | An audit of the live site (2026-10-04) found the 2025 results right in all 343 ridings but 17 superseded riding names, badges calling second place "highest", and by-elections the riding pages didn't know about. | docs/spike-strategy.md L11, L37-39 |
| P12 | Stated goals include authority in search and AI answers (cited by a journalist, then quoted by an assistant), being ready for the fixed-date 2029 election, and credibility (every figure dated and sourced, corrections log, strict neutrality). | docs/spike-strategy.md L54-62 |

## Constraints
| ID | Claim | Source |
|---|---|---|
| P13 | Non-commercial by licence: 8 of the 24 source manifests are marked commercial "no" (House of Commons Speaker's Permission, Elections Canada terms); pipeline README says the project is "Non-commercial". | pipeline/SOURCES.md table (`grep -c '\| \*\*no\*\* \|'` -> 8); pipeline/README.md L13-14 |
| P14 | Licensing was researched rather than assumed: the memo concludes "a free public-good site is clear on everything" and that only the 2025 results are genuinely encumbered (an un-updated open-data catalogue). | docs/research/licensing.md §1 "Bottom line" |
| P15 | Pipeline data is large and partly irreplaceable: 12.7 GiB / 7,743 files, "some of it no longer online", kept out of git and backed up to a private R2 bucket (2.40 GiB packed). | CLAUDE.md L40-44; docs/data-backup.md L4, L55-56 |
| P16 | Neutrality rule: the site never says an event moved the polls ("Correlation is shown, a cause never written"). | docs/decisions.md L37-39, L55-58 |
| P17 | Party logos are not used: only two of five parties' marks read at 24px and the Liberal terms forbid use without written permission; colour rosettes instead. | docs/decisions.md L308-319 |
| P18 | Deploy must not depend on ourcommons.ca being up. | docs/decisions.md L166-168; .github/workflows/house.yml header comment |

## Architecture
| ID | Component | What it does | Source |
|---|---|---|---|
| P19 | `pipeline/` | Fetches, cleans and tests public sources into Parquet; assembles DuckDB; exports JSON + PMTiles into gitignored `pipeline/data/out/`. 24 source directories on main (README still says 22). | pipeline/README.md L3-7, L16-46; `git ls-tree origin/main --name-only pipeline/sources/ \| wc -l` -> 24 |
| P20 | `data/` (committed) | Snapshot of the pipeline's JSON; "the build reads nothing else". Copied by `npm run sync:data`. | README.md L20; docs/architecture.md L10-15 |
| P21 | `packages/ledger` | The design system and every shipped component, imported as `@ledger/*`; its 542-line README is the spec. | README.md L15-16; packages/ledger/README.md L1-5 |
| P22 | `site/` | Astro static build: `/`, `/house/`, `/house/ledger/`, 7 by-election pages, 343 riding pages, trust pages, nav.json, sitemap, `_redirects`. Islands hydrate the running head, the table, the riding map. | README.md L12-14; docs/architecture.md L22, L38-41 |
| P23 | `lab/` | Never deployed; where changes are tried first, plus the Gemini and SVG art tools whose output (`lab/public/art/ledger/`, 1,917 files) is committed and shipped. | docs/architecture.md L50-55; `git ls-tree -r origin/main --name-only lab/public/art/ledger \| wc -l` -> 1917 |
| P24 | Cloudflare | `wrangler deploy` of `site/dist` as Workers static assets, no Worker script; PMTiles (77 MB `canpoli.pmtiles`) on R2 at tiles.politicalrecord.ca under a dated prefix, read by HTTP range requests. | site/wrangler.jsonc; docs/hosting.md L3-6; site/.env.production; infra/r2-cors.json |
| P25 | CI | Push to main runs `npm ci`, `npm run check`, `npm run deploy` (build + `check-build.mjs` + wrangler). A separate weekly workflow runs only `check:house`. | .github/workflows/deploy.yml; .github/workflows/house.yml |

Diagram spec (6 nodes):
- `Public sources (Elections Canada, House of Commons, StatCan, Wikipedia polls...)` --fetch / clean / test (pipeline, DuckDB + Parquet)--> `pipeline/data/out (gitignored, backed up to private R2)`
- `pipeline/data/out` --npm run sync:data (commit)--> `data/ JSON snapshot (in git)`
- `pipeline/data/out` --npm run push:tiles (dated prefix)--> `R2 tiles bucket (canpoli.pmtiles)`
- `data/ JSON snapshot` + `packages/ledger design system` --astro build + check-build (GitHub Actions on push to main)--> `politicalrecord.ca (Cloudflare static assets)`
- `R2 tiles bucket` --range requests from the reader's browser--> `politicalrecord.ca riding maps`
- `ourcommons.ca constituency list` --check:house, every Monday--> drift report against `data/ JSON snapshot` (does not gate deploys)

## Hard decisions
**H1. The game draws people in; a written ledger is what gets cited.** (P26)
- Decision: keep the JavaScript board as the front door, but write "everything the board knows" out as static HTML: `/house/` (one dated standing sentence), `/house/ledger/` (one anchored row per event card), per-by-election pages, and a riding-page hero with one definite answer sentence in the first 100 words plus JSON-LD matching the visible text. The pages are computed through the board's own functions (`house-page.ts` over `map/turns.ts`, `turn/table-at.ts`), "with no rule reimplemented".
- Alternatives: board only (crawlers can't read it); llms.txt and FAQ schema (rejected, "no evidence for either"); four rounds of riding-hero prototypes before J shipped.
- Trade-off: a second rendering of the same state, kept honest by sharing code and by `check-build` refusing a dist without the House pages; meta description runs long (428 chars) rather than being trimmed, so one text is used everywhere.
- Sources: docs/spike-strategy.md L30-50, L64-68; docs/decisions.md L94-101 (d1dbc4f), L219-238, L213-217.

**H2. Correlation shown, cause never written, enforced in code.** (P27)
- Decision: the site never says an event moved the polls. When Bradley asked the weekly event card to infer why polls moved, the rule held and the data backed it: in 76 whole weeks the 14-day mean never moved past the pollsters' stated error week to week. Cards carry a "reading" (the move set beside one dated event with what would confirm or refute it) instead.
- Alternatives: cards that explain moves (requested, refused); a "Too Few Soundings" trend card (never dealt: a visitor can't use it).
- Trade-off: less dramatic copy; three build gates instead: `holdCard` throws on a cause word or an unstated inside-the-error move (build fails), `registers.test.ts` over the committed cards, and `check-build` refusing a home page with no weekly card.
- Sources: docs/decisions.md L37-39, L463-473, L486-491, L517-522.

**H3. The watercolour board: drawn from live seats, not painted from a snapshot.** (P28)
- Decision: after five rounds of a board-art spike (17 options), ship D10: provinces washed in the colour of the party holding most of their seats, every one of the 343 seats a counter or dab, repainted from the rows on the board's date. Chosen over D9's shared wash because D9 was painted from a snapshot, while D10 makes a by-election or a date comparison "a counter changing colour". Rasters 718 KB total, about 410 KB at rest.
- Alternatives: D9 shared wash; earlier "school map" frame; showing every riding at rest (gives rural seats the weight of their land).
- Trade-off, stated in the repo: "the land still washes red where the Liberals lead, so the colour mass alone over-reads them; the marks and the key carry the count."
- Sources: docs/decisions.md L545-564; docs/spike-board-art.md L1-8.

Other strong candidates: freshness as a scheduled check, not a deploy gate (P18, decisions L158-172: 17 renames sat stale 22 days, so `check:house` now runs weekly, exits 1 on drift and 2 when ourcommons.ca is down); tiles on R2 under a dated prefix because a browser holding the old directory would read new bytes at stale offsets (decisions L17-19, 5c79c15).

## Verification
| ID | Claim | Source |
|---|---|---|
| P29 | 41 unit-test files (39 in packages/ledger, 2 in pipeline/exports) with 330 `test()`/`it()` cases, run by `node --test` via tsx. | `git ls-tree -r origin/main --name-only \| grep -E '^(packages\|pipeline/exports)/.*\.test\.ts$' \| wc -l` -> 41; grep count of `test(`/`it(` -> 330; package.json L19; commit d193b5e message "npm run check green, 330 tests" |
| P30 | `npm run check` = lab + pipeline typecheck, `astro check`, `check:turns` (the event deck played to the end and held against every seat), and `npm test`; CI runs it before every deploy. | package.json L18; docs/architecture.md L31-36; .github/workflows/deploy.yml |
| P31 | Deploy history: 73 successful, 4 failed Deploy runs. | `gh run list --workflow deploy.yml --limit 500` grouped -> `{"failure":4,"success":73}` |
| P32 | Pipeline data checks: 363 assertions across sources against the data itself (run on the laptop, not CI, which has no data); 23 sources have a test.ts. | docs/architecture.md L36; pipeline/README.md L23; `git ls-tree ... pipeline/sources/*/test.ts \| wc -l` -> 23 |
| P33 | `scripts/check-build.mjs` refuses a deploy with no tiles base, no art, under 300 riding pages, missing House pages, missing data, or a renamed riding without its 301. Added after the first deploy shipped without a tiles base and drew no ridings. | docs/architecture.md L23-25; docs/decisions.md L21-23 (1ba916f) |
| P34 | Article claims are asserted against freshly computed figures; an article with a failed claim is withdrawn, not published. | pipeline/README.md L94-105 |
| P35 | Visual review: commits record viewport checks; 22 commit messages mention both 1440 and 390/375, 19 mention 1440 and dark. Spikes are built as lab views and compared side by side before a pick (e.g. six heroes, ten mastheads, six riding-click answers). | `git log` awk counts; docs/decisions.md L269-273, L336-340, L607-610 |

## Shipped
| ID | Claim | Source |
|---|---|---|
| P36 | Live today: home page with painted chamber hero ("The Liberals hold 173 of 343 seats, a majority of one."), the watercolour board, the House board seated by province, 343 riding pages, `/house/`, `/house/ledger/`, 7 by-election pages, articles, and trust pages (About, Rules of Play, Sources & Methods, Corrections, Illustrations). | README.md L12-14; curl 200s on /, /house/, /house/ledger/, /articles/, /about/, /riding/edmonton-strathcona/; screenshots below |
| P37 | Supports light and dark (tokens on `html[data-theme="dark"]`, chosen from localStorage or prefers-color-scheme). | packages/ledger/tokens.css L2, L22; site/src/layouts/Base.astro L24 |
| P38 | Not done / open: no named editor yet ("not named yet"; corrections mailbox not confirmed to exist); riding readings not yet published (Bradley reads all 343 before "reviewed by Bradley Exton" appears); French later; no public API ("no API for now"); history before 2004 planned ("boards back to 1867 later"); some data sources blocked (lobbying registrations: nothing downloaded). | docs/decisions.md L186-190, L505-507, L137-138, L45-47; pipeline/SOURCES.md lobbying row |

## Numbers worth quoting
| ID | Number | Command / source |
|---|---|---|
| P39 | 397 commits, 1 author, 371 Claude co-authored | see P2, P3 |
| P40 | ~1 month: 2026-09-18 -> 2026-10-19, 24 active days | see P5 |
| P41 | 343 riding pages + 7 by-election pages | README.md L12-13 |
| P42 | 24 public sources wired in, 8 non-commercial | `git ls-tree origin/main --name-only pipeline/sources/ \| wc -l`; P13 |
| P43 | 12.7 GiB of pipeline data, 20.7 M contribution rows, 176,537 Hansard speeches, 420,622 per-member votes | CLAUDE.md L41; pipeline/SOURCES.md table rows contributions, hansard, hoc-votes |
| P44 | 330 unit tests + 363 data checks | P29, P32 |
| P45 | 54 dated decision entries in docs/decisions.md; 20 `docs/spike-*.md` write-ups | `git show origin/main:docs/decisions.md \| grep -c '^\*\*20'` -> 54; `git ls-tree origin/main --name-only docs/ \| grep -c 'docs/spike-'` -> 20 |
| P46 | ~45.7k lines of TS/TSX/Astro/MJS/CSS in packages, site, pipeline, scripts (plus 8.2k in lab) | `git ls-tree -r ... \| grep -E '\.(ts\|tsx\|astro\|mjs\|css)$' \| ... \| wc -l` -> 45739; lab -> 8229 |
| P47 | 77 MB tileset served from R2 by range request; board art 718 KB total | docs/hosting.md L5-6; docs/decisions.md L553 |
| P48 | 73/77 deploys green | P31 |

## Could not source / open questions
- Real-world traffic, search impressions or citations: nothing in the repo measures them. Strategy doc lists Bing AI Performance and a prompt panel as the plan (docs/spike-strategy.md L60), no results.
- "A tribute to the owner's brother" is listed as the first goal (docs/spike-strategy.md L58) and the trust-layer entry says "No dedication, no tribute, no name: that waits for the family and the owner" (decisions L189-190). Personal and sensitive: ask Bradley before mentioning it.
- Whether the Claude-written riding briefs (`pipeline/exports/riding-briefs.ts`, default model `claude-sonnet-5`, L834) ship on live pages: not verified. The riding readings are explicitly not yet published (P38).
- Live defects seen while capturing (2026-10-19, headless Chromium): a black bar covers the member's nameplate under the figure on the riding page (Edmonton Strathcona, ~y 1560 at 1440 wide), and the phone home page logs SVG errors (`<rect> attribute width: Expected length, "Infinity"`). Desktop home logs one 404. Worth telling Bradley; screenshots avoid these areas.
- README says the pipeline has 22 sources; main has 24 source directories (hfer and sevi-candidates added 2026-10-17). Use "24" or "two dozen".
- How many hours/agents each spike took: not recorded beyond commit messages.

## Suggested narrative
Bradley set out to build a correct, citable record of Canadian federal politics and made it feel like a board game: the House of Commons as a watercolour table, the parties as players, each event as a dated card. The hard part was not the art but trust: the board lives in JavaScript, which crawlers and AI answer engines can't read, so every fact the board computes is also written out as static, dated, sourced HTML (/house/, the ledger, 343 riding pages) through the same functions. A one-person, one-month build: 397 commits, AI-paired (Claude co-authored most commits, Gemini painted the art), with design choices made by building several options in a lab and picking one, logged in 54 dated decisions. Data comes from 24 public sources through a DuckDB pipeline with 363 data checks; licensing was researched, and the site stays non-commercial because several sources require it. Rules are enforced in code, not just written down: the build fails if a card implies a cause, if pages or tiles are missing, or if a renamed riding lacks its redirect, and a weekly job flags drift against the House's own list. Be honest that it is a month old: no named editor yet, riding readings unpublished, no traffic or citation numbers.

## Screenshots
| File | What it shows | Viewport | Source (live URL / local commit) |
|---|---|---|---|
| hero-1440.webp (110 KB) | The home page's first screen: a painted, empty House of Commons chamber behind the headline "The Liberals hold 173 of 343 seats, a majority of one." with the sitting status badge and the top of the board below. | 1440x900 @1x, viewport | https://politicalrecord.ca/ (live = d193b5e) |
| board-1440.webp (100 KB) | The watercolour home board: provinces washed in the leading party's colour with painted landmarks in the seas, every seat a counter or dab, leaders' tin figures, and the House seat bar in the US corner, all in a dark wood frame. | 1440x760 @1x, clip of `.tt` | https://politicalrecord.ca/ |
| board-dark-1440.webp (73 KB) | The same watercolour board in dark mode, with the paper and seas shifted to deep brown and the provinces' party washes kept. | 1440x760 @1x, colorScheme dark | https://politicalrecord.ca/ |
| house-board-1440.webp (74 KB) | The House board: the Commons seated by province as rows of turned tokens in party colours either side of the aisle, the Speaker's chair, the 172 majority rail, and the "Where things stand" panel beside it. | 1440x520 @1x, clip of `.tt-second` | https://politicalrecord.ca/ |
| riding-1440.webp (76 KB) | A riding record page for Edmonton Strathcona: title, the board close up on the riding in its party's orange with neighbours faint, and the one-sentence answer giving member, party, 2025 margin and as-of date. | 1440x1010 @1x, page crop y 125-1135 | https://politicalrecord.ca/riding/edmonton-strathcona/ |
| board-390.webp (133 KB) | The home board on a phone, edge to edge, with the province deeds row, "The fights" filters, and a plain-language list of the nine seats that changed since June. | 390x844 @2x, viewport scrolled to 600 | https://politicalrecord.ca/ |
| riding-390.webp (98 KB) | The Edmonton Strathcona riding page on a phone: compact running head with province stepper, the riding's close-up map with its label plate, and the opening answer sentence. | 390x844 @2x, viewport | https://politicalrecord.ca/riding/edmonton-strathcona/ |
