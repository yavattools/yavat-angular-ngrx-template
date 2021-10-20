import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const token: string = this.accountService.token;

    // if (token) {
    //   req = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + token),
    //   });
    // }

    return next.handle(req);
  }
}
