import { useEffect, useState, type RefObject } from "react";

type UseDeferredSectionVisibilityParams = {
  targetRef: RefObject<HTMLElement | null>;
  fallbackDelayMs: number;
  rootMargin?: string;
  threshold?: number;
};

export const useDeferredSectionVisibility = ({
  targetRef,
  fallbackDelayMs,
  rootMargin = "0px",
  threshold = 0.2,
}: UseDeferredSectionVisibilityParams): boolean => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const fallbackTimerId = window.setTimeout(() => {
      setShouldRender(true);
    }, fallbackDelayMs);

    if (typeof window.IntersectionObserver === "undefined") {
      const immediateTimerId = window.setTimeout(() => {
        setShouldRender(true);
      }, 0);

      return () => {
        window.clearTimeout(fallbackTimerId);
        window.clearTimeout(immediateTimerId);
      };
    }

    const node = targetRef.current;
    if (!node) {
      return () => {
        window.clearTimeout(fallbackTimerId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          window.clearTimeout(fallbackTimerId);
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallbackTimerId);
      observer.disconnect();
    };
  }, [fallbackDelayMs, rootMargin, shouldRender, targetRef, threshold]);

  return shouldRender;
};
