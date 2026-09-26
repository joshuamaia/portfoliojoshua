import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface SkillGroup {
  title: string;
  icon: [IconPrefix, IconName];
  skills: string[];
}

export const profile = {
  name: 'Joshua Maia Rodrigues',
  role: 'Software Architect / Senior Full-Stack Developer',
  location: 'Brasília, Distrito Federal',
  languages: 'English - basic/intermediate level',
  yearsOfExperience: 16,
  photo: 'assets/joshua.jpg',
  resume: 'assets/Joshua_MaiaRodrigues_Resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/joshuamaia/',
    github: 'https://github.com/joshuamaia',
    website: 'https://joshuamr.com.br',
  },
  summary:
    'Software developer with 16 years of experience, specialized in a wide range of technologies. ' +
    'With advanced skills in Front End and Back End development, I have a proven track record of ' +
    'creating efficient and robust solutions for information systems.',
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front End',
    icon: ['fas', 'code'],
    skills: [
      'Angular 18',
      'PrimeNG 17',
      'Angular Material 12',
      'Bootstrap 5',
      'HTML',
      'CSS',
      'SASS/SCSS',
      'TypeScript',
      'JavaScript',
      'JSF 2',
      'PrimeFaces',
      'Jasmine',
      'Karma',
    ],
  },
  {
    title: 'Back End',
    icon: ['fas', 'server'],
    skills: [
      'Java',
      'Spring Boot',
      'JDBC',
      'JPA',
      'Hibernate',
      'RabbitMQ',
      'Apache Kafka',
      'Azure Service Bus',
      'Retrofit',
      'REST APIs',
      'System integration',
      'JUnit',
      'Mockito',
    ],
  },
  {
    title: 'Databases',
    icon: ['fas', 'database'],
    skills: ['MongoDB', 'MySQL', 'SQL Server', 'DB2', 'PostgreSQL'],
  },
  {
    title: 'Architecture & Methodologies',
    icon: ['fas', 'layer-group'],
    skills: [
      'Clean Architecture',
      'Hexagonal Architecture',
      'Clean Code',
      'SOLID',
      'RESTful Web Services',
      'SOAP',
      'Spring Cloud Netflix',
    ],
  },
  {
    title: 'Tools',
    icon: ['fas', 'screwdriver-wrench'],
    skills: ['Git', 'Apache Maven', 'Yarn', 'npm', 'Docker', 'Docker Compose'],
  },
  {
    title: 'Project Management',
    icon: ['fas', 'list-check'],
    skills: ['Jaspersoft Studio', 'Redmine', 'Jira'],
  },
];
