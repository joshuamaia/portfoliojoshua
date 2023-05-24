import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { EscolaridadeExtraComponent } from './escolaridade-extra/escolaridade-extra.component';

const routes: Routes = [
  { path: '', component: EscolaridadeComponent },
  { path: 'extra', component: EscolaridadeExtraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolaridadesRoutingModule {}
