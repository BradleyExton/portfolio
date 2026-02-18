const revealDelayClassMap: Record<number, string> = {
  0: "motion-safe:delay-0",
  70: "motion-safe:[transition-delay:70ms]",
  80: "motion-safe:[transition-delay:80ms]",
  90: "motion-safe:[transition-delay:90ms]",
  100: "motion-safe:delay-100",
  120: "motion-safe:[transition-delay:120ms]",
  180: "motion-safe:[transition-delay:180ms]",
  220: "motion-safe:[transition-delay:220ms]",
  320: "motion-safe:[transition-delay:320ms]",
};

export const getRevealDelayClass = (delayMs: number): string => {
  return revealDelayClassMap[delayMs] ?? revealDelayClassMap[0];
};

export const joinClassNames = (...classes: Array<string | undefined>): string => {
  return classes.filter(Boolean).join(" ");
};
