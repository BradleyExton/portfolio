import type { CaseStudy } from "./types";

/* Every claim here is sourced in docs/case-studies/politicalrecord-facts.md. */
export const politicalRecordCaseStudy = {
  slug: "politicalrecord",
  title: "The Political Record",
  summary:
    "A citable record of Canadian federal politics, with the House of Commons played as a watercolour board game.",
  tags: ["Astro", "DuckDB", "Cloudflare"],
  meta: [
    { label: "Role", value: "Solo build: product, data, design, and code" },
    { label: "Stack", value: "Astro, React, TypeScript, DuckDB, MapLibre, Cloudflare" },
    { label: "Timeline", value: "September to October 2026" },
  ],
  links: [{ label: "Visit politicalrecord.ca", href: "https://politicalrecord.ca" }],
  cover: {
    src: "/case-studies/politicalrecord/board-1440.webp",
    alt: "The watercolour board: Canada's provinces washed in the colour of the party holding most of their seats, each seat a coloured counter, with the 343-seat House bar along the bottom.",
    caption: "The home board, painted from the seats on the board's date.",
    kind: "screen",
    width: 1440,
    height: 760,
  },
  problem: {
    heading: "Make the House readable, and worth citing",
    body: [
      "My research pass found that how the House of Commons stands today, and how it got there, is the question AI assistants get most wrong about Canadian politics. Nobody keeps that record over time.",
      "I wanted something people would enjoy opening, so the front door is a board game: the House as a painted table, every seat a counter, every event a dated card. Behind it sits a plain record page for each of the 343 ridings.",
    ],
    constraints: [
      "Every figure dated and sourced, with a corrections log and strict neutrality.",
      "Non-commercial by licence: 8 of the 24 data sources rule out commercial use.",
      "12.7 GiB of source data, some of it no longer online, kept out of git and backed up privately.",
      "A deploy can't depend on the House of Commons website being up.",
      "No party logos. Only two of five read at 24px, and one party's terms forbid use without permission.",
    ],
  },
  architecture: {
    heading: "A pipeline, a snapshot, and a static site",
    description:
      "The slow, fragile work happens on my laptop. The site only ever builds from a JSON snapshot committed to git, so a deploy never waits on a government server.",
    diagram: {
      title: "The Political Record architecture",
      description:
        "Public sources feed a DuckDB pipeline. The pipeline exports a JSON snapshot committed to git and a map tileset pushed to Cloudflare R2. On every push to main, CI checks and builds the Astro site from the snapshot and deploys it to Cloudflare. Readers' browsers fetch map tiles from R2 by range request.",
      wideGrid: { cols: 4, rows: 2 },
      narrowGrid: { cols: 2, rows: 5 },
      nodes: [
        { id: "sources", label: "Public sources", detail: "24 feeds", wide: { col: 0, row: 0 }, narrow: { col: 0.5, row: 0 } },
        { id: "pipeline", label: "Data pipeline", detail: "DuckDB + Parquet", emphasis: true, wide: { col: 1, row: 0 }, narrow: { col: 0.5, row: 1 } },
        { id: "snapshot", label: "data/ snapshot", detail: "JSON, in git", wide: { col: 2, row: 0 }, narrow: { col: 0, row: 2 } },
        { id: "tiles", label: "Map tiles", detail: "PMTiles on R2", wide: { col: 1, row: 1 }, narrow: { col: 1, row: 2 } },
        { id: "build", label: "CI build", detail: "check, Astro, gate", wide: { col: 3, row: 0 }, narrow: { col: 0, row: 3 } },
        { id: "site", label: "politicalrecord.ca", detail: "Cloudflare static", emphasis: true, wide: { col: 3, row: 1 }, narrow: { col: 0.5, row: 4 } },
      ],
      edges: [
        { from: "sources", to: "pipeline", label: "fetch, test" },
        { from: "pipeline", to: "snapshot", label: "sync" },
        { from: "pipeline", to: "tiles", label: "push" },
        { from: "snapshot", to: "build", label: "on push" },
        { from: "build", to: "site", label: "deploy" },
        { from: "tiles", to: "site", label: "range reads" },
      ],
    },
    notes: [
      "The pipeline pulls 24 public sources into Parquet and DuckDB, runs 363 checks against the data itself, and exports JSON plus a 77 MB map tileset.",
      "The Astro build reads only the committed snapshot and renders 343 riding pages, seven by-election pages, and the House ledger. React islands hydrate the board and the maps.",
      "Tiles sit on R2 under a dated prefix, so a browser holding an old tile index never reads new bytes at stale offsets.",
    ],
  },
  decisions: {
    heading: "Three calls that shaped it",
    items: [
      {
        title: "Write out everything the board knows",
        choice:
          "The board runs in JavaScript, and crawlers and answer engines quote HTML. So the board stays the front door, and every fact it computes is also written out as static, dated pages: a standing sentence for the House, a ledger row per event, and a one-sentence answer with matching structured data on each riding page. Those pages call the board's own functions, with no rule written twice.",
        tradeoff:
          "Two renderings of the same state to keep in step. Shared code keeps them honest, and the build refuses to ship without the House pages. I passed on llms.txt and FAQ schema because there was no evidence either one helps.",
      },
      {
        title: "Show correlation, never write a cause",
        choice:
          "The site never says an event moved the polls. When I wanted a weekly card that explained poll moves, the data said no: across 76 weeks, the 14-day average never moved past the pollsters' own stated error from one week to the next. Cards set a move beside a dated event and say what would confirm or refute a link.",
        tradeoff:
          "Less dramatic copy. The rule is enforced in three places: the card builder fails the build on a cause word, a test runs over every committed card, and the build refuses a home page with no weekly card.",
      },
      {
        title: "Paint the board from live seats",
        choice:
          "Five rounds of board art produced 17 options. I shipped the one drawn from data: each province washed in the colour of the party holding most of its seats, all 343 seats as counters, repainted for the board's date. A by-election becomes a counter changing colour, where the prettier option was painted from a fixed snapshot.",
        tradeoff:
          "Land area still washes red where the Liberals lead, so colour alone over-reads them. The counters and the key carry the real count. The art weighs 718 KB, about 410 KB at rest.",
      },
    ],
  },
  verification: {
    heading: "Rules the build enforces",
    description:
      "A typecheck, Astro's own check, the full event deck played to the end against every seat, and the unit tests all run in CI before every deploy.",
    stats: [
      { value: "330", label: "unit tests across 41 files" },
      { value: "363", label: "checks on the pipeline data" },
      { value: "73 of 77", label: "deploys green" },
    ],
    checks: [
      "A build gate refuses a deploy with no map tiles, no art, fewer than 300 riding pages, missing House pages, or a renamed riding without its redirect. It exists because the first deploy shipped with no tiles and drew no ridings.",
      "After 17 renamed ridings sat stale for 22 days, a weekly job started comparing the House's own member list with the snapshot. It flags drift and never blocks a deploy.",
      "Article claims are asserted against freshly computed figures. An article with a failed claim is withdrawn, not published.",
      "Design changes start as side-by-side lab views (six heroes, ten mastheads) and get checked at 1440 and 390 wide, in light and dark.",
    ],
  },
  gallery: [
    {
      src: "/case-studies/politicalrecord/hero-1440.webp",
      alt: "The home page's first screen: a painted, empty House of Commons chamber behind the headline 'The Liberals hold 173 of 343 seats, a majority of one.'",
      caption: "The first screen states where the House stands, dated, in one sentence.",
      kind: "screen",
      width: 1440,
      height: 900,
    },
    {
      src: "/case-studies/politicalrecord/house-board-1440.webp",
      alt: "The House board: members seated by province as rows of tokens in party colours either side of the aisle, with the Speaker's chair and the 172-seat majority line.",
      caption: "The House board, seated by province with the majority line marked.",
      kind: "screen",
      width: 1440,
      height: 520,
    },
    {
      src: "/case-studies/politicalrecord/riding-1440.webp",
      alt: "The Edmonton Strathcona riding page: the board zoomed onto the riding in its party's colour, with a one-sentence answer giving the member, party, 2025 margin, and as-of date.",
      caption: "A riding page opens with one definite, dated answer.",
      kind: "screen",
      width: 1440,
      height: 1010,
    },
    {
      src: "/case-studies/politicalrecord/board-dark-1440.webp",
      alt: "The watercolour board in dark mode, with the paper and seas shifted to deep brown and the provinces keeping their party washes.",
      caption: "Dark mode follows the system setting.",
      kind: "screen",
      width: 1440,
      height: 760,
    },
    {
      src: "/case-studies/politicalrecord/board-390.webp",
      alt: "The home board on a phone, edge to edge, with province filters and a plain-language list of the nine seats that changed since June.",
      caption: "On a phone, the board comes with a plain list of what changed.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
    {
      src: "/case-studies/politicalrecord/riding-390.webp",
      alt: "The Edmonton Strathcona riding page on a phone: compact header with a province stepper, the riding's close-up map, and the opening answer sentence.",
      caption: "The riding page on a phone.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
  ],
  outcome: {
    heading: "Live, and a month old",
    body: [
      "The Political Record is live at politicalrecord.ca: the board, the House seated by province, 343 riding pages, seven by-election pages, the ledger, articles, and the sources, methods, and corrections pages. I built it alone in about a month: 397 commits, 371 of them co-authored with Claude, and 54 dated entries in the decision log.",
      "There's more to do. No editor is named yet, the riding readings wait until I've read all 343 myself, French comes later, and I have no traffic or citation numbers to show. The code is private, so the site is the demo.",
    ],
  },
} as const satisfies CaseStudy;
