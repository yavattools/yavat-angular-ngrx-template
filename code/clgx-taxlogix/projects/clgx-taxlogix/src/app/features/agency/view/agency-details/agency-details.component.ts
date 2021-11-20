import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Agency } from '@app/core/store/agency/agency.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'clgx-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyDetailsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agency : any;
  agency$ : Observable<Agency>;
  agencyDetails: FormGroup = new FormGroup({});
  options: Options[] = [
    { value: 'option1', viewValue: 'option1' },
    { value: 'option2', viewValue: 'option2' },
    { value: 'option3', viewValue: 'option3' }
  ];

  isMobile: Boolean = false;
  constructor(
    public deviceService: DeviceDetectorService,
    private fb: FormBuilder,
    private agencyFacade : AgencyStoreFacade
  ) {
    this.agency$ = this.agencyFacade.selectedAgency$;
  }

  ngOnInit() {
    this.agency$.subscribe(agency =>{
      this.agency = agency;
    })
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.agencyDetails = this.fb.group({
      agencyNumber: [''],
      agencyName: [''],
      agencyWebsite: [''],
      agencyLowerLevel: [''],
      agencyCollecting: [''],
      agencyActive: [''],
      agencySuitsAddress: [''],
      agencyCity: [''],
      stateId: [''],
      zip: [''],
      countyId: [''],
      contactName: [''],
      contactEmail: [''],
      contactPhone: [''],
      contactFax: [''],
      parcelFormat: [''],
      assessorName: [''],
      assessorContactName: [''],
      assessorPhoneNumber: [''],
      mapCost: [''],
      websiteAccessCost: [''],
      assessorWebsite: [''],
      assessorAddress: [''],
      assessorCity: [''],
      assessorStateId: [''],
      assessorZip: [''],
      billingRequestId: [''],
      mediaTypeId: [''],
      paperType: [''],
      excelType: [''],
      mailType: [''],
      emailId: ['']
    });
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  show(form: FormGroup) {
    console.log(form.controls);
  }
}
