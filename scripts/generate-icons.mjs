#!/usr/bin/env node
/**
 * generate-icons — writes the site's icon set from the cartoon Bradley artwork.
 *
 * Produces, all from src/features/shared/character/bradTileSvg.ts:
 *
 *   src/app/icon.svg        rounded tile, what modern browsers actually use
 *   src/app/favicon.ico     16/32/48, for anything that probes /favicon.ico
 *   src/app/apple-icon.png  180, full bleed because iOS applies its own mask
 *
 * The icons are committed rather than generated at build time, so this only
 * needs running when the artwork changes. bradTileSvg.test.ts fails if the
 * committed icon.svg has drifted from the artwork, which is the case that
 * matters: the raster files are rendered from that same string.
 *
 * Run via `npm run icons`. Playwright is the rasteriser because it is already
 * a devDependency for the E2E suite, and pulling in an image library to turn
 * three SVGs into PNGs is not worth the install.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import {
  BRAD_ICON_SIZE,
  BRAD_TILE_RADIUS,
  renderBradTileSvg,
} from "../src/features/shared/character/bradTileSvg.ts";

const APP_DIR = join(process.cwd(), "src", "app");

/* What Windows and older browsers pick between. 48 is the shortcut size; 16
   and 32 are the tab and bookmark sizes. */
const ICO_SIZES = [16, 32, 48];

const APPLE_SIZE = 180;

async function rasterise(page, svg, size) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}</style>${svg}`,
  );
  return page.screenshot({ omitBackground: true });
}

/* ICO is a directory of embedded images. Every target since Vista reads PNG
   entries, so the payloads go in as PNG rather than as BMP with the inverted
   rows and doubled height that the original format wants. */
function encodeIco(images) {
  const HEADER = 6;
  const ENTRY = 16;

  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;

  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY);
    // 256 is stored as 0; nothing here is that big, but the wrap is the spec.
    entry.writeUInt8(size % 256, 0);
    entry.writeUInt8(size % 256, 1);
    entry.writeUInt8(0, 2); // palette size, 0 for truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

const written = [];

const iconSvg = renderBradTileSvg({
  size: BRAD_ICON_SIZE,
  radius: BRAD_TILE_RADIUS,
});
writeFileSync(join(APP_DIR, "icon.svg"), `${iconSvg}\n`);
written.push("icon.svg");

const icoImages = [];
for (const size of ICO_SIZES) {
  const data = await rasterise(
    page,
    renderBradTileSvg({ size, radius: BRAD_TILE_RADIUS }),
    size,
  );
  icoImages.push({ size, data });
}
writeFileSync(join(APP_DIR, "favicon.ico"), encodeIco(icoImages));
written.push(`favicon.ico (${ICO_SIZES.join(", ")})`);

const apple = await rasterise(
  page,
  renderBradTileSvg({ size: APPLE_SIZE, radius: 0 }),
  APPLE_SIZE,
);
writeFileSync(join(APP_DIR, "apple-icon.png"), apple);
written.push(`apple-icon.png (${APPLE_SIZE})`);

await browser.close();

console.log(`wrote ${written.join(", ")}`);
