import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const Interceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {

  let router = inject(Router)
  const baseUrl = environment.baseUrl;
  const token = localStorage.getItem('token');
  const type = req.headers.get('X-META');

  let authReq = req.clone({
    url: baseUrl + req.url,
  });

  if (type !== 'Login' && token) {
    authReq = authReq.clone({
      headers: authReq.headers.set('Authorization', token),
    });
  }

  return next(authReq).pipe(
    tap((event: HttpEvent<any>) => {
      
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.clear();
       router.navigate(['login']);
      }
      return throwError(() => error);
    })
  );
};
