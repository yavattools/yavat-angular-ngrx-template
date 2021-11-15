import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  emailId: string | undefined;
  showForgetPass = true;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  goback() {
    this.location.back();
  }

  forgotPassword() {
    if (this.forgotPasswordForm && this.forgotPasswordForm.valid) {
      this.emailId = this.forgotPasswordForm.controls.email.value;
      this.loginService
        .forgotPassword(this.forgotPasswordForm.controls.email.value)
        .subscribe((res) => {
          if (res.statusCode === 1) {
            if (this.forgotPasswordForm) {
              this.forgotPasswordForm.reset();
              Object.keys(this.forgotPasswordForm.controls).forEach((key) => {
                this.forgotPasswordForm
                  ? this.forgotPasswordForm.controls[key].setErrors(null)
                  : '';
              });
            }
            this.showForgetPass = false;
          }
        });
    }
  }
}
