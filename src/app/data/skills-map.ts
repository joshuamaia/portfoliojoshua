import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Certificate, certificateGroups } from './certificates';
import { Experience, experiences } from './experience';

/*
 * Mapa de competências. As tecnologias listadas aqui precisam existir em
 * profile.ts (skillGroups) ou em experience.ts — um teste garante isso.
 * Não há percentuais de proficiência: os números exibidos são contagens
 * verificáveis (tecnologias, experiências e certificados relacionados).
 */

export type SkillCategoryId =
  | 'backend'
  | 'frontend'
  | 'architecture'
  | 'databases'
  | 'messaging'
  | 'workflow'
  | 'testing'
  | 'devops';

export interface SkillCategory {
  id: SkillCategoryId;
  name: string;
  icon: [IconPrefix, IconName];
  technologies: string[];
  /** Nomes equivalentes usados em experience.ts, considerados ao buscar as experiências */
  aliases?: string[];
  experience: string;
  applications: string[];
  related: SkillCategoryId[];
  /** Trechos de títulos de certificados relacionados */
  certificateKeywords?: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    name: 'Backend Development',
    icon: ['fas', 'server'],
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'JDBC', 'EJB', 'Retrofit'],
    aliases: ['Spring Framework', 'Spring Data', 'Spring Batch', 'JPA', 'MVC'],
    experience:
      'Development and maintenance of enterprise applications, RESTful APIs, integrations and scalable backend solutions.',
    applications: [
      'Developing new features and REST APIs for corporate systems.',
      'Corrective, evolutionary and preventive maintenance of existing applications.',
      'Building server-side applications for public and private sector clients.',
    ],
    related: ['databases', 'messaging', 'architecture', 'testing'],
    certificateKeywords: ['Java'],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: ['fas', 'code'],
    technologies: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Sass/SCSS',
      'PrimeNG',
      'Angular Material',
      'Bootstrap',
      'JSF 2',
      'PrimeFaces',
    ],
    aliases: ['CSS', 'Materialize CSS', 'FormioJS'],
    experience:
      'Building and maintaining user interfaces for corporate web applications, from modern Angular SPAs to JSF and PrimeFaces screens in legacy systems.',
    applications: [
      'Implementing and maintaining user interfaces.',
      'Integrating screens with backend REST APIs.',
      'Unit testing components with Jasmine and Karma.',
    ],
    related: ['backend', 'testing'],
  },
  {
    id: 'architecture',
    name: 'Software Architecture',
    icon: ['fas', 'sitemap'],
    technologies: [
      'Clean Architecture',
      'Hexagonal Architecture',
      'Domain-Driven Design (DDD)',
      'SOLID',
      'Clean Code',
      'Design Patterns',
      'Microservices',
      'Monolithic systems',
      'Event-Driven Architecture',
    ],
    experience:
      'Applying architectural patterns and engineering principles to keep systems maintainable, secure and ready to evolve.',
    applications: [
      'Applying SOLID, Clean Code, Clean Architecture and Hexagonal Architecture in daily development.',
      'Taking part in technical analyses and decisions about architecture and integrations.',
      'Working with both monolithic and microservice-based systems.',
    ],
    related: ['backend', 'messaging', 'workflow'],
    certificateKeywords: ['Architecture', 'Domain Driven', 'SOLID', 'Clean Code'],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: ['fas', 'database'],
    technologies: ['Oracle', 'PostgreSQL', 'SQL Server', 'MySQL', 'DB2', 'MongoDB'],
    aliases: ['SQL', 'Spring Data JPA', 'JPA', 'Hibernate'],
    experience: 'Data modeling, SQL queries, persistence and data integration on relational and NoSQL databases.',
    applications: [
      'Writing and optimizing queries and data manipulation.',
      'Mapping persistence with JPA and Hibernate.',
      'Building reports and data views for analysis.',
    ],
    related: ['backend', 'workflow'],
  },
  {
    id: 'messaging',
    name: 'Messaging & Integration',
    icon: ['fas', 'right-left'],
    technologies: ['Apache Kafka', 'RabbitMQ', 'Azure Service Bus', 'REST', 'SOAP', 'Spring Cloud Netflix', 'Retrofit'],
    aliases: ['REST APIs'],
    experience:
      'Integrating systems through REST and SOAP APIs and asynchronous communication with message brokers.',
    applications: [
      'Developing and maintaining integrations between systems.',
      'Asynchronous communication with messaging.',
      'Consuming external APIs from Java applications.',
    ],
    related: ['backend', 'architecture'],
  },
  {
    id: 'workflow',
    name: 'Workflow Automation',
    icon: ['fas', 'diagram-project'],
    technologies: ['Flowable', 'BPMN 2.0', 'Jaspersoft Studio'],
    experience:
      'Business process automation with BPMN 2.0 and Flowable integrated with Java and Spring Boot, plus corporate reports with JasperReports.',
    applications: [
      'Modeling, executing and orchestrating business processes with BPMN 2.0.',
      'Developing and maintaining corporate reports with JasperReports.',
    ],
    related: ['backend', 'architecture'],
    certificateKeywords: ['BPMN'],
  },
  {
    id: 'testing',
    name: 'Testing & Quality',
    icon: ['fas', 'circle-check'],
    technologies: ['JUnit', 'JUnit 5', 'Mockito', 'Jasmine', 'Karma', 'Cucumber'],
    experience: 'Automated testing and code quality practices on both backend and frontend.',
    applications: [
      'Writing and running unit tests to ensure quality, reliability and maintainability.',
      'Applying development best practices and Clean Code.',
    ],
    related: ['backend', 'frontend', 'architecture'],
  },
  {
    id: 'devops',
    name: 'Cloud & DevOps',
    icon: ['fas', 'cloud'],
    technologies: ['Docker', 'Docker Compose', 'Git', 'Apache Maven', 'npm', 'Yarn'],
    aliases: ['Maven'],
    experience:
      'Containerization, build and dependency management and version control, with AWS and Azure cloud fundamentals certifications.',
    applications: [
      'Version control and dependency management with Git and Maven.',
      'Running applications and their dependencies with Docker and Docker Compose.',
    ],
    related: ['backend', 'architecture'],
    certificateKeywords: ['AWS', 'Azure', 'Docker', 'DevOps'],
  },
];

