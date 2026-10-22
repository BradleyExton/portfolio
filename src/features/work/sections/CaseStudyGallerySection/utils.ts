import type { CaseStudyShot } from "@/copy/caseStudies";

/* Desktop captures go in a two-up grid and phone captures in their own row,
   because a 390px-wide phone shot next to a 1440px window is either a tiny
   phone or a huge one. With an odd count of desktop shots the first one takes
   the full row, so the grid never ends on an orphan. */
export const splitShots = (shots: readonly CaseStudyShot[]) => {
  const screens = shots.filter((shot) => shot.kind === "screen");
  const phones = shots.filter((shot) => shot.kind === "phone");
  return { screens, phones, leadSpansRow: screens.length % 2 === 1 };
};
