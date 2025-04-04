import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const Interceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl = environment.baseUrl;

  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
        url: baseUrl + req.url
    });
    return next(authReq);
  }
  return next(req);
};
