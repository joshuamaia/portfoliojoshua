import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import { CovidService } from '../covid/covid.service';

@Component({
  selector: 'app-covidpb',
  templateUrl: './covidpb.component.html',
  styleUrls: ['./covidpb.component.css'],
})
export class CovidpbComponent implements OnInit {
  public paraiba: any;
  public estados = [];
  public cidades: any;
  public cidadeSelecionado;
  public highcharts = Highcharts;
  public chartOptions: any = {};

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.covidService
      .getCovidBrasil()
      .pipe(pluck('results'))
      .subscribe((resposta) => {
        this.estados = resposta;
        this.paraiba = this.estados.find((e) => e.state === 'PB');
      });
    this.covidService
      .getCovidPb()
      .pipe(pluck('results'))
      .subscribe((resposta) => {
        this.cidades = resposta.filter((c) => c.city);
        this.cidadeSelecionado = this.cidades[0];
        this.mudarCidade();
      });
  }

  mudarCidade() {
    this.chartOptions = {
      chart: {
        type: 'column',
        backgroundColor: '#fff',
        color: '#000',
      },
      colorAxis: [
        {
          gridLineColor: '#000',
          tickColor: '#000',
        },
      ],
      colors: ['#FF4500', '#DC143C'],
      title: {
        text: `COVID - ${this.cidadeSelecionado.city}`,
        style: { color: '#000', fontSize: '18px' },
      },
      xAxis: {
        categories: ['Casos'],
        crosshair: true,
        labels: {
          style: {
            color: '#000',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Pessoas',
          style: {
            color: '#000',
          },
        },
        labels: {
          style: {
            color: '#000',
          },
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        headerFormat:
          '<span style="font-size:10px;; color: #000">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0; color: #000"><b>{point.y:f} pessoas</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Confirmados',
          data: [this.cidadeSelecionado.confirmed],
        },
        {
          name: 'Óbitos',
          data: [this.cidadeSelecionado.deaths],
        },
      ],
    };
  }

  print() {
    window.print();
  }
}
