import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  ResetPasswordComponent
} from '.';
import { ValidateLinkComponent } from './validate-link/validate-link.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'validate-client/:id',
    component: ValidateLinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
