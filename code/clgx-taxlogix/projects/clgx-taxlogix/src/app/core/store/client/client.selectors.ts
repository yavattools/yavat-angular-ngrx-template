import { createSelector } from '@ngrx/store';

import { ClientState } from './client.model';
import { selectClientState } from '../../core.state';

export const selectClientStoreState = createSelector(
  selectClientState,
  (state: ClientState) => state
);

export const selectActionInProgress = createSelector(
    selectClientState,
    (state: ClientState) => state.actionInProgress
);
  
export const selectClientsList = createSelector(
    selectClientState,
    (state: ClientState) => state.clients
);

export const selectClientInformation = createSelector(
    selectClientState,
    (state: ClientState) => state.clientInformation
);

export const selectLegalDetails = createSelector(
    selectClientState,
    (state: ClientState) => state.legalDetails
);

export const selectBillingDetails = createSelector(
    selectClientState,
    (state: ClientState) => state.billingDetails
);

export const selectProductPricingDetails = createSelector(
    selectClientState,
    (state: ClientState) => state.productPricingDetails
);

export const selectBankDetails = createSelector(
    selectClientState,
    (state: ClientState) => state.bankDetails
);