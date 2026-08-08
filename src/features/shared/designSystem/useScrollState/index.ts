"use client";

import { useEffect, useState } from "react";

/* Sub-pixel jitter from momentum and rubber-banding arrives as a stream of
   tiny alternating deltas. Below this, direction is not a real signal and a
   direction-driven header would strobe on a single flick. Deltas under the
   floor accumulate rather than being discarded, so a slow deliberate scroll
   still registers once it adds up. */
const DIRECTION_FLOOR_PX = 4;

export type ScrollState = {
  /** Scrolled beyond `condenseAfter`. */
  isPast: boolean;
  /** Last real movement was downward, from far enough down to matter. */
  isScrollingDown: boolean;
};

export function useScrollState(
  condenseAfter: number,
  hideAfter: number,
): ScrollState {
  const [isPast, setIsPast] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let lastY = Math.max(0, window.scrollY);

    const read = () => {
      // iOS overscroll reports negative offsets; clamping keeps a bounce at
      // the top of the page from reading as a downward scroll on release.
      const y = Math.max(0, window.scrollY);
      setIsPast(y > condenseAfter);

      const delta = y - lastY;
      if (Math.abs(delta) >= DIRECTION_FLOOR_PX) {
        setIsScrollingDown(delta > 0 && y > hideAfter);
        lastY = y;
      }
    };

    read();
    window.addEventListener("scroll", read, { passive: true });

    return () => {
      window.removeEventListener("scroll", read);
    };
  }, [condenseAfter, hideAfter]);

  return { isPast, isScrollingDown };
}
