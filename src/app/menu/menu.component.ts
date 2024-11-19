import { Component, signal } from '@angular/core';
import { MenuItem } from './menu-item/menu.item';
import { ThemeService } from './theme.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: false
})
export class MenuComponent {
  constructor(private themeService: ThemeService) {}

  itensMenu = signal<MenuItem[]>([
    { title: 'Home', icon: ['fas', 'house'], routerLink: '/home' },
    {
      title: 'Trabalhos',
      icon: ['fas', 'briefcase'],
      routerLink: '/trabalhos',
    },
    {
      title: 'Escolaridades',
      icon: ['fas', 'school'],
      subMenus: [
        {
          title: 'Escolaridades',
          icon: ['fas', 'book-bookmark'],
          routerLink: '/escolaridades',
        },
        {
          title: 'Escolaridades Extra',
          icon: ['fas', 'school-flag'],
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

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  descricaoToggeTheme(): string {
    const savedTheme = localStorage.getItem('theme') as 'day' | 'night';
    return savedTheme === 'day' ? 'Tema Escuro' : 'Tema Claro';
  }
}
