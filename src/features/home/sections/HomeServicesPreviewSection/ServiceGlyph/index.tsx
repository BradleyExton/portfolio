import type { ServiceKey } from "../types";
import * as styles from "./styles";

/* Mini iso glyphs on the hero tool-glyph grammar (viewBox 36, brand palette
   via CSS vars, one amber element per mark), replacing a monoline set that was
   the only illustration surface on the site outside the iso system. Each mark
   quotes the motif of the /services catalog scene it morphs into via the
   view-transition on the row link: the dark agent cube, the page-on-the-ground
   slab, the deep app block. */

const CUBE_TOP = "18,5 29,11.5 18,18 7,11.5";
const CUBE_LEFT = "7,11.5 18,18 18,30 7,23.5";
const CUBE_RIGHT = "29,11.5 18,18 18,30 29,23.5";
const RIGHT_FACE = "matrix(0.866,-0.5,0,1,18,18)";

/* Square art laid on a top face: u runs right-and-down, v left-and-down from
   the face's top corner, matching the shared isoKit GROUND plane. */
const groundAt = (x: number, y: number) => `matrix(0.866,0.5,-0.866,0.5,${x},${y})`;

/* The catalog's dark terminal, at cube scale: the one dark mass in the set,
   with an output tile landing on the floor and a spark over the shoulder. */
function AiWorkflowMark() {
  return (
    <>
      <polygon points={CUBE_TOP} fill="var(--color-primary-700)" />
      <polygon points={CUBE_LEFT} fill="var(--color-primary-800)" />
      <polygon points={CUBE_RIGHT} fill="var(--color-primary-900)" />
      <g transform={RIGHT_FACE}>
        <rect x="1.5" y="2.5" width="5" height="1.7" rx="0.85" fill="var(--color-primary-400)" />
        <rect x="1.5" y="5.5" width="7" height="1.7" rx="0.85" fill="var(--color-primary-200)" />
      </g>
      <polygon points="27,26.5 33,30 27,33.5 21,30" fill="var(--color-primary-200)" />
      <path
        d="M30 2.5c.3 1.55.95 2.2 2.5 2.5-1.55.3-2.2.95-2.5 2.5-.3-1.55-.95-2.2-2.5-2.5 1.55-.3 2.2-.95 2.5-2.5z"
        fill="var(--color-accent-500)"
        className={styles.twinkle}
      />
    </>
  );
}

/* The page as a ground slab: header band, hero band, an uptick resolving in
   the amber point, one text row. A flat floor is the only shape that fills an
   iso frame, and it is also what separates this mark from the app block. */
function WebsiteMark() {
  return (
    <>
      <polygon points="18,3.5 33.6,12.5 18,21.5 2.4,12.5" fill="var(--color-surface)" />
      <polygon points="33.6,12.5 18,21.5 18,24.5 33.6,15.5" fill="var(--color-primary-500)" />
      <polygon points="18,21.5 2.4,12.5 2.4,15.5 18,24.5" fill="var(--color-primary-400)" />
      <g transform={groundAt(18, 3.5)}>
        {/* The browser band is the page's one dark mass. All-mint content on a
            white face dissolved on the brand-weak band, the same failure the
            squint pass caught on the old catalog scenes. */}
        <rect x="1" y="1" width="16" height="2.6" rx="0.5" fill="var(--color-primary-700)" />
        <rect x="1" y="4.6" width="16" height="4.6" rx="0.5" fill="var(--color-primary-200)" />
        <path
          d="M2.5 13.5l3.5-2 2.5 1.2 4-3.2"
          fill="none"
          stroke="var(--color-primary-600)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="13.6" cy="9.4" r="1.1" fill="var(--color-accent-500)" />
        <rect x="1" y="15.4" width="10" height="1.3" rx="0.4" fill="var(--color-primary-200)" />
      </g>
    </>
  );
}

/* The catalog's deep app board raised into a block: sidebar rail, two record
   rows, and the amber row that marks the workflow being worked. */
function WebAppMark() {
  return (
    <>
      <polygon points="18,5 31.9,13 18,21 4.1,13" fill="var(--color-primary-100)" />
      <polygon points="31.9,13 18,21 18,28 31.9,20" fill="var(--color-primary-700)" />
      <polygon points="18,21 4.1,13 4.1,20 18,28" fill="var(--color-primary-600)" />
      <g transform={groundAt(18, 5)}>
        <rect x="1" y="1" width="3.2" height="14" rx="0.6" fill="var(--color-primary-500)" />
        <rect x="5.5" y="1.5" width="9.5" height="3" rx="0.6" fill="var(--color-surface)" />
        <rect x="5.5" y="6" width="9.5" height="3" rx="0.6" fill="var(--color-surface)" />
        <rect x="5.5" y="10.5" width="6" height="3" rx="0.6" fill="var(--color-accent-500)" />
      </g>
    </>
  );
}

const markByServiceKey: Record<ServiceKey, () => React.ReactElement> = {
  aiTools: AiWorkflowMark,
  websites: WebsiteMark,
  webApps: WebAppMark,
};

type ServiceGlyphProps = Readonly<{
  serviceKey: ServiceKey;
  className?: string;
}>;

export function ServiceGlyph({ serviceKey, className }: ServiceGlyphProps) {
  const Mark = markByServiceKey[serviceKey];

  return (
    <svg viewBox="0 0 36 36" className={className ?? styles.svg} aria-hidden="true" focusable="false">
      <Mark />
    </svg>
  );
}
