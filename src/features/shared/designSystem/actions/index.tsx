"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../cn";
import * as styles from "./styles";

type ActionLinkVariant = "brand" | "surface" | "outline" | "ghost" | "inline";
type ActionLinkSize = "md" | "sm" | "text";
type ActionLinkIconPosition = "start" | "end";

export type ActionLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: ActionLinkVariant;
  size?: ActionLinkSize;
  icon?: ReactNode;
  iconPosition?: ActionLinkIconPosition;
  iconClassName?: string;
};

const variantClassNames: Record<ActionLinkVariant, string> = {
  brand: styles.linkBrand,
  surface: styles.linkSurface,
  outline: styles.linkOutline,
  ghost: styles.linkGhost,
  inline: styles.linkInline,
};

const sizeClassNames: Record<ActionLinkSize, string> = {
  md: styles.linkSizeMd,
  sm: styles.linkSizeSm,
  text: styles.linkSizeText,
};

const isInternalLink = (href: string): boolean => {
  return href.startsWith("/") || href.startsWith("#");
};

export function ActionLink({
  href,
  variant = "brand",
  size = "sm",
  icon = null,
  iconPosition = "end",
  iconClassName,
  className,
  children,
  target,
  rel,
  ...props
}: ActionLinkProps) {
  const linkClassName = cn(
    styles.linkBase,
    variantClassNames[variant],
    sizeClassNames[size],
    className,
  );

  const iconNode = icon ? (
    <span
      aria-hidden="true"
      className={cn(styles.linkIcon, iconClassName)}
    >
      {icon}
    </span>
  ) : null;

  const sharedProps = {
    className: linkClassName,
    target,
    rel,
    ...props,
  };

  if (isInternalLink(href)) {
    return (
      <Link href={href} {...sharedProps}>
        {iconPosition === "start" ? iconNode : null}
        <span>{children}</span>
        {iconPosition === "end" ? iconNode : null}
      </Link>
    );
  }

  return (
    <a href={href} {...sharedProps}>
      {iconPosition === "start" ? iconNode : null}
      <span>{children}</span>
      {iconPosition === "end" ? iconNode : null}
    </a>
  );
}

export type ActionCardProps = {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  badgeClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function ActionCard({
  badge,
  title,
  description,
  icon,
  children,
  className,
  badgeClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: ActionCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      {badge ? <p className={cn(styles.cardBadge, badgeClassName)}>{badge}</p> : null}
      {icon ? <div className={cn(styles.cardIcon, iconClassName)}>{icon}</div> : null}
      <h3 className={cn(styles.cardTitle, titleClassName)}>{title}</h3>
      {description ? (
        <p className={cn(styles.cardDescription, descriptionClassName)}>
          {description}
        </p>
      ) : null}
      {children ? <div className={styles.cardChildren}>{children}</div> : null}
    </article>
  );
}
