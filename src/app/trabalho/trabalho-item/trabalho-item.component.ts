import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Experience, formatDuration, formatPeriod } from '../../data/experience';

@Component({
  selector: 'app-trabalho-item',
  templateUrl: './trabalho-item.component.html',
  standalone: false,
})
export class TrabalhoItemComponent implements OnInit {
  @Input({ required: true }) job!: Experience;
  @Input() expandido = false;

  /** Quantidade de atividades exibidas antes do "Show all" */
  readonly limite = 6;
  readonly aberto = signal(false);
  private readonly atividades = signal<string[]>([]);

  readonly atividadesVisiveis = computed(() =>
    this.aberto() ? this.atividades() : this.atividades().slice(0, this.limite)
  );

  periodo = '';
  duracao = '';

  ngOnInit(): void {
    this.atividades.set(this.job.activities);
    this.aberto.set(this.expandido);
    this.periodo = formatPeriod(this.job);
    this.duracao = formatDuration(this.job);
  }

  alternar(): void {
    this.aberto.update((valor) => !valor);
  }
}
