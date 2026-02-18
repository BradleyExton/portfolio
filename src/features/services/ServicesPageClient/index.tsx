"use client";

import SiteFooter from "@/features/shared/layout/SiteFooter";
import SiteHeader from "@/features/shared/layout/SiteHeader";
import { ServicesCatalogSection } from "@/features/services/sections/ServicesCatalogSection";
import { ServicesCtaSection } from "@/features/services/sections/ServicesCtaSection";
import { ServicesFaqSection } from "@/features/services/sections/ServicesFaqSection";
import { ServicesHeroSection } from "@/features/services/sections/ServicesHeroSection";
import { ServicesProcessSection } from "@/features/services/sections/ServicesProcessSection";
import * as styles from "./styles";

export default function ServicesPageClient() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={styles.main}>
        <ServicesHeroSection />
        <ServicesCatalogSection />
        <ServicesProcessSection />
        <ServicesFaqSection />
        <ServicesCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
