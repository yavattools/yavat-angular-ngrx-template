import { Agency } from '@app/features/agency/agency-view.data';
import { createAction, props } from '@ngrx/store';
import { CollectionDates, EscrowDetails, EscrowNonEscrowDetails, GetActiveAgenciesRequest, GetCollectionDatesRequest, GetEscrowNonEscrowDetailsRequest, GetPaymentDetailsRequest, NonEscrowDetails, PaymentDetails } from './agency.model';

export const actionGetAllActiveAgencies = createAction(
  '[Agency] Get All Active Agencies',
  props<{ request: GetActiveAgenciesRequest}>()
);

export const actionGetAllActiveAgenciesSuccess = createAction(
  '[Agency] Get All Active Agencies Success',
  props<{ agencies: Array<Agency>}>()
);

export const actionAgencyApiFailure = createAction(
  '[Agency] Agency API Failure',
  props<{ error: any }>()
);

export const actionSaveAgency = createAction(
  '[Agency] Save Agency',
  props<{ agency: Agency}>()
);

export const actionSaveAgencySuccess = createAction(
  '[Agency] Save Agency Success',
  props<{ agency: Agency}>()
);


export const actionUpdateAgency = createAction(
  '[Agency] Update Agency',
  props<{ agency: Agency}>()
);

export const actionUpdateAgencySuccess = createAction(
  '[Agency] Update Agency Success',
  props<{ agency: Agency}>()
);

export const actionGetCollectionDates = createAction(
  '[Agency] Get Collection Dates',
  props<{ request: GetCollectionDatesRequest}>()
);

export const actionSaveCollectionDates = createAction(
  '[Agency] Save Collection Dates',
  props<{ collectionDates: CollectionDates}>()
);

export const actionSaveCollectionDatesSuccess = createAction(
  '[Agency] Save Collection Dates Success',
  props<{ collectionDates: CollectionDates}>()
);

export const actionUpdateCollectionDates = createAction(
  '[Agency] Update Collection Dates',
  props<{ collectionDates: CollectionDates}>()
);

export const actionUpdateCollectionDatesSuccess = createAction(
  '[Agency] Update Collection Dates Success',
  props<{ collectionDates: CollectionDates}>()
);



export const actionGetEscrowNonEscrowDetails = createAction(
  '[Agency] Get Escrow Non Escrow Details',
  props<{ request: GetEscrowNonEscrowDetailsRequest}>()
);

export const actionSaveEscrowDetails = createAction(
  '[Agency] Save Escrow Details',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionSaveEscrowDetailsSuccess = createAction(
  '[Agency] Save Escrow Details Success',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionUpdateEscrowDetails = createAction(
  '[Agency] Update Escrow Details',
  props<{ escrowDetails: EscrowDetails}>()
);

export const actionUpdateEscrowDetailsSuccess = createAction(
  '[Agency] Update EscrowDetails Success',
  props<{ escrowDetails: EscrowDetails}>()
);


export const actionSaveNonEscrowDetails = createAction(
  '[Agency] Save Non Escrow Details',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionSaveNonEscrowDetailsSuccess = createAction(
  '[Agency] Save Non Escrow Details Success',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionUpdateNonEscrowDetails = createAction(
  '[Agency] Update Non Escrow Details',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionUpdateNonEscrowDetailsSuccess = createAction(
  '[Agency] Update Non Escrow Details Success',
  props<{ nonEscrowDetails: NonEscrowDetails}>()
);

export const actionGetPaymentDetails = createAction(
  '[Agency] Get Payment Details',
  props<{ request: GetPaymentDetailsRequest}>()
);

export const actionSavePaymentDetails = createAction(
  '[Agency] Save Payment Details',
  props<{ details: PaymentDetails}>()
);

export const actionSavePaymentDetailsSuccess = createAction(
  '[Agency] Save Payment Details Success',
  props<{ details: PaymentDetails}>()
);

export const actionUpdatePaymentDetails = createAction(
  '[Agency] Update Payment Details',
  props<{ details: PaymentDetails}>()
);

export const actionUpdatePaymentDetailsSuccess = createAction(
  '[Agency] Update Payment Details Success',
  props<{ details: PaymentDetails}>()
);