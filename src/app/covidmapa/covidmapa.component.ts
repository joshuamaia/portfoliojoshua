import { Component, OnInit } from '@angular/core';
import { GMapModule } from 'primeng/gmap';
import { CovidService } from '../covid/covid.service';
import { GEOGRAFIA_BRASIL } from './pontosgeograficospb';
import swal from 'sweetalert2';
import { pluck } from 'rxjs/operators';
declare var google: any;

@Component({
  selector: 'app-covidmapa',
  templateUrl: './covidmapa.component.html',
  styleUrls: ['./covidmapa.component.css'],
})
export class CovidmapaComponent implements OnInit {
  public options: any;
  public estados: any[] = [];

  public overlays: any[] = [];
  public alerta_estados = new Map();

  public pontos_geograficos_pb = GEOGRAFIA_BRASIL;

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.options = {
      center: { lat: -5.53, lng: -52.29 },
      zoom: 3,
    };

    this.covidService
      .getCovidBrasil()
      .pipe(pluck('results'))
      .subscribe((resposta) => {
        this.estados = resposta;
        this.estados.forEach((estado) => {
          const latitude = this.pontos_geograficos_pb[estado.state][0];
          const longetude = this.pontos_geograficos_pb[estado.state][1];

          const covid_texto = `UF Estado - ${
            estado.state
          }. \nCasos confirmados - ${estado.confirmed} Pessoas. \nÓbitos ${
            estado.deaths
          } Pessoas. \nLetalidade ${(
            (estado.deaths / estado.confirmed) *
            100
          ).toLocaleString(undefined, { maximumFractionDigits: 2 })} %`;

          const bandeira = `https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${estado.state}.png`;

          const convid_texto_alerta = `<img
          src="${bandeira}"/> UF Estado - ${
            estado.state
          }</h3>. <br /><span style='color: #4b0082'>Casos confirmados - ${
            estado.confirmed
          } Pessoas.</span> <br /><span style='color: #1C1C1C'>Óbitos ${
            estado.deaths
          } Pessoas.</span> <br /><span style='color: #ff0000'>Letalidade ${(
            (estado.deaths / estado.confirmed) *
            100
          ).toLocaleString(undefined, { maximumFractionDigits: 2 })} %</span>`;

          this.alerta_estados.set(covid_texto, convid_texto_alerta);

          var image = `https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${estado.state}.png`;

          this.overlays.push(
            new google.maps.Marker({
              position: { lat: latitude, lng: longetude },
              icon: image,
              title: covid_texto,
            })
          );
        });
      });
  }

  handleOverlayClick(event) {
    swal.fire('COVID', this.alerta_estados.get(event.overlay.title), 'info');
  }
}
