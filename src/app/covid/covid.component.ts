import { Component, OnInit } from '@angular/core';
import { CovidService } from './covid.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css'],
})
export class CovidComponent implements OnInit {
  public covidMundo: any = {};
  public pais: any = {};
  public detalhePais: any = {};
  public paises: any = {};
  public highcharts = Highcharts;
  public chartOptions: any = {};

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.covidService.getCovidMundo().subscribe((resposta) => {
      this.covidMundo = resposta;
    });
    this.covidService.getPaises().subscribe((resposta) => {
      this.paises = resposta;
      this.pais = this.paises.countries[0];
      this.covidService.getPais(this.pais.iso3).subscribe((resposta) => {
        this.detalhePais = resposta;
        this.chartOptions = {
          chart: {
            type: 'column',
            backgroundColor: '#add8e6',
            color: '#000',
          },
          colorAxis: [
            {
              gridLineColor: '#000',
              tickColor: '#000',
            },
          ],
          colors: ['#FF4500', '#006400', '#DC143C'],
          title: {
            text: `COVID - ${this.pais.name}`,
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
              data: [this.detalhePais.confirmed.value],
            },
            {
              name: 'Recuperados',
              data: [this.detalhePais.recovered.value],
            },
            {
              name: 'Óbitos',
              data: [this.detalhePais.deaths.value],
            },
          ],
        };
      });
    });
  }

  mudarPais() {
    this.covidService.getPais(this.pais.iso3).subscribe((resposta) => {
      this.detalhePais = resposta;
      this.chartOptions = {
        chart: {
          type: 'column',
          backgroundColor: '#add8e6',
          color: '#000',
        },
        colorAxis: [
          {
            gridLineColor: '#000',
            tickColor: '#000',
          },
        ],
        colors: ['#FF4500', '#006400', '#DC143C'],
        title: {
          text: `COVID - ${this.pais.name}`,
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
            '<span style="font-size:10px; color: #000"">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0; color: #000""><b>{point.y:f} pessoas</b></td></tr>',
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
            data: [this.detalhePais.confirmed.value],
          },
          {
            name: 'Recuperados',
            data: [this.detalhePais.recovered.value],
          },
          {
            name: 'Óbitos',
            data: [this.detalhePais.deaths.value],
          },
        ],
      };
    });
  }

  print() {
    window.print();
  }
}
