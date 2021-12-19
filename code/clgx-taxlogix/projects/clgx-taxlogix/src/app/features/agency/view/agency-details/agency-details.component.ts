import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  AfterContentInit
} from '@angular/core';
import { AgencyStoreFacade } from '@app/core/store/agency/agency-store.facade';
import {
  Agency,
  County,
  DropDownOptions,
  StateOptions
} from '@app/core/store/agency/agency.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { SettingsStoreFacade } from '@app/core/store/settings/settings-store.facade';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { CountiesForStates } from '../../../../core/store/agency/agency.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface Options {
  value: string;
  display: string;
}
@Component({
  selector: 'clgx-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyDetailsComponent implements OnInit, OnDestroy, AfterContentInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  agency!: Agency;
  newAgencyDetails: any;
  agency$: Observable<Agency>;
  defFreqSelected: string = '';
  nonFreqSelected: string = '';
  description: string = '';
  agencyDetailsGroup = this.fb.group({
    agencyNumber: ['', Validators.required],
    agencyName: ['', Validators.required],
    agencyWebsite: [''],
    agencyLowerLevel: [''],
    agencyCollecting: ['0'],
    agencyActive: ['0'],
    agencySuitsAddress: ['', Validators.required],
    agencyCity: ['', Validators.required],
    stateId: ['', Validators.required],
    payZip: ['', Validators.required],
    countyId: [''],
    contactName: [''],
    contactEmail: ['', Validators.email],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]
    ],
    contactFax: [''],
    parcelFormat: [''],
    assessorName: [''],
    assessorContactName: [''],
    assessorPhoneNumber: [
      '',
      [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]
    ],
    mapCost: [''],
    websiteAccessCost: [''],
    assessorWebsite: [''],
    assessorAddress: [''],
    assessorCity: [''],
    assessorStateId: [''],
    assessorZip: [''],
    assessorCountyId: [''],
    billingRequestId: [''],
    mediaTypeId: [''],
    paperType: ['0'],
    excelType: ['0'],
    mailType: ['0'],
    assessorEmailId: ['', Validators.email]
  });

  billingRequest$: Observable<DropDownOptions[]>;
  mediaType$: Observable<DropDownOptions[]>;

  billingRequest: Array<DropDownOptions> = new Array<DropDownOptions>();
  mediaType: Array<DropDownOptions> = new Array<DropDownOptions>();

  lowLEvelOptions: Options[] = [
    { value: '1', display: '1' },
    { value: '2', display: '2' },
    { value: '3', display: '3' },
    { value: '4', display: '4' }
  ];

  stateOptions$: Observable<StateOptions[]>;
  stateOptions: Array<StateOptions> = new Array<StateOptions>();

  agencyCounties$: Observable<County[]>;
  agencyCounties: Array<County> = new Array<County>();
  assessorCounties$: Observable<County[]>;
  assessorCounties: Array<County> = new Array<County>();
  isAgencyCountiesLoading: boolean = false;
  isAssessorCountiesLoading: boolean = false;
  isMobile: Boolean = false;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    public deviceService: DeviceDetectorService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public agencyFacade: AgencyStoreFacade,
    public settingsFacadeService: SettingsStoreFacade
  ) {
    this.agency$ = this.agencyFacade.selectedAgency$;
    this.stateOptions$ = this.agencyFacade.stateOptions$;
    this.agencyCounties$ = this.agencyFacade.agencyCounties$;
    this.assessorCounties$ = this.agencyFacade.assessorCounties$;
    this.billingRequest$ = this.agencyFacade.billingRequest$;
    this.mediaType$ = this.agencyFacade.mediaType$;
    this.subscriptions.push(
      this.agencyCounties$.subscribe((cties) => {
        this.agencyCounties = [...cties];
        debugger;
        if (this.agencyCounties.length && this.isAgencyCountiesLoading) {
          setTimeout(() => {
            this.isAgencyCountiesLoading = false;
            this.cd.detectChanges();
          }, 90);
        }
      })
    );
    this.subscriptions.push(
      this.assessorCounties$.subscribe((cties) => {
        this.assessorCounties = [...cties];
        debugger;
        if (this.assessorCounties.length && this.isAssessorCountiesLoading) {
          setTimeout(() => {
            this.isAssessorCountiesLoading = false;
            this.cd.detectChanges();
          }, 90);
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngAfterContentInit(): void {
    this.agencyDetailsGroup.get('stateId')?.valueChanges.subscribe(s => {
      debugger;
      if(s){
        this.agencyFacade.getCounties(s, 'agencyStates');
      }
    })
    setTimeout(() => {
      this.agencyDetailsGroup.get('assessorStateId')?.valueChanges.subscribe(s => {
        debugger;
        if(s){
          this.agencyFacade.getCounties(s, 'assessorStates');
        }
      })
    }, 100);
   
  }

  ngOnInit() {
    this.settingsFacadeService.setHeaderShowTime('always');
    setTimeout(() => {
      this.settingsFacadeService.showHeader();
    }, 100);
    
    this.agencyDetailsGroup.get('payZip')?.valueChanges.subscribe(s => {
      // Get Details ..
    })
    this.agencyDetailsGroup.get('assessorPhoneNumber')?.valueChanges.subscribe(s => {
      // this.keyPress()
    })

    

    this.isAgencyCountiesLoading = false;
    this.isAssessorCountiesLoading = false;
    this.subscriptions.push(
      this.agency$.subscribe((agency) => {
        this.agency = agency;
        if (this.agency && this.agency.agencyMasterId) {
          debugger;
          if (
            this.agency.stateId &&
            this.agencyCounties &&
            !this.agencyCounties.length
          ) {
            debugger;
            this.agencyFacade.getCounties(this.agency.stateId, 'agencyStates');
          } else {
            this.agencyCounties = [];
          }
          if (
            this.agency.assessorStateId &&
            this.assessorCounties &&
            !this.assessorCounties.length
          ) {
            this.agencyFacade.getAcessorStateCounties(
              this.agency.assessorStateId,
              'assessorStates'
            );
          } else {
            this.assessorCounties = [];
          }
          this.defFreqSelected = this.agency.frequencyDefault
            ? this.agency.frequencyDefault
            : '';
          this.nonFreqSelected = this.agency.frequencyNonDefault
            ? this.agency.frequencyNonDefault
            : '';
          this.agencyDetailsGroup.controls['agencyNumber'].setValue(
            this.agency.agencyNumber
          );
          this.agencyDetailsGroup.controls['agencyName'].setValue(
            this.agency.agencyName
          );
          this.agencyDetailsGroup.controls['agencyWebsite'].setValue(
            this.agency.agencyWebsite
          );
          this.agencyDetailsGroup.controls['agencyLowerLevel'].setValue(
            this.agency.lowLevelAgencyId
          );
          this.agencyDetailsGroup.controls['agencyCollecting'].setValue(
            this.agency.collectingAgency?.toString()
          );
          this.agencyDetailsGroup.controls['agencyActive'].setValue(
            this.agency.agencyActive?.toString()
          );
          this.agencyDetailsGroup.controls['agencySuitsAddress'].setValue(
            this.agency.agencySitusAddress
          );
          this.agencyDetailsGroup.controls['agencyCity'].setValue(
            this.agency.agencyCity
          );
          this.agencyDetailsGroup.controls['stateId'].setValue(
            this.agency.stateId
          );
          this.agencyDetailsGroup.controls['payZip'].setValue(
            this.agency.payZip
          );
          this.agencyDetailsGroup.controls['countyId'].setValue(
            this.agency.countyId
          );
          this.agencyDetailsGroup.controls['contactName'].setValue(
            this.agency.contactName
          );
          this.agencyDetailsGroup.controls['contactEmail'].setValue(
            this.agency.contactEmail
          );
          let ph = this.agency.phoneNumber
            ? this.agency.phoneNumber.split('-').join('')
            : '';
          this.agencyDetailsGroup.controls['phoneNumber'].setValue(ph);
          this.agencyDetailsGroup.controls['contactFax'].setValue(
            this.agency.faxNumber
          );
          this.agencyDetailsGroup.controls['parcelFormat'].setValue(
            this.agency.parcelFormat
          );
          this.agencyDetailsGroup.controls['assessorName'].setValue(
            this.agency.assessorName
          );
          this.agencyDetailsGroup.controls['assessorContactName'].setValue(
            this.agency.assessorContactName
          );
          let aph = this.agency.assessorPhoneNum
            ? this.agency.assessorPhoneNum.split('-').join('')
            : '';
          this.agencyDetailsGroup.controls['assessorPhoneNumber'].setValue(aph);
          this.agencyDetailsGroup.controls['mapCost'].setValue(
            this.agency.mapCost
          );
          this.agencyDetailsGroup.controls['websiteAccessCost'].setValue(
            this.agency.websiteAccessCost
          );
          this.agencyDetailsGroup.controls['assessorWebsite'].setValue(
            this.agency.assessorWebsite
          );
          this.agencyDetailsGroup.controls['assessorAddress'].setValue(
            this.agency.assessorAddress
          );
          this.agencyDetailsGroup.controls['assessorCity'].setValue(
            this.agency.assessorCity
          );
          this.agencyDetailsGroup.controls['assessorStateId'].setValue(
            this.agency.assessorStateId
          );
          this.agencyDetailsGroup.controls['assessorZip'].setValue(
            this.agency.assessorZip
          );
          this.agencyDetailsGroup.controls['assessorCountyId'].setValue(
            this.agency.assessorCountyId
          );
          this.agencyDetailsGroup.controls['billingRequestId'].setValue(
            this.agency.billingRequestId
          );
          this.agencyDetailsGroup.controls['mediaTypeId'].setValue(
            this.agency.mediaTypeId
          );
          this.agencyDetailsGroup.controls['paperType'].setValue(
            this.agency.paperType?.toString()
          );
          this.agencyDetailsGroup.controls['excelType'].setValue(
            this.agency.excelType?.toString()
          );
          this.agencyDetailsGroup.controls['mailType'].setValue(
            this.agency.mailType?.toString()
          );
          this.agencyDetailsGroup.controls['assessorEmailId'].setValue(
            this.agency.assessorEmailId
          );
        }
        console.log(agency);
      })
    );
    this.subscriptions.push(
      this.stateOptions$.subscribe((response) => {
        this.stateOptions = [...response];
      })
    );
    this.subscriptions.push(
      this.billingRequest$.subscribe((response) => {
        this.billingRequest = [...response];
      })
    );
    this.subscriptions.push(
      this.mediaType$.subscribe((response) => {
        this.mediaType = [...response];
      })
    );
    debugger;
    if (this.deviceService.isMobile()) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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
  get payZip() {
    return this.agencyDetailsGroup.controls['payZip'];
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
  get phoneNumber() {
    return this.agencyDetailsGroup.controls['phoneNumber'];
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
  get assessorCountyId() {
    return this.agencyDetailsGroup.controls['assessorCountyId'];
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
  get assessorEmailId() {
    return this.agencyDetailsGroup.controls['assessorEmailId'];
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }

  save($event: MouseEvent, form: FormGroup) {
    debugger;
    this.newAgencyDetails = Object.create({});
    if (form.controls['agencyNumber'].value !== this.agency.agencyNumber) {
      this.addToDescription(
        this.agency.agencyNumber,
        form.controls['agencyNumber'].value,
        'Agency Number'
      );
    }
    if (form.controls['agencyName'].value !== this.agency.agencyName) {
      this.addToDescription(
        this.agency.agencyName,
        form.controls['agencyName'].value,
        'Agency Name'
      );
    }
    if (form.controls['agencyWebsite'].value !== this.agency.agencyWebsite) {
      this.addToDescription(
        this.agency.agencyWebsite,
        form.controls['agencyWebsite'].value,
        'Agency Website'
      );
    }
    if (
      form.controls['agencyLowerLevel'].value !== this.agency.lowLevelAgencyId
    ) {
      this.addToDescription(
        this.agency.lowLevelAgencyId,
        form.controls['agencyLowerLevel'].value,
        'Agency Lower Level'
      );
    }
    if (
      form.controls['agencyCollecting'].value !== this.agency.collectingAgency
    ) {
      this.addToDescription(
        this.agency.collectingAgency,
        form.controls['agencyCollecting'].value,
        'Agency Collecting'
      );
    }
    if (form.controls['agencyActive'].value !== this.agency.agencyActive) {
      this.addToDescription(
        this.agency.agencyActive,
        form.controls['agencyActive'].value,
        'Agency Active'
      );
    }
    if (
      form.controls['agencySuitsAddress'].value !==
      this.agency.agencySitusAddress
    ) {
      this.addToDescription(
        this.agency.agencySitusAddress,
        form.controls['agencySuitsAddress'].value,
        'Agency Situs Address'
      );
    }
    if (form.controls['agencyCity'].value !== this.agency.agencyCity) {
      this.addToDescription(
        this.agency.agencyCity,
        form.controls['agencyCity'].value,
        'Agency City'
      );
    }
    if (form.controls['stateId'].value !== this.agency.stateId) {
      this.addToDescription(
        this.agency.stateId,
        form.controls['stateId'].value,
        'Agency State Id'
      );
    }
    if (form.controls['payZip'].value !== this.agency.payZip) {
      this.addToDescription(
        this.agency.payZip,
        form.controls['payZip'].value,
        'Agency Zip'
      );
    }
    if (form.controls['countyId'].value !== this.agency.countyId) {
      this.addToDescription(
        this.agency.countyId,
        form.controls['countyId'].value,
        'Agency County Id'
      );
    }
    if (form.controls['contactName'].value !== this.agency.contactName) {
      this.addToDescription(
        this.agency.contactName,
        form.controls['contactName'].value,
        'Agency Contact Name'
      );
    }
    if (form.controls['contactEmail'].value !== this.agency.contactEmail) {
      this.addToDescription(
        this.agency.contactEmail,
        form.controls['contactEmail'].value,
        'Agency Contact Email'
      );
    }
    if (form.controls['phoneNumber'].value !== this.agency.phoneNumber) {
      this.addToDescription(
        this.agency.phoneNumber,
        form.controls['phoneNumber'].value,
        'Agency PhoneNumber'
      );
    }
    if (form.controls['contactFax'].value !== this.agency.faxNumber) {
      this.addToDescription(
        this.agency.faxNumber,
        form.controls['contactFax'].value,
        'Agency Fax Number'
      );
    }
    if (form.controls['parcelFormat'].value !== this.agency.parcelFormat) {
      this.addToDescription(
        this.agency.parcelFormat,
        form.controls['parcelFormat'].value,
        'Parsel Format'
      );
    }
    if (form.controls['assessorName'].value !== this.agency.assessorName) {
      this.addToDescription(
        this.agency.assessorName,
        form.controls['assessorName'].value,
        'Assessor Name'
      );
    }
    if (
      form.controls['assessorContactName'].value !==
      this.agency.assessorContactName
    ) {
      this.addToDescription(
        this.agency.assessorContactName,
        form.controls['assessorContactName'].value,
        'Assessor Contact Name'
      );
    }
    if (
      form.controls['assessorPhoneNumber'].value !==
      this.agency.assessorPhoneNum
    ) {
      this.addToDescription(
        this.agency.assessorPhoneNum,
        form.controls['assessorPhoneNumber'].value,
        'Assessor PhoneNumber'
      );
    }
    if (form.controls['mapCost'].value !== this.agency.mapCost) {
      this.addToDescription(
        this.agency.mapCost,
        form.controls['mapCost'].value,
        'Map Cost'
      );
    }
    if (
      form.controls['websiteAccessCost'].value !== this.agency.websiteAccessCost
    ) {
      this.addToDescription(
        this.agency.websiteAccessCost,
        form.controls['websiteAccessCost'].value,
        'Website Access Cost'
      );
    }
    if (
      form.controls['assessorWebsite'].value !== this.agency.assessorWebsite
    ) {
      this.addToDescription(
        this.agency.assessorWebsite,
        form.controls['assessorWebsite'].value,
        'Assessor Website'
      );
    }
    if (
      form.controls['assessorAddress'].value !== this.agency.assessorAddress
    ) {
      this.addToDescription(
        this.agency.assessorAddress,
        form.controls['assessorAddress'].value,
        'Assessor Address'
      );
    }
    if (form.controls['assessorCity'].value !== this.agency.assessorCity) {
      this.addToDescription(
        this.agency.assessorCity,
        form.controls['assessorCity'].value,
        'Assessor City'
      );
    }
    if (
      form.controls['assessorStateId'].value !== this.agency.assessorStateId
    ) {
      this.addToDescription(
        this.agency.assessorStateId,
        form.controls['assessorStateId'].value,
        'Assessor State Id'
      );
    }
    if (form.controls['assessorZip'].value !== this.agency.assessorZip) {
      this.addToDescription(
        this.agency.assessorZip,
        form.controls['assessorZip'].value,
        'Assessor Zip'
      );
    }
    if (
      form.controls['assessorCountyId'].value !== this.agency.assessorCountyId
    ) {
      this.addToDescription(
        this.agency.assessorCountyId,
        form.controls['assessorCountyId'].value,
        'Assessor County Id'
      );
    }
    if (
      form.controls['billingRequestId'].value !== this.agency.billingRequestId
    ) {
      this.addToDescription(
        this.agency.billingRequestId,
        form.controls['billingRequestId'].value,
        'Billing Request Id'
      );
    }
    if (form.controls['mediaTypeId'].value !== this.agency.mediaTypeId) {
      this.addToDescription(
        this.agency.mediaTypeId,
        form.controls['mediaTypeId'].value,
        'Media Type Id'
      );
    }
    if (form.controls['paperType'].value !== this.agency.paperType) {
      this.addToDescription(
        this.agency.paperType,
        form.controls['paperType'].value,
        'Paper Type'
      );
    }
    if (form.controls['excelType'].value !== this.agency.excelType) {
      this.addToDescription(
        this.agency.excelType,
        form.controls['excelType'].value,
        'Excel Type'
      );
    }
    if (form.controls['mailType'].value !== this.agency.mailType) {
      this.addToDescription(
        this.agency.mailType,
        form.controls['mailType'].value,
        'Mail Type'
      );
    }
    if (
      form.controls['assessorEmailId'].value !== this.agency.assessorEmailId
    ) {
      this.addToDescription(
        this.agency.assessorEmailId,
        form.controls['assessorEmailId'].value,
        'Assessor Email Id'
      );
    }
    if (this.defFreqSelected !== this.agency.frequencyDefault) {
      this.addToDescription(
        this.agency.frequencyDefault,
        this.defFreqSelected,
        'Default Frequency'
      );
    }
    if (this.nonFreqSelected !== this.agency.frequencyNonDefault) {
      this.addToDescription(
        this.agency.frequencyNonDefault,
        this.nonFreqSelected,
        'Non Frequency'
      );
    }
    this.newAgencyDetails.agencyNumber = form.controls['agencyNumber'].value;
    this.newAgencyDetails.agencyName = form.controls['agencyName'].value;
    this.newAgencyDetails.agencyWebsite = form.controls['agencyWebsite'].value;
    this.newAgencyDetails.lowLevelAgencyId =
      form.controls['agencyLowerLevel'].value;
    this.newAgencyDetails.collectingAgency =
      form.controls['agencyCollecting'].value;
    this.newAgencyDetails.agencyActive = form.controls['agencyActive'].value;
    this.newAgencyDetails.agencySitusAddress =
      form.controls['agencySuitsAddress'].value;
    this.newAgencyDetails.agencyCity = form.controls['agencyCity'].value;
    this.newAgencyDetails.stateId = form.controls['stateId'].value;
    this.newAgencyDetails.payZip = form.controls['payZip'].value;
    this.newAgencyDetails.countyId = form.controls['countyId'].value;
    this.newAgencyDetails.contactName = form.controls['contactName'].value;
    this.newAgencyDetails.contactEmail = form.controls['contactEmail'].value;
    this.newAgencyDetails.phoneNumber = form.controls['phoneNumber'].value;
    this.newAgencyDetails.faxNumber = form.controls['contactFax'].value;
    this.newAgencyDetails.parcelFormat = form.controls['parcelFormat'].value;
    this.newAgencyDetails.assessorName = form.controls['assessorName'].value;
    this.newAgencyDetails.assessorContactName =
      form.controls['assessorContactName'].value;
    this.newAgencyDetails.assessorPhoneNum =
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
    this.newAgencyDetails.assessorCountyId =
      form.controls['assessorCountyId'].value;
    this.newAgencyDetails.billingRequestId =
      form.controls['billingRequestId'].value;
    this.newAgencyDetails.mediaTypeId = form.controls['mediaTypeId'].value;
    this.newAgencyDetails.paperType = form.controls['paperType'].value;
    this.newAgencyDetails.excelType = form.controls['excelType'].value;
    this.newAgencyDetails.mailType = form.controls['mailType'].value;
    this.newAgencyDetails.assessorEmailId =
      form.controls['assessorEmailId'].value;
    this.newAgencyDetails.frequencyDefault = this.defFreqSelected;
    this.newAgencyDetails.frequencyNonDefault = this.nonFreqSelected;
    this.newAgencyDetails.agencyMasterId = this.agency.agencyMasterId
      ? this.agency.agencyMasterId
      : '';
    this.newAgencyDetails.internalComments = this.agency.internalComments
      ? this.agency.internalComments
      : '';
    this.newAgencyDetails.createdBy = this.agency.createdBy
      ? this.agency.createdBy
      : '';
    this.newAgencyDetails.modifiedBy = this.agency.modifiedBy
      ? this.agency.modifiedBy
      : '';
    this.newAgencyDetails.createdByUser = this.agency.createdByUser
      ? this.agency.createdByUser
      : '';
    this.newAgencyDetails.modifiedByUser = this.agency.modifiedByUser
      ? this.agency.modifiedByUser
      : '';
    if (this.agency.agencyMasterId) {
      this.newAgencyDetails.description = this.description;
      this.agencyFacade.updateAgencyDetails(this.newAgencyDetails);
    } else {
      this.agencyFacade.saveAgencyDetails(this.newAgencyDetails);
    }
  }

  isRequired(name: string): boolean {
    return (
      this.agencyDetailsGroup.get(name)?.hasValidator(Validators.required) ??
      false
    );
  }

  defaultFreqSelectedHandler($event: string) {
    debugger;
    this.defFreqSelected = $event;
  }
  nonFreqSelectedHandler($event: string) {
    debugger;
    this.nonFreqSelected = $event;
  }

  stateSelectionChangeHandler($event: MatSelectChange, stateField: string) {
    debugger;
    if (stateField === CountiesForStates.AGENCY_STATES) {
      this.isAgencyCountiesLoading = true;
    } else {
      this.isAssessorCountiesLoading = true;
    }
    this.agencyFacade.getCounties($event.value, stateField);
  }

  addToDescription(oldValue: any, newValue: any, fieldname: string) {
    this.description +=
      fieldname + ' is updated from ' + oldValue + ' to ' + newValue + '; ';
  }
}
