import { Component, Input, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-certificado-escolaridade-extra',
  templateUrl: './certificado-escolaridade-extra.component.html',
  standalone: false,
})
export class CertificadoEscolaridadeExtraComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) srcImage!: string;
  @Input() descricao = '';

  private readonly modalService = inject(NgbModal);

  open(modal: TemplateRef<unknown>): void {
    this.modalService.open(modal, { size: 'xl', centered: true, windowClass: 'modal-x' });
  }
}
