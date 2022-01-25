import { Component, OnInit } from '@angular/core';
import { UtilsService } from './utils.service';
import { generate } from 'gerador-validador-cpf';
import { validate } from 'gerador-validador-cpf';
import { cnpj } from 'cpf-cnpj-validator';
import swal from 'sweetalert2';

export interface CEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css'],
})
export class UtilsComponent implements OnInit {
  cep: CEP;
  cepBuscado: string = '';
  cpfGerado: string = '';
  cpf: string = '';
  cnpjGerado: string = '';
  cnpj: string = '';

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}

  buscarCep() {
    this.utilsService.getCep(this.cepBuscado).subscribe((response) => {
      this.cep = response;
    });
  }

  geraCpf() {
    this.cpfGerado = generate({ format: true });
  }

  validarCpf() {
    const valido = validate(this.cpf);
    if (valido) {
      swal.fire('Validar CPF', '<h1>Cpf Válido!</h1>', 'info');
    } else {
      swal.fire('Validar CPF', '<h1>Cpf Inválido!</h1>', 'error');
    }
  }

  geraCnpj() {
    this.cnpjGerado = cnpj.format(cnpj.generate());
  }

  validarCnpj() {
    const valido = this.validarCNPJ(this.cnpj);
    if (valido) {
      swal.fire('Validar CNPJ', '<h1>Cnpj Válido!</h1>', 'info');
    } else {
      swal.fire('Validar CNPJ', '<h1>Cnpj Inválido!</h1>', 'error');
    }
  }

  validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
}
