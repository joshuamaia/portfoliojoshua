import { Component, Input } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-certificado-item',
  templateUrl: './certificado-item.component.html',
  standalone: false,
})
export class CertificadoItemComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) icon!: [IconPrefix, IconName];
  @Input() total = 0;
}
