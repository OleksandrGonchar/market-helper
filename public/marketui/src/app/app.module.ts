import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdToolbarModule } from '@angular/material'

import { MarketuiComponent } from './app.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

@NgModule({
  declarations: [
    MarketuiComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [MarketuiComponent]
})
export class AppModule { }
