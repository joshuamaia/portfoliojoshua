import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscolaridadesRoutingModule } from './escolaridades-routing.module';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { EscolaridadeExtraComponent } from './escolaridade-extra/escolaridade-extra.component';
import { SharedModule } from '../shared/shared.module';
import { EscolaridadeItemComponent } from './escolaridade-item/escolaridade-item.component';

@NgModule({
  declarations: [
    EscolaridadeComponent,
    EscolaridadeExtraComponent,
    EscolaridadeItemComponent,
  ],
  imports: [CommonModule, EscolaridadesRoutingModule, SharedModule],
})
export class EscolaridadesModule {}
