import { Routes } from '@angular/router';
import { profile } from '../data/profile';
import { ExploreShellComponent } from './explore-shell/explore-shell.component';

export const EXPLORE_ROUTES: Routes = [
  {
    path: '',
    component: ExploreShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'architecture' },
      {
        path: 'architecture',
        title: `Architecture Explorer · ${profile.name}`,
        loadComponent: () =>
          import('./architecture/architecture-explorer.component').then(
            (m) => m.ArchitectureExplorerComponent,
          ),
      },
      {
        path: 'challenges',
        title: `Engineering Challenges · ${profile.name}`,
        loadComponent: () =>
          import('./challenges/challenge-list.component').then((m) => m.ChallengeListComponent),
      },
      {
        path: 'challenges/:id',
        title: `Engineering Challenges · ${profile.name}`,
        loadComponent: () =>
          import('./challenges/challenge-detail.component').then((m) => m.ChallengeDetailComponent),
      },
      {
        path: 'skills',
        title: `Interactive Skills Map · ${profile.name}`,
        loadComponent: () => import('./skills/skills-map.component').then((m) => m.SkillsMapComponent),
      },
      {
        path: 'timeline',
        title: `Career Timeline · ${profile.name}`,
        loadComponent: () =>
          import('./timeline/career-timeline.component').then((m) => m.CareerTimelineComponent),
      },
      {
        path: 'resume',
        title: `Tailored Resume · ${profile.name}`,
        loadComponent: () =>
          import('./resume/tailored-resume.component').then((m) => m.TailoredResumeComponent),
      },
    ],
  },
];
