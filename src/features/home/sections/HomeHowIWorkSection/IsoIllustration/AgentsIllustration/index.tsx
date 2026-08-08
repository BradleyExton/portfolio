import { BradFigure } from "../BradFigure";
import * as styles from "./styles";

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
            clocks: one tile lifts per beat of the same 2.4s bar the arm sweeps
            on, each offset by a third, with a note rising off the downbeat.
            That sync is the whole point of the scene — orchestration. */}
        <g className={styles.pieces[4]}>
          <g className={styles.beatA}>
            <polygon points="82.3,62.5 111.7,79.5 82.3,96.5 52.8,79.5" fill="#6ee7b7" />
            <polygon points="52.8,79.5 52.8,88.5 82.3,105.5 82.3,96.5" fill="#34d399" />
            <polygon points="111.7,79.5 111.7,88.5 82.3,105.5 82.3,96.5" fill="#10b981" />
          </g>
          <g transform="translate(82.3,56.5)">
            <polygon points="0,0 7,4 0,8.1 -7,4" fill="#059669" className={styles.noteA} />
          </g>
          <g className={styles.beatB}>
            <polygon points="73.6,107.5 103.1,124.5 73.6,141.5 44.2,124.5" fill="#6ee7b7" />
            <polygon points="44.2,124.5 44.2,133.5 73.6,150.5 73.6,141.5" fill="#34d399" />
            <polygon points="103.1,124.5 103.1,133.5 73.6,150.5 73.6,141.5" fill="#10b981" />
            <polygon points="0,0 10,5.8 0,11.5 -10,5.8" fill="#fbbf24" transform="translate(73.6,91.5)" />
          </g>
          <g transform="translate(73.6,101.5)">
            <polygon points="0,0 7,4 0,8.1 -7,4" fill="#059669" className={styles.noteB} />
          </g>
          <g className={styles.beatC}>
            <polygon points="4.3,117.5 33.8,134.5 4.3,151.5 -25.1,134.5" fill="#6ee7b7" />
            <polygon points="-25.1,134.5 -25.1,143.5 4.3,160.5 4.3,151.5" fill="#34d399" />
            <polygon points="33.8,134.5 33.8,143.5 4.3,160.5 4.3,151.5" fill="#10b981" />
          </g>
          <g transform="translate(4.3,111.5)">
            <polygon points="0,0 7,4 0,8.1 -7,4" fill="#059669" className={styles.noteC} />
          </g>
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
