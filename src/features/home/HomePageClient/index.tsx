import { PageShell } from "@/features/shared/layout/PageShell";
import { HomeContactCtaSection } from "@/features/home/sections/HomeContactCtaSection";
import { HomeDeferredInteractiveSections } from "@/features/home/sections/HomeDeferredInteractiveSections";
import { HomeHeroSection } from "@/features/home/sections/HomeHeroSection";
import { HomeServicesPreviewSection } from "@/features/home/sections/HomeServicesPreviewSection";
import { HomeTestimonialsSection } from "@/features/home/sections/HomeTestimonialsSection";
import * as styles from "./styles";

export default function HomePageClient() {
  return (
    <PageShell mainClassName={styles.main}>
      <HomeHeroSection />
      <HomeDeferredInteractiveSections />
      <HomeServicesPreviewSection />
      <HomeTestimonialsSection />
      <HomeContactCtaSection />
    </PageShell>
  );
}
