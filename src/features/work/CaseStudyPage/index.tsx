import type { CaseStudy } from "@/copy/caseStudies";
import { getNextCaseStudy } from "@/copy/caseStudies";
import { PageShell } from "@/features/shared/layout/PageShell";
import { CaseStudyArchitectureSection } from "@/features/work/sections/CaseStudyArchitectureSection";
import { CaseStudyDecisionsSection } from "@/features/work/sections/CaseStudyDecisionsSection";
import { CaseStudyGallerySection } from "@/features/work/sections/CaseStudyGallerySection";
import { CaseStudyHeroSection } from "@/features/work/sections/CaseStudyHeroSection";
import { CaseStudyOutcomeSection } from "@/features/work/sections/CaseStudyOutcomeSection";
import { CaseStudyProblemSection } from "@/features/work/sections/CaseStudyProblemSection";
import { CaseStudyVerificationSection } from "@/features/work/sections/CaseStudyVerificationSection";
import * as styles from "./styles";

type CaseStudyPageProps = {
  study: CaseStudy;
};

/* One template for every study. Sections read only their slice of the study
   so a new project is a new copy module, not a new layout. */
export default function CaseStudyPage({ study }: CaseStudyPageProps) {
  return (
    <PageShell mainClassName={styles.main}>
      <CaseStudyHeroSection study={study} />
      <CaseStudyProblemSection problem={study.problem} />
      <CaseStudyArchitectureSection architecture={study.architecture} />
      <CaseStudyDecisionsSection decisions={study.decisions} />
      <CaseStudyVerificationSection verification={study.verification} />
      <CaseStudyGallerySection shots={study.gallery} />
      <CaseStudyOutcomeSection
        outcome={study.outcome}
        links={study.links}
        next={getNextCaseStudy(study.slug)}
      />
    </PageShell>
  );
}
