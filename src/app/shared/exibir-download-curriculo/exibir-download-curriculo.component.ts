import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exibir-download-curriculo',
  templateUrl: './exibir-download-curriculo.component.html',
  styleUrl: './exibir-download-curriculo.component.css',
})
export class ExibirDownloadCurriculoComponent {
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
