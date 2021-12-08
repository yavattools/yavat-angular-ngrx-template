import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { PaymentDetails, PaymentMethod, StateOptions } from '@app/core/store/agency/agency.model';
import { AuthStoreFacade } from '@app/core/store/auth/auth-store-facade';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

@Component({
  selector: 'clgx-agency-payment',
  templateUrl: './agency-payment.component.html',
  styleUrls: ['./agency-payment.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyPaymentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  paymentDetails$!: Observable<PaymentDetails>;
  paymentDetails : any;
  loginData : any
  agencyMasterId : string | undefined
  newPaymentDetails!: PaymentDetails;
 
  paymentCertified: boolean = false;
  paymentCheck: boolean = false;
  paymentWire: boolean = false;

  stateOptions$ : Observable<StateOptions[]>;
  stateOptions : Array<StateOptions> = new Array<StateOptions>();
  subscriptions: Array<Subscription> = new Array<Subscription>();
  
  public paymentFormGroup  = this.fb.group({
    payName :[''],     
    payAddress :[''],
    payCity : [''],
    stateId : [''],
    zip : [''],
    emailFileId : [''],
    numOfParcels : [''],
    orginalTB : [''],
    feeWithoutOrginalTB: [''],
    listedPayment : [''],
    emailWire : [''],
    overNight : [''],
    postmarkAccepted : [''],
    paymentRequiredId : [''],
  });


  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService,
      private fb: FormBuilder,
      public agencyStoreFacade : AgencyStoreFacade, 
      private authStoreFacade : AuthStoreFacade){
    this.paymentDetails$ = this.agencyStoreFacade.paymentDetails$;
    this.authStoreFacade.loginProfile$.subscribe(data=>{
      this.loginData = data;
    });
    this.agencyStoreFacade.selectedAgency$.subscribe(data=>{
      this.agencyMasterId = data.agencyMasterId;
    });
    if(this.agencyMasterId){
    this.agencyStoreFacade.getPayments({userId : this.loginData.processOrgModel.userId, agencyMasterId : this.agencyMasterId, agencypaymentmasterId : undefined});
    }

    this.stateOptions$ = this.agencyStoreFacade.stateOptions$;
    this.subscriptions.push(this.stateOptions$.subscribe((response)=>{
      this.stateOptions = response;
    }))
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
        this.paymentFormGroup.controls['payName'].setValue(paymentDetails.payName);
        this.paymentFormGroup.controls['payAddress'].setValue(paymentDetails.payAddress);
        this.paymentFormGroup.controls['payCity'].setValue(paymentDetails.payCity);
        this.paymentFormGroup.controls['stateId'].setValue(paymentDetails.stateId);
        this.paymentFormGroup.controls['zip'].setValue(paymentDetails.zip);
        this.paymentFormGroup.controls['emailFileId'].setValue(paymentDetails.emailFileTo);
        this.paymentFormGroup.controls['numOfParcels'].setValue(paymentDetails.numOfParcels);
        this.paymentFormGroup.controls['orginalTB'].setValue(paymentDetails.orginalTB);
        this.paymentFormGroup.controls['feeWithoutOrginalTB'].setValue(paymentDetails.feeWithoutOrginalTB);
        this.paymentFormGroup.controls['listedPayment'].setValue(paymentDetails.listedPayment);
        this.paymentFormGroup.controls['emailWire'].setValue(paymentDetails.emailWire);
        this.paymentFormGroup.controls['overNight'].setValue(paymentDetails.overNight);
        this.paymentFormGroup.controls['postmarkAccepted'].setValue(paymentDetails.postMarkAccepted);
        this.paymentFormGroup.controls['paymentRequiredId'].setValue(this.getPaymentMethod(paymentDetails.paymentRequiredId));
      }
    })
   
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  ispaymentFormGroupFieldRequired(name: string): boolean {
    return this.paymentFormGroup.get(name)?.hasValidator(Validators.required) ?? false;
  }

  save(form : FormGroup){
    this.newPaymentDetails = Object.create({});
    this.newPaymentDetails.payName = form.controls['payName'].value;
    this.newPaymentDetails.payAddress = form.controls['payAddress'].value;
    this.newPaymentDetails.payCity = form.controls['payCity'].value;
    this.newPaymentDetails.stateId = form.controls['stateId'].value;
    this.newPaymentDetails.zip = form.controls['zip'].value;
    this.newPaymentDetails.emailFileTo = form.controls['emailFileId'].value;
    this.newPaymentDetails.numOfParcels = form.controls['numOfParcels'].value;
    this.newPaymentDetails.orginalTB = form.controls['orginalTB'].value;
    this.newPaymentDetails.feeWithoutOrginalTB = form.controls['feeWithoutOrginalTB'].value;
    this.newPaymentDetails.listedPayment = form.controls['listedPayment'].value;
    this.newPaymentDetails.emailWire = form.controls['emailWire'].value;
    this.newPaymentDetails.overNight = form.controls['overNight'].value;
    this.newPaymentDetails.postMarkAccepted = form.controls['postmarkAccepted'].value;
    this.newPaymentDetails.paymentRequiredId = this.getPaymentMethodId();
    this.newPaymentDetails.agencyPaymentId = this.paymentDetails.agencyPaymentId?this.paymentDetails.agencyPaymentId : '';
    this.newPaymentDetails.agencyId = this.agencyMasterId;
    this.newPaymentDetails.countyId = this.paymentDetails.countyId?this.paymentDetails.countyId : '1';
    this.newPaymentDetails.internalNotes = this.paymentDetails.internalNotes?this.paymentDetails.internalNotes : '';
    this.newPaymentDetails.createdBy = this.paymentDetails.createdBy?this.paymentDetails.createdBy : '';
    this.newPaymentDetails.modifiedBy = this.paymentDetails.modifiedBy?this.paymentDetails.modifiedBy : '';
    this.newPaymentDetails.createdByUser = this.paymentDetails.createdByUser?this.paymentDetails.createdByUser : '';
    this.newPaymentDetails.modifiedByUser = this.paymentDetails.modifiedByUser?this.paymentDetails.modifiedByUser : '';

    if(this.paymentDetails){
      this.agencyStoreFacade.updatePayments(this.newPaymentDetails);
    }
    else{
      this.agencyStoreFacade.savePayments(this.newPaymentDetails);
    }
  }

  isAnyDataItemsAdded(){
    let result =  false;

    return result;
  }

  paymentMethodChangeHandler(method: string){
    if(method === PaymentMethod.CERTIFIED){
      this.paymentCertified = true;
      this.paymentCheck = false;
      this.paymentWire = false;
    }else if(method === PaymentMethod.CHECK){
      this.paymentCertified = false;
      this.paymentCheck = true;
      this.paymentWire = false;
    }else if(method === PaymentMethod.WIRE){
      this.paymentCertified = false;
      this.paymentCheck = false;
      this.paymentWire = true;
    }
  }

  getPaymentMethodId(){
    let result = '';
    if(this.paymentCertified){
      result = '1';
    }else if(this.paymentCheck){
      result = '2';
    }else if (this.paymentWire){
      result = '3';
    }
    return result;
  }

  getPaymentMethod(id : any){
    let result = '';
    if(id === "1"){
      result = PaymentMethod.CERTIFIED;
    }else if(id === "2"){
      result = PaymentMethod.CHECK;
    }else if (id === "3"){
      result = PaymentMethod.WIRE;
    }
    return result;
  }
}
