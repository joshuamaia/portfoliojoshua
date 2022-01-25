import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-exemplos',
  templateUrl: './input-exemplos.component.html',
  styleUrls: ['./input-exemplos.component.css'],
})
export class InputExemplosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  completaZeroEsquerda() {
    const zeroesquerda: any = document.querySelector('#zeroesquerda');

    const zeroesquerdaNumber = Number(zeroesquerda.value);

    zeroesquerda.value = String(zeroesquerdaNumber).padStart(6, '0');
  }
}
