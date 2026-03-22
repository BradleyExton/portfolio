"use client";

import { useEffect, useState } from "react";

type MediaQueryListLike = Pick<
  MediaQueryList,
  "matches" | "addEventListener" | "removeEventListener" | "addListener" | "removeListener"
>;

export const subscribeMediaQueryChange = (
  mediaQueryList: MediaQueryListLike,
  onChange: () => void,
): (() => void) => {
  const listener = () => {
    onChange();
  };

  if (typeof mediaQueryList.addEventListener === "function") {
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }

  mediaQueryList.addListener(listener);
  return () => {
    mediaQueryList.removeListener(listener);
  };
};

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatches(mediaQueryList.matches);
    };

    updateMatch();
    return subscribeMediaQueryChange(mediaQueryList, updateMatch);
  }, [query]);

  return matches;
}
