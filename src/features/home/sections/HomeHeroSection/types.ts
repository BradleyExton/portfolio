import type { RefObject } from "react";

export type HeroParallaxVector = {
  x: number;
  y: number;
};

export type HeroParallaxLayerOffset = {
  x: number;
  y: number;
};

export type HeroParallaxLayerOffsets = {
  background: HeroParallaxLayerOffset;
  steam: HeroParallaxLayerOffset;
  topOrb: HeroParallaxLayerOffset;
  bottomOrb: HeroParallaxLayerOffset;
  content: HeroParallaxLayerOffset;
  pills: HeroParallaxLayerOffset;
};

export type HeroParallaxLayerElements = {
  backgroundLayer: HTMLDivElement | null;
  steamLayer: HTMLDivElement | null;
  topOrbLayer: HTMLDivElement | null;
  bottomOrbLayer: HTMLDivElement | null;
  contentLayer: HTMLDivElement | null;
  pillsLayer: HTMLDivElement | null;
};

export type HeroParallaxLayerRefs = {
  sectionRef: RefObject<HTMLElement | null>;
  backgroundLayerRef: RefObject<HTMLDivElement | null>;
  steamLayerRef: RefObject<HTMLDivElement | null>;
  topOrbLayerRef: RefObject<HTMLDivElement | null>;
  bottomOrbLayerRef: RefObject<HTMLDivElement | null>;
  contentLayerRef: RefObject<HTMLDivElement | null>;
  pillsLayerRef: RefObject<HTMLDivElement | null>;
};
