import { Agency, AgencyState, CollectionDates, EscrowNonEscrowDetails, PaymentDetails} from './agency.model';
import {
   actionAgencyApiFailure,
   actionGetAllActiveAgencies,
   actionGetAllActiveAgenciesSuccess,
   actionGetCollectionDates,
   actionGetEscrowNonEscrowDetails,
   actionGetPaymentDetails,
   actionSaveAgency,
   actionSaveAgencySuccess,
   actionSaveCollectionDates,
   actionSaveCollectionDatesSuccess,
   actionSaveEscrowDetails,
   actionSaveEscrowDetailsSuccess,
   actionSaveNonEscrowDetails,
   actionSaveNonEscrowDetailsSuccess,
   actionSavePaymentDetails,
   actionSavePaymentDetailsSuccess,
   actionUpdateAgency,
   actionUpdateAgencySuccess,
   actionUpdateCollectionDates,
   actionUpdateCollectionDatesSuccess,
   actionUpdateEscrowDetails,
   actionUpdateEscrowDetailsSuccess,
   actionUpdateNonEscrowDetails,
   actionUpdateNonEscrowDetailsSuccess,
   actionUpdatePaymentDetails,
   actionUpdatePaymentDetailsSuccess
} from './agency.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {mutableOn} from 'ngrx-etc';
import * as agencyActions from './agency.actions';

export const initialState: AgencyState = {
  agencies: new Array<Agency>(),
  selectedAgency: new Agency(),
  collectionDates: new Array<CollectionDates>(),
  escrowNonEscrowDetails: new Array<EscrowNonEscrowDetails>(),
  paymentDetails: new PaymentDetails(),
  actionInProgress: false,
  error: ''
};

const reducer = createReducer(
  initialState,
  mutableOn(agencyActions.actionAgencyApiFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetAllActiveAgencies, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetAllActiveAgenciesSuccess, (state, action) => {
    state.actionInProgress = true;
    state.agencies = [...state.agencies];
  }),
);

export function agencyReducer(
  state: AgencyState | undefined,
  action: Action
) {
  return reducer(state, action);
}
