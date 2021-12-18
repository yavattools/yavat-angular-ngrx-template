import {
  Agency,
  AgencyState,
  CollectionDates,
  County,
  DropDownOptions,
  EscrowDetails,
  EscrowNonEscrowDetails,
  NonEscrowDetails,
  PaymentDetails,
  StateOptions,
  CountiesForStates
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
  collectionHistoryDates: new Array<CollectionDates>(),
  selectedCollectionDate: Object.create({}),
  escrowNonEscrowDetails: new Array<EscrowNonEscrowDetails>(),
  escrowDetails: new EscrowDetails(),
  nonEscrowDetails: new NonEscrowDetails(),
  paymentDetails: new PaymentDetails(),
  // stateOptions: [
  //   {
  //     stateId: 1,
  //     stateName: 'GEORGIA',
  //     value: 1,
  //     display: 'GEORGIA',
  //     stateCode: '1'
  //   },
  //   {
  //     stateId: 2,
  //     stateName: 'TEXUS',
  //     value: 2,
  //     display: 'TEXUS',
  //     stateCode: '2'
  //   }
  // ],
  stateOptions: new Array<StateOptions>(),
  billingRequestOptions: new Array<DropDownOptions>(),
  mediaTypeOptions: new Array<DropDownOptions>(),
  agencyCounties: new Array<County>(),
  assessorCounties: new Array<County>(),
  nonEscrowCounties: new Array<County>(),
  paymentCounties: new Array<County>(),
  actionInProgress: false,
  counties: new Array<County>(),
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
    let uStatesOptions: Array<StateOptions> = [];
    action.response.forEach((s) => {
      uStatesOptions.push({
        stateId: s.stateId,
        stateName: s.stateName,
        value: s.stateId,
        display: s.stateName,
        stateCode: s.stateCode
      });
    });
    state.stateOptions = [...uStatesOptions];
  }),
  mutableOn(agencyActions.actionGetStateOptionsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetBillingRequestOptions, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionGetBillingRequestOptionsSuccess,
    (state, action) => {
      state.actionInProgress = false;
      state.billingRequestOptions = [...action.response];
    }
  ),
  mutableOn(
    agencyActions.actionGetBillingRequestOptionsFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error;
    }
  ),
  mutableOn(agencyActions.actionGetMediaTypeOptions, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionGetMediaTypeOptionsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.mediaTypeOptions = [...action.response];
  }),
  mutableOn(agencyActions.actionGetMediaTypeOptionsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionGetCountiesByStateId, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionGetCountiesByStateIdSuccess,
    (state, action) => {
      state.actionInProgress = false;
      if (CountiesForStates.AGENCY_STATES === action.stateField) {
        state.agencyCounties = [...action.response];
      } else if (CountiesForStates.ASSESSOR_STATES === action.stateField) {
        state.assessorCounties = [...action.response];
      } else if (CountiesForStates.NON_ESCROW_STATES === action.stateField) {
        state.nonEscrowCounties = [...action.response];
      } else if (CountiesForStates.PAYMENT_STATES === action.stateField) {
        state.paymentCounties = [...action.response];
      }
    }
  ),
  mutableOn(
    agencyActions.actionGetCountiesByStateIdFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error;
    }
  ),
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
  }),
  mutableOn(agencyActions.actionSaveAgencyDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveAgencyDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    let uAgency: Agency = _.cloneDeep(action.agency);
    uAgency.agencyMasterId = action.response.agencyMasterId;
    state.agencies = [...state.agencies, uAgency];
    state.selectedAgency = uAgency;
    debugger;
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
    let index = _.findIndex(
      state.agencies,
      (e) => {
        return e.agencyMasterId == action.agency.agencyMasterId;
      },
      0
    );
    state.agencies = [
      ...state.agencies.slice(0, index),
      action.agency,
      ...state.agencies.slice(index + 1)
    ];
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
    let collectionDates = [...action.collectionDates];
    let ucDates: Array<CollectionDates> = [];
    let uchDates: Array<CollectionDates> = [];

    if (collectionDates && collectionDates.length) {
      collectionDates.forEach((cd) => {
        if (+cd.collectionYear === new Date().getFullYear()) {
          ucDates.push(cd);
        } else {
          uchDates.push(cd);
        }
      });
    }
    state.collectionDates = [...ucDates];
    state.collectionHistoryDates = [...uchDates];
  }),
  mutableOn(agencyActions.actionGetCollectionDatesFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionSetCollectionDates, (state, action) => {
    state.selectedCollectionDate = action.collectionDate;
  }),
  mutableOn(agencyActions.actionSaveCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSaveCollectionDatesSuccess, (state, action) => {
    state.actionInProgress = false;
    let cDates: CollectionDates = _.cloneDeep(action.collectionDates);
    cDates.agencyCollectionDatesId = action.response.agencyCollectionDatesId;
    // state.collectionDates = [...state.collectionDates, cDates];
    if (+action.collectionDates.collectionYear === +new Date().getFullYear()) {
      state.collectionDates = [...state.collectionDates, cDates];
    } else {
      state.collectionHistoryDates = [...state.collectionHistoryDates, cDates];
    }
    state.selectedCollectionDate = cDates;
  }),
  mutableOn(agencyActions.actionUpdateCollectionDates, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionUpdateCollectionDatesSuccess,
    (state, action) => {
      state.actionInProgress = false;
      let index = _.findIndex(
        state.collectionDates,
        (e) => {
          return (
            e.agencyCollectionDatesId ==
            action.collectionDates.agencyCollectionDatesId
          );
        },
        0
      );
      state.collectionDates = [
        ...state.collectionDates.slice(0, index),
        action.collectionDates,
        ...state.collectionDates.slice(index + 1)
      ];
    }
  ),
  mutableOn(
    agencyActions.actionUpdateCollectionDatesFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error;
    }
  ),
  mutableOn(agencyActions.actionGetEscrowDetails, (state, action) => {
    state.actionInProgress = true;
    state.escrowDetails = Object.create({});
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
    state.nonEscrowDetails = Object.create({});
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
    let eDetails: EscrowDetails = _.cloneDeep(action.escrowDetails);
    eDetails.agencyEscrowId = action.response.agencyEscrowId;
    state.escrowDetails = eDetails;
  }),
  mutableOn(agencyActions.actionSaveEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.escrowDetails = action.escrowDetails;
  }),
  mutableOn(agencyActions.actionUpdateEscrowDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(agencyActions.actionSaveNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionSaveNonEscrowDetailsSuccess,
    (state, action) => {
      state.actionInProgress = false;
      let nEscrowDetails: NonEscrowDetails = _.cloneDeep(
        action.nonEscrowDetails
      );
      nEscrowDetails.agencyNonEscrowId = action.response.agencyNonEscrowId;
      state.nonEscrowDetails = nEscrowDetails;
    }
  ),
  mutableOn(
    agencyActions.actionSaveNonEscrowDetailsFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error;
    }
  ),
  mutableOn(agencyActions.actionUpdateNonEscrowDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(
    agencyActions.actionUpdateNonEscrowDetailsSuccess,
    (state, action) => {
      state.actionInProgress = false;
      state.nonEscrowDetails = action.nonEscrowDetails;
    }
  ),
  mutableOn(
    agencyActions.actionUpdateNonEscrowDetailsFailure,
    (state, action) => {
      state.actionInProgress = false;
      state.error = action.error;
    }
  ),

  mutableOn(agencyActions.actionGetPaymentDetails, (state, action) => {
    state.actionInProgress = true;
    state.paymentDetails = Object.create({});
  }),
  mutableOn(agencyActions.actionGetPaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    state.paymentDetails = Object.assign({}, action.paymentDetails);
  }),
  mutableOn(agencyActions.actionGetPaymentDetailsFailure, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),

  mutableOn(agencyActions.actionSavePaymentDetails, (state, action) => {
    state.actionInProgress = true;
  }),
  mutableOn(agencyActions.actionSavePaymentDetailsSuccess, (state, action) => {
    state.actionInProgress = false;
    let pDetails: PaymentDetails = _.cloneDeep(action.details);
    pDetails.agencyPaymentId = action.response.agencyPaymentId;
    state.paymentDetails = pDetails;
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
