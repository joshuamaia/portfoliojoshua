import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { formatPeriod } from '../../data/experience';
import { profile } from '../../data/profile';
import {
  SkillCategoryId,
  certificatesFor,
  experiencesFor,
  findSkillCategory,
  radialPosition,
  skillCategories,
} from '../../data/skills-map';

export type SkillsView = 'map' | 'cards';

const SIZE = 640;
const CENTER = SIZE / 2;
const RADIUS = 228;
const NODE_W = 150;
const NODE_H = 122;

@Component({
  selector: 'app-skills-map',
  imports: [FontAwesomeModule],
  templateUrl: './skills-map.component.html',
  styleUrl: './skills-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsMapComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly size = SIZE;
  readonly center = CENTER;
  readonly years = profile.yearsOfExperience;
  readonly nodeW = NODE_W;
  readonly nodeH = NODE_H;

  private readonly query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  readonly view = computed<SkillsView>(() => (this.query().get('view') === 'cards' ? 'cards' : 'map'));
  readonly selected = computed(() => findSkillCategory(this.query().get('skill')) ?? skillCategories[0]);

  /** Cada categoria com sua posição no mapa radial e os dados derivados (contagens verificáveis) */
  readonly items = skillCategories.map((category, index) => {
    const point = radialPosition(index, skillCategories.length, RADIUS, CENTER, CENTER);
    return {
      category,
      point,
      roles: experiencesFor(category),
      certificates: certificatesFor(category),
    };
  });

  readonly detail = computed(() => {
    const item = this.items.find((i) => i.category.id === this.selected().id)!;
    return {
      ...item,
      roles: item.roles.map((job) => ({ job, period: formatPeriod(job) })),
      related: item.category.related.map((id) => findSkillCategory(id)!),
    };
  });

  select(id: SkillCategoryId): void {
    this.updateQuery({ skill: id });
  }

  setView(view: SkillsView): void {
    this.updateQuery({ view: view === 'cards' ? 'cards' : null });
  }

  /** Setas percorrem as categorias no mapa, na ordem do círculo */
  onKeydown(event: KeyboardEvent, index: number): void {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const target = (index + step + this.items.length) % this.items.length;
    this.select(this.items[target].category.id);
    const buttons = (event.currentTarget as HTMLElement)
      .closest('.sm-map, .sm-cards')
      ?.querySelectorAll<HTMLElement>('[data-skill]');
    buttons?.[target]?.focus();
  }

  private updateQuery(queryParams: Record<string, string | null>): void {
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge', replaceUrl: true });
  }
}