export function findSkillCategory(id: string | null | undefined): SkillCategory | undefined {
  return skillCategories.find((category) => category.id === id);
}

/**
 * Experiências relacionadas à categoria: as que listam alguma tecnologia (ou alias)
 * da categoria, ou cujas atividades citam uma delas como palavra inteira.
 */
export function experiencesFor(category: SkillCategory, source: Experience[] = experiences): Experience[] {
  const terms = [...category.technologies, ...(category.aliases ?? [])];
  const names = new Set(terms.map(normalize));
  const mentions = terms.map((term) => new RegExp(`(^|[^\\w])${escapeRegExp(term)}(?![\\w])`, 'i'));
  return source.filter(
    (job) =>
      job.technologies.some((tech) => names.has(normalize(tech))) ||
      job.activities.some((activity) => mentions.some((pattern) => pattern.test(activity))),
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Certificados cujo título contém alguma das palavras-chave da categoria */
export function certificatesFor(category: SkillCategory): Certificate[] {
  const keywords = (category.certificateKeywords ?? []).map(normalize);
  if (!keywords.length) return [];
  const seen = new Set<string>();
  return certificateGroups
    .flatMap((group) => group.items)
    .filter((certificate) => keywords.some((keyword) => normalize(certificate.title).includes(keyword)))
    .filter((certificate) => !seen.has(certificate.title) && !!seen.add(certificate.title));
}

/** Posição de um item distribuído em círculo, começando no topo e no sentido horário */
export function radialPosition(index: number, total: number, radius: number, cx: number, cy: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.round((cx + radius * Math.cos(angle)) * 10) / 10,
    y: Math.round((cy + radius * Math.sin(angle)) * 10) / 10,
  };
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}
