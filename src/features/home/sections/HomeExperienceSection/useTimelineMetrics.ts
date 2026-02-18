"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { TimelineState } from "./types";
import { computeTimelineProgress, getActiveIndex, getViewportAnchorY } from "./utils";

type UseTimelineMetricsParams = {
  currentRoleIndex: number;
};

type UseTimelineMetricsResult = {
  activeIndex: number;
  reduceMotion: boolean;
  sectionRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLOListElement | null>;
  railTrackRef: RefObject<HTMLDivElement | null>;
  railFillRef: RefObject<HTMLSpanElement | null>;
  setMilestoneRef: (index: number, node: HTMLSpanElement | null) => void;
};

const INITIAL_TIMELINE_STATE: TimelineState = {
  activeIndex: 0,
  progress: 0,
  railLeftPx: 16,
  railTopPx: 16,
  railHeightPx: 0,
  isSectionInView: true,
  reduceMotion: false,
};

const PROGRESS_EPSILON = 0.001;
const PIXEL_EPSILON = 0.5;

export function useTimelineMetrics({
  currentRoleIndex,
}: UseTimelineMetricsParams): UseTimelineMetricsResult {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const railTrackRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLSpanElement | null>(null);
  const milestoneRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frameRequestRef = useRef<number | null>(null);
  const [timelineState, setTimelineState] = useState<TimelineState>(INITIAL_TIMELINE_STATE);

  const setMilestoneRef = useCallback((index: number, node: HTMLSpanElement | null) => {
    milestoneRefs.current[index] = node;
  }, []);

  const updateTimelineMetrics = useCallback((reduceMotionOverride?: boolean) => {
    if (typeof window === "undefined") {
      return;
    }

    const listNode = listRef.current;
    const milestoneNodes = milestoneRefs.current.filter(
      (node): node is HTMLSpanElement => Boolean(node),
    );
    if (!listNode || milestoneNodes.length === 0) {
      return;
    }

    const listRect = listNode.getBoundingClientRect();
    const absoluteAnchorY = window.scrollY + getViewportAnchorY(window.innerHeight, 0.45);
    const milestoneCentersAbsolute = milestoneNodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top + window.scrollY + (rect.height / 2);
    });
    const reducedMotion = reduceMotionOverride ?? timelineState.reduceMotion;
    const fallbackIndex = currentRoleIndex >= 0 ? currentRoleIndex : 0;
    const activeIndex = reducedMotion
      ? fallbackIndex
      : getActiveIndex(milestoneCentersAbsolute, absoluteAnchorY);
    const progress = reducedMotion
      ? 1
      : computeTimelineProgress({
        anchorY: absoluteAnchorY,
        startY: milestoneCentersAbsolute[0],
        endY: milestoneCentersAbsolute[milestoneCentersAbsolute.length - 1],
      });

    const firstMilestoneRect = milestoneNodes[0].getBoundingClientRect();
    const lastMilestoneRect = milestoneNodes[milestoneNodes.length - 1].getBoundingClientRect();
    const railTopPx = firstMilestoneRect.top - listRect.top + (firstMilestoneRect.height / 2);
    const railBottomPx = lastMilestoneRect.top - listRect.top + (lastMilestoneRect.height / 2);
    const railHeightPx = Math.max(0, railBottomPx - railTopPx);
    const railLeftPx = firstMilestoneRect.left - listRect.left + (firstMilestoneRect.width / 2);

    setTimelineState((previousState) => {
      const metricsUnchanged = (
        previousState.activeIndex === activeIndex
        && Math.abs(previousState.progress - progress) < PROGRESS_EPSILON
        && Math.abs(previousState.railLeftPx - railLeftPx) < PIXEL_EPSILON
        && Math.abs(previousState.railTopPx - railTopPx) < PIXEL_EPSILON
        && Math.abs(previousState.railHeightPx - railHeightPx) < PIXEL_EPSILON
      );
      if (metricsUnchanged) {
        return previousState;
      }

      return {
        ...previousState,
        activeIndex,
        progress,
        railLeftPx,
        railTopPx,
        railHeightPx,
      };
    });
  }, [currentRoleIndex, timelineState.reduceMotion]);

  const scheduleMetricsUpdate = useCallback((reduceMotionOverride?: boolean) => {
    if (typeof window === "undefined" || frameRequestRef.current !== null) {
      return;
    }

    frameRequestRef.current = window.requestAnimationFrame(() => {
      frameRequestRef.current = null;
      updateTimelineMetrics(reduceMotionOverride);
    });
  }, [updateTimelineMetrics]);

  useEffect(() => {
    const railTrackNode = railTrackRef.current;
    const railFillNode = railFillRef.current;
    if (!railTrackNode || !railFillNode) {
      return;
    }

    railTrackNode.style.left = `${timelineState.railLeftPx}px`;
    railTrackNode.style.top = `${timelineState.railTopPx}px`;
    railTrackNode.style.height = `${timelineState.railHeightPx}px`;
    railFillNode.style.transform = `scaleY(${timelineState.progress})`;
  }, [
    timelineState.progress,
    timelineState.railHeightPx,
    timelineState.railLeftPx,
    timelineState.railTopPx,
  ]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      const shouldReduceMotion = mediaQuery.matches;
      setTimelineState((previousState) => {
        if (previousState.reduceMotion === shouldReduceMotion) {
          return previousState;
        }

        return {
          ...previousState,
          reduceMotion: shouldReduceMotion,
        };
      });
      scheduleMetricsUpdate(shouldReduceMotion);
    };

    applyMotionPreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", applyMotionPreference);
      return () => {
        mediaQuery.removeEventListener("change", applyMotionPreference);
      };
    }

    mediaQuery.addListener(applyMotionPreference);
    return () => {
      mediaQuery.removeListener(applyMotionPreference);
    };
  }, [scheduleMetricsUpdate]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sectionNode = sectionRef.current;
    if (!sectionNode || typeof window.IntersectionObserver === "undefined") {
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const sectionIsInView = entries[0]?.isIntersecting ?? false;
        setTimelineState((previousState) => {
          if (previousState.isSectionInView === sectionIsInView) {
            return previousState;
          }

          return {
            ...previousState,
            isSectionInView: sectionIsInView,
          };
        });
      },
      { rootMargin: "24% 0px 24% 0px" },
    );
    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    scheduleMetricsUpdate();
    const handleResize = () => scheduleMetricsUpdate();
    window.addEventListener("resize", handleResize);
    if (!timelineState.isSectionInView || timelineState.reduceMotion) {
      return () => {
        window.removeEventListener("resize", handleResize);
        if (frameRequestRef.current !== null) {
          window.cancelAnimationFrame(frameRequestRef.current);
          frameRequestRef.current = null;
        }
      };
    }

    const handleScroll = () => scheduleMetricsUpdate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (frameRequestRef.current !== null) {
        window.cancelAnimationFrame(frameRequestRef.current);
        frameRequestRef.current = null;
      }
    };
  }, [scheduleMetricsUpdate, timelineState.isSectionInView, timelineState.reduceMotion]);

  return {
    activeIndex: timelineState.activeIndex,
    reduceMotion: timelineState.reduceMotion,
    sectionRef,
    listRef,
    railTrackRef,
    railFillRef,
    setMilestoneRef,
  };
}
