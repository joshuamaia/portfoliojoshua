import { anchor, describeEdge, edgePath, layoutEdges, neighbours, resolveSides } from './diagram-geometry';
import { Diagram, DiagramNode } from './diagram.model';

const node = (id: string, x: number, y: number): DiagramNode => ({
  id,
  label: id.toUpperCase(),
  summary: '',
  icon: ['fas', 'cube'],
  tone: 'accent',
  x,
  y,
  w: 100,
  h: 50,
});

const diagram: Diagram = {
  title: 'Test',
  width: 600,
  height: 400,
  nodes: [node('a', 0, 0), node('b', 300, 0), node('c', 0, 300)],
  edges: [
    { from: 'a', to: 'b', mode: 'sync', label: 'REST' },
    { from: 'a', to: 'c', mode: 'async' },
    { from: 'a', to: 'missing', mode: 'sync' },
  ],
};

describe('diagram geometry', () => {
  it('returns the midpoint of each side', () => {
    const n = node('n', 10, 20);
    expect(anchor(n, 'top')).toEqual({ x: 60, y: 20 });
    expect(anchor(n, 'right')).toEqual({ x: 110, y: 45 });
    expect(anchor(n, 'bottom')).toEqual({ x: 60, y: 70 });
    expect(anchor(n, 'left')).toEqual({ x: 10, y: 45 });
  });

  it('connects horizontally or vertically depending on the dominant gap', () => {
    const [a, b, c] = diagram.nodes;
    expect(resolveSides(a, b)).toEqual(['right', 'left']);
    expect(resolveSides(b, a)).toEqual(['left', 'right']);
    expect(resolveSides(a, c)).toEqual(['bottom', 'top']);
    expect(resolveSides(c, a)).toEqual(['top', 'bottom']);
  });

  it('builds a cubic path that starts and ends at the anchors', () => {
    const path = edgePath({ x: 100, y: 25 }, 'right', { x: 300, y: 25 }, 'left');
    expect(path.startsWith('M 100 25 C')).toBeTrue();
    expect(path.endsWith('300 25')).toBeTrue();
  });

  it('lays out only edges whose nodes exist and honours explicit sides', () => {
    const layouts = layoutEdges({
      ...diagram,
      edges: [...diagram.edges, { from: 'b', to: 'c', mode: 'sync', fromSide: 'bottom', toSide: 'right' }],
    });
    expect(layouts.length).toBe(3);
    expect(layouts[2].path.startsWith('M 350 50')).toBeTrue();
    expect(layouts[2].path.endsWith('100 325')).toBeTrue();
  });

  it('finds the neighbours of a node in both directions', () => {
    expect(Array.from(neighbours(diagram, 'a')).sort()).toEqual(['b', 'c', 'missing']);
    expect(Array.from(neighbours(diagram, 'b'))).toEqual(['a']);
  });

  it('describes connections for the text alternative', () => {
    expect(describeEdge(diagram, diagram.edges[0])).toBe('A → B (synchronous: REST)');
    expect(describeEdge(diagram, diagram.edges[1])).toBe('A → C (asynchronous)');
  });
});
