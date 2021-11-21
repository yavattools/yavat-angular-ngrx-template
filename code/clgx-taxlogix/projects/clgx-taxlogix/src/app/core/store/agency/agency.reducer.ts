import { Agency, AgencyState, CollectionDates, EscrowDetails, EscrowNonEscrowDetails, NonEscrowDetails, PaymentDetails} from './agency.model';
import { Action, createReducer, on } from '@ngrx/store';
import {mutableOn} from 'ngrx-etc';
import * as agencyActions from './agency.actions';

export const initialState: AgencyState = {
  agencies: new Array<Agency>(),
  selectedAgency: new Agency(),
  collectionDates: new Array<CollectionDates>(),
  escrowNonEscrowDetails: new Array<EscrowNonEscrowDetails>(),
  escrowDetails : new EscrowDetails(),
  nonEscrowDetails : new NonEscrowDetails(),
  paymentDetails: new PaymentDetails(),
  actionInProgress: false,
  error: ''
};

export const reducer = createReducer(
  initialState,
  mutableOn(agencyActions.actionStartActionInProgress, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionStopActionInProgress, (state, action) => {
    state.actionInProgress = false;
  }),
  mutableOn(agencyActions.actionAgencyApiFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetAllActiveAgencies, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetAllActiveAgenciesSuccess, (state, action) => {
    state.actionInProgress = false;
    state.agencies =  [...action.agencyList];
  }),
  mutableOn(agencyActions.actionSetSelectedAgency, (state, action) => {
    state.selectedAgency = action.agency;
  }),
  mutableOn(agencyActions.actionSaveAgencyDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveAgencyDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.agencies = [...state.agencies, action.agency]
    state.selectedAgency = action.agency;
  }),
  mutableOn(agencyActions.actionSaveAgencyDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionUpdateAgencyDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateAgencyDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.selectedAgency = action.agency;
  }),
  mutableOn(agencyActions.actionUpdateAgencyDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionGetCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetCollectionDatesSuccess, (state, action) => {
    state.actionInProgress = false;
    state.collectionDates = [...action.collectionDates];
  }),
  mutableOn(agencyActions.actionSaveCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveCollectionDatesSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
  mutableOn(agencyActions.actionUpdateCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateCollectionDatesSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
  mutableOn(agencyActions.actionGetEscrowNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetEscrowNonEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.escrowNonEscrowDetails = [...action.escNonEscs];
  }),
  mutableOn(agencyActions.actionGetEscrowNonEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionGetEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.escrowDetails = action.escrowDetails;
  }),
  mutableOn(agencyActions.actionGetEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionGetNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetNonEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.nonEscrowDetails = action.nonEscrowDetails;
  }),
  mutableOn(agencyActions.actionGetNonEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionSaveEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
  mutableOn(agencyActions.actionSaveNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveNonEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
  mutableOn(agencyActions.actionUpdateNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateNonEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),

  mutableOn(agencyActions.actionGetPaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetPaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.paymentDetails = Object.assign({}, action.paymentDetails);
  }),

  mutableOn(agencyActions.actionSavePaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSavePaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
  mutableOn(agencyActions.actionUpdatePaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdatePaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    // state.selectedAgency = action.agency;
    //  JAna: Need to find what to do on Success of Dates
  }),
);

export function agencyReducer(
  state: AgencyState | undefined,
  action: Action
) {
  return reducer(state, action);
}
