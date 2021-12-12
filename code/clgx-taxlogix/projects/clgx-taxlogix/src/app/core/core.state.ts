import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './store/meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './store/meta-reducers/debug.reducer';
import { AuthState } from './store/auth/auth.models';
import { authReducer } from './store/auth/auth.reducer';
import { RouterStateUrl } from './store/router/router.state';
import { settingsReducer } from './store/settings/settings.reducer';
import { SettingsState } from './store/settings/settings.model';
import { agencyReducer } from './store/agency/agency.reducer';
import { AgencyState } from './store/agency/agency.model';
import { ClientState } from './store/client/client.model';
import { clientReducer } from './store/client/client.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  settings: settingsReducer,
  agency: agencyReducer,
  client: clientReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<
  AppState, 
  AuthState>
  ('auth');

export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export const selectAgencyState = createFeatureSelector<
  AppState,
  AgencyState
>('agency');

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export const selectClientState = createFeatureSelector<
  AppState,
  ClientState
>('client');

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
  agency: AgencyState;
  client : ClientState;
  router: RouterReducerState<RouterStateUrl>;
}
