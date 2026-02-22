import { homeCopy } from "@/copy/home";
import * as styles from "./styles";

export function HomeTestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.block}>
          <p className={styles.eyebrow}>
            {homeCopy.testimonials.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {homeCopy.testimonials.heading}
          </h2>
        </div>

        <div className={styles.grid}>
          {homeCopy.testimonials.items.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.row}>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={styles.icon}
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className={styles.description}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className={styles.authorRow}>
                <div className={styles.authorAvatar}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className={styles.text}>{testimonial.name}</p>
                  <p className={styles.authorRole}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
