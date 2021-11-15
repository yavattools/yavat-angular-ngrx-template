import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessageComponent } from '@app/shared/dialog-model/alert-message/alert-message.component';
import { isEmpty } from 'lodash-es';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-validate-link',
  templateUrl: './validate-link.component.html',
  styleUrls: ['./validate-link.component.scss']
})
export class ValidateLinkComponent implements OnInit {
  activateUserId: string | undefined;
  displaySuccessMsg = false;
  dialogRef: any;
  usernameOrEmail: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!isEmpty(params.id)) {
        this.validateLink(params.id);
      }
    });
  }

  goback() {
    this.router.navigate(['']);
  }

  validateLink(resetPwdId: any) {
    this.loginService.activateLink(resetPwdId).subscribe(
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
          this.displaySuccessMsg = false;
        } else {
          this.usernameOrEmail = res.userMailId;
          this.displaySuccessMsg = true;
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
