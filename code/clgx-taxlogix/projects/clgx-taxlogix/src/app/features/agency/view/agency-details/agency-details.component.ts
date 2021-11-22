import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Agency } from '@app/core/store/agency/agency.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';

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
  agency!: Agency;
  newAgencyDetails: any;
  agency$: Observable<Agency>;
  agencyDetails = this.fb.group({
    agencyNumber: ['', Validators.required],
    agencyName: ['', Validators.required],
    agencyWebsite: ['', Validators.required],
    agencyLowerLevel: ['', Validators.required],
    agencyCollecting: [false, Validators.required],
    agencyActive: [false, Validators.required],
    agencySuitsAddress: ['', Validators.required],
    agencyCity: ['', Validators.required],
    stateId: ['', Validators.required],
    zip: ['', Validators.required],
    countyId: ['', Validators.required],
    contactName: ['', Validators.required],
    contactEmail: ['', Validators.required],
    contactPhone: ['', Validators.required],
    contactFax: ['', Validators.required],
    parcelFormat: ['', Validators.required],
    assessorName: ['', Validators.required],
    assessorContactName: ['', Validators.required],
    assessorPhoneNumber: ['', Validators.required],
    mapCost: ['', Validators.required],
    websiteAccessCost: ['', Validators.required],
    assessorWebsite: ['', Validators.required],
    assessorAddress: ['', Validators.required],
    assessorCity: ['', Validators.required],
    assessorStateId: ['', Validators.required],
    assessorZip: ['', Validators.required],
    billingRequestId: ['', Validators.required],
    mediaTypeId: ['', Validators.required],
    paperType: [false, Validators.required],
    excelType: [false, Validators.required],
    mailType: [false, Validators.required],
    emailId: ['', Validators.required]
  });
  options: Options[] = [
    { value: 'option1', viewValue: 'option1' },
    { value: 'option2', viewValue: 'option2' },
    { value: 'option3', viewValue: 'option3' }
  ];

  isMobile: Boolean = false;
  constructor(
    public deviceService: DeviceDetectorService,
    private fb: FormBuilder,
    private agencyFacade: AgencyStoreFacade,
    public settingsFacadeService: SettingsStoreFacade
  ) {
    this.agency$ = this.agencyFacade.selectedAgency$;
  }

  ngOnInit() {
    this.settingsFacadeService.setHeaderShowTime('always');
    setTimeout(() => {
      this.settingsFacadeService.showHeader();
    }, 100);

    this.agency$.subscribe((agency) => {
      this.agency = agency;
      console.log(agency);
    });
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    if(this.agency && this.agency.agencyMasterId) {
        this.agencyDetails.controls['agencyNumber'].setValue(this.agency.agencyNumber);
        this.agencyDetails.controls['agencyName'].setValue(this.agency.agencyName); 
        this.agencyDetails.controls['agencyWebsite'].setValue(this.agency.agencyWebsite);
        this.agencyDetails.controls['agencyLowerLevel'].setValue(this.agency.agencyLowerLevel)
        this.agencyDetails.controls['agencyCollecting'].setValue(this.agency.agencyCollecting)
        this.agencyDetails.controls['agencyActive'].setValue(this.agency.agencyActive)
        this.agencyDetails.controls['agencySuitsAddress'].setValue(this.agency.agencySuitsAddress)
        this.agencyDetails.controls['agencyCity'].setValue(this.agency.agencyCity)
        this.agencyDetails.controls['stateId'].setValue(this.agency.stateId)
        this.agencyDetails.controls['zip'].setValue(this.agency.zip)
        this.agencyDetails.controls['countyId'].setValue(this.agency.countyId)
        this.agencyDetails.controls['contactName'].setValue(this.agency.contactName)
        this.agencyDetails.controls['contactEmail'].setValue(this.agency.contactEmail)
        this.agencyDetails.controls['contactPhone'].setValue(this.agency.contactPhone)
        this.agencyDetails.controls['contactFax'].setValue(this.agency.contactFax)
        this.agencyDetails.controls['parcelFormat'].setValue(this.agency.parcelFormat)
        this.agencyDetails.controls['assessorName'].setValue(this.agency.assessorName)
        this.agencyDetails.controls['assessorContactName'].setValue(this.agency.assessorContactName)
        this.agencyDetails.controls['assessorPhoneNumber'].setValue(this.assessorPhoneNumber)
        this.agencyDetails.controls['mapCost'].setValue(this.agency.mapCost)
        this.agencyDetails.controls['websiteAccessCost'].setValue(this.agency.websiteAccessCost)
        this.agencyDetails.controls['assessorWebsite'].setValue(this.agency.assessorWebsite)
        this.agencyDetails.controls['assessorAddress'].setValue(this.agency.assessorAddress)
        this.agencyDetails.controls['assessorCity'].setValue(this.agency.assessorCity)
        this.agencyDetails.controls['assessorStateId'].setValue(this.agency.assessorStateId)
        this.agencyDetails.controls['assessorZip'].setValue(this.agency.assessorZip)
        this.agencyDetails.controls['billingRequestId'].setValue(this.agency.billingRequestId)
        this.agencyDetails.controls['mediaTypeId'].setValue(this.agency.mediaTypeId)
        this.agencyDetails.controls['paperType'].setValue(this.agency.paperType)
        this.agencyDetails.controls['excelType'].setValue(this.agency.excelType)
        this.agencyDetails.controls['mailType'].setValue(this.agency.mailType)
        this.agencyDetails.controls['emailId'].setValue(this.agency.emailId)
    }
  }

  get agencyNumber() {
    return this.agencyDetails.controls['agencyNumber'];
  }
  get agencyName() {
    return this.agencyDetails.controls['agencyName'];
  }
  get agencyWebsite() {
    return this.agencyDetails.controls['agencyWebsite'];
  }
  get agencyLowerLevel() {
    return this.agencyDetails.controls['agencyLowerLevel'];
  }
  get agencyCollecting() {
    return this.agencyDetails.controls['agencyCollecting'];
  }
  get agencyActive() {
    return this.agencyDetails.controls['agencyActive'];
  }
  get agencySuitsAddress() {
    return this.agencyDetails.controls['agencySuitsAddress'];
  }
  get agencyCity() {
    return this.agencyDetails.controls['agencyCity'];
  }
  get stateId() {
    return this.agencyDetails.controls['stateId'];
  }
  get zip() {
    return this.agencyDetails.controls['zip'];
  }
  get countyId() {
    return this.agencyDetails.controls['countyId'];
  }
  get contactName() {
    return this.agencyDetails.controls['contactName'];
  }
  get contactEmail() {
    return this.agencyDetails.controls['contactEmail'];
  }
  get contactPhone() {
    return this.agencyDetails.controls['contactPhone'];
  }
  get contactFax() {
    return this.agencyDetails.controls['contactFax'];
  }
  get parcelFormat() {
    return this.agencyDetails.controls['parcelFormat'];
  }
  get assessorName() {
    return this.agencyDetails.controls['assessorName'];
  }
  get assessorContactName() {
    return this.agencyDetails.controls['assessorContactName'];
  }
  get assessorPhoneNumber() {
    return this.agencyDetails.controls['assessorPhoneNumber'];
  }
  get mapCost() {
    return this.agencyDetails.controls['mapCost'];
  }
  get websiteAccessCost() {
    return this.agencyDetails.controls['websiteAccessCost'];
  }
  get assessorWebsite() {
    return this.agencyDetails.controls['assessorWebsite'];
  }
  get assessorAddress() {
    return this.agencyDetails.controls['assessorAddress'];
  }
  get assessorCity() {
    return this.agencyDetails.controls['assessorCity'];
  }
  get assessorStateId() {
    return this.agencyDetails.controls['assessorStateId'];
  }
  get assessorZip() {
    return this.agencyDetails.controls['assessorZip'];
  }
  get billingRequestId() {
    return this.agencyDetails.controls['billingRequestId'];
  }
  get mediaTypeId() {
    return this.agencyDetails.controls['mediaTypeId'];
  }
  get paperType() {
    return this.agencyDetails.controls['paperType'];
  }
  get excelType() {
    return this.agencyDetails.controls['excelType'];
  }
  get mailType() {
    return this.agencyDetails.controls['mailType'];
  }
  get emailId() {
    return this.agencyDetails.controls['emailId'];
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }
  save(form: FormGroup) {
    this.newAgencyDetails = Object.create({});
    this.newAgencyDetails.agencyNumber = form.controls['agencyNumber'].value;
    this.newAgencyDetails.agencyName = form.controls['agencyName'].value;
    this.newAgencyDetails.agencyWebsite = form.controls['agencyWebsite'].value;
    this.newAgencyDetails.agencyLowerLevel =
      form.controls['agencyLowerLevel'].value;
    this.newAgencyDetails.agencyCollecting =
      form.controls['agencyCollecting'].value;
    this.newAgencyDetails.agencyActive = form.controls['agencyActive'].value;
    this.newAgencyDetails.agencySuitsAddress =
      form.controls['agencySuitsAddress'].value;
    this.newAgencyDetails.agencyCity = form.controls['agencyCity'].value;
    this.newAgencyDetails.stateId = form.controls['stateId'].value;
    this.newAgencyDetails.zip = form.controls['zip'].value;
    this.newAgencyDetails.countyId = form.controls['countyId'].value;
    this.newAgencyDetails.contactName = form.controls['contactName'].value;
    this.newAgencyDetails.contactEmail = form.controls['contactEmail'].value;
    this.newAgencyDetails.contactPhone = form.controls['contactPhone'].value;
    this.newAgencyDetails.contactFax = form.controls['contactFax'].value;
    this.newAgencyDetails.parcelFormat = form.controls['parcelFormat'].value;
    this.newAgencyDetails.assessorName = form.controls['assessorName'].value;
    this.newAgencyDetails.assessorContactName = form.controls['assessorContactName'].value;
    this.newAgencyDetails.assessorPhoneNumber = form.controls['assessorPhoneNumber'].value;
    this.newAgencyDetails.mapCost = form.controls['mapCost'].value;
    this.newAgencyDetails.websiteAccessCost =
      form.controls['websiteAccessCost'].value;
    this.newAgencyDetails.assessorWebsite =
      form.controls['assessorWebsite'].value;
    this.newAgencyDetails.assessorAddress =
      form.controls['assessorAddress'].value;
    this.newAgencyDetails.assessorCity = form.controls['assessorCity'].value;
    this.newAgencyDetails.assessorStateId =
      form.controls['assessorStateId'].value;
    this.newAgencyDetails.assessorZip = form.controls['assessorZip'].value;
    this.newAgencyDetails.billingRequestId =
      form.controls['billingRequestId'].value;
    this.newAgencyDetails.mediaTypeId = form.controls['mediaTypeId'].value;
    this.newAgencyDetails.paperType = form.controls['paperType'].value;
    this.newAgencyDetails.excelType = form.controls['excelType'].value;
    this.newAgencyDetails.mailType = form.controls['mailType'].value;
    this.newAgencyDetails.emailId = form.controls['emailId'].value;
    this.newAgencyDetails.agencyMasterId = this.agency.agencyMasterId;
    this.newAgencyDetails.agencyAddress = this.agency.agencyAddress;
    this.newAgencyDetails.agencyState = this.agency.agencyState;
    this.newAgencyDetails.agencyPhonenumber = this.agency.agencyPhonenumber;
    this.newAgencyDetails.assessorCountyId = this.agency.assessorCountyId;
    this.newAgencyDetails.internalNotes = this.agency.internalNotes;
    this.newAgencyDetails.createdBy = this.agency.createdBy;
    this.newAgencyDetails.modifiedBy = this.agency.modifiedBy;
    this.newAgencyDetails.createdByUser = this.agency.createdByUser;
    this.newAgencyDetails.modifiedByUser = this.agency.modifiedByUser;
    if (this.agency.agencyMasterId) {
      this.agencyFacade.updateAgencyDetails(this.newAgencyDetails);
    } else {
      this.agencyFacade.saveAgencyDetails(this.newAgencyDetails);
    }
  }
}
