import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Agency, EscrowDetails, NonEscrowDetails } from '@app/core/store/agency/agency.model';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
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
  selectedTabIndex = 0;
  loginData : any
  agencyMasterId : string | undefined

  escrowForm = this.fb.group({
    contactName : ['',Validators.required],
    contactPhone : ['',Validators.required],
    contactFax : ['',Validators.required],
    contactEmail : ['',Validators.required],
    agencyWebsite : ['',Validators.required],
    amtAvailableOnWebsite : ['',Validators.required],
    costToPayUsingCopyOfTb : ['',Validators.required],
    listingAcceptedForPayment : ['',Validators.required],
    mailAWayOnlyReq : ['',Validators.required],
    agencyExpectWebTb : ['',Validators.required],
    postmarkAccepted : ['',Validators.required],
    copyFee : ['',Validators.required],
    feeForMailAWay : ['',Validators.required],
    noOfParcelsPerCheck : ['',Validators.required]
  });
  nonEscrowForm = this.fb.group({
    collectingAgencyName : ['',Validators.required],
    contactName : ['',Validators.required],
    contactPhone : ['',Validators.required],
    contactFax : ['',Validators.required],
    contactEmail : ['',Validators.required],
    agencyWebsite : ['',Validators.required],
    collectedByAgency : ['',Validators.required],
    thirdPartyCollections : ['',Validators.required],
    amtAvailableOnWebsite : ['',Validators.required],
    mailAWayOnlyReq : ['',Validators.required],
    feeForMailAWay : ['',Validators.required],
    payToName : ['',Validators.required],
    payToAddress : ['',Validators.required],
    payToCity : ['',Validators.required],
    stateId : ['',Validators.required],
    zipId : ['',Validators.required],
    methodOfPaymentRequired : ['']
  });
  // selectedAgency$ : Observable<Agency>;
  // selectedAgency! : Agency;
  constructor( public deviceService:DeviceDetectorService, private fb : FormBuilder , private agencyFacade : AgencyStoreFacade,
    private authStoreFacade : AuthStoreFacade){
    this.escrowDetails$ = this.agencyFacade.escrowDetails$;
    this.nonEscrowDetails$ = this.agencyFacade.nonEscrowDetails$;
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
        this.escrowForm.controls['amtAvailableOnWebsite'].setValue(escrowDetails.amtAvailable);
        this.escrowForm.controls['costToPayUsingCopyOfTb'].setValue(escrowDetails.costToPay);
        this.escrowForm.controls['listingAcceptedForPayment'].setValue(escrowDetails.isListingAccepted);
        this.escrowForm.controls['mailAWayOnlyReq'].setValue(escrowDetails.mailawayRegistered);
        this.escrowForm.controls['agencyExpectWebTb'].setValue(escrowDetails.isAgencyWebExpect);
        this.escrowForm.controls['postmarkAccepted'].setValue(escrowDetails.postMarkAccepted);
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
        this.nonEscrowForm.controls['collectedByAgency'].setValue(nonEscrowDetails.agencyCollectedBy);
        this.nonEscrowForm.controls['thirdPartyCollections'].setValue(nonEscrowDetails.thirdPartyCollections);
        this.nonEscrowForm.controls['amtAvailableOnWebsite'].setValue(nonEscrowDetails.amtAvailable);
        this.nonEscrowForm.controls['mailAWayOnlyReq'].setValue(nonEscrowDetails.mailAwayReq);
        this.nonEscrowForm.controls['feeForMailAWay'].setValue(nonEscrowDetails.mailAwayFee);
        this.nonEscrowForm.controls['payToName'].setValue(nonEscrowDetails.payName);
        this.nonEscrowForm.controls['payToAddress'].setValue(nonEscrowDetails.payAddress);
        this.nonEscrowForm.controls['payToCity'].setValue(nonEscrowDetails.payCity);
        this.nonEscrowForm.controls['stateId'].setValue(nonEscrowDetails.payStateId);
        this.nonEscrowForm.controls['zipId'].setValue(nonEscrowDetails.payZip);
        this.nonEscrowForm.controls['methodOfPaymentRequired'].setValue(nonEscrowDetails.paymentMethodId);
    }
    });
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
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
  get methodOfPaymentRequired(){
    return this.nonEscrowForm.get('methodOfPaymentRequired');
  }
  // get methodOfPaymentRequiredWire(){
  //   return this.nonEscrowForm.get('methodOfPaymentRequiredWire');
  // }

  ngAfterViewInit(){
    this.selectedTabIndex = 0;
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  saveOrUpdateEscrowDetails(form : FormGroup){
    this.newEscrowForm = Object.create({});
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
    this.newEscrowForm.agencyMasterId = this.escrowDetails.agencyMasterId?this.escrowDetails.agencyMasterId : '';
    this.newEscrowForm.agencyEscrowId = this.escrowDetails.agencyEscrowId?this.escrowDetails.agencyEscrowId : '';
    this.newEscrowForm.comments = this.escrowDetails.comments?this.escrowDetails.comments : '';
    this.newEscrowForm.createdBy = this.escrowDetails.createdBy?this.escrowDetails.createdBy : '';
    this.newEscrowForm.modifiedBy = this.escrowDetails.modifiedBy?this.escrowDetails.modifiedBy : '';
    this.newEscrowForm.createdByUser = this.escrowDetails.createdByUser?this.escrowDetails.createdByUser : '';
    this.newEscrowForm.modifiedByUser = this.escrowDetails.modifiedByUser?this.escrowDetails.modifiedByUser : '';
    if(this.escrowDetails){
      this.agencyFacade.updateEscrowDetails(this.newEscrowForm);
    }
    else{
      this.agencyFacade.saveEscrowDetails(this.newEscrowForm);
    }
  }
  saveOrUpdateNonEscrowDetails(form : FormGroup){
    this.newNonEscrowForm = Object.create({});
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
    this.newNonEscrowForm.paymentMethodId = this.nonEscrowForm.controls['methodOfPaymentRequired'].value;
    this.newNonEscrowForm.agencyMasterId = this.nonEscrowDetails.agencyMasterId?this.nonEscrowDetails.agencyMasterId : '';
    this.newNonEscrowForm.agencyNonEscrowId = this.nonEscrowDetails.agencyNonEscrowId?this.nonEscrowDetails.agencyNonEscrowId : '';
    this.newNonEscrowForm.internalComments = this.nonEscrowDetails.internalComments?this.nonEscrowDetails.internalComments : '';
    this.newNonEscrowForm.createdBy = this.nonEscrowDetails.createdBy?this.nonEscrowDetails.createdBy : '';
    this.newNonEscrowForm.modifiedBy = this.nonEscrowDetails.modifiedBy?this.nonEscrowDetails.modifiedBy : '';
    this.newNonEscrowForm.createdByUser = this.nonEscrowDetails.createdByUser?this.nonEscrowDetails.createdByUser : '';
    this.newNonEscrowForm.modifiedByUser = this.nonEscrowDetails.modifiedByUser?this.nonEscrowDetails.modifiedByUser : '';
    this.newNonEscrowForm.payCountyId = this.nonEscrowDetails.payCountyId?this.nonEscrowDetails.payCountyId : '';
    this.newEscrowForm.isDeleted = this.nonEscrowDetails.isDeleted?this.nonEscrowDetails.isDeleted : '';

    if(this.nonEscrowDetails){
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

}
