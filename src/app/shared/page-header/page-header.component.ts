import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header class="page-header" appReveal>
      <span class="eyebrow">{{ eyebrow }}</span>
      <h1 class="page-title">{{ title }}</h1>
      @if (subtitle) {
        <p class="page-subtitle">{{ subtitle }}</p>
      }
    </header>
  `,
  standalone: false,
})
export class PageHeaderComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
