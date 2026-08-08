/* The character's colours are shared with the nav mark, which renders the same
   front face and shirt at a sixth the size, so they live in bradArtwork rather
   than here. Re-exported under the name the figure and its head already use. */
export { bradPalette as palette } from "@/features/shared/character/bradArtwork";

/* Sleeve length on a 38-unit limb; the rest of the arm is skin. */
export const SLEEVE = 13;
