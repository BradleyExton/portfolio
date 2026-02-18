"use client";

import { useEffect, useState } from "react";
import SiteFooter from "@/features/shared/layout/SiteFooter";
import SiteHeader from "@/features/shared/layout/SiteHeader";
import { HomeAboutSnapshotSection } from "@/features/home/sections/HomeAboutSnapshotSection";
import { HomeContactCtaSection } from "@/features/home/sections/HomeContactCtaSection";
import { HomeExperienceSection } from "@/features/home/sections/HomeExperienceSection";
import { HomeHeroSection } from "@/features/home/sections/HomeHeroSection";
import { HomeServicesPreviewSection } from "@/features/home/sections/HomeServicesPreviewSection";
import { HomeTestimonialsSection } from "@/features/home/sections/HomeTestimonialsSection";
import * as styles from "./styles";
import type { RevealState } from "./types";
import { startRevealAnimation } from "./utils";

export default function HomePageClient() {
  const [isVisible, setIsVisible] = useState<RevealState>(false);

  useEffect(() => {
    return startRevealAnimation(() => setIsVisible(true));
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <HomeHeroSection isVisible={isVisible} />
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
