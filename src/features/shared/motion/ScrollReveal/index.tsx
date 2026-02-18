"use client";

import { useEffect, useRef, useState } from "react";
import * as styles from "./styles";
import type { ScrollRevealProps } from "./types";
import { getRevealDelayClass, joinClassNames } from "./utils";

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  threshold = 0.05,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return typeof window.IntersectionObserver === "undefined";
  });

  useEffect(() => {
    if (typeof window.IntersectionObserver === "undefined") {
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
            return;
          }

          if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  return (
    <div
      ref={elementRef}
      className={joinClassNames(
        styles.base,
        getRevealDelayClass(delayMs),
        className,
        isVisible ? styles.visible : undefined,
      )}
    >
      {children}
    </div>
  );
}
