import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface MenuItem {
  title: string;
  icon: [IconPrefix, IconName];
  routerLink: string;
  /** false mantém o item ativo também nas rotas filhas (padrão: true) */
  exact?: boolean;
}
