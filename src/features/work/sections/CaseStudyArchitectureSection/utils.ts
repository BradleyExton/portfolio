import type { CaseStudyDiagram } from "@/copy/caseStudies";

type Connection = {
  key: string;
  route: string;
  label?: string;
};

/* Plain-text version of the diagram's connectors, shown under the phone
   drawing in place of the labels the narrow layout has no room for. Hidden
   from assistive tech, which already gets the full picture from the SVG's
   title and description. */
export const describeConnections = (diagram: CaseStudyDiagram): Connection[] => {
  const labelFor = new Map(diagram.nodes.map((node) => [node.id, node.label]));

  return diagram.edges.map((edge) => ({
    key: `${edge.from}-${edge.to}`,
    route: `${labelFor.get(edge.from) ?? edge.from} ${edge.twoWay ? "↔" : "→"} ${labelFor.get(edge.to) ?? edge.to}`,
    label: edge.label,
  }));
};
