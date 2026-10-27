import { Diagram, DiagramEdge, DiagramNode, DiagramSide } from './diagram.model';

export interface Point {
  x: number;
  y: number;
}

/** Conexão já resolvida, pronta para ser desenhada no SVG. */
export interface EdgeLayout {
  key: string;
  edge: DiagramEdge;
  path: string;
  labelAt: Point;
}

const NORMALS: Record<DiagramSide, Point> = {
  top: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

export function center(node: DiagramNode): Point {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

/** Ponto médio do lado indicado do nó. */
export function anchor(node: DiagramNode, side: DiagramSide): Point {
  switch (side) {
    case 'top':
      return { x: node.x + node.w / 2, y: node.y };
    case 'bottom':
      return { x: node.x + node.w / 2, y: node.y + node.h };
    case 'left':
      return { x: node.x, y: node.y + node.h / 2 };
    case 'right':
      return { x: node.x + node.w, y: node.y + node.h / 2 };
  }
}

/**
 * Escolhe os lados de saída e de chegada pela posição relativa dos nós:
 * predomina o eixo com maior distância entre as bordas.
 */
export function resolveSides(from: DiagramNode, to: DiagramNode): [DiagramSide, DiagramSide] {
  const gapX = Math.max(to.x - (from.x + from.w), from.x - (to.x + to.w));
  const gapY = Math.max(to.y - (from.y + from.h), from.y - (to.y + to.h));
  const a = center(from);
  const b = center(to);
  if (gapX >= gapY) {
    return b.x >= a.x ? ['right', 'left'] : ['left', 'right'];
  }
  return b.y >= a.y ? ['bottom', 'top'] : ['top', 'bottom'];
}

/**
 * Pontos de controle de uma curva que sai e chega perpendicular aos lados dos nós.
 * A "força" de cada ponta usa só a distância no eixo do lado, para a curva não
 * avançar além do destino e invadir nós vizinhos.
 */
function controls(start: Point, startSide: DiagramSide, end: Point, endSide: DiagramSide): [Point, Point] {
  const pull = (side: DiagramSide) =>
    Math.max(20, 0.5 * (side === 'top' || side === 'bottom' ? Math.abs(end.y - start.y) : Math.abs(end.x - start.x)));
  const n1 = NORMALS[startSide];
  const n2 = NORMALS[endSide];
  const p1 = pull(startSide);
  const p2 = pull(endSide);
  return [
    { x: start.x + n1.x * p1, y: start.y + n1.y * p1 },
    { x: end.x + n2.x * p2, y: end.y + n2.y * p2 },
  ];
}

export function edgePath(start: Point, startSide: DiagramSide, end: Point, endSide: DiagramSide): string {
  const [c1, c2] = controls(start, startSide, end, endSide);
  return `M ${r(start.x)} ${r(start.y)} C ${r(c1.x)} ${r(c1.y)}, ${r(c2.x)} ${r(c2.y)}, ${r(end.x)} ${r(end.y)}`;
}

/** Ponto da curva em t = 0,5, usado para posicionar o rótulo. */
export function curveMidpoint(start: Point, startSide: DiagramSide, end: Point, endSide: DiagramSide): Point {
  const [c1, c2] = controls(start, startSide, end, endSide);
  return {
    x: r((start.x + 3 * c1.x + 3 * c2.x + end.x) / 8),
    y: r((start.y + 3 * c1.y + 3 * c2.y + end.y) / 8),
  };
}

export function layoutEdges(diagram: Diagram): EdgeLayout[] {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  return diagram.edges.flatMap((edge, index) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) return [];
    const [autoFrom, autoTo] = resolveSides(from, to);
    const fromSide = edge.fromSide ?? autoFrom;
    const toSide = edge.toSide ?? autoTo;
    const start = anchor(from, fromSide);
    const end = anchor(to, toSide);
    return [
      {
        key: `${edge.from}->${edge.to}#${index}`,
        edge,
        path: edgePath(start, fromSide, end, toSide),
        labelAt: curveMidpoint(start, fromSide, end, toSide),
      },
    ];
  });
}

/** Ids dos nós ligados diretamente ao nó informado. */
export function neighbours(diagram: Diagram, nodeId: string): Set<string> {
  const ids = new Set<string>();
  for (const edge of diagram.edges) {
    if (edge.from === nodeId) ids.add(edge.to);
    if (edge.to === nodeId) ids.add(edge.from);
  }
  return ids;
}

/** Descrição textual de uma conexão, usada na alternativa acessível. */
export function describeEdge(diagram: Diagram, edge: DiagramEdge): string {
  const label = (id: string) => diagram.nodes.find((node) => node.id === id)?.label ?? id;
  const mode = edge.mode === 'async' ? 'asynchronous' : 'synchronous';
  return `${label(edge.from)} → ${label(edge.to)} (${mode}${edge.label ? `: ${edge.label}` : ''})`;
}

function r(value: number): number {
  return Math.round(value * 10) / 10;
}
