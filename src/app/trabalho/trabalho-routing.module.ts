import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabalhosComponent } from './trabalhos/trabalhos.component';

const routes: Routes = [{ path: '', component: TrabalhosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabalhoRoutingModule {}
