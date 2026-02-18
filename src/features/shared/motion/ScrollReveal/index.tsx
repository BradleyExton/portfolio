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
  const hasIntersectedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window.IntersectionObserver === "undefined") {
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    const sectionIsInViewport = (): boolean => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const normalizedThreshold = Math.max(0, Math.min(threshold, 1));
      const thresholdOffset = normalizedThreshold * rect.height;
      // Reveal slightly earlier so content does not look faded while already peeking into view.
      const bottomMarginOffset = viewportHeight * 0.02;

      return (
        rect.top <= viewportHeight - bottomMarginOffset - thresholdOffset
        && rect.bottom >= thresholdOffset
      );
    };

    setIsVisible(sectionIsInViewport());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasIntersectedRef.current = true;
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
            return;
          }

          if (!once || !hasIntersectedRef.current) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -2% 0px",
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
        isVisible ? styles.visible : styles.hidden,
      )}
    >
      {children}
    </div>
  );
}
