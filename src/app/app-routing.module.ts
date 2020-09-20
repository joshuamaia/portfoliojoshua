import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { TrabalhoComponent } from './trabalho/trabalho.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { CovidComponent } from './covid/covid.component';
import { CovidbrasilComponent } from './covidbrasil/covidbrasil.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { CovidpbComponent } from './covidpb/covidpb.component';
import { CovidmapaComponent } from './covidmapa/covidmapa.component';
import { CovidcidadeComponent } from './covidcidade/covidcidade.component';
import { CovidbrasiltempoComponent } from './covidbrasiltempo/covidbrasiltempo.component';
import { CovidpbtempoComponent } from './covidpbtempo/covidpbtempo.component';
import { CertificacoesComponent } from './certificacoes/certificacoes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'escolaridade', component: EscolaridadeComponent },
  { path: 'certificacao', component: CertificacoesComponent },
  { path: 'trabalho', component: TrabalhoComponent },
  { path: 'idioma', component: IdiomasComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'covidbrasil', component: CovidbrasilComponent },
  { path: 'covidbrasiltempo', component: CovidbrasiltempoComponent },
  //{ path: 'covidpbtempo', component: CovidpbtempoComponent },
  { path: 'covidcidade', component: CovidcidadeComponent },
  { path: 'covidmapa', component: CovidmapaComponent },
  { path: 'covidpb', component: CovidpbComponent },
  { path: 'projetos', component: ProjetosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
