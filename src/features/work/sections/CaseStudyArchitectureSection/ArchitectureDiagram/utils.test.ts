import { describe, expect, it } from "vitest";
import type { CaseStudyDiagram } from "@/copy/caseStudies";
import { DIAGRAM_METRICS, layoutDiagram } from "./utils";

const diagram: CaseStudyDiagram = {
  title: "Test",
  description: "Two boxes side by side.",
  wideGrid: { cols: 2, rows: 1 },
  narrowGrid: { cols: 1, rows: 2 },
  nodes: [
    { id: "a", label: "A", wide: { col: 0, row: 0 }, narrow: { col: 0, row: 0 } },
    { id: "b", label: "B", wide: { col: 1, row: 0 }, narrow: { col: 0, row: 1 } },
  ],
  edges: [
    { from: "a", to: "b", label: "talks to" },
    { from: "a", to: "missing" },
  ],
};

describe("layoutDiagram", () => {
  it("sizes the drawing from the grid", () => {
    const layout = layoutDiagram(diagram, "wide");
    expect(layout.width).toBe(2 * DIAGRAM_METRICS.wide.cellWidth);
    expect(layout.height).toBe(DIAGRAM_METRICS.wide.cellHeight);
  });

  it("starts and ends connectors outside both boxes", () => {
    const layout = layoutDiagram(diagram, "wide");
    const [a, b] = layout.nodes;
    const [edge] = layout.edges;

    expect(edge.x1).toBeGreaterThan(a.x + DIAGRAM_METRICS.wide.boxWidth);
    expect(edge.x2).toBeLessThan(b.x);
    expect(edge.y1).toBe(a.cy);
  });

  it("drops edges to unknown nodes", () => {
    expect(layoutDiagram(diagram, "wide").edges).toHaveLength(1);
  });

  it("labels connectors only in the wide drawing", () => {
    expect(layoutDiagram(diagram, "wide").edges[0].label?.text).toBe("talks to");
    expect(layoutDiagram(diagram, "narrow").edges[0].label).toBeUndefined();
  });
});
