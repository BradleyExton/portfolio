import type { CaseStudyDiagram } from "@/copy/caseStudies";
import { cn } from "@/features/shared/designSystem";
import type { DiagramVariant } from "./types";
import { layoutDiagram } from "./utils";
import * as styles from "./styles";

type ArchitectureDiagramProps = {
  diagram: CaseStudyDiagram;
  variant: DiagramVariant;
  className?: string;
};

const LABEL_BACKPLATE_HEIGHT = 20;

/* Boxes and labelled connectors drawn from the study's grid coordinates.
   Colors come from token utility classes on each element, so the drawing
   follows the site palette without any hex values here. */
export function ArchitectureDiagram({ diagram, variant, className }: ArchitectureDiagramProps) {
  const layout = layoutDiagram(diagram, variant);
  const { metrics } = layout;
  const idBase = `architecture-${variant}`;
  const arrowId = `${idBase}-arrow`;
  const titleId = `${idBase}-title`;
  const descId = `${idBase}-desc`;

  return (
    <svg
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={cn(styles.svg, className)}
    >
      <title id={titleId}>{diagram.title}</title>
      <desc id={descId}>{diagram.description}</desc>

      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className={styles.arrowHead} />
        </marker>
      </defs>

      <g>
        {layout.edges.map((edge) => (
          <line
            key={edge.key}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            className={styles.edge}
            markerEnd={`url(#${arrowId})`}
            markerStart={edge.twoWay ? `url(#${arrowId})` : undefined}
          />
        ))}
      </g>

      <g>
        {layout.nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={metrics.boxWidth}
              height={metrics.boxHeight}
              rx={12}
              className={node.emphasis ? styles.nodeEmphasis : styles.node}
            />
            <text
              x={node.cx}
              y={node.detail ? node.cy - 4 : node.cy + metrics.labelSize * 0.35}
              textAnchor="middle"
              fontSize={metrics.labelSize}
              className={styles.nodeLabel}
            >
              {node.label}
            </text>
            {node.detail ? (
              <text
                x={node.cx}
                y={node.cy + metrics.detailSize + 3}
                textAnchor="middle"
                fontSize={metrics.detailSize}
                className={styles.nodeDetail}
              >
                {node.detail}
              </text>
            ) : null}
          </g>
        ))}
      </g>

      {/* Edge labels last so their backplates sit over any line they cross. */}
      <g>
        {layout.edges.map((edge) =>
          edge.label ? (
            <g key={`${edge.key}-label`}>
              <rect
                x={edge.label.x - edge.label.width / 2}
                y={edge.label.y - LABEL_BACKPLATE_HEIGHT / 2}
                width={edge.label.width}
                height={LABEL_BACKPLATE_HEIGHT}
                rx={LABEL_BACKPLATE_HEIGHT / 2}
                className={styles.edgeLabelPlate}
              />
              <text
                x={edge.label.x}
                y={edge.label.y + metrics.edgeLabelSize * 0.35}
                textAnchor="middle"
                fontSize={metrics.edgeLabelSize}
                className={styles.edgeLabel}
              >
                {edge.label.text}
              </text>
            </g>
          ) : null,
        )}
      </g>
    </svg>
  );
}
