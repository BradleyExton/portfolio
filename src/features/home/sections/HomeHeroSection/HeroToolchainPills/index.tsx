import { homeCopy } from "@/copy/home";
import { IsoToolGlyph } from "./IsoToolGlyphs";
import * as styles from "./styles";

export function HeroToolchainPills() {
  return (
    <>
      {homeCopy.heroToolchain.aiPills.map((tool, index) => (
        <span
          key={tool}
          className={`${styles.tile} ${styles.aiTileMotion[index] ?? ""}`}
        >
          <span className={styles.glyphFrame}>
            <span className={styles.aiHalo} />
            <IsoToolGlyph tool={tool} />
          </span>
          <span className={styles.aiLabel}>{tool}</span>
        </span>
      ))}
      <span
        className={`${styles.divider} ${styles.dividerMotion}`}
        aria-hidden="true"
      >
        ✦
      </span>
      {homeCopy.heroToolchain.stackPills.map((tech, index) => (
        <span
          key={tech}
          className={`${styles.tile} ${styles.stackTileMotion[index] ?? ""}`}
        >
          <span className={styles.glyphFrame}>
            <IsoToolGlyph tool={tech} />
          </span>
          <span className={styles.stackLabel}>{tech}</span>
        </span>
      ))}
    </>
  );
}
