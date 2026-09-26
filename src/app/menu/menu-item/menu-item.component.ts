import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from './menu.item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  standalone: false,
  host: { style: 'display: contents' },
})
export class MenuItemComponent {
  @Input({ required: true }) menuItem!: MenuItem;
  @Output() navigate = new EventEmitter<void>();
}
