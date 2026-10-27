import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface ExploreSection {
  /** Caminho relativo a /explore */
  path: string;
  title: string;
  icon: [IconPrefix, IconName];
}

/** Abas da página Explore; cada nova funcionalidade entra aqui e em explore.routes.ts. */
export const exploreSections: ExploreSection[] = [
  { path: 'architecture', title: 'Architecture Explorer', icon: ['fas', 'diagram-project'] },
  { path: 'challenges', title: 'Engineering Challenges', icon: ['fas', 'lightbulb'] },
  { path: 'skills', title: 'Skills Map', icon: ['fas', 'circle-nodes'] },
  { path: 'timeline', title: 'Career Timeline', icon: ['fas', 'timeline'] },
  { path: 'resume', title: 'Tailored Resume', icon: ['fas', 'file-lines'] },
];
