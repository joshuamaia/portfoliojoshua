import { Component, Input, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-certificado-template',
  templateUrl: './certificado-template.component.html',
  standalone: false,
})
export class CertificadoTemplateComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) srcImage!: string;
  @Input() meta?: string;

  private readonly modalService = inject(NgbModal);

  open(modal: TemplateRef<unknown>): void {
    this.modalService.open(modal, { size: 'xl', centered: true, windowClass: 'modal-x' });
  }
}
