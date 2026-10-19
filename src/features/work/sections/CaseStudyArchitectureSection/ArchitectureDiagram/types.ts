export type DiagramVariant = "wide" | "narrow";

export type DiagramMetrics = {
  cellWidth: number;
  cellHeight: number;
  boxWidth: number;
  boxHeight: number;
  labelSize: number;
  detailSize: number;
  edgeLabelSize: number;
};

export type PlacedNode = {
  id: string;
  label: string;
  detail?: string;
  emphasis: boolean;
  x: number;
  y: number;
  cx: number;
  cy: number;
};

export type PlacedEdge = {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  twoWay: boolean;
  label?: {
    text: string;
    x: number;
    y: number;
    width: number;
  };
};

export type DiagramLayout = {
  width: number;
  height: number;
  metrics: DiagramMetrics;
  nodes: PlacedNode[];
  edges: PlacedEdge[];
};
