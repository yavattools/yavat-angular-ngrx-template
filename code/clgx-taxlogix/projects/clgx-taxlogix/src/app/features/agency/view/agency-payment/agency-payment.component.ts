import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { PaymentDetails } from '@app/core/store/agency/agency.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { AgencyFeature, agencies } from '../../agency-view.data';

@Component({
  selector: 'clgx-agency-payment',
  templateUrl: './agency-payment.component.html',
  styleUrls: ['./agency-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyPaymentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agencies: AgencyFeature[] = agencies;
  newPaymentDetails: PaymentDetails = new PaymentDetails;
  payNameFC :FormControl = new FormControl('',[Validators.required]);
  payAddressFC = new FormControl('',[Validators.required]);
  payCityFC = new FormControl('',[Validators.required]);
  stateIdFC = new FormControl('',[Validators.required]);
  zipFC = new FormControl('',[Validators.required]);
  emailFileIdFC = new FormControl('',[Validators.required]);
  numOfParcelsFC = new FormControl('',[Validators.required]);
  orginalTBFC = new FormControl('',[Validators.required]);
  feeWithoutOrginalTBFC = new FormControl('',[Validators.required]);
  listedPaymentFC = new FormControl('',[Validators.required]);
  emailWireFC = new FormControl('',[Validators.required]);
  overNightFC = new FormControl('',[Validators.required]);
  postmarkAcceptedFC = new FormControl('',[Validators.required]);
  paymentRequiredIdFC = new FormControl('',[Validators.required]);

  paymentDetails$!: Observable<PaymentDetails>;
  paymentDetails : any;

  paymentForm : FormGroup = new FormGroup({
    payName : this.payNameFC,     
    payAddress : this.payAddressFC,
    payCity : this.payCityFC,
    stateId : this.stateIdFC,
    zip : this.zipFC,
    emailFileId : this.emailFileIdFC,
    numOfParcels : this.numOfParcelsFC,
    orginalTB : this.orginalTBFC,
    feeWithoutOrginalTB: this.feeWithoutOrginalTBFC,
    listedPayment : this.listedPaymentFC,
    emailWire : this.emailWireFC,
    overNight : this.overNightFC,
    postmarkAccepted : this.postmarkAcceptedFC,
    paymentRequiredId : this.paymentRequiredIdFC,
  })

  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService,private agencyStoreFacade : AgencyStoreFacade){
    this.paymentDetails$ = this.agencyStoreFacade.paymentDetails$;
    this.agencyStoreFacade.getPayments({agencyMasterId : '1',userId : '1', processId :'1'});
  }

  ngOnInit() {
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    this.paymentDetails$.subscribe(paymentDetails=>{
      this.paymentDetails = paymentDetails
      if(paymentDetails){
        this.paymentForm.controls['payName'].setValue(paymentDetails.payName);
        this.paymentForm.controls['payAddress'].setValue(paymentDetails.payAddress);
        this.paymentForm.controls['payCity'].setValue(paymentDetails.payCity);
        this.paymentForm.controls['stateId'].setValue(paymentDetails.stateId);
        this.paymentForm.controls['zip'].setValue(paymentDetails.zip);
        this.paymentForm.controls['emailFileId'].setValue(paymentDetails.emailFileId);
        this.paymentForm.controls['numOfParcels'].setValue(paymentDetails.numOfParcels);
        this.paymentForm.controls['orginalTB'].setValue(paymentDetails.orginalTB);
        this.paymentForm.controls['feeWithoutOrginalTB'].setValue(paymentDetails.feeWithoutOrginalTB);
        this.paymentForm.controls['listedPayment'].setValue(paymentDetails.listedPayment);
        this.paymentForm.controls['emailWire'].setValue(paymentDetails.emailWire);
        this.paymentForm.controls['overNight'].setValue(paymentDetails.overNight);
        this.paymentForm.controls['postmarkAccepted'].setValue(paymentDetails.postmarkAccepted);
        this.paymentForm.controls['paymentRequiredId'].setValue(paymentDetails.paymentRequiredId);
      }
    })
   
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }


  save(form : FormGroup){
    this.newPaymentDetails = Object.create({});
    this.newPaymentDetails.payName = form.controls['payName'].value;
    this.newPaymentDetails.payAddress = form.controls['payAddress'].value;
    this.newPaymentDetails.payCity = form.controls['payCity'].value;
    this.newPaymentDetails.stateId = form.controls['stateId'].value;
    this.newPaymentDetails.zip = form.controls['zip'].value;
    this.newPaymentDetails.emailFileId = form.controls['emailFileId'].value;
    this.newPaymentDetails.numOfParcels = form.controls['numOfParcels'].value;
    this.newPaymentDetails.orginalTB = form.controls['orginalTB'].value;
    this.newPaymentDetails.feeWithoutOrginalTB = form.controls['feeWithoutOrginalTB'].value;
    this.newPaymentDetails.listedPayment = form.controls['listedPayment'].value;
    this.newPaymentDetails.emailWire = form.controls['emailWire'].value;
    this.newPaymentDetails.overNight = form.controls['overNight'].value;
    this.newPaymentDetails.postmarkAccepted = form.controls['postmarkAccepted'].value;
    this.newPaymentDetails.paymentRequiredId = form.controls['paymentRequiredId'].value;
    this.newPaymentDetails.agencyPaymentId = this.paymentDetails.agencyPaymentId
    this.newPaymentDetails.agencyMasterId = this.paymentDetails.agencyMasterId;
    this.newPaymentDetails.countyId = this.paymentDetails.countyId;
    this.newPaymentDetails.internalNotes = this.paymentDetails.internalNotes;
    this.newPaymentDetails.createdBy = this.paymentDetails.createdBy;
    this.newPaymentDetails.modifiedBy = this.paymentDetails.modifiedBy;
    this.newPaymentDetails.createdByUser = this.paymentDetails.createdByUser;
    this.newPaymentDetails.modifiedByUser = this.paymentDetails.modifiedByUser;

    if(this.paymentDetails){
      this.agencyStoreFacade.updatePayments(this.newPaymentDetails);
    }
    else{
      this.agencyStoreFacade.savePayments(this.newPaymentDetails);
    }
  }

}
