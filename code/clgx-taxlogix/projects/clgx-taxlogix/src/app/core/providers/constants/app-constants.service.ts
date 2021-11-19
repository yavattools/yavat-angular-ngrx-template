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

  public AGENCIES_END_POINT: string;
  public COLLECTION_END_POINT: string;
  public ESCROW_END_POINT:string;
  public NONESCROW_END_POINT:string;
  public PAYMENTDETAILS_END_POINT:string;


  public snackbarType: SnackTypes;

  constructor() {
    this.CONFIG_URL = 'assets/config/web.config.json';
    this.BASE_API_URL = 'http://localhost:3000';

    this.SIGN_IN_URL =
      (APP_CONTEXT ? '/' : '') + APP_CONTEXT + '/api/authenticate';
    this.GET_ACCOUNT_INFO_URL =
      (APP_CONTEXT ? '/' : '') + APP_CONTEXT + '/api/account';

    this.TOKEN_REFRESH_URL = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/api/account/refreshToken';

      this.AGENCIES_END_POINT = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/agencies/';

      this.COLLECTION_END_POINT = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/getCollectionDates';

      this.ESCROW_END_POINT = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/escrow';

      this.NONESCROW_END_POINT = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/nonescrow';

      this.PAYMENTDETAILS_END_POINT = APP_CONTEXT
      ? '/'
      : '' + APP_CONTEXT + '/paymentdetails';

    this.snackbarType = new SnackTypes();
  }
}
