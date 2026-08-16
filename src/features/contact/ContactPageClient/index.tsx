import { PageShell } from "@/features/shared/layout/PageShell";
import { ContactFormSection } from "@/features/contact/form/ContactFormSection";
import { ContactHeroSection } from "@/features/contact/sections/ContactHeroSection";
import { ContactLocationSection } from "@/features/contact/sections/ContactLocationSection";
import { ContactOptionsSection } from "@/features/contact/sections/ContactOptionsSection";
import * as styles from "./styles";

type ContactPageClientProps = {
  isContactFormEnabled: boolean;
  calcomUrl: string | null;
};

export default function ContactPageClient({
  isContactFormEnabled,
  calcomUrl,
}: ContactPageClientProps) {
  return (
    <PageShell mainClassName={styles.main}>
      <ContactHeroSection />
      <ContactOptionsSection calcomUrl={calcomUrl} />
      <section className={styles.section}>
        <div className={styles.ambientBackdrop} aria-hidden="true" />
        <div className={styles.sectionContent}>
          <ContactFormSection isEnabled={isContactFormEnabled} />
        </div>
      </section>
      <ContactLocationSection />
    </PageShell>
  );
}
