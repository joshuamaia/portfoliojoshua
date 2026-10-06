import { Component, Input, TemplateRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-exibir-download-curriculo',
  templateUrl: './exibir-download-curriculo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ExibirDownloadCurriculoComponent {
  @Input() variant: 'icon' | 'button' = 'icon';

  readonly nome = profile.name;
  readonly pdfSrc = profile.resume;
  readonly nomeArquivo = 'Joshua_MaiaRodrigues_Resume.pdf';

  private readonly modalService = inject(NgbModal);

  open(modal: TemplateRef<unknown>): void {
    this.modalService.open(modal, {
      size: 'xl',
      centered: true,
      windowClass: 'modal-x modal-resume',
    });
  }
}
