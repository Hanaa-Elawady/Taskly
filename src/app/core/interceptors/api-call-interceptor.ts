import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../enviroment';

export const apiCallInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiKey;

  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
      'Authorization': `Bearer ${apiKey}`
    }
  });

  return next(authReq);
};
