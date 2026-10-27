import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Architecture, ComponentDetail } from '../../data/architectures';
import { DiagramNode } from '../../shared/diagram/diagram.model';

/** Painel lateral: visão geral da arquitetura ou detalhes do componente selecionado. */
@Component({
  selector: 'app-architecture-panel',
  imports: [FontAwesomeModule],
  templateUrl: './architecture-panel.component.html',
  styleUrl: './architecture-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-live': 'polite' },
})
export class ArchitecturePanelComponent {
  readonly architecture = input.required<Architecture>();
  readonly node = input<DiagramNode | null>(null);
  readonly detail = input<ComponentDetail | null>(null);
  readonly closed = output<void>();
}
