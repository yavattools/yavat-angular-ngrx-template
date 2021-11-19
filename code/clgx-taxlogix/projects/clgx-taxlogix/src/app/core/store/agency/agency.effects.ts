import { ActivationEnd, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  distinctUntilChanged,
  filter,
  switchMap,
  catchError
} from 'rxjs/operators';

import { selectAgencyState } from '../../core.state';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { AnimationsService } from '../../providers/animations/animations.service';
import { TitleService } from '../../providers/title/title.service';

import {
  actionAgencyApiFailure,
actionGetAllActiveAgencies,
actionGetAllActiveAgenciesSuccess,
actionGetCollectionDates,
actionGetCollectionDatesSuccess,
actionGetEscrowNonEscrowDetails,
actionGetEscrowNonEscrowDetailsSuccess,
actionGetPaymentDetails,
actionGetPaymentDetailsSuccess,
actionSaveAgencyDetails,
actionSaveAgencyDetailsSuccess,
actionSaveCollectionDates,
actionSaveCollectionDatesSuccess,
actionSaveEscrowDetails,
actionSaveEscrowDetailsSuccess,
actionSaveNonEscrowDetails,
actionSaveNonEscrowDetailsSuccess,
actionSavePaymentDetails,
actionSavePaymentDetailsSuccess,
actionSetSelectedAgency,
actionStartActionInProgress,
actionStopActionInProgress,
actionUpdateAgencyDetails,
actionUpdateAgencyDetailsSuccess,
actionUpdateCollectionDates,
actionUpdateCollectionDatesSuccess,
actionUpdateEscrowDetails,
actionUpdateEscrowDetailsSuccess,
actionUpdateNonEscrowDetails,
actionUpdateNonEscrowDetailsSuccess,
actionUpdatePaymentDetails,
actionUpdatePaymentDetailsSuccess
} from './agency.actions';
import {
 selectActionInProgress,
 selectAgencies,
 selectAgency,
 selectAgencyStoreState,
 selectCollectionDates,
 selectEscrowNonEscrowDetails,
 selectPaymentDetails
} from './agency.selectors';
import { State } from './agency.model';
import { AgencyDataService } from './agency-data-api.service';
import * as agencyActions from './agency.actions';

export const AGENCY_KEY = 'AGENCY';

const INIT = of('clgx-init-effect-trigger');

@Injectable()
export class AgencyEffects {
  
  getAgencies = createEffect(
    () =>
        this.actions$.pipe(ofType(actionGetAllActiveAgencies))
        .pipe(tap((action) => {
          this.agencyDataService.getAgencies(action.request).pipe(
            switchMap( agencyList => [
              agencyActions.actionGetAllActiveAgenciesSuccess({agencyList: agencyList}),
            ]),
            catchError(error => of(agencyActions.actionAgencyApiFailure(error)))
          )
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private agencyDataService: AgencyDataService,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {}
}
