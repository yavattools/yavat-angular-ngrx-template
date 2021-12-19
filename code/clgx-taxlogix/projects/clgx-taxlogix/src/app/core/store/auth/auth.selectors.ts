import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);


export const getAuthError = createSelector(
  selectAuthState, 
  (state: AuthState) => state.error
);

export const getAuthorizationIsLoading = createSelector( 
  selectAuthState, 
  (state: AuthState) => state.actionInProgress
);

export const getUserAccount = createSelector( 
  selectAuthState, 
  (state: AuthState) => state.account
);

export const getLoginProfile = createSelector( 
  selectAuthState, 
  (state: AuthState) => state.loginResponse
);

export const getUserMenus = createSelector( 
  selectAuthState, 
  (state: AuthState) => state.account.loginProfile.usersMenus
);


export const getUserScreens = createSelector( 
  selectAuthState, 
  (state: AuthState) => state.account.loginProfile.loginResponseStatus.listOfScreenMapping
);