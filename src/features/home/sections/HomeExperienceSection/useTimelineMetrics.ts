"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { TimelineState } from "./types";
import {
  computeTimelineProgress,
  getViewportAnchorY,
} from "./utils";

type UseTimelineMetricsParams = {
  currentRoleIndex: number;
};

type UseTimelineMetricsResult = {
  activeIndex: number;
  reduceMotion: boolean;
  sectionRef: RefObject<HTMLElement | null>;
  listRef: RefObject<HTMLOListElement | null>;
  pathSvgRef: RefObject<SVGSVGElement | null>;
  pathTrackRef: RefObject<SVGPathElement | null>;
  pathFillRef: RefObject<SVGPathElement | null>;
};

const INITIAL_TIMELINE_STATE: TimelineState = {
  activeIndex: -1,
  progress: 0,
  pathDefinition: "",
  svgWidthPx: 1,
  svgHeightPx: 1,
  isSectionInView: true,
  reduceMotion: false,
};

const PROGRESS_EPSILON = 0.001;
// Ignore subpixel differences to prevent resize/scroll jitter from re-rendering the rail path.
const PIXEL_EPSILON = 0.5;

type PathPoint = {
  x: number;
  y: number;
};

const buildPathDefinition = (points: readonly PathPoint[]): string => {
  if (points.length === 0) {
    return "";
  }

  return points.map((point, index) => {
    const command = index === 0 ? "M" : "L";
    return `${command} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(" ");
};

export function useTimelineMetrics({
  currentRoleIndex,
}: UseTimelineMetricsParams): UseTimelineMetricsResult {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const pathSvgRef = useRef<SVGSVGElement | null>(null);
  const pathTrackRef = useRef<SVGPathElement | null>(null);
  const pathFillRef = useRef<SVGPathElement | null>(null);
  const frameRequestRef = useRef<number | null>(null);
  const [timelineState, setTimelineState] = useState<TimelineState>(INITIAL_TIMELINE_STATE);

  const updateTimelineMetrics = useCallback((reduceMotionOverride?: boolean) => {
    if (typeof window === "undefined") {
      return;
    }

    const listNode = listRef.current;
    const milestoneNodes = Array.from(
      listNode?.querySelectorAll<HTMLSpanElement>("[data-timeline-milestone='true']") ?? [],
    );
    const entryNodes = Array.from(
      listNode?.querySelectorAll<HTMLElement>("[data-timeline-entry='true']") ?? [],
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
    const entryBottomsAbsolute = entryNodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.bottom + window.scrollY;
    });
    const entryTopsAbsolute = entryNodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top + window.scrollY;
    });
    const milestoneCentersRelative = milestoneNodes.map<PathPoint>((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - listRect.left + (rect.width / 2),
        y: rect.top - listRect.top + (rect.height / 2),
      };
    });
    const entryBottomsRelative = entryNodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.bottom - listRect.top;
    });
    const reducedMotion = reduceMotionOverride ?? timelineState.reduceMotion;
    const fallbackIndex = currentRoleIndex >= 0 ? currentRoleIndex : 0;
    const endY = Math.max(
      milestoneCentersAbsolute[milestoneCentersAbsolute.length - 1],
      entryBottomsAbsolute[entryBottomsAbsolute.length - 1]
        ?? milestoneCentersAbsolute[milestoneCentersAbsolute.length - 1],
    );
    const progress = reducedMotion
      ? 1
      : computeTimelineProgress({
        anchorY: absoluteAnchorY,
        startY: milestoneCentersAbsolute[0],
        endY,
      });

    const firstMilestonePoint = milestoneCentersRelative[0];
    const laneX = firstMilestonePoint.x;
    const railEndRelativeY = Math.max(
      milestoneCentersRelative[milestoneCentersRelative.length - 1].y,
      entryBottomsRelative[entryBottomsRelative.length - 1]
        ?? milestoneCentersRelative[milestoneCentersRelative.length - 1].y,
    );
    const checkpointPathPoints = milestoneCentersRelative.map<PathPoint>((checkpointPoint) => {
      return {
        x: laneX,
        y: checkpointPoint.y,
      };
    });
    // Extend only when the card bottom is meaningfully below the final checkpoint,
    // ignoring subpixel layout noise near the boundary.
    if (railEndRelativeY > checkpointPathPoints[checkpointPathPoints.length - 1].y + PIXEL_EPSILON) {
      checkpointPathPoints.push({
        x: laneX,
        y: railEndRelativeY,
      });
    }
    const pathDefinition = buildPathDefinition(checkpointPathPoints);
    const checkpointProgress = milestoneCentersAbsolute.map((checkpointCenterAbsoluteY) => {
      return computeTimelineProgress({
        anchorY: checkpointCenterAbsoluteY,
        startY: milestoneCentersAbsolute[0],
        endY,
      });
    });
    const svgWidthPx = Math.max(1, listRect.width);
    const svgHeightPx = Math.max(1, listRect.height);

    setTimelineState((previousState) => {
      // A card is active only while the viewport anchor is inside its top/bottom checkpoints.
      const activeEntryCheckpointIndex = entryTopsAbsolute.findIndex((entryTopAbsolute, index) => {
        const entryBottomAbsolute = entryBottomsAbsolute[index];
        if (entryBottomAbsolute === undefined) {
          return false;
        }

        return absoluteAnchorY >= entryTopAbsolute
          && absoluteAnchorY < (entryBottomAbsolute - PIXEL_EPSILON);
      });
      const progressActiveIndex = checkpointProgress.reduce((resolvedIndex, checkpoint) => {
        if (progress + PROGRESS_EPSILON < checkpoint) {
          return resolvedIndex;
        }

        return resolvedIndex + 1;
      }, -1);
      const activeIndex = reducedMotion
        ? fallbackIndex
        : (
          entryNodes.length === 0
            ? progressActiveIndex
            : activeEntryCheckpointIndex
        );
      const metricsUnchanged = (
        previousState.activeIndex === activeIndex
        && Math.abs(previousState.progress - progress) < PROGRESS_EPSILON
        && previousState.pathDefinition === pathDefinition
        && Math.abs(previousState.svgWidthPx - svgWidthPx) < PIXEL_EPSILON
        && Math.abs(previousState.svgHeightPx - svgHeightPx) < PIXEL_EPSILON
      );
      if (metricsUnchanged) {
        return previousState;
      }

      return {
        ...previousState,
        activeIndex,
        progress,
        pathDefinition,
        svgWidthPx,
        svgHeightPx,
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
    const pathSvgNode = pathSvgRef.current;
    const pathTrackNode = pathTrackRef.current;
    const pathFillNode = pathFillRef.current;
    if (!pathSvgNode || !pathTrackNode || !pathFillNode) {
      return;
    }

    const applyPath = ({
      trackNode,
      fillNode,
      definition,
      fillProgress,
    }: {
      trackNode: SVGPathElement;
      fillNode: SVGPathElement;
      definition: string;
      fillProgress: number;
    }) => {
      if (definition.length === 0) {
        trackNode.setAttribute("d", "");
        fillNode.setAttribute("d", "");
        fillNode.style.strokeDasharray = "0";
        fillNode.style.strokeDashoffset = "0";
        return;
      }

      trackNode.setAttribute("d", definition);
      fillNode.setAttribute("d", definition);

      const totalPathLength = trackNode.getTotalLength();
      if (totalPathLength <= 0) {
        fillNode.style.strokeDasharray = "0";
        fillNode.style.strokeDashoffset = "0";
        return;
      }

      fillNode.style.strokeDasharray = `${totalPathLength}`;
      fillNode.style.strokeDashoffset = `${totalPathLength * (1 - fillProgress)}`;
    };

    pathSvgNode.setAttribute("viewBox", `0 0 ${timelineState.svgWidthPx} ${timelineState.svgHeightPx}`);
    applyPath({
      trackNode: pathTrackNode,
      fillNode: pathFillNode,
      definition: timelineState.pathDefinition,
      fillProgress: timelineState.progress,
    });
  }, [
    timelineState.pathDefinition,
    timelineState.progress,
    timelineState.svgHeightPx,
    timelineState.svgWidthPx,
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
    pathSvgRef,
    pathTrackRef,
    pathFillRef,
  };
}
