import { ModuleWithProviders, NgModule, Optional, SkipSelf  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './client.effects';
import { reducer } from './client.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
  ],
  providers: [

  ]
})
export class ClientStoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ClientStoreModule) {
      if (parentModule) {
      throw new Error('ClientStoreModule is already loaded. Import only in AppModule');
    }else{
      // this.facade.establishSignalRConnection();
    }
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ClientStoreModule,
      providers: [
      ]

    }
  }
}
