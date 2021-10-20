import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardViewComponent } from './view/dashboard-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    data: { title: 'clgx.menu.features' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
