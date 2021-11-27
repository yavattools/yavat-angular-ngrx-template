import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LoggerService } from '@core/providers/logger';
import { LocalStorageService } from '@app/core/core.module';
import { Platform } from '@angular/cdk/platform';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class StandardHeaderInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _injector: Injector,
    private logger: LoggerService,
    private storageService: LocalStorageService,
    public platform: Platform
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    let headers: HttpHeaders = new HttpHeaders();
    if (req.method === 'GET') {
      headers = headers.append('Accept', 'application/json');
      headers = headers.append('Cache-Control', 'no-cache');
      headers = headers.append('Pragma', 'no-cache');
    } else {
      headers = headers.append('Content-Type', 'application/json');
    }
    debugger;
    const token: any = this.storageService.getItem('authToken');

    let urlParts:any = req.url.split('/');
    if(token && (urlParts[6] !== 'signin' || urlParts[3] !== 'en.json')){
      let tempToken = token.replace("\\", "").replace("\\", "");
      let currentToken = tempToken.replace("\"", "").replace("\"", "");
      let bearer = "Bearer ";
      headers = headers.append(TOKEN_HEADER_KEY, bearer + currentToken);
    }

    authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            this.router.navigate(['login']);
          } else if (response.status === 302 || response.status === 0) {
          }
        } else if (response instanceof HttpHeaderResponse) {
          console.log(response);
          const token: any = response.headers.get('authorization');
          localStorage.setItem('authToken', JSON.stringify(token));
        } else if (response instanceof HttpResponse) {
          const token: any = response.headers.get('authorization');
          if (token) {
            localStorage.setItem('authToken', JSON.stringify(token));
          }
        }
        return response;
      })
    );
  }
}
