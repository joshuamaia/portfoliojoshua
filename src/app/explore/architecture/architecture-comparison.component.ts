import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArchitectureId, architectures, compareCriteria, findArchitecture } from '../../data/architectures';

/** Compara duas arquiteturas lado a lado com critérios qualitativos. */
@Component({
  selector: 'app-architecture-comparison',
  imports: [FontAwesomeModule],
  templateUrl: './architecture-comparison.component.html',
  styleUrl: './architecture-comparison.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureComparisonComponent {
  /** Arquitetura que abre no lado esquerdo */
  readonly initial = input.required<ArchitectureId>();
  readonly explore = output<ArchitectureId>();

  readonly architectures = architectures;
  readonly criteria = compareCriteria;

  readonly leftId = linkedSignal(() => this.initial());
  readonly rightId = linkedSignal(() => nextArchitecture(this.initial()));

  readonly left = computed(() => findArchitecture(this.leftId())!);
  readonly right = computed(() => findArchitecture(this.rightId())!);

  setLeft(id: string): void {
    this.choose(id as ArchitectureId, 'left');
  }

  setRight(id: string): void {
    this.choose(id as ArchitectureId, 'right');
  }

  swap(): void {
    const left = this.leftId();
    this.leftId.set(this.rightId());
    this.rightId.set(left);
  }

  /** Escolher em um lado a arquitetura que já está no outro troca as duas de lugar */
  private choose(id: ArchitectureId, side: 'left' | 'right'): void {
    const [current, other] = side === 'left' ? [this.leftId, this.rightId] : [this.rightId, this.leftId];
    if (id === other()) other.set(current());
    current.set(id);
  }
}

function nextArchitecture(id: ArchitectureId): ArchitectureId {
  const index = architectures.findIndex((architecture) => architecture.id === id);
  return architectures[(index + 1) % architectures.length].id;
}
