import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgencyDataService } from '@app/core/store/agency/agency-data-api.service';
import { EscrowDetails } from '@app/core/store/agency/agency.model';

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'clgx-agency-payment-escrow',
  templateUrl: './agency-payment-escrow.component.html',
  styleUrls: ['./agency-payment-escrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyPaymentEscrowComponent implements OnInit {
  agency_payment: FormGroup = new FormGroup({});
  escrowDetails: EscrowDetails;
  options: Options[] = [
    { value: 'option1', viewValue: 'option1' },
    { value: 'option2', viewValue: 'option2' },
    { value: 'option3', viewValue: 'option3' }
  ];

  contactName = new FormControl('', Validators.pattern(/^[a-zA-Z0-9]+$/));
  contactPhone = new FormControl('',Validators.pattern(/^[6-9]\d{9}$/));
  contactFax = new FormControl('',Validators.pattern(/^[6-9]\d{9}$/));
  contactEmail = new FormControl('',Validators.email);
  agencyWebsite = new FormControl('');    
  copyFee =  new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  feeForMailAWay = new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));
  noOfParcelsPerCheck = new FormControl('',Validators.pattern(/^[a-zA-Z0-9]+$/));

  constructor(private fb: FormBuilder, private apiDataService: AgencyDataService) { 
    this.escrowDetails = new EscrowDetails();
  }

  ngOnInit(): void {
    this.agency_payment = this.fb.group({
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      contactFax: this.contactFax,
      contactEmail: this.contactEmail,
      agencyWebsite: this.agencyWebsite,
      copyFee: this.copyFee,
      feeForMailAWay: this.feeForMailAWay,
      noOfParcelsPerCheck:this.noOfParcelsPerCheck,
      
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
    this.escrowDetails = JSON.parse(JSON.stringify(this.agency_payment.value));
    this.apiDataService.addEscrow(this.escrowDetails).subscribe(res => {
        console.log("Escrow Details Saved Successfully");
    }, err => {
        console.log(err.error);
    })
  }
}
