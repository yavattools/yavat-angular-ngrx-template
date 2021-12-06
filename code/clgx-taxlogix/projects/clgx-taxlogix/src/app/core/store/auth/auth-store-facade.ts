
import { Injectable } from '@angular/core';
import { AppState } from '@app/core/core.state';
import { select, Store } from '@ngrx/store';

import * as fromActions from './auth.actions';
import { AuthState, LoginRequest } from './auth.models';
import * as fromSelectors from './auth.selectors';


@Injectable({ providedIn: 'root' })
export class AuthStoreFacade {
  actionInProgress$ = this.store.pipe(select(fromSelectors.getAuthorizationIsLoading));
  loginProfile$ = this.store.pipe(select(fromSelectors.getLoginProfile));
  account$ = this.store.pipe(select(fromSelectors.getUserAccount));
  userMenus$ = this.store.pipe(select(fromSelectors.getUserMenus));

  loginError$ = this.store.pipe(select(fromSelectors.getAuthError));
  authenticated$ = this.store.pipe(select(fromSelectors.selectIsAuthenticated));

  constructor(private store: Store<AppState>) {
  

  }

  login(loginRequest:LoginRequest) {
    this.store.dispatch(fromActions.LoginAction({loginRequest}));
  }

}