import { photoGamesCaseStudy } from "./photoGames";
import { politicalRecordCaseStudy } from "./politicalRecord";
import type { CaseStudy } from "./types";
import { wingNightCaseStudy } from "./wingNight";

export type * from "./types";

/* Order is the order the homepage lists them and the order "Next case study"
   walks through. */
export const caseStudies = [
  wingNightCaseStudy,
  politicalRecordCaseStudy,
  photoGamesCaseStudy,
] as const satisfies readonly CaseStudy[];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug);

export const getNextCaseStudy = (slug: string): CaseStudy => {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
};

export const caseStudyPageCopy = {
  heroEyebrow: "Case study",
  backLabel: "All work",
  backHref: "/#work",
  coverLabel: "Screenshot",
  problemEyebrow: "The problem",
  constraintsLabel: "Constraints",
  architectureEyebrow: "Architecture",
  decisionsEyebrow: "Hard decisions",
  choiceLabel: "What I chose",
  tradeoffLabel: "What it cost",
  verificationEyebrow: "How it was verified",
  galleryEyebrow: "Screens",
  galleryHeading: "What it looks like",
  galleryDescription: "Captured from the running app for this page.",
  outcomeEyebrow: "Where it stands",
  nextLabel: "Next case study",
  externalLinkHint: "(opens in a new tab)",
} as const;
