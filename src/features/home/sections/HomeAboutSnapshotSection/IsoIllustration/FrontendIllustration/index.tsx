import * as styles from "./styles";

// Inlined from public/images/what-i-do/frontend.svg; loop keyframes moved to
// globals.css so several inline scenes can mount without keyframe collisions.
export function FrontendIllustration() {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <g transform="translate(246,110)">
        <g className={styles.pieces[0]}>
          <polygon points="0,-14 277.1,146 147.2,221 -129.9,61" fill="#ecfdf5" />
          <polygon points="-129.9,61 -129.9,75 147.2,235 147.2,221" fill="#d1fae5" />
          <polygon points="277.1,146 277.1,160 147.2,235 147.2,221" fill="#a7f3d0" />
        </g>
        <g className={styles.pieces[1]}>
          <polygon points="5.2,-3 178.4,97 71,159 -102.2,59" fill="#ffffff" />
          <polygon points="-102.2,59 -102.2,65 71,165 71,159" fill="#e0eae5" />
          <polygon points="178.4,97 178.4,103 71,165 71,159" fill="#c9d8d0" />
        </g>
        <g className={styles.pieces[2]}>
          <polygon points="-20.8,20 20.8,44 -20.8,68 -62.4,44" fill="#ecfdf5" />
          <polygon points="38.1,54 79.7,78 38.1,102 -3.5,78" fill="#ecfdf5" />
          <polygon
            points="97,88 138.6,112 97,136 55.4,112"
            fill="#ecfdf5"
            stroke="#34d399"
            strokeWidth="2"
            strokeDasharray="6 5"
            className={styles.slotPulse}
          />
        </g>
        <g className={styles.pieces[3]}>
          <polygon points="-20.8,12 17.3,34 -20.8,56 -58.9,34" fill="#a7f3d0" />
          <polygon points="-58.9,34 -58.9,44 -20.8,66 -20.8,56" fill="#6ee7b7" />
          <polygon points="17.3,34 17.3,44 -20.8,66 -20.8,56" fill="#34d399" />
        </g>
        <g className={styles.pieces[4]}>
          <polygon points="38.1,46 76.2,68 38.1,90 0,68" fill="#6ee7b7" />
          <polygon points="0,68 0,78 38.1,100 38.1,90" fill="#34d399" />
          <polygon points="76.2,68 76.2,78 38.1,100 38.1,90" fill="#10b981" />
        </g>
        <g className={styles.pieces[5]}>
          <polygon points="97,103 112.6,112 97,121 81.4,112" fill="#d1fae5" />
        </g>
        <g className={styles.pieces[6]}>
          <polygon points="162.8,129 211.3,157 162.8,185 114.3,157" fill="#ffffff" />
          <polygon points="114.3,157 114.3,168 162.8,196 162.8,185" fill="#e0eae5" />
          <polygon points="211.3,157 211.3,168 162.8,196 162.8,185" fill="#c9d8d0" />
          <polygon points="162.8,118 211.3,146 162.8,174 114.3,146" fill="#6ee7b7" />
          <polygon points="114.3,146 114.3,157 162.8,185 162.8,174" fill="#34d399" />
          <polygon points="211.3,146 211.3,157 162.8,185 162.8,174" fill="#10b981" />
          <polygon points="162.8,106 211.3,134 162.8,162 114.3,134" fill="#10b981" />
          <polygon points="114.3,134 114.3,146 162.8,174 162.8,162" fill="#059669" />
          <polygon points="211.3,134 211.3,146 162.8,174 162.8,162" fill="#047857" />
          <ellipse cx="162.8" cy="134" rx="20" ry="11.5" fill="#047857" />
          <ellipse cx="162.8" cy="126" rx="20" ry="11.5" fill="#059669" />
          <path
            d="M151.8 126l7 5 14-11"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        <g className={styles.pieces[7]}>
          <polygon points="97,30 135.1,52 97,74 58.9,52" fill="#10b981" />
          <polygon points="58.9,52 58.9,64 97,86 97,74" fill="#059669" />
          <polygon points="135.1,52 135.1,64 97,86 97,74" fill="#047857" />
        </g>
        <g className={styles.pieces[8]}>
          <polygon points="0,0 13,7.5 0,15 -13,7.5" transform="translate(250,-18)" fill="#6ee7b7" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" transform="translate(-150,40)" fill="#a7f3d0" />
        </g>
      </g>
    </svg>
  );
}
