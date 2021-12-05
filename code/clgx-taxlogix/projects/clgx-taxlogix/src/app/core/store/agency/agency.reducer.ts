import {
  Agency,
  AgencyState,
  CollectionDates,
  County,
  EscrowDetails,
  EscrowNonEscrowDetails,
  NonEscrowDetails,
  PaymentDetails,
  StateOptions
} from './agency.model';
import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import * as agencyActions from './agency.actions';
import { act } from '@ngrx/effects';
import * as _ from 'lodash';

export const initialState: AgencyState = {
  agencies: new Array<Agency>(),
  selectedAgency: Object.create({}),
  collectionDates: new Array<CollectionDates>(),
  selectedCollectionDate : Object.create({}),
  escrowNonEscrowDetails: new Array<EscrowNonEscrowDetails>(),
  escrowDetails: new EscrowDetails(),
  nonEscrowDetails: new NonEscrowDetails(),
  paymentDetails: new PaymentDetails(),
  stateOptions : new Array<StateOptions>(),
  counties : new Array<County>(),
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
  mutableOn(agencyActions.actionGetStateOptions, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetStateOptionsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.stateOptions = [...action.response];
  }),
  mutableOn(agencyActions.actionGetStateOptionsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetCountiesByStateId, (state, action) => {
    state.actionInProgress = true;
    state.counties = [];
  }),
  mutableOn(agencyActions.actionGetCountiesByStateIdSuccess, (state, action) => {
    state.actionInProgress = false;
    state.counties = [...action.response];
  }),
  mutableOn(agencyActions.actionGetCountiesByStateIdFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetAllActiveAgencies, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionGetAllActiveAgenciesSuccess,
    (state, action) => {
      state.actionInProgress = false;
      state.agencies = [...action.agencyList];
    }
  ),
  mutableOn(agencyActions.actionSetSelectedAgency, (state, action) => {
    state.selectedAgency = action.agency;
    state.counties = [];
  }),
  mutableOn(agencyActions.actionSaveAgencyDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveAgencyDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    let uAgency:Agency = _.cloneDeep(action.agency);
    uAgency.agencyMasterId = action.response.agencyMasterId;
    state.agencies = [...state.agencies, uAgency];
    state.selectedAgency = uAgency;
    debugger
  }),
  mutableOn(agencyActions.actionSaveAgencyDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionUpdateAgencyDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateAgencyDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.selectedAgency = action.agency;
    // let uAgencies = state.agencies.filter(a => {
    //   if(a.agencyMasterId === action.response.agencyMasterId){
    //     return action.agency;
    //   }else{
    //     return a;
    //   }
    // });
    // state.agencies = [...uAgencies];
    let index = _.findIndex(state.agencies, (e) => {
      return e.agencyMasterId == action.agency.agencyMasterId;
    }, 0);
   state.agencies = [...state.agencies.slice(0,index),action.agency,...state.agencies.slice(index+1)];
  }),
  mutableOn(agencyActions.actionUpdateAgencyDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetCollectionDatesSuccess, (state, action) => {
    state.actionInProgress = false;
    state.collectionDates = [...action.collectionDates];
  }),
  mutableOn(agencyActions.actionGetCollectionDatesFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionSetCollectionDates, (state, action) => {
    state.selectedCollectionDate = action.collectionDate
  }),
  mutableOn(agencyActions.actionSaveCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveCollectionDatesSuccess, (state, action) => {
    state.actionInProgress = false;
    action.collectionDates.agencyCollectionDatesId = action.response.agencyCollectionDatesId;
    state.collectionDates = [...state.collectionDates, action.collectionDates];
    state.selectedCollectionDate = action.collectionDates;
  }),
  mutableOn(agencyActions.actionUpdateCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionUpdateCollectionDatesSuccess,
    (state, action) => {
      state.actionInProgress = false;
      let index = _.findIndex(state.collectionDates, (e) => {
        return e.agencyCollectionDatesId == action.collectionDates.agencyCollectionDatesId;
      }, 0);
     state.collectionDates = [...state.collectionDates.slice(0,index),action.collectionDates,...state.collectionDates.slice(index+1)];
    }
  ),
  mutableOn(
    agencyActions.actionUpdateCollectionDatesFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error =action.error
    }
  ),
  mutableOn(agencyActions.actionGetEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.escrowDetails = action.escrowDetails;
  }),
  mutableOn(agencyActions.actionGetEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
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
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionSaveEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    action.escrowDetails.agencyEscrowId = action.response.agencyEscrowId;
    state.escrowDetails = action.escrowDetails
  }),
  mutableOn(agencyActions.actionSaveEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.escrowDetails = action.escrowDetails
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),
  mutableOn(agencyActions.actionSaveNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionSaveNonEscrowDetailsSuccess,
    (state, action) => {
      state.actionInProgress = false;
      action.nonEscrowDetails.agencyNonEscrowId = action.response.agencyNonEscrowId;
      state.nonEscrowDetails = action.nonEscrowDetails;
    }
  ),
  mutableOn(
    agencyActions.actionSaveNonEscrowDetailsFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error
    }
  ),
  mutableOn(agencyActions.actionUpdateNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionUpdateNonEscrowDetailsSuccess,
    (state, action) => {
      state.actionInProgress = false;
      state.nonEscrowDetails = action.nonEscrowDetails
    }
  ),
  mutableOn(
    agencyActions.actionUpdateNonEscrowDetailsFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error
    }
  ),

  mutableOn(agencyActions.actionGetPaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetPaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.paymentDetails = Object.assign({}, action.paymentDetails);
  }),
  mutableOn(agencyActions.actionGetPaymentDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error
  }),

  mutableOn(agencyActions.actionSavePaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSavePaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    action.details.agencyPaymentId = action.response.agencyPaymentId;
    state.paymentDetails = action.details;
  }),
  mutableOn(agencyActions.actionSavePaymentDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionUpdatePaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionUpdatePaymentDetailsSuccess,
    (state, action) => {
      state.actionInProgress = false;
      state.paymentDetails = action.details;
    }
  ),
  mutableOn(
    agencyActions.actionUpdatePaymentDetailsFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error;
    }
  )
  );


export function agencyReducer(state: AgencyState | undefined, action: Action) {
  return reducer(state, action);
}
