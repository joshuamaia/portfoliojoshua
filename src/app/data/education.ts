export interface Degree {
  title: string;
  institution?: string;
  inProgress?: boolean;
  /** Programas atuais/recentes, exibidos no primeiro bloco */
  featured?: boolean;
  description?: string;
  bullets?: string[];
}

export interface Course {
  title: string;
  image: string;
  description: string;
}

export const degrees: Degree[] = [
  {
    title: 'Applied AI Engineering Postgraduate Course',
    featured: true,
    description:
      'Learn how to integrate advanced AI models into real systems—and become the programmer who makes a direct impact on the business.',
  },
  {
    title: 'Postgraduate Java Elite',
    featured: true,
    description:
      'In Postgraduate Java Elite we break this problem into several small parts. You learn from solid Java fundamentals, modern architectures such as microservices, containers and automated tests…',
  },
  {
    title: 'MBA in Postgraduate Studies in Artificial Intelligence and Strategic Management for Leaders',
    inProgress: true,
    featured: true,
    bullets: [
      'Manage and retain technology talent, leading diverse teams;',
      'Manage culture and planning focused on technology;',
      'Build trust through high-impact communication;',
      'Use AI and data for strategic decisions and innovation.',
    ],
  },
  {
    title: 'MBA in Software Engineering with AI',
    institution: 'Full Cycle',
    inProgress: true,
    featured: true,
    description:
      'AI has changed the way we develop software. In many cases, code has become just an implementation detail. What really matters now is who pilots. Those who know how to use AI to be more productive, solve problems faster and make better decisions while developing.',
  },
  {
    title: 'Postgraduate Go Expert',
    institution: 'Full Cycle',
    inProgress: true,
    featured: true,
    description:
      'Reach the next level in programming with the postgraduate course in Go Lang. Learn in a practical and in-depth way about the Go programming language, its best practices and real applications.',
  },
  {
    title: 'MBA in Full Cycle Architecture',
    institution: 'Full Cycle',
    description:
      'The Full Cycle Architecture MBA is a complete training, recognized by MEC, which will work on the main skills that a developer needs to be able to lead, architect and deliver large-scale projects for large companies and have one of the best paid and most desired profiles in the market.',
  },
  {
    title: 'Postgraduate in Technical Leadership',
    institution: 'Full Cycle',
    description:
      'Our Technical Leadership Postgraduate program is the perfect track for those who want to be at the forefront of the technological scene, we combine cutting-edge technical skills with strategic leadership expertise, preparing you to face the most complex challenges with confidence and innovation.',
  },
  {
    title: 'MBA - Full Stack Web Development',
    institution: 'Uniesp',
    bullets: [
      'Foster the national and international IT ecosystem, training differentiated professionals who can become collaborators of the main IT companies in the world, in addition to having a project especially articulated with the local IT ecosystem;',
      'Train entrepreneurial professionals who think of Software as a product and know how to raise resources to transform an idea into a business;',
      'Offer practices with the main Technologies and Front-end Frameworks;',
      'Offer practices with the main Technologies and Back-end Frameworks;',
      'Offer practices with the main technologies in the area of DevOps, Software Testing and Cloud Computing;',
      'Discuss the main open research problems in the area of Web Systems Development.',
    ],
  },
  { title: 'Specialist in Software Engineering', institution: 'Estácio' },
  { title: 'Technologist in Systems Analysis and Development', institution: 'Uniespe' },
  { title: 'Full Degree in Mathematics', institution: 'UFCG' },
];

export const courses: Course[] = [
  {
    title: 'Bootcamp - React Developer',
    image: 'assets/BootcampReact.png',
    description:
      'Learn to work with Front-End application development, using one of the main programming languages today, JavaScript, and one of the main tools on the market, React.',
  },
  {
    title: 'Bootcamp - Front End Developer',
    image: 'assets/BootcampDesenvolvedorFrontEnd.png',
    description:
      'The Bootcamp aims to present fundamental concepts about Front-End development and guide the student to practice coding using two main Front-End development tools in the market (Angular and Vue).',
  },
  {
    title: 'Bootcamp - Fixed Income Data Scientist',
    image: 'assets/BootcampCientistaDeDados.png',
    description:
      'We combine our expertise in finance with technology in this unique bootcamp in Brazil. Learn from those who revolutionized the financial market and will also revolutionize your career. Solve real problems in the financial world with Data Science techniques.',
  },
  {
    title: 'GoStack 11 - Rocketseat',
    image: 'assets/certificadoJoshuaRocketseat.png',
    description:
      'GoStack is an online, practical and intensive training, in the format of bootcamp. In GoStack the student goes deep into NodeJS, ReactJS and React Native technologies, and the entire ecosystem around these tools, from zero to deploy. Including automated tests, continuous integration, publication in stores, and all the important libraries and frameworks for those who want to be ready for real-world challenges and stand out in the job market.',
  },
  {
    title: 'Bootcamp Certificate - Full Stack',
    image: 'assets/certificadoFullStackIGTI.png',
    description:
      'Bootcamp where you will learn application construction techniques going through all its logical layers - backend with Node, frontend with React, NoSQL data persistence, code versioning control with Git and cloud deployment - enabling you to work professionally in the area.',
  },
];
