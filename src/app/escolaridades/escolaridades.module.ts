import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscolaridadesRoutingModule } from './escolaridades-routing.module';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';


@NgModule({
  declarations: [
    EscolaridadeComponent
  ],
  imports: [
    CommonModule,
    EscolaridadesRoutingModule
  ]
})
export class EscolaridadesModule { }
