import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MarketuiComponent } from './app.component';

@NgModule({
  declarations: [
    MarketuiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MarketuiComponent]
})
export class AppModule { }
