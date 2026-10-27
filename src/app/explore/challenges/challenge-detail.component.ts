import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, linkedSignal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { findArchitecture } from '../../data/architectures';
import { challenges, findChallenge } from '../../data/challenges';
import { DiagramComponent } from '../../shared/diagram/diagram.component';

@Component({
  selector: 'app-challenge-detail',
  imports: [RouterLink, FontAwesomeModule, DiagramComponent],
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  /** A abordagem escolhida fica na URL (?approach=…), preservando o contexto ao compartilhar */
  private readonly query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  readonly challenge = computed(() => findChallenge(this.params().get('id')));

  readonly strategy = computed(() => {
    const id = this.query().get('approach');
    return this.challenge()?.strategies.find((s) => s.id === id) ?? null;
  });

  readonly reference = computed(() => {
    const challenge = this.challenge();
    return challenge?.strategies.find((s) => s.id === challenge.reference.strategyId) ?? null;
  });

  readonly relatedArchitecture = computed(() => findArchitecture(this.challenge()?.relatedArchitecture));

  /** Nó selecionado no diagrama; volta a null quando a abordagem muda */
  readonly selectedNodeId = linkedSignal<string | undefined, string | null>({
    source: () => this.strategy()?.id,
    computation: () => null,
  });
  readonly selectedNode = computed(
    () => this.strategy()?.diagram.nodes.find((node) => node.id === this.selectedNodeId()) ?? null,
  );

  readonly neighbours = computed(() => {
    const index = challenges.findIndex((c) => c.id === this.challenge()?.id);
    return {
      previous: index > 0 ? challenges[index - 1] : null,
      next: index >= 0 && index < challenges.length - 1 ? challenges[index + 1] : null,
    };
  });

  private readonly analysis = viewChild('analysis', { read: ElementRef });

  /** Seleciona a abordagem e, se a análise estiver fora da tela, rola até ela */
  choose(id: string, reveal = true): void {
    this.router
      .navigate([], { relativeTo: this.route, queryParams: { approach: id }, replaceUrl: true })
      .then(() => reveal && setTimeout(() => this.revealAnalysis()));
  }

  /** "Explore Another Approach": avança para a próxima abordagem, mantendo o desafio aberto */
  nextApproach(): void {
    const challenge = this.challenge();
    const current = this.strategy();
    if (!challenge) return;
    const index = current ? challenge.strategies.indexOf(current) : -1;
    this.choose(challenge.strategies[(index + 1) % challenge.strategies.length].id);
  }

  private revealAnalysis(): void {
    const element = this.analysis()?.nativeElement as HTMLElement | undefined;
    if (!element || typeof window === 'undefined') return;
    const top = element.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.6 || top < 0) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onOptionKeydown(event: KeyboardEvent, index: number): void {
    const strategies = this.challenge()?.strategies ?? [];
    const step = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
    if (!step || !strategies.length) return;
    event.preventDefault();
    const target = (index + step + strategies.length) % strategies.length;
    this.choose(strategies[target].id, false);
    const options = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="radio"]');
    options?.[target]?.focus();
  }
}
