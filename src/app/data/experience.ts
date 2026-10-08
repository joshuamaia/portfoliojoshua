export interface Experience {
  company: string;
  role?: string;
  client?: string;
  /** Formato YYYY-MM */
  start: string;
  /** Formato YYYY-MM; ausente quando é o trabalho atual */
  end?: string;
  activities: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Freelancer',
    role: 'Senior Full Stack Developer',
    start: '2026-04',
    activities: [
      'Work as a Senior Full Stack Developer in the development, maintenance, and evolution of corporate systems, using both modern and legacy technologies;',
      'Responsible for developing new features, REST APIs, system integrations, messaging, incident resolution, performance optimization, and continuous improvement of applications;',
      'Experience with software architecture, development best practices, automated testing, and relational databases.',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Java EE / Jakarta EE',
      'EJB',
      'Kafka',
      'RabbitMQ',
      'JPA',
      'Hibernate',
      'REST',
      'Oracle',
      'SQL',
      'JUnit',
      'Mockito',
      'Maven',
      'Git',
    ],
  },
  {
    company: 'Spassu',
    role: 'Senior Full Stack Software Engineer',
    client: 'STJ (Superior Tribunal de Justiça)',
    start: '2024-04',
    end: '2026-03',
    activities: [
      'Coordinate and guide software teams;',
      'Responsible for developing effective solutions to code and implement new features;',
      'Maintain and optimize existing systems;',
      'Ensure high performance and compliance with quality standards required by the client;',
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'Jasmine',
      'Karma',
      'Bootstrap',
      'FormioJS',
      'Java',
      'Spring Boot',
      'Spring Batch',
      'Cucumber',
      'JUnit',
      'Mockito',
      'Spring Data',
      'Apache',
      'Lucene',
      'Maven',
      'Git',
    ],
  },
  {
    company: 'Capgemini',
    start: '2023-08',
    end: '2024-01',
    activities: [
      'Develop complete solutions for clients in the financial sector, covering both front end and back end;',
      'Implement and maintain user interfaces;',
      'Develop server-side applications;',
      'Manage data for query optimization and manipulation;',
    ],
    technologies: [
      'TypeScript',
      'Java',
      'JavaScript',
      'SQL',
      'JSON',
      'Angular',
      'Spring Framework',
      'Bootstrap',
      'IntelliJ',
      'Spring Tool Suite (STS)',
      'Apache',
      'Maven',
      'Git',
    ],
  },
  {
    company: 'CODATA',
    start: '2014-09',
    end: '2023-09',
    activities: [
      'Actively participate in the development of projects for the State of Paraíba;',
      'Create advanced technological solutions to meet the specific needs of the client;',
      'Implement user interfaces;',
      'Build robust applications;',
      'Create dynamic reports for data analysis;',
      'Code versioning.',
    ],
    technologies: [
      'Angular',
      'Angular Material',
      'CSS',
      'HTML5',
      'Bootstrap',
      'Materialize CSS',
      'JSF 2',
      'PrimeFaces',
      'Spring Boot',
      'MVC',
      'Hibernate',
      'JPA',
      'Linux',
      'Eclipse',
      'Apache',
      'Maven',
      'Git',
    ],
  },
];

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function parseYearMonth(value: string): { year: number; month: number } {
  const [year, month] = value.split('-').map(Number);
  return { year, month };
}

function formatYearMonth(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod(exp: Experience): string {
  return `${formatYearMonth(exp.start)} — ${exp.end ? formatYearMonth(exp.end) : 'Present'}`;
}

export function formatDuration(exp: Experience, today = new Date()): string {
  const start = parseYearMonth(exp.start);
  const end = exp.end
    ? parseYearMonth(exp.end)
    : { year: today.getFullYear(), month: today.getMonth() + 1 };
  // Conta o mês inicial e o final (abr–mar = 24 meses)
  const total = Math.max(
    1,
    (end.year - start.year) * 12 + (end.month - start.month) + 1,
  );
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}
