import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/copy/caseStudies";

const publicPath = (src: string) => join(process.cwd(), "public", src);

describe("case studies", () => {
  it("uses unique slugs", () => {
    const slugs = caseStudies.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(caseStudies)("$slug points at screenshots that exist", (study) => {
    for (const shot of [study.cover, ...study.gallery]) {
      expect(existsSync(publicPath(shot.src)), shot.src).toBe(true);
      expect(shot.alt.length).toBeGreaterThan(20);
    }
  });

  it.each(caseStudies)("$slug diagram edges join nodes it declares", (study) => {
    const { nodes, edges, wideGrid, narrowGrid } = study.architecture.diagram;
    const ids = new Set(nodes.map((node) => node.id));

    for (const edge of edges) {
      expect(ids.has(edge.from), edge.from).toBe(true);
      expect(ids.has(edge.to), edge.to).toBe(true);
    }
    for (const node of nodes) {
      expect(node.wide.col).toBeLessThan(wideGrid.cols);
      expect(node.wide.row).toBeLessThan(wideGrid.rows);
      expect(node.narrow.col).toBeLessThan(narrowGrid.cols);
      expect(node.narrow.row).toBeLessThan(narrowGrid.rows);
    }
  });

  it("walks to the next study and wraps at the end", () => {
    const [first, second] = caseStudies;
    const last = caseStudies[caseStudies.length - 1];

    expect(getNextCaseStudy(first.slug).slug).toBe(second.slug);
    expect(getNextCaseStudy(last.slug).slug).toBe(first.slug);
    expect(getCaseStudy("not-a-study")).toBeUndefined();
  });
});
