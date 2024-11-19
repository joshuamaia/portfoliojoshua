import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-escolaridade-item',
    templateUrl: './escolaridade-item.component.html',
    styleUrl: './escolaridade-item.component.css',
    standalone: false
})
export class EscolaridadeItemComponent {
  @Input() titulo!: string;
  @Input() destaque!: boolean;
}
