import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsService } from '@app/core/providers/constants';
import { Agency, CollectionDates, EscrowDetails, GetActiveAgenciesRequest, NonEscrowDetails, PaymentDetails } from '@app/core/store/agency/agency.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyDataService {


  constructor(private http: HttpClient, private _appConstantService: AppConstantsService) { }

  getAgencies(request: GetActiveAgenciesRequest ): Observable<Agency[]> {
    console.log('getAgencies '+ this._appConstantService.BASE_API_URL + this._appConstantService.AGENCIES_END_POINT)
    return this.http.get<Agency[]>(this._appConstantService.BASE_API_URL + this._appConstantService.AGENCIES_END_POINT);
  }
 
  getAgenciesByMasterId(agencyMasterid:number): Observable<Agency> {
    console.log('getAgencies '+this._appConstantService.BASE_API_URL + this._appConstantService.AGENCIES_END_POINT + agencyMasterid)
    return this.http.get<Agency>(this._appConstantService.BASE_API_URL + this._appConstantService.AGENCIES_END_POINT + agencyMasterid);
  }

  addAgency(agency:Agency): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(agency);
    console.log(body)
    
    return this.http.post(this._appConstantService.BASE_API_URL + this._appConstantService.AGENCIES_END_POINT, body,{'headers':headers})
  }
  
  updateAgency(agency:Agency): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(agency);
    console.log(body)
    
    return this.http.put(this._appConstantService.BASE_API_URL + this._appConstantService.AGENCIES_END_POINT, body,{'headers':headers})
  }

  getCollectionsDates(): Observable<CollectionDates[]> {

    console.log('getCollectionDates '+this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT)
    return this.http.get<CollectionDates[]>(this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT);
  }
 
  getCollectionsDatesBycollectionPracticesId(collectionPracticesId:number): Observable<Agency> {
    
    console.log('getCollectionDates '+this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT + '/' +collectionPracticesId)
    return this.http.get<Agency>(this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT + collectionPracticesId);
  }

  addCollectionDate(collection:CollectionDates): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(collection);
    console.log(body)
    return this.http.post(this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT, body,{'headers':headers})
  }
  
  updateCollectionDate(collection:CollectionDates): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(collection);
    console.log(body)
    return this.http.put( this._appConstantService.BASE_API_URL + this._appConstantService.COLLECTION_END_POINT, body,{'headers':headers})
  }


  getEscrow(): Observable<EscrowDetails[]> { 
    console.log('getEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT)
    return this.http.get<EscrowDetails[]>(this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT);
  }
 
  getEscrowById(escrowId:number): Observable<EscrowDetails> {
    console.log('getEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT +'/' +escrowId)
    return this.http.get<EscrowDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT + '/' + escrowId);
  }

  addEscrow(escrow:EscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(escrow);
    console.log(body)
    return this.http.post(this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT, body,{'headers':headers})
  }
  
  updateEscrow(escrow:EscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(escrow);
    console.log(body)
    return this.http.put(this._appConstantService.BASE_API_URL + this._appConstantService.ESCROW_END_POINT, body,{'headers':headers})
  }


  getNonEscrow(): Observable<NonEscrowDetails[]> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT)
    return this.http.get<NonEscrowDetails[]>(this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT);
  }
 
  getNonEscrowById(nonescrowId:number): Observable<NonEscrowDetails> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT +'/' + nonescrowId)
    return this.http.get<NonEscrowDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT + '/' + nonescrowId);
  }

  addNonEscrow(nonescrow:NonEscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(nonescrow);
    console.log(body)
    return this.http.post(this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT, body,{'headers':headers})
  }
  
  updateNonEscrow(nonescrow:NonEscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(nonescrow);
    console.log(body)
    return this.http.put(this._appConstantService.BASE_API_URL + this._appConstantService.NONESCROW_END_POINT, body,{'headers':headers})
  }

  getPaymentDetails(): Observable<PaymentDetails[]> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT)
    return this.http.get<PaymentDetails[]>(this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT);
  }
 
  getPaymentDetailsByAgencyPaymentId(agencyPaymentId:number): Observable<PaymentDetails> {
    console.log('getNonEscrow '+this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT + '/' + agencyPaymentId)
    return this.http.get<PaymentDetails>(this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT + '/' + agencyPaymentId);
  }

  addPaymentDetails(payment:PaymentDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(payment);
    console.log(body)
    return this.http.post(this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT, body,{'headers':headers})
  }
  
  updatePaymentDetails(payment:PaymentDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(payment);
    console.log(body)
    return this.http.put(this._appConstantService.BASE_API_URL + this._appConstantService.PAYMENTDETAILS_END_POINT, body,{'headers':headers})
  }

}
