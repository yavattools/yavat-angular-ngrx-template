import { Injectable } from '@angular/core';

export const APP_CONTEXT = '';
export const APP_ID = 'clgx';

export class SnackTypes {
  public SUCCESS: string;
  public ERROR: string;
  public INFO: string;
  public WARNING: string;

  constructor() {
    this.ERROR = 'error';
    this.SUCCESS = 'success';
    this.INFO = 'info';
    this.WARNING = 'warning';
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppConstantsService {
  public CONFIG_URL: string;
  public BASE_API_URL: string;
  public SIGN_IN_URL: string;
  public GET_ACCOUNT_INFO_URL: string;
  public TOKEN_REFRESH_URL: string;

  public AGENCY_MASTER_LIST!: string;
  public GET_STATES : string;
  public GET_COUNTIES_BY_STATE_ID : string;
  public GET_DROP_DOWNLIST_BY_ADMINCODE : string;

  public SAVE_AGENCIES: string;
  public COLLECTION_END_POINT: string;
  public SAVE_COLLECTION : string;
  public ESCROW_END_POINT:string;
  public SAVE_ESCROW_DETAILS : string;
  public NONESCROW_END_POINT:string;
  public SAVE_NONESCROW_DETAILS : string;
  public PAYMENTDETAILS_END_POINT:string;
  public SAVE_PAYMENTDETAILS : string;
  public GET_CLIENTS : string;
  public SAVE_CLIENTINFO : string;
  public GET_CLIENTINFO : string;
  public GET_LEGAL : string;
  public SAVE_LEGAL : string;
  public GET_BILLING : string;
  public SAVE_BILLING : string;
  public GET_PRODUCT_PRICING_DETAILS : string;
  public SAVE_PRODUCT_PRICING_DETAILS : string;
  public GET_BANK_DETAILS : string;
  public SAVE_BANK_DETAILS : string;

  public snackbarType: SnackTypes;

  constructor() {
    this.CONFIG_URL = 'assets/config/web.config.json';
    this.BASE_API_URL = 'https://taxservices.chainlogix.net:8082/omschaingatewayservice';

    
    this.GET_COUNTIES_BY_STATE_ID = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/common/county';

    this.GET_STATES = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/common/states';

    this.GET_DROP_DOWNLIST_BY_ADMINCODE = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/agency/fetchDropList';

    this.SIGN_IN_URL =
      (APP_CONTEXT ? '/' : '') + APP_CONTEXT + '/taxlogix/login';
      
    this.GET_ACCOUNT_INFO_URL =
      (APP_CONTEXT ? '/' : '') + APP_CONTEXT + '/api/account';

    this.TOKEN_REFRESH_URL = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/api/account/refreshToken';

    this.AGENCY_MASTER_LIST = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/agency/agencyMasterList';
      
    this.SAVE_AGENCIES = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/agencyMaster';

    this.COLLECTION_END_POINT = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/collectionDateList';

    this.SAVE_COLLECTION = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/createCollectionDate';

    this.ESCROW_END_POINT = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/escrowList';

    this.SAVE_ESCROW_DETAILS = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/saveEscrow';

    this.NONESCROW_END_POINT = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/nonEscrowList';

    this.SAVE_NONESCROW_DETAILS = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/saveNonEscrow';

    this.PAYMENTDETAILS_END_POINT = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/fetchAgencyPayDetls';

    this.SAVE_PAYMENTDETAILS = APP_CONTEXT
    ? '/'
    : '' + APP_CONTEXT + '/api/agency/createAgencyPayDetls';

    this.GET_CLIENTS = APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/fetchClientInfofDetls';

    this.SAVE_CLIENTINFO =  APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/createClientSetup';

    this.GET_CLIENTINFO = APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/fetchClientSetUpDetls';

    this.GET_LEGAL = APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/fetchLegalClientDetls';

    this.SAVE_LEGAL =  APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/createLegal';

    this.GET_BILLING = APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/fetchBillingDetls';

    this.SAVE_BILLING =  APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/createClientBillingDetls';

    this.GET_PRODUCT_PRICING_DETAILS = APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/fetchClientProductPricing';

    this.SAVE_PRODUCT_PRICING_DETAILS =  APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/createProductPricingDetls';

    this.GET_BANK_DETAILS = APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/fetchClientBankDetls';

    this.SAVE_BANK_DETAILS =  APP_CONTEXT 
    ? '/' 
    : ''+ APP_CONTEXT + '/api/clientsetup/createClientBankDetls';

    this.snackbarType = new SnackTypes();
  }
}
