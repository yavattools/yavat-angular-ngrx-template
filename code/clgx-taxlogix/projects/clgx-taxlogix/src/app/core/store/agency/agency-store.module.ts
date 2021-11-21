import { ModuleWithProviders, NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './agency.effects';
import { reducer } from './agency.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('agency', reducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
  ],
  providers: [

  ]
})
export class AgencyStoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AgencyStoreModule) {
      if (parentModule) {
      throw new Error('AgencyStoreModule is already loaded. Import only in AppModule');
    }else{
      // this.facade.establishSignalRConnection();
    }
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AgencyStoreModule,
      providers: [
      ]

    }
  }
}
