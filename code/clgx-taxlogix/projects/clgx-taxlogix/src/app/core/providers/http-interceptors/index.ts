/* Http Interceptors; see HttpClient docs and sample code for more info */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { StandardHeaderInterceptor } from './standard-header.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: StandardHeaderInterceptor, multi: true }
];

