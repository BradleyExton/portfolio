"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/features/shared/designSystem/cn";
import * as styles from "./styles";
import type { ScrollRevealProps } from "./types";
import { getRevealDelayClass } from "./utils";

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
      className={cn(
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
