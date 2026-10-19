/* Content model for the /work/<slug> case-study pages. Every study fills the
   same shape so the pages share one template; the facts behind each claim are
   logged in docs/case-studies/<slug>-facts.md. */

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

/* Grid coordinates, not pixels. The diagram component turns them into SVG
   positions, so each study only states where a box sits relative to the
   others. `wide` is the desktop layout; `narrow` is the phone layout, where
   the same boxes restack into two columns so the labels stay legible. */
export type DiagramPosition = {
  col: number;
  row: number;
};

export type DiagramNode = {
  id: string;
  label: string;
  detail?: string;
  emphasis?: boolean;
  wide: DiagramPosition;
  narrow: DiagramPosition;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  twoWay?: boolean;
};

export type CaseStudyDiagram = {
  title: string;
  description: string;
  wideGrid: { cols: number; rows: number };
  narrowGrid: { cols: number; rows: number };
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
};

export type CaseStudyDecision = {
  title: string;
  choice: string;
  tradeoff: string;
};

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyShot = {
  src: string;
  alt: string;
  caption: string;
  kind: "screen" | "phone";
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /* One line for the hero and the homepage row. */
  summary: string;
  /* Short label for the homepage row's tag run. */
  tags: readonly string[];
  meta: readonly CaseStudyMetaItem[];
  links: readonly CaseStudyLink[];
  cover: CaseStudyShot;
  problem: {
    heading: string;
    body: readonly string[];
    constraints: readonly string[];
  };
  architecture: {
    heading: string;
    description: string;
    diagram: CaseStudyDiagram;
    notes: readonly string[];
  };
  decisions: {
    heading: string;
    items: readonly CaseStudyDecision[];
  };
  verification: {
    heading: string;
    description: string;
    stats: readonly CaseStudyStat[];
    checks: readonly string[];
  };
  gallery: readonly CaseStudyShot[];
  outcome: {
    heading: string;
    body: readonly string[];
  };
};
