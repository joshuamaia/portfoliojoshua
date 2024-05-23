import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-certificado-template',
  templateUrl: './certificado-template.component.html',
  styleUrl: './certificado-template.component.css',
})
export class CertificadoTemplateComponent {
  @Input() titulo?: string;
  @Input() srcImage?: string;

  constructor(private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public close(): void {
    this.modalService.dismissAll();
  }
}
