"use client";

import { useEffect, useRef, useState } from "react";
import type { CapabilityId } from "../types";
import { DeliveryIllustration } from "./DeliveryIllustration";
import { FrontendIllustration } from "./FrontendIllustration";
import { PlatformIllustration } from "./PlatformIllustration";
import * as styles from "./styles";

const illustrationByCapabilityId: Record<CapabilityId, () => React.JSX.Element> = {
  delivery: DeliveryIllustration,
  frontend: FrontendIllustration,
  platform: PlatformIllustration,
};

type IsoIllustrationVariant = keyof typeof styles.sceneByVariant;

type IsoIllustrationProps = {
  capabilityId: CapabilityId;
  variant?: IsoIllustrationVariant;
};

/* Without an observer there is no scroll signal to wait for, so the scene runs
   unconditionally rather than sitting frozen. Derived at render so the fallback
   needs no setState in an effect. */
const canObserve = (): boolean =>
  typeof window !== "undefined" && typeof window.IntersectionObserver !== "undefined";

/* The loops need their own visibility signal, separate from the deck's active
   card. data-active marks the one capability whose copy is at the anchor line,
   and in the stacked deck that is a ~130px band of scroll during which the
   stack is already leaving the viewport — so gating the loops on it alone left
   every scene frozen for the whole time it was actually being read, and the
   ambient packets (base opacity 0 while paused) never appeared at all. The
   assemble stays on data-active, because arrival should still belong to the
   card being read; only the ambient clock follows visibility. */
export function IsoIllustration({ capabilityId, variant = "panel" }: IsoIllustrationProps) {
  const Illustration = illustrationByCapabilityId[capabilityId];
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const observed = canObserve();

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || typeof window.IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className={styles.sceneByVariant[variant]}
      data-illustration={capabilityId}
      data-inview={!observed || isInView ? "true" : "false"}
    >
      <Illustration />
    </div>
  );
}
