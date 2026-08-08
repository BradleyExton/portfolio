"use client";

import { useEffect, useRef, useState } from "react";
import type { HowIWorkStageId } from "../types";
import { AgentsIllustration } from "./AgentsIllustration";
import { ContextIllustration } from "./ContextIllustration";
import { GatesIllustration } from "./GatesIllustration";
import { SpecIllustration } from "./SpecIllustration";
import * as styles from "./styles";

const illustrationByStageId: Record<HowIWorkStageId, () => React.JSX.Element> = {
  spec: SpecIllustration,
  context: ContextIllustration,
  agents: AgentsIllustration,
  gates: GatesIllustration,
};

type IsoIllustrationProps = {
  stageId: HowIWorkStageId;
};

// Without an observer there is no scroll signal to wait for, so the scene runs
// unconditionally rather than sitting frozen mid-pose. Derived at render rather
// than pushed into state so the fallback needs no setState in an effect; the
// section only ever renders on the client, so there is no SSR value to match.
const canObserve = (): boolean =>
  typeof window !== "undefined" && typeof window.IntersectionObserver !== "undefined";

export function IsoIllustration({ stageId }: IsoIllustrationProps) {
  const Illustration = illustrationByStageId[stageId];
  const sceneRef = useRef<HTMLDivElement | null>(null);
  // Two flags, because the scene wants two different behaviors. The assemble is
  // a one-time arrival, so hasAssembled latches. The character loops are
  // ambient, so they follow visibility in both directions and four scenes are
  // never animating off-screen at once.
  const [hasAssembled, setHasAssembled] = useState(false);
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
        if (entry.isIntersecting) {
          setHasAssembled(true);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className={styles.scene}
      data-illustration={stageId}
      data-active={!observed || hasAssembled ? "true" : "false"}
      data-inview={!observed || isInView ? "true" : "false"}
    >
      <Illustration />
    </div>
  );
}
