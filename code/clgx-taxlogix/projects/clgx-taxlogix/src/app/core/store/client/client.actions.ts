import { createAction, props } from "@ngrx/store";
import { BankDetails, Billing, Client, ClientInformation, GetClientInformationRequest, GetClientsRequest, Legal, ProductPricing } from './client.model';

export const actionStartActionInProgress = createAction(
    '[Client] Start Action In Progress'
);
  
export const actionStopActionInProgress = createAction(
    '[Client] Stop Action In Progress'
);

export const actionGetClientsList = createAction(
    '[Client] Get Clients List',
    props<{getClientsRequest : GetClientsRequest}>()
);

export const actionGetClientsListSuccess = createAction(
    '[Client] Get Clients List Success',
    props<{clientsList : Array<Client>}>()
);

export const actionGetClientsListFailure = createAction(
    '[Client] Get Clients List Failure',
    props<{error : any}>()
);

export const actionGetClientInformation = createAction(
    '[Client] Get Client Information',
    props<{getClientInformationRequest : GetClientInformationRequest}>()
);

export const actionGetClientInformationSuccess = createAction(
    '[Client] Get Client Information Success',
    props<{clientInfo : ClientInformation}>()
);

export const actionGetClientInformationFailure = createAction(
    '[Client] Get Client Information Failure',
    props<{error : any}>()
);

export const actionSetClientInformation = createAction(
    '[Client] Set Client Information',
    props<{clientInfo : ClientInformation}>()
);

export const actionSaveClientInformation = createAction(
    '[Client] Save Client Information',
    props<{clientInfo : ClientInformation}>()
);

export const actionSaveClientInformationSuccess = createAction(
    '[Client] Save Client Information Success',
    props<{clientInfo : ClientInformation,response : any}>()
);

export const actionSaveClientInformationFailure = createAction(
    '[Client] Save Client Information Failure',
    props<{error : any}>()
);

export const actionUpdateClientInformation = createAction(
    '[Client] Update Client Information',
    props<{clientInfo : ClientInformation}>()
);

export const actionUpdateClientInformationSuccess = createAction(
    '[Client] Update Client Information Success',
    props<{clientInfo : ClientInformation}>()
);

export const actionUpdateClientInformationFailure = createAction(
    '[Client] Update Client Information Failure',
    props<{error : any}>()
);

export const actionGetLegalDetails = createAction(
    '[Client] Get Legal Details',
    props<{clientId : string}>()
);

export const actionGetLegalDetailsSuccess = createAction(
    '[Client] Get Legal Details Success',
    props<{legalDetails : Legal}>()
);

export const actionGetLegalDetailsFailure = createAction(
    '[Client] Get Legal Details Failure',
    props<{error : any}>()
);

export const actionSaveLegalDetails = createAction(
    '[Client] Save Legal Details',
    props<{legalDetails : Legal}>()
);

export const actionSaveLegalDetailsSuccess = createAction(
    '[Client] Save Legal Details Success',
    props<{legalDetails : Legal,response : any}>()
);

export const actionSaveLegalDetailsFailure = createAction(
    '[Client] Save Legal Details Failure',
    props<{error : any}>()
);

export const actionUpdateLegalDetails = createAction(
    '[Client] Update Legal Details',
    props<{legalDetails : Legal}>()
);

export const actionUpdateLegalDetailsSuccess = createAction(
    '[Client] Update Legal Details Success',
    props<{legalDetails : Legal}>()
);

export const actionUpdateLegalDetailsFailure = createAction(
    '[Client] Update Legal Details Failure',
    props<{error : any}>()
);

export const actionGetBillingDetails = createAction(
    '[Client] Get Billing Details',
    props<{clientId : string}>()
);

export const actionGetBillingDetailsSuccess = createAction(
    '[Client] Get Billing Details Success',
    props<{billingDetails : Billing}>()
);

export const actionGetBillingDetailsFailure = createAction(
    '[Client] Get Billing Details Failure',
    props<{error : any}>()
);

export const actionSaveBillingDetails = createAction(
    '[Client] Save Billing Details',
    props<{billingDetails : Billing}>()
);

export const actionSaveBillingDetailsSuccess = createAction(
    '[Client] Save Billing Details Success',
    props<{billingDetails : Billing,response : any}>()
);

export const actionSaveBillingDetailsFailure = createAction(
    '[Client] Save Billing Details Failure',
    props<{error : any}>()
);

export const actionUpdateBillingDetails = createAction(
    '[Client] Update Billing Details',
    props<{billingDetails : Billing}>()
);

export const actionUpdateBillingDetailsSuccess = createAction(
    '[Client] Update Billing Details Success',
    props<{billingDetails : Billing}>()
);

export const actionUpdateBillingDetailsFailure = createAction(
    '[Client] Update Billing Details Failure',
    props<{error : any}>()
);

export const actionGetProductPricingDetails = createAction(
    '[Client] Get Product Pricing Details',
    props<{clientId : string}>()
);

export const actionGetProductPricingDetailsSuccess = createAction(
    '[Client] Get Product Pricing Details Success',
    props<{productPricing : ProductPricing}>()
);

export const actionGetProductPricingDetailsFailure = createAction(
    '[Client] Get Product Pricing Details Failure',
    props<{error : any}>()
);

export const actionSaveProductPricingDetails = createAction(
    '[Client] Save Product Pricing Details',
    props<{productPricing : ProductPricing}>()
);

export const actionSaveProductPricingDetailsSuccess = createAction(
    '[Client] Save Product Pricing Details Success',
    props<{productPricing : ProductPricing,response : any}>()
);

export const actionSaveProductPricingDetailsFailure = createAction(
    '[Client] Save Product Pricing Details Failure',
    props<{error : any}>()
);

export const actionUpdateProductPricingDetails = createAction(
    '[Client] Update Product Pricing Details',
    props<{productPricing : ProductPricing}>()
);

export const actionUpdateProductPricingDetailsSuccess = createAction(
    '[Client] Update Product Pricing Details Success',
    props<{productPricing : ProductPricing}>()
);

export const actionUpdateProductPricingDetailsFailure = createAction(
    '[Client] Update Product Pricing Details Failure',
    props<{error : any}>()
);

export const actionGetBankDetails = createAction(
    '[Client] Get Bank Details',
    props<{clientId : string}>()
);

export const actionGetBankDetailsSuccess = createAction(
    '[Client] Get Bank Details Success',
    props<{bankDetails : BankDetails}>()
);

export const actionGetBankDetailsFailure = createAction(
    '[Client] Get Bank Details Failure',
    props<{error : any}>()
);

export const actionSaveBankDetails = createAction(
    '[Client] Save Bank Details',
    props<{bankDetails : BankDetails}>()
);

export const actionSaveBankDetailsSuccess = createAction(
    '[Client] Save Bank Details Success',
    props<{bankDetails : BankDetails,response : any}>()
);

export const actionSaveBankDetailsFailure = createAction(
    '[Client] Save Bank Details Failure',
    props<{error : any}>()
);

export const actionUpdateBankDetails = createAction(
    '[Client] Update Bank Details',
    props<{bankDetails : BankDetails}>()
);

export const actionUpdateBankDetailsSuccess = createAction(
    '[Client] Update Bank Details Success',
    props<{bankDetails : BankDetails}>()
);

export const actionUpdateBankDetailsFailure = createAction(
    '[Client] Update Bank Details Failure',
    props<{error : any}>()
);