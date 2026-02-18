import type { OpenFaqIndex } from "./types";

export const toggleFaq = (
  currentFaq: OpenFaqIndex,
  nextIndex: number,
): OpenFaqIndex => (currentFaq === nextIndex ? null : nextIndex);
