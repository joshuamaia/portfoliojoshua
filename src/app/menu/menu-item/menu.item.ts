import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface MenuItem {
  title: string;
  icon: [IconPrefix, IconName];
  routerLink?: string;
  subMenus?: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  icon: [IconPrefix, IconName];
  routerLink: string;
}
