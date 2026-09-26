import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { EscolaridadeExtraComponent } from './escolaridade-extra/escolaridade-extra.component';

const routes: Routes = [
  { path: '', component: EscolaridadeComponent },
  {
    path: 'extra',
    title: 'Bootcamps & Courses · Joshua Maia Rodrigues',
    component: EscolaridadeExtraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolaridadesRoutingModule {}
