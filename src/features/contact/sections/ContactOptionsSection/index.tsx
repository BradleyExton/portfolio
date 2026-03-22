"use client";

import { contactCopy } from "@/copy/contact";
import { trackContactCtaClick } from "@/features/shared/analytics";
import {
  ActionCard,
  ActionLink,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  LinkedInIcon,
  MailIcon,
  SectionIntro,
} from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import { getContactOptions } from "./getContactOptions";
import * as styles from "./styles";

type ContactOptionsSectionProps = {
  calcomUrl: string | null;
};

export function ContactOptionsSection({ calcomUrl }: ContactOptionsSectionProps) {
  const options = getContactOptions({
    calcomUrl,
    onCallClick: () => {
      trackContactCtaClick({
        ctaType: "call",
        destinationKind: calcomUrl ? "calendar" : "mailto",
      });
    },
    onEmailClick: () => {
      trackContactCtaClick({
        ctaType: "email",
        destinationKind: "mailto",
      });
    },
    onLinkedinClick: () => {
      trackContactCtaClick({
        ctaType: "linkedin",
        destinationKind: "external",
      });
    },
  });

  const getIcon = (kind: (typeof options)[number]["icon"], primary: boolean) => {
    const className = primary ? styles.iconInverse : styles.icon;

    if (kind === "call") {
      return <CalendarIcon className={className} />;
    }

    if (kind === "linkedin") {
      return <LinkedInIcon className={className} />;
    }

    return <MailIcon className={className} />;
  };

  return (
    <section className={styles.section}>
      <div className={styles.ambientBackdrop} aria-hidden="true" />
      <div className={styles.container}>
        <ScrollReveal className={styles.intro}>
          <SectionIntro
            title={contactCopy.options.heading}
            description={contactCopy.options.description}
            titleClassName={styles.heading}
            descriptionClassName={styles.introDescription}
          />
        </ScrollReveal>

        <div className={styles.grid}>
          {options.map((option, index) => (
            <ScrollReveal key={option.key} delayMs={120 + index * 100}>
              <ActionCard
                className={option.variant === "primary" ? styles.primaryCard : styles.card}
                badge={option.badge}
                badgeClassName={styles.priorityBadge}
                icon={getIcon(option.icon, option.variant === "primary")}
                iconClassName={option.variant === "primary" ? styles.primaryRow : styles.row}
                title={option.title}
                description={option.description}
                titleClassName={styles.subheading}
                descriptionClassName={styles.description}
              >
                <ActionLink
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noopener noreferrer" : undefined}
                  variant={option.variant === "primary" ? "brand" : "inline"}
                  size="sm"
                  className={option.variant === "primary" ? styles.primaryLink : styles.link}
                  onClick={option.onClick}
                  icon={
                    option.key === "linkedin" ? (
                      <ArrowUpRightIcon className={styles.linkIcon} />
                    ) : (
                      <ArrowRightIcon className={styles.linkIcon} />
                    )
                  }
                >
                  {option.label}
                </ActionLink>
              </ActionCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
