import { Action, createReducer, on } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import * as clientActions from './client.actions';
import { act } from '@ngrx/effects';
import * as _ from 'lodash';
import { Client, ClientState, ClientInformation, Legal, Billing, ProductPricing, BankDetails } from './client.model';
  
  export const initialState: ClientState = {
    clients : new Array<Client>(),
    clientInformation : new ClientInformation(),
    legalDetails : new Legal(),
    billingDetails : new Billing(),
    productPricingDetails : new ProductPricing(),
    bankDetails : new BankDetails(),
    actionInProgress: false,
    error: ''
  };
  
  export const reducer = createReducer(
    initialState,
    mutableOn(clientActions.actionStartActionInProgress, (state, action) => {
      state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionStopActionInProgress, (state, action) => {
      state.actionInProgress = false;
    }),
    mutableOn(clientActions.actionGetClientsList, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionGetClientsListSuccess, (state, action) => {
        state.actionInProgress = false;
        state.clients = [...action.clientsList];
    }),
    mutableOn(clientActions.actionGetClientsListFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionGetClientInformation, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionGetClientInformationSuccess, (state, action) => {
        state.actionInProgress = false;
        state.clientInformation = action.clientInfo;
    }),
    mutableOn(clientActions.actionGetClientInformationFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionSetClientInformation, (state, action) => {
        state.actionInProgress = false;
        state.clientInformation = action.clientInfo;
    }),
    mutableOn(clientActions.actionSaveClientInformation, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionSaveClientInformationSuccess, (state, action) => {
        state.actionInProgress = false;
        let cInfo: ClientInformation = _.cloneDeep(action.clientInfo);
        cInfo.clientId = action.response.clientId;
        state.clientInformation = cInfo;
    }),
    mutableOn(clientActions.actionSaveClientInformationFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionUpdateClientInformation, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionUpdateClientInformationSuccess, (state, action) => {
        state.actionInProgress = false;
        state.clientInformation = action.clientInfo
    }),
    mutableOn(clientActions.actionUpdateClientInformationFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),

    mutableOn(clientActions.actionGetLegalDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionGetLegalDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.legalDetails = action.legalDetails;
    }),
    mutableOn(clientActions.actionGetLegalDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionSaveLegalDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionSaveLegalDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        let lDetails: Legal = _.cloneDeep(action.legalDetails);
        lDetails.legalmasterId = action.response.legalmasterId;
        state.legalDetails = lDetails;
    }),
    mutableOn(clientActions.actionSaveLegalDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionUpdateLegalDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionUpdateLegalDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.legalDetails = action.legalDetails
    }),
    mutableOn(clientActions.actionUpdateLegalDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),

    mutableOn(clientActions.actionGetBillingDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionGetBillingDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.billingDetails = action.billingDetails;
    }),
    mutableOn(clientActions.actionGetBillingDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionSaveBillingDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionSaveBillingDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        let bDetails: Billing = _.cloneDeep(action.billingDetails);
        bDetails.clientBillingMasterId = action.response.clientBillingMasterId;
        state.billingDetails = bDetails;
    }),
    mutableOn(clientActions.actionSaveBillingDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionUpdateBillingDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionUpdateBillingDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.billingDetails = action.billingDetails
    }),
    mutableOn(clientActions.actionUpdateBillingDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),

    mutableOn(clientActions.actionGetProductPricingDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionGetProductPricingDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.productPricingDetails = action.productPricing;
    }),
    mutableOn(clientActions.actionGetProductPricingDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionSaveProductPricingDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionSaveProductPricingDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        let ppDetails: ProductPricing = _.cloneDeep(action.productPricing);
        ppDetails.clientProductPricingId = action.response.clientProductPricingId;
        state.productPricingDetails = ppDetails;
    }),
    mutableOn(clientActions.actionSaveProductPricingDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionSaveProductPricingDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionUpdateProductPricingDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.productPricingDetails = action.productPricing
    }),
    mutableOn(clientActions.actionUpdateProductPricingDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),

    mutableOn(clientActions.actionGetBankDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionGetBankDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.bankDetails = action.bankDetails;
    }),
    mutableOn(clientActions.actionGetBankDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionSaveBankDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionSaveBankDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        let bDetails: BankDetails = _.cloneDeep(action.bankDetails);
        bDetails.clientBankDetlsId = action.response.clientBankDetlsId;
        state.bankDetails = bDetails;
    }),
    mutableOn(clientActions.actionSaveBankDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
    mutableOn(clientActions.actionUpdateBankDetails, (state, action) => {
        state.actionInProgress = true;
    }),
    mutableOn(clientActions.actionUpdateBankDetailsSuccess, (state, action) => {
        state.actionInProgress = false;
        state.bankDetails = action.bankDetails;
    }),
    mutableOn(clientActions.actionUpdateBankDetailsFailure, (state, action) => {
        state.actionInProgress = false;
        state.error = action.error;
    }),
  );
  
  export function clientReducer(state: ClientState | undefined, action: Action) {
    return reducer(state, action);
  }
  