"use client";

import { useId } from "react";
import * as styles from "./styles";

/* Bradley as a nav-scale logo mark: the same character as the how-i-work iso
   scenes, redrawn rather than scaled down. The scene figure's head is a 42x52
   box carrying 1.6-2.2 unit brow, nose, and mouth strokes; at a 32px render
   those land under a pixel each and the lower face turns to mud. So this
   drawing keeps only what survives the size — silhouette, hair, two eye dots,
   a stubbled jaw, one mouth stroke — and drops the nose and brows entirely.
   Hex literals rather than theme tokens, matching BradFigure: the character's
   palette is the character, and the site's semantic tokens would let a future
   theme recolour his skin.

   Geometry lives in a 48x48 box so the mark drops into the same plate the
   experience cards use. Head is 23 wide (x 12.5..35.5), crown at y=8, chin at
   y=37; the shoulders crest at 37.5 so they meet the jaw. Dropping that crest
   even two units lower exposes a column of neck and the head starts reading as
   a bust on a post. */
const palette = {
  skin: "#f2c29c",
  skinShade: "#eab88f",
  neckShade: "#d9a67e",
  hair: "#a37e54",
  stubble: "#c49a6c",
  hoodie: "#10b981",
  hoodieShade: "#059669",
  eye: "#2f2a26",
  mouth: "#7d5a38",
  plate: "#d1fae5",
} as const;

const HEAD_PATH =
  "M12.5 20 q0 -12 11.5 -12 q11.5 0 11.5 12 l0 7 q0 10 -11.5 10 q-11.5 0 -11.5 -10 z";

/* One clean sweep with a single part. At nav scale every extra notch closes
   up into a dark blob, so this cannot simply copy the scene figure's hairline.
   Known divergence: abd6498 redrew that figure with a centre part and
   sideburns, which this has not been reconciled against — same face and
   palette, different hairstyle. Worth a pass if the two ever read as
   different people side by side on the home page. */
const HAIR_PATH =
  "M12.5 21 q-0.5 -13 11.5 -13 q12 0 11.5 13 q-1.8 -6 -5.3 -7.4 q-1.3 2.4 -3.6 3 q0.6 -2.4 -0.6 -3.7 q-4.6 -1.8 -9.2 0.6 q-3.6 1.9 -4.3 7.5 z";

export function BradMark({ className }: { className?: string }) {
  /* Two clipPaths need document-unique ids, and useId's separators are not
     valid in a url(#...) reference. */
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const plateClip = `brad-plate-${uid}`;
  const headClip = `brad-head-${uid}`;

  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? styles.mark}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={plateClip}>
          <rect width="48" height="48" rx="12" />
        </clipPath>
        <clipPath id={headClip}>
          <path d={HEAD_PATH} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${plateClip})`}>
        <rect width="48" height="48" rx="12" fill={palette.plate} />

        {/* Neck, plus the shadow the jaw casts on it. Without the shadow the
            neck reads as a mount the head is sitting on. */}
        <rect x="20.5" y="30" width="7" height="11" fill={palette.skinShade} />
        <path d="M20.5 30 h7 v3.4 q-3.5 2.6 -7 0 z" fill={palette.neckShade} />

        <path d="M2 48 q3 -10.5 22 -10.5 q19 0 22 10.5 z" fill={palette.hoodie} />
        <path d="M24 37.5 q19 0 22 10.5 l-22 0 z" fill={palette.hoodieShade} />
        <path
          d="M17.4 36.6 q6.6 5 13.2 0"
          stroke={palette.hoodieShade}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        <circle cx="12.5" cy="24" r="2.5" fill={palette.skin} />
        <circle cx="35.5" cy="24" r="2.5" fill={palette.skinShade} />
        <path d={HEAD_PATH} fill={palette.skin} />

        {/* Stubble as an ellipse clipped to the head, so its top edge follows
            the jaw. A rect clipped the same way cuts a straight line across
            the cheeks and reads as a chinstrap. */}
        <g clipPath={`url(#${headClip})`}>
          <ellipse cx="24" cy="38" rx="12.5" ry="10.5" fill={palette.stubble} opacity="0.52" />
        </g>

        <path d={HAIR_PATH} fill={palette.hair} />
        <circle cx="18.6" cy="23.5" r="1.75" fill={palette.eye} />
        <circle cx="29.4" cy="23.5" r="1.75" fill={palette.eye} />
        <path
          d="M21.6 31.4 q2.4 2 4.8 0"
          stroke={palette.mouth}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Inset ring so the plate keeps an edge against the white nav. */}
      <rect
        x="0.6"
        y="0.6"
        width="46.8"
        height="46.8"
        rx="11.4"
        fill="none"
        stroke={palette.hoodieShade}
        strokeOpacity="0.26"
        strokeWidth="1.2"
      />
    </svg>
  );
}
