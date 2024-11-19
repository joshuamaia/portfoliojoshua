import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-certificado-escolaridade-extra',
    templateUrl: './certificado-escolaridade-extra.component.html',
    styleUrl: './certificado-escolaridade-extra.component.css',
    standalone: false
})
export class CertificadoEscolaridadeExtraComponent {
  @Input() titulo!: string;
  @Input() srcImage!: string;

  constructor(private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public close(): void {
    this.modalService.dismissAll();
  }
}
