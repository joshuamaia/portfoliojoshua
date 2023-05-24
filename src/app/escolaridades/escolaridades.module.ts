import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscolaridadesRoutingModule } from './escolaridades-routing.module';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { EscolaridadeExtraComponent } from './escolaridade-extra/escolaridade-extra.component';


@NgModule({
  declarations: [
    EscolaridadeComponent,
    EscolaridadeExtraComponent
  ],
  imports: [
    CommonModule,
    EscolaridadesRoutingModule
  ]
})
export class EscolaridadesModule { }
