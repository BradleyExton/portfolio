// Sized to sit inside the 48px logo plate with even optical padding. The wide
// wordmark is matched on width instead of height so it reads at the same
// visual weight as the square marks rather than towering over them.
export const mark = "h-7 w-7 shrink-0";
export const markWide = "h-auto w-9 shrink-0";

// Every one of these logos was originally two distinct colors, so the marks
// stay two-tone on the brand pair: emerald ink, amber for the secondary shape.
// A single-hue duotone loses the second element entirely at 40px.
export const inkFill = "fill-brand-strong";
export const accentFill = "fill-accent-strong";
export const inkStroke = "stroke-brand-strong";
export const accentStroke = "stroke-accent-strong";

// The current card is deep emerald, so the ink inverts to a light tint and the
// amber lifts to the same shade the role line already uses there.
export const inkFillInverse = "fill-brand-tint";
export const accentFillInverse = "fill-accent-soft";
export const inkStrokeInverse = "stroke-brand-tint";
export const accentStrokeInverse = "stroke-accent-soft";
