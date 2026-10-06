import { Component, ChangeDetectionStrategy } from '@angular/core';
import { certificateGroups } from '../../data/certificates';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CertificadoComponent {
  readonly grupos = certificateGroups;
}
