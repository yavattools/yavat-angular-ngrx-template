
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as fromActions from './agency.actions';
import * as fromSelectors from './agency.selectors';
import { Agency, CollectionDates, EscrowDetails, GetActiveAgenciesRequest,
      GetCollectionDatesRequest,GetEscrowRequest,GetNonEscrowDetailsRequest,
      GetPaymentDetailsRequest, NonEscrowDetails, PaymentDetails } from './agency.model';
import { AppState } from '@app/core/core.state';

@Injectable({ providedIn: 'root' })
export class AgencyStoreFacade {
  actionInProgress$ = this.store.pipe(select(fromSelectors.selectActionInProgress));
  agencies$ = this.store.pipe(select(fromSelectors.selectAgencies));
  selectedAgency$ = this.store.pipe(select(fromSelectors.selectAgency));
  collectionDates$ = this.store.pipe(select(fromSelectors.selectCollectionDates));
  selectedCollectionDate$ = this.store.pipe(select(fromSelectors.selectSelectedCollectionDate));
  escrowNonEscrowDetails$ = this.store.pipe(select(fromSelectors.selectEscrowNonEscrowDetails));
  paymentDetails$ = this.store.pipe(select(fromSelectors.selectPaymentDetails));
  escrowDetails$ = this.store.pipe(select(fromSelectors.selectEscrowDetails));
  nonEscrowDetails$ = this.store.pipe(select(fromSelectors.selectNonEscrowDetails));

  constructor(private store: Store<AppState>) {}

  setSelectedAgency(agency : Agency){
    this.store.dispatch(fromActions.actionSetSelectedAgency({agency : agency}))
  }

  startActionProgress(){
    this.store.dispatch(fromActions.actionStartActionInProgress());
  }

  stopActionProgress(){
    this.store.dispatch(fromActions.actionStopActionInProgress());
  }

  getAgencies(request : GetActiveAgenciesRequest){
    this.store.dispatch(fromActions.actionGetAllActiveAgencies({request : request}));
  }


  saveAgencyDetails(agency: Agency){
    this.store.dispatch(fromActions.actionSaveAgencyDetails({agency: agency}));
  }

  updateAgencyDetails(agency: Agency){
    this.store.dispatch(fromActions.actionUpdateAgencyDetails({agency: agency}));
  }

  getCollectionDates(request: GetCollectionDatesRequest){
    this.store.dispatch(fromActions.actionGetCollectionDates({request: request}));
  }

  setCollectionDate(collectionDate: CollectionDates){
    this.store.dispatch(fromActions.actionSetCollectionDates({collectionDate: collectionDate}));
  }

  saveCollectionDates(collectionDates: CollectionDates){
    this.store.dispatch(fromActions.actionSaveCollectionDates({collectionDates: collectionDates}));
  }

  updateCollectionDates(collectionDates: CollectionDates){
    this.store.dispatch(fromActions.actionUpdateCollectionDates({collectionDates: collectionDates}));
  }

  getEscrowDetails(request: GetEscrowRequest){
    this.store.dispatch(fromActions.actionGetEscrowDetails({request: request}));
  }

  getNonEscrowDetails(request: GetNonEscrowDetailsRequest){
    this.store.dispatch(fromActions.actionGetNonEscrowDetails({request: request}));
  }

  saveEscrowDetails(escrow: EscrowDetails){
    this.store.dispatch(fromActions.actionSaveEscrowDetails({escrowDetails: escrow}));
  }

  updateEscrowDetails(escrow: EscrowDetails){
    this.store.dispatch(fromActions.actionUpdateEscrowDetails({escrowDetails: escrow}));
  }

  saveNonEscrowDetails(nonEscrow: NonEscrowDetails){
    this.store.dispatch(fromActions.actionSaveNonEscrowDetails({nonEscrowDetails: nonEscrow}));
  }

  updateNonEscrowDetails(nonEscrow: NonEscrowDetails){
    this.store.dispatch(fromActions.actionUpdateNonEscrowDetails({nonEscrowDetails: nonEscrow}));
  }

  getPayments(request: GetPaymentDetailsRequest){
    this.store.dispatch(fromActions.actionGetPaymentDetails({request: request}));
  }

  savePayments(payment: PaymentDetails){
    this.store.dispatch(fromActions.actionSavePaymentDetails({details: payment}));
  }

  updatePayments(payment: PaymentDetails){
    this.store.dispatch(fromActions.actionUpdatePaymentDetails({details: payment}));
  }
}
