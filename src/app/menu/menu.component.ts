import { Component, signal } from '@angular/core';
import { MenuItem } from './menu-item/menu.item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  itensMenu = signal<MenuItem[]>([
    { title: 'Home', icon: ['fas', 'house'], routerLink: '/home' },
    { title: 'Trabalhos', icon: ['fas', 'tasks'], routerLink: '/trabalhos' },
    {
      title: 'Escolaridades',
      icon: ['fas', 'book-atlas'],
      subMenus: [
        {
          title: 'Escolaridades',
          icon: ['fas', 'book-bookmark'],
          routerLink: '/escolaridades',
        },
        {
          title: 'Escolaridades Extra',
          icon: ['fas', 'tasks'],
          routerLink: '/escolaridades/extra',
        },
      ],
    },
    {
      title: 'Certificados',
      icon: ['fas', 'certificate'],
      routerLink: '/certificados',
    },
  ]);
}
