import { Component } from '@angular/core';
import { experiences } from '../../data/experience';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-trabalhos',
  templateUrl: './trabalhos.component.html',
  standalone: false,
})
export class TrabalhosComponent {
  readonly experiences = experiences;
  readonly profile = profile;
}
