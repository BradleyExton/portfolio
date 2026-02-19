"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type { CapabilityId } from "./types";
import { resolveActiveCapabilityId } from "./utils";

type UseActiveCapabilityIdParams = {
  capabilityIds: readonly CapabilityId[];
};

type UseActiveCapabilityIdResult = {
  activeCapabilityId: CapabilityId;
  reduceMotion: boolean;
  listRef: RefObject<HTMLOListElement | null>;
  setCardRef: (id: CapabilityId, node: HTMLDivElement | null) => void;
};

const DEFAULT_STICKY_TOP_PX = 80;
const ACTIVE_CARD_OFFSET_PX = 28;

const parseStickyTopPx = (listNode: HTMLOListElement): number => {
  const stickyTopValue = getComputedStyle(listNode).getPropertyValue("--stack-sticky-top").trim();
  const parsedValue = Number.parseFloat(stickyTopValue);
  if (!Number.isFinite(parsedValue)) {
    return DEFAULT_STICKY_TOP_PX;
  }

  if (stickyTopValue.endsWith("rem")) {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (Number.isFinite(rootFontSize)) {
      return parsedValue * rootFontSize;
    }

    return DEFAULT_STICKY_TOP_PX;
  }

  return parsedValue;
};

export function useActiveCapabilityId({
  capabilityIds,
}: UseActiveCapabilityIdParams): UseActiveCapabilityIdResult {
  const listRef = useRef<HTMLOListElement | null>(null);
  const cardRefs = useRef<Partial<Record<CapabilityId, HTMLDivElement | null>>>({});
  const frameRef = useRef<number | null>(null);
  const isSectionVisibleRef = useRef(true);
  const defaultCapabilityId = useMemo<CapabilityId>(() => capabilityIds[0] ?? "delivery", [capabilityIds]);
  const [activeCapabilityId, setActiveCapabilityId] = useState<CapabilityId>(defaultCapabilityId);
  const [reduceMotion, setReduceMotion] = useState(false);

  const setCardRef = useCallback((id: CapabilityId, node: HTMLDivElement | null) => {
    cardRefs.current[id] = node;
  }, []);

  const updateActiveCapability = useCallback(() => {
    const listNode = listRef.current;
    if (!listNode) {
      return;
    }

    const anchorY = parseStickyTopPx(listNode) + ACTIVE_CARD_OFFSET_PX;
    const cardRects = capabilityIds.flatMap((capabilityId) => {
      const cardNode = cardRefs.current[capabilityId];
      if (!cardNode) {
        return [];
      }

      const { top, bottom } = cardNode.getBoundingClientRect();
      return [{ id: capabilityId, top, bottom }];
    });

    const nextActiveCapabilityId = resolveActiveCapabilityId({
      capabilityIds,
      cardRects,
      anchorY,
    });

    setActiveCapabilityId((previousActiveCapabilityId) => {
      if (previousActiveCapabilityId === nextActiveCapabilityId) {
        return previousActiveCapabilityId;
      }

      return nextActiveCapabilityId;
    });
  }, [capabilityIds]);

  const scheduleActiveCapabilityUpdate = useCallback(() => {
    if (typeof window === "undefined" || frameRef.current !== null || !isSectionVisibleRef.current) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      updateActiveCapability();
    });
  }, [updateActiveCapability]);

  useEffect(() => {
    setActiveCapabilityId(defaultCapabilityId);
  }, [defaultCapabilityId]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    applyMotionPreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", applyMotionPreference);
      return () => {
        mediaQuery.removeEventListener("change", applyMotionPreference);
      };
    }

    if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(applyMotionPreference);
      return () => {
        mediaQuery.removeListener(applyMotionPreference);
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      return;
    }

    const listNode = listRef.current;
    if (!listNode) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const listIsInView = entries[0]?.isIntersecting ?? false;
        isSectionVisibleRef.current = listIsInView;
        if (listIsInView) {
          scheduleActiveCapabilityUpdate();
        }
      },
      { rootMargin: "24% 0px 24% 0px" },
    );

    observer.observe(listNode);
    return () => {
      observer.disconnect();
    };
  }, [scheduleActiveCapabilityUpdate]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    scheduleActiveCapabilityUpdate();

    const handleViewportChange = () => {
      scheduleActiveCapabilityUpdate();
    };

    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [scheduleActiveCapabilityUpdate]);

  return {
    activeCapabilityId,
    reduceMotion,
    listRef,
    setCardRef,
  };
}
