import { Component, signal } from '@angular/core';
import { MenuItem } from './menu-item/menu.item';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false,
})
export class MenuComponent {
  constructor(private themeService: ThemeService) {}

  itensMenu = signal<MenuItem[]>([
    { title: 'Home', icon: ['fas', 'house'], routerLink: '/home' },
    {
      title: 'Work Experience',
      icon: ['fas', 'briefcase'],
      routerLink: '/trabalhos',
    },
    {
      title: 'Education',
      icon: ['fas', 'school'],
      subMenus: [
        {
          title: 'Education',
          icon: ['fas', 'book-bookmark'],
          routerLink: '/escolaridades',
        },
        {
          title: 'Extra Education',
          icon: ['fas', 'school-flag'],
          routerLink: '/escolaridades/extra',
        },
      ],
    },
    {
      title: 'Certificates',
      icon: ['fas', 'certificate'],
      routerLink: '/certificados',
    },
  ]);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggeTheme(): boolean {
    const savedTheme = localStorage.getItem('theme') as 'day' | 'night';
    return savedTheme !== 'day';
  }
}
