import { createAction, props } from '@ngrx/store';
import { Agency, CollectionDates, EscrowDetails, EscrowNonEscrowDetails, GetActiveAgenciesRequest, GetCollectionDatesRequest, GetEscrowRequest,GetNonEscrowDetailsRequest, GetPaymentDetailsRequest, NonEscrowDetails, PaymentDetails } from './agency.model';



export const actionStartActionInProgress = createAction(
  '[Agency] Start Action In Progress',
);

export const actionStopActionInProgress = createAction(
  '[Agency] Stop Action In Progress',
);

export const actionGetAllActiveAgencies = createAction(
  '[Agency] Get All Active Agencies',
  props<{ request : GetActiveAgenciesRequest}>()
);

export const actionGetAllActiveAgenciesSuccess = createAction(
  '[Agency] Get All Active Agencies Success',
  props<{ agencyList: Array<Agency>}>()
);

export const actionAgencyApiFailure = createAction(
  '[Agency] Agency API Failure',
  props<{ error: any }>()
);

export const actionSetSelectedAgency = createAction(
  '[Agency] Set Selected Agency',
  props<{ agency: Agency}>()
);

export const actionSaveAgencyDetails = createAction(
  '[Agency] Save Agency Details',
  props<{ agency: Agency}>()
);

export const actionSaveAgencyDetailsSuccess = createAction(
  '[Agency] Save Agency Details Success',
  props<{ agency: Agency}>()
);

export const actionSaveAgencyDetailsFailure = createAction(
  '[Agency] Save Agency Details Failure',
  props<{ error: any}>()
);


export const actionUpdateAgencyDetails = createAction(
  '[Agency] Update Agency Details',
  props<{ agency: Agency}>()
);

export const actionUpdateAgencyDetailsSuccess = createAction(
  '[Agency] Update Agency Details Success',
  props<{ agency: Agency}>()
);

export const actionUpdateAgencyDetailsFailure = createAction(
  '[Agency] Update Agency Details Failure',
  props<{ error: any}>()
);

export const actionSetCollectionDates = createAction(
  '[Agency] Set Collection Dates',
  props<{ collectionDate : CollectionDates}>()
);

export const actionGetCollectionDates = createAction(
  '[Agency] Get Collection Dates',
  props<{ request: GetCollectionDatesRequest}>()
);

export const actionGetCollectionDatesSuccess = createAction(
  '[Agency] Get Collection Dates Success',
  props<{ collectionDates: Array<CollectionDates>}>()
);

export const actionGetCollectionDatesFailure = createAction(
  '[Agency] Get Collection Dates Failure',
  props<{ error: any}>()
);

export const actionSaveCollectionDates = createAction(
  '[Agency] Save Collection Dates',
  props<{ collectionDates: CollectionDates}>()
);

export const actionSaveCollectionDatesSuccess = createAction(
  '[Agency] Save Collection Dates Success',
  props<{ collectionDates: CollectionDates}>()
);


export const actionSaveCollectionDatesFailure = createAction(
  '[Agency] Save Collection Dates Failure',
  props<{ error: any}>()
);

export const actionUpdateCollectionDates = createAction(
  '[Agency] Update Collection Dates',
  props<{ collectionDates: CollectionDates}>()
);

export const actionUpdateCollectionDatesSuccess = createAction(
  '[Agency] Update Collection Dates Success',
  props<{ collectionDates: CollectionDates}>()
);

export const actionUpdateCollectionDatesFailure = createAction(
  '[Agency] Update Collection Dates Failure',
  props<{ error: any}>()
);

export const actionGetEscrowDetails = createAction(
  '[Agency] Get Escrow Details',
  props<{ request: GetEscrowRequest}>()
);


export const actionGetEscrowDetailsSuccess = createAction(
  '[Agency] Get Escrow Details Success',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionGetEscrowDetailsFailure = createAction(
  '[Agency] Get Escrow Details Failure',
  props<{ error: any}>()
);

export const actionGetNonEscrowDetails = createAction(
  '[Agency] Get Non Escrow Details',
  props<{ request: GetNonEscrowDetailsRequest}>()
);


export const actionGetNonEscrowDetailsSuccess = createAction(
  '[Agency] Get Non Escrow Details Success',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionGetNonEscrowDetailsFailure = createAction(
  '[Agency] Get Non Escrow Details Failure',
  props<{ error: any}>()
);

export const actionSaveEscrowDetails = createAction(
  '[Agency] Save Escrow Details',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionSaveEscrowDetailsSuccess = createAction(
  '[Agency] Save Escrow Details Success',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionSaveEscrowDetailsFailure = createAction(
  '[Agency] Save Escrow Details Failure',
  props<{ error: any}>()
);

export const actionUpdateEscrowDetails = createAction(
  '[Agency] Update Escrow Details',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionUpdateEscrowDetailsSuccess = createAction(
  '[Agency] Update EscrowDetails Success',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionUpdateEscrowDetailsFailure = createAction(
  '[Agency] Update EscrowDetails Failure',
  props<{ error: any}>()
);

export const actionSaveNonEscrowDetails = createAction(
  '[Agency] Save Non Escrow Details',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionSaveNonEscrowDetailsSuccess = createAction(
  '[Agency] Save Non Escrow Details Success',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionSaveNonEscrowDetailsFailure = createAction(
  '[Agency] Save Non Escrow Details Failure',
  props<{ error: any}>()
);

export const actionUpdateNonEscrowDetails = createAction(
  '[Agency] Update Non Escrow Details',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionUpdateNonEscrowDetailsSuccess = createAction(
  '[Agency] Update Non Escrow Details Success',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionUpdateNonEscrowDetailsFailure = createAction(
  '[Agency] Update Non Escrow Details Failure',
  props<{ error: any}>()
);

export const actionGetPaymentDetails = createAction(
  '[Agency] Get Payment Details',
  props<{ request: GetPaymentDetailsRequest}>()
);
export const actionGetPaymentDetailsSuccess = createAction(
  '[Agency] Get Payment Details Success',
  props<{ paymentDetails: PaymentDetails}>()
);

export const actionGetPaymentDetailsFailure = createAction(
  '[Agency] Get Payment Details Failure',
  props<{ error: any}>()
);

export const actionSavePaymentDetails = createAction(
  '[Agency] Save Payment Details',
  props<{ details: PaymentDetails}>()
);

export const actionSavePaymentDetailsSuccess = createAction(
  '[Agency] Save Payment Details Success',
  props<{ details: PaymentDetails}>()
);

export const actionSavePaymentDetailsFailure = createAction(
  '[Agency] Save Payment Details Failure',
  props<{ error: any}>()
);

export const actionUpdatePaymentDetails = createAction(
  '[Agency] Update Payment Details',
  props<{ details: PaymentDetails}>()
);

export const actionUpdatePaymentDetailsSuccess = createAction(
  '[Agency] Update Payment Details Success',
  props<{ details: PaymentDetails}>()
);

export const actionUpdatePaymentDetailsFailure = createAction(
  '[Agency] Update Payment Details Failure',
  props<{ error: any}>()
);