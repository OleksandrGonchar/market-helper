import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Angular materual components */
import { MdToolbarModule, MdInputModule, MdButtonModule } from '@angular/material';
/* Custom components */
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdInputModule,
    MdButtonModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    LoginFormComponent,
    MdToolbarModule,
    MdInputModule,
    MdButtonModule
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginModule { }
