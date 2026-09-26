import { Component } from '@angular/core';
import { degrees } from '../../data/education';

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  standalone: false,
})
export class EscolaridadeComponent {
  readonly recentes = degrees.filter((d) => d.featured);
  readonly concluidos = degrees.filter((d) => !d.featured);
}
