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
  getStateOptions = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetStateOptions),
      switchMap(() =>
        this.agencyDataService.getStates().pipe(
          mergeMap((stateOptions) => [
            agencyActions.actionGetStateOptionsSuccess({
              response: stateOptions
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetStateOptionsFailure(error))
          )
        )
      )
    )
  );

  getCounties = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetCountiesByStateId),
      switchMap((action) =>
        this.agencyDataService.getCounties(action.stateId).pipe(
          mergeMap((counties) => [
            agencyActions.actionGetCountiesByStateIdSuccess({
              response: counties,
              stateField: action.stateField
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetCountiesByStateIdFailure(error))
          )
        )
      )
    )
  );

  getAcessorCounties = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionAcessorGetCountiesByStateId),
      switchMap((action) =>
        this.agencyDataService.getCounties(action.stateId).pipe(
          mergeMap((counties) => [
            agencyActions.actionGetCountiesByStateIdSuccess({
              response: counties,
              stateField: action.stateField
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetCountiesByStateIdFailure(error))
          )
        )
      )
    )
  );

  getBillingRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetBillingRequestOptions),
      switchMap((action) =>
        this.agencyDataService
          .getBillingRequest(action.userId, action.processId)
          .pipe(
            mergeMap((response) => [
              agencyActions.actionGetBillingRequestOptionsSuccess({
                response: response
              })
            ]),
            catchError((error) =>
              of(agencyActions.actionGetBillingRequestOptionsFailure(error))
            )
          )
      )
    )
  );

  getMediaType = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetMediaTypeOptions),
      switchMap((action) =>
        this.agencyDataService
          .getMediaType(action.userId, action.processId)
          .pipe(
            mergeMap((response) => [
              agencyActions.actionGetMediaTypeOptionsSuccess({
                response: response
              })
            ]),
            catchError((error) =>
              of(agencyActions.actionGetMediaTypeOptionsFailure(error))
            )
          )
      )
    )
  );

  getAgencies = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetAllActiveAgencies),
      switchMap((action) =>
        this.agencyDataService.getAgencies(action.request).pipe(
          mergeMap((agencyList) => [
            agencyActions.actionGetAllActiveAgenciesSuccess({
              agencyList: agencyList
            })
          ]),
          catchError((error) => of(agencyActions.actionAgencyApiFailure(error)))
        )
      )
    )
  );

  addAgency = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionSaveAgencyDetails),
      switchMap((action) =>
        this.agencyDataService.addAgency(action.agency).pipe(
          mergeMap((response) => [
            agencyActions.actionSaveAgencyDetailsSuccess({
              agency: action.agency,
              response: response
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionSaveAgencyDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  updateAgency = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionUpdateAgencyDetails),
      switchMap((action) =>
        this.agencyDataService.updateAgency(action.agency).pipe(
          mergeMap((response) => [
            agencyActions.actionUpdateAgencyDetailsSuccess({
              agency: action.agency,
              response: response
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionUpdateAgencyDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  getCollectionDates = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetCollectionDates),
      switchMap((action) =>
        this.agencyDataService.getCollectionsDates(action.request).pipe(
          mergeMap((collectionDates) => [
            agencyActions.actionGetCollectionDatesSuccess({
              collectionDates: collectionDates
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetCollectionDatesFailure(error))
          )
        )
      )
    )
  );

  saveCollectionDates = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionSaveCollectionDates),
      switchMap((action) =>
        this.agencyDataService.addCollectionDate(action.collectionDates).pipe(
          mergeMap((response) => [
            agencyActions.actionSaveCollectionDatesSuccess({
              collectionDates: action.collectionDates,
              response: response
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionSaveCollectionDatesFailure({ error: error }))
          )
        )
      )
    )
  );

  updateCollectionDate = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionUpdateCollectionDates),
      switchMap((action) =>
        this.agencyDataService
          .updateCollectionDate(action.collectionDates)
          .pipe(
            mergeMap(() => [
              agencyActions.actionUpdateCollectionDatesSuccess({
                collectionDates: action.collectionDates
              })
            ]),
            catchError((error) =>
              of(
                agencyActions.actionUpdateCollectionDatesFailure({
                  error: error
                })
              )
            )
          )
      )
    )
  );

  getEscrowDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetEscrowDetails),
      switchMap((action) =>
        this.agencyDataService.getEscrow(action.request).pipe(
          mergeMap((escrowDetails) => [
            agencyActions.actionGetEscrowDetailsSuccess({
              escrowDetails: escrowDetails
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetEscrowDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  getNonEscrowDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetNonEscrowDetails),
      switchMap((action) =>
        this.agencyDataService.getNonEscrow(action.request).pipe(
          mergeMap((nonEscrowDetails) => [
            agencyActions.actionGetNonEscrowDetailsSuccess({
              nonEscrowDetails: nonEscrowDetails
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetNonEscrowDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  saveEscrowDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionSaveEscrowDetails),
      switchMap((action) =>
        this.agencyDataService.addEscrow(action.escrowDetails).pipe(
          mergeMap((response) => [
            agencyActions.actionSaveEscrowDetailsSuccess({
              escrowDetails: action.escrowDetails,
              response: response
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionSaveEscrowDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  saveNonEscrowDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionSaveNonEscrowDetails),
      switchMap((action) =>
        this.agencyDataService.addNonEscrow(action.nonEscrowDetails).pipe(
          mergeMap((response) => [
            agencyActions.actionSaveNonEscrowDetailsSuccess({
              nonEscrowDetails: action.nonEscrowDetails,
              response: response
            })
          ]),
          catchError((error) =>
            of(
              agencyActions.actionSaveNonEscrowDetailsFailure({ error: error })
            )
          )
        )
      )
    )
  );

  updateEscrowDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionUpdateEscrowDetails),
      switchMap((action) =>
        this.agencyDataService.updateEscrow(action.escrowDetails).pipe(
          mergeMap(() => [
            agencyActions.actionUpdateEscrowDetailsSuccess({
              escrowDetails: action.escrowDetails
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionUpdateEscrowDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  updateNonEscrowDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionUpdateNonEscrowDetails),
      switchMap((action) =>
        this.agencyDataService.updateNonEscrow(action.nonEscrowDetails).pipe(
          mergeMap(() => [
            agencyActions.actionUpdateNonEscrowDetailsSuccess({
              nonEscrowDetails: action.nonEscrowDetails
            })
          ]),
          catchError((error) =>
            of(
              agencyActions.actionUpdateNonEscrowDetailsFailure({
                error: error
              })
            )
          )
        )
      )
    )
  );

  getPaymentDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionGetPaymentDetails),
      switchMap((action) =>
        this.agencyDataService.getPaymentDetails(action.request).pipe(
          mergeMap((paymentDetails) => [
            agencyActions.actionGetPaymentDetailsSuccess({
              paymentDetails: paymentDetails
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionGetPaymentDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  savePaymentDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionSavePaymentDetails),
      switchMap((action) =>
        this.agencyDataService.addPaymentDetails(action.details).pipe(
          mergeMap((response) => [
            agencyActions.actionSavePaymentDetailsSuccess({
              details: action.details,
              response: response
            })
          ]),
          catchError((error) =>
            of(agencyActions.actionSavePaymentDetailsFailure({ error: error }))
          )
        )
      )
    )
  );

  updatePaymentDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.actionUpdatePaymentDetails),
      switchMap((action) =>
        this.agencyDataService.updatePaymentDetails(action.details).pipe(
          mergeMap(() => [
            agencyActions.actionUpdatePaymentDetailsSuccess({
              details: action.details
            })
          ]),
          catchError((error) =>
            of(
              agencyActions.actionUpdatePaymentDetailsFailure({ error: error })
            )
          )
        )
      )
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
