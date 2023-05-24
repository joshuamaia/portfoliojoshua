import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { fontAwesomeIcons } from '../config/font-awesome-icons';

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule, NgbModule],
  exports: [FontAwesomeModule],
})
export class SharedModule {
  constructor(private fontAwesomeLibrary: FaIconLibrary) {
    this.configureFontAwesome();
  }

  private configureFontAwesome() {
    this.fontAwesomeLibrary.addIcons(...fontAwesomeIcons);
  }
}
