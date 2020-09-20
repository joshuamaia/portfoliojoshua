import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TagInputModule } from 'ngx-chips';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { GMapModule } from 'primeng/gmap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { TrabalhoComponent } from './trabalho/trabalho.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { CovidComponent } from './covid/covid.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CovidbrasilComponent } from './covidbrasil/covidbrasil.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { CovidpbComponent } from './covidpb/covidpb.component';
import { CovidmapaComponent } from './covidmapa/covidmapa.component';
import { CovidcidadeComponent } from './covidcidade/covidcidade.component';
import { CovidbrasiltempoComponent } from './covidbrasiltempo/covidbrasiltempo.component';
import { CovidpbtempoComponent } from './covidpbtempo/covidpbtempo.component';
import { CertificacoesComponent } from './certificacoes/certificacoes.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    HomeComponent,
    EscolaridadeComponent,
    TrabalhoComponent,
    IdiomasComponent,
    CovidComponent,
    CovidbrasilComponent,
    ProjetosComponent,
    CovidpbComponent,
    CovidmapaComponent,
    CovidcidadeComponent,
    CovidbrasiltempoComponent,
    CovidpbtempoComponent,
    CertificacoesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TagInputModule,
    NgSelectModule,
    HighchartsChartModule,
    GMapModule,
    NgxSpinnerModule,
  ],
  exports: [NgxSpinnerModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
