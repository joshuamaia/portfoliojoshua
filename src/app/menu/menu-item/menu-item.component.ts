import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from './menu.item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  host: { style: 'display: contents' },
})
export class MenuItemComponent {
  @Input({ required: true }) menuItem!: MenuItem;
  @Output() navigate = new EventEmitter<void>();
}
