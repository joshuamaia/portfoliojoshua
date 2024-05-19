import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
})
export class TopoComponent implements OnInit {
  pdfSrc = '../../assets/Joshua_MaiaRodrigues_Resume.pdf';

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  public open(modal: any): void {
    this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  }

  public close(): void {
    this.modalService.dismissAll();
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = 'Joshua_MaiaRodrigues_Resume.pdf'; // Nome do arquivo para download
    link.click();
  }
}
