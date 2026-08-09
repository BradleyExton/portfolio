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
        {/* The board carries the whole scene, so it sits on the slab rather
            than hanging off its left corner: the shift is equal parts along
            each ground axis, which in this projection is a straight slide to
            the right that leaves its height alone. He stands at its near end
            and everything else on the floor moved out of his way.
            Layout translates go on a child of the piece group, never on the
            group itself — the assemble animation writes transform, and a CSS
            transform beats the attribute, so a placement put there is silently
            dropped. */}
        <g className={styles.pieces[2]}>
          <g transform="translate(120,0)">
            <polygon points="-128.2,-34 -26,25 -32.9,29 -135.1,-30" fill="#f1f6f3" />
            <polygon points="-26,25 -32.9,29 -32.9,161 -26,157" fill="#e0eae5" />
            <g transform="matrix(0.866,0.5,0,1,-135.1,102)">
              <rect x="0" y="-132" width="118" height="132" rx="4" fill="#f8faf9" />
              {/* The page moves under his left hand, so it needs an edge to
                  move past: same rect as the sheet, and the rows ride a group
                  inside it. Without the clip a dragged row leaves the doc and
                  keeps going across the floor. */}
              <clipPath id="spec-doc-page">
                <rect x="0" y="-132" width="118" height="132" rx="4" />
              </clipPath>
              <g clipPath="url(#spec-doc-page)">
                <g className={styles.docScroll}>
                  <rect x="12" y="-118" width="52" height="11" rx="5" fill="#10b981" />
                  <rect x="12" y="-100" width="86" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="12" y="-86" width="70" height="7" rx="3.5" fill="#c9d8d0" />
                  {/* The line under the pencil grows while he writes and clears
                      for the next pass; scaleX pivots on the rect's left edge
                      because the wrapping translate puts the origin there. It
                      sits on the row his pencil actually reaches — he is a head
                      shorter than the board, so that is up here rather than at
                      the foot of the page. */}
                  <g transform="translate(12,-72)">
                    <g className={styles.typeLine}>
                      <rect x="0" y="0" width="70" height="7" rx="3.5" fill="#c9d8d0" />
                    </g>
                  </g>
                  <rect x="85" y="-72" width="8" height="7" rx="2" fill="#34d399" className={styles.cursor} />
                  <rect x="12" y="-58" width="72" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="12" y="-42" width="10" height="10" rx="3" fill="#10b981" />
                  <rect x="28" y="-40" width="44" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="12" y="-26" width="10" height="10" rx="3" fill="#10b981" />
                  <rect x="28" y="-24" width="56" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="12" y="-10" width="64" height="7" rx="3.5" fill="#c9d8d0" />
                  {/* Below the fold, and the reason the scroll reads as a
                      scroll: the sheet has more doc than it can show, so a
                      notch up retires a row off the top and brings one in from
                      under the edge. */}
                  <rect x="12" y="4" width="80" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="12" y="18" width="10" height="10" rx="3" fill="#10b981" />
                  <rect x="28" y="20" width="48" height="7" rx="3.5" fill="#c9d8d0" />
                  <rect x="12" y="34" width="66" height="7" rx="3.5" fill="#c9d8d0" />
                </g>
              </g>
            </g>
          </g>
        </g>
        <g className={styles.pieces[3]}>
          <g transform="translate(-110,-32)">
            <polygon points="0,94 48.5,122 0,150 -48.5,122" fill="#10b981" />
            <polygon points="-48.5,122 -48.5,136 0,164 0,150" fill="#059669" />
            <polygon points="48.5,122 48.5,136 0,164 0,150" fill="#047857" />
            <polygon points="0,109 22.5,122 0,135 -22.5,122" fill="#a7f3d0" />
          </g>
        </g>
        <g className={styles.pieces[4]}>
          <g transform="translate(92.8,31)">
            <polygon points="57.2,139 91.8,159 57.2,179 22.5,159" fill="#ffffff" />
            <polygon points="22.5,159 22.5,169 57.2,189 57.2,179" fill="#e0eae5" />
            <polygon points="91.8,159 91.8,169 57.2,189 57.2,179" fill="#c9d8d0" />
          </g>
          <g transform="translate(112.8,-41)">
            <polygon points="102.2,170 129.9,186 102.2,202 74.5,186" fill="#6ee7b7" />
            <polygon points="74.5,186 74.5,195 102.2,211 102.2,202" fill="#34d399" />
            <polygon points="129.9,186 129.9,195 102.2,211 102.2,202" fill="#10b981" />
          </g>
        </g>
        <g className={styles.pieces[5]}>
          <g transform="translate(-110,46)">
            <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#fbbf24" className={styles.bobDiamond} />
          </g>
          <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#6ee7b7" className={styles.twinkleA} transform="translate(86.6,136)" />
          <polygon points="0,0 5,2.9 0,5.8 -5,2.9" fill="#6ee7b7" className={styles.twinkleB} transform="translate(140.3,163)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#a7f3d0" transform="translate(-160,40)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#6ee7b7" transform="translate(244,8)" />
        </g>
        {/* Squared up to the board and standing on its centre line. The mirror
            is gone, so his writing hand is his right one and it reaches up into
            the doc; in this projection stepping forward off the board also
            steps left, so the spot that puts him under the middle of the panel
            is in front of its right half, not its middle. */}
        <g className={styles.pieces[6]}>
          <BradFigure pose="spec" transform="translate(38.5,173) scale(0.72) translate(0,-159)" />
        </g>
      </g>
    </svg>
  );
}
