import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash-es';
import { LoginService } from '../login.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageComponent } from '@app/shared/dialog-model/alert-message/alert-message.component';
import { GenericService } from '@app/shared/services/generic.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loginForm: FormGroup;
  isEnabled!: boolean;
  resetpasswordId!: string;
  displayChangePass = false;
  usernameOrEmail!: string;
  dialogRef: any;
  userId: string | undefined;
  showResetPass = true;
  hide = true;
  hidePass = true;
  showValidationText = false;
  forgotPassTxt = false;
  changePassTxt = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private loginService: LoginService,
    private genericService: GenericService,
    private router: Router
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/[!@#$%^&*()]+/),
          this.oneNumberValidator()
        ]
      ],
      confirmPassword: ['', [Validators.required, this.confirmPassword()]]
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      ipaddress: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!isEmpty(params.id)) {
        this.resetpasswordId = params.id;
        this.validateLink(params.id);
        this.displayChangePass = true;
        this.forgotPassTxt = true;
      } else {
        this.changePassTxt = true;
        this.displayChangePass = true;
      }
    });
    this.getSystemIpAddress();
  }

  goback() {
    this.location.back();
  }

  oneNumberValidator() {
    return (control: AbstractControl) => {
      const hasNumber = /\d/.test(control.value);
      if (control.value && !hasNumber) {
        return { minoneNumber: true };
      }
      return null;
    };
  }

  confirmPassword() {
    return (c: AbstractControl) => {
      const v = c.value;
      const e = c.root.get('password');

      if (e && v !== e.value) {
        return { validateEqual: true };
      }
      return null;
    };
  }

  isConfirmPassDisable() {
    if (!this.changePasswordForm.controls.password.valid) {
      this.changePasswordForm.controls.confirmPassword.disable();
      this.isEnabled = false;
      return false;
    } else {
      this.changePasswordForm.controls.confirmPassword.enable();
      this.isEnabled = true;
      return true;
    }
  }

  getSystemIpAddress() {
    this.loginService.getIpaddres().subscribe((res) => {
      this.loginForm.get('ipaddress')?.setValue(res);
    });
  }

  validateLink(resetPwdId: any) {
    this.loginService.validateLink(resetPwdId).subscribe(
      (res: any) => {
        if (res.statusCode === 0) {
          this.dialogRef = this.matDialog.open(AlertMessageComponent, {
            panelClass: 'alert-success',
            position: { top: '35px' },
            data: {
              alertType: 'error',
              message: res.statusMessage
            }
          });
          this.displayChangePass = false;
        } else {
          this.usernameOrEmail = res.userMailId;
          this.displayChangePass = true;
        }
      },
      (error) => {
        this.dialogRef = this.matDialog.open(AlertMessageComponent, {
          panelClass: 'alert-success',
          position: { top: '35px' },
          data: {
            alertType: 'error',
            message: 'Something went wrong! please try after some time !'
          }
        });
      }
    );
  }

  enableValidations() {
    if (!this.showValidationText) {
      this.showValidationText = true;
    }
  }

  changePassword() {
    const requestObj = {
      usernameOrEmail: this.usernameOrEmail,
      password: this.changePasswordForm.controls.confirmPassword.value,
      resetPwdId: this.resetpasswordId,
      userId: this.genericService.getUserId()
    };
    this.loginService.changePassword(requestObj).subscribe((res: any) => {
      if (res.statusCode === 1) {
        this.dialogRef = this.matDialog.open(AlertMessageComponent, {
          panelClass: 'alert-success',
          position: { top: '35px' },
          data: {
            alertType: 'success',
            message: res.statusMessage
          }
        });
        this.dialogRef.afterClosed().subscribe(() => {
          this.dialogRef.close();
          this.router.navigate(['']);
        });
      } else if (res.statusCode === 201) {
        this.dialogRef = this.matDialog.open(AlertMessageComponent, {
          panelClass: 'alert-success',
          position: { top: '35px' },
          data: {
            alertType: 'warning',
            message: res.statusMessage
          }
        });
      }
    });
  }

  submitForm() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value).subscribe(
        (data: any) => {
          if (data?.statusCode === 200 && data?.errorCodeId === 203) {
            this.dialogRef = this.matDialog.open(AlertMessageComponent, {
              panelClass: 'alert-success',
              position: { top: '35px' },
              data: {
                alertType: 'success',
                message: data.statusMessage
              }
            });
          } else if (data?.statusCode === 200 && data?.errorCodeId === 201) {
            this.dialogRef = this.matDialog.open(AlertMessageComponent, {
              panelClass: 'alert-success',
              position: { top: '35px' },
              data: {
                alertType: 'warning',
                message: data.statusMessage
              }
            });
          } else if (data?.statusCode === 200 && data?.errorCodeId === 202) {
            this.dialogRef = this.matDialog.open(AlertMessageComponent, {
              panelClass: 'alert-success',
              position: { top: '35px' },
              data: {
                alertType: 'warning ',
                message: data.statusMessage
              }
            });
          }
        },
        (error) => {
          this.dialogRef = this.matDialog.open(AlertMessageComponent, {
            panelClass: 'alert-success',
            position: { top: '35px' },
            data: {
              alertType: 'error',
              message: 'Something went wrong! please try after some time !'
            }
          });
        }
      );
    }
  }
}
