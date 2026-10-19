import type { CaseStudy } from "./types";

/* Every claim here is sourced in docs/case-studies/photo-games-facts.md. */
export const photoGamesCaseStudy = {
  slug: "photo-games",
  title: "Photo Games",
  summary:
    "Party games made from a group's own photos, specced by me and built task by task by an autonomous agent pipeline.",
  tags: ["AI agents", "Socket.IO", "SQLite"],
  meta: [
    { label: "Role", value: "Product owner and spec author; Claude agents wrote the code" },
    { label: "Stack", value: "TypeScript, React, Node, Socket.IO, SQLite, Gemini, Fly.io" },
    { label: "Timeline", value: "September 2026, about a week" },
  ],
  links: [],
  cover: {
    src: "/case-studies/photo-games/display-lobby-1440.webp",
    alt: "The Photo Games TV lobby: the room code KVBR in big coloured magnet letters, a scan-to-join QR code, a photo countdown, and name tags for four players.",
    caption: "The TV lobby, waiting for photos.",
    kind: "screen",
    width: 1440,
    height: 900,
  },
  problem: {
    heading: "Party games out of the photos you already took",
    body: [
      "The bet in the spec: photos a group took themselves are the one kind of personal content that has ever scaled in party games, and nobody had built the games around them. A laptop or TV shows a room code, players join on their phones and add a few camera-roll photos, and that pool feeds three games: Caption, Geo, and Recreate.",
      "It's the successor to Wing Night, and a test of a different way of building. I spent a planning session turning the idea into a spec with dated decisions, then let an autonomous pipeline build it one task at a time.",
    ],
    constraints: [
      "A first-time host goes from nothing to playing in under five minutes.",
      "Players stay anonymous and never sign up. Only the host has an account.",
      "People write every prompt, caption, and joke. AI only renders images, and only in Recreate.",
      "Other people's photos: one consent tap per upload, deleted when the room ends, and served as re-encoded copies with metadata stripped.",
      "A budget of $1.50 to $2.50 per 12-player night for image generation.",
      "No TV code. The display is a browser URL.",
    ],
  },
  architecture: {
    heading: "One machine, with seams to swap later",
    description:
      "A single Node process serves the web app and holds every live room in memory, writing each change through to SQLite so a restart mid-round picks up where it left off.",
    diagram: {
      title: "Photo Games architecture",
      description:
        "Players' phones send game actions and photo uploads to a single room server on Fly.io and receive their own scoped view. The server sends the TV display a view with no secrets, writes every change through to SQLite and a photo volume, sends Recreate image edits to Gemini two at a time, and sends host login links through Resend.",
      wideGrid: { cols: 4, rows: 3 },
      narrowGrid: { cols: 2, rows: 4 },
      nodes: [
        { id: "display", label: "TV display", detail: "any browser", wide: { col: 0, row: 0.5 }, narrow: { col: 0, row: 0 } },
        { id: "phones", label: "Phones", detail: "players and host", wide: { col: 0, row: 1.5 }, narrow: { col: 1, row: 0 } },
        { id: "server", label: "Room server", detail: "Node + Socket.IO", emphasis: true, wide: { col: 1.5, row: 1 }, narrow: { col: 0.5, row: 1 } },
        { id: "store", label: "SQLite + photos", detail: "Fly volume", wide: { col: 3, row: 0 }, narrow: { col: 0, row: 2 } },
        { id: "gemini", label: "Gemini", detail: "Recreate images", wide: { col: 3, row: 1 }, narrow: { col: 1, row: 2 } },
        { id: "resend", label: "Resend", detail: "host login links", wide: { col: 3, row: 2 }, narrow: { col: 0.5, row: 3 } },
      ],
      edges: [
        { from: "phones", to: "server", label: "actions, uploads", twoWay: true },
        { from: "server", to: "display", label: "no secrets" },
        { from: "server", to: "store", label: "write-through", twoWay: true },
        { from: "server", to: "gemini", label: "2 at a time" },
        { from: "server", to: "resend", label: "magic links" },
      ],
    },
    notes: [
      "Every socket event passes a payload guard, then role and token auth, then the game's pure reducer. Each game exposes host, player, and display views, and leak tests serialize them to prove the display never carries a secret.",
      "Timers are absolute deadlines, and rooms rehydrate from their SQLite snapshot, so a restarted server picks up mid-round.",
      "Image edits go through a queue: two jobs at a time, a 90-second timeout, one run per job, results cached. Outside production without a key, it never calls Gemini.",
    ],
  },
  decisions: {
    heading: "Three calls that shaped it",
    items: [
      {
        title: "Pick teams on cost, then reverse after a playtest",
        choice:
          "Per-player renders would have cost about $0.80 per target and blown the night budget, so Recreate started with one prompt and one render per team, keeping a four-target game near $1.10. After the first playtest I changed my mind: the game I wanted was my prompt, my picture. Individuals became the default, and teams became a mode that runs through the same reducer.",
        tradeoff:
          "A higher cost per night, and a 12-player round now queues 12 renders behind a cap of two. Because the cost math and the queue were already in place, the reversal was one added task.",
      },
      {
        title: "One machine and SQLite, behind interfaces",
        choice:
          "I weighed an object store, managed Postgres, and Cloudflare Durable Objects, which cost nothing when idle but meant rewriting the socket layer. I chose one Fly machine with SQLite and a local volume at about $3.50 a month, with the room, snapshot, and photo stores behind interfaces so Postgres or R2 can come later.",
        tradeoff: "A single point of failure, backed up only by Fly's daily volume snapshots.",
      },
      {
        title: "Test the protocol with bots, keep browsers few",
        choice:
          "The main gate is a scripted bot night that plays whole games across several rooms over real sockets in seconds, next to pure game tests and leak tests. Browsers only prove rendering, so Playwright is held to four specs.",
        tradeoff: "Thin real-browser coverage, accepted on purpose and written into the spec.",
      },
    ],
  },
  verification: {
    heading: "A pipeline that only trusted exit codes",
    description:
      "Each task had its own verify command. The orchestrator sent one fresh builder agent per task and marked it green only when that command exited 0, never on the agent's say-so.",
    stats: [
      { value: "690", label: "unit and game tests, all passing" },
      { value: "23 of 23", label: "tasks green by exit code" },
      { value: "16 h", label: "to build the first 22 tasks" },
    ],
    checks: [
      "The gate runs lint, typecheck, the tests, a bot night with 12 bots per room, and a bots smoke test. It passed again at the audited commit.",
      "One failure is on the record: a task first failed on a load-sensitive socket test and passed on its second attempt.",
      "The bot night restarts the server mid-round and checks that every deadline survives.",
      "The first Fly image would have crashed at boot on a missing content file. Now a test derives every content path from the server source, and the gate parses the Dockerfile and fly.toml.",
      "Four Playwright specs, including a full Caption round across a host, three players, and the display.",
    ],
  },
  gallery: [
    {
      src: "/case-studies/photo-games/caption-reveal-1440.webp",
      alt: "The TV revealing a caption pair: a taped Polaroid captioned 'Me explaining my weekend plans', labelled from the house pack, with the author hidden until after the vote.",
      caption: "Caption on the TV: the author stays hidden until the vote.",
      kind: "screen",
      width: 1440,
      height: 900,
    },
    {
      src: "/case-studies/photo-games/caption-results-1440.webp",
      alt: "The TV after a Caption round: a 'Best pair' rosette on Dev's winning caption, with the other pairs ranked by votes and their authors revealed.",
      caption: "Round results, with authors revealed.",
      kind: "screen",
      width: 1440,
      height: 900,
    },
    {
      src: "/case-studies/photo-games/contribute-390.webp",
      alt: "A player's phone after joining: 'Add 3 photos from tonight', three empty photo slots, and a note that photos are deleted when the room ends.",
      caption: "Joining: add three photos, with the deletion promise up front.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
    {
      src: "/case-studies/photo-games/caption-write-390.webp",
      alt: "A phone in Caption's write phase: a dealt photo in a Polaroid frame with the player's caption previewed on it, a character counter, a Report button, and a timer.",
      caption: "Writing a caption on a dealt photo.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
    {
      src: "/case-studies/photo-games/caption-vote-390.webp",
      alt: "A phone in the vote phase: 'Vote for the best pair', listing two photo-and-caption pairs, with the player's own pair left out.",
      caption: "Voting, with your own pair left out.",
      kind: "phone",
      width: 780,
      height: 1688,
    },
  ],
  outcome: {
    heading: "Built in a week, offline for now",
    body: [
      "Caption, Geo, and Recreate all work, with host accounts, a host photo library, a house pack so a room with no uploads can still play, a report flow, and a later design pass that gave it a paper-and-magnets look. It went live on Fly on September 24. It's 70 commits, 61 of them co-authored by Claude.",
      "It's offline today: the Fly trial ended, and the site stays down until billing is added. An open code review has since found a crash bug and two memory problems to fix before it goes back up. The house pack is placeholder art, the terms are drafts, the name is a working title, and the repo is private.",
    ],
  },
} as const satisfies CaseStudy;
