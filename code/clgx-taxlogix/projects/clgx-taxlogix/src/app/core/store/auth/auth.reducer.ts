import { AccountProfile, AuthState, LoginResponse } from './auth.models';
import { LoginAction, LoginErrorAction, LoginSuccessAction } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import * as _ from 'lodash';

export const initialState: AuthState = {
  isAuthenticated: false,
  actionInProgress: false,
  loginResponse: new LoginResponse(),
  account: new AccountProfile(),
  error: ''
};

const reducer = createReducer(
  initialState,
  mutableOn(LoginAction, (state, action) => {
    debugger;
    state.actionInProgress = true;
  }),
  mutableOn(LoginErrorAction, (state, action) => {
    state.actionInProgress = false;
    state.error = action.error;
  }),
  mutableOn(LoginSuccessAction, (state, action) => {
    state.actionInProgress = false;
    let uAccount =  _.cloneDeep(state.account);
    uAccount.loginProfile = _.cloneDeep(action.loginResponse);
    state.account = uAccount;
    // if(state.account.loginProfile.statusCode){
      state.isAuthenticated = true;
    // }else{
      // state.isAuthenticated = false;
    // }
  }),
 
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
