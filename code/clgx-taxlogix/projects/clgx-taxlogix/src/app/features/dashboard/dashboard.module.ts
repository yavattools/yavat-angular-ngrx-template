import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DashboardViewComponent } from './view/dashboard-view.component';
import { DashboardRoutingModule } from './dashboard-view-routing.module';

@NgModule({
  declarations: [DashboardViewComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
