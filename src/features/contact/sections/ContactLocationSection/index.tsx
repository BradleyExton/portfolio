import { contactCopy } from "@/copy/contact";
import * as styles from "./styles";

export function ContactLocationSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.description}>
          <span className={styles.labelText}>{contactCopy.location.label}</span>{" "}
          {contactCopy.location.value}
        </p>
        <p className={styles.text}>{contactCopy.location.detail}</p>
      </div>
    </section>
  );
}
