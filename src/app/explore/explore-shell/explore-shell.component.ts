import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { exploreSections } from '../explore-sections';

@Component({
  selector: 'app-explore-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, SharedModule],
  templateUrl: './explore-shell.component.html',
  styleUrl: './explore-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreShellComponent {
  readonly sections = exploreSections;
}
