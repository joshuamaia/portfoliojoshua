// src/app/theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  setTheme(theme: 'day' | 'night'): void {
    this.renderer.removeClass(document.body, 'theme-day');
    this.renderer.removeClass(document.body, 'theme-night');
    this.renderer.addClass(document.body, `theme-${theme}`);
    localStorage.setItem('theme', theme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') as 'day' | 'night'; // Default to night theme
    this.setTheme(savedTheme);
  }

  toggleTheme(): void {
    const currentTheme =
      localStorage.getItem('theme') === 'day' ? 'night' : 'day';
    this.setTheme(currentTheme);
  }
}
