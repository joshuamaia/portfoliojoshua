import { DEFAULT_ARCHITECTURE, architectures, compareCriteria, findArchitecture } from './architectures';

describe('architectures data', () => {
  it('offers the four required patterns', () => {
    expect(architectures.map((a) => a.id)).toEqual(['monolith', 'microservices', 'event-driven', 'bpmn']);
    expect(findArchitecture(DEFAULT_ARCHITECTURE)).toBeDefined();
    expect(findArchitecture('unknown')).toBeUndefined();
  });

  for (const architecture of architectures) {
    describe(architecture.name, () => {
      const ids = architecture.diagram.nodes.map((n) => n.id);

      it('has unique node ids', () => {
        expect(new Set(ids).size).toBe(ids.length);
      });

      it('only connects existing nodes', () => {
        for (const edge of architecture.diagram.edges) {
          expect(ids).withContext(`${edge.from} -> ${edge.to}`).toContain(edge.from);
          expect(ids).withContext(`${edge.from} -> ${edge.to}`).toContain(edge.to);
        }
      });

      it('describes every component shown in the diagram', () => {
        for (const id of ids) {
          const detail = architecture.components[id];
          expect(detail).withContext(id).toBeDefined();
          expect(detail.responsibility.length).withContext(id).toBeGreaterThan(0);
          expect(detail.technologies.length).withContext(id).toBeGreaterThan(0);
        }
        expect(Object.keys(architecture.components).sort()).toEqual([...ids].sort());
      });

      it('keeps nodes inside the diagram canvas', () => {
        const { width, height } = architecture.diagram;
        for (const n of architecture.diagram.nodes) {
          expect(n.x >= 0 && n.y >= 0 && n.x + n.w <= width && n.y + n.h <= height)
            .withContext(n.id)
            .toBeTrue();
        }
      });

      it('assesses every comparison criterion', () => {
        for (const criterion of compareCriteria) {
          expect(architecture.assessment[criterion.id]?.tendency).withContext(criterion.id).toBeTruthy();
          expect(architecture.assessment[criterion.id]?.context).withContext(criterion.id).toBeTruthy();
        }
      });
    });
  }
});
