import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency, CollectionDates, EscrowDetails, NonEscrowDetails, PaymentDetails } from '@app/core/store/agency/agency.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  BASE_URL: string = "http://localhost:3000/";
  AGENCIES_END_POINT: string = "agencies/";
  COLLECTION_END_POINT: string = "getCollectionDates/";
  ESCROW_END_POINT:string = "escrow/";
  NONESCROW_END_POINT:string = "nonescrow/";
  PAYMENTDETAILS_END_POINT:string = "paymentdetails/"


  constructor(private http: HttpClient) { }

  getAgencies(): Observable<Agency[]> {
    console.log('getAgencies '+this.BASE_URL + this.AGENCIES_END_POINT)
    return this.http.get<Agency[]>(this.BASE_URL + this.AGENCIES_END_POINT);
  }
 
  getAgenciesByMasterId(agencyMasterid:number): Observable<Agency> {
    console.log('getAgencies '+this.BASE_URL + this.AGENCIES_END_POINT +agencyMasterid)
    return this.http.get<Agency>(this.BASE_URL + this.AGENCIES_END_POINT + agencyMasterid);
  }

  addAgency(agency:Agency): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(agency);
    console.log(body)
    return this.http.post(this.BASE_URL + this.AGENCIES_END_POINT, body,{'headers':headers})
  }
  
  updateAgency(agency:Agency): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(agency);
    console.log(body)
    return this.http.put(this.BASE_URL + this.AGENCIES_END_POINT, body,{'headers':headers})
  }

  getCollectionsDates(): Observable<CollectionDates[]> {
    console.log('getCollectionDates '+this.BASE_URL + this.COLLECTION_END_POINT)
    return this.http.get<CollectionDates[]>(this.BASE_URL + this.COLLECTION_END_POINT);
  }
 
  getCollectionsDatesBycollectionPracticesId(collectionPracticesId:number): Observable<Agency> {
    console.log('getCollectionDates '+this.BASE_URL + this.COLLECTION_END_POINT +collectionPracticesId)
    return this.http.get<Agency>(this.BASE_URL + this.COLLECTION_END_POINT + collectionPracticesId);
  }

  addCollectionDate(collection:CollectionDates): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(collection);
    console.log(body)
    return this.http.post(this.BASE_URL + this.COLLECTION_END_POINT, body,{'headers':headers})
  }
  
  updateCollectionDate(collection:CollectionDates): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(collection);
    console.log(body)
    return this.http.put(this.BASE_URL + this.COLLECTION_END_POINT, body,{'headers':headers})
  }


  getEscrow(): Observable<EscrowDetails[]> {
    console.log('getEscrow '+this.BASE_URL + this.ESCROW_END_POINT)
    return this.http.get<EscrowDetails[]>(this.BASE_URL + this.ESCROW_END_POINT);
  }
 
  getEscrowById(escrowId:number): Observable<EscrowDetails> {
    console.log('getEscrow '+this.BASE_URL + this.ESCROW_END_POINT +escrowId)
    return this.http.get<EscrowDetails>(this.BASE_URL + this.ESCROW_END_POINT + escrowId);
  }

  addEscrow(escrow:EscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(escrow);
    console.log(body)
    return this.http.post(this.BASE_URL + this.ESCROW_END_POINT, body,{'headers':headers})
  }
  
  updateEscrow(escrow:EscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(escrow);
    console.log(body)
    return this.http.put(this.BASE_URL + this.ESCROW_END_POINT, body,{'headers':headers})
  }


  getNonEscrow(): Observable<NonEscrowDetails[]> {
    console.log('getNonEscrow '+this.BASE_URL + this.NONESCROW_END_POINT)
    return this.http.get<NonEscrowDetails[]>(this.BASE_URL + this.NONESCROW_END_POINT);
  }
 
  getNonEscrowById(nonescrowId:number): Observable<NonEscrowDetails> {
    console.log('getNonEscrow '+this.BASE_URL + this.NONESCROW_END_POINT + nonescrowId)
    return this.http.get<NonEscrowDetails>(this.BASE_URL + this.NONESCROW_END_POINT + nonescrowId);
  }

  addNonEscrow(nonescrow:NonEscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(nonescrow);
    console.log(body)
    return this.http.post(this.BASE_URL + this.NONESCROW_END_POINT, body,{'headers':headers})
  }
  
  updateNonEscrow(nonescrow:NonEscrowDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(nonescrow);
    console.log(body)
    return this.http.put(this.BASE_URL + this.NONESCROW_END_POINT, body,{'headers':headers})
  }

  getPaymentDetails(): Observable<PaymentDetails[]> {
    console.log('getNonEscrow '+this.BASE_URL + this.PAYMENTDETAILS_END_POINT)
    return this.http.get<PaymentDetails[]>(this.BASE_URL + this.PAYMENTDETAILS_END_POINT);
  }
 
  getPaymentDetailsByAgencyPaymentId(agencyPaymentId:number): Observable<PaymentDetails> {
    console.log('getNonEscrow '+this.BASE_URL + this.PAYMENTDETAILS_END_POINT + agencyPaymentId)
    return this.http.get<PaymentDetails>(this.BASE_URL + this.PAYMENTDETAILS_END_POINT + agencyPaymentId);
  }

  addPaymentDetails(payment:PaymentDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(payment);
    console.log(body)
    return this.http.post(this.BASE_URL + this.PAYMENTDETAILS_END_POINT, body,{'headers':headers})
  }
  
  updatePaymentDetails(payment:PaymentDetails): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(payment);
    console.log(body)
    return this.http.put(this.BASE_URL + this.PAYMENTDETAILS_END_POINT, body,{'headers':headers})
  }

}
