import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidService } from '../covid/covid.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-covidbrasil',
  templateUrl: './covidbrasil.component.html',
  styleUrls: ['./covidbrasil.component.css'],
})
export class CovidbrasilComponent implements OnInit {
  public estados: any;
  public brasil: any;
  public estadoSelecionado;
  public highcharts = Highcharts;
  public chartOptions: any = {};

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.covidService.getPais('BRA').subscribe((resposta) => {
      this.brasil = resposta;
    });
    this.covidService
      .getCovidBrasil()
      .pipe(pluck('results'))
      .subscribe((resposta) => {
        this.estados = resposta;
        this.estadoSelecionado = this.estados[0];
        this.mudarEstado();
      });
  }

  mudarEstado() {
    this.chartOptions = {
      chart: {
        type: 'column',
        backgroundColor: '#add8e6',
        color: '#000',
      },
      colors: ['#FF4500', '#DC143C'],
      colorAxis: [
        {
          gridLineColor: '#000',
          tickColor: '#000',
        },
      ],
      title: {
        text: `COVID - ${this.estadoSelecionado.state}`,
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
        backgroundColor: '#add8e6',
        headerFormat:
          '<span style="font-size:10px; color: #000">{point.key}</span><table>',
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
          data: [this.estadoSelecionado.confirmed],
        },
        {
          name: 'Óbitos',
          data: [this.estadoSelecionado.deaths],
        },
      ],
    };
  }

  print() {
    window.print();
  }
}
