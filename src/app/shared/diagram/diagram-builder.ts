import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Diagram, DiagramEdge, DiagramNode, DiagramShape, DiagramTone } from './diagram.model';

/**
 * Monta diagramas em uma grade (coluna, linha), evitando coordenadas manuais.
 * Usado pelos diagramas menores, como os dos Engineering Challenges.
 */
export interface GridOptions {
  /** Largura de cada nó */
  nodeWidth?: number;
  /** Distância horizontal entre o início de duas colunas */
  colStep?: number;
  /** Distância vertical entre o início de duas linhas */
  rowStep?: number;
  nodeHeight?: number;
}

export interface GridNode {
  id: string;
  col: number;
  row: number;
  label: string;
  caption?: string;
  summary: string;
  icon: IconName;
  tone?: DiagramTone;
  shape?: DiagramShape;
}

const MARGIN = 12;

export function gridDiagram(
  title: string,
  nodes: GridNode[],
  edges: DiagramEdge[],
  options: GridOptions = {},
): Diagram {
  const { nodeWidth = 150, colStep = 200, rowStep = 96, nodeHeight = 60 } = options;
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  const placed: DiagramNode[] = nodes.map((n) => ({
    id: n.id,
    label: n.label,
    caption: n.caption,
    summary: n.summary,
    icon: ['fas', n.icon],
    tone: n.tone ?? 'accent',
    shape: n.shape,
    x: MARGIN + n.col * colStep,
    y: MARGIN + n.row * rowStep,
    w: nodeWidth,
    h: nodeHeight,
  }));
  return {
    title,
    width: MARGIN * 2 + (cols - 1) * colStep + nodeWidth,
    height: MARGIN * 2 + (rows - 1) * rowStep + nodeHeight,
    nodes: placed,
    edges,
  };
}
