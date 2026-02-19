import { PageShell } from "@/features/shared/layout/PageShell";
import { ServicesCatalogSection } from "@/features/services/sections/ServicesCatalogSection";
import { ServicesCtaSection } from "@/features/services/sections/ServicesCtaSection";
import { ServicesFaqSection } from "@/features/services/sections/ServicesFaqSection";
import { ServicesHeroSection } from "@/features/services/sections/ServicesHeroSection";
import { ServicesProcessSection } from "@/features/services/sections/ServicesProcessSection";
import * as styles from "./styles";

export default function ServicesPageClient() {
  return (
    <PageShell mainClassName={styles.main}>
      <ServicesHeroSection />
      <ServicesCatalogSection />
      <ServicesProcessSection />
      <ServicesFaqSection />
      <ServicesCtaSection />
    </PageShell>
  );
}
