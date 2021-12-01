import { ActivationEnd, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  distinctUntilChanged,
  filter,
  switchMap,
  mergeMap,
  catchError
} from 'rxjs/operators';

import { selectAgencyState } from '../../core.state';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { AnimationsService } from '../../providers/animations/animations.service';
import { TitleService } from '../../providers/title/title.service';
import * as fromSelectors from '@app/core/store/auth/auth.selectors';

import {
 selectActionInProgress,
 selectAgencies,
 selectAgency,
 selectAgencyStoreState,
 selectCollectionDates,
 selectEscrowNonEscrowDetails,
 selectPaymentDetails
} from './agency.selectors';
import { PaymentDetails, State } from './agency.model';
import { AgencyDataService } from './agency-data-api.service';
import * as agencyActions from './agency.actions';

export const AGENCY_KEY = 'agency';

const INIT = of('clgx-init-effect-trigger');

@Injectable()
export class AgencyEffects {

  getAgencies = createEffect(() =>
      this.actions$.pipe(
        ofType(agencyActions.actionGetAllActiveAgencies),
        switchMap(action => this.agencyDataService.
          getAgencies(action.request).pipe(
          mergeMap( agencyList => [
            agencyActions.actionGetAllActiveAgenciesSuccess({agencyList: agencyList}),
          ]),
          catchError(error => of(agencyActions.actionAgencyApiFailure(error)))
        ))
      )
    );

  addAgency = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionSaveAgencyDetails),
    switchMap((action)=>this.agencyDataService.addAgency(action.agency).pipe(
      mergeMap( agencyDetails=>[
        agencyActions.actionSaveAgencyDetailsSuccess({agency : agencyDetails}),
      ]),
      catchError(error => of(agencyActions.actionSaveAgencyDetailsFailure({error : error})))
    ))
  )
  );

  updateAgency = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionUpdateAgencyDetails),
    switchMap((action)=>this.agencyDataService.updateAgency(action.agency).pipe(
      mergeMap( agencyDetails=>[
        agencyActions.actionUpdateAgencyDetailsSuccess({agency : agencyDetails}),
      ]),
      catchError(error => of(agencyActions.actionUpdateAgencyDetailsFailure({error : error})))
    ))
  )
  );

  getCollectionDates = createEffect(() =>
      this.actions$.pipe(
        ofType(agencyActions.actionGetCollectionDates),
      switchMap((action) => this.agencyDataService.getCollectionsDates(action.request).pipe(
          mergeMap( collectionDates =>[
            agencyActions.actionGetCollectionDatesSuccess({collectionDates: collectionDates}),
          ]),
          catchError(error => of(agencyActions.actionGetCollectionDatesFailure(error)))
        ))
      )
    );

    saveCollectionDates = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionSaveCollectionDates),
      switchMap((action)=>this.agencyDataService.addCollectionDate(action.collectionDates).pipe(
        mergeMap( collectioNDates=>[
          agencyActions.actionSaveCollectionDatesSuccess(collectioNDates),
        ]),
        catchError(error => of(agencyActions.actionSaveCollectionDatesFailure({error : error})))
      ))
    )
    );
  
  

  updateCollectionDate = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionUpdateCollectionDates),
    switchMap((action)=>this.agencyDataService.updateCollectionDate(action.collectionDates).pipe(
      mergeMap( collectionDates=>[
        agencyActions.actionUpdateCollectionDatesSuccess({collectionDates : collectionDates}),
      ]),
      catchError(error => of(agencyActions.actionUpdateCollectionDatesFailure({error : error})))
    ))
  )
  );

  getEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionGetEscrowDetails),
    switchMap((action)=>this.agencyDataService.getEscrow(action.request).pipe(
      mergeMap( escrowDetails=>[
        agencyActions.actionGetEscrowDetailsSuccess({escrowDetails : escrowDetails}),
      ]),
      catchError(error => of(agencyActions.actionGetEscrowDetailsFailure({error : error})))
    ))
  )
  );

  getNonEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionGetNonEscrowDetails),
    switchMap((action)=>this.agencyDataService.getNonEscrow(action.request).pipe(
      mergeMap( nonEscrowDetails=>[
        agencyActions.actionGetNonEscrowDetailsSuccess({nonEscrowDetails : nonEscrowDetails}),
      ]),
      catchError(error => of(agencyActions.actionGetNonEscrowDetailsFailure({error : error})))
    ))
  )
  );

  saveEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionSaveEscrowDetails),
    switchMap((action)=>this.agencyDataService.addEscrow(action.escrowDetails).pipe(
      mergeMap( escrowDetails=>[
        agencyActions.actionSaveEscrowDetailsSuccess(escrowDetails),
      ]),
      catchError(error => of(agencyActions.actionSaveEscrowDetailsFailure({error : error})))
    ))
  )
  );

  saveNonEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionSaveNonEscrowDetails),
    switchMap((action)=>this.agencyDataService.addNonEscrow(action.nonEscrowDetails).pipe(
      mergeMap( nonEscrowDetails=>[
        agencyActions.actionSaveNonEscrowDetailsSuccess({nonEscrowDetails : nonEscrowDetails}),
      ]),
      catchError(error => of(agencyActions.actionSaveNonEscrowDetailsFailure({error : error})))
    ))
  )
  );

  updateEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionUpdateEscrowDetails),
    switchMap((action)=>this.agencyDataService.updateEscrow(action.escrowDetails).pipe(
      mergeMap( escrowDetails=>[
        agencyActions.actionUpdateEscrowDetailsSuccess(escrowDetails),
      ]),
      catchError(error => of(agencyActions.actionUpdateEscrowDetailsFailure({error : error})))
    ))
  )
  );

  updateNonEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionUpdateNonEscrowDetails),
    switchMap((action)=>this.agencyDataService.updateNonEscrow(action.nonEscrowDetails).pipe(
      mergeMap( nonEscrowDetails=>[
        agencyActions.actionUpdateNonEscrowDetailsSuccess({nonEscrowDetails : nonEscrowDetails}),
      ]),
      catchError(error => of(agencyActions.actionUpdateNonEscrowDetailsFailure({error : error})))
    ))
  )
  );

  getPaymentDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionGetPaymentDetails),
    switchMap((action)=>this.agencyDataService.getPaymentDetails(action.request).pipe(
      mergeMap( paymentDetails=>[
        agencyActions.actionGetPaymentDetailsSuccess({paymentDetails : paymentDetails}),
      ]),
      catchError(error => of(agencyActions.actionGetPaymentDetailsFailure({error : error})))
    ))
  )
  );

  savePaymentDetails = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionSavePaymentDetails),
    switchMap((action)=>this.agencyDataService.addPaymentDetails(action.details).pipe(
      mergeMap( paymentDetails=>[
        agencyActions.actionSavePaymentDetailsSuccess(paymentDetails),
      ]),
      catchError(error => of(agencyActions.actionSavePaymentDetailsFailure({error : error})))
    ))
  )
  );

  updatePaymentDetails = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionUpdatePaymentDetails),
    switchMap((action)=>this.agencyDataService.updatePaymentDetails(action.details).pipe(
      mergeMap( paymentDetails=>[
        agencyActions.actionUpdatePaymentDetailsSuccess(paymentDetails),
      ]),
      catchError(error => of(agencyActions.actionUpdatePaymentDetailsFailure({error : error})))
    ))
  )
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

export const effects: any[] = [AgencyEffects];
