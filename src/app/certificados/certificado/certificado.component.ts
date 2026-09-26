import { Component } from '@angular/core';
import { certificateGroups } from '../../data/certificates';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  standalone: false,
})
export class CertificadoComponent {
  readonly grupos = certificateGroups;
}
