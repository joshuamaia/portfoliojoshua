import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificadosRoutingModule } from './certificados-routing.module';
import { CertificadoComponent } from './certificado/certificado.component';


@NgModule({
  declarations: [
    CertificadoComponent
  ],
  imports: [
    CommonModule,
    CertificadosRoutingModule
  ]
})
export class CertificadosModule { }
