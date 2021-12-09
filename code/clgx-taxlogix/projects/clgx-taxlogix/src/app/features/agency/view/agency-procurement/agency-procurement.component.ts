import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Agency, CountiesForStates, County, EscrowDetails, NonEscrowDetails, StateOptions } from '@app/core/store/agency/agency.model';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { AgencyFeature, agencies } from '../../agency-view.data';

@Component({
  selector: 'clgx-agency-procument',
  templateUrl: './agency-procurement.component.html',
  styleUrls: ['./agency-procurement.component.scss']
})
export class AgencyProcumentComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;
  isMobile: Boolean = false;
  escrowDetails$ : Observable<EscrowDetails>;
  escrowDetails : EscrowDetails = new EscrowDetails();
  nonEscrowDetails$ : Observable<NonEscrowDetails>;
  nonEscrowDetails : NonEscrowDetails = new NonEscrowDetails();
  newEscrowForm : any;
  newNonEscrowForm : any;
  tabSelectedIndex = 0;
  loginData : any
  agencyMasterId : string | undefined
  escrowDescription : string = ''
  nonEscrowDescription : string =''
  isNonEscrowCountiesLoading : boolean = false;
  nonEscrowCounties$ : Observable<County[]>;
  nonEscrowCounties : Array<County> = new Array<County>();
  subscriptions: Array<Subscription> = new Array<Subscription>();
  stateOptions$ : Observable<StateOptions[]>;
  stateOptions : Array<StateOptions> = new Array<StateOptions>();
  
  escrowForm = this.fb.group({
    contactName : [''],
    contactPhone : ['', Validators.minLength(10)],
    contactFax : [''],
    contactEmail : ['', Validators.email],
    agencyWebsite : [''],
    amtAvailableOnWebsite : [''],
    costToPayUsingCopyOfTb : [''],
    listingAcceptedForPayment : [''],
    mailAWayOnlyReq : [''],
    agencyExpectWebTb : [''],
    postmarkAccepted : [''],
    copyFee : [''],
    feeForMailAWay : [''],
    noOfParcelsPerCheck : ['']
  });
  nonEscrowForm = this.fb.group({
    collectingAgencyName : [''],
    contactName : [''],
    contactPhone : ['',Validators.minLength(10)],
    contactFax : [''],
    contactEmail : ['', Validators.email],
    agencyWebsite : [''],
    collectedByAgency : [''],
    thirdPartyCollections : [''],
    amtAvailableOnWebsite : [''],
    mailAWayOnlyReq : [''],
    feeForMailAWay : [''],
    payToName : [''],
    payToAddress : [''],
    payToCity : [''],
    stateId : ['', Validators.required],
    zipId : ['', Validators.required],
    countyId : ['', Validators.required],
    methodOfPaymentRequired : ['']
  });
  // selectedAgency$ : Observable<Agency>;
  // selectedAgency! : Agency;
  constructor( public deviceService:DeviceDetectorService, private fb : FormBuilder , private agencyFacade : AgencyStoreFacade,
    private authStoreFacade : AuthStoreFacade, private cd: ChangeDetectorRef){
    this.escrowDetails$ = this.agencyFacade.escrowDetails$;
    this.nonEscrowDetails$ = this.agencyFacade.nonEscrowDetails$;
    this.nonEscrowCounties$ = this.agencyFacade.nonEscrowCounties$;
    this.stateOptions$ = this.agencyFacade.stateOptions$;
    this.authStoreFacade.loginProfile$.subscribe(data=>{
      this.loginData = data;
    });
    this.agencyFacade.selectedAgency$.subscribe(data=>{
      this.agencyMasterId = data.agencyMasterId;
    });
    if(this.agencyMasterId){
      this.agencyFacade.getEscrowDetails({agencyMasterId : this.agencyMasterId , userId : this.loginData.processOrgModel.userId , escrowId : undefined});
      this.agencyFacade.getNonEscrowDetails({agencyMasterId : this.agencyMasterId , userId : this.loginData.processOrgModel.userId , nonEscrowId : undefined});
    }
    this.subscriptions.push(this.nonEscrowCounties$.subscribe(cties => {
      this.nonEscrowCounties = [...cties];
      debugger;
      if(this.nonEscrowCounties.length && this.isNonEscrowCountiesLoading){
        setTimeout(() => {
          this.isNonEscrowCountiesLoading = false;
          this.cd.detectChanges();
        }, 90);
      }
    }));
  }

  ngOnInit() {
    this.escrowDetails$.subscribe(escrowDetails => {
      this.escrowDetails = escrowDetails;
      if(escrowDetails){
        this.escrowForm.controls['contactName'].setValue(escrowDetails.contactName);
        this.escrowForm.controls['contactPhone'].setValue(escrowDetails.contactPhone);
        this.escrowForm.controls['contactFax'].setValue(escrowDetails.contactFax);
        this.escrowForm.controls['contactEmail'].setValue(escrowDetails.contactEmail);
        this.escrowForm.controls['agencyWebsite'].setValue(escrowDetails.agencyWebsite);
        this.escrowForm.controls['amtAvailableOnWebsite'].setValue(escrowDetails.amtAvailable?.toString());
        this.escrowForm.controls['costToPayUsingCopyOfTb'].setValue(escrowDetails.costToPay?.toString());
        this.escrowForm.controls['listingAcceptedForPayment'].setValue(escrowDetails.isListingAccepted?.toString());
        this.escrowForm.controls['mailAWayOnlyReq'].setValue(escrowDetails.mailawayRegistered?.toString());
        this.escrowForm.controls['agencyExpectWebTb'].setValue(escrowDetails.isAgencyWebExpect?.toString());
        this.escrowForm.controls['postmarkAccepted'].setValue(escrowDetails.postMarkAccepted?.toString());
        this.escrowForm.controls['copyFee'].setValue(escrowDetails.copyFee);
        this.escrowForm.controls['feeForMailAWay'].setValue(escrowDetails.mailAwayFee);
        this.escrowForm.controls['noOfParcelsPerCheck'].setValue(escrowDetails.numOfParcels);
    }
    });
    this.nonEscrowDetails$.subscribe(nonEscrowDetails => {
      this.nonEscrowDetails = nonEscrowDetails;
      if(nonEscrowDetails){
        this.nonEscrowForm.controls['collectingAgencyName'].setValue(nonEscrowDetails.nameCollecting);
        this.nonEscrowForm.controls['contactName'].setValue(nonEscrowDetails.contactName);
        this.nonEscrowForm.controls['contactPhone'].setValue(nonEscrowDetails.contactPhone);
        this.nonEscrowForm.controls['contactFax'].setValue(nonEscrowDetails.contactFax);
        this.nonEscrowForm.controls['contactEmail'].setValue(nonEscrowDetails.contactEmail);
        this.nonEscrowForm.controls['agencyWebsite'].setValue(nonEscrowDetails.agencyWebsite);
        this.nonEscrowForm.controls['collectedByAgency'].setValue(nonEscrowDetails.agencyCollectedBy?.toString());
        this.nonEscrowForm.controls['thirdPartyCollections'].setValue(nonEscrowDetails.thirdPartyCollections?.toString());
        this.nonEscrowForm.controls['amtAvailableOnWebsite'].setValue(nonEscrowDetails.amtAvailable?.toString());
        this.nonEscrowForm.controls['mailAWayOnlyReq'].setValue(nonEscrowDetails.mailAwayReq?.toString());
        this.nonEscrowForm.controls['feeForMailAWay'].setValue(nonEscrowDetails.mailAwayFee);
        this.nonEscrowForm.controls['payToName'].setValue(nonEscrowDetails.payName);
        this.nonEscrowForm.controls['payToAddress'].setValue(nonEscrowDetails.payAddress);
        this.nonEscrowForm.controls['payToCity'].setValue(nonEscrowDetails.payCity);
        this.nonEscrowForm.controls['stateId'].setValue(nonEscrowDetails.payStateId);
        this.nonEscrowForm.controls['zipId'].setValue(nonEscrowDetails.payZip);
        this.nonEscrowForm.controls['countyId'].setValue(nonEscrowDetails.payCountyId);
        this.nonEscrowForm.controls['methodOfPaymentRequired'].setValue(nonEscrowDetails.paymentMethodId?.toString());
        if(nonEscrowDetails.payStateId && !this.nonEscrowCounties){
          this.agencyFacade.getCounties(nonEscrowDetails.payStateId, 'nonEscrowStates');
        }
        else{
          this.nonEscrowCounties = []
        }
    }
    });
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.subscriptions.push(this.stateOptions$.subscribe((response)=>{
      this.stateOptions = [...response];
    }));
  }

  get contactName(){
    return this.escrowForm.get('contactName');
  }
  get contactEmail(){
    return this.escrowForm.get('contactEmail');
  }
  get contactPhone(){
    return this.escrowForm.get('contactPhone');
  }
  get contactFax(){
    return this.escrowForm.get('contactFax');
  }
  get agencyWebsite(){
    return this.escrowForm.get('agencyWebsite');
  }
  get amtAvailableOnWebsite(){
    return this.escrowForm.get('amtAvailableOnWebsite');
  }
  get costToPayUsingCopyOfTb(){
    return this.escrowForm.get('costToPayUsingCopyOfTb');
  }
  get listingAcceptedForPayment(){
    return this.escrowForm.get('listingAcceptedForPayment');
  }
  get mailAWayOnlyReq(){
    return this.escrowForm.get('mailAWayOnlyReq');
  }
  get agencyExpectWebTb(){
    return this.escrowForm.get('agencyExpectWebTb');
  }
  get postmarkAccepted(){
    return this.escrowForm.get('postmarkAccepted');
  }
  get copyFee(){
    return this.escrowForm.get('copyFee');
  }
  get feeForMailAWay(){
    return this.escrowForm.get('feeForMailAWay');
  }
  get noOfParcelsPerCheck(){
    return this.escrowForm.get('noOfParcelsPerCheck');
  }

  get collectingAgencyName(){
    return this.nonEscrowForm.get('collectingAgencyName');
  }
  get contactNameNonEscrow(){
    return this.nonEscrowForm.get('contactName');
  }
  get contactEmailNonEscrow(){
    return this.nonEscrowForm.get('contactEmail');
  }
  get contactPhoneNonEscrow(){
    return this.nonEscrowForm.get('contactPhone');
  }
  get contactFaxNonEscrow(){
    return this.nonEscrowForm.get('contactFax');
  }
  get agencyWebsiteNonEscrow(){
    return this.nonEscrowForm.get('agencyWebsite');
  }
  get collectedByAgency(){
    return this.nonEscrowForm.get('collectedByAgency');
  }
  get thirdPartyCollections(){
    return this.nonEscrowForm.get('thirdPartyCollections');
  }
  get amtAvailableOnWebsiteNonEscrow(){
    return this.nonEscrowForm.get('amtAvailableOnWebsite');
  }
  get mailAWayOnlyReqNonEscrow(){
    return this.nonEscrowForm.get('mailAWayOnlyReq');
  }
  get feeForMailAWayNonEscrow(){
    return this.nonEscrowForm.get('feeForMailAWay');
  }
  get payToName(){
    return this.nonEscrowForm.get('payToName');
  }
  get payToAddress(){
    return this.nonEscrowForm.get('payToAddress');
  }
  get payToCity(){
    return this.nonEscrowForm.get('payToCity');
  }
  get stateId(){
    return this.nonEscrowForm.get('stateId');
  }
  get zipId(){
    return this.nonEscrowForm.get('zipId');
  }
  get countyId(){
    return this.nonEscrowForm.get('countyId');
  }
  get methodOfPaymentRequired(){
    return this.nonEscrowForm.get('methodOfPaymentRequired');
  }
  // get methodOfPaymentRequiredWire(){
  //   return this.nonEscrowForm.get('methodOfPaymentRequiredWire');
  // }

  ngAfterViewInit(){
    this.tabSelectedIndex = 0;
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  saveOrUpdateEscrowDetails(form : FormGroup){
    this.newEscrowForm = Object.create({});
    if(form.controls['contactName'].value !== this.escrowDetails.contactName){
      this.addToEscrowDescription(this.escrowDetails.contactName, form.controls['contactName'].value, 'Contact Name');
    }
    if(form.controls['contactPhone'].value !== this.escrowDetails.contactPhone){
      this.addToEscrowDescription(this.escrowDetails.contactPhone, form.controls['contactPhone'].value, 'Contact Phone');
    }
    if(form.controls['contactFax'].value !== this.escrowDetails.contactFax){
      this.addToEscrowDescription(this.escrowDetails.contactFax, form.controls['contactFax'].value, 'Contact Fax');
    }
    if(form.controls['agencyWebsite'].value !== this.escrowDetails.agencyWebsite){
      this.addToEscrowDescription(this.escrowDetails.agencyWebsite, form.controls['agencyWebsite'].value, 'Agency Website');
    }
    if(form.controls['amtAvailableOnWebsite'].value !== this.escrowDetails.amtAvailable){
      this.addToEscrowDescription(this.escrowDetails.amtAvailable, form.controls['amtAvailableOnWebsite'].value, 'AMT Available On Website');
    }
    if(form.controls['costToPayUsingCopyOfTb'].value !== this.escrowDetails.costToPay){
      this.addToEscrowDescription(this.escrowDetails.costToPay, form.controls['costToPayUsingCopyOfTb'].value, 'Cost To Pay Using Copy Of TB');
    }
    if(form.controls['listingAcceptedForPayment'].value !== this.escrowDetails.isListingAccepted){
      this.addToEscrowDescription(this.escrowDetails.isListingAccepted, form.controls['listingAcceptedForPayment'].value, 'Listing Accepted For Payment');
    }
    if(form.controls['mailAWayOnlyReq'].value !== this.escrowDetails.mailawayRegistered){
      this.addToEscrowDescription(this.escrowDetails.mailawayRegistered, form.controls['mailAWayOnlyReq'].value, 'Mail AWay Only Req');
    }
    if(form.controls['agencyExpectWebTb'].value !== this.escrowDetails.isAgencyWebExpect){
      this.addToEscrowDescription(this.escrowDetails.isAgencyWebExpect, form.controls['agencyExpectWebTb'].value, 'Agency Expect Web TB');
    }
    if(form.controls['postmarkAccepted'].value !== this.escrowDetails.postMarkAccepted){
      this.addToEscrowDescription(this.escrowDetails.postMarkAccepted, form.controls['postmarkAccepted'].value, 'Post Mark Accepted');
    }
    if(form.controls['copyFee'].value !== this.escrowDetails.copyFee){
      this.addToEscrowDescription(this.escrowDetails.copyFee, form.controls['copyFee'].value, 'Copy Fee');
    }
    if(form.controls['feeForMailAWay'].value !== this.escrowDetails.mailAwayFee){
      this.addToEscrowDescription(this.escrowDetails.mailAwayFee, form.controls['feeForMailAWay'].value, 'Fee For Mail AWay');
    }
    if(form.controls['noOfParcelsPerCheck'].value !== this.escrowDetails.numOfParcels){
      this.addToEscrowDescription(this.escrowDetails.numOfParcels, form.controls['noOfParcelsPerCheck'].value, 'Number of Parcels Per Check');
    }
    this.newEscrowForm.contactName = form.controls['contactName'].value;
    this.newEscrowForm.contactPhone = form.controls['contactPhone'].value;
    this.newEscrowForm.contactFax = form.controls['contactFax'].value;
    this.newEscrowForm.contactEmail = form.controls['contactEmail'].value;
    this.newEscrowForm.agencyWebsite = form.controls['agencyWebsite'].value;
    this.newEscrowForm.amtAvailable = form.controls['amtAvailableOnWebsite'].value;
    this.newEscrowForm.costToPay = form.controls['costToPayUsingCopyOfTb'].value;
    this.newEscrowForm.isListingAccepted = form.controls['listingAcceptedForPayment'].value;
    this.newEscrowForm.mailawayRegistered = form.controls['mailAWayOnlyReq'].value;
    this.newEscrowForm.isAgencyWebExpect = form.controls['agencyExpectWebTb'].value;
    this.newEscrowForm.postMarkAccepted = form.controls['postmarkAccepted'].value;
    this.newEscrowForm.copyFee = form.controls['copyFee'].value;
    this.newEscrowForm.mailAwayFee = form.controls['feeForMailAWay'].value;
    this.newEscrowForm.numOfParcels = form.controls['noOfParcelsPerCheck'].value;
    this.newEscrowForm.agencyMasterId = this.agencyMasterId;
    this.newEscrowForm.agencyEscrowId = this.escrowDetails.agencyEscrowId?this.escrowDetails.agencyEscrowId : '';
    this.newEscrowForm.comments = this.escrowDetails.comments?this.escrowDetails.comments : '';
    this.newEscrowForm.createdBy = this.escrowDetails.createdBy?this.escrowDetails.createdBy : '';
    this.newEscrowForm.modifiedBy = this.escrowDetails.modifiedBy?this.escrowDetails.modifiedBy : '';
    this.newEscrowForm.createdByUser = this.escrowDetails.createdByUser?this.escrowDetails.createdByUser : '';
    this.newEscrowForm.modifiedByUser = this.escrowDetails.modifiedByUser?this.escrowDetails.modifiedByUser : '';
    if(this.escrowDetails){
      this.newEscrowForm.description = this.escrowDescription;
      this.agencyFacade.updateEscrowDetails(this.newEscrowForm);
    }
    else{
      this.agencyFacade.saveEscrowDetails(this.newEscrowForm);
    }
  }
  saveOrUpdateNonEscrowDetails(form : FormGroup){
    this.newNonEscrowForm = Object.create({});
    if(form.controls['collectingAgencyName'].value !== this.nonEscrowDetails.nameCollecting){
      this.addToNonEscrowDescription(this.nonEscrowDetails.nameCollecting, form.controls['collectingAgencyName'].value, 'Collecting Agency Name')
    }
    if(form.controls['contactName'].value !== this.nonEscrowDetails.contactName){
      this.addToNonEscrowDescription(this.nonEscrowDetails.contactName, form.controls['contactName'].value, 'Contact Name')
    }
    if(form.controls['contactPhone'].value !== this.nonEscrowDetails.contactPhone){
      this.addToNonEscrowDescription(this.nonEscrowDetails.contactPhone, form.controls['contactPhone'].value, 'Contact Phone')
    }
    if(form.controls['contactFax'].value !== this.nonEscrowDetails.contactFax){
      this.addToNonEscrowDescription(this.nonEscrowDetails.contactFax, form.controls['contactFax'].value, 'Contact Fax')
    }
    if(form.controls['contactEmail'].value !== this.nonEscrowDetails.contactEmail){
      this.addToNonEscrowDescription(this.nonEscrowDetails.contactEmail, form.controls['contactEmail'].value, 'Contact Email')
    }
    if(form.controls['agencyWebsite'].value !== this.nonEscrowDetails.agencyWebsite){
      this.addToNonEscrowDescription(this.nonEscrowDetails.agencyWebsite, form.controls['agencyWebsite'].value, 'Agency Website')
    }
    if(form.controls['collectedByAgency'].value !== this.nonEscrowDetails.agencyCollectedBy){
      this.addToNonEscrowDescription(this.nonEscrowDetails.agencyCollectedBy, form.controls['collectedByAgency'].value, 'Collected By Agency')
    }
    if(form.controls['thirdPartyCollections'].value !== this.nonEscrowDetails.thirdPartyCollections){
      this.addToNonEscrowDescription(this.nonEscrowDetails.thirdPartyCollections, form.controls['thirdPartyCollections'].value, 'Third Party Collections')
    }
    if(form.controls['amtAvailableOnWebsite'].value !== this.nonEscrowDetails.amtAvailable){
      this.addToNonEscrowDescription(this.nonEscrowDetails.amtAvailable, form.controls['amtAvailableOnWebsite'].value, 'AMT Available On Website')
    }
    if(form.controls['mailAWayOnlyReq'].value !== this.nonEscrowDetails.mailAwayReq){
      this.addToNonEscrowDescription(this.nonEscrowDetails.mailAwayReq, form.controls['mailAWayOnlyReq'].value, 'Mail AWay Only Req')
    }
    if(form.controls['payToName'].value !== this.nonEscrowDetails.payName){
      this.addToNonEscrowDescription(this.nonEscrowDetails.payName, form.controls['payToName'].value, 'Pay To Name')
    }
    if(form.controls['payToAddress'].value !== this.nonEscrowDetails.payAddress){
      this.addToNonEscrowDescription(this.nonEscrowDetails.payAddress, form.controls['payToAddress'].value, 'Pay To Address')
    }
    if(form.controls['payToCity'].value !== this.nonEscrowDetails.payCity){
      this.addToNonEscrowDescription(this.nonEscrowDetails.payCity, form.controls['payToCity'].value, 'Pay To City')
    }
    if(form.controls['stateId'].value !== this.nonEscrowDetails.payStateId){
      this.addToNonEscrowDescription(this.nonEscrowDetails.payStateId, form.controls['stateId'].value, 'Pay State Id')
    }
    if(form.controls['zipId'].value !== this.nonEscrowDetails.payZip){
      this.addToNonEscrowDescription(this.nonEscrowDetails.payZip, form.controls['zipId'].value, 'Pay Zip Id')
    }
    if(form.controls['countyId'].value !== this.nonEscrowDetails.payCountyId){
      this.addToNonEscrowDescription(this.nonEscrowDetails.payCountyId, form.controls['countyId'].value, 'Pay County Id')
    }
    if(form.controls['methodOfPaymentRequired'].value !== this.nonEscrowDetails.paymentMethodId){
      this.addToNonEscrowDescription(this.nonEscrowDetails.paymentMethodId, form.controls['methodOfPaymentRequired'].value, 'Method Of Payment Required')
    }
    this.newNonEscrowForm.nameCollecting = this.nonEscrowForm.controls['collectingAgencyName'].value;
    this.newNonEscrowForm.contactName = this.nonEscrowForm.controls['contactName'].value;
    this.newNonEscrowForm.contactPhone = this.nonEscrowForm.controls['contactPhone'].value;
    this.newNonEscrowForm.contactFax = this.nonEscrowForm.controls['contactFax'].value;
    this.newNonEscrowForm.contactEmail = this.nonEscrowForm.controls['contactEmail'].value;
    this.newNonEscrowForm.agencyWebsite = this.nonEscrowForm.controls['agencyWebsite'].value;
    this.newNonEscrowForm.agencyCollectedBy = this.nonEscrowForm.controls['collectedByAgency'].value;
    this.newNonEscrowForm.thirdPartyCollections = this.nonEscrowForm.controls['thirdPartyCollections'].value;
    this.newNonEscrowForm.amtAvailable = this.nonEscrowForm.controls['amtAvailableOnWebsite'].value;
    this.newNonEscrowForm.mailAwayReq = this.nonEscrowForm.controls['mailAWayOnlyReq'].value;
    this.newNonEscrowForm.mailAwayFee = this.nonEscrowForm.controls['feeForMailAWay'].value;
    this.newNonEscrowForm.payName = this.nonEscrowForm.controls['payToName'].value;
    this.newNonEscrowForm.payAddress = this.nonEscrowForm.controls['payToAddress'].value;
    this.newNonEscrowForm.payCity = this.nonEscrowForm.controls['payToCity'].value;
    this.newNonEscrowForm.payStateId = this.nonEscrowForm.controls['stateId'].value;
    this.newNonEscrowForm.payZip = this.nonEscrowForm.controls['zipId'].value;
    this.newNonEscrowForm.payCountyId = this.nonEscrowForm.controls['countyId'].value;
    this.newNonEscrowForm.paymentMethodId = this.nonEscrowForm.controls['methodOfPaymentRequired'].value? this.nonEscrowForm.controls['methodOfPaymentRequired'].value : '';
    this.newNonEscrowForm.agencyMasterId = this.agencyMasterId;
    this.newNonEscrowForm.agencyNonEscrowId = this.nonEscrowDetails.agencyNonEscrowId?this.nonEscrowDetails.agencyNonEscrowId : '';
    this.newNonEscrowForm.internalComments = this.nonEscrowDetails.internalComments?this.nonEscrowDetails.internalComments : '';
    this.newNonEscrowForm.createdBy = this.nonEscrowDetails.createdBy?this.nonEscrowDetails.createdBy : '';
    this.newNonEscrowForm.modifiedBy = this.nonEscrowDetails.modifiedBy?this.nonEscrowDetails.modifiedBy : '';
    this.newNonEscrowForm.createdByUser = this.nonEscrowDetails.createdByUser?this.nonEscrowDetails.createdByUser : '';
    this.newNonEscrowForm.modifiedByUser = this.nonEscrowDetails.modifiedByUser?this.nonEscrowDetails.modifiedByUser : '';

    if(this.nonEscrowDetails){
      this.newNonEscrowForm.description = this.nonEscrowDescription;
      this.agencyFacade.updateNonEscrowDetails(this.newNonEscrowForm);
    }
    else{
      this.agencyFacade.saveNonEscrowDetails(this.newNonEscrowForm);
    }
  }

  isescrowFormRequired(name: string): boolean {
    return this.escrowForm.get(name)?.hasValidator(Validators.required) ?? false;
  }

  isnonEscrowFormRequired(name: string): boolean {
    return this.nonEscrowForm.get(name)?.hasValidator(Validators.required) ?? false;
  }

  addToEscrowDescription(oldValue : any, newValue : any, fieldname : string){
    this.escrowDescription += fieldname + ' is updated from '+ oldValue +' to '+newValue + '; ';
  }

  addToNonEscrowDescription(oldValue : any, newValue : any, fieldname : string){
    this.nonEscrowDescription += fieldname + ' is updated from '+ oldValue +' to '+newValue + '; ';
  }

  isRequiredEscrowField(name: string): boolean {
    return this.escrowForm.get(name)?.hasValidator(Validators.required) ?? false;
  }

  isRequiredNonEscrowField(name: string): boolean {
    return this.nonEscrowForm.get(name)?.hasValidator(Validators.required) ?? false;
  }
  
  stateSelectionChangeHandler($event: MatSelectChange, stateField : string){
    debugger;
    if(stateField === CountiesForStates.NON_ESCROW_STATES){
      this.isNonEscrowCountiesLoading = true;
    }
    this.agencyFacade.getCounties($event.value, stateField);
  }

}
