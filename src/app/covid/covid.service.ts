import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  public URL_BRASIL_TEMPO = 'https://api.covid19api.com/total/country/brazil';
  public URL = 'https://covid19.mathdro.id/api';
  public URL_PAISES = 'https://covid19.mathdro.id/api/countries';
  public URL_PAIS = 'https://covid19.mathdro.id/api/countries';
  public URL_ESTADOS =
    'https://api.brasil.io/dataset/covid19/caso/data/?is_last=True&place_type=state';
  public URL_COVID_PB =
    'https://api.brasil.io/dataset/covid19/caso/data/?is_last=True&state=PB';
  public URL_COVID_CIDADE =
    'https://api.brasil.io/dataset/covid19/caso/data/?is_last=True&state=';
  private headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin',
  });

  private headersApiBrasil: HttpHeaders = new HttpHeaders({
    Authorization: 'Token 535b36d764bc91a077cb0f544e91c0c156fb6bc5',
  });

  constructor(private http: HttpClient) {}

  public getCovidMundo(): Observable<any> {
    return this.http.get(`${this.URL}`).pipe(catchError(this.handleError));
  }

  public getCovidBrasil(): Observable<any> {
    return this.http
      .get(`${this.URL_ESTADOS}`, { headers: this.headersApiBrasil })
      .pipe(catchError(this.handleError));
  }

  public getCovidBrasilTempo(): Observable<any> {
    return this.http
      .get(`${this.URL_BRASIL_TEMPO}`)
      .pipe(catchError(this.handleError));
  }

  public getCovidUfTempo(
    dataInicio: string,
    dataFim: string,
    uf: string
  ): Observable<any> {
    return this.http
      .get(
        `https://middleware-covid19.herokuapp.com/api/data/?initialDate=${dataInicio}&lastDate=${dataFim}&uf=${uf}`
      )
      .pipe(catchError(this.handleError));
  }

  public getCovidPb(): Observable<any> {
    return this.http
      .get(`${this.URL_COVID_PB}`, { headers: this.headersApiBrasil })
      .pipe(catchError(this.handleError));
  }

  public getCovidCidade(uf: string): Observable<any> {
    return this.http
      .get(`${this.URL_COVID_CIDADE}${uf}`, { headers: this.headersApiBrasil })
      .pipe(catchError(this.handleError));
  }

  public getPaises(): Observable<any> {
    return this.http
      .get(`${this.URL_PAISES}`)
      .pipe(catchError(this.handleError));
  }

  public getPais(pais: string): Observable<any> {
    return this.http
      .get(`${this.URL_PAISES}/${pais}`)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
