import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { TrabalhoComponent } from './trabalho/trabalho.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'escolaridade', component: EscolaridadeComponent },
  { path: 'trabalho', component: TrabalhoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
