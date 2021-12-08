import { AppState } from '../../core.module';

export class Agency {
  agencyMasterId: string | undefined;
  agencyName: string | undefined;
  agencyCity: string | undefined;
  agencyState: string | undefined;
  agencyNumber!: string;
  agencyWebsite: string | undefined;
  agencyActive: string | undefined;
  stateId: string | undefined;
  countyId: string | undefined;
  zip: string | undefined;
  contactName: string | undefined;
  contactEmail: string | undefined;
  contactPhone: string | undefined;
  contactFax: string | undefined;
  parcelFormat: string | undefined;
  assessorName: string | undefined;
  assessorContactName: string | undefined;
  mapCost: string | undefined;
  websiteAccessCost: string | undefined;
  assessorWebsite: string | undefined;
  assessorAddress: string | undefined;
  assessorCity: string | undefined;
  assessorStateId: string | undefined;
  assessorCountyId: string | undefined;
  assessorZip: string | undefined;
  billingRequestId: string | undefined;
  mediaTypeId: string | undefined;
  paperType: string | undefined;
  mailType: string | undefined;
  emailId: string | undefined;
  internalComments: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;
  phoneNumber:string | undefined;
  faxNumber:string | undefined;
  payZip:string | undefined;
  lowLevelAgencyId:string | undefined;
  collectingAgency:string | undefined;
  agencySitusAddress:string | undefined;
  assessorPhoneNum:string | undefined;
  excelType:string | undefined;
  assessorEmailId:string | undefined;
  frequencyDefault : string | undefined;
  frequencyNonDefault : string | undefined;
  description : string | undefined;

  constructor(){}
}

export interface GetActiveAgenciesRequest {
  userId: string;
  processId: string;
  agencyMasterId : string | undefined;
}

export class CollectionDates {
  agencyCollectionDatesId?: string | undefined;
  agencyMasterId?: string | undefined;
  collectionFrequency?: string;
  collectionYear!: string;
  collectionInstallment!: string;
  collectionBase: string;
  collectionDiscount: string;
  collectionPenalty: string;
  collectionLastRelease: string;
  collectionBillRequest : string;
  isDeleted : any;
  createdBy?: string | undefined;
  modifiedBy?: string | undefined;
  createdByUser?: string | undefined;
  modifiedByUser?: string | undefined;
  description : string | undefined;
  constructor() {
    this.collectionBase = '';
    this.collectionPenalty = '';
    this.collectionBillRequest = '';
    this.collectionLastRelease = '';
    this.collectionDiscount = '';
  }
}

export interface GetCollectionDatesRequest {
  agencyMasterId: string | undefined;
  userId: string | undefined;
  agencyCollectionDatesId: string | undefined;
}

export class EscrowDetails {
  agencyMasterId: string | undefined;
  agencyEscrowId: string | undefined;
  contactName: string | undefined;
  contactPhone: string | undefined;
  contactFax: string | undefined;
  contactEmail: string | undefined;
  agencyWebsite: string | undefined;
  amtAvailable: string | undefined;
  costToPay: string | undefined;
  isListingAccepted: string | undefined;
  mailawayRegistered: string | undefined;
  isAgencyWebExpect: string | undefined;
  postMarkAccepted: string | undefined;
  copyFee: string | undefined;
  mailAwayFee: string | undefined;
  numOfParcels: string | undefined;
  comments: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;
  description : string | undefined;

  constructor() {}
}

export class NonEscrowDetails {
  agencyMasterId: string | undefined;
  agencyNonEscrowId: string | undefined;
  nameCollecting: string | undefined;
  contactName: string | undefined;
  contactPhone: string | undefined;
  contactFax: string | undefined;
  contactEmail: string | undefined;
  agencyWebsite: string | undefined;
  agencyCollectedBy: string | undefined;
  thirdPartyCollections: string | undefined;
  amtAvailable: string | undefined;
  mailAwayReq: string | undefined;
  mailAwayFee: string | undefined;
  payName: string | undefined;
  payAddress: string | undefined;
  payCity: string | undefined;
  payStateId: string | undefined;
  payCountyId: string | undefined;
  payZip: string | undefined;
  paymentMethodId: string | undefined;
  internalComments: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;
  isDeleted : string | undefined;
  description : string | undefined;
  constructor() {}
}

export class EscrowNonEscrowDetails {
  escrow: EscrowDetails;
  nonEscrow: NonEscrowDetails;

