import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TaxlogixSpinnerComponent } from './shared/utilities/taxlogix-spinner/taxlogix-spinner.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'agency',
    loadChildren: () =>
      import('./features/agency/agency.module').then((m) => m.AgencyModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      )
  },
  {
    path: 'spin',
    component: TaxlogixSpinnerComponent
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
