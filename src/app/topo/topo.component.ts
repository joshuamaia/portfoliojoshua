import { Component, HostListener, signal } from '@angular/core';
import { profile } from '../data/profile';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  standalone: false,
})
export class TopoComponent {
  readonly profile = profile;
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
