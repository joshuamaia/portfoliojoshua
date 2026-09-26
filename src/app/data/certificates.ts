import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface Certificate {
  title: string;
  meta?: string;
  image: string;
}

export interface CertificateGroup {
  title: string;
  icon: [IconPrefix, IconName];
  items: Certificate[];
}

export const certificateGroups: CertificateGroup[] = [
  {
    title: 'Java',
    icon: ['fab', 'java'],
    items: [
      {
        title: 'Oracle Certified Professional, Java EE 7 Application Developer',
        meta: '2024',
        image: 'assets/joshuaJavaEE7.png',
      },
      {
        title: 'Sun Certified Java Programmer 1.5',
        meta: '2007',
        image: 'assets/certificacaoJavaJoshua.jpg',
      },
    ],
  },
  {
    title: 'Cloud Certifications',
    icon: ['fas', 'cloud'],
    items: [
      {
        title: 'AWS Certified Cloud Practitioner (CLF-C02)',
        meta: '29/11/2023 - 29/11/2026',
        image: 'assets/awsCloudPractitioner.jpeg',
      },
      {
        title: 'Microsoft Certified: Azure Fundamentals',
        image: 'assets/certificacaoAZ900.png',
      },
    ],
  },
  {
    title: 'Software Architecture',
    icon: ['fas', 'sitemap'],
    items: [
      {
        title: 'Clean Code e Clean Architecture',
        meta: 'Rodrigo Branas',
        image: 'assets/cleanCodeECleanArchitecture.jpg',
      },
      { title: 'BPMN', image: 'assets/bpmnJoshua.jpg' },
      {
        title: 'Incremental and Scalable Architectures',
        meta: '2022 · Coffee and it',
        image: 'assets/Arquiteturasincrementais.jpg',
      },
      {
        title: 'Clean Architecture',
        meta: '2022 · Full Cycle',
        image: 'assets/CleanArchitecture.png',
      },
      {
        title: 'Domain Driven Design',
        meta: '2022 · Full Cycle',
        image: 'assets/DDD.png',
      },
      { title: 'SOLID', meta: '2022 · Full Cycle', image: 'assets/SOLID.png' },
      {
        title: 'Architecture Fundamentals',
        meta: '2022 · Full Cycle',
        image: 'assets/FundamentosArquitetura.png',
      },
    ],
  },
  {
    title: 'Scrum',
    icon: ['fas', 'arrows-spin'],
    items: [
      {
        title: 'Scrum Foundation Professional Certificate',
        meta: '2024 · CertiProf',
        image: 'assets/certificadoScrumCertiProf2024.png',
      },
      {
        title: 'Scrum Fundamentals Certified',
        meta: '2020 · SCRUMStudy',
        image: 'assets/certificadoScrumStudy.jpg',
      },
      {
        title: 'Scrum Foundation Professional Certificate',
        meta: '2020 · CertiProf',
        image: 'assets/certificadoScrumCertiProf.jpg',
      },
    ],
  },
  {
    title: 'DevOps',
    icon: ['fas', 'infinity'],
    items: [
      { title: 'Docker', meta: '2022 · Full Cycle', image: 'assets/docker.png' },
      {
        title: 'DevOps Essentials Professional Certificate',
        meta: '2020 · CertiProf',
        image: 'assets/CertificateDevOps.jpg',
      },
    ],
  },
];

export const certificateCount = certificateGroups.reduce(
  (total, group) => total + group.items.length,
  0
);
