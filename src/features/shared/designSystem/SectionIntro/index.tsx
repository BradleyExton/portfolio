import type { ReactNode } from "react";
import { cn } from "../cn";
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
    <div className={cn(styles.root, isCenterAligned ? styles.alignCenter : styles.alignLeft, className)}>
      {eyebrow ? (
        <p
          className={cn(
            styles.eyebrow,
            isInverseTone ? styles.eyebrowInverse : styles.eyebrowDefault,
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <TitleTag
        className={cn(
          styles.title,
          isInverseTone ? styles.titleInverse : styles.titleDefault,
          titleClassName,
        )}
      >
        {title}
      </TitleTag>

      {description ? (
        <p
          className={cn(
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
