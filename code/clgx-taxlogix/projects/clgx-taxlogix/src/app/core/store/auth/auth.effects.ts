import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { LoginAction, LoginErrorAction, LoginSuccessAction } from './auth.actions';
import { LoginResponse } from './auth.models';
import { AuthService } from './auth.service';

export const AUTH_KEY = 'auth';

@Injectable()
export class AuthEffects {


login = createEffect(() =>
this.actions$.pipe(
  ofType(LoginAction),
  switchMap((action) => this.authService.signIn(action.loginRequest).pipe(
      mergeMap( response => [
        LoginSuccessAction({loginResponse: response}),
      ]),
      catchError(error => of(LoginErrorAction(error)))
    ))
  )
);

loginSuccess = createEffect(() =>
this.actions$.pipe(
  ofType(LoginSuccessAction),
  switchMap((action) => [
    this.router.navigate(['dashboard'])
    ])
  ),
  { dispatch: false }
);

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) {}
}
