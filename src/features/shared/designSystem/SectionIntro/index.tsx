import type { ReactNode } from "react";
import * as styles from "./styles";

export type SectionIntroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  titleAs?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const joinClassNames = (...classNames: Array<string | undefined | false>): string =>
  classNames.filter(Boolean).join(" ");

export function SectionIntro({
  eyebrow,
  title,
  description,
  titleAs = "h2",
  align = "left",
  tone = "default",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) {
  const TitleTag = titleAs;
  const isCenterAligned = align === "center";
  const isInverseTone = tone === "inverse";

  return (
    <div className={joinClassNames(styles.root, isCenterAligned ? styles.alignCenter : styles.alignLeft, className)}>
      {eyebrow ? (
        <p
          className={joinClassNames(
            styles.eyebrow,
            isInverseTone ? styles.eyebrowInverse : styles.eyebrowDefault,
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <TitleTag
        className={joinClassNames(
          styles.title,
          isInverseTone ? styles.titleInverse : styles.titleDefault,
          titleClassName,
        )}
      >
        {title}
      </TitleTag>

      {description ? (
        <p
          className={joinClassNames(
            styles.description,
            isCenterAligned && styles.descriptionCenter,
            isInverseTone ? styles.descriptionInverse : styles.descriptionDefault,
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
