import { contactCopy } from "@/copy/contact";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

function MapPinIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ContactLocationSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.reveal}>
          <span className={styles.iconBadge} aria-hidden="true">
            <MapPinIcon className={styles.icon} />
          </span>
          <p className={styles.description}>
            <span className={styles.labelText}>{contactCopy.location.label}</span>{" "}
            {contactCopy.location.value}
          </p>
          <p className={styles.text}>{contactCopy.location.detail}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
