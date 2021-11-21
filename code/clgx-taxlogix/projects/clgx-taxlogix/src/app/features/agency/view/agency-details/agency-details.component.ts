import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import { Agency } from '@app/core/store/agency/agency.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';
import { AgenciesDetails } from '../../agency-view.data';

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
    if (this.agency && this.agency.agencyMasterId) {
      this.agencyDetails = this.fb.group({
        agencyNumber: [this.agency.agencyNumber, Validators.required],
        agencyName: [this.agency.agencyName, Validators.required],
        agencyWebsite: [this.agency.agencyWebsite, Validators.required],
        agencyLowerLevel: [this.agency.agencyLowerLevel, Validators.required],
        agencyCollecting: [this.agency.agencyCollecting, Validators.required],
        agencyActive: [this.agency.agencyActive, Validators.required],
        agencySuitsAddress: [
          this.agency.agencySuitsAddress,
          Validators.required
        ],
        agencyCity: [this.agency.agencyCity, Validators.required],
        stateId: [this.agency.stateId, Validators.required],
        zip: [this.agency.zip, Validators.required],
        countyId: [this.agency.countyId, Validators.required],
        contactName: [this.agency.contactName, Validators.required],
        contactEmail: [this.agency.contactEmail, Validators.required],
        contactPhone: [this.agency.contactPhone, Validators.required],
        contactFax: [this.agency.contactFax, Validators.required],
        parcelFormat: [this.agency.parcelFormat, Validators.required],
        assessorName: [this.agency.assessorName, Validators.required],
        assessorContactName: [
          this.agency.assessorContactName,
          Validators.required
        ],
        assessorPhoneNumber: [
          this.agency.assessorPhoneNumber,
          Validators.required
        ],
        mapCost: [this.agency.mapCost, Validators.required],
        websiteAccessCost: [this.agency.websiteAccessCost, Validators.required],
        assessorWebsite: [this.agency.assessorWebsite, Validators.required],
        assessorAddress: [this.agency.assessorAddress, Validators.required],
        assessorCity: [this.agency.assessorCity, Validators.required],
        assessorStateId: [this.agency.assessorStateId, Validators.required],
        assessorZip: [this.agency.assessorZip, Validators.required],
        billingRequestId: [this.agency.billingRequestId, Validators.required],
        mediaTypeId: [this.agency.mediaTypeId, Validators.required],
        paperType: [this.agency.paperType, Validators.required],
        excelType: [this.agency.excelType, Validators.required],
        mailType: [this.agency.mailType, Validators.required],
        emailId: [this.agency.emailId, Validators.required]
      });
    } else {
      this.agencyDetails = this.fb.group({
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
    this.newAgencyDetails.assessorContactName =
      form.controls['assessorContactName'].value;
    this.newAgencyDetails.assessorPhoneNumber =
      form.controls['assessorPhoneNumber'].value;
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
    if (this.agency.agencyMasterId) {
      this.agencyFacade.updateAgencyDetails(this.newAgencyDetails);
    } else {
      this.agencyFacade.saveAgencyDetails(this.newAgencyDetails);
    }
  }
}
