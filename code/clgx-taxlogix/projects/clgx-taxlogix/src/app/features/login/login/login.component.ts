import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { AlertMessageComponent } from '@app/shared/dialog-model/alert-message/alert-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ACCESS_TOKEN,
  BRANCH_ID,
  BRANCH_NAME,
  CLIENT_ID,
  IMAGE_BASE_PATH,
  PROCESS_ID,
  PROCESS_ORG,
  PROFILE_NAME,
  SCREEN_MAPPING,
  USER_ID,
  USER_MENUS
} from '../../../../../src/environments/environment';
import { GenericService } from '@app/shared/services/generic.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/core.module';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild('registrationPlans') public registrationPlans:
    | ElementRef
    | undefined;
  loginForm: FormGroup;
  hide = true;
  dialogRef: any;
  registartionPlans: any;
  displayProgressSpinner = false;
  isMobile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private matDialog: MatDialog,
    private genericService: GenericService,
    private router: Router,
    public settingsFacadeService: SettingsStoreFacade,
    public deviceService:DeviceDetectorService
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      ipaddress: [{ ip: '1.1.1.1' }]
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.settingsFacadeService.hideHeader();
    // this.getSystemIpAddress();
    if(this.deviceService.isMobile() || this.deviceService.isTablet()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.getRegistrationPlans();
    this.settingsFacadeService.setHeaderShowTime('on-scroll');

  }

  getSystemIpAddress() {
    this.loginService.getIpaddres().subscribe((res) => {
      this.loginForm.get('ipaddress')?.setValue(res);
    });
  }

  getRegistrationPlans() {
    this.loginService.getRegistrationPlans().subscribe((res) => {
      this.registartionPlans = res;
    });
  }

  moveToRegistattionPlans() {
    this.registrationPlans
      ? this.registrationPlans.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start'
        })
      : '';
  }

  navigateToRegister(event: any) {
    sessionStorage.setItem('selectedPlanId', event.taxLogixPlanId);
    this.router.navigate(['register']);
  }

  navigateToForgotPass() {
    this.router.navigate(['forgot-password']);
  }

  submitForm() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
    if (this.loginForm.valid) {
      this.displayProgressSpinner = true;
      this.router.navigate(['dashboard']);
      // this.loginService.loginUser(this.loginForm.value).subscribe(
      //   (data: any) => {
      //     this.displayProgressSpinner = false;
      //     if (data?.statusCode === 200 && data?.errorCodeId === 203) {
      //       localStorage.setItem(
      //         PROCESS_ORG,
      //         JSON.stringify(data.processOrgModel)
      //       );
      //       localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      //       localStorage.setItem(USER_MENUS, JSON.stringify(data.usersMenus));
      //       localStorage.setItem(PROFILE_NAME, data.username);
      //       localStorage.setItem(USER_ID, data.userId);
      //       localStorage.setItem(CLIENT_ID, data.loginResponseStatus.clientId);
      //       localStorage.setItem(
      //         BRANCH_NAME,
      //         data.loginResponseStatus.branchName
      //       );
      //       this.genericService.ClientBranch =
      //         data.loginResponseStatus.branchName;
      //       localStorage.setItem(BRANCH_ID, data.loginResponseStatus.branchId);
      //       localStorage.setItem(
      //         PROCESS_ID,
      //         data.loginResponseStatus.processId
      //       );
      //       if (data.profilePic) {
      //         sessionStorage.setItem(IMAGE_BASE_PATH, data.profilePic);
      //       }
      //       localStorage.setItem(
      //         SCREEN_MAPPING,
      //         JSON.stringify(
      //           data.loginResponseStatus.listOfScreenMapping.map(
      //             (item: any) => {
      //               return item.screeName;
      //             }
      //           )
      //         )
      //       );
      //       sessionStorage.setItem(
      //         'firstTimeLogin',
      //         data?.loginResponseStatus?.firstTimeLogin
      //       );
      //       if (this.genericService.isFeatureEnabled('client selection')) {
      //         this.router.navigate(['client-details']);
      //       } else {
      //         this.router.navigate(['dashboard']);
      //       }
      //     } else if (data?.statusCode === 200 && data?.errorCodeId === 201) {
      //       this.dialogRef = this.matDialog.open(AlertMessageComponent, {
      //         panelClass: 'alert-success',
      //         position: { top: '35px' },
      //         data: {
      //           alertType: 'warning',
      //           message: data.statusMessage
      //         }
      //       });
      //     } else if (data?.statusCode === 200 && data?.errorCodeId === 202) {
      //       this.dialogRef = this.matDialog.open(AlertMessageComponent, {
      //         panelClass: 'alert-success',
      //         position: { top: '35px' },
      //         data: {
      //           alertType: 'warning ',
      //           message: data.statusMessage
      //         }
      //       });
      //     }
      //   },
      //   (error) => {
      //     this.displayProgressSpinner = false;
      //     this.dialogRef = this.matDialog.open(AlertMessageComponent, {
      //       panelClass: 'alert-success',
      //       position: { top: '35px' },
      //       data: {
      //         alertType: 'error',
      //         message: 'Something went wrong! please try after some time !'
      //       }
      //     });
      //   }
      // );
    }
  }
}
