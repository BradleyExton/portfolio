/* Shared geometry for the three what-i-do card scenes. The how-i-work scenes
   next door hardcode every polygon, which is workable for drawings that never
   move but makes them expensive to lay out and easy to drift apart; these three
   project through one true-isometric basis instead (30 degrees, so the axis
   ratio is sqrt(3), matching every other iso drawing on the site).

   Ground coordinates are (u, v) with height h rising off the floor. +u goes
   right-and-down the screen, +v goes left-and-down, so the viewer sits out past
   the +u/+v corner and the two faces they can see are the +u and +v ones.

   Two consequences of the projection set most of the numbers in these scenes:
   a box's screen width is sqrt(3) times its footprint, so nodes crowd sooner
   than they look like they should; and a shape's top corner climbs by half its
   footprint on top of its own height, so tall objects leave the frame early. */

import * as styles from "./styles";

/* The kit draws no chrome of its own; the re-export is what satisfies the
   component-contract guardrail for a folder whose index exports helpers. */
export const svg = styles.svg;

export const ISO_X = 0.8660254;
export const ISO_Y = 0.5;

/** One ground point as an SVG "x,y" pair. */
export const project = (u: number, v: number, h = 0) =>
  `${((u - v) * ISO_X).toFixed(2)},${((u + v) * ISO_Y - h).toFixed(2)}`;

/** A closed ring of ground points, ready for a <polygon points> attribute. */
export const ring = (points: readonly (readonly [number, number, number?])[]) =>
  points.map(([u, v, h]) => project(u, v, h ?? 0)).join(" ");

/** Screen-space translate for a ground position, for hanging flat art off. */
export const at = (u: number, v: number, h = 0) => `translate(${project(u, v, h).replace(",", ",")})`;

export type Shade = {
  top: string;
  /** The +u face: the one on the screen's right. */
  right: string;
  /** The +v face: the one on the screen's left. */
  left: string;
};

/* Four value steps of the brand green plus the neutral and amber families the
   shipped scenes already use. The shipped illustrations top out at #047857 on a
   near-white field, which is why they read as one flat value; `deep` and `ink`
   exist so a prototype can put a genuine dark mass on the page. */
export const shades = {
  ink: { top: "#065f46", right: "#04382c", left: "#032b22" },
  deep: { top: "#047857", right: "#03614a", left: "#024a3a" },
  brand: { top: "#10b981", right: "#059669", left: "#047857" },
  mint: { top: "#6ee7b7", right: "#34d399", left: "#10b981" },
  pale: { top: "#d1fae5", right: "#a7f3d0", left: "#6ee7b7" },
  paper: { top: "#ffffff", right: "#e0eae5", left: "#c9d8d0" },
  amber: { top: "#fbbf24", right: "#f59e0b", left: "#d97706" },
  /* The floor the delivery and front-end scenes stand on. It used to be #ffffff
     and #f8faf9, which only held together because the illustration sat in a
     tinted panel; on the bare card surface those tops were the card. Toning the
     board one step down also buys back the contrast the white artifacts on it
     were missing: tickets and the suite card now read as objects placed on a
     surface rather than holes cut in it. */
  board: { top: "#f1f6f3", right: "#dde8e2", left: "#c6d6ce" },
} as const satisfies Record<string, Shade>;

export type IsoBoxProps = {
  /** Footprint centre. */
  u: number;
  v: number;
  /** Footprint size along each ground axis. */
  w: number;
  d: number;
  /** Extrusion. A box of height 0 is a bare floor tile with no sides. */
  h: number;
  /** Floor the box sits on, so a floating block keeps its own shadow below it. */
  base?: number;
  shade: Shade;
  /* A near-white top face on a near-white card disappears, and what is left
     reads as a floating chevron rather than a box. Anything in the paper family
     needs its silhouette drawn. */
  outline?: string;
  children?: React.ReactNode;
};

/** A rectangular prism: top face plus the two faces the viewer can see. */
export function IsoBox({ u, v, w, d, h, base = 0, shade, outline, children }: IsoBoxProps) {
  const uMin = u - w / 2;
  const uMax = u + w / 2;
  const vMin = v - d / 2;
  const vMax = v + d / 2;
  const top = base + h;

  const edge = outline ? { stroke: outline, strokeWidth: 1.6, strokeLinejoin: "round" as const } : null;

  return (
    <g>
      <polygon
        points={ring([
          [uMin, vMin, top],
          [uMax, vMin, top],
          [uMax, vMax, top],
          [uMin, vMax, top],
        ])}
        fill={shade.top}
        {...edge}
      />
      {h > 0 ? (
        <>
          <polygon
            points={ring([
              [uMax, vMin, top],
              [uMax, vMax, top],
              [uMax, vMax, base],
              [uMax, vMin, base],
            ])}
            fill={shade.right}
            {...edge}
          />
          <polygon
            points={ring([
              [uMin, vMax, top],
              [uMax, vMax, top],
              [uMax, vMax, base],
              [uMin, vMax, base],
            ])}
            fill={shade.left}
            {...edge}
          />
        </>
      ) : null}
      {children ? <g transform={`translate(${project(u, v, top)})`}>{children}</g> : null}
    </g>
  );
}

/** Outline tone for the paper family, dark enough to survive on card surface. */
export const PAPER_EDGE = "#b9cec5";

/** Silhouette for the board, which has to hold its own against a white card. */
export const BOARD_EDGE = "#c3d5cc";

/** Contact shadow for a box footprint: cheap grounding without a full slab. */
export function IsoShadow({ u, v, w, d, opacity = 0.13 }: { u: number; v: number; w: number; d: number; opacity?: number }) {
  return (
    <polygon
      points={ring([
        [u - w / 2, v - d / 2],
        [u + w / 2, v - d / 2],
        [u + w / 2, v + d / 2],
        [u - w / 2, v + d / 2],
      ])}
      fill="#0f766e"
      opacity={opacity}
    />
  );
}

/* Art drawn square then raked into one of the scene's three planes, the way the
   shipped spec board does it. Text rows, screens and panel faces go through
   these so they sit in the scene instead of floating parallel to the page.

   GROUND is the one that matters for these prototypes. A standing board cannot
   fill a 16:9 frame in isometric — its screen height grows by half its width as
   it recedes, so anything wide enough runs off the top. A flat surface is the
   opposite: a square of floor projects to exactly sqrt(3):1, which is within a
   few percent of 16:9. The shipped scenes were right to put a slab in the frame
   and wrong to leave it empty. */
export const PLANE_LEFT = `matrix(${ISO_X},${ISO_Y},0,1,0,0)`;
export const PLANE_RIGHT = `matrix(${ISO_X},${-ISO_Y},0,1,0,0)`;
export const GROUND = `matrix(${ISO_X},${ISO_Y},${-ISO_X},${ISO_Y},0,0)`;

/** Square art laid on the floor at height h, centred on (u, v). */
export function OnGround({ u, v, h = 0, children }: { u: number; v: number; h?: number; children: React.ReactNode }) {
  return <g transform={`translate(${project(u, v, h)}) ${GROUND}`}>{children}</g>;
}
