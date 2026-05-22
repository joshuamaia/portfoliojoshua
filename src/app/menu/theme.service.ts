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
    const saved = localStorage.getItem('theme');
    const theme: 'day' | 'night' = saved === 'day' ? 'day' : 'night';
    this.setTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme =
      localStorage.getItem('theme') === 'day' ? 'night' : 'day';
    this.setTheme(currentTheme);
  }
}
