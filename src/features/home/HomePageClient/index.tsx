import { PageShell } from "@/features/shared/layout/PageShell";
import { HomeAboutSnapshotSection } from "@/features/home/sections/HomeAboutSnapshotSection";
import { HomeContactCtaSection } from "@/features/home/sections/HomeContactCtaSection";
import { HomeExperienceSection } from "@/features/home/sections/HomeExperienceSection";
import { HomeHeroSection } from "@/features/home/sections/HomeHeroSection";
import { HomeServicesPreviewSection } from "@/features/home/sections/HomeServicesPreviewSection";
import * as styles from "./styles";

export default function HomePageClient() {
  return (
    <PageShell mainClassName={styles.main}>
      <HomeHeroSection />
      <HomeAboutSnapshotSection />
      <HomeExperienceSection />
      <HomeServicesPreviewSection />
      <HomeContactCtaSection />
    </PageShell>
  );
}
