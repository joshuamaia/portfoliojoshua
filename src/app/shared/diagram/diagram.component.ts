import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { describeEdge, layoutEdges, neighbours } from './diagram-geometry';
import { Diagram, DiagramNode } from './diagram.model';

let nextId = 0;

/**
 * Diagrama interativo em SVG: nós clicáveis (botões dentro de foreignObject),
 * conexões direcionais e uma descrição textual equivalente.
 */
@Component({
  selector: 'app-diagram',
  imports: [FontAwesomeModule],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramComponent {
  readonly diagram = input.required<Diagram>();
  /** Id do nó selecionado; null quando nada está selecionado */
  readonly selectedId = model<string | null>(null);

  /** Prefixo único para os ids dos marcadores SVG (mais de um diagrama por página) */
  readonly uid = `dg${nextId++}`;

  readonly edges = computed(() => layoutEdges(this.diagram()));
  readonly viewBox = computed(() => `0 0 ${this.diagram().width} ${this.diagram().height}`);
  /** Largura mínima que mantém o texto legível em telas pequenas (rolagem horizontal) */
  readonly minWidth = computed(() => Math.round(this.diagram().width * 0.78));
  /** Evita que diagramas pequenos fiquem gigantes em áreas largas */
  readonly maxWidth = computed(() => Math.round(this.diagram().width * 1.15));

  private readonly hoveredId = signal<string | null>(null);

  /** Nós ligados ao selecionado, destacados junto com ele */
  readonly related = computed(() => {
    const id = this.selectedId();
    return id ? neighbours(this.diagram(), id) : new Set<string>();
  });

  readonly tooltip = computed(() => {
    const id = this.hoveredId();
    const node = id ? this.diagram().nodes.find((n) => n.id === id) : undefined;
    if (!node) return null;
    const { width, height } = this.diagram();
    return {
      node,
      left: ((node.x + node.w / 2) / width) * 100,
      top: (node.y / height) * 100,
      below: node.y < height * 0.22,
      bottom: ((node.y + node.h) / height) * 100,
    };
  });

  readonly textEdges = computed(() =>
    this.diagram().edges.map((edge) => describeEdge(this.diagram(), edge)),
  );

  toggle(node: DiagramNode): void {
    this.selectedId.update((current) => (current === node.id ? null : node.id));
  }

  hover(id: string | null): void {
    this.hoveredId.set(id);
  }

  isEdgeActive(from: string, to: string): boolean {
    const id = this.selectedId();
    return id !== null && (from === id || to === id);
  }
}
