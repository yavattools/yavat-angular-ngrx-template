import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getIpaddres() {
    return this.http.get('https://api.ipify.org/?format=json');
  }

  getRegistrationPlans() {
    const url = API_BASE_URL + '/taxregistration/registrationPlans';
    return this.http.get(url);
  }

  loginUser(request: any) {
    return this.http.post(API_BASE_URL + '/taxlogix/login', request);
  }

  letsConnect(request: any) {
    return this.http.post(API_BASE_URL + '/taxlogix/letsConnectToTax', request);
  }

  forgotPassword(mailId: any): Observable<any> {
    const url = API_BASE_URL + '/auth/changepassword?appName=taxLogix';
    const params = new HttpParams().set('mailId', mailId);
    return this.http.get(url, { params });
  }

  validateLink(resetPwdId: any, skipTimeValid = false): Observable<any> {
    const url = API_BASE_URL + '/auth/validchangepwdlink';
    const params = new HttpParams().set('resetPwdId', resetPwdId);
    return this.http.get(url, { params });
  }

  activateLink(resetPwdId: any): Observable<any> {
    const url = API_BASE_URL + '/auth/validchangepwdlink';
    const params = new HttpParams()
      .set('resetPwdId', resetPwdId)
      .set('skipTimeValid', 'skipTimeValid');
    return this.http.get(url, { params });
  }

  changePassword(request: any) {
    const url = API_BASE_URL + '/taxlogix/updatepwd';
    return this.http.post(url, request);
  }
}
