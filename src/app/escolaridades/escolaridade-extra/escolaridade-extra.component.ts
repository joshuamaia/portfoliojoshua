import { Component } from '@angular/core';
import { courses } from '../../data/education';

@Component({
  selector: 'app-escolaridade-extra',
  templateUrl: './escolaridade-extra.component.html',
  standalone: false,
})
export class EscolaridadeExtraComponent {
  readonly cursos = courses;
}
