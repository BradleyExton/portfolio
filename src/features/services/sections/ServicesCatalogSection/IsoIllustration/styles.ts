// The catalog scenes are deliberately still. The card already animates in on
// scroll via ScrollReveal, and the home page owns the moving iso work; a third
// looping surface on a page people scan for pricing is noise, not detail.
export const svg = "h-full w-full";

// Sits in the card's illustration slot. The slot used to be a tinted panel,
// which is most of why the old art measured as a smudge: pale drawings on a
// pale gradient leave nothing for the eye to catch. The scenes now carry their
// own dark mass and sit on the plain card surface.
export const scene =
  "h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]";
