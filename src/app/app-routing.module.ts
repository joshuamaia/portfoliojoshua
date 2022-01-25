import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { TrabalhoComponent } from './trabalho/trabalho.component';
import { IdiomasComponent } from './idiomas/idiomas.component';

import { ProjetosComponent } from './projetos/projetos.component';

import { CertificacoesComponent } from './certificacoes/certificacoes.component';
import { InputExemplosComponent } from './input-exemplos/input-exemplos.component';
import { CovidComponent } from './covid/covid.component';
import { CovidbrasilComponent } from './covidbrasil/covidbrasil.component';
import { CovidbrasiltempoComponent } from './covidbrasiltempo/covidbrasiltempo.component';
import { CovidpbComponent } from './covidpb/covidpb.component';
import { CovidcidadeComponent } from './covidcidade/covidcidade.component';
import { CursosComponent } from './cursos/cursos.component';
import { PipesComponent } from './pipes/pipes.component';
import { UtilsComponent } from './utils/utils.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'escolaridade', component: EscolaridadeComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'certificacao', component: CertificacoesComponent },
  { path: 'trabalho', component: TrabalhoComponent },
  { path: 'idioma', component: IdiomasComponent },
  { path: 'projetos', component: ProjetosComponent },
  // { path: 'covid', component: CovidComponent },
  // { path: 'covidbrasil', component: CovidbrasilComponent },
  // { path: 'covidbrasiltempo', component: CovidbrasiltempoComponent },
  // { path: 'covidpb', component: CovidpbComponent },
  // { path: 'covidcidade', component: CovidcidadeComponent },
  { path: 'inputs', component: InputExemplosComponent },
  { path: 'utils', component: UtilsComponent },
  { path: 'pipes', component: PipesComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
