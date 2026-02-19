import { PageShell } from "@/features/shared/layout/PageShell";
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
    <PageShell mainClassName={styles.main}>
      <ContactHeroSection />
      <ContactOptionsSection calcomUrl={calcomUrl} />
      <section className={styles.section}>
        <div className={styles.ambientBackdrop} aria-hidden="true" />
        <div className={styles.sectionContent}>
          <ContactFormSection formspreeFormId={formspreeFormId} />
        </div>
      </section>
      <ContactLocationSection />
    </PageShell>
  );
}
