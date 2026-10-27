import { certificateGroups } from '../../data/certificates';
import { degrees } from '../../data/education';
import { Experience, experiences, formatPeriod } from '../../data/experience';
import { profile, skillGroups } from '../../data/profile';
import { ResumeProfile } from '../../data/resume-profiles';

/**
 * Monta a versão direcionada do currículo a partir dos dados do portfólio.
 * Só reordena e destaca: empresas, cargos, períodos e atividades são copiados como estão.
 */

export type Relevance = 'high' | 'medium' | 'low';

export interface TailoredSkillGroup {
  title: string;
  /** Habilidades do grupo, com as priorizadas pelo perfil primeiro */
  items: string[];
  highlighted: string[];
}

export interface TailoredExperience {
  company: string;
  role?: string;
  client?: string;
  period: string;
  relevance: Relevance;
  matched: string[];
  activities: string[];
  technologies: string[];
}

export interface TailoredResume {
  profileId: string;
  fileName: string;
  name: string;
  title: string;
  headline: string;
  location: string;
  languages: string;
  links: { label: string; url: string }[];
  summary: string[];
  focus: string[];
  skills: TailoredSkillGroup[];
  experience: TailoredExperience[];
  education: { title: string; institution?: string; inProgress: boolean }[];
  certificates: string[];
}

/** Todos os nomes de habilidades e tecnologias declarados no portfólio */
export function knownTechnologies(): Set<string> {
  const names = new Set<string>();
  for (const group of skillGroups) {
    group.skills?.forEach((skill) => names.add(normalize(skill)));
    group.subgroups?.forEach((sub) => {
      sub.skills?.forEach((skill) => names.add(normalize(skill)));
      if (sub.description) names.add(normalize(sub.label));
    });
  }
  experiences.forEach((job) => job.technologies.forEach((tech) => names.add(normalize(tech))));
  return names;
}

/** Temas de foco do perfil que ainda não têm dados no portfólio */
export function missingFocus(resumeProfile: ResumeProfile): string[] {
  const known = knownTechnologies();
  return resumeProfile.focus
    .filter((area) => !area.terms.some((term) => known.has(normalize(term))))
    .map((area) => area.label);
}

export function experienceRelevance(job: Experience, resumeProfile: ResumeProfile): { relevance: Relevance; matched: string[] } {
  const keywords = new Set(resumeProfile.keywords.map(normalize));
  const matched = job.technologies.filter((tech) => keywords.has(normalize(tech)));
  const relevance: Relevance = matched.length >= 4 ? 'high' : matched.length >= 1 ? 'medium' : 'low';
  return { relevance, matched };
}

export function buildTailoredResume(resumeProfile: ResumeProfile): TailoredResume {
  const keywords = new Set(resumeProfile.keywords.map(normalize));
  const priority = (items: string[]) => [
    ...items.filter((item) => keywords.has(normalize(item))),
    ...items.filter((item) => !keywords.has(normalize(item))),
  ];

  const order = (title: string) => {
    const index = resumeProfile.skillOrder.indexOf(title);
    return index < 0 ? Number.MAX_SAFE_INTEGER : index;
  };

  const skills = [...skillGroups]
    .sort((a, b) => order(a.title) - order(b.title))
    .map((group) => {
      const items = [
        ...(group.skills ?? []),
        ...(group.subgroups ?? []).flatMap((sub) => sub.skills ?? (sub.description ? [sub.label] : [])),
      ];
      return {
        title: group.title,
        items: priority(items),
        highlighted: items.filter((item) => keywords.has(normalize(item))),
      };
    });

  const missing = new Set(missingFocus(resumeProfile));

  return {
    profileId: resumeProfile.id,
    fileName: `Joshua_MaiaRodrigues_Resume_${resumeProfile.fileSuffix}.pdf`,
    name: profile.name,
    title: profile.role,
    headline: profile.headline,
    location: profile.location,
    languages: profile.languages,
    links: [
      { label: 'LinkedIn', url: profile.links.linkedin },
      { label: 'GitHub', url: profile.links.github },
      { label: 'Portfolio', url: profile.links.website },
    ],
    summary: [...profile.summary],
    focus: resumeProfile.focus.filter((area) => !missing.has(area.label)).map((area) => area.label),
    skills,
    experience: experiences.map((job) => {
      const { relevance, matched } = experienceRelevance(job, resumeProfile);
      return {
        company: job.company,
        role: job.role,
        client: job.client,
        period: formatPeriod(job),
        relevance,
        matched,
        activities: [...job.activities],
        technologies: priority(job.technologies),
      };
    }),
    education: degrees.map((degree) => ({
      title: degree.title,
      institution: degree.institution,
      inProgress: !!degree.inProgress,
    })),
    certificates: [...new Set(certificateGroups.flatMap((group) => group.items.map((item) => item.title)))],
  };
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}