  constructor() {
    this.escrow = new EscrowDetails();
    this.nonEscrow = new NonEscrowDetails();
  }
}

export interface GetEscrowRequest {
  agencyMasterId: string | undefined;
  userId: string | undefined;
  escrowId: string | undefined;
}

export interface GetNonEscrowDetailsRequest{
  agencyMasterId: string | undefined;
  userId: string | undefined;
  nonEscrowId: string | undefined;
}

export class PaymentDetails {
  agencyPaymentId: string | undefined;
  agencyMasterId: string | undefined;
  agencyId: string | undefined;
  payName: string | undefined;
  payAddress: string | undefined;
  payCity: string | undefined;
  stateId: string | undefined;
  countyId: string | undefined;
  zip: string | undefined;
  emailFileTo: string | undefined;
  numOfParcels: string | undefined;
  orginalTB: string | undefined;
  feeWithoutOrginalTB: string | undefined;
  listedPayment: string | undefined;
  emailWire: string | undefined;
  overNight: string | undefined;
  postMarkAccepted: string | undefined;
  paymentRequiredId: string | undefined;
  internalNotes: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;
  description : string | undefined;

  constructor() {}
}

export interface GetPaymentDetailsRequest {
  agencyMasterId: string | undefined;
  userId: string | undefined;
  agencypaymentmasterId: string | undefined;
}

export interface StateOptions {
  stateId : number | undefined,
  stateName : string | undefined,
  stateCode : string | undefined
}


export interface County {
  countyId : number | undefined,
  countyName : string | undefined,
  countyCode : string | undefined
}

export interface DropDownOptions{
  dropDownId : string | undefined,
  dropDownValue : string | undefined
}

export enum FrequencyType{
  DEFAULT_ANNUAL = 'defaultAnnual',
  DEFAULT_DISCOUNT_ANNUAL = 'defaultDiscountAnnual',
  DEFAULT_SEMI_ANNUAL = 'defaultSemiAnnual',
  DEFAULT_TRI = 'defaultTri',
  DEFAULT_QUARTELY = 'defaultQuarterly',
  NON_ANNUAL = 'nonAnnual',
  NON_DISCOUNT_ANNUAL = 'nonDiscountAnnual',
  NON_SEMI_ANNUAL = 'nonSemiAnnual',
  NON_TRI = 'nonTri ',
  NON_QUARTELY = 'nonQuarterly'
}

export enum PaymentMethod{
  CERTIFIED = 'certified',
  CHECK = 'check',
  WIRE = 'wire',
}


export enum EditFrequencyType{
  ANNUAL = 'annual',
  DISCOUNT_ANNUAL = 'discountAnnual',
  SEMI_ANNUAL = 'semiAnnual',
  TRI = 'tri',
  QUARTERLY = 'quarterly',
}

export class AgencyDefaultFrequency{
  defaultAnnual!: Boolean;
  defaultDiscountAnnual!: Boolean;
  defaultSemiAnnual!: Boolean;
  defaultTri!: Boolean;
  defaultQuarterly!: Boolean;
  constructor(){
    this.defaultAnnual = false;
    this.defaultDiscountAnnual = false;
    this.defaultQuarterly = false;
    this.defaultSemiAnnual = false;
    this.defaultTri = false;
  }
}


export class AgencyNonFrequency{
  nonAnnual!: Boolean;
  nonDiscountAnnual!: Boolean;
  nonSemiAnnual!: Boolean;
  nonTri !: Boolean;
  nonQuarterly!: Boolean;

  constructor(){
    this.nonAnnual = false;
    this.nonDiscountAnnual = false;
    this.nonQuarterly = false;
    this.nonSemiAnnual = false;
    this.nonTri  = false;
  }
}

export interface AgencyState {
  agencies: Array<Agency>;
  selectedAgency: Agency;
  collectionDates: Array<CollectionDates>;
  selectedCollectionDate : CollectionDates,
  escrowNonEscrowDetails: Array<EscrowNonEscrowDetails>;
  escrowDetails: EscrowDetails;
  nonEscrowDetails: NonEscrowDetails;
  paymentDetails: PaymentDetails;
  stateOptions : Array<StateOptions>;
  billingRequestOptions : Array<DropDownOptions>;
  mediaTypeOptions : Array<DropDownOptions>;
  counties : Array<County>;
  actionInProgress: boolean ;
  error: any;
}

export interface State extends AppState {
  agency: AgencyState;
}
