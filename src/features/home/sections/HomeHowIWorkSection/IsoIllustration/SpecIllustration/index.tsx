import { BradFigure } from "../BradFigure";
import * as styles from "./styles";

/* Inlined from public/images/how-i-work/spec.svg; loop keyframes live in
   globals.css so several inline scenes can mount without keyframe collisions.

   Scene geometry is isometric with the plane's left corner at (-181.9,91) and
   the two ground axes u=(0.866,-0.5) (back-right) and v=(0.866,0.5)
   (front-right). Everything placed below was solved in that (u,v) space and
   written out flat, so nudging a prop means moving it along one of those two
   vectors rather than straight up the screen. The board stands on the v axis
   at u=80, which puts it across the middle of the plane; Bradley stands 39
   units of u in front of it, back to camera, and the doc's active line is
   positioned to meet the pen tip his reach angle produces. */
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
          <polygon points="110,200 161.9,224 166.5,220.6 114.6,196.6" fill="#a7f3d0" />
          <polygon points="26.8,154.5 35.5,159.5 40.7,156.5 32,151.5" fill="#a7f3d0" />
          <polygon points="73.6,181.5 83.1,187 88.3,184 78.8,178.5" fill="#a7f3d0" />
          <polygon points="142,127 168,142 142,157 116,142" fill="#d1fae5" />
          <polygon points="196,143 215.1,154 196,165 176.9,154" fill="#d1fae5" />
          <polygon points="161.1,170 183.6,183 161.1,196 138.6,183" fill="#d1fae5" />
        </g>
        <g className={styles.pieces[2]}>
          {/* Contact shadow along the base, or a panel this size reads as
              hovering over the plane rather than standing on it. */}
          <polygon points="-19,105 93.6,170 107.4,162 -5.2,97" fill="#0f766e" opacity="0.1" />
          <polygon points="-12.1,-29 100.5,36 93.6,40 -19,-25" fill="#f1f6f3" />
          <polygon points="100.5,36 93.6,40 93.6,170 100.5,166" fill="#e0eae5" />
          <g transform="matrix(0.866,0.5,0,1,-19,105)">
            <rect x="0" y="-130" width="130" height="130" rx="4" fill="#f8faf9" />
            {/* Left margin is 40, not the 14 a document would use, because he
                stands in front of the board's left edge: anything further left
                spends the whole loop behind his head. */}
            <rect x="40" y="-118" width="52" height="12" rx="6" fill="#10b981" />
            <rect x="40" y="-100" width="10" height="10" rx="3" fill="#10b981" />
            <rect x="56" y="-98" width="58" height="7" rx="3.5" fill="#c9d8d0" />
            {/* The line under the pencil grows while he writes and clears for
                the next pass; scaleX pivots on the rect's left edge because
                the wrapping translate puts the origin there. */}
            <g transform="translate(40,-84)">
              <g className={styles.typeLine}>
                <rect x="0" y="0" width="30" height="7" rx="3.5" fill="#c9d8d0" />
              </g>
            </g>
            <rect x="74" y="-84" width="8" height="7" rx="2" fill="#34d399" className={styles.cursor} />
            {/* Rows still to be filled in, in a paler tint: the spec is an
                outline he is working down, which is the whole point of the
                stage, and they keep the lower half of the board from reading
                as dead space. */}
            <rect x="40" y="-66" width="10" height="10" rx="3" fill="#d5e0da" />
            <rect x="56" y="-64" width="50" height="7" rx="3.5" fill="#d5e0da" />
            <rect x="40" y="-50" width="10" height="10" rx="3" fill="#d5e0da" />
            <rect x="56" y="-48" width="62" height="7" rx="3.5" fill="#d5e0da" />
            <rect x="40" y="-34" width="10" height="10" rx="3" fill="#d5e0da" />
            <rect x="56" y="-32" width="42" height="7" rx="3.5" fill="#d5e0da" />
            <rect x="40" y="-18" width="72" height="7" rx="3.5" fill="#d5e0da" />
          </g>
        </g>
        <g className={styles.pieces[3]}>
          <g transform="translate(-102,-17)">
            <polygon points="0,94 48.5,122 0,150 -48.5,122" fill="#10b981" />
            <polygon points="-48.5,122 -48.5,136 0,164 0,150" fill="#059669" />
            <polygon points="48.5,122 48.5,136 0,164 0,150" fill="#047857" />
            <polygon points="0,109 22.5,122 0,135 -22.5,122" fill="#a7f3d0" />
          </g>
        </g>
        <g className={styles.pieces[4]}>
          <g transform="translate(92.8,1)">
            <polygon points="57.2,139 91.8,159 57.2,179 22.5,159" fill="#ffffff" />
            <polygon points="22.5,159 22.5,169 57.2,189 57.2,179" fill="#e0eae5" />
            <polygon points="91.8,159 91.8,169 57.2,189 57.2,179" fill="#c9d8d0" />
          </g>
          <g transform="translate(105.6,-20)">
            <polygon points="102.2,170 129.9,186 102.2,202 74.5,186" fill="#6ee7b7" />
            <polygon points="74.5,186 74.5,195 102.2,211 102.2,202" fill="#34d399" />
            <polygon points="129.9,186 129.9,195 102.2,211 102.2,202" fill="#10b981" />
          </g>
        </g>
        <g className={styles.pieces[5]}>
          <g transform="translate(-102,61)">
            <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#fbbf24" className={styles.bobDiamond} />
          </g>
          <polygon points="0,0 6,3.5 0,6.9 -6,3.5" fill="#6ee7b7" className={styles.twinkleA} transform="translate(175,140)" />
          <polygon points="0,0 5,2.9 0,5.8 -5,2.9" fill="#6ee7b7" className={styles.twinkleB} transform="translate(140.3,163)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#a7f3d0" transform="translate(-160,40)" />
          <polygon points="0,0 13,7.5 0,15 -13,7.5" fill="#6ee7b7" transform="translate(244,8)" />
        </g>
        <g className={styles.pieces[6]}>
          <BradFigure pose="spec" transform="translate(-6,152) scale(0.74,0.74) translate(0,-159)" />
        </g>
      </g>
    </svg>
  );
}
