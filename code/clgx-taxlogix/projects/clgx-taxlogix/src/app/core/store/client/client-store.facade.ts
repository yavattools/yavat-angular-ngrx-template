import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as fromActions from './client.actions';
import * as fromSelectors from './client.selectors';
// import { } from './client.model';
import { AppState } from '@app/core/core.state';
import { BankDetails, Billing, ClientInformation, GetClientInformationRequest, GetClientsRequest, Legal, ProductPricing } from './client.model';

@Injectable({ providedIn: 'root' })
export class ClientStoreFacade {
  actionInProgress$ = this.store.pipe(select(fromSelectors.selectActionInProgress));
  clients$ = this.store.pipe(select(fromSelectors.selectClientsList));
  clientInformation$ = this.store.pipe(select(fromSelectors.selectClientInformation));
  legalDetails$ = this.store.pipe(select(fromSelectors.selectLegalDetails));
  billingDetails$ = this.store.pipe(select(fromSelectors.selectBillingDetails));
  productPricingDetails$ = this.store.pipe(select(fromSelectors.selectProductPricingDetails));
  bankDetails$ = this.store.pipe(select(fromSelectors.selectBankDetails));

  constructor(private store: Store<AppState>) {}

  startActionProgress() {
    this.store.dispatch(fromActions.actionStartActionInProgress());
  }

  stopActionProgress() {
    this.store.dispatch(fromActions.actionStopActionInProgress());
  }

  getClientsList(getClientsRequest : GetClientsRequest) {
    this.store.dispatch(fromActions.actionGetClientsList({getClientsRequest : getClientsRequest}));
  }

  getClientInformation(getClientInformationRequest : GetClientInformationRequest) {
    this.store.dispatch(fromActions.actionGetClientInformation({getClientInformationRequest : getClientInformationRequest}));
  }

  setClientInformation(clientInformation : ClientInformation) {
    this.store.dispatch(fromActions.actionSetClientInformation({clientInfo : clientInformation}));
  }

  saveClientInformation(clientInformation : ClientInformation) {
    this.store.dispatch(fromActions.actionSaveClientInformation({clientInfo : clientInformation}));
  }

  updateClientInformation(clientInformation : ClientInformation) {
    this.store.dispatch(fromActions.actionUpdateClientInformation({clientInfo : clientInformation}));
  }

  getLegalDetails(clientId : string) {
    this.store.dispatch(fromActions.actionGetLegalDetails({clientId : clientId}));
  }

  saveLegalDetails(legalDetails : Legal) {
    this.store.dispatch(fromActions.actionSaveLegalDetails({legalDetails : legalDetails}));
  }

  updateLegalDetails(legalDetails : Legal) {
    this.store.dispatch(fromActions.actionUpdateLegalDetails({legalDetails : legalDetails}));
  }

  getBillingDetails(clientId : string) {
    this.store.dispatch(fromActions.actionGetBillingDetails({clientId : clientId}));
  }

  saveBillingDetails(billingDetails : Billing) {
    this.store.dispatch(fromActions.actionSaveBillingDetails({billingDetails : billingDetails}));
  }

  updateBillingDetails(billingDetails : Billing) {
    this.store.dispatch(fromActions.actionUpdateBillingDetails({billingDetails : billingDetails}));
  }

  getProductPricingDetails(clientId : string) {
    this.store.dispatch(fromActions.actionGetProductPricingDetails({clientId : clientId}));
  }

  saveProductPricingDetails(productPricingDetails : ProductPricing) {
    this.store.dispatch(fromActions.actionSaveProductPricingDetails({productPricing : productPricingDetails}));
  }

  updateProductPricingDetails(productPricingDetails : ProductPricing) {
    this.store.dispatch(fromActions.actionUpdateProductPricingDetails({productPricing : productPricingDetails}));
  }

  getBankDetails(clientId : string) {
    this.store.dispatch(fromActions.actionGetBankDetails({clientId : clientId}));
  }

  saveBankDetails(bankDetails : BankDetails) {
    this.store.dispatch(fromActions.actionSaveBankDetails({bankDetails : bankDetails}));
  }

  updateBankDetails(bankDetails : BankDetails) {
    this.store.dispatch(fromActions.actionUpdateBankDetails({bankDetails : bankDetails}));
  }
}
