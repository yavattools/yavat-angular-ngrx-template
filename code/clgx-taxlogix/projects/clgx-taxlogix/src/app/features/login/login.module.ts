import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import {
  ForgotPasswordComponent,
  LoginComponent,
  ResetPasswordComponent
} from '.';
import { SharedModule } from '../../shared/shared.module';
import { ValidateLinkComponent } from './validate-link/validate-link.component';
import { WelcomeDialogComponent } from '../../shared/dialog-model/welcome-dialog/welcome-dialog.component';
import { AnimateOnScrollModule } from "ng2-animate-on-scroll";

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WelcomeDialogComponent,
    ValidateLinkComponent
  ],
  imports: [CommonModule, LoginRoutingModule, SharedModule]
})
export class LoginModule {}
