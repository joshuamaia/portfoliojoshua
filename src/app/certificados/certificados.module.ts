import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificadosRoutingModule } from './certificados-routing.module';
import { CertificadoComponent } from './certificado/certificado.component';
import { SharedModule } from '../shared/shared.module';
import { CertificadoItemComponent } from './certificado-item/certificado-item.component';

@NgModule({
  declarations: [CertificadoComponent, CertificadoItemComponent],
  imports: [CommonModule, CertificadosRoutingModule, SharedModule],
})
export class CertificadosModule {}
