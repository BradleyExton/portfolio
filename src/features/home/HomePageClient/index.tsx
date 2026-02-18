"use client";

import SiteFooter from "@/features/shared/layout/SiteFooter";
import SiteHeader from "@/features/shared/layout/SiteHeader";
import { HomeAboutSnapshotSection } from "@/features/home/sections/HomeAboutSnapshotSection";
import { HomeContactCtaSection } from "@/features/home/sections/HomeContactCtaSection";
import { HomeExperienceSection } from "@/features/home/sections/HomeExperienceSection";
import { HomeHeroSection } from "@/features/home/sections/HomeHeroSection";
import { HomeServicesPreviewSection } from "@/features/home/sections/HomeServicesPreviewSection";
import { HomeTestimonialsSection } from "@/features/home/sections/HomeTestimonialsSection";
import * as styles from "./styles";

export default function HomePageClient() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <HomeHeroSection />
        <HomeAboutSnapshotSection />
        <HomeExperienceSection />
        <HomeServicesPreviewSection />
        <HomeTestimonialsSection />
        <HomeContactCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
