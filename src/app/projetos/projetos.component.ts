import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css'],
})
export class ProjetosComponent implements OnInit {
  public modalRef: BsModalRef;
  public red: any = document.querySelector('#redInput');
  public green: any = document.querySelector('#greenInput');
  public blue: any = document.querySelector('#blueInput');
  public redValue: any = document.querySelector('#redInputValue');
  public greenValue: any = document.querySelector('#greenInputValue');
  public blueValue: any = document.querySelector('#blueInputValue');
  public titulo: any = document.querySelector('#titulo');
  public quadradoRGB: any = document.querySelector('#quadradoRGB');

  public lista = [];
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.carregaAPI();
    this.red = document.querySelector('#redInput');
    this.green = document.querySelector('#greenInput');
    this.blue = document.querySelector('#blueInput');
    this.redValue = document.querySelector('#redInputValue');
    this.greenValue = document.querySelector('#greenInputValue');
    this.blueValue = document.querySelector('#blueInputValue');
    this.red.value = 0;
    this.green.value = 0;
    this.blue.value = 0;
    this.redValue.value = 0;
    this.greenValue.value = 0;
    this.blueValue.value = 0;
    this.titulo = document.querySelector('#titulo');
    this.titulo.textContent = `RGB(0,0,0)`;
    this.titulo.style.color = `rgb(0,0,0)`;
    this.quadradoRGB = document.querySelector('#quadradoRGB');
    this.quadradoRGB.style.backgroundColor = `rgb(0,0,0)`;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async carregaAPI() {
    const api = await fetch(
      'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    );
    const json = await api.json();

    this.lista = json.results;

    this.lista = this.lista.map((row) => {
      return {
        sexo: row.gender,
        nome: row.name.first,
        sobrenome: row.name.last,
        idade: row.dob.age,
        foto: row.picture.thumbnail,
      };
    });

    // console.log(this.lista);
  }

  pesquisar() {
    const inputValue: any = document.querySelector('#nome');
    const nome = inputValue.value;
    if (nome && nome.length > 0) {
      const listaUsuarios: any = document.querySelector('#listaUsuarios');
      const filterList = this.lista
        .filter((row) => {
          return (
            row.nome.toLowerCase().indexOf(nome.toLowerCase()) > -1 ||
            row.sobrenome.toLowerCase().indexOf(nome.toLowerCase()) > -1
          );
        })
        .sort((a, b) => {
          return a.nome.localeCompare(b.nome);
        });
      listaUsuarios.innerHTML = '';
      filterList.forEach((element) => {
        var div: any = document.createElement('div');
        var img: any = document.createElement('img');
        var span: any = document.createElement('span');
        if (element.sexo === 'female') {
          div.style =
            'display: flex; justify-content: flex-start; align-items: center; border: 2px solid #FFB6C1; border-radius: 4px; margin: 5px;';
        } else {
          div.style =
            'display: flex; justify-content: flex-start; align-items: center; border: 2px solid #87CEFA; border-radius: 4px; margin: 5px;';
        }

        img.src = `${element.foto}`;
        img.style =
          'border-radius: 50%;width: 50px; height: 50px; margin: 5px;';
        span.style = 'color: #fff;';
        span.textContent = `${element.nome} ${element.sobrenome}, ${element.idade} anos`;
        div.appendChild(img);
        div.appendChild(span);
        listaUsuarios.appendChild(div);
      });

      const masculino: any = document.querySelector('#masculino');
      const feminino: any = document.querySelector('#feminino');
      const soma: any = document.querySelector('#soma');
      const media: any = document.querySelector('#media');
      const usuariosEncontrados: any = document.querySelector(
        '#usuariosEncontrados'
      );

      let contaMasculino = 0;
      let contaFeminino = 0;
      let somaMasculino = 0;
      let somaFeminino = 0;

      filterList.forEach((row) => {
        if (row.sexo === 'male') {
          contaMasculino += 1;
          somaMasculino += row.idade;
        } else {
          contaFeminino += 1;
          somaFeminino += row.idade;
        }
      });
      usuariosEncontrados.textContent = `${
        contaFeminino + contaMasculino
      } usuários encontrados`;
      masculino.textContent = contaMasculino;
      feminino.textContent = contaFeminino;
      soma.textContent = somaFeminino + somaMasculino;
      media.textContent =
        contaFeminino + contaMasculino === 0
          ? '0'
          : (
              (somaFeminino + somaMasculino) /
              (contaFeminino + contaMasculino)
            ).toLocaleString('pt-BR', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            });
    }
  }

