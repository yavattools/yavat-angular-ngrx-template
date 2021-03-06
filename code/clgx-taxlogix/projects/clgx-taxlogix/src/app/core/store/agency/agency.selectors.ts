import { createSelector } from '@ngrx/store';

import { AgencyState } from './agency.model';
import { selectAgencyState } from '../../core.state';

export const selectAgencyStoreState = createSelector(
  selectAgencyState,
  (state: AgencyState) => state
);

export const selectAgencies = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.agencies
);

export const selectStateOptions = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.stateOptions
);

export const selectBillingRequestOptions = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.billingRequestOptions
);

export const selectMediaTypeOptions = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.mediaTypeOptions
);

export const selectAgencyCounties = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.agencyCounties
);

export const selectAssessorCounties = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.assessorCounties
);

export const selectNonEscrowCounties = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.nonEscrowCounties
);

export const selectPaymentCounties = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.paymentCounties
);

export const selectAgency = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.selectedAgency
);

export const selectCollectionDates = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.collectionDates
);

export const selectCollectionHistoryDates = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.collectionHistoryDates
);

export const selectSelectedCollectionDate = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.selectedCollectionDate
);

export const selectEscrowNonEscrowDetails = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.escrowNonEscrowDetails
);

export const selectEscrowDetails = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.escrowDetails
);

export const selectNonEscrowDetails = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.nonEscrowDetails
);

export const selectPaymentDetails = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.paymentDetails
);

export const selectActionInProgress = createSelector(
  selectAgencyState,
  (state: AgencyState) => state.actionInProgress
);
