import { Component, Input } from '@angular/core';
import { MenuItem } from './menu.item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent {
  @Input() menuItem: MenuItem = { title: 'Home', icon: ['fas', 'house'] };

  temSubMenu(menuItem: MenuItem) {
    if (menuItem && menuItem.subMenus && menuItem.subMenus.length > 0) {
      return true;
    }
    return false;
  }
}
