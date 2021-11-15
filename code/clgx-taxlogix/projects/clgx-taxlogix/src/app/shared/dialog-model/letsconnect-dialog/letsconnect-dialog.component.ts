import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { LoginService } from '@app/features/login/login.service';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

@Component({
  selector: 'app-letsconnect-dialog',
  templateUrl: './letsconnect-dialog.component.html',
  styleUrls: ['./letsconnect-dialog.component.scss']
})
export class LetsconnectDialogComponent implements OnInit {
  letsConnectForm: FormGroup;
  dialogRef: any;

  constructor(
    private matDialogRef: MatDialogRef<LetsconnectDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialog: MatDialog,
    private loginService: LoginService
  ) {
    this.letsConnectForm = this.fb.group({
      username: [''],
      useremail: [''],
      usernumber: [''],
      usermessage: ['']
    });
  }

  ngOnInit(): void {}

  submit() {
    let request = {
      name: this.letsConnectForm.value.username,
      phoneNumber: this.letsConnectForm.value.usernumber,
      email: this.letsConnectForm.value.useremail,
      message: this.letsConnectForm.value.usermessage
    };
    this.loginService.letsConnect(request).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.letsConnectForm.reset();
        this.matDialogRef.close();
        this.dialogRef = this.matDialog.open(AlertMessageComponent, {
          panelClass: 'alert-success',
          position: { top: '35px' },
          data: {
            alertType: 'success',
            message: data.statusMessage
          }
        });
      }
    });
  }

  close() {
    this.matDialogRef.close();
  }
}
