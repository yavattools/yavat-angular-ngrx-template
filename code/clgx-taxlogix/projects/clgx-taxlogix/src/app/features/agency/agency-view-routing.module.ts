import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyDetailsContainerComponent } from './view/agency-details-container/agency-details-container.component';

import { AgencyLandingComponent } from './view/agency-landing/agency-landing.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule {}
