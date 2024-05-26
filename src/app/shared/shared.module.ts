import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { fontAwesomeIcons } from '../config/font-awesome-icons';
import { CertificadoTemplateComponent } from './certificado-template/certificado-template.component';
import { CertificadoEscolaridadeExtraComponent } from './certificado-escolaridade-extra/certificado-escolaridade-extra.component';
import { ExibirDownloadCurriculoComponent } from './exibir-download-curriculo/exibir-download-curriculo.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    CertificadoTemplateComponent,
    CertificadoEscolaridadeExtraComponent,
    ExibirDownloadCurriculoComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, NgbModule, PdfViewerModule],
  exports: [
    FontAwesomeModule,
    CertificadoTemplateComponent,
    CertificadoEscolaridadeExtraComponent,
    ExibirDownloadCurriculoComponent,
  ],
})
export class SharedModule {
  constructor(private fontAwesomeLibrary: FaIconLibrary) {
    this.configureFontAwesome();
  }

  private configureFontAwesome() {
    this.fontAwesomeLibrary.addIcons(...fontAwesomeIcons);
  }
}
