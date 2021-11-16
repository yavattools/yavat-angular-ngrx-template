
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import * as fromActions from './agency.actions';
import * as fromReducers from './agency.reducer';
import * as fromSelectors from './agency.selectors';
import { AgencyState } from './agency.model';

@Injectable({ providedIn: 'root' })
export class AgencyStoreFacade {
  

  constructor(private store: Store<AgencyState>) {}

   
}
