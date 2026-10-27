import { TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from '../config/font-awesome-icons';

/** Registra os ícones do site na biblioteca do Font Awesome usada nos testes. */
export function registerIcons(): void {
  TestBed.inject(FaIconLibrary).addIcons(...fontAwesomeIcons);
}
