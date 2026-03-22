import { homeCopy } from "@/copy/home";
import { profileComputed } from "@/copy/profile";
import { ActionLink, CalendarIcon, MailIcon } from "@/features/shared/designSystem";
import * as styles from "./styles";

export function HomeContactCtaSection() {
  return (
    <section
      id="contact"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {homeCopy.contactCta.heading}
        </h2>
        <p className={styles.description}>
          {homeCopy.contactCta.description}
        </p>
        <div className={styles.row}>
          <ActionLink
            href={profileComputed.mailto}
            variant="surface"
            size="md"
            className={styles.link}
            icon={<MailIcon className={styles.icon} />}
            iconPosition="start"
          >
            {homeCopy.contactCta.ctaPrimary}
          </ActionLink>
          <ActionLink
            href="/contact"
            variant="brand"
            size="md"
            className={styles.ctaLink}
            icon={<CalendarIcon className={styles.icon} />}
            iconPosition="start"
          >
            {homeCopy.contactCta.ctaSecondary}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
