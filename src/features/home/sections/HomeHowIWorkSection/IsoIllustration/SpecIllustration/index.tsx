import { BradFigure } from "../BradFigure";
import * as styles from "./styles";

// Inlined from public/images/how-i-work/spec.svg; loop keyframes live in
// globals.css so several inline scenes can mount without keyframe collisions.
export function SpecIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(268,34)">
        <g className={styles.pieces[0]}>
          <polygon points="0,-14 294.4,156 112.6,261 -181.9,91" fill="#ecfdf5" />
          <polygon points="-181.9,91 -181.9,105 112.6,275 112.6,261" fill="#d1fae5" />
          <polygon points="294.4,156 294.4,170 112.6,275 112.6,261" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[1]}>
          <polygon points="-85.4,97.7 -33.5,121.7 -28.9,118.3 -80.8,94.3" fill="#a7f3d0" />
          <polygon points="26.8,154.5 35.5,159.5 40.7,156.5 32,151.5" fill="#a7f3d0" />
          <polygon points="73.6,181.5 83.1,187 88.3,184 78.8,178.5" fill="#a7f3d0" />
          <polygon points="142,127 168,142 142,157 116,142" fill="#d1fae5" />
          <polygon points="65.8,65 84.9,76 65.8,87 46.8,76" fill="#d1fae5" />
          <polygon points="161.1,170 183.6,183 161.1,196 138.6,183" fill="#d1fae5" />
        </g>
        <g className={styles.pieces[2]}>
          <polygon points="-128.2,-34 -26,25 -32.9,29 -135.1,-30" fill="#f1f6f3" />
          <polygon points="-26,25 -32.9,29 -32.9,139 -26,135" fill="#e0eae5" />
          <g transform="matrix(0.866,0.5,0,1,-135.1,80)">
            <rect x="0" y="-110" width="118" height="110" rx="4" fill="#f8faf9" />
            <rect x="12" y="-96" width="52" height="11" rx="5" fill="#10b981" />
            <rect x="12" y="-76" width="90" height="7" rx="3.5" fill="#c9d8d0" />
            <rect x="12" y="-62" width="72" height="7" rx="3.5" fill="#c9d8d0" />
            <rect x="12" y="-46" width="10" height="10" rx="3" fill="#10b981" />
            <rect x="28" y="-44" width="44" height="7" rx="3.5" fill="#c9d8d0" />
            <rect x="12" y="-30" width="10" height="10" rx="3" fill="#10b981" />
            <rect x="28" y="-28" width="56" height="7" rx="3.5" fill="#c9d8d0" />
            <rect x="12" y="-14" width="28" height="7" rx="3.5" fill="#c9d8d0" />
            <rect x="46" y="-14" width="8" height="7" rx="2" fill="#34d399" className={styles.cursor} />
          </g>
        </g>
        <g className={styles.pieces[3]}>
          <polygon points="0,94 48.5,122 0,150 -48.5,122" fill="#10b981" />
          <polygon points="-48.5,122 -48.5,136 0,164 0,150" fill="#059669" />
          <polygon points="48.5,122 48.5,136 0,164 0,150" fill="#047857" />
          <polygon points="0,109 22.5,122 0,135 -22.5,122" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[4]}>
          <polygon points="57.2,139 91.8,159 57.2,179 22.5,159" fill="#ffffff" />
          <polygon points="22.5,159 22.5,169 57.2,189 57.2,179" fill="#e0eae5" />
          <polygon points="91.8,159 91.8,169 57.2,189 57.2,179" fill="#c9d8d0" />
          <polygon points="102.2,170 129.9,186 102.2,202 74.5,186" fill="#6ee7b7" />
          <polygon points="74.5,186 74.5,195 102.2,211 102.2,202" fill="#34d399" />
          <polygon points="129.9,186 129.9,195 102.2,211 102.2,202" fill="#10b981" />
        </g>
        <g className={styles.pieces[5]}>
          <g transform="translate(0,78)">
            <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#fbbf24" className={styles.bobDiamond} />
          </g>
          <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#6ee7b7" className={styles.twinkleA} transform="translate(86.6,136)" />
          <polygon points="0,0 5,2.9 0,5.8 -5,2.9" fill="#6ee7b7" className={styles.twinkleB} transform="translate(140.3,163)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#a7f3d0" transform="translate(-160,40)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#6ee7b7" transform="translate(244,8)" />
        </g>
        <g className={styles.pieces[6]}>
          <BradFigure pose="spec" transform="translate(-52,175) scale(-0.78,0.78) translate(0,-159)" />
        </g>
      </g>
    </svg>
  );
}
