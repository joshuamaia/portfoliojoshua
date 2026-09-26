import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface MenuItem {
  title: string;
  icon: [IconPrefix, IconName];
  routerLink: string;
}
