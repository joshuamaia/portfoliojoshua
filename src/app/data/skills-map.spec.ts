import { Experience, experiences } from './experience';
import { skillGroups } from './profile';
import { certificatesFor, experiencesFor, findSkillCategory, radialPosition, skillCategories } from './skills-map';

/** Todos os nomes de tecnologias que o portfólio já declara */
function knownNames(): Set<string> {
  const names = new Set<string>();
  for (const group of skillGroups) {
    group.skills?.forEach((skill) => names.add(skill));
    for (const sub of group.subgroups ?? []) {
      sub.skills?.forEach((skill) => names.add(skill));
      if (sub.description) names.add(sub.label);
    }
  }
  experiences.forEach((job) => job.technologies.forEach((tech) => names.add(tech)));
  return names;
}

const job = (technologies: string[], activities: string[] = []): Experience => ({
  company: 'Test',
  start: '2020-01',
  technologies,
  activities,
});

describe('skills map data', () => {
  it('covers the eight requested categories', () => {
    expect(skillCategories.map((c) => c.name)).toEqual([
      'Backend Development',
      'Frontend Development',
      'Software Architecture',
      'Databases',
      'Messaging & Integration',
      'Workflow Automation',
      'Testing & Quality',
      'Cloud & DevOps',
    ]);
  });

  it('only lists technologies already declared in the portfolio data', () => {
    const known = knownNames();
    for (const category of skillCategories) {
      for (const tech of category.technologies) {
        expect(known.has(tech)).withContext(`${category.id}: ${tech}`).toBeTrue();
      }
    }
  });

  it('references existing related categories', () => {
    for (const category of skillCategories) {
      for (const id of category.related) {
        expect(findSkillCategory(id)).withContext(`${category.id} -> ${id}`).toBeDefined();
      }
    }
  });

  it('finds roles by listed technologies or by whole-word mentions in activities', () => {
    const backend = findSkillCategory('backend')!;
    const architecture = findSkillCategory('architecture')!;
    expect(experiencesFor(backend, [job(['Java'])]).length).toBe(1);
    expect(experiencesFor(backend, [job(['JavaScript'], ['Built JavaScript widgets'])]).length).toBe(0);
    expect(experiencesFor(architecture, [job([], ['Apply SOLID principles and Clean Code.'])]).length).toBe(1);
  });

  it('relates certificates by keyword without duplicates', () => {
    const titles = certificatesFor(findSkillCategory('devops')!).map((c) => c.title);
    expect(titles).toContain('AWS Certified Cloud Practitioner (CLF-C02)');
    expect(titles).toContain('Docker');
    expect(new Set(titles).size).toBe(titles.length);
    expect(certificatesFor(findSkillCategory('frontend')!)).toEqual([]);
  });

  it('distributes points clockwise starting at the top', () => {
    expect(radialPosition(0, 4, 100, 200, 200)).toEqual({ x: 200, y: 100 });
    expect(radialPosition(1, 4, 100, 200, 200)).toEqual({ x: 300, y: 200 });
    expect(radialPosition(2, 4, 100, 200, 200)).toEqual({ x: 200, y: 300 });
  });
});
