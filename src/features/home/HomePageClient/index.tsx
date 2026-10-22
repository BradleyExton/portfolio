import { PageShell } from "@/features/shared/layout/PageShell";
import { HomeAboutSnapshotSection } from "@/features/home/sections/HomeAboutSnapshotSection";
import { HomeContactCtaSection } from "@/features/home/sections/HomeContactCtaSection";
import { HomeDeferredInteractiveSections } from "@/features/home/sections/HomeDeferredInteractiveSections";
import { HomeHeroSection } from "@/features/home/sections/HomeHeroSection";
import { HomeSelectedWorkSection } from "@/features/home/sections/HomeSelectedWorkSection";
import { HomeServicesPreviewSection } from "@/features/home/sections/HomeServicesPreviewSection";
import * as styles from "./styles";

export default function HomePageClient() {
  return (
    <PageShell mainClassName={styles.main}>
      <HomeHeroSection />
      <HomeAboutSnapshotSection />
      <HomeDeferredInteractiveSections />
      <HomeSelectedWorkSection />
      <HomeServicesPreviewSection />
      <HomeContactCtaSection />
    </PageShell>
  );
}
