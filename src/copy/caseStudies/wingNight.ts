import type { CaseStudy } from "./types";

/* Every claim here is sourced in docs/case-studies/wing-night-facts.md. */
export const wingNightCaseStudy = {
  slug: "wing-night",
  title: "Wing Night",
  summary:
    "A party game for one living room: a TV across the room, a host tablet, and a dozen phones, while everyone eats hotter and hotter wings.",
  tags: ["Real-time", "React", "Node"],
  meta: [
    { label: "Role", value: "Solo build, with AI coding agents" },
    { label: "Stack", value: "TypeScript, React, Vite, Node, Socket.IO, Cloudflare Workers" },
    { label: "Timeline", value: "February to October 2026" },
  ],
  links: [
    { label: "Visit wingnight.tv", href: "https://wingnight.tv" },
    { label: "View the source", href: "https://github.com/BradleyExton/wing-night" },
  ],
  cover: {
    src: "/case-studies/wing-night/tv-lobby-1440.webp",
    alt: "The Wing Night TV lobby: a join QR code showing 8 of 12 players in, six rounds pairing a hot sauce with a minigame, cartoon team birds, and four team score bars.",
    caption: "The TV lobby, with the night's lineup and a QR code to join.",
    kind: "screen",
    width: 1440,
    height: 900,
  },
  problem: {
    heading: "A game show for one living room",
    body: [
      "Wing Night is a host-led party for 12 to 20 people in three to five teams. Each round, teams eat a hotter wing, then play a turn-based minigame while the spice kicks in.",
      "Three kinds of screen run it. A TV across the room shows the game, a host tablet drives it, and guests scan in on their phones to answer and bet. Phases never move on by themselves: the host decides, with skip, redo, and manual scoring always within reach.",
    ],
    constraints: [
      "Everything runs on the home Wi-Fi. Nothing on the night needs the internet.",
      "No accounts and no room codes. A phone takes a seat by scanning the TV's QR code.",
      "Plain HTTP on a LAN means no wake lock and no microphone, so phones sleep and have to reconnect instantly.",
      "The TV is designed for a 4K screen first, fills it, and never scrolls.",
      "Real names, photos, and music stay in a private content pack outside the repo.",
    ],
  },
  architecture: {
    heading: "One server, a different view for every screen",
    description:
      "The party server runs on the laptop and holds the whole game in memory. Screens render what it sends and ask it for changes; none of them work out game logic on their own.",
    diagram: {
      title: "Wing Night architecture",
      description:
        "A party server on the laptop sits at the centre. The host tablet exchanges the full game state and host actions with it. The TV receives a display-safe view with no answers. Guest phones exchange their own seat's view and actions. Minigame packages run inside the server and project separate host and TV views. A private content pack is read at boot, and the online guest portal at wingnight.tv feeds it through a one-way pull.",
      wideGrid: { cols: 4, rows: 3 },
      narrowGrid: { cols: 2, rows: 5 },
      nodes: [
        { id: "tablet", label: "Host tablet", detail: "/host", wide: { col: 0, row: 0 }, narrow: { col: 0, row: 0 } },
        { id: "tv", label: "TV display", detail: "/display over HDMI", wide: { col: 0, row: 1 }, narrow: { col: 1, row: 0 } },
        { id: "phones", label: "Guest phones", detail: "/play", wide: { col: 0, row: 2 }, narrow: { col: 0, row: 2 } },
        { id: "server", label: "Party server", detail: "Node + Socket.IO", emphasis: true, wide: { col: 1.5, row: 1 }, narrow: { col: 0.5, row: 1 } },
        { id: "games", label: "Minigame packages", detail: "11 games", wide: { col: 3, row: 0 }, narrow: { col: 1, row: 2 } },
        { id: "pack", label: "Content pack", detail: "names, photos, music", wide: { col: 3, row: 1 }, narrow: { col: 0.5, row: 3 } },
        { id: "portal", label: "wingnight.tv", detail: "Worker + D1 + R2", wide: { col: 3, row: 2 }, narrow: { col: 0.5, row: 4 } },
      ],
      edges: [
        { from: "tablet", to: "server", label: "full state", twoWay: true },
        { from: "server", to: "tv", label: "no answers" },
        { from: "phones", to: "server", label: "own seat", twoWay: true },
        { from: "server", to: "games", label: "views", twoWay: true },
        { from: "pack", to: "server", label: "read at boot" },
        { from: "portal", to: "pack", label: "one-way pull" },
      ],
    },
    notes: [
      "Each screen gets a snapshot scoped to its role: the host sees everything, the TV gets a display-safe copy, and a phone sees only what its player may. A dropped phone comes back to a full snapshot.",
      "Each minigame is its own package. The server runs timers, auth, and scoring; the game projects a host view and a TV view, and the TV view never carries answers.",
      "The guest portal is a separate Cloudflare app that never talks to the party. A one-way pull copies names, painted heads, and team picks into the content pack.",
    ],
  },
  decisions: {
    heading: "Three calls that shaped it",
    items: [
      {
        title: "Put every minigame behind one boundary",
        choice:
          "The first trivia game lived inside the shared room state. I wrote it up as an architecture decision and moved games into their own packages: the server keeps the lifecycle, timers, auth, and when scores land, and each game returns pending results plus separate host and TV views.",
        tradeoff:
          "Upfront interface work, a messy stretch while trivia migrated, and more boundary tests. It paid back as 11 games on one contract, and a pass-around tablet that can't leak an answer to the TV.",
      },
      {
        title: "Keep the party offline",
        choice:
          "The party app is LAN-only, in memory, and never deployed. Accounts, uploads, a database, and AI-painted guest heads live on a separate Cloudflare app that the night never talks to.",
        tradeoff:
          "The party can't fail on venue internet, and the Geo game falls back to a plain grid when map tiles are missing. The cost is no persistence, plain-HTTP limits on phones, a second codebase to deploy, and a manual pull before every party.",
      },
      {
        title: "Two named layouts over one configurable one",
        choice:
          "Before changing anything, I measured the nine host screens at the real 1280 by 800 tablet size. The game canvas took anywhere from 33% to 90% of the screen, and one helper had been pasted into all nine files. The fix was a shared surface package with two named layouts and no layout flag.",
        tradeoff:
          "A migration across nine game screens in exchange for consistency. The same rule later turned down a configurable marquee in favour of one fixed design, picked from eight prototypes.",
      },
    ],
  },
  verification: {
    heading: "Thousands of tests, and screens checked at real sizes",
    description:
      "The project gate is lint, typecheck, and the unit tests, plus Playwright on pinned ports so a run can't quietly test someone else's dev server.",
    stats: [
      { value: "3,640", label: "unit tests, all passing" },
      { value: "75", label: "Playwright end-to-end tests" },
      { value: "11", label: "minigames on one contract" },
    ],
    checks: [
      "End-to-end tests drive several browsers at once: a 1280 by 800 tablet, a 1920 by 1080 TV, and phones pinning Geo answers while the host locks the round.",
      "TV views are tested to prove they never carry an answer.",
      "A performance pass cut the TV's first-load JavaScript from 1,224 kB to 390 kB with per-route and per-game chunks.",
      "Known bugs, and the games not yet played at a real table, are written down in the handoff notes.",
    ],
  },
  gallery: [
    {
      src: "/case-studies/wing-night/tv-dunlop-dash-1440.webp",
      alt: "The TV mid-turn in the Dunlop Dash minigame: a skateboarding bird runs down a street collecting wings under a neon marquee.",
      caption: "Dunlop Dash on the TV, one of 11 minigames.",
      kind: "screen",
      width: 1440,
      height: 900,
    },
    {
      src: "/case-studies/wing-night/tv-geo-reveal-1440.webp",
      alt: "The TV's Geo reveal: each phone's pin plotted by player name on a dark map, with a plaque reading best pin, off by 91.1 km.",
      caption: "The Geo reveal, after phones drop their pins and the host locks.",
      kind: "screen",
      width: 1440,
      height: 900,
    },
    {
      src: "/case-studies/wing-night/tablet-host-briefing-1280.webp",
      alt: "The host tablet's briefing screen, 'Up next: Geo', with music controls, a side-bets chip, overrides, and a Start Mini-Game bar.",
      caption: "The host tablet, captured at its real 1280 by 800 size.",
      kind: "screen",
      width: 1280,
      height: 800,
    },
    {
      src: "/case-studies/wing-night/tablet-dunlop-dash-1280.webp",
      alt: "The host tablet during the same Dunlop Dash run, with a tighter camera and Skip run and Reset turn controls.",
      caption: "The same run on the tablet, with the host's escape hatches.",
      kind: "screen",
      width: 1280,
      height: 800,
    },
    {
      src: "/case-studies/wing-night/phone-join-390.webp",
      alt: "A guest's phone after scanning the QR code: 'Tap your face.' over a grid of the night's players drawn as team-coloured birds.",
      caption: "Joining from a phone: scan, then tap your face.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
    {
      src: "/case-studies/wing-night/phone-geo-pin-390.webp",
      alt: "A playing team's phone during Geo: a map with a dropped pin and 'Your pin is in', waiting for the host to lock.",
      caption: "A phone answering in the Geo game.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
  ],
  outcome: {
    heading: "Playable end to end, still a hobby",
    body: [
      "The whole night works: setup, intro, eating, minigame, results, and a final scoreboard, plus Quick Play, joining by QR, answers on phones, side bets for spectators, and 11 games. The guest portal is live at wingnight.tv. It's 774 commits over eight months, all mine, 411 of them co-authored with Claude.",
      "Some of it is unfinished. The announcer voice and a shared photo library are designed but not built, two games haven't met a real table, and CI only gated the first three weeks of pull requests. Since then, work has gone straight to main behind the local gate.",
    ],
  },
} as const satisfies CaseStudy;
