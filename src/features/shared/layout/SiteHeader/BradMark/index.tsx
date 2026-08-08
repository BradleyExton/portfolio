import { bradFrontFace, bradPalette, bradTorso } from "@/features/shared/character/bradArtwork";
import * as styles from "./styles";

/* Bradley as a nav-scale logo mark. This is not a redrawing of the how-i-work
   scene figure — it is that figure's own paths, cropped to a bust by one
   transform, so the two can never read as different people. Earlier versions
   retraced him at mark scale and each one landed slightly off: a different
   hairline, a hoodie instead of the button-up, a collar that closed into a bow
   tie. Redrawing is the bug, so there is nothing to redraw here.

   The fit maps the figure's crown (y=2) to y=2.5 in a 48-unit box and runs
   past the collar, which leaves the placket and lapels exiting the bottom edge
   rather than resolving inside it. Pulling in tighter than this buys a bigger
   head at the cost of the collar, which is the detail carrying the shirt.

   The stubble is the one thing dropped: the wash reads as intended across a
   full-height scene figure and as a dirty chin at 32px.

   The viewBox is cropped to the drawing rather than left square. A bust is
   portrait, so a square box padded it with about five pixels of nothing on
   each side, which the eye adds to the gap: the wordmark sat 10px away and
   read as 16px, and the mark looked smaller than the height it was set to.
   Trimming to the ink means the gap in the header is the gap you get. */
const FIT = "translate(24 1.3) scale(0.6)";

/* The drawing's own bounds: ears reach x 8.7..39.3, crown sits at y 2.5, and
   the shirt runs off the bottom edge. Half a unit of slack on each side keeps
   antialiasing off the boundary. */
const VIEW_BOX = "8.2 2 31.6 46";

export function BradMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? styles.mark}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={FIT}>
        <path d={bradTorso.body} fill={bradPalette.shirt} />
        <path d={bradTorso.shade} fill={bradPalette.shirtShade} />
        <path d={bradTorso.lapelLeft} fill={bradPalette.trim} />
        <path d={bradTorso.lapelRight} fill={bradPalette.trim} />
        <rect {...bradTorso.placket} fill={bradPalette.trim} opacity="0.7" />
        {bradTorso.buttonYs.map((y) => (
          <circle key={y} cx="0" cy={y} r="1.4" fill={bradPalette.shirtShade} />
        ))}

        <rect {...bradFrontFace.neck} fill={bradPalette.skinShade} />
        <path d={bradFrontFace.skull} fill={bradPalette.skin} />
        <circle {...bradFrontFace.earLeft} fill={bradPalette.skin} />
        <circle {...bradFrontFace.earRight} fill={bradPalette.skinShade} />
        <path d={bradFrontFace.hair} fill={bradPalette.hair} />
        <path d={bradFrontFace.sideburnLeft} fill={bradPalette.hair} />
        <path d={bradFrontFace.sideburnRight} fill={bradPalette.hair} />
        <circle {...bradFrontFace.eyeLeft} fill={bradPalette.eye} />
        <circle {...bradFrontFace.eyeRight} fill={bradPalette.eye} />
        <path
          d={bradFrontFace.brows}
          stroke={bradPalette.brow}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={bradFrontFace.nose}
          stroke={bradPalette.nose}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={bradFrontFace.mouth}
          stroke={bradPalette.mouth}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
