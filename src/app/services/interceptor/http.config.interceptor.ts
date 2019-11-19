import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';

Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const session = JSON.parse(sessionStorage.getItem('session'));

    if (!session) {
      return next.handle(req);
    }

    const cloned = req.clone({
      headers: req.headers.set('Authorization', `${session.token}`)
    });

    return next.handle(cloned);
  }
}
