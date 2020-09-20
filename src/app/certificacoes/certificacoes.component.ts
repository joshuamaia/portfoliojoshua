import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-certificacoes',
  templateUrl: './certificacoes.component.html',
  styleUrls: ['./certificacoes.component.css'],
})
export class CertificacoesComponent implements OnInit {
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
