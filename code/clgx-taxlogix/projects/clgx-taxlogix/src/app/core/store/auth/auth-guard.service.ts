import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../../core.state';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivateChild(): Observable<boolean> {

    return this.store.pipe(select(selectIsAuthenticated)).pipe(
      map((isAuthenticated: boolean) => {
        if(!isAuthenticated){
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      }),
      take(1)
      );
  }

}
