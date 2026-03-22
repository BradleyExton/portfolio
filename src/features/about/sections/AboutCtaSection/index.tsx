import { aboutCopy } from "@/copy/about";
import { profile, profileComputed } from "@/copy/profile";
import {
  ActionLink,
  CalendarIcon,
  LinkedInIcon,
  MailIcon,
  SectionIntro,
} from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutCtaSection() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.container}>
          <SectionIntro
            title={aboutCopy.cta.heading}
            description={aboutCopy.cta.description}
            align="center"
            tone="inverse"
            titleClassName={styles.heading}
            descriptionClassName={styles.description}
          />
          <div className={styles.row}>
            <ActionLink
              href={profileComputed.mailto}
              variant="surface"
              size="md"
              className={styles.primaryLink}
              icon={<MailIcon className={styles.icon} />}
              iconPosition="start"
            >
              {aboutCopy.cta.emailLabel}
            </ActionLink>
            <ActionLink
              href="/contact"
              variant="brand"
              size="md"
              className={styles.secondaryLink}
              icon={<CalendarIcon className={styles.icon} />}
              iconPosition="start"
            >
              {aboutCopy.cta.bookCallLabel}
            </ActionLink>
            <ActionLink
              href={profile.links.linkedin}
              variant="outline"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tertiaryLink}
              icon={<LinkedInIcon className={styles.icon} />}
              iconPosition="start"
            >
              {aboutCopy.cta.linkedinLabel}
            </ActionLink>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
