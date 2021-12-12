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
import { State } from './client.model';
import { selectClientState } from '../../core.state';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { AnimationsService } from '../../providers/animations/animations.service';
import { TitleService } from '../../providers/title/title.service';
import * as fromSelectors from '@app/core/store/auth/auth.selectors';

import { ClientDataService } from './client-data-api.service';
import * as clientActions from './client.actions';

export const CLIENT_KEY = 'client';

const INIT = of('clgx-init-effect-trigger');

@Injectable()
export class ClientEffects {
   getClientsList = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionGetClientsList),
      switchMap((action) =>
        this.clientDataService.getClientsList(action.getClientsRequest).pipe(
          mergeMap((clientsList) => [
            clientActions.actionGetClientsListSuccess({clientsList: clientsList})
          ]),
          catchError((error) =>
            of(clientActions.actionGetClientsListFailure(error))
          )
        )
      )
    )
  );

  getClientInformation = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionGetClientInformation),
      switchMap((action) =>
        this.clientDataService.getClientInformation(action.getClientInformationRequest).pipe(
          mergeMap((clientInfo) => [
            clientActions.actionGetClientInformationSuccess({clientInfo: clientInfo})
          ]),
          catchError((error) =>
            of(clientActions.actionGetClientInformationFailure(error))
          )
        )
      )
    )
  );

  saveClientInformation = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionSaveClientInformation),
      switchMap((action) =>
        this.clientDataService.saveClientInfo(action.clientInfo).pipe(
          mergeMap((response) => [
            clientActions.actionSaveClientInformationSuccess({clientInfo: action.clientInfo, response : response})
          ]),
          catchError((error) =>
            of(clientActions.actionSaveClientInformationFailure(error))
          )
        )
      )
    )
  );

  updateClientInformation = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionUpdateClientInformation),
      switchMap((action) =>
        this.clientDataService.updateClientInfo(action.clientInfo).pipe(
          mergeMap((response) => [
            clientActions.actionUpdateClientInformationSuccess({clientInfo: action.clientInfo})
          ]),
          catchError((error) =>
            of(clientActions.actionUpdateClientInformationFailure(error))
          )
        )
      )
    )
  );

  getLegalDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionGetLegalDetails),
      switchMap((action) =>
        this.clientDataService.getLegalDetails(action.clientId).pipe(
          mergeMap((legalDetails) => [
            clientActions.actionGetLegalDetailsSuccess({legalDetails: legalDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionGetLegalDetailsFailure(error))
          )
        )
      )
    )
  );

  saveLegalDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionSaveLegalDetails),
      switchMap((action) =>
        this.clientDataService.saveLegalDetails(action.legalDetails).pipe(
          mergeMap((response) => [
            clientActions.actionSaveLegalDetailsSuccess({legalDetails: action.legalDetails, response : response})
          ]),
          catchError((error) =>
            of(clientActions.actionSaveLegalDetailsFailure(error))
          )
        )
      )
    )
  );

  updateLegalDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionUpdateLegalDetails),
      switchMap((action) =>
        this.clientDataService.updateLegalDetails(action.legalDetails).pipe(
          mergeMap((response) => [
            clientActions.actionUpdateLegalDetailsSuccess({legalDetails: action.legalDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionUpdateLegalDetailsFailure(error))
          )
        )
      )
    )
  );

  getBillingDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionGetBillingDetails),
      switchMap((action) =>
        this.clientDataService.getBillingDetails(action.clientId).pipe(
          mergeMap((billingDetails) => [
            clientActions.actionGetBillingDetailsSuccess({billingDetails: billingDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionGetBillingDetailsFailure(error))
          )
        )
      )
    )
  );

  saveBillingDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionSaveBillingDetails),
      switchMap((action) =>
        this.clientDataService.saveBillingDetails(action.billingDetails).pipe(
          mergeMap((response) => [
            clientActions.actionSaveBillingDetailsSuccess({billingDetails: action.billingDetails, response : response})
          ]),
          catchError((error) =>
            of(clientActions.actionSaveBillingDetailsFailure(error))
          )
        )
      )
    )
  );

  updateBillingDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionUpdateBillingDetails),
      switchMap((action) =>
        this.clientDataService.updateBillingDetails(action.billingDetails).pipe(
          mergeMap((response) => [
            clientActions.actionUpdateBillingDetailsSuccess({billingDetails: action.billingDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionUpdateBillingDetailsFailure(error))
          )
        )
      )
    )
  );

  getProductPricingDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionGetProductPricingDetails),
      switchMap((action) =>
        this.clientDataService.getProductPricingDetails(action.clientId).pipe(
          mergeMap((ppDetails) => [
            clientActions.actionGetProductPricingDetailsSuccess({productPricing: ppDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionGetProductPricingDetailsFailure(error))
          )
        )
      )
    )
  );

  saveProductPricingDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionSaveProductPricingDetails),
      switchMap((action) =>
        this.clientDataService.saveProductPricingDetails(action.productPricing).pipe(
          mergeMap((response) => [
            clientActions.actionSaveProductPricingDetailsSuccess({productPricing: action.productPricing, response : response})
          ]),
          catchError((error) =>
            of(clientActions.actionSaveProductPricingDetailsFailure(error))
          )
        )
      )
    )
  );

  updateProductPricingDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionUpdateProductPricingDetails),
      switchMap((action) =>
        this.clientDataService.updateProductPricingDetails(action.productPricing).pipe(
          mergeMap((response) => [
            clientActions.actionUpdateProductPricingDetailsSuccess({productPricing: action.productPricing})
          ]),
          catchError((error) =>
            of(clientActions.actionUpdateProductPricingDetailsFailure(error))
          )
        )
      )
    )
  );

  getBankDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionGetBankDetails),
      switchMap((action) =>
        this.clientDataService.getBankDetails(action.clientId).pipe(
          mergeMap((bankDetails) => [
            clientActions.actionGetBankDetailsSuccess({bankDetails: bankDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionGetBankDetailsFailure(error))
          )
        )
      )
    )
  );

  saveBankDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionSaveBankDetails),
      switchMap((action) =>
        this.clientDataService.saveBankDetails(action.bankDetails).pipe(
          mergeMap((response) => [
            clientActions.actionSaveBankDetailsSuccess({bankDetails: action.bankDetails, response : response})
          ]),
          catchError((error) =>
            of(clientActions.actionSaveBankDetailsFailure(error))
          )
        )
      )
    )
  );

  updateBankDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.actionUpdateBankDetails),
      switchMap((action) =>
        this.clientDataService.updateBankDetails(action.bankDetails).pipe(
          mergeMap((response) => [
            clientActions.actionUpdateBankDetailsSuccess({bankDetails: action.bankDetails})
          ]),
          catchError((error) =>
            of(clientActions.actionUpdateBankDetailsFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private clientDataService: ClientDataService,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {}
}

export const effects: any[] = [ClientEffects];
