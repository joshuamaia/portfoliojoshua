import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent, TopoComponent, RodapeComponent, MenuComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
