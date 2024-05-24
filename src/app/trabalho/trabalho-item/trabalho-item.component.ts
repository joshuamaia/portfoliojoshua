import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trabalho-item',
  templateUrl: './trabalho-item.component.html',
  styleUrl: './trabalho-item.component.css',
})
export class TrabalhoItemComponent {
  @Input() titulo!: string;
  @Input() destaque!: boolean;
}
