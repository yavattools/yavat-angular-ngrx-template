import { AppState } from '../../core.module';

export class Agency {
  agencyMasterId: string | undefined;
  agencyName: string | undefined;
  agencyAddress: string | undefined;
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
  payName:string | undefined;
  payZip:string | undefined;
  lowLevelAgencyId:string | undefined;
  collectingAgency:string | undefined;
  agencySitusAddress:string | undefined;
  assessorPhoneNum:string | undefined;
  exceltype:string | undefined;
  assessorEmailId:string | undefined;

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
  collectionFrequency?: string | undefined;
  collectionYear?: string | undefined;
  collectionInstallment?: string | undefined;
  collectionBase: string;
  collectionDiscount?: string | undefined;
  collectionPenalty: string;
  collectionLastRelease?: string | undefined;
  collectionBillRequest : string;
  isDeleted : any;
  createdBy?: string | undefined;
  modifiedBy?: string | undefined;
  createdByUser?: string | undefined;
  modifiedByUser?: string | undefined;
  constructor() {
    this.collectionBase = '';
    this.collectionPenalty = '';
    this.collectionBillRequest = '';
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
  isDeleted : string | undefined
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
  emailFileId: string | undefined;
  numOfParcels: string | undefined;
  orginalTB: string | undefined;
  feeWithoutOrginalTB: string | undefined;
  listedPayment: string | undefined;
  emailWire: string | undefined;
  overNight: string | undefined;
  postmarkAccepted: string | undefined;
  paymentRequiredId: string | undefined;
  internalNotes: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;

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

export enum FrequencyType{
  DEFAULT_ANNUAL = 'default_annual',
  DEFAULT_DISCOUNT_ANNUAL = 'default_discount_annual',
  DEFAULT_SEMI_ANNUAL = 'default_semi_annual',
  DEFAULT_TRI = 'default_tri',
  DEFAULT_QUARTELY = 'default_quarterly',
  NON_ANNUAL = 'non_annual',
  NON_DISCOUNT_ANNUAL = 'non_discount_annual',
  NON_SEMI_ANNUAL = 'non_semi_annual',
  NON_TRI = 'non_tri',
  NON_QUARTELY = 'non_quarterly'
}

export enum PaymentMethod{
  CERTIFIED = 'certified',
  CHECK = 'check',
  WIRE = 'wire',
}

export class AgencyDefaultFrequency{
  default_annual!: Boolean;
  default_discount_annual!: Boolean;
  default_semi_annual!: Boolean;
  default_tri!: Boolean;
  default_quarterly!: Boolean;
  constructor(){
    this.default_annual = false;
    this.default_discount_annual = false;
    this.default_quarterly = false;
    this.default_semi_annual = false;
    this.default_tri = false;
  }
}


export class AgencyNonFrequency{
  non_annual!: Boolean;
  non_discount_annual!: Boolean;
  non_semi_annual!: Boolean;
  non_tri!: Boolean;
  non_quarterly!: Boolean;

  constructor(){
    this.non_annual = false;
    this.non_discount_annual = false;
    this.non_quarterly = false;
    this.non_semi_annual = false;
    this.non_tri = false;
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
  counties : Array<County>;
  actionInProgress: boolean ;
  error: any;
}

export interface State extends AppState {
  agency: AgencyState;
}
