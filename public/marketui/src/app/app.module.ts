import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { animate } from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';

import { MarketuiComponent } from './app.component';

import { LoginModule } from './components/login/login.module';
import { ItemsListComponent } from './components/items-list/items-list.component';

@NgModule({
  declarations: [
    MarketuiComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    
    LoginModule
  ],
  providers: [],
  bootstrap: [MarketuiComponent]
})
export class AppModule { }
