import Image from "next/image";
import type { CaseStudyShot } from "@/copy/caseStudies";
import { cn } from "@/features/shared/designSystem";
import * as styles from "./styles";

type ShotFigureProps = {
  shot: CaseStudyShot;
  sizes: string;
  priority?: boolean;
  showCaption?: boolean;
  className?: string;
};

/* A screenshot in a light device frame: a browser bar for desktop and TV
   captures, a handset bezel for phone captures. The frame is decoration; the
   alt text carries what the screen shows. */
export function ShotFigure({
  shot,
  sizes,
  priority = false,
  showCaption = true,
  className,
}: ShotFigureProps) {
  const isPhone = shot.kind === "phone";

  return (
    <figure className={cn(isPhone ? styles.phoneFigure : styles.screenFigure, className)}>
      <div className={isPhone ? styles.phoneFrame : styles.screenFrame}>
        {isPhone ? null : (
          <div aria-hidden="true" className={styles.screenBar}>
            <span className={styles.screenDot} />
            <span className={styles.screenDot} />
            <span className={styles.screenDot} />
          </div>
        )}
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          priority={priority}
          quality={75}
          className={isPhone ? styles.phoneImage : styles.screenImage}
        />
      </div>
      {showCaption ? <figcaption className={styles.caption}>{shot.caption}</figcaption> : null}
    </figure>
  );
}
