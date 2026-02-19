export type ExperienceTimelineItem = {
  company: string;
  role: string;
  description: string;
  highlights: readonly string[];
  period: string;
  monogram: string;
  techChips: readonly string[];
  current: boolean;
};

export type TimelineMetrics = {
  activeIndex: number;
  borderActiveIndex: number;
  progress: number;
  pathDefinition: string;
  svgWidthPx: number;
  svgHeightPx: number;
};

export type TimelineState = TimelineMetrics & {
  isSectionInView: boolean;
  reduceMotion: boolean;
};
