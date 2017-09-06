import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MarketuiComponent } from './app.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

@NgModule({
  declarations: [
    MarketuiComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MarketuiComponent]
})
export class AppModule { }
