import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface SkillSubgroup {
  label: string;
  skills?: string[];
  description?: string;
}

export interface SkillGroup {
  title: string;
  icon: [IconPrefix, IconName];
  skills?: string[];
  subgroups?: SkillSubgroup[];
  /** Texto complementar exibido abaixo das habilidades */
  note?: string;
}

export const profile = {
  name: 'Joshua Maia Rodrigues',
  role: 'Senior Full-Stack Developer',
  headline: 'Senior Full Stack Developer | Java | Spring Boot | Angular | Software Architecture',
  location: 'Brasília – DF, Brazil',
  languages:
    'Portuguese – native · English – basic/intermediate, with written communication supported by translation tools',
  yearsOfExperience: 16,
  photo: 'assets/joshua.jpg',
  resume: 'assets/Joshua_MaiaRodrigues_Resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/joshuamaia/',
    github: 'https://github.com/joshuamaia',
    website: 'https://joshuamr.com.br',
  },
  summary: [
    'Senior Full Stack Developer with 16 years of experience in software development, working on the analysis, architecture, implementation, integration, and support of corporate systems.',
    'Experience in developing scalable, secure, and efficient solutions, applying software engineering best practices, architectural patterns, and modern technologies.',
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front End',
    icon: ['fas', 'code'],
    subgroups: [
      { label: 'Languages', skills: ['HTML5', 'CSS3', 'Sass/SCSS', 'JavaScript', 'TypeScript'] },
      {
        label: 'Frameworks & libraries',
        skills: ['Angular', 'PrimeNG', 'Angular Material', 'Bootstrap', 'JSF 2', 'PrimeFaces'],
      },
      { label: 'Testing', skills: ['Jasmine', 'Karma'] },
    ],
  },
  {
    title: 'Back End',
    icon: ['fas', 'server'],
    subgroups: [
      { label: 'Language', skills: ['Java'] },
      {
        label: 'Frameworks & technologies',
        skills: ['Spring Boot', 'Spring Data JPA', 'Hibernate', 'JDBC', 'EJB', 'Retrofit'],
      },
      { label: 'APIs & integrations', skills: ['REST', 'SOAP', 'Spring Cloud Netflix'] },
      { label: 'Messaging', skills: ['Apache Kafka', 'RabbitMQ', 'Azure Service Bus'] },
      { label: 'Testing', skills: ['JUnit', 'Mockito'] },
    ],
  },
  {
    title: 'Databases',
    icon: ['fas', 'database'],
    skills: ['Oracle', 'PostgreSQL', 'SQL Server', 'MySQL', 'DB2', 'MongoDB'],
    note: 'Experience with data modeling, SQL queries, persistence, and data integration.',
  },
  {
    title: 'Architecture & Best Practices',
    icon: ['fas', 'layer-group'],
    skills: [
      'Clean Architecture',
      'Hexagonal Architecture',
      'SOLID',
      'Clean Code',
      'Design Patterns',
      'Domain-Driven Design (DDD)',
      'Microservices',
      'Monolithic systems',
      'Event-Driven Architecture',
    ],
  },
  {
    title: 'Process Automation & Reporting',
    icon: ['fas', 'sitemap'],
    subgroups: [
      {
        label: 'Flowable',
        description:
          'Modeling, execution, and orchestration of business processes with BPMN 2.0, integrated with Java and Spring Boot.',
      },
      {
        label: 'Jaspersoft Studio',
        description: 'Development and maintenance of corporate reports with JasperReports.',
      },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: ['fas', 'screwdriver-wrench'],
    skills: ['Git', 'Apache Maven', 'npm', 'Yarn', 'Docker', 'Docker Compose', 'Jira', 'Redmine'],
  },
];
