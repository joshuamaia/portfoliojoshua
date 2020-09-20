import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CovidService } from '../covid/covid.service';
import { pluck } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-covidpbtempo',
  templateUrl: './covidpbtempo.component.html',
  styleUrls: ['./covidpbtempo.component.css'],
})
export class CovidpbtempoComponent implements OnInit {
  public paraibaTempo: any;
  public paraiba: any;
  public highcharts = Highcharts;
  public chartOptions: any = {};

  constructor(
    private covidService: CovidService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.spinner.show();
    let monthAgo = ((d) => new Date(d.setDate(d.getDate() - 31)))(new Date());
    let yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

    this.covidService
      .getCovidUfTempo(
        this.formattedDate(monthAgo),
        this.formattedDate(yesterday),
        'PB'
      )
      .subscribe((resposta) => {
        this.paraibaTempo = resposta;
        this.covidService
          .getCovidBrasil()
          .pipe(pluck('results'))
          .subscribe(async (resposta) => {
            this.paraiba = resposta.find((e) => e.state === 'PB');
            await this.carregaDados();
            await this.spinner.hide();
          });
      });
  }

  formattedDate(d = new Date()) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

  async carregaDados() {
    const timeline = [];

    for (var i = 0; i < this.paraibaTempo.length; i++) {
      timeline.push({
        name: this.formattedDate(new Date(this.paraibaTempo[i].datetime)),
        data: [this.paraibaTempo[i].cases],
      });
    }

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: `COVID na Paraíba - Evolução nos Últimos 30 dias`,
      },
      xAxis: {
        categories: ['Casos'],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Pessoas',
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
