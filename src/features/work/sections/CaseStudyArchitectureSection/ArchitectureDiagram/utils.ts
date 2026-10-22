import type { CaseStudyDiagram } from "@/copy/caseStudies";
import type { DiagramLayout, DiagramMetrics, DiagramVariant, PlacedEdge, PlacedNode } from "./types";

/* Sizes are in SVG user units. The narrow variant is drawn for a ~360px
   column, so its units land close to CSS pixels on a phone and the 13px
   labels stay 13px rather than shrinking with a scaled-down wide drawing. */
export const DIAGRAM_METRICS: Record<DiagramVariant, DiagramMetrics> = {
  wide: {
    // Wide cells leave ~100 units between neighbouring boxes so a two-word
    // connector label fits on a horizontal line without touching either box.
    cellWidth: 280,
    cellHeight: 132,
    boxWidth: 180,
    boxHeight: 70,
    labelSize: 15,
    detailSize: 12,
    edgeLabelSize: 11.5,
  },
  narrow: {
    cellWidth: 180,
    cellHeight: 112,
    boxWidth: 148,
    boxHeight: 64,
    labelSize: 13.5,
    detailSize: 11,
    edgeLabelSize: 11,
  },
};

// Gap between a box edge and the start or end of a connector, so arrowheads
// never touch the outline they point at.
const EDGE_GAP_START = 4;
const EDGE_GAP_END = 8;
// Average glyph advance relative to font size; good enough to size the label
// backplate without measuring text on the server.
const GLYPH_ADVANCE = 0.58;
const LABEL_PADDING_X = 8;

const clipToBox = (dx: number, dy: number, halfWidth: number, halfHeight: number): number => {
  const tx = dx === 0 ? Number.POSITIVE_INFINITY : halfWidth / Math.abs(dx);
  const ty = dy === 0 ? Number.POSITIVE_INFINITY : halfHeight / Math.abs(dy);
  return Math.min(tx, ty);
};

export const layoutDiagram = (diagram: CaseStudyDiagram, variant: DiagramVariant): DiagramLayout => {
  const metrics = DIAGRAM_METRICS[variant];
  const grid = variant === "wide" ? diagram.wideGrid : diagram.narrowGrid;

  const nodes: PlacedNode[] = diagram.nodes.map((node) => {
    const position = node[variant];
    const cx = (position.col + 0.5) * metrics.cellWidth;
    const cy = (position.row + 0.5) * metrics.cellHeight;
    return {
      id: node.id,
      label: node.label,
      detail: node.detail,
      emphasis: node.emphasis ?? false,
      cx,
      cy,
      x: cx - metrics.boxWidth / 2,
      y: cy - metrics.boxHeight / 2,
    };
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));
  const halfWidth = metrics.boxWidth / 2;
  const halfHeight = metrics.boxHeight / 2;

  const edges: PlacedEdge[] = diagram.edges.flatMap((edge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) {
      return [];
    }

    const dx = to.cx - from.cx;
    const dy = to.cy - from.cy;
    const length = Math.hypot(dx, dy);
    const ux = dx / length;
    const uy = dy / length;
    const exit = clipToBox(ux, uy, halfWidth, halfHeight);
    const startGap = edge.twoWay ? EDGE_GAP_END : EDGE_GAP_START;

    const x1 = from.cx + ux * (exit + startGap);
    const y1 = from.cy + uy * (exit + startGap);
    const x2 = to.cx - ux * (exit + EDGE_GAP_END);
    const y2 = to.cy - uy * (exit + EDGE_GAP_END);

    return [
      {
        key: `${edge.from}-${edge.to}`,
        x1,
        y1,
        x2,
        y2,
        twoWay: edge.twoWay ?? false,
        // The narrow drawing leaves edge labels to the connection list under
        // it: between two columns at phone width there is no room for a
        // readable label without covering a box.
        label: edge.label && variant === "wide"
          ? {
              text: edge.label,
              x: (x1 + x2) / 2,
              y: (y1 + y2) / 2,
              width: edge.label.length * metrics.edgeLabelSize * GLYPH_ADVANCE + LABEL_PADDING_X * 2,
            }
          : undefined,
      },
    ];
  });

  return {
    width: grid.cols * metrics.cellWidth,
    height: grid.rows * metrics.cellHeight,
    metrics,
    nodes,
    edges,
  };
};
