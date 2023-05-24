import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';

const routes: Routes = [{ path: '', component: EscolaridadeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolaridadesRoutingModule {}
