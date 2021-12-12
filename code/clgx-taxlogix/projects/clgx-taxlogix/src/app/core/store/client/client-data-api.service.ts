import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsService } from '@app/core/providers/constants';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@env/environment';
import { BankDetails, Billing, ClientInformation, GetClientsRequest, Legal, ProductPricing } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  constructor(private http: HttpClient, private _appConstantService: AppConstantsService) { }

  // https://taxservices.chainlogix.net:8082/omschaingatewayservice/api/clientsetup/fetchClientInfofDetls?stateId=0&clientNumber=0&clientName=
  getClientsList(getClientsRequest : GetClientsRequest) : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.GET_CLIENTS 
        + '?clientName=' + getClientsRequest.clientName 
        + '&clientNumber=' + getClientsRequest.clientNumber 
        + '&stateId=' + getClientsRequest.stateId 
        + '&status='+ getClientsRequest.status);
  }

  getClientInformation(clientId : any) : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.GET_CLIENTINFO + '?clientId=' + clientId);
  }

  saveClientInfo(clientInfo : ClientInformation) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(clientInfo);
    console.log(clientInfo);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_CLIENTINFO, body, {'headers':headers});
  }

  updateClientInfo(clientInfo : ClientInformation) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(clientInfo);
    console.log(clientInfo);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_CLIENTINFO, body, {'headers':headers});
  }

  getLegalDetails(clientId : any) : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.GET_LEGAL + "?clientId=" + clientId);
  }

  saveLegalDetails(legal : Legal) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(legal);
    console.log(legal);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_LEGAL, body, {'headers':headers});
  }

  updateLegalDetails(legal : Legal) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(legal);
    console.log(legal);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_LEGAL, body, {'headers':headers});
  }

  getBillingDetails(clientId : any) : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.GET_BILLING + "?clientId=" + clientId);
  }

  saveBillingDetails(billing : Billing) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(billing);
    console.log(billing);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_BILLING, body, {'headers':headers});
  }

  updateBillingDetails(billing : Billing) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(billing);
    console.log(billing);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_BILLING, body, {'headers':headers});
  }

  getProductPricingDetails(clientId : any) : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.GET_PRODUCT_PRICING_DETAILS + "?clientId=" + clientId);
  }

  saveProductPricingDetails(productPricing : ProductPricing) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(productPricing);
    console.log(productPricing);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_PRODUCT_PRICING_DETAILS, body, {'headers':headers});
  }

  updateProductPricingDetails(productPricing : ProductPricing) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(productPricing);
    console.log(productPricing);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_PRODUCT_PRICING_DETAILS, body, {'headers':headers});
  }

  getBankDetails(clientId : any) : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.GET_BANK_DETAILS + "?clientId=" + clientId);
  }

  saveBankDetails(bankDetails : BankDetails) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(bankDetails);
    console.log(bankDetails);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_BANK_DETAILS, body, {'headers':headers});
  }

  updateBankDetails(bankDetails : BankDetails) : Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(bankDetails);
    console.log(bankDetails);
    
    return this.http.post<any>(API_BASE_URL + this._appConstantService.SAVE_BANK_DETAILS, body, {'headers':headers});
  }
}
