import { AgentBot } from "../AgentBot";
import type { AgentKind } from "../AgentBot/types";
import { BradFigure } from "../BradFigure";
import * as styles from "./styles";

/* Plinth under an agent, on the scene's 30-degree axes: a 34-unit square tile
   with a 9-unit lip. Paler than the emerald tiles it replaces — with a bot
   standing on it, an emerald pad and an emerald body merged into one shape and
   the bot lost its feet. */
function AgentPad({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <polygon points="0,-17 29.4,0 0,17 -29.4,0" fill="#d1fae5" />
      <polygon points="-29.4,0 -29.4,9 0,26 0,17" fill="#a7f3d0" />
      <polygon points="29.4,0 29.4,9 0,26 0,17" fill="#6ee7b7" />
    </g>
  );
}

/* Pad centres, back to front, so the group draws in depth order and a bot in
   front overlaps the plinth behind it.
   Laid out as a section fanned in front of the conductor rather than the tight
   diagonal the flat tiles used: tiles are 9 units tall and could sit almost on
   top of each other, but a 64-unit bot standing on the pad behind reaches over
   the one in front, and at the old spacing the back two collapsed into a single
   silhouette. Roughly 90 units of x between neighbours is what it takes to keep
   three bodies plus their arms clear of each other. */
const stations: { kind: AgentKind; x: number; y: number; beat: string; note: string }[] = [
  { kind: "gemini", x: 168, y: 118, beat: styles.beatC, note: styles.noteC },
  { kind: "claude", x: 105, y: 130, beat: styles.beatA, note: styles.noteA },
  // Sits further down the plane than the arc wants. The conductor's riser is
  // directly up-plane of this station, and anywhere higher put the bot's
  // antenna light on the riser's front face, where it read as a blemish on the
  // riser rather than as a thing standing in front of it.
  { kind: "codex", x: 5, y: 160, beat: styles.beatB, note: styles.noteB },
];

// Inlined from public/images/how-i-work/agents.svg; loop keyframes live in
// globals.css so several inline scenes can mount without keyframe collisions.
// The scene group sits 18px lower than its three siblings: the conductor
// stands on the riser at the back of the plane, and at the shared 34px offset
// his head clipped the top of the viewBox.
export function AgentsIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(268,52)">
        <g className={styles.pieces[0]}>
          <polygon points="0,-14 294.4,156 112.6,261 -181.9,91" fill="#ecfdf5" />
          <polygon points="-181.9,91 -181.9,105 112.6,275 112.6,261" fill="#d1fae5" />
          <polygon points="294.4,156 294.4,170 112.6,275 112.6,261" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[1]}>
          <polygon points="32.9,63 209.6,165 214.8,162 38.1,60" fill="#a7f3d0" />
          <polygon points="-10.4,88 166.3,190 171.5,187 -5.2,85" fill="#a7f3d0" />
          <polygon points="-53.7,113 123,215 128.2,212 -48.5,110" fill="#a7f3d0" />
          <polygon points="-18.4,81 37,63 34,60 -21.4,78" fill="#a7f3d0" />
          <polygon points="-22.6,78.6 -53.8,110.6 -48.4,112.4 -17.2,80.4" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[2]}>
          <polygon points="216.5,144 240.7,158 216.5,172 192.3,158" fill="#ffffff" />
          <polygon points="192.3,158 192.3,166 216.5,180 216.5,172" fill="#e0eae5" />
          <polygon points="240.7,158 240.7,166 216.5,180 216.5,172" fill="#c9d8d0" />
          <polygon points="173.2,177 197.4,191 173.2,205 149,191" fill="#d1fae5" />
          <polygon points="129.9,194 154.1,208 129.9,222 105.7,208" fill="#ffffff" />
          <polygon points="105.7,208 105.7,216 129.9,230 129.9,222" fill="#e0eae5" />
          <polygon points="154.1,208 154.1,216 129.9,230 129.9,222" fill="#c9d8d0" />
        </g>
        <g className={styles.pieces[3]}>
          <polygon points="-43.3,26 1.7,52 -43.3,78 -88.3,52" fill="#10b981" />
          <polygon points="-88.3,52 -88.3,66 -43.3,92 -43.3,78" fill="#059669" />
          <polygon points="1.7,52 1.7,66 -43.3,92 -43.3,78" fill="#047857" />
          <polygon points="-43.3,40 -22.5,52 -43.3,64 -64.1,52" fill="#a7f3d0" />
        </g>
        {/* The three agents answer the baton instead of drifting on their own
            clocks: one bot bobs per beat of the same 2.4s bar the arms sweep on,
            each offset by a third, with a note rising off its downbeat. That
            sync is the whole point of the scene — orchestration.
            The plinth stays planted and only the bot rides the beat; lifting the
            pad too made the floor look like it was bouncing under them. */}
        <g className={styles.pieces[4]}>
          {stations.map((station) => (
            <g key={station.kind}>
              <AgentPad x={station.x} y={station.y} />
              <g className={station.beat}>
                <AgentBot kind={station.kind} transform={`translate(${station.x},${station.y})`} />
              </g>
              <g transform={`translate(${station.x},${station.y - 74})`}>
                <polygon points="0,0 7,4 0,8.1 -7,4" fill="#059669" className={station.note} />
              </g>
            </g>
          ))}
        </g>
        <g className={styles.pieces[5]}>
          <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#6ee7b7" className={styles.twinkleA} transform="translate(0,46)" />
          <polygon points="0,0 5,2.9 0,5.8 -5,2.9" fill="#6ee7b7" className={styles.twinkleB} transform="translate(-82.3,113.5)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#a7f3d0" transform="translate(-160,40)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#6ee7b7" transform="translate(244,8)" />
        </g>
        <g className={styles.pieces[6]}>
          <BradFigure pose="agents" transform="translate(-43,58) scale(0.62,0.62) translate(0,-159)" />
        </g>
      </g>
    </svg>
  );
}
