import { Component, ChangeDetectionStrategy } from '@angular/core';
import { profile } from '../data/profile';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class RodapeComponent {
  readonly profile = profile;
  readonly year = new Date().getFullYear();
}
