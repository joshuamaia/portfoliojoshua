import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f7f7fb', dark: '#0b0d12' };

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.initialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => this.apply(this.theme()));
  }

  toggleTheme(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Armazenamento indisponível (modo privado); o tema vale só para a sessão
    }
  }

  private initialTheme(): Theme {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    // 'day' / 'night' são os valores gravados pela versão anterior do site
    if (saved === 'light' || saved === 'day') return 'light';
    if (saved === 'dark' || saved === 'night') return 'dark';
    return this.document.defaultView?.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  private apply(theme: Theme): void {
    const root = this.document.documentElement;
    root.setAttribute('data-bs-theme', theme);
    root.style.colorScheme = theme;
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme]);
  }
}
