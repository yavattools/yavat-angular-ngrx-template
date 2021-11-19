import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
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
  isMobile: boolean = false;

  escrow : FormGroup = new FormGroup({})
  non_escrow : FormGroup = new FormGroup({})
  constructor( public deviceService:DeviceDetectorService, private fb : FormBuilder){

  }

  ngOnInit() {
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.escrow = this.fb.group({
      contactName : [''],
      contactPhone : [''],
      contactFax : [''],
      contactEmail : [''],
      agencyWebsite : [''],
      amtAvailableOnWebsite : [''],
      cost_to_pay_using_copy_of_tb : [''],
      listing_accepted_for_payment : [''],
      mail_a_way_only_req : [''],
      agency_expect_web_tb : [''],
      postmark_accepted : [''],
      copy_fee : [''],
      fee_for_mail_a_way : [''],
      no_of_parcels_per_check : ['']
    })
    this.non_escrow = this.fb.group({
      collectingAgencyName : [''],
      contactName : [''],
      contactPhone : [''],
      contactFax : [''],
      contactEmail : [''],
      agencyWebsite : [''],
      collectedByAgency : [''],
      thirdPartyCollections : [''],
      amtAvailableOnWebsite : [''],
      mail_a_way_only_req : [''],
      fee_for_mail_a_way : [''],
      payToName : [''],
      payToAddress : [''],
      payToCity : [''],
      stateId : [''],
      zipId : [''],
      methodOfPaymentRequired_certifiedCheck : [''],
      methodOfPaymentRequired_wire : ['']
    })
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  show(form : FormGroup){
    console.log(form.controls);
    
  }
}
