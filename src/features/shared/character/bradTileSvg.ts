/* Bradley as a favicon: the same paths as the nav mark, on a filled tile.

   The tile is not decoration, it is what makes the mark survive. Rasterised at
   a true 16px, the nav mark is a pale bust with no outer boundary — against a
   light tab strip it reads as a smudge rather than a face, because at that size
   the only thing the eye resolves is silhouette and there isn't one. Filling
   the square gives it a hard edge and hands the identifying job to the brand
   colour, which is what actually distinguishes a tab at a glance.

   Emerald specifically, over the dark neutrals: a dark tile disappears into a
   dark browser chrome, so it only reads in one theme. The shirt colour reads in
   both, and it is already the mark's own accent.

   Serialised to a string rather than drawn in JSX because the consumers are a
   build script and a static file, not React. It shares bradArtwork with
   BradMark, so there is still one drawing — the whole point of that module.

   Relative and extension-bearing, against the repo's `@/` convention:
   scripts/generate-icons imports this straight through Node's type stripping,
   which resolves like plain ESM, so there is no alias to expand and no
   extension to infer. */
import { bradFrontFace, bradPalette, bradTorso } from "./bradArtwork.ts";

/* Roughly the squircle ratio Apple and Android both settle on, in the 64-unit
   box below. Square corners read as a cropped screenshot rather than an icon.
   Lives here rather than in the generator so the drift test and the generator
   cannot disagree about what the committed icon.svg should contain. */
export const BRAD_TILE_RADIUS = 14;

/* The committed icon.svg is authored at its own box size: it is the scalable
   entry, so this only fixes the width/height attributes browsers fall back to
   when nothing else sizes it. */
export const BRAD_ICON_SIZE = 64;

export type BradTileOptions = {
  /** Edge of the square, in pixels. */
  size: number;
  /** Corner radius in the 64-unit box. 0 is full bleed, which is what Apple
      touch icons want since iOS applies its own mask over the top. */
  radius: number;
};

/* The tile's own coordinate space. The artwork is authored around x=0 with the
   crown at y=2, so it gets centred and scaled into this box rather than
   redrawn to fit it. */
const BOX = 64;

/* Sized off the head rather than the whole bust: the head is 52 units tall and
   lands at 44 of the 64, which leaves the shoulders to run off the bottom edge.
   A bust that resolves inside the tile has to be small enough that the face
   stops reading; letting it crop is what keeps the head big. */
const SCALE = 44 / 52;
const CROWN_Y = 2;
const TOP_MARGIN = 6;

const FIT = `translate(${BOX / 2} ${TOP_MARGIN - CROWN_Y * SCALE}) scale(${SCALE})`;

const attrs = (record: Record<string, number>): string =>
  Object.entries(record)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

/* Paint order matches BradMark: shirt, then head over it, then features. */
const shirt = [
  `<path d="${bradTorso.body}" fill="${bradPalette.shirt}"/>`,
  `<path d="${bradTorso.shade}" fill="${bradPalette.shirtShade}"/>`,
  `<path d="${bradTorso.lapelLeft}" fill="${bradPalette.trim}"/>`,
  `<path d="${bradTorso.lapelRight}" fill="${bradPalette.trim}"/>`,
  `<rect ${attrs(bradTorso.placket)} fill="${bradPalette.trim}" opacity="0.7"/>`,
  ...bradTorso.buttonYs.map(
    (y) => `<circle cx="0" cy="${y}" r="1.4" fill="${bradPalette.shirtShade}"/>`,
  ),
].join("");

/* The stubble is dropped here for the same reason BradMark drops it: a wash
   that reads as intended across a full-height figure reads as a dirty chin
   once the head is 44 pixels tall, let alone 11. */
const head = [
  `<rect ${attrs(bradFrontFace.neck)} fill="${bradPalette.skinShade}"/>`,
  `<path d="${bradFrontFace.skull}" fill="${bradPalette.skin}"/>`,
  `<circle ${attrs(bradFrontFace.earLeft)} fill="${bradPalette.skin}"/>`,
  `<circle ${attrs(bradFrontFace.earRight)} fill="${bradPalette.skinShade}"/>`,
  `<path d="${bradFrontFace.hair}" fill="${bradPalette.hair}"/>`,
  `<path d="${bradFrontFace.sideburnLeft}" fill="${bradPalette.hair}"/>`,
  `<path d="${bradFrontFace.sideburnRight}" fill="${bradPalette.hair}"/>`,
  `<circle ${attrs(bradFrontFace.eyeLeft)} fill="${bradPalette.eye}"/>`,
  `<circle ${attrs(bradFrontFace.eyeRight)} fill="${bradPalette.eye}"/>`,
  `<path d="${bradFrontFace.brows}" stroke="${bradPalette.brow}" stroke-width="2" stroke-linecap="round" fill="none"/>`,
  `<path d="${bradFrontFace.nose}" stroke="${bradPalette.nose}" stroke-width="2" stroke-linecap="round" fill="none"/>`,
  `<path d="${bradFrontFace.mouth}" stroke="${bradPalette.mouth}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`,
].join("");

export function renderBradTileSvg({ size, radius }: BradTileOptions): string {
  const tile = `<rect width="${BOX}" height="${BOX}" rx="${radius}" fill="${bradPalette.shirt}"/>`;

  /* The shoulders are drawn past the bottom edge on purpose, so they have to be
     clipped rather than left to overflow: an SVG rasterised on its own honours
     the viewBox, but the same markup inlined in a page would spill. */
  const clip =
    radius > 0
      ? `<clipPath id="tile"><rect width="${BOX}" height="${BOX}" rx="${radius}"/></clipPath>`
      : `<clipPath id="tile"><rect width="${BOX}" height="${BOX}"/></clipPath>`;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${BOX} ${BOX}">`,
    clip,
    tile,
    `<g clip-path="url(#tile)"><g transform="${FIT}">${shirt}${head}</g></g>`,
    `</svg>`,
  ].join("");
}