  change(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      event.preventDefault();
      this.pesquisar();
    }
  }

  changeNumero(event) {
    var numeroa: any = document.querySelector('#numeroa');
    var numerob: any = document.querySelector('#numerob');

    if (numeroa?.value && numerob?.value) {
      var somaab: any = document.querySelector('#somaab');
      var subtracaoab: any = document.querySelector('#subtracaoab');
      var subtracaoba: any = document.querySelector('#subtracaoba');
      var multiplicacaoab: any = document.querySelector('#multiplicacaoab');
      var divisaoab: any = document.querySelector('#divisaoab');
      var divisaoba: any = document.querySelector('#divisaoba');
      var quadradoa: any = document.querySelector('#quadradoa');
      var quadradob: any = document.querySelector('#quadradob');
      var divisoresa: any = document.querySelector('#divisoresa');
      var divisoresb: any = document.querySelector('#divisoresb');
      var fatoriala: any = document.querySelector('#fatoriala');
      var fatorialb: any = document.querySelector('#fatorialb');

      somaab.value = this.soma(numeroa?.value, numerob?.value);
      subtracaoab.value = this.subtracao(numeroa?.value, numerob?.value);
      subtracaoba.value = this.subtracao(numerob?.value, numeroa?.value);
      multiplicacaoab.value = this.multiplicacao(
        numeroa?.value,
        numerob?.value
      );
      divisaoab.value = this.divisao(numeroa?.value, numerob?.value).toFixed(2);
      divisaoba.value = this.divisao(numerob?.value, numeroa?.value).toFixed(2);
      quadradoa.value = this.quadrado(numeroa?.value);
      quadradob.value = this.quadrado(numerob?.value);
      divisoresa.value = this.divisores(numeroa?.value);
      divisoresb.value = this.divisores(numerob?.value);
      fatoriala.value = this.fatorial(numeroa?.value);
      fatorialb.value = this.fatorial(numerob?.value);
    }
  }

  subtracao(a, b) {
    return parseInt(a) - parseInt(b);
  }

  soma(a, b) {
    return parseInt(a) + parseInt(b);
  }

  divisao(a, b) {
    return parseInt(a) / parseInt(b);
  }

  multiplicacao(a, b) {
    return parseInt(a) * parseInt(b);
  }

  quadrado(numero) {
    return parseInt(numero) * parseInt(numero);
  }

  fatorial(numero) {
    numero = parseInt(numero);
    if (numero === 0 || numero === 1) {
      return 1;
    } else {
      return numero * this.fatorial(numero - 1);
    }
  }

  divisores(numero) {
    var ehPrimeiro = true;
    var count = 0;
    var resultado = '';

    for (var i = 1; i <= parseInt(numero); i++) {
      if (ehPrimeiro) {
        if (parseInt(numero) % i === 0) {
          resultado = resultado + i;
          count++;
        }
        ehPrimeiro = false;
      } else {
        if (parseInt(numero) % i === 0) {
          resultado = resultado + ', ' + i;
          count++;
        }
      }
    }

    resultado = resultado + ` (${count})`;

    return resultado;
  }

  changeRGB() {
    this.red = document.querySelector('#redInput');
    this.green = document.querySelector('#greenInput');
    this.blue = document.querySelector('#blueInput');
    this.redValue = document.querySelector('#redInputValue');
    this.greenValue = document.querySelector('#greenInputValue');
    this.blueValue = document.querySelector('#blueInputValue');
    this.titulo = document.querySelector('#titulo');

    this.quadradoRGB = document.querySelector('#quadradoRGB');

    this.redValue.value = this.red.value;
    this.greenValue.value = this.green.value;
    this.blueValue.value = this.blue.value;

    this.titulo.textContent = `RGB(${this.redValue.value},${this.greenValue.value},${this.blueValue.value})`;
    this.titulo.style.color = `rgb(${this.redValue.value},${this.greenValue.value},${this.blueValue.value})`;
    this.quadradoRGB.style.backgroundColor = `rgb(${this.redValue.value},${this.greenValue.value},${this.blueValue.value})`;
  }
}
