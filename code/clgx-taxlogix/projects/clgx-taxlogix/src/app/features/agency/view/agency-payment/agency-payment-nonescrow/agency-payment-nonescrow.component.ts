import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgencyDataService } from '@app/core/store/agency/agency-data-api.service';
import { EscrowNonEscrowDetails, NonEscrowDetails } from '@app/core/store/agency/agency.model';

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'clgx-agency-payment-nonescrow',
  templateUrl: './agency-payment-nonescrow.component.html',
  styleUrls: ['./agency-payment-nonescrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyPaymentNonescrowComponent implements OnInit {
  methodOfPayment: FormGroup;
  agency_payment: FormGroup = new FormGroup({});
  options: Options[] = [
    { value: 'option1', viewValue: 'option1' },
    { value: 'option2', viewValue: 'option2' },
    { value: 'option3', viewValue: 'option3' }
  ];

  nonEscrowDetails: NonEscrowDetails;
  collectingAgencyName= new FormControl('', Validators.pattern(/^[a-zA-Z0-9]+$/));
  contactName = new FormControl('', Validators.pattern(/^[a-zA-Z0-9]+$/));
  contactPhone = new FormControl('',Validators.pattern(/^[6-9]\d{9}$/));
  contactFax = new FormControl('',Validators.pattern(/^[6-9]\d{9}$/));
  contactEmail = new FormControl('',Validators.email);
  agencyWebsite = new FormControl('');    
  copyFee =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  feeForMailAWay = new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  noOfParcelsPerCheck = new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  payToName =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  payToAddress =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  payToCity =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  stateId =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  zipCode =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  constructor(private fb: FormBuilder, private apiDataService: AgencyDataService) { 
    this.nonEscrowDetails = new NonEscrowDetails();
    this.methodOfPayment = fb.group({
      check: false,
      wire: false
    });
  }

  ngOnInit(): void {
    this.agency_payment = this.fb.group({
      collectingAgencyName: this.collectingAgencyName,
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      contactFax: this.contactFax,
      contactEmail: this.contactEmail,
      agencyWebsite: this.agencyWebsite,
      copyFee: this.copyFee,
      feeForMailAWay: this.feeForMailAWay,
      noOfParcelsPerCheck:this.noOfParcelsPerCheck,
      payToName: this.payToName,
      payToAddress: this.payToAddress,
      payToCity: this.payToCity,
      stateId: this.stateId,
      zipCode: this.zipCode
    });
  }

  getErrorMessage(fieldName:any) :any {
    if (fieldName.hasError('required')) {
      return 'You must enter a value';
    } else if(fieldName.hasError('email')) {
      return 'Not a valid email';
    }
    if(fieldName.invalid) {
      return 'Invalid Type';
    }
  }

  saveEscrowDetails() {
    this.nonEscrowDetails = JSON.parse(JSON.stringify(this.agency_payment.value));
    this.apiDataService.addNonEscrow(this.nonEscrowDetails).subscribe(res => {
        console.log("Non Escrow Details Saved Successfully");
    }, err => {
        console.log(err.error);
    })
  }

}
