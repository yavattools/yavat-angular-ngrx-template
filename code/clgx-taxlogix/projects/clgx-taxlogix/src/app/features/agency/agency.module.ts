import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AgencyLandingComponent } from './view/agency-landing/agency-landing.component';
import { AgencyRoutingModule } from './agency-view-routing.module';
import { AgencyDetailsContainerComponent } from './view/agency-details-container/agency-details-container.component';
import { AgencyDetailsComponent } from './view/agency-details/agency-details.component';
import { AgencyCollectionPracticesComponent } from './view/agency-collection-practices/agency-collection-practices.component';
import { AgencyProcumentComponent } from './view/agency-procurement/agency-procurement.component';
import { AgencyPaymentComponent } from './view/agency-payment/agency-payment.component';
import { AgencyLogsComponent } from './view/agency-logs/agency-logs.component';
import { CollectionFrequencyComponent } from './view/shared/collection-frequency/collection-frequency.component';
import { AgencyPaymentEscrowComponent } from './view/agency-payment/agency-payment-escrow/agency-payment-escrow.component';
import { AgencyPaymentNonescrowComponent } from './view/agency-payment/agency-payment-nonescrow/agency-payment-nonescrow.component';
import { EditAgencyCollectionPracticeComponent } from './view/agency-collection-practices/edit-agency-collection-practice/edit-agency-collection-practice.component';

@NgModule({
  declarations: [
    AgencyLandingComponent,
    AgencyDetailsContainerComponent,
    AgencyDetailsComponent,
    AgencyCollectionPracticesComponent,
    AgencyProcumentComponent,
    AgencyPaymentComponent,
    AgencyLogsComponent,
    CollectionFrequencyComponent,
    AgencyPaymentEscrowComponent,
    AgencyPaymentNonescrowComponent,
    EditAgencyCollectionPracticeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgencyRoutingModule
  ]
})
export class AgencyModule {}
