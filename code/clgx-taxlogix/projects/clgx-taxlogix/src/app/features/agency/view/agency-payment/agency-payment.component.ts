import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { CountiesForStates, County, PaymentDetails, PaymentMethod, StateOptions } from '@app/core/store/agency/agency.model';
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
  description : string = '';
  isPaymentCountiesLoading : boolean = false;
  paymentCounties$ : Observable<County[]>;
  paymentCounties : Array<County> = new Array<County>();
  stateOptions$ : Observable<StateOptions[]>;
  stateOptions : Array<StateOptions> = new Array<StateOptions>();
  subscriptions: Array<Subscription> = new Array<Subscription>();
  
  public paymentFormGroup  = this.fb.group({
    payName :[''],     
    payAddress :[''],
    payCity : [''],
    stateId : ['', Validators.required],
    zip : ['', Validators.required],
    countyId : ['', Validators.required],
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
      private authStoreFacade : AuthStoreFacade, private cd: ChangeDetectorRef){
    this.paymentDetails$ = this.agencyStoreFacade.paymentDetails$;
    this.paymentCounties$ = this.agencyStoreFacade.paymentCounties$;
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
      this.stateOptions = [...response];
    }));
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
        if(paymentDetails.stateId){
          this.agencyStoreFacade.getCounties(paymentDetails.stateId, 'paymentStates');
        }
        else{
          this.paymentCounties = []
        }
        this.paymentFormGroup.controls['payName'].setValue(paymentDetails.payName);
        this.paymentFormGroup.controls['payAddress'].setValue(paymentDetails.payAddress);
        this.paymentFormGroup.controls['payCity'].setValue(paymentDetails.payCity);
        this.paymentFormGroup.controls['stateId'].setValue(paymentDetails.stateId);
        this.paymentFormGroup.controls['zip'].setValue(paymentDetails.zip);
        this.paymentFormGroup.controls['countyId'].setValue(paymentDetails.countyId);
        this.paymentFormGroup.controls['emailFileId'].setValue(paymentDetails.emailFileTo);
        this.paymentFormGroup.controls['numOfParcels'].setValue(paymentDetails.numOfParcels);
        this.paymentFormGroup.controls['orginalTB'].setValue(paymentDetails.orginalTB?.toString());
        this.paymentFormGroup.controls['feeWithoutOrginalTB'].setValue(paymentDetails.feeWithoutOrginalTB);
        this.paymentFormGroup.controls['listedPayment'].setValue(paymentDetails.listedPayment?.toString());
        this.paymentFormGroup.controls['emailWire'].setValue(paymentDetails.emailWire?.toString());
        this.paymentFormGroup.controls['overNight'].setValue(paymentDetails.overNight?.toString());
        this.paymentFormGroup.controls['postmarkAccepted'].setValue(paymentDetails.postMarkAccepted?.toString());
        this.paymentFormGroup.controls['paymentRequiredId'].setValue(this.getPaymentMethod(paymentDetails.paymentRequiredId)?.toString());

        this.setPayemtnRequiredCheckMark(+paymentDetails.paymentRequiredId);

      }
    })
    this.subscriptions.push(this.paymentCounties$.subscribe(cties => {
      this.paymentCounties = [...cties];
      debugger;
      if(this.paymentCounties.length && this.isPaymentCountiesLoading){
        setTimeout(() => {
          this.isPaymentCountiesLoading = false;
          this.cd.detectChanges();
        }, 90);
      }
    }));
  }

  get stateId() {
    return this.paymentFormGroup.controls['stateId'];
  }
  get zip() {
    return this.paymentFormGroup.controls['zip'];
  }
  get countyId() {
    return this.paymentFormGroup.controls['countyId'];
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
    this.newPaymentDetails.countyId = form.controls['countyId'].value;
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

  setPayemtnRequiredCheckMark(id: number) {
    if(id === 1){
      this.paymentCertified = true;
      this.paymentCheck = false;
      this.paymentWire = false;
    }else if(id === 2){
      this.paymentCertified = false;
      this.paymentCheck = true;
      this.paymentWire = false;
    }else if(id === 3){
      this.paymentCertified = false;
      this.paymentCheck = false;
      this.paymentWire = true;
    }
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

  stateSelectionChangeHandler($event: MatSelectChange, stateField : string){
    debugger;
    if(stateField === CountiesForStates.PAYMENT_STATES){
      this.isPaymentCountiesLoading = true;
    }
    this.agencyStoreFacade.getCounties($event.value, stateField);
  }

  addToDescription(oldValue : any, newValue : any, fieldname : string){
    this.description += fieldname + ' is updated from '+ oldValue +' to '+newValue + '; ';
  }

  isRequired(name: string): boolean {
    return this.paymentFormGroup.get(name)?.hasValidator(Validators.required) ?? false;
  }
}
