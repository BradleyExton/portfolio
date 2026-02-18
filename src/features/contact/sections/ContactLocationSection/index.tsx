import { contactCopy } from "@/copy/contact";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ContactLocationSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
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
