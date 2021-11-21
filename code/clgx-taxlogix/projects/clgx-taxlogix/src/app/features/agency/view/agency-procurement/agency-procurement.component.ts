import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { EscrowDetails, NonEscrowDetails } from '@app/core/store/agency/agency.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { AgencyFeature, agencies } from '../../agency-view.data';

@Component({
  selector: 'clgx-agency-procument',
  templateUrl: './agency-procurement.component.html',
  styleUrls: ['./agency-procurement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyProcumentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;
  isMobile: Boolean = false;
  escrowDetails$ : Observable<EscrowDetails> = new Observable<EscrowDetails>();
  escrowDetails : EscrowDetails = new EscrowDetails();
  nonEscrowDetails$ : Observable<NonEscrowDetails> = new Observable<NonEscrowDetails>();
  nonEscrowDetails : NonEscrowDetails = new NonEscrowDetails();
  escrowForm : FormGroup = new FormGroup({})
  nonEscrowForm : FormGroup = new FormGroup({})
  constructor( public deviceService:DeviceDetectorService, private fb : FormBuilder , private agencyFacade : AgencyStoreFacade){
    this.escrowDetails$ = this.agencyFacade.escrowDetails$;
    this.nonEscrowDetails$ = this.agencyFacade.nonEscrowDetails$;
    this.agencyFacade.getEscrowDetails({agencyMasterId : '1' , userId : '1' , processId : '1'});
    this.agencyFacade.getNonEscrowDetails({agencyMasterId : '1' , userId : '1' , processId : '1'});
  }

  ngOnInit() {
    this.escrowDetails$.subscribe(escrowDetails => {
      this.escrowDetails = escrowDetails;
    });
    this.nonEscrowDetails$.subscribe(nonEscrowDetails => {
      this.nonEscrowDetails = nonEscrowDetails;
    });
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.escrowForm = this.fb.group({
      contactName : [''],
      contactPhone : [''],
      contactFax : [''],
      contactEmail : [''],
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
    })
    this.nonEscrowForm = this.fb.group({
      collectingAgencyName : [''],
      contactName : [''],
      contactPhone : [''],
      contactFax : [''],
      contactEmail : [''],
      agencyWebsite : [''],
      collectedByAgency : [''],
      thirdPartyCollections : [''],
      amtAvailableOnWebsite : [''],
      mailAWayOnlyReq : [''],
      feeForMailAWay : [''],
      payToName : [''],
      payToAddress : [''],
      payToCity : [''],
      stateId : [''],
      zipId : [''],
      methodOfPaymentRequiredCertifiedCheck : [''],
      methodOfPaymentRequiredWire : ['']
    })
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  show(form : FormGroup){
    console.log(form.controls);

  }
}
