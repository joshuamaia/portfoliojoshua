import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { challenges } from '../../data/challenges';

@Component({
  selector: 'app-challenge-list',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeListComponent {
  readonly categories = ['All', ...new Set(challenges.map((challenge) => challenge.category))];
  readonly category = signal('All');

  readonly visible = computed(() =>
    this.category() === 'All' ? challenges : challenges.filter((c) => c.category === this.category()),
  );
}
