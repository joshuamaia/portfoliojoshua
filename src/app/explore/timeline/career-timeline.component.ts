import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { experiences, formatDuration, formatPeriod } from '../../data/experience';
import { profile } from '../../data/profile';
import { barPosition, experienceKey, technologyFrequency, timelineRange, yearTicks } from './career-timeline';

/** Quantidade de tecnologias exibidas no filtro antes do "Show all" */
const TOP_TECHNOLOGIES = 12;

@Component({
  selector: 'app-career-timeline',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './career-timeline.component.html',
  styleUrl: './career-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerTimelineComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly range = timelineRange(experiences);
  readonly ticks = yearTicks(this.range);
  readonly technologies = technologyFrequency(experiences);
  readonly years = profile.yearsOfExperience;

  readonly entries = experiences.map((job) => ({
    key: experienceKey(job),
    job,
    period: formatPeriod(job),
    duration: formatDuration(job),
    bar: barPosition(job, this.range),
  }));

  private readonly query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  /** Tecnologia usada como filtro (?tech=…) */
  readonly filter = computed(() => {
    const tech = this.query().get('tech');
    return this.technologies.some((t) => t.name === tech) ? tech : null;
  });

  readonly showAllTechnologies = signal(false);
  readonly visibleTechnologies = computed(() => {
    const all = this.technologies;
    if (this.showAllTechnologies()) return all;
    const top = all.slice(0, TOP_TECHNOLOGIES);
    const active = this.filter();
    // A tecnologia filtrada continua visível mesmo fora das mais frequentes
    return active && !top.some((t) => t.name === active) ? [...top, all.find((t) => t.name === active)!] : top;
  });

  readonly matches = computed(() => {
    const tech = this.filter();
    return new Set(this.entries.filter((e) => !tech || e.job.technologies.includes(tech)).map((e) => e.key));
  });
  readonly visibleEntries = computed(() => this.entries.filter((entry) => this.matches().has(entry.key)));

  /** Experiências expandidas; a atual começa aberta */
  readonly expanded = signal<Set<string>>(new Set([this.entries[0]?.key]));

  readonly stats = {
    companies: new Set(experiences.map((job) => job.company)).size,
    technologies: this.technologies.length,
  };

  isExpanded(key: string): boolean {
    return this.expanded().has(key);
  }

  toggle(key: string): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  /** Clique na barra do gráfico: expande a experiência e rola até ela */
  focusEntry(key: string): void {
    this.expanded.update((current) => new Set(current).add(key));
    setTimeout(() =>
      document.getElementById(`tl-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    );
  }

  setFilter(tech: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tech: tech === this.filter() ? null : tech },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
