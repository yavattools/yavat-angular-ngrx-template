import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  options: Options[] = [
    { value: 'option1', viewValue: 'option1' },
    { value: 'option2', viewValue: 'option2' },
    { value: 'option3', viewValue: 'option3' }
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.agency_payment = this.fb.group({
      contactName: [''],
      contactPhone: [''],
      contactFax: [''],
      contactEmail:[''],
      agencyWebsite:[''],    
      copyFee:[''],
      feeForMailAWay:[''],
      noOfParcelsPerCheck:['']
    });
  }

 

}
