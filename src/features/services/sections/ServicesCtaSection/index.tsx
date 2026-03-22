import { servicesCopy } from "@/copy/services";
import { ActionLink, CalendarIcon, SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesCtaSection() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.container}>
          <SectionIntro
            title={servicesCopy.cta.heading}
            description={servicesCopy.cta.description}
            align="center"
            tone="inverse"
            titleClassName={styles.heading}
            descriptionClassName={styles.description}
          />
          <ActionLink
            href="/contact"
            variant="surface"
            size="md"
            className={styles.link}
            icon={<CalendarIcon className={styles.icon} />}
            iconPosition="start"
          >
            {servicesCopy.cta.buttonLabel}
          </ActionLink>
        </div>
      </ScrollReveal>
    </section>
  );
}
