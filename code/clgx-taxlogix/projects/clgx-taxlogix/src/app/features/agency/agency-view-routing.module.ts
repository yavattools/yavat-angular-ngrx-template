import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyDetailsContainerComponent } from './view/agency-details-container/agency-details-container.component';

import { AgencyLandingComponent } from './view/agency-landing/agency-landing.component';
import { AgencyPaymentComponent } from './view/agency-payment/agency-payment.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyLandingComponent,
    data: { title: 'clgx.agency.landing.title' }
  },
  {
    path: 'agency-details',
    component: AgencyDetailsContainerComponent,
    data: { title: 'clgx.agency.details-container.title' }
  },
  {
    path: 'agency-payment',
    component: AgencyPaymentComponent,
    data: { title: 'clgx.agency.payment.title' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule {}
