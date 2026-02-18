"use client";

import SiteFooter from "@/features/shared/layout/SiteFooter";
import SiteHeader from "@/features/shared/layout/SiteHeader";
import { ContactFormSection } from "@/features/contact/form/ContactFormSection";
import { ContactHeroSection } from "@/features/contact/sections/ContactHeroSection";
import { ContactLocationSection } from "@/features/contact/sections/ContactLocationSection";
import { ContactOptionsSection } from "@/features/contact/sections/ContactOptionsSection";
import * as styles from "./styles";

type ContactPageClientProps = {
  formspreeFormId: string | null;
  calcomUrl: string | null;
};

export default function ContactPageClient({
  formspreeFormId,
  calcomUrl,
}: ContactPageClientProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <ContactHeroSection />
        <ContactOptionsSection calcomUrl={calcomUrl} />
        <section className={styles.section}>
          <ContactFormSection formspreeFormId={formspreeFormId} />
        </section>
        <ContactLocationSection />
      </main>
      <SiteFooter />
    </>
  );
}
