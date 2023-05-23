import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabalhoRoutingModule } from './trabalho-routing.module';
import { TrabalhosComponent } from './trabalhos/trabalhos.component';

@NgModule({
  declarations: [TrabalhosComponent],
  imports: [CommonModule, TrabalhoRoutingModule, SharedModule],
})
export class TrabalhoModule {}
