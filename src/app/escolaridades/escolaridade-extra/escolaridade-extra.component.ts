import { Component, ChangeDetectionStrategy } from '@angular/core';
import { courses } from '../../data/education';

@Component({
  selector: 'app-escolaridade-extra',
  templateUrl: './escolaridade-extra.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class EscolaridadeExtraComponent {
  readonly cursos = courses;
}
