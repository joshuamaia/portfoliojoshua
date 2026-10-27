import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

/*
 * Perfis do Tailored Resume. Cada perfil apenas reordena e destaca dados que já
 * existem no portfólio; nada aqui altera cargos, períodos ou empresas.
 *
 * Um tema de foco só aparece no currículo quando algum dos seus termos existe
 * nos dados (profile.ts / experience.ts). Os temas sem dados ficam listados por
 * missingFocus() — para exibi-los, cadastre a tecnologia em profile.ts.
 */

export type ResumeProfileId = 'backend' | 'frontend' | 'fullstack';

export interface FocusArea {
  label: string;
  /** Tecnologias que comprovam o tema */
  terms: string[];
}

export interface ResumeProfile {
  id: ResumeProfileId;
  name: string;
  icon: [IconPrefix, IconName];
  description: string;
  /** Título exibido no cabeçalho do PDF, ao lado do cargo */
  focusTitle: string;
  focus: FocusArea[];
  /** Ordem dos grupos de habilidades (títulos de skillGroups) */
  skillOrder: string[];
  /** Tecnologias priorizadas na ordenação e usadas para medir a relevância das experiências */
  keywords: string[];
  fileSuffix: string;
}

const REST = { label: 'REST APIs', terms: ['REST', 'REST APIs'] };
const ARCHITECTURE = {
  label: 'Software Architecture',
  terms: ['Clean Architecture', 'Hexagonal Architecture', 'Microservices', 'Domain-Driven Design (DDD)'],
};
const DATABASES = { label: 'Databases', terms: ['Oracle', 'PostgreSQL', 'SQL Server', 'MySQL', 'DB2', 'MongoDB'] };
const MESSAGING = { label: 'Messaging', terms: ['Apache Kafka', 'RabbitMQ', 'Azure Service Bus'] };

export const resumeProfiles: ResumeProfile[] = [
  {
    id: 'backend',
    name: 'Backend Java',
    icon: ['fab', 'java'],
    description: 'Focused on Java, Spring Boot, APIs, architecture, databases and messaging.',
    focusTitle: 'Backend Java',
    focus: [
      { label: 'Java', terms: ['Java'] },
      { label: 'Spring Boot', terms: ['Spring Boot'] },
      REST,
      ARCHITECTURE,
      DATABASES,
      MESSAGING,
      { label: 'Automated Testing', terms: ['JUnit', 'JUnit 5', 'Mockito'] },
    ],
    skillOrder: [
      'Back End',
      'Architecture & Best Practices',
      'Databases',
      'Process Automation & Reporting',
      'Tools & DevOps',
      'Front End',
    ],
    keywords: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'Spring Data',
      'Spring Framework',
      'Spring Batch',
      'Hibernate',
      'JPA',
      'JDBC',
      'EJB',
      'REST',
      'REST APIs',
      'SOAP',
      'Apache Kafka',
      'RabbitMQ',
      'Azure Service Bus',
      'Oracle',
      'PostgreSQL',
      'SQL',
      'SQL Server',
      'MongoDB',
      'JUnit',
      'JUnit 5',
      'Mockito',
      'Flowable',
      'BPMN 2.0',
      'Maven',
    ],
    fileSuffix: 'Backend_Java',
  },
  {
    id: 'frontend',
    name: 'Frontend Angular',
    icon: ['fas', 'code'],
    description: 'Focused on Angular, TypeScript, component-based interfaces and frontend testing.',
    focusTitle: 'Frontend Angular',
    focus: [
      { label: 'Angular', terms: ['Angular'] },
      { label: 'TypeScript', terms: ['TypeScript'] },
      { label: 'RxJS', terms: ['RxJS'] },
      { label: 'Reactive Forms', terms: ['Reactive Forms'] },
      { label: 'Component Architecture', terms: ['Component Architecture'] },
      { label: 'Frontend Testing', terms: ['Jasmine', 'Karma'] },
    ],
    skillOrder: [
      'Front End',
      'Architecture & Best Practices',
      'Tools & DevOps',
      'Back End',
      'Databases',
      'Process Automation & Reporting',
    ],
    keywords: [
      'Angular',
      'Angular Material',
      'PrimeNG',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS',
      'CSS3',
      'Sass/SCSS',
      'Bootstrap',
      'Materialize CSS',
      'FormioJS',
      'JSF 2',
      'PrimeFaces',
      'Jasmine',
      'Karma',
      'RxJS',
    ],
    fileSuffix: 'Frontend_Angular',
  },
  {
    id: 'fullstack',
    name: 'Full Stack Engineering',
    icon: ['fas', 'layer-group'],
    description: 'Balanced view of backend, frontend, integration, architecture and data.',
    focusTitle: 'Full Stack Engineering',
    focus: [
      { label: 'Java', terms: ['Java'] },
      { label: 'Spring Boot', terms: ['Spring Boot'] },
      { label: 'Angular', terms: ['Angular'] },
      { label: 'System Integration', terms: ['REST', 'REST APIs', 'SOAP', 'Apache Kafka', 'RabbitMQ'] },
      ARCHITECTURE,
      DATABASES,
      MESSAGING,
    ],
    skillOrder: [
      'Back End',
      'Front End',
      'Architecture & Best Practices',
      'Databases',
      'Process Automation & Reporting',
      'Tools & DevOps',
    ],
    keywords: [
      'Java',
      'Spring Boot',
      'Angular',
      'TypeScript',
      'REST',
      'REST APIs',
      'Apache Kafka',
      'RabbitMQ',
      'Hibernate',
      'JPA',
      'Spring Data JPA',
      'Oracle',
      'PostgreSQL',
      'SQL',
      'JUnit',
      'Jasmine',
    ],
    fileSuffix: 'Full_Stack',
  },
];

export function findResumeProfile(id: string | null | undefined): ResumeProfile | undefined {
  return resumeProfiles.find((profile) => profile.id === id);
}
