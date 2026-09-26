import { Component, inject, signal } from '@angular/core';
import { MenuItem } from './menu-item/menu.item';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: false,
})
export class MenuComponent {
  private readonly themeService = inject(ThemeService);

  readonly isDark = this.themeService.isDark;
  readonly menuAberto = signal(false);

  readonly itensMenu: MenuItem[] = [
    { title: 'Home', icon: ['fas', 'house'], routerLink: '/home' },
    { title: 'Experience', icon: ['fas', 'briefcase'], routerLink: '/trabalhos' },
    { title: 'Education', icon: ['fas', 'graduation-cap'], routerLink: '/escolaridades' },
    { title: 'Courses', icon: ['fas', 'book-open'], routerLink: '/escolaridades/extra' },
    { title: 'Certificates', icon: ['fas', 'certificate'], routerLink: '/certificados' },
  ];

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }
}
