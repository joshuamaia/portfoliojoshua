import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-certificado-item',
  templateUrl: './certificado-item.component.html',
  styleUrl: './certificado-item.component.css',
})
export class CertificadoItemComponent {
  @Input() titulo!: string;
}
