import * as styles from "./styles";

// Inlined from public/images/what-i-do/ai.svg; loop keyframes moved to
// globals.css so several inline scenes can mount without keyframe collisions.
export function AiIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(268,56)">
        <g className={styles.pieces[0]}>
          <polygon points="0,-14 294.4,156 112.6,261 -181.9,91" fill="#ecfdf5" />
          <polygon points="-181.9,91 -181.9,105 112.6,275 112.6,261" fill="#d1fae5" />
          <polygon points="294.4,156 294.4,170 112.6,275 112.6,261" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[1]}>
          <polygon points="53.7,81 58.9,84 19.1,107 13.9,104" fill="#a7f3d0" />
          <polygon points="31.2,128 53.7,141 48.5,144 26,131" fill="#a7f3d0" />
          <polygon points="110.9,174 152.4,198 147.2,201 105.7,177" fill="#a7f3d0" />
          <polygon points="173.2,152 178.4,155 128.2,184 123,181" fill="#a7f3d0" />
          <polygon points="178.4,155 200.9,168 195.7,171 173.2,158" fill="#a7f3d0" />
          <polygon points="117.8,184 123,187 76.2,214 71,211" fill="#a7f3d0" />
          <polygon points="81.4,211 103.9,224 98.7,227 76.2,214" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[2]}>
          <polygon points="-31.2,-58 69.3,0 62.4,4 -38.1,-54" fill="#f1f6f3" />
          <polygon points="69.3,0 62.4,4 62.4,96 69.3,92" fill="#e0eae5" />
          <g transform="matrix(0.866,0.5,0,1,-38.1,38)">
            <rect x="0" y="-92" width="116" height="92" rx="4" fill="#064e3b" />
            <rect x="10" y="-76" width="48" height="7" rx="3.5" fill="#34d399" />
            <rect x="10" y="-60" width="64" height="7" rx="3.5" fill="#a7f3d0" />
            <rect x="10" y="-44" width="40" height="7" rx="3.5" fill="#6ee7b7" />
            <rect x="10" y="-24" width="56" height="9" rx="4.5" fill="#ecfdf5" />
            <rect x="72" y="-24" width="8" height="9" rx="2" fill="#34d399" className={styles.cursor} />
          </g>
        </g>
        <g className={styles.pieces[3]}>
          <polygon points="8.7,89 43.3,109 8.7,129 -26,109" fill="#ffffff" />
          <polygon points="-26,109 -26,119 8.7,139 8.7,129" fill="#e0eae5" />
          <polygon points="43.3,109 43.3,119 8.7,139 8.7,129" fill="#c9d8d0" />
        </g>
        <g className={styles.pieces[4]}>
          <polygon points="76.2,120 145.5,160 76.2,200 6.9,160" fill="#d1fae5" />
          <polygon points="76.2,112 131.6,144 76.2,176 20.8,144" fill="#10b981" />
          <polygon points="20.8,144 20.8,160 76.2,192 76.2,176" fill="#059669" />
          <polygon points="131.6,144 131.6,160 76.2,192 76.2,176" fill="#047857" />
          <polygon points="76.2,128 103.9,144 76.2,160 48.5,144" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[5]}>
          <polygon points="213.9,150.5 245.1,168.5 213.9,186.5 182.7,168.5" fill="#6ee7b7" />
          <polygon points="182.7,168.5 182.7,178.5 213.9,196.5 213.9,186.5" fill="#34d399" />
          <polygon points="245.1,168.5 245.1,178.5 213.9,196.5 213.9,186.5" fill="#10b981" />
        </g>
        <g className={styles.pieces[6]}>
          <polygon points="167.1,181.5 198.3,199.5 167.1,217.5 136,199.5" fill="#6ee7b7" />
          <polygon points="136,199.5 136,209.5 167.1,227.5 167.1,217.5" fill="#34d399" />
          <polygon points="198.3,199.5 198.3,209.5 167.1,227.5 167.1,217.5" fill="#10b981" />
        </g>
        <g className={styles.pieces[7]}>
          <polygon points="118.6,207.5 149.8,225.5 118.6,243.5 87.5,225.5" fill="#6ee7b7" />
          <polygon points="87.5,225.5 87.5,235.5 118.6,253.5 118.6,243.5" fill="#34d399" />
          <polygon points="149.8,225.5 149.8,235.5 118.6,253.5 118.6,243.5" fill="#10b981" />
        </g>
        <g className={styles.pieces[8]}>
          <g transform="translate(92,96)">
            <polygon points="0,0 12,6.9 0,13.8 -12,6.9" fill="#fbbf24" className={styles.bobDiamond} />
          </g>
        </g>
        <g className={styles.pieces[9]}>
          <polygon
            points="0,0 6,3.5 0,6.9 -6,3.5"
            transform="translate(118,118)"
            fill="#6ee7b7"
            className={styles.twinkleA}
          />
          <polygon
            points="0,0 5,2.9 0,5.8 -5,2.9"
            transform="translate(70,116)"
            fill="#6ee7b7"
            className={styles.twinkleB}
          />
        </g>
        <g className={styles.pieces[10]}>
          <polygon points="0,0 13,7.5 0,15 -13,7.5" transform="translate(-160,40)" fill="#a7f3d0" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" transform="translate(244,8)" fill="#6ee7b7" />
        </g>
      </g>
    </svg>
  );
}
