import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-escolaridade-extra',
  templateUrl: './escolaridade-extra.component.html',
  styleUrls: ['./escolaridade-extra.component.css'],
})
export class EscolaridadeExtraComponent {
  constructor(private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public close(): void {
    this.modalService.dismissAll();
  }
}
