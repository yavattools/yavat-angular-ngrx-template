import { AppState } from '../../core.module';

export class Agency {
  agencyMasterId!: string;
  agencyName: string | undefined;
  agencyAddress: string | undefined;
  agencyCity: string | undefined;
  agencyState: string | undefined;
  agencyPhonenumber: string | undefined;
  agencyNumber!: string;
  agencyWebsite: string | undefined;
  agencyLowerLevel: string | undefined;
  agencyCollecting: string | undefined;
  agencyActive: string | undefined;
  agencySuitsAddress: string | undefined;
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
  assessorPhoneNumber: string | undefined;
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
  excelType: string | undefined;
  mailType: string | undefined;
  emailId: string | undefined;
  internalNotes: string | undefined;
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
  internalComments:string | undefined;

  constructor(){}
}

export interface GetActiveAgenciesRequest {
  userId: string;
  processId: string;
  agencyMasterId : string | undefined;
}

export class CollectionDates {
  collectionPracticesId?: string | undefined;
  agencyMasterId?: string | undefined;
  frequency?: string | undefined;
  year?: string | undefined;
  installment?: string | undefined;
  base: string;
  discount?: string | undefined;
  penalty: string;
  lateRelease?: string | undefined;
  billRequest: string;
  isDeleted : any;
  createdBy?: string | undefined;
  modifiedBy?: string | undefined;
  createdByUser?: string | undefined;
  modifiedByUser?: string | undefined;
  constructor() {
    this.base = '';
    this.penalty = '';
    this.billRequest = '';
  }
}

export interface GetCollectionDatesRequest {
  agencyMasterId: string | undefined;
  userId: string | undefined;
  agencyCollectionDatesId: string | undefined;
}

export class EscrowDetails {
  agencyMasterId: string | undefined;
  escrowId: string | undefined;
  contactName: string | undefined;
  contactPhone: string | undefined;
  contactFax: string | undefined;
  contactEmail: string | undefined;
  agencyWebsite: string | undefined;
  amtAvailable: string | undefined;
  costPay: string | undefined;
  listedPayment: string | undefined;
  mailAwayReq: string | undefined;
  agencyExpect: string | undefined;
  postmarkAccepted: string | undefined;
  copyFee: string | undefined;
  mailAwayFee: string | undefined;
  numOfParcels: string | undefined;
  internalNotes: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;

  constructor() {}
}

export class NonEscrowDetails {
  agencyMasterId: string | undefined;
  nonEscrowId: string | undefined;
  collectingAgencyName: string | undefined;
  contactName: string | undefined;
  contactPhone: string | undefined;
  contactFax: string | undefined;
  contactEmail: string | undefined;
  agencyWebsite: string | undefined;
  agencyCollection: string | undefined;
  thirdPartyCollection: string | undefined;
  amtAvailable: string | undefined;
  mailAwayReq: string | undefined;
  mailAwayFee: string | undefined;
  payName: string | undefined;
  payAddress: string | undefined;
  payCity: string | undefined;
  stateId: string | undefined;
  countyId: string | undefined;
  zip: string | undefined;
  paymentRequiredId: string | undefined;
  ïnternalNotes: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;
  createdByUser: string | undefined;
  modifiedByUser: string | undefined;

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

export interface AgencyState {
  agencies: Array<Agency>;
  selectedAgency: Agency;
  collectionDates: Array<CollectionDates>;
  selectedCollectionDate : CollectionDates,
  escrowNonEscrowDetails: Array<EscrowNonEscrowDetails>;
  escrowDetails: EscrowDetails;
  nonEscrowDetails: NonEscrowDetails;
  paymentDetails: PaymentDetails;
  actionInProgress: boolean ;
  error: any;
}

export interface State extends AppState {
  agency: AgencyState;
}
