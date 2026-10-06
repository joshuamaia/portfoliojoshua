import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Degree } from '../../data/education';

@Component({
  selector: 'app-escolaridade-item',
  templateUrl: './escolaridade-item.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class EscolaridadeItemComponent {
  @Input({ required: true }) item!: Degree;
}
