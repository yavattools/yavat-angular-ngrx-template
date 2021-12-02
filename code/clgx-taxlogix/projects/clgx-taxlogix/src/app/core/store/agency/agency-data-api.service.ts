import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsService } from '@app/core/providers/constants';
import { Agency, CollectionDates, EscrowDetails, GetActiveAgenciesRequest, GetCollectionDatesRequest, GetEscrowRequest, GetNonEscrowDetailsRequest, GetPaymentDetailsRequest, NonEscrowDetails, PaymentDetails } from '@app/core/store/agency/agency.model';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyDataService {


  constructor(private http: HttpClient, private _appConstantService: AppConstantsService) { }

  getStateInputFieldOptions() : Observable<any>{
    return this.http.get<any>(API_BASE_URL + this._appConstantService.StateOptions)
  }

  getAgencies(request: GetActiveAgenciesRequest ): Observable<Agency[]> {
    console.log('getAgencies '+ this._appConstantService.BASE_API_URL + this._appConstantService.AGENCY_MASTER_LIST);
    return this.http.get<Agency[]>(API_BASE_URL + this._appConstantService.AGENCY_MASTER_LIST + '?userId=' + +request.userId + '&processId=' + +request.processId);
  }

  getAgenciesByMasterId(request : GetActiveAgenciesRequest): Observable<Agency> {
    console.log('getAgencies '+this._appConstantService.BASE_API_URL + this._appConstantService.AGENCY_MASTER_LIST  + '?userId=' +request.userId + '&processId=' +request.processId + '&agencyMasterId=' + request.agencyMasterId);
    return this.http.get<Agency>(this._appConstantService.BASE_API_URL + this._appConstantService.AGENCY_MASTER_LIST + '?userId=' +request.userId + '&processId=' +request.processId + '&agencyMasterId=' + request.agencyMasterId);
  }

  addAgency(agency:Agency): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(agency);
    console.log(body)

    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_AGENCIES, body,{'headers':headers})
  }

  updateAgency(agency:Agency): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(agency);
    console.log(body)

    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_AGENCIES, body,{'headers':headers})
  }

  getCollectionsDates(request : GetCollectionDatesRequest): Observable<CollectionDates[]> {
    console.log('getCollectionDates '+this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
    return this.http.get<CollectionDates[]>(this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
  }

  getCollectionsDatesBycollectionPracticesId(request:GetCollectionDatesRequest): Observable<Agency> {
    console.log('getCollectionDates '+this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&agencyCollectionDatesId=' + request.agencyCollectionDatesId);
    return this.http.get<Agency>(this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT + '?agencyCollectionDatesId='+'&agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&agencyCollectionDatesId=' + request.agencyCollectionDatesId);
  }

  addCollectionDate(collection:CollectionDates): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(collection);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_COLLECTION, body,{'headers':headers})
  }

  updateCollectionDate(collection:CollectionDates): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(collection);
    console.log(body)
    return this.http.post<any>( this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_COLLECTION , body,{'headers':headers})
  }


  getEscrow(request : GetEscrowRequest): Observable<EscrowDetails> {
    console.log('getEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
    return this.http.get<EscrowDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
  }

  getEscrowById(request:GetEscrowRequest): Observable<EscrowDetails> {
    console.log('getEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&escrowId=' + request.escrowId);
    return this.http.get<EscrowDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&escrowId=' + request.escrowId);
  }

  addEscrow(escrow:EscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(escrow);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_ESCROW_DETAILS , body,{'headers':headers})
  }

  updateEscrow(escrow:EscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(escrow);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_ESCROW_DETAILS , body,{'headers':headers})
  }


  getNonEscrow(request : GetNonEscrowDetailsRequest): Observable<NonEscrowDetails> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
    return this.http.get<NonEscrowDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
  }

  getNonEscrowById(request:GetNonEscrowDetailsRequest): Observable<NonEscrowDetails> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&nonEscrowId='+request.nonEscrowId)
    return this.http.get<NonEscrowDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId+ '&nonEscrowId=' + request.nonEscrowId);
  }

  addNonEscrow(nonescrow:NonEscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(nonescrow);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_NONESCROW_DETAILS , body,{'headers':headers})
  }

  updateNonEscrow(nonescrow:NonEscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(nonescrow);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_NONESCROW_DETAILS, body,{'headers':headers})
  }

  getPaymentDetails(request : GetPaymentDetailsRequest): Observable<PaymentDetails> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
    return this.http.get<PaymentDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId);
  }

  getPaymentDetailsByAgencyPaymentId(request:GetPaymentDetailsRequest): Observable<PaymentDetails> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&agencypaymentmasterId=' + request.agencypaymentmasterId);
    return this.http.get<PaymentDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT + '?agencyMasterId='+request.agencyMasterId + '&userId=' + request.userId + '&agencypaymentmasterId=' + request.agencypaymentmasterId);
  }

  addPaymentDetails(payment:PaymentDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(payment);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_PAYMENTDETAILS , body,{'headers':headers})
  }

  updatePaymentDetails(payment:PaymentDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(payment);
    console.log(body)
    return this.http.post<any>(this._appConstantService.BASE_API_URL + this._appConstantService.SAVE_PAYMENTDETAILS, body,{'headers':headers})
  }

}
