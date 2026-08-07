import { BradFigure } from "../BradFigure";
import * as styles from "./styles";

// Inlined from public/images/how-i-work/context.svg; loop keyframes live in
// globals.css so several inline scenes can mount without keyframe collisions.
export function ContextIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(268,34)">
        <g className={styles.pieces[0]}>
          <polygon points="0,-14 294.4,156 112.6,261 -181.9,91" fill="#ecfdf5" />
          <polygon points="-181.9,91 -181.9,105 112.6,275 112.6,261" fill="#d1fae5" />
          <polygon points="294.4,156 294.4,170 112.6,275 112.6,261" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[1]}>
          <polygon points="-100.4,108.9 8.7,141.9 12.1,138.1 -97,105.1" fill="#a7f3d0" />
          <polygon points="189,160.5 105,146 102.9,150 186.9,164.5" fill="#a7f3d0" />
          <polygon points="67.3,83.1 69.1,120.1 76.4,119.9 74.7,82.9" fill="#a7f3d0" />
          <g transform="translate(-98.7,107)">
            <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#34d399" className={styles.packetA} />
          </g>
          <g transform="translate(187.9,162.5)">
            <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#34d399" className={styles.packetB} />
          </g>
          <g transform="translate(71,83)">
            <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#34d399" className={styles.packetC} />
          </g>
        </g>
        <g className={styles.pieces[2]}>
          <polygon points="-128.2,-8 -45.1,40 -52,44 -135.1,-4" fill="#f1f6f3" />
          <polygon points="-45.1,40 -52,44 -52,142 -45.1,138" fill="#e0eae5" />
          <g transform="matrix(0.866,0.5,0,1,-135.1,94)">
            <rect x="0" y="-98" width="96" height="98" rx="4" fill="#f8faf9" />
            <rect x="10" y="-86" width="44" height="10" rx="5" fill="#10b981" />
            <rect x="10" y="-68" width="72" height="6" rx="3" fill="#c9d8d0" />
            <rect x="10" y="-56" width="58" height="6" rx="3" fill="#c9d8d0" />
            <rect x="10" y="-44" width="66" height="6" rx="3" fill="#c9d8d0" />
            <rect x="10" y="-28" width="24" height="9" rx="4.5" fill="#a7f3d0" />
            <rect x="40" y="-28" width="24" height="9" rx="4.5" fill="#fbbf24" />
            <rect x="10" y="-14" width="24" height="9" rx="4.5" fill="#a7f3d0" />
          </g>
        </g>
        <g className={styles.pieces[3]}>
          <ellipse cx="207.8" cy="161" rx="24" ry="13.8" fill="#c9d8d0" />
          <ellipse cx="207.8" cy="152" rx="24" ry="13.8" fill="#e0eae5" />
          <ellipse cx="207.8" cy="143" rx="24" ry="13.8" fill="#f8faf9" />
        </g>
        <g className={styles.pieces[4]}>
          <polygon points="57.2,39 86.6,56 57.2,73 27.7,56" fill="#ffffff" />
          <polygon points="27.7,56 27.7,65 57.2,82 57.2,73" fill="#e0eae5" />
          <polygon points="86.6,56 86.6,65 57.2,82 57.2,73" fill="#c9d8d0" />
          <polygon points="102.2,55 126.4,69 102.2,83 77.9,69" fill="#6ee7b7" />
          <polygon points="77.9,69 77.9,77 102.2,91 102.2,83" fill="#34d399" />
          <polygon points="126.4,69 126.4,77 102.2,91 102.2,83" fill="#10b981" />
        </g>
        <g className={styles.pieces[5]}>
          <polygon points="56.3,90.5 111.7,122.5 56.3,154.5 0.9,122.5" fill="#10b981" />
          <polygon points="0.9,122.5 0.9,138.5 56.3,170.5 56.3,154.5" fill="#059669" />
          <polygon points="111.7,122.5 111.7,138.5 56.3,170.5 56.3,154.5" fill="#047857" />
          <polygon points="56.3,107.5 82.3,122.5 56.3,137.5 30.3,122.5" fill="#a7f3d0" />
          <g transform="translate(56.3,70.5)">
            <polygon points="0,0 10,5.8 0,11.5 -10,5.8" fill="#6ee7b7" className={styles.bobDiamond} />
          </g>
        </g>
        <g className={styles.pieces[6]}>
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#a7f3d0" transform="translate(-160,40)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#6ee7b7" transform="translate(244,8)" />
        </g>
        <g className={styles.pieces[7]}>
          <BradFigure pose="context" transform="translate(-20,172) scale(0.72,0.72) translate(0,-159)" />
        </g>
      </g>
    </svg>
  );
}
