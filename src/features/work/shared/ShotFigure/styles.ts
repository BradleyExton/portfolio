export const screenFigure = "flex flex-col gap-3";
export const phoneFigure = "mx-auto flex w-full max-w-60 flex-col gap-3";

export const screenFrame = "overflow-hidden rounded-xl border border-border-default bg-surface shadow-sm";
// A thin browser bar so a desktop capture reads as a window, not a flat
// illustration. Neutral dots only: traffic-light colors would be the loudest
// thing on the page.
export const screenBar = "flex h-7 items-center gap-1.5 border-b border-border-default bg-surface-muted px-3";
export const screenDot = "h-2 w-2 rounded-full bg-border-default";
export const screenImage = "block h-auto w-full";

// Handset bezel in the darkest neutral. Inner radius sits one padding step
// inside the outer so the corners stay concentric.
export const phoneFrame = "overflow-hidden rounded-[2.25rem] border border-border-strong bg-surface-inverse p-2 shadow-md";
export const phoneImage = "block h-auto w-full rounded-[1.75rem]";

export const caption = "text-sm leading-relaxed text-content-muted";
