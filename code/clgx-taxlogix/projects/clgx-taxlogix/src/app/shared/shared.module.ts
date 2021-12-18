import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';

import { BigInputComponent } from './big-input/big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action/big-input-action.component';
import { RtlSupportDirective } from './rtl-support/rtl-support.directive';
import { Shared3rdPartyModule } from './third-party.module';
import { MultiLineSnackbarComponent } from './utilities/snackbar/component/multi-line-snackbar-component';
import { ClgxSnackBarService } from './utilities';
import { FooterLgComponent } from './components/footer-lg/footer-lg.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaxlogixSpinnerComponent } from './utilities/taxlogix-spinner/taxlogix-spinner.component';
import { ButtonComponent } from './components/button/button.component';
import { AlertMessageComponent } from './dialog-model/alert-message/alert-message.component';
import { ProgressBarColorDirective } from './dialog-model/alert-message/progress-bar-color.directive';
import { RegistrationPlansComponent } from './components/registration-plans/registration-plans.component';
import { LetsconnectDialogComponent } from './dialog-model/letsconnect-dialog/letsconnect-dialog.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClgxInputComponent } from './big-input/clgx-input/clgx-input.component';
import { ClgxSelectComponent } from './big-input/clgx-select/clgx-select.component';
import { ClgxButtonComponent } from './big-input/clgx-button/clgx-button.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Shared3rdPartyModule,
    TranslateModule,
    // NgbModule,
    FontAwesomeModule,
    AnimateOnScrollModule.forRoot(),
    ScrollingModule,
    NgxDatatableModule
  ],
  declarations: [
    BigInputComponent,
    BigInputActionComponent,
    ClgxInputComponent,
    ClgxSelectComponent,
    ClgxButtonComponent,
    RtlSupportDirective,
    MultiLineSnackbarComponent,
    FooterLgComponent,
    ButtonComponent,
    AlertMessageComponent,
    LetsconnectDialogComponent,
    ProgressBarColorDirective,
    RegistrationPlansComponent,
    TaxlogixSpinnerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Shared3rdPartyModule,
    AnimateOnScrollModule,
    ScrollingModule,
    TranslateModule,
    FontAwesomeModule,
    NgxDatatableModule,
    BigInputComponent,
    BigInputActionComponent,
    ClgxInputComponent,
    ClgxSelectComponent,
    ClgxButtonComponent,
    RtlSupportDirective,
    FooterLgComponent,
    ButtonComponent,
    AlertMessageComponent,
    LetsconnectDialogComponent,
    RegistrationPlansComponent,
    TaxlogixSpinnerComponent
  ],
  providers: [ClgxSnackBarService]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook
    );
  }
}
