import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { bradFrontFace, bradPalette } from "./bradArtwork";
import {
  BRAD_ICON_SIZE,
  BRAD_TILE_RADIUS,
  renderBradTileSvg,
} from "./bradTileSvg";

const ICON_PATH = join(process.cwd(), "src", "app", "icon.svg");

/* The icon set is committed rather than built, so nothing stops the artwork
   moving underneath it. That is the exact failure the character module exists
   to prevent: a mark that quietly becomes a second, slightly different drawing
   of the same man. This fails the moment they diverge, and the fix is one
   command. The rasters are rendered from this same string, so guarding it
   guards favicon.ico and apple-icon.png with it. */
describe("the committed icon.svg", () => {
  it("still matches the artwork it was generated from", () => {
    const committed = readFileSync(ICON_PATH, "utf8");
    const current = renderBradTileSvg({
      size: BRAD_ICON_SIZE,
      radius: BRAD_TILE_RADIUS,
    });

    expect(committed.trim()).toBe(current);
  });

  it("carries the artwork's own paths rather than a copy of them", () => {
    const committed = readFileSync(ICON_PATH, "utf8");

    expect(committed).toContain(bradFrontFace.skull);
    expect(committed).toContain(bradFrontFace.hair);
    expect(committed).toContain(bradPalette.shirt);
  });
});
