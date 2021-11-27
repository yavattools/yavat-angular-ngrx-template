import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from './auth.models';


export const LoginAction  = createAction(
    '[Auth] -Login Requested-',
    props<{ loginRequest: LoginRequest }>()
);

export const LoginSuccessAction  = createAction(
  '[Auth] -Login Request Success-',
  props<{ loginResponse: LoginResponse }>()
);

export const LoginErrorAction  = createAction(
  '[Auth] -Login Request Error-',
  props<{  error: any }>()
);