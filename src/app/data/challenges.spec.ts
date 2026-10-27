import { findArchitecture } from './architectures';
import { challenges, findChallenge } from './challenges';

describe('challenges data', () => {
  it('provides at least six scenarios with unique ids', () => {
    expect(challenges.length).toBeGreaterThanOrEqual(6);
    expect(new Set(challenges.map((c) => c.id)).size).toBe(challenges.length);
    expect(findChallenge(challenges[0].id)).toBe(challenges[0]);
    expect(findChallenge('nope')).toBeUndefined();
  });

  for (const challenge of challenges) {
    describe(challenge.title, () => {
      it('offers two or three approaches with trade-offs', () => {
        expect(challenge.strategies.length).toBeGreaterThanOrEqual(2);
        expect(challenge.strategies.length).toBeLessThanOrEqual(3);
        for (const s of challenge.strategies) {
          expect(s.advantages.length).withContext(s.id).toBeGreaterThan(0);
          expect(s.limitations.length).withContext(s.id).toBeGreaterThan(0);
          expect(s.risks.length).withContext(s.id).toBeGreaterThan(0);
          expect(s.bestWhen).withContext(s.id).toBeTruthy();
        }
      });

      it('points the reference solution to one of its approaches', () => {
        expect(challenge.strategies.map((s) => s.id)).toContain(challenge.reference.strategyId);
        expect(challenge.reference.rationale.length).toBeGreaterThan(0);
      });

      it('has diagrams whose connections reference existing nodes', () => {
        for (const s of challenge.strategies) {
          const ids = s.diagram.nodes.map((n) => n.id);
          expect(new Set(ids).size).withContext(s.id).toBe(ids.length);
          for (const edge of s.diagram.edges) {
            expect(ids).withContext(`${s.id}: ${edge.from}`).toContain(edge.from);
            expect(ids).withContext(`${s.id}: ${edge.to}`).toContain(edge.to);
          }
        }
      });

      it('links to an existing architecture when it declares one', () => {
        if (challenge.relatedArchitecture) {
          expect(findArchitecture(challenge.relatedArchitecture)).toBeDefined();
        }
      });
    });
  }
});
