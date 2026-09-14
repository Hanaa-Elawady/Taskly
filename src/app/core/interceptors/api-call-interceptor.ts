import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../enviroment';

export const apiCallInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiKey;
  const token = localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token");

  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
      'Authorization': `Bearer ${token}`
    }
  });

  return next(authReq);
};
