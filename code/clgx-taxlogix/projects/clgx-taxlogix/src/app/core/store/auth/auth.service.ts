import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpWrapperService } from '@app/core/providers/http-wrapper';
import { LocalStorageService } from '@app/core/core.module';
import { API_BASE_URL } from '@env/environment';
import { LoginRequest, LoginResponse } from './auth.models';
import { AppConstantsService } from '@app/core/providers/constants';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient, private _appConstantService: AppConstantsService
  ) {
  }

  signIn(loginRequest: LoginRequest): Observable<any> {
    debugger;
    let url:string = API_BASE_URL + this._appConstantService.SIGN_IN_URL;
    return this.http.post(url, loginRequest);

    // return this.http
    //   .post<LoginResponse>(url, loginRequest)
    //   .pipe(catchError(this.handleError));
  }

  // private handleError(error: HttpErrorResponse): any {
  //   debugger;
  //   return throwError(error || 'Server error');
  // }
}
