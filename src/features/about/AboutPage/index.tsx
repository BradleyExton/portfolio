import { PageShell } from "@/features/shared/layout/PageShell";
import { AboutBeliefsSection } from "@/features/about/sections/AboutBeliefsSection";
import { AboutCtaSection } from "@/features/about/sections/AboutCtaSection";
import { AboutHeroSection } from "@/features/about/sections/AboutHeroSection";
import { AboutOutsideSection } from "@/features/about/sections/AboutOutsideSection";
import { AboutStorySection } from "@/features/about/sections/AboutStorySection";
import { AboutTechStackSection } from "@/features/about/sections/AboutTechStackSection";
import * as styles from "./styles";

export default function AboutPage() {
  return (
    <PageShell mainClassName={styles.main}>
      <AboutHeroSection />
      <AboutStorySection />
      <AboutBeliefsSection />
      <AboutTechStackSection />
      <AboutOutsideSection />
      <AboutCtaSection />
    </PageShell>
  );
}
