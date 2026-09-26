import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MenuComponent],
})
export class MenuModule {}
