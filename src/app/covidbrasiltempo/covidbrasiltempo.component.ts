import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidService } from '../covid/covid.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-covidbrasiltempo',
  templateUrl: './covidbrasiltempo.component.html',
  styleUrls: ['./covidbrasiltempo.component.css'],
})
export class CovidbrasiltempoComponent implements OnInit {
  public brasilTempo: any;
  public brasil: any;
  public highcharts = Highcharts;
  public chartOptions: any = {};

  constructor(private covidService: CovidService) {}

  async ngOnInit(): Promise<void> {
    this.covidService.getCovidBrasilTempo().subscribe((resposta) => {
      this.brasilTempo = resposta;
      this.covidService.getPais('BRA').subscribe(async (resposta) => {
        this.brasil = resposta;
        await this.carregaDados();
      });
    });
  }

  async carregaDados() {
    const timeline = [];

    for (
      var i = this.brasilTempo.length - 30;
      i < this.brasilTempo.length;
      i++
    ) {
      let now = moment(this.brasilTempo[i].Date);
      timeline.push({
        name: now.add(1, 'days').format('DD/MM/YYYY'),
        data: [this.brasilTempo[i].Confirmed],
      });
    }

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
      colors: ['#220b5e'],
      title: {
        text: `COVID no Brasil - Evolução nos Últimos 30 dias`,
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
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: timeline,
    };
  }

  print() {
    window.print();
  }
}
