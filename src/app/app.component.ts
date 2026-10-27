import { Component, ChangeDetectionStrategy } from '@angular/core';
import { scrollToTopOnPageChange } from './shared/scroll-to-top';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  constructor() {
    scrollToTopOnPageChange();
  }
}
