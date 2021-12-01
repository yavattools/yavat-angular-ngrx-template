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
  agencyDetailsGroup = this.fb.group({
    agencyNumber: ['', Validators.required],
    agencyName: ['', Validators.required],
    agencyWebsite: [''],
    agencyLowerLevel: [''],
    agencyCollecting: [false],
    agencyActive: [false, Validators.required],
    agencySuitsAddress: [''],
    agencyCity: ['', Validators.required],
    stateId: ['', Validators.required],
    zip: ['', Validators.required],
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
    paperType: [false],
    excelType: [false],
    mailType: [false],
    emailId: ['']
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
        this.agencyDetailsGroup.controls['agencyNumber'].setValue(this.agency.agencyNumber);
        this.agencyDetailsGroup.controls['agencyName'].setValue(this.agency.agencyName); 
        this.agencyDetailsGroup.controls['agencyWebsite'].setValue(this.agency.agencyWebsite);
        this.agencyDetailsGroup.controls['agencyLowerLevel'].setValue(this.agency.agencyLowerLevel)
        this.agencyDetailsGroup.controls['agencyCollecting'].setValue(this.agency.agencyCollecting)
        this.agencyDetailsGroup.controls['agencyActive'].setValue(this.agency.agencyActive)
        this.agencyDetailsGroup.controls['agencySuitsAddress'].setValue(this.agency.agencySuitsAddress)
        this.agencyDetailsGroup.controls['agencyCity'].setValue(this.agency.agencyCity)
        this.agencyDetailsGroup.controls['stateId'].setValue(this.agency.stateId)
        this.agencyDetailsGroup.controls['zip'].setValue(this.agency.zip)
        this.agencyDetailsGroup.controls['countyId'].setValue(this.agency.countyId)
        this.agencyDetailsGroup.controls['contactName'].setValue(this.agency.contactName)
        this.agencyDetailsGroup.controls['contactEmail'].setValue(this.agency.contactEmail)
        this.agencyDetailsGroup.controls['contactPhone'].setValue(this.agency.contactPhone)
        this.agencyDetailsGroup.controls['contactFax'].setValue(this.agency.contactFax)
        this.agencyDetailsGroup.controls['parcelFormat'].setValue(this.agency.parcelFormat)
        this.agencyDetailsGroup.controls['assessorName'].setValue(this.agency.assessorName)
        this.agencyDetailsGroup.controls['assessorContactName'].setValue(this.agency.assessorContactName)
        this.agencyDetailsGroup.controls['assessorPhoneNumber'].setValue(this.agency.assessorPhoneNumber)
        this.agencyDetailsGroup.controls['mapCost'].setValue(this.agency.mapCost)
        this.agencyDetailsGroup.controls['websiteAccessCost'].setValue(this.agency.websiteAccessCost)
        this.agencyDetailsGroup.controls['assessorWebsite'].setValue(this.agency.assessorWebsite)
        this.agencyDetailsGroup.controls['assessorAddress'].setValue(this.agency.assessorAddress)
        this.agencyDetailsGroup.controls['assessorCity'].setValue(this.agency.assessorCity)
        this.agencyDetailsGroup.controls['assessorStateId'].setValue(this.agency.assessorStateId)
        this.agencyDetailsGroup.controls['assessorZip'].setValue(this.agency.assessorZip)
        this.agencyDetailsGroup.controls['billingRequestId'].setValue(this.agency.billingRequestId)
        this.agencyDetailsGroup.controls['mediaTypeId'].setValue(this.agency.mediaTypeId)
        this.agencyDetailsGroup.controls['paperType'].setValue(this.agency.paperType)
        this.agencyDetailsGroup.controls['excelType'].setValue(this.agency.excelType)
        this.agencyDetailsGroup.controls['mailType'].setValue(this.agency.mailType)
        this.agencyDetailsGroup.controls['emailId'].setValue(this.agency.emailId)
    }
  }

  get agencyNumber() {
    return this.agencyDetailsGroup.controls['agencyNumber'];
  }
  get agencyName() {
    return this.agencyDetailsGroup.controls['agencyName'];
  }
  get agencyWebsite() {
    return this.agencyDetailsGroup.controls['agencyWebsite'];
  }
  get agencyLowerLevel() {
    return this.agencyDetailsGroup.controls['agencyLowerLevel'];
  }
  get agencyCollecting() {
    return this.agencyDetailsGroup.controls['agencyCollecting'];
  }
  get agencyActive() {
    return this.agencyDetailsGroup.controls['agencyActive'];
  }
  get agencySuitsAddress() {
    return this.agencyDetailsGroup.controls['agencySuitsAddress'];
  }
  get agencyCity() {
    return this.agencyDetailsGroup.controls['agencyCity'];
  }
  get stateId() {
    return this.agencyDetailsGroup.controls['stateId'];
  }
  get zip() {
    return this.agencyDetailsGroup.controls['zip'];
  }
  get countyId() {
    return this.agencyDetailsGroup.controls['countyId'];
  }
  get contactName() {
    return this.agencyDetailsGroup.controls['contactName'];
  }
  get contactEmail() {
    return this.agencyDetailsGroup.controls['contactEmail'];
  }
  get contactPhone() {
    return this.agencyDetailsGroup.controls['contactPhone'];
  }
  get contactFax() {
    return this.agencyDetailsGroup.controls['contactFax'];
  }
  get parcelFormat() {
    return this.agencyDetailsGroup.controls['parcelFormat'];
  }
  get assessorName() {
    return this.agencyDetailsGroup.controls['assessorName'];
  }
  get assessorContactName() {
    return this.agencyDetailsGroup.controls['assessorContactName'];
  }
  get assessorPhoneNumber() {
    return this.agencyDetailsGroup.controls['assessorPhoneNumber'];
  }
  get mapCost() {
    return this.agencyDetailsGroup.controls['mapCost'];
  }
  get websiteAccessCost() {
    return this.agencyDetailsGroup.controls['websiteAccessCost'];
  }
  get assessorWebsite() {
    return this.agencyDetailsGroup.controls['assessorWebsite'];
  }
  get assessorAddress() {
    return this.agencyDetailsGroup.controls['assessorAddress'];
  }
  get assessorCity() {
    return this.agencyDetailsGroup.controls['assessorCity'];
  }
  get assessorStateId() {
    return this.agencyDetailsGroup.controls['assessorStateId'];
  }
  get assessorZip() {
    return this.agencyDetailsGroup.controls['assessorZip'];
  }
  get billingRequestId() {
    return this.agencyDetailsGroup.controls['billingRequestId'];
  }
  get mediaTypeId() {
    return this.agencyDetailsGroup.controls['mediaTypeId'];
  }
  get paperType() {
    return this.agencyDetailsGroup.controls['paperType'];
  }
  get excelType() {
    return this.agencyDetailsGroup.controls['excelType'];
  }
  get mailType() {
    return this.agencyDetailsGroup.controls['mailType'];
  }
  get emailId() {
    return this.agencyDetailsGroup.controls['emailId'];
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }

  save(form: FormGroup) {
    debugger;
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
    this.newAgencyDetails.agencyMasterId = this.agency.agencyMasterId?this.agency.agencyMasterId: "";
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

  isRequired(name: string): boolean {
    return this.agencyDetailsGroup.get(name)?.hasValidator(Validators.required) ?? false;
  }
}
