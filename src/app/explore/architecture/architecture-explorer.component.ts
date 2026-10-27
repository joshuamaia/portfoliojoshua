import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  linkedSignal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ArchitectureId,
  DEFAULT_ARCHITECTURE,
  architectures,
  findArchitecture,
} from '../../data/architectures';
import { DiagramComponent } from '../../shared/diagram/diagram.component';
import { ArchitectureComparisonComponent } from './architecture-comparison.component';
import { ArchitecturePanelComponent } from './architecture-panel.component';

export type ExplorerView = 'explore' | 'compare';

@Component({
  selector: 'app-architecture-explorer',
  imports: [FontAwesomeModule, DiagramComponent, ArchitecturePanelComponent, ArchitectureComparisonComponent],
  templateUrl: './architecture-explorer.component.html',
  styleUrl: './architecture-explorer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureExplorerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly architectures = architectures;

  /** O padrão e a visão ficam na URL (?pattern=…&view=compare) para poderem ser compartilhados */
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly active = computed(
    () => findArchitecture(this.params().get('pattern')) ?? findArchitecture(DEFAULT_ARCHITECTURE)!,
  );
  readonly view = computed<ExplorerView>(() => (this.params().get('view') === 'compare' ? 'compare' : 'explore'));

  /** Volta a null sempre que a arquitetura muda */
  readonly selectedNodeId = linkedSignal<ArchitectureId, string | null>({
    source: () => this.active().id,
    computation: () => null,
  });

  readonly selectedNode = computed(() => {
    const id = this.selectedNodeId();
    return this.active().diagram.nodes.find((node) => node.id === id) ?? null;
  });
  readonly selectedDetail = computed(() => {
    const id = this.selectedNodeId();
    return id ? (this.active().components[id] ?? null) : null;
  });

  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');
  private readonly panel = viewChild('panel', { read: ElementRef });

  select(id: ArchitectureId): void {
    this.updateQuery({ pattern: id, view: null });
  }

  setView(view: ExplorerView): void {
    this.updateQuery({ view: view === 'compare' ? 'compare' : null });
  }

  openInExplorer(id: ArchitectureId): void {
    this.updateQuery({ pattern: id, view: null });
  }

  onNodeSelected(id: string | null): void {
    this.selectedNodeId.set(id);
    // Em telas estreitas o painel fica abaixo do diagrama: leva o visitante até ele
    if (id && typeof window !== 'undefined' && window.matchMedia?.('(max-width: 1179px)').matches) {
      setTimeout(() =>
        this.panel()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
      );
    }
  }

  /** Navegação por teclado nas abas (padrão WAI-ARIA: setas, Home e End) */
  onTabKeydown(event: KeyboardEvent, index: number): void {
    const last = this.architectures.length - 1;
    const target =
      event.key === 'ArrowRight'
        ? index === last ? 0 : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0 ? last : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (target < 0) return;
    event.preventDefault();
    this.select(this.architectures[target].id);
    this.tabs()[target]?.nativeElement.focus();
  }

  private updateQuery(queryParams: Record<string, string | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
